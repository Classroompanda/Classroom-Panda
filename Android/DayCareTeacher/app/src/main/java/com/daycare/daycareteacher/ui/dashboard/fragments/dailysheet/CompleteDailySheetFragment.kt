package com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.GridView
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentCompleteDailySheetBinding
import com.daycare.daycareteacher.model.DailySheetStudentData
import com.daycare.daycareteacher.model.DailySheetStudentList
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.CompleteDailySheetGridAdapter
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import java.text.SimpleDateFormat
import java.util.*

class CompleteDailySheetFragment : Fragment(){
    private lateinit var binding: FragmentCompleteDailySheetBinding
    private lateinit var viewModel: DailySheetViewModel
    private val DAILYSHEET_DATA_REQUEST = 112
    var mSelectedDate = getServerDate(getActualDate())
    var loader = Loader()
    var selectedStudentsList = ArrayList<Int>()
    var completedailySheetStudentData:ArrayList<DailySheetStudentData>?=null
    lateinit var recyclerView: RecyclerView
    lateinit var gridView:GridView
    lateinit var girdAdapter: CompleteDailySheetGridAdapter
    var masterView :View?=null

    override fun setUserVisibleHint(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser)

        if (isVisibleToUser && isResumed())
        {
            //Only manually call onResume if fragment is already visible
            //Otherwise allow natural fragment lifecycle to call onResume
            onResume()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?): View? {
        val view: View = inflater.inflate(R.layout.fragment_complete_daily_sheet, container, false)
        binding = FragmentCompleteDailySheetBinding.bind(view)
        viewModel = DailySheetViewModel()
        binding.viewModel = viewModel
        attachObserver(viewModel, context!!)
        setupToolbar()
        masterView = view
        return view
    }

    override fun onResume() {
        super.onResume()
        if(!userVisibleHint){
            return;
        }
        initView(binding.classCardDailySheet)
    }

    private fun initView(view: View) {
       viewModel.getCompleteClassData(view)
      //  viewModel.getCurrentClassData(view,mSelectedDate)

        selectedStudentsList = ArrayList<Int>()
        gridView=binding.gridViewDailySheet
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
            girdAdapter= CompleteDailySheetGridAdapter(
                activity as DashboardActivity,
                completedailySheetStudentData,
                mSelectedDate, selectedStudentsList)
        }
    }

    @SuppressLint("RestrictedApi")
    private fun attachObserver(viewModel: DailySheetViewModel, context: Context) {

        viewModel.completedailySheetApiResponse.observe(this, Observer<DailySheetStudentList> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                selectedStudentsList = ArrayList<Int>()
                                completedailySheetStudentData?.clear()
                                completedailySheetStudentData = it.data

                            //    selectedStudentsList = AppInstance.selectedStudentsListDailySheet
                                if(it.data!!.size>0) {
                                    gridView.visibility=View.VISIBLE
                                    binding.txtErrorDailySheet.visibility=View.GONE


                                    binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {

                                        override fun onQueryTextChange(p0: String): Boolean {
                                            girdAdapter.filter(p0)

                                            return false
                                        }

                                        override fun onQueryTextSubmit(p0: String): Boolean {
                                           girdAdapter.filter(p0)
                                            return false
                                        }
                                    })



                                }
                                else{
                                }


                                girdAdapter= CompleteDailySheetGridAdapter(
                                    activity as DashboardActivity,
                                    completedailySheetStudentData ,
                                    mSelectedDate,
                                    selectedStudentsList
                                )
                                binding.gridViewDailySheet.adapter=girdAdapter


                            } else {
                                gridView.visibility=View.GONE
                                binding.txtErrorDailySheet.visibility=View.VISIBLE

                                showToast(context, "No Data Found!!")
                            }

                            val stringDate = mSelectedDate
                            val date1 = SimpleDateFormat("M-d-yyyy").parse(stringDate)
//                             val date1 = SimpleDateFormat("yyyy-mm-dd").parse(stringDate)
                            // 5-21-2019
                            try {

                                if (isToday(date1)) {

                                    AppInstance.selectedDate=mSelectedDate

                                    // showToast(context!!, "Todays date")
                                } else {

                                    AppInstance.selectedDate=mSelectedDate
                                    // showToast(context!!, "Not Todays date")
                                }
                            }catch (e:Exception){
                               e.printStackTrace()
                            }
                        }
                        catch(e:Exception){
                            gridView.visibility=View.GONE
                            binding.txtErrorDailySheet.visibility=View.VISIBLE
                        }
                    }
                    else -> {
                        gridView.visibility=View.GONE
                        binding.txtErrorDailySheet.visibility=View.VISIBLE

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
    }

    fun startLoader(value: Boolean) {
        if (value) {
            context?.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }
}
