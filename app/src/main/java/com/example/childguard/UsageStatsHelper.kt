package com.example.childguard

import android.app.usage.UsageStatsManager
import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

object UsageStatsHelper {

    fun snapshot(context: Context): String {
        val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val end = System.currentTimeMillis()
        val start = end - 24 * 60 * 60 * 1000L
        val stats = usm.queryAndAggregateUsageStats(start, end)

        val arr = JSONArray()
        stats.values
            .sortedByDescending { it.totalTimeInForeground }
            .take(20)
            .forEach { s ->
                if (s.totalTimeInForeground > 0) {
                    arr.put(JSONObject()
                        .put("package", s.packageName)
                        .put("activeMs", s.totalTimeInForeground)
                        .put("lastUsed", s.lastTimeUsed))
                }
            }
        return JSONObject()
            .put("day", start)
            .put("topApps", arr)
            .toString(2)
    }
}
