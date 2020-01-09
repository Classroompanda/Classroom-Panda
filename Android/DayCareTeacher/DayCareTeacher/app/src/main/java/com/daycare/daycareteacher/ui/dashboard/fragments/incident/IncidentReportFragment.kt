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
import com.daycare.daycareteacher.databinding.FragmentIncidentReportBinding
import com.daycare.daycareteacher.model.IncidentData
import com.daycare.daycareteacher.model.IncidentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.IncidentReportListAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG


class IncidentReportFragment : Fragment() {


    private lateinit var binding: FragmentIncidentReportBinding
    private var viewModel = IncidentViewModel()
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: IncidentReportListAdapter
    var mIncidentModel = IncidentModel()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_incident_report, container, false)
        binding = FragmentIncidentReportBinding.bind(view)
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
        try{ val incidentdata = mIncidentModel.data
            val mData: IncidentData? = AppInstance.incidentData
            if (mData != null) {
                for (pos in 0 until incidentdata?.size!!) {
                    if (mData.id == incidentdata[pos].id) {
                        mIncidentModel.data?.set(pos, mData)

                        listAdapter.notifyDataSetChanged()
                    }
                }}

        }catch (e:Exception){}

    }

    private fun attachObserver(viewModel: IncidentViewModel, context: Context) {
        viewModel.addIncidentFab.observe(this, Observer<Boolean> { it ->
            it?.let {
                val intent = Intent(context, AddIncidentActivity::class.java)
                startActivityForResult(intent, INCIDENT_DATA_REQUEST)
            }
        })
        viewModel.incidentReportApiResponce.observe(this, Observer<IncidentModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            try {
                                mIncidentModel = it
                                listAdapter = IncidentReportListAdapter(mIncidentModel, context)
                                binding.incidntReportRv.adapter = listAdapter
                            }
                            catch (e:Exception){
                                showToast(context, "No Data Found!!")

                            }
                        } else {
                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })
        viewModel.deletedIncidentResponse.observe(this, Observer<Int> { it ->
            it?.let {
                showToast(context, "Deleted")
                listAdapter.notifyItemRemoved(it)
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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == INCIDENT_DATA_REQUEST && resultCode == Activity.RESULT_OK) {
            val bundle = data?.getBundleExtra(INCIDENT_DATA)
            val incidentdata = mIncidentModel.data
            val mData = bundle?.getParcelable<IncidentData>("incidentData")
            var task = VIEW_LOG
            try{
                for (pos in 0 until incidentdata?.size!!) {
                    if (mData?.id == incidentdata[pos].id) {
                        task = EDIT
                        showToast(context!!, "Edit")
                        if (mData != null) {
                            mIncidentModel.data?.add(pos, mData)
                        }
                        listAdapter.notifyItemChanged(pos)
                    }
                }
                if (task != EDIT) {
                    mData?.let { incidentdata.add(it) }
                    listAdapter.notifyDataSetChanged()
                    binding.incidntReportRv.adapter = listAdapter
                }
            }
            catch(e:Exception){
                binding.viewModel!!.getAllIncidentReportData(context!!)
            }



        }

    }

}
