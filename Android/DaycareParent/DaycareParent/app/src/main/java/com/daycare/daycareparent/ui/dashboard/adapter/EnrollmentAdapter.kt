package com.daycare.daycareparent.ui.dashboard.adapter


import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.EnrollmentReportListItemBinding
import com.daycare.daycareparent.model.EnrollmentData

import com.daycare.daycareparent.model.EnrollmentModel
import com.daycare.daycareparent.utill.*

class EnrollmentAdapter(
    var allIncidents: ArrayList<EnrollmentData>,
    var context: Context
) :
    RecyclerView.Adapter<EnrollmentAdapter.MyBerakHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyBerakHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: EnrollmentReportListItemBinding =
            EnrollmentReportListItemBinding.inflate(layoutInflater, parent, false)
        return MyBerakHolder(binding)
    }

    override fun getItemCount(): Int {
        return allIncidents.size
    }

    override fun onBindViewHolder(holder: MyBerakHolder, position: Int) {
        val binding = holder.binding
        binding.childTxt.text = allIncidents.get(position).studentName
        binding.classTxt.text = allIncidents.get(position).className
        binding.startdateTxt.text =
            convertDate(allIncidents[position].classEnrollStartDate!!, alohaDate, incidentDisplayDate)

        binding.enddateTxt.text =
            convertDate(allIncidents[position].classEnrollEndDate.orEmpty(), alohaDate, incidentDisplayDate)
        val msg: String
        when {

            allIncidents[position].enrollmentStatus == 1 -> {
                msg = "Requested"
            }
            allIncidents[position].enrollmentStatus == 2 -> {
                msg = "Enrolled"
            }
            allIncidents[position].enrollmentStatus == 3 -> {
                msg = "Request Cancelled"
            }
            allIncidents[position].enrollmentStatus == 4 -> {
                msg = "Denied by Agency"
            }
            allIncidents[position].enrollmentStatus == 5 -> {
                msg = "Completed"
            }
            else -> {
                msg = "Not Enrolled"
            }
        }
        binding.statusTxt.text = msg
        if (AppInstance.allClasses?.data != null) {
            for (pos in 0 until AppInstance.allClasses?.data?.size!!) {
                if (allIncidents[position].classesID == AppInstance.allClasses?.data!![pos].classesID) {
                    AppInstance.allClasses?.data!![pos].fees?.let { binding.enddateTxt2.text = "$$it" }
                }
            }
        }

    }

    class MyBerakHolder(var binding: EnrollmentReportListItemBinding) :
        RecyclerView.ViewHolder(binding.breakContainer)
}
