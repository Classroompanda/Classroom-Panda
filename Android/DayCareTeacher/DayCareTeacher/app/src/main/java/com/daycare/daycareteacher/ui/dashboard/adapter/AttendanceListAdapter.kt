package com.daycare.daycareteacher.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.AttendanceListItemBinding
import com.daycare.daycareteacher.model.AttendanceData
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.utill.*

class AttendanceListAdapter(
    var context: AttendanceFragment,
    var childrenList: List<AttendanceData>?,
    var date: String
) :
    RecyclerView.Adapter<AttendanceListAdapter.BindingHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: AttendanceListItemBinding = AttendanceListItemBinding.inflate(layoutInflater, parent, false)
        return BindingHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: BindingHolder, position: Int) {
        val binding = holder.binding
        childrenList?.get(position)?.attendanceDate=date
        val viewModel = AttendanceViewModel(childrenList?.get(position)!!, position)
        binding.viewModel = viewModel
            viewModel.setLoader(context)
//  showToast(context!!, ""+isToday(displayDate.parse(date)))

        //TODO- Commented the code to Enable Absent button to current date
      /*  if(isToday(displayDate.parse(date))){
            binding.absentBtn.visibility= View.INVISIBLE
            binding.absentBtnDisabled.visibility = View.VISIBLE
        }else{
            binding.absentBtn.visibility= View.VISIBLE
            binding.absentBtnDisabled.visibility = View.GONE
        }
*/





//        Glide.with(context).load(WebServices.IMAGE_URL +""+childrenList?.get(position)?.imagePath)
//            .thumbnail(0.5f)
//            .crossFade()
//            .diskCacheStrategy(DiskCacheStrategy.ALL)
//            .fitCenter()
//            .error(R.drawable.ic_placeholder)
//            .into(binding.childImg)
//
    }

     class BindingHolder(var binding: AttendanceListItemBinding) : RecyclerView.ViewHolder(binding.container)
}


