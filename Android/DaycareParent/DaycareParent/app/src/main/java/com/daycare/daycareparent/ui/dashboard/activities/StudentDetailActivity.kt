package com.daycare.daycareparent.ui.dashboard.activities

import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.support.v7.widget.Toolbar
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityStudentDetailBinding
import com.daycare.daycareparent.ui.dashboard.fragments.student.AllergiesImmunizationFragment
import com.daycare.daycareparent.ui.dashboard.fragments.student.GuardianInfoFragment
import com.daycare.daycareparent.ui.dashboard.fragments.student.StdBasicInfoFragment
import com.daycare.daycareparent.ui.dashboard.fragments.student.StudentViewModel
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.WebServices.IMAGE_URL
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
        toolbar.headerTxt.text=getString(R.string.student_detail)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
        binding.studentNameTxt.text=AppInstance.studentDetails?.data?.studentName
        binding.studentAddressTxt.text=AppInstance.studentDetails?.data?.address+" "+AppInstance.studentDetails?.data?.cityName+" "+AppInstance.studentDetails?.data?.postalCode




        Glide.with(this).load(IMAGE_URL+""+AppInstance.studentDetails?.data?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_placeholder)
            .into(binding.circleImageView);

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