package com.daycare.daycareparent.ui.profile

import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentEnrollmentBinding
import com.daycare.daycareparent.model.EnrollmentData
import com.daycare.daycareparent.model.EnrollmentModel
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.adapter.EnrollmentAdapter
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class EnrollmentReportFragment : Fragment() {
    private lateinit var binding: FragmentEnrollmentBinding
    private var viewModel = ProfileViewModel()
    private var loader = Loader()
    private val INCIDENT_DATA_REQUEST = 111
    lateinit var listAdapter: EnrollmentAdapter
    var mMyBreakLogModel = EnrollmentModel()
    var list = ArrayList<EnrollmentData>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_enrollment, container, false)
        binding = FragmentEnrollmentBinding.bind(view)
        binding.viewModel = viewModel
        setAdapter()
        viewModel.getBreakLogDataRequest(view)
        viewModel.getClasses(view)
        if (PreferenceConnector.readUser(context!!, PreferenceConnector.USER)?.isGaurdian!!) {
            binding.enrollStudentFab.hide()
        }
        attachObserver(viewModel, context!!)
        setupToolbar()
        return view
    }

    private fun setAdapter() {
        val recyclerView = binding.breakReportRv
        recyclerView.layoutManager = LinearLayoutManager(view?.context, LinearLayout.VERTICAL, false)
        binding.breakReportRv.layoutManager = recyclerView.layoutManager
        listAdapter = EnrollmentAdapter(list, context!!)
        binding.breakReportRv.adapter = listAdapter
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.my_enrollment)

        toolbar.dropdown.visibility = View.VISIBLE
        toolbar.childProfile.visibility = View.VISIBLE
        toolbar.logoutTxt.visibility = View.GONE
//        setStudentImage(
//            toolbar,
//            PreferenceConnector.readChild(context!!, PreferenceConnector.CHILD)?.imagePath,
//            context!!
//        )
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
                viewModel.getBreakLogDataRequest(p1)

            }
        }
    }


    private fun attachObserver(viewModel: ProfileViewModel, context: Context) {

        viewModel.enrollmentApiResponce.observe(this, Observer<EnrollmentModel> { it ->
            it?.let {

                if (it.statusCode == Success && it.data != null && it.data.isNotEmpty()) {
                    binding.breakReportRv.visibility = View.VISIBLE
                    binding.txtError.visibility = View.GONE
                    list.clear()
                    list.addAll(it.data)
                    listAdapter.notifyDataSetChanged()

                } else {
                    binding.breakReportRv.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE
//                    showToast(context, "No Data Found!!")
                }
            }
        })
        viewModel.enrollRequested.observe(this, Observer<EnrollmentData> { it ->
            it?.let {
                list.add(it)
                listAdapter.notifyDataSetChanged()
                binding.breakReportRv.visibility = View.VISIBLE
                binding.txtError.visibility = View.GONE
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
