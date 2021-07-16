package com.daycare.daycareteacher.ui.dashboard.fragments.postactivity

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentPostActivityBinding
import com.daycare.daycareteacher.model.PostActivityStudentData
import com.daycare.daycareteacher.model.PostActivityStudentList
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.ui.dashboard.activities.AddPostActivity
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.PostAdapter
import com.daycare.daycareteacher.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class PostActivityFragment : Fragment() {

    lateinit var binding: FragmentPostActivityBinding
    private var viewModel = PostActivityViewModel()
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    var mSelectedDate = getCurrentUTC()
    var mLocalDate = getCurrentDateTime()//getServerDate(getCurrentDate())
    lateinit var listAdapter: PostAdapter
    private val POST_CAMERA_DATA_REQUEST = 113
    lateinit var viewParent:View

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_post_activity, container, false)
        binding = FragmentPostActivityBinding.bind(view)
        binding.viewModel = viewModel
        initView(view)

        attachObserver(viewModel, context!!)
        setupToolbar()
        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.postactivity)
    }

    private fun initView(view: View) {
        viewModel = PostActivityViewModel()
        viewModel.getClassData(view,mSelectedDate!!,mLocalDate)
        viewParent=view

        binding.viewModel = viewModel
        recyclerView = binding.postsRv
        recyclerView.layoutManager =
            LinearLayoutManager(
                view.context,
                RecyclerView.VERTICAL,
                false
            )
        binding.postsRv.layoutManager = recyclerView.layoutManager

        binding.addPicsActivity.setOnClickListener {
            binding.materialDesignAndroidFloatingActionMenu.close(true)
            val intent = Intent(context, AddPostActivity::class.java)
            intent.putExtra(POST_DATA, "CAMERA")
            startActivityForResult(intent, POST_CAMERA_DATA_REQUEST)
        }

        binding.addVideoActivity.setOnClickListener {
            binding.materialDesignAndroidFloatingActionMenu.close(true)
            val intent = Intent(context, AddPostActivity::class.java)
            intent.putExtra(POST_DATA, "VIDEO")
            startActivityForResult(intent, POST_CAMERA_DATA_REQUEST)
        }

    }

    private fun attachObserver(viewModel: PostActivityViewModel, context: Context) {
        viewModel.postActivityApiResponse.observe(this, Observer<PostActivityStudentList> { it ->
            it?.let {
                when (it.statusCode) {
                    ResponseCodes.Success -> {
                        try{
                            if (it.data?.isNotEmpty()!!) {
                                if(it.data!!.size>0) {
                                    recyclerView.visibility=View.VISIBLE
                                    binding.txtError.visibility=View.GONE
                                    listAdapter = PostAdapter(
                                        this,
                                        it.data as ArrayList<PostActivityStudentData>?,
                                        mSelectedDate!!
                                    )
                                    binding.postsRv.adapter = listAdapter
                                }
                                else{
                                    recyclerView.visibility=View.GONE
                                    binding.txtError.visibility=View.VISIBLE
                                }

                            } else {
                                recyclerView.visibility=View.GONE
                                binding.txtError.visibility=View.VISIBLE

                                showToast(context, "No Data Found!!")
                            }
                        }catch(e:Exception){
                            recyclerView.visibility=View.GONE
                            binding.txtError.visibility=View.VISIBLE
                        }



                    }
                    else -> {
                        recyclerView.visibility=View.GONE
                        binding.txtError.visibility=View.VISIBLE

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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == POST_CAMERA_DATA_REQUEST && resultCode == Activity.RESULT_OK) {
            viewModel.getClassData(viewParent,mSelectedDate!!,mLocalDate)
        }
    }
}
