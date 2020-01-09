package com.daycare.daycareparent.ui.dashboard.payment


import android.os.Bundle
import android.support.design.widget.TabLayout
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentTransaction
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPaymentListBinding
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.postactivity.PrivatePostFragment
import com.daycare.daycareparent.ui.dashboard.postactivity.PublicPostFragment
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*


class PaymentListFragment : Fragment() {

    lateinit var binding: FragmentPaymentListBinding
    lateinit var viewModel: PaymentViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_payment_list, container, false)
        binding = FragmentPaymentListBinding.bind(view)
        viewModel = PaymentViewModel()
        binding.viewModel = viewModel
        initView()
        setupToolbar()
        binding.paymentTabs.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(p0: TabLayout.Tab?) {

            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                setSelectedTab(tab?.position)
            }
        })

        return view
    }

    private fun initView() {
        binding.paymentTabs.addTab(binding.paymentTabs.newTab().setText("Due Payments"), 0, true)
        binding.paymentTabs.addTab(binding.paymentTabs.newTab().setText("Payment History"), 1)
        setSelectedTab(0)
    }

    private fun setSelectedTab(position: Int?) {

        when (position) {
            0 -> {
                goToFragment(DuePaymentsFragment(), position)
            }
            1 -> {
                goToFragment(PaymentHistoryFragment(), position)

            }

        }
    }

    private fun goToFragment(fragment: Fragment, itemId: Int) {
//        if (itemId != currentFragment || childPos != currentChild) {
        val fragmentTransaction: FragmentTransaction = childFragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.viewpager_post, fragment, itemId.toString())
        fragmentTransaction.commit()
//            currentFragment = itemId
//            currentChild = childPos
//            isSetFrag = true
//        }

    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.payment_history)
        toolbar.dropdown.visibility = View.GONE
        toolbar.childProfile.visibility = View.GONE
        toolbar.logoutTxt.visibility = View.GONE

    }

}
