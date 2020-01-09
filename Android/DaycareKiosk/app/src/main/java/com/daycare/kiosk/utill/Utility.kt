package com.daycare.kiosk.utill

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.ContextWrapper
import android.content.DialogInterface
import android.graphics.Bitmap
import android.net.ConnectivityManager
import android.net.NetworkInfo
import android.net.Uri
import android.view.Gravity
import android.view.WindowManager
import android.widget.Toast
import com.daycare.kiosk.R
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.OutputStream
import java.text.SimpleDateFormat
import java.util.*

fun showToast(context: Context, message: String) {
    val toast = Toast.makeText(context, message, Toast.LENGTH_LONG)
    toast.setGravity(Gravity.CENTER, 0, 0)
    toast.show()
}

fun showDialog(context: Context, title: String, message: String) {
    AlertDialog.Builder(context)
        .setTitle(title)
        .setMessage(message)
        .setPositiveButton(
            context.getString(R.string.ok),
            DialogInterface.OnClickListener { dialog, which -> dialog.dismiss() })
        .show()
}
fun parseError(result: String?): String {
    var errorDescription = ""
    try {
        if (result != null) {
            val jsonObjectResult = JSONObject(result)
            errorDescription = jsonObjectResult.getString("message")
        }
    } catch (ex: Exception) {
        ex.printStackTrace()
        errorDescription = result.toString()
    }

    return errorDescription

}
fun hideVirtualKeyboard(mContext: Activity) {

    try {

        mContext.window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN)
    } catch (e: Exception) {

        e.printStackTrace()

    }

}
fun isConnected(context: Context): Boolean {
    val cm: ConnectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val activeNetwork: NetworkInfo? = cm.activeNetworkInfo
    return activeNetwork != null && activeNetwork.isConnected
}
class Loader {
    private lateinit var progressDialogObj: TransparentProgressDialog
    fun startLoader(context: Context) {
        progressDialogObj = TransparentProgressDialog(context)
        //        AppInstance.logObj.printLog("startLoader=" + progressDialogObj);
        progressDialogObj.show()
    }

    fun stopLoader() {
        //        AppInstance.logObj.printLog("stopLoader=" + progressDialogObj);
        try {
            if (progressDialogObj.isShowing) {
                progressDialogObj.dismiss()

            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }
}
fun bitmapToFile(bitmap: Bitmap?, context: Context): Uri {
    // Get the context wrapper
    val dateFormat = SimpleDateFormat("yyyyMMdd_HH_mm_ss")
    val currentTimeStamp = dateFormat.format(Date())
    val wrapper = ContextWrapper(context)

    // Initialize a new file instance to save bitmap object
    var file = wrapper.getDir("Images", Context.MODE_PRIVATE)
    file = File(file, "$currentTimeStamp.jpg")

    try {
        // Compress the bitmap and save in jpg format
        val stream: OutputStream = FileOutputStream(file)
        bitmap?.compress(Bitmap.CompressFormat.JPEG, 80, stream)
        stream.flush()
        stream.close()
    } catch (e: IOException) {
        e.printStackTrace()
    }

    // Return the saved bitmap uri
    return Uri.parse(file.absolutePath)
}