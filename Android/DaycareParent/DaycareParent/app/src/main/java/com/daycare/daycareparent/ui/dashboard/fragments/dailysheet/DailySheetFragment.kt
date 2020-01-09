package com.daycare.daycareparent.ui.dashboard.fragments.dailysheet

import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentDailySheetBinding
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.AddDailySheetActivity
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import android.support.v7.widget.RecyclerView
import android.widget.AdapterView
import android.widget.LinearLayout
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.ui.dashboard.adapter.DailySheetDetailAdapter


class DailySheetFragment : Fragment() {


    private lateinit var binding: FragmentDailySheetBinding
    // private var childrenList: List<ChildData> = ArrayList()
    private lateinit var viewModel: DailySheetViewModel
    private val DAILYSHEET_DATA_REQUEST = 112
    var mSelectedDate = getServerDate(getCurrentDate())
    var loader = Loader()
    var selectedStudentsList = ArrayList<Int>()
    lateinit var listAdapter: DailySheetDetailAdapter
    lateinit var recyclerView: RecyclerView


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_daily_sheet, container, false)
        binding = FragmentDailySheetBinding.bind(view)
        initView(view)

        attachObserver(viewModel, context!!)

        setupToolbar()
        return view
    }

    private fun initView(view: View) {
        viewModel = DailySheetViewModel()
        viewModel.getDailySheetDataRequest(view)
        AppInstance.selectedStudentsListDailySheet = ArrayList<Int>()
        selectedStudentsList = ArrayList<Int>()
        binding.viewModel = viewModel

        recyclerView = binding.dailySheet
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.dailySheet.layoutManager = recyclerView.layoutManager


    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.dailysheet)

        toolbar.dropdown.visibility = View.VISIBLE
        toolbar.childProfile.visibility = View.VISIBLE
        toolbar.logoutTxt.visibility = View.GONE
//        setStudentImage(toolbar, PreferenceConnector.readChild(context!!, PreferenceConnector.CHILD)?.imagePath,context!!)
        toolbar.dropdown.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(p0: AdapterView<*>?) {


            }

            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {

                PreferenceConnector.writeChildInfo(
                    context!!, PreferenceConnector.CHILD,
                    AppInstance.allChilds?.get(p2)!!
                )
                val url =
                    AppInstance.allChilds?.get(p2)!!.imagePath// PreferenceConnector.readChild(context, PreferenceConnector.CHILD)?.imagePath
                setStudentImage(toolbar, url, p1?.context!!)
                viewModel.getDailySheetDataRequest(p1) }
        }

}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == DAILYSHEET_DATA_REQUEST && resultCode == Activity.RESULT_OK) {

        selectedStudentsList = ArrayList<Int>()
        AppInstance.selectedStudentsListDailySheet = ArrayList<Int>()
        listAdapter = DailySheetDetailAdapter(
            AppInstance.dailySheetStudentData?.get(0)?.activityDetail!!
        )


    } else {
        showToast(this!!.context!!, "Something wrong")
    }

}

private fun attachObserver(viewModel: DailySheetViewModel, context: Context) {


    viewModel.addDailySheetFab.observe(this, Observer<Boolean> { it ->
        it?.let {
            if (AppInstance.selectedStudentsListDailySheet.size > 0) {
                val intent = Intent(context, AddDailySheetActivity::class.java)
                startActivityForResult(intent, DAILYSHEET_DATA_REQUEST)

            } else {
                showToast(context, "Please select student list")
            }

        }
    })

    viewModel.dailySheetApiResponse.observe(this, Observer<DailySheetStudentList> { it ->
        it?.let {
            when (it.statusCode) {
                ResponseCodes.Success -> {
                    if (it.data != null && it.data?.isNotEmpty()!!) {
                        selectedStudentsList = ArrayList<Int>()
                        AppInstance.dailySheetStudentData = it.data

                        selectedStudentsList = AppInstance.selectedStudentsListDailySheet
                        if (it.data!!.isNotEmpty() && AppInstance.dailySheetStudentData?.get(0)?.activityDetail?.size!! > 0) {
                            recyclerView.visibility = View.VISIBLE
                            binding.txtError.visibility = View.GONE
                            listAdapter = DailySheetDetailAdapter(
                                AppInstance.dailySheetStudentData?.get(0)?.activityDetail!!
                            )
                            binding.dailySheet.adapter = listAdapter
                        } else {
                            recyclerView.visibility = View.GONE
                            binding.txtError.visibility = View.VISIBLE

                        }

                    } else {
                        recyclerView.visibility = View.GONE
                        binding.txtError.visibility = View.VISIBLE

//                        showToast(context, "No Data Found!!")
                    }
                }
                else -> {
                    recyclerView.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE

//                    showToast(context, it.message!!)
                }
            }
        }
    })
    viewModel.selectedDate.observe(this, Observer<String> { it ->
        it?.let {
            mSelectedDate = it
        }

    })
    viewModel.isLoading.observe(this, Observer<Boolean> { it ->
        it?.let {
            if (it) {
                loader.startLoader(context)
            } else {
                loader.stopLoader()
            }
        }

    })


}

fun startLoader(value: Boolean) {
    if (value) {
        context?.let { loader.startLoader(it) }
    } else {
        loader.stopLoader()
    }
}


}

