package com.daycare.daycareparent.ui.dashboard.parentprofile


import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentSecParentBinding
import com.daycare.daycareparent.model.CityData
import com.daycare.daycareparent.model.CountryData
import com.daycare.daycareparent.model.RelationType
import com.daycare.daycareparent.model.StateData
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.addchildform.BasicInfoViewModel
import com.daycare.daycareparent.ui.dashboard.addchildform.GuardianInfoViewModel
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader


class SecParentFragment : Fragment() {

    lateinit var binding: FragmentSecParentBinding
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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_sec_parent, container, false)
        viewModel = ParentViewModel()
        binding = FragmentSecParentBinding.bind(view)
        initView()
        attachObserver()

        return view
    }

    private fun initView() {

        setDefaultCountrySpinner(binding.countryTxt, countries)
        setDefaultStateSpinner(binding.stateTxt, states)
        setDefaultCitySpinner(binding.cityTxt, city)
        initRelation()
        infoViewModel.getCountrylist(binding.container)
        relationViewModel.getRelation(context!!)

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
        relationViewModel.relationApiResponse.observe(this, Observer<RelationType> { it ->
            it.let {
                if (it != null) {
                    loadRelationData(it)
//                    if (data != null) {
//                        binding.relationTxt.setSelection(data?.relationTypeId!!)
//                    }
                }
            }
        })

        infoViewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

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
                                    infoViewModel.getStateData(it.data?.get(position - 1)?.id, binding.countryTxt)
                                    infoViewModel.mCountry.set(it.data?.get(position - 1)?.id.toString())

                                } else {
                                    infoViewModel.mCountry.set("-1")
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
        infoViewModel.stateApiResponse.observe(this, Observer<StateData> { it ->
            it?.let {
                loadStateData(it)
                if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {
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
                                infoViewModel.getCityData(it.data?.get(position - 1)?.id, binding.stateTxt)
                                infoViewModel.mState.set(it.data?.get(position - 1)?.id.toString())
                            } else {
                                infoViewModel.mState.set("-1")
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
        infoViewModel.cityApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CityData) {
                    loadCityData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

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
                                    infoViewModel.mCity.set(it.data?.get(position - 1)?.id.toString())
                                } else {
                                    infoViewModel.mCity.set("-1")
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

}
