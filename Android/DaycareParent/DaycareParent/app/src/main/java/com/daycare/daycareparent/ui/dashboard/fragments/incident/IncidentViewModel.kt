package com.daycare.daycareparent.ui.dashboard.fragments.incident

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Intent
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.os.Bundle
import android.support.design.widget.TextInputEditText
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.AdapterView
import android.widget.LinearLayout
import android.widget.SearchView
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityAddIncidentBinding
import com.daycare.daycareparent.databinding.ActivityIncidentDetailBinding

import com.daycare.daycareparent.databinding.FragmentIncidentReportBinding
import com.daycare.daycareparent.databinding.MultiselectDialogBinding
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.dashboard.adapter.ChooseStudentsAdapter
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.OptionConstant.EDIT
import com.daycare.daycareparent.utill.OptionConstant.VIEW_LOG
import me.drakeet.materialdialog.MaterialDialog
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class IncidentViewModel() : ViewModel() {

    /**
     * Incident Fragment methods
     */

    val classApiResponse = MutableLiveData<Any>()
    val studentApiResponse = MutableLiveData<Any>()
    val addIncidentFab = MutableLiveData<Boolean>()
    val todaysDate = Calendar.getInstance().time!!
    val viewId = INCIDENTLOGACTIVITY

    fun onClickAddIncidentFab(view: View) {
        addIncidentFab.value = true
//        startActivity(intent)
    }

    /**
     * AddIncidentActivity methods
     */

    constructor(view: View, taskId: Int) : this() {
        TASK_ID = taskId
        val c = Calendar.getInstance().getTime()
        println("Current time => $c")

        val df = SimpleDateFormat("dd MMM yyyy")
        var formattedDate = df.format(c)
        incidentDate.set(formattedDate)

        getClassData(view)
        getListNatureOfInjury(view)
        getTeacherList(view)
        isDoctorRequired.set(false)
        isParentInformed.set(false)

        if (TASK_ID == EDIT) {
            val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
            val incidentData = AppInstance.incidentData
            isDoctorRequired.set(incidentData?.isDoctorRequired)
            isParentInformed.set(incidentData?.wasParentInformed)
            incidentTime.set(convertDate(incidentData?.incidentTime!!, alohaDate, dialogDisplayTime))
            incidentDate.set(convertDate(incidentData.incidentDate!!, alohaDate, incidentDisplayDate))
            placeOfIncident.set(incidentData.placeOfIncident)
            parentComment.set(incidentData.parentComment)
            howParentInformed.set(incidentData.parentInformedBy)
            injuryDescription.set(incidentData.description)
            actionTaken.set(incidentData.actionTaken)
            allInvolvedStudent.value = getArrayOfStudents(AppInstance.incidentInvolvments)
            selectedStudentsList = getArrayOfStudents(AppInstance.incidentInvolvments)!!
        }
    }

    private fun getArrayOfStudents(incidentInvolvments: List<IncidentInvolvment>?): ArrayList<String>? {
        val list = ArrayList<String>()
        if (incidentInvolvments != null) {
            for (pos in 0 until incidentInvolvments.size) {
                incidentInvolvments[pos].studentName?.let { list.add(it) }
            }
        }
        return list
    }




    var allStudentsApiResponse = MutableLiveData<StudentModel>()
    var allInvolvedStudent = MutableLiveData<ArrayList<String>>()
    var deletedIncidentResponse = MutableLiveData<Int>()
    var incidentTime = ObservableField<String>()
    var incidentDate = ObservableField<String>()
    var placeOfIncident = ObservableField<String>()
    var howParentInformed = ObservableField<String>()
    var injuryDescription = ObservableField<String>()
    var actionTaken = ObservableField<String>()
    var isDoctorRequired = ObservableField<Boolean>()
    var isParentInformed = ObservableField<Boolean>()
    var TASK_ID = VIEW_LOG
    var selectedStudentsList = ArrayList<String>()
    var selectedDate = MutableLiveData<String>()
    var mSelectedDate = getCurrentDateTime()
    var parentComment = ObservableField<String>()


    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentIncidentReportBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String

        mDatePicker =
            DatePickerDialog(view.context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year
                try {
                    val mdate = displayDate.parse(mDate)
                    binding!!.dateTxt.text = numDate.format(mdate)
                    binding.weekDayTxt.text = dayofWeek.format(mdate)
                    binding.monthYrTxt.text = monthYear.format(mdate)
                    selectedDate.value = mDate
                    mSelectedDate = mDate

                    getAllIncidentReportData(getServerDate(mSelectedDate), view)
                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        mDatePicker.show()
    }


    fun multipleSelectDialog(view: View, response: StudentModel) {
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.multiselect_dialog,
                null
            )
        val dialogBinding = MultiselectDialogBinding.bind(dialogView)
        val recyclerView = dialogBinding.selectContainer

        recyclerView.layoutManager = LinearLayoutManager(dialogView.context, LinearLayout.VERTICAL, false)
        (recyclerView.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
        dialogBinding.selectContainer.layoutManager = recyclerView.layoutManager
        val listAdapter = ChooseStudentsAdapter(response.data as ArrayList<StudentData>?, selectedStudentsList)
        dialogBinding.selectContainer.adapter = listAdapter
        dialogBinding.searchStudent.setOnQueryTextListener(object : SearchView.OnQueryTextListener {

            override fun onQueryTextChange(p0: String): Boolean {
                listAdapter.filter(p0)
                return false
            }

            override fun onQueryTextSubmit(p0: String): Boolean {
                listAdapter.filter(p0)
                return false
            }

        })

        dialogBinding.searchStudent.setOnClickListener {
            dialogBinding.searchStudent.isIconified = false
            dialogBinding.searchStudent.clearFocus()
        }
        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        dialogBinding.absBtnSave.setOnClickListener {

            allInvolvedStudent.value = listAdapter.checkedStudentList
            if (listAdapter.checkedStudentList != null) {
                selectedStudentsList = listAdapter.checkedStudentList!!
            }
            mMaterialDialog.dismiss()

        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    fun onClickAddIncidentBtn(view: View) {
    }

        fun onClickUpdateIncidentBtn(view: View) {

            val binding = DataBindingUtil.findBinding<ActivityIncidentDetailBinding>(view)
            val incidentData = IncidentData()
            val intent = Intent()
            incidentData.id = AppInstance.incidentData?.id
            incidentData.agencyID = AppInstance.loginResponse?.data?.agencyID
            incidentData.parentComment = binding?.commentText?.text.toString()
            incidentData.isAcknowledge = binding?.isAcknowledge?.isChecked
            incidentData.updatedBy = AppInstance.loginResponse?.data?.releventUserID

            var rrr:String="data for update"

            if(incidentData.parentComment!=null) {
                isLoading.value = true
                updateIncident(incidentData, view, intent)
            }

    }



    private fun updateIncident(incidentData: IncidentData,
                               view: View,
                               intent: Intent){
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).updateIncident(incidentData), object :
            ServiceListener<IncidentModel> {
            override fun getServerResponse(response: IncidentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.incidentData = incidentData
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Incident Updated Successfully")
                    (view.context as Activity).setResult(Activity.RESULT_OK, intent)
                    (view.context as Activity).finish()

                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }


    private fun addIncident(
        incidentData: IncidentData,
        view: View,
        intent: Intent
    ) {
        val manager = NetworkManager()
        if (TASK_ID == EDIT) {
            incidentData.id = AppInstance.incidentData?.id

        }
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setIncident(incidentData), object :
            ServiceListener<IncidentModel> {
            override fun getServerResponse(response: IncidentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.incidentData = incidentData
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + response.message)
                    (view.context as Activity).setResult(Activity.RESULT_OK, intent)
                    (view.context as Activity).finish()

                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })


    }

    fun onClickIncidentDate(view: View) {
        datepicker(view.context, view as TextInputEditText)
    }

    fun onClickIncidentTime(view: View) {
        timepicker(view as TextInputEditText)
    }

    private fun getClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    classApiResponse.value = response
                    AppInstance.allClasses = response
                    loadClassData(view, TASK_ID, response)
                    isLoading.value = false

                } else {
                    showToast(view.context, "No Data Found!!")
                    isLoading.value = false
                }
//                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })
    }

    private fun loadClassData(
        view: View,
        tasK_ID: Int,
        response: ClassModel
    ) {
        val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
        Log.i("Response GetClass >> ", response.message.toString())
        val niceSpinner = binding?.spinnerClassName
        val data: MutableList<String> = mutableListOf()
        for (pos in 0 until response.data?.size!!) {
            response.data[pos].className?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        var position = 0
        niceSpinner?.attachDataSource(dataset)
        if (tasK_ID == EDIT) {
            val incidentData = AppInstance.incidentData
            for (pos in 0 until response.data.size) {
                if (response.data[pos].classesID == incidentData?.classesID) {
                    niceSpinner?.selectedIndex = pos
                    position = pos
                }
            }
        }
        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                isLoading.value = true
                getStudentData(response.data[position].classesID, view)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        })
        getStudentData(response.data[position].classesID, view)
    }

    private fun getStudentData(classId: Int?, view: View) {
//        isLoading.value = true
        val body = StudentData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.classId = classId
        body.studentName = ""
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStudentsByClass(body), object :
            ServiceListener<StudentModel> {
            override fun getServerResponse(response: StudentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    isLoading.value = false
                    studentApiResponse.value = response
                    AppInstance.allStudents = response
                    loadClassStudentData(view, TASK_ID, response)
                } else {
                    showToast(view.context, "No Data Found!!")
                    Log.i("Error", response.statusCode.toString() + response.message)
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }

    private fun loadClassStudentData(view: View, tasK_ID: Int, response: StudentModel) {
        val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
        val niceSpinner = binding?.spinnerStudent
        val data: MutableList<String> = mutableListOf()
        for (pos in 0 until response.data?.size!!) {
            response.data[pos].studentName?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        niceSpinner?.attachDataSource(dataset)

        if (tasK_ID == EDIT) {
            val incidentData = AppInstance.incidentData
            for (pos in 0 until response.data.size) {
                if (response.data[pos].studentId == incidentData?.studentID) {
                    niceSpinner?.selectedIndex = pos
                }
            }
        }
    }

    private fun getListNatureOfInjury(view: View) {
        isLoading.value = true
        val body = InjuryData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getNatureOfInjury(body), object :
            ServiceListener<InjuryModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: InjuryModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    AppInstance.allInjuries = response
                    loadNatureOfInjuryData(view, TASK_ID, response)
                    isLoading.value = false

                } else {
                    showToast(view.context, "No Data Found!!")
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }

        })
    }

    private fun loadNatureOfInjuryData(view: View, tasK_ID: Int, response: InjuryModel) {
        val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
        Log.i("Response GetClass >> ", response.message.toString())

        val niceSpinner = binding?.injurySpinner
        val data: MutableList<String> = mutableListOf()
        for (pos in 0 until response.data?.size!!) {
            response.data!![pos].natureOfInjuryName?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        niceSpinner?.attachDataSource(dataset)

        if (tasK_ID == EDIT) {
            val incidentData = AppInstance.incidentData
            for (pos in 0 until response.data!!.size) {
                if (response.data!![pos].id == incidentData?.natureOfInjuryID) {
                    niceSpinner?.selectedIndex = pos
                }
            }
        }
    }

    private fun getTeacherList(view: View) {
        isLoading.value = true
        val body = TeacherData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllTeacher(body), object :
            ServiceListener<TeacherModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: TeacherModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success && response.data?.isNotEmpty()!!) {
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.allTeachers = response
                    loadTeacherData(view, TASK_ID, response)
                    isLoading.value = false

                } else {
                    showToast(view.context, "No Data Found!!")
                    isLoading.value = false
                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }

        })

    }

    private fun loadTeacherData(view: View, tasK_ID: Int, response: TeacherModel) {
        val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
        val niceSpinner = binding?.spinnerAdministard
        val data: MutableList<String> = mutableListOf()
        for (pos in 0 until response.data!!.size) {
            response.data!![pos].teacherName?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        niceSpinner?.attachDataSource(dataset)
        if (tasK_ID == EDIT) {
            val incidentData = AppInstance.incidentData
            for (pos in 0 until response.data!!.size) {
                if (response.data!![pos].id == incidentData?.teacherID) {
                    niceSpinner?.selectedIndex = pos
                }
            }
        }
    }


    /**
     * Incident Report Fragment Methods
     */

    val incidentReportApiResponce = MutableLiveData<IncidentModel>()
    val isLoading = MutableLiveData<Boolean>()

    fun getIncidentReport(view: View) {
        getAllIncidentReportData(getServerDate(mSelectedDate), view)
    }

    fun getAllIncidentReportData(date: String, view: View) {
        if (isLoading.value != true) {
            isLoading.value = true
            val body = IncidentData()
            val manager = NetworkManager()
            body.agencyID = AppInstance.loginResponse?.data?.agencyID
            body.studentID = PreferenceConnector.readChild(view.context, PreferenceConnector.CHILD)?.studentId
            body.incidentDate = date


            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllIncidents(body), object :
                ServiceListener<IncidentModel> {
                override fun getServerResponse(response: IncidentModel, requestcode: Int) {
                    isLoading.value = false
                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        incidentReportApiResponce.value = response
//                    AppInstance.allAttendanceData = response
                        Log.i("Response GetAttendence=", response.message.toString())

                    } else {
                        isLoading.value = false
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })

        }
    }

    fun deleteIncident(view: View, id: Int?, position: Int) {
        isLoading.value = true
        val manager = NetworkManager()
        val incidentData = IncidentData()
        incidentData.deletedDate = getCurrentDateTime()
        incidentData.isDeleted = true
        incidentData.agencyID = PreferenceConnector.readChild(view.context, PreferenceConnector.CHILD)?.agencyID
        incidentData.id = id

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).deleteIncident(incidentData), object :
            ServiceListener<IncidentModel> {
            override fun getServerResponse(response: IncidentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + response.message)
                    deletedIncidentResponse.value = position

                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
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
     * Involved Students Adapter
     */
    val studentName = ObservableField<String>("")

    constructor(data: StudentData) : this() {
        studentName.set(data.studentName)
    }


}