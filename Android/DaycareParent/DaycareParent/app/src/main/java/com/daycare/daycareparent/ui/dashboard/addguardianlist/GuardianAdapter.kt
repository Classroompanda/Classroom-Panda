package com.daycare.daycareparent.ui.dashboard.addguardianlist

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.ListItemGuardianBinding
import com.daycare.daycareparent.model.ParentData

class GuardianAdapter(context: Context?, var list: List<ParentData>) :
    RecyclerView.Adapter<GuardianAdapter.GuardianBindingHolder>() {

    lateinit var callback: GuardianCallback

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GuardianBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemGuardianBinding = ListItemGuardianBinding.inflate(layoutInflater, parent, false)
        return GuardianBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: GuardianBindingHolder, position: Int) {
        val binding = holder.binding
        binding.model = list[position]
        binding.guardianContainer.setOnClickListener {
            callback.onClickItem(list[position])
        }
    }

    fun setClickListener(callback: GuardianCallback) {
        this.callback = callback
    }

    class GuardianBindingHolder(var binding: ListItemGuardianBinding) :
        RecyclerView.ViewHolder(binding.guardianContainer)

    interface GuardianCallback {
        fun onClickItem(parentData: ParentData)
    }
}