package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.TeacherMedicationListItemBinding
import com.daycare.daycareparent.model.TeacherMedicationModel
import com.daycare.daycareparent.ui.dashboard.fragments.student.StudentViewModel

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

