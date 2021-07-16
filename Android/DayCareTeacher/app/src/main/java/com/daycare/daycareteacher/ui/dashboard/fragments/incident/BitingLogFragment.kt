package com.daycare.daycareteacher.ui.dashboard.fragments.incident

import androidx.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import androidx.recyclerview.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentBitingLogBinding
import com.daycare.daycareteacher.model.BitingModel
import com.daycare.daycareteacher.model.IncidentData
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.BittingReportListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.showToast

class BitingLogFragment : Fragment() {

    var _isFragmentLoaded = false

    private lateinit var binding: FragmentBitingLogBinding
    private var viewModel = IncidentViewModel()
    private var loader = Loader()
    lateinit var listAdapter: BittingReportListAdapter
    var mIncidentModel = BitingModel()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_biting_log, container, false)
        binding = FragmentBitingLogBinding.bind(view)
        binding.viewModel = viewModel
        val recyclerView = binding.bitingRv
        recyclerView.layoutManager =
            LinearLayoutManager(
                view?.context,
                LinearLayout.VERTICAL,
                false
            )
        binding.bitingRv.layoutManager = recyclerView.layoutManager
        attachObserver(viewModel, context!!)
        return view
    }

    override fun setUserVisibleHint(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser);
        Log.d("fragment","setUserVisibleHint Biting Called")
        if (isVisibleToUser && !_isFragmentLoaded ) {
            Log.d("fragment"," Biting if inside")

            binding.viewModel!!.getAllBitingData(DashboardActivity.context!!)
            _isFragmentLoaded = true;
        }
    }

        override fun onResume() {
            super.onResume()
            try {
                binding.viewModel!!.getAllBitingData(context!!)

                val incidentdata = mIncidentModel.data
                val mData: IncidentData? = AppInstance.bitingData // biting
                if (mData != null) {
                    for (pos in 0 until incidentdata?.size!!) {
                        if (mData.id == incidentdata[pos].id) {
                            mIncidentModel.data?.set(pos, mData)

                            listAdapter.notifyDataSetChanged()
                        }
                    }
                }
            }
            catch (e: Exception){}

        }

        private fun attachObserver(viewModel: IncidentViewModel, context: Context) {
            viewModel.bitingReportApiResponce.observe(this, Observer<BitingModel> { it ->
                it?.let {
                    when (it.statusCode) {
                        ResponseCodes.Success -> {
                            if (it.data?.isNotEmpty()!!) {
                                binding.bitingRv.visibility = View.VISIBLE
                                binding.txtError.visibility = View.GONE
                                mIncidentModel = it

                                //binding.swipeRefresh.

                                listAdapter = BittingReportListAdapter(mIncidentModel, context)
                                binding.bitingRv.adapter = listAdapter
                            } else {
                                binding.bitingRv.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
                             //   showToast(context, "No Data Found!!")
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


}
