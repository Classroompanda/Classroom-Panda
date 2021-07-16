package com.daycare.daycareteacher.ui.dashboard.activities

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityStudentBreakinoutBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.BreakData
import com.daycare.daycareteacher.model.GuardianModel
import com.daycare.daycareteacher.model.StudentBreakData
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.adapter.StudentBreakAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.fragment_break_log.*
import kotlinx.android.synthetic.main.toolbar.view.*
import java.text.SimpleDateFormat

class StudentBreakInOutActivity : AppCompatActivity(), ILoaderCallback {

    lateinit var binding: ActivityStudentBreakinoutBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var viewModel = AttendanceViewModel()
    var loader = Loader()
    lateinit var listAdapter: StudentBreakAdapter
    private val ADD_BREAK_DATA_REQUEST = 115
    private val EDIT_BREAK_DATA_REQUEST = 116

    var list: ArrayList<StudentBreakData> = ArrayList()
    var mBreakModel = BreakData()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_student_breakinout)

        val recyclerView = binding.studentBreakReportRv
        setUpToolBar()

        recyclerView.layoutManager =
            LinearLayoutManager(
                this,
                RecyclerView.VERTICAL,
                false)

        binding.studentBreakReportRv.layoutManager = recyclerView.layoutManager
        try {
            activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
            AppInstance.breakParentPosition = activityPosition
            dateSelect = intent.getStringExtra("SelectedDate")

            binding.studentBreakReportRv.visibility = View.VISIBLE
            binding.txtError.visibility = View.GONE
        } catch (e: Exception) {
            binding.txtError.visibility = View.VISIBLE
            binding.studentBreakReportRv.visibility = View.GONE
        }

        binding.txtUsername.text = AppInstance.allAttendanceData?.data?.get(activityPosition)?.studentName

        //  2-8-2021

        if(dateSelect.length<=9){
            binding.txtDate.text = convertDate(dateSelect, SimpleDateFormat("MM-dd-yyyy"),SimpleDateFormat("dd-MMM-yyyy"))

        }else{
            binding.txtDate.text = convertDate(dateSelect, SimpleDateFormat("yyyy-MM-dddd"),SimpleDateFormat("dd-MMM-yyyy"))

        }
        Log.d("date is "," date select::   "+ dateSelect)
        Log.d("date is "," date length::   "+ dateSelect.length)

        Log.d("date is ","  "+AppInstance.allAttendanceData?.data?.get(activityPosition)?.calendarSelectedDate)
        viewModel = AttendanceViewModel()
        viewModel.getGuardiansDataSimple(this, activityPosition)
        binding.viewModel = viewModel
        attachObserver(viewModel, this)
        Glide.with(binding.userProfilePic.context)
            .load(AppInstance.allAttendanceData?.data?.get(activityPosition)?.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(binding.userProfilePic.context))
            .into(binding.userProfilePic)

        var newDate = dateSelect
        if(newDate.length<9){
            newDate = convertDate(dateSelect, SimpleDateFormat("MM-dd-yyyy"),SimpleDateFormat("MM-dd-yyyy"))
        }else{
            newDate = convertDate(dateSelect, SimpleDateFormat("yyyy-MM-dddd"),SimpleDateFormat("MM-dd-yyyy"))

        }

        var date = SimpleDateFormat("MM-dd-yyyy").parse(newDate)//convertStringToDateWithoutTimeZone(dateSelect)

        if (!viewModel.checkBreakStatus() && date?.let {
                isToday(it)
            } == true
        ) {
            binding.fabAdd.show()
        } else {
            binding.fabAdd.hide()
        }



        swipeRefresh.setOnRefreshListener {
            // var date = convertStringToDateWithoutTimeZone(AppInstance.allAttendanceData?.data?.get(activityPosition)?.calendarSelectedDate)

            var newDate = dateSelect
            if(newDate.length<9){
                newDate = convertDate(dateSelect, SimpleDateFormat("MM-dd-yyyy"),SimpleDateFormat("MM-dd-yyyy"))

            }else{
                newDate = convertDate(dateSelect, SimpleDateFormat("yyyy-MM-dddd"),SimpleDateFormat("MM-dd-yyyy"))

            }


            var date = SimpleDateFormat("MM-dd-yyyy").parse(newDate)
            if (!viewModel.checkBreakStatus() && date?.let {
                    isToday(it)
                } == true
            ) {
                binding.fabAdd.show()
            } else {
                binding.fabAdd.hide()
            }

            swipeRefresh.isRefreshing = false   // reset the SwipeRefreshLayout (stop the loading spinner)
        }
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.student_break_status)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    override fun startLoader(value: Boolean) {
        if (value) {
            this?.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }

    override fun onResume() {
        super.onResume()

        try {
            activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
            AppInstance.breakParentPosition = activityPosition
            dateSelect = intent.getStringExtra("SelectedDate")

            binding.studentBreakReportRv.visibility = View.VISIBLE
            binding.txtError.visibility = View.GONE


        } catch (e: Exception) {
            binding.txtError.visibility = View.VISIBLE
            binding.studentBreakReportRv.visibility = View.GONE
        }

        var newDate = dateSelect
        if(newDate.length<9){
            newDate = convertDate(dateSelect, SimpleDateFormat("MM-dd-yyyy"),SimpleDateFormat("MM-dd-yyyy"))

        }else{
            newDate = convertDate(dateSelect, SimpleDateFormat("yyyy-MM-dddd"),SimpleDateFormat("MM-dd-yyyy"))

        }

        var date = SimpleDateFormat("MM-dd-yyyy").parse(newDate)
        if (!viewModel.checkBreakStatus() && date?.let {
                isToday(
                    it
                )
            } == true
        ) {
            binding.fabAdd.show()
        } else {
            binding.fabAdd.hide()
        }
    }

    private fun attachObserver(viewModel: AttendanceViewModel, context: Context) {

        viewModel.addBreakFab.observe(this, Observer<Boolean> { it ->
            it?.let {
                val intent = Intent(context, AddStudentBreakActivity::class.java)
                intent.putExtra("TASK_ID", 0)
                startActivityForResult(intent, ADD_BREAK_DATA_REQUEST)
            }
        })

        viewModel.editBreakFab.observe(this, Observer<Boolean> { it ->
            it?.let {
                val intent = Intent(context, EditStudentBreakActivity::class.java)
                intent.putExtra("TASK_ID", OptionConstant.EDIT)
                startActivityForResult(intent, EDIT_BREAK_DATA_REQUEST)
            }
        })

        viewModel.guardianApiResponse.observe(this, Observer<GuardianModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            if (AppInstance.breakData != null && AppInstance.breakData?.data != null && AppInstance.breakData?.data!!.isNotEmpty()) {
                                list = AppInstance.breakData?.data!!
                                binding.studentBreakReportRv.visibility = View.VISIBLE
                                binding.txtError.visibility = View.GONE

                                listAdapter =
                                  //  AppInstance.allAttendanceData?.data?.get(activityPosition)?.attendanceDate?.let { it1 ->
                                        StudentBreakAdapter(
                                            this, list,
                                            dateSelect //it1
                                        )
                                   // }!!
                                binding.studentBreakReportRv.adapter = listAdapter
                            } else {
                                binding.studentBreakReportRv.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
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

        viewModel.breakStatusResponse.observe(this, Observer<BreakData> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            if (AppInstance.breakData != null) {
                                binding.studentBreakReportRv.visibility = View.VISIBLE
                                binding.txtError.visibility = View.GONE
                                mBreakModel = it
                                listAdapter = StudentBreakAdapter(
                                    this,
                                    AppInstance.breakData?.data!!, dateSelect
                                )
                                binding.studentBreakReportRv.adapter = listAdapter
                            } else {
                                binding.studentBreakReportRv.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
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

        viewModel.breakEditStatusResponse.observe(this, Observer<BreakData> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            try {
                                if (mBreakModel.data != null) {
                                    val breakData = mBreakModel.data
                                    listAdapter.notifyItemChanged(AppInstance.breakPosition!!)
                                } else {
                                }

                            } catch (e: Exception) {
                                Log.i("Data", "No data")
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

        if (requestCode == ADD_BREAK_DATA_REQUEST && resultCode == Activity.RESULT_OK) {
           // val bundle = data?.getBundleExtra(STUDENT_BREAK_DATA)
            val incidentdata = AppInstance.breakData?.data
            mBreakModel.data = AppInstance.breakData?.data
            val mData = AppInstance.studentBreakData
            var task = OptionConstant.VIEW_LOG
            for (pos in 0 until incidentdata?.size!!) {
                if (mData?.id == incidentdata[pos].id) {
                    task = OptionConstant.EDIT
                    // showToast(this!!, "Edit")
                    if (mData != null) {
                        mBreakModel.data?.set(pos, mData)
                    }
                    listAdapter = StudentBreakAdapter(
                        this,
                        mBreakModel.data!!, dateSelect
                    )
                    binding.studentBreakReportRv.adapter = listAdapter
//                    listAdapter.notifyItemChanged(pos)
                    listAdapter.notifyDataSetChanged()
                }
            }
            if (task != OptionConstant.EDIT) {
                mData?.let { incidentdata.add(it) }
//                listAdapter.notifyDataSetChanged()
//                binding.studentBreakReportRv.adapter = listAdapter
                listAdapter = StudentBreakAdapter(
                    this,
                    incidentdata, dateSelect
                )
                binding.studentBreakReportRv.adapter = listAdapter
                listAdapter.notifyDataSetChanged()
            }
        }

        if (requestCode == EDIT_BREAK_DATA_REQUEST && resultCode == Activity.RESULT_OK) {
            val incidentdata = AppInstance.breakData?.data
            mBreakModel.data = AppInstance.breakData?.data
            val mData = AppInstance.studentBreakData
            var task = OptionConstant.VIEW_LOG
            for (pos in 0 until incidentdata?.size!!) {
                if (mData?.id == incidentdata[pos].id) {
                    task = OptionConstant.EDIT
                    // showToast(this!!, "Edit")
                    if (mData != null) {
                        mBreakModel.data?.set(pos, mData)
                    }
                    listAdapter = StudentBreakAdapter(
                        this,
                        mBreakModel.data!!, dateSelect
                    )
                    binding.studentBreakReportRv.adapter = listAdapter
//                    listAdapter.notifyItemChanged(pos)
                    listAdapter.notifyDataSetChanged()
                }
            }
            if (task != OptionConstant.EDIT) {
                mData?.let { incidentdata.add(it) }
//                listAdapter.notifyDataSetChanged()
//                binding.studentBreakReportRv.adapter = listAdapter
                listAdapter = StudentBreakAdapter(
                    this,
                    incidentdata, dateSelect
                )
                binding.studentBreakReportRv.adapter = listAdapter
                listAdapter.notifyDataSetChanged()
            }
        }

    }
}
