package com.daycare.daycareparent.ui.dashboard.fragments.attendence


import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentAttendanceBinding
import com.daycare.daycareparent.interfaces.ILoaderCallback
import com.daycare.daycareparent.model.AttendanceResponse
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.adapter.AttendanceListAdapter
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*


/**
 * A simple [Fragment] subclass.
 *
 */
class AttendanceFragment : Fragment(),ILoaderCallback {

    private lateinit var viewModel: AttendanceViewModel
    lateinit var binding: FragmentAttendanceBinding
    var loader = Loader()
    var mSelectedDate= getServerDate(getCurrentDate())
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

        //viewModel.getClassData(view)
        binding.viewModel = viewModel
       viewModel.getAttendanceDataRequest(view)

        val recyclerView = binding.attendance
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.attendance.layoutManager = recyclerView.layoutManager
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.attendance)

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
                viewModel.getAttendanceDataRequest(p1)
            }
        }

    }

    private fun attachObserver(viewModel: AttendanceViewModel, context: Context) {
        viewModel.attendenceApiResponse.observe(this, Observer<AttendanceResponse> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            binding.attendance.visibility=View.VISIBLE
                            binding.txtError.visibility=View.GONE
//                            showToast(context, it.data[0].attendenceStatusName!!)
                            val listAdapter = AttendanceListAdapter(this, it.data, mSelectedDate)
                            binding.attendance.adapter = listAdapter
                        } else {
                            binding.attendance.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
//                            showToast(context, "No Data Found!!")
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
                mSelectedDate=it
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

}
