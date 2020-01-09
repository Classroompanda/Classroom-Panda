package com.daycare.daycareparent.ui.dashboard.addchildform


import android.Manifest
import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.app.Fragment
import android.support.v4.content.ContextCompat
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import com.bumptech.glide.Glide

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentBasicInfoFormBinding
import com.daycare.daycareparent.model.CityData
import com.daycare.daycareparent.model.CountryData
import com.daycare.daycareparent.model.StateData
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.BindingAdapters.Companion.loadImage
import com.daycare.daycareparent.utill.OptionConstant.PICK_IMAGE_ID


class BasicInfoFormFrag : Fragment() {

    lateinit var binding: FragmentBasicInfoFormBinding
    lateinit var viewModel: BasicInfoViewModel
    var loader = Loader()
    val countries = ArrayList<String>()
    val states = ArrayList<String>()
    val city = ArrayList<String>()
    lateinit var stateAdapter: ArrayAdapter<String>
    lateinit var countryAdapter: ArrayAdapter<String>
    lateinit var cityAdapter: ArrayAdapter<String>

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_basic_info_form, container, false)
        binding = FragmentBasicInfoFormBinding.bind(view)
        hideVirtualKeyboard(context!! as Activity)
        viewModel = BasicInfoViewModel()
        binding.viewModel = viewModel
        initView()
        attachObserver(viewModel, context!!)

        binding.uploadBtn.setOnClickListener {
            if (ContextCompat.checkSelfPermission(
                    (view.context as Activity),
                    Manifest.permission.CAMERA
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(view.context as Activity, arrayOf(Manifest.permission.CAMERA), 1001)

            }

            val chooseImageIntent = ImagePicker.getPickImageIntent(view.context)
            startActivityForResult(chooseImageIntent, PICK_IMAGE_ID)
        }


        return view
    }

    private fun initView() {
        setDefaultCountrySpinner(binding.countryTxt, countries)
        setDefaultStateSpinner(binding.stateTxt, states)
        setDefaultCitySpinner(binding.cityTxt, city)
        viewModel.getCountrylist(binding.container)

        if (AppInstance.basicInfo != null) {
            val data = AppInstance.basicInfo
            viewModel.mFirstName.set(data?.firstName)
            viewModel.mLastName.set(data?.lastName)
            viewModel.mContact.set(data?.childsContactNumber?.toString())
            viewModel.mAddress.set(data?.address)
            viewModel.mZipCode.set(data?.postalCode)
            viewModel.mDob.set(convertDate(data?.dateOfBirth!!, alohaDate, incidentDisplayDate))
            viewModel.mEmail.set(data.physicianName)
            viewModel.imageUrl.set(data.imagePath)
            viewModel.prefferedhosp.set(data.preferredHospital)
//            Glide.with(binding.childImg.context)
//                .load(data.imagePath)
//                .asBitmap()
//                .placeholder(R.drawable.ic_placeholder)
//                .into(binding.childImg)

            if (data.genderID == 2) {
                binding.radioFemale.isChecked = true
            } else {
                binding.radioMale.isChecked = true
            }
            binding.saveBtn.text = "Update"
        }
        binding.countryTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(context!!, p0!!)
                return false
            }
        })
        binding.stateTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(context!!, p0!!)
                return false
            }
        })
        binding.cityTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(context!!, p0!!)
                return false
            }
        })
    }

    private fun setDefaultCountrySpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        countryAdapter =
            ArrayAdapter(context!!, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = countryAdapter

    }

    private fun setDefaultStateSpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        stateAdapter =
            ArrayAdapter(context!!, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = stateAdapter

    }

    private fun setDefaultCitySpinner(view: Spinner, list: ArrayList<String>) {
        list.clear()
        list.add("Select")
        cityAdapter =
            ArrayAdapter(context!!, android.R.layout.simple_spinner_dropdown_item, list)
        countryAdapter.setDropDownViewResource(R.layout.custom_spinner)
        view.adapter = cityAdapter

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        when (requestCode) {
            PICK_IMAGE_ID -> {
                if (resultCode == Activity.RESULT_OK) {
                    var bitmap: Bitmap? = ImagePicker.getImageFromResult(context!!, resultCode, data)
                    bitmap = scaleDownBitmap(bitmap!!, 96, context!!)
                    viewModel.image.set(byteArrayConverter(bitmap!!))
                    viewModel.mImage.set(bitmap)

                }
            }
            else -> super.onActivityResult(requestCode, resultCode, data)
        }
    }

    private fun attachObserver(viewModel: BasicInfoViewModel, context: Context) {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == Success && it.data?.isNotEmpty()!!) {

                        if (AppInstance.basicInfo != null) {
                            val data = AppInstance.basicInfo
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == data?.countryId) {
                                    binding.countryTxt.setSelection(pos + 1)
                                }
                            }
                        }


                        binding.countryTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                                if (position > 0) {
                                    viewModel.getStateData(it.data?.get(position - 1)?.id, binding.countryTxt)
                                    viewModel.mCountry.set(it.data?.get(position - 1)?.id.toString())

                                } else {
                                    viewModel.mCountry.set("-1")
                                    states.clear()
                                    states.add("Select")
                                    stateAdapter.notifyDataSetChanged()
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
                if (it.statusCode == Success && it.data?.isNotEmpty()!!) {
                    if (AppInstance.basicInfo != null) {
                        val data = AppInstance.basicInfo
                        for (pos in 0 until it.data!!.size) {
                            if (it.data!![pos].id == data?.stateId) {
                                binding.stateTxt.setSelection(pos + 1)
                            }
                        }
                    }

                    binding.stateTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                        override fun onNothingSelected(parent: AdapterView<*>?) {

                        }

                        override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                            if (position > 0) {
                                viewModel.getCityData(it.data?.get(position - 1)?.id, binding.stateTxt)
                                viewModel.mState.set(it.data?.get(position - 1)?.id.toString())
                            } else {
                                viewModel.mState.set("-1")
                                city.clear()
                                city.add("Select")
                                cityAdapter.notifyDataSetChanged()
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
                    if (it.statusCode == Success && it.data?.isNotEmpty()!!) {

                        if (AppInstance.basicInfo != null) {
                            val data = AppInstance.basicInfo
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == data?.cityId) {
                                    binding.cityTxt.setSelection(pos + 1)
                                }
                            }
                        }


                        binding.cityTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                                if (position > 0) {
                                    viewModel.mCity.set(it.data?.get(position - 1)?.id.toString())
                                } else {
                                    viewModel.mCity.set("-1")
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
