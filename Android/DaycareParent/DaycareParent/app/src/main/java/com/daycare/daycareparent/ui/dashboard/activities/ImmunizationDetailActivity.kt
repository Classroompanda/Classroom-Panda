package com.daycare.daycareparent.ui.dashboard.activities

import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityImmunizationDetailBinding
import com.daycare.daycareparent.ui.dashboard.adapter.ImmunizationListAdapter
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class ImmunizationDetailActivity : AppCompatActivity() {
    lateinit var binding: ActivityImmunizationDetailBinding
    lateinit var toolbar: Toolbar
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_immunization_detail)
        val recyclerView = binding.immunizationRv

        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.immunizationRv.layoutManager = recyclerView.layoutManager

        val immunizationList = AppInstance.studentDetails?.data?.studentImmunizations
//        val listAdapter = ImmunizationListAdapter(this, immunizationList)
//        binding.immunizationRv.adapter = listAdapter
        setUpToolBar()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.immunization_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

    }
}