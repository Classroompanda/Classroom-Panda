package com.daycare.daycareparent.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.AttendanceReportListItemBinding

import com.daycare.daycareparent.model.AttendanceData
import com.daycare.daycareparent.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareparent.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareparent.utill.*

class AttendanceListAdapter(
    var context: AttendanceFragment,
    var childrenList: List<AttendanceData>?,
    var date: String
) :
    RecyclerView.Adapter<AttendanceListAdapter.BindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: AttendanceReportListItemBinding = AttendanceReportListItemBinding.inflate(layoutInflater, parent, false)
        return BindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: BindingHolder, position: Int) {
        val attendanceViewModel = AttendanceViewModel()
        val binding = holder.binding
    binding.childTxt.setText(childrenList?.get(position)?.studentName)
        binding.classTxt.setText(childrenList?.get(position)?.className)
        if(!childrenList?.get(position)?.onLeave!!){
            binding.dropoffbyTxt.setText(childrenList?.get(position)?.dropedByName)
            binding.checkintimeTxt.setText(convertDate(childrenList?.get(position)?.checkInTime!!,  alohaDate, dialogDisplayTime))
            binding.pickupbyTxt.setText(childrenList?.get(position)?.pickupByName)
            binding.checkouttimeTxt.setText(convertDate(childrenList?.get(position)?.checkOutTime!!,  alohaDate, dialogDisplayTime))
            binding.attendanceContainer.isEnabled=true
            binding.attendanceContainer.isClickable=true
        }
        else{
            binding.checkinHeader.setText("Absent")
           // binding.checkinHeader.setTextColor(R.color.colorRed)
            binding.checkintimeTxt.visibility=View.GONE

            binding.dropoffbyTxt.visibility=View.GONE
            binding.dropoffHeader.visibility=View.GONE

            binding.pickupbyHeader.visibility=View.GONE
            binding.pickupbyTxt.visibility=View.GONE
            binding.checkouttimeTxt.visibility=View.GONE
            binding.attendanceContainer.isEnabled=false
            binding.attendanceContainer.isClickable=false

        }

//        binding.attendanceContainer.setOnClickListener {
//            attendanceViewModel.onBreakInRedirect(it,position)
//        }


    }

     class BindingHolder(var binding: AttendanceReportListItemBinding) : RecyclerView.ViewHolder(binding.attendanceContainer)
}


