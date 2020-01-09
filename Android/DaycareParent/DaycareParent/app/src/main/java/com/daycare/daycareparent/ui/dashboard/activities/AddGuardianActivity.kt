package com.daycare.daycareparent.ui.dashboard.activities

import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Intent
import android.databinding.DataBindingUtil
import android.graphics.Bitmap
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import android.view.MotionEvent
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddGuardianBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.addchildform.BasicInfoViewModel
import com.daycare.daycareparent.ui.dashboard.addchildform.GuardianInfoViewModel
import com.daycare.daycareparent.ui.dashboard.parentprofile.ParentViewModel
import com.daycare.daycareparent.utill.*

class AddGuardianActivity : AppCompatActivity() {

    lateinit var binding: ActivityAddGuardianBinding
    lateinit var viewModel: GuardianInfoViewModel
    val list = ArrayList<String>()
    lateinit var relationAdapter: ArrayAdapter<String>
    lateinit var toolbar: Toolbar
    //    var status = 0
    var data: GuardianData? = GuardianData()
    var loader = Loader()
    val countries = ArrayList<String>()
    val states = ArrayList<String>()
    val city = ArrayList<String>()
    lateinit var stateAdapter: ArrayAdapter<String>
    lateinit var countryAdapter: ArrayAdapter<String>
    lateinit var cityAdapter: ArrayAdapter<String>
    val infoViewModel = BasicInfoViewModel()
    val pViewModel = ParentViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_guardian)
        viewModel = GuardianInfoViewModel()
        initRelation()
        viewModel.getRelation(this)//api
        binding.viewmodel = viewModel
        attachObserver()
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
        hideVirtualKeyboard(this)
        initView()

    }

    private fun initView() {
//        status = intent.getIntExtra("status", ADD_TASK)
        data = intent.getParcelableExtra("data")
        setDefaultCountrySpinner(binding.countryTxt, countries)
        setDefaultStateSpinner(binding.stateTxt, states)
        setDefaultCitySpinner(binding.cityTxt, city)

        infoViewModel.getCountrylist(binding.container)
        if (data != null) {
            val info = ParentData()
            info.agencyID = data?.agencyID
            info.parentID = data?.guardianId
            pViewModel.getParentInfoApi(this, info)
            binding.saveBtn.text = "Update"
            binding.headerTxt.text = "Update Guardian"
            binding.emailTxt.isEnabled = false

//            viewModel.guardianData.value = data
        }
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

    private fun initRelation() {
        relationAdapter =
            ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list)
        relationAdapter.setDropDownViewResource(R.layout.custom_spinner)
        binding.relationTxt.adapter = relationAdapter
    }

    private fun attachObserver() {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
        pViewModel.getParentDataResponse.observe(this, Observer<ParentModel> { it ->
            it.let {
                if (it != null) {
                    viewModel.gurdiandata.set(it.data)
                    binding.fNameTxtedt.setText(it.data?.firstName)
                    binding.lNameTxtedt.setText(it.data?.lastName)
                    binding.phoneTxtedt.setText(it.data?.mobile)
                    binding.radioYes.isChecked = it.data?.isAuthorizedToPickup!!
                    binding.reasonTxtedt.setText(it.data?.reasonNotToAllow)
                    binding.emailTxtedt.setText(it.data?.emailId)
                    binding.addressTxtedt.setText(it.data?.address)
                    binding.zipTxtedt.setText(it.data?.postalCode)
                    binding.dobTxtedt.setText(it.data?.dateOfBirth?.let {
                        convertDate(
                            it,
                            alohaDate,
                            incidentDisplayDate
                        )
                    })
                    binding.professTxtedt.setText(it.data?.profession)
                    binding.idIsFemale.isChecked = true
                    if (it.data?.genderID == 1) {
                        binding.idIsMale.isChecked = true
                    }
                    viewModel.imageUrl.set(it.data?.imagePath)
                    if (it.data?.isAuthorizedToPickup!!) {
                        binding.reasonLayout.visibility = View.GONE
                    }
                }
            }
        })
        viewModel.relationApiResponse.observe(this, Observer<RelationType> { it ->
            it.let {
                if (it != null) {
                    loadRelationData(it)
                    if (data != null) {
                        binding.relationTxt.setSelection(data?.relationTypeId!!)
                    }
                }
            }
        })
        viewModel.guardianData.observe(this, Observer<ParentData> { it ->
            it.let {
                if (it != null) {
                    val intent = Intent()
                    intent.putExtra("updatedRecord", it)
                    setResult(Activity.RESULT_OK, intent)
                    finish()
                }
            }
        })

        infoViewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

                        if (data != null) {
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
                    if (data != null) {
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

                        if (data != null) {
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
                    var bitmap: Bitmap? = ImagePicker.getImageFromResult(this, resultCode, data)
                    bitmap = scaleDownBitmap(bitmap!!, 96, this)
                    viewModel.image.set(byteArrayConverter(bitmap!!))
                    viewModel.mImage.set(bitmap)

                }
            }
            else -> super.onActivityResult(requestCode, resultCode, data)
        }
    }


}
