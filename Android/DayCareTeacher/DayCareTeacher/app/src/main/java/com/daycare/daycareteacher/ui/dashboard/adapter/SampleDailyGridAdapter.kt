package com.daycare.daycareteacher.ui.dashboard.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.daycare.daycareteacher.R

import com.daycare.daycareteacher.interfaces.IAdapterFragmentCallBack
import com.daycare.daycareteacher.model.DailySheetStudentData
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.TestDailySheetFragment
import android.support.v4.content.ContextCompat.getSystemService

import android.app.Activity
import android.content.Intent
import android.support.v4.app.FragmentActivity
import android.util.Log
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetViewModel

import android.widget.*
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.CircleTransform

import com.daycare.daycareteacher.utill.DailySheetConstant


class SampleDailyGridAdapter (
    var context: FragmentActivity,
    var childrenList: ArrayList<DailySheetStudentData>?,
    var date: String,
    var selectedStudentsList: ArrayList<Int>,
    var iAdapterFragmentCallbackNew: IAdapterFragmentCallBack
): BaseAdapter()
{
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

    private var inflater: LayoutInflater? = null


    @SuppressLint("viewHolderSheetHolder")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val viewHolder: ViewHolder


        if (convertView == null) {
            val inflater = context?.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            view = inflater.inflate(com.daycare.daycareteacher.R.layout.dailysheet_list_item, null)
            viewHolder = ViewHolder(view)
            view.tag = viewHolder
        } else {
            view = convertView
            viewHolder = view.tag as ViewHolder
        }


        viewHolder.className?.text = childrenList?.get(position)?.className



        if(childrenList!!.get(position).totalActivityCount!!>0){
            viewHolder.sample?.visibility=View.GONE
        }


        if(childrenList!!.get(position).studentName!=null){
            viewHolder.studentName?.setText(childrenList!!.get(position).studentName)
        }else{
            viewHolder.studentName?.setText("AAAA")
        }
        Log.d("StudentName"," "+position+" :"+childrenList!!.get(position).studentName+" TotalActivity"+childrenList!!.get(position).totalActivityCount)


        if(childrenList!!.get(position).imagePath!=null){
            try{
                Glide.with(view.context)
                    .load(childrenList!!.get(position).imagePath)
                    .placeholder(R.drawable.ic_placeholder)
                    .transform(CircleTransform(view.context))
                    .into(viewHolder.childImg)
            }catch(e:Exception){
                Glide.with(view.context)
                    .load(R.drawable.ic_placeholder)
                    .placeholder(R.drawable.ic_placeholder)
                    .transform(CircleTransform(view.context))
                    .into(viewHolder.childImg)
            }

        }
        else {
            Glide.with(view.context)
                .load(R.drawable.ic_placeholder)
                .placeholder(R.drawable.ic_placeholder)
                .transform(CircleTransform(view.context))
                .into(viewHolder.childImg)
        }



        if (childrenList!!.get(position).totalActivityCount!! > 2) {
            viewHolder.sample?.visibility=View.GONE
            for (l in 0 until 3) {

                var type: Int?
                type = childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID
                /*  for (i:Int in 0 until 6){
                      if(type==DailySheetConstant.i)
                  } */
                when (l) {
                    0 -> {

                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NOTES) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MEAL) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MOOD) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.HEALTH) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.ACTIVITY) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NAP) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.DIAPER) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.diaper)
                        }
                    }
                    1 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NOTES) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MEAL) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MOOD) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.HEALTH) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.ACTIVITY) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NAP) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.DIAPER) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.diaper)
                        }
                    }


                    2->{
                        viewHolder.viewMoreBtn?.visibility = View.VISIBLE
                        viewHolder.viewMoreBtn?.text = "+"+(childrenList!!.get(position).totalActivityCount!! - 2).toString()
                    }

                }

            }

        } else {

            for (l in 0 until childrenList?.get(position)!!.activityDetail!!.size) {
                when (l) {
                    0 -> {
                        viewHolder.sample?.visibility=View.GONE
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NOTES) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MEAL) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MOOD) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.HEALTH) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.ACTIVITY) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NAP) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.DIAPER) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.diaper)
                        }
                    }
                    1 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NOTES) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MEAL) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MOOD) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.HEALTH) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.ACTIVITY) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NAP) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.DIAPER) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.diaper)
                        }
                    }
                    2 -> {
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NOTES) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.notes)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MEAL) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.meal)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.MOOD) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.happy)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.HEALTH) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.medication)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.ACTIVITY) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.activity)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.NAP) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.nap)
                        }
                        if (childrenList?.get(position)!!.activityDetail?.get(l)?.activityTypeID == DailySheetConstant.DIAPER) {
                            viewHolder.foodIV?.visibility = View.VISIBLE
                            viewHolder.foodIV?.setImageResource(R.mipmap.diaper)
                        }

                    }
                }
            }
        }


        if (checkedStudentList?.isNotEmpty()!!) {
            viewHolder.checkbox?.isChecked = checkedStudentList?.contains(myList?.get(position)?.studentID)!!
        }



        viewHolder.redirectLyt?.setOnClickListener {
            if (AppInstance.allDailySheetStidentList?.data?.get(position)!!.activityDetail!!.size > 0) {
                val intent = Intent(view.context, DailysheetDetailActivity::class.java)
                intent.putExtra("POSITION", position.toString())
               // intent.putExtra("SelectedDate", mSelectedDate)
                view.context.startActivity(intent)
            }
            else{
                Log.d("Rediredt Dailysheet detail","No data")
            }
        }






        viewHolder.selectView?.setOnClickListener {
            if (viewHolder.checkbox?.isChecked!!) {
                viewHolder.checkbox?.isChecked = false
                if (checkedStudentList!!.contains(myList?.get(position)?.studentID)) {
                    checkedStudentList!!.remove(myList?.get(position)?.studentID!!)

                }

                iAdapterFragmentCallbackNew.onUpdateView(false)


            } else {
                viewHolder.checkbox?.isChecked = true
                myList?.get(position)?.studentID?.let {
                    val add = checkedStudentList?.add(it)
                }
            }
        }


