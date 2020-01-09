package com.daycare.daycareparent.utill

import android.databinding.BindingAdapter
import android.databinding.DataBindingUtil
import android.view.View
import android.widget.ImageView
import android.widget.RadioButton
import android.widget.Switch
import android.widget.TextView
import com.bumptech.glide.Glide
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.*
import com.daycare.daycareparent.model.EnrolledClassesInformation
import com.daycare.daycareparent.model.MealDataResponse
import de.hdodenhof.circleimageview.CircleImageView
import java.util.*

class BindingAdapters {

    companion object {
        //        for Student
        @JvmStatic
        @BindingAdapter("app:image")
        fun loadImage(view: ImageView, url: String?) {

            try { if(url!=null) {
                Glide.with(view.context)
                    .load(url)
                    .placeholder(R.drawable.ic_placeholder)
                    .transform(CircleTransform(view.context))
                    .into(view)
            }
                else{
                Glide.with(view.context)
                    .load(R.drawable.ic_placeholder)
                    .placeholder(R.drawable.ic_placeholder)
                    .transform(CircleTransform(view.context))
                    .into(view)
            }
            }catch(e:Exception){
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
        fun loadClassImage(view: ImageView, url: String?) {
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
                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }
                POSTACTIVITY -> {
                    val binding = DataBindingUtil.findBinding<FragmentPostActivityBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }

                ENROLLMENTACTIVITY -> {
                    val binding = DataBindingUtil.findBinding<FragmentEnrollmentBinding>(view)
                    binding!!.weekDayTxt.text = day
                    binding.monthYrTxt.text = month
                    binding.dateTxt.text = date

                }
                INCIDENTLOGACTIVITY -> {
                    val binding = DataBindingUtil.findBinding<FragmentIncidentReportBinding>(view)
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


        @JvmStatic
        @BindingAdapter("app:classState")
        fun loadClassState(view: View, state: Int) {
            val binding = DataBindingUtil.findBinding<ClassStatusListItemBinding>(view)
            when (state) {
                AVAILABLE_CHECKIN_STATUS -> {
                    binding!!.teacherCheckInBtn.visibility = View.VISIBLE
                    binding.teacherCheckOutBtn.visibility = View.INVISIBLE
                    binding.teacherEditBtn.visibility = View.INVISIBLE
                    binding.statusTxt.text = "Open"
                }
                CHECK_IN_STATUS -> {
                    binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                    binding.teacherCheckOutBtn.visibility = View.VISIBLE
                    binding.teacherEditBtn.visibility = View.VISIBLE
                    binding.statusTxt.text = "Checked In"
                    binding.statusTxt.setTextColor(view.context.resources.getColor(R.color.colorPresent))
                }
                CHECK_OUT_STATUS -> {
                    binding!!.teacherCheckInBtn.visibility = View.INVISIBLE
                    binding.teacherCheckOutBtn.visibility = View.VISIBLE
                    binding.teacherEditBtn.visibility = View.VISIBLE
                    binding.teacherCheckOutBtn.isEnabled = false
                    binding.statusTxt.text = "Checked Out"
                    binding.statusTxt.setTextColor(view.context.resources.getColor(R.color.colorAbsent))

                }

            }
        }

        @JvmStatic
        @BindingAdapter("app:convertDate")
        fun loadDate(view: TextView, date: String?) {
            if (date != null) {
                view.text = convertDate(date, alohaDate, incidentDisplayDate)
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
        @BindingAdapter("app:setClass")
        fun loadClass(view: TextView, cls: List<MealDataResponse.InvolvedClas>?) {
            if (cls != null) {
                view.text = cls.filter { !it.className.isNullOrEmpty() }.joinToString(separator = ",") {
                    it.className.toString()
                }
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
        @BindingAdapter("app:reasonEnabled")
        fun setReasonEnabled(view: RadioButton, value: Boolean) {
            val binding = DataBindingUtil.findBinding<ActivityAddGuardianBinding>(view)
            view.setOnCheckedChangeListener { compoundButton, b ->
                if (b) {
                    if (!value) {
                        binding?.reasonLayout?.visibility = View.VISIBLE
//                        binding?.textView22?.visibility = View.VISIBLE
                    } else {
                        binding?.reasonLayout?.visibility = View.GONE
//                        binding?.textView22?.visibility = View.GONE
                    }
                }
            }
        }


        @JvmStatic
        @BindingAdapter("app:records")
        fun setRecords(view: TextView, rec: String?) {
            var record = "No"
            if (rec != null && rec.toInt() > 0) {
                record = rec
            }
            view.text = "$record records available."
        }
    }
}

@BindingAdapter("app:profile", "app:url", requireAll = true)
fun loadImage(view: CircleImageView, img: ByteArray?, url: String?) {
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
}

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
}

@BindingAdapter("app:start", "app:end", requireAll = true)
fun loadTime(view: TextView, start: String?, end: String?) {
    view.text = "$start - $end"
}

@BindingAdapter("app:startt", "app:endt", requireAll = true)
fun loadTimerange(view: TextView, start: String?, end: String?) {
    view.text ="${convertDate(start!!, alohaDate, reservationTime)} - ${convertDate(
        end!!,
        alohaDate,
        reservationTime
    )} "
}
@BindingAdapter("app:records")
fun setTotalRecords(view: TextView, value: String?) {
    var records = "No record available"
    if (value != null) {
        val record: Int = value.toInt()
        if (record != 0)
            records = "$value records available"
    }
    view.text = records
}

@BindingAdapter("app:classes")
fun setClasses(view: TextView, data: List<EnrolledClassesInformation>?) {
    view.text = "Not enrolled in class"

    var classes: String = ""
    if (data != null) {
        for (pos in 0 until data.size) {
            classes += if (pos < data.size - 1) {
                data[pos].className!! + ", "
            } else {
                data[pos].className!!
            }
        }
    }
    if (classes.isNotEmpty()) {
        view.text = classes
    }

}

@BindingAdapter("app:sdate", "app:edate", requireAll = true)
fun setRange(view: TextView, start: String?, end: String?) {
    if (start != null && end != null) {
        view.text = "${convertDate(start!!, alohaDate, incidentDisplayDate)} - ${convertDate(
            end!!,
            alohaDate,
            incidentDisplayDate
        )} "
    }
}

@BindingAdapter("app:pay")
fun setPayment(view: TextView, start: String?) {
    if (start != null) {
        view.text = "$$start"
    }
}
