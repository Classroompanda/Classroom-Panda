package com.daycare.daycareteacher.ui.dashboard.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ClassStatusListItemBinding
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.ClassLogData
import com.daycare.daycareteacher.ui.dashboard.fragments.dashboard.HomeFragment
import com.daycare.daycareteacher.utill.*

class ClassStatusAdapter(var context: HomeFragment, var callback: ViewItemClickListener<ClassLogData>,
                         var classData: List<ClassLogData>) : RecyclerView.Adapter<ClassStatusAdapter.BindingClassStatusHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingClassStatusHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding: ClassStatusListItemBinding = ClassStatusListItemBinding.inflate(layoutInflater, parent, false)
        return BindingClassStatusHolder(binding)
    }

    override fun getItemCount(): Int {
        return classData.size
    }

    override fun onBindViewHolder(holder: BindingClassStatusHolder, position: Int) {
        val binding = holder.binding

        binding.tvparent.text = "Present Student = " + classData?.get(position).presentStudentCount
        binding.className.text =classData?.get(position).className
        binding.classStartTime.text = convertDateUTC(classData?.get(position).classStartTime!!, alohaDate, displayTime)
        binding.classEndTime.text = convertDateUTC(classData?.get(position).classEndTime!!, alohaDate, displayTime)

      /*  when {
            classData[position].checkStatus == CHECK_IN_STATUS -> this.classStatus.set(CHECK_IN_STATUS)
            classData[position].checkStatus == CHECK_OUT_STATUS -> this.classStatus.set(CHECK_OUT_STATUS)
            classData[position].checkStatus == AVAILABLE_CHECKIN_STATUS -> this.classStatus.set(AVAILABLE_CHECKIN_STATUS)
        }*/

        loadClassState(binding,classData?.get(position).checkStatus!!)

        binding.teacherCheckOutBtn.setOnClickListener {
            callback.onViewItemClick(classData?.get(position)!!,position,0) // 0 means checkOut
        }

        binding.teacherCheckInBtn.setOnClickListener {
            callback.onViewItemClick(classData?.get(position)!!,position,1) // 1 means checkIn
        }

        binding.teacherEditBtn.setOnClickListener {
            callback.onViewItemClick(classData?.get(position)!!,position,2) // 2 means edit
        }


      /* val viewModel = HomeViewModel(classData[position], position)
        binding.viewModel = viewModel
        viewModel.setLoader(context)*/

    }

    fun loadClassState(binding: ClassStatusListItemBinding, state: Int) {
       // val binding = DataBindingUtil.findBinding<ClassStatusListItemBinding>(view)
        when (state) {
            AVAILABLE_CHECKIN_STATUS -> {
                binding!!.teacherCheckInBtn.visibility = View.VISIBLE
                binding.teacherCheckOutBtn.visibility = View.INVISIBLE

                binding?.teacherCheckInBtn?.isEnabled=true
                binding?.teacherCheckInBtn?.isClickable=true

                binding.teacherEditBtn.visibility = View.INVISIBLE
                binding.editLyt.visibility= View.INVISIBLE
                binding.checkoutLyt.visibility= View.INVISIBLE
                binding.checkInLyt.visibility= View.VISIBLE
                binding.statusTxt.text = "Open"
            }
            CHECK_IN_STATUS -> {
                binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                binding.teacherCheckOutBtn.visibility = View.VISIBLE
                binding?.teacherCheckOutBtn?.isEnabled=true
                binding?.teacherCheckOutBtn?.isClickable=true
                binding.teacherEditBtn.visibility = View.VISIBLE
                binding?.teacherEditBtn?.isEnabled=true
                binding?.teacherEditBtn?.isClickable=true
                binding.editLyt.visibility= View.VISIBLE
                binding.checkoutLyt.visibility= View.VISIBLE
                binding.checkInLyt.visibility= View.GONE


                binding.statusTxt.text = "Checked In"
                binding.statusTxt.setTextColor(ContextCompat.getColor(context.requireContext(), R.color.colorPresent))
            }
            CHECK_OUT_STATUS -> {
               // binding?.teacherCheckOutBtn?.visibility = View.INVISIBLE
                 binding?.teacherCheckedOutBtn?.visibility = View.GONE
                //binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                binding!!.teacherCheckInBtn.visibility = View.VISIBLE
                binding.teacherCheckInBtn.isEnabled =true
                binding.teacherCheckInBtn.isClickable=true

                binding.teacherCheckOutBtn.visibility = View.INVISIBLE
                binding.teacherCheckOutBtn.isEnabled =false
                binding.teacherCheckOutBtn.isClickable=false
                // binding?.teacherCheckedOutBtn?.visibility = View.VISIBLE

                binding.teacherEditBtn.visibility = View.VISIBLE
                binding.statusTxt.text = "Checked Out"

                binding.editLyt.visibility= View.VISIBLE
                binding.checkoutLyt.visibility= View.GONE
                binding.checkInLyt.visibility= View.VISIBLE

//              binding.teacherCheckOutBtn.setBackgroundColor(ContextCompat.getColor(view.context,R.color.colorBtnCancel))
                binding.statusTxt.setTextColor(ContextCompat.getColor(context.requireContext(), R.color.colorAbsent))

            }

        }
    }

    class BindingClassStatusHolder(var binding: ClassStatusListItemBinding) :
        RecyclerView.ViewHolder(binding.statusContainer)
}