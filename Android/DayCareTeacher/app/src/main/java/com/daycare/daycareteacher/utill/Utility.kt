package com.daycare.daycareteacher.utill

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.DialogInterface
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Matrix
import android.media.ExifInterface
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.telephony.TelephonyManager
import android.text.TextUtils
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.WindowManager
import android.view.inputmethod.InputMethodManager
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.daycare.daycareteacher.R
import com.nostra13.universalimageloader.core.DisplayImageOptions
import com.nostra13.universalimageloader.core.ImageLoader
import com.nostra13.universalimageloader.core.assist.FailReason
import com.nostra13.universalimageloader.core.listener.SimpleImageLoadingListener
import org.json.JSONObject
import java.io.*
import java.text.SimpleDateFormat
import java.util.*
import java.util.regex.Pattern

/**
 * it contain all the common methods that are uses as per requirement
 */




fun getDeviceName(): String? {
    val manufacturer: String = Build.MANUFACTURER
    val model: String = Build.MODEL
    return if (model.startsWith(manufacturer)) {
        capitalize(model)
    } else capitalize(manufacturer) + " " + model
}

fun capitalize(str: String): String {
    if (TextUtils.isEmpty(str)) {
        return str
    }
    val arr = str.toCharArray()
    var capitalizeNext = true
    val phrase = StringBuilder()
    for (c in arr) {
        if (capitalizeNext && Character.isLetter(c)) {
            phrase.append(Character.toUpperCase(c))
            capitalizeNext = false
            continue
        } else if (Character.isWhitespace(c)) {
            capitalizeNext = true
        }
        phrase.append(c)
    }
    return phrase.toString()
}

fun isPasswordValid(input: CharSequence): Boolean {
    val p = Pattern.compile("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$&*]).*$", Pattern.CASE_INSENSITIVE)
    val m = p.matcher(input)
    return m.matches()
}



fun showToast(context: Context, message: String) {
    val toast = Toast.makeText(context, message, Toast.LENGTH_SHORT)
    toast.setGravity(Gravity.CENTER, 0, 0)
    toast.show()
}

fun showDialog(context: Context, title: String, message: String) {
    AlertDialog.Builder(context)
        .setTitle(title)
        .setMessage(message)
        .setPositiveButton(
            context.getString(R.string.abc_action_mode_done),
            DialogInterface.OnClickListener { dialog, which -> dialog.dismiss() })
        .show()
}

fun getFileFromBitmap(context: Context, bitmap: Bitmap): String {

    val f = File(context.getExternalFilesDir(Environment.DIRECTORY_PICTURES),
        "sign.jpg")

    if(f.exists())
        f.delete()

    try {
        f.createNewFile()
    } catch (e: IOException) {
        e.printStackTrace()
    }

    //Convert bitmap to byte array

    val bos = ByteArrayOutputStream()
    bitmap.compress(Bitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, bos)
    val bitmapdata = bos.toByteArray()

    //write the bytes in file
    var fos: FileOutputStream? = null
    try {
        fos = FileOutputStream(f)
        fos!!.write(bitmapdata)
        fos.flush()
        fos.close()
    } catch (e: FileNotFoundException) {
        e.printStackTrace()
    } catch (e: IOException) {
        e.printStackTrace()
    }

    return f.absolutePath;
}

fun bitmapToFile(bitmap: Bitmap, context: Context): Uri {
    // Get the context wrapper
    val dateFormat = SimpleDateFormat("yyyyMMdd_HH_mm_ss")
    val currentTimeStamp = dateFormat.format(Date())
    val wrapper = ContextWrapper(context)

    // Initialize a new file instance to save bitmap object
    var file = wrapper.getDir("Images",Context.MODE_PRIVATE)
    file = File(file,"$currentTimeStamp.jpg")

    var bitmapNew = bitmap

    try{
        val imageRotation: Int = getImageRotation(file)
        if (imageRotation != 0)
            bitmapNew = getBitmapRotatedByDegree(bitmap, imageRotation)!!

        // Compress the bitmap and save in jpg format
        val stream: OutputStream = FileOutputStream(file)
        bitmapNew.compress(Bitmap.CompressFormat.JPEG,70,stream)
        stream.flush()
        stream.close()
    }catch (e: IOException){
        e.printStackTrace()
    }

    // Return the saved bitmap uri
    return Uri.parse(file.absolutePath)
}

