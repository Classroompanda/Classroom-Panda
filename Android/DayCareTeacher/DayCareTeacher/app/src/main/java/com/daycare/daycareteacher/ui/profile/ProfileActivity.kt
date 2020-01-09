package com.daycare.daycareteacher.ui.profile

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
import android.support.design.widget.Snackbar
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import com.ablanco.imageprovider.ImageProvider
import com.ablanco.imageprovider.ImageSource
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.R.id.view
import com.daycare.daycareteacher.databinding.ActivityProfileBinding
import com.daycare.daycareteacher.databinding.FragmentProfileUpdateBinding
import com.daycare.daycareteacher.model.CityData
import com.daycare.daycareteacher.model.CountryData
import com.daycare.daycareteacher.model.ProfileData
import com.daycare.daycareteacher.model.StateData
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.repository.ResponseCodes.Companion.Success
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.activity_profile.*
import kotlinx.android.synthetic.main.toolbar.view.*
import org.angmarch.views.NiceSpinner
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

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
    val countries = ArrayList<String>()
    val states = ArrayList<String>()
    val city = ArrayList<String>()
    lateinit var stateAdapter: ArrayAdapter<String>
    lateinit var countryAdapter: ArrayAdapter<String>
    lateinit var cityAdapter: ArrayAdapter<String>


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.fragment_profile_update)

//        viewModel = ProfileViewModel()
        viewModel = ProfileViewModel(binding.updateProfileContainer, TASK_ID)
        binding.viewModel = viewModel
        AppInstance.profileimagePath = ""
        attachObserver(viewModel, this)
        setUpToolBar()

        setDefaultCountrySpinner(binding.countryName, countries)
        setDefaultStateSpinner(binding.stateNameSpinner, states)
        setDefaultCitySpinner(binding.city, city)


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

    private fun setDefaultCountrySpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        countryAdapter =
            ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = countryAdapter

    }

    private fun setDefaultStateSpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        stateAdapter =
            ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = stateAdapter

    }

    private fun setDefaultCitySpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        cityAdapter =
            ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = cityAdapter

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
//                            bitmapnew = rotateImageIfRequired(bitmap, bitmapToFile(bitmap, this))
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
        toolbar.passChange.visibility = View.VISIBLE
        toolbar.passChange.setOnClickListener {
            startActivity(Intent(this, ChangePasswordActivity::class.java))
        }

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
                        if (AppInstance.profileDetail?.data?.mPhoneNumber != null) {
                            binding.edtmobile.setText(AppInstance.profileDetail?.data?.mPhoneNumber.toString())
                        } else {
                            binding.edtmobile.setText("")
                        }

                        if (AppInstance.profileDetail?.data?.mHomePhone != null) {
                            binding.edthomephone.setText(AppInstance.profileDetail?.data?.mHomePhone.toString())
                        } else {
                            binding.edthomephone.setText("")
                        }


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

                        viewModel.getCountrylist(binding.circleImageView)


                        /* for (pos in 0 until AppInstance.allCountry?.data?.size!!) {
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
                         }*/
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
        })*/



        viewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

                        if (viewModel.profileApiResponse.value != null) {
                            val data = AppInstance.profileDetail?.data?.countryId
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == AppInstance.profileDetail?.data?.countryId) {
                                    binding.countryName.setSelection(pos + 1)
                                    viewModel.country.set(AppInstance.profileDetail?.data?.countryId)

                                }
                            }
                        }


                        binding.countryName.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                                if (position > 0) {
                                    viewModel.getStateData(it.data?.get(position - 1)?.id, binding.countryName)
                                    viewModel.mCountry.set(it.data?.get(position - 1)?.id.toString())
                                    viewModel.country.set(it.data?.get(position - 1)?.id)

                                } else {
                                    viewModel.mCountry.set("-1")
                                    states.clear()
                                    states.add("Select")
                                    stateAdapter.notifyDataSetChanged()
                                    viewModel.country.set(-1)
                                }
                            }

                        }
                    } else {

                    }
                } else {
                    countries.clear()
                    countries.add("Select")
                    countryAdapter.notifyDataSetChanged()

                }
            }

        })
        viewModel.stateApiResponse.observe(this, Observer<StateData> { it ->
            it?.let {
                loadStateData(it)
                if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {
                    if (viewModel.profileApiResponse.value != null) {
                        val data = AppInstance.profileDetail?.data
                        for (pos in 0 until it.data!!.size) {
                            if (it.data!![pos].id == data?.stateId) {
                                binding.stateNameSpinner.setSelection(pos + 1)
                                viewModel.state.set(data?.stateId)

                            }
                        }
                    }
                    binding.stateNameSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                        override fun onNothingSelected(parent: AdapterView<*>?) {

                        }

                        override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                            if (position > 0) {
                                viewModel.getCityData(it.data?.get(position - 1)?.id, binding.stateNameSpinner)
                                viewModel.mState.set(it.data?.get(position - 1)?.id.toString())
                                viewModel.state.set(it.data?.get(position - 1)?.id)
                            } else {
                                viewModel.mState.set("-1")
                                city.clear()
                                city.add("Select")
                                cityAdapter.notifyDataSetChanged()
                                viewModel.state.set(-1)
                            }


                        }
                    }
                } else {
                    states.clear()
                    states.add("Select")
                    stateAdapter.notifyDataSetChanged()

                }
            }

        })
        viewModel.cityApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CityData) {
                    loadCityData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {
                        if (viewModel.profileApiResponse.value != null) {
                            val data = AppInstance.profileDetail?.data
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == data?.cityId) {
                                    binding.city.setSelection(pos + 1)
                                    viewModel.city.set(data?.cityId)

                                }
                            }
                        }
                        binding.city.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                                if (position > 0) {
                                    viewModel.mCity.set(it.data?.get(position - 1)?.id.toString())
                                    viewModel.city.set(it.data?.get(position - 1)?.id)

                                } else {
                                    viewModel.mCity.set("-1")
                                    viewModel.city.set(-1)
                                }
                            }
                        }
                    }
                } else {
                    city.clear()
                    city.add("Select")
                    cityAdapter.notifyDataSetChanged()
                }
            }

        })


    }


    private fun loadCountryData(response: CountryData) {
        countries.clear()
        countries.add("Select")
        for (data in response.data!!) {
            data.countryName?.let { countries.add(it) }
        }
        countryAdapter.notifyDataSetChanged()
    }

    private fun loadStateData(response: StateData) {
        states.clear()
        states.add("Select")
        for (data in response.data!!) {
            data.stateName?.let { states.add(it) }
        }
        stateAdapter.notifyDataSetChanged()
    }

    private fun loadCityData(response: CityData) {
        city.clear()
        city.add("Select")
        for (data in response.data!!) {
            data.cityName?.let { city.add(it) }
        }
        cityAdapter.notifyDataSetChanged()
    }
}