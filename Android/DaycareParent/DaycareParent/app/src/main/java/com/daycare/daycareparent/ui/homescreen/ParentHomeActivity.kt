package com.daycare.daycareparent.ui.homescreen

import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityParentHomeBinding
import com.daycare.daycareparent.model.AllParentChilds
import com.daycare.daycareparent.model.ParentChild
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.PARENT_HOME

class ParentHomeActivity : AppCompatActivity() {

    lateinit var binding: ActivityParentHomeBinding
    lateinit var viewModel: HomeViewModel
    var mParentId = 0
    var mParentName = ""
    val mNoOfchilds = ArrayList<ParentChild>()
    lateinit var listAdapter: ChildListAdapter
    val loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = DataBindingUtil.setContentView(this, R.layout.activity_parent_home)
        viewModel = HomeViewModel()
        val recyclerView = binding.childList
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.childList.layoutManager = recyclerView.layoutManager
        listAdapter = ChildListAdapter(mNoOfchilds, this, PARENT_HOME) //  Set Data in Adapter
        binding.childList.adapter = listAdapter

        initView()
        viewModel.getChildList(mParentId,this)
        attachObserver()
    }

    private fun initView() {
        mParentId = intent.getIntExtra("LoginData", 0)
        mParentName = intent.getStringExtra("parent")
        binding.textView2.text = "Welcome $mParentName"
    }

    private fun attachObserver() {
        viewModel.apiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is AllParentChilds) {
                    mNoOfchilds.addAll(it.data!!)
                    AppInstance.allChilds = it.data as ArrayList<ParentChild>?
                    listAdapter.notifyDataSetChanged()
                }
            }
        })

        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }

}