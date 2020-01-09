package com.daycare.daycareparent.ui.dashboard.payment

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.databinding.ListItemPaymentBinding
import com.daycare.daycareparent.model.PaymentHistoryData

class PaymentListAdapter(
    var context: Context?,
    var list: ArrayList<PaymentHistoryData>
) :
    RecyclerView.Adapter<PaymentListAdapter.PaymentBindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemPaymentBinding = ListItemPaymentBinding.inflate(layoutInflater, parent, false)
        return PaymentBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: PaymentBindingHolder, position: Int) {
        val binding = holder.binding
        binding.model = list[position]
//        binding.viewModel= mealList[position]
//        binding.eventContainer1.setOnClickListener {
//            val intent = Intent(context, PaymentActivity::class.java)
//            context?.startActivity(intent)
//        }
    }

    class PaymentBindingHolder(var binding: ListItemPaymentBinding) : RecyclerView.ViewHolder(binding.eventContainer1)
}