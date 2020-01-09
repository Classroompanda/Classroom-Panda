package com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet

import android.annotation.SuppressLint
import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.GridLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentDailySheetBinding
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddDailySheetActivity
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity

import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import android.databinding.adapters.TextViewBindingAdapter.setText
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.Selection.removeSelection
import android.util.Log
import android.widget.Button
import android.widget.GridLayout
import android.widget.GridView
import android.widget.LinearLayout
import com.daycare.daycareteacher.interfaces.IAdapterFragmentCallBack
import com.daycare.daycareteacher.interfaces.IFragmentCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.ui.dashboard.adapter.DailySheetAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.SampleDailyGridAdapter
import com.daycare.daycareteacher.utill.AppInstance.selectedStudentsListDailySheet
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG
import java.time.LocalDate


import java.util.*

import java.text.SimpleDateFormat


class DailySheetFragment : Fragment(), IAdapterFragmentCallBack {


    private lateinit var binding: FragmentDailySheetBinding
   // private var childrenList: List<ChildData> = ArrayList()
    private lateinit var viewModel: DailySheetViewModel
    private val DAILYSHEET_DATA_REQUEST = 112
    var mSelectedDate = getServerDate(getCurrentDate())
    var loader = Loader()
    var selectedStudentsList = ArrayList<Int>()
    lateinit var listAdapter: DailySheetAdapter
    lateinit var recyclerView:RecyclerView
    lateinit var gridView:GridView
    lateinit var girdAdapter: SampleDailyGridAdapter



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_daily_sheet, container, false)
        binding = FragmentDailySheetBinding.bind(view)
        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel

        attachObserver(viewModel, context!!)

        setupToolbar()
        return view
    }

    override fun onResume() {
        super.onResume()
        initView(binding.classCard)

    }
    private fun initView(view: View) {

        viewModel.getClassData(view)
        AppInstance.selectedStudentsListDailySheet= ArrayList<Int>()
        selectedStudentsList = ArrayList<Int>()


        gridView=binding.gridView


        val today = Calendar.getInstance().getTime()


    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.dailysheet)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == DAILYSHEET_DATA_REQUEST && resultCode == Activity.RESULT_OK) {


            selectedStudentsList=ArrayList<Int>()
            AppInstance.selectedStudentsListDailySheet=ArrayList<Int>()
            girdAdapter= SampleDailyGridAdapter(
                activity as DashboardActivity,
                AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                mSelectedDate,
                selectedStudentsList,
                this
            )


            /* listAdapter = DailySheetAdapter(
                 this,
                 AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                 mSelectedDate,
                 selectedStudentsList,
                 this
             )*/



        }


    }

    @SuppressLint("RestrictedApi")
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
        viewModel.selectAllStudent.observe(this, Observer<Boolean> { it ->
            it?.let {
                //Check the current text of Select Button
                if (binding.selectAllBtn.text.toString() == resources.getString(R.string.select_all)) {
                    selectedStudentsList = ArrayList<Int>()
                    AppInstance.selectedStudentsListDailySheet= ArrayList<Int>()
                    try {
                        //If Text is Select All then loop to all array List items and check all of them
                        for (i in 0 until AppInstance.dailySheetStudentData!!.size) {

                            selectedStudentsList.add(AppInstance.dailySheetStudentData!!.get(i).studentID!!)
                        }

                        AppInstance.selectedStudentsListDailySheet = selectedStudentsList
                        /* listAdapter = DailySheetAdapter(
                             this,
                             AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                             mSelectedDate,
                             selectedStudentsList,
                             this
                         )
                         binding.dailySheet.adapter = listAdapter*/

                        girdAdapter= SampleDailyGridAdapter(
                            activity as DashboardActivity,
                            AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                            mSelectedDate,
                            selectedStudentsList,
                            this
                        )
                        binding.gridView.adapter=girdAdapter


                        binding.selectAllBtn.setText(resources.getString(R.string.deselect_all))
                    }catch(e:Exception){


                    }
                } else {
                    //If button text is Deselect All remove check from all items


                    for (i in 0 until AppInstance.selectedStudentsListDailySheet!!.size) {

                        try {
                            selectedStudentsList.remove(AppInstance.dailySheetStudentData!!.get(i).studentID!!)
                        }
                        catch (e:Exception){
                            Log.e("Data Remove", "All elements remove")
                        }
                    }
                    AppInstance.selectedStudentsListDailySheet = selectedStudentsList
                    /*listAdapter = DailySheetAdapter(
                        this,
                        AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                        mSelectedDate,
                        selectedStudentsList,
                        this
                    )
                    binding.dailySheet.adapter = listAdapter
*/

                    girdAdapter= SampleDailyGridAdapter(
                        activity as DashboardActivity,
                        AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                        mSelectedDate,
                        selectedStudentsList,
                        this
                    )
                    binding.gridView.adapter=girdAdapter

                    binding.selectAllBtn.setText(resources.getString(R.string.select_all))
                }

            }
        })





        viewModel.dailySheetApiResponse.observe(this, Observer<DailySheetStudentList> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                selectedStudentsList = ArrayList<Int>()
                                AppInstance.dailySheetStudentData?.clear()
                                AppInstance.dailySheetStudentData = it.data


                                selectedStudentsList = AppInstance.selectedStudentsListDailySheet
                                if(it.data!!.size>0) {
                                    gridView.visibility=View.VISIBLE
                                    binding.txtError.visibility=View.GONE
                                    /* listAdapter = DailySheetAdapter(
                                         this,
                                         it.data as ArrayList<DailySheetStudentData>?,
                                         mSelectedDate,
                                         selectedStudentsList, this
                                     )
                                     binding.dailySheet.adapter = listAdapter
                                  */

                                    girdAdapter= SampleDailyGridAdapter(
                                        activity as DashboardActivity,
                                        AppInstance.dailySheetStudentData as ArrayList<DailySheetStudentData>?,
                                        mSelectedDate,
                                        selectedStudentsList,
                                        this
                                    )
                                    binding.gridView.adapter=girdAdapter

                                }
                                else{


                                }

                            } else {
                                gridView.visibility=View.GONE
                                binding.txtError.visibility=View.VISIBLE

                                showToast(context, "No Data Found!!")
                            }

                            val stringDate = mSelectedDate
                            val date1 = SimpleDateFormat("M-d-yyyy").parse(stringDate)

                            // 5-21-2019
                            try {

                                if (isToday(date1)) {
                                    binding.addDailySheetDetail.visibility = View.VISIBLE
                                    binding.selectAllBtn.visibility = View.VISIBLE
                                    AppInstance.selectedDate=mSelectedDate

                                    // showToast(context!!, "Todays date")
                                } else {
                                    binding.addDailySheetDetail.visibility = View.GONE
                                    binding.selectAllBtn.visibility = View.GONE
                                    AppInstance.selectedDate=mSelectedDate
                                    // showToast(context!!, "Not Todays date")
                                }
                            }catch (e:Exception){
                                binding.addDailySheetDetail.visibility = View.VISIBLE
                                binding.selectAllBtn.visibility = View.VISIBLE
                            }

                        }
                        catch(e:Exception){
                            gridView.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
                        }



                    }
                    else -> {
                        gridView.visibility=View.GONE
                        binding.txtError.visibility=View.VISIBLE

                        showToast(context, it.message!!)
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

        viewModel.isUpdate.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    binding.selectAllBtn.setText(resources.getString(R.string.select_all))
                } else {
                    // loader.stopLoader()
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
    override fun onUpdateView(value: Boolean) {

        if(value){
            binding.selectAllBtn.setText(resources.getString(R.string.deselect_all))
        }
        else {
            binding.selectAllBtn.setText(resources.getString(R.string.select_all))
        }
    }




}

