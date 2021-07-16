package com.daycare.daycareteacher.utill

import android.util.Log
import com.danylovolokh.androidlogger.AndroidLogger

abstract class LoggerWrapper {

    fun v(TAG: String?, message: String?): Int {
        Log.v(TAG, message)
        return AndroidLogger.v(TAG, message)
    }

    fun d(TAG: String?, message: String?): Int {
        Log.d(TAG, message)
        return AndroidLogger.d(TAG, message)
    }

    fun inf(TAG: String?, message: String?): Int {
        Log.i(TAG, message)
        return AndroidLogger.i(TAG, message)
    }

    fun w(TAG: String?, message: String?): Int {
        Log.w(TAG, message)
        return AndroidLogger.w(TAG, message)
    }

    fun err(TAG: String?, message: String?): Int {
        Log.e(TAG, message)
        return AndroidLogger.e(TAG, message)
    }
}