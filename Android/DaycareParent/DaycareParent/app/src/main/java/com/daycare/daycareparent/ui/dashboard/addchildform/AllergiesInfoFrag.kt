package com.daycare.daycareparent.ui.dashboard.addchildform


import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentAllergiesInfoBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader


class AllergiesInfoFrag : Fragment() {

    lateinit var binding: FragmentAllergiesInfoBinding
    lateinit var viewModel: AllergiesInfoViewModel
    var loader = Loader()
    var data = StudentInfoDetail()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_allergies_info, container, false)
        binding = FragmentAllergiesInfoBinding.bind(view)
        viewModel = AllergiesInfoViewModel()
        binding.viewModel = viewModel

//     call api for  Type of Immunization, allergies, reaction in dropdowns
        viewModel.getImmunization(context!!)
        viewModel.getAllergy(context!!)
        viewModel.getAllergyName(context!!)
        viewModel.getReaction(context!!)
        viewModel.getDosage(context!!)
//        initView()
        attachObserver(viewModel, context!!)
        return view
    }

    private fun initView() {
        if (AppInstance.completeStdDetail != null) {
            data = AppInstance.completeStdDetail!!
            viewModel.imRecord.set(AppInstance.completeStdDetail?.data?.studentImmunizations?.size.toString())
            viewModel.disbRecord.set(AppInstance.completeStdDetail?.data?.studentDisabilities?.size.toString())
            viewModel.allgRecord.set(AppInstance.completeStdDetail?.data?.studentAllergies?.size.toString())
            viewModel.medRecord.set(AppInstance.completeStdDetail?.data?.studentMedications?.size.toString())
            viewModel.studentData.set(AppInstance.completeStdDetail)
        }

    }

    override fun onResume() {
        super.onResume()
        if (AppInstance.basicInfo != null) {
            initView()
        } else {
            binding.addAllergy.visibility = View.INVISIBLE
            binding.addDisablity.visibility = View.INVISIBLE
            binding.addImmunization.visibility = View.INVISIBLE
            binding.addMedication.visibility = View.INVISIBLE
        }
    }

    private fun attachObserver(viewModel: AllergiesInfoViewModel, context: Context) {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.immunizationResponse.observe(this, Observer<StudentImmunization> { it ->
            it.let {
                if (it != null) {
                    data.data?.studentImmunizations?.add(0, it)
                    val count = viewModel.imRecord.get()
                    viewModel.imRecord.set((count?.toInt()?.plus(1)).toString())
                }
            }
        })
        viewModel.allergyResponse.observe(this, Observer<StudentAllergy> { it ->
            it.let {
                if (it != null) {

                    data.data?.studentAllergies?.add(0, it)
                    val count = viewModel.allgRecord.get()
                    viewModel.allgRecord.set((count?.toInt()?.plus(1)).toString())

                }
            }
        })
        viewModel.medicationResponse.observe(this, Observer<StudentMedication> { it ->
            it.let {
                if (it != null) {

                    data.data?.studentMedications?.add(0, it)
                    val count = viewModel.medRecord.get()
                    viewModel.medRecord.set((count?.toInt()?.plus(1)).toString())

                }
            }
        })
        viewModel.disabilityResponse.observe(this, Observer<StudentDisability> { it ->
            it.let {
                if (it != null) {

                    data.data?.studentDisabilities?.add(0, it)
                    val count = viewModel.disbRecord.get()
                    viewModel.disbRecord.set((count?.toInt()?.plus(1)).toString())
                }
            }
        })
    }


}
