package com.daycare.daycareparent.ui.dashboard.activities

import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddIncidentBinding
import com.daycare.daycareparent.model.IncidentData
import com.daycare.daycareparent.model.StudentModel
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.fragments.incident.IncidentViewModel
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.INCIDENT_DATA
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.OptionConstant.VIEW_LOG
import com.daycare.daycareparent.utill.hideVirtualKeyboard
import kotlinx.android.synthetic.main.toolbar.view.*
import org.angmarch.views.NiceSpinner
import java.util.*
import kotlin.collections.ArrayList

class AddIncidentActivity : AppCompatActivity() {

    lateinit var binding: ActivityAddIncidentBinding
    var viewModel = IncidentViewModel()
    var loader = Loader()
    lateinit var recyclerviewSearch: RecyclerView
    private lateinit var niceSpinner: NiceSpinner
    private var involvedStudents = ArrayList<String>()
    lateinit var toolbar: Toolbar
    var incidentData: IncidentData? = null
    var TASK_ID = VIEW_LOG

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_incident)
        incidentData = intent.getParcelableExtra(INCIDENT_DATA)
//        TASK_ID = intent.getIntExtra("taskId", EDIT)
        if (incidentData != null) {
            TASK_ID = EDIT
            AppInstance.incidentData = incidentData
            binding.btnAddIncident.text="UPDATE INCIDENT"
        }
        viewModel = IncidentViewModel(binding.spinnerClassName, TASK_ID)
        binding.viewModel = viewModel
        hideVirtualKeyboard(this)
        setUpToolBar()
        attachObserver(viewModel, this)
        initView()
    }

    private fun initView() {
        niceSpinner = binding.spinnerStudent
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.add_incident)
        if(TASK_ID== EDIT){
            toolbar.headerTxt.text = getString(R.string.update_incident)
        }

        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    override fun onBackPressed() {
        // When the user hits the back button set the resultCode
        // as Activity.RESULT_CANCELED to indicate a failure
        setResult(Activity.RESULT_CANCELED)
        super.onBackPressed()
        finish()
    }


    private fun attachObserver(viewModel: IncidentViewModel, context: Context) {

        viewModel.studentApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is StudentModel) {

                    val data: MutableList<String> = mutableListOf()
                    for (pos in 0 until it.data?.size!!) {
                        it.data[pos].studentName?.let { it1 -> data.add(it1) }
                    }
                    val dataset = LinkedList(data)
                    niceSpinner.attachDataSource(dataset)

                }
            }
        })
        viewModel.allStudentsApiResponse.observe(this, Observer<StudentModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {
                    viewModel.multipleSelectDialog(binding.tvParticipant, it)
                } else {

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
        viewModel.allInvolvedStudent.observe(this, Observer<ArrayList<String>> { it ->
            it?.let {
                if (it.size > 0) {
                    involvedStudents = it
                    var stds = ""
                    for (i: Int in 0 until it.size) {
                        stds += if (i == it.size - 1) {
                            it[i]
                        } else {
                            it[i] + ", "
                        }
                    }
                    binding.selectedStudents.text = stds
                    binding.selectedStudents.visibility = View.VISIBLE
                } else {
                    binding.selectedStudents.visibility = View.GONE
                }
            }

        })
    }

}