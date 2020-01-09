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
import com.daycare.daycareparent.databinding.FragmentDuePaymentsBinding
import com.daycare.daycareparent.model.DuePayment
import com.daycare.daycareparent.model.DuePaymentModel
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.utill.Loader

class DuePaymentsFragment : Fragment() {

    lateinit var binding: FragmentDuePaymentsBinding
    lateinit var viewModel: PaymentViewModel
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    lateinit var listAdapter: PaymentDueListAdapter
    var list: ArrayList<DuePayment> = ArrayList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_due_payments, container, false)
        binding = FragmentDuePaymentsBinding.bind(view)
        viewModel = PaymentViewModel()
        binding.viewModel = viewModel
        loadData()
        attachObserver()
        return view
    }

    override fun onResume() {
        super.onResume()
        viewModel.getDuePaymetList(binding.paymentRv)

    }

    private fun loadData() {

        recyclerView = binding.paymentRv
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.paymentRv.layoutManager = recyclerView.layoutManager
        listAdapter = PaymentDueListAdapter(context!!, list)
        binding.paymentRv.adapter = listAdapter
    }

    private fun attachObserver() {


        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.duePaymentsList.observe(this, Observer<DuePaymentModel> { it ->
            it?.let {
                if (it.statusCode == Success && !it.data.isNullOrEmpty()) {
                    list.clear()
                    list.addAll(it.data!!)
                    listAdapter.notifyDataSetChanged()
                    binding.paymentRv.visibility = View.VISIBLE
                    binding.txtError.visibility = View.GONE
                } else {
                    binding.paymentRv.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE

                }
            }
        })
    }


}
