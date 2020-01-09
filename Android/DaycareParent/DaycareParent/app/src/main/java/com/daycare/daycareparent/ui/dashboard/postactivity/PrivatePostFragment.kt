package com.daycare.daycareparent.ui.dashboard.postactivity


import android.arch.lifecycle.Observer
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentPrivatePostBinding
import com.daycare.daycareparent.model.BaseModel
import com.daycare.daycareparent.model.Post
import com.daycare.daycareparent.model.PostDataRequest
import com.daycare.daycareparent.model.Posts
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant.IMAGE
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.TaskId.PRIVATE


class PrivatePostFragment : Fragment(), PostsAdapter.Comment {


    lateinit var binding: FragmentPrivatePostBinding
    lateinit var viewModel: PostViewModel
    private var loader = Loader()
    lateinit var recyclerView: RecyclerView
    lateinit var listAdapter: PostsAdapter
    var posts = ArrayList<Post>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_private_post, container, false)
        binding = FragmentPrivatePostBinding.bind(view)
        viewModel = PostViewModel()
        binding.viewModel = viewModel
        displayData(context!!)
        attachObserver()

        return view
    }

    fun displayData(context: Context) {
        val data = PreferenceConnector.readChild(context, PreferenceConnector.CHILD)
        if (data != null) {
            viewModel.getPostActivityData(false, data,context)
            binding.txtError.visibility = View.GONE
        } else {
            binding.txtError.visibility = View.VISIBLE
        }
    }

    private fun loadData(data: List<Post>) {

        recyclerView = binding.postsRv
        recyclerView.layoutManager = LinearLayoutManager(context, LinearLayout.VERTICAL, false)
        binding.postsRv.layoutManager = recyclerView.layoutManager
        listAdapter = PostsAdapter(data, PRIVATE)
        listAdapter.listner(this)
        binding.postsRv.adapter = listAdapter
    }

    private fun attachObserver() {
        viewModel.postApiResponse.observe(this, Observer<Posts> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success && it.data != null && it.data!!.isNotEmpty()) {
                    loadData(it.data!!)

                } else {
                    binding.postsRv.visibility = View.GONE
                    binding.txtError.visibility = View.VISIBLE
                }

            }
        })
        viewModel.isCommentAdded.observe(this, Observer<BaseModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {

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
//        val bind = DataBindingUtil.findBinding<ListItemPostBinding>(view)
        if (state == IMAGE) {
            viewModel.addComment(data, view)
        } else {
            viewModel.addCommentVideo(data, view)
        }

    }

    override fun onLikeSend(
        data: PostDataRequest,
        view: View,
        state: Int
    ) {
        if (state == IMAGE) {
            viewModel.addComment(data, view)
        } else {
            viewModel.addCommentVideo(data, view)
        }
    }
}
