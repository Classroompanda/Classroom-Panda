package com.daycare.daycareparent.ui.dashboard.payment


import android.arch.lifecycle.Observer
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPaymentHistoryBinding
import com.daycare.daycareparent.model.PaymentHistoryData
import com.daycare.daycareparent.utill.Loader

class PaymentHistoryFragment : Fragment() {
    lateinit var binding: FragmentPaymentHistoryBinding
    lateinit var viewModel: PaymentViewModel
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    lateinit var listAdapter: PaymentListAdapter
    var list = ArrayList<PaymentHistoryData>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_payment_history, container, false)
        binding = FragmentPaymentHistoryBinding.bind(view)
        viewModel = PaymentViewModel()
        binding.viewModel = viewModel
        viewModel.paymentHistory(view)
        attachObserver()
        loadData()

        return view
    }

    private fun loadData() {
        recyclerView = binding.paymentRv
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.paymentRv.layoutManager = recyclerView.layoutManager
        listAdapter = PaymentListAdapter(context!!, list)
        binding.paymentRv.adapter = listAdapter
    }

    private fun attachObserver() {
        viewModel.payHistoryResponse.observe(this, Observer<List<PaymentHistoryData>> { it ->
            it?.let {
                if (!it.isNullOrEmpty()) {
                    list.clear()
                    list.addAll(it)
                    listAdapter.notifyDataSetChanged()
                    binding.paymentRv.visibility = View.VISIBLE
                    binding.txtError.visibility = View.GONE
                } else {
                    binding.paymentRv.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE

                }
            }
        })

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }

}