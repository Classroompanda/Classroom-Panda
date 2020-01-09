package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ListItemMealDetailBinding
import com.daycare.daycareteacher.model.MealDataResponse

class MealDetailAdapter(context: Context?, private var mealList: List<MealDataResponse.InvolvedMealFoodItem>) :
    RecyclerView.Adapter<MealDetailAdapter.MealBindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MealBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemMealDetailBinding = ListItemMealDetailBinding.inflate(layoutInflater, parent, false)
        return MealBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return mealList.size
    }

    override fun onBindViewHolder(holder: MealBindingHolder, position: Int) {
        val binding = holder.binding
        binding.model= mealList[position]
    }

    class MealBindingHolder(var binding: ListItemMealDetailBinding) : RecyclerView.ViewHolder(binding.container)

}