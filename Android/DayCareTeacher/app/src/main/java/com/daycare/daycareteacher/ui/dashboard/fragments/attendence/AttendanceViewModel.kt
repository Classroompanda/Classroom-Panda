package com.daycare.daycareteacher.ui.dashboard.fragments.attendence

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.app.DatePickerDialog.OnDateSetListener
import android.app.TimePickerDialog
import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.*
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.bumptech.glide.Glide
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.*
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.activities.StudentBreakInOutActivity
import com.daycare.daycareteacher.utill.*
import com.google.android.material.textfield.TextInputEditText
import me.drakeet.materialdialog.MaterialDialog
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

class AttendanceViewModel() : ViewModel() {

    val isLoading = MutableLiveData<Boolean>()

    val nodata = MutableLiveData<Boolean>()
    var hadBreakIn:Boolean?=false
    val guardianApiResponse = MutableLiveData<GuardianModel>()
    val attendenceApiResponse = MutableLiveData<AttendanceModel>()
    var selectedDate = MutableLiveData<String>()
    var mSelectedDate = getCurrentDateTime()
    val todaysDate = Calendar.getInstance().time!!
    val viewId = ATTENDANCE
    var mClassId = 0
    val breakStatusResponse = MutableLiveData<BreakData>()
    val breakEditStatusResponse = MutableLiveData<BreakData>()
    val addBreakFab = MutableLiveData<Boolean>()
    val editBreakFab = MutableLiveData<Boolean>()

    private var breakeditable = false
    val breakstatusFlag = ObservableField<Int>(OPEN_BREAK)

    val transferApiResponse = MutableLiveData<String>()

    val checkInApiResponse = MutableLiveData<Boolean>()
    val checkOutApiResponse = MutableLiveData<Boolean>()
    val absentApiResponse = MutableLiveData<Boolean>()

    val successTransfer=MutableLiveData<SampleID>()

    fun onClickAddBreakFab(view: View) {
        addBreakFab.value = true
    }

    fun onClickEditBreakFab(view: View) {
        editBreakFab.value = true
    }


    fun checkBreakStatus(): Boolean {
        hadBreakIn = false
        if (AppInstance.breakData!!.data?.size!! > 0) {
            for (pos in 0 until AppInstance.breakData!!.data!!.size) {
                if (AppInstance.breakData!!.data!![pos].breakStatusId == 1) {
                    hadBreakIn = true
                    break
                }
            }
        }
        return hadBreakIn!!
        // return false
    }

