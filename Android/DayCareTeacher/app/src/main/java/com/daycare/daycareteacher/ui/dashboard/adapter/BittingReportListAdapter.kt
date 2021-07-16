package com.daycare.daycareteacher.ui.dashboard.adapter

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.databinding.BittingReportListItemBinding
import com.daycare.daycareteacher.model.BitingModel
import com.daycare.daycareteacher.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentViewModel
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.INCIDENT_DATA

class BittingReportListAdapter(
    var allIncidents: BitingModel,
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

        binding.incidentContainer.close(true)

        binding.frame.setOnClickListener{
            binding.incidentContainer.close(true)
        }

        binding.frameSwipeBtns.setOnClickListener{
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


        binding.deleteButton.setOnClickListener {
            binding.incidentContainer.close(true)

            AlertDialog.Builder(it.context)
                .setTitle("Delete Biting Report")
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

    class BindingIncidentHolder(var binding: BittingReportListItemBinding) :
        RecyclerView.ViewHolder(binding.incidentContainer)
}
