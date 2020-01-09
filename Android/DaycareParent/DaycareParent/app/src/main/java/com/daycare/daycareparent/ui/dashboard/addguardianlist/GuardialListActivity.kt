package com.daycare.daycareparent.ui.dashboard.addguardianlist

import android.app.Activity
import android.app.AlertDialog
import android.arch.lifecycle.Observer
import android.content.Intent
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.Toolbar
import android.view.View
import android.widget.LinearLayout
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityGuardialListBinding
import com.daycare.daycareparent.model.AssociatedChild
import com.daycare.daycareparent.model.GuardianData
import com.daycare.daycareparent.model.GuardianListModel
import com.daycare.daycareparent.model.ParentData
import com.daycare.daycareparent.ui.dashboard.activities.AddGuardianActivity
import com.daycare.daycareparent.ui.dashboard.addchildform.GuardianInfoViewModel
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.OptionConstant
import com.daycare.daycareparent.utill.PreferenceConnector

class GuardialListActivity : AppCompatActivity(), GuardianAdapter.GuardianCallback {


    lateinit var binding: ActivityGuardialListBinding
    lateinit var listAdapter: GuardianAdapter
    lateinit var viewModel: GuardianInfoViewModel
    var list = ArrayList<ParentData>()
    var loader = Loader()
    lateinit var toolbar: Toolbar


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_guardial_list)
        viewModel = GuardianInfoViewModel()

        binding.guardianContainer.setOnClickListener {
            val intent = Intent(this, AddGuardianActivity::class.java)
//            startActivity(intent)
            startActivityForResult(intent, OptionConstant.ADD_GUARDIAN)
        }
        setGuardianList()
        attachObserver()
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
    }

    override fun onStart() {
        super.onStart()
        viewModel.getGuardianList(this)
    }

    private fun setGuardianList() {
        val recyclerView = binding.guardianList
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)
        binding.guardianList.layoutManager = recyclerView.layoutManager
        listAdapter = GuardianAdapter(this, list)
        binding.guardianList.adapter = listAdapter
        listAdapter.setClickListener(this)

    }

    override fun onClickItem(parentData: ParentData) {
//api call to set associated child
        var alreadyExist = false
        for (child in parentData.associatedChild!!) {
            if (child.studentID == AppInstance.basicInfo?.studentId) {
                com.daycare.daycareparent.utill.showDialog(
                    this,
                    getString(R.string.app_name),
                    "Guardian already exists."
                )
                alreadyExist = true
                break
            }
        }
        if (!alreadyExist) {
            /**
            Call api to update associated child
             */
            AlertDialog.Builder(this)
                .setTitle(this.resources.getString(R.string.app_name))
                .setMessage("Are you sure you want to add "+parentData.parentName+" as guardian?")
                .setPositiveButton(
                    this.getString(R.string.yes)
                ) { dialog, _ ->
                    run {
                        dialog.dismiss()
                        val data = AssociatedChild()
                        data.studentID = AppInstance.basicInfo?.studentId
                        parentData.agencyID = PreferenceConnector.readUser(this, PreferenceConnector.USER)?.agencyID
                        parentData.associatedChild!!.add(data)
                        viewModel.addGuardian(parentData, binding.guardianContainer)
                    }
                }
                .setNegativeButton(
                    this.getString(R.string.no)
                ) { dialog, id ->
                    dialog.cancel()
                }
                .show()



        }

    }

    private fun attachObserver() {
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
        viewModel.guardianData.observe(this, Observer<ParentData> { it ->
            it.let {
                if (it != null) {
                    val intent = Intent()
                    intent.putExtra("updatedRecord", it)
                    setResult(Activity.RESULT_OK, intent)
                    finish()
                }
            }
        })
        viewModel.guardianListApi.observe(this, Observer<GuardianListModel> { it ->
            it?.let {
                if (!it.data!!.isNullOrEmpty()) {
                    list.clear()
                    list.addAll(it.data!!)
                    listAdapter.notifyDataSetChanged()
                    binding.txtError.visibility = View.GONE
                    binding.guardianList.visibility = View.VISIBLE
                } else {
                    binding.txtError.visibility = View.VISIBLE
                    binding.guardianList.visibility = View.GONE
                }
            }

        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                OptionConstant.ADD_GUARDIAN -> {

                    val it: ParentData? = data?.getParcelableExtra("updatedRecord")
                    if (it != null) {
                        intent.putExtra("updatedRecord", it)
                        setResult(Activity.RESULT_OK, intent)
                        finish()
                    }

                }
                else -> super.onActivityResult(requestCode, resultCode, data)
            }
        }
    }
}