//        viewHolder.checkbox?.setOnCheckedChangeListener { p0, p1 ->
//            if (p1) {
//                myList?.get(position)?.studentID?.let { val add = checkedStudentList?.add(it)
//                }
//            } else {
//
//                if (checkedStudentList!!.contains(myList?.get(position)?.studentID)) {
//                    checkedStudentList!!.remove(myList?.get(position)?.studentID!!)
//
//                }
//
//                iAdapterFragmentCallbackNew.onUpdateView(false)
//
//
//
//            }
//            AppInstance.selectedStudentsListDailySheet=checkedStudentList as ArrayList<Int>
//
//
//        }



























        return view as View



     /*   val viewModel = DailySheetViewModel(childrenList?.get(position)!!, position)
        viewHolder.viewModel = viewModel
        if(childrenList!!.get(position).totalActivityCount!!>0){
            viewHolder.sample.visibility=View.GONE
        }
        else{
            viewHolder.sample.visibility=View.VISIBLE
        }
        // viewHolder.textView28.setText("AAAA")
        if(childrenList!!.get(position).studentName!=null){
            viewHolder.textView28.setText(childrenList!!.get(position).studentName)
        }else{
            viewHolder.textView28.setText("AAAA")
        }
        Log.d("StudentName"," "+position+" :"+childrenList!!.get(position).studentName)*/
        return view
    }

    override fun getItem(position: Int): Any? {
        return position
    }

    override fun getItemId(position: Int): Long {
        return 0
    }

    override fun getCount(): Int {
        return childrenList!!.size
    }

   // class viewHolderSheetHolder(var viewHolder: DailysheetListItemviewHolder) : GridView.ViewHolder(viewHolder.container)
   private class ViewHolder(row: View?) {
       var studentName: TextView? = null
       var className: TextView? = null
       var sample:TextView?=null
       var notesIV:ImageView?=null
       var activityIV:ImageView?=null
       var foodIV:ImageView?=null
       var medicineIV:ImageView?=null
       var moodIV:ImageView?=null
       var viewMoreBtn:Button?=null
       var checkbox:CheckBox?=null
       var frameLyt:RelativeLayout?=null
       var redirectLyt:LinearLayout?=null
       var childImg:ImageView?=null
       var selectView:View? = null
       
       
       

       init {
           this.studentName = row?.findViewById<TextView>(com.daycare.daycareteacher.R.id.textView28)
           this.className = row?.findViewById<TextView>(com.daycare.daycareteacher.R.id.textView29)
           this.childImg = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.childImg)

           this.sample = row?.findViewById<TextView>(com.daycare.daycareteacher.R.id.sample)
           this.selectView = row?.findViewById<View>(com.daycare.daycareteacher.R.id.selectView)

           this.notesIV = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.notesIV)
           this.activityIV = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.activityIV)
           this.foodIV = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.foodIV)
           this.medicineIV = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.medicineIV)
           this.moodIV = row?.findViewById<ImageView>(com.daycare.daycareteacher.R.id.moodIV)
           this.viewMoreBtn = row?.findViewById<Button>(com.daycare.daycareteacher.R.id.viewMoreBtn)
           this.checkbox = row?.findViewById<CheckBox>(com.daycare.daycareteacher.R.id.checkbox)
           this.frameLyt = row?.findViewById<RelativeLayout>(com.daycare.daycareteacher.R.id.frameLyt)
           this.redirectLyt = row?.findViewById<LinearLayout>(com.daycare.daycareteacher.R.id.redirectLyt)


       }
   }






}