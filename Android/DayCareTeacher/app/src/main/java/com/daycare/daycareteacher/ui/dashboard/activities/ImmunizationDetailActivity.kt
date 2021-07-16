package com.daycare.daycareteacher.ui.dashboard.activities

import androidx.databinding.DataBindingUtil
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.appcompat.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityImmunizationDetailBinding
import com.daycare.daycareteacher.ui.dashboard.adapter.ImmunizationListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class ImmunizationDetailActivity : AppCompatActivity() {
    lateinit var binding: ActivityImmunizationDetailBinding
    lateinit var toolbar: Toolbar
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_immunization_detail)
        val recyclerView = binding.immunizationRv

        recyclerView.layoutManager =
            LinearLayoutManager(
                this,
                LinearLayout.VERTICAL,
                false
            )
        binding.immunizationRv.layoutManager = recyclerView.layoutManager

        val immunizationList = AppInstance.studentDetails?.data?.studentImmunizations
        val listAdapter = ImmunizationListAdapter(this, immunizationList)
        binding.immunizationRv.adapter = listAdapter
        setUpToolBar()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.immunization_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

    }
}
