package com.daycare.daycareteacher.ui.dashboard.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.FragmentActivity
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.interfaces.ViewItemClickListener
import com.daycare.daycareteacher.model.DailySheetStudentData
import com.daycare.daycareteacher.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.CircleTransform
import com.daycare.daycareteacher.utill.DailySheetConstant

class SampleDailyGridAdapter (
    var context: FragmentActivity,
    var childrenList: ArrayList<DailySheetStudentData>?,
    var date: String,
    var iAdapterFragmentCallbackNew: ViewItemClickListener<DailySheetStudentData>
): BaseAdapter()
{

    @SuppressLint("viewHolderSheetHolder")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val viewHolder: ViewHolder

        if (convertView == null) {
            val inflater = context?.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            view = inflater.inflate(R.layout.dailysheet_list_item, null)
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
            viewHolder.studentName?.setText("DayCare")
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

                when (l) {
                    0 -> {
                        if (type == DailySheetConstant.NOTES) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.notes)
                        }
                        if (type == DailySheetConstant.MEAL) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.meal)
                        }
                        if (type == DailySheetConstant.MOOD) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.happy)
                        }
                        if (type == DailySheetConstant.HEALTH) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.medication)
                        }
                        if (type == DailySheetConstant.ACTIVITY) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.activity)
                        }
                        if (type == DailySheetConstant.NAP) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.nap)
                        }
                        if (type == DailySheetConstant.DIAPER) {
                            viewHolder.notesIV?.visibility = View.VISIBLE
                            viewHolder.notesIV?.setImageResource(R.mipmap.diaper)
                        }
                    }
                    1 -> {
                        if (type == DailySheetConstant.NOTES) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.notes)
                        }
                        if (type == DailySheetConstant.MEAL) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.meal)
                        }
                        if (type == DailySheetConstant.MOOD) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.happy)
                        }
                        if (type == DailySheetConstant.HEALTH) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.medication)
                        }
                        if (type == DailySheetConstant.ACTIVITY) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.activity)
                        }
                        if (type == DailySheetConstant.NAP) {
                            viewHolder.activityIV?.visibility = View.VISIBLE
                            viewHolder.activityIV?.setImageResource(R.mipmap.nap)
                        }
                        if (type == DailySheetConstant.DIAPER) {
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

        viewHolder.checkbox?.isChecked = childrenList?.get(position)?.selection==true

        viewHolder.redirectLyt?.setOnClickListener{


        if (AppInstance.allDailySheetStidentList?.data?.get(position)!!.activityDetail!!.size > 0) {
            val intent = Intent(view.context, DailysheetDetailActivity::class.java)
            intent.putExtra("POSITION", position.toString())
            intent.putExtra("CLASSES_ID", AppInstance.allDailySheetStidentList?.data?.get(position)!!.classesID)

            view.context.startActivity(intent)
        }
        else{
            Log.d("Dailysheet detail","No data")
           // showToast( view.context,"No Data")
        }
    }


    viewHolder.selectView?.setOnClickListener {

    if (viewHolder.checkbox?.isChecked!!) {
        viewHolder.checkbox?.isChecked = false

        childrenList?.get(position)?.selection=false

//                try {
//                    if (selectedStudentsList!!.contains(childrenList?.get(position)?.studentID)) {
//                        selectedStudentsList!!.remove(childrenList?.get(position)?.studentID!!)
//                    }
//                }catch (e:java.lang.Exception){
//                    e.printStackTrace()
//                }
        childrenList?.get(position)?.let { it1 ->
            iAdapterFragmentCallbackNew.onViewItemClick(
                it1,position,1)
        }


    } else {
        viewHolder.checkbox?.isChecked = true
//                childrenList?.get(position)?.studentID?.let {
//                    val add = selectedStudentsList?.add(it)
//                }
        childrenList?.get(position)?.selection=true
        // iAdapterFragmentCallbackNew.onUpdateView(false)
        childrenList?.get(position)?.let { it1 ->
            iAdapterFragmentCallbackNew.onViewItemClick(
                it1,position,1)
        }

    }
}
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