package com.daycare.daycareparent.ui.dashboard.adapter


import android.app.Activity
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.StudentBreakListItemBinding
import com.daycare.daycareparent.model.StudentBreakData
import com.daycare.daycareparent.ui.dashboard.activities.AddStudentBreakActivity

import com.daycare.daycareparent.ui.dashboard.activities.StudentBreakInOutActivity
import com.daycare.daycareparent.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareparent.utill.*


class StudentBreakAdapter(var context: StudentBreakInOutActivity,
                                var childrenList: ArrayList<StudentBreakData>) : RecyclerView.Adapter<StudentBreakAdapter.BindStudentBreakHolder>() {


    override fun onBindViewHolder(holder: BindStudentBreakHolder, position: Int) {
        val binding = holder.binding
       // val viewModel = AttendanceViewModel(childrenList.get(position),position,"Break",holder.itemView)


        binding.breakOfTxt.setText(convertDate(childrenList.get(position).breakOutTime!!,  alohaDate, dialogDisplayTime))

            binding.breakInTxt.setText(convertDate(childrenList.get(position).breakInTime!!,  alohaDate, dialogDisplayTime))



        binding.reasontxt.setText(childrenList.get(position).breakReason)
        //binding.pickUpByTxt.setText("sdhfjdfkjsjkd")
        binding.pickUpByTxt.setText(childrenList.get(position).pickupBy)
        binding.dropOfByTxt.setText(childrenList.get(position).dropedBy)


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindStudentBreakHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = StudentBreakListItemBinding.inflate(layoutInflater, parent, false)
        return BindStudentBreakHolder(binding)
    }

    override fun getItemCount(): Int {


        return childrenList.size
    }



    class BindStudentBreakHolder(var binding: StudentBreakListItemBinding) : RecyclerView.ViewHolder(binding.breakContainer)
}