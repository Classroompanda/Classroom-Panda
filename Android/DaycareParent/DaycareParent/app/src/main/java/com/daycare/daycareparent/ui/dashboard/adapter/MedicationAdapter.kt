package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.MedicationListItemBinding
import com.daycare.daycareparent.model.StudentMedication

class MedicationAdapter(context: Context?, var medicationList: List<StudentMedication>) :
    RecyclerView.Adapter<MedicationAdapter.MedicationBindingHolder>() {

    lateinit var listener: MedicationCallBack

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MedicationAdapter.MedicationBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = MedicationListItemBinding.inflate(layoutInflater, parent, false)
        return MedicationBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return medicationList.size
    }

    override fun onBindViewHolder(holder: MedicationAdapter.MedicationBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = medicationList[position]
        binding.deleteButton.setOnClickListener {
            binding.container.close(true)
            listener.onDeleteMedication(position,it,medicationList[position])
        }
        binding.editButton.setOnClickListener {
            binding.container.close(true)
            listener.onEditMedication(medicationList[position], it)
        }
        binding.medicationContainer.setOnClickListener {
            binding.container.close(true)
        }
    }

    class MedicationBindingHolder(var binding: MedicationListItemBinding) :
        RecyclerView.ViewHolder(binding.container)


    fun setClickListener(guardianCallback: MedicationCallBack) {
        listener = guardianCallback
    }

    interface MedicationCallBack {
        fun onDeleteMedication(
            position: Int,
            it: View,
            studentMedication: StudentMedication
        )
        fun onEditMedication(data: StudentMedication, it: View)
    }
}