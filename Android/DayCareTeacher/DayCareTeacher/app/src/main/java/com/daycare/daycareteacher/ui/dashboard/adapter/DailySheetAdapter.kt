package com.daycare.daycareteacher.ui.dashboard.adapter

import android.content.Context
import android.databinding.DataBindingUtil
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListAdapter
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.daycare.daycareteacher.R

import com.daycare.daycareteacher.R.id.view
import com.daycare.daycareteacher.databinding.DailysheetListItemBinding
import com.daycare.daycareteacher.databinding.FragmentDailySheetBinding
import com.daycare.daycareteacher.interfaces.IAdapterFragmentCallBack
import com.daycare.daycareteacher.model.ChildData
import com.daycare.daycareteacher.model.DailySheetStudentData
import com.daycare.daycareteacher.model.StudentData
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceViewModel
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareteacher.utill.DailySheetConstant.DIAPER
import com.daycare.daycareteacher.utill.DailySheetConstant.HEALTH
import com.daycare.daycareteacher.utill.DailySheetConstant.MEAL
import com.daycare.daycareteacher.utill.DailySheetConstant.MOOD
import com.daycare.daycareteacher.utill.DailySheetConstant.NAP
import com.daycare.daycareteacher.utill.DailySheetConstant.NOTES
import com.squareup.picasso.Picasso
import java.util.*
import kotlin.collections.ArrayList

class DailySheetAdapter(
    var context: DailySheetFragment,
    var childrenList: ArrayList<DailySheetStudentData>?,
    var date: String,
    var selectedStudentsList: ArrayList<Int>,
   var iAdapterFragmentCallbackNew:IAdapterFragmentCallBack
) :
    RecyclerView.Adapter<DailySheetAdapter.BindingSheetHolder>() {
    var checkedStudentList: ArrayList<Int>?
    private val myList: ArrayList<DailySheetStudentData>? = childrenList   // for loading main list
    private var arraylist: ArrayList<DailySheetStudentData>? = null
    private lateinit var iAdapterFragmentCallback: IAdapterFragmentCallBack

    init {
        this.arraylist = ArrayList()
        myList?.let { this.arraylist!!.addAll(it) }
        checkedStudentList  = selectedStudentsList
        this.iAdapterFragmentCallback=iAdapterFragmentCallbackNew

    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BindingSheetHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        val binding = DailysheetListItemBinding.inflate(layoutInflater, parent, false)
        return BindingSheetHolder(binding)
    }

    override fun getItemCount(): Int {
        return childrenList?.size!!
    }

    override fun onBindViewHolder(holder: BindingSheetHolder, position: Int) {
        holder.isRecyclable
        val binding = holder.binding



        val viewModel = DailySheetViewModel(childrenList?.get(position)!!, position)
        binding.viewModel = viewModel
        if(childrenList!!.get(position).totalActivityCount!!>0){
            binding.sample.visibility=View.GONE
        }
        else{
            binding.sample.visibility=View.VISIBLE
        }

        if(childrenList!!.get(position).studentName!=null){
            binding.textView28.setText(childrenList!!.get(position).studentName)
        }else{
            binding.textView28.setText("AAAA")
        }
Log.d("StudentName"," "+position+" :"+childrenList!!.get(position).studentName)


//        Glide.with(context).load(WebServices.IMAGE_URL +""+childrenList?.get(position)!!?.imagePath)
//            .thumbnail(0.5f)
//            .crossFade()
//            .diskCacheStrategy(DiskCacheStrategy.ALL)
//            .fitCenter()
//            .error(R.drawable.ic_placeholder)
//            .into(binding.childImg);




        if (childrenList!!.get(position).totalActivityCount!! > 2) {
            for (l in 0 until 3) {

                var type: Int?
                type = childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID
                /*  for (i:Int in 0 until 6){
                      if(type==DailySheetConstant.i)
                  } */
                when (l) {
                    0 -> {

                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NOTES) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MEAL) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MOOD) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == HEALTH) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == ACTIVITY) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NAP) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DIAPER) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.diaper)
                        }
                    }
                    1 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NOTES) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MEAL) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MOOD) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == HEALTH) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == ACTIVITY) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NAP) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DIAPER) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.diaper)
                        }
                    }


                    2->{
                        binding.viewMoreBtn.visibility = View.VISIBLE
                        binding.viewMoreBtn.text = "+"+(childrenList!!.get(position).totalActivityCount!! - 2).toString()
                    }

                }

            }

        } else {
            for (l in 0 until childrenList?.get(position)!!.activityDetail!!.size) {
                when (l) {
                    0 -> {

                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NOTES) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MEAL) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MOOD) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == HEALTH) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == ACTIVITY) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NAP) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DIAPER) {
                            binding.notesIV.visibility = View.VISIBLE
                            binding.notesIV.setImageResource(R.mipmap.diaper)
                        }
                    }
                    1 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NOTES) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MEAL) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MOOD) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == HEALTH) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == ACTIVITY) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NAP) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DIAPER) {
                            binding.activityIV.visibility = View.VISIBLE
                            binding.activityIV.setImageResource(R.mipmap.diaper)
                        }
                    }
                    2 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NOTES) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MEAL) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == MOOD) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == HEALTH) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == ACTIVITY) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == NAP) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DIAPER) {
                            binding.foodIV.visibility = View.VISIBLE
                            binding.foodIV.setImageResource(R.mipmap.diaper)
                        }

                    }
                }
            }
        }


        if (checkedStudentList?.isNotEmpty()!!) {
            binding.checkbox.isChecked = checkedStudentList?.contains(myList?.get(position)?.studentID)!!
        }


binding.frameLyt.setOnClickListener {
    if (binding.checkbox.isChecked) {
        binding.checkbox.isChecked = false
        if (checkedStudentList!!.contains(myList?.get(position)?.studentID)) {
            checkedStudentList!!.remove(myList?.get(position)?.studentID!!)

        }

        iAdapterFragmentCallbackNew.onUpdateView(false)


    } else {
        binding.checkbox.isChecked = true
        myList?.get(position)?.studentID?.let {
            val add = checkedStudentList?.add(it)
        }
    }
}

        binding.checkbox.setOnCheckedChangeListener { p0, p1 ->
            if (p1) {
                myList?.get(position)?.studentID?.let { val add = checkedStudentList?.add(it)
                }
            } else {

                if (checkedStudentList!!.contains(myList?.get(position)?.studentID)) {
                    checkedStudentList!!.remove(myList?.get(position)?.studentID!!)

                }

                 iAdapterFragmentCallbackNew.onUpdateView(false)



            }
            AppInstance.selectedStudentsListDailySheet=checkedStudentList as ArrayList<Int>


        }





    }
    fun setListner(iAdapterFragmentCallback: IAdapterFragmentCallBack){

    }

    class BindingSheetHolder(var binding: DailysheetListItemBinding) : RecyclerView.ViewHolder(binding.container)

}

