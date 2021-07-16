package com.daycare.daycareteacher.ui.dashboard.fragments.allergy

import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ListItemAllergyBinding
import com.daycare.daycareteacher.model.AllergyModel

class AllergyAdapter(
    var context: Context?,
    var list: List<AllergyModel.Allergy>
) :
    RecyclerView.Adapter<AllergyAdapter.AllergyBindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AllergyBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemAllergyBinding = ListItemAllergyBinding.inflate(layoutInflater, parent, false)
        return AllergyBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: AllergyBindingHolder, position: Int) {
        val binding = holder.binding
        binding.model = list[position]
//        binding.viewModel= mealList[position]
//        binding.eventContainer1.setOnClickListener {
//            val intent = Intent(context, PaymentActivity::class.java)
//            context?.startActivity(intent)
//        }
    }

    class AllergyBindingHolder(var binding: ListItemAllergyBinding) :
        RecyclerView.ViewHolder(binding.allergyContainer)

}