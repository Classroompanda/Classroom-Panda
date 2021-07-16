package com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentSheetBinding
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class DailySheetFragment : Fragment() {

    lateinit var binding: FragmentSheetBinding
    lateinit var viewModel: DailySheetViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_sheet, container, false)
        binding = FragmentSheetBinding.bind(view)
        setupToolbar()
        val fragmentAdapter = MyPagerAdapter(childFragmentManager)
        binding.viewpagerDailySheet.adapter = fragmentAdapter
        binding.tabsDailySheet.setupWithViewPager(binding.viewpagerDailySheet)
        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel

        return view
    }
    internal inner class MyPagerAdapter(manager: FragmentManager) : FragmentPagerAdapter(manager) {
        override fun getItem(position: Int): Fragment {
            return when (position) {
                0 -> CurrentDailySheetFragment()
                else -> CompleteDailySheetFragment()

            }
        }

        override fun getCount(): Int {
            return 2
        }

        override fun getPageTitle(position: Int): CharSequence ?{
            return when (position) {
                0 -> getString(R.string.current_daily_sheet)
                1 -> getString(R.string.complete_daily_sheet)
                else -> {
                    return null
                }
            }
        }
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.dailysheet)

    }

}