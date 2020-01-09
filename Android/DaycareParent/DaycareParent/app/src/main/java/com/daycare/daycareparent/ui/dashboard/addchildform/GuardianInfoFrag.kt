package com.daycare.daycareparent.ui.dashboard.addchildform


import android.app.Activity
import android.app.AlertDialog
import android.arch.lifecycle.Observer
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout

import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.FragmentGuardianInfo2Binding
import com.daycare.daycareparent.model.GuardianData
import com.daycare.daycareparent.model.ParentData
import com.daycare.daycareparent.model.StudentInfoDetail
import com.daycare.daycareparent.ui.dashboard.activities.AddGuardianActivity
import com.daycare.daycareparent.ui.dashboard.adapter.GuardianListAdapter
import com.daycare.daycareparent.ui.dashboard.addguardianlist.GuardialListActivity
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.ADD
import com.daycare.daycareparent.utill.OptionConstant.ADD_GUARDIAN
import com.daycare.daycareparent.utill.OptionConstant.DELETE
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import retrofit2.http.DELETE


class GuardianInfoFrag : Fragment(), GuardianListAdapter.GuardianCallBack {

    lateinit var binding: FragmentGuardianInfo2Binding
    lateinit var viewModel: GuardianInfoViewModel
    lateinit var baseViewModel: AddFormViewModel
    var loader = Loader()
    lateinit var listAdapter: GuardianListAdapter
    var list = ArrayList<GuardianData>()
    var status = ADD
    var deletePos: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_guardian_info2, container, false)
        binding = FragmentGuardianInfo2Binding.bind(view)
        viewModel = GuardianInfoViewModel()
        baseViewModel = AddFormViewModel()
        initView(view)

        val recyclerView = binding.guardianList
        recyclerView.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
        binding.guardianList.layoutManager = recyclerView.layoutManager
        listAdapter = GuardianListAdapter(context, list)
        binding.guardianList.adapter = listAdapter
        listAdapter.setClickListener(this)

        binding.viewModel = viewModel
        binding.floatingActionButton2.setOnClickListener {
            if (AppInstance.basicInfo != null) {
//                val intent = Intent(view.context, AddGuardianActivity::class.java)
                val intent = Intent(view.context, GuardialListActivity::class.java)
                startActivityForResult(intent, ADD_GUARDIAN)
            } else {
                showDialog(
                    view.context,
                    view.context.getString(R.string.app_name),
                    view.context.getString(R.string.add_basic_info)
                )
            }
        }
        attachObserver()
        return view
    }

    override fun onResume() {
        super.onResume()

        if (AppInstance.basicInfo != null) {
            if (AppInstance.completeStdDetail?.data?.guardians != null && AppInstance.completeStdDetail?.data?.guardians!!.isNotEmpty()) {
                list.clear()
                list.addAll(AppInstance.completeStdDetail?.data?.guardians!!)
                listAdapter.notifyDataSetChanged()
                binding.txtError.visibility = View.GONE
                binding.guardianList.visibility = View.VISIBLE
            }
            binding.floatingActionButton2.show()
        } else {
            binding.floatingActionButton2.hide()
            binding.txtError.visibility = View.VISIBLE
            binding.guardianList.visibility = View.GONE
        }

    }

    override fun onPause() {
        super.onPause()
        viewModel.isLoading.value = false
    }

    private fun initView(view: View) {


    }

    private fun attachObserver() {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(context!!)
                } else {
                    loader.stopLoader()
                }
            }

        })
//        viewModel.guardianData.observe(this, Observer<ParentData> { it ->
//            it.let {
//                if (it != null) {
//                    if (status == DELETE) {
//                        list.removeAt(deletePos)
//                        listAdapter.notifyItemRemoved(deletePos)
//                        AppInstance.completeStdDetail?.data?.guardians?.removeAt(deletePos)
//
//                    }
//                }
//            }
//        })
        baseViewModel.viewGuardianData.observe(this, Observer<ArrayList<GuardianData>> { it ->
            it.let {
                if (it != null && it.isNotEmpty()) {
                    list.clear()
                    list.addAll(it)
                    listAdapter.notifyDataSetChanged()
                } else {
//                        No Record Found
                }
            }
        })
    }

    override fun onDeleteGuardian(
        data: GuardianData,
        it: View,
        position: Int
    ) {

        AlertDialog.Builder(context)
            .setTitle(context!!.resources.getString(R.string.app_name))
            .setMessage(context!!.getString(R.string.sure_want_to_delete))
            .setPositiveButton(
                context!!.getString(R.string.yes)
            ) { dialog, _ ->
                run {
                    dialog.dismiss()
                    status = DELETE
                    deletePos = position
                    viewModel.deleteGuardian(data, it)
                }
            }
            .setNegativeButton(
                context!!.getString(R.string.no)
            ) { dialog, id ->
                dialog.cancel()
            }
            .show()


    }

    override fun onEditGuardian(guardianData: GuardianData, it: View) {

        status = EDIT
        val intent = Intent(context!!, AddGuardianActivity::class.java)
        intent.putExtra("status", EDIT)
        intent.putExtra("data", guardianData)
        startActivityForResult(intent, ADD_GUARDIAN)

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                ADD_GUARDIAN -> {

                    val it: ParentData? = data?.getParcelableExtra("updatedRecord")
                    if (it != null) {
                        if (status == EDIT) {
                            for (pos in 0 until list.size) {
                                if (list[pos].guardianId == it.id) {

                                    list[pos] = convertToGuardianModel(it)
                                    listAdapter.notifyItemChanged(pos)
                                }
                            }
                        } else if (status == ADD) {
                            list.add(convertToGuardianModel(it))
                            listAdapter.notifyItemInserted(list.size)
                        }
                    }
                }
                else -> super.onActivityResult(requestCode, resultCode, data)
            }
        }
    }

    private fun convertToGuardianModel(it: ParentData): GuardianData {
        val data = GuardianData()
        data.firstName = it.firstName
        data.lastName = it.lastName
        data.relationTypeId = it.relationTypeId
        data.mobile = it.mobile
        data.isAuthorizedToPickup = it.isAuthorizedToPickup
        data.reasonNotToAllow = it.reasonNotToAllow
        data.agencyID = it.agencyID
        data.guardianId = it.id
        data.imagePath = it.imagePath
        data.cityId = it.cityId
        data.stateId = it.stateId
        data.countryId = it.countryId
        return data
    }

}
