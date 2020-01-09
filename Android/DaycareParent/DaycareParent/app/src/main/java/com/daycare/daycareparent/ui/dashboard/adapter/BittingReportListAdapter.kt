package com.daycare.daycareparent.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.BittingReportListItemBinding

import com.daycare.daycareparent.model.IncidentModel
import com.daycare.daycareparent.ui.dashboard.fragments.incident.IncidentViewModel


class BittingReportListAdapter(
    var allIncidents: IncidentModel,
    var context: Context
) :
    RecyclerView.Adapter<BittingReportListAdapter.BindingIncidentHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingIncidentHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: BittingReportListItemBinding =
            BittingReportListItemBinding.inflate(layoutInflater, parent, false)
        return BindingIncidentHolder(binding)
    }

    override fun getItemCount(): Int {
        return allIncidents.data?.size!!
    }

    override fun onBindViewHolder(holder: BindingIncidentHolder, position: Int) {
        val binding = holder.binding
        val incidentViewModel = IncidentViewModel()
        binding.model = allIncidents.data?.get(position) ?: allIncidents.data?.get(position)




    }

    class BindingIncidentHolder(var binding: BittingReportListItemBinding) :
        RecyclerView.ViewHolder(binding.incidentContainer)
}
