package com.daycare.daycareteacher.ui.dashboard.fragments.incident

import android.annotation.SuppressLint
import android.app.Activity
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
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
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAddIncidentBinding
import com.daycare.daycareteacher.databinding.MultiselectDialogBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.adapter.ChooseStudentsAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG
import me.drakeet.materialdialog.MaterialDialog
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
            val incidentData = AppInstance.incidentData
            isDoctorRequired.set(incidentData?.isDoctorRequired)
            isParentInformed.set(incidentData?.wasParentInformed)
            incidentTime.set(convertDate(incidentData?.incidentTime!!, alohaDate, dialogDisplayTime))
            incidentDate.set(convertDate(incidentData.incidentDate!!, alohaDate, incidentDisplayDate))
            placeOfIncident.set(incidentData.placeOfIncident)
            howParentInformed.set(incidentData.parentInformedBy)
            injuryDescription.set(incidentData.description)
            actionTaken.set(incidentData.actionTaken)

            partOfBody.set(incidentData.partOfBody)
            contextEnviroment.set(incidentData.contextEnviroment)
            contextChild.set(incidentData.contextChild)




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

    var partOfBody = ObservableField<String>()
    var contextEnviroment = ObservableField<String>()
    var contextChild = ObservableField<String>()
    var parentComment = ObservableField<String>()



    var isDoctorRequired = ObservableField<Boolean>()
    var isParentInformed = ObservableField<Boolean>()
    var TASK_ID = VIEW_LOG
    var selectedStudentsList = ArrayList<String>()

    fun onClickInvolvedStudents(view: View) {
        val data = StudentData()
        data.agencyID = AppInstance.loginResponse?.data?.agencyID
        data.studentName = ""

        getAllStudentData(data, view)
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

    private fun getAllStudentData(
        requestStudentData: StudentData,
        view: View
    ) {
        isLoading.value = true
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassStudentList(requestStudentData), object :
            ServiceListener<StudentModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: StudentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    AppInstance.allStudents = response
                    allStudentsApiResponse.value = response

                } else {
                    showToast(view.context, "Error " + response.message)
                    Log.i("Error", response.statusCode.toString() + response.message)
                }
            }

            @SuppressLint("LogNotTimber")
            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }

    fun onClickAddIncidentBtn(view: View) {

        val binding = DataBindingUtil.findBinding<ActivityAddIncidentBinding>(view)
        val intent = Intent()
        val data = Bundle()
        val involvements: ArrayList<IncidentInvolvment>
        val classList = AppInstance.allClasses?.data
        val studentList = AppInstance.allStudents?.data
        val injuryList = AppInstance.allInjuries?.data
        val administardList = AppInstance.allTeachers?.data
        val incidentData = IncidentData()

        incidentData.id = 0
        incidentData.agencyID = AppInstance.loginResponse?.data?.agencyID
        incidentData.classesID = classList?.get(binding?.spinnerClassName!!.selectedIndex)?.classesID
        incidentData.studentID = studentList?.get(binding?.spinnerStudent!!.selectedIndex)?.studentId
        incidentData.natureOfInjuryID = injuryList?.get(binding?.injurySpinner!!.selectedIndex)?.id
        incidentData.firstAidAdministeredID = administardList?.get(binding?.spinnerAdministard!!.selectedIndex)?.id
        incidentData.studentName = studentList?.get(binding?.spinnerStudent!!.selectedIndex)?.studentName
        incidentData.teacherName = administardList?.get(binding?.spinnerAdministard!!.selectedIndex)?.teacherName
        incidentData.teacherID = administardList?.get(binding?.spinnerAdministard!!.selectedIndex)?.id
        incidentData.firstAidAdministeredName =
            administardList?.get(binding?.spinnerAdministard!!.selectedIndex)?.teacherName
        incidentData.wasParentInformed = isParentInformed.get()
        incidentData.incidentPriortyTypeID = 2
        incidentData.reporter = administardList?.get(binding?.spinnerAdministard!!.selectedIndex)?.id
        incidentData.parentInformedBy = howParentInformed.get()
        incidentData.description = injuryDescription.get()
        incidentData.actionTaken = actionTaken.get()

        incidentData.partOfBody = partOfBody.get()
        incidentData.contextEnviroment = contextEnviroment.get()
        incidentData.contextChild = contextChild.get()

        incidentData.isDoctorRequired = isDoctorRequired.get()
        incidentData.placeOfIncident = placeOfIncident.get()
        incidentData.incidentInvolvments = getSelectedStudents()
        incidentData.incidentDate = incidentDate.get()?.let { convertDate(it, incidentDisplayDate, serverDate) }
        incidentData.incidentTime = incidentTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }

        data.putParcelable("incidentData", incidentData)
        intent.putExtra(INCIDENT_DATA, data)
        if (validated(incidentData, view)) {
            isLoading.value = true
            addIncident(incidentData, view, intent)
        }
    }

    private fun getSelectedStudents(): ArrayList<IncidentInvolvment>? {
        val list = ArrayList<IncidentInvolvment>()
        val allStds = AppInstance.allStudents
        for (studentName in selectedStudentsList) {
            val involvment = IncidentInvolvment()
            for (pos in 0 until allStds?.data?.size!!) {
                if (allStds.data[pos].studentName == studentName) {
                    involvment.studentID = allStds.data[pos].studentId
                    involvment.agencyID = allStds.data[pos].agencyID
                    involvment.classesID = allStds.data[pos].classId
                    involvment.id = 0
                    involvment.incidentID = 0
                    if (TASK_ID == EDIT) {
                        involvment.incidentID = AppInstance.incidentData?.id
                    }
                }
            }
            involvment.studentName = studentName
            list.add(involvment)
        }
        return list
    }

    private fun validated(incidentData: IncidentData, view: View): Boolean {
        when {
            incidentData.placeOfIncident.isNullOrEmpty() -> {
                showToast(view.context, "Please enter place of Incident")
                return false
            }
            incidentData.incidentDate.isNullOrEmpty() -> {
                showToast(view.context, "Please enter date of Incident")
                return false
            }
            incidentData.incidentTime.isNullOrEmpty() -> {
                showToast(view.context, "Please enter time of Incident")
                return false
            }
            incidentData.description.isNullOrEmpty() -> {
                showToast(view.context, "Please enter description")
                return false
            }

            else -> return true
        }
    }

    private fun addIncident(
        incidentData: IncidentData,
        view: View,
        intent: Intent
    ) {
        val manager = NetworkManager()
        if (TASK_ID == EDIT) {
            incidentData.id = AppInstance.incidentData?.id
            incidentData.updatedBy = AppInstance.loginResponse?.data?.loginUserID
        } else {
            incidentData.createdBy = AppInstance.loginResponse?.data?.loginUserID

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

    fun getAllIncidentReportData(context: Context) {
        isLoading.value = true
        val body = IncidentData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(context).getAllIncidents(body), object :
            ServiceListener<IncidentModel> {
            override fun getServerResponse(response: IncidentModel, requestcode: Int) {
                incidentReportApiResponce.value = response
                if (response.statusCode == ResponseCodes.Success) {
//                    AppInstance.allAttendanceData = response
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

    fun deleteIncident(view: View, id: Int?, position: Int) {
        isLoading.value = true
        val manager = NetworkManager()
        val incidentData = IncidentData()
        incidentData.deletedDate = getCurrentDateTime()
        incidentData.isDeleted = true
        incidentData.agencyID = AppInstance.loginResponse?.data?.agencyID
        incidentData.id = id
        incidentData.deletedBy= AppInstance.loginResponse?.data?.loginUserID


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