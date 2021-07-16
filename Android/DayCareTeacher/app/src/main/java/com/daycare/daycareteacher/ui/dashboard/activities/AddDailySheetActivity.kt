package com.daycare.daycareteacher.ui.dashboard.activities

import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAddDailySheetBinding
import com.daycare.daycareteacher.model.MealPlanModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.OptionConstant
import kotlinx.android.synthetic.main.activity_add_daily_sheet.*
import kotlinx.android.synthetic.main.toolbar.view.*

class AddDailySheetActivity : AppCompatActivity() {

    lateinit var toolbar: Toolbar
    lateinit var binding: ActivityAddDailySheetBinding
    var viewModel = DailySheetViewModel()
    var loader = Loader()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_daily_sheet)
        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel
        attachObserver(viewModel, this)
        val selectedStudentsList = intent.getSerializableExtra(OptionConstant.SELECTED_STUDENT_LIST)

        setUpToolBar()
        initView(selectedStudentsList as ArrayList<Int>)

    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.add_new_daily_sheet)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    private fun initView(selectedStudentsList:ArrayList<Int>) {
        binding.button.setOnClickListener(View.OnClickListener {
            // crash here
            if(selectedStudentsList.size>0)
                viewModel.onClickAddDSBtn(it,selectedStudentsList)
        })


//        ACTIVITY
        AppInstance.selectedDailySheetActivity = "5"
        binding.activitySuggestions.sugBlocks.setOnClickListener {
            val activities=ArrayList<String>()

            if (!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Blocks")
            } else {
                binding.activityDescEdtTxt.setText("Blocks")
            }
        }
        binding.activitySuggestions.sugCenters.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Centers")
            }
            else{
                binding.activityDescEdtTxt.setText("Centers")
            }
        }
        binding.activitySuggestions.sugCircleTime.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Circle time")
            }
            else{
                binding.activityDescEdtTxt.setText("Circle time")
            }
        }
        binding.activitySuggestions.sugColored.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Colored")
            }
            else{
                binding.activityDescEdtTxt.setText("Colored")
            }
        }
        binding.activitySuggestions.sugDancing.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Dancing")
            }
            else{
                binding.activityDescEdtTxt.setText("Dancing")
            }
        }
        binding.activitySuggestions.sugFlashCard.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Flash Cards")
            }
            else{
                binding.activityDescEdtTxt.setText("Flash Cards")
            }
        }
        binding.activitySuggestions.sugFreeDraw.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Free Draw")
            }
            else{
                binding.activityDescEdtTxt.setText("Free Draw")
            }
        }
        binding.activitySuggestions.sugLegos.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Legos")
            }
            else{
                binding.activityDescEdtTxt.setText("Legos")
            }
        }
        binding.activitySuggestions.sugMusic.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Music")
            }
            else{
                binding.activityDescEdtTxt.setText("Music")
            }
        }
        binding.activitySuggestions.sugPainted.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Painted")
            }
            else{
                binding.activityDescEdtTxt.setText("Painted")
            }
        }
        binding.activitySuggestions.sugPlayedOutside.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Played Outside")
            }
            else{
                binding.activityDescEdtTxt.setText("Played Outside")
            }
        }
        binding.activitySuggestions.sugPuzzele.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Puzzles")
            }
            else{
                binding.activityDescEdtTxt.setText("Puzzles")
            }
        }
        binding.activitySuggestions.sugShareDay.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Share Day")
            }
            else{
                binding.activityDescEdtTxt.setText("Share Day")
            }
        }
        binding.activitySuggestions.sugScience.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Science")
            }
            else{
                binding.activityDescEdtTxt.setText("Science")
            }
        }
        binding.activitySuggestions.sugReading.setOnClickListener {
            if(!binding.activityDescEdtTxt.text.toString().isEmpty()) {
                binding.activityDescEdtTxt.setText(binding.activityDescEdtTxt.text.toString() + "," + "Reading")
            }
            else{
                binding.activityDescEdtTxt.setText("Reading")
            }
        }
        binding.diaperSuggestion.setOnClickListener {
            if (!binding.diaperdescriptionTxt.text.toString().isEmpty()) {
                binding.diaperdescriptionTxt.setText(binding.diaperdescriptionTxt.text.toString() + "," + "Diaper Change")
            } else {
                binding.diaperdescriptionTxt.setText("Diaper Change")
            }
        }
        binding.toiletSuggestion.setOnClickListener {
            if (!binding.diaperdescriptionTxt.text.toString().isEmpty()) {
                binding.diaperdescriptionTxt.setText(binding.diaperdescriptionTxt.text.toString() + "," + "Toilet Training / Tiolet Used")
            } else {
                binding.diaperdescriptionTxt.setText("Toilet Training / Toilet Used")
            }
        }
        binding.wetSuggestion.setOnClickListener {
            if (!binding.diaperdescriptionTxt.text.toString().isEmpty()) {
                binding.diaperdescriptionTxt.setText(binding.diaperdescriptionTxt.text.toString() + "," + "Wet ")
            } else {
                binding.diaperdescriptionTxt.setText("Wet ")
            }
        }
        binding.bmSuggestion.setOnClickListener {
            if (!binding.diaperdescriptionTxt.text.toString().isEmpty()) {
                binding.diaperdescriptionTxt.setText(binding.diaperdescriptionTxt.text.toString() + "," + "B/M")
            } else {
                binding.diaperdescriptionTxt.setText("B/M")
            }
        }
        binding.drySuggestion.setOnClickListener {
            if (!binding.diaperdescriptionTxt.text.toString().isEmpty()) {
                binding.diaperdescriptionTxt.setText(binding.diaperdescriptionTxt.text.toString() + "," + "Dry")
            } else {
                binding.diaperdescriptionTxt.setText("Dry")
            }
        }
        binding.diaperBtn.setOnClickListener {
            button.isSelected = !button.isSelected();
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity = "7"
                binding.diaperBtn.setImageResource(R.mipmap.diaper)

                binding.activityBtn.isSelected = false
                binding.notesBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.moodBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)

                binding.diaperFrameLyt.visibility = View.VISIBLE
                binding.activityFrameLyt.visibility = View.GONE
                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.GONE


                //Handle selected state change
            } else {

                //Handle de-select state change
                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
            }

        }
        binding.activityBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity = "5"
                binding.activityBtn.setImageResource(R.mipmap.activity)

                binding.notesBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.moodBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.diaperBtn.isSelected = false

                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)

                binding.diaperFrameLyt.visibility = View.GONE
                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.GONE
                binding.activityFrameLyt.visibility = View.VISIBLE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.GONE


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
                AppInstance.selectedDailySheetActivity = "3"
                binding.mealBtn.setImageResource(R.mipmap.meal)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.notesBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.moodBtn.isSelected = false
                binding.activityBtn.isSelected = false


                binding.mealFrameLyt.visibility = View.VISIBLE
                binding.moodFrameLyt.visibility = View.GONE
                binding.activityFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.GONE


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
                AppInstance.selectedDailySheetActivity = "4"
                binding.moodBtn.setImageResource(R.mipmap.happy)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)




                binding.notesBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.activityBtn.isSelected = false

                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.VISIBLE
                binding.activityFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.GONE

                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
                binding.diaperBtn.isSelected = false
                binding.diaperFrameLyt.visibility = View.GONE

            } else {
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
            }
        })
        binding.napBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedDailySheetActivity = "6"
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.nap)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.activityBtn.isSelected = false

                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.GONE
                binding.activityFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.VISIBLE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.GONE

                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
                binding.diaperBtn.isSelected = false
                binding.diaperFrameLyt.visibility = View.GONE

            } else {
                binding.napBtn.setImageResource(R.mipmap.ic_playfullgray)

            }

        })
        binding.healthBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity = "1"
                binding.healthBtn.setImageResource(R.mipmap.medication)
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
                binding.napBtn.setImageResource(R.mipmap.nap_gray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected = false
                binding.notesBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.activityBtn.isSelected = false

                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.GONE
                binding.activityFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.GONE
                binding.healthFrameLyt.visibility = View.VISIBLE


                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
                binding.diaperBtn.isSelected = false
                binding.diaperFrameLyt.visibility = View.GONE

            } else {
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
            }

        })
        binding.notesBtn.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());

                AppInstance.selectedDailySheetActivity = "2"
                binding.notesBtn.setImageResource(R.mipmap.notes)
                binding.healthBtn.setImageResource(R.mipmap.medication_gray)
                binding.napBtn.setImageResource(R.mipmap.ic_playfullgray)
                binding.moodBtn.setImageResource(R.mipmap.happy_gray)
                binding.mealBtn.setImageResource(R.mipmap.meal_gray)
                binding.activityBtn.setImageResource(R.mipmap.activity_gray)

                binding.moodBtn.isSelected = false
                binding.healthBtn.isSelected = false
                binding.napBtn.isSelected = false
                binding.mealBtn.isSelected = false
                binding.activityBtn.isSelected = false

                binding.mealFrameLyt.visibility = View.GONE
                binding.moodFrameLyt.visibility = View.GONE
                binding.activityFrameLyt.visibility = View.GONE
                binding.napFrameLyt.visibility = View.GONE
                binding.notesFrameLyt.visibility = View.VISIBLE
                binding.healthFrameLyt.visibility = View.GONE

                binding.diaperBtn.setImageResource(R.mipmap.diaper_gray)
                binding.diaperBtn.isSelected = false
                binding.diaperFrameLyt.visibility = View.GONE

            } else {
                binding.notesBtn.setImageResource(R.mipmap.notes_gray)
            }

        })
        binding.moodhappyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood = 1
                binding.moodhappyIV.setImageResource(R.mipmap.happy)
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
                binding.moodfussyIV.isSelected = false
                binding.moodgrumpyIV.isSelected = false
                binding.moodnapIV.isSelected = false
                binding.sadhappyIV.isSelected = false

            } else {
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            }
        })
        binding.moodnapIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood = 2
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfull)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
                binding.moodfussyIV.isSelected = false
                binding.moodgrumpyIV.isSelected = false
                binding.moodhappyIV.isSelected = false
                binding.sadhappyIV.isSelected = false
            } else {
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            }
        })
        binding.sadhappyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood = 3
                binding.sadhappyIV.setImageResource(R.mipmap.crying)
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                binding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
                binding.moodfussyIV.isSelected = false
                binding.moodgrumpyIV.isSelected = false

                binding.moodnapIV.isSelected = false
                binding.moodhappyIV.isSelected = false
            } else {
                binding.sadhappyIV.setImageResource(R.mipmap.ic_playfullgray)
            }
        })
        binding.moodfussyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood = 4
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                binding.moodfussyIV.setImageResource(R.mipmap.fussy)
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
                binding.sadhappyIV.isSelected = false
                binding.moodgrumpyIV.isSelected = false

                binding.moodnapIV.isSelected = false
                binding.moodhappyIV.isSelected = false
            } else {
                binding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            }
        })
        binding.moodgrumpyIV.setOnClickListener(View.OnClickListener {
            button.setSelected(!button.isSelected());
            if (button.isSelected()) {
                button.setSelected(!button.isSelected());
                AppInstance.selectedMood = 5
                binding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                binding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                binding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                binding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy)
                binding.sadhappyIV.isSelected = false
                binding.moodfussyIV.isSelected = false

                binding.moodnapIV.isSelected = false
                binding.moodhappyIV.isSelected = false
            } else {
                binding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
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
