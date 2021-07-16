package com.daycare.daycareteacher.ui.dashboard.activities

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDailysheetDetailBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.ui.dashboard.adapter.DailySheetDetailAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*

class DailysheetDetailActivity : AppCompatActivity(), ILoaderCallback {

    lateinit var binding: ActivityDailysheetDetailBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var classesIId : String =""
    var viewModel = DailySheetViewModel()
    var loader = Loader()
    lateinit var listAdapter: DailySheetDetailAdapter


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dailysheet_detail)
        activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
       // classesIId = intent.getStringExtra("CLASSES_ID")
        Log.d("classID","      "+classesIId)
        //dateSelect=intent.getStringExtra("SelectedDate")
        dateSelect = AppInstance.selectedDate.toString()

        val recyclerView = binding.recentActivityRv
        setUpToolBar()
        recyclerView.layoutManager =
            LinearLayoutManager(
                this,
                RecyclerView.VERTICAL,
                false
            )
        binding.recentActivityRv.layoutManager = recyclerView.layoutManager

        binding.studentname.text = AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.studentName
        binding.className.text = AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.className
        //binding.txtDate.text = convertDate(dateSelect,checkInDate,displayDateDetail)

        if(dateSelect.substringBefore("-").length>3){
            binding.txtDate.text = convertUtcToLocal(dateSelect, reservationDate, mealDisplayDate)

        }else{
            binding.txtDate.text = convertUtcToLocal(dateSelect, displaydate1, mealDisplayDate)
        }

        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel

        try {
            Glide.with(this)
                .load(AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.imagePath)
                .placeholder(R.drawable.ic_placeholder)
                .transform(CircleTransform(binding.childImg.context))
                .into(binding.childImg)
        } catch (e: Exception) {

        }



        listAdapter = DailySheetDetailAdapter(
            this, activityPosition,
            AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail!!)
        binding.recentActivityRv.adapter = listAdapter

        attachObserver()
    }

    private fun attachObserver() {


    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.dailysheetdetail)
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
        listAdapter.notifyDataSetChanged()
        listAdapter = DailySheetDetailAdapter(
            this, activityPosition,
            AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail!!
        )
    }
}
