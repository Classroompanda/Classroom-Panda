package com.daycare.daycareteacher.ui.dashboard.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.databinding.ChooseClassListItemBinding
import com.daycare.daycareteacher.model.ClassData
import com.daycare.daycareteacher.ui.dashboard.fragments.calender.CalendarViewModel
import java.util.*

class ChooseClassAdapter(var classList: ArrayList<ClassData>?, var selectedClassList: ArrayList<String>) :
    RecyclerView.Adapter<ChooseClassAdapter.StudentsBindingHolder>() {
    private val myList: ArrayList<ClassData>? = classList   // for loading main list
    private var arraylist: ArrayList<ClassData>? = null  // for loading  filter data
    var checkedClassList: ArrayList<String>? = null

    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
            //checkedClassList = ArrayList()
        checkedClassList  = selectedClassList
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChooseClassAdapter.StudentsBindingHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = ChooseClassListItemBinding.inflate(layoutInflater, parent, false)
        return StudentsBindingHolder(binding)

    }

    override fun getItemCount(): Int {
        //return 10 //
        return classList?.size!!
    }


    override fun onBindViewHolder(holder: ChooseClassAdapter.StudentsBindingHolder, position: Int) {
        val binding = holder.binding

        val viewModel = CalendarViewModel(myList?.get(position)!!, position)
        binding.viewModel = viewModel
        if (checkedClassList?.isNotEmpty()!!) {
            if (checkedClassList?.contains(myList[position].className)!!) {
                binding.checkBox2.isChecked = true
            }
        }


        binding.checkBox2.setOnCheckedChangeListener { p0, p1 ->
            if (p1) {
                myList[position].className?.let { checkedClassList?.add(it) }
            } else {

                if (checkedClassList!!.contains(myList[position].className)) {
                    checkedClassList!!.remove(myList[position].className)
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
                    if (wp.className?.toLowerCase(Locale.getDefault())?.contains(text)!!) {
                        myList?.add(wp)
                    }
                }
            }
        }
        notifyDataSetChanged()
    }

    class StudentsBindingHolder(var binding: ChooseClassListItemBinding) :
        RecyclerView.ViewHolder(binding.selectClassContainer)

}