package com.daycare.daycareparent.ui.dashboard.parentprofile


import android.content.Intent
import android.os.Bundle
import android.support.design.widget.TabLayout
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentTransaction
import android.support.v7.widget.Toolbar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentProfilesBinding
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*


class ProfilesFragment : Fragment() {

    lateinit var binding: FragmentProfilesBinding
    lateinit var toolbar: Toolbar

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_profiles, container, false)
        binding = FragmentProfilesBinding.bind(view)
        initView()

        setupToolbar()
        binding.tabsProfile.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(p0: TabLayout.Tab?) {

            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                setSelectedTab(tab?.position)

            }
        })
        goToFragment(ParentFragment(), 0)
        return view
    }

    private fun setSelectedTab(position: Int?) {

        when (position) {
            0 -> {
                goToFragment(ParentFragment(), position)
            }
            1 -> {
                goToFragment(SecParentFragment(), position)

            }

        }
    }

    private fun setupToolbar() {
        toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.profile)
        toolbar.dropdown.visibility = View.GONE
        toolbar.childProfile.visibility = View.GONE
        toolbar.logoutTxt.visibility = View.VISIBLE
        toolbar.logoutTxt.setOnClickListener {
            startActivity(Intent(context!!, ChangePasswordActivity::class.java))
        }

    }

    private fun initView() {
        binding.tabsProfile.addTab(binding.tabsProfile.newTab().setText("Parent"), 0)
        binding.tabsProfile.addTab(binding.tabsProfile.newTab().setText("Secondary Parent"), 1)

    }

    private fun goToFragment(fragment: Fragment, itemId: Int) {
//        if (itemId != currentFragment) {


        val fragmentTransaction: FragmentTransaction = childFragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.viewpager_parent, fragment, itemId.toString())
        fragmentTransaction.commit()
//            currentFragment = itemId
//            binding.navView.setCheckedItem(currentFragment)
//            }

    }


}
