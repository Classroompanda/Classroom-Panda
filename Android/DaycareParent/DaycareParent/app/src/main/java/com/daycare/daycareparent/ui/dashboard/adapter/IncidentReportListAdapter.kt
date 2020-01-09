package com.daycare.daycareparent.ui.dashboard.adapter

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.support.v7.app.AlertDialog
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.IncidentReportListItemBinding
import com.daycare.daycareparent.model.IncidentModel
import com.daycare.daycareparent.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareparent.ui.dashboard.fragments.incident.IncidentDetailActivity
import com.daycare.daycareparent.ui.dashboard.fragments.incident.IncidentViewModel
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.INCIDENT_DATA

class IncidentReportListAdapter(
    var allIncidents: IncidentModel,
    var context: Context
) :
    RecyclerView.Adapter<IncidentReportListAdapter.BindingIncidentHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingIncidentHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: IncidentReportListItemBinding =
            IncidentReportListItemBinding.inflate(layoutInflater, parent, false)
        return BindingIncidentHolder(binding)
    }

    override fun getItemCount(): Int {
        return allIncidents.data?.size!!
    }

    override fun onBindViewHolder(holder: BindingIncidentHolder, position: Int) {
        val binding = holder.binding
        val incidentViewModel = IncidentViewModel()
        binding.model = allIncidents.data?.get(position) ?: allIncidents.data?.get(position)

        binding.frameLyt.setOnClickListener {
            val intent = Intent(it.context, IncidentDetailActivity::class.java)
            intent.putExtra(INCIDENT_DATA, allIncidents.data?.get(position))
            AppInstance.incidentInvolvments=allIncidents.data?.get(position)?.incidentInvolvments
            (context as Activity).startActivityForResult(intent, 111)
        }

        binding.editButton.setOnClickListener {
            binding.incidentContainer.close(true)

            incidentViewModel.onClickAddIncidentFab(it)
            val intent = Intent(it.context, AddIncidentActivity::class.java)
            intent.putExtra(INCIDENT_DATA, allIncidents.data?.get(position))
            AppInstance.incidentInvolvments=allIncidents.data?.get(position)?.incidentInvolvments
            (context as Activity).startActivityForResult(intent, 111)
//            it.context.startActivity(intent)
        }

        binding.deleteButton.setOnClickListener {
            AlertDialog.Builder(it.context)
                .setTitle("Delete Incident")
                .setMessage("Are you sure you want to Delete?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()
                        incidentViewModel.deleteIncident(it, allIncidents.data?.get(position)?.id, position)
                        allIncidents.data?.removeAt(position)
                        notifyItemRemoved(position)
                    }
                }
                .setNegativeButton(
                    "No"
                ) { dialog, id -> dialog.cancel() }
                .show()

        }

    }

    class BindingIncidentHolder(var binding: IncidentReportListItemBinding) :
        RecyclerView.ViewHolder(binding.incidentContainer)
}