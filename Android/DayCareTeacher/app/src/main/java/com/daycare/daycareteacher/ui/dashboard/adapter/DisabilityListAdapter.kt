package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.DisabilityListItemBinding
import com.daycare.daycareteacher.model.StudentDisabilityData

class DisabilityListAdapter(context: Context?, var disabiltyList: List<StudentDisabilityData>?) :
    RecyclerView.Adapter<DisabilityListAdapter.DisabiliytBindingHolder>() {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): DisabilityListAdapter.DisabiliytBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DisabilityListItemBinding.inflate(layoutInflater, parent, false)
        return DisabiliytBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return disabiltyList?.size!!
    }

    override fun onBindViewHolder(holder: DisabilityListAdapter.DisabiliytBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = disabiltyList?.get(position)!!

    }

    class DisabiliytBindingHolder(var binding: DisabilityListItemBinding) :
        RecyclerView.ViewHolder(binding.disabilityContainer)
}