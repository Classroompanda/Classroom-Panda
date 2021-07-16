package com.daycare.daycareteacher.utill

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Context
import com.google.android.material.textfield.TextInputEditText
import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

/**
 * Use this class for Date conversion formats as per the requirement
 */
var serverDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
var postserverDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

var otherserverDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS", Locale.getDefault())
var alohaDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())

var checkInDate = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault())
private val dayOnlyFormat = SimpleDateFormat("EEEE")
var reservationDate = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
var reservationDateToShow = SimpleDateFormat("MM/dd/yyyy", Locale.getDefault())
var reservationTime = SimpleDateFormat("h:mm a ", Locale.getDefault())
var reservationTime12 = SimpleDateFormat("h:mma", Locale.getDefault())
var reservationTime24 = SimpleDateFormat("HH", Locale.getDefault())
var reservationTime12WithoutMin = SimpleDateFormat("hh a", Locale.getDefault())
var displayTime = SimpleDateFormat("hh:mm a", Locale.getDefault())
var displayDate = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault())

var displayDateDetail = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())
var alohaDate1 = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

var displaydate1 = SimpleDateFormat("MM-dd-yyyy HH:mm:ss")
var DaydateFormat = SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.getDefault())

var dialogDisplayDate = SimpleDateFormat("dd  MMMM yyyy", Locale.getDefault())
var incidentDisplayDate = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())
var dialogDisplayTime = SimpleDateFormat("hh:mm a", Locale.getDefault())
var parseTime = SimpleDateFormat("HH:mm ", Locale.getDefault())

var mmmFormatWithTime = SimpleDateFormat("dd  MMM yyyy HH:mm:ss", Locale.getDefault())


var month = SimpleDateFormat("MMM", Locale.getDefault())
var monthYear = SimpleDateFormat("MMMM yyyy", Locale.getDefault())
var numDate = SimpleDateFormat("dd", Locale.getDefault())
var dayofWeek = SimpleDateFormat("EEEE", Locale.getDefault())
var yearDateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
var eventDateSendFormat = SimpleDateFormat("E MMM dd yyyy")
var mealDisplayDate = SimpleDateFormat("dd MMM yyyy", Locale.getDefault())

var postActivityDate = SimpleDateFormat("dd MMM", Locale.getDefault())
var monthInt = SimpleDateFormat("MM", Locale.getDefault())
var yearInt = SimpleDateFormat("yyyy", Locale.getDefault())
var dayInt = SimpleDateFormat("dd", Locale.getDefault())

fun datepicker(context: Context, et: TextInputEditText) {
    val mDatePicker: DatePickerDialog
    val c = Calendar.getInstance()
    val mYear = c.get(Calendar.YEAR)
    val mMonth = c.get(Calendar.MONTH)
    val mDay = c.get(Calendar.DAY_OF_MONTH)

    mDatePicker = DatePickerDialog(
        context,
        DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
            val mDate = (month + 1).toString() +
                    "-" + day + "-" + year

            try {
                val mdate = displayDate.parse(mDate)
                et.setText(incidentDisplayDate.format(mdate))
            } catch (e: ParseException) {
                e.printStackTrace()
            }
        },
        mYear,
        mMonth,
        mDay
    )

    mDatePicker.show()
}

fun datepickerFuture(context: Context, et: TextInputEditText) {
    val mDatePicker: DatePickerDialog
    val c = Calendar.getInstance()
    val mYear = c.get(Calendar.YEAR)
    val mMonth = c.get(Calendar.MONTH)
    val mDay = c.get(Calendar.DAY_OF_MONTH)

    mDatePicker = DatePickerDialog(
        context,
        DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
            val mDate = (month + 1).toString() +
                    "-" + day + "-" + year

            showToast(context,"mDate : " + mDate)

            try {
                //displayDate.format(convertStringToDateWithoutTimeZone(mDate))
                val mdate = displayDate.parse(mDate)
                showToast(context,"mDate afer paring : " + mdate)

                val monthString = getMonth(mdate)
                val date = day.toString() + " " + monthString + " " + year

                showToast(context,"date apperaing on textView : " + date)

                et.setText(date)

            } catch (e: ParseException) {
                e.printStackTrace()
            }
        },
        mYear,
        mMonth,
        mDay
    )

    val dp = mDatePicker.datePicker
    dp.minDate = c.timeInMillis

    mDatePicker.show()
}

@SuppressLint("NewApi")
fun convertStingToDate(date: String): Date {

    val pattern ="dd MMM yyyy"
    val simpleDateFormat = SimpleDateFormat(pattern)
    try{
        val stringToDate = simpleDateFormat.parse(date)

        return stringToDate
    }catch (ex: java.lang.Exception){
        ex.printStackTrace()
    }
    return Date()
}

