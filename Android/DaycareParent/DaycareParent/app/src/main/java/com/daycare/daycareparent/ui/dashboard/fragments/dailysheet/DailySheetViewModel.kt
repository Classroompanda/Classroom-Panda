package com.daycare.daycareparent.ui.dashboard.fragments.dailysheet

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DatePickerDialog
import android.app.TimePickerDialog
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
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.*
import com.daycare.daycareparent.interfaces.IAdapterFragmentCallBack
import com.daycare.daycareparent.interfaces.ILoaderCallback
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.dashboard.activities.DailysheetDetailActivity
import com.daycare.daycareparent.ui.dashboard.adapter.EditFoodItemsAdapter
import com.daycare.daycareparent.ui.dashboard.adapter.SetFoodItemsAdapter
import com.daycare.daycareparent.utill.*
import com.daycare.daycareparent.utill.DailySheetConstant.ACTIVITY
import com.daycare.daycareparent.utill.DailySheetConstant.DIAPER
import com.daycare.daycareparent.utill.DailySheetConstant.HEALTH
import com.daycare.daycareparent.utill.DailySheetConstant.MEAL
import com.daycare.daycareparent.utill.DailySheetConstant.MOOD
import com.daycare.daycareparent.utill.DailySheetConstant.NAP
import com.daycare.daycareparent.utill.DailySheetConstant.NOTES
import kotlinx.android.synthetic.main.choose_class_list_item.view.*
import me.drakeet.materialdialog.MaterialDialog
import java.text.ParseException
import java.util.*
import kotlin.collections.ArrayList


class DailySheetViewModel() : ViewModel() {
    val imgUrl = ObservableField<String>("")
    val todaysDate = Calendar.getInstance().time!!
    val viewId = DAILYSHEET
    val isLoading = MutableLiveData<Boolean>()
    var mSelectedDate = getCurrentDateTime()
    val dailySheetApiResponse = MutableLiveData<DailySheetStudentList>()
    var selectedDate = MutableLiveData<String>()
    val addDailySheetFab = MutableLiveData<Boolean>()
    val selectAllStudent = MutableLiveData<Boolean>()
    val studentName = ObservableField<String>("")
    val className = ObservableField<String>("")
    var position: Int = 0
    var detailposition: Int = 0
    private lateinit var iLoaderCallback: ILoaderCallback
    private lateinit var masterView: View
    private var editable = false
    var parentPos: Int = 0
    val mealPlanApiResponse = MutableLiveData<MealPlanModel>()
    var selectedItemList = ArrayList<String>()
    var foodItemPos: Int = 0


    private lateinit var data: DailySheetStudentData
    private lateinit var detailData: StudentDailySheetDetail
    private lateinit var fooddata: StudentActivityMealFoodItem



    fun getMelaPlan(view: View) {
        if (isLoading.value == false) {
            isLoading.value = true

            val body = DailySheetData()
            val manager = NetworkManager()
            body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
            body.classID = AppInstance.teacherClassCheckInModel?.data?.get(0)?.value
            body.askedDate = getServerDate(mSelectedDate)


            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealPlan(body), object :
                ServiceListener<MealPlanModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: MealPlanModel, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        mealPlanApiResponse.value = response
                        AppInstance.mealPlanModel = response
                        isLoading.value = false
                        val binding = DataBindingUtil.findBinding<ActivityAddDailySheetBinding>(view)

                        val recyclerView = binding?.recentMealRv

                        recyclerView?.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
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
                                override fun onItemSelected(
                                    parent: AdapterView<*>,
                                    view: View,
                                    position: Int,
                                    id: Long
                                ) {
                                    for (pos in 0 until response?.data?.size!!) {
                                        if (pos == position) {
                                            val listAdapter = SetFoodItemsAdapter(
                                                response.data!!.get(pos).studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
                                                selectedItemList,
                                                pos
                                            )
                                            binding?.recentMealRv?.adapter = listAdapter

                                        }
                                    }


                                    /* isLoading.value = true
                                     getDailySheetData(

                                         getServerDate(mSelectedDate),
                                         response.data[position].classesID
                                     )
                                     mClassId = response.data[position].classesID!!*/
                                }

                                override fun onNothingSelected(parent: AdapterView<*>) {}
                            })
                        } else {
                            isLoading.value = false
                            showToast(view.context, "No Data Found!!")
                        }
                        if (response.data != null) {
                            val listAdapter = SetFoodItemsAdapter(
                                response.data!!.get(0).studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
                                selectedItemList, parentPos
                            )
                            binding?.recentMealRv?.adapter = listAdapter
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
    }


    /**
     * Fragment
     */
