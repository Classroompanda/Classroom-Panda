package com.daycare.daycareparent.ui.profile


import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentProfileUpdateBinding
import com.daycare.daycareparent.model.ProfileData
import com.daycare.daycareparent.utill.*


class ProfileEditFragment : Fragment() {

    lateinit var binding: FragmentProfileUpdateBinding
    lateinit var viewModel: ProfileViewModel
    var loader = Loader()
    var TASK_ID = OptionConstant.VIEW_LOG


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
                        if(AppInstance.allState?.data!=null) {
                            for (pos in 0 until AppInstance.allState?.data?.size!!) {
                                if (AppInstance.allState?.data!![pos].id == AppInstance.profileDetail?.data?.stateId) {
                                    binding.stateNameSpinner.selectedIndex = pos
                                }
                            }
                        }
                    }
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

    }


}