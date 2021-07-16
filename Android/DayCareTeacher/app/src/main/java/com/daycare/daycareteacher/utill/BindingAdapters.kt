package com.daycare.daycareteacher.utill

import android.view.View
import android.widget.ImageView
import android.widget.Switch
import android.widget.TextView
import androidx.databinding.BindingAdapter
import androidx.databinding.DataBindingUtil
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.*
import com.daycare.daycareteacher.model.MealDataResponse
import java.util.*

class BindingAdapters {

    companion object {
        //        for Student
        @JvmStatic
        @BindingAdapter("app:image")
        fun loadImage(view: ImageView, url: String) {
            if(url!=null){
                try{
                    Glide.with(view.context)
                        .load(url)
                        .placeholder(R.drawable.ic_placeholder)
                        .transform(CircleTransform(view.context))
                        .into(view)
                }catch(e:Exception){
                    Glide.with(view.context)
                        .load(R.drawable.ic_placeholder)
                        .placeholder(R.drawable.ic_placeholder)
                        .transform(CircleTransform(view.context))
                        .into(view)
                }

            }
            else {
                Glide.with(view.context)
                    .load(R.drawable.ic_placeholder)
                    .placeholder(R.drawable.ic_placeholder)
                    .transform(CircleTransform(view.context))
                    .into(view)
            }


        }

        //        for Class Category
        @JvmStatic
        @BindingAdapter("app:classImage")
        fun loadClassImage(view: ImageView, url: String) {
            Glide.with(view.context)
                .load("com.daycare.daycareteacher.res.drawable.ic_baby_boy")
                .placeholder(R.drawable.ic_baby_boy)
                .transform(CircleTransform(view.context))
                .into(view)

        }

        //        for display Date
        @JvmStatic
        @BindingAdapter("app:date", "app:viewid", requireAll = true)
        fun loadDate(view: View, todaysDate: Date, viewId: Int) {
            val day: String = dayofWeek.format(todaysDate)
            val month: String = monthYear.format(todaysDate)
            val date: String = numDate.format(todaysDate)
            when (viewId) {
                ATTENDANCE -> {
                    val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date
                }
                DAILYSHEET -> {
                    // val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }

                COMPLETE_DAILYSHEET -> {
                    val binding = DataBindingUtil.findBinding<FragmentCompleteDailySheetBinding>(view)
                    binding!!.weekDayTxtDailySheet.text = day
                    binding.monthYrTxtDailySheet.text = month
                    binding.dateTextDailySheet.text = date
                }

                POSTACTIVITY -> {
                    val binding = DataBindingUtil.findBinding<FragmentPostActivityBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }

                BREAKLOGACTIVITY -> {
                    val binding = DataBindingUtil.findBinding<FragmentBreakLogBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }
                else -> {
//                  POST ACTIVITY
                }
            }
        }


        //        for Attendance State
        @JvmStatic
        @BindingAdapter("app:breakstate")
        fun loadBreakState(view: View, state: Int) {
            val binding = DataBindingUtil.findBinding<BreakinOutConfirmationBinding>(view)
            when (state) {
                OPEN_BREAK -> {
                    binding!!.edtBreakOut.visibility = View.VISIBLE
                    binding.pickupTv.visibility = View.VISIBLE
                    binding.pickupBreakSpinner.visibility = View.VISIBLE
                    binding.edtBreakIn.visibility = View.GONE
                    binding.dropoffTv.visibility = View.GONE
                    binding.dropoffBreakSpinner.visibility = View.GONE
                }
                ON_BREAK_IN -> {
                    binding!!.edtBreakOut.visibility = View.GONE
                    binding.pickupTv.visibility = View.GONE
                    binding.pickupBreakSpinner.visibility = View.GONE
                    binding.edtBreakIn.visibility = View.VISIBLE
                    binding.dropoffTv.visibility = View.VISIBLE
                    binding.dropoffBreakSpinner.visibility = View.VISIBLE
                }
                ON_BREAK_OUT -> {
                    binding!!.edtBreakOut.visibility = View.VISIBLE
                    binding.pickupTv.visibility = View.VISIBLE
                    binding.pickupBreakSpinner.visibility = View.VISIBLE
                    binding.edtBreakIn.visibility = View.VISIBLE
                    binding.dropoffTv.visibility = View.VISIBLE
                    binding.dropoffBreakSpinner.visibility = View.VISIBLE
                }

            }
        }


        //        for Attendance State
        @JvmStatic
        @BindingAdapter("app:state")
        fun loadState(view: View, state: Int) {
//            val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
//            when (state) {
//                IS_CHECKED_IN -> {
//                    binding!!.btnEdit.visibility = View.VISIBLE
//                    binding.btnEditDisabled.visibility = View.GONE
//                    binding.btnCheckin.visibility = View.INVISIBLE
//                    binding.btnCheckout.visibility = View.VISIBLE
//                    binding.btnCheckedOut.visibility = View.INVISIBLE
//                    binding.absentBtn.visibility = View.INVISIBLE
//                    // binding.absentBtnDisabled.visibility = View.VISIBLE
//                    binding.btnOnBreak.visibility = View.GONE
//                }
//                IS_CHECKED_OUT -> {
//                    binding!!.btnEdit.visibility = View.VISIBLE
//                    binding.btnEditDisabled.visibility = View.GONE
//                    binding.btnCheckin.visibility = View.INVISIBLE
//                    binding.btnCheckout.visibility = View.INVISIBLE
//                    binding.btnCheckedOut.visibility = View.VISIBLE
//                    binding.absentBtn.visibility = View.INVISIBLE
//                    //binding.absentBtnDisabled.visibility = View.VISIBLE
//                    binding.btnOnBreak.visibility = View.GONE
//
//                }
//                IS_CHECKED_ABSENT -> {
//                    binding!!.btnEdit.visibility = View.VISIBLE
//                    binding.btnEditDisabled.visibility = View.GONE
//                    binding.btnCheckin.visibility = View.INVISIBLE
//                    binding.btnCheckout.visibility = View.INVISIBLE
//                    binding.btnCheckedOut.visibility = View.INVISIBLE
//                    binding.absentBtn.visibility = View.VISIBLE
//                    binding.absentBtn.isChecked = true
//                    binding.absentBtn.isClickable = false
//                    //binding.absentBtnDisabled.visibility = View.GONE
//                    binding.btnOnBreak.visibility = View.GONE
//
//                }
//                IS_TO_BE_CHECKED -> {
//                    binding!!.btnEdit.visibility = View.INVISIBLE
//                    binding.btnEditDisabled.visibility = View.VISIBLE
//                    binding.btnCheckin.visibility = View.VISIBLE
//                    binding.btnCheckout.visibility = View.INVISIBLE
//                    binding.btnCheckedOut.visibility = View.INVISIBLE
////                    binding.absentBtn.visibility = View.VISIBLE
//                    binding.absentBtn.isChecked = false
//                    binding.absentBtn.isClickable = true
////                    binding.absentBtnDisabled.visibility = View.GONE
//                    binding.btnOnBreak.visibility = View.GONE
//                }
//                IS_ON_BREAK -> {
//                    binding!!.btnEdit.visibility = View.VISIBLE
//                    binding.btnEditDisabled.visibility = View.GONE
//                    binding.btnCheckin.visibility = View.INVISIBLE
//                    binding.btnCheckout.visibility = View.INVISIBLE
//                    binding.btnCheckedOut.visibility = View.INVISIBLE
//                    binding.absentBtn.visibility = View.INVISIBLE
//                    // binding.absentBtnDisabled.visibility = View.VISIBLE
//                    binding.btnOnBreak.visibility = View.VISIBLE
//                }
//
//            }
        }

        //For Medication State


        @JvmStatic
        @BindingAdapter("app:medicationstate")
        fun loadMedicationState(view: View, state: Int) {
            val binding = DataBindingUtil.findBinding<TeacherMedicationListItemBinding>(view)
            when (state) {
                NOT_GIVEN -> {
                    binding?.statusBtn!!.isChecked = false
                    binding.statusBtn.isEnabled = true
                }
                GIVEN -> {
                    binding?.statusBtn!!.isChecked = true
                    binding.statusBtn.isEnabled = false
                }


            }
        }


        /*@JvmStatic
        @BindingAdapter("app:classState")
        fun loadClassState(view: View, state: Int) {
            val binding = DataBindingUtil.findBinding<ClassStatusListItemBinding>(view)
            when (state) {
                AVAILABLE_CHECKIN_STATUS -> {
                    binding!!.teacherCheckInBtn.visibility = View.VISIBLE
                    binding.teacherCheckOutBtn.visibility = View.INVISIBLE
                    binding.teacherEditBtn.visibility = View.INVISIBLE
                    binding.editLyt.visibility=View.INVISIBLE
                    binding.checkoutLyt.visibility=View.INVISIBLE
                    binding.checkInLyt.visibility=View.VISIBLE
                    binding.statusTxt.text = "Open"
                }
                CHECK_IN_STATUS -> {
                    binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                    binding.teacherCheckOutBtn.visibility = View.VISIBLE
                    binding?.teacherCheckOutBtn?.isEnabled=true
                    binding?.teacherCheckOutBtn?.isClickable=true
                    binding.teacherEditBtn.visibility = View.VISIBLE

                    binding.editLyt.visibility=View.VISIBLE
                    binding.checkoutLyt.visibility=View.VISIBLE
                    binding.checkInLyt.visibility=View.GONE


                    binding.statusTxt.text = "Checked In"
                    binding.statusTxt.setTextColor(ContextCompat.getColor(view.context, R.color.colorPresent))
                }
                CHECK_OUT_STATUS -> {
                    //binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                    binding!!.teacherCheckInBtn.visibility = View.VISIBLE
                    binding.teacherCheckOutBtn.visibility = View.INVISIBLE
                    binding.teacherCheckOutBtn.isEnabled =false
                    binding.teacherCheckOutBtn.isClickable=false
                    // binding?.teacherCheckedOutBtn?.visibility = View.VISIBLE

                    binding.teacherEditBtn.visibility = View.VISIBLE
                    binding.teacherCheckOutBtn.isEnabled = false
                    binding.statusTxt.text = "Checked Out"

                    binding.editLyt.visibility=View.VISIBLE
                    binding.checkoutLyt.visibility=View.GONE
                    binding.checkInLyt.visibility=View.VISIBLE


//                    binding.teacherCheckOutBtn.setBackgroundColor(ContextCompat.getColor(view.context,R.color.colorBtnCancel))
                    binding.statusTxt.setTextColor(ContextCompat.getColor(view.context, R.color.colorAbsent))

                }

            }
        }
*/
        @JvmStatic
        @BindingAdapter("app:convertDate")
        fun loadDate(view: TextView, date: String?) {
            if (date != null) {
                if(date.contains("T00:00:00")){
                    view.text = convertLocalToUtc(date.replace("T00:00:00",""),
                        yearDateFormat, incidentDisplayDate)
                }else{
                    view.text = convertFormat(date, alohaDate, incidentDisplayDate)

                }
            }
        }

        @JvmStatic
        @BindingAdapter("app:convertFormat")
        fun loadconvertFormat(view: TextView, date: String?) {
            if (date != null) {
                view.text = convert(date, alohaDate, incidentDisplayDate)
            }
        }

        @JvmStatic
        @BindingAdapter("app:convertTime")
        fun loadtime(view: TextView, date: String?) {
            if (date != null) {
                view.text = convertDate(date, alohaDate, reservationTime)
            }
        }

        @JvmStatic
        @BindingAdapter("app:switch")
        fun setSwitch(view: Switch, value: Boolean) {
            if (value) {
                view.text = view.context.getString(R.string.yes)
            } else {
                view.text = view.context.getString(R.string.no)
            }
        }

        @JvmStatic
        @BindingAdapter("app:startt", "app:endt", requireAll = true)
        fun loadTimerange(view: TextView, start: String?, end: String?) {
            view.text = "${convertUtcToLocal(start!!, alohaDate, reservationTime)} - ${convertUtcToLocal(
                end!!,
                alohaDate,
                reservationTime
            )} "
        }

        @JvmStatic
        @BindingAdapter("app:setClass")
        fun loadClass(view: TextView, cls: List<MealDataResponse.InvolvedClas>?) {
            if (cls != null) {
                view.text = cls.filter { !it.className.isNullOrEmpty() }.joinToString(separator = ",") {
                    it.className.toString()
                }
            }
        }

        @JvmStatic
        @BindingAdapter("app:start", "app:end", requireAll = true)
        fun loadTime(view: TextView, start: String?, end: String?) {
            view.text = "$start - $end"
        }

       /* @JvmStatic
        @BindingAdapter("app:pprofile", "app:purl", requireAll = true)
        fun loadProfileImage(view: CircleImageView, img: ByteArray?, url: String?) {
            if (img != null) {
                Glide.with(view.context)
                    .load(img)
                    .asBitmap()
                    .placeholder(R.drawable.ic_placeholder)
                    .into(view)
            } else {
                Glide.with(view.context)
                    .load(url)
                    .asBitmap()
                    .placeholder(R.drawable.ic_placeholder)
                    .into(view)

            }
        }*/
    }
}