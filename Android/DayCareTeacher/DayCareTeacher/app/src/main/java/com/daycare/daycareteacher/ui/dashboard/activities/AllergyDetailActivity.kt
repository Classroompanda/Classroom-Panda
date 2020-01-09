package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.Intent
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAllergyDetailBinding
import com.daycare.daycareteacher.databinding.ActivityImmunizationDetailBinding
import com.daycare.daycareteacher.ui.dashboard.adapter.AllergyListAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.ImmunizationListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class AllergyDetailActivity : AppCompatActivity() {
    lateinit var binding: ActivityAllergyDetailBinding
    lateinit var toolbar: Toolbar
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_allergy_detail)
        val recyclerView = binding.allergyRv

        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.allergyRv.layoutManager = recyclerView.layoutManager
        val allergyList = AppInstance.studentDetails?.data?.studentAllergies
        val listAdapter = AllergyListAdapter(this, allergyList)
        binding.allergyRv.adapter = listAdapter

        setUpToolBar()
    }
    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text=getString(R.string.allergies_details)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

    }
}
