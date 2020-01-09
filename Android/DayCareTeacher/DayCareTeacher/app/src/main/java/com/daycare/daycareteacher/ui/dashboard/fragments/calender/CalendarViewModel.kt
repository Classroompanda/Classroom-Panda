package com.daycare.daycareteacher.ui.dashboard.fragments.calender

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
import android.widget.LinearLayout
import android.widget.SearchView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityAddEventBinding
import com.daycare.daycareteacher.databinding.MultiselectDialogBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.adapter.ChooseClassAdapter
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog
import java.text.SimpleDateFormat
import java.util.*
import com.daycare.daycareteacher.utill.OptionConstant.EDIT
import com.daycare.daycareteacher.utill.OptionConstant.VIEW_LOG
import org.greenrobot.eventbus.EventBus
import kotlin.collections.ArrayList

class CalendarViewModel() : ViewModel() {

    var monthYearTxt = ObservableField<String>()
    var isFabClicked = MutableLiveData<Boolean>()
    val classApiResponse = MutableLiveData<ClassModel>()
    var allInvolvedClass = MutableLiveData<ArrayList<String>>()
    val repeatIntervalApiResponse = MutableLiveData<Any>()
    val eventDataApiResponse = MutableLiveData<AllEventDataResponse>()
    val mealDataApiResponse = MutableLiveData<AllMealDataResponse>()
    val isLoading = MutableLiveData<Boolean>()
    var deletedEventResponse = MutableLiveData<Int>()


    var selectedClassList = ArrayList<String>()

    init {
        val c = Calendar.getInstance().getTime()
        println("Current time => $c")


        //binding.edtStartDate.text=formattedDate
        // startDate.set("formattedDate")
//        password.set("teacher@123")
    }


    constructor(mHeaderTxt: String, taskId: Int) : this() { //For Calendar Event and Daily Sheet Fragment
        //requestEventCalender: EventCalenderRequest,
        monthYearTxt.set(mHeaderTxt)


    }

    private fun getArrayOfClass(eventInvolvments: List<InvolvedEventClassesList>?): ArrayList<String>? {
        val list = ArrayList<String>()
        if (eventInvolvments != null) {
            for (pos in 0 until eventInvolvments.size) {
                eventInvolvments[pos].className?.let { list.add(it) }
            }
        }
        return list
    }

    constructor(view: View, TASKID: Int) : this() {
        val c = Calendar.getInstance().getTime()
        val df = SimpleDateFormat("dd MMM yyyy")
        var formattedDate = df.format(c)
        startDate.set(formattedDate)


        getAllRepeatData(AppInstance.loginResponse!!.data?.agencyID, view)
        TASK_ID = TASKID
        if (TASK_ID == OptionConstant.EDIT) {
            val eventItemData = AppInstance.eventItemData

            titleedt.set(eventItemData?.title)
            descriptionedt.set(eventItemData?.description)
            startDate.set(convertDate(eventItemData?.start!!, alohaDate, incidentDisplayDate))
            endDate.set(convertDate(eventItemData.end!!, alohaDate, incidentDisplayDate))
            eventEndTime.set(convertDate(eventItemData.endTime!!, alohaDate, dialogDisplayTime))
            eventStartTime.set(convertDate(eventItemData.startTime!!, alohaDate, dialogDisplayTime))
            /* var involveClassesResponse: List<InvolvedEventClasses> = ArrayList()
             involveClassesResponse=eventItemData.involvedEventClassesList
            AppInstance.eventInvolvments=eventItemData.involvedEventClassesList
            */
            endsOn.set(convertDate(eventItemData.endsOn!!, alohaDate, incidentDisplayDate))
            allInvolvedClass.value = getArrayOfClass(AppInstance.eventInvolvments)
            selectedClassList = getArrayOfClass(AppInstance.eventInvolvments)!!
        }


    }

    private lateinit var data: AllEventDataList
    val title = ObservableField<String>("")
    val parentName = ObservableField<String>("")

    //Adapter constructor
    constructor(responseData: AllEventDataList, i: Int) : this() {
        if (i == 101) { //immunization

        }
        this.data = responseData
        title.set(data.title)
        // studentName.set(data.studentName)
        // className.set(data.className)
        // parentName.set(data.parentName)
//        studentId.set(data.studentId.toString())
//        intentstudentId= data.studentId!!

    }


    val className = ObservableField<String>("")

    constructor(data: ClassData, stdPosition: Int) : this() {
        className.set(data.className)
    }


