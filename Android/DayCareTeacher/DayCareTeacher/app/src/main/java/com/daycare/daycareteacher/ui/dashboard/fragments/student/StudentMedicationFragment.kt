package com.daycare.daycareteacher.ui.dashboard.fragments.student

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
import com.daycare.daycareteacher.databinding.FragmentStudentMedicationBinding
import com.daycare.daycareteacher.model.TeacherMedicationModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.TeacherStudentMedicationAdapter

import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class StudentMedicationFragment : Fragment() {
    private lateinit var binding: FragmentStudentMedicationBinding
    lateinit var viewModel: StudentViewModel
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: TeacherStudentMedicationAdapter
    var mMyBreakLogModel = TeacherMedicationModel()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_student_medication, container, false)
        binding = FragmentStudentMedicationBinding.bind(view)
        viewModel = StudentViewModel()
        binding.viewModel = viewModel
        binding.viewModel?.getStudentMedicationData(view)
        val recyclerView = binding.medicationReportRv
        recyclerView.layoutManager = LinearLayoutManager(view?.context, LinearLayout.VERTICAL, false)
        binding.medicationReportRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        setupToolbar()
        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.mymedication)

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

    private fun attachObserver(viewModel: StudentViewModel, context: Context) {

        viewModel.teacherMedicationApiResponse.observe(this, Observer<TeacherMedicationModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {

try {
    if (it.data?.isNotEmpty()!! && it.data != null) {
        binding.medicationReportRv.visibility = View.VISIBLE
        binding.txtError.visibility = View.GONE
        mMyBreakLogModel = it
        listAdapter = TeacherStudentMedicationAdapter(mMyBreakLogModel, context)
        binding.medicationReportRv.adapter = listAdapter
    } else {
        binding.medicationReportRv.visibility = View.GONE
        binding.txtError.visibility = View.VISIBLE
        showToast(context, "No Data Found!!")
    }
}catch(e:Exception){
    binding.medicationReportRv.visibility = View.GONE
    binding.txtError.visibility = View.VISIBLE
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
