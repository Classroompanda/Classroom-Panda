package com.daycare.daycareparent.ui.profile

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
import android.os.Environment
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.view.View
import com.ablanco.imageprovider.ImageProvider
import com.ablanco.imageprovider.ImageSource
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentProfileUpdateBinding
import com.daycare.daycareparent.model.ProfileData
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import java.io.File

class ProfileActivity : AppCompatActivity() {
    lateinit var binding: FragmentProfileUpdateBinding
    lateinit var viewModel: ProfileViewModel
    var loader = Loader()
    var TASK_ID = OptionConstant.EDIT
    lateinit var toolbar: Toolbar
    var PICK_IMAGE_ID: Int = 222
    var file: File? = null
    var uri: Uri? = null
    //var s1:String= Environment.getExternalStorageDirectory().toString()

    var dirPath: String = Environment.getExternalStorageDirectory().toString() + File.separator + "DayCare"
    var appBannerPath: String = ""
    var imagePath: String = ""
    lateinit var bitmapnew: Bitmap


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.fragment_profile_update)


        viewModel = ProfileViewModel()
        binding.viewModel = viewModel
        viewModel = ProfileViewModel(binding.updateProfileContainer, TASK_ID)
        AppInstance.profileimagePath = ""
        attachObserver(viewModel, this)

        setUpToolBar()


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
            selectImage()
        }
        binding.btUpdate.setOnClickListener {
            viewModel.onClickAddPFBtn(it)
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
                        binding.circleImageView.setImageBitmap(bitmap)
                        if (bitmap != null) {
                            imagePath = bitmapToFile(bitmap, this).toString()
                            bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                            imagePath = bitmapToFile(bitmapnew, this).toString()
                            binding.circleImageView.setImageBitmap(bitmapnew)
                        } else {
                            binding.circleImageView.setImageResource(R.drawable.ic_placeholder)
                            imagePath = ""
                        }
                        AppInstance.profileimagePath = imagePath
                    }


                } else if (items[item] == "Gallery") {
                    ImageProvider(this).getImage(ImageSource.GALLERY) { bitmap ->
                        binding.circleImageView.setImageBitmap(bitmap)
                        if (bitmap != null) {
                            imagePath = bitmapToFile(bitmap, this).toString()
                            bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
                            imagePath = bitmapToFile(bitmapnew, this).toString()
                            binding.circleImageView.setImageBitmap(bitmapnew)
                        } else {
                            binding.circleImageView.setImageResource(R.drawable.ic_placeholder)
                            imagePath = ""
                        }
                        AppInstance.profileimagePath = imagePath
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

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.profile)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
//        toolbar.passChange.visibility = View.VISIBLE
//        toolbar.passChange.setOnClickListener {
//            startActivity(Intent(this, ChangePasswordActivity::class.java))
//        }
    }

    fun rotateImageIfRequired(img: Bitmap, selectedImage: Uri): Bitmap {
        val exifInterface = ExifInterface(selectedImage.getPath())
        val exifR: Int =
            exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_UNDEFINED);
        val orientation: Float =
            when (exifR) {
                ExifInterface.ORIENTATION_ROTATE_90 -> 90f
                ExifInterface.ORIENTATION_ROTATE_180 -> 180f
                ExifInterface.ORIENTATION_ROTATE_270 -> 270f
                else -> 0f
            }

        val mat: Matrix? = Matrix()
        mat?.postRotate(orientation)
        return Bitmap.createBitmap(
            img as Bitmap, 0, 0, img?.getWidth() as Int,
            img?.getHeight() as Int, mat, true
        )
    }

    private fun attachObserver(viewModel: ProfileViewModel, context: Context) {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })

        viewModel.profileApiResponse.observe(this, Observer<Any> { it ->
            try {
                it?.let {
                    if (it is ProfileData) {

                        binding.edtfirstname.setText(AppInstance.profileDetail?.data?.firstName)
                        binding.edtlastname.setText(AppInstance.profileDetail?.data?.lastName)
                        binding.edtemail.setText(AppInstance.profileDetail?.data?.email)
                        binding.edtmobile.setText(AppInstance.profileDetail?.data?.phoneNumber.toString())
                        binding.edthomephone.setText(AppInstance.profileDetail?.data?.homePhone.toString())
                        binding.edtaddress.setText(AppInstance.profileDetail?.data?.address)
                        binding.edtzip.setText(AppInstance.profileDetail?.data?.postalCode)
                        binding.edtdob.setText(
                            convertDate(
                                AppInstance.profileDetail?.data?.dateOfBirth!!,
                                alohaDate,
                                incidentDisplayDate
                            )
                        )
                        binding.edtdoh.setText(
                            convertDate(
                                AppInstance.profileDetail?.data?.dateHired!!,
                                alohaDate,
                                incidentDisplayDate
                            )
                        )
                        binding.edtgrosspay.setText(AppInstance.profileDetail?.data?.grossPayPerHour.toString())
                        binding.edtcertification.setText(AppInstance.profileDetail?.data?.certification)

                        Glide.with(this).load(AppInstance.profileDetail?.data!!.imagePath)
                            .thumbnail(0.5f)
                            .crossFade()
                            .diskCacheStrategy(DiskCacheStrategy.ALL)
                            .fitCenter()
                            .error(R.drawable.ic_placeholder)
                            .into(binding.circleImageView)



                        for (pos in 0 until AppInstance.allCountry?.data?.size!!) {
                            if (AppInstance.allCountry?.data!![pos].id == AppInstance.profileDetail?.data?.countryId) {
                                binding.countryName.selectedIndex = pos
                            }
                        }
                        if (AppInstance.profileDetail?.data?.cityId != null) {
                            for (pos in 0 until AppInstance.allCity?.data?.size!!) {
                                if (AppInstance.allCity?.data!![pos].id == AppInstance.profileDetail?.data?.cityId) {
                                    binding.city.selectedIndex = pos
                                }
                            }
                        }
                        if (AppInstance.profileDetail?.data?.stateId != null) {
                            if (AppInstance.allState?.data != null) {
                                for (pos in 0 until AppInstance.allState?.data?.size!!) {
                                    if (AppInstance.allState?.data!![pos].id == AppInstance.profileDetail?.data?.stateId) {
                                        binding.stateNameSpinner.selectedIndex = pos
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e: Exception) {
                //showToast(this,"Error in fetching data")
            }
        })
//            viewModel.countryApiResponse.observe(this, Observer<Any> {it->
//                it?.let {
//                    if(it is CountryData){
//                        viewModel.getStateData(it.data!![0].id, binding.stateNameSpinner)
//                        binding.countryName.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
//                            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
////                isLoading.value = true
//                                viewModel.getStateData(it.data!![position].id, view)
//                            }
//
//                            override fun onNothingSelected(parent: AdapterView<*>) {}
//                        })
//                    }
//                }
//            })
        /*viewModel.stateApiResponse.observe(this, Observer<StateData> {it->
            it?.let {
                if(it is StateData && it.statusCode==Success){
                    if(it.data!=null){
                        viewModel.loadStateData(binding.stateNameSpinner, TASK_ID, it)
                    }
                    else{
                        showToast(this, "No Data Found!!")
                    }

                }else{
                    showToast(this, "No Data Found!!")
                }
            }
        })
        viewModel.cityApiResponse.observe(this, Observer<Any> {it->
            it?.let {
                if(it is CityData){
                    if(it.data!=null) {
                        viewModel.loadCityData(binding.stateNameSpinner, TASK_ID, it)
                    }
                    else{
                        showToast(this, "No Data Found!!")

                    }
                }
            }
        })*/
    }
}