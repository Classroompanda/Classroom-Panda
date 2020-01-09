package com.daycare.daycareparent.ui.dashboard.addchildform

import android.content.Intent
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.design.widget.TabLayout
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.support.v4.app.FragmentTransaction
import android.support.v7.app.AppCompatActivity
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddFormBinding
import com.daycare.daycareparent.model.ParentChild
import com.daycare.daycareparent.utill.AppInstance


class AddFormActivity : AppCompatActivity() {

    lateinit var binding: ActivityAddFormBinding
    lateinit var viewModel: AddFormViewModel
    var basicInfoData: ParentChild? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_add_form)
        viewModel = AddFormViewModel()
        binding.viewModel = viewModel
        initView()
        goToFragment(BasicInfoFormFrag(), 0)

        binding.tabsStudent.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(p0: TabLayout.Tab?) {

            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                when {
                    tab?.position == 1 -> {
                        goToFragment(GuardianInfoFrag(), tab.position)
                    }
                    tab?.position == 2 -> {
                        goToFragment(AllergiesInfoFrag(), tab.position)

                    }
                    else -> {
                        //                    default selected pos 0
                        goToFragment(BasicInfoFormFrag(), 0)

                    }
                }
            }
        })
    }

    private fun initView() {
        basicInfoData = intent.getParcelableExtra("basic_info")
        AppInstance.basicInfo = basicInfoData
        binding.tabsStudent.addTab(binding.tabsStudent.newTab().setText("Basic Info"), 0, true)
        binding.tabsStudent.addTab(binding.tabsStudent.newTab().setText("Add Guardian"), 1)
        binding.tabsStudent.addTab(binding.tabsStudent.newTab().setText("Allergies and Immunization"), 2)

        if (AppInstance.basicInfo != null) {
            val data = AppInstance.basicInfo
            binding.headerTxt.text = data?.studentName
            viewModel.getStudentInfoDetail(binding.viewpagerStudent, data)//api
        }
    }

    private fun goToFragment(fragment: Fragment, itemId: Int) {
//        if (itemId != currentFragment) {


        val fragmentTransaction: FragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.viewpager_student, fragment, itemId.toString())
        fragmentTransaction.commit()
//            currentFragment = itemId
//            binding.navView.setCheckedItem(currentFragment)
//            }

    }


}


