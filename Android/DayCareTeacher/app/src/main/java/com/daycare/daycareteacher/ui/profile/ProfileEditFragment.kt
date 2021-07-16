package com.daycare.daycareteacher.ui.profile

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentProfileUpdateBinding
import com.daycare.daycareteacher.model.CityData
import com.daycare.daycareteacher.model.CountryData
import com.daycare.daycareteacher.model.ProfileData
import com.daycare.daycareteacher.model.StateData
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.utill.*

class ProfileEditFragment : Fragment() {

    lateinit var binding: FragmentProfileUpdateBinding
    lateinit var viewModel: ProfileViewModel
    var loader = Loader()
    var TASK_ID = OptionConstant.VIEW_LOG
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
        val view = inflater.inflate(R.layout.fragment_profile_update, container, false)
        binding = FragmentProfileUpdateBinding.bind(view)


        viewModel = ProfileViewModel()
        binding.viewModel = viewModel
        viewModel = ProfileViewModel(binding.updateProfileContainer, TASK_ID)

        attachObserver(viewModel, context!!)


        return view
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
            it?.let {
                if (it is ProfileData) {

                    binding.edtfirstname.setText(AppInstance.profileDetail?.data?.firstName)
                    binding.edtlastname.setText(AppInstance.profileDetail?.data?.lastName)
                    binding.edtemail.setText(AppInstance.profileDetail?.data?.email)
                    binding.edtmobile.setText(AppInstance.profileDetail?.data?.phoneNumber.toString())
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
                        if(AppInstance.allState?.data!=null) {
                            for (pos in 0 until AppInstance.allState?.data?.size!!) {
                                if (AppInstance.allState?.data!![pos].id == AppInstance.profileDetail?.data?.stateId) {
                                    binding.stateNameSpinner.selectedIndex = pos
                                }
                            }
                        }
                    }*/
                    /*  if (!TextUtils.isEmpty(AppInstance.profileDetail?.data!!.imagePath)) {
                         // progressBar.setVisibility(View.VISIBLE)

                          //                image_url = image_url.replaceAll("https://", "http://");
                          Picasso.get()
                              .load(AppInstance.profileDetail?.data!!.imagePath)
                              .placeholder(R.drawable.ic_placeholder)
                              .error(R.drawable.ic_placeholder)
                              .into(binding.circleImageView);
                      }*/


                }
            }
        })


        viewModel.countryApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is CountryData) {
                    loadCountryData(it)
                    if (it.statusCode == ResponseCodes.Success && it.data?.isNotEmpty()!!) {

                        if (viewModel.profileApiResponse.value != null) {
                            val data =AppInstance.profileDetail?.data?.countryId
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