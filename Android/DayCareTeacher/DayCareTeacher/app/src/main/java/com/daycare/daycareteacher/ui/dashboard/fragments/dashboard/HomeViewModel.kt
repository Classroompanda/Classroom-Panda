package com.daycare.daycareteacher.ui.dashboard.fragments.dashboard

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.TimePickerDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.*
import com.daycare.daycareteacher.interfaces.IFragmentCallback
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.fragments.attendence.AttendanceFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet.DailySheetFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.incident.IncidentFragment
import com.daycare.daycareteacher.ui.dashboard.fragments.postactivity.PostActivityFragment
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog
import java.util.*

class HomeViewModel() : ViewModel() {

    var className = ObservableField<String>("")
    var startTime = ObservableField<String>("")
    var endTime = ObservableField<String>("")
    var classImg = ObservableField<String>("")
    var classStatus = ObservableField(CLASS_INACTIVE)
    val isLoading = MutableLiveData<Boolean>()
    val classLogApiResponse = MutableLiveData<TeacherClassLogModel>()
    val clockInClockOutAPIResponse = MutableLiveData<BaseModel>()
    val teacherBreakAPIResponse = MutableLiveData<TeacherBreakModel>()
    val teacherClassCheckInAPIResponse = MutableLiveData<TeacherClassCheckInModel>()
    private var checkInEditTime = ""
    private var checkOutEditTime = ""


    var mSelectedDate = serverDate.format(Date())
    private lateinit var iLoaderCallback: ILoaderCallback
    var position: Int = 0


    /**
     * Fragment data and methods
     */
    constructor(classData: ClassLogData, position: Int) : this() {
        // this.classImg.set(classData.classImgUrl)
        this.className.set(classData.className)
        this.startTime.set(convertDateUTC(classData.classStartTime!!, alohaDate, displayTime))
        this.endTime.set(convertDateUTC(classData.classEndTime!!, alohaDate, displayTime))
        this.position = position

        // 2019-02-01T06:00:00.....2019-02-01T11:00:00

        when {
            classData.checkStatus == CHECK_IN_STATUS -> this.classStatus.set(CHECK_IN_STATUS)
            classData.checkStatus == CHECK_OUT_STATUS -> this.classStatus.set(CHECK_OUT_STATUS)
            classData.checkStatus == AVAILABLE_CHECKIN_STATUS -> this.classStatus.set(AVAILABLE_CHECKIN_STATUS)
        }
    }


    /**onClickCheckOut
     * Adapter Data and Methods
     */

    private lateinit var iFragmentCallback: IFragmentCallback
    var teacherStatus = ObservableField(0)

    fun onClickDailySheetTab(view: View) {

        if (AppInstance.teacherClassCheckInModel?.data != null) {
            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(DailySheetFragment(), R.id.nav_dailysheet)
        } else {
            checkInAlert(view)
        }

    }

    fun onClickAttendanceTab(view: View) {

        if (AppInstance.teacherClassCheckInModel?.data != null) {
            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(AttendanceFragment(), R.id.nav_attendance)
        } else {
            checkInAlert(view)
        }


    }

    fun onClickIncidentTab(view: View) {


        if (AppInstance.teacherClassCheckInModel?.data != null) {
//            val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
            iFragmentCallback.onQuickAccessTabClicked(IncidentFragment(), R.id.nav_incident)

        } else {
            checkInAlert(view)
        }

    }

