package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.AllergyListItemBinding
import com.daycare.daycareparent.model.StudentAllergy

class AllergyListAdapter(context: Context?, var allergyList: List<StudentAllergy>) :
    RecyclerView.Adapter<AllergyListAdapter.AllergyBindingHolder>() {

    lateinit var listener: AllergyCallBack

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AllergyListAdapter.AllergyBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = AllergyListItemBinding.inflate(layoutInflater, parent, false)
        return AllergyBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return allergyList?.size
    }

    override fun onBindViewHolder(holder: AllergyListAdapter.AllergyBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = allergyList[position]
        binding.deleteButton.setOnClickListener {
            binding.container.close(true)
            listener.onDeleteAllergy(position,it,allergyList[position])
        }
        binding.editButton.setOnClickListener {
            binding.container.close(true)
            listener.onEditAllergy(allergyList[position], it)
        }
        binding.immunizationContainer.setOnClickListener {
            binding.container.close(true)

        }
    }

    class AllergyBindingHolder(var binding: AllergyListItemBinding) :
        RecyclerView.ViewHolder(binding.container)

    fun setClickListener(guardianCallback: AllergyCallBack) {
        listener = guardianCallback
    }

    interface AllergyCallBack {
        fun onDeleteAllergy(
            position: Int,
            it: View,
            studentAllergy: StudentAllergy
        )
        fun onEditAllergy(data: StudentAllergy, it: View)
    }
}