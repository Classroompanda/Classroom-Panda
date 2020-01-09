package com.daycare.kiosk.utill

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Context
import android.content.Intent
import android.os.CountDownTimer

import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.core.content.ContextCompat.startActivity
import com.daycare.kiosk.ui.login.LoginActivity
import com.google.android.material.textfield.TextInputEditText
import java.text.ParseException
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*


/**
 * Use this class for Date conversion formats as per the requirement
 */

var serverDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
var otherserverDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS", Locale.getDefault())
var alohaDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
var checkInDate = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
private val dayOnlyFormat = SimpleDateFormat("EEEE")
var reservationDate = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
var reservationDateToShow = SimpleDateFormat("MM/dd/yyyy", Locale.getDefault())
var suggestionDateWeGet = SimpleDateFormat("MM/dd/yyyy HH:mm", Locale.getDefault())
var suggestionDateToShow = SimpleDateFormat("MM/dd/yyyy hh:mm a", Locale.getDefault())
var reservationTime = SimpleDateFormat("h:mm a ", Locale.getDefault())
var reservationTime12 = SimpleDateFormat("h:mma", Locale.getDefault())
var reservationTime24 = SimpleDateFormat("HH", Locale.getDefault())
var reservationTime12WithoutMin = SimpleDateFormat("hh a", Locale.getDefault())
//    public static SimpleDateFormat DOB         = new SimpleDateFormat("dd-MM-yyyy");
var DOBsmall = SimpleDateFormat("MMMM dd", Locale.getDefault())
var displayTime = SimpleDateFormat("HH:mm a", Locale.getDefault())
var displayDate = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault())
var displayDateDetail = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())

var dialogDisplayDate = SimpleDateFormat("dd  MMMM yyyy", Locale.getDefault())
var incidentDisplayDate = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())
var dialogDisplayTime = SimpleDateFormat("hh:mm a", Locale.getDefault())
var dayHour = SimpleDateFormat("hh", Locale.getDefault())
var month = SimpleDateFormat("MMM", Locale.getDefault())
var monthYear = SimpleDateFormat("MMMM yyyy", Locale.getDefault())
var numDate = SimpleDateFormat("dd", Locale.getDefault())
var dayofWeek = SimpleDateFormat("EEEE", Locale.getDefault())
var yearDateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
var editDisplayTime = SimpleDateFormat("EEEE hh:mm a", Locale.getDefault())
//E, dd MMM yyyy HH:mm:ss z 	Tue, 02 Jan 2018 18:07:59 IST   =====Fri Jan 11 2019
var eventDateSendFormat=SimpleDateFormat("E MMM dd yyyy")
var mealDisplayDate = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())

var postActivityDate = SimpleDateFormat("dd MMM", Locale.getDefault())




fun datepicker(context: Context, et: TextInputEditText) {
    val mDatePicker: DatePickerDialog
    val c = Calendar.getInstance()
    val mYear = c.get(Calendar.YEAR)
    val mMonth = c.get(Calendar.MONTH)
    val mDay = c.get(Calendar.DAY_OF_MONTH)

    mDatePicker = DatePickerDialog(context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
        val mDate = (month + 1).toString() +
                "-" + day + "-" + year

        try {
            val mdate = displayDate.parse(mDate)
            et.setText(incidentDisplayDate.format(mdate))
        } catch (e: ParseException) {
            e.printStackTrace()
        }
    }, mYear, mMonth, mDay)

    val dp = mDatePicker.datePicker
    dp.maxDate = c.timeInMillis

    mDatePicker.show()
}

fun datepickerFuture(context: Context, et: TextInputEditText) {
    val mDatePicker: DatePickerDialog
    val c = Calendar.getInstance()
    val mYear = c.get(Calendar.YEAR)
    val mMonth = c.get(Calendar.MONTH)
    val mDay = c.get(Calendar.DAY_OF_MONTH)

    mDatePicker = DatePickerDialog(context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
        val mDate = (month + 1).toString() +
                "-" + day + "-" + year

        try {
            val mdate = displayDate.parse(mDate)
            et.setText(incidentDisplayDate.format(mdate))
        } catch (e: ParseException) {
            e.printStackTrace()
        }
    }, mYear, mMonth, mDay)

    val dp = mDatePicker.datePicker


    mDatePicker.show()
}

