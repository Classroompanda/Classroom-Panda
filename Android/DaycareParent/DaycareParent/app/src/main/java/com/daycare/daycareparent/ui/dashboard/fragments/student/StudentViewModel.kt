package com.daycare.daycareparent.ui.dashboard.fragments.student

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.content.Intent
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.*
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.dashboard.activities.StudentDetailActivity
import com.daycare.daycareparent.utill.*
import me.drakeet.materialdialog.MaterialDialog


class StudentViewModel() : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val studentApiResponse = MutableLiveData<Any>()
    val studentDetailApiResponse= MutableLiveData<Any>()
    val teacherMedicationApiResponse=MutableLiveData<TeacherMedicationModel>()
     var intentstudentId: Int = 0
    var mSelectedDate = getCurrentDateTime()
    val medicationstatusFlag = ObservableField<Int>(NOT_GIVEN)
    val medicationName = ObservableField<String>("")
    val strength = ObservableField<String>("")
    val units = ObservableField<String>("")
    val doses = ObservableField<String>("")
    val howTaken = ObservableField<String>("")
    val studentMedicationName = ObservableField<String>("")







//    lateinit var context: Context

    fun onClickStudentCard(view: View) {
        isLoading.value =true
//        getStudentDetail(view.context)
        getStudentDetailData( view.context)
//        context=view.context
       /* val intent = Intent(view.context, StudentDetailActivity::class.java)

        intent.putExtra("STUDENT_ID",intentstudentId)

        view.context.startActivity(intent)*/
    }

     fun getStudentMedicationData(context: Context) {
        val studentRequest = TeacherMedicationModel()
        studentRequest.agencyID=AppInstance.loginResponse?.data?.agencyID
        studentRequest.classID=AppInstance.teacherClassCheckInModel?.data?.get(0)?.value
        studentRequest.teacherID=AppInstance.loginResponse?.data?.releventUserID
        studentRequest.askingDate= getServerDate(mSelectedDate)


        isLoading.value = true
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getTeacherMedication(studentRequest), object :
            ServiceListener<TeacherMedicationModel> {
            override fun getServerResponse(response: TeacherMedicationModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    AppInstance.teacherMedicationModel = response
                    teacherMedicationApiResponse.value=response
                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                }
                studentApiResponse.value = response
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })



    }

    fun onClickUpdateMedication(view: View) {
        if (medicationstatusFlag.get() != GIVEN) {  //    Already Absent
            //iLoaderCallback.startLoader(true)
            saveMedicationExtraData(view)

        }
    }
    private fun saveMedicationExtraData(view: View) {
        val data = AppInstance.teacherMedicationModel?.data?.get(medicationposition)
        var checkedStudentList= ArrayList<Int>()
        val mMaterialDialog = MaterialDialog(view.context)
        val dialogView = LayoutInflater.from(view.context)
            .inflate(
                R.layout.teacher_medication_update,
                null
            )
        val dialogBinding = TeacherMedicationUpdateBinding.bind(dialogView)
        val binding = DataBindingUtil.findBinding<TeacherMedicationListItemBinding>(view)
        dialogBinding.viewModel = data

        dialogBinding.btnCCancel.setOnClickListener {

            binding!!.statusBtn.isChecked = false
            medicationstatusFlag.set(NOT_GIVEN)

            mMaterialDialog.dismiss()

        }

        dialogBinding.btnCCheckin.setOnClickListener {
            dialogBinding.btnCCancel.visibility = View.INVISIBLE
            dialogBinding.btnCCheckin.visibility = View.INVISIBLE
           // checkOutStudent(view,dialogView, mMaterialDialog)
            var tempTxt:String=""
            var descTxt:String=""
            tempTxt=dialogBinding.tempEdtTxt.text.toString()
            descTxt=dialogBinding.healthDescTxt.text.toString()
            val add = checkedStudentList?.add(data?.studentID!!)



            if(descTxt=="" ||!descTxt.isEmpty()){

                val dailySheetSerailize = DailySheetSerializeRequest()
                var checkedStudentList= ArrayList<Int>()


                dailySheetSerailize.id = 0
                dailySheetSerailize.agencyID = AppInstance.loginResponse?.data?.agencyID
                dailySheetSerailize.classesID = 1
                dailySheetSerailize.activityTypeID = 1

                val add = checkedStudentList?.add(data?.studentID!!)

                dailySheetSerailize.selectedStudents = checkedStudentList

                val studentHealthActivity = DailySheetSerializeRequest().StudentActivityMedications()
                studentHealthActivity.id=0
                studentHealthActivity.studentActivitiesID=0

                studentHealthActivity.agencyID = AppInstance.loginResponse?.data?.agencyID
                studentHealthActivity.recordedTemparture = Integer.parseInt(tempTxt)
                studentHealthActivity.studentHealthDescription = descTxt
                studentHealthActivity.studentMedicationID=AppInstance.teacherMedicationModel?.data?.get(medicationposition)?.studentMedicationID

                dailySheetSerailize.studentActivityMedications = studentHealthActivity




                editDS(view,mMaterialDialog,dailySheetSerailize)

            }
            else{
                showToast(view.context,"Please add note")
            }
            }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    fun editDS(view: View, mMaterialDialog: MaterialDialog,dailySheetSerailize: DailySheetSerializeRequest)
    {
         val manager = NetworkManager()
        // isLoading.value = true
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Detail updated successfully")
                    AppInstance.teacherMedicationModel?.data?.get(medicationposition)?.studentActivityMedicationID=response.saveId
                    medicationstatusFlag.set(GIVEN)

                    mMaterialDialog.dismiss()

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

    private fun getStudentDetail(context: Context) {
        val studentRequest = StudentData()
        studentRequest.agencyID=AppInstance.loginResponse?.data?.agencyID
        studentRequest.classId=2
        studentRequest.studentId=intentstudentId

    }

    constructor(requestStudentData: StudentData,context:Context) : this() {
        getStudentData(requestStudentData,context)
    }

    val imgUrl = ObservableField<String>("")
    private lateinit var data: StudentData
    private lateinit var teacherMedicationdata: TeacherMedicationData
    private lateinit var guardianData: GuardianData

    val studentName = ObservableField<String>("")
    val className = ObservableField<String>("")
    val parentName=ObservableField<String>("")
    val studentId = ObservableField<String>("")
    var medicationposition:Int = 0



    //Adapter constructor
    constructor(responseData: StudentData, i: Int) : this() {
        if(i==101){ //immunization

        }
        this.data = responseData
        imgUrl.set(data.imagePath)
        studentName.set(data.studentName)
        // className.set(data.className)
        parentName.set(data.parentName)
//        studentId.set(data.studentId.toString())
//        intentstudentId= data.studentId!!

    }

//Medication constructor
    constructor(responseData: TeacherMedicationData, i: Int,flagData:String) : this() {
this.medicationposition=i
        this.teacherMedicationdata = responseData

        studentMedicationName.set(teacherMedicationdata.studentName)
    medicationName.set(teacherMedicationdata.medicationName)
    strength.set(teacherMedicationdata.strength)
    units.set(teacherMedicationdata.units.toString())
    doses.set(teacherMedicationdata.doseRepeatName)
    howTaken.set(teacherMedicationdata.howTaken)
    if(teacherMedicationdata.studentActivityMedicationID==0 || teacherMedicationdata.studentActivityMedicationID==null) {
        medicationstatusFlag.set(NOT_GIVEN)
    }
    else{medicationstatusFlag.set(GIVEN)}



    }

    fun getStudentData(requestStudentData: StudentData,context: Context) {
        isLoading.value = true
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getClassStudentList(requestStudentData), object :
            ServiceListener<StudentModel> {
            override fun getServerResponse(response: StudentModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    AppInstance.allStudents = response
                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                }
                studentApiResponse.value = response
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })

    }

    private fun getStudentDetailData( context: Context) {
       val loader= Loader()
        isLoading.value = true
        loader.startLoader(context)
        val mData=StudentData()
        mData.agencyID=data.agencyID
        mData.classId=data.classId
        mData.studentId=data.studentId


        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getStudentDetail(mData), object :
            ServiceListener<StudentDetail> {
            override fun getServerResponse(response: StudentDetail, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.studentDetails = response
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false

//                    studentDetailApiResponse.value = response

                    if(response.data!=null) {
                        val intent = Intent(context, StudentDetailActivity::class.java)
                        context.startActivity(intent)
                    }
                    else{
                        showToast(context,"Student details not available")
                    }

                } else {
                    Log.i("Error", response.statusCode.toString() + response.message)
                    isLoading.value = false
                    loader.stopLoader()

                }
                loader.stopLoader()

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                loader.stopLoader()

            }
        })
    }

}