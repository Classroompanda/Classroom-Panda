package com.daycare.kiosk.ui.dashboard

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.kiosk.R
import com.daycare.kiosk.databinding.ListItemPickNDropBinding
import com.daycare.kiosk.interfaces.ItemCallBack
import com.daycare.kiosk.model.DropInOutRequest

import com.daycare.kiosk.model.StudentListResponse
import com.daycare.kiosk.utill.*


class DashboardAdapter(
    var context: DashboardActivity,
    private var data: List<StudentListResponse.Datum>,
    var selectedStudentsList: ArrayList<String>
) :
    RecyclerView.Adapter<DashboardAdapter.DashboardBindingHolder>() {
    var checkedStudentList: ArrayList<String>? = null

    private lateinit var iItemCallBack: ItemCallBack

    init {
        checkedStudentList = selectedStudentsList
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DashboardBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ListItemPickNDropBinding = ListItemPickNDropBinding.inflate(layoutInflater, parent, false)
        return DashboardBindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return data.size
    }

    override fun onBindViewHolder(holder: DashboardBindingHolder, position: Int) {
        val binding = holder.binding
        val viewModel = DashboardViewModel(data?.get(position)!!, position)
        binding.viewModel = viewModel
//        viewModel.setLoader(context)
        binding.childNameTxt.text = data[position].studentName
        binding.catgTxt.text = data[position].className

        Glide.with(context).load(data.get(position).imagePath)
            .thumbnail(0.5f)
            .crossFade()
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .fitCenter()
            .error(R.drawable.ic_user)
            .into(binding.circleImageView2)


        binding.buttonCheck.setOnClickListener {

//            iItemCallBack.onPickNDropClick(it, data[position], position)
            if (viewModel.statusFlag.get() == IS_TO_BE_CHECKED || viewModel.statusFlag.get() == IS_CHECKED_OUT) {
                viewModel.statusFlag.set(IS_CHECKED_IN)
                val incidentData = DropInOutRequest()
                incidentData.kioskeStudentSignInDetails =
                    AppInstance.studentListResponse?.data?.get(position)
                        ?.studentId?.let { viewModel.getSelectedStudents(it) }
                //            if(AppInstance.studentListResponse?.data?.get(position)?.isSubsidy!!) {
                //                bind?.sign?.visibility = View.VISIBLE
                //            }

                viewModel.getChildUpdateStatus(it, incidentData)

            } else if (viewModel.statusFlag.get() == IS_CHECKED_IN || viewModel.statusFlag.get() == IS_BREAK_IN) {
                //showToast(view.context, "Check Out")
                viewModel.statusFlag.set(IS_CHECKED_OUT)
                val incidentData = DropInOutRequest()
                incidentData.kioskeStudentSignInDetails =
                    AppInstance.studentListResponse!!.data?.get(position)
                        ?.studentId?.let { viewModel.getSelectedStudents(it) }
                viewModel.getChildUpdateStatus(it, incidentData)
            }
        }
        binding.buttonbreak.setOnClickListener {
//            iItemCallBack.onBreakClick(it, data[position], position)
            if (viewModel.statusFlag.get() == IS_BREAK_OUT) {
                // showToast(view.context, "Break In")
                viewModel.statusFlag.set(IS_CHECKED_IN)
                val incidentData = DropInOutRequest()
                incidentData.kioskeStudentSignInDetails =
                    AppInstance.studentListResponse!!.data?.get(position)
                        ?.studentId?.let { viewModel.getSelectedStudents(it) }
                viewModel.getChildUpdateStatus(it, incidentData)

            } else {
                //showToast(view.context, "Break Out")
                viewModel.statusFlag.set(IS_BREAK_OUT)
                val incidentData = DropInOutRequest()
                incidentData.kioskeStudentSignInDetails =
                    AppInstance.studentListResponse!!.data?.get(position)
                        ?.studentId?.let { viewModel.getSelectedStudents(it) }
                viewModel.getChildUpdateStatus(it, incidentData)
            }
        }

        if (checkedStudentList?.isNotEmpty()!!) {
            if (checkedStudentList?.contains(data[position].studentName)!!) {
                binding.checkBox.isChecked = true
            }
        }
        binding.checkBox.setOnCheckedChangeListener { p0, p1 ->
            if (p1) {
                data[position].studentName?.let { checkedStudentList?.add(it) }
            } else {

                if (checkedStudentList!!.contains(data[position].studentName)) {
                    checkedStudentList!!.remove(data[position].studentName)
                }

            }
        }
    }

    class DashboardBindingHolder(var binding: ListItemPickNDropBinding) : RecyclerView.ViewHolder(binding.card)

    fun setClickListener(itemCallBack: ItemCallBack) {
        this.iItemCallBack = itemCallBack
    }
}