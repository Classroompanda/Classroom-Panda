package com.daycare.daycareparent.ui.dashboard.activities

import android.app.Activity
import android.content.Context
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddEventBinding
import com.daycare.daycareparent.ui.dashboard.fragments.calender.CalendarViewModel
import kotlinx.android.synthetic.main.toolbar.view.*
import android.arch.lifecycle.Observer
import android.view.View
import com.daycare.daycareparent.model.ClassModel
import com.daycare.daycareparent.repository.ResponseCodes
import org.angmarch.views.NiceSpinner
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.AdapterView
import com.daycare.daycareparent.model.AllEventDataList
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.EDIT

import java.text.SimpleDateFormat
import java.util.*


class AddEventActivity : AppCompatActivity() {

    lateinit var binding: ActivityAddEventBinding
    var viewModel = CalendarViewModel()
    lateinit var toolbar: Toolbar
    var loader = Loader()
    private lateinit var intervalSpinner:NiceSpinner
    private var involvedClass = ArrayList<String>()
    var eventData: AllEventDataList? = null
    var selectedDate:String=""

    var TASK_ID = OptionConstant.VIEW_LOG


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_event)
        eventData = intent.getParcelableExtra(EVENT_DATA)
        try {
            selectedDate = intent.getStringExtra("selectedDate")
        }catch(e:Exception){
            selectedDate=""
        }

//        TASK_ID = intent.getIntExtra("taskId", EDIT)
        if (eventData != null) {
            TASK_ID = EDIT
            AppInstance.eventItemData = eventData
            binding.btnAddEvent.text="UPDATE EVENT"
        }else{
            if(!selectedDate.equals(""))
            {
                var formattedDate= convertDate(selectedDate,SimpleDateFormat("MM-dd-yyyy"), SimpleDateFormat("dd MMM yyyy"))
                binding.edtStartDate.setText(formattedDate)

            }else{
                val c = Calendar.getInstance().getTime()
                val df = SimpleDateFormat("dd MMM yyyy")
                var formattedDate = df.format(c)
               binding.edtStartDate.setText(formattedDate)
            }
        }

        viewModel = CalendarViewModel(binding.intervalSpinner, TASK_ID)
        binding.viewModel = viewModel

        val c = Calendar.getInstance().getTime()
        println("Current time => $c")
        attachObserver(viewModel, this)
        initView()
        setUpToolBar()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.add_new_event)
        if(TASK_ID== EDIT){
            toolbar.headerTxt.text = getString(R.string.update_event)
        }
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    private fun initView() {
        binding.edtEndDate.showSoftInputOnFocus = false
        binding.edtStartDate.showSoftInputOnFocus = false
        binding.edtStartTime.showSoftInputOnFocus = false
        binding.edtEndTime.showSoftInputOnFocus = false
        // viewModel.onClickClassList(View(this))
        intervalSpinner=binding.intervalSpinner

        intervalSpinner.setOnItemSelectedListener(object : OnItemSelectedListener {
            override fun onItemSelected(parentView: AdapterView<*>, selectedItemView: View, position: Int, id: Long) {
                // your code here
                if(position==2){
                    binding.edtIntervalDate.visibility=View.GONE
                }else{
                    binding.edtIntervalDate.visibility=View.VISIBLE
                }
            }

            override fun onNothingSelected(parentView: AdapterView<*>) {
                // your code here
            }

        })
    }

    private fun attachObserver(viewModel: CalendarViewModel, context: Context) {

        viewModel.classApiResponse.observe(this, Observer<ClassModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.statusCode == ResponseCodes.Success) {
                            viewModel.multipleSelectDialog(binding.tvClassList, it)
                        } else {

                        }
                    }
                    else -> {
                        // showToast(context, it.message!!)
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


        viewModel.allInvolvedClass.observe(this, Observer<ArrayList<String>> { it ->
            it?.let {
                if (it.size > 0) {
                    involvedClass = it
                    var stds = ""
                    for (i: Int in 0 until it.size) {
                        stds += if (i == it.size - 1) {
                            it[i]
                        } else {
                            it[i] + ", "
                        }
                    }
                    binding.selectedClass.text = stds
                    binding.selectedClass.visibility = View.VISIBLE
                } else {
                    binding.selectedClass.visibility = View.GONE
                }
            }

        })
    }




    override fun onBackPressed() {
        // When the user hits the back button set the resultCode
        // as Activity.RESULT_CANCELED to indicate a failure
        setResult(Activity.RESULT_CANCELED)
        super.onBackPressed()
        finish()
    }
}