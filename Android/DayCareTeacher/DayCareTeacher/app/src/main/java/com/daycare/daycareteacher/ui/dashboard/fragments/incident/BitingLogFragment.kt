package com.daycare.daycareteacher.ui.dashboard.fragments.incident


import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentBitingLogBinding
import com.daycare.daycareteacher.databinding.FragmentIncidentReportBinding
import com.daycare.daycareteacher.model.IncidentData
import com.daycare.daycareteacher.model.IncidentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.BittingReportListAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.IncidentReportListAdapter
import com.daycare.daycareteacher.utill.*

class BitingLogFragment : Fragment() {



    private lateinit var binding: FragmentBitingLogBinding
    private var viewModel = IncidentViewModel()
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: BittingReportListAdapter
    var mIncidentModel = IncidentModel()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_biting_log, container, false)
        binding = FragmentBitingLogBinding.bind(view)
        binding.viewModel = viewModel
        binding.viewModel!!.getAllIncidentReportData(context!!)
        val recyclerView = binding.incidntReportRv
        recyclerView.layoutManager = LinearLayoutManager(view?.context, LinearLayout.VERTICAL, false)
        binding.incidntReportRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        return view
    }

    override fun onResume() {
        super.onResume()
        try {
            val incidentdata = mIncidentModel.data
            val mData: IncidentData? = AppInstance.incidentData
            if (mData != null) {
                for (pos in 0 until incidentdata?.size!!) {
                    if (mData.id == incidentdata[pos].id) {
                        mIncidentModel.data?.set(pos, mData)

                        listAdapter.notifyDataSetChanged()
                    }
                }
            }
        }
        catch(e:Exception){}

    }

    private fun attachObserver(viewModel: IncidentViewModel, context: Context) {

        viewModel.incidentReportApiResponce.observe(this, Observer<IncidentModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            binding.incidntReportRv.visibility=View.VISIBLE
                            binding.txtError.visibility=View.GONE
                            mIncidentModel = it
                            listAdapter = BittingReportListAdapter(mIncidentModel, context)
                            binding.incidntReportRv.adapter = listAdapter
                        } else {
                            binding.incidntReportRv.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }





}