fun convertLocalToUtc(
    date: String,
    currentFormat: SimpleDateFormat,
    convertFormat: SimpleDateFormat
): String {
    try {
        val d = currentFormat.parse(date)  // Thu Mar 18 00:00:00 CDT 2021
        convertFormat.timeZone=TimeZone.getTimeZone("UTC")
        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return ""
}


fun convertFormat(
    date: String,
    currentFormat: SimpleDateFormat,
    convertFormat: SimpleDateFormat
): String {
    try {
        val d = currentFormat.parse(date)  // Thu Mar 18 00:00:00 CDT 2021
        convertFormat.timeZone=TimeZone.getDefault()
        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return ""
}

fun convertUTCTimeToLocalTime( date: String): String {
    var converted_date = ""
    try {
        val utcFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")   //yyyy-MM-dd HH:mm:ss
        // yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
        utcFormat.setTimeZone(TimeZone.getTimeZone("UTC"))
        val date: Date = utcFormat.parse(date)

        val currentTFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        currentTFormat.setTimeZone(TimeZone.getTimeZone(TimeZone.getDefault().id))
        converted_date = currentTFormat.format(date)
    } catch (e: java.lang.Exception) {
        e.printStackTrace()
    }

    return converted_date
}

fun convertUtcToLocal(
    date: String,
    currentFormat: SimpleDateFormat,
    convertFormat: SimpleDateFormat
): String {
    try {
        val d = currentFormat.parse(date)
        currentFormat.timeZone=TimeZone.getTimeZone("UTC")
        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()

        val d = currentFormat.parse(date + " " + getCurrentTime())
        currentFormat.timeZone=TimeZone.getTimeZone("UTC")
        return convertFormat.format(d)
    }

    return ""
}

fun convertDate(date: String, currentFormat: SimpleDateFormat, convertFormat: SimpleDateFormat): String {
    try {
        val d = currentFormat.parse(date)
        currentFormat.timeZone=TimeZone.getTimeZone("UTC")
        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return ""
}

fun convert(date: String, currentFormat: SimpleDateFormat, convertFormat: SimpleDateFormat): String {
    try {

        val dateFormat = date.replace("T00:00:00", "")

        return dateFormat
    } catch (e: Exception) {
        e.printStackTrace()
    }

    return ""
}

fun convertDateUTC(date: String, currentFormat: SimpleDateFormat, convertFormat: SimpleDateFormat): String {
    try {
        currentFormat.timeZone = TimeZone.getTimeZone("UTC")
        val d = currentFormat.parse(date)

        return convertFormat.format(d)
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return ""
}


fun timepicker(txtTime: TextInputEditText) {
    val c = Calendar.getInstance()
    val mHour = c.get(Calendar.HOUR_OF_DAY)
    val mMin = c.get(Calendar.MINUTE)

    val timePickerDialog = TimePickerDialog(
        txtTime.context,
        TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
            var mHourOfDay = hourOfDay

            val mTime = String.format("%02d", mHourOfDay) + ":" + String.format(
                "%02d",
                minute
            ) + " " //+ " " + format + " "

            val mdate = parseTime.parse(mTime)
            var date = SimpleDateFormat("K:mm a").format(mdate)
            if (date == "0:00 am") {
                date = "12:00 am"
            } else if (date == "0:00 pm") {
                date = "12:00 pm"
            } else if (date.toString().startsWith("0")) {
                date = date.replaceFirst("0", "12")

            }
            txtTime.setText(date)

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
//    dayOnlyFormat.timeZone = TimeZone.getTimeZone("UTC")
    try {
        val date1 = displayDate.parse(date)
        return dayOnlyFormat.format(date1)
    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return getDayName(Calendar.getInstance().time)
}


fun convertStringToDateWithoutTimeZone(date: String?): Date? {
    val dateFormat =
        SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    var convertedDate: Date? = Date()
    try {
        //2-25-2021 11:26:15  = date
        convertedDate = dateFormat.parse(date)
    } catch (e: ParseException) {
        val formatter = SimpleDateFormat("MM-dd-yyyy", Locale.US)
        val dateDate: Date = formatter.parse(date)

        convertedDate =formatter.parse(date)
        e.printStackTrace()
    }

    return convertedDate
}

fun getServerDate(selected_date: String): String {
    try {
        alohaDate.timeZone = TimeZone.getTimeZone("UTC")
        try{
            return  alohaDate.format(checkInDate.parse(selected_date))}
        catch (e: ParseException){
            var date:String = convertDateUTC(selected_date, displayDate, alohaDate).toString()

            if(date.contains("00:00:00")){
                date =   getCurrentUTC()?.let {
                    date.toString().replace(
                        "00:00:00",
                        it.substringAfter("T")
                    )
                }.toString()
            }else{
                date = date+"Z"
            }
            return date//getCurrentDate()
        }

    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return selected_date
}

fun getServerDateWithMilliSecond(selected_date: String): String {
    try {
        otherserverDate.timeZone = TimeZone.getTimeZone("UTC")

        try{
            return  otherserverDate.format(checkInDate.parse(selected_date))+"Z"
        }
        catch (e: ParseException){
            return convertDateUTC(selected_date, displayDate, otherserverDate)+"Z"//getCurrentDate()
        }

    } catch (e: ParseException) {
        e.printStackTrace()
    }

    return selected_date
}


fun getCurrentDateTime(): String {
    return SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date())
}

fun getCurrentDate(): String {
    return SimpleDateFormat("MM-dd-yyyy").format(Date())
    //return displayDate.format(Date())  // alohaDAte1
}

fun getActualDate(): String {
    return alohaDate1.format(Date())  // alohaDAte1
}

fun getCurrentUTC(): String? {

    var DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    val sdf = SimpleDateFormat(DATE_FORMAT)
    sdf.timeZone = TimeZone.getTimeZone("UTC")
    return sdf.format(Date())

}


fun getDateAndConvertInUTC(date: String): String? {

    var DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"

    val sdf = SimpleDateFormat(DATE_FORMAT)
    sdf.timeZone = TimeZone.getTimeZone("UTC")
    return sdf.parse(date).toString()

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
    return  cal1.get(Calendar.ERA) == cal2.get(Calendar.ERA) &&
            cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
            cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH) &&
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

fun getMonthInt(todaysDate: String?): Int {
    if (!todaysDate.isNullOrEmpty()) {
        return convertDate(todaysDate!!, alohaDate, monthInt).toInt()
    }
    return 0
}
fun getyearInt(todaysDate: String?): Int {
    if (!todaysDate.isNullOrEmpty()) {
        return convertDate(todaysDate!!, alohaDate, yearInt).toInt()
    }
    return 0
}
fun getdayInt(todaysDate: String?): Int {
    if (!todaysDate.isNullOrEmpty()) {
        return convertDate(todaysDate!!, alohaDate, dayInt).toInt()
    }
    return 0
}
/**
 * Method to convert date String to day and month
 * @param dateString date string to convert
 */
fun formatDateToWeekDay(dateString: String): String {
    val date = getDateFromString(dateString)
    val weekDay = SimpleDateFormat("EEEE").format(date.time)
    return weekDay
}


/**
 * Method to convert date String to hour and minutes
 * @param dateString date string to convert
 */
fun formatDateToHourMinutes(dateString: String): String {
    val date = getDateFromString(dateString)
    val minutes = SimpleDateFormat("hh:mm a").format(date.time)
    return minutes
}

/**
 * Method to convert date String to month
 * @param dateString date string to convert
 */
fun formatDateToMonth(dateString: String): String {
    val date = getDateFromString(dateString)
    return SimpleDateFormat("dd MMMM").format(date.time)
}

fun formatDateToYear(dateString: String): String {

    val date = getDateFromString(dateString)
    return SimpleDateFormat("yyyy").format(date.time)
}

/**
 * Method to convert the date string to Date Object
 * @param dateString input date string to convert
 */
private fun getDateFromString(dateString: String): Date {
    //  val locale = Locale(Constant.language, Constant.locale)  // 2020-12-09T04:03:20
    val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    format.timeZone=TimeZone.getTimeZone("UTC")

    return format.parseObject(dateString) as Date
}


fun String.toDate(
    dateFormat: String = "yyyy-MM-dd HH:mm:ss", timeZone: TimeZone = TimeZone.getTimeZone(
        "UTC"
    )
): Date {
    val parser = SimpleDateFormat(dateFormat, Locale.getDefault())
    parser.timeZone = timeZone
    return parser.parse(this)
}

fun Date.formatTo(dateFormat: String, timeZone: TimeZone = TimeZone.getDefault()): String {
    val formatter = SimpleDateFormat(dateFormat, Locale.getDefault())
    formatter.timeZone = timeZone
    return formatter.format(this)
}

@Throws(ParseException::class)
fun changeDateTime(dt: String?, timezone: String?): String? {
    val sdfOriginal = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
    sdfOriginal.timeZone = TimeZone.getTimeZone("UTC")
    val date1 = sdfOriginal.parse(dt)
    val calendar = Calendar.getInstance()
    calendar.time = date1
    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss a")
    sdf.timeZone = TimeZone.getTimeZone(timezone)
    return sdf.format(calendar.time)
}