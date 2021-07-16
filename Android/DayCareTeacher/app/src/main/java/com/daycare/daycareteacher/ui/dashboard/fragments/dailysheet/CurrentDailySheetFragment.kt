package com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentDailySheetBinding
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.DailySheetStudentData
import com.daycare.daycareteacher.model.DailySheetStudentList
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddDailySheetActivity
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.SampleDailyGridAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.SELECTED_STUDENT_LIST
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import java.text.SimpleDateFormat
import java.util.*

class CurrentDailySheetFragment : Fragment(), ViewItemClickListener<DailySheetStudentData> {
    private lateinit var binding: FragmentDailySheetBinding
    private lateinit var viewModel: DailySheetViewModel
    private val DAILYSHEET_DATA_REQUEST = 112
    var mSelectedDate = getCurrentDateTime()//getActualDate()
    var loader = Loader()

    var selectedStudentsListDailySheet = ArrayList<Int>()
    lateinit var recyclerView: RecyclerView
    var girdAdapter: SampleDailyGridAdapter?=null
    var dailySheetStudentData=ArrayList<DailySheetStudentData>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?): View? {
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
        if(!userVisibleHint){
            return;
        }
        initView(binding.classCard)
    }

    override fun setUserVisibleHint(isVisibleToUser: Boolean){
        super.setUserVisibleHint(isVisibleToUser)
        if (isVisibleToUser && isResumed())
        {
            //Only manually call onResume if fragment is already visible
            //Otherwise allow natural fragment lifecycle to call onResume
            onResume()
        }
    }

    private fun initView(view: View) {
        //  viewModel.getClassData(view)
        viewModel.getCurrentClassData(view,mSelectedDate)

        selectedStudentsListDailySheet= ArrayList<Int>()

        /*  girdAdapter= SampleDailyGridAdapter(
              activity as DashboardActivity,
              dailySheetStudentData ,
              mSelectedDate,
              this
          )
          binding.gridView.adapter=girdAdapter*/
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.dailysheet)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == DAILYSHEET_DATA_REQUEST && resultCode == Activity.RESULT_OK) {
            selectedStudentsListDailySheet?.clear()
            selectedStudentsListDailySheet=ArrayList<Int>()

            girdAdapter= SampleDailyGridAdapter(
                activity as DashboardActivity,
                dailySheetStudentData ,
                mSelectedDate,
                this
            )
        }
    }

    @SuppressLint("RestrictedApi")
    private fun attachObserver(viewModel: DailySheetViewModel, context: Context) {
        viewModel.addDailySheetFab.observe(this, Observer<Boolean> { it ->
            it?.let {
                selectedStudentsListDailySheet.clear()
                val selectedList= dailySheetStudentData.filter { it.selection }
                if (selectedList.isNotEmpty()) {
                    for (i in 0 until selectedList.size) {
                        selectedList.get(i).studentID?.let { it1 ->
                            selectedStudentsListDailySheet.add(it1)
                        }
                    }

                    val intent = Intent(context, AddDailySheetActivity::class.java)
                    intent.putExtra(SELECTED_STUDENT_LIST, selectedStudentsListDailySheet)

                    //  intent.putExtra(CLASS_ID, mClassId)
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
                    // selectedStudentsList = ArrayList<Int>()
                    //AppInstance.selectedStudentsListDailySheet= ArrayList<Int>()
                    try {
                        //If Text is Select All then loop to all array List items and check all of them

                        dailySheetStudentData?.let {
                            for (i in 0 until dailySheetStudentData.size) {
                                dailySheetStudentData.get(i).selection=true
                            }
                        }

                        girdAdapter?.notifyDataSetChanged()
                        val selectedList= dailySheetStudentData.filter { it.selection }
                        if(selectedList.isNotEmpty()){
                            binding.selectAllBtn.setText(resources.getString(R.string.deselect_all))
                        }else{
                            binding.selectAllBtn.setText(resources.getString(R.string.select_all))
                        }

                    }catch(e:Exception){
                    }
                } else {
                    dailySheetStudentData?.let {
                        for (i in 0 until dailySheetStudentData.size) {
                            dailySheetStudentData.get(i).selection=false
                        }
                    }

                    girdAdapter?.notifyDataSetChanged()

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
                                dailySheetStudentData.clear()

                                it.data?.let {data->
                                    dailySheetStudentData.addAll(data)
                                }

                                if(it.data!!.size>0) {
                                    binding.gridView.visibility=View.VISIBLE
                                    binding.txtError.visibility=View.GONE

                                    // girdAdapter?.notifyDataSetChanged()

                                    girdAdapter= SampleDailyGridAdapter(
                                        activity as DashboardActivity,
                                        dailySheetStudentData ,
                                        mSelectedDate,
                                        this
                                    )
                                    binding.gridView.adapter=girdAdapter
                                }
                                else{
                                    binding.gridView.visibility=View.GONE
                                    binding.txtError.visibility=View.VISIBLE
                                }
                                binding.selectAllBtn.visibility = View.VISIBLE
                            } else {
                                binding.gridView.visibility=View.GONE
                                binding.txtError.visibility=View.VISIBLE
                                binding.selectAllBtn.visibility = View.GONE
                                binding.addDailySheetDetail.visibility = View.GONE
                                showToast(context, "No Data Found!!")
                            }

                            val selectedList= dailySheetStudentData.filter { it.selection }
                            if(selectedList.isNotEmpty()){
                                binding.selectAllBtn.setText(resources.getString(R.string.deselect_all))
                            }else{
                                binding.selectAllBtn.setText(resources.getString(R.string.select_all))
                            }

                            var newDate : String
                            if(mSelectedDate.length<=9){
                                newDate = convertDate(mSelectedDate, SimpleDateFormat("MM-dd-yyyy"),
                                    SimpleDateFormat("MM-dd-yyyy")
                                )
                            }else{
                                var dateFormat :String
                                if(mSelectedDate.format().substringBefore("-").length ==4){
                                    dateFormat= "yyyy-MM-dd"
                                }else{
                                    dateFormat ="MM-dd-yyyy"
                                }
                                newDate = convertDate(mSelectedDate, SimpleDateFormat(dateFormat),
                                    SimpleDateFormat("MM-dd-yyyy")
                                )
                            }

                            val date1 = convertStringToDateWithoutTimeZone(newDate) //SimpleDateFormat("yyyy-mm-dd").parse(stringDate)

                            try {
                                if (isToday(date1!!)) {
                                    binding.addDailySheetDetail.visibility = View.VISIBLE
                                    binding.selectAllBtn.visibility = View.VISIBLE
                                    AppInstance.selectedDate=mSelectedDate
                                } else {
                                    binding.addDailySheetDetail.visibility = View.GONE
                                    binding.selectAllBtn.visibility = View.GONE
                                    AppInstance.selectedDate=mSelectedDate
                                }
                            }catch (e:Exception){
                                binding.addDailySheetDetail.visibility = View.VISIBLE
                                binding.selectAllBtn.visibility = View.VISIBLE
                            }

                        }
                        catch(e:Exception){
                            binding.addDailySheetDetail.visibility = View.GONE
                            binding.gridView.visibility=View.GONE
                            binding.selectAllBtn.visibility = View.GONE
                            binding.txtError.visibility=View.VISIBLE
                        }

                    }
                    else -> {
                        binding.addDailySheetDetail.visibility = View.GONE
                        binding.gridView.visibility=View.GONE
                        binding.txtError.visibility=View.VISIBLE
                        binding.selectAllBtn.visibility = View.GONE
                        dailySheetStudentData.clear()
                        showToast(context, it.message!!)
                    }
                }
            }
        })
        viewModel.selectedDate.observe(this, Observer<String> { it ->
            it?.let {
                //02-03-2021  10:46:57
                var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)
                if(it.length<=9){
                    mSelectedDate = it+" "+mCurrentTime
                }else{
                    mSelectedDate = it

                }


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

    override fun onViewItemClick(t: DailySheetStudentData, position: Int, actionId: Int) {
        val selectedList= dailySheetStudentData.filter { it.selection }
        if(selectedList.isNotEmpty()){
            binding.selectAllBtn.text = resources.getString(R.string.deselect_all)
        }else{
            binding.selectAllBtn.text = resources.getString(R.string.select_all)
        }
    }
}

