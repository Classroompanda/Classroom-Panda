package com.daycare.daycareparent.ui.dashboard.activities

import android.arch.lifecycle.Observer
import android.content.Context
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddDailySheetBinding
import com.daycare.daycareparent.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import kotlinx.android.synthetic.main.activity_add_daily_sheet.*
import kotlinx.android.synthetic.main.toolbar.view.*
import com.daycare.daycareparent.model.MealPlanModel
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.utill.*


class AddDailySheetActivity : AppCompatActivity() {

    lateinit var toolbar: Toolbar
    lateinit var binding: ActivityAddDailySheetBinding
    var viewModel = DailySheetViewModel()
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_daily_sheet)
        //setContentView(R.layout.activity_add_daily_sheet)
        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel
        //viewModel.getAutoSuggestion()
        attachObserver(viewModel, this)

        setUpToolBar()
        initView()

    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.add_new_daily_sheet)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }


    private fun initView(){




        binding.cryingSuggestion.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "He is crying a lot")
            }
            else{
                binding.activityDescEdtTxt.setText("He is crying a lot")
            }
        }

        binding.playingSuggestion.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "He is playing in classroom")
            }
            else{
                binding.activityDescEdtTxt.setText("He is playing in classroom")
            }
        }
        binding.playingoutsideSuggestion.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "He is playing in outside")
            }
            else{
                binding.activityDescEdtTxt.setText("He is playing in outside")
            }
        }






        binding.activityBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity="5"
                binding.activityBtn.setImageResource(R.mipmap.activity)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.notesBtn.isSelected=false
                binding.healthBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.moodBtn.isSelected=false
                binding.mealBtn.isSelected=false

                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)


                binding.mealFrameLyt.visibility=View.GONE
                binding.moodFrameLyt.visibility=View.GONE
                binding.activityFrameLyt.visibility=View.VISIBLE
                binding.napFrameLyt.visibility=View.GONE
                binding.notesFrameLyt.visibility=View.GONE
                binding.healthFrameLyt.visibility=View.GONE


                //Handle selected state change
            } else {

                //Handle de-select state change
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)
            }
            // binding.mealBtn.setImageResource(R.drawable.ic_ds_activity)
        })

        binding.mealBtn.setOnClickListener(View.OnClickListener {
            viewModel.getMelaPlan(it)
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedDailySheetActivity="3"
                binding.mealBtn.setImageResource(R.mipmap.meal)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.notesBtn.isSelected=false
                binding.healthBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.moodBtn.isSelected=false
                binding.activityBtn.isSelected=false


                binding.mealFrameLyt.visibility=View.VISIBLE
                binding.moodFrameLyt.visibility=View.GONE
                binding.activityFrameLyt.visibility=View.GONE
                binding.napFrameLyt.visibility=View.GONE
                binding.notesFrameLyt.visibility=View.GONE
                binding.healthFrameLyt.visibility=View.GONE



                //Handle selected state change
            } else {

                //Handle de-select state change
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)


            }
            // binding.mealBtn.setImageResource(R.drawable.ic_ds_activity)
        })
        binding.moodBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedDailySheetActivity="4"
                binding.moodBtn.setImageResource(R.mipmap.happy)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.notesBtn.isSelected=false
                binding.healthBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.mealBtn.isSelected=false
                binding.activityBtn.isSelected=false

                binding.mealFrameLyt.visibility=View.GONE
                binding.moodFrameLyt.visibility=View.VISIBLE
                binding.activityFrameLyt.visibility=View.GONE
                binding.napFrameLyt.visibility=View.GONE
                binding.notesFrameLyt.visibility=View.GONE
                binding.healthFrameLyt.visibility=View.GONE


            } else {

                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
            }

        })
        binding.napBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedDailySheetActivity="6"
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected=false
                binding.healthBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.mealBtn.isSelected=false
                binding.activityBtn.isSelected=false

                binding.mealFrameLyt.visibility=View.GONE
                binding.moodFrameLyt.visibility=View.GONE
                binding.activityFrameLyt.visibility=View.GONE
                binding.napFrameLyt.visibility=View.VISIBLE
                binding.notesFrameLyt.visibility=View.GONE
                binding.healthFrameLyt.visibility=View.GONE

            } else {
                binding.napBtn.setImageResource(R.mipmap.nap_gray)

            }

        })
        binding.healthBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity="1"
                binding.healthBtn.setImageResource(R.mipmap.medication)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected=false
                binding.notesBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.mealBtn.isSelected=false
                binding.activityBtn.isSelected=false

                binding.mealFrameLyt.visibility=View.GONE
                binding.moodFrameLyt.visibility=View.GONE
                binding.activityFrameLyt.visibility=View.GONE
                binding.napFrameLyt.visibility=View.GONE
                binding.notesFrameLyt.visibility=View.GONE
                binding.healthFrameLyt.visibility=View.VISIBLE

            } else {
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
            }

        })
        binding.notesBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity="2"
                binding.notesBtn.setImageResource(R.mipmap.notes)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected=false
                binding.healthBtn.isSelected=false
                binding.napBtn.isSelected=false
                binding.mealBtn.isSelected=false
                binding.activityBtn.isSelected=false

                binding.mealFrameLyt.visibility=View.GONE
                binding.moodFrameLyt.visibility=View.GONE
                binding.activityFrameLyt.visibility=View.GONE
                binding.napFrameLyt.visibility=View.GONE
                binding.notesFrameLyt.visibility=View.VISIBLE
                binding.healthFrameLyt.visibility=View.GONE

            } else {
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
            }

        })

        binding.moodhappyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood=1
                binding.moodhappyIV.setImageResource(R.mipmap.happy)
                binding.moodnapIV.setImageResource(R.mipmap.nap_gray)
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodnapIV.isSelected=false
                binding.sadhappyIV.isSelected=false
            }
            else{
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            }
        })

        binding.moodnapIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood=2
                binding.moodnapIV.setImageResource(R.mipmap.nap)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodhappyIV.isSelected=false
                binding.sadhappyIV.isSelected=false
            }
            else{
                binding.moodnapIV.setImageResource(R.mipmap.nap_gray)
            }
        })
        binding.sadhappyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood=3
                binding.sadhappyIV.setImageResource(R.mipmap.crying)
                binding.moodnapIV.setImageResource(R.mipmap.nap_gray)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)

                binding.moodnapIV.isSelected=false
                binding.moodhappyIV.isSelected=false
            }
            else{
                binding.sadhappyIV.setImageResource(R.mipmap.nap_gray)
            }
        })



    }

    private fun attachObserver(viewModel: DailySheetViewModel, context: Context) {


        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.mealPlanApiResponse.observe(this, Observer<MealPlanModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {
                    //viewModel.multipleSelectMealDialog(binding.tvParticipant, it)
                } else {

                }
            }

        })





    }

}
