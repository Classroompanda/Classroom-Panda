package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v4.content.ContextCompat
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.GuardiansListItemBinding
import com.daycare.daycareparent.model.GuardianData

class GuardianListAdapter(var context: Context?, var guardianList: ArrayList<GuardianData>) :
    RecyclerView.Adapter<GuardianListAdapter.GuardianDataBindingHolder>() {

    lateinit var guardianListener: GuardianCallBack

    override fun onCreateViewHolder(p0: ViewGroup, p1: Int): GuardianDataBindingHolder {
        val layoutInflater = LayoutInflater.from(p0.context)
        val binding = GuardiansListItemBinding.inflate(layoutInflater, p0, false)
        return GuardianDataBindingHolder(binding)
    }


    override fun getItemCount(): Int {
        return guardianList.size
    }

    override fun onBindViewHolder(holder: GuardianDataBindingHolder, position: Int) {
        val binding = holder.binding

//        val viewModel = StudentViewModel(guardianList?.get(position)!!,100,200)
        binding.viewModel = guardianList[position]
        if (guardianList[position].isAuthorizedToPickup!!) {
            binding.pickUpStatTxt.text = "Pickup allowed"
            binding.pickUpStatTxt.setTextColor(ContextCompat.getColor(context!!, R.color.colorPrimaryDark))
        } else {
            binding.pickUpStatTxt.text = "Pickup not allowed"
            binding.pickUpStatTxt.setTextColor(ContextCompat.getColor(context!!, R.color.colorPrimary))

        }

        binding.editButton.setOnClickListener {
            binding.container.close(true)
            guardianListener.onEditGuardian(guardianList[position], it)
        }
        binding.deleteButton.setOnClickListener {
            binding.container.close(true)
            guardianListener.onDeleteGuardian(guardianList[position], it, position)
        }
        binding.guardianContainer.setOnClickListener {
            binding.container.close(true)

        }
    }


    class GuardianDataBindingHolder(var binding: GuardiansListItemBinding) :
        RecyclerView.ViewHolder(binding.container)

    fun setClickListener(guardianCallback: GuardianCallBack) {
        guardianListener = guardianCallback
    }

    interface GuardianCallBack {
        fun onDeleteGuardian(
            data: GuardianData,
            it: View,
            position: Int
        )

        fun onEditGuardian(guardianData: GuardianData, it: View)
    }
}
