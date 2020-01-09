package com.daycare.daycareparent.ui.dashboard.parentprofile


import android.Manifest
import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.app.Fragment
import android.support.v4.content.ContextCompat
import android.support.v7.widget.Toolbar
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentParentBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.addchildform.BasicInfoViewModel
import com.daycare.daycareparent.ui.dashboard.addchildform.GuardianInfoViewModel
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.ADD_GUARDIAN
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*


class ParentFragment : Fragment() {

    lateinit var binding: FragmentParentBinding
    lateinit var viewModel: ParentViewModel
    val infoViewModel = BasicInfoViewModel()
    val relationViewModel = GuardianInfoViewModel()
    var loader = Loader()
    val countries = ArrayList<String>()
    val states = ArrayList<String>()
    val city = ArrayList<String>()
    lateinit var stateAdapter: ArrayAdapter<String>
    lateinit var countryAdapter: ArrayAdapter<String>
    lateinit var cityAdapter: ArrayAdapter<String>
    lateinit var relationAdapter: ArrayAdapter<String>
    val list = ArrayList<String>()
    lateinit var toolbar: Toolbar
    var status: Int? = 0

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_parent, container, false)
        viewModel = ParentViewModel()
        binding = FragmentParentBinding.bind(view)
        binding.viewmodel = viewModel
        initView()
        attachObserver()
        setupToolbar()
        binding.uploadBtn.setOnClickListener {
            if (ContextCompat.checkSelfPermission(
                    (view.context as Activity),
                    Manifest.permission.CAMERA
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(view.context as Activity, arrayOf(Manifest.permission.CAMERA), 1001)

            }

            val chooseImageIntent = ImagePicker.getPickImageIntent(view.context)
            startActivityForResult(chooseImageIntent, OptionConstant.PICK_IMAGE_ID)
        }
        return view
    }

    private fun setupToolbar() {
        if (status != ADD_GUARDIAN) {
            toolbar = (activity as DashboardActivity).toolbar
            toolbar.visibility = View.VISIBLE
            toolbar.headerTxt.text = getString(R.string.profile)
            toolbar.dropdown.visibility = View.GONE
            toolbar.childProfile.visibility = View.GONE
            toolbar.logoutTxt.visibility = View.VISIBLE
            toolbar.logoutTxt.text = "Change Password"
            toolbar.logoutTxt.setOnClickListener {
                startActivity(Intent(context!!, ChangePasswordActivity::class.java))
            }
        }
    }

    private fun initView() {
        status = arguments?.getInt("data", 0)
        if (status != ADD_GUARDIAN) {
            val user = PreferenceConnector.readUser(context!!, PreferenceConnector.USER)
            val data = ParentData()
            data.agencyID = user?.agencyID
            data.parentID = user?.releventUserID
            viewModel.getParentInfoApi(context!!, data)
        } else {
            infoViewModel.getCountrylist(binding.container)
            relationViewModel.getRelation(context!!)
        }
        setDefaultCountrySpinner(binding.countryTxt, countries)
        setDefaultStateSpinner(binding.stateTxt, states)
        setDefaultCitySpinner(binding.cityTxt, city)
        initRelation()

        binding.countryTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(p0?.context!!, p0)
                return false
            }
        })
        binding.stateTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(p0?.context!!, p0)
                return false
            }
        })
        binding.cityTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(p0?.context!!, p0)
                return false
            }
        })
        binding.relationTxt.setOnTouchListener(object : View.OnTouchListener {
            override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                hideSoftKeyboard(p0?.context!!, p0)
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

    private fun initRelation() {
        relationAdapter =
            ArrayAdapter(context!!, android.R.layout.simple_spinner_dropdown_item, list)
        relationAdapter.setDropDownViewResource(R.layout.custom_spinner)
        binding.relationTxt.adapter = relationAdapter
    }

    private fun attachObserver() {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.getParentDataResponse.observe(this, Observer<ParentModel> { it ->
            it?.let {
                //                setdata on fields
                if (it.data != null) {
                    viewModel.setFormData(it.data!!, binding.container)
                    infoViewModel.getCountrylist(binding.container)
                    relationViewModel.getRelation(context!!)
                }
            }

        })

        viewModel.updatedParentApi.observe(this, Observer<Data> { it ->
            it?.let {

                PreferenceConnector.writeUserInfo(context!!, PreferenceConnector.USER, it)
                AppInstance.loginResponse?.data = it
            }
        })
        relationViewModel.relationApiResponse.observe(this, Observer<RelationType> { it ->
            it.let {
                if (it != null) {
                    loadRelationData(it)
                    if (viewModel.getParentDataResponse.value != null) {
                        val data = viewModel.getParentDataResponse.value?.data
                        binding.relationTxt.setSelection(data?.relationTypeId!!)
                        viewModel.relation.set(data.relationTypeId)
                    }
                }
            }
        })

        infoViewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

                        if (viewModel.getParentDataResponse.value != null) {
                            val data = viewModel.getParentDataResponse.value?.data
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == data?.countryId) {
                                    binding.countryTxt.setSelection(pos + 1)
                                    viewModel.country.set(data?.countryId)

                                }
                            }
                        }


                        binding.countryTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                                if (position > 0) {
                                    infoViewModel.getStateData(it.data?.get(position - 1)?.id, binding.countryTxt)
                                    infoViewModel.mCountry.set(it.data?.get(position - 1)?.id.toString())
                                    viewModel.country.set(it.data?.get(position - 1)?.id)

                                } else {
                                    infoViewModel.mCountry.set("-1")
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
        infoViewModel.stateApiResponse.observe(this, Observer<StateData> { it ->
            it?.let {
                loadStateData(it)
                if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {
                    if (viewModel.getParentDataResponse.value != null) {
                        val data = viewModel.getParentDataResponse.value?.data
                        for (pos in 0 until it.data!!.size) {
                            if (it.data!![pos].id == data?.stateId) {
                                binding.stateTxt.setSelection(pos + 1)
                                viewModel.state.set(data?.stateId)

                            }
                        }
                    }
                    binding.stateTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                        override fun onNothingSelected(parent: AdapterView<*>?) {

                        }

                        override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {

                            if (position > 0) {
                                infoViewModel.getCityData(it.data?.get(position - 1)?.id, binding.stateTxt)
                                infoViewModel.mState.set(it.data?.get(position - 1)?.id.toString())
                                viewModel.state.set(it.data?.get(position - 1)?.id)
                            } else {
                                infoViewModel.mState.set("-1")
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
        infoViewModel.cityApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CityData) {
                    loadCityData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {
                        if (viewModel.getParentDataResponse.value != null) {
                            val data = viewModel.getParentDataResponse.value?.data
                            for (pos in 0 until it.data!!.size) {
                                if (it.data!![pos].id == data?.cityId) {
                                    binding.cityTxt.setSelection(pos + 1)
                                    viewModel.city.set(data?.cityId)

                                }
                            }
                        }
                        binding.cityTxt.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                            override fun onNothingSelected(parent: AdapterView<*>?) {

                            }

                            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                                if (position > 0) {
                                    infoViewModel.mCity.set(it.data?.get(position - 1)?.id.toString())
                                    viewModel.city.set(it.data?.get(position - 1)?.id)

                                } else {
                                    infoViewModel.mCity.set("-1")
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

    private fun loadRelationData(response: RelationType) {
        list.clear()
        list.add("Select")
        for (data in response.data!!) {
            data.label?.let { list.add(it) }
        }
        relationAdapter.notifyDataSetChanged()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        when (requestCode) {
            OptionConstant.PICK_IMAGE_ID -> {
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
}