fun getBitmapRotatedByDegree(bitmap: Bitmap, rotationDegree: Int): Bitmap? {
    val matrix = Matrix()
    matrix.preRotate(rotationDegree.toFloat())
    return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
}

fun getImageRotation(imageFile: File): Int {
    var exif: ExifInterface? = null
    var exifRotation = 0
    try {
        exif = ExifInterface(imageFile.path)
        exifRotation = exif.getAttributeInt(
            ExifInterface.TAG_ORIENTATION,
            ExifInterface.ORIENTATION_NORMAL
        )
    } catch (e: IOException) {
        e.printStackTrace()
    }
    return if (exif == null) 0 else exifToDegrees(exifRotation)
}

private fun exifToDegrees(rotation: Int): Int {
    if (rotation == ExifInterface.ORIENTATION_ROTATE_90) return 90 else if (rotation == ExifInterface.ORIENTATION_ROTATE_180) return 180 else if (rotation == ExifInterface.ORIENTATION_ROTATE_270) return 270
    return 0
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


fun getUserNameInitial(userName: String): String {
    var nameInitial = ""
    if (!userName.isEmpty()) {
        val name = userName.split(" ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        if (name.size > 1) {
            nameInitial = name[0].substring(0, 1) + name[1].substring(0, 1)
        } else if (name.size == 1) {
            nameInitial = name[0].substring(0, 1)
        }
    }
    return nameInitial.toUpperCase()
}


fun byteArrayConverter(bitmap: Bitmap): ByteArray? {
    val stream = ByteArrayOutputStream()
    bitmap.compress(Bitmap.CompressFormat.PNG, 10, stream)
    return stream.toByteArray()
}

fun scaleDownBitmap(photo: Bitmap, newHeight: Int, context: Context): Bitmap? {
    val densityMultiplier = context.resources.displayMetrics.density

    val h: Int = (newHeight * densityMultiplier).toInt()
    val w: Int = (h * photo.width / (photo.height).toDouble()).toInt()

    return Bitmap.createScaledBitmap(photo, w, h, true)
}



/**
 * This method is used to get formatted date
 *
 * @param smsTimeInMillis contains time in milliseconds
 * @return returns today, yesterday or date
 */
fun getFormattedDate(smsTimeInMillis: Long): String {
    val smsTime = Calendar.getInstance()
    smsTime.timeInMillis = smsTimeInMillis

    val now = Calendar.getInstance()

    if (now.get(Calendar.DATE) == smsTime.get(Calendar.DATE)) {
        return "Today "
    } else if (now.get(Calendar.DATE) - smsTime.get(Calendar.DATE) == 1) {
        return "Yesterday "
    } else {

        val mDate = Date(smsTimeInMillis)
        val sdf = SimpleDateFormat("MM/dd")
        return sdf.format(mDate)
    }
}


fun getDate(date: String): String {
    try {
        val dateL = java.lang.Long.valueOf(date)!!
        val mDate = Date(dateL)
        val sdf = SimpleDateFormat("h:mm a MM/dd")
        return sdf.format(mDate)
    } catch (e: Exception) {
        e.printStackTrace()
    }

    return ""
}


fun getDateStemp(date: String): Date {
    val dateL = java.lang.Long.valueOf(date)!!
    return Date(dateL)
}


fun dpToPx(dp: Float, context: Context): Float {
    return TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP, dp, context.resources.displayMetrics
    )


}


/**
 * pad -- used to change the date and month from single digit to double
 * digit value(9 to 09)
 *
 * @param c -- int value need to be pad
 * @return padded integer value
 */
fun pad(c: Int): String {
    return if (c >= 10)
        c.toString()
    else
        "0" + c.toString()
}


fun getRealPathFromURI(context: Context, contentUri: Uri): String {
    val cursor = context.contentResolver.query(contentUri, null, null, null, null)
    if (cursor == null) {
        return contentUri.path!!
    } else {
        cursor.moveToFirst()
        val idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA)
        return cursor.getString(idx)
    }
}

