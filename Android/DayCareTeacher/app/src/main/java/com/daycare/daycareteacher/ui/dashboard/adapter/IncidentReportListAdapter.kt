package com.daycare.daycareteacher.ui.dashboard.adapter

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.databinding.IncidentReportListItemBinding
import com.daycare.daycareteacher.model.IncidentModel
import com.daycare.daycareteacher.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentViewModel
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.INCIDENT_DATA

class IncidentReportListAdapter(
    var allIncidents: IncidentModel,
    var context: Context) :
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

        binding.incidentContainer.close(true)

        binding.frame.setOnClickListener{
            binding.incidentContainer.close(true)
        }

        binding.frameSwipeButtons.setOnClickListener{
            binding.incidentContainer.close(true)
        }

        binding.editButton.setOnClickListener {
            binding.incidentContainer.close(true)

            incidentViewModel.onClickAddIncidentFab(it)
            val intent = Intent(it.context, AddIncidentActivity::class.java)
            intent.putExtra(INCIDENT_DATA, allIncidents.data?.get(position))
            AppInstance.incidentInvolvments=allIncidents.data?.get(position)?.incidentInvolvments
            (context as Activity).startActivityForResult(intent, 111)
        }

        if(allIncidents.data?.get(position)?.isAcknowledge==true){
            binding.deleteButton.isEnabled=false
            binding.deleteButton.isClickable=false
            binding.deleteButton.setBackgroundColor(Color.GRAY)

            binding.acknowledgebyparent.visibility=View.VISIBLE

        }
        else{
            binding.acknowledgebyparent.visibility=View.INVISIBLE
            binding.deleteButton.isEnabled=true
            binding.deleteButton.isClickable=true
            binding.editButton.isEnabled=true
            binding.editButton.isClickable=true
        }

        binding.deleteButton.setOnClickListener {
            binding.incidentContainer.close(true)

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
                        notifyDataSetChanged()
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
