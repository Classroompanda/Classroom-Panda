package com.daycare.daycareteacher.ui.dashboard.fragments.attendence

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.app.DatePickerDialog.OnDateSetListener
import android.app.TimePickerDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.support.design.widget.TextInputEditText
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.*
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.*
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.activities.StudentBreakInOutActivity
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList


class AttendanceViewModel() : ViewModel() {

    /**
     * Fragment methods
     */

    val isLoading = MutableLiveData<Boolean>()
    val classApiResponse = MutableLiveData<ClassModel>()
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
    private var breakeditable = false
    val breakstatusFlag = ObservableField<Int>(OPEN_BREAK)

    fun onClickAddBreakFab(view: View) {
        addBreakFab.value = true


        /*    addBreakFab.value = true
            breakeditable = false
            if (breakeditable) showEditDialog(view)
            else if (!breakeditable) showBreakInDialog(view)
    */


    }

    fun onClickEditBreak(view: View) {
        breakeditable = true

        val attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)
        val breakdata = AppInstance.breakData?.data?.get(AppInstance.breakParentPosition!!)
        breakdata?.dropedById?.let { droppedById }
        breakdata?.pickupById?.let { pickedById }
        val response = AppInstance.allGuardians
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.sample_breakin_out_confirmation_popup,
                null
            )
        val dialogBinding = SampleBreakinOutConfirmationPopupBinding.bind(dialogView)

        dialogBinding.viewModel = breakdata
        dialogBinding.txtDate.text = dialogDisplayDate.format(
            displayDate.parse(attendancedata?.attendanceDate)
        )

        val time: String? = breakdata?.breakInTime
        dialogBinding.edtReason.setText(breakdata?.breakReason)

        dialogBinding.edtBreakOut.setText(convertDate(breakdata?.breakOutTime!!, alohaDate, dialogDisplayTime))
        if (!breakdata.breakInTime.equals("0001-01-01T00:00:00")) {
            dialogBinding.edtBreakIn.setText(convertDate(breakdata?.breakInTime!!, alohaDate, dialogDisplayTime))
        }

        dialogBinding.edtBreakOut.setOnClickListener {
            breaktimepicker(view, dialogBinding.edtBreakOut)

        }

        dialogBinding.edtBreakIn.setOnClickListener {
            breaktimepicker(view, dialogBinding.edtBreakIn)

        }

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        if (breakdata.breakStatusId == 1) {
            dialogBinding.edtBreakOut.visibility = View.GONE
            dialogBinding.pickupBreakSpinner.visibility = View.GONE
            dialogBinding.pickupTv.visibility = View.GONE
            dialogBinding.dropoffTv.visibility = View.VISIBLE
            dialogBinding.dropoffBreakSpinner.visibility = View.VISIBLE
            dialogBinding.edtBreakIn.visibility = View.VISIBLE
            dialogBinding.edtReason.visibility = View.VISIBLE

        } else {
            dialogBinding.edtBreakOut.visibility = View.VISIBLE
            dialogBinding.pickupBreakSpinner.visibility = View.VISIBLE
            dialogBinding.pickupTv.visibility = View.VISIBLE
            dialogBinding.dropoffTv.visibility = View.VISIBLE
            dialogBinding.dropoffBreakSpinner.visibility = View.VISIBLE
            dialogBinding.edtBreakIn.visibility = View.VISIBLE
            dialogBinding.edtReason.visibility = View.VISIBLE
        }





        setBreakGuardianSpinnerData(dialogBinding.pickupBreakSpinner, AppInstance.allGuardians, view.context, "PICKUP")
        setBreakGuardianSpinnerData(dialogBinding.dropoffBreakSpinner, AppInstance.allGuardians, view.context, "DROP")



        dialogBinding.btnCCheckin.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnCCheckin.visibility = View.INVISIBLE
            dialogBinding.spinKit.visibility = View.VISIBLE


            if (dialogBinding.edtBreakOut.text.toString() != "") {
                AppInstance.breakData?.data?.get(breakposition)?.breakOutTime =
                    convertDate(dialogBinding.edtBreakOut.text.toString(), dialogDisplayTime, serverDate)
                if (breakpickedById != null)
                    AppInstance.breakData?.data?.get(breakposition)?.pickupById = breakpickedById

            } else {
                AppInstance.breakData?.data?.get(breakposition)?.breakInTime =
                    AppInstance.breakData?.data?.get(breakposition)?.breakInTime;
                if (breakpickedById != null)
                    AppInstance.breakData?.data?.get(breakposition)?.pickupById = breakpickedById
            }
            if (dialogBinding.edtBreakIn.text.toString() != "") {
                AppInstance.breakData?.data?.get(breakposition)?.breakInTime =
                    convertDate(dialogBinding.edtBreakIn.text.toString(), dialogDisplayTime, serverDate)
                if (breakdroppedById != null) {
                    AppInstance.breakData?.data?.get(breakposition)?.dropedById = breakdroppedById
                    breakInStudent(view, mMaterialDialog, dialogView, dialogBinding.edtReason.text.toString())
                } else {
                    showToast(view.context, "Please select drop of person")
                }

            } else {
                AppInstance.breakData?.data?.get(breakposition)?.breakInTime =
                    AppInstance.breakData?.data?.get(breakposition)?.breakOutTime
                if (breakdroppedById != null) {
                    AppInstance.breakData?.data?.get(breakposition)?.dropedById = breakdroppedById
                    breakInStudent(view, mMaterialDialog, dialogView, dialogBinding.edtReason.text.toString())

                } else {
                    showToast(view.context, "Please select drop of person")
                }
            }


        }


        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    fun checkBreakStatus(): Boolean {
        AppInstance.HadBreakIn = false
        if (AppInstance.breakData!!.data?.size!! > 0) {
            for (pos in 0 until AppInstance.breakData!!.data!!.size) {
                if (AppInstance.breakData!!.data!![pos].breakStatusId == 1) {
                    AppInstance.HadBreakIn = true
                    break
                }
            }
        }
        return AppInstance.HadBreakIn!!
    }

    private fun showBreakInDialog(view: View) {

        if (!checkBreakStatus()) {


            val attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)
            /* val breakdata = AppInstance.breakData?.data?.get(breakposition)
        breakdata?.dropedById?.let { droppedById }
        breakdata?.pickupById?.let { pickedById }*/
            val response = AppInstance.allGuardians
            val mMaterialDialog = MaterialDialog(view.context)
            val dialogView = LayoutInflater.from(view.context)
                .inflate(
                    R.layout.sample_breakin_out_confirmation_popup,
                    null
                )
            val dialogBinding = SampleBreakinOutConfirmationPopupBinding.bind(dialogView)
            breakdata = StudentBreakData()
            dialogBinding.viewModel = breakdata
            dialogBinding.txtDate.text = dialogDisplayDate.format(
                displayDate.parse(attendancedata?.attendanceDate)
            )                                         //AppInstance.selectedDate
            dialogBinding.edtBreakOut.setOnClickListener {
                breaktimepicker(view, dialogBinding.edtBreakOut)
                // timepicker(view as TextInputEditText)

            }

            dialogBinding.btnCCancel.setOnClickListener {
                mMaterialDialog.dismiss()
            }

            dialogBinding.edtBreakIn.visibility = View.GONE
            dialogBinding.dropoffTv.visibility = View.GONE
            dialogBinding.dropoffBreakSpinner.visibility = View.GONE
            dialogBinding.edtBreakOut.visibility = View.VISIBLE
            dialogBinding.pickupTv.visibility = View.VISIBLE
            dialogBinding.pickupBreakSpinner.visibility = View.VISIBLE
            dialogBinding.edtReason.visibility = View.VISIBLE

            setBreakGuardianSpinnerData(
                dialogBinding.pickupBreakSpinner,
                AppInstance.allGuardians,
                view.context,
                "PICKUP"
            )

            dialogBinding.btnCCheckin.setOnClickListener {
                dialogBinding.btnCCancel.visibility = View.INVISIBLE
                dialogBinding.btnCCheckin.visibility = View.INVISIBLE
                dialogBinding.spinKit.visibility = View.VISIBLE
                //AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)?.dropedById = breakpickedById

                if (dialogBinding.edtBreakOut.text.toString() != "") {
                    breakoutTime = convertDate(dialogBinding.edtBreakOut.text.toString(), dialogDisplayTime, serverDate)
                    breakOutStudent(view, mMaterialDialog, dialogView, dialogBinding.edtReason.text.toString())

                } else {
                    showToast(view.context, "Please select break out time")
                }


            }




            mMaterialDialog.setCanceledOnTouchOutside(false)
            mMaterialDialog.setView(dialogView).show()
        } else {
            showToast(view.context, "Student is already on Breakout")
        }
    }


    private fun breakOutStudent(
        view: View,
        mMaterialDialog: MaterialDialog,
        dialogView: View,
        reason: String
    ) {

        val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)
        val body = StudentBreakData()
        val manager = NetworkManager()
        body.studentID = Attendancedata?.studentID
        body.agencyID = Attendancedata?.agencyID
        body.approvedPickupById = breakpickedById
        body.pickupById = breakpickedById
        body.attendanceDate = Attendancedata?.attendanceDate
        body.breakStatusId = 1
        body.classAttendenceID = Attendancedata?.id
        body.id = 0
        body.attendanceDate = Attendancedata?.attendanceDate
        body.attendenceStatusID = Attendancedata?.attendenceStatusID
        body.breakOutTime = breakoutTime
        body.breakReason = reason
        body.createdBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setBreakData(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    if (breakeditable) {
                        if (AppInstance.breakData != null) {
                            AppInstance.breakData?.data?.get(breakposition)?.id = response.saveId
                        }
                    }
                    // mMaterialDialog.dismiss()
                    onBreakInRedirect(view, "2")

                    Log.i("Response Checkin :", response.message.toString())
//                    AppInstance.trackingHistory = response
                } else {
                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                if (breakeditable) {
                    showToast(view.context, "Details Updated Successfully!!")
                } else {
                    showToast(view.context, response.message.toString())
                }
                mMaterialDialog.dismiss()
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
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
                breakoutTime = convertDate(dialogBinding.edtBreakOut.text.toString(), dialogDisplayTime, serverDate)
                isLoading.value = true

                val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)
                val body = StudentBreakData()
                val manager = NetworkManager()
                body.studentID = Attendancedata?.studentID
                body.agencyID = Attendancedata?.agencyID
                body.approvedPickupById = breakpickedById
                body.pickupById = breakpickedById
                body.attendanceDate = Attendancedata?.attendanceDate
                body.breakStatusId = 1
                body.classAttendenceID = Attendancedata?.id
                body.id = 0
                body.attendanceDate = Attendancedata?.attendanceDate
                body.attendenceStatusID = Attendancedata?.attendenceStatusID
                body.breakOutTime = breakoutTime
                body.breakReason = reason
                body.createdBy = AppInstance.loginResponse?.data?.loginUserID
                var datai = "hello"

                manager.createApiRequest(ApiUtilis.getAPIService(view.context).setBreakData(body), object :
                    ServiceListener<BaseModel> {
                    @SuppressLint("LogNotTimber")
                    override fun getServerResponse(response: BaseModel, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            isLoading.value = false
                            /*  if(breakeditable) {
                                  if (AppInstance.breakData != null) {
                                      AppInstance.breakData?.data?.get(breakposition)?.id = response.saveId
                                  }
                              }

                             onBreakInRedirect(view,"2")*/
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

                            Log.i("Response Checkin :", response.message.toString())
                            //                    AppInstance.trackingHistory = response
                        } else {
                            isLoading.value = false
                            Log.i("Error Checkin", response.statusCode.toString() + response.message)
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

    private fun breakInStudent(
        view: View,
        mMaterialDialog: MaterialDialog,
        dialogView: View,
        reason: String
    ) {

        // val data = AppInstance.breakData?.data?.get(breakposition)
        // val dialogBinding = BreakinOutConfirmationBinding.bind(dialogView)


        val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)

        AppInstance.breakData?.data?.get(breakposition)?.approvedPickupById = breakpickedById
        AppInstance.breakData?.data?.get(breakposition)?.pickupById = breakpickedById


        val body = StudentBreakData()
        val manager = NetworkManager()
        body.studentID = Attendancedata?.studentID
        body.agencyID = Attendancedata?.agencyID
        body.approvedPickupById = AppInstance.breakData?.data?.get(breakposition)?.pickupById
        body.pickupById = AppInstance.breakData?.data?.get(breakposition)?.pickupById
        body.dropedById = AppInstance.breakData?.data?.get(breakposition)?.dropedById
        body.attendanceDate = Attendancedata?.attendanceDate

        body.classAttendenceID = Attendancedata?.id
        body.id = AppInstance.breakData?.data?.get(breakposition)?.id
        body.attendanceDate = Attendancedata?.attendanceDate
        body.attendenceStatusID = Attendancedata?.attendenceStatusID
        body.breakStatusId = 2
        body.breakInTime = AppInstance.breakData?.data?.get(breakposition)?.breakInTime
        body.breakOutTime = AppInstance.breakData?.data?.get(breakposition)?.breakOutTime
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID
        AppInstance.breakData?.data?.get(breakposition)?.breakInTime = body.breakInTime

        AppInstance.breakData?.data?.get(breakposition)?.breakStatusId = body.breakStatusId

        body.breakReason = reason
        AppInstance.breakData?.data?.get(breakposition)?.breakReason = body.breakReason


        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setBreakData(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    if (breakeditable) {

                        if (AppInstance.breakData != null) {
                            AppInstance.breakData?.data?.get(breakposition)?.id = response.saveId
                        }
                    }
                    AppInstance.breakPosition = breakposition
                    breakEditStatusResponse.value = AppInstance.breakData
                    mMaterialDialog.dismiss()
                    showToast(view.context, "Details Updated Successfully!!")


                    Log.i("Response Checkin :", response.message.toString())
//                    AppInstance.trackingHistory = response
                } else {
                    mMaterialDialog.dismiss()
                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                /* if (editable) {


                 } else {
                     showToast(view.context, response.message.toString())
                 }*/

            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }


    //TODO: BreakIn Save
    fun breakInStudentSave(
        view: View,
        reason: String,
        breakpickedById: Int,
        breakdroppedById: Int

    ) {
        val intent = Intent()
        val dialogBinding = DataBindingUtil.findBinding<BreakinOutConfirmationBinding>(view)

        val Attendancedata = AppInstance.allAttendanceData?.data?.get(AppInstance.breakParentPosition!!)

        AppInstance.studentBreakData?.approvedPickupById = breakpickedById
        AppInstance.studentBreakData?.pickupById = breakpickedById
        AppInstance.studentBreakData?.dropedById = breakdroppedById

        if (dialogBinding?.edtBreakOut!!.text.toString() != "") {
            breakoutTime = convertDate(dialogBinding.edtBreakOut.text.toString(), dialogDisplayTime, serverDate)
            AppInstance.studentBreakData?.breakOutTime = breakoutTime
        }

        if (dialogBinding?.edtBreakIn!!.text.toString() != "") {
            breakinTime = convertDate(dialogBinding.edtBreakIn.text.toString(), dialogDisplayTime, serverDate)
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
        body.attendanceDate = Attendancedata?.attendanceDate

        body.classAttendenceID = Attendancedata?.id
        body.id = AppInstance.studentBreakData?.id
        body.attendanceDate = Attendancedata?.attendanceDate
        body.attendenceStatusID = Attendancedata?.attendenceStatusID
        body.breakStatusId = 2
        body.breakInTime = AppInstance.studentBreakData?.breakInTime
        body.breakOutTime = AppInstance.studentBreakData?.breakOutTime
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        AppInstance.studentBreakData?.breakInTime = body.breakInTime

        AppInstance.studentBreakData?.breakStatusId = body.breakStatusId

        body.breakReason = reason
        AppInstance.studentBreakData?.breakReason = body.breakReason
        intent.putExtra(STUDENT_BREAK_DATA, AppInstance.studentBreakData)

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setBreakData(body), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    /*if(breakeditable) {

                        if (AppInstance.breakData != null) {
                            AppInstance.breakData?.data?.get(breakposition)?.id = response.saveId
                        }
                    }*/



                    AppInstance.breakPosition = breakposition
                    // breakEditStatusResponse.value=AppInstance.breakData
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


    fun onBreakInRedirectPage(view: View) {
        onBreakInRedirect(view, "1")
    }

    fun onBreakInRedirect(view: View, check: String) {
        var loader = Loader()
        if (check.equals("2")) {
            position = AppInstance.breakParentPosition!!
        }


        if (AppInstance.allAttendanceData?.data?.get(position)?.id == 0) {
            showToast(view.context, "Please mark the attendance for Break In")

        } else {

            loader.startLoader(view.context)
//            isLoading.value = true
            val body = BreakData()
            val manager = NetworkManager()
            body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
            body.studentID = AppInstance.allAttendanceData?.data?.get(position)?.studentID.toString()
            body.classAttendenceID = AppInstance.allAttendanceData?.data?.get(position)?.id.toString()
            this.position = position

            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStudentBreakStatus(body), object :
                ServiceListener<BreakData> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: BreakData, requestcode: Int) {
                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        AppInstance.breakData = response
                        breakStatusResponse.value = response


                        val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                        Log.i("Response GetClass >> ", response.message.toString())
                        // if (response.data?.isNotEmpty()!!) {
                        // if(check.equals("1")) {
                        val intent = Intent(view.context, StudentBreakInOutActivity::class.java)
                        intent.putExtra("POSITION", position.toString())
                        intent.putExtra("SelectedDate", mSelectedDate)
                        view.context.startActivity(intent)
                        /* }
                         else{

                         }*/


                    } else {
//                        isLoading.value = false
                    }
                    loader.stopLoader()
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showToast(view.context, "Check Internet Connection")
//                    isLoading.value = false
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
                    isLoading.value = true
                    getAttendanceData(getServerDate(mSelectedDate), mClassId, view)
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

    fun getClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {
                classApiResponse.value = response
                AppInstance.allClasses = response
                if (response.statusCode == ResponseCodes.Success) {
                    val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data != null && response.data.isNotEmpty()) {
                        val niceSpinner = binding?.classSpinner
                        val data: MutableList<String> = mutableListOf()
                        for (pos in 0 until response.data.size) {
                            response.data[pos].className?.let { it1 -> data.add(it1) }
                        }
                        val dataset = LinkedList(data)
                        niceSpinner?.attachDataSource(dataset)

                        var selectedPOS: Int = 0
                        for (indexpos in 0 until dataset.size) {
                            if (dataset[indexpos].equals(AppInstance.teacherClassCheckInModel?.data!![0].label)) {
                                selectedPOS = indexpos
                                mClassId = AppInstance.teacherClassCheckInModel?.data!![0].value!!
                                // mClassId=3
                                break
                            }
                        }
                        niceSpinner!!.selectedIndex = selectedPOS

                        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
                            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                                isLoading.value = true
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

                    if (AppInstance.teacherClassCheckInModel?.data != null) {
                        mClassId = AppInstance.teacherClassCheckInModel?.data!!.get(0).value!!
                        getAttendanceData(getServerDate(mSelectedDate), mClassId, view)

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
//    Api to get Attendance list

    private fun getAttendanceData(date: String, id: Int?, view: View) {
        val body = AttendanceData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classID = id
        body.askedDate = date

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassAttendence(body), object :
            ServiceListener<AttendanceModel> {
            override fun getServerResponse(response: AttendanceModel, requestcode: Int) {
                attendenceApiResponse.value = response
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allAttendanceData = response
                    Log.i("Response GetAttendence=", response.message.toString())

                }
                isLoading.value = false
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
        } else {
            statusFlag.set(data.attendenceStatusID)
        }
        this.position = position
//    AppInstance.selectedDate= dialogDisplayDate.format(Date())
//        AppInstance.selectedTime = dialogDisplayTime.format(Date())
    }


    constructor(breakData: StudentBreakData, positionbreak: Int, flag: String, contextView: View) : this() {
        this.breakdata = breakData
        this.breakposition = positionbreak
        val binding = DataBindingUtil.findBinding<StudentBreakListItemBinding>(contextView)
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
    val pickupBy = ObservableField<String>("")
    val dropBy = ObservableField<String>("")

    private var droppedById = 0
    private var pickedById = 0
    private var breakdroppedById = 0
    private var breakpickedById = 0
    private var breakoutTime = ""
    private var breakinTime = ""
    private var selectedLeaveReasonId = 0
    private var editable = false
    private var undo = false
    private lateinit var iLoaderCallback: ILoaderCallback
    var position: Int = 0
    var breakposition: Int = 0
    private var settime = getServerDate(getCurrentDateTime())
    private var setbreaktime = getServerDate(getCurrentDateTime())

    fun onClickCheckIn(view: View) {
        editable = false
        iLoaderCallback.startLoader(true)
        getGuardiansData(view)
//        showToast(view.context," ->"+selectedtime+" "+ getServerDate(selectedtime))
    }

    fun onClickCheckOut(view: View) {
        editable = false
        iLoaderCallback.startLoader(true)
        getGuardiansData(view)
    }

    fun onClickAbsent(view: View) {
        if (statusFlag.get() != IS_CHECKED_ABSENT) {  //    Already Absent
            editable = false
            undo = false
            iLoaderCallback.startLoader(true)
            getLeaveReasonData(view)
//            showAbsentDialog(view)
        }
    }

    fun onClickEditBtn(view: View) {
        editable = true
        iLoaderCallback.startLoader(true)
        val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
        when {
            statusFlag.get() == IS_CHECKED_IN || statusFlag.get() == IS_ON_BREAK -> getGuardiansData(view) // need diffrent dialog for edit
            statusFlag.get() == IS_CHECKED_OUT -> getGuardiansData(view)
            statusFlag.get() == IS_CHECKED_ABSENT -> //                binding!!.absentBtn.isChecked = true
                getLeaveReasonData(view)
        }
    }

    private fun showAbsentDialog(view: View) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        iLoaderCallback.startLoader(false)
        val response = AppInstance.allLeaveReasons
        val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.absent_confirmation,
                null
            )

        val dialogBinding = AbsentConfirmationBinding.bind(dialogView)
        dialogBinding.model = data
        dialogBinding.txtDate.text = dialogDisplayDate.format(
            displayDate.parse(data?.attendanceDate)
        )                                         //AppInstance.selectedDate
        val time: String? = data?.attendanceDate?.let { getDayName(it) + " " + getCurrentTime() }
        dialogBinding.txtTime.text = time


        if (editable) dialogBinding.undoCheckBox.visibility = View.VISIBLE
        else dialogBinding.undoCheckBox.visibility = View.INVISIBLE

        setLeaveReasonSpinnerData(dialogBinding.spinner5, response, view.context)

        dialogBinding.btnCCancel.setOnClickListener {
            binding!!.absentBtn.isChecked = statusFlag.get() == IS_CHECKED_ABSENT
            mMaterialDialog.dismiss()
        }

        dialogBinding.absBtnSave.setOnClickListener {
            if (dialogBinding.undoCheckBox.isChecked) {
                undo = true
            }
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.absBtnSave.visibility = View.INVISIBLE
            dialogBinding.spinKit.visibility = View.VISIBLE

            AppInstance.allAttendanceData?.data?.get(position)?.reasonId = selectedLeaveReasonId
            AppInstance.allAttendanceData?.data?.get(position)?.onLeaveComment =
                dialogBinding.absentComment.text.toString()

            checkAbsentStudent(view, mMaterialDialog, dialogBinding.absentComment)
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()

    }

    private fun checkAbsentStudent(
        view: View,
        mMaterialDialog: MaterialDialog,
        absentComment: EditText
    ) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = data?.className
        body.studentID = data?.studentID
        body.agencyID = data?.agencyID
        body.isEditModeOn = editable
        body.classID = data?.classesID
        body.classesID = data?.classesID
        body.id = data?.id
        body.attendanceDate = data?.attendanceDate
        body.attendenceStatusID = IS_CHECKED_ABSENT
        body.onLeave = true
        body.onLeaveComment = data?.onLeaveComment
        body.reasonId = data?.reasonId
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        if (undo) {
            body.onLeaveComment = ""
            body.attendenceStatusID = IS_TO_BE_CHECKED
            body.onLeave = false

        }

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setAttendenceAbsent(body), object :
            ServiceListener<AttendanceResponse> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    statusFlag.set(IS_CHECKED_ABSENT)
                    AppInstance.allAttendanceData?.data?.get(position)?.id = response.saveId


                    if (undo) {
                        statusFlag.set(IS_TO_BE_CHECKED)

                        AppInstance.allAttendanceData?.data?.get(position)?.onLeaveComment = ""
                    }
                    //            onSuccess
                    mMaterialDialog.dismiss()

                    Log.i("Response Checkin :", response.message.toString())
                } else {

                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                if (editable) {
                    showToast(view.context, "Details Updated Successfully!!")
                } else {
                    showToast(view.context, response.message.toString())
                }
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    private fun showCheckinDialog(view: View) {
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
    }

    private fun showEditDialog(view: View) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        data?.dropedById?.let { droppedById }
        data?.pickupById?.let { pickedById }
        iLoaderCallback.startLoader(false)
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

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        dialogBinding.editTime.setOnClickListener {
            timepicker(view, dialogBinding.txtTime)
        }
        if (statusFlag.get() == IS_CHECKED_IN || statusFlag.get() == IS_ON_BREAK) {
            val time: String? =
                data?.checkInTime?.let { data?.attendanceDate?.let { it1 -> getDayName(it1) } + " " + getTime(it) }
            dialogBinding.txtTime.text = time

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
        } else if (statusFlag.get() == IS_CHECKED_OUT) {
            val time: String? =
                data?.checkOutTime?.let { data?.attendanceDate?.let { it1 -> getDayName(it1) } + " " + getTime(it) }
            dialogBinding.txtTime.text = time

            dialogBinding.dropoffTv.isEnabled = false
            dialogBinding.dropoffSpinner.isEnabled = false

            setGuardianDisableSpinnerData(dialogBinding.dropoffSpinner, response, view.context)
            setGuardianSpinnerData(dialogBinding.pickupSpinner, response, view.context)
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
                checkOutStudent(view, mMaterialDialog)
            }
        } else {
            val time: String? = data?.attendanceDate?.let { getDayName(it) + " " + getCurrentTime() }
            dialogBinding.txtTime.text = time
        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun setGuardianDisableSpinnerData(
        spinner: Spinner,
        response: GuardianModel?,
        context: Context
    ) {
        val dropid = AppInstance.allAttendanceData?.data?.get(position)?.dropedById
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
//            data.add("Select")
            for (pos in 0 until response.data.size) {
                response.data[pos].guardianName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context
                , android.R.layout.simple_list_item_1, data
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


    fun setBreakGuardianSpinnerData(
        spinner: Spinner,
        response: GuardianModel?,
        context: Context,
        flag: String
    ) {
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
//            data.add("Select")
            for (pos in 0 until response.data.size) {
                response.data[pos].guardianName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context
                , android.R.layout.simple_list_item_1, data
            )


            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                    //isLoading.value = true
                    if (flag.equals("PICKUP")) {
                        breakpickedById = response.data[position].guardianId!!
                    } else {
                        breakdroppedById = response.data[position].guardianId!!
                    }


                    /*    if (!editable) {
                      when {
                          statusFlag.get() == IS_TO_BE_CHECKED -> droppedById = response.data[position].guardianId!!
                          statusFlag.get() == IS_CHECKED_IN -> pickedById = response.data[position].guardianId!!
                      }
                  } else {
                      when {
                          statusFlag.get() == IS_CHECKED_IN -> droppedById = response.data[position].guardianId!!
                          statusFlag.get() == IS_CHECKED_OUT -> pickedById = response.data[position].guardianId!!
                      }
                  }*/
                }

                override fun onNothingSelected(parent: AdapterView<*>) {
//                    showToast(context, "Please Select Guardian")

                }
            }

            if (breakeditable) {
                for (pos in 0 until response.data.size) {
                    if (flag.equals("PICKUP")) {
                        if (response.data[pos].guardianId == AppInstance.breakData?.data?.get(AppInstance.breakParentPosition!!)!!.pickupById) {
                            spinner.setSelection(pos)
                        }
                    } else {
                        if (response.data[pos].guardianId == AppInstance.breakData?.data?.get(AppInstance.breakParentPosition!!)!!.dropedById) {
                            spinner.setSelection(pos)
                        }

                    }
                }
            }
            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                    // isLoading.value = true
                    if (!breakeditable) {
                        if (flag.equals("PICKUP")) {
                            breakpickedById = response.data[position].guardianId!!
                        } else {
                            breakdroppedById = response.data[position].guardianId!!
                        }


                    } else {
                        if (flag.equals("PICKUP")) {
                            breakpickedById = response.data[position].guardianId!!
                        } else {
                            breakdroppedById = response.data[position].guardianId!!
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


    private fun setGuardianSpinnerData(
        spinner: Spinner,
        response: GuardianModel?,
        context: Context
    ) {
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
//            data.add("Select")
            for (pos in 0 until response.data.size) {
                response.data[pos].guardianName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context
                , android.R.layout.simple_list_item_1, data
            )

            if (editable) {
                for (pos in 0 until response.data.size) {
                    if (response.data[pos].guardianId == AppInstance.allAttendanceData?.data?.get(position)?.dropedById) {
                        spinner.setSelection(pos)
                    }
                }
            }
            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                    isLoading.value = true
                    if (!editable) {
                        when {
                            statusFlag.get() == IS_TO_BE_CHECKED -> droppedById = response.data[position].guardianId!!
                            statusFlag.get() == IS_CHECKED_IN -> pickedById = response.data[position].guardianId!!
                        }
                    } else {
                        when {
                            statusFlag.get() == IS_CHECKED_IN -> droppedById = response.data[position].guardianId!!
                            statusFlag.get() == IS_CHECKED_OUT -> pickedById = response.data[position].guardianId!!
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

    private fun setLeaveReasonSpinnerData(spinner: Spinner, response: LeaveReasonModel?, context: Context) {
        val leaveReasonId = AppInstance.allAttendanceData?.data?.get(position)?.reasonId
        if (response?.data?.isNotEmpty()!!) {
            val data: ArrayList<String> = ArrayList()
//            data.add("Select")
            for (pos in 0 until response.data.size) {
                response.data[pos].leaveReasonTypeName?.let { it1 -> data.add(it1) }
            }
            spinner.adapter = ArrayAdapter<String>(
                context
                , android.R.layout.simple_list_item_1, data
            )
            if (editable) {
                for (pos in 0 until response.data.size) {
                    if (response.data[pos].leaveReasonTypeID == leaveReasonId) {
                        spinner.setSelection(pos)
                    }
                }
            }
            spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                    isLoading.value = true
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

    private fun checkOutStudent(view: View, mMaterialDialog: MaterialDialog) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = data?.className
        body.studentID = data?.studentID
        body.agencyID = data?.agencyID
//        if (!editable) {
            body.checkOutTime = settime //2000-12-31T20:30:28.000Z
//        }
        body.isEditModeOn = true
//        body.isEditModeOn = editable
        body.classID = data?.classesID
        body.classesID = data?.classesID
        body.id = data?.id
        body.pickupById = data?.pickupById
        body.attendanceDate = data?.attendanceDate
        body.attendenceStatusID = IS_CHECKED_OUT
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setAttendenceCheckout(body), object :
            ServiceListener<AttendanceResponse> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    statusFlag.set(IS_CHECKED_OUT)            //            onSuccess

                        AppInstance.allAttendanceData?.data?.get(position)?.checkOutTime = settime

                    Log.i("Response Checkout :", response.message.toString())
//                    AppInstance.trackingHistory = response
                } else {
                    Log.i("Error Checkout", response.statusCode.toString() + response.message)
                }
                if (editable) {
                    showToast(view.context, "Details Updated Successfully!!")
                } else {
                    showToast(view.context, response.message.toString())
                }
                mMaterialDialog.dismiss()
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })

    }

    private fun checkinStudent(
        view: View,
        mMaterialDialog: MaterialDialog
    ) {
        val data = AppInstance.allAttendanceData?.data?.get(position)

        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.className = data?.className
        body.studentID = data?.studentID
        body.agencyID = data?.agencyID
            body.checkInTime = settime
        body.isEditModeOn = editable
        body.classID = data?.classesID
        body.classesID = data?.classesID
        body.id = data?.id
        body.dropedById = data?.dropedById
        body.attendanceDate = settime
            //data?.attendanceDate?.let { convertDate(it, displayDate, serverDate) } //08-23-2019 to 019-08-23T11:50:13.334Z
        body.date = settime //convertDate(getCurrentDate(),displayDate, serverDate)
        body.attendenceStatusID = IS_CHECKED_IN
        body.updatedBy = AppInstance.loginResponse?.data?.loginUserID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setAttendenceCheckin(body), object :
            ServiceListener<AttendanceResponse> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: AttendanceResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    statusFlag.set(IS_CHECKED_IN)
                    //          on Success
                    AppInstance.allAttendanceData?.data?.get(position)?.id = response.saveId
                    AppInstance.allAttendanceData?.data?.get(position)?.checkInTime = settime


                    Log.i("Response Checkin :", response.message.toString())
//                    AppInstance.trackingHistory = response
                } else {
                    Log.i("Error Checkin", response.statusCode.toString() + response.message)
                }
                if (editable) {
                    showToast(view.context, "Details Updated Successfully!!")
                } else {
                    showToast(view.context, response.message.toString())
                }
                mMaterialDialog.dismiss()
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    private fun getGuardiansData(view: View) {
        val body = GuardianRequest()
        val manager = NetworkManager()
        val data = AppInstance.allAttendanceData?.data?.get(position)
        body.agencyID = data?.agencyID
        body.studentID = data?.studentID
        body.classID = data?.classesID
        body.isAuthorized = true
//        "isAuthorized": true,
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getGuardians(body), object :
            ServiceListener<GuardianModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: GuardianModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allGuardians = response
                    Log.i("Response GetAttendence=", response.message.toString())
                    if (editable) showEditDialog(view)
                    else if (!editable) showCheckinDialog(view)
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
        //  val binding = DataBindingUtil.findBinding<StudentBreakListItemBinding>(view)

        manager.createApiRequest(ApiUtilis.getAPIService(context).getGuardians(body), object :
            ServiceListener<GuardianModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: GuardianModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allGuardians = response
                    guardianApiResponse.value = response

                    /*  if(pickId!=0) {
                          for (pos in 0 until AppInstance.allGuardians?.data?.size!!) {
                              if (AppInstance.allGuardians?.data!!.get(pos).guardianId == pickId) {
                                  if (binding != null) {
                                      binding.pickUpByTxt.setText(AppInstance.allGuardians?.data!!.get(pos).guardianName)
                                  }
                              }
                          }
                      }
                      if(dropId!=0) {
                          for (pos in 0 until AppInstance.allGuardians?.data?.size!!) {
                              if (AppInstance.allGuardians?.data!!.get(pos).guardianId == dropId) {
                                  if (binding != null) {
                                      binding.dropOfByTxt.setText(AppInstance.allGuardians?.data!!.get(pos).guardianName)
                                  }
                              }
                          }
                      }*/

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

    private fun getLeaveReasonData(view: View) {
        val data = AppInstance.allAttendanceData?.data?.get(position)
        val body = AttendanceRequest()
        val manager = NetworkManager()
        body.agencyID = data?.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getReasons(body), object :
            ServiceListener<LeaveReasonModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: LeaveReasonModel, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.allLeaveReasons = response
                    Log.i("Response GetAttendence=", response.message.toString())
                    showAbsentDialog(view)
                } else {
                    val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
                    binding!!.absentBtn.isChecked = false
                    Log.i("Error Checkout", response.statusCode.toString() + response.message)
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                val binding = DataBindingUtil.findBinding<AttendanceListItemBinding>(view)
                binding!!.absentBtn.isChecked = false
                Log.e("Error", error.error_message)
            }
        })
    }

    fun setLoader(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    private fun timepicker(view: View, txtTime: TextView) {

        val data = AppInstance.allAttendanceData?.data?.get(position)
        val c = Calendar.getInstance()
        val mHour = c.get(Calendar.HOUR_OF_DAY)
        val mMin = c.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(
            view.context,
            TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                var mHourOfDay = hourOfDay
                val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                val mdate = parseTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))
                val time = SimpleDateFormat("HH:mm ", Locale.getDefault()).format(mdate)
                settime = getServerDate(
                    yearDateFormat.format(
                        displayDate.parse(data?.attendanceDate)
                    ) + " " + time
                )
//                if (statusFlag.get() == IS_CHECKED_IN) {
//                    AppInstance.allAttendanceData?.data?.get(position)?.checkInTime = settime
//                } else if (statusFlag.get() == IS_CHECKED_OUT) {
//                    AppInstance.allAttendanceData?.data?.get(position)?.checkOutTime = settime
//                }

//                val selectedTime = getDayName(Date()) + " " + convertDate(settime, serverDate, displayTime)
//                txtTime.text = selectedTime
//                showToast(view.context, " ->" + convertDate(settime, serverDate, displayTime))
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
                val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                val mdate = parseTime.parse(mTime)
                txtTime.setText(dialogDisplayTime.format(mdate))

            }, mHour, mMin, false
        )
        timePickerDialog.show()
    }


    fun onClickStartTime(view: View) {
        timepicker(view as TextInputEditText)
    }
}


/**
 * check internet before calling api, show retry toast or image.
 * validation on checkin checkout dialogbox
 */
