package com.daycare.daycareteacher.ui.dashboard.fragments.dashboard

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.TimePickerDialog
import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.danylovolokh.androidlogger.AndroidLogger
import com.daycare.daycareteacher.DaycareTeacherApp
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.EditCheckinOutTimeBinding
import com.daycare.daycareteacher.databinding.FragmentHomeBinding
import com.daycare.daycareteacher.interfaces.IFragmentCallback
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.fragments.allergy.AllergyFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareteacher.utill.*
import com.google.android.material.textfield.TextInputEditText
import me.drakeet.materialdialog.MaterialDialog
import java.io.File
import java.io.IOException
import java.util.*


class HomeViewModel() : ViewModel() {

    var className = ObservableField<String>("")
    var startTime = ObservableField<String>("")
    var endTime = ObservableField<String>("")
    val isLoading = MutableLiveData<Boolean>()
    val classLogApiResponse = MutableLiveData<TeacherClassLogModel>()
    val apiCheckResponse = MutableLiveData<Boolean>()

    val clockInClockOutAPIResponse = MutableLiveData<BaseModel>()
    val teacherBreakAPIResponse = MutableLiveData<TeacherBreakModel>()
    val teacherClassCheckInAPIResponse = MutableLiveData<TeacherClassCheckInModel>()
    val unreadMessageResponse = MutableLiveData<UnReadMessageResponse>()

    private var checkInEditTime = ""
    private var checkOutEditTime = ""

    var mSelectedDate = getCurrentUTC()//postserverDate.format(Date())
    private lateinit var iLoaderCallback: ILoaderCallback
    var position: Int = 0

