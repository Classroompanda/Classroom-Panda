package com.daycare.daycareteacher.ui.dashboard.fragments.student


import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentStdBasicInfoBinding
import com.daycare.daycareteacher.model.StudentDetail
import com.daycare.daycareteacher.model.StudentDetailData
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.dialogDisplayDate
import com.daycare.daycareteacher.utill.displayDate
import com.daycare.daycareteacher.utill.displayReservationDate
import kotlinx.android.synthetic.main.fragment_std_basic_info.*


class StdBasicInfoFragment : Fragment() {

    lateinit var binding: FragmentStdBasicInfoBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanc: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_std_basic_info, container, false)
        binding = FragmentStdBasicInfoBinding.bind(view)
        val StudentDetail = AppInstance.studentDetails?.data
        binding.model = StudentDetail
        if(AppInstance.studentDetails?.data?.genderID==2){
          binding.genderTxt.setText("Girl")
        }else{
            binding.genderTxt.setText("Boy")
        }



       // binding.mobileTxt.text=StudentDetail?.parentContactNumber.toString()
        // binding.studentNameTxt.text= StudentDetail?.studentName
        /* binding.studentDOBTxt.text= dialogDisplayDate.format(
             displayDate.parse(StudentDetail?.dateOfBirth)
         )*/

        //displayReservationDate(StudentDetail?.dateOfBirth)
        //2017-03-20T00:00:00

        return view
    }


}