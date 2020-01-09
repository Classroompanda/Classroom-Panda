package com.daycare.daycareteacher.ui.profile

import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentBreakLogBinding
import com.daycare.daycareteacher.model.MyBreakLogModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.MyBreakListAdapter
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class MyBreakLogFragment : Fragment() {
    private lateinit var binding:FragmentBreakLogBinding
    private var viewModel = ProfileViewModel()
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: MyBreakListAdapter
   var mMyBreakLogModel = MyBreakLogModel()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_break_log, container, false)
        binding = FragmentBreakLogBinding.bind(view)
        binding.viewModel = viewModel
        binding.viewModel!!.getBreakLogDataRequest(view)
        val recyclerView = binding.breakReportRv
        recyclerView.layoutManager = LinearLayoutManager(view?.context, LinearLayout.VERTICAL, false)
        binding.breakReportRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        setupToolbar()
        return view
    }
    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.mybreak_log)

    }

    override fun onResume() {
        super.onResume()
        /*val incidentdata = mIncidentModel.data
        val mData: IncidentData? = AppInstance.incidentData
        if (mData != null) {
            for (pos in 0 until incidentdata?.size!!) {
                if (mData.id == incidentdata[pos].id) {
                    mIncidentModel.data?.set(pos, mData)

                    listAdapter.notifyDataSetChanged()
                }
            }
        }*/

    }

    private fun attachObserver(viewModel: ProfileViewModel, context: Context) {

        viewModel.myBreakLogReportApiResponce.observe(this, Observer<MyBreakLogModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {


                        if (it.data?.size!! >0) {
                            binding.breakReportRv.visibility=View.VISIBLE
                            binding.txtError.visibility=View.GONE
                            mMyBreakLogModel = it
                            listAdapter = MyBreakListAdapter(mMyBreakLogModel, context)
                            binding.breakReportRv.adapter = listAdapter
                        } else {
                            binding.breakReportRv.visibility=View.GONE
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
