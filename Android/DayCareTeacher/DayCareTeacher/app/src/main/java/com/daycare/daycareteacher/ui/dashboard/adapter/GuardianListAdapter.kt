package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.GuardiansListItemBinding
import com.daycare.daycareteacher.model.GuardianData
import com.daycare.daycareteacher.model.GuardianModel
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentViewModel

class GuardianListAdapter(context: Context?, var guardianList: List<GuardianData>?) :
    RecyclerView.Adapter<GuardianListAdapter.GuardianDataBindingHolder>() {

    override fun onCreateViewHolder(p0: ViewGroup, p1: Int): GuardianDataBindingHolder {
        val layoutInflater = LayoutInflater.from(p0.context)
        val binding = GuardiansListItemBinding.inflate(layoutInflater, p0, false)
        return GuardianDataBindingHolder(binding)
    }


    override fun getItemCount(): Int {
        //return 3 // childrenList.size
        return guardianList?.size!!
    }

    override fun onBindViewHolder(holder: GuardianDataBindingHolder, position: Int) {
        val binding = holder.binding

//        val viewModel = StudentViewModel(guardianList?.get(position)!!,100,200)
        binding.viewModel = guardianList?.get(position)
        if(guardianList?.get(position)?.isAuthorizedToPickup!!){
            binding.pickUpStatTxt.text="Pickup allowed"
        }
        else{
            binding.pickUpStatTxt.text="Pickup not allowed"
        }


    }


    class GuardianDataBindingHolder(var binding: GuardiansListItemBinding) :
        RecyclerView.ViewHolder(binding.guardianContainer)


}