/*
fun compressImage(context: Context, imageUri: Uri): String {
    val filePath = getRealPathFromURI(context, imageUri)

    var scaledBitmap: Bitmap? = null
    val options = BitmapFactory.Options()
    options.inJustDecodeBounds = true
    var bmp = BitmapFactory.decodeFile(filePath, options)

    var actualHeight = options.outHeight//2988
    var actualWidth = options.outWidth //5312

    val maxHeight = 1200.0f
    val maxWidth = 1200.0f
    */
/*float maxHeight = 816.0f;
        float maxWidth = 612.0f;*//*

    var imgRatio = (actualWidth / actualHeight).toFloat()
    val maxRatio = maxWidth / maxHeight

    if (actualHeight > maxHeight || actualWidth > maxWidth) {
        if (imgRatio < maxRatio) {
            imgRatio = maxHeight / actualHeight
            actualWidth = (imgRatio * actualWidth).toInt()
            actualHeight = maxHeight.toInt()
        } else if (imgRatio > maxRatio) {
            imgRatio = maxWidth / actualWidth
            actualHeight = (imgRatio * actualHeight).toInt()
            actualWidth = maxWidth.toInt()
        } else {
            actualHeight = maxHeight.toInt()
            actualWidth = maxWidth.toInt()

        }
    }

    options.inSampleSize = calculateInSampleSize(options, actualWidth, actualHeight)
    options.inJustDecodeBounds = false
    options.inDither = false
    options.inPurgeable = true
    options.inInputShareable = true
    options.inTempStorage = ByteArray(16 * 1024)

    try {
        bmp = BitmapFactory.decodeFile(filePath, options)
    } catch (exception: OutOfMemoryError) {
        exception.printStackTrace()

    }

    try {
        scaledBitmap = Bitmap.createBitmap(actualWidth, actualHeight, Bitmap.Config.ARGB_8888)
    } catch (exception: OutOfMemoryError) {
        exception.printStackTrace()
    }

    val ratioX = actualWidth / options.outWidth.toFloat()
    val ratioY = actualHeight / options.outHeight.toFloat()
    val middleX = actualWidth / 2.0f
    val middleY = actualHeight / 2.0f

    val scaleMatrix = Matrix()
    scaleMatrix.setScale(ratioX, ratioY, middleX, middleY)

    val canvas = Canvas(scaledBitmap!!)
    canvas.matrix = scaleMatrix
    canvas.drawBitmap(bmp, middleX - bmp.width / 2, middleY - bmp.height / 2, Paint(Paint.FILTER_BITMAP_FLAG))


    val exif: ExifInterface
    try {
        exif = ExifInterface(filePath)

        val orientation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, 0)
        Log.d("EXIF", "Exif: $orientation")
        val matrix = Matrix()
        if (orientation == 6) {//|| orientation == 0) {
            matrix.postRotate(90f)
            Log.d("EXIF", "Exif: $orientation")
        }*/
/*else if (orientation == 0) {
                matrix.postRotate(0);
                Log.d("EXIF", "Exif: " + orientation);
            }  *//*

        else if (orientation == 3) {
            matrix.postRotate(180f)
            Log.d("EXIF", "Exif: $orientation")
        } else if (orientation == 8) {
            matrix.postRotate(270f)
            Log.d("EXIF", "Exif: $orientation")
        }
        scaledBitmap = Bitmap.createBitmap(scaledBitmap, 0, 0, scaledBitmap.width, scaledBitmap.height, matrix, true)
    } catch (e: IOException) {
        e.printStackTrace()
    }

    var out: FileOutputStream? = null
    val filename = getFilename()
    try {
        out = FileOutputStream(filename)
        scaledBitmap!!.compress(Bitmap.CompressFormat.JPEG, 80, out)

    } catch (e: FileNotFoundException) {
        e.printStackTrace()
    }

    return filename

}
*/

fun getFilename(): String {
    val file = File(Environment.getExternalStorageDirectory().path, "DayCare/Images")
    if (!file.exists()) {
        file.mkdirs()
    }
    return file.absolutePath + "/" + System.currentTimeMillis() + ".jpg"

}

