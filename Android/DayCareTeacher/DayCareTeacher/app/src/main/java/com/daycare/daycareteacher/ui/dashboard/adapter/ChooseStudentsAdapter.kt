package com.daycare.daycareteacher.ui.dashboard.adapter

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import com.daycare.daycareteacher.databinding.ChooseStudentListItemBinding
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentViewModel
import java.util.*
import kotlin.collections.ArrayList

class ChooseStudentsAdapter(
    var childrenList: ArrayList<StudentData>?,
    var selectedStudentsList: ArrayList<String>
) :
    RecyclerView.Adapter<ChooseStudentsAdapter.StudentsBindingHolder>() {
    private val myList: ArrayList<StudentData>? = childrenList   // for loading main list
    private var arraylist: ArrayList<StudentData>? = null  // for loading  filter data
    var checkedStudentList: ArrayList<String>?

    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
        checkedStudentList  = selectedStudentsList
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChooseStudentsAdapter.StudentsBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = ChooseStudentListItemBinding.inflate(layoutInflater, parent, false)
        return StudentsBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        //return 10 //
        return childrenList?.size!!
    }


    override fun onBindViewHolder(holder: ChooseStudentsAdapter.StudentsBindingHolder, position: Int) {
        val binding = holder.binding

        val viewModel = IncidentViewModel(myList?.get(position)!!)
        binding.viewModel = viewModel
        if (checkedStudentList?.isNotEmpty()!!) {
            if (checkedStudentList?.contains(myList[position].studentName)!!) {
                binding.checkBox2.isChecked = true
            }
        }
        binding.checkBox2.setOnCheckedChangeListener { p0, p1 ->
            if (p1) {
                myList[position].studentName?.let { checkedStudentList?.add(it) }
            } else {

                if (checkedStudentList!!.contains(myList[position].studentName)) {
                    checkedStudentList!!.remove(myList[position].studentName)
                }

            }
        }

    }

    fun filter(charText: String) {
        val text = charText.toLowerCase(Locale.getDefault())
        myList?.clear()
        if (charText.isEmpty()) {
            arraylist?.let { myList?.addAll(it) }
        } else {
            if (arraylist != null) {
                for (wp in arraylist!!) {
                    if (wp.studentName?.toLowerCase(Locale.getDefault())?.contains(text)!!) {
                        myList?.add(wp)
                    }
                }
            }
        }
        notifyDataSetChanged()
    }

    class StudentsBindingHolder(var binding: ChooseStudentListItemBinding) :
        RecyclerView.ViewHolder(binding.selectStudentContainer)

}