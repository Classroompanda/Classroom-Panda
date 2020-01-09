package com.daycare.daycareteacher.ui.dashboard.fragments.dashboard

import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.LinearSnapHelper
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentHomeBinding
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.ClassStatusData
import com.daycare.daycareteacher.model.TeacherClassCheckInModel
import com.daycare.daycareteacher.model.TeacherClassLogModel
import com.daycare.daycareteacher.model.TeacherDataSample
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.ClassStatusAdapter
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

/**
 * A simple [Fragment] subclass.
 *
 */
class HomeFragment : Fragment(), ILoaderCallback {
    private lateinit var binding: FragmentHomeBinding
    private var viewModel = HomeViewModel()
    private var teacherData = TeacherDataSample()
    private var classData: List<ClassStatusData> = ArrayList()
    var loader = Loader()

    lateinit var recyclerView: RecyclerView
    lateinit var snapHelper: LinearSnapHelper
    lateinit var listAdapter: ClassStatusAdapter
    lateinit var contextNew: Context

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View = inflater.inflate(R.layout.fragment_home, container, false)
        binding = FragmentHomeBinding.bind(view)
        binding.viewModel = viewModel
        attachObserver(viewModel, view.context)
        contextNew = view.context

        val str = AppInstance.loginResponse?.data?.firstName
        val str1 = AppInstance.loginResponse?.data?.lastName
        val combineName = str + " " + str1
        binding.tvusername.text = combineName
        binding.tvaddress.text = AppInstance.loginResponse?.data?.emailAddress
        // if(AppInstance.loginResponse?.data?.isLoggedIn!!) {
        binding.tvstatus.text = "Clock In"
        // }

        Glide.with(view.context).load(AppInstance.loginResponse?.data?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.imageView9)

        Glide.with(binding.imageView9.context)
            .load(AppInstance.loginResponse?.data?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.imageView9)

        viewModel.setFragmentTabClickListener((activity as DashboardActivity))

        viewModel.getTeacherClassLog(view)

        teacherData = TeacherDataSample("Anna Williams", "", "8.00AM", classData)

        recyclerView = binding.container
        snapHelper = LinearSnapHelper()
        //  val listAdapter = ClassStatusAdapter(classData)

        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.HORIZONTAL, false)
        binding.container.layoutManager = recyclerView.layoutManager
        snapHelper.attachToRecyclerView(recyclerView)
        //  binding.container.adapter = listAdapter
        setupToolbar()
        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.dashboard)
    }

    private fun attachObserver(viewModel: HomeViewModel, context: Context) {
        viewModel.classLogApiResponse.observe(this, Observer<TeacherClassLogModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!! && it.data.size > 0) {
                                binding.statusContainer.visibility = View.GONE
                                binding.container.visibility = View.VISIBLE
                                listAdapter = ClassStatusAdapter(this, it.data)
                                binding.container.adapter = listAdapter

                                /* val listAdapter = AttendanceListAdapter(this, it.data, mSelectedDate)
                                 binding.attendance.adapter = listAdapter*/

                                viewModel.getCurrentCheckInStatus(context)

                            } else {

                                binding.statusContainer.visibility = View.VISIBLE
                                binding.container.visibility = View.INVISIBLE

//                            showToast(context, "No Data Found!!")
                            }
                        }
                        catch(e:Exception){
                            binding.statusContainer.visibility = View.VISIBLE
                            binding.container.visibility = View.INVISIBLE

                        }

                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
                }
            }
        })
        viewModel.teacherClassCheckInAPIResponse.observe(this, Observer<TeacherClassCheckInModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        if (it.data?.isNotEmpty()!!) {
                            if (it.data != null) {
                                AppInstance.teacherClassCheckInModel = it
                            }

                        } else {
//                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        showToast(context, it.message!!)
                    }
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
    }


    override fun startLoader(value: Boolean) {
        if (value) {
            context?.let { loader.startLoader(it) }
        } else {
            loader.stopLoader()
        }
    }
}
