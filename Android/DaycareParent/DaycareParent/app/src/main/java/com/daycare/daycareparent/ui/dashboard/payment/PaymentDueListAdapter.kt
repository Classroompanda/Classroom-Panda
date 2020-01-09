package com.daycare.daycareparent.ui.dashboard.payment

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ListItemDuePaymentBinding
import com.daycare.daycareparent.model.DuePayment
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.showDialog
import java.lang.Exception

class PaymentDueListAdapter(
    var context: Context?,
    var list: ArrayList<DuePayment>
) :
    RecyclerView.Adapter<PaymentDueListAdapter.PaymentBindingHolder>() {

//    val list = AppInstance.allChilds

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemDuePaymentBinding = ListItemDuePaymentBinding.inflate(layoutInflater, parent, false)
        return PaymentBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: PaymentBindingHolder, position: Int) {
        val binding = holder.binding

        binding.model = list[position]

        binding.guardianContainer.setOnClickListener {
            val data = PreferenceConnector.readUser(it.context, PreferenceConnector.USER)
            try {
                if (data?.isStripeAccount!! && data.isSubscriptionActive!!) {
                    val intent = Intent(context, PaymentActivity::class.java)
                    intent.putExtra("pay", list[position])
                    context?.startActivity(intent)
                } else {
                    showDialog(
                        it.context,
                        it.context.getString(R.string.app_name),
                        "Please contact with admin for payment"
                    )
                }
            } catch (e: Exception) {
                showDialog(
                    it.context,
                    it.context.getString(R.string.app_name),
                    "Please contact with admin for payment"
                )
            }
        }

    }

    class PaymentBindingHolder(var binding: ListItemDuePaymentBinding) :
        RecyclerView.ViewHolder(binding.guardianContainer)
}