@SuppressLint("NewApi")
fun convertStingToDate(date:String):Date{


    //  val date_s = " 2011-01-18 00:00:00.0"
    // val dt = SimpleDateFormat("yyyy-mm-dd'T'hh:mm:ss")
    //val date = dt.parse(date_s)


    val pattern = "yyyy-mm-dd'T'hh:mm:ss"
    val simpleDateFormat = SimpleDateFormat(pattern)

    val stringToDate = simpleDateFormat.parse(date)

    return stringToDate
}

fun convertDate(date: String, currentFormat: SimpleDateFormat, convertFormat: SimpleDateFormat): String {
    try {
        // currentFormat.timeZone = TimeZone.getTimeZone("UTC")
        val d = currentFormat.parse(date)
        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()
    }

    return ""
}

fun convertTime(time:String, currentFormat:SimpleDateFormat, convertFormat: SimpleDateFormat):String{
    //2019-01-07T13:00:27.904
    val d = currentFormat.parse(time)
    return convertFormat.format(d)

    return ""
}

fun customDatePicker(context: Context, dateTv: TextView, dayTv: TextView, monthYrTv: TextView) {
    val mDatePicker: DatePickerDialog
    val c = Calendar.getInstance()
    val mYear = c.get(Calendar.YEAR)
    val mMonth = c.get(Calendar.MONTH)
    val mDay = c.get(Calendar.DAY_OF_MONTH)
    var mDate: String = currentDate().toString()
    c.add(Calendar.DATE, -1)
    mDatePicker = DatePickerDialog(context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
        mDate = (month + 1).toString() +
                "-" + day + "-" + year
        try {
            val mdate = displayDate.parse(mDate)
            dateTv.text = numDate.format(mdate)
            dayTv.text = dayofWeek.format(mdate)
            monthYrTv.text = monthYear.format(mdate)


        } catch (e: ParseException) {
            e.printStackTrace()
        }
    }, mYear, mMonth, mDay)

    val dp = mDatePicker.datePicker
    dp.minDate = c.timeInMillis

    mDatePicker.show()

}

fun timepicker(txtTime: TextInputEditText) {
    val c = Calendar.getInstance()
    val mHour = c.get(Calendar.HOUR_OF_DAY)
    val mMin = c.get(Calendar.MINUTE)

    val timePickerDialog = TimePickerDialog(
        txtTime.context,
        TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
            var mHourOfDay = hourOfDay
            val format: String
            when {
                mHourOfDay > 12 -> {
                    format = "pm"
                    mHourOfDay -= 12


                }
                mHourOfDay == 12 -> {

//                    mHourOfDay += 12
                    format = "am"
                }
                else -> format = "am"
            }
            val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
            val selectedTime = getDayName(Date()) + " " + mTime
            val mdate = dialogDisplayTime.parse(mTime)
            txtTime.setText(dialogDisplayTime.format(mdate))

        }, mHour, mMin, false
    )
    timePickerDialog.show()
}


@Throws(ParseException::class)
fun parseToDOBfromFb(fbDate: String): Date {
    return displayDate.parse(fbDate)

}

fun currentHourDay(): Int {
    return Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
}

fun currentDate(): Int {
    return Calendar.getInstance().get(Calendar.DAY_OF_MONTH)
}

fun currentAmPm(): String {
    return Calendar.getInstance().get(Calendar.AM_PM).toString()
}


fun currentMonth(): String {
    return month.format(Calendar.getInstance().time)
}

fun getMonth(date: Date): String {
    return month.format(date)
}

fun getDayName(time: Date): String {
    return dayOnlyFormat.format(time)
}

