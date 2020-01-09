package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.MybreakReportListItemBinding
import com.daycare.daycareteacher.model.MyBreakLogModel

import com.daycare.daycareteacher.utill.alohaDate
import com.daycare.daycareteacher.utill.convertDate
import com.daycare.daycareteacher.utill.dialogDisplayTime

class MyBreakListAdapter(
    var allIncidents: MyBreakLogModel,
    var context: Context
) :
    RecyclerView.Adapter<MyBreakListAdapter.MyBerakHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyBerakHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: MybreakReportListItemBinding =
            MybreakReportListItemBinding.inflate(layoutInflater, parent, false)
        return MyBerakHolder(binding)
    }

    override fun getItemCount(): Int {
        return allIncidents.data?.size!!
    }

    override fun onBindViewHolder(holder: MyBerakHolder, position: Int) {
        val binding = holder.binding

        binding.model = allIncidents.data?.get(position) ?: allIncidents.data?.get(position)
        binding.breakinTxt.setText(convertDate(allIncidents.data?.get(position)?.breakIn!!,  alohaDate, dialogDisplayTime))

        if(allIncidents.data?.get(position)?.breakStatusID==2){
            binding.breakoutTxt.setText(convertDate(allIncidents.data?.get(position)?.breakOut!!,  alohaDate, dialogDisplayTime))
        }
        else{
            binding.breakoutTxt.setText("---")
        }

        binding.reasonTxt.setText(allIncidents.data?.get(position)?.breakReason)



    }

    class MyBerakHolder(var binding: MybreakReportListItemBinding) :
        RecyclerView.ViewHolder(binding.breakContainer)
}

