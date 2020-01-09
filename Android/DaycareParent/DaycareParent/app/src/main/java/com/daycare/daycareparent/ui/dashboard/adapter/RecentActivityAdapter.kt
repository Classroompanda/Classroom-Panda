package com.daycare.daycareparent.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.RecentSheetDetailActivityBinding


class RecentActivityAdapter() : RecyclerView.Adapter<RecentActivityAdapter.RecentActivityBindingHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecentActivityBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = RecentSheetDetailActivityBinding.inflate(layoutInflater, parent, false)
        return RecentActivityBindingHolder(binding)    }

    override fun getItemCount(): Int {
        return 10 // childrenList.size
    }
    override fun onBindViewHolder(holder: RecentActivityAdapter.RecentActivityBindingHolder, position: Int) {
//        val binding = holder.binding
//        val viewModel = StudentViewModel()
//        binding.viewModel = viewModel
    }

    class RecentActivityBindingHolder(var binding: RecentSheetDetailActivityBinding) : RecyclerView.ViewHolder(binding.activityContainer)
}





/*
class RecentActivityAdapter(context: Context?, var childrenList: List<StudentDailySheetDetail>?) : RecyclerView.Adapter<RecentActivityAdapter.RecentActivityBindingHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecentActivityBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)

        val binding = RecentSheetDetailActivityBinding.inflate(layoutInflater, parent, false)
        return RecentActivityBindingHolder(binding)    }

    override fun getItemCount(): Int {
        return childrenList!!.size
    }
    override fun onBindViewHolder(holder: RecentActivityAdapter.RecentActivityBindingHolder, position: Int) {
        val binding = holder.binding





        if(childrenList?.get(position)?.activityTypeID==HEALTH) {
            binding.activityName.setText("Health data")
            binding.activityIV.setImageResource(R.drawable.ic_da_medicine)
        }
        if(childrenList?.get(position)?.activityTypeID== ACTIVITY) {
            binding.activityName.setText("Other Activity")
            binding.activityIV.setImageResource(R.drawable.ic_ds_activity)
        }
        if(childrenList?.get(position)?.activityTypeID== NAP) {
            binding.activityName.setText("Nap data")
            binding.activityIV.setImageResource(R.mipmap.happy)
        }
        if(childrenList?.get(position)?.activityTypeID== MOOD) {
            binding.activityName.setText("Mood data")
            binding.activityIV.setImageResource(R.drawable.ic_da_medicine)
        }
        if(childrenList?.get(position)?.activityTypeID== MEAL) {
            binding.activityName.setText("Meal data")
            binding.activityIV.setImageResource(R.drawable.ic_da_food)
        }
        if(childrenList?.get(position)?.activityTypeID== NOTES) {
            binding.activityName.setText("Notes data")
            binding.activityIV.setImageResource(R.drawable.ic_da_study)
        }




//        val viewModel = StudentViewModel()
//        binding.viewModel = viewModel
    }

    class RecentActivityBindingHolder(var binding: RecentSheetDetailActivityBinding) : RecyclerView.ViewHolder(binding.activityContainer)
}
*/
