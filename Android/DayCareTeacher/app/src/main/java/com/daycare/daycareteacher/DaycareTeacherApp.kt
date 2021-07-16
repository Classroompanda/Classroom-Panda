package com.daycare.daycareteacher

import android.app.Application
import com.danylovolokh.androidlogger.AndroidLogger
import com.daycare.daycareteacher.utill.PreferenceConnector
import java.io.File
import java.io.IOException

class DaycareTeacherApp : Application() {



    override fun onCreate() {
        super.onCreate()
        /* Instabug.Builder(this, "8bd5fd6f0a6aacae9f7e04b2e4c0d6a2")
             .setInvocationEvents(
                 InstabugInvocationEvent.SHAKE,
                 InstabugInvocationEvent.FLOATING_BUTTON)
             .build();*/
        val logsDirectory: File = AndroidLogger.getDefaultLogFilesDirectory(this)
        val logFileMaxSizeBytes = 2 * 1024 * 1024 // 2Mb

        try {
            AndroidLogger.initialize(
                this,
                logsDirectory,
                "Log_File_Name",
                logFileMaxSizeBytes,
                false
            )
        } catch (e: IOException) {
            // Some error happened - most likely there is no free space on the system
        }
    }
}