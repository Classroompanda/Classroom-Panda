package com.daycare.daycareparent.ui.dashboard.fragments.postactivity


import android.app.Activity
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPostActivityBinding
import com.daycare.daycareparent.model.PostActivityStudentData
import com.daycare.daycareparent.model.PostActivityStudentList
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.ui.dashboard.activities.AddPostActivity
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.adapter.PostAdapter
import com.daycare.daycareparent.utill.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import com.github.clans.fab.FloatingActionMenu


class PostActivityFragment : Fragment() {

    lateinit var binding: FragmentPostActivityBinding
    private var viewModel = PostActivityViewModel()
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    var mSelectedDate = getServerDate(getCurrentDate())
    lateinit var listAdapter: PostAdapter
    private val POST_CAMERA_DATA_REQUEST = 113
    lateinit var viewParent: View
    lateinit var menu1: FloatingActionMenu
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_post_activity, container, false)
        binding = FragmentPostActivityBinding.bind(view)
        binding.viewModel = viewModel
//        initView(view)


//        attachObserver(viewModel, context!!)
        setupToolbar()
        return view
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text = resources.getString(R.string.dashboard)
    }

    private fun initView(view: View) {
        viewModel = PostActivityViewModel()
        viewModel.getClassData(view)
        viewParent = view

        binding.viewModel = viewModel
        recyclerView = binding.postsRv
        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
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
                        if (it.data?.isNotEmpty()!!) {
                            AppInstance.postActivityDetailData = it.data
                            if (it.data!!.size > 0) {
                                recyclerView.visibility = View.VISIBLE
                                binding.txtError.visibility = View.GONE
                                listAdapter = PostAdapter(
                                    this,
                                    it.data as ArrayList<PostActivityStudentData>?,
                                    mSelectedDate
                                )
                                binding.postsRv.adapter = listAdapter
                            } else {
                                recyclerView.visibility = View.GONE
                                binding.txtError.visibility = View.VISIBLE
                            }

                        } else {
                            recyclerView.visibility = View.GONE
                            binding.txtError.visibility = View.VISIBLE

//                            showToast(context, "No Data Found!!")
                        }
                    }
                    else -> {
                        recyclerView.visibility = View.GONE
                        binding.txtError.visibility = View.VISIBLE

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

            viewModel.getClassData(viewParent)

        }

    }

}