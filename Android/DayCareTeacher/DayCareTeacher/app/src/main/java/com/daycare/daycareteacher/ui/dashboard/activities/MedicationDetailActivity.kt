package com.daycare.daycareteacher.ui.dashboard.activities

import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityMedicationDetailBinding
import com.daycare.daycareteacher.ui.dashboard.adapter.AllergyListAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.MedicationAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class MedicationDetailActivity : AppCompatActivity() {
    lateinit var binding: ActivityMedicationDetailBinding
    lateinit var toolbar: Toolbar
    var loader = Loader()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_medication_detail)
        val recyclerView = binding.mediactionRv

        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.mediactionRv.layoutManager = recyclerView.layoutManager
        val medicationList = AppInstance.studentDetails?.data?.studentMedications
        val listAdapter = MedicationAdapter(this, medicationList)
        binding.mediactionRv.adapter = listAdapter

        setUpToolBar()
    }
    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text=getString(R.string.medication_details)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

    }
}
