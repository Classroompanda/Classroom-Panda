package com.daycare.daycareteacher.ui.dashboard.fragments.dashboard

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.LinearSnapHelper
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentHomeBinding
import com.daycare.daycareteacher.interfaces.IListAdapterCallBack
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.ClassStatusAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.PreferenceConnector
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

/**
 * A simple [Fragment] subclass.
 *
 */

class HomeFragment : Fragment(), ILoaderCallback , IListAdapterCallBack,
    ViewItemClickListener<ClassLogData> {
    private lateinit var binding: FragmentHomeBinding
    private var viewModel = HomeViewModel()
    private var teacherData = TeacherDataSample()
    private var classData: List<ClassStatusData> = ArrayList()
    var loader = Loader()

    lateinit var recyclerView: RecyclerView
    lateinit var snapHelper: LinearSnapHelper
    lateinit var listAdapter: ClassStatusAdapter
    lateinit var contextNew: Context
    var fstr : String?=null
    var lstr : String?=null
    var combineName : String?=null
    var teacherLogModel = ArrayList<ClassLogData>()

    @SuppressLint("WrongConstant")
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

        viewModel.setLoader(this)

        fstr = AppInstance.getUser(view.context)?.firstName
        lstr = AppInstance.getUser(view.context)?.lastName
        combineName = fstr + " " + lstr
        binding.tvusername.text = combineName
        binding.tvaddress.text = AppInstance.getUser(view.context)?.emailAddress
        binding.tvstatus.text = "Clock In"

        listAdapter = ClassStatusAdapter(this,this ,teacherLogModel)
        binding.container.adapter = listAdapter

        Glide.with(view.context).load(AppInstance.getUser(view.context)?.imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.imageView9)

        Glide.with(binding.imageView9.context)
            .load(AppInstance.getUser(view.context)?.imagePath)
            .asBitmap()
            .placeholder(R.drawable.ic_placeholder)
            .into(binding.imageView9)

        viewModel.setFragmentTabClickListener((activity as DashboardActivity))

        viewModel.getTeacherClassLog(contextNew)

        teacherData = TeacherDataSample("Anna Williams", "", "8.00AM", classData)

        recyclerView = binding.container
        snapHelper = LinearSnapHelper()

        recyclerView.layoutManager =
            LinearLayoutManager(
                view.context,
                LinearLayout.HORIZONTAL,
                false)
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
        viewModel.apiCheckResponse.observe(this,Observer<Boolean>{

            if(it)
                listAdapter.notifyDataSetChanged()})

        viewModel.classLogApiResponse.observe(this, Observer<TeacherClassLogModel> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!! && it.data.size > 0) {
                                binding.statusContainer.visibility = View.GONE
                                binding.container.visibility = View.VISIBLE

                                teacherLogModel.addAll(it.data)
                                listAdapter.notifyDataSetChanged()

                                var classLogData:ClassLogData = it.data.get(0)
                                viewModel.getCurrentCheckInStatus(context,classLogData)

                            } else {
                                binding.statusContainer.visibility = View.VISIBLE
                                binding.container.visibility = View.INVISIBLE
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
                                // AppInstance.teacherClassCheckInModel = it
                                PreferenceConnector.writeTeacherData(context!!, PreferenceConnector.TEACHER_CHECKIN, it)
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

    override fun onResume() {
        super.onResume()
        if (AppInstance.imageChangedOnProfile != null) {
            Glide.with(binding.imageView9.context)
                .load(AppInstance.imageChangedOnProfile)
                .asBitmap()
                .error(R.drawable.ic_placeholder)
                .into(binding.imageView9)
        }

        if(AppInstance.emailChangedOnProfile!=null){
            binding.tvaddress.text =AppInstance.emailChangedOnProfile
        }
        if(AppInstance.fnameChangedOnProfile!=null){
            fstr = AppInstance.fnameChangedOnProfile
        }
        if(AppInstance.lnameChangedOnProfile!=null){
            lstr = AppInstance.lnameChangedOnProfile
        }
        combineName= fstr + " "+ lstr

        binding.tvusername.text = combineName

        //viewModel.getTeacherClassLog(contextNew)

    }

    override fun onUpdateTransfer(value: Int) {
        listAdapter?.notifyDataSetChanged()
    }

    override fun onViewItemClick(classLogData: ClassLogData, position: Int, actionId: Int) {
        when(actionId){
            0 ->{
                activity?.let { viewModel.onClickCheckOut(it,classLogData,position) }
            }

            1 ->{
                activity?.let { viewModel.onClickCheckIn(it,classLogData,teacherLogModel,position) }
            }

            2 ->{
                activity?.let { viewModel.onClickEdit(it,classLogData,position) }
            }
        }
    }
}
