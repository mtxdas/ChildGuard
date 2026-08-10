package com.example.childguard

import android.content.Context
import android.content.Intent
import androidx.core.content.FileProvider
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

object ReportBuilder {

    fun buildFromScan(results: List<NsfwScanner.ScanResult>): String {
        val arr = JSONArray()
        results.forEach { r ->
            arr.put(JSONObject()
                .put("path", r.file.absolutePath)
                .put("kind", r.kind)
                .put("reason", r.reason)
                .put("skinRatio", r.skinRatio))
        }
        return JSONObject()
            .put("app", "ChildGuard")
            .put("generatedAt", System.currentTimeMillis())
            .put("findings", arr)
            .toString(2)
    }

    fun save(context: Context, json: String): File {
        val f = File(context.getExternalFilesDir(null), "report_${System.currentTimeMillis()}.json")
        f.writeText(json)
        return f
    }

    fun share(context: Context, file: File) {
        val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
        val send = Intent(Intent.ACTION_SEND).apply {
            type = "application/json"
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        context.startActivity(Intent.createChooser(send, "রিপোর্ট পাঠান"))
    }
}
