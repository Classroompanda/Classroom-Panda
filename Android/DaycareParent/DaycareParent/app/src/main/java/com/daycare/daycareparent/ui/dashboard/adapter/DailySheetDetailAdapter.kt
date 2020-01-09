package com.daycare.daycareparent.ui.dashboard.adapter

import android.app.AlertDialog
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.RecentSheetDetailActivityBinding
import com.daycare.daycareparent.model.DailySheetSerializeRequest
import com.daycare.daycareparent.model.StudentDailySheetDetail
import com.daycare.daycareparent.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareparent.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareparent.utill.DailySheetConstant.DIAPER
import com.daycare.daycareparent.utill.DailySheetConstant.HEALTH
import com.daycare.daycareparent.utill.DailySheetConstant.MEAL
import com.daycare.daycareparent.utill.DailySheetConstant.MOOD
import com.daycare.daycareparent.utill.DailySheetConstant.NAP
import com.daycare.daycareparent.utill.DailySheetConstant.NOTES


class DailySheetDetailAdapter(
                               private var childrenList: ArrayList<StudentDailySheetDetail>) :
    RecyclerView.Adapter<DailySheetDetailAdapter.DailySheetBindingHolder>() {
     var parentPosition:Int = 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DailySheetBindingHolder {

        val layoutInflater = LayoutInflater.from(parent.context)


        val binding: RecentSheetDetailActivityBinding = RecentSheetDetailActivityBinding.inflate(layoutInflater, parent, false)
        return DailySheetBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList.size
    }

    override fun onBindViewHolder(holder: DailySheetBindingHolder, position: Int) {
        val binding = holder.binding
        //binding.viewModel= eventList[position]
        val viewModel = DailySheetViewModel(childrenList?.get(position)!!, position,parentPosition,"Detail")
        binding.viewModel = viewModel




        if(childrenList?.get(position)?.activityTypeID==HEALTH) {
            binding.scheduleTime.visibility=View.VISIBLE
            binding.scheduleTime.setText("Medication Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.medication)
        }
        if(childrenList?.get(position)?.activityTypeID== ACTIVITY) {
            binding.scheduleTime.visibility=View.VISIBLE
            val dateString:String=convertDate(childrenList?.get(position)?.startTime!!,alohaDate,dialogDisplayTime)+" "+convertDate(childrenList?.get(position)?.endTime!!, alohaDate,dialogDisplayTime)

            binding.scheduleTime.setText(dateString)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.activity)
        }
        if(childrenList?.get(position)?.activityTypeID== NAP) {
            binding.scheduleTime.visibility=View.VISIBLE
            val dateString:String=convertDate(childrenList?.get(position)?.startTime!!,alohaDate,dialogDisplayTime)+" "+convertDate(childrenList?.get(position)?.endTime!!, alohaDate,dialogDisplayTime)
            binding.scheduleTime.setText(dateString)
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.nap)
        }
        if(childrenList?.get(position)?.activityTypeID== MOOD) {
            binding.scheduleTime.visibility=View.VISIBLE
            binding.scheduleTime.setText("Mood Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.happy)
        }
        if(childrenList?.get(position)?.activityTypeID== MEAL) {
            binding.scheduleTime.visibility=View.VISIBLE
            binding.scheduleTime.setText("Meal Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.meal)
        }
        if(childrenList?.get(position)?.activityTypeID== NOTES) {
            binding.scheduleTime.visibility=View.VISIBLE
            binding.scheduleTime.setText("Notes Data")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.notes)
        }
        if(childrenList?.get(position)?.activityTypeID== DIAPER) {
            binding.scheduleTime.visibility=View.VISIBLE
            binding.scheduleTime.setText("DIAPER")
            binding.activityName.setText(childrenList?.get(position)?.activityDescription)
            binding.activityIV.setImageResource(R.mipmap.diaper)
        }






    }

   class DailySheetBindingHolder(var binding: RecentSheetDetailActivityBinding) : RecyclerView.ViewHolder(binding.activityContainer)

}