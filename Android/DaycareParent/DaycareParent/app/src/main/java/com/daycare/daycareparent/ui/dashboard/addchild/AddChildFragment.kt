package com.daycare.daycareparent.ui.dashboard.addchild

import android.arch.lifecycle.Observer
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentAddChildBinding
import com.daycare.daycareparent.model.AllParentChilds
import com.daycare.daycareparent.model.ParentChild
import com.daycare.daycareparent.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareparent.ui.dashboard.addchildform.AddFormActivity
import com.daycare.daycareparent.ui.homescreen.ChildListAdapter
import com.daycare.daycareparent.ui.homescreen.HomeViewModel
import com.daycare.daycareparent.utill.ADD_CHILD
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.PreferenceConnector
import kotlinx.android.synthetic.main.activity_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.*
import kotlinx.android.synthetic.main.app_bar_dashboard.view.*
import android.content.Context
import com.daycare.daycareparent.model.Data


class AddChildFragment : Fragment(), ChildListAdapter.ItemListener {

    lateinit var binding: FragmentAddChildBinding
    lateinit var viewModel: AddChildViewModel
    lateinit var listAdapter: ChildListAdapter
    val mNoOfchilds = ArrayList<ParentChild>()
    lateinit var childViewModel: HomeViewModel
    var mParentId = 0
    val loader = Loader()
    lateinit var toolbar: Toolbar
    lateinit var myInterface: MyInterface
    var parent: Data? = Data()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_add_child, container, false)
        binding = FragmentAddChildBinding.bind(view)
        viewModel = AddChildViewModel()
        childViewModel = HomeViewModel()
        binding.viewModel = viewModel

        initView()
        setupToolbar()

//        childViewModel.getChildList(mParentId)
        attachObserver()
        return view
    }

    private fun initView() {
        parent = PreferenceConnector.readUser(context!!, PreferenceConnector.USER)
        mParentId = parent?.releventUserID!!
        val recyclerView = binding.recyclerView
        recyclerView.layoutManager = LinearLayoutManager(context!!, LinearLayout.VERTICAL, false)
        binding.recyclerView.layoutManager = recyclerView.layoutManager
        listAdapter = ChildListAdapter(mNoOfchilds, context!!, ADD_CHILD)
        listAdapter.listner(this)
        //  Set Data in Adapter
        binding.recyclerView.adapter = listAdapter
    }

    override fun onResume() {
        super.onResume()
        childViewModel.getChildList(mParentId,context!!)
    }

    private fun setupToolbar() {
        toolbar = (activity as DashboardActivity).toolbar
        toolbar.visibility = View.VISIBLE
//        if (!parent?.isGaurdian!!) {
            toolbar.headerTxt.text = "My Kids"

//        } else {
//            toolbar.headerTxt.text = "Child List"
//
//        }
        toolbar.dropdown.visibility = View.GONE
        toolbar.childProfile.visibility = View.GONE
    }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        try {
            myInterface = activity as MyInterface
        } catch (e: ClassCastException) {
            throw ClassCastException(activity!!.toString() + " must implement MyInterface")
        }

    }

    private fun attachObserver() {
        childViewModel.apiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                val drawer = (activity as DashboardActivity).drawer_layout
                if (it is AllParentChilds && it.data != null && it.data?.isNotEmpty()!!) {
                    mNoOfchilds.clear()
                    mNoOfchilds.addAll(it.data!!)
                    listAdapter.notifyDataSetChanged()

                    binding.EmptyContainer.visibility = View.GONE
                    binding.recyclerView.visibility = View.VISIBLE
                    if (!parent?.isGaurdian!!) {
                        binding.floatingActionButton.show()
                    } else {
                        binding.floatingActionButton.hide()
                    }

                    myInterface.unlockDrawer()
                } else {
                    binding.EmptyContainer.visibility = View.VISIBLE
                    binding.recyclerView.visibility = View.GONE
                    binding.floatingActionButton.hide()
                    myInterface.lockDrawer()
//                    drawer.isEnabled = false

                }
            }
        })

        childViewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }

    override fun onClickItem(item: ParentChild) {

        val intent = Intent(context, AddFormActivity::class.java)
        intent.putExtra("basic_info", item)
        startActivity(intent)

    }

    interface MyInterface {
        fun lockDrawer()
        fun unlockDrawer()
    }


}
