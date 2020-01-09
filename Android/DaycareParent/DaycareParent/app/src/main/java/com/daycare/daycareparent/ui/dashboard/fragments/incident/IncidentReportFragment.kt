package com.daycare.daycareparent.ui.dashboard.fragments.incident


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
import android.widget.AdapterView
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentIncidentReportBinding
import com.daycare.daycareparent.model.IncidentData
import com.daycare.daycareparent.model.IncidentModel
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.AddIncidentActivity
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.adapter.IncidentReportListAdapter
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.OptionConstant.VIEW_LOG
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*


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
        setupToolbar()
        binding.viewModel = viewModel
       viewModel.getIncidentReport(view)
        val recyclerView = binding.incidntReportRv
        recyclerView.layoutManager = LinearLayoutManager(view?.context, LinearLayout.VERTICAL, false)
        binding.incidntReportRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        return view
    }
    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.incident)

        toolbar.dropdown.visibility = View.VISIBLE
        toolbar.childProfile.visibility = View.VISIBLE
        toolbar.logoutTxt.visibility = View.GONE
//        setStudentImage(toolbar, PreferenceConnector.readChild(context!!, PreferenceConnector.CHILD)?.imagePath,context!!)
        toolbar.dropdown.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(p0: AdapterView<*>?) {


            }

            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {

                PreferenceConnector.writeChildInfo(
                    context!!, PreferenceConnector.CHILD,
                    AppInstance.allChilds?.get(p2)!!
                )
                val url =
                    AppInstance.allChilds?.get(p2)!!.imagePath// PreferenceConnector.readChild(context, PreferenceConnector.CHILD)?.imagePath
                setStudentImage(toolbar, url, p1?.context!!)
                viewModel.getIncidentReport(p1)
            }
        }
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
                            binding.incidntReportRv.visibility=View.VISIBLE
                            binding.txtError.visibility=View.GONE
                            mIncidentModel = it
                            listAdapter = IncidentReportListAdapter(mIncidentModel, context)
                            binding.incidntReportRv.adapter = listAdapter
                        } else {
                            binding.incidntReportRv.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
//                            showToast(context, "No Data Found!!")
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

    }

}
