package com.daycare.daycareparent.ui.dashboard.postactivity


import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.LinearLayout
import com.bumptech.glide.Glide
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPublicPostBinding
import com.daycare.daycareparent.model.Post
import com.daycare.daycareparent.model.PostDataRequest
import com.daycare.daycareparent.model.Posts
import com.daycare.daycareparent.repository.ResponseCodes.Companion.Success
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.TaskId.PUBLIC
import kotlinx.android.synthetic.main.app_bar_dashboard.*


class PublicPostFragment : Fragment(), PostsAdapter.Comment {


    lateinit var binding: FragmentPublicPostBinding
    lateinit var viewModel: PostViewModel
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    lateinit var listAdapter: PostsAdapter
    lateinit var toolbar: Toolbar
    var list = ArrayList<Post>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_public_post, container, false)
        binding = FragmentPublicPostBinding.bind(view)
        viewModel = PostViewModel()
        binding.viewModel = viewModel
        toolbar = (activity as DashboardActivity).toolbar
        loadData()
        displayData(context!!)

        attachObserver()
        return view

    }


    fun displayData(context: Context) {
        val data = PreferenceConnector.readChild(context, PreferenceConnector.CHILD)
        if (data != null) {
            viewModel.getPostActivityData(true, data,context)
            binding.txtError.visibility = View.GONE
        } else {
            binding.txtError.visibility = View.VISIBLE
        }
    }


    private fun loadData() {
        recyclerView = binding.postsRv
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.postsRv.layoutManager = recyclerView.layoutManager
        listAdapter = PostsAdapter(list, PUBLIC)
        listAdapter.listner(this)
        binding.postsRv.adapter = listAdapter
    }

    private fun attachObserver() {
        viewModel.postApiResponse.observe(this, Observer<Posts> { it ->
            it?.let {
                if (it.statusCode == Success && it.data != null && it.data!!.isNotEmpty()) {
                    list.clear()
                    list.addAll(it.data!!)
                    listAdapter.notifyDataSetChanged()

                } else {
                    binding.postsRv.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE
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

    override fun onCommentSend(
        data: PostDataRequest,
        view: View,
        state: Int
    ) {


    }

    override fun onLikeSend(
        data: PostDataRequest,
        view: View,
        state: Int
    ) {
        if (state == OptionConstant.IMAGE) {
            viewModel.addComment(data, view)
        } else {
            viewModel.addCommentVideo(data, view)
        }

    }


}
