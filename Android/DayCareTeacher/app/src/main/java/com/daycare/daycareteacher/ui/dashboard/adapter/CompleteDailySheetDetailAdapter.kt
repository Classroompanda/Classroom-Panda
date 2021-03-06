package com.daycare.daycareteacher.ui.dashboard.adapter

import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.RecentCompleteSheetDetailActivityBinding
import com.daycare.daycareteacher.model.StudentDailySheetDetail
import com.daycare.daycareteacher.ui.dashboard.activities.CompleteDailysheetDetailActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareteacher.utill.DailySheetConstant.DIAPER
import com.daycare.daycareteacher.utill.DailySheetConstant.HEALTH
import com.daycare.daycareteacher.utill.DailySheetConstant.MEAL
import com.daycare.daycareteacher.utill.DailySheetConstant.MOOD
import com.daycare.daycareteacher.utill.DailySheetConstant.NAP
import com.daycare.daycareteacher.utill.DailySheetConstant.NOTES
import com.daycare.daycareteacher.utill.alohaDate
import com.daycare.daycareteacher.utill.convertDateUTC
import com.daycare.daycareteacher.utill.dialogDisplayTime

class CompleteDailySheetDetailAdapter(
    var context: CompleteDailysheetDetailActivity,
    var masterPosition: Int,
    private var childrenList: ArrayList<StudentDailySheetDetail>
) :
    RecyclerView.Adapter<CompleteDailySheetDetailAdapter.DailySheetBindingHolder>() {
    var parentPosition: Int = 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DailySheetBindingHolder {

        val layoutInflater = LayoutInflater.from(parent.context)
        parentPosition = masterPosition

        val binding: RecentCompleteSheetDetailActivityBinding =
            RecentCompleteSheetDetailActivityBinding.inflate(layoutInflater, parent, false)
        return DailySheetBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList.size
    }

    override fun onBindViewHolder(holder: DailySheetBindingHolder, position: Int) {
        val binding = holder.binding
        //binding.viewModel= eventList[position]
        val viewModel = DailySheetViewModel(childrenList?.get(position)!!, position, parentPosition, "Detail")
        binding.viewModel = viewModel
        viewModel.setLoader(context)

        if (childrenList?.get(position)?.activityTypeID == HEALTH) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Medication Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.medication)
        }
        if (childrenList?.get(position)?.activityTypeID == ACTIVITY) {
            binding.scheduleTime.visibility = View.VISIBLE
           // var dateString: String =

            binding.scheduleTime.setText(convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime) + " - " + convertDateUTC(
                childrenList?.get(position)?.endTime!!,
                alohaDate,
                dialogDisplayTime
            ))
            print(convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime))

           // binding.scheduleTime.setText(childrenList?.get(position).createdData)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.activity)
        }
        if (childrenList?.get(position)?.activityTypeID == NAP) {
            binding.scheduleTime.visibility = View.VISIBLE
            var dateString: String =
                convertDateUTC(childrenList?.get(position)?.startTime!!, alohaDate, dialogDisplayTime) + " - " + convertDateUTC(
                    childrenList?.get(position)?.endTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            binding.scheduleTime.setText(dateString)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.nap)
        }
        if (childrenList?.get(position)?.activityTypeID == MOOD) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Mood Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.happy)
        }
        if (childrenList?.get(position)?.activityTypeID == MEAL) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Meal Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.meal)
        }
        if (childrenList?.get(position)?.activityTypeID == NOTES) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("Notes Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.notes)
        }
        if (childrenList?.get(position)?.activityTypeID == DIAPER) {
            binding.scheduleTime.visibility = View.VISIBLE
            binding.scheduleTime.setText("DIAPER")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.diaper)
        }

    }

    class DailySheetBindingHolder(var binding: RecentCompleteSheetDetailActivityBinding) :
        RecyclerView.ViewHolder(binding.activityContainer)


}