fun getDayName(date: String): String {

    try {
        val date1 = displayDate.parse(date)
        return dayOnlyFormat.format(date1)
    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return getDayName(Calendar.getInstance().time)
}

fun displayReservationDate(appointment_date: String?): String? {
    try {
        if (appointment_date == null) {
            return ""
        }
        val date1 = serverDate.parse(appointment_date)
        return reservationDateToShow.format(date1)
    } catch (e: ParseException) {
        try {
            val date1 = checkInDate.parse(appointment_date)
            return reservationDateToShow.format(date1)
        } catch (e1: Exception) {
            e1.printStackTrace()
        }

    }

    return appointment_date

}

fun displayAlohaDate(appointment_date: String?): String? {
    try {
        if (appointment_date == null) {
            return ""
        }
        val date1 = alohaDate.parse(appointment_date)
        return reservationTime.format(date1)
    } catch (e: ParseException) {
        try {
            val date1 = alohaDate.parse(appointment_date)
            return reservationTime.format(date1)
        } catch (e1: Exception) {
            e1.printStackTrace()
        }

    }

    return appointment_date

}

fun displaySuggestionDate(appointment_date: String?): String? {
    try {
        if (appointment_date == null) {
            return ""
        }
        val date1 = suggestionDateWeGet.parse(appointment_date)
        return suggestionDateToShow.format(date1)
    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return appointment_date

}

fun isExpiredDate(appointmentDate: String): Boolean {
    try {
        val instance = Calendar.getInstance()
        instance.timeInMillis = System.currentTimeMillis()
        return reservationDate.parse(appointmentDate).before(instance.time)
    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return false
}

fun getServerDate(selected_date: String): String {
    try {
        return serverDate.format(checkInDate.parse(selected_date))
    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return selected_date
}

fun getCurrentDateTime(): String {
    return SimpleDateFormat("yyyy-MM-dd HH:mm").format(Date())
}

fun getCurrentDate(): String {
    return displayDate.format(Date())
}

fun getCurrentTime(): String {
    return dialogDisplayTime.format(Date())
}

fun isToday(date: Date): Boolean {
    return isSameDay(date, Calendar.getInstance().time)
}

fun isSameDay(date1: Date?, date2: Date?): Boolean {
    if (date1 == null || date2 == null) {
        throw IllegalArgumentException("The dates must not be null")
    }
    val cal1 = Calendar.getInstance()
    cal1.time = date1
    val cal2 = Calendar.getInstance()
    cal2.time = date2
    return isSameDay(cal1, cal2)
}

fun isSameDay(cal1: Calendar?, cal2: Calendar?): Boolean {
    if (cal1 == null || cal2 == null) {
        throw IllegalArgumentException("The dates must not be null")
    }
    return cal1.get(Calendar.ERA) == cal2.get(Calendar.ERA) &&
            cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
            cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)
}

@Throws(ParseException::class)
fun getHourIn24(date12Hr: String): Int {
    return Integer.parseInt(reservationTime24.format(reservationTime12.parse(date12Hr)))
}

@Throws(ParseException::class)
fun getHourIn12(date24Hr: Int): String {
    return reservationTime12WithoutMin.format(reservationTime24.parse(date24Hr.toString() + ""))
}

fun convertTimeInMillisToDateString(timeInMillis: Long): String {
    val d = Date(timeInMillis)
    val sdf = serverDate
    return sdf.format(d)
}

@Throws(ParseException::class)
fun convertTimeInMillis(givenDateString: String): Long {

    val dateFormat = reservationDateToShow
    try {
        val mDate = dateFormat.parse(givenDateString)
        val timeInMilliseconds = mDate.time
        println("Date in milli :: $timeInMilliseconds")
        return timeInMilliseconds
    } catch (e: ParseException) {
        e.printStackTrace()
    }
    return givenDateString.toLong()

}
lateinit var timer:CountDownTimer
fun  timerStart(context: Context): Boolean{
    var flagValue:Boolean=false
    timer.start()
    timer= object : CountDownTimer((2 * 60 * 100).toLong(), 100) {

        override fun onTick(millisUntilFinished: Long) {
            //Some code
            flagValue= false
        }

        override fun onFinish() {
            flagValue= true
        }
    }
    return flagValue
}