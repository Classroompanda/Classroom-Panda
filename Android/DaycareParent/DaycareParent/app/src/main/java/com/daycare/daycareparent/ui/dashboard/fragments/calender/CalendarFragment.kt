package com.daycare.daycareparent.ui.dashboard.fragments.calender

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentCalendarBinding
import android.support.v4.app.FragmentPagerAdapter
import android.widget.AdapterView
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.setStudentImage
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class CalendarFragment : Fragment() {

    lateinit var binding: FragmentCalendarBinding
    lateinit var viewModel: CalendarViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val view = inflater.inflate(R.layout.fragment_calendar, container, false)
        binding = FragmentCalendarBinding.bind(view)
        setupToolbar()
        val fragmentAdapter = MyPagerAdapter(childFragmentManager)
        binding.viewpagerMain.adapter = fragmentAdapter
        binding.tabsMain.setupWithViewPager(binding.viewpagerMain)
        viewModel = CalendarViewModel()
        binding.viewModel = viewModel
        binding.viewModel?.getMealCategory(context!!)


        return view
    }

    internal inner class MyPagerAdapter(manager: FragmentManager) : FragmentPagerAdapter(manager) {

        override fun getItem(position: Int): Fragment? {
            return when (position) {
                0 -> CalendarEventFragment()
                1 -> MealCalFragment()

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
                0 -> getString(R.string.event_planner)
                1 -> getString(R.string.meal_planner)
                else -> {
                    return null
                }
            }
        }
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.calendar)
        toolbar.dropdown.visibility = View.GONE
        toolbar.childProfile.visibility = View.GONE
        toolbar.logoutTxt.visibility = View.GONE
    }
}