    fun getUnReadCount(view: Context) {
        val info = TeacherChatList()
        isLoading.value = false
        info.ReceiverUserID = AppInstance.getUser(view)?.loginUserID
        val manager = NetworkManager()
        manager.createApiRequest(
            ApiUtilis.getAPIService(view).getUnreadMessageCount(info),
            object :
                ServiceListener<UnReadMessageResponse> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: UnReadMessageResponse, requestcode: Int) {
                    isLoading.value = false
                    unreadMessageResponse.value = response
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
    }

    /**onClickCheckOut
     * Adapter Data and Methods
     */
    private lateinit var iFragmentCallback: IFragmentCallback

    fun onClickDailySheetTab(view: View) {
        if (AppInstance.getTeacherInfo(view.context)?.data != null) {
            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(
                DailySheetFragment(), //CurrentDailySheetFragment(),
                R.id.nav_dailysheet
            )
        } else {
            checkInAlert(view)
        }
    }

    fun onClickAttendanceTab(view: View) {
        if (AppInstance.getTeacherInfo(view.context)?.data != null) {
            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(AttendanceFragment(), R.id.nav_attendance)
        } else {
            checkInAlert(view)
        }
    }

    fun onClickAllergyTab(view: View) {
        if (AppInstance.getTeacherInfo(view.context)?.data != null) {
            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(AllergyFragment(), R.id.nav_attendance)
        } else {
            checkInAlert(view)
        }
    }


    fun onClickLogTab(view: View) {
        writefile(view)
    }

    fun writefile(view: View) {
        AndroidLogger.v("current UTC time", " :: " + getCurrentUTC());
        AndroidLogger.d("current Date and time of device", ":: " + getCurrentDateTime());
        AndroidLogger.d("TimeZone of device", " :: " + TimeZone.getDefault().id)
        AndroidLogger.v("Array size", " :: " + classLogApiResponse.value?.data?.size);

        try {
            if (classLogApiResponse.value?.data?.size!! > 0) {
                for (i in 0..classLogApiResponse.value?.data?.size!!) {
                    AndroidLogger.v(
                        "Api Response of getTeacherClass", " :: " +
                                classLogApiResponse.value?.data!!.get(i).className + " check status " +
                                classLogApiResponse.value?.data!!.get(i).checkStatus + " present student :" +
                                classLogApiResponse.value?.data!!.get(i).presentStudentCount
                    )

                }

            }
        } catch (ex: Exception) {
            ex.printStackTrace()
        }


        AndroidLogger.processPendingLogsStopAndGetLogFiles(object : AndroidLogger.GetFilesCallback {

            override fun onFiles(logFiles: Array<File?>?) {
                // get everything you need from these files
                try {
                    AndroidLogger.reinitAndroidLogger()
                } catch (e: IOException) {
                    e.printStackTrace()
                }
            }
        })
    }

    fun onClickIncidentTab(view: View) {

        if (AppInstance.getTeacherInfo(view.context)?.data != null) {
//            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(IncidentFragment(), R.id.nav_incident)

        } else {
            checkInAlert(view)
        }

    }

    fun onClickPostActivityTab(view: View) {


        if (AppInstance.getTeacherInfo(view.context)?.data != null) {
//            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(PostActivityFragment(), R.id.nav_postactivity)

        } else {
            checkInAlert(view)
        }

    }

    fun setFragmentTabClickListener(iFragmentCallback: IFragmentCallback) {
        this.iFragmentCallback = iFragmentCallback
    }


    private fun checkInAlert(view: View) {
        androidx.appcompat.app.AlertDialog.Builder(view.context)
            .setTitle("Class Check In")
            .setMessage("Please Check In into the class")
            .setPositiveButton(
                "Ok"
            ) { dialog, id ->
                dialog.cancel()
            }
            .setNegativeButton(
                "Cancel"
            ) { dialog, id -> dialog.cancel() }
            .show()
    }

    fun getCurrentCheckInStatus(context: Context, classLogData: ClassLogData) {
        if (isLoading.value != true) {
            isLoading.value = true
            val body = TeacherBreakInOutModel()
            val manager = NetworkManager()
            body.agencyID = AppInstance.getUser(context)?.agencyID
            body.teacherID = AppInstance.getUser(context)?.releventUserID
            body.askingDate =
                getCurrentUTC()//convertLocalToUtc(mSelectedDate, alohaDate, postserverDate)
            body.teacherDailyAttendenceID = AppInstance.getUser(context)?.teacherTodayAttendenceId
            body.askedDateString =
                getCurrentDateTime()//convertUtcToLocal(getCurrentUTC().toString(), alohaDate, reservationDate)

            manager.createApiRequest(
                ApiUtilis.getAPIService(context).getCheckInTeacherStatus(body),
                object :
                    ServiceListener<TeacherClassCheckInModel> {
                    @SuppressLint("LogNotTimber")
                    override fun getServerResponse(
                        response: TeacherClassCheckInModel,
                        requestcode: Int
                    ) {
                        if (response.statusCode == ResponseCodes.Success) {
                            isLoading.value = false
                            //  AppInstance.teacherClassCheckInModel = response

                            PreferenceConnector.writeTeacherData(
                                context!!,
                                PreferenceConnector.TEACHER_CHECKIN,
                                response
                            )
                            teacherClassCheckInAPIResponse.value = response
                            apiCheckResponse.postValue(true)
                        } else {
                            isLoading.value = false
                        }
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        // showToast(context, "Check Internet Connection")
                        isLoading.value = false
                    }
                })
        }
    }

    fun ClockIn(context: Context) {
        isLoading.value = true
        val body = ClockInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(context)?.agencyID
        body.teacherID = AppInstance.getUser(context)?.releventUserID
        body.attendanceDate = mSelectedDate
        body.clockIn = mSelectedDate
        body.classesID = 0
        body.id = 0
        body.attendenceStatusID = 1
        body.updatedBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getClockInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    showToast(context, "Clock In done successfully")
                    AppInstance.clockInSaveID = response.saveId
//                    DaycareTeacherApp.INSTANCE.teacherAttendanceId = response.saveId ?: 0
                    AppInstance.getUser(context)?.teacherTodayAttendenceId = response.saveId
                    clockInClockOutAPIResponse.value = response
                } else {
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(context, "Check Internet Connection")
                isLoading.value = false
            }
        })

    }

    fun getTeacherBreakStatus(context: Context) {
        isLoading.value = true
        val body = TeacherBreakInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(context)?.agencyID//requestData.agencyID
        body.teacherID = AppInstance.getUser(context)?.releventUserID
        body.askingDate = getCurrentUTC()
        body.askedDateString = getCurrentDateTime()
        body.teacherDailyAttendenceID = AppInstance.getUser(context)?.teacherTodayAttendenceId

        manager.createApiRequest(
            ApiUtilis.getAPIService(context).getBreakTeacherStatus(body),
            object :
                ServiceListener<TeacherBreakModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: TeacherBreakModel, requestcode: Int) {
                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        teacherBreakAPIResponse.value = response
                        AppInstance.getUser(context)?.teacherTodayAttendenceId = response.saveId
                    } else {
                        isLoading.value = false
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    // showToast(context, "Check Internet Connection")
                    isLoading.value = false
                }
            })
    }

    fun BreakOut(context: Context, reason: String, mMaterialDialog: MaterialDialog) {
        isLoading.value = true
        val body = TeacherBreakInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(context)?.agencyID
        body.teacherID = AppInstance.getUser(context)?.releventUserID
        body.breakOut = getCurrentUTC()
        body.id = 0
        body.breakTypesID = 0
        body.breakStatusID = 1
        body.teacherDailyAttendenceID = AppInstance.getUser(context)?.teacherTodayAttendenceId
        body.breakReason = reason
        body.updatedBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getBreakInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    mMaterialDialog.dismiss()
                    Log.i("Response GetClass >> ", response.message.toString())
                    getTeacherBreakStatus(context)
                } else {
                    isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(context, "Check Internet Connection")
                isLoading.value = false
            }
        })

    }

    fun BreakIn(
        context: Context,
        mMaterialDialog: MaterialDialog,
        teacherBreakModel: TeacherBreakModel
    ) {
        isLoading.value = true
        val body = TeacherBreakInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(context)?.agencyID
        body.teacherID = AppInstance.getUser(context)?.releventUserID
        body.breakIn = getCurrentUTC()
        body.id = teacherBreakModel!!.data!!.id
        body.breakTypesID = 0
        body.breakStatusID = 2
        body.teacherDailyAttendenceID = AppInstance.getUser(context)?.teacherTodayAttendenceId
        body.createdBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getBreakInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    mMaterialDialog.dismiss()
                    getTeacherBreakStatus(context)
                } else {
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(context, "Check Internet Connection")
                isLoading.value = false
            }
        })

    }

    //Api
    fun ClockOut(context: Context) {
        isLoading.value = true
        val body = ClockInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(context)?.agencyID
        body.teacherID = AppInstance.getUser(context)?.releventUserID
        body.attendanceDate = mSelectedDate
        body.clockOut = mSelectedDate
        body.classesID = 0
        body.id = AppInstance.clockInSaveID
        body.attendenceStatusID = 2
        body.updatedBy = AppInstance.getUser(context)?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getClockInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    AppInstance.clockInSaveID = response.saveId
                    showToast(context, "Clock Out done successfully")
                    AppInstance.doClockOut = true
                    clockInClockOutAPIResponse.value = response
                    AppInstance.getUser(context)?.teacherTodayAttendenceId = response.saveId
                } else {
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(context, "Check Internet Connection")
                isLoading.value = false
            }
        })
    }

    fun getTeacherClassLog(view: Context) {
        isLoading.value = true
        val body = TeacherClassLogModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view)?.agencyID
        body.teacherID = AppInstance.getUser(view)?.releventUserID
        body.askingDate = getCurrentUTC()
        body.askedDateString =
            getCurrentDateTime() //convertUtcToLocal(mSelectedDate, alohaDate, reservationDate)

        manager.createApiRequest(
            ApiUtilis.getAPIService(view).getTeacherClassLog(body),
            object :
                ServiceListener<TeacherClassLogModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: TeacherClassLogModel, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        classLogApiResponse.value = response

                    } else {
                        isLoading.value = false
                        showToast(view, response.message.toString())
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showToast(view, "Check Internet Connection")
                    isLoading.value = false
                }
            })
    }

    fun checkCheckInStatus(teacherArray: ArrayList<ClassLogData>): Boolean {
        var status: Boolean = false
        if (teacherArray?.size!! > 0) {
            for (pos in 0 until teacherArray!!.size) {
                if (teacherArray!!.get(pos).checkStatus == 1) {
                    status = true
                    break
                }

            }
        }
        return status
    }


    fun onClickCheckIn(
        view: Context,
        classLogData: ClassLogData,
        teacherArray: ArrayList<ClassLogData>,
        position: Int
    ) {

        if (!checkCheckInStatus(teacherArray)) {
            AlertDialog.Builder(view)
                .setTitle("Check In")
                .setMessage("Are you sure you want to Checked In?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()
                        iLoaderCallback.startLoader(true)

                        val body = ClassLogData()
                        val manager = NetworkManager()
                        body.agencyID = AppInstance.getUser(view)?.agencyID //requestData.agencyID
                        body.teacherID = AppInstance.getUser(view)?.releventUserID
                        body.checkInTime = mSelectedDate
                        classLogData.checkInTime = body.checkInTime
                        body.checkStatus = 1
                        body.classEndTime = classLogData?.classEndTime
                        body.classStartTime = classLogData?.classStartTime
                        body.classesID = classLogData?.classesID
                        body.classAssignmentLogID = classLogData?.classAssignmentLogID
                        body.teacherDailyAttendenceID =
                            AppInstance.getUser(view)?.teacherTodayAttendenceId
                        body.updatedBy = AppInstance.getUser(view)?.loginUserID


                        manager.createApiRequest(ApiUtilis.getAPIService(view)
                            .teacherCheckInCheckOut(
                                body
                            ), object :
                            ServiceListener<TeacherClassCheckInModel> {
                            @SuppressLint("LogNotTimber")
                            override fun getServerResponse(
                                response: TeacherClassCheckInModel,
                                requestcode: Int
                            ) {

                                if (response.statusCode == ResponseCodes.Success) {
                                    classLogData.id = response.saveId
                                    classLogData.checkStatus = CHECK_IN_STATUS
                                    iLoaderCallback.startLoader(false)
                                    showToast(view, "Check In done.")
                                    getCurrentCheckInStatus(view, classLogData)

                                } else {
                                    iLoaderCallback.startLoader(false)
                                    showToast(view, response.message.toString())
                                }

                            }

                            override fun getError(error: ErrorModel, requestcode: Int) {
                                Log.e("Error", error.error_message)
                                showToast(view, "Check Internet Connection")
                                iLoaderCallback.startLoader(false)
                            }
                        })
                    }
                }
                .setNegativeButton(
                    "No"
                ) { dialog, id -> dialog.cancel() }
                .show()

        } else {
            showToast(view, "Already checked in class")
        }
    }

    fun onClickCheckOut(view: Context, classLogData: ClassLogData, position: Int) {
        AlertDialog.Builder(view)
            .setTitle("Check Out")
            .setMessage("Are you sure you want to Checked Out?")
            .setPositiveButton(
                "Yes"
            ) { dialog, id ->
                run {
                    dialog.cancel()

                    iLoaderCallback.startLoader(true)

                    val body = ClassLogData()
                    val manager = NetworkManager()
                    body.agencyID = AppInstance.getUser(view)?.agencyID
                    body.teacherID = AppInstance.getUser(view)?.releventUserID
                    body.checkOutTime = mSelectedDate

                    classLogData.checkOutTime = mSelectedDate

                    body.checkInTime = classLogData?.checkInTime
                    body.id = classLogData?.id

                    body.checkStatus = 2
                    body.classEndTime = classLogData?.classEndTime


                    body.classStartTime = classLogData?.classStartTime
                    body.classesID = classLogData?.classesID
                    body.classAssignmentLogID = classLogData?.classAssignmentLogID
                    body.teacherDailyAttendenceID =
                        AppInstance.getUser(view)?.teacherTodayAttendenceId
                    body.updatedBy = AppInstance.getUser(view)?.loginUserID

                    manager.createApiRequest(ApiUtilis.getAPIService(view)
                        .teacherCheckInCheckOut(
                            body
                        ), object :
                        ServiceListener<TeacherClassCheckInModel> {
                        @SuppressLint("LogNotTimber")
                        override fun getServerResponse(
                            response: TeacherClassCheckInModel,
                            requestcode: Int
                        ) {

                            if (response.statusCode == ResponseCodes.Success) {
                                iLoaderCallback.startLoader(false)
                                showToast(view, "Check out done.")
                                classLogData.checkStatus = CHECK_OUT_STATUS

                                PreferenceConnector.writeTeacherData(
                                    view!!,
                                    PreferenceConnector.TEACHER_CHECKIN, response
                                )

                                apiCheckResponse.postValue(true)
                            } else {
                                iLoaderCallback.startLoader(false)
                                showToast(view, response.message.toString())
                            }
                        }

                        override fun getError(error: ErrorModel, requestcode: Int) {
                            Log.e("Error", error.error_message)
                            showToast(view, "Check Internet Connection")
                            iLoaderCallback.startLoader(false)
                        }
                    })

                }
            }
            .setNegativeButton(
                "No"
            ) { dialog, id -> dialog.cancel() }
            .show()
    }

    fun onClickEdit(view: Context, classLogData: ClassLogData, position: Int) {
        val mMaterialDialog = MaterialDialog(view)
        val dialogView = LayoutInflater.from(view)
            .inflate(
                R.layout.edit_checkin_out_time,
                null
            )
        val dialogBinding = EditCheckinOutTimeBinding.bind(dialogView)
        dialogBinding.viewModel = classLogData

        dialogBinding.edtCheckInTime.setOnClickListener {
            edittimepicker(view, dialogBinding.edtCheckInTime)
        }

        dialogBinding.edtCheckOutTime.setOnClickListener {
            edittimepicker(view, dialogBinding.edtCheckOutTime)
        }

        if (classLogData.checkStatus == CHECK_IN_STATUS) {
            dialogBinding.edtCheckInTime.visibility = View.VISIBLE
            dialogBinding.checkinTimeTv.visibility = View.VISIBLE
            dialogBinding.checkoutTv.visibility = View.GONE
            dialogBinding.edtCheckOutTime.visibility = View.GONE

            dialogBinding.edtCheckInTime.setText(
                convertDate(
                    classLogData?.checkInTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )
        } else if (classLogData.checkStatus == CHECK_OUT_STATUS) {
            dialogBinding.edtCheckInTime.visibility = View.VISIBLE
            dialogBinding.checkinTimeTv.visibility = View.VISIBLE
            dialogBinding.checkoutTv.visibility = View.VISIBLE
            dialogBinding.edtCheckOutTime.visibility = View.VISIBLE

            dialogBinding.edtCheckInTime.setText(
                convertLocalToUtc(
                    classLogData?.checkInTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )

            dialogBinding.edtCheckOutTime.setText(
                convertLocalToUtc(
                    classLogData?.checkOutTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )
        }



        dialogBinding.btnCCheckin.setOnClickListener {

            checkInEditTime = convertDate(
                dialogBinding.edtCheckInTime.text.toString(),
                dialogDisplayTime,
                serverDate
            )
            checkOutEditTime = convertDate(
                dialogBinding.edtCheckOutTime.text.toString(),
                dialogDisplayTime,
                serverDate
            )

            iLoaderCallback.startLoader(true)
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnCCheckin.visibility = View.INVISIBLE

            // AppInstance.teacherClassLogModel?.data?.get(position)?.checkInTime = checkInEditTime
            //  AppInstance.teacherClassLogModel?.data?.get(position)?.checkOutTime = checkOutEditTime

            classLogData.checkInTime = checkInEditTime
            classLogData.checkOutTime = checkOutEditTime

            val body = ClassLogData()
            val manager = NetworkManager()

            body.agencyID = AppInstance.getUser(view)?.agencyID //requestData.agencyID
            body.teacherID = AppInstance.getUser(view)?.releventUserID
            if (!checkOutEditTime.isEmpty()) {
                body.checkOutTime = checkOutEditTime
            }
            //  AppInstance.teacherClassLogModel?.data?.get(position)?.checkOutTime = mSelectedDate
            classLogData.checkOutTime = mSelectedDate
            body.checkInTime = checkInEditTime
            body.id = classLogData?.id//AppInstance.teacherClassLogModel?.data?.get(position)?.id
            body.checkStatus = classLogData.checkStatus //classStatus.get()
            body.classEndTime =
                classLogData?.classEndTime //AppInstance.teacherClassLogModel?.data?.get(position)?.classEndTime
            body.classStartTime =
                classLogData?.classStartTime//AppInstance.teacherClassLogModel?.data?.get(position)?.classStartTime
            body.classesID =
                classLogData?.classesID//AppInstance.teacherClassLogModel?.data?.get(position)?.classesID
            body.classAssignmentLogID = classLogData?.classAssignmentLogID
            //AppInstance.teacherClassLogModel?.data?.get(position)?.classAssignmentLogID
            body.teacherDailyAttendenceID =
                AppInstance.getUser(view)?.teacherTodayAttendenceId//AppInstance.getUser(view.context)?.teacherTodayAttendenceId
            body.updatedBy =
                AppInstance.getUser(view)?.loginUserID//AppInstance.getUser(view.context)?.loginUserID

            manager.createApiRequest(ApiUtilis.getAPIService(view).teacherCheckInCheckOut(
                body
            ), object :
                ServiceListener<TeacherClassCheckInModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(
                    response: TeacherClassCheckInModel,
                    requestcode: Int
                ) {

                    if (response.statusCode == ResponseCodes.Success) {
                        // AppInstance.checkinSaveID = response.saveId
                        // AppInstance.teacherClassLogModel?.data?.get(position)?.id = response.saveId

                        iLoaderCallback.startLoader(false)
                        apiCheckResponse.postValue(true)

                        showToast(view, response.message!!)
                        // classStatus.set(CHECK_IN_STATUS)
                        mMaterialDialog.dismiss()


                    } else {
                        iLoaderCallback.startLoader(false)
                        showToast(view, response.message.toString())
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    dialogBinding.btnCCancel.visibility = View.VISIBLE
                    dialogBinding.btnCCheckin.visibility = View.VISIBLE
                    showToast(view, "Check Internet Connection")
                    iLoaderCallback.startLoader(false)
                }
            })
        }
        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    fun setLoader(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    fun edittimepicker(view: Context, txtTime: TextInputEditText) {
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
                ) + " "
                val mdate = parseTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))
            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }


}