package com.daycare.daycareparent.ui.dashboard.fragments.calender

import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityEventDetailBinding
import com.daycare.daycareparent.databinding.ActivityMealDetailBinding
import com.daycare.daycareparent.model.EventData
import com.daycare.daycareparent.model.MealDetailModel
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.ui.dashboard.adapter.MealDetailAdapter
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.PreferenceConnector
import kotlinx.android.synthetic.main.activity_login.*

class EventDetailActivity : AppCompatActivity() {

    lateinit var binding: ActivityEventDetailBinding
    lateinit var viewModel: CalendarViewModel
    val loader = Loader()
    var catg = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_event_detail)
        setToolbar()
        initView()
        attachObserver()
    }

    private fun initView() {
        viewModel = CalendarViewModel()
try {
    binding.beginsDate.setText(intent.getStringExtra("startDate"))
    binding.endsDate.setText(intent.getStringExtra("endDate"))

    binding.beginsTime.setText(intent.getStringExtra("startTime"))
    binding.endsTime.setText(intent.getStringExtra("endTime"))

    binding.className.setText(intent.getStringExtra("classname"))
    binding.description.setText(intent.getStringExtra("desc"))

    binding.category.setText(intent.getStringExtra("title"))


    binding.repeatText.setText(intent.getStringExtra("repeat"))

try {
    if (intent?.getStringExtra("repeatid").equals("1")) {
        binding.endsOnTitle.visibility = View.GONE
        binding.endsOnText.visibility = View.GONE
    }
    else{
        binding.endsOnTitle.visibility = View.VISIBLE
        binding.endsOnText.visibility = View.VISIBLE
        binding.endsOnText.setText(intent.getStringExtra("endsOn"))
    }
}catch (ex:java.lang.Exception){
    binding.endsOnTitle.visibility = View.GONE
    binding.endsOnText.visibility = View.GONE
}


}catch (e:Exception){
    Log.i("Error","Intent error")
}


        /*  data.mealPlanID = intent.getIntExtra("id", 2)
          catg = intent.getStringExtra("catg")

          viewModel.getMealDetail(this, data)*/





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

    }
}
