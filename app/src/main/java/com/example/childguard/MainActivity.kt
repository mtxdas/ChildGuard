package com.example.childguard

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.Settings
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import kotlinx.coroutines.*

class MainActivity : AppCompatActivity() {

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private lateinit var status: TextView
    private lateinit var resultsBox: LinearLayout
    private lateinit var progress: ProgressBar

    private val permLauncher =
        registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) {
            updateStatus()
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 48, 48, 48)
        }
        root.addView(TextView(this).apply {
            text = "ChildGuard"
            textSize = 28f
            setPadding(0, 0, 0, 24)
        })
        status = TextView(this).apply { textSize = 16f }
        root.addView(status)

        progress = ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal).apply {
            max = 100
            visibility = View.GONE
            setPadding(0, 24, 0, 24)
        }
        root.addView(progress)

        root.addView(button("মনিটরিং সার্ভিস চালু করুন") {
            val i = Intent(this@MainActivity, MonitorService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) startForegroundService(i)
            else startService(i)
            Toast.makeText(this@MainActivity, "মনিটরিং চালু হয়েছে", Toast.LENGTH_SHORT).show()
        })
        root.addView(button("নিরাপত্তা স্ক্যান চালান") { runScan() })
        root.addView(button("রিপোর্ট শেয়ার করুন") { shareLatestReport() })
        root.addView(button("Usage Access অনুমতি দিন") {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        })
        root.addView(button("All Files Access অনুমতি দিন (Android 11+)") {
            if (Build.VERSION.SDK_INT >= 30) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION,
                    Uri.parse("package:$packageName")
                )
                startActivity(intent)
            } else {
                Toast.makeText(this, "Android 10 বা নিচে এটা লাগবে না", Toast.LENGTH_SHORT).show()
            }
        })

        resultsBox = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(0, 32, 0, 0)
        }
        root.addView(resultsBox)

        setContentView(ScrollView(this).apply { addView(root) })

        createChannel()
        requestRuntimePermissions()
        updateStatus()
    }

    private fun button(label: String, onClick: () -> Unit): Button =
        Button(this).apply {
            text = label
            setOnClickListener { onClick() }
            setPadding(0, 16, 0, 16)
        }

    private fun requestRuntimePermissions() {
        val needed = mutableListOf<String>()
        if (Build.VERSION.SDK_INT >= 33) {
            needed += Manifest.permission.READ_MEDIA_IMAGES
            needed += Manifest.permission.READ_MEDIA_VIDEO
            needed += Manifest.permission.POST_NOTIFICATIONS
        } else {
            needed += Manifest.permission.READ_EXTERNAL_STORAGE
        }
        val missing = needed.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missing.isNotEmpty()) permLauncher.launch(missing.toTypedArray())
    }

    private fun updateStatus() {
        val sb = StringBuilder("স্ট্যাটাস:\n")
        val hasMedia = if (Build.VERSION.SDK_INT >= 33)
            ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) == PackageManager.PERMISSION_GRANTED
        else
            ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED
        sb.append("• মিডিয়া পড়ার অনুমতি: ")
        sb.append(if (hasMedia) "✅\n" else "❌ (বাটনে চাপ দিন)\n")

        if (Build.VERSION.SDK_INT >= 30) {
            val allFiles = Environment.isExternalStorageManager()
            sb.append("• All Files Access: ")
            sb.append(if (allFiles) "✅\n" else "❌ (Android 11+ এ পুরো ডিভাইস স্ক্যানের জন্য দরকার)\n")
        } else {
            sb.append("• All Files Access: N/A (Android 10 বা নিচে দরকার নেই)\n")
        }
        status.text = sb.toString()
    }

    private fun runScan() {
        if (Build.VERSION.SDK_INT >= 30 && !Environment.isExternalStorageManager()) {
            Toast.makeText(this, "আগে All Files Access দিন", Toast.LENGTH_LONG).show()
            return
        }
        progress.visibility = View.VISIBLE
        resultsBox.removeAllViews()
        scope.launch {
            val results = withContext(Dispatchers.IO) {
                val roots = listOf(Environment.getExternalStorageDirectory())
                NsfwScanner.scan(roots, aggressive = true, maxDepth = 6) { scanned, found ->
                    runOnUiThread { progress.progress = scanned % 100 }
                }
            }
            progress.visibility = View.GONE
            if (results.isEmpty()) {
                resultsBox.addView(TextView(this@MainActivity).apply {
                    text = "কোনো ঝুঁকিপূর্ণ কন্টেন্ট পাওয়া যায়নি ✅"
                    textSize = 16f
                })
            } else {
                resultsBox.addView(TextView(this@MainActivity).apply {
                    text = "পাওয়া গেছে ${results.size}টি ফাইল:"
                    textSize = 18f
                    setPadding(0, 0, 0, 12)
                })
                results.forEach { r ->
                    resultsBox.addView(TextView(this@MainActivity).apply {
                        text = "• ${r.file.name}\n   ${r.reason}"
                        setPadding(0, 6, 0, 6)
                    })
                }
                ReportBuilder.save(this@MainActivity, ReportBuilder.buildFromScan(results))
            }
        }
    }

    private fun shareLatestReport() {
        val dir = getExternalFilesDir(null) ?: return
        val latest = dir.listFiles()?.filter { it.name.startsWith("report_") }?.maxByOrNull { it.lastModified() }
        if (latest == null) {
            Toast.makeText(this, "আগে একটি স্ক্যান চালান", Toast.LENGTH_SHORT).show()
        } else {
            ReportBuilder.share(this, latest)
        }
    }

    private fun createChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            val nm = getSystemService(NotificationManager::class.java)
            nm.createNotificationChannel(
                NotificationChannel("childguard_status", "ChildGuard Status", NotificationManager.IMPORTANCE_LOW)
            )
        }
    }

    override fun onDestroy() {
        scope.cancel()
        super.onDestroy()
    }
}
