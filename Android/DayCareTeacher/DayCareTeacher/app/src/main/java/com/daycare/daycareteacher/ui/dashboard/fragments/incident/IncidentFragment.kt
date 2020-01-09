package com.daycare.daycareteacher.ui.dashboard.fragments.incident

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentIncidentBinding
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class IncidentFragment : Fragment() {

    lateinit var binding: FragmentIncidentBinding
    private var viewModel = IncidentViewModel()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_incident, container, false)
        binding = FragmentIncidentBinding.bind(view)
        binding.viewModel = viewModel
        setupToolbar()
        val fragmentAdapter = MyPagerAdapter(childFragmentManager)
        binding.viewpagerMain.adapter = fragmentAdapter
        binding.tabsMain.setupWithViewPager(binding.viewpagerMain)

        return view

    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.incident)

    }

    internal inner class MyPagerAdapter(manager: FragmentManager) : FragmentPagerAdapter(manager) {

        override fun getItem(position: Int): Fragment? {
            return when (position) {
                0 -> IncidentReportFragment()
                1 -> BitingLogFragment()

                else -> {
                    return null
                }
            }
        }

        override fun getCount(): Int {
            return 2
        }

        override fun getPageTitle(position: Int): CharSequence? {
            return when (position) {
                0 -> getString(R.string.incident_report)
                1 -> getString(R.string.biting_log)
                else -> {
                    return null
                }
            }
        }
    }

}