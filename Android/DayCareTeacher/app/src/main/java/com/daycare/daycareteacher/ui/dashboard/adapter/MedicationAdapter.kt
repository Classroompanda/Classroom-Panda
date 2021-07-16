package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.MedicationListItemBinding
import com.daycare.daycareteacher.model.StudentMedication

class MedicationAdapter(context: Context?, var medicationList: List<StudentMedication>?) :
    RecyclerView.Adapter<MedicationAdapter.MedicationBindingHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MedicationAdapter.MedicationBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = MedicationListItemBinding.inflate(layoutInflater, parent, false)
        return MedicationBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return medicationList?.size!!
    }

    override fun onBindViewHolder(holder: MedicationAdapter.MedicationBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = medicationList?.get(position)!!
    }

    class MedicationBindingHolder(var binding: MedicationListItemBinding) :
        RecyclerView.ViewHolder(binding.medicationContainer)
}