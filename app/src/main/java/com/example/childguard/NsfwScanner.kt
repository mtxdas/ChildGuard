package com.example.childguard

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.MediaMetadataRetriever
import java.io.File
import java.util.Locale

object NsfwScanner {

    data class ScanResult(
        val file: File,
        val kind: String,        // "img" / "video" / "name"
        val reason: String,      // যেমন "ত্বক 42%"
        val skinRatio: Double
    )

    val IMAGE_EXT = listOf("jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "jfif")
    val VIDEO_EXT = listOf("mp4", "mkv", "3gp", "webm", "mov", "avi", "flv", "m4v")
    val NAME_KEYWORDS = listOf(
        "porn", "xxx", "sex", "nude", "naked", "boob", "fuck", "ass",
        "sexy", "hot", "bikini", "18+", "adult", "milf", "blowjob",
        "cum", "dick", "pussy", "erotic", "escort", "horny", "kamasutra",
        "pornhub", "xvideos", "xnxx", "pornstar", "tits",
        "বিকিনি", "নগ্ন", "সেক্স", "অশ্লীল", "হট", "খালি", "যৌন"
    )
    val SKIP_DIRS = setOf(
        "android", "cache", "obb", "data", "code_cache", "thumbnails",
        ".thumbnails", ".trash", "backup", "log", "tmp", ".tmp", ".cache",
        "app_webview", "databases", "shared_prefs", "files", "no_backup"
    )

    @Volatile var cancelRequested = false

    fun scan(
        roots: List<File>,
        aggressive: Boolean,
        maxDepth: Int,
        progress: (Int, Int) -> Unit
    ): List<ScanResult> {
        cancelRequested = false
        val results = ArrayList<ScanResult>()
        var scanned = 0
        val skinThreshold = if (aggressive) 0.22 else 0.35
        val maxResults = if (aggressive) 40 else 25

        for (root in roots) {
            walk(root, maxDepth) { file ->
                if (cancelRequested) return@walk
                val ext = file.extension.lowercase()
                var result: ScanResult? = null

                val nameHit = checkName(file)
                if (nameHit != null) {
                    result = ScanResult(file, "name", "নাম/ফোল্ডার: '$nameHit'", 0.0)
                } else if (ext in IMAGE_EXT && file.length() > 5000) {
                    val ratio = analyzeImageFile(file, if (aggressive) 4 else 8)
                    scanned++
                    progress(scanned, results.size)
                    if (ratio >= skinThreshold) {
                        result = ScanResult(file, "img", "ত্বক ${(ratio * 100).toInt()}%", ratio)
                    }
                } else if (ext in VIDEO_EXT && file.length() > 50000) {
                    val ratio = analyzeVideoFile(file, aggressive)
                    scanned++
                    progress(scanned, results.size)
                    if (ratio >= skinThreshold) {
                        result = ScanResult(file, "video", "ফ্রেম ত্বক ${(ratio * 100).toInt()}%", ratio)
                    }
                }

                if (result != null) {
                    results.add(result)
                    progress(scanned, results.size)
                    if (results.size >= maxResults) cancelRequested = true
                }
            }
            if (cancelRequested) break
        }
        return results
    }

    private fun walk(dir: File, depth: Int, onFile: (File) -> Unit) {
        if (depth < 0 || cancelRequested) return
        if (!dir.canRead()) return
        val children = try { dir.listFiles() } catch (_: Exception) { return } ?: return
        for (f in children) {
            if (cancelRequested) return
            if (f.isFile) {
                onFile(f)
            } else if (f.isDirectory && depth > 0) {
                val name = f.name.lowercase()
                if (name in SKIP_DIRS || name.startsWith(".")) continue
                walk(f, depth - 1, onFile)
            }
        }
    }

    fun checkName(file: File): String? {
        val lower = file.name.lowercase(Locale.US)
        val parentLower = file.parentFile?.name?.lowercase(Locale.US) ?: ""
        for (kw in NAME_KEYWORDS) {
            if (lower.contains(kw) || parentLower.contains(kw)) return kw
        }
        return null
    }

    fun analyzeImageFile(file: File, sampleStep: Int = 8): Double {
        return try {
            val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
            BitmapFactory.decodeFile(file.absolutePath, bounds)
            if (bounds.outWidth <= 0 || bounds.outHeight <= 0) return 0.0

            val opts = BitmapFactory.Options().apply { inSampleSize = sampleStep }
            val bmp = BitmapFactory.decodeFile(file.absolutePath, opts) ?: return 0.0

            val ratio = skinRatio(bmp)
            bmp.recycle()
            ratio
        } catch (_: Exception) {
            0.0
        }
    }

    fun analyzeVideoFile(file: File, aggressive: Boolean): Double {
        return try {
            val mmr = MediaMetadataRetriever()
            mmr.setDataSource(file.absolutePath)

            val durationMs = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION)
                ?.toLongOrNull() ?: 0L
            if (durationMs <= 0) { mmr.release(); return 0.0 }

            val stepMs = if (aggressive) 2500L else 6000L
            var frames = 0
            var sum = 0.0
            var t = 0L

            while (t < durationMs && !cancelRequested) {
                val frame = mmr.getFrameAtTime(
                    t * 1000L,
                    MediaMetadataRetriever.OPTION_CLOSEST_SYNC
                )
                if (frame != null) {
                    sum += skinRatio(frame)
                    frame.recycle()
                    frames++
                }
                t += stepMs
            }
            mmr.release()
            if (frames == 0) 0.0 else sum / frames
        } catch (_: Exception) {
            0.0
        }
    }

    private fun skinRatio(bmp: Bitmap): Double {
        val w = bmp.width
        val h = bmp.height
        val pixels = IntArray(w * h)
        bmp.getPixels(pixels, 0, w, 0, 0, w, h)

        var skin = 0
        var total = 0
        for (i in pixels.indices) {
            if (i and 0x3FFF == 0 && cancelRequested) break
            val p = pixels[i]
            val r = (p shr 16) and 0xFF
            val g = (p shr 8) and 0xFF
            val b = p and 0xFF
            if (isSkin(r, g, b)) skin++
            total++
        }
        if (total == 0) return 0.0
        return skin.toDouble() / total
    }

    private fun isSkin(r: Int, g: Int, b: Int): Boolean {
        val max = maxOf(r, g, b)
        val min = minOf(r, g, b)
        val diff = max - min
        val value = max

        if (value < 40 || value > 250) return false
        if (diff > 100) return false
        if (r <= 95 || g <= 40 || b <= 20) return false
        if (r - g < 15 || r - b < 15) return false
        val rNorm = r.toDouble() / (r + g + b)
        if (rNorm > 0.62) return false
        return true
    }
}