    fun onClickPostActivityTab(view: View) {


        if (AppInstance.teacherClassCheckInModel?.data != null) {
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
        android.support.v7.app.AlertDialog.Builder(view.context)
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

    fun getCurrentCheckInStatus(context: Context) {
        if (isLoading.value != true) {
            isLoading.value = true
            val body = TeacherBreakInOutModel()
            val manager = NetworkManager()
            body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
            body.teacherID = AppInstance.loginResponse?.data?.releventUserID
            body.askingDate = mSelectedDate
            body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId




            manager.createApiRequest(ApiUtilis.getAPIService(context).getCheckInTeacherStatus(body), object :
                ServiceListener<TeacherClassCheckInModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: TeacherClassCheckInModel, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                        Log.i("Response GetClass >> ", response.message.toString())
                        // AppInstance.clockInSaveID=response.saveId
                        AppInstance.teacherClassCheckInModel = response
                        teacherClassCheckInAPIResponse.value = AppInstance.teacherClassCheckInModel


                        //  clockInClockOutAPIResponse.value = response

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
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.attendanceDate = mSelectedDate
        body.clockIn = mSelectedDate
        body.classesID = 0
        body.id = 0
        body.attendenceStatusID = 1
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getClockInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    showToast(context, "Clock In done successfully")
                    AppInstance.clockInSaveID = response.saveId
                    AppInstance.loginResponse?.data?.teacherTodayAttendenceId = response.saveId
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
        body.agencyID = AppInstance.loginResponse?.data?.agencyID//requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.askingDate = mSelectedDate
        body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId


        manager.createApiRequest(ApiUtilis.getAPIService(context).getBreakTeacherStatus(body), object :
            ServiceListener<TeacherBreakModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: TeacherBreakModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    // AppInstance.clockInSaveID=response.saveId
                    AppInstance.teacherBreakModel = response
                    teacherBreakAPIResponse.value = AppInstance.teacherBreakModel


                    //  clockInClockOutAPIResponse.value = response

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

//Api
    fun BreakOut(context: Context, reason: String, mMaterialDialog: MaterialDialog) {

        /*    'id': 0,
          'agencyID': this.commonService.getAgencyId(),
          'breakOut': new Date(),
          'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
          'breakTypesID': 0,
          'breakStatusID': 1,
          'breakReason': this.breakReason*/


        isLoading.value = true
        val body = TeacherBreakInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.breakOut = mSelectedDate
        body.id = 0
        body.breakTypesID = 0
        body.breakStatusID = 1
        body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId
        body.breakReason = reason
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getBreakInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    mMaterialDialog.dismiss()
                    //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    // AppInstance.clockInSaveID=response.saveId
//                    showToast(context, "Break Out done successfully")
                    AppInstance.BreakOutID = response.saveId
                    getTeacherBreakStatus(context)
                    //  clockInClockOutAPIResponse.value = response

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
    fun BreakIn(context: Context, mMaterialDialog: MaterialDialog) {

        /*     'id': this.teacherBreakSaveId,
      'agencyID': this.commonService.getAgencyId(),
      'breakIn': new Date(),
      'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
      'breakTypesID': 0,
      'breakStatusID': 2,*/


        isLoading.value = true
        val body = TeacherBreakInOutModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.breakIn = mSelectedDate
        body.id = AppInstance.teacherBreakModel!!.data!!.id
        body.breakTypesID = 0
        body.breakStatusID = 2
        body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId
        body.createdBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getBreakInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    // AppInstance.clockInSaveID=response.saveId
//                    showToast(context, "Break In done successfully")
                    mMaterialDialog.dismiss()
                    AppInstance.BreakOutID = response.saveId
                    getTeacherBreakStatus(context)
                    //  clockInClockOutAPIResponse.value = response

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
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        body.attendanceDate = mSelectedDate
        body.clockOut = mSelectedDate
        body.classesID = 0
        body.id = AppInstance.clockInSaveID
        body.attendenceStatusID = 2
        body.updatedBy=AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getClockInOut(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    //  val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.clockInSaveID = response.saveId
                    showToast(context, "Clock Out done successfully")
                    AppInstance.doClockOut = true
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

    fun getTeacherClassLog(view: View) {
        isLoading.value = true
        val body = TeacherClassLogModel()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
        //AppInstance.loginResponse?.data?.releventUserID
        body.askingDate = mSelectedDate

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getTeacherClassLog(body), object :
            ServiceListener<TeacherClassLogModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: TeacherClassLogModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentHomeBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    classLogApiResponse.value = response
                    AppInstance.teacherClassLogModel = response

                } else {
                    isLoading.value = false
                    showToast(view.context, response.message.toString())

                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                isLoading.value = false
            }
        })
    }


    /*   fun checkCheckInStatus:Boolean(){
           var status:Boolean=false
           AppInstance.teacherClassLogModel
           if(AppInstance.breakData!!.data?.size!! >0){
               for (pos in 0 until AppInstance.breakData!!.data!!.size) {
                   if(AppInstance.breakData!!.data!!.get(pos).breakStatusId==1){
                       AppInstance.HadBreakIn=true
                       break
                   }

               }
           }
           return status
       }*/

    fun checkCheckInStatus(): Boolean {
        var status: Boolean = false
        if (AppInstance.teacherClassLogModel!!.data?.size!! > 0) {
            for (pos in 0 until AppInstance.teacherClassLogModel!!.data!!.size) {
                if (AppInstance.teacherClassLogModel!!.data!!.get(pos).checkStatus == 1) {
                    status = true
                    break
                }

            }
        }
        return status
    }


    fun onClickCheckIn(view: View) {

        if (!checkCheckInStatus()) {
            val data = AppInstance.teacherClassLogModel?.data?.get(position)

            AlertDialog.Builder(view.context)
                .setTitle("Check In")
                .setMessage("Are you sure you want to Checked In?")
                .setPositiveButton(
                    "Yes"
                ) { dialog, id ->
                    run {
                        dialog.cancel()
                        iLoaderCallback.startLoader(true)
                        /* agencyID	4
        checkInTime	2019-02-20T04:22:24.243Z
        checkStatus	1
        classAssignmentLogID	2
        classEndTime	2019-02-01T08:00:00
        classesID	2
        classStartTime	2019-02-01T06:00:00
        teacherDailyAttendenceID	17
        teacherID	1	1*/

                        val body = ClassLogData()
                        val manager = NetworkManager()
                        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
                        body.teacherID = AppInstance.loginResponse?.data?.releventUserID
                        body.checkInTime = mSelectedDate
                        AppInstance.teacherClassLogModel?.data?.get(position)?.checkInTime = body.checkInTime
                        body.checkStatus = 1
                        body.classEndTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classEndTime
                        body.classStartTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classStartTime
                        body.classesID = AppInstance.teacherClassLogModel?.data?.get(position)?.classesID
                        body.classAssignmentLogID =
                            AppInstance.teacherClassLogModel?.data?.get(position)?.classAssignmentLogID
                        body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId
                        body.updatedBy=AppInstance.loginResponse?.data?.loginUserID


                        manager.createApiRequest(ApiUtilis.getAPIService(view.context).teacherCheckInCheckOut(body), object :
                            ServiceListener<BaseModel> {
                            @SuppressLint("LogNotTimber")
                            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                                if (response.statusCode == ResponseCodes.Success) {
                                    AppInstance.checkinSaveID = response.saveId
                                    AppInstance.teacherClassLogModel?.data?.get(position)?.id = response.saveId
                                    AppInstance.teacherClassLogModel!!.data!![position].checkStatus= 1
                                    iLoaderCallback.startLoader(false)
                                    showToast(view.context, "Check In done.")
                                    Log.i("Response GetClass >> ", response.message.toString())
                                    classStatus.set(CHECK_IN_STATUS)
                                    getCurrentCheckInStatus(view.context)

                                } else {
                                    iLoaderCallback.startLoader(false)
                                    showToast(view.context, response.message.toString())
                                }

                            }

                            override fun getError(error: ErrorModel, requestcode: Int) {
                                Log.e("Error", error.error_message)
                                showToast(view.context, "Check Internet Connection")
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
            showToast(view.context, "Already checked in class")

        }


    }

    fun onClickCheckOut(view: View) {

        val data = AppInstance.teacherClassLogModel?.data?.get(position)

        AlertDialog.Builder(view.context)
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
                    body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
                    body.teacherID = AppInstance.loginResponse?.data?.releventUserID
                    body.checkOutTime = mSelectedDate
                    AppInstance.teacherClassLogModel?.data?.get(position)?.checkOutTime = mSelectedDate
                    body.checkInTime = AppInstance.teacherClassLogModel?.data?.get(position)?.checkInTime
                    body.id = AppInstance.teacherClassLogModel?.data?.get(position)?.id
                    body.checkStatus = 2
                    body.classEndTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classEndTime
                    body.classStartTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classStartTime
                    body.classesID = AppInstance.teacherClassLogModel?.data?.get(position)?.classesID
                    body.classAssignmentLogID =
                        AppInstance.teacherClassLogModel?.data?.get(position)?.classAssignmentLogID
                    body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId
                    body.updatedBy=AppInstance.loginResponse?.data?.loginUserID

                    val datab = "hello"

                    manager.createApiRequest(ApiUtilis.getAPIService(view.context).teacherCheckInCheckOut(body), object :
                        ServiceListener<BaseModel> {
                        @SuppressLint("LogNotTimber")
                        override fun getServerResponse(response: BaseModel, requestcode: Int) {

                            if (response.statusCode == ResponseCodes.Success) {
                                AppInstance.checkinSaveID = null
                                iLoaderCallback.startLoader(false)
                                showToast(view.context, "Check out done.")
                                val binding = DataBindingUtil.findBinding<ClassStatusListItemBinding>(view)
                                binding?.teacherCheckOutBtn?.visibility = View.INVISIBLE
                                binding?.teacherCheckedOutBtn?.visibility = View.GONE
                                Log.i("Response GetClass >> ", response.message.toString())
                                classStatus.set(CHECK_OUT_STATUS)
                                AppInstance.teacherClassLogModel!!.data!![position].checkStatus= 2


                            } else {
                                iLoaderCallback.startLoader(false)
                                showToast(view.context, response.message.toString())
                            }

                        }

                        override fun getError(error: ErrorModel, requestcode: Int) {
                            Log.e("Error", error.error_message)
                            showToast(view.context, "Check Internet Connection")
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

    fun onClickEdit(view: View) {
        val data = AppInstance.teacherClassLogModel?.data?.get(position)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.edit_checkin_out_time,
                null
            )
        val dialogBinding = EditCheckinOutTimeBinding.bind(dialogView)
        dialogBinding.viewModel = data



        dialogBinding.edtCheckInTime.setOnClickListener {
            edittimepicker(view, dialogBinding.edtCheckInTime)
        }

        dialogBinding.edtCheckOutTime.setOnClickListener {
            edittimepicker(view, dialogBinding.edtCheckOutTime)
        }



        if (classStatus.get() == CHECK_IN_STATUS) {
            dialogBinding.edtCheckInTime.visibility = View.VISIBLE
            dialogBinding.checkinTimeTv.visibility = View.VISIBLE
            dialogBinding.checkoutTv.visibility = View.GONE
            dialogBinding.edtCheckOutTime.visibility = View.GONE

            dialogBinding.edtCheckInTime.setText(
                convertDate(
                    data?.checkInTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )
        } else if (classStatus.get() == CHECK_OUT_STATUS) {
            dialogBinding.edtCheckInTime.visibility = View.VISIBLE
            dialogBinding.checkinTimeTv.visibility = View.VISIBLE
            dialogBinding.checkoutTv.visibility = View.VISIBLE
            dialogBinding.edtCheckOutTime.visibility = View.VISIBLE

            dialogBinding.edtCheckInTime.setText(
                convertDate(
                    data?.checkInTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )

            dialogBinding.edtCheckOutTime.setText(
                convertDate(
                    data?.checkOutTime!!,
                    alohaDate,
                    dialogDisplayTime
                )
            )
        }



        dialogBinding.btnCCheckin.setOnClickListener {

            checkInEditTime = convertDate(dialogBinding.edtCheckInTime.text.toString(), dialogDisplayTime, serverDate)
            if (!dialogBinding.edtCheckOutTime.text!!.isEmpty()) {
                checkOutEditTime =
                    convertDate(dialogBinding.edtCheckOutTime.text.toString(), dialogDisplayTime, serverDate)
            } else {
                checkOutEditTime = ""
            }


            iLoaderCallback.startLoader(true)
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnCCheckin.visibility = View.INVISIBLE

            AppInstance.teacherClassLogModel?.data?.get(position)?.checkInTime = checkInEditTime
            AppInstance.teacherClassLogModel?.data?.get(position)?.checkOutTime = checkOutEditTime

            val body = ClassLogData()
            val manager = NetworkManager()

            body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
            body.teacherID = AppInstance.loginResponse?.data?.releventUserID
            if (!checkOutEditTime.isEmpty()) {
                body.checkOutTime = checkOutEditTime
            }
            AppInstance.teacherClassLogModel?.data?.get(position)?.checkOutTime = mSelectedDate
            body.checkInTime = checkInEditTime
            body.id = AppInstance.teacherClassLogModel?.data?.get(position)?.id
            body.checkStatus = classStatus.get()
            body.classEndTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classEndTime
            body.classStartTime = AppInstance.teacherClassLogModel?.data?.get(position)?.classStartTime
            body.classesID = AppInstance.teacherClassLogModel?.data?.get(position)?.classesID
            body.classAssignmentLogID =
                AppInstance.teacherClassLogModel?.data?.get(position)?.classAssignmentLogID
            body.teacherDailyAttendenceID = AppInstance.loginResponse?.data?.teacherTodayAttendenceId
            body.updatedBy=AppInstance.loginResponse?.data?.loginUserID

            val datab = "hello"
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).teacherCheckInCheckOut(body), object :
                ServiceListener<BaseModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: BaseModel, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        // AppInstance.checkinSaveID = response.saveId
                        // AppInstance.teacherClassLogModel?.data?.get(position)?.id = response.saveId

                        iLoaderCallback.startLoader(false)
                        showToast(view.context, response.message!!)

                        Log.i("Response GetClass >> ", response.message.toString())
                        // classStatus.set(CHECK_IN_STATUS)
                        mMaterialDialog.dismiss()


                    } else {
                        iLoaderCallback.startLoader(false)
                        showToast(view.context, response.message.toString())
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    dialogBinding.btnCCancel.visibility = View.VISIBLE
                    dialogBinding.btnCCheckin.visibility = View.VISIBLE
                    showToast(view.context, "Check Internet Connection")
                    iLoaderCallback.startLoader(false)
                }
            })


        }
        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()


        //  if(classStatus== IS_CHECKED_IN)
    }

    /*  private fun showCheckinDialog(view: View) {
          val data = AppInstance.allAttendanceData?.data?.get(position)
          iLoaderCallback.startLoader(false)
          data?.dropedById?.let { droppedById }
          data?.pickupById?.let { pickedById }
          val response = AppInstance.allGuardians
          val mMaterialDialog = MaterialDialog(view.context)
          val dialogView = LayoutInflater.from(view.context)
              .inflate(
                  R.layout.checkin_confirmation,
                  null
              )
          val dialogBinding = CheckinConfirmationBinding.bind(dialogView)
          dialogBinding.viewModel = data
          dialogBinding.txtDate.text = dialogDisplayDate.format(
              displayDate.parse(data?.attendanceDate)
          )                                         //AppInstance.selectedDate
          val time: String? = data?.attendanceDate?.let { getDayName(it) + " " + getCurrentTime() }
          dialogBinding.txtTime.text = time

          dialogBinding.btnCCancel.setOnClickListener {
              mMaterialDialog.dismiss()
          }
          dialogBinding.editTime.setOnClickListener {
              timepicker(view, dialogBinding.txtTime)
          }
          when (statusFlag.get()) {
              IS_TO_BE_CHECKED -> {
                  dialogBinding.pickupTv.visibility = View.GONE
                  dialogBinding.pickupSpinner.visibility = View.GONE

                  setGuardianSpinnerData(dialogBinding.dropoffSpinner, response, view.context)
                  dialogBinding.btnCCheckin.setOnClickListener {
                      dialogBinding.btnCCancel.visibility = View.INVISIBLE
                      dialogBinding.btnCCheckin.visibility = View.INVISIBLE
                      dialogBinding.spinKit.visibility = View.VISIBLE
                      AppInstance.allAttendanceData?.data?.get(position)?.dropedById = droppedById
                      checkinStudent(view, mMaterialDialog)
                  }
              }
              IS_CHECKED_IN -> {
                  dialogBinding.dropoffTv.visibility = View.GONE
                  dialogBinding.dropoffSpinner.visibility = View.GONE

                  setGuardianDisableSpinnerData(dialogBinding.dropoffSpinner, response, view.context)
                  setGuardianSpinnerData(dialogBinding.pickupSpinner, response, view.context)
                  dialogBinding.btnCCheckin.setOnClickListener {
                      dialogBinding.btnCCancel.visibility = View.INVISIBLE
                      dialogBinding.btnCCheckin.visibility = View.INVISIBLE
                      dialogBinding.spinKit.visibility = View.VISIBLE
                      AppInstance.allAttendanceData?.data?.get(position)?.pickupById = pickedById
                      checkOutStudent(view, mMaterialDialog)
                  }
              }
          }
          mMaterialDialog.setCanceledOnTouchOutside(false)
          mMaterialDialog.setView(dialogView).show()
      }*/

    fun setLoader(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    fun edittimepicker(view: View, txtTime: TextInputEditText) {
        val c = Calendar.getInstance()
        val mHour = c.get(Calendar.HOUR_OF_DAY)
        val mMin = c.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(
            txtTime.context,
            TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                var mHourOfDay = hourOfDay
//                val format: String
//                when {
//                    mHourOfDay > 12 -> {
//                        format = "pm"
//                        mHourOfDay -= 12
//
//
//                    }
//                    mHourOfDay == 12 -> {
//
////                    mHourOfDay += 12
//                        format = "am"
//                    }
//                    else -> format = "am"
//                }
//                val mTime = mHourOfDay.toString() + ":" + minute + " " + format + ""
//                val selectedTime = getDayName(Date()) + " " + mTime
//                val mdate = dialogDisplayTime.parse(mTime)
                val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                val mdate = parseTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))

            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }
}