/*
    * Adapter methods
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
        studentName.set(data.studentName)
        className.set(data.className)
        this.position = position


    }

    //Following is RecentActvityAdapter constructor
    constructor(childData: StudentDailySheetDetail, position: Int, parentPosition: Int, value: String) : this() {
        this.detailData = childData
        this.detailposition = position
        this.parentPos = parentPosition

    }

    val loader = Loader()
    fun onClickDSEditBtn(view: View) {
        editable = true

        if (detailData.activityTypeID == HEALTH) {
            // getHealthData(view, detailData.studentActivityID)
            getHealthData(view)
        } else if (detailData.activityTypeID == NOTES) {
            getNoteData(view)
        } else if (detailData.activityTypeID == ACTIVITY) {
            getActivityData(view)
        } else if (detailData.activityTypeID == NAP) {
            getNapData(view)
        } else if (detailData.activityTypeID == MOOD) {
            getMoodData(view)
        } else if (detailData.activityTypeID == MEAL) {
            getMealData(view)
        } else if (detailData.activityTypeID == DIAPER) {
            getDiaperData(view)
        }
    }

//    fun deleteDS(view: View, dailySheetSerailize: DailySheetSerializeRequest, position: Int) {
//        val studentDS = StudentDailySheetDetail()
//        studentDS.activityTypeID = dailySheetSerailize.activityTypeID
//        studentDS.studentID = dailySheetSerailize.studentID
//        AppInstance.studentDSDetail = studentDS
//        val manager = NetworkManager()
//        // isLoading.value = true
//        //Same methode for Delete just update the isDeleted flag
//        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
//            ServiceListener<DailySheetSaveResponse> {
//            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {
//
//                if (response.statusCode == ResponseCodes.Success) {
//                    Log.i("Response GetStudent=", response.message.toString())
//                    showToast(view.context, "" + "Record deleted successfully")
//
//                } else {
//                    Log.i("Error", response.statusCode.toString() + response.message)
//                    showToast(view.context, "No Data Found!!")
//                }
//                isLoading.value = false
//            }
//
//            override fun getError(error: ErrorModel, requestcode: Int) {
//                Log.e("Error", error.error_message)
//                isLoading.value = false
//            }
//        })
//    }
//
//
//    fun setLoader(iLoaderCallback: ILoaderCallback) {
//        this.iLoaderCallback = iLoaderCallback
//    }


    fun getActivityData(view: View) {
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.classesID = AppInstance.teacherClassCheckInModel?.data?.get(0)?.value
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getActivityData(body), object :
            ServiceListener<OtherActivityModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: OtherActivityModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    // isLoading.value = false
                    loader.stopLoader()
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.otherActivityModel = response
                    if (editable) showOtherEditDialog(view)

                } else {
                    // isLoading.value = false
                    loader.stopLoader()
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                // isLoading.value = false
                loader.stopLoader()
            }
        })

    }


    fun getMealData(view: View) {
        // iLoaderCallback.startLoader(false)
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealData(body), object :
            ServiceListener<EditMealModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: EditMealModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    loader.stopLoader()
                    // isLoading.value = false
                   Log.i("Response GetClass >> ", response.message.toString())

                    AppInstance.editMealModel = response
                    if (editable) showMealEditDialog(view)

                } else {
                    loader.stopLoader()
                    // isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                loader.stopLoader()
                // isLoading.value = false
            }
        })


        /*   manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMealData(body), object :
               ServiceListener<EditMealModel> {
               @SuppressLint("LogNotTimber")
               override fun getServerResponse(response: EditMealModel, requestcode: Int) {
                   //classApiResponse.value = response

                   if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                       val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
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
                    isLoading.value = false
               }
           })*/

    }


    fun getMoodData(view: View) {
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getMoodData(body), object :
            ServiceListener<MoodModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: MoodModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    loader.stopLoader()
                    // isLoading.value = false
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.moodModel = response
                    if (editable) showMoodEditDialog(view)

                } else {
                    loader.stopLoader()
                    // isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                // isLoading.value = false
                loader.stopLoader()
            }
        })

    }

    fun getNapData(view: View) {
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getNapData(body), object :
            ServiceListener<NapModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: NapModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    loader.stopLoader()
                    // isLoading.value = false
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.napModel = response
                    if (editable) showNapEditDialog(view)

                } else {
                    // isLoading.value = false
                    loader.stopLoader()
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                // isLoading.value = false
                loader.stopLoader()
            }
        })

    }

    fun getNoteData(view: View) {
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getNoteData(body), object :
            ServiceListener<NoteModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: NoteModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
//                    isLoading.value = false
                    loader.stopLoader()

//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.noteData = response
                    if (editable) showNoteEditDialog(view)

                } else {
//                    isLoading.value = false
                    loader.stopLoader()
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
//                isLoading.value = false
                loader.stopLoader()
            }
        })

    }


    fun getHealthData(view: View) {
        loader.startLoader(view.context)

        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getHealthData(body), object :
            ServiceListener<HealthModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: HealthModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.healthData = response
                    loader.stopLoader()
                    if (editable) showHealthEditDialog(view)

                } else {
//                    isLoading.value = false
                    loader.stopLoader()

                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
//                isLoading.value = false
                loader.stopLoader()
            }
        })

    }

    fun getDiaperData(view: View) {
        loader.startLoader(view.context)
        val body = DSDetailRequestData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID //requestData.agencyID
        body.studentAcitivityId = detailData.studentActivityID
        masterView = view
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getDiaperData(body), object :
            ServiceListener<DiaperModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: DiaperModel, requestcode: Int) {
                //classApiResponse.value = response

                if (response.statusCode == ResponseCodes.Success) {
                    // isLoading.value = false
                    loader.stopLoader()
//                    val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
                    Log.i("Response GetClass >> ", response.message.toString())
                    AppInstance.diaperModel = response
                    if (editable) showDiaperEditDialog(view)

                } else {
                    loader.stopLoader()
                    // isLoading.value = false
                }

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showToast(view.context, "Check Internet Connection")
                loader.stopLoader()
                // isLoading.value = false
            }
        })

    }

    private fun showDiaperEditDialog(view: View) {
        val data = AppInstance.diaperModel
        //iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.diaperactivitydata_edit,
                null
            )
        val dialogBinding = DiaperactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.diaperdescriptionTxt.setText(data?.data?.studentActivityDiaperNote)

        dialogBinding.diaperChangeTimeEdtTxt.setText(
            convertDate(
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
                    val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
                    val selectedTime = getDayName(Date()) + " " + mTime
                    val mdate = dialogDisplayTime.parse(mTime)
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

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showMealEditDialog(view: View) {

        val data = AppInstance.editMealModel
        // iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.mealactivitydata_edit,
                null
            )
        val dialogBinding = MealactivitydataEditBinding.bind(dialogView)
        //getMealEditData(dialogView)


        dialogBinding.viewModel = data?.data

        dialogBinding.mealPlanSpinner.text = data?.data?.mealPlanTitle
        dialogBinding.mealdescriptionTxt.setText(data?.data?.otherThanPlanMeal)
        dialogBinding.othermealcommentTxt.setText(data?.data?.otherThanPlanMealComment)
        dialogBinding.mealcommentTxt.setText(data?.data?.mealComment)


        val recyclerView = dialogBinding?.recentMealRv

        recyclerView?.layoutManager = LinearLayoutManager(view.context, LinearLayout.VERTICAL, false)
        (recyclerView?.layoutManager as LinearLayoutManager).isMeasurementCacheEnabled = false
        dialogBinding?.recentMealRv?.layoutManager = recyclerView?.layoutManager



        if (data?.data != null) {
            val listAdapter = EditFoodItemsAdapter(
                data.data!!.studentActivityMealFoodItems as ArrayList<StudentActivityMealFoodItem>,
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
            dailySheetSerailize.agencyID = AppInstance.loginResponse?.data?.agencyID
            dailySheetSerailize.classesID = AppInstance.teacherClassCheckInModel?.data?.get(0)?.value


            dailySheetSerailize.activityTypeID = data?.data?.activityTypeID

            val add = checkedStudentList?.add(detailData.studentID!!)


            dailySheetSerailize.selectedStudents = checkedStudentList
            val studentMealActivity = DailySheetSerializeRequest().StudentActivityMeals()
            studentMealActivity.id = data?.data?.id
            studentMealActivity.studentActivitiesID = data?.data?.studentActivitiesID




            studentMealActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentMealActivity.otherThanPlanMeal = dialogBinding.mealdescriptionTxt.text.toString()
            studentMealActivity.mealPlannerID = data?.data?.mealPlannerID
            studentMealActivity.mealPlanTitle = data?.data?.mealPlanTitle
            studentMealActivity.otherThanPlanMealComment = dialogBinding.othermealcommentTxt.text.toString()
            studentMealActivity.mealComment = dialogBinding.mealcommentTxt.text.toString()
            studentMealActivity.studentActivityMealFoodItems = getfooditemsEdit()





            dailySheetSerailize.studentActivityMeals = studentMealActivity

            AppInstance.allDailySheetStidentList?.data?.get(parentPos)?.activityDetail!!.get(detailposition)
                .activityDescription = dialogBinding.mealcommentTxt.text.toString()


            // editDS(view,mMaterialDialog,dailySheetSerailize)


        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    private fun showMoodEditDialog(view: View) {
        val data = AppInstance.moodModel
        // iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.moodactivitydata_edit,
                null
            )
        val dialogBinding = MoodactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.moodDescEdtTxt.setText(data?.data?.studentMoodDescription)
        // moodActivityDataUpdate(view,dialogView, mMaterialDialog)
        when {
            data?.data?.moodTypeID == 1 -> {
                AppInstance.selectedMood = 1
                dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy)
                dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)


                /* dialogBinding.sadhappyIV.visibility=View.GONE
                 dialogBinding.moodnapIV.visibility=View.GONE
                 dialogBinding.moodhappyIV.visibility=View.VISIBLE*/

            }
            data?.data?.moodTypeID == 3 -> {
                AppInstance.selectedMood = 3
                dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfull)
                dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)

                /*  dialogBinding.sadhappyIV.visibility=View.GONE
                  dialogBinding.moodhappyIV.visibility=View.GONE
                  dialogBinding.moodnapIV.visibility=View.VISIBLE*/

            }
            data?.data?.moodTypeID == 2 -> {
                AppInstance.selectedMood = 2
                dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying)
                /* dialogBinding.moodnapIV.visibility=View.GONE
                 dialogBinding.moodhappyIV.visibility=View.GONE
                 dialogBinding.sadhappyIV.visibility=View.VISIBLE
     */
                dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)


            }
            data?.data?.moodTypeID == 4 -> {
                AppInstance.selectedMood = 4
                dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy_gray)
                dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy)


            }
            data?.data?.moodTypeID == 5 -> {
                AppInstance.selectedMood = 4
                dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                dialogBinding.moodnapIV.setImageResource(R.mipmap.ic_playfullgray)
                dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                dialogBinding.moodgrumpyIV.setImageResource(R.mipmap.grumpy)
                dialogBinding.moodfussyIV.setImageResource(R.mipmap.fussy_gray)


            }
            /* dialogBinding.moodnapIV.setOnClickListener {
                 AppInstance.selectedMood=3
                 dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                 dialogBinding.moodnapIV.setImageResource(R.mipmap.nap)
                 dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                 dialogBinding.moodhappyIV.isSelected=false
                 dialogBinding.sadhappyIV.isSelected=false
             }
             dialogBinding.moodhappyIV.setOnClickListener {
                 AppInstance.selectedMood=1
                 dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy)
                 dialogBinding.moodnapIV.setImageResource(R.mipmap.nap_gray)
                 dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
                 dialogBinding.moodnapIV.isSelected=false
                 dialogBinding.sadhappyIV.isSelected=false
             }
             dialogBinding.sadhappyIV.setOnClickListener {
                 AppInstance.selectedMood=2
                 dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
                 dialogBinding.moodnapIV.setImageResource(R.mipmap.nap_gray)
                 dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying)
                 dialogBinding.moodnapIV.isSelected=false
                 dialogBinding.moodhappyIV.isSelected=false
             }*/
        }


        dialogBinding.moodDescEdtTxt.setText(data?.data?.studentMoodDescription)
        /* dialogBinding.moodnapIV.setOnClickListener {
             AppInstance.selectedMood=3
             dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
             dialogBinding.moodnapIV.setImageResource(R.mipmap.nap)
             dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
             dialogBinding.moodhappyIV.isSelected=false
             dialogBinding.sadhappyIV.isSelected=false
         }
         dialogBinding.moodhappyIV.setOnClickListener {
             AppInstance.selectedMood=1
             dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy)
             dialogBinding.moodnapIV.setImageResource(R.mipmap.nap_gray)
             dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying_gray)
             dialogBinding.moodnapIV.isSelected=false
             dialogBinding.sadhappyIV.isSelected=false
         }
         dialogBinding.sadhappyIV.setOnClickListener {
             AppInstance.selectedMood=2
             dialogBinding.moodhappyIV.setImageResource(R.mipmap.happy_gray)
             dialogBinding.moodnapIV.setImageResource(R.mipmap.nap_gray)
             dialogBinding.sadhappyIV.setImageResource(R.mipmap.crying)
             dialogBinding.moodnapIV.isSelected=false
             dialogBinding.moodhappyIV.isSelected=false
         }*/

        dialogBinding.btnCCancel.setOnClickListener {
            mMaterialDialog.dismiss()
        }

        dialogBinding.btnUpdate.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnUpdate.visibility = View.INVISIBLE
            // moodActivityDataUpdate(view,dialogView, mMaterialDialog)
        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    private fun showNapEditDialog(view: View) {
        val data = AppInstance.napModel
        // iLoaderCallback.startLoader(false)
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.napactivitydata_edit,
                null
            )
        val dialogBinding = NapactivitydataEditBinding.bind(dialogView)
        dialogBinding.viewModel = data?.data

        dialogBinding.napDescEditEdtTxt.setText(data?.data?.napNote)


        dialogBinding.atTimeNapEditEdtTxt.setText(convertDate(data?.data?.sleptAtTime!!, alohaDate, dialogDisplayTime))
        dialogBinding.toTimeNapEditEdtTxt.setText(convertDate(data?.data?.workUpTime!!, alohaDate, dialogDisplayTime))

        dialogBinding.atTimeNapEditEdtTxt.setOnClickListener {
            val c = Calendar.getInstance()
            val mHour = c.get(Calendar.HOUR_OF_DAY)
            val mMin = c.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                view.context,
                TimePickerDialog.OnTimeSetListener { view, hourOfDay, minute ->
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
                    val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
                    val selectedTime = getDayName(Date()) + " " + mTime
                    val mdate = dialogDisplayTime.parse(mTime)
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
                    val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
                    val selectedTime = getDayName(Date()) + " " + mTime
                    val mdate = dialogDisplayTime.parse(mTime)
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
            // napActivityDataUpdate(view,dialogView, mMaterialDialog)
        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showOtherEditDialog(view: View) {
        val data = AppInstance.otherActivityModel
        //iLoaderCallback.startLoader(false)
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
            convertDate(
                data?.data?.startTime!!,
                alohaDate,
                dialogDisplayTime
            )
        )
        dialogBinding.toTimeActivityEditEdtTxt.setText(convertDate(data?.data?.endTime!!, alohaDate, dialogDisplayTime))

        dialogBinding.cryingEditSuggestion.setOnClickListener {
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
            //enquiry->auto pay-> deregister->register
            //>>instant pin
        }
        dialogBinding.playingoutsideEditSuggestion.setOnClickListener {
            if (!dialogBinding.activityDescEditEdtTxt.text.toString().isEmpty()) {
                dialogBinding.activityDescEditEdtTxt.setText(dialogBinding.activityDescEditEdtTxt.text.toString() + "," + "He is playing in outside")
            } else {
                dialogBinding.activityDescEditEdtTxt.setText("He is playing in outside")
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
                    val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
                    val selectedTime = getDayName(Date()) + " " + mTime
                    val mdate = dialogDisplayTime.parse(mTime)
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
                    val mTime = mHourOfDay.toString() + ":" + minute + " " + format + " "
                    val selectedTime = getDayName(Date()) + " " + mTime
                    val mdate = dialogDisplayTime.parse(mTime)
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

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showHealthEditDialog(view: View) {
        val data = AppInstance.healthData
        // iLoaderCallback.startLoader(false)
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
        if (data?.data?.acknowledgeParentID != null && data.data?.acknowledgeParentID!! > 0) {
            dialogBinding.acknowledge.isChecked = true
            dialogBinding.acknowledge.isClickable = false
        } else {
            dialogBinding.acknowledge.isChecked = false
        }
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

        }


        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }

    private fun showNoteEditDialog(view: View) {
        val data = AppInstance.noteData
        // iLoaderCallback.startLoader(false)
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

        }



        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    fun onClickCalendar(view: View) {
        val binding = DataBindingUtil.findBinding<FragmentDailySheetBinding>(view)
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
                    val mdate = displayDate.parse(mDate)
                    binding!!.dateTxt.text = numDate.format(mdate)
                    binding.weekDayTxt.text = dayofWeek.format(mdate)
                    binding.monthYrTxt.text = monthYear.format(mdate)
                    selectedDate.value = mDate
                    mSelectedDate = mDate
//                    isLoading.value = true
                    getDailySheetData(getServerDate(mSelectedDate), view)
                    AppInstance.selectedDate = numDate.format(mdate) + " " + monthYear.format(mdate)
                } catch (e: ParseException) {
                    e.printStackTrace()
                }

            }, mYear, mMonth, mDay)
        val dp = mDatePicker.datePicker
        dp.maxDate = c.timeInMillis
        mDatePicker.show()
    }


    /**
     * Adapter
     */


    fun onClickStudentCard(view: View) {
        if (AppInstance.allDailySheetStidentList?.data?.get(position)!!.activityDetail!!.size > 0) {
            val intent = Intent(view.context, DailysheetDetailActivity::class.java)
            intent.putExtra("POSITION", position.toString())
            intent.putExtra("SelectedDate", mSelectedDate)
            view.context.startActivity(intent)
        }

    }


    fun getDailySheetDataRequest(view: View) {
        getDailySheetData(getServerDate(mSelectedDate), view)

    }

    private fun getDailySheetData(date: String, view: View) {
        isLoading.value = true
        val body = DailySheetData()
        val manager = NetworkManager()
        body.agencyID = AppInstance.loginResponse?.data?.agencyID
        body.studentID = PreferenceConnector.readChild(view.context, PreferenceConnector.CHILD)?.studentId
        body.askedDate = date
        body.parentID = AppInstance.loginResponse?.data?.releventUserID

        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getClassDailySheet(body), object :
            ServiceListener<DailySheetStudentList> {
            override fun getServerResponse(response: DailySheetStudentList, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {

                    AppInstance.allDailySheetStidentList = response
                    Log.i("Response GetAttendence=", response.message.toString())

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


    fun onClickAddDSBtn(view: View) {

//        val binding = DataBindingUtil.findBinding<ActivityAddDailySheetBinding>(view)
        val intent = Intent()
        val data = Bundle()

        val dailySheetSerailize = DailySheetSerializeRequest()

        dailySheetSerailize.id = 0
        dailySheetSerailize.agencyID = AppInstance.loginResponse?.data?.agencyID
        dailySheetSerailize.classesID = AppInstance.teacherClassCheckInModel?.data?.get(0)?.value



        dailySheetSerailize.activityTypeID = Integer.parseInt(AppInstance.selectedDailySheetActivity)

        dailySheetSerailize.selectedStudents = AppInstance.selectedStudentsListDailySheet

        val studentOtherActivity = DailySheetSerializeRequest().StudentOtherActivity()
        val studentHealthActivity = DailySheetSerializeRequest().StudentActivityMedications()
        val studentNotesActivity = DailySheetSerializeRequest().StudentActivityNotes()
        val studentNapActivity = DailySheetSerializeRequest().StudentAcitivityNap()
        val studentMoodActivity = DailySheetSerializeRequest().StudentActivityMoods()
        var studentMealActivity = DailySheetSerializeRequest().StudentActivityMeals()
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == ACTIVITY) {
            studentOtherActivity.studentActivitiesID = 0
            studentOtherActivity.id = 0
            studentOtherActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentOtherActivity.startTime =
                activityStartTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
            studentOtherActivity.endTime =
                activityEndTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
            studentOtherActivity.otherActivityNote = activityDesc.get()
        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == HEALTH) {
            studentHealthActivity.studentActivitiesID = 0
            studentHealthActivity.id = 0
            studentHealthActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentHealthActivity.recordedTemparture = Integer.parseInt(healthTemp.get())
            studentHealthActivity.studentHealthDescription = healthNote.get()
        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == NOTES) {
            studentNotesActivity.studentActivitiesID = 0
            studentNotesActivity.id = 0
            studentNotesActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentNotesActivity.noteDescription = notesDesc.get()
        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == NAP) {
            studentNapActivity.studentActivitiesID = 0
            studentNapActivity.id = 0
            studentNapActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentNapActivity.sleptAtTime = napStartTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
            studentNapActivity.workUpTime = napEndTime.get()?.let { convertDate(it, dialogDisplayTime, serverDate) }
            studentNapActivity.napNote = napDescription.get()
        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == MOOD) {
            studentMoodActivity.studentActivitiesID = 0
            studentMoodActivity.id = 0
            studentMoodActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentMoodActivity.moodTypeID = AppInstance.selectedMood
            studentMoodActivity.studentMoodDescription = moodDesc.get()
        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == MEAL) {
            studentMealActivity.studentActivitiesID = 0
            studentMealActivity.id = 0
            studentMealActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
            studentMealActivity.otherThanPlanMeal = otherThanMeal.get()
            studentMealActivity.otherThanPlanMealComment = otherThanMealComment.get()
            studentMealActivity.mealComment = mealComment.get()

            AppInstance.mealPlanModel = AppInstance.mealPlanModel
            studentMealActivity.mealTypeID = AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealTypeID
            studentMealActivity.mealPlanTitle =
                AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealPlanTitle
            studentMealActivity.mealPlannerID =
                AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealPlannerID
            studentMealActivity.mealTypeName = AppInstance.mealPlanModel?.data!![AppInstance.MealPlanPos!!].mealTypeName

            studentMealActivity.studentActivityMealFoodItems = getfooditems()
            var hello: String = "hi"


            //showToast(view.context, "Meal Plan is in progress")
        }


        dailySheetSerailize.studentOtherActivity = studentOtherActivity
        dailySheetSerailize.studentActivityMedications = studentHealthActivity
        dailySheetSerailize.studentActivityNotes = studentNotesActivity
        dailySheetSerailize.studentActivityMoods = studentMoodActivity
        dailySheetSerailize.studentAcitivityNap = studentNapActivity
        dailySheetSerailize.studentActivityMeals = studentMealActivity

        if (validated(dailySheetSerailize, view)) {
            isLoading.value = true
            addDailySheet(dailySheetSerailize, view, intent)
        }


    }

    private fun getfooditems(): ArrayList<StudentActivityMealFoodItem>? {
        val list = ArrayList<StudentActivityMealFoodItem>()
        val allStds = AppInstance.mealPlanModel


        for (pos1 in 0 until allStds?.data!![AppInstance.MealPlanPos!!].studentActivityMealFoodItems.size) {
            var involvment: StudentActivityMealFoodItem = StudentActivityMealFoodItem()
            involvment.agencyID = AppInstance.loginResponse?.data?.agencyID
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
            involvment.agencyID = AppInstance.loginResponse?.data?.agencyID
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
        intent: Intent
    ) {

        val studentDS = StudentDailySheetDetail()
        studentDS.activityTypeID = dailySheetSerailize.activityTypeID
        studentDS.studentID = dailySheetSerailize.studentID
        AppInstance.studentDSDetail = studentDS
        val manager = NetworkManager()
        /*if (TASK_ID == EDIT) {
            incidentData.id = AppInstance.incidentData?.id

        }*/
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    //AppInstance.incidentData = incidentData
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + response.message)
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
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == ACTIVITY) {
            when {

                dailySheetSerailize.studentOtherActivity.startTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter start time")
                    return false
                }
                dailySheetSerailize.studentOtherActivity.endTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter end time")
                    return false
                }
                dailySheetSerailize.studentOtherActivity.otherActivityNote.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter notes")
                    return false
                }

                else -> return true
            }

        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == NOTES) {
            when {

                dailySheetSerailize.studentActivityNotes.noteDescription.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter notes")
                    return false
                }

                else -> return true
            }

        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == HEALTH) {
            when {

                dailySheetSerailize.studentActivityMedications.recordedTemparture.equals("") -> {
                    showToast(view.context, "Please enter temperature")
                    return false
                }
                dailySheetSerailize.studentActivityMedications.studentHealthDescription.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter description")
                    return false
                }

                else -> return true
            }

        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == NAP) {
            when {

                dailySheetSerailize.studentAcitivityNap.sleptAtTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter slept time")
                    return false
                }
                dailySheetSerailize.studentAcitivityNap.workUpTime.isNullOrEmpty() -> {
                    showToast(view.context, "Please enter woke-up time")
                    return false
                }

                else -> return true
            }

        }
        if (Integer.parseInt(AppInstance.selectedDailySheetActivity) == MOOD) {
            when {

                dailySheetSerailize.studentActivityMoods.getStudentMoodDescription().isNullOrEmpty() -> {
                    showToast(view.context, "Please enter description")
                    return false
                }


                else -> return true
            }

        }

        return true
    }

}