/*
fun calculateInSampleSize(options: BitmapFactory.Options, reqWidth: Int, reqHeight: Int): Int {
    val height = options.outHeight
    val width = options.outWidth
    var inSampleSize = 1

    if (height > reqHeight || width > reqWidth) {
        val heightRatio = Math.round(height.toFloat() / reqHeight.toFloat())
        val widthRatio = Math.round(width.toFloat() / reqWidth.toFloat())
        inSampleSize = if (heightRatio < widthRatio) heightRatio else widthRatio
    }
    val totalPixels = (width * height).toFloat()
    val totalReqPixelsCap = (reqWidth * reqHeight * 2).toFloat()

    while (totalPixels / (inSampleSize * inSampleSize) > totalReqPixelsCap) {
        inSampleSize++
    }

    return inSampleSize
}
*/


fun setImage(
    imagePath: String,
    imageViewPatientImage: ImageView,
    option: DisplayImageOptions,
    progressBar: ProgressBar?,
    context: Context
) {
    ImageLoader.getInstance().displayImage(imagePath.trim { it <= ' ' },
        imageViewPatientImage,
        option,
        object : SimpleImageLoadingListener() {
            override fun onLoadingStarted(imageUri: String, view: View) {
                if (progressBar != null) {
                    progressBar.visibility = View.VISIBLE
                }
            }

            override fun onLoadingFailed(imageUri: String, view: View, failReason: FailReason) {}
            override fun onLoadingComplete(imageUri: String, view: View, loadedImage: Bitmap) {
                if (progressBar != null) {
                    progressBar.visibility = View.GONE
                }
            }
        })
}


fun isImageFile(imageType: String): Boolean {
    return if (imageType.equals("image/jpeg", ignoreCase = true) || imageType.equals(
            "image/jpg",
            ignoreCase = true
        ) || imageType.equals("image/png", ignoreCase = true) || imageType.equals("image/gif", ignoreCase = true)
    ) {
        true
    } else false
}


private fun openBrowser(link: String, context: Context) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        context.startActivity(intent)
    } catch (ex: Exception) {
        ex.printStackTrace()
    }

}


fun hideSoftKeyboard(context: Context, et: PinEntryEditTextLayout) {
    try {
        val imm = context.getSystemService(
            Context.INPUT_METHOD_SERVICE
        ) as InputMethodManager
        imm.hideSoftInputFromWindow(et.windowToken, 0)
    } catch (e: Exception) {
    }

}
fun hideVirtualKeyboard(mContext: Activity) {

    try {

        mContext.window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN)
    } catch (e: Exception) {

        e.printStackTrace()

    }

}

fun getUserCountry(context: Context): String {
    try {
        val tm = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val simCountry = tm.simCountryIso
        if (simCountry != null && simCountry.length == 2) { // SIM country code is available
            return simCountry.toLowerCase(Locale.US)
        } else if (tm.phoneType != TelephonyManager.PHONE_TYPE_CDMA) { // device is not 3G (would be unreliable)
            val networkCountry = tm.networkCountryIso
            if (networkCountry != null && networkCountry.length == 2) { // network country code is available
                return networkCountry.toLowerCase(Locale.US)
            }
        }
    } catch (e: Exception) {
    }

    return ""

}

fun saveImage(finalBitmap: Bitmap, mContext: Context): File {
    val path: File
    val root = Environment.getExternalStorageDirectory().toString()
    val myDir = File("$root/saved_images")

    myDir.mkdirs()
    val generator = Random()
    var n = 10000
    n = generator.nextInt(n)
    val fname = "Image-$n.jpg"
    val file = File(myDir, fname)
    path = file
    if (file.exists())
        file.delete()
    try {
        val out = FileOutputStream(file)
        finalBitmap.compress(Bitmap.CompressFormat.JPEG, 100, out)
        out.flush()
        out.close()
        Toast.makeText(mContext, "ScreenShot saved Succellfully", Toast.LENGTH_LONG).show()
        return path

    } catch (e: Exception) {
        e.printStackTrace()
    }

    return myDir
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
