package com.daycare.daycareteacher.ui.dashboard.activities

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAddEventBinding
import com.daycare.daycareteacher.model.AllEventDataList
import com.daycare.daycareteacher.model.ClassModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.fragments.calender.CalendarViewModel
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import kotlinx.android.synthetic.main.toolbar.view.*
import org.angmarch.views.NiceSpinner
import java.text.SimpleDateFormat
import java.util.*

class AddEventActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAddEventBinding
    private var viewModel = CalendarViewModel()
    private lateinit var toolbar: Toolbar
    private var loader = Loader()
    private lateinit var intervalSpinner: NiceSpinner
    private var involvedClass = ArrayList<String>()
    private var eventData: AllEventDataList? = null
    private var selectedDate: String = ""
    private var TASK_ID = OptionConstant.VIEW_LOG

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_event)
        eventData = intent.getParcelableExtra(EVENT_DATA)
        selectedDate = try {
            intent.getStringExtra("selectedDate")
        } catch (e: Exception) {
            Log.e("Exception", "" + e).toString()
        }

        if (eventData != null) {
            TASK_ID = EDIT
            AppInstance.eventItemData = eventData
            binding.btnAddEvent.text = "UPDATE EVENT"
            binding.intervalSpinner.isEnabled = false
        } else {
            if (!selectedDate.equals("")) {
                val formattedDate = convertDate(
                    selectedDate,
                    SimpleDateFormat("MM-dd-yyyy", Locale.getDefault()),
                    SimpleDateFormat("dd MMM yyyy", Locale.getDefault())
                )
                binding.edtStartDate.setText(formattedDate)

            } else {
                val c = Calendar.getInstance().time
                val df = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())
                val formattedDate = df.format(c)
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
        if (TASK_ID == EDIT) {
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
        hideVirtualKeyboard(this)
        intervalSpinner = binding.intervalSpinner

        intervalSpinner.setOnItemSelectedListener(object : OnItemSelectedListener {
            override fun onItemSelected(parentView: AdapterView<*>, selectedItemView: View, position: Int, id: Long) {
                // your code here
                if (position == 2) {
                    binding.edtIntervalDate.visibility = View.GONE
                } else {
                    binding.edtIntervalDate.visibility = View.VISIBLE
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
        viewModel.isEventAdded.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
//                    val intent = Intent()
                    intent.putExtra(EVENT_DATA, eventData)
                    setResult(Activity.RESULT_OK, intent)
                    finish()
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
