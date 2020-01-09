package com.daycare.daycareteacher.ui.dashboard.fragments.attendence


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
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentAttendanceBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.AttendanceData
import com.daycare.daycareteacher.model.AttendanceModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.AttendanceListAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.StudentBreakAdapter
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import java.lang.Exception


/**
 * A simple [Fragment] subclass.
 *
 */
class AttendanceFragment : Fragment(), ILoaderCallback {

    private lateinit var viewModel: AttendanceViewModel
    lateinit var binding: FragmentAttendanceBinding
    var loader = Loader()
    var mSelectedDate = getServerDate(getCurrentDate())
    lateinit var listAdapter: AttendanceListAdapter
    var list: ArrayList<AttendanceData> = ArrayList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view: View = inflater.inflate(R.layout.fragment_attendance, container, false)
        binding = FragmentAttendanceBinding.bind(view)
        initView(view)
        attachObserver(viewModel, view.context)
        setupToolbar()
        return view
    }

    private fun initView(view: View) {
        viewModel = AttendanceViewModel()
        viewModel.getClassData(view)
        binding.viewModel = viewModel

        val recyclerView = binding.attendance
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.attendance.layoutManager = recyclerView.layoutManager
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.attendance)

    }

    private fun attachObserver(viewModel: AttendanceViewModel, context: Context) {
        viewModel.attendenceApiResponse.observe(this, Observer<AttendanceModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
//                            showToast(context, it.data[0].attendenceStatusName!!)
                                list.clear()
                                list.addAll(it.data)
                                listAdapter = AttendanceListAdapter(this, list, mSelectedDate)
                                listAdapter.notifyDataSetChanged()
                                binding.attendance.adapter = listAdapter
                                binding.attendance.visibility = View.VISIBLE
                                binding.emptyTxt.visibility = View.GONE

                            } else {
//                            showToast(context, "No Data Found!!")
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

    override fun startLoader(value: Boolean) {
        if (value) {
            context?.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }

//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        super.onActivityResult(requestCode, resultCode, data)
//
//        if (requestCode == 111 && resultCode == Activity.RESULT_OK) {
//            val status = data?.getIntExtra("status", -1)
//            if (status != -1) {
//                viewModel.statusFlag.set(status)
//            }
//        }
//
//    }
}