    fun breakOutStudentSave(
        view: View,
        reason: String,
        breakpickedById: Int
    ) {
        val intent = Intent()
        val dialogBinding = DataBindingUtil.findBinding<BreakinOutConfirmationBinding>(view)

        if (dialogBinding != null) {
            if (dialogBinding.edtBreakOut.text.toString() != "") {
                var dateTime = getCurrentDate()+" " +dialogBinding.edtBreakOut.text.toString()
                /* breakoutTime = convertDate(
                     dialogBinding.edtBreakOut.text.toString(),
                     dialogDisplayTime,
                     serverDate
                 )*/

                breakoutTime=  convertDate(dateTime,
                    SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()),
                    alohaDate)

                isLoading.value = true

                val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)
                val body = StudentBreakData()
                val manager = NetworkManager()
                body.studentID = Attendancedata?.studentID
                body.agencyID = Attendancedata?.agencyID
                body.approvedPickupById = breakpickedById
                body.pickupById = breakpickedById
                body.attendanceDate = getCurrentUTC() //Attendancedata?.attendanceDate!!
                body.breakStatusId = 1
                body.classAttendenceID = Attendancedata?.id
                body.id = 0
                body.attendenceStatusID = Attendancedata?.attendenceStatusID
                body.breakOutTime = breakoutTime
                body.breakReason = reason

                AppInstance.breakReason = reason

                body.createdBy = AppInstance.getUser(view.context)?.loginUserID

                manager.createApiRequest(
                    ApiUtilis.getAPIService(view.context).setBreakData(body),
                    object :
                        ServiceListener<BaseModel> {
                        @SuppressLint("LogNotTimber")
                        override fun getServerResponse(response: BaseModel, requestcode: Int) {

                            if (response.statusCode == ResponseCodes.Success) {
                                isLoading.value = false
                                AppInstance.studentBreakData = StudentBreakData()
                                AppInstance.studentBreakData!!.id = response.saveId
                                AppInstance.studentBreakData!!.studentID = body.studentID
                                AppInstance.studentBreakData!!.agencyID = body.agencyID
                                AppInstance.studentBreakData!!.approvedPickupById = body.approvedPickupById
                                AppInstance.studentBreakData!!.pickupById = body.pickupById
                                AppInstance.studentBreakData!!.attendanceDate = body.attendanceDate

                                AppInstance.studentBreakData!!.breakStatusId = body.breakStatusId
                                AppInstance.studentBreakData!!.classAttendenceID = body.classAttendenceID
                                AppInstance.studentBreakData!!.attendenceStatusID = body.attendenceStatusID
                                AppInstance.studentBreakData!!.breakOutTime = body.breakOutTime
                                AppInstance.studentBreakData!!.breakReason = body.breakReason

                                intent.putExtra(STUDENT_BREAK_DATA, AppInstance.studentBreakData)

                                (view.context as Activity).setResult(Activity.RESULT_OK, intent)
                                (view.context as Activity).finish()
                            } else {
                                isLoading.value = false
                                Log.i(
                                    "Error Checkin",
                                    response.statusCode.toString() + response.message
                                )
                            }
                            if (breakeditable) {
                                isLoading.value = false
                                showToast(view.context, "Details Updated Successfully!!")
                            } else {
                                isLoading.value = false
                                showToast(view.context, response.message.toString())
                            }

                        }

                        @SuppressLint("LogNotTimber")
                        override fun getError(error: ErrorModel, requestcode: Int) {
                            isLoading.value = false
                            Log.e("Error", error.error_message)
                        }
                    })
            }
        }
    }


    //TODO: BreakIn Save
    fun breakInStudentSave(
        view: View,
        reason: String,
        breakpickedById: Int,
        breakdroppedById: Int

    ) {
        val intent = Intent()
        val dialogBinding = DataBindingUtil.findBinding<EditBreakinOutConfirmationBinding>(view)

        val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)

        AppInstance.studentBreakData?.approvedPickupById = breakpickedById
        //AppInstance.studentBreakData?.pickupById = breakpickedById
        AppInstance.studentBreakData?.dropedById = breakdroppedById

        if (dialogBinding?.edtBreakOut!!.text.toString() != "") {

            var dateTime = getCurrentDate()+" " +dialogBinding.edtBreakOut.text.toString()
            /* breakoutTime = convertDate(
                 dialogBinding.edtBreakOut.text.toString(),
                 dialogDisplayTime,
                 serverDate
             )*/

            breakoutTime=  convertDate(dateTime,
                SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()),
                alohaDate)
            AppInstance.studentBreakData?.breakOutTime = breakoutTime
        }


        if (dialogBinding?.edtBreakIn!!.text.toString() != "") {

            breakinTime = convertDate(getCurrentDate()+" " +dialogBinding.edtBreakIn.text.toString(),
                SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()),
                alohaDate)

            AppInstance.studentBreakData?.breakInTime = breakinTime
        }

        isLoading.value = true
        val body = StudentBreakData()
        val manager = NetworkManager()
        body.studentID = Attendancedata?.studentID
        body.agencyID = Attendancedata?.agencyID
        body.approvedPickupById = AppInstance.studentBreakData?.pickupById
        body.pickupById = AppInstance.studentBreakData?.pickupById
        body.dropedById = AppInstance.studentBreakData?.dropedById

        body.attendanceDate = getCurrentUTC() // Attendancedata?.attendanceDate

        body.classAttendenceID = Attendancedata?.id
        body.id = AppInstance.studentBreakData?.id
        body.attendenceStatusID = Attendancedata?.attendenceStatusID
        body.breakStatusId = 2
        body.breakInTime =  breakinTime//AppInstance.studentBreakData?.breakInTime
        if(breakoutTime.toString().isNotEmpty()&&breakoutTime.toString().isNotBlank()){
            body.breakOutTime = breakoutTime// AppInstance.studentBreakData?.breakOutTime}
        }  else{
            // body.breakOutTime= ""
        }
        body.updatedBy = AppInstance.getUser(view.context)?.loginUserID

        AppInstance.studentBreakData?.breakInTime = body.breakInTime

        AppInstance.studentBreakData?.breakStatusId = body.breakStatusId
        body.createdBy = AppInstance.getUser(view.context)?.loginUserID
        body.breakReason = AppInstance.studentBreakData?.breakReason //AppInstance.breakReason //reason
        body.pickupByOtherName =""
        body.dropedByOtherNames=""
        body.approvedDropedById=0
        body.pickupByOtherId=0
        AppInstance.studentBreakData?.pickupById
        AppInstance.studentBreakData?.breakReason = body.breakReason
        intent.putExtra(STUDENT_BREAK_DATA, AppInstance.studentBreakData)

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setBreakData(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false

                    AppInstance.breakPosition = breakposition
                    showToast(view.context, "Details Updated Successfully!!")
                    (view.context as Activity).setResult(Activity.RESULT_OK, intent)
                    (view.context as Activity).finish()

                    Log.i("Response Checkin :", response.message.toString())
//                    AppInstance.trackingHistory = response
                } else {
                    isLoading.value = false
                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                if (editable) {


                } else {
                    isLoading.value = false
                    showToast(view.context, response.message.toString())
                }

            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    fun onBreakInRedirectPage(view: Context , attendanceData: AttendanceData,position: Int) {
        onBreakInRedirect(view, "1",attendanceData,position)
    }

    fun onBreakInRedirect(context: Context, check: String, attendanceData: AttendanceData,pos: Int) {
        // getOperationalClassData()
        var loader = Loader()
        if (check.equals("2")) {
            position = AppInstance.breakParentPosition!!
        }

        if (attendanceData?.attendenceStatusID == 2 || attendanceData?.attendenceStatusID == 5) {
            showToast(context, "Please mark the attendance for Break In")
        }else if(attendanceData?.onLeave==true) {
            showToast(context, "Please mark the attendance for Break In")
        } else {
            loader.startLoader(context)
//            isLoading.value = true
            val body = BreakData()
            val manager = NetworkManager()
            body.agencyID = AppInstance.getUser(context)?.agencyID //requestData.agencyID
            body.studentID =attendanceData?.studentID.toString()
            body.classAttendenceID = attendanceData?.id.toString()
            this.position = pos

            manager.createApiRequest(
                ApiUtilis.getAPIService(context).getStudentBreakStatus(body),
                object :
                    ServiceListener<BreakData> {
                    @SuppressLint("LogNotTimber")
                    override fun getServerResponse(response: BreakData, requestcode: Int) {
                        if (response.statusCode == ResponseCodes.Success) {
                            isLoading.value = false
                            AppInstance.breakData = response
                            breakStatusResponse.value = response
                            val intent = Intent(context, StudentBreakInOutActivity::class.java)
                            intent.putExtra("POSITION", pos.toString())
                            intent.putExtra("SelectedDate", mSelectedDate)
                            context.startActivity(intent)
                        }
                        loader.stopLoader()
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        showToast(context, "Check Internet Connection")
                        loader.stopLoader()
                    }
                })
        }
    }

    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
        val mDatePicker: DatePickerDialog

        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)

        val currentDate = Calendar.getInstance()
        val mCurrentYear = currentDate.get(Calendar.YEAR)
        val mCurrentMonth = currentDate.get(Calendar.MONTH)
        val mCurrentDay = currentDate.get(Calendar.DAY_OF_MONTH)

        var mCurrentTime :String = c.time.toString().substring(11,20)

        var mDate: String

        mDatePicker =
            DatePickerDialog(view.context, OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() + "-" + day + "-" + year

                try {
                    val d = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault()).parse(mDate)

                    var newDate = SimpleDateFormat(
                        "yyyy-MM-dd HH:mm:ss",
                        Locale.getDefault()
                    ).format(d)

                    val dayOfWeek= SimpleDateFormat(
                        "EEE",
                        Locale.getDefault()
                    ).format(d)

                    val month = SimpleDateFormat(
                        "MMMM",
                        Locale.getDefault()
                    ).format(d)

                    binding!!.dateTxt.text = day.toString()
                    binding.weekDayTxt.text = dayOfWeek.toString()
                    binding.monthYrTxt.text = month

                    selectedDate.value = mDate
                    mSelectedDate = mDate

                    /*  if (mDate.equals(mcurrentDate)){
                          getOperationalClassData(view, mDate)
                      } else {
                          getClassData(view) // not in ios
                      }*/

                    if(newDate.contains("00:00:00")){
                        //newDate=  newDate.toString().replace("00:00:00",mCurrentTime)

                        newDate =   getCurrentUTC()?.let {
                            newDate.toString().replace("00:00:00",
                                it.substringAfter("T"))
                        }.toString()

                    }

                    mSelectedDate = newDate  // added this to test

                    getOperationalClassData(view, newDate) //newDate)//mDate)

                    //  getAttendanceData(getServerDate(mSelectedDate), mClassId, view)
                    AppInstance.selectedDate =  day.toString() +" "+ month.toString()
                } catch (e: ParseException) {
                    e.printStackTrace()
                }
            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis

        mDatePicker.show()
    }

    // Api Call for Class Name Dropdown
    fun getOperationalClassData(view: View, date: String) {
        isLoading.value = true
        val body = OperationalClassRequestData()
        val manager = NetworkManager()

        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)

        /* if(date.contains("Z")){
             body.askedDateString = date+".000Z"
         }else{
           //  body.askedDateString = date
         }*/

        body.askedDateString =  date.replace(date.substringAfter(" "),mCurrentTime).trim()

        var serverDate = getServerDate(body.askedDateString.toString())//getServerDate(date)

        if(serverDate.contains("Z")){
            body.askingDate  =serverDate
        }else{
            body.askingDate = serverDate+".000Z"
        }

        //date.replace(" ","T")


        var postServerDateWithTime = body.askingDate

        body.teacherID = AppInstance.getUser(view.context)?.releventUserID
        body.teacherDailyAttendenceID = AppInstance.getUser(view.context)?.teacherTodayAttendenceId

        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).getOperationalClasses(body),
            object :
                ServiceListener<OperationalClassModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: OperationalClassModel, requestcode: Int) {
                    isLoading.value = false
                    if (response.statusCode == ResponseCodes.Success) {
                        val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                        Log.i("Response GetClass >> ", response.message.toString())
                        val niceSpinner = binding?.classSpinner

                        if (response.data != null && response.data.isNotEmpty()) {
                            val data: MutableList<String> = mutableListOf()
                            data.clear()

                            for (pos in 0 until response.data.size) {
                                response.data[pos].label?.let {
                                        it1 -> data.add(it1)
                                }
                            }
                            val dataset = LinkedList(data)
                            niceSpinner?.attachDataSource(dataset)

                            try {
                                mClassId = response.data[position].value!!
                            }catch (ex:Exception){
                                ex.printStackTrace()
                            }


                            var selectedPOS: Int = 0
                            for (indexpos in 0 until dataset.size) {
                                try {
                                    if (dataset[indexpos].equals(AppInstance.getTeacherInfo(view.context)?.data!![0].label)) {
                                        selectedPOS = indexpos
                                        mClassId = AppInstance.getTeacherInfo(view.context)?.data!![0].value!!
                                        break
                                    }
                                } catch (e: Exception) {
                                    e.printStackTrace()
                                }
                            }

                            niceSpinner?.selectedIndex = selectedPOS

                            niceSpinner?.setOnItemSelectedListener(object :
                                AdapterView.OnItemSelectedListener {
                                override fun onItemSelected(
                                    parent: AdapterView<*>,
                                    view: View,
                                    position: Int,
                                    id: Long
                                ) {
                                    // isLoading.value = true
                                    mClassId = response.data[position].value!!
                                    if (mSelectedDate != null) {
                                        if(mSelectedDate.toString().contains("Z")){
                                            getAttendanceData(
                                                mSelectedDate,
                                                mClassId,
                                                view
                                            )
                                        }else{
                                            getAttendanceData(
                                                mSelectedDate,
                                                mClassId,
                                                view
                                            )
                                        }

                                    }
                                }

                                override fun onNothingSelected(parent: AdapterView<*>) {

                                    mSelectedDate?.let { getAttendanceData(it, mClassId, view) }

                                }
                            })

                            if (AppInstance.getTeacherInfo(view.context)?.data != null) {
                                try {
                                    // postServerDateWithTime?.let { getAttendanceData(it, mClassId, view) }
                                    mSelectedDate?.let { getAttendanceData(it, mClassId, view) }
                                } catch (e: Exception) {
                                    e.printStackTrace()
                                }
                            }

                        } else {
                            showToast(view.context, "No Data Found!!")
                            nodata.postValue(true)
                        }
                    } else {
                        isLoading.value = false
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showToast(view.context, "Check Internet Connection")
                    isLoading.value = false
                }
            })

    }