    fun deleteEvent(context: Context, id: Int?, position: Int) {
        isLoading.value = true
        val manager = NetworkManager()
        val eventData = AllEventDataList()
        eventData.deletedDate = getCurrentDateTime()
        eventData.isDeleted = true
        eventData.agencyID = AppInstance.loginResponse?.data?.agencyID
        eventData.id = id
        eventData.deletedBy = AppInstance.loginResponse?.data?.loginUserID

        var positionnew: Int = 0
        for (i in 0 until AppInstance.alleventDataResponse?.data!!.size) {
            if (AppInstance.alleventDataResponse?.data?.get(i)?.id == id) {
                positionnew = i
                break;
            }
        }


        manager.createApiRequest(ApiUtilis.getAPIService(context).deleteEvent(eventData), object :
            ServiceListener<AllEventDataResponse> {
            override fun getServerResponse(response: AllEventDataResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(context, "" + response.message)
                    AppInstance.alleventDataResponse?.data?.removeAt(positionnew)
                    deletedEventResponse.value = position


                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(context, "No Data Found!!")
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }

    fun getMealCategory(view: View) {
        isLoading.value = true
        val body = StudentData()
        val manager = NetworkManager()

        body.agencyID = AppInstance.loginResponse?.data?.agencyID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealCategory(body), object :
            ServiceListener<MealCategoryData> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: MealCategoryData, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.mealCategoryData = response
                    isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }

    fun getEventCalenderData(
        requestEventCalender: EventCalenderRequest,
        view: View
    ) {

        isLoading.value = true
//        if (isLoading.value != true) {
//            isLoading.value = true

        val manager = NetworkManager()

        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).getEventCalenderData(requestEventCalender),
            object :
                ServiceListener<AllEventDataResponse> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: AllEventDataResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.alleventDataResponse = response
                        eventDataApiResponse.value = response
                        isLoading.value = false
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
//        }
    }

    fun getMealCalenderData(
        requestEventCalender: EventCalenderRequest,
        view: View
    ) {
        isLoading.value = true

        val manager = NetworkManager()




        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).getMealCalenderData(requestEventCalender),
            object :
                ServiceListener<AllMealDataResponse> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: AllMealDataResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        AppInstance.allmealDataResponse = response
                        mealDataApiResponse.value = response



                        isLoading.value = false
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })


    }


    private fun getAllRepeatData(agencyId: Int?, view: View) {
//        isLoading.value = true
        val body = StudentData()
        val manager = NetworkManager()

        body.agencyID = agencyId


        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllRepeatData(body), object :
            ServiceListener<RepeatDataResponse> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: RepeatDataResponse, requestcode: Int) {
//                classApiResponse.value = response
//                AppInstance.allClasses = response

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.repeatDataResponse = response

                    val binding = DataBindingUtil.findBinding<ActivityAddEventBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if(response.data!!.size>0 && response.data!=null) {
                        AppInstance.repeatDataResponse = response
                        loadRepeatData(view, TASK_ID, response)
                    }

                    isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }

    private fun loadRepeatData(view: View, tasK_ID: Int, response: RepeatDataResponse) {
        val binding = DataBindingUtil.findBinding<ActivityAddEventBinding>(view)
        val niceSpinner = binding?.intervalSpinner
        val data: MutableList<String> = mutableListOf()

        for (pos in 0 until response.data?.size!!) {
            response.data[pos].label?.let { it1 -> data.add(it1) }
        }
        val dataset = LinkedList(data)
        niceSpinner?.attachDataSource(dataset)
        niceSpinner?.selectedIndex = 2
        if (tasK_ID == EDIT) {
            val eventItemData = AppInstance.eventItemData
            for (pos in 0 until response.data.size) {
                if (response.data[pos].value == eventItemData?.plannerRepeatTypeID) {
                    niceSpinner?.selectedIndex = pos
                }
            }
        }
    }


    private fun validated(eventData: AllEventDataList, view: View): Boolean {
        when {

            eventData.start.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event start date")
                return false
            }
            eventData.end.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event end date")
                return false
            }
            eventData.startTime.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event start time")
                return false
            }
            eventData.endTime.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event end time")
                return false
            }

            eventData.involvedEventClassesList?.isEmpty()!! -> {
                showToast(view.context, "Please select class")
                return false
            }
            eventData.title.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event title")
                return false
            }
            eventData.description.isNullOrEmpty() -> {
                showToast(view.context, "Please enter event description")
                return false
            }
            else -> return true
        }
    }


    fun multipleSelectDialog(view: View, response: ClassModel) {
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
        val listAdapter = ChooseClassAdapter(response.data as ArrayList<ClassData>?, selectedClassList)
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

            allInvolvedClass.value = listAdapter.checkedClassList
            if (listAdapter.checkedClassList != null) {
                selectedClassList = listAdapter.checkedClassList!!
            }
            mMaterialDialog.dismiss()


        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    /**
     *     Calendar Event Fragment Fab
     */
    fun onClickAddEventFab(view: View) {
        isFabClicked.value = true
//        showToast(view.context,mDate)
//        val intent = Intent(view.context, AddEventActivity::class.java)
//        intent.putExtra("clickedDate", mDate)
//        (view.context as Activity).startActivityForResult(intent, 100)

    }

    fun onClickClassList(view: View) {
        if (AppInstance.allClasses != null && AppInstance.allClasses?.data?.isNotEmpty()!!) {
            classApiResponse.value = AppInstance.allClasses
        } else {
            isLoading.value = true
            val body = ClassData()
            val manager = NetworkManager()
            body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID

            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
                ServiceListener<ClassModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: ClassModel, requestcode: Int) {
                    classApiResponse.value = response

                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        AppInstance.allClasses = response
                        /*val binding = DataBindingUtil.findBinding<FragmentAttendanceBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data?.isNotEmpty()!!) {

                    } else {
                        showToast(view.context, "No Data Found!!")
                    }*/

                    } else {
                        isLoading.value = false
                    }

                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    // showToast(view.context, "Check Internet Connection")
                    isLoading.value = false
                }
            })
        }

    }


    /**
     *   Add Event Activity
     */

    var startDate = ObservableField<String>()
    var endDate = ObservableField<String>()
    var eventEndTime = ObservableField<String>()
    var eventStartTime = ObservableField<String>()


    var endsOn = ObservableField<String>()
    val titleedt = ObservableField<String>()
    val descriptionedt = ObservableField<String>()
    var classList = arrayOf(String())
    val classNamePos = ObservableField<Int>()
    var TASK_ID = VIEW_LOG


    fun onClickAddEventBtn(view: View) {

        val binding = DataBindingUtil.findBinding<ActivityAddEventBinding>(view)

        val data = Bundle()
        val involvements: ArrayList<InvolvedEventClasses>
        val repeatList = AppInstance.repeatDataResponse?.data

        val eventData = AllEventDataList()

        eventData.id = 0
        eventData.agencyID = AppInstance.loginResponse?.data?.agencyID
        eventData.involvedEventClassesList = getSelectedClasses()
        eventData.title = titleedt.get()
        eventData.description = descriptionedt.get()
        eventData.start = startDate.get()?.let { convertDate(it, incidentDisplayDate, eventDateSendFormat) }
        eventData.end = endDate.get()?.let { convertDate(it, incidentDisplayDate, eventDateSendFormat) }
        eventData.endsOn = endsOn.get()?.let { convertDate(it, incidentDisplayDate, eventDateSendFormat) }
        eventData.plannerRepeatTypeID = repeatList?.get(binding?.intervalSpinner!!.selectedIndex)?.value
        eventData.endTime = eventEndTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
        eventData.startTime = eventStartTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
        if (validated(eventData, view)) {
            isLoading.value = true
            addEvent(eventData, view)
        }

    }

    var isEventAdded = MutableLiveData<Boolean>()
    private fun addEvent(
        eventData: AllEventDataList,
        view: View
    ) {
        val manager = NetworkManager()
        if (TASK_ID == EDIT) {
            val eventItemData = AppInstance.eventItemData
            eventData.id = eventItemData?.id
            eventData.updatedBy = AppInstance.loginResponse?.data?.loginUserID
            eventData.createdBy = eventItemData?.createdBy
        } else {
            eventData.createdBy = AppInstance.loginResponse?.data?.loginUserID
        }
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).saveEvent(eventData), object :
            ServiceListener<EventSaveResponse> {
            override fun getServerResponse(response: EventSaveResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {

                    Log.i("Save event=", response.message.toString())
                    if (TASK_ID == EDIT) {
                        showToast(view.context, "" + "Event updated successfully")
                    } else {
                        showToast(view.context, "" + response.message)
                    }
                    isEventAdded.value = true


                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                }
                isLoading.value = false
               /* val e=  BusMessageEvent("Added")
                EventBus.getDefault().post(e);*/

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })


    }

    private fun getSelectedClasses(): List<InvolvedEventClassesList>? {
        val list = ArrayList<InvolvedEventClassesList>()
        val allStds = AppInstance.allClasses
        for (clasName in selectedClassList) {
            if (allStds?.data != null) {
                val involvment = InvolvedEventClassesList()
                for (pos in 0 until allStds.data.size) {
                    if (allStds.data[pos].className == clasName) {
                        involvment.classesID = allStds.data[pos].classesID
                        involvment.agencyID = allStds.data[pos].agencyID
                        involvment.eventID = 0

                    }
                }
                list.add(involvment)
            }
        }
        if (list.isEmpty() && AppInstance.allClasses == null) {
            return AppInstance.eventItemData?.involvedEventClassesList
        }
        return list
    }


    fun onClickStartDate(view: View) {
        datepickerFuture(view.context, view as TextInputEditText)
    }

    fun onClickEndDate(view: View) {
        datepickerFuture(view.context, view as TextInputEditText)

    }

    fun onClickStartTime(view: View) {
        timepicker(view as TextInputEditText)
    }

    fun onClickEndTime(view: View) {
        timepicker(view as TextInputEditText)
    }

    fun onClickEndsDate(view: View) {
        datepickerFuture(view.context, view as TextInputEditText)

    }

    val mealDetail = MutableLiveData<MealDetailModel>()
    fun getMealDetail(context: Context, data: MealDetailModel) {
        if (isLoading.value != true) {
            isLoading.value = true
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(context).getParticularMealPlan(data), object :
                ServiceListener<MealDetailModel> {
                override fun getServerResponse(response: MealDetailModel, requestcode: Int) {
                    mealDetail.value = response
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                }
            })
        }

    }
}