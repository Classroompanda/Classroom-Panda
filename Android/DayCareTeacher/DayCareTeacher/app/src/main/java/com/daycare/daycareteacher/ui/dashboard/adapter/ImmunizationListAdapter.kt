package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ImmunizationListItemBinding
import com.daycare.daycareteacher.model.StudentImmunizationData

class ImmunizationListAdapter(context: Context?, var immunizationList: List<StudentImmunizationData>?) :
    RecyclerView.Adapter<ImmunizationListAdapter.ImmunizationBindingHolder>() {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ImmunizationListAdapter.ImmunizationBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = ImmunizationListItemBinding.inflate(layoutInflater, parent, false)
        return ImmunizationBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return immunizationList?.size!!
    }

    override fun onBindViewHolder(holder: ImmunizationListAdapter.ImmunizationBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = immunizationList?.get(position)!!

    }

    class ImmunizationBindingHolder(var binding: ImmunizationListItemBinding) :
        RecyclerView.ViewHolder(binding.immunizationContainer)
}