/*
    fun getClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {
                //   classApiResponse.value = response
                isLoading.value = false

                AppInstance.allClasses = response
                if (response.statusCode == ResponseCodes.Success) {
                    val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data != null && response.data.isNotEmpty()) {
                        val niceSpinner = binding?.classSpinner
                        niceSpinner?.invalidate()

                        val data: MutableList<String> = mutableListOf()
                        data.clear()

                        for (pos in 0 until response.data.size) {
                            response.data[pos].className?.let { it1 -> data.add(it1) }
                        }
                        val dataset = LinkedList(data)
                        niceSpinner?.attachDataSource(dataset)

                        var selectedPOS: Int = 0
                        for (indexpos in 0 until dataset.size) {
                            try {
                                if (dataset[indexpos].equals(AppInstance.getTeacherInfo(view.context)?.data!![0].label)) {
                                    selectedPOS = indexpos
                                    mClassId =
                                        AppInstance.getTeacherInfo(view.context)?.data!![0].value!!
                                    // mClassId=3
                                    break
                                }
                            } catch (e: Exception) {
                                e.printStackTrace()
                            }
                        }
                        niceSpinner!!.selectedIndex = selectedPOS

                        niceSpinner?.setOnItemSelectedListener(object :
                            AdapterView.OnItemSelectedListener {
                            override fun onItemSelected(
                                parent: AdapterView<*>,
                                view: View,
                                position: Int,
                                id: Long
                            ) {
                                // isLoading.value = true
                                mClassId = response.data[position].classesID!!
                                getAttendanceData(
                                    getServerDate(mSelectedDate),
                                    mClassId,
                                    view
                                )
                            }

                            override fun onNothingSelected(parent: AdapterView<*>) {}
                        })
                    } else {
                        showToast(view.context, "No Data Found!!")
                    }

                    if (AppInstance.getTeacherInfo(view.context)?.data != null) {
                        try {
                            mClassId = AppInstance.getTeacherInfo(view.context)?.data!!.get(0).value!!
                            getAttendanceData(getServerDate(mSelectedDate), mClassId, view)
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                    }

                } else {
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                isLoading.value = false
            }
        })
    }
*/

    private fun getAttendanceData(date: String, id: Int?, view: View) {
        isLoading.value = true

        val body = AttendanceData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        body.classID = id

        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)

        if (date.contains("T"))
            body.askedDateString = date.replace(date.substringAfter("T"),mCurrentTime) //date
        else
            body.askedDateString = date
        // body.askedDate = date


        /*  if( body.askedDateString.toString().contains("T")){
              body.askedDate = convertUtcToLocal(
                  body.askedDateString.toString(),
                  alohaDate,
                  serverDate
              )
          }else{
              body.askedDate = convertUtcToLocal(
                  body.askedDateString.toString(),
                  reservationDate,
                  serverDate
              )
          }*/

        body.askedDate = getServerDate(body.askedDateString.toString())

        if ( body.askedDate.toString().contains("Z"))
            body.askedDate = body.askedDate
        else
            body.askedDate = body.askedDate+".000Z"

        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).getClassAttendence(body),
            object :
                ServiceListener<AttendanceModel> {
                override fun getServerResponse(response: AttendanceModel, requestcode: Int) {
                    isLoading.value = false
                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.allAttendanceData = response
                        attendenceApiResponse.value = response
                        Log.i("Response GetAttendence=", response.message.toString())
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
    }

    /**
     * Adapter methods
     */
    constructor(childData: AttendanceData, position: Int) : this() {
        this.data = childData
        imgUrl.set(data.imagePath)
        studentName.set(data.studentName)
        if (data.attendenceStatusID == IS_CHECKED_IN && data.breakStatusId == 1) {
            statusFlag.set(IS_ON_BREAK)
            data.attendenceStatusID = IS_ON_BREAK

        } else {
            statusFlag.set(data.attendenceStatusID)

        }
        this.position = position
    }

    constructor(breakData: StudentBreakData, positionbreak: Int, flag: String, contextView: View) : this() {
        this.breakdata = breakData
        this.breakposition = positionbreak
        when {
            breakData.breakStatusId == 1 -> breakstatusFlag.set(BREAK_IN_STATUS)
            breakData.breakStatusId == 2 -> breakstatusFlag.set(BREAK_OUT_STATUS)
            else -> breakstatusFlag.set(OPEN_BREAK)
        }
    }

    val imgUrl = ObservableField<String>("")
    private lateinit var data: AttendanceData
    private lateinit var breakdata: StudentBreakData

    val statusFlag = ObservableField<Int>(IS_TO_BE_CHECKED)
    val studentName = ObservableField<String>("")

    private var droppedById = 0
    private var pickedById = 0
    private var breakoutTime = ""
    private var breakinTime = ""
    private var selectedLeaveReasonId = 0
    private var editable = false
    private var undo = false
    private lateinit var iLoaderCallback: ILoaderCallback
    var position: Int = 0
    var breakposition: Int = 0
    private var settime = getServerDate(getCurrentDateTime())

    fun onClickCheckIn(context: Context, attendanceData: AttendanceData,position: Int) {
        editable = false
        iLoaderCallback.startLoader(true)
        getGuardiansData(context, attendanceData,position)
    }

    fun onClickCheckOut(context: Context, attendanceData: AttendanceData,position: Int) {
        editable = false
        iLoaderCallback.startLoader(true)
        getGuardiansData(context, attendanceData,position)
    }

    fun onClickAbsent(context: Context, attendanceData: AttendanceData,position: Int) {
        if (attendanceData.attendenceStatusID != IS_CHECKED_ABSENT) {  //    Already Absent
            editable = false
            undo = false
            // iLoaderCallback.startLoader(true)
            getLeaveReasonData(context, attendanceData,position)
            // showAbsentDialog(view)
        }else if(attendanceData.attendenceStatusID == IS_CHECKED_ABSENT){
            editable = true
            undo = true
            getLeaveReasonData(context, attendanceData,position)
        }
    }

    fun onClickEditBtn(view: Context, attendanceData: AttendanceData,position: Int) {
        editable = true
        iLoaderCallback.startLoader(true)
        when {
            attendanceData.attendenceStatusID== IS_CHECKED_IN
                    || attendanceData.attendenceStatusID== IS_ON_BREAK ->
                getGuardiansData(view, attendanceData,position)
            attendanceData.attendenceStatusID == IS_CHECKED_OUT -> getGuardiansData(view, attendanceData,position)

            attendanceData.attendenceStatusID == IS_CHECKED_ABSENT ->  getLeaveReasonData(view, attendanceData,position)
        }
    }

    private fun showAbsentDialog(view: Context, data: AttendanceData, allLeaveReasons: LeaveReasonModel,position: Int) {
        iLoaderCallback.startLoader(false)
        //                                               val response = AppInstance.allLeaveReasons
        val mMaterialDialog = MaterialDialog(view)
        val dialogView = LayoutInflater.from(view)
            .inflate(R.layout.absent_confirmation, null)

        var  btnCCancel  = dialogView.findViewById(R.id.btnCCancel) as Button
        var spinner5 = dialogView.findViewById(R.id.spinner5) as Spinner
        var txtDate = dialogView.findViewById(R.id.txtDate) as TextView
        var txtTime  = dialogView.findViewById(R.id.txtTime) as TextView
        var undoCheckBox = dialogView.findViewById(R.id.undoCheckBox) as CheckBox
        var absBtnSave = dialogView.findViewById(R.id.absBtnSave) as Button
        var absentComment = dialogView.findViewById(R.id.absentComment) as EditText

        var txtName = dialogView.findViewById(R.id.txtName) as TextView
        var childImg = dialogView.findViewById(R.id.childImg) as ImageView

        Glide.with(view)
            .load(data?.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(childImg.context))
            .into(childImg)

        txtName.text = data?.studentName

        var day=   formatDateToWeekDay(data.attendanceDate!!)   // 12-09-2020 4:03:00 am
        var datemonth = formatDateToMonth(data.attendanceDate!!)
        var year = formatDateToYear(data.attendanceDate!!)

        txtDate.text = day + " " + datemonth +" " + year
        val time: String? = data?.attendanceDate?.let {
            getCurrentTime()
        }
        txtTime.text = time

        if (editable) {
            undoCheckBox.visibility = View.VISIBLE
            absentComment.setText(data.onLeaveComment.toString())
        }else{
            undoCheckBox.visibility = View.INVISIBLE
        }

        setLeaveReasonSpinnerData(spinner5,allLeaveReasons, view)

        btnCCancel?.setOnClickListener {
            iLoaderCallback.startLoader(false)
            mMaterialDialog.dismiss()
        }

        absBtnSave.setOnClickListener {
            if (undoCheckBox.isChecked) {
                undo = true
            }
            btnCCancel.visibility = View.INVISIBLE
            absBtnSave.visibility = View.INVISIBLE

            AppInstance.allAttendanceData?.data?.get(position)?.reasonId = selectedLeaveReasonId
            AppInstance.allAttendanceData?.data?.get(position)?.onLeaveComment =
                absentComment.text.toString()

            checkAbsentStudent(view, mMaterialDialog, absentComment, data,position)
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()

    }

    private fun checkAbsentStudent(
        view: Context,
        mMaterialDialog: MaterialDialog,
        absentComment: EditText,
        data: AttendanceData,
        position: Int
    ) {
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = data?.className
        body.studentID = data?.studentID
        body.agencyID = data?.agencyID
        body.isEditModeOn = editable
        body.classID = data?.classesID
        body.classesID = data?.classesID
        body.id = data?.id

        body.attendanceDate = data?.attendanceDate!!

        body.attendenceStatusID = IS_CHECKED_ABSENT
        body.onLeave = true
        body.onLeaveComment = data?.onLeaveComment
        body.reasonId = data?.reasonId
        body.createdBy = null
        body.updatedBy = AppInstance.getUser(view)?.loginUserID

        if (undo) {
            body.onLeaveComment = ""
            body.attendenceStatusID = IS_TO_BE_CHECKED
            body.onLeave = false
        }

        manager.createApiRequest(ApiUtilis.getAPIService(view).setAttendenceAbsent(body), object :
            ServiceListener<AttendanceResponse> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    statusFlag.set(IS_CHECKED_ABSENT)
                    AppInstance.allAttendanceData?.data?.get(position)?.id = response.saveId

                    data.attendenceStatusID = IS_CHECKED_ABSENT

                    if (undo) {
                        statusFlag.set(IS_TO_BE_CHECKED)
                        data.attendenceStatusID = IS_TO_BE_CHECKED
                        AppInstance.allAttendanceData?.data?.get(position)?.onLeaveComment = ""
                    }
                    absentApiResponse.postValue(true)
                    mMaterialDialog.dismiss()
                    Log.i("Response Checkin :", response.message.toString())
                } else {
                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                if (editable) {
                    showToast(view, "Details Updated Successfully!!")
                } else {
                    showToast(view, response.message.toString())
                }
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    private fun showCheckinDialog(context: Context, attendanceData: AttendanceData,position: Int) {
        val data = attendanceData
        iLoaderCallback.startLoader(false)
        data?.dropedById?.let { droppedById }
        data?.pickupById?.let { pickedById }
        val response = AppInstance.allGuardians
        val mMaterialDialog = MaterialDialog(context)
        val dialogView = LayoutInflater.from(context)
            .inflate(R.layout.checkin_confirmation, null)

        var txtDate = dialogView.findViewById(R.id.txtDate) as TextView
        var txtTime = dialogView.findViewById(R.id.txtTime) as TextView
        var btnCCancel = dialogView.findViewById(R.id.btnCCancel) as Button
        var editTime = dialogView.findViewById(R.id.editTime) as ImageButton
        var pickupTv = dialogView.findViewById(R.id.pickupTv) as TextView
        var pickupSpinner = dialogView.findViewById(R.id.pickupSpinner) as Spinner

        var dropoffSpinner = dialogView.findViewById(R.id.dropoffSpinner) as Spinner
        var btnCCheckin = dialogView.findViewById(R.id.btnCCheckin) as Button
        var spinKit = dialogView.findViewById(R.id.spin_kit) as ProgressBar

        var dropoffTv = dialogView.findViewById(R.id.dropoffTv) as TextView

        var childImg = dialogView.findViewById(R.id.childImg) as ImageView

        var textView5 = dialogView.findViewById(R.id.textView5) as TextView

        var day=   formatDateToWeekDay(data.attendanceDate!!)   // 12-09-2020 4:03:00 am
        var datemonth = formatDateToMonth(data.attendanceDate!!)
        var year = formatDateToYear(data.attendanceDate!!)

        txtDate.text = day + " " + datemonth +" " + year
        textView5.text = attendanceData.studentName

        Glide.with(context)
            .load(attendanceData.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(childImg.context))
            .into(childImg)

        val time: String? = data?.attendanceDate?.let { getDayName(it) + " " + SimpleDateFormat("hh:mm a").format(
            Date()
        ) }

        var hourmin = formatDateToHourMinutes(data.checkInTime!!)
        txtTime.text = hourmin//time

        btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        editTime.setOnClickListener {
            timepicker(context, txtTime)
        }
        when(attendanceData.attendenceStatusID){
            IS_TO_BE_CHECKED -> {
                pickupTv.visibility = View.GONE
                pickupSpinner.visibility = View.GONE

                setGuardianSpinnerData(dropoffSpinner, response, context, attendanceData)
                btnCCheckin.setOnClickListener {
                    btnCCancel.visibility = View.INVISIBLE
                    btnCCheckin.visibility = View.INVISIBLE
                    spinKit.visibility = View.VISIBLE
                    data.dropedById = droppedById
                    checkinStudent(context, mMaterialDialog, data)
                }
            }
            IS_CHECKED_IN -> {
                dropoffTv.visibility = View.GONE
                dropoffSpinner.visibility = View.GONE

                setGuardianDisableSpinnerData(dropoffSpinner, response, context,position)
                setGuardianSpinnerData(pickupSpinner, response, context, attendanceData)
                btnCCheckin.setOnClickListener {
                    btnCCancel.visibility = View.INVISIBLE
                    btnCCheckin.visibility = View.INVISIBLE
                    spinKit.visibility = View.VISIBLE
                    AppInstance.allAttendanceData?.data?.get(position)?.pickupById = pickedById
                    checkOutStudent(context, mMaterialDialog, attendanceData)
                }
            }
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showEditDialog(context: Context, attendanceData: AttendanceData,position: Int) {
        val data = attendanceData
        data?.dropedById?.let { droppedById }
        data?.pickupById?.let { pickedById }
        iLoaderCallback.startLoader(false)
        val response = AppInstance.allGuardians
        val mMaterialDialog = MaterialDialog(context)
        val dialogView = LayoutInflater.from(context)
            .inflate(
                R.layout.checkin_confirmation,
                null
            )

        val dialogBinding = CheckinConfirmationBinding.bind(dialogView)
        dialogBinding.viewModel = data
        var day=   formatDateToWeekDay(data.attendanceDate!!)   // 12-09-2020 4:03:00 am
        var datemonth = formatDateToMonth(data.attendanceDate!!)
        var year = formatDateToYear(data.attendanceDate!!)

        dialogBinding.txtDate.text = day + " " + datemonth +" " + year

        Glide.with(context)
            .load(attendanceData.imagePath)
            .placeholder(R.drawable.ic_placeholder)
            .transform(CircleTransform(dialogBinding.childImg.context))
            .into(dialogBinding.childImg)


        dialogBinding.textView5.text= attendanceData.studentName

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        dialogBinding.editTime.setOnClickListener {
            timepicker(context, dialogBinding.txtTime)
        }
        if (attendanceData.attendenceStatusID == IS_CHECKED_IN || attendanceData.attendenceStatusID  == IS_ON_BREAK) {

            var hourmin = formatDateToHourMinutes(data.checkInTime!!)
            dialogBinding.txtTime.text = hourmin

            dialogBinding.pickupTv.visibility = View.GONE
            dialogBinding.pickupSpinner.visibility = View.GONE

            setGuardianSpinnerData(dialogBinding.dropoffSpinner, response, context, attendanceData)
            dialogBinding.btnCCheckin.setOnClickListener {
                dialogBinding.btnCCancel.visibility = View.INVISIBLE
                dialogBinding.btnCCheckin.visibility = View.INVISIBLE
                dialogBinding.spinKit.visibility = View.VISIBLE
                AppInstance.allAttendanceData?.data?.get(position)?.dropedById = droppedById
                checkinStudent(context, mMaterialDialog, attendanceData)
            }
        } else if (attendanceData.attendenceStatusID == IS_CHECKED_OUT){//(statusFlag.get() == IS_CHECKED_OUT) {
            var time = formatDateToHourMinutes(data.checkOutTime!!)
            dialogBinding.txtTime.text = time

            dialogBinding.dropoffTv.isEnabled = false
            dialogBinding.dropoffSpinner.isEnabled = false

            setGuardianDisableSpinnerData(dialogBinding.dropoffSpinner, response, context,position)
            setGuardianSpinnerData(dialogBinding.pickupSpinner, response, context, attendanceData)
            for (pos in 0 until response?.data!!.size) {
                if (response.data[pos].guardianId == data?.pickupById) {
                    dialogBinding.pickupSpinner.setSelection(pos)
                }
            }
            dialogBinding.btnCCheckin.setOnClickListener {
                dialogBinding.btnCCancel.visibility = View.INVISIBLE
                dialogBinding.btnCCheckin.visibility = View.INVISIBLE
                dialogBinding.spinKit.visibility = View.VISIBLE
                AppInstance.allAttendanceData?.data?.get(position)?.pickupById = pickedById
                checkOutStudent(context, mMaterialDialog, attendanceData)
            }
        } else {
            val time: String? = data?.attendanceDate?.let { /*getDayName(it) + " " +*/ getCurrentTime() }
            dialogBinding.txtTime.text = time
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun setGuardianDisableSpinnerData(
        spinner: Spinner,
        response: GuardianModel?,
        context: Context,
        position: Int
    ) {
        val dropid = AppInstance.allAttendanceData?.data?.get(position)?.dropedById
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
            for (pos in 0 until response.data.size) {
                response.data[pos].guardianName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context, android.R.layout.simple_list_item_1, data
            )
            for (pos in 0 until response.data.size) {
                if (response.data[pos].guardianId == dropid) {
                    spinner.setSelection(pos)
                }
            }
        } else {
            showToast(context, "No Data Found!!")
        }
    }

    private fun setGuardianSpinnerData(
        spinner: Spinner,
        response: GuardianModel?,
        context: Context, attendanceData: AttendanceData
    ) {
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
            for (pos in 0 until response.data.size) {
                response.data[pos].guardianName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context, android.R.layout.simple_list_item_1, data
            )

            if (editable) {
                for (pos in 0 until response.data.size) {
                    if (response.data[pos].guardianId == AppInstance.allAttendanceData?.data?.get(
                            position
                        )?.dropedById) {
                        spinner.setSelection(pos)
                    }
                }
            }
            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View,
                    position: Int,
                    id: Long
                ) {
                    // isLoading.value = true
                    if (!editable) {
                        when {
                            attendanceData.attendenceStatusID == IS_TO_BE_CHECKED -> droppedById = response.data[position].guardianId!!
                            attendanceData.attendenceStatusID == IS_CHECKED_IN -> pickedById = response.data[position].guardianId!!

                        }
                    } else {
                        when {
                            attendanceData.attendenceStatusID == IS_CHECKED_IN -> droppedById = response.data[position].guardianId!!
                            attendanceData.attendenceStatusID == IS_CHECKED_OUT -> pickedById = response.data[position].guardianId!!
                        }
                    }
                }

                override fun onNothingSelected(parent: AdapterView<*>) {
//                    showToast(context, "Please Select Guardian")
                }
            }

        } else {
            showToast(context, "No Data Found!!")
        }
    }

    private fun setLeaveReasonSpinnerData(
        spinner: Spinner,
        response: LeaveReasonModel?,
        context: Context
    ) {
        val leaveReasonId = AppInstance.allAttendanceData?.data?.get(position)?.reasonId
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
            for (pos in 0 until response.data.size) {
                response.data[pos].leaveReasonTypeName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context, android.R.layout.simple_list_item_1, data
            )
            if (editable) {
                for (pos in 0 until response.data.size) {
                    if (response.data[pos].leaveReasonTypeID == leaveReasonId) {
                        spinner.setSelection(pos)
                    }
                }
            }
            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View,
                    position: Int,
                    id: Long
                ) {
                    if (statusFlag.get() == IS_TO_BE_CHECKED) {
                        selectedLeaveReasonId = response.data[position].leaveReasonTypeID!!
                    }
                }

                override fun onNothingSelected(parent: AdapterView<*>) {
//                    showToast(context, "Please Select Guardian")
                }
            }

        } else {
            showToast(context, "No Data Found!!")
        }
    }

    private fun checkOutStudent(
        context: Context,
        mMaterialDialog: MaterialDialog,
        attendanceData: AttendanceData,
    ) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = attendanceData?.className
        body.studentID = attendanceData?.studentID
        body.agencyID = attendanceData?.agencyID
//        if (!editable) {
        body.checkOutTime = settime //2000-12-31T20:30:28.000Z
//        }
        body.isEditModeOn = true
//        body.isEditModeOn = editable
        body.classID = attendanceData?.classesID
        body.classesID = attendanceData?.classesID
        body.id = attendanceData?.id
        body.pickupById = attendanceData?.pickupById

        Log.d("date","--" + attendanceData?.attendanceDate!!)

        if(attendanceData?.attendanceDate!!.contains("Z") || attendanceData?.attendanceDate!!.contains("T")){
            body.attendanceDate = attendanceData?.attendanceDate

        }else{
            body.attendanceDate = getServerDate(attendanceData?.attendanceDate!!)
        }

        body.date = body.attendanceDate
        body.attendenceStatusID = IS_CHECKED_OUT
        body.updatedBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(
            ApiUtilis.getAPIService(context).setAttendenceCheckout(body),
            object :
                ServiceListener<AttendanceResponse> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        statusFlag.set(IS_CHECKED_OUT)            // onSuccess

                        AppInstance.allAttendanceData?.data?.get(position)?.checkOutTime = settime

                        attendanceData.attendenceStatusID = IS_CHECKED_OUT

                        checkOutApiResponse.postValue(true)
                    } else {
                        Log.i("Error Checkout", response.statusCode.toString() + response.message)
                    }
                    if (editable) {
                        showToast(context, "Details Updated Successfully!!")
                        mMaterialDialog.dismiss()
                    } else {
                        showToast(context, response.message.toString())
                        mMaterialDialog.dismiss()
                        if (attendanceData != null) {
                            openDailySheetMailDialog(context, attendanceData)
                        }
                    }
                }

                @SuppressLint("LogNotTimber")
                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                }
            })
    }

    private fun openDailySheetMailDialog(context: Context, data: AttendanceData) {
        val data =data

        iLoaderCallback.startLoader(false)
        val response = AppInstance.allGuardians
        val mMaterialDialog = MaterialDialog(context)
        val dialogView = LayoutInflater.from(context)
            .inflate(
                R.layout.email_popup,
                null
            )
        val dialogBinding = EmailPopupBinding.bind(dialogView)

        dialogBinding.btnSend.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnSend.visibility = View.INVISIBLE
            dialogBinding.spinKit.visibility = View.VISIBLE
            val body = SendDailySheetRequest()
            val manager = NetworkManager()

            body.studentID = data?.studentID
            body.agencyID = data?.agencyID
            body.classID=data?.classesID
            body.parentID=AppInstance.getUser(context)?.loginUserID
            body.askedDate =  getServerDate(mSelectedDate)
            body.askedDateString = convertUtcToLocal(body.askedDate, alohaDate, reservationDate)

            manager.createApiRequest(
                ApiUtilis.getAPIService(context).sendDailySheetEmail(body),
                object :
                    ServiceListener<SendDailySheetRequest> {
                    @SuppressLint("LogNotTimber")
                    override fun getServerResponse(
                        response: SendDailySheetRequest,
                        requestcode: Int
                    ) {

                        if (response.statusCode == ResponseCodes.Success) {
                            showToast(context, "Email sent successfully.")
                        } else {
                            showToast(context, response.message!!)
                            Log.i(
                                "Error Checkin",
                                response.statusCode.toString() + response.message
                            )
                        }
                        mMaterialDialog.dismiss()
                    }

                    @SuppressLint("LogNotTimber")
                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                    }
                })
        }

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun checkinStudent(
        context: Context,
        mMaterialDialog: MaterialDialog,
        attendanceData: AttendanceData
    ) {
        val data =attendanceData
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = data?.className
        body.studentID = data?.studentID
        body.agencyID  = data?.agencyID
        /* if(data.checkInTime.equals("0001-01-01T00:00:00")){
             body.checkInTime = data.attendanceDate
         }else{
             body.checkInTime = data?.checkInTime//data.attendanceDate
         }*/

        body.checkInTime = data.attendanceDate+".000Z"//getServerDateWithMilliSecond(mSelectedDate) //data?.checkInTime //settime
        //body.isEditModeOn = editable
        body.classID = data?.classesID
        body.classesID = data?.classesID
        body.id = data?.id
        body.dropedById = data?.dropedById

        /*  if(!settime.equals(data.attendanceDate)){     // priiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
              // settime = getServerDate(mSelectedDate)
              body.attendanceDate = mSelectedDate
              body.date = mSelectedDate
          }else{
              body.attendanceDate = settime
              body.date = settime
          }*/

        /*if(data.checkInTime.equals("0001-01-01T00:00:00")){
            body.attendanceDate = data.attendanceDate
        }else{
            body.attendanceDate = data?.checkInTime//data.attendanceDate
        }*/

        body.isEditModeOn = data.id!!>0

        body.attendanceDate =  data.attendanceDate+".000Z" //getServerDateWithMilliSecond(mSelectedDate) //data?.checkInTime//data.attendanceDate
        body.date =  data.attendanceDate+".000Z"//getServerDateWithMilliSecond(mSelectedDate) // data.attendanceDate

        /* val IS_CHECKED_IN = 3
         val IS_CHECKED_OUT = 4
         val IS_CHECKED_ABSENT = 5
         val IS_TO_BE_CHECKED = 2*/
        Log.d("status Id"," attendance status id = " + data.attendenceStatusID)
        body.attendenceStatusID =IS_CHECKED_IN // data.attendenceStatusID
        body.updatedBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(
            ApiUtilis.getAPIService(context).setAttendenceCheckin(body),
            object :
                ServiceListener<AttendanceResponse> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        statusFlag.set(IS_CHECKED_IN)
                        attendanceData.attendenceStatusID = IS_CHECKED_IN
                        attendanceData.id = response.saveId
                        attendanceData.checkInTime = settime
                        checkInApiResponse.postValue(true)
                    } else {
                        Log.i("Error Checkin", response.statusCode.toString() + response.message)
                    }

                    if (editable) {
                        showToast(context, "Details Updated Successfully!!")
                    } else {
                        showToast(context, response.message.toString())
                    }

                    mMaterialDialog.dismiss()
                }

                @SuppressLint("LogNotTimber")
                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                }
            })
    }

    private fun getGuardiansData(context: Context, attendanceData: AttendanceData,position: Int) {

        val body = GuardianRequest()
        val manager = NetworkManager()
        val data = attendanceData
        body.agencyID = data?.agencyID
        body.studentID = data?.studentID
        body.classID = data?.classesID
        body.isAuthorized = true

        manager.createApiRequest(ApiUtilis.getAPIService(context).getGuardians(body), object :
            ServiceListener<GuardianModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: GuardianModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allGuardians = response

                    if (editable)
                        showEditDialog(context, attendanceData,position)
                    else if
                                 (!editable)
                        showCheckinDialog(context, attendanceData,position)
                } else {
                    Log.i("Error Checkout", response.statusCode.toString() + response.message)
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    fun getGuardiansDataSimple(context: Context, activityposition: Int) {
        isLoading.value = true
        val body = GuardianRequest()
        val manager = NetworkManager()
        val data = AppInstance.allAttendanceData?.data?.get(activityposition)
        body.agencyID = data?.agencyID
        body.studentID = data?.studentID
        body.classID = data?.classesID
        body.isAuthorized = true

        manager.createApiRequest(ApiUtilis.getAPIService(context).getGuardians(body), object :
            ServiceListener<GuardianModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: GuardianModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allGuardians = response
                    guardianApiResponse.value = response
                } else {
                    Log.i("Error Checkout", response.statusCode.toString() + response.message)
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }

    private fun getLeaveReasonData(context: Context, attendanceData: AttendanceData,position: Int) {
        isLoading.value = true
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.agencyID = attendanceData?.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getReasons(body), object :
            ServiceListener<LeaveReasonModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: LeaveReasonModel, requestcode: Int) {
                isLoading.value = false
                if (response.statusCode == ResponseCodes.Success) {
                    //AppInstance.allLeaveReasons = response
                    Log.i("Response GetAttendence=", response.message.toString())
                    showAbsentDialog(context, attendanceData,response,position)
                } else {
                    // val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
                    //  absentBtn.isChecked = false
                    Log.i("Error Checkout", response.statusCode.toString() + response.message)
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }

    fun setLoader(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    private fun timepicker(context: Context, txtTime: TextView) {

        val data = AppInstance.allAttendanceData?.data?.get(position)
        val c = Calendar.getInstance()
        val mHour = c.get(Calendar.HOUR_OF_DAY)
        val mMin = c.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(
            context,
            TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                var mHourOfDay = hourOfDay
                val mTime = String.format("%02d", mHourOfDay) + ":" + String.format(
                    "%02d",
                    minute
                ) + " " //+ " " + format + " "
                val mdate = parseTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))
                val time = SimpleDateFormat("HH:mm ", Locale.getDefault()).format(mdate)
                settime = getServerDate(
                    yearDateFormat.format(
                        displayDate.parse(data?.attendanceDate)
                    ) + " " + time
                )
            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }

    fun breaktimepicker(view: View, txtTime: TextInputEditText) {
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
                txtTime.setText(dialogDisplayTime.format(mdate))

            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }
}
