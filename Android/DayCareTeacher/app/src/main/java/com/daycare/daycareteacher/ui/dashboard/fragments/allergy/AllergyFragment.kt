package com.daycare.daycareteacher.ui.dashboard.fragments.allergy

import androidx.lifecycle.Observer
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentAllergyListBinding
import com.daycare.daycareteacher.model.AllergyData
import com.daycare.daycareteacher.model.AllergyModel
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.model.StudentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.activities.StudentDetailActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.AllergyListAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.StudentListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.serverDate
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import java.util.*

class AllergyFragment : Fragment() {

    lateinit var binding: FragmentAllergyListBinding
    private lateinit var viewModel: AllergyViewModel
    var loader = Loader()

    lateinit var recyclerView: RecyclerView
    lateinit var listAdapter: AllergyAdapter
    var list = ArrayList<AllergyModel.Allergy>()


    override fun onCreateView( inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_allergy_list, container, false)
        binding = FragmentAllergyListBinding.bind(view)
        viewModel = AllergyViewModel()

        setupToolbar()

        viewModel.allergyList(view)
        attachObserver(viewModel)
        loadData()

        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.allergy_list)
    }

    private fun loadData() {
        recyclerView = binding.allergyRv
        recyclerView.layoutManager =
            LinearLayoutManager(
                context,
                LinearLayout.VERTICAL,
                false
            )
        binding.allergyRv.layoutManager = recyclerView.layoutManager
        listAdapter = AllergyAdapter(context!!, list)
        binding.allergyRv.adapter = listAdapter
    }

    private fun attachObserver(viewModel: AllergyViewModel) {
        viewModel.allergyApiResponse.observe( this, Observer<Any> { it ->
            it?.let {
                if (it is AllergyModel) {
//                    loader.stopLoader()
                    if (it.statusCode == ResponseCodes.Success) {
                        try {
                            if (it.data?.isNotEmpty()!!) {
//                            showToast(context, "Success")
                                binding.allergyRv.visibility = View.VISIBLE
                                binding.txtError.visibility = View.GONE
                                val listAdapter = AllergyAdapter(context, it.data)
                                binding.allergyRv.adapter = listAdapter
                            } else {
                                binding.allergyRv.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE

                                // showToast(context, "No Data Found!!")
                            }

                        }catch(e: Exception){
                            binding.allergyRv.visibility = View.GONE
                            binding.txtError.visibility = View.VISIBLE
                        }

                    } else {
//                        loader.stopLoader()
                        showToast(context!!, it.message.toString())
                    }
                } else {
//                    loader.stopLoader()
                }
            }

        })


        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }

}