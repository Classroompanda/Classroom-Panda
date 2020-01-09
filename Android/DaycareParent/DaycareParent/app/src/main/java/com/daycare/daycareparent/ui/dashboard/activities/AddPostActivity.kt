package com.daycare.daycareparent.ui.dashboard.activities

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.databinding.DataBindingUtil
import android.graphics.Bitmap
import android.graphics.Matrix
import android.media.ExifInterface
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.util.Log
import android.view.View
import android.widget.VideoView
import com.ablanco.imageprovider.ImageProvider
import com.ablanco.imageprovider.ImageSource
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddPostActivityBinding
import com.daycare.daycareparent.model.StudentModel
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.fragments.postactivity.PostActivityViewModel
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.OptionConstant.VIEW_LOG
import kotlinx.android.synthetic.main.toolbar.view.*
import org.angmarch.views.NiceSpinner
import pub.devrel.easypermissions.EasyPermissions
import kotlin.collections.ArrayList

class AddPostActivity : AppCompatActivity() {

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
    final val REQUEST_VIDEO_CAPTURE: Int = 300;
    final val REQUEST_VIDEO_PICK: Int = 301;
    final val READ_REQUEST_CODE: Int = 200;
    lateinit var uri: Uri
    var pathToStoredVideo: String = ""
    lateinit var displayRecordedVideo: VideoView
    final var SERVER_PATH: String = ""
    lateinit var bitmapnew:Bitmap
    lateinit var bitmapnew2:Bitmap
    lateinit var bitmapnew3:Bitmap

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
                selectImage()
            }
        }

        binding.uploadVideo.setOnClickListener {
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
            selectVideo()
        }

        binding.deleteButtonImg1.setOnClickListener {
            imagePath1 = ""
            isImg1 = false
            binding.img1.setImageResource(R.drawable.ic_gallery)
            binding.deleteButtonImg1.visibility = View.GONE

        }
        binding.deleteButtonImg2.setOnClickListener {
            imagePath2 = ""
            isImg2 = false
            binding.img2.setImageResource(R.drawable.ic_gallery)
            binding.deleteButtonImg2.visibility = View.GONE

        }
        binding.deleteButtonImg3.setOnClickListener {
            imagePath3 = ""
            isImg3 = false
            binding.img3.setImageResource(R.drawable.ic_gallery)
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
                    viewModel.uploadImage(it, imagePath1, imagePath2, imagePath3)
                } else {
                    showToast(this, "Kindly select at least one image to upload")
                }
            } else {
                if (!pathToStoredVideo.isEmpty()) {
                    viewModel.uploadVideo(it,pathToStoredVideo)

                } else {
                    showToast(this, "Kindly select video")
                }
            }
        }


    }

    private fun selectImage() {
        val items = arrayOf<CharSequence>("Camera", "Gallery", "Cancel")
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Add Attachment")
        builder.setItems(items) { dialog, item ->
            try {
                if (items[item] == "Camera") {

                    ImageProvider(this).getImage(ImageSource.CAMERA) { bitmap ->
                        if (!isImg1) {

                            if (bitmap != null) {
                                isImg1 = true
                                imagePath1 = bitmapToFile(bitmap, this).toString()
                                bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath1=bitmapToFile(bitmapnew, this).toString()
                                binding.img1.setImageBitmap(bitmapnew)

                                binding.deleteButtonImg1.visibility = View.VISIBLE
                            } else {
                                isImg1 = false
                                binding.img1.setImageResource(R.drawable.ic_gallery)
                                imagePath1 = ""
                                binding.deleteButtonImg1.visibility = View.GONE
                            }
                        } else if (!isImg2) {
                           // binding.img2.setImageBitmap(bitmap)

                            if (bitmap != null) {
                                isImg2 = true
                                imagePath2 = bitmapToFile(bitmap, this).toString()
                                bitmapnew2 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath2=bitmapToFile(bitmapnew2, this).toString()
                                binding.img2.setImageBitmap(bitmapnew2)


                                binding.deleteButtonImg2.visibility = View.VISIBLE
                            } else {
                                isImg2 = false
                                binding.img2.setImageResource(R.drawable.ic_gallery)
                                imagePath2 = ""
                                binding.deleteButtonImg2.visibility = View.GONE
                            }
                        } else if (!isImg3) {
                           // binding.img3.setImageBitmap(bitmap)

                            if (bitmap != null) {
                                isImg3 = true
                                imagePath3 = bitmapToFile(bitmap, this).toString()

                                bitmapnew3 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath3=bitmapToFile(bitmapnew3, this).toString()
                                binding.img3.setImageBitmap(bitmapnew3)


                                binding.deleteButtonImg3.visibility = View.VISIBLE
                            } else {
                                isImg3 = false
                                binding.img3.setImageResource(R.drawable.ic_gallery)
                                binding.deleteButtonImg3.visibility = View.GONE
                                imagePath3 = ""
                            }
                        }


                        //  AppInstance.profileimagePath=imagePath
                    }


                } else if (items[item] == "Gallery") {
                    ImageProvider(this).getImage(ImageSource.GALLERY) { bitmap ->
                        if (!isImg1) {
                           // binding.img1.setImageBitmap(bitmap)

                            if (bitmap != null) {
                                isImg1 = true
                                imagePath1 = bitmapToFile(bitmap, this).toString()
                                bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath1=bitmapToFile(bitmapnew, this).toString()
                                binding.img1.setImageBitmap(bitmapnew)


                                binding.deleteButtonImg1.visibility = View.VISIBLE
                            } else {
                                isImg1 = false
                                binding.img1.setImageResource(R.drawable.ic_gallery)
                                imagePath1 = ""
                                binding.deleteButtonImg1.visibility = View.GONE
                            }
                        } else if (!isImg2) {
                            //binding.img2.setImageBitmap(bitmap)

                            if (bitmap != null) {
                                isImg2 = true
                                imagePath2 = bitmapToFile(bitmap, this).toString()
                                bitmapnew2 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath2=bitmapToFile(bitmapnew2, this).toString()
                                binding.img2.setImageBitmap(bitmapnew2)


                                binding.deleteButtonImg2.visibility = View.VISIBLE
                            } else {
                                isImg2 = false
                                binding.img2.setImageResource(R.drawable.ic_gallery)
                                imagePath2 = ""
                                binding.deleteButtonImg2.visibility = View.GONE
                            }
                        } else if (!isImg3) {
                           // binding.img3.setImageBitmap(bitmap)

                            if (bitmap != null) {
                                isImg3 = true
                                imagePath3 = bitmapToFile(bitmap, this).toString()

                                bitmapnew3 = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                                imagePath3=bitmapToFile(bitmapnew3, this).toString()
                                binding.img3.setImageBitmap(bitmapnew3)


                                binding.deleteButtonImg3.visibility = View.VISIBLE
                            } else {
                                isImg3 = true
                                binding.img3.setImageResource(R.drawable.ic_gallery)
                                imagePath3 = ""
                                binding.deleteButtonImg3.visibility = View.GONE
                            }
                        }
                    }


                } else if (items[item] == "Cancel") {
                    dialog.dismiss()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        builder.show()

    }

  /*  private  Bitmap rotateImageIfRequired(Bitmap img, Uri selectedImage) throws IOException {

        ExifInterface ei = new ExifInterface(selectedImage.getPath());
        int orientation = ei.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);

        switch (orientation) {
            case ExifInterface.ORIENTATION_ROTATE_90:
            return rotateImage(img, 90);
            case ExifInterface.ORIENTATION_ROTATE_180:
            return rotateImage(img, 180);
            case ExifInterface.ORIENTATION_ROTATE_270:
            return rotateImage(img, 270);
            default:
            return img;
        }*/


    fun rotateImageIfRequired(img:Bitmap,selectedImage:Uri):Bitmap{
        val exifInterface = ExifInterface(selectedImage.getPath())
        val exifR : Int = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_UNDEFINED);
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


                val galleryIntent = Intent(
                    Intent.ACTION_PICK,
                    android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI
                )
                //galleryIntent.putExtra(MediaStore.EXTRA_SIZE_LIMIT, );
                startActivityForResult(galleryIntent, REQUEST_VIDEO_PICK)


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
                    AppInstance.allStudents = it
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

        if (requestCode == REQUEST_VIDEO_CAPTURE && resultCode == Activity.RESULT_OK) {
            uri = data?.getData()!!
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


        } else if (requestCode == REQUEST_VIDEO_PICK && resultCode == Activity.RESULT_OK) {
            Log.d("what", "gale");
            if (data != null) {
                uri = data.getData();

                pathToStoredVideo = getRealPathFromURIPath(uri, this).toString()
                Log.d("VIDEOActivity", "Recorded Video Path " + pathToStoredVideo);


            }

        } else {
            showToast(this, "Something wrong")
        }

    }

    private fun getRealPathFromURIPath(contentURI: Uri, activity: Activity): String? {
        val cursor = activity.contentResolver.query(contentURI, null, null, null, null)
        if (cursor == null) {
            return contentURI.path
        } else {
            cursor.moveToFirst()
            val idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA)
            return cursor.getString(idx)
        }
    }

}