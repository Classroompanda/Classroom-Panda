package com.daycare.daycareparent.ui.dashboard.postactivity


import android.os.Bundle
import android.support.design.widget.TabLayout
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentTransaction
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPostBinding
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.setStudentImage
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class PostFragment : Fragment() {

    lateinit var binding: FragmentPostBinding
    lateinit var viewModel: PostViewModel
    var currentFragment = -1
    var currentChild = 0
    var check = 0
    var isSetFrag = false
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_post, container, false)
        binding = FragmentPostBinding.bind(view)
        viewModel = PostViewModel()
        binding.viewModel = viewModel
        initView()
        setupToolbar()
        binding.tabsPost.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(p0: TabLayout.Tab?) {

            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                setSelectedTab(tab?.position, currentChild)
            }
        })

        val data = PreferenceConnector.readChild(context!!, PreferenceConnector.CHILD)
        if (data != null && AppInstance.allChilds != null) {
            for (pos in 0 until AppInstance.allChilds!!.size) {
                if (AppInstance.allChilds!![pos].studentId == data.studentId) {
                    goToFragment(PublicPostFragment(), 0, pos)
                }
            }
        }
        return view
    }

    private fun setSelectedTab(position: Int?, childPos: Int) {

        when (position) {
            0 -> {
                goToFragment(PublicPostFragment(), position, childPos)
            }
            1 -> {
                goToFragment(PrivatePostFragment(), position, childPos)

            }

        }
    }

    override fun onResume() {
        super.onResume()



    }

    private fun initView() {
        binding.tabsPost.addTab(binding.tabsPost.newTab().setText("Public"), 0, true)
        binding.tabsPost.addTab(binding.tabsPost.newTab().setText("Private"), 1)

    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.dashboard)

        toolbar.dropdown.visibility = View.VISIBLE
        toolbar.childProfile.visibility = View.VISIBLE
        toolbar.logoutTxt.visibility = View.GONE

        toolbar.dropdown.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(p0: AdapterView<*>?) {


            }

            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
//                if (check > 0) {
                val pos = binding.tabsPost.selectedTabPosition
                PreferenceConnector.writeChildInfo(
                    context!!, PreferenceConnector.CHILD,
                    AppInstance.allChilds?.get(p2)!!
                )
                val url =
                    AppInstance.allChilds?.get(p2)!!.imagePath// PreferenceConnector.readChild(context, PreferenceConnector.CHILD)?.imagePath
                setStudentImage(toolbar, url, p1?.context!!)
                setSelectedTab(pos, p2)

//                }
//                check++
            }
        }

    }


    private fun goToFragment(fragment: Fragment, itemId: Int, childPos: Int) {
        if (itemId != currentFragment || childPos != currentChild) {
            val fragmentTransaction: FragmentTransaction = childFragmentManager.beginTransaction()
            fragmentTransaction.replace(R.id.viewpager_post, fragment, itemId.toString())
            fragmentTransaction.commit()
            currentFragment = itemId
            currentChild = childPos
            isSetFrag = true
        }

    }


}
