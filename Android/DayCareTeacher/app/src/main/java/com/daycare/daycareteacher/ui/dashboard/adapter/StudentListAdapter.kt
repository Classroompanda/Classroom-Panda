package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.databinding.StudentListItemBinding
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.ui.dashboard.fragments.student.StudentViewModel

class StudentListAdapter (context: Context?, var childrenList: List<StudentData>?): RecyclerView.Adapter<StudentListAdapter.StudentDataBindingHolder>() {

    var contextnew:Context?=null
    var studentPosition:Int?= null
    var imageURLPath:String?=null
    init {
        contextnew=context
        imageURLPath=""
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StudentListAdapter.StudentDataBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = StudentListItemBinding.inflate(layoutInflater, parent, false)

        return StudentDataBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: StudentListAdapter.StudentDataBindingHolder, position: Int) {
        val binding = holder.binding
        val viewModel = StudentViewModel(childrenList?.get(position)!!,100,position)
        binding.viewModel = viewModel
        binding.container.setOnClickListener {
            studentPosition=position
            viewModel.onClickStudentCard(binding.container,position)
        }
    }

    class StudentDataBindingHolder(var binding: StudentListItemBinding) : RecyclerView.ViewHolder(binding.container)
}
