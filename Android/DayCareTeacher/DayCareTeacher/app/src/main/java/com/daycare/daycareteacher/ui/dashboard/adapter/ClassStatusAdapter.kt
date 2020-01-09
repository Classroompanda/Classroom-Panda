package com.daycare.daycareteacher.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ClassStatusListItemBinding
import com.daycare.daycareteacher.model.ClassLogData
import com.daycare.daycareteacher.ui.dashboard.fragments.dashboard.HomeFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dashboard.HomeViewModel

class ClassStatusAdapter(var context: HomeFragment, var classData: List<ClassLogData>) : RecyclerView.Adapter<ClassStatusAdapter.BindingClassStatusHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingClassStatusHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ClassStatusListItemBinding = ClassStatusListItemBinding.inflate(layoutInflater, parent, false)
        return BindingClassStatusHolder(binding)
    }

    override fun getItemCount(): Int {
        return classData.size
    }

    override fun onBindViewHolder(holder: BindingClassStatusHolder, position: Int) {
        val binding = holder.binding
        val viewModel = HomeViewModel(classData[position], position)
        binding.viewModel = viewModel
        viewModel.setLoader(context)

    }

    class BindingClassStatusHolder(var binding: ClassStatusListItemBinding) :
        RecyclerView.ViewHolder(binding.statusContainer)
}