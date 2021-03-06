package com.daycare.daycareteacher.ui.dashboard.activities

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Matrix
import android.media.ExifInterface
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.View
import android.webkit.MimeTypeMap
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.callback.FFMpegCallback
import com.daycare.daycareteacher.databinding.ActivityAddPostActivityBinding
import com.daycare.daycareteacher.model.StudentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.ImagePickerActivity.showImagePickerOptions
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG
import com.github.hiteshsondhi88.libffmpeg.FFmpeg
import com.gowtham.library.utils.TrimType
import com.gowtham.library.utils.TrimVideo
import com.karumi.dexter.Dexter
import com.karumi.dexter.MultiplePermissionsReport
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.multi.MultiplePermissionsListener
import kotlinx.android.synthetic.main.activity_add_post_activity.*
import kotlinx.android.synthetic.main.toolbar.view.*
import org.angmarch.views.NiceSpinner
import pub.devrel.easypermissions.EasyPermissions
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class AddPostActivity : AppCompatActivity() , FFMpegCallback {
    lateinit var binding: ActivityAddPostActivityBinding
    var viewModel = PostActivityViewModel()
    var loader = Loader()
    private lateinit var niceSpinner: NiceSpinner
    private var involvedStudents = ArrayList<String>()
    lateinit var toolbar: Toolbar
    var TASK_ID = VIEW_LOG
    var add_post_flag: String = ""
    var isImg1: Boolean = false
    var isImg2: Boolean = false
    var isImg3: Boolean = false
    var imagePath1: String = ""
    var imagePath2: String = ""
    var imagePath3: String = ""
    val REQUEST_VIDEO_CAPTURE: Int = 300
    val REQUEST_VIDEO_PICK: Int = 301
    val READ_REQUEST_CODE: Int = 200
    lateinit var uri: Uri
    lateinit var bitmap:Bitmap
    var pathToStoredVideo: String = ""
    var pathOfGalleryFile : File ? = null
    lateinit var bitmapnew:Bitmap
    lateinit var bitmapnew2:Bitmap
    lateinit var bitmapnew3:Bitmap

    val REQUEST_IMAGE=501

    private fun checkRuntimePermissions() {
        Dexter.withActivity(this)
            .withPermissions(
                Manifest.permission.CAMERA,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE)
            .withListener(object : MultiplePermissionsListener {
                override fun onPermissionsChecked(report: MultiplePermissionsReport) {
                    // check if all permissions are granted
                    if (report.areAllPermissionsGranted()) {
                        // all permissions granted
                        selectVideo()
                    }

                    // check for permanent denial of any permission
                    if (report.isAnyPermissionPermanentlyDenied) {
                        // permission is denied permanently,  you can navigate user to app settings
                        showToast(this@AddPostActivity,"Permissions Denied")
                    }
                }

                override fun onPermissionRationaleShouldBeShown(
                    permissions: List<PermissionRequest?>?,
                    token: PermissionToken
                ) {
                    token.continuePermissionRequest()
                }
            })
            .onSameThread()
            .check()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_post_activity)
        viewModel = PostActivityViewModel(binding.spinnerClassName)
        binding.viewModel = viewModel

        add_post_flag = intent.getStringExtra(POST_DATA)
        if (add_post_flag != "") {
            if (add_post_flag.equals("CAMERA")) {
                binding.textView3.setText("Upload Image")
                binding.imageLyt1.visibility = View.VISIBLE
                binding.videoLyt1.visibility = View.GONE
            } else {
                binding.textView3.setText("Upload Video")
                binding.imageLyt1.visibility = View.GONE
                binding.videoLyt1.visibility = View.VISIBLE
            }
        }

        hideVirtualKeyboard(this)
        setUpToolBar()
        attachObserver(viewModel, this)
        initView()
    }

    private fun initView() {
        binding.img3.setOnClickListener {

            if (isImg1 && isImg2 && isImg3) {
                showToast(this, "Max 3 image to be selected")
            } else {
                if (ContextCompat.checkSelfPermission(
                        (this as Activity),
                        Manifest.permission.CAMERA
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    ActivityCompat.requestPermissions((this as Activity), arrayOf(Manifest.permission.CAMERA), 1001)
                    //return
                }

                if (ContextCompat.checkSelfPermission(
                        (this as Activity),
                        Manifest.permission.WRITE_EXTERNAL_STORAGE
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    ActivityCompat.requestPermissions(
                        (this as Activity),
                        arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE),
                        1002
                    )
                    //return
                }
                if (ContextCompat.checkSelfPermission(
                        (this as Activity),
                        Manifest.permission.READ_EXTERNAL_STORAGE
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    ActivityCompat.requestPermissions(
                        (this as Activity),
                        arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE),
                        1003
                    )
                    //return
                }
                imagePickerCall()
            }
        }

        binding.uploadVideo.setOnClickListener {

            checkRuntimePermissions()
        }

        binding.deleteButtonImg1.setOnClickListener {
            imagePath1 = ""
            isImg1 = false
            binding.img1.setImageResource(R.drawable.ic_menu_gallery)
            binding.deleteButtonImg1.visibility = View.GONE

        }
        binding.deleteButtonImg2.setOnClickListener {
            imagePath2 = ""
            isImg2 = false
            binding.img2.setImageResource(R.drawable.ic_menu_gallery)
            binding.deleteButtonImg2.visibility = View.GONE

        }
        binding.deleteButtonImg3.setOnClickListener {
            imagePath3 = ""
            isImg3 = false
            binding.img3.setImageResource(R.drawable.ic_menu_gallery)
            binding.deleteButtonImg3.visibility = View.GONE

        }

        binding.tvParticipant.setOnClickListener {
            if (AppInstance.allStudents != null) {
                viewModel.multipleSelectDialog(binding.tvParticipant, AppInstance.allStudents as StudentModel)
            }
        }

        binding.btnAddPost.setOnClickListener {
            if (add_post_flag.equals("CAMERA")) {
                if (!imagePath1.isEmpty() || !imagePath2.isEmpty() || !imagePath3.isEmpty()) {
                    if(!titleedt.text.isEmpty() && !edtincidentplace.text.isEmpty()) {
                        if(viewModel.selectedStudentsList.size>0) {
                            viewModel.uploadImage(it, imagePath1, imagePath2, imagePath3)
                        }else{
                            showToast(this, "Please select student")
                        }
                    }else{
                        if(titleedt.text.isEmpty()){
                            showToast(this, "Please add title")
                        }else if(edtincidentplace.text.isEmpty()){
                            showToast(this, "Please add description")
                        }
                    }
                } else {
                    showToast(this, "Kindly select at least one image to upload")
                }
            } else {
                if (!pathToStoredVideo.isEmpty()) {
                    if(!titleedt.text.isEmpty() && !edtincidentplace.text.isEmpty()) {

                        if(pathOfGalleryFile!=null) {
                            if(viewModel.selectedStudentsList.size>0) {
                                viewModel.uploadVideo(it,pathToStoredVideo,null)
                            }else{
                                showToast(this, "Please select student")
                            }

//                               if(pathOfGalleryFile!!.length() < 314572800){  // 10.6 MB
//                                  // viewModel.uploadVideo(it,"", pathOfGalleryFile)
//                                   viewModel.uploadVideo(it,pathToStoredVideo,null)
//
//                               }else{
//                                   showToast(this,"File is too large to upload")
//                               }

                        }else{
                            viewModel.uploadVideo(it,pathToStoredVideo,null)
                        }

                    }else{
                        if(titleedt.text.isEmpty()){
                            showToast(this, "Please add title")
                        }else if(edtincidentplace.text.isEmpty()){
                            showToast(this, "Please add description")
                        }
                    }
                } else {
                    showToast(this, "Kindly select video")
                }
            }

        }
    }

    private fun imagePickerCall() {
        Dexter.withActivity(this)
            .withPermissions(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
            .withListener(object : MultiplePermissionsListener {
                override fun onPermissionsChecked(report: MultiplePermissionsReport) {
                    if (report.areAllPermissionsGranted()) {
                        showImagePickerOptions()
                    } else {
                        // TODO - handle permission denied case
                        showToast(this@AddPostActivity,"Please provide permission for camera and storage.")
                    }
                }

                override fun onPermissionRationaleShouldBeShown(
                    permissions: List<PermissionRequest>,
                    token: PermissionToken
                ) {
                    token.continuePermissionRequest()
                }
            }).check()
    }

    //Select Gallery or camera option
    private fun showImagePickerOptions() {
        showImagePickerOptions(this, object : ImagePickerActivity.PickerOptionListener {
            override fun onTakeCameraSelected() {
                launchCameraIntent()
            }

            override fun onChooseGallerySelected() {
                launchGalleryIntent()
            }
        })
    }

    //Camera Option
    private fun launchCameraIntent() {
        val intent = Intent(this@AddPostActivity, ImagePickerActivity::class.java)
        intent.putExtra(ImagePickerActivity.INTENT_IMAGE_PICKER_OPTION, ImagePickerActivity.REQUEST_IMAGE_CAPTURE)

        // setting aspect ratio
        intent.putExtra(ImagePickerActivity.INTENT_LOCK_ASPECT_RATIO, true)
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_X, 1) // 16x9, 1x1, 3:4, 3:2
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_Y, 1)

        // setting maximum bitmap width and height
        intent.putExtra(ImagePickerActivity.INTENT_SET_BITMAP_MAX_WIDTH_HEIGHT, true)
        intent.putExtra(ImagePickerActivity.INTENT_BITMAP_MAX_WIDTH, 1000)
        intent.putExtra(ImagePickerActivity.INTENT_BITMAP_MAX_HEIGHT, 1000)

        startActivityForResult(intent, REQUEST_IMAGE)
    }

    //Gallery Option
    private fun launchGalleryIntent() {
        val intent = Intent(this@AddPostActivity, ImagePickerActivity::class.java)
        intent.putExtra(ImagePickerActivity.INTENT_IMAGE_PICKER_OPTION, ImagePickerActivity.REQUEST_GALLERY_IMAGE)

        // setting aspect ratio
        intent.putExtra(ImagePickerActivity.INTENT_LOCK_ASPECT_RATIO, true)
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_X, 1) // 16x9, 1x1, 3:4, 3:2
        intent.putExtra(ImagePickerActivity.INTENT_ASPECT_RATIO_Y, 1)
        startActivityForResult(intent, REQUEST_IMAGE)
    }

    private fun loadProfile(url:String, bitmap:Bitmap) {
        Log.d("TAG", "Image cache path: " + url);

        if (!isImg1) {

            if (url != null) {
                isImg1 = true
                bitmapnew=bitmap
                Glide.with(this@AddPostActivity)
                    .load(url)
                    .placeholder(R.drawable.ic_placeholder)
                    .into(binding.img1)

                // imagePath1=url
                imagePath1=bitmapToFile(bitmapnew, this).toString()
/*
              imagePath1 = bitmapToFile(bitmap, this).toString()
              bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
              imagePath1=bitmapToFile(bitmapnew, this).toString()
              binding.img1.setImageBitmap(bitmapnew)*/

                binding.deleteButtonImg1.visibility = View.VISIBLE
            } else {
                isImg1 = false
                binding.img1.setImageResource(R.drawable.ic_menu_gallery)
                imagePath1 = ""
                binding.deleteButtonImg1.visibility = View.GONE
            }
        } else if (!isImg2) {
            // binding.img2.setImageBitmap(bitmap)

            if (url != null) {
                isImg2 = true
                bitmapnew2=bitmap
                /* imagePath2 = bitmapToFile(bitmap, this).toString()
                 bitmapnew2 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                 imagePath2=bitmapToFile(bitmapnew2, this).toString()
                 binding.img2.setImageBitmap(bitmapnew2)*/

                Glide.with(this@AddPostActivity)
                    .load(url)
                    .placeholder(R.drawable.ic_placeholder)
                    .into(binding.img2)


                imagePath2=bitmapToFile(bitmapnew2, this).toString()
                binding.deleteButtonImg2.visibility = View.VISIBLE
            } else {
                isImg2 = false
                binding.img2.setImageResource(R.drawable.ic_menu_gallery)
                imagePath2 = ""
                binding.deleteButtonImg2.visibility = View.GONE
            }
        } else if (!isImg3) {
            // binding.img3.setImageBitmap(bitmap)

            if (bitmap != null) {
                isImg3 = true
                bitmapnew3=bitmap
                /* imagePath3 = bitmapToFile(bitmap, this).toString()

                 bitmapnew3 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                 imagePath3=bitmapToFile(bitmapnew3, this).toString()
                 binding.img3.setImageBitmap(bitmapnew3)*/

                Glide.with(this@AddPostActivity)
                    .load(url)
                    .placeholder(R.drawable.ic_placeholder)
                    .into(binding.img3)

                imagePath3=url
                imagePath3=bitmapToFile(bitmapnew3, this).toString()

                binding.deleteButtonImg3.visibility = View.VISIBLE
            } else {
                isImg3 = false
                binding.img3.setImageResource(R.drawable.ic_menu_gallery)
                binding.deleteButtonImg3.visibility = View.GONE
                imagePath3 = ""
            }
        }




    }

    @SuppressLint("NewApi")
    fun rotateImageIfRequired(img:Bitmap, selectedImage:Uri):Bitmap{
        val exifInterface = ExifInterface(selectedImage.getPath())
        val exifR : Int = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
        val orientation : Float =
            when (exifR) {
                ExifInterface.ORIENTATION_ROTATE_90 ->  90f
                ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                else -> 0f
            }

        val mat : Matrix? = Matrix()
        mat?.postRotate(orientation)
        return Bitmap.createBitmap(img as Bitmap, 0, 0, img?.getWidth() as Int,
            img?.getHeight() as Int, mat, true)
    }



    private fun selectVideo() {
        val items = arrayOf<CharSequence>("Camera", "Gallery", "Cancel")
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Add Attachment")
        builder.setItems(items) { dialog, item ->

            if (items[item] == "Camera") {
                val videoCaptureIntent = Intent(MediaStore.ACTION_VIDEO_CAPTURE)
                videoCaptureIntent.putExtra(MediaStore.EXTRA_DURATION_LIMIT, 20);

                if (videoCaptureIntent.resolveActivity(packageManager) != null) {
                    startActivityForResult(videoCaptureIntent, REQUEST_VIDEO_CAPTURE)
                }
            } else if (items[item] == "Gallery") {
                try {
                    /* val intent = Intent(
                         Intent.ACTION_PICK,
                         android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI
                                             startActivityForResult(intent, REQUEST_VIDEO_PICK)

                     )*/

                    val intent = Intent("android.intent.action.GET_CONTENT")
                    intent.addCategory("android.intent.category.OPENABLE")
                    intent.type = "video/*"
                    startActivityForResult(intent, REQUEST_VIDEO_PICK)

                }catch (e: Exception){
                    e.printStackTrace()
                }
            }
        }
        builder.show()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.add_post_activity)
        if (TASK_ID == EDIT) {
            toolbar.headerTxt.text = getString(R.string.update_incident)
        }

        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    override fun onBackPressed() {
        // When the user hits the back button set the resultCode
        // as Activity.RESULT_CANCELED to indicate a failure
        setResult(Activity.RESULT_CANCELED)
        super.onBackPressed()
        finish()
    }

    private fun attachObserver(viewModel: PostActivityViewModel, context: Context) {

        viewModel.studentApiResponse.observe(this, Observer<StudentModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {
                    AppInstance.allStudents = null
                    AppInstance.allStudents = it
                    binding.selectedStudents.visibility = View.GONE

                    //viewModel.multipleSelectDialog(binding.tvParticipant, it)
                } else {

                }
            }
        })


        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })

        viewModel.allInvolvedStudent.observe(this, Observer<ArrayList<String>> { it ->
            it?.let {
                if (it.size > 0) {
                    involvedStudents = it
                    var stds = ""
                    for (i: Int in 0 until it.size) {
                        stds += if (i == it.size - 1) {
                            it[i]
                        } else {
                            it[i] + ", "
                        }
                    }

                    binding.selectedStudents.text = stds
                    binding.selectedStudents.visibility = View.VISIBLE
                } else {
                    binding.selectedStudents.visibility = View.GONE
                }
            }

        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == REQUEST_IMAGE) {
            if (resultCode == Activity.RESULT_OK) {
                uri = data?.getParcelableExtra("path")!!;
                try {
                    // You can update this bitmap to your server
                    bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri)

                    // loading profile image from local cache
                    loadProfile(uri.toString(),bitmap);
                } catch ( e: IOException) {
                    e.printStackTrace();
                }
            }
        }


        if (requestCode == REQUEST_VIDEO_CAPTURE && resultCode == Activity.RESULT_OK) {
            uri = data?.getData()!!
            Log.d("Video","Video capture " + uri)
            if (EasyPermissions.hasPermissions(this, android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
                binding.uploadVideo.setImageResource(R.mipmap.ic_play)
                pathToStoredVideo = getRealPathFromURIPath(uri, this).toString()
                Log.d("VIDEOActivity", "Recorded Video Path " + pathToStoredVideo);

            } else {
                EasyPermissions.requestPermissions(
                    this,
                    getString(R.string.read_file),
                    READ_REQUEST_CODE,
                    Manifest.permission.READ_EXTERNAL_STORAGE
                );
            }


        }
        if (requestCode === TrimVideo.VIDEO_TRIMMER_REQ_CODE && data != null) {
            val uri = Uri.parse(TrimVideo.getTrimmedVideoPath(data))
            // Log.d(FragmentActivity.TAG, "Trimmed path:: $uri")

            val file= File(uri.path)
            pathOfGalleryFile = file
            pathToStoredVideo =  file.path
        }

        else if (requestCode == REQUEST_VIDEO_PICK && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                uri = data.getData()!!
                Log.d("Video","uri is :"+ uri)

                /*  pathToStoredVideo = getRealPathFromURIPath(uri, this).toString()
                  if(pathToStoredVideo.isEmpty()){*/
                uri?.let {
                    val inputStream = contentResolver.openInputStream(uri)
                    val mime = MimeTypeMap.getSingleton()
                    val type = mime.getExtensionFromMimeType(contentResolver.getType(uri))
                    val file = ImageUtils.getZifFileName(this@AddPostActivity, type)
                    val outputStream = FileOutputStream(file)
                    inputStream.use {
                        outputStream.use { output ->
                            it?.copyTo(output)
                        }
                    }
                    pathOfGalleryFile = file
                    pathToStoredVideo =  file.path

                    TrimVideo.activity(data.data.toString())
                        // .setAccurateCut(false)
                        //.setCompressOption( CompressOption(30,"1M",460,320))
                        .setTrimType(TrimType.FIXED_DURATION)
                        .setFixedDuration(20)   //seconds
                        .start(this)

                }
                //  }

                Log.d("VIDEOActivity", "Recorded Video Path " + pathToStoredVideo);
            }

        } else {
//            showToast(this, "Something wrong")
        }
    }

    private fun getRealPathFromURIPath(contentURI: Uri, activity: Activity): String? {
        val cursor = activity.contentResolver.query(contentURI,
            null, null, null, null)
        if (cursor == null) {
            return contentURI.path
        } else {
            cursor.moveToFirst()
            val idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA)
            return cursor.getString(idx)
        }
    }

    private fun isRunning(): Boolean {
        return FFmpeg.getInstance(this).isFFmpegCommandRunning
    }

    override fun onProgress(progress: String) {
    }


    override fun onSuccess(convertedFile: File, type: String) {
        Toast.makeText(this, "Video Compressed!", Toast.LENGTH_SHORT).show()
    }

    override fun onFailure(error: Exception) {
        error.printStackTrace()
        Toast.makeText(this, "Error: ${error.message}", Toast.LENGTH_SHORT).show()

    }

    override fun onFinish() {
    }

    override fun onNotAvailable(error: Exception) {
        Toast.makeText(this, "Error: ${error.message}", Toast.LENGTH_SHORT).show()

    }

    companion object {

        fun with(context: Context): VideoResizer {
            return VideoResizer(context)
        }
    }

}