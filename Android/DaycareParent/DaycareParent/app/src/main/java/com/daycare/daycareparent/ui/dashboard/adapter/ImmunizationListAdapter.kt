package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.ImmunizationListItemBinding
import com.daycare.daycareparent.model.StudentImmunization

class ImmunizationListAdapter(context: Context?, var immunizationList: List<StudentImmunization>) :
    RecyclerView.Adapter<ImmunizationListAdapter.ImmunizationBindingHolder>() {

    lateinit var listener: ImmunizationCallBack

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ImmunizationListAdapter.ImmunizationBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = ImmunizationListItemBinding.inflate(layoutInflater, parent, false)
        return ImmunizationBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return immunizationList.size
    }

    override fun onBindViewHolder(holder: ImmunizationListAdapter.ImmunizationBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = immunizationList?.get(position)!!

        binding.deleteButton.setOnClickListener {
            binding.container.close(true)
            listener.onDeleteImmunization(position,immunizationList[position],it)
        }
        binding.editButton.setOnClickListener {
            binding.container.close(true)
            listener.onEditImmunization(immunizationList[position], it)
        }
        binding.immunizationContainer.setOnClickListener {
            binding.container.close(true)
        }

    }

    class ImmunizationBindingHolder(var binding: ImmunizationListItemBinding) :
        RecyclerView.ViewHolder(binding.container)

    fun setClickListener(guardianCallback: ImmunizationCallBack) {
        listener = guardianCallback
    }

    interface ImmunizationCallBack {
        fun onDeleteImmunization(
            position: Int,
            studentImmunization: StudentImmunization,
            it: View
        )
        fun onEditImmunization(data: StudentImmunization, it: View)
    }
}

