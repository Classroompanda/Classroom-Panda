package com.daycare.daycareteacher.ui.dashboard.fragments.incident

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentIncidentReportBinding
import com.daycare.daycareteacher.model.IncidentData
import com.daycare.daycareteacher.model.IncidentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.IncidentReportListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.INCIDENT_DATA
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG
import com.daycare.daycareteacher.utill.showToast

class IncidentReportFragment : Fragment() {
    var _isFragmentLoaded = false

    private lateinit var binding: FragmentIncidentReportBinding
    private var viewModel = IncidentViewModel()
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: IncidentReportListAdapter
    var mIncidentModel = IncidentModel()

    @SuppressLint("WrongConstant")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_incident_report, container, false)
        binding = FragmentIncidentReportBinding.bind(view)
        binding.viewModel = viewModel

        val recyclerView = binding.incidntReportRv
        recyclerView.layoutManager =
            LinearLayoutManager(
                view?.context,
                LinearLayout.VERTICAL,
                false)

        binding.incidntReportRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        return view
    }

    private fun loadData(context: Context) {
        if(viewModel!=null)
            viewModel.getAllIncidentReportData(context)
        Log.d("fragment","load data called")
    }

    override fun setUserVisibleHint(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser);
        Log.d("fragment","setUserVisibleHint Incident Called")

        if (isVisibleToUser && !_isFragmentLoaded ) {
            Log.d("fragment","inside if incident")
            DashboardActivity.context.let {
                loadData(it!!)
            }
            _isFragmentLoaded = false;
        }
    }

    override fun onResume() {
        super.onResume()
        if(AppInstance.isComingfromEdit) {
            DashboardActivity.context.let {
                AppInstance.isComingfromEdit = false
                loadData(it!!)
            }
        }
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
                            } catch (e: Exception) {
                                // showToast(context, "No Data Found!!")
                                e.printStackTrace()
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
                if (task != EDIT) {
                    mData?.let { incidentdata?.add(it) }
                    listAdapter.notifyDataSetChanged()
                    binding.incidntReportRv.adapter = listAdapter
                }else{
                    for (pos in 0 until incidentdata?.size!!) {
                        if (mData?.id == incidentdata[pos].id) {
                            task = EDIT
                            Log.d("fragment" , " Edit successfully oActivity result")
                        }
                    }
                }
                binding.viewModel!!.getAllIncidentReportData(context!!)
            }
            catch (e: Exception){
                binding.viewModel!!.getAllIncidentReportData(context!!)
            }
        }
    }
}
