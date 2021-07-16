package com.daycare.daycareteacher.ui.dashboard.fragments.attendence

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentAttendanceBinding
import com.daycare.daycareteacher.interfaces.IListAdapterCallBack
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.AttendanceData
import com.daycare.daycareteacher.model.AttendanceModel
import com.daycare.daycareteacher.model.SampleID
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.AttendanceListAdapter
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.getCurrentDateTime
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

/**
 * A simple [Fragment] subclass.
 */
class AttendanceFragment : Fragment(), ILoaderCallback, IListAdapterCallBack,AttendanceListAdapter.EventListener,
    ViewItemClickListener<AttendanceData> {

    private lateinit var viewModel: AttendanceViewModel
    lateinit var binding: FragmentAttendanceBinding
    var loader = Loader()
    var mSelectedDate = getCurrentDateTime()//getServerDate(getCurrentDate())
    var listAdapter: AttendanceListAdapter?=null
    var list: ArrayList<AttendanceData> = ArrayList()
    var masterview: View? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_attendance, container, false)
        binding = FragmentAttendanceBinding.bind(view)
        initView(view)
        attachObserver(viewModel, view.context)
        setupToolbar()
        masterview=view

        return view
    }

    private fun initView(view: View) {
        viewModel = AttendanceViewModel()
        binding.viewModel = viewModel

        viewModel.setLoader(this)
        viewModel.getOperationalClassData(view,mSelectedDate)

        binding.imageButton.setOnClickListener(){
            viewModel.onClickCalendar(it)
        }

        val recyclerView = binding.attendance
        recyclerView.layoutManager =
            LinearLayoutManager( context, RecyclerView.VERTICAL,false )
        binding.attendance.layoutManager = recyclerView.layoutManager
        listAdapter = AttendanceListAdapter(this, list, mSelectedDate, this,this,viewModel)
        binding.attendance.adapter = listAdapter
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.attendance)

    }

    private fun attachObserver(viewModel: AttendanceViewModel, context: Context) {

        viewModel.nodata.observe(this, Observer<Boolean>{
            if(it){
                binding.attendance.visibility = View.GONE
                binding.emptyTxt.visibility = View.VISIBLE
            }
        })


        viewModel.attendenceApiResponse.observe(this, Observer<AttendanceModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                list.clear()
                                list.addAll(it.data)
                                listAdapter?.notifyDataSetChanged()
                                binding.attendance.visibility = View.VISIBLE
                                binding.emptyTxt.visibility = View.GONE


                            } else {
                                binding.attendance.visibility = View.GONE
                                binding.emptyTxt.visibility = View.VISIBLE
                            }
                        }
                        catch (e:Exception){
                            binding.attendance.visibility = View.GONE
                            binding.emptyTxt.visibility = View.VISIBLE
                        }

                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })
        viewModel.selectedDate.observe(this, Observer<String> { it ->
            it?.let {
                mSelectedDate = it
                listAdapter?.setCalendarDate(mSelectedDate)
            }

        })

        viewModel.successTransfer.observe(this, Observer<SampleID> { it ->
            it?.let {
                listAdapter?.notifyItemRemoved(it.positionId!!)
                listAdapter?.notifyDataSetChanged()

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

        viewModel.transferApiResponse.observe(this, Observer<String> { it ->
            it?.let {
                try {
                    listAdapter?.notifyItemRemoved(it.toInt())
                    listAdapter?.notifyDataSetChanged()
                }catch (e:Exception){

                }
            }
        })

        viewModel.checkInApiResponse.observe(this, Observer<Boolean> { it ->
            it?.let {
                try {
                    if(it)
                        listAdapter?.notifyDataSetChanged()
                }catch (e:Exception){

                }
            }
        })

        viewModel.absentApiResponse.observe(this, Observer<Boolean> { it ->
            it?.let {
                try {
                    if(it)
                        listAdapter?.notifyDataSetChanged()
                }catch (e:Exception){

                }
            }
        })



        viewModel.checkOutApiResponse.observe(this, Observer<Boolean> { it ->
            it?.let {
                try {
                    if(it)
                        listAdapter?.notifyDataSetChanged()
                }catch (e:Exception){

                }
            }
        })
    }

    override fun startLoader(value: Boolean) {
        if (value) {
            context?.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }


    override fun onUpdateTransfer(value: Int) {
        listAdapter?.notifyItemRemoved(value)
        listAdapter?.notifyDataSetChanged()
    }

    override fun onEvent(data: AttendanceModel, adapterPosition: Int) {

        if(list.size-1 >= adapterPosition) {
            list.removeAt(adapterPosition)
            if (list.size == 0) {
                listAdapter?.notifyDataSetChanged()
                binding.attendance.visibility = View.GONE
                binding.emptyTxt.visibility = View.VISIBLE
            } else {
                listAdapter?.notifyDataSetChanged()
                binding.attendance.visibility = View.VISIBLE
                binding.emptyTxt.visibility = View.GONE
            }
        }
    }

    override fun onViewItemClick(attendanceData: AttendanceData, position: Int, actionId: Int) {
        when(actionId){
            0 ->{
                activity?.let { viewModel.onClickCheckIn(it,attendanceData,position) }
            }

            1 ->{
                activity?.let { viewModel.onClickCheckOut(it,attendanceData,position) }
            }

            2 ->{
                activity?.let { viewModel.onClickEditBtn(it,attendanceData,position) }
            }

            3 ->{
                activity?.let { viewModel.onClickAbsent(it,attendanceData,position) }
            }

            4 ->{
                activity?.let { viewModel.onBreakInRedirectPage(it,attendanceData,position) }
            }
        }
    }

}
