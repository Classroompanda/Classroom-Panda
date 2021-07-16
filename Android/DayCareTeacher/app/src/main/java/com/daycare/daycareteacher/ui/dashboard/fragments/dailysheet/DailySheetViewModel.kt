package com.daycare.daycareteacher.ui.dashboard.fragments.dailysheet

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.AdapterView
import android.widget.LinearLayout.VERTICAL
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.recyclerview.widget.LinearLayoutManager
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.*
import com.daycare.daycareteacher.interfaces.IAdapterFragmentCallBack
import com.daycare.daycareteacher.interfaces.ILoaderCallback
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareteacher.ui.dashboard.adapter.EditFoodItemsAdapter
import com.daycare.daycareteacher.ui.dashboard.adapter.SetFoodItemsAdapter
import com.daycare.daycareteacher.utill.*
import com.daycare.daycareteacher.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareteacher.utill.DailySheetConstant.DIAPER
import com.daycare.daycareteacher.utill.DailySheetConstant.HEALTH
import com.daycare.daycareteacher.utill.DailySheetConstant.MEAL
import com.daycare.daycareteacher.utill.DailySheetConstant.MOOD
import com.daycare.daycareteacher.utill.DailySheetConstant.NAP
import com.daycare.daycareteacher.utill.DailySheetConstant.NOTES
import com.google.android.material.textfield.TextInputEditText
import me.drakeet.materialdialog.MaterialDialog
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

class DailySheetViewModel() : ViewModel() {
    val imgUrl = ObservableField<String>("")
    val todaysDate = Calendar.getInstance().time!!
    val viewId = DAILYSHEET
    val completeViewId = COMPLETE_DAILYSHEET
    var mClassId = 0
    val isLoading = MutableLiveData<Boolean>()
    val completeclassApiResponse = MutableLiveData<ClassModel>()

    var mSelectedDate = getCurrentDateTime()
    val dailySheetApiResponse = MutableLiveData<DailySheetStudentList>()
    val completedailySheetApiResponse = MutableLiveData<DailySheetStudentList>()

    var selectedDate = MutableLiveData<String>()
    val addDailySheetFab = MutableLiveData<Boolean>()
    val selectAllStudent = MutableLiveData<Boolean>()
    val studentName = ObservableField<String>("")
    val className = ObservableField<String>("")
    var position: Int = 0
    var detailposition: Int = 0
    private lateinit var iLoaderCallback: ILoaderCallback
    private lateinit var iFragmentCallback: IAdapterFragmentCallBack
    private lateinit var masterView: View
    val isUpdate = MutableLiveData<Boolean>()
    val dailySheetSaveApiResponse = MutableLiveData<DailySheetSaveResponse>()
    private var editable = false
    var parentPos: Int = 0
    val mealPlanApiResponse = MutableLiveData<MealPlanModel>()
    var selectedItemList = ArrayList<String>()
    var foodItemPos: Int = 0

    var apiHealthData = MutableLiveData<HealthModel>()
    var apiActiviyData = MutableLiveData<HealthModel>()
    var apiMealData = MutableLiveData<HealthModel>()
    var apiNotesData = MutableLiveData<HealthModel>()
    var apiNapData = MutableLiveData<HealthModel>()
    var apiMoodData = MutableLiveData<HealthModel>()
    var apiToiletingData = MutableLiveData<HealthModel>()

    private lateinit var data: DailySheetStudentData
    private lateinit var detailData: StudentDailySheetDetail
    private lateinit var fooddata: StudentActivityMealFoodItem

    fun onClickAddDailySheetFab(view: View) {
        getServerDate(mSelectedDate)
        addDailySheetFab.value = true
    }

    fun onClickSelectAll(view: View) {
        selectAllStudent.value = true
    }

