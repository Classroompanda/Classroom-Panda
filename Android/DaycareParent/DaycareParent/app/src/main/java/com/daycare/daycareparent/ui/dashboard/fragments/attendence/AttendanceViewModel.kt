package com.daycare.daycareparent.ui.dashboard.fragments.attendence

import android.app.DatePickerDialog
import android.app.DatePickerDialog.OnDateSetListener
import android.app.TimePickerDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.View
import com.daycare.daycareparent.databinding.*
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.*
import java.text.ParseException
import java.util.*

class AttendanceViewModel() : ViewModel() {

    /**
     * Fragment methods
     */

    val isLoading = MutableLiveData<Boolean>()
    val classApiResponse = MutableLiveData<ClassModel>()
    val guardianApiResponse = MutableLiveData<GuardianModel>()
    val attendenceApiResponse = MutableLiveData<AttendanceResponse>()
    var selectedDate = MutableLiveData<String>()
    var mSelectedDate = getCurrentDateTime()
    val todaysDate = Calendar.getInstance().time!!
    val viewId = ATTENDANCE
    var mClassId = 0
    val breakStatusResponse = MutableLiveData<BreakData>()
    val breakEditStatusResponse = MutableLiveData<BreakData>()
    val addBreakFab = MutableLiveData<Boolean>()



    fun getAttendanceDataRequest(view: View) {
        getAttendanceData(getServerDate(mSelectedDate), view)

    }

    fun checkBreakStatus(): Boolean {
        if (AppInstance.breakData!!.data?.size!! > 0) {
            for (pos in 0 until AppInstance.breakData!!.data!!.size) {
                if (AppInstance.breakData!!.data!!.get(pos).breakStatusId == 1) {
                    AppInstance.HadBreakIn = true
                    break
                }

            }
        }
        return AppInstance.HadBreakIn!!
    }



    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String

        mDatePicker =
            DatePickerDialog(view.context, OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year
                try {
                    val mdate = displayDate.parse(mDate)
                    binding!!.dateTxt.text = numDate.format(mdate)
                    binding.weekDayTxt.text = dayofWeek.format(mdate)
                    binding.monthYrTxt.text = monthYear.format(mdate)
                    selectedDate.value = mDate
                    mSelectedDate = mDate
//                    isLoading.value = true
                    getAttendanceData(getServerDate(mSelectedDate), view)
                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        mDatePicker.show()
    }

// Api Call for Class Name Dropdown

    private fun getAttendanceData(date: String, view: View) {
        if(isLoading.value!=true) {
        isLoading.value = true
        val body = AttendanceData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.parentID = AppInstance.loginResponse?.data?.releventUserID
        body.askedDate = date
        body.studentID = PreferenceConnector.readChild(view.context, PreferenceConnector.CHILD)?.studentId

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassAttendence(body), object :
            ServiceListener<AttendanceResponse> {
            override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {
                attendenceApiResponse.value = response
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allAttendanceReportData = response
                    Log.i("Response GetAttendence=", response.message.toString())
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })


    }}

    /**
     * Adapter methods
     */
    constructor(childData: AttendanceData, position: Int) : this() {
        this.data = childData
        imgUrl.set(data.imagePath)
        studentName.set(data.studentName)
        statusFlag.set(data.attendenceStatusID)
        this.position = position
//    AppInstance.selectedDate= dialogDisplayDate.format(Date())
//        AppInstance.selectedTime = dialogDisplayTime.format(Date())
    }



    val imgUrl = ObservableField<String>("")
    private lateinit var data: AttendanceData
    val statusFlag = ObservableField<Int>(IS_TO_BE_CHECKED)
    val studentName = ObservableField<String>("")
    var position: Int = 0


    fun breaktimepicker(view: View, txtTime: TextInputEditText) {
        val c = Calendar.getInstance()
        val mHour = c.get(Calendar.HOUR_OF_DAY)
        val mMin = c.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(
            txtTime.context,
            TimePickerDialog.OnTimeSetListener { _, hourOfDay, minute ->
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
                val mTime = "$mHourOfDay:$minute $format"
                val mdate = dialogDisplayTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))

            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }

}


/**
 * check internet before calling api, show retry toast or image.
 * validation on checkin checkout dialogbox
 */
