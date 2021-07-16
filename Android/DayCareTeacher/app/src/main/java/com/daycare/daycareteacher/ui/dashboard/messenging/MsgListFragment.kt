package com.daycare.daycareteacher.ui.dashboard.messenging

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.FragmentMsgListBinding
import com.daycare.daycareteacher.model.ChatListData
import com.daycare.daycareteacher.model.TeacherChatList
import com.daycare.daycareteacher.repository.ResponseCodes.Companion.Success
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*

class MsgListFragment : Fragment() {
    lateinit var binding: FragmentMsgListBinding
    lateinit var listAdapter: MsgListAdapter
    lateinit var viewModel: MessageViewModel
    val list: ArrayList<ChatListData> = ArrayList()
    var loader = Loader()
    lateinit var mView : View

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_msg_list, container, false)
        binding = FragmentMsgListBinding.bind(view)
        mView = view
        viewModel = MessageViewModel()
        setupToolbar()
        initView(view)
        attachObserver()
        return view
    }

    override fun onResume() {
        super.onResume()
        list.clear()
        viewModel.getTeacherList(mView)
    }
    private fun initView(view: View) {
        val recyclerView = binding.userList
        recyclerView.layoutManager =
            LinearLayoutManager(
                context!!,
                RecyclerView.VERTICAL,
                false
            )
        binding.userList.layoutManager = recyclerView.layoutManager
        listAdapter = MsgListAdapter(view, list)
        //  Set Data in Adapter
        binding.userList.adapter = listAdapter
    }

    private fun setupToolbar() {
        val toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
        toolbar.headerTxt.text ="Message"//"User List"
    }

    private fun attachObserver() {
        viewModel.teacherList.observe(this, Observer<TeacherChatList> { it ->
            it?.let {
                if (it.statusCode == Success) {
                    it.data?.let { it1 ->
                        list.addAll(it1)
                        initView(view!!)
                        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {

                            override fun onQueryTextChange(p0: String): Boolean {
                                listAdapter.filter(p0)
                                return false
                            }

                            override fun onQueryTextSubmit(p0: String): Boolean {
                                listAdapter.filter(p0)

                                return false
                            }

                        })
                    }
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
