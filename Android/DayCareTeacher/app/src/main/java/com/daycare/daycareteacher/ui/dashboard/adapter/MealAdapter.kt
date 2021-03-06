
package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.content.Intent
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.MealDetailBinding
import com.daycare.daycareteacher.model.MealData
import com.daycare.daycareteacher.ui.dashboard.fragments.calender.MealDetailActivity

class MealAdapter(context: Context?, private var mealList: List<MealData>) :
    RecyclerView.Adapter<MealAdapter.MealBindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MealBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: MealDetailBinding = MealDetailBinding.inflate(layoutInflater, parent, false)
        return MealBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return mealList.size
    }

    override fun onBindViewHolder(holder: MealBindingHolder, position: Int) {
        val binding = holder.binding
        binding.viewModel= mealList[position]
        binding.mealContainer.setOnClickListener {
            val intent = Intent(it.context, MealDetailActivity::class.java)
            intent.putExtra("id",mealList[position].id)
            intent.putExtra("catg",mealList[position].category)
            it.context.startActivity(intent)
        }
    }

    class MealBindingHolder(var binding: MealDetailBinding) : RecyclerView.ViewHolder(binding.mealContainer)

}