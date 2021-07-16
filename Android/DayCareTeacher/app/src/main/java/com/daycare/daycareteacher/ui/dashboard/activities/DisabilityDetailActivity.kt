package com.daycare.daycareteacher.ui.dashboard.activities

import androidx.databinding.DataBindingUtil
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.appcompat.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityDisabilityDetailBinding
import com.daycare.daycareteacher.ui.dashboard.adapter.DisabilityListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class DisabilityDetailActivity : AppCompatActivity() {
    lateinit var binding: ActivityDisabilityDetailBinding
    lateinit var toolbar: Toolbar
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_disability_detail)
        val recyclerView = binding.disabilityRv

        recyclerView.layoutManager =
            LinearLayoutManager(
                this,
                LinearLayout.VERTICAL,
                false
            )
        binding.disabilityRv.layoutManager = recyclerView.layoutManager

        val immunizationList = AppInstance.studentDetails?.data?.studentDisabilities
        val listAdapter = DisabilityListAdapter(this, immunizationList)
        binding.disabilityRv.adapter = listAdapter
        setUpToolBar()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.disability_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

    }
}