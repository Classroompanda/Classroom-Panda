package com.daycare.daycareteacher.ui.dashboard.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDailysheetDetailBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.ui.dashboard.adapter.CompleteDailySheetDetailAdapter
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.toolbar.view.*

class CompleteDailysheetDetailActivity : AppCompatActivity(), ILoaderCallback {

    lateinit var binding: ActivityDailysheetDetailBinding
    lateinit var toolbar: Toolbar
    var activityPosition: Int = 0
    var dateSelect: String = ""
    var viewModel = DailySheetViewModel()
    var loader = Loader()
    lateinit var listAdapter: CompleteDailySheetDetailAdapter


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_dailysheet_detail)
        activityPosition = Integer.parseInt(intent.getStringExtra("POSITION"))
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

      //  binding.txtDate.text = convertDate(dateSelect, dailySheetFormat, displayDateDetail)

        if(dateSelect.substringBefore("-").length>3){
            binding.txtDate.text = convertLocalToUtc(dateSelect, reservationDate, mealDisplayDate)

        }else{
            binding.txtDate.text = convertLocalToUtc(dateSelect, displayDate, mealDisplayDate)
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



        listAdapter = CompleteDailySheetDetailAdapter(
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
        listAdapter = CompleteDailySheetDetailAdapter(
            this, activityPosition,
            AppInstance.allDailySheetStidentList?.data?.get(activityPosition)?.activityDetail!!
        )
    }
}
