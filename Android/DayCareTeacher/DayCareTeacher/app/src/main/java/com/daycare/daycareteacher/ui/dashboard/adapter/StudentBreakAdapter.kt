package com.daycare.daycareteacher.ui.dashboard.adapter


import android.app.Activity
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.StudentBreakListItemBinding
import com.daycare.daycareteacher.model.StudentBreakData
import com.daycare.daycareteacher.ui.dashboard.activities.AddStudentBreakActivity

import com.daycare.daycareteacher.ui.dashboard.activities.StudentBreakInOutActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.utill.*


class StudentBreakAdapter(
    var context: StudentBreakInOutActivity,
    var childrenList: ArrayList<StudentBreakData>,
    var dateSelect: String?
) : RecyclerView.Adapter<StudentBreakAdapter.BindStudentBreakHolder>() {


    override fun onBindViewHolder(holder: BindStudentBreakHolder, position: Int) {
        val binding = holder.binding
        val viewModel = AttendanceViewModel(childrenList[position], position, "Break", holder.itemView)


        binding.breakOfTxt.text = convertDate(childrenList[position].breakOutTime!!, alohaDate, dialogDisplayTime)
        if (childrenList[position].breakStatusId == 2) {
            binding.breakInTxt.text =
                convertDate(childrenList.get(position).breakInTime!!, alohaDate, dialogDisplayTime)


        } else {
            binding.breakInTxt.text = "---"
            binding.dropOfByTxt.text = "---"
        }
        binding.reasontxt.text = childrenList[position].breakReason
        //binding.pickUpByTxt.setText("sdhfjdfkjsjkd")

        if (AppInstance.allGuardians != null) {
            if (childrenList[position].pickupById != 0) {
                for (pos in 0 until AppInstance.allGuardians?.data?.size!!) {
                    if (AppInstance.allGuardians?.data!![pos].guardianId == childrenList[position].pickupById) {

                        binding.pickUpByTxt.text = AppInstance.allGuardians?.data!![pos].guardianName
                    }
                }
            }
            if (childrenList.get(position).dropedById != 0) {
                for (pos in 0 until AppInstance.allGuardians?.data?.size!!) {
                    if (AppInstance.allGuardians?.data!![pos].guardianId == childrenList[position].dropedById) {
                        binding.dropOfByTxt.text = AppInstance.allGuardians?.data!![pos].guardianName
                    }

                }
            }
            if (!isToday(displayDate.parse(dateSelect))) {
                binding.imageButton3.visibility = View.INVISIBLE
            }
            binding.imageButton3.setOnClickListener {
                //showToast(context,"Helo data")
                //viewModel.onClickEditBreak(binding.imageBton3)
                viewModel.onClickAddBreakFab(it)
                val intent = Intent(it.context, AddStudentBreakActivity::class.java)
                intent.putExtra(STUDENT_BREAK_DATA, childrenList[position])
                intent.putExtra("S_BREAK_POSITION", position)
                //intent.putExtra(STUDENT_BREAK_DATA, childrenList.get(position))
                //AppInstance.incidentInvolvments=allIncidents.data?.get(position)?.incidentInvolvments
                (context as Activity).startActivityForResult(intent, 115)
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindStudentBreakHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = StudentBreakListItemBinding.inflate(layoutInflater, parent, false)
        return BindStudentBreakHolder(binding)
    }

    override fun getItemCount(): Int {


        return childrenList.size
    }


    class BindStudentBreakHolder(var binding: StudentBreakListItemBinding) :
        RecyclerView.ViewHolder(binding.breakContainer)
}