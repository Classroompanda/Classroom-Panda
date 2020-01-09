package com.daycare.daycareparent.ui.dashboard.fragments.calender

import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityMealDetailBinding
import com.daycare.daycareparent.model.MealDetailModel
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.ui.dashboard.adapter.MealDetailAdapter
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.PreferenceConnector

class MealDetailActivity : AppCompatActivity() {

    lateinit var binding: ActivityMealDetailBinding
    lateinit var viewModel: CalendarViewModel
    val loader = Loader()
    var catg = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_meal_detail)
        setToolbar()
        initView()
        attachObserver()
    }

    private fun initView() {
        viewModel = CalendarViewModel()
        val data = MealDetailModel()
        data.agencyID = PreferenceConnector.readUser(this, PreferenceConnector.USER)?.agencyID
        data.mealPlanID = intent.getStringExtra("id").toInt()
        catg = intent.getStringExtra("catg")

        viewModel.getMealDetail(this, data)

    }

    private fun setToolbar() {
        val toolbar: Toolbar = binding.includeToolbar
        toolbar.navigationIcon = ContextCompat.getDrawable(this, R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener {
            finish()
        }

    }

    private fun attachObserver() {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.mealDetail.observe(this, Observer<MealDetailModel> { it ->
            it?.let {
                if (it.statusCode == Success && !it.data.isNullOrEmpty()) {
                    val meal = it
                    meal.data?.get(0)?.category = catg
                    binding.model = meal.data?.get(0)
                    val recyclerView = binding.recyclerView
                    recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
                    binding.recyclerView.layoutManager = recyclerView.layoutManager
                    val listAdapter =
                        MealDetailAdapter(this, it.data?.get(0)?.involvedMealFoodItems!!) //  Set Data in Adapter
                    binding.recyclerView.adapter = listAdapter
                }
            }
        })
    }
}
