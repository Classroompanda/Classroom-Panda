package com.daycare.kiosk.ui.dashboard

import android.Manifest
import android.app.Activity
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.daycare.kiosk.R
import com.daycare.kiosk.databinding.ActivitySignatureBinding
import com.github.gcacace.signaturepad.views.SignaturePad
import android.widget.Toast
import com.daycare.kiosk.utill.showToast
import android.content.pm.PackageManager
import android.os.Environment
import android.util.Log
import androidx.annotation.NonNull
import java.io.File
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Rect
import android.net.Uri
import androidx.appcompat.widget.Toolbar
import androidx.core.app.ActivityCompat
import com.daycare.kiosk.model.SignData
import com.daycare.kiosk.utill.AppInstance
import com.daycare.kiosk.utill.bitmapToFile
import kotlinx.android.synthetic.main.activity_dashboard_guideline.*
import java.io.FileOutputStream
import java.io.IOException


class SignatureActivity : AppCompatActivity() {

    lateinit var binding:ActivitySignatureBinding
    private val REQUEST_EXTERNAL_STORAGE = 1
    private val PERMISSIONS_STORAGE = arrayOf<String>(Manifest.permission.WRITE_EXTERNAL_STORAGE)
    private var mSignaturePad: SignaturePad? = null
    lateinit var toolbar: Toolbar
    lateinit var viewModel: DashboardViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this,R.layout.activity_signature)
        viewModel = DashboardViewModel()

        mSignaturePad =  binding.signaturePad

        mSignaturePad?.setOnSignedListener(object : SignaturePad.OnSignedListener {
            override fun onStartSigning() {
               showToast(this@SignatureActivity,"OnStartSigning")
            }

            override fun onSigned() {
                binding.saveButton.isEnabled = true
                binding.clearButton.isEnabled = true
            }

            override fun onClear() {
                binding.saveButton.isEnabled = false
                binding.clearButton.isEnabled = false
            }
        })
            binding.clearButton.setOnClickListener {

                mSignaturePad?.clear()
            }
        binding.saveButton.setOnClickListener {
            val signData  =SignData()
            signData.agencyID = AppInstance.logObj?.data?.agencyID.toString()
            signData.parentID = AppInstance.logObj?.data?.releventUserID.toString()

            val signatureBitmap = mSignaturePad?.signatureBitmap
//            if (signatureBitmap?.let { it1 -> addJpgSignatureToGallery(it1) }!!) {
//                Toast.makeText(this, "Signature saved into the Gallery", Toast.LENGTH_SHORT).show()
//            } else {
//                Toast.makeText(this, "Unable to store the signature", Toast.LENGTH_SHORT).show()
//            }
            viewModel.uploadImage(bitmapToFile(signatureBitmap, this).toString(),this, signData)
        }
        setUpToolBar()
    }
    private fun setUpToolBar() {
        toolbar = binding.toolbar2
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }
    override fun onRequestPermissionsResult(
        requestCode: Int,
        @NonNull permissions: Array<String>, @NonNull grantResults: IntArray
    ) {
        when (requestCode) {
            REQUEST_EXTERNAL_STORAGE -> {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.isEmpty() || grantResults[0] != PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "Cannot write images to external storage", Toast.LENGTH_SHORT)
                        .show()
                }
            }
        }
    }
    fun getAlbumStorageDir(albumName: String): File {
        // Get the directory for the user's public pictures directory.
        val file = File(
            Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES
            ), albumName
        )
        if (!file.mkdirs()) {
            Log.e("SignaturePad", "Directory not created")
        }
        return file
    }

    @Throws(IOException::class)
    fun saveBitmapToJPG(bitmap: Bitmap, photo: File) {
        val newBitmap = Bitmap.createBitmap(bitmap.width, bitmap.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(newBitmap)
        canvas.drawColor(Color.WHITE)
        val rectangle =Rect(0,0,100,100);
        canvas.drawBitmap(bitmap, null, rectangle, null)
        val stream = FileOutputStream(photo)
        newBitmap.compress(Bitmap.CompressFormat.JPEG, 80, stream)
        stream.close()
    }

    fun addJpgSignatureToGallery(signature: Bitmap): Boolean {
        var result = false
        try {
            val photo =
                File(getAlbumStorageDir("SignaturePad"), String.format("Signature_%d.jpg", System.currentTimeMillis()))
            saveBitmapToJPG(signature, photo)
            scanMediaFile(photo)
            result = true
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return result
    }

    private fun scanMediaFile(photo: File) {
        val mediaScanIntent = Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE)
        val contentUri = Uri.fromFile(photo)
        mediaScanIntent.data = contentUri
        this.sendBroadcast(mediaScanIntent)
    }
    fun verifyStoragePermissions(activity: Activity) {
        // Check if we have write permission
        val permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE)

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                activity,
                PERMISSIONS_STORAGE,
                REQUEST_EXTERNAL_STORAGE
            )
        }
    }
}
