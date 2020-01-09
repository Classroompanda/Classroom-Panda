package com.daycare.daycareteacher.ui.dashboard.fragments.student


import android.arch.lifecycle.Observer
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.SearchView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentStudentListBinding
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.model.StudentModel
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.activities.StudentDetailActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.StudentListAdapter
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.showToast
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import com.daycare.daycareteacher.utill.Loader
import java.lang.Exception


/**
 * A simple [Fragment] subclass.
 *
 */
class StudentListFragment : Fragment() {
    lateinit var binding: FragmentStudentListBinding
    private lateinit var viewModel: StudentViewModel
    lateinit var searchView: SearchView
    var loader = Loader()

    override fun onCreateView( inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_student_list, container, false)
        binding = FragmentStudentListBinding.bind(view)
        binding.searchView.setOnClickListener {
            binding.searchView.isIconified = false
            binding.searchView.clearFocus()
        }
        viewModel = StudentViewModel(setRequestedStudentData(),view)

        setupToolbar()


        val recyclerView = binding.studentsRv

        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
        binding.studentsRv.layoutManager = recyclerView.layoutManager
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {

            override fun onQueryTextChange(newText: String): Boolean {

                return false
            }

            override fun onQueryTextSubmit(query: String): Boolean {
                Log.i("Query text", query)
                val data = setRequestedStudentData()
                data.studentName = query
                viewModel.getStudentData(data,view)

                return false
            }

        })

        binding.searchView.setOnCloseListener {
            val data = setRequestedStudentData()
            data.studentName = ""
            viewModel.getStudentData(data, view)

            false
        }

        context?.let { attachObserver(viewModel) }
        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = getString(R.string.student_list)
    }

    private fun setRequestedStudentData(): StudentData {
        val studentRequest = StudentData()
        studentRequest.agencyID = AppInstance.loginResponse?.data?.agencyID
        // studentRequest.classId =0
        studentRequest.studentName = ""
//        "attendenceId": 4,
//        attendenceRequest.classID=2
//        attendenceRequest.askedDate="2018-12-10T04:09:23.394Z"
        return studentRequest

    }

    private fun attachObserver(viewModel: StudentViewModel) {
        viewModel.studentApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is StudentModel) {
//                    loader.stopLoader()
                    if (it.statusCode == ResponseCodes.Success) {
                       try {
                           if (it.data?.isNotEmpty()!!) {
//                            showToast(context, "Success")
                               binding.studentsRv.visibility = View.VISIBLE
                               binding.txtError.visibility = View.GONE
                               val listAdapter = StudentListAdapter(context, it.data)
                               binding.studentsRv.adapter = listAdapter
                           } else {
                               binding.studentsRv.visibility = View.GONE
                               binding.txtError.visibility = View.VISIBLE

                               // showToast(context, "No Data Found!!")
                           }

                       }catch(e:Exception){
                           binding.studentsRv.visibility = View.GONE
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
        viewModel.studentDetailApiResponse.observe(this, Observer <Any>{it->
            it?.let {
                val intent = Intent(context, StudentDetailActivity::class.java)
                startActivity(intent)
            }
        })
    }


}

