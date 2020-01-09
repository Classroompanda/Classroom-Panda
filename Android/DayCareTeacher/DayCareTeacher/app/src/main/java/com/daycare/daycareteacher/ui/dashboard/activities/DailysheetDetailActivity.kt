package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.Context
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDailysheetDetailBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.DailySheetStudentList
import com.daycare.daycareteacher.ui.dashboard.adapter.DailySheetDetailAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.RecentActivityAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*
import java.lang.Exception

class DailysheetDetailActivity : AppCompatActivity(), ILoaderCallback {

    lateinit var binding: ActivityDailysheetDetailBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var viewModel = DailySheetViewModel()
    var loader = Loader()
    lateinit var listAdapter: DailySheetDetailAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dailysheet_detail)
        activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
        //dateSelect=intent.getStringExtra("SelectedDate")
        dateSelect = AppInstance.selectedDate.toString()

        val recyclerView = binding.recentActivityRv
        setUpToolBar()
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.recentActivityRv.layoutManager = recyclerView.layoutManager

        binding.studentname.text = AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.studentName
        binding.className.text = AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.className
        //binding.txtDate.text = convertDate(dateSelect,checkInDate,displayDateDetail)

        binding.txtDate.text = convertDate(dateSelect, dailySheetFormat, displayDateDetail)

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
            AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail!!
        )
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
