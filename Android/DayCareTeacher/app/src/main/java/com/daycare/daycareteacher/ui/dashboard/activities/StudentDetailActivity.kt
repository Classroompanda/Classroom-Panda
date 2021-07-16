package com.daycare.daycareteacher.ui.dashboard.activities

import android.Manifest
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import androidx.lifecycle.Observer
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityStudentDetailBinding
import com.daycare.daycareteacher.model.ProfileData
import com.daycare.daycareteacher.ui.dashboard.fragments.student.AllergiesImmunizationFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.GuardianInfoFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StdBasicInfoFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import java.io.IOException

class StudentDetailActivity : AppCompatActivity() {

    lateinit var binding: ActivityStudentDetailBinding
    lateinit var toolbar: Toolbar
    lateinit var position: String
    private lateinit var viewModel: StudentViewModel
    var loader = Loader()
    var imagePath: String = ""
    private val GALLERY:Int = 1
    private val CAMERA :Int = 2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_student_detail)
        val fragmentAdapter = MyPagerAdapter(supportFragmentManager)
        binding.viewpagerStudent.adapter = fragmentAdapter
        binding.tabsStudent.setupWithViewPager(binding.viewpagerStudent)

        position = intent.getStringExtra("positionData")

        AppInstance.studentPosition=null
        viewModel = StudentViewModel()

        setUpToolBar()
        attachObserver(this@StudentDetailActivity)
        //attachObserver(viewModel)
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.student_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
        binding.studentNameTxt.text = AppInstance.studentDetails?.data?.studentName
        binding.studentAddressTxt.text =
            AppInstance.studentDetails?.data?.address + " " + AppInstance.studentDetails?.data?.cityName + " " + AppInstance.studentDetails?.data?.postalCode

        if(!AppInstance.studentDetails?.data?.imagePath.isNullOrEmpty()) {
            Glide.with(this)
                 //[for new glide versions]
                .load(AppInstance.studentDetails?.data?.imagePath)
                .override(200, 200) // resizes the image to these dimensions (in pixel). resize does not respect aspect ratio
                .transform(CircleTransform(binding.circleImageView.context))
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .into(binding.circleImageView)
        }

        binding.circleImageView.setOnClickListener {

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
            setImage()
        }
    }

    private fun setImage(){
        val items = arrayOf<CharSequence>("Camera", "Gallery"/*, "Cancel"*/)
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Add Attachment")
        builder.setItems(items) { dialog, item ->
            try {
                if (items[item] == "Camera") {
                    takePhotoFromCamera()

                } else if (items[item] == "Gallery") {
                    choosePhotoFromGallary()

                } /*else if (items[item] == "Cancel") {
                    dialog.dismiss()
                }*/
            } catch (e: Exception) {
                e.printStackTrace()
                dialog.dismiss()

            }
        }
        builder.show()
    }

    fun choosePhotoFromGallary() {
        val galleryIntent = Intent(
            Intent.ACTION_PICK,
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        )
        startActivityForResult(galleryIntent, GALLERY)
    }

    private fun takePhotoFromCamera() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, CAMERA)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == GALLERY) {
            if (data != null) {
                val contentURI: Uri = data.getData()!!
                try {
                    val bitmap =
                        MediaStore.Images.Media.getBitmap(this.contentResolver, contentURI)


                    var bitmapNew =  handleSamplingAndRotationBitmap(this,contentURI)
                    imagePath = getFileFromBitmap(this,bitmapNew!!)
                    binding.circleImageView.setImageBitmap(bitmapNew)

                    if(!imagePath.isEmpty()) {
                        if(position!=null){
                            AppInstance.studentPosition=Integer.parseInt(position)
                        }

                        viewModel.onImageUpload(this@StudentDetailActivity,imagePath,
                            AppInstance.studentDetails?.data?.studentId!!, AppInstance.studentPosition!!
                        )
                    }

                } catch (e: IOException) {
                    e.printStackTrace()
                    showToast(this, "Failed!")
                }
            }
        } else if (requestCode == CAMERA) {
            val thumbnail = data!!.getExtras()?.get("data") as Bitmap

             binding.circleImageView.setImageBitmap(thumbnail)
            imagePath= bitmapToFile(thumbnail,this).toString()

           /* Glide.with(this)
                .load(imagePath)
                .into(binding.circleImageView);
*/
            if(!imagePath.isEmpty()) {
                if(position!=null){
                    AppInstance.studentPosition=Integer.parseInt(position)
                }

                viewModel.onImageUpload(this@StudentDetailActivity,imagePath,
                    AppInstance.studentDetails?.data?.studentId!!, AppInstance.studentPosition!!
                )
            }

        }
    }

    private fun attachObserver(context: Context) {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })

        viewModel.imageApiResponse.observe(this, Observer<Any> { it ->
            try {
                it?.let {
                    if (it is ProfileData) {
                        Glide.with(this)
                            .load(AppInstance.studentDetails?.data?.imagePath)
                            .placeholder(R.drawable.ic_placeholder)
                            .transform(CircleTransform(binding.circleImageView.context))
                            .into(binding.circleImageView)

                    }

                }
            } catch (e: Exception) {

            }
        })
    }

    internal inner class MyPagerAdapter(manager: FragmentManager) : FragmentPagerAdapter(manager) {

        override fun getItem(position: Int): Fragment {
            return when (position) {
                0 -> StdBasicInfoFragment()
                1 -> GuardianInfoFragment()
                else -> AllergiesImmunizationFragment()
//                else -> {
//                    return null
//                }
            }
        }

        override fun getCount(): Int {
            return 3
        }

        override fun getPageTitle(position: Int): CharSequence? {
            return when (position) {
                0 -> "Basic Info"
                1 -> "Guardian Info"
                2 -> "Allergies and Immunization"
                else -> {
                    return null
                }
            }
        }
    }
}