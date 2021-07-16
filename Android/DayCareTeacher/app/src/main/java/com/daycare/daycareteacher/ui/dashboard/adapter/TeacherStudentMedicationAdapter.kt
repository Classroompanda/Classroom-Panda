package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.TeacherMedicationListItemBinding
import com.daycare.daycareteacher.model.MyBreakLogModel
import com.daycare.daycareteacher.model.TeacherMedicationModel
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentViewModel
import com.daycare.daycareteacher.utill.alohaDate
import com.daycare.daycareteacher.utill.convertDate
import com.daycare.daycareteacher.utill.dialogDisplayTime

class TeacherStudentMedicationAdapter(
    var allIncidents: TeacherMedicationModel,
    var context: Context
) :
    RecyclerView.Adapter<TeacherStudentMedicationAdapter.TeacherMedicationHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TeacherMedicationHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: TeacherMedicationListItemBinding =
            TeacherMedicationListItemBinding.inflate(layoutInflater, parent, false)
        return TeacherMedicationHolder(binding)
    }

    override fun getItemCount(): Int {
        return allIncidents.data?.size!!
    }

    override fun onBindViewHolder(holder: TeacherMedicationHolder, position: Int) {
        val binding = holder.binding
        

        val viewModel = StudentViewModel(allIncidents.data?.get(position)!!, position,"Medication")
        binding.viewModel = viewModel


    }

    class TeacherMedicationHolder(var binding: TeacherMedicationListItemBinding) :
        RecyclerView.ViewHolder(binding.medicationContainer)
}

