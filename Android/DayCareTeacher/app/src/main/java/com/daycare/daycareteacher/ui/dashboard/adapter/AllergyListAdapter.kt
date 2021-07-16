package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.AllergyListItemBinding
import com.daycare.daycareteacher.model.StudentAllergy

class AllergyListAdapter(context: Context?, var allergyList: List<StudentAllergy>?) :
    RecyclerView.Adapter<AllergyListAdapter.AllergyBindingHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AllergyListAdapter.AllergyBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = AllergyListItemBinding.inflate(layoutInflater, parent, false)
        return AllergyBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return allergyList?.size!!
    }

    override fun onBindViewHolder(holder: AllergyListAdapter.AllergyBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = allergyList?.get(position)!!
    }

    class AllergyBindingHolder(var binding: AllergyListItemBinding) :
        RecyclerView.ViewHolder(binding.immunizationContainer)
}