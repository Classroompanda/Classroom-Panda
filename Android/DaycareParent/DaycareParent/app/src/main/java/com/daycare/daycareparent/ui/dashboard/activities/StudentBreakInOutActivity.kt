package com.daycare.daycareparent.ui.dashboard.activities

import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityStudentBreakinoutBinding
import com.daycare.daycareparent.interfaces.ILoaderCallback
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.adapter.StudentBreakAdapter
import com.daycare.daycareparent.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import java.lang.Exception

class StudentBreakInOutActivity : AppCompatActivity(), ILoaderCallback {

    lateinit var binding: ActivityStudentBreakinoutBinding
    lateinit var toolbar: Toolbar
    var activityPosition:Int=0
    var dateSelect:String=""
    var viewModel = AttendanceViewModel()
    var loader = Loader()
    lateinit var listAdapter: StudentBreakAdapter
    private val ADD_BREAK_DATA_REQUEST = 115

    var mBreakModel = BreakData()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_student_breakinout)

        val recyclerView = binding.studentBreakReportRv
        setUpToolBar()
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.studentBreakReportRv.layoutManager = recyclerView.layoutManager


        try {

            activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
            AppInstance.breakParentPosition=activityPosition
            dateSelect = intent.getStringExtra("SelectedDate")

            binding.studentBreakReportRv.visibility=View.VISIBLE
            binding.txtError.visibility=View.GONE


        }
        catch(e:Exception){
            binding.txtError.visibility=View.VISIBLE
            binding.studentBreakReportRv.visibility=View.GONE
        }

        binding.txtUsername.setText(AppInstance.allAttendanceReportData?.data?.get(activityPosition)?.studentName)
        binding.txtDate.setText(convertDate(AppInstance.allAttendanceReportData?.data?.get(activityPosition)?.attendanceDate!!,alohaDate,displayDate))


        viewModel = AttendanceViewModel()
        //viewModel.getGuardiansDataSimple(this, activityPosition)
        binding.viewModel=viewModel
        attachObserver(viewModel, this)

        Glide.with(this).load(WebServices.IMAGE_URL +""+ AppInstance.allAttendanceReportData?.data?.get(activityPosition)?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_placeholder)
            .into(binding.userProfilePic)


        if(AppInstance.breakData!=null) {
            binding.studentBreakReportRv.visibility=View.VISIBLE
            binding.txtError.visibility=View.GONE

            listAdapter = StudentBreakAdapter(
                this,
                AppInstance.breakData?.data!!
            )
            binding.studentBreakReportRv.adapter = listAdapter
        }
        else{
            binding.studentBreakReportRv.visibility=View.GONE
            binding.txtError.visibility=View.VISIBLE
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
    /*override fun onResume() {
        super.onResume()
        *//* listAdapter.notifyDataSetChanged()
         listAdapter= DailySheetDetailAdapter(this,activityPosition,
             AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail!!
         )*//*
    }*/

    override fun onResume() {
        super.onResume()
        try{
            if(mBreakModel.data!=null){
                val breakData = mBreakModel.data
                listAdapter.notifyItemChanged(activityPosition)
            }

        }catch(e:Exception){Log.i("Data", "No data")}


    }

    private fun attachObserver(viewModel: AttendanceViewModel, context: Context) {


        viewModel.addBreakFab.observe(this, Observer<Boolean> { it ->
            it?.let {

                if(!viewModel.checkBreakStatus()) {

                    val intent = Intent(context, AddStudentBreakActivity::class.java)
                    /* intent.putExtra("STUDENT_BREAK_CLASSID", AppInstance.allAttendanceData?.data?.get(activityPosition)?.studentID)
                intent.putExtra("STUDENT_AGENCYID",AppInstance.allAttendanceData?.data?.get(activityPosition)?.agencyID)
                intent.putExtra("STUDENT_AGENCYID",AppInstance.allAttendanceData?.data?.get(activityPosition)?.agencyID)
*/
                    startActivityForResult(intent, ADD_BREAK_DATA_REQUEST)
                }
                else{
                    showToast(this, "Student is already on Breakout")
                }

            }
        })


        viewModel.guardianApiResponse.observe(this, Observer<GuardianModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            if(AppInstance.breakData!=null) {
                                binding.studentBreakReportRv.visibility=View.VISIBLE
                                binding.txtError.visibility=View.GONE

                                listAdapter = StudentBreakAdapter(
                                    this,
                                    AppInstance.breakData?.data!!
                                )
                                binding.studentBreakReportRv.adapter = listAdapter
                            }
                            else{
                                binding.studentBreakReportRv.visibility=View.GONE
                                binding.txtError.visibility=View.VISIBLE
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
                            if(AppInstance.breakData!=null) {
                                binding.studentBreakReportRv.visibility=View.VISIBLE
                                binding.txtError.visibility=View.GONE
                                mBreakModel=it
                                listAdapter = StudentBreakAdapter(
                                    this,
                                    AppInstance.breakData?.data!!
                                )
                                binding.studentBreakReportRv.adapter = listAdapter
                            }
                            else{
                                binding.studentBreakReportRv.visibility=View.GONE
                                binding.txtError.visibility=View.VISIBLE
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
                            try{
                                if(mBreakModel.data!=null){
                                    val breakData = mBreakModel.data
                                    listAdapter.notifyItemChanged(AppInstance.breakPosition!!)
                                }else{}

                            }catch(e:Exception){Log.i("Data", "No data")}

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
            val bundle = data?.getBundleExtra(STUDENT_BREAK_DATA)
            val incidentdata = AppInstance.breakData?.data
            mBreakModel.data=AppInstance.breakData?.data
            val mData = AppInstance.studentBreakData
            var task = OptionConstant.VIEW_LOG
            for (pos in 0 until incidentdata?.size!!) {
                if (mData?.id == incidentdata[pos].id) {
                    task = OptionConstant.EDIT
                   // showToast(this!!, "Edit")
                    if (mData != null) {
                        mBreakModel.data?.set(pos, mData)
                    }
                    listAdapter.notifyItemChanged(pos)
                }
            }
            if (task != OptionConstant.EDIT) {
                mData?.let { incidentdata.add(it) }
                listAdapter.notifyDataSetChanged()
                binding.studentBreakReportRv.adapter = listAdapter
            }


        }

    }


}