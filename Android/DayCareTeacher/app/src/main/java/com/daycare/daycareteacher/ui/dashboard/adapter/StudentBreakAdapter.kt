package com.daycare.daycareteacher.ui.dashboard.adapter

import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.databinding.StudentBreakListItemBinding
import com.daycare.daycareteacher.model.StudentBreakData
import com.daycare.daycareteacher.ui.dashboard.activities.EditStudentBreakActivity
import com.daycare.daycareteacher.ui.dashboard.activities.StudentBreakInOutActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.utill.*
import java.text.SimpleDateFormat

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
        }else {
          //  binding.breakInTxt.text = "---"
           // binding.dropOfByTxt.text = "---"
        }
        binding.reasontxt.text = childrenList[position].breakReason
        //binding.pickUpByTxt.setText("sdhfjdfkjsjkd")

        if (AppInstance.allGuardians != null) {
            if (childrenList[position].pickupById != 0){
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

            var newDate = dateSelect
            if(newDate!!.length<=9){
                newDate = convertDate(newDate, SimpleDateFormat("MM-dd-yyyy"),
                    SimpleDateFormat("MM-dd-yyyy")
                )

            }else{
                newDate = convertDate(newDate, SimpleDateFormat("yyyy-MM-dddd"),
                    SimpleDateFormat("MM-dd-yyyy")
                )

            }

            if (!isToday(displayDate.parse(newDate))) {
                binding.imageButton3.visibility = View.INVISIBLE
            }

            binding.imageButton3.setOnClickListener {
               // viewModel.onClickEditBreakFab(it)
                val intent = Intent(it.context, EditStudentBreakActivity::class.java)
                intent.putExtra(STUDENT_BREAK_DATA, childrenList[position])
                intent.putExtra("S_BREAK_POSITION", position)
                intent.putExtra("TASK_ID", OptionConstant.EDIT)
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