    fun getMelaPlan(view: View) {
        isLoading.value = true
        val body = DailySheetData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value //AppInstance.classId
        body.askedDate = getServerDate(mSelectedDate)
        body.askedDateString = convertUtcToLocal(body.askedDate.toString(), alohaDate, reservationDate)

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealPlan(body), object :
            ServiceListener<MealPlanModel> {
            @SuppressLint("LogNotTimber", "WrongConstant")
            override fun getServerResponse(response: MealPlanModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    mealPlanApiResponse.value = response
                    AppInstance.mealPlanModel = response
                    isLoading.value = false
                    val binding = DataBindingUtil.findBinding<ActivityAddDailySheetBinding>(view)

                    val recyclerView = binding?.recentMealRv

                    recyclerView?.layoutManager =
                        LinearLayoutManager(
                            view.context,
                            VERTICAL,
                            false
                        )
                    (recyclerView?.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
                    binding?.recentMealRv?.layoutManager = recyclerView?.layoutManager


                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data?.isNotEmpty()!! && response.data!!.size > 0) {
                        val niceSpinner = binding?.mealPlanSpinner
                        val data: MutableList<String> = mutableListOf()
                        for (pos in 0 until response.data!!.size) {
                            response.data!![pos].mealPlanTitle?.let { it1 -> data.add(it1) }
                        }
                        val dataset = LinkedList(data)
                        niceSpinner?.attachDataSource(dataset)
                        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
                            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                                for (pos in 0 until response?.data?.size!!) {
                                    if (pos == position) {
                                        val listAdapter = SetFoodItemsAdapter(
                                            response.data!!.get(pos).studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
                                            selectedItemList, pos)
                                        binding?.recentMealRv?.adapter = listAdapter

                                    }
                                }
                            }

                            override fun onNothingSelected(parent: AdapterView<*>) {}
                        })

                        if (response.data != null) {
                            val listAdapter = SetFoodItemsAdapter(
                                response.data!!.get(0).studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
                                selectedItemList, parentPos
                            )
                            binding?.recentMealRv?.adapter = listAdapter
                        }


                    } else {
                        isLoading.value = false
                        showToast(view.context, "No Data Found!!")
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

    @SuppressLint("WrongConstant")
    fun multipleSelectMealDialog(view: View, response: MealPlanModel) {
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.multiselect_dialog,
                null
            )
        val dialogBinding = MultiselectDialogBinding.bind(dialogView)
        val recyclerView = dialogBinding.selectContainer

        recyclerView.layoutManager =
            LinearLayoutManager(
                dialogView.context,
                VERTICAL,
                false
            )
        (recyclerView.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
        dialogBinding.selectContainer.layoutManager = recyclerView.layoutManager
        // val listAdapter = ChooseStudentsAdapter(response.data as ArrayList<StudentData>?, selectedStudentsList)
        // dialogBinding.selectContainer.adapter = listAdapter


        dialogBinding.searchStudent.setOnClickListener {
            dialogBinding.searchStudent.isIconified = false
            dialogBinding.searchStudent.clearFocus()
        }
        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        dialogBinding.absBtnSave.setOnClickListener {
            mMaterialDialog.dismiss()
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    /**
     * Fragment
     */

    val foodItem = ObservableField<String>("")
    val foodamount = ObservableField<Int>(0)
    val foodunit = ObservableField<String>("")

    constructor(foodItemData: StudentActivityMealFoodItem, position: Int) : this() {
        this.fooddata = foodItemData
        foodItem.set(fooddata.foodTypeName)
        foodamount.set(fooddata.amount)
        foodunit.set(fooddata.measureUnitTypeName)
        this.foodItemPos = position


    }


    /*
    * Food Item Adapter methods
    */
    constructor(childData: DailySheetStudentData, position: Int) : this() {
        this.data = childData
        imgUrl.set(data.imagePath)
        // studentName.set(data.studentName)
        className.set(data.className)
        this.position = position


    }

    //Following is RecentActvityAdapter constructor
    constructor(childData: StudentDailySheetDetail, position: Int, parentPosition: Int, value: String) : this() {
        this.detailData = childData
        this.detailposition = position
        this.parentPos = parentPosition

    }

    fun onClickDSEditBtn(view: View) {
        editable = true
        // iLoaderCallback.startLoader(true)
//        val binding = DataBindingUtil.findBinding<RecentSheetDetailActivityBinding>(view)
        if (detailData.activityTypeID == HEALTH) {
            getHealthData(view)
        }else if (detailData.activityTypeID == NOTES) {
            getNoteData(view)
        }
        else if (detailData.activityTypeID == ACTIVITY) {
            getActivityData(view)
        }
        else if (detailData.activityTypeID == NAP) {
            getNapData(view)
        }
        else if (detailData.activityTypeID == MOOD) {
            getMoodData(view)
        }
        else if (detailData.activityTypeID == MEAL) {
            getMealData(view)
        }
        else if (detailData.activityTypeID == DIAPER) {
            getDiaperData(view)
        }
    }

    fun deleteDS(view: View, dailySheetSerailize: DailySheetSerializeRequest, position: Int) {
        isLoading.value = true

        val studentDS = StudentDailySheetDetail()
        studentDS.activityTypeID = dailySheetSerailize.activityTypeID
        studentDS.studentID = dailySheetSerailize.studentID
        studentDS.deletedBy = AppInstance.getUser(view.context)?.loginUserID
        val manager = NetworkManager()
        //Same methode for Delete just update the isDeleted flag
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {
                isLoading.value = false

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false

                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Record deleted successfully")

                } else {
                    isLoading.value = false

                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
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


    fun getActivityData(view: View) {
        // isLoading.value = true
        iLoaderCallback.startLoader(true)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID

        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getActivityData(body), object :
            ServiceListener<OtherActivityModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: OtherActivityModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
                    //  isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    // AppInstance.otherActivityModel = response
                    if (editable)
                        showOtherEditDialog(view,response)

                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                //isLoading.value = false
            }
        })

    }


    fun getMealData(view: View) {
        iLoaderCallback.startLoader(true)
        //  isLoading.value = true

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealData(body), object :
            ServiceListener<EditMealModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: EditMealModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    //isLoading.value = false
                    iLoaderCallback.startLoader(false)

//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())

                    AppInstance.editMealModel = response
                    if (editable) showMealEditDialog(view)

                } else {
                    isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                //   isLoading.value = false
                iLoaderCallback.startLoader(false)

            }
        })


    }


    fun getMoodData(view: View) {
        //isLoading.value = true
        iLoaderCallback.startLoader(true)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMoodData(body), object :
            ServiceListener<MoodModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: MoodModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
                    // isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.moodModel = response
                    if (editable) showMoodEditDialog(view)

                } else {
                    //  isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                iLoaderCallback.startLoader(false)
                showToast(view.context, "Check Internet Connection")
                //isLoading.value = false
            }
        })
    }

    fun getDiaperData(view: View) {
        // isLoading.value = true
        iLoaderCallback.startLoader(true)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getDiaperData(body), object :
            ServiceListener<DiaperModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: DiaperModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
                    // isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    //AppInstance.diaperModel = response
                    if (editable) showDiaperEditDialog(view,response)

                }else{
                    // isLoading.value = false

                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                iLoaderCallback.startLoader(false)

                // isLoading.value = false
            }
        })

    }


    fun getNapData(view: View) {
        // isLoading.value = true
        iLoaderCallback.startLoader(true)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getNapData(body), object :
            ServiceListener<NapModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: NapModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
                    //   isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.napModel = response
                    if (editable) showNapEditDialog(view)

                } else {
                    // isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                // isLoading.value = false
                iLoaderCallback.startLoader(false)

            }
        })

    }

    fun getNoteData(view: View) {
        iLoaderCallback.startLoader(true)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getNoteData(body), object :
            ServiceListener<NoteModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: NoteModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
                    // isLoading.value = false
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    //  AppInstance.noteData = response
                    if (editable) showNoteEditDialog(view,response)

                } else {
                    // isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                //isLoading.value = false
                iLoaderCallback.startLoader(false)

            }
        })

    }


    fun getHealthData(view: View) {
        iLoaderCallback.startLoader(true)
        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        body.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getHealthData(body), object :
            ServiceListener<HealthModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: HealthModel, requestcode: Int) {
                //classApiResponse.value = response
                iLoaderCallback.startLoader(false)

                if (response.statusCode == ResponseCodes.Success) {
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    //  AppInstance.healthData = response

                    if (editable) showHealthEditDialog(view,response)

                } else {
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                iLoaderCallback.startLoader(false)

            }
        })

    }

    @SuppressLint("WrongConstant")
    private fun showMealEditDialog(view: View) {

        val data = AppInstance.editMealModel
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.mealactivitydata_edit,
                null
            )
        val dialogBinding = MealactivitydataEditBinding.bind(dialogView)
        //getMealEditData(dialogView)


        dialogBinding.viewModel = data?.data

        dialogBinding.mealPlanSpinner.setText(data?.data?.mealPlanTitle)
        dialogBinding.mealdescriptionTxt.setText(data?.data?.otherThanPlanMeal)
        dialogBinding.othermealcommentTxt.setText(data?.data?.otherThanPlanMealComment)
        dialogBinding.mealcommentTxt.setText(data?.data?.mealComment)


        val recyclerView = dialogBinding?.recentMealRv

        recyclerView?.layoutManager =
            LinearLayoutManager(
                view.context,
                VERTICAL,
                false
            )
        (recyclerView?.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
        dialogBinding?.recentMealRv?.layoutManager = recyclerView?.layoutManager



        if (data?.data != null) {
            val listAdapter = EditFoodItemsAdapter(
                data?.data!!.studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
                selectedItemList, parentPos
            )
            dialogBinding?.recentMealRv?.adapter = listAdapter
        }

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            //napActivityDataUpdate(view,dialogView, mMaterialDialog)
            val dailySheetSerailize = DailySheetSerializeRequest()
            var checkedStudentList = ArrayList<Int>()

            dailySheetSerailize.id = data?.data?.studentActivitiesID
            dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
            dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
            dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

            dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

            val add = checkedStudentList?.add(detailData.studentID!!)


            dailySheetSerailize.selectedStudents = checkedStudentList
            val studentMealActivity = DailySheetSerializeRequest().StudentActivityMeals()
            studentMealActivity.id = data?.data?.id
            studentMealActivity.studentActivitiesID = data?.data?.studentActivitiesID

            studentMealActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentMealActivity.otherThanPlanMeal = dialogBinding.mealdescriptionTxt.text.toString()
            studentMealActivity.mealPlannerID = data?.data?.mealPlannerID
            studentMealActivity.mealPlanTitle = data?.data?.mealPlanTitle
            studentMealActivity.otherThanPlanMealComment = dialogBinding.othermealcommentTxt.text.toString()
            studentMealActivity.mealComment = dialogBinding.mealcommentTxt.text.toString()
            studentMealActivity.studentActivityMealFoodItems = getfooditemsEdit()

            dailySheetSerailize.studentActivityMeals = studentMealActivity

            AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
                .activityDescription = dialogBinding.mealcommentTxt.text.toString()


            editDS(view, mMaterialDialog, dailySheetSerailize)
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    private fun showMoodEditDialog(view: View) {
        val data = AppInstance.moodModel
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.moodactivitydata_edit,
                null
            )
        val dialogBinding = MoodactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.moodDescEdtTxt.setText(data?.data?.studentMoodDescription)
        if (data?.data?.moodTypeID == 1) {
            AppInstance.selectedMood = 1
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)

        } else if (data?.data?.moodTypeID == 3) {
            AppInstance.selectedMood = 3
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfull)
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
        } else if (data?.data?.moodTypeID == 2) {
            AppInstance.selectedMood = 2
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)

        } else if (data?.data?.moodTypeID == 4) {
            AppInstance.selectedMood = 4
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)

        } else if (data?.data?.moodTypeID == 5) {
            AppInstance.selectedMood = 5
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy)

        }


        dialogBinding.moodDescEdtTxt.setText(data?.data?.studentMoodDescription)
        dialogBinding.moodnapIV.setOnClickListener {
            AppInstance.selectedMood = 3
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfull)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
            dialogBinding.moodfussyIV.isSelected = false
            dialogBinding.moodgrumpyIV.isSelected = false

            dialogBinding.moodhappyIV.isSelected = false
            dialogBinding.sadhappyIV.isSelected = false
        }
        dialogBinding.moodhappyIV.setOnClickListener {
            AppInstance.selectedMood = 1
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
            dialogBinding.moodfussyIV.isSelected = false
            dialogBinding.moodgrumpyIV.isSelected = false
            dialogBinding.moodnapIV.isSelected = false
            dialogBinding.sadhappyIV.isSelected = false
        }
        dialogBinding.sadhappyIV.setOnClickListener {
            AppInstance.selectedMood = 2
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
            dialogBinding.moodfussyIV.isSelected = false
            dialogBinding.moodgrumpyIV.isSelected = false
            dialogBinding.moodnapIV.isSelected = false
            dialogBinding.moodhappyIV.isSelected = false
        }

        dialogBinding.moodfussyIV.setOnClickListener {
            AppInstance.selectedMood = 4
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)

            dialogBinding.moodgrumpyIV.isSelected = false
            dialogBinding.sadhappyIV.isSelected = false
            dialogBinding.moodnapIV.isSelected = false
            dialogBinding.moodhappyIV.isSelected = false
        }

        dialogBinding.moodgrumpyIV.setOnClickListener {
            AppInstance.selectedMood = 5
            dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
            dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
            dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
            dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)
            dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy)

            dialogBinding.moodfussyIV.isSelected = false
            dialogBinding.sadhappyIV.isSelected = false
            dialogBinding.moodnapIV.isSelected = false
            dialogBinding.moodhappyIV.isSelected = false
        }



        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            moodActivityDataUpdate(view, dialogView, mMaterialDialog)

            mMaterialDialog.dismiss()

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    private fun showDiaperEditDialog(view: View,data:DiaperModel) {
        //  val data = AppInstance.diaperModel
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(R.layout.diaperactivitydata_edit, null)
        val dialogBinding = DiaperactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.diaperdescriptionTxt.setText(data?.data?.studentActivityDiaperNote)

        dialogBinding.diaperSuggestion.setOnClickListener {
            if (!dialogBinding.diaperdescriptionTxt.text.toString().isEmpty()) {
                dialogBinding.diaperdescriptionTxt.setText(dialogBinding.diaperdescriptionTxt.text.toString() + "," + "Diaper Change")
            } else {
                dialogBinding.diaperdescriptionTxt.setText("Diaper Change")
            }
        }

        dialogBinding.toiletSuggestion.setOnClickListener {
            if (!dialogBinding.diaperdescriptionTxt.text.toString().isEmpty()) {
                dialogBinding.diaperdescriptionTxt.setText(dialogBinding.diaperdescriptionTxt.text.toString() + "," + "Toilet Training / Tiolet Used")
            } else {
                dialogBinding.diaperdescriptionTxt.setText("Toilet Training / Tiolet Used")
            }
        }
        dialogBinding.wetSuggestion.setOnClickListener {
            if (!dialogBinding.diaperdescriptionTxt.text.toString().isEmpty()) {
                dialogBinding.diaperdescriptionTxt.setText(dialogBinding.diaperdescriptionTxt.text.toString() + "," + "Wet ")
            } else {
                dialogBinding.diaperdescriptionTxt.setText("Wet ")
            }
        }

        dialogBinding.bmSuggestion.setOnClickListener {
            if (!dialogBinding.diaperdescriptionTxt.text.toString().isEmpty()) {
                dialogBinding.diaperdescriptionTxt.setText(dialogBinding.diaperdescriptionTxt.text.toString() + "," + "B/M")
            } else {
                dialogBinding.diaperdescriptionTxt.setText("B/M")
            }
        }



        dialogBinding.diaperChangeTimeEdtTxt.setText(
            convertDateUTC(
                data?.data?.diaperChangeTime!!,
                alohaDate,
                dialogDisplayTime
            )
        )
        dialogBinding.diaperChangeTimeEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                    var mHourOfDay = hourOfDay
                    val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                    val mdate = parseTime.parse(mTime)
                    dialogBinding.diaperChangeTimeEdtTxt.setText(dialogDisplayTime.format(mdate))

                }, mHour, mMin, false
            )
            timePickerDialog.show()


        }


        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            diaperActivityDataUpdate(view, dialogView, mMaterialDialog,data)
            mMaterialDialog.dismiss()

        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showNapEditDialog(view: View) {
        val data = AppInstance.napModel
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.napactivitydata_edit,
                null
            )
        val dialogBinding = NapactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.napDescEditEdtTxt.setText(data?.data?.napNote)
        dialogBinding.atTimeNapEditEdtTxt.setText(
            convertDateUTC(data?.data?.sleptAtTime!!, alohaDate, dialogDisplayTime))
        dialogBinding.toTimeNapEditEdtTxt.setText(
            convertDateUTC(data?.data?.workUpTime!!, alohaDate, dialogDisplayTime))

        dialogBinding.atTimeNapEditEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                    var mHourOfDay = hourOfDay
                    val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                    val mdate = parseTime.parse(mTime)
                    dialogBinding.atTimeNapEditEdtTxt.setText(dialogDisplayTime.format(mdate))

                }, mHour, mMin, false
            )
            timePickerDialog.show()


        }
        dialogBinding.toTimeNapEditEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                    var mHourOfDay = hourOfDay
                    val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                    val mdate = parseTime.parse(mTime)
                    dialogBinding.toTimeNapEditEdtTxt.setText(dialogDisplayTime.format(mdate))

                }, mHour, mMin, false
            )
            timePickerDialog.show()
        }


        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            napActivityDataUpdate(view, dialogView, mMaterialDialog)
            mMaterialDialog.dismiss()

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showOtherEditDialog(view: View,data:OtherActivityModel) {
        //  val data = AppInstance.otherActivityModel
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.otheractivitydata_edit,
                null
            )
        val dialogBinding = OtheractivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.activityDescEditEdtTxt.setText(data?.data?.otherActivityNote)


        dialogBinding.atTimeActivityEditEdtTxt.setText(
            convertDateUTC(
                data?.data?.startTime!!,
                alohaDate,
                dialogDisplayTime
            )
        )
        dialogBinding.toTimeActivityEditEdtTxt.setText(convertDateUTC(data?.data?.endTime!!, alohaDate, dialogDisplayTime))

        /*  dialogBinding.cryingEditSuggestion.setOnClickListener {
              if (!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                  dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "He is crying a lot")
              } else {
                  dialogBinding.activityDescEditEdtTxt.setText("He is crying a lot")
              }
          }

          dialogBinding.playingEditSuggestion.setOnClickListener {
              if (!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                  dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "He is playing in classroom")
              } else {
                  dialogBinding.activityDescEditEdtTxt.setText("He is playing in classroom")
              }
          }
          dialogBinding.playingoutsideEditSuggestion.setOnClickListener {
              if (!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                  dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "He is playing in outside")
              } else {
                  dialogBinding.activityDescEditEdtTxt.setText("He is playing in outside")
              }
          }
  */

        dialogBinding.activitySuggestions.sugBlocks.setOnClickListener {
            val activities=ArrayList<String>()

            if (!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Blocks")
            } else {
                dialogBinding.activityDescEditEdtTxt.setText("Blocks")
            }
        }
        dialogBinding.activitySuggestions.sugCenters.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Centers")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Centers")
            }
        }
        dialogBinding.activitySuggestions.sugCircleTime.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Circle time")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Circle time")
            }
        }
        dialogBinding.activitySuggestions.sugColored.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Colored")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Colored")
            }
        }
        dialogBinding.activitySuggestions.sugDancing.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Dancing")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Dancing")
            }
        }
        dialogBinding.activitySuggestions.sugFlashCard.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Flash Cards")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Flash Cards")
            }
        }
        dialogBinding.activitySuggestions.sugFreeDraw.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Free Draw")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Free Draw")
            }
        }
        dialogBinding.activitySuggestions.sugLegos.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Legos")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Legos")
            }
        }
        dialogBinding.activitySuggestions.sugMusic.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Music")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Music")
            }
        }
        dialogBinding.activitySuggestions.sugPainted.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Painted")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Painted")
            }
        }
        dialogBinding.activitySuggestions.sugPlayedOutside.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Played Outside")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Played Outside")
            }
        }
        dialogBinding.activitySuggestions.sugPuzzele.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Puzzles")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Puzzles")
            }
        }
        dialogBinding.activitySuggestions.sugShareDay.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Share Day")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Share Day")
            }
        }
        dialogBinding.activitySuggestions.sugScience.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Science")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Science")
            }
        }
        dialogBinding.activitySuggestions.sugReading.setOnClickListener {
            if(!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "Reading")
            }
            else{
                dialogBinding.activityDescEditEdtTxt.setText("Reading")
            }
        }

        dialogBinding.atTimeActivityEditEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                    var mHourOfDay = hourOfDay
                    val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                    val mdate = parseTime.parse(mTime)
                    dialogBinding.atTimeActivityEditEdtTxt.setText(dialogDisplayTime.format(mdate))

                }, mHour, mMin, false
            )
            timePickerDialog.show()


        }
        dialogBinding.toTimeActivityEditEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
                    var mHourOfDay = hourOfDay

                    val mTime =String.format("%02d", mHourOfDay)+ ":" + String.format("%02d", minute)+" " //+ " " + format + " "
                    val mdate = parseTime.parse(mTime)

                    dialogBinding.toTimeActivityEditEdtTxt.setText(dialogDisplayTime.format(mdate))

                }, mHour, mMin, false
            )
            timePickerDialog.show()
        }


        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            otherActivityDataUpdate(view, dialogView, mMaterialDialog,data)
            mMaterialDialog.dismiss()

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showHealthEditDialog(view: View,data:HealthModel) {
        //val data = AppInstance.healthData
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.healthdata_edit,
                null
            )
        val dialogBinding = HealthdataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data
        dialogBinding.tempEditEdtTxt.setText(data?.data?.recordedTemparture.toString())
        dialogBinding.healthEditDescTxt.setText(data?.data?.studentHealthDescription)
        if (data?.data?.studentMedicationID != 0) {
            dialogBinding.medicationCardData.visibility = View.VISIBLE
        } else {
            dialogBinding.medicationCardData.visibility = View.GONE
        }


        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            healthDataUpdate(view, dialogView, mMaterialDialog,data)

            mMaterialDialog.dismiss()

        }

        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showNoteEditDialog(view: View, data:NoteModel) {
        //  val data = AppInstance.noteData
        iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.notedata_edit,
                null
            )
        val dialogBinding = NotedataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data
        dialogBinding.noteEditEdtTxt.setText(data?.data?.noteDescription)

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            noteDataUpdate(view, dialogView, mMaterialDialog,data)
            mMaterialDialog.dismiss()

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    var tempEditEdtTxt = ObservableField<String>()
    var healthEditDescTxt = ObservableField<String>()
    var noteEditEdtTxt = ObservableField<String>()
    var atTimeActivityEditEdtTxt = ObservableField<String>()
    var toTimeActivityEditEdtTxt = ObservableField<String>()
    var activityDescEditEdtTxt = ObservableField<String>()
    var otherActivityNote = ObservableField<String>()
    var napDescEditEdtTxt = ObservableField<String>()
    var atTimeNapEditEdtTxt = ObservableField<String>()
    var toTimeNapEditEdtTxt = ObservableField<String>()


    private fun moodActivityDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog
    ) {

        val binding = DataBindingUtil.findBinding<MoodactivitydataEditBinding>(dialogView)
        val data = AppInstance.moodModel
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value

        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

        val add = checkedStudentList?.add(detailData.studentID!!)


        dailySheetSerailize.selectedStudents = checkedStudentList
        val studentMoodActivity = DailySheetSerializeRequest().StudentActivityMoods()
        studentMoodActivity.id = data?.data?.id
        studentMoodActivity.studentActivitiesID = data?.data?.studentActivitiesID
        studentMoodActivity.agencyID = AppInstance.getUser(view.context)?.agencyID

        studentMoodActivity.moodTypeID = AppInstance.selectedMood
        studentMoodActivity.studentMoodDescription = binding?.moodDescEdtTxt?.text.toString()

        dailySheetSerailize.studentActivityMoods = studentMoodActivity

        AppInstance.moodModel?.data?.studentMoodDescription = binding?.moodDescEdtTxt?.text.toString()


        detailData.activityDescription = binding?.moodDescEdtTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.moodDescEdtTxt?.text.toString()

        editDS(view, mMaterialDialog, dailySheetSerailize)
    }


    private fun diaperActivityDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog,data:DiaperModel) {

        val binding = DataBindingUtil.findBinding<DiaperactivitydataEditBinding>(dialogView)
        // val data = AppInstance.diaperModel
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

        val add = checkedStudentList?.add(detailData.studentID!!)

        dailySheetSerailize.selectedStudents = checkedStudentList
        val studentDiaperAcitivity = DailySheetSerializeRequest().StudentAcitivityDiaper()
        studentDiaperAcitivity.id = data?.data?.id
        studentDiaperAcitivity.studentActivitiesID = data?.data?.studentActivitiesID
        studentDiaperAcitivity.agencyID = AppInstance.getUser(view.context)?.agencyID
        studentDiaperAcitivity.diaperChangeTime =
            binding?.diaperChangeTimeEdtTxt?.text.toString()?.let {
                // convertLocalToUtc(it, dialogDisplayTime, serverDate)
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

            }

        studentDiaperAcitivity.studentActivityDiaperNote = binding?.diaperdescriptionTxt?.text.toString()

        dailySheetSerailize.studentActivityDiaper = studentDiaperAcitivity

        // AppInstance.diaperModel?.data?.studentActivityDiaperNote = binding?.diaperdescriptionTxt?.text.toString()
        data?.data?.studentActivityDiaperNote = binding?.diaperdescriptionTxt?.text.toString() // prii


        detailData.activityDescription = binding?.diaperdescriptionTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.diaperdescriptionTxt?.text.toString()

        editDS(view, mMaterialDialog, dailySheetSerailize)
    }

    private fun napActivityDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog
    ) {

        val binding = DataBindingUtil.findBinding<NapactivitydataEditBinding>(dialogView)
        val data = AppInstance.napModel
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value //AppInstance.classId
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

        val add = checkedStudentList?.add(detailData.studentID!!)
        dailySheetSerailize.selectedStudents = checkedStudentList
        val studentNapActivity = DailySheetSerializeRequest().StudentAcitivityNap()
        studentNapActivity.id = data?.data?.id
        studentNapActivity.studentActivitiesID = data?.data?.studentActivitiesID
        studentNapActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
        studentNapActivity.sleptAtTime =
            binding?.atTimeNapEditEdtTxt?.text.toString()?.let {
                // convertLocalToUtc(it, dialogDisplayTime, serverDate)
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

            }
        studentNapActivity.workUpTime =
            binding?.toTimeNapEditEdtTxt?.text.toString()?.let {
                // convertLocalToUtc(it, dialogDisplayTime, serverDate)
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

            }
        studentNapActivity.napNote = binding?.napDescEditEdtTxt?.text.toString()
        studentNapActivity.updatedBy = AppInstance.getUser(view.context)?.loginUserID


        dailySheetSerailize.updatedBy = AppInstance.getUser(view.context)?.loginUserID
        dailySheetSerailize.workUpTime =  studentNapActivity.workUpTime
        dailySheetSerailize.sleptAtTime = studentNapActivity.sleptAtTime

        dailySheetSerailize.napNote = studentNapActivity.napNote
        dailySheetSerailize.sleptAtTime = studentNapActivity.sleptAtTime
        dailySheetSerailize.studentActivitiesID = studentNapActivity.studentActivitiesID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value!!

        dailySheetSerailize.studentAcitivityNap = studentNapActivity

        AppInstance.napModel?.data?.napNote = binding?.napDescEditEdtTxt?.text.toString()

        detailData.activityDescription = binding?.napDescEditEdtTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.napDescEditEdtTxt?.text.toString()

        editDS(view, mMaterialDialog, dailySheetSerailize)

    }


    private fun otherActivityDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog,
        data:OtherActivityModel
    ) {

        val binding = DataBindingUtil.findBinding<OtheractivitydataEditBinding>(dialogView)
        //val data = AppInstance.otherActivityModel
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value!!
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)
        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

        val add = checkedStudentList?.add(detailData.studentID!!)


        dailySheetSerailize.selectedStudents = checkedStudentList
        val studentOtherActivity = DailySheetSerializeRequest().StudentOtherActivity()
        studentOtherActivity.id = data?.data?.id
        studentOtherActivity.studentActivitiesID = data?.data?.studentActivitiesID
        studentOtherActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
        studentOtherActivity.startTime =
            binding?.atTimeActivityEditEdtTxt?.text.toString()?.let {
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

                //   convertLocalToUtc(it, dialogDisplayTime, serverDate)
            }
        studentOtherActivity.endTime =
            binding?.toTimeActivityEditEdtTxt?.text.toString()?.let {
                //  convertLocalToUtc(it, dialogDisplayTime, serverDate)
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

            }
        studentOtherActivity.otherActivityNote = binding?.activityDescEditEdtTxt?.text.toString()


        dailySheetSerailize.studentOtherActivity = studentOtherActivity

        data?.data?.otherActivityNote = binding?.activityDescEditEdtTxt?.text.toString()


        detailData.activityDescription = binding?.activityDescEditEdtTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.activityDescEditEdtTxt?.text.toString()


        editDS(view, mMaterialDialog, dailySheetSerailize)


    }


    private fun healthDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog,data: HealthModel
    ) {
        // val data = AppInstance.healthData
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()
        val binding = DataBindingUtil.findBinding<HealthdataEditBinding>(dialogView)

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value//AppInstance.classId
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)
        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

        val add = checkedStudentList?.add(detailData.studentID!!)

        dailySheetSerailize.selectedStudents = checkedStudentList

        val studentHealthActivity = DailySheetSerializeRequest().StudentActivityMedications()
        studentHealthActivity.id = data?.data?.id
        studentHealthActivity.studentActivitiesID = data?.data?.studentActivitiesID

        studentHealthActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
        studentHealthActivity.recordedTemparture = binding?.tempEditEdtTxt?.text.toString()
        studentHealthActivity.studentHealthDescription = binding?.healthEditDescTxt?.text.toString()

        dailySheetSerailize.studentActivityMedications = studentHealthActivity

        // AppInstance.healthData?.data?.recordedTemparture = Integer.parseInt(binding?.tempEditEdtTxt?.text.toString())

        // priiiii
        /* AppInstance.healthData?.data?.recordedTemparture = binding?.tempEditEdtTxt?.text.toString()
         AppInstance.healthData?.data?.studentHealthDescription = binding?.healthEditDescTxt?.text.toString()
 */
        data?.data?.recordedTemparture = binding?.tempEditEdtTxt?.text.toString()
        data?.data?.studentHealthDescription = binding?.healthEditDescTxt?.text.toString()


        detailData.activityDescription = binding?.healthEditDescTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.healthEditDescTxt?.text.toString()


        editDS(view, mMaterialDialog, dailySheetSerailize)


    }


    private fun noteDataUpdate(
        view: View,
        dialogView: View,
        mMaterialDialog: MaterialDialog,data:NoteModel
    ) {
        // val data = AppInstance.noteData
        val dailySheetSerailize = DailySheetSerializeRequest()
        var checkedStudentList = ArrayList<Int>()

        val binding = DataBindingUtil.findBinding<NotedataEditBinding>(dialogView)

        dailySheetSerailize.id = data?.data?.studentActivitiesID
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID

        dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value //AppInstance.classId

        if(AppInstance.dailyClassId!=null) {
            dailySheetSerailize.classesID = AppInstance.dailyClassId // AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value   // need to change id here
        }
        else{
            AppInstance.classId =  AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
            dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        }


        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

        dailySheetSerailize.activityTypeID = data?.data?.activityTypeID
        dailySheetSerailize.updatedBy = AppInstance.getUser(view.context)?.loginUserID


        val add = checkedStudentList?.add(detailData.studentID!!)

        dailySheetSerailize.selectedStudents = checkedStudentList
        val studentNotesActivity = DailySheetSerializeRequest().StudentActivityNotes()

        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == NOTES) {
            studentNotesActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentNotesActivity.noteDescription = binding?.noteEditEdtTxt?.text.toString()
        }

        dailySheetSerailize.studentActivityNotes = studentNotesActivity

        data?.data?.noteDescription = binding?.noteEditEdtTxt?.text.toString()

        detailData.activityDescription = binding?.noteEditEdtTxt?.text.toString()

        AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
            .activityDescription = binding?.noteEditEdtTxt?.text.toString()

        editDS(view, mMaterialDialog, dailySheetSerailize)

    }


    fun editDS(view: View, mMaterialDialog: MaterialDialog, dailySheetSerailize: DailySheetSerializeRequest) {
        isLoading.value = true

        val binding = DataBindingUtil.findBinding<RecentSheetDetailActivityBinding>(view)
        val studentDS = StudentDailySheetDetail()
        studentDS.activityTypeID = dailySheetSerailize.activityTypeID
        studentDS.studentID = dailySheetSerailize.studentID
        //  AppInstance.studentDSDetail = studentDS
        binding?.activityName?.text =
            AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
                .activityDescription
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {
                isLoading.value = false

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Detail updated successfully")
                    mMaterialDialog.dismiss()


                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    showToast(view.context, "No Data Found!!")
                    mMaterialDialog.dismiss()

                }
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                mMaterialDialog.dismiss()

                isLoading.value = false
            }
        })
    }


    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
        // val binding = DataBindingUtil.findBinding<TestFragmentDailySheetBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String
        masterView = view

        mDatePicker =
            DatePickerDialog(view.context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year

                val d = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault()).parse(mDate)


                val dayOfWeek= SimpleDateFormat(
                    "EEE",
                    Locale.getDefault()).format(d)

                try {
                    //  val mdate = displayDate.parse(mDate)
                    binding!!.dateTxt.text = numDate.format(d)
                    binding.weekDayTxt.text = dayOfWeek
                    binding.monthYrTxt.text = monthYear.format(d)
                    selectedDate.value = mDate
                    mSelectedDate = mDate


                    isLoading.value = true
                    //2020-12-22 23:25:20
                    getDailySheetData(/*getServerDate*/(mSelectedDate), mClassId, view)
                    AppInstance.selectedDate = numDate.format(d) + " " + monthYear.format(d)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        //  dp.minDate = c.timeInMillis
        mDatePicker.show()
    }

    fun onClickCompleteCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentCompleteDailySheetBinding>(view)
        val mDatePicker: DatePickerDialog
        val c = Calendar.getInstance()
        val mYear = c.get(Calendar.YEAR)
        val mMonth = c.get(Calendar.MONTH)
        val mDay = c.get(Calendar.DAY_OF_MONTH)
        var mDate: String
        masterView = view

        mDatePicker =
            DatePickerDialog(view.context, DatePickerDialog.OnDateSetListener { datepicker, year, month, day ->
                mDate = (month + 1).toString() +
                        "-" + day + "-" + year
                try {
                    val mdate = SimpleDateFormat("MM-dd-yyyy", Locale.getDefault()).parse(mDate)

                    // val mdate = displayDate.parse(mDate)
                    binding!!.dateTextDailySheet.text = numDate.format(mdate)
                    binding.weekDayTxtDailySheet.text = dayofWeek.format(mdate)
                    binding.monthYrTxtDailySheet.text = monthYear.format(mdate)
                    selectedDate.value = mDate
                    mSelectedDate = mDate
                    isLoading.value = true
                    getCompleteDailySheetData(mSelectedDate, mClassId, view)
                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        // dp.minDate = c.timeInMillis
        mDatePicker.show()
    }

    /**
     * Adapter
     */

    fun onClickViewMore(view: View) {
        val intent = Intent(view.context, DailysheetDetailActivity::class.java)

        view.context.startActivity(intent)

    }

    fun getCurrentClassData(view: View, date: String) {
        isLoading.value = true
        val body = OperationalClassRequestData()
        val manager = NetworkManager()

        body.agencyID = AppInstance.getUser(view.context)?.agencyID

        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)
        body.askedDateString =    date.replace(date.substringAfter(" "),mCurrentTime)
        body.askingDate  = getServerDate(body.askedDateString.toString())

        if(!body.askingDate.toString().contains("Z"))
            body.askingDate = body.askingDate+".000Z"

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
                        val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                        Log.i("Response GetClass >> ", response.message.toString())

                        if(!response.data.isNullOrEmpty()) {
                            if (response.data.isNotEmpty() && response.data.size > 0) {
                                val niceSpinner = binding?.classSpinner
                                val data: MutableList<String> = mutableListOf()

                                for (pos in 0 until response.data.size) {
                                    response.data[pos].label?.let { it1 -> data.add(it1) }
                                }
                                val dataset = LinkedList(data)
                                niceSpinner?.attachDataSource(dataset)

                                //Set the Check in Class ID to fetch the data
                                var selectedPOS: Int = 0
                                for (indexpos in 0 until dataset.size) {
                                    if ((response.data!!.size) > 0) {
                                        if (dataset[indexpos].equals(AppInstance.getTeacherInfo(view.context)?.data!![0].label)) {
                                            selectedPOS = indexpos
                                            mClassId =
                                                response.data!!.get(indexpos).value!!
                                            break
                                        }
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
                                        isLoading.value = true
                                        mClassId = response.data[position].value!!

                                        AppInstance.dailyClassId = mClassId
                                        AppInstance.classId = mClassId
                                        var date = convertDateUTC(
                                            mSelectedDate,
                                            reservationDate,
                                            reservationDate
                                        )

                                        if (date.isBlank()) {
                                            date = convertDateUTC(
                                                mSelectedDate,
                                                displayDate,
                                                reservationDate
                                            )
                                        }


                                        getDailySheetData(
                                            date,
                                            mClassId,
                                            view
                                        )
                                    }

                                    override fun onNothingSelected(parent: AdapterView<*>) {}
                                })
                            }
                        }else {
                           // showToast(view.context, "No Data Found!!")
                        }
                        if (AppInstance.getTeacherInfo(view.context)?.data != null
                            && AppInstance.getTeacherInfo(view.context)?.data!!.isNotEmpty()) {
                           // mClassId = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value!!
                            getDailySheetData((mSelectedDate), mClassId, view)
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

    fun getCompleteClassData(view: View) {
        isLoading.value = true
        val body = ClassData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID //requestData.agencyID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllClasses(body), object :
            ServiceListener<ClassModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: ClassModel, requestcode: Int) {
                completeclassApiResponse.value = response
                // AppInstance.allClasses = response
                AppInstance.allTypesOfClasses = response

                if (response.statusCode == ResponseCodes.Success) {
                    val binding = DataBindingUtil.findBinding<FragmentCompleteDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    if (response.data?.isNotEmpty()!! && response.data?.size > 0) {
                        val niceSpinner = binding?.classSpinnerDailySheet
                        val data: MutableList<String> = mutableListOf()

                        for (pos in 0 until response.data.size) {
                            response.data[pos].className?.let { it1 -> data.add(it1) }
                        }
                        val dataset = LinkedList(data)
                        niceSpinner?.attachDataSource(dataset)

//Set the Check in Class ID to fetch the data
                        var selectedPOS: Int = 0
                        for (indexpos in 0 until dataset.size) {
                            if((AppInstance.getTeacherInfo(view.context)?.data!!.size)>0) {
                                if (dataset[indexpos].equals(AppInstance.getTeacherInfo(view.context)?.data!![0].label)) {
                                    selectedPOS = indexpos

                                    // mClassId=3
                                    mClassId = AppInstance.getTeacherInfo(view.context)?.data!!.get(0).value!!

                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value   // need to change id here

                                    break
                                }
                            }
                        }
                        niceSpinner!!.selectedIndex = selectedPOS

                        niceSpinner?.setOnItemSelectedListener(object : AdapterView.OnItemSelectedListener {
                            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                                isLoading.value = true
                                mClassId = response.data[position].classesID!!

                                AppInstance.dailyClassId = mClassId

                                AppInstance.classId = mClassId

                                getCompleteDailySheetData(
                                    mSelectedDate,
                                    mClassId,
                                    view
                                )

                            }

                            override fun onNothingSelected(parent: AdapterView<*>) {}
                        })
                    } else {
                      //  showToast(view.context, "No Data Found!!")
                    }
                    /* getDailySheetData(getServerDate(mSelectedDate), response.data[0].classesID)
                     mClassId = response.data[0].classesID!!*/
                    if (AppInstance.getTeacherInfo(view.context)?.data != null &&
                        AppInstance.getTeacherInfo(view.context)?.data!!.isNotEmpty()) {

                        mClassId = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value!!
                        getCompleteDailySheetData(mSelectedDate, mClassId, view)
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

    private fun getDailySheetData(date: String, id: Int?, view: View) {
        val body = DailySheetData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        body.classID = id

        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)
        var newDate:String
        //12-21-2020
        var passedDate : String
        // 2020-12-23 06:16:23   //2020-12-22 06:00:53
        if(date.length<=10){
            var dd =  convertDateUTC(date, displayDate, alohaDate) // SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(convertStringToDateWithoutTimeZone(date))
            passedDate =  dd.toString() //convertDate(date, displayDate, serverDate )
        }else{
            passedDate = date
        }

        if(passedDate.contains("00:00:00")){
            newDate =  passedDate.toString().replace("00:00:00",mCurrentTime.trim())

            if(newDate.contains("T"))
                newDate = newDate.toString().replace("T"," ")
        }else {
            newDate  = date
        }

        body.askedDateString = newDate
        body.askedDate = getServerDate(newDate)

        if(body.askedDate.toString().contains("Z")){
            body.askedDate= body.askedDate
        }else{
            body.askedDate = body.askedDate+".000Z"
        }

        if(body.askedDateString.toString().isNullOrBlank()){
            body.askedDateString = convertUtcToLocal(body.askedDate.toString(), postserverDate, reservationDate)//convertUtcToLocal(date, serverDate, postserverDate)
        }

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassDailySheet(body), object :
            ServiceListener<DailySheetStudentList> {
            override fun getServerResponse(response: DailySheetStudentList, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    //  AppInstance.selectedStudentsListDailySheet = ArrayList<Int>()
                    AppInstance.allDailySheetStidentList?.data?.clear()
                    AppInstance.allDailySheetStidentList=DailySheetStudentList()
                    AppInstance.allDailySheetStidentList = response
                    Log.i("Response GetAttendence=", response.message.toString())

                    dailySheetApiResponse.value = response

                }else{
                    dailySheetApiResponse.value = response
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }

    private fun getCompleteDailySheetData(date: String, id: Int?, view: View) {
        val body = DailySheetRequest()
        val manager = NetworkManager()
        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        // body.classID = id
        var newDate = date
        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)
        var passedDate : String
        // 2020-12-23 06:16:23   //2020-12-22 06:00:53
        if(date.length<=10){
            var dd =  convertDateUTC(date, displayDate, alohaDate)
            passedDate =  dd
        }else{
            passedDate = date
        }

        if(passedDate.contains("00:00:00")){
            newDate =  passedDate.toString().replace("00:00:00",mCurrentTime.trim())

            if(newDate.contains("T"))
                newDate = newDate.toString().replace("T"," ")
        }else {
            newDate  = date
        }

        body.askedDate = getServerDate(newDate)
        body.askedDateString = newDate
        body.studentActivitiesId = 0
        body.studentID = 0
        body.StudentName = ""

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getAllDailySheet(body), object :
            ServiceListener<DailySheetStudentList> {
            override fun getServerResponse(response: DailySheetStudentList, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    //  AppInstance.selectedStudentsListDailySheet = ArrayList<Int>()
                    AppInstance.allDailySheetStidentList?.data?.clear()
                    AppInstance.allDailySheetStidentList=DailySheetStudentList()
                    AppInstance.allDailySheetStidentList = response
                    Log.i("Response GetAttendence=", response.message.toString())

                    completedailySheetApiResponse.value = response

                }else{
                    completedailySheetApiResponse.value = response
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }


    var activityStartTime = ObservableField<String>()
    var activityEndTime = ObservableField<String>()
    var activityDesc = ObservableField<String>()
    var healthTemp = ObservableField<String>()
    var healthNote = ObservableField<String>()
    var notesDesc = ObservableField<String>()
    var napDescription = ObservableField<String>()
    var napEndTime = ObservableField<String>()
    var napStartTime = ObservableField<String>()
    var moodDesc = ObservableField<String>()
    var otherThanMeal = ObservableField<String>()
    var otherThanMealComment = ObservableField<String>()
    var mealComment = ObservableField<String>()
    var diaperChangeTime = ObservableField<String>()
    var diaperDescription = ObservableField<String>()


    fun onClickAddDSBtn(view: View,selectedStudents:ArrayList<Int>){//,classId:Int,selectedStudents:List<Int>) {
        val intent = Intent()
        val dailySheetSerailize = DailySheetSerializeRequest()

        dailySheetSerailize.id = 0
        dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID

        if(AppInstance.dailyClassId!=null) {
            dailySheetSerailize.classesID = AppInstance.dailyClassId // AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value   // need to change id here
        }
        else{
            AppInstance.classId =  AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
            dailySheetSerailize.classesID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        }
        dailySheetSerailize.createdBy = AppInstance.getUser(view.context)?.loginUserID
        dailySheetSerailize.activityRegisterDate= getServerDate(mSelectedDate)

        dailySheetSerailize.activityTypeID = Integer.parseInt(AppInstance.selectedDailySheetActivity.toString())

        dailySheetSerailize.selectedStudents = selectedStudents //AppInstance.selectedStudentsListDailySheet

        val studentOtherActivity = DailySheetSerializeRequest().StudentOtherActivity()
        val studentHealthActivity = DailySheetSerializeRequest().StudentActivityMedications()
        val studentNotesActivity = DailySheetSerializeRequest().StudentActivityNotes()
        val studentNapActivity = DailySheetSerializeRequest().StudentAcitivityNap()
        val studentMoodActivity = DailySheetSerializeRequest().StudentActivityMoods()
        var studentMealActivity = DailySheetSerializeRequest().StudentActivityMeals()
        var studentDiaperActivity = DailySheetSerializeRequest().StudentAcitivityDiaper()

        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == ACTIVITY) {
            studentOtherActivity.studentActivitiesID = 0
            studentOtherActivity.id = 0
            studentOtherActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentOtherActivity.startTime =
                activityStartTime.get()?.let {
                    // convertLocalToUtc(it, dialogDisplayTime, serverDate)
                    convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)
                }
            studentOtherActivity.endTime =
                activityEndTime.get()?.let {
                    //  convertLocalToUtc(getCurrentDate()+" " +activityEndTime.get()!!, dialogDisplayTime, serverDate)
                    convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)
                }
            studentOtherActivity.otherActivityNote = activityDesc.get()
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == HEALTH) {

            studentHealthActivity.studentActivitiesID = 0
            studentHealthActivity.id = 0
            studentHealthActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentHealthActivity.recordedTemparture = healthTemp.get()
            studentHealthActivity.studentHealthDescription = healthNote.get()
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == NOTES) {
            studentNotesActivity.studentActivitiesID = 0
            studentNotesActivity.id = 0
            studentNotesActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentNotesActivity.noteDescription = notesDesc.get()
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == NAP) {
            studentNapActivity.studentActivitiesID = 0
            studentNapActivity.id = 0
            studentNapActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentNapActivity.sleptAtTime = napStartTime.get()?.let {
                convertLocalToUtc(
                    getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)
                // convertLocalToUtc(it, dialogDisplayTime, serverDate)
            }
            studentNapActivity.workUpTime = napEndTime.get()?.let {
                convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)
                //  convertLocalToUtc(it, dialogDisplayTime, serverDate)
            }
            studentNapActivity.napNote = napDescription.get()
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == MOOD) {
            studentMoodActivity.studentActivitiesID = 0
            studentMoodActivity.id = 0
            studentMoodActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentMoodActivity.moodTypeID = AppInstance.selectedMood
            studentMoodActivity.studentMoodDescription = moodDesc.get()
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == MEAL) {
            studentMealActivity.studentActivitiesID = 0
            studentMealActivity.id = 0
            studentMealActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentMealActivity.otherThanPlanMeal = otherThanMeal.get()
            studentMealActivity.otherThanPlanMealComment = otherThanMealComment.get()
            studentMealActivity.mealComment = mealComment.get()

            AppInstance.mealPlanModel = AppInstance.mealPlanModel

            if(AppInstance.mealPlanModel?.data !=null && AppInstance.mealPlanModel?.data!!.size>0) {
                studentMealActivity.mealTypeID =
                    AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealTypeID
                studentMealActivity.mealPlanTitle =
                    AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealPlanTitle
                studentMealActivity.mealPlannerID =
                    AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealPlannerID
                studentMealActivity.mealTypeName =
                    AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealTypeName
                studentMealActivity.studentActivityMealFoodItems = getfooditems(view)

            }
            //showToast(view.context, "Meal Plan is in progress")
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == DIAPER) {
            studentDiaperActivity.studentActivitiesID = 0
            studentDiaperActivity.id = 0
            studentDiaperActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
            studentDiaperActivity.diaperChangeTime =
                diaperChangeTime.get()?.let {
                    //  convertLocalToUtc(it, dialogDisplayTime, serverDate)
                    convertLocalToUtc(getCurrentDate()+" " +it, SimpleDateFormat("MM-dd-yyyy hh:mm a", Locale.getDefault()), serverDate)

                }
            studentDiaperActivity.studentActivityDiaperNote = diaperDescription.get()
            //showToast(view.context, "Meal Plan is in progress")
        }

        dailySheetSerailize.studentOtherActivity = studentOtherActivity

        if(studentHealthActivity.agencyID!=null){
            dailySheetSerailize.studentActivityMedications = studentHealthActivity
        }

        if(studentNotesActivity.id!=null){
            dailySheetSerailize.studentActivityNotes = studentNotesActivity}

        if(studentMoodActivity.agencyID!=null) {
            dailySheetSerailize.studentActivityMoods = studentMoodActivity
        }
        if(studentNapActivity.agencyID!=null){
            dailySheetSerailize.studentAcitivityNap = studentNapActivity}
        if(studentMealActivity.agencyID!=null){
            dailySheetSerailize.studentActivityMeals = studentMealActivity}
        if(studentDiaperActivity.agencyID!=null){
            dailySheetSerailize.studentActivityDiaper = studentDiaperActivity}

        if(AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == MEAL){
            if (AppInstance.mealPlanModel?.data !=null && AppInstance.mealPlanModel?.data!!.size>0) {
                isLoading.value = true
                addDailySheet(dailySheetSerailize, view, intent)
            }else{
                showToast(view.context, "Please select Meal Plan ")
            }
        }else{
            if (validated(dailySheetSerailize, view)) {
                isLoading.value = true
                addDailySheet(dailySheetSerailize, view, intent)
            }
        }
    }

    private fun getfooditems(view:View): ArrayList<StudentActivityMealFoodItem>? {
        val list = ArrayList<StudentActivityMealFoodItem>()
        val allStds = AppInstance.mealPlanModel

        for (pos1 in 0 until allStds?.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.size) {
            var involvment: StudentActivityMealFoodItem = StudentActivityMealFoodItem()
            involvment.agencyID = AppInstance.getUser(view.context)?.agencyID
            involvment.foodTypeID =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).foodTypeID
            involvment.foodTypeName =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).foodTypeName

            involvment.amount = allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).amount
            involvment.quantity =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).quantity

            involvment.quantityName =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).quantityName
            involvment.measureUnitTypeID =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).measureUnitTypeID
            involvment.measureUnitTypeName =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).measureUnitTypeName
            involvment.measureQuantityTypeID =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).measureQuantityTypeID

            involvment.measureQuantityTypeName =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).measureQuantityTypeName
            involvment.foodConsumtionID =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).foodConsumtionID
            involvment.foodConsumtionName =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).foodConsumtionName
            involvment.milkConsumptionQuantity =
                allStds.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.get(pos1).milkConsumptionQuantity
            list.add(involvment)
        }
        return list
    }

    private fun getfooditemsEdit(): ArrayList<StudentActivityMealFoodItem>? {
        val list = ArrayList<StudentActivityMealFoodItem>()
        val allStds = AppInstance.editMealModel

        for (pos1 in 0 until allStds?.data!!.studentActivityMealFoodItems.size) {
            var involvment: StudentActivityMealFoodItem = StudentActivityMealFoodItem()

            involvment.id = allStds.data!!.studentActivityMealFoodItems.get(pos1).id
            involvment.agencyID = AppInstance.getUser(masterView.context)?.agencyID
            involvment.foodTypeID = allStds.data!!.studentActivityMealFoodItems.get(pos1).foodTypeID
            involvment.foodTypeName = allStds.data!!.studentActivityMealFoodItems.get(pos1).foodTypeName

            involvment.amount = allStds.data!!.studentActivityMealFoodItems.get(pos1).amount
            involvment.quantity = allStds.data!!.studentActivityMealFoodItems.get(pos1).quantity

            involvment.quantityName = allStds.data!!.studentActivityMealFoodItems.get(pos1).quantityName
            involvment.measureUnitTypeID = allStds.data!!.studentActivityMealFoodItems.get(pos1).measureUnitTypeID
            involvment.measureUnitTypeName = allStds.data!!.studentActivityMealFoodItems.get(pos1).measureUnitTypeName
            involvment.measureQuantityTypeID =
                allStds.data!!.studentActivityMealFoodItems.get(pos1).measureQuantityTypeID

            involvment.measureQuantityTypeName =
                allStds.data!!.studentActivityMealFoodItems.get(pos1).measureQuantityTypeName
            involvment.foodConsumtionID = allStds.data!!.studentActivityMealFoodItems.get(pos1).foodConsumtionID
            involvment.foodConsumtionName = allStds.data!!.studentActivityMealFoodItems.get(pos1).foodConsumtionName
            involvment.milkConsumptionQuantity =
                allStds.data!!.studentActivityMealFoodItems.get(pos1).milkConsumptionQuantity
            list.add(involvment)
        }
        return list
    }

    private fun addDailySheet(
        dailySheetSerailize: DailySheetSerializeRequest,
        view: View,
        intent: Intent) {
        val studentDS = StudentDailySheetDetail()
        studentDS.activityTypeID = dailySheetSerailize.activityTypeID
        studentDS.studentID = dailySheetSerailize.studentID
        // AppInstance.studentDSDetail = studentDS
        dailySheetSerailize.createdBy = AppInstance.getUser(view.context)?.loginUserID
        val manager = NetworkManager()

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {
                if (response.statusCode == ResponseCodes.Success) {
                    //AppInstance.incidentData = incidentData
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

    fun onClickActivityEndTime(view: View) {
        timepicker(view as TextInputEditText)
    }

    fun onClickActivityStartTime(view: View) {
        timepicker(view as TextInputEditText)
    }

    private fun validated(dailySheetSerailize: DailySheetSerializeRequest, view: View): Boolean {
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == ACTIVITY) {
            when {
                dailySheetSerailize.studentOtherActivity?.startTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter start time")
                    return false
                }
                dailySheetSerailize.studentOtherActivity?.endTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter end time")
                    return false
                }
                dailySheetSerailize.studentOtherActivity?.otherActivityNote.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter notes")
                    return false
                }
                else -> return true
            }
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == NOTES) {
            when {
                dailySheetSerailize.studentActivityNotes?.noteDescription.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter notes")
                    return false
                }
                else -> return true
            }
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == HEALTH) {
            when {
                dailySheetSerailize.studentActivityMedications?.recordedTemparture.isNullOrEmpty()-> {
                    showToast(view.context, "Please enter temperature")
                    return false
                }
                dailySheetSerailize.studentActivityMedications?.studentHealthDescription.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter description")
                    return false
                }
                else -> return true
            }
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == NAP) {
            when {
                dailySheetSerailize.studentAcitivityNap?.sleptAtTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter slept time")
                    return false
                }
                dailySheetSerailize.studentAcitivityNap?.workUpTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter woke-up time")
                    return false
                }
                else -> return true
            }
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == MOOD) {
            when {
                dailySheetSerailize.studentActivityMoods?.studentMoodDescription.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter description")
                    return false
                }
                else -> return true
            }
        }
        if (AppInstance.selectedDailySheetActivity?.let { Integer.parseInt(it) } == DIAPER) {
            when {
                dailySheetSerailize.studentActivityDiaper?.diaperChangeTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter diaper change time")
                    return false
                }
                dailySheetSerailize.studentActivityDiaper?.studentActivityDiaperNote.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter note")
                    return false
                }
                else -> return true
            }
        }
        return true
    }

/*
    fun getOperationalClassData(view: View, date: String) {
        isLoading.value = true
        val body = OperationalClassRequestData()
        val manager = NetworkManager()

        body.agencyID = AppInstance.getUser(view.context)?.agencyID
        var mCurrentTime :String = Calendar.getInstance().time.toString().substring(11,20)

        body.askedDateString =  date.replace(date.substringAfter(" "),mCurrentTime).trim()

        var serverDate = getServerDate(body.askedDateString.toString())//getServerDate(date)

        if(serverDate.contains("Z")){
            body.askingDate  =serverDate
        }else{
            body.askingDate = serverDate+".000Z"
        }

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
                        val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
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

                                        getCurrentClassData(
                                            mSelectedDate,
                                            mClassId,
                                            view
                                        )

                                    }
                                }

                                override fun onNothingSelected(parent: AdapterView<*>) {

                                    mSelectedDate?.let { getAttendanceData(it, mClassId, view) }

                                }
                            })


                        } else {
                            showToast(view.context, "No Data Found!!")
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

}
