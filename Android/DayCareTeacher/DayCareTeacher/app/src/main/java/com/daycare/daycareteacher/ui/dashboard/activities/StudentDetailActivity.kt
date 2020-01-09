package com.daycare.daycareteacher.ui.dashboard.activities

import android.app.PendingIntent.getActivity
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.support.v7.widget.Toolbar
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityStudentDetailBinding
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.ui.dashboard.fragments.student.AllergiesImmunizationFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.GuardianInfoFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StdBasicInfoFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentViewModel
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.CircleTransform
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.WebServices.IMAGE_URL
import kotlinx.android.synthetic.main.dailysheet_list_item.*
import kotlinx.android.synthetic.main.toolbar.view.*

class StudentDetailActivity : AppCompatActivity() {

    lateinit var binding: ActivityStudentDetailBinding
    lateinit var toolbar: Toolbar
    lateinit var studentId: String
    private lateinit var viewModel: StudentViewModel
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_student_detail)
        val fragmentAdapter = MyPagerAdapter(supportFragmentManager)
        binding.viewpagerStudent.adapter = fragmentAdapter
        binding.tabsStudent.setupWithViewPager(binding.viewpagerStudent)


        // studentId = intent.getStringExtra("STUDENT_ID")
        viewModel = StudentViewModel()

        setUpToolBar()
        //attachObserver(viewModel)

    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = getString(R.string.student_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
        binding.studentNameTxt.text = AppInstance.studentDetails?.data?.studentName
        binding.studentAddressTxt.text =
            AppInstance.studentDetails?.data?.address + " " + AppInstance.studentDetails?.data?.cityName + " " + AppInstance.studentDetails?.data?.postalCode

//        Glide.with(this)
//            .load(AppInstance.studentDetails?.data?.imagePath)
//            .crossFade()
//            .transform(CircleTransform(this))
//            .fitCenter()
//            .placeholder(R.drawable.ic_placeholder)
//            .into(binding.circleImageView)

        Glide.with(this)
            .load(AppInstance.studentDetails?.data?.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(binding.circleImageView.context))
            .into(binding.circleImageView)

    }


    internal inner class MyPagerAdapter(manager: FragmentManager) : FragmentPagerAdapter(manager) {

        override fun getItem(position: Int): Fragment? {
            return when (position) {
                0 -> StdBasicInfoFragment()
                1 -> GuardianInfoFragment()
                2 -> AllergiesImmunizationFragment()
                else -> {
                    return null
                }
            }
        }

        override fun getCount(): Int {
            return 3
        }

        override fun getPageTitle(position: Int): CharSequence? {
            return when (position) {
                0 -> "Basic Info"
                1 -> "Guardian Info"
                2 -> "Allergies and Immunization"
                else -> {
                    return null
                }
            }
        }
    }
}