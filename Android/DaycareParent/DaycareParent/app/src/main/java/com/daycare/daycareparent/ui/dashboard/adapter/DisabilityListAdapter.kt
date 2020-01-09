package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.DisabilityListItemBinding
import com.daycare.daycareparent.model.StudentDisability

class DisabilityListAdapter(context: Context?, var disabiltyList: List<StudentDisability>) :
    RecyclerView.Adapter<DisabilityListAdapter.DisabiliytBindingHolder>() {

    lateinit var listener: DisablityCallBack

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): DisabilityListAdapter.DisabiliytBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DisabilityListItemBinding.inflate(layoutInflater, parent, false)
        return DisabiliytBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return disabiltyList.size
    }

    override fun onBindViewHolder(holder: DisabilityListAdapter.DisabiliytBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel = disabiltyList[position]
        binding.deleteButton.setOnClickListener {
            binding.container.close(true)
            listener.onDeleteDisablity(position,it,disabiltyList[position])
        }
        binding.editButton.setOnClickListener {
            binding.container.close(true)
            listener.onEditDisablity(disabiltyList[position], it)
        }
        binding.disabilityContainer.setOnClickListener {
            binding.container.close(true)
        }
    }

    class DisabiliytBindingHolder(var binding: DisabilityListItemBinding) :
        RecyclerView.ViewHolder(binding.container)

    fun setClickListener(guardianCallback: DisablityCallBack) {
        listener = guardianCallback
    }

    interface DisablityCallBack {
        fun onDeleteDisablity(
            position: Int,
            it: View,
            studentDisability: StudentDisability
        )
        fun onEditDisablity(data: StudentDisability, it: View)
    }
}