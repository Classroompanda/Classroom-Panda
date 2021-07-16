package com.daycare.daycareteacher.ui.dashboard.fragments.student

import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.TeacherMedicationListItemBinding
import com.daycare.daycareteacher.databinding.TeacherMedicationUpdateBinding
import com.daycare.daycareteacher.model.*
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.dashboard.activities.StudentDetailActivity
import com.daycare.daycareteacher.utill.*
import me.drakeet.materialdialog.MaterialDialog
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.util.*

class StudentViewModel() : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val studentApiResponse = MutableLiveData<Any>()
    val studentDetailApiResponse = MutableLiveData<Any>()
    val teacherMedicationApiResponse = MutableLiveData<TeacherMedicationModel>()
    var intentstudentId: Int = 0
    var mSelectedDate = getCurrentDateTime()
    val medicationstatusFlag = ObservableField<Int>(NOT_GIVEN)
    val medicationName = ObservableField<String>("")
    val strength = ObservableField<String>("")
    val units = ObservableField<String>("")
    val doses = ObservableField<String>("")
    val howTaken = ObservableField<String>("")
    val studentMedicationName = ObservableField<String>("")
    val imageApiResponse = MutableLiveData<Any>()
    var cardPosition:Int = 0

    fun onClickStudentCard(view: View,position:Int) {
        isLoading.value = true
        this. cardPosition=position
        getStudentDetailData(view.context,this.cardPosition)

    }

    fun getStudentMedicationData(view: View) {
        val studentRequest = TeacherMedicationModel()
        studentRequest.agencyID = AppInstance.getUser(view.context)?.agencyID
        studentRequest.classID = AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
        studentRequest.teacherID = AppInstance.getUser(view.context)?.releventUserID
        studentRequest.askingDate = getCurrentUTC()//getServerDate(mSelectedDate)
        studentRequest.askedDateString = convertUtcToLocal( getCurrentUTC().toString(), alohaDate,
            reservationDate)

        isLoading.value = true
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getTeacherMedication(studentRequest), object :
            ServiceListener<TeacherMedicationModel> {
            override fun getServerResponse(response: TeacherMedicationModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    AppInstance.teacherMedicationModel = response
                    teacherMedicationApiResponse.value = response
                } else {
                    isLoading.value = false
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
        val checkedStudentList = ArrayList<Int>()
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
            var tempTxt: String = ""
            var descTxt: String = ""
            tempTxt = dialogBinding.tempEdtTxt.text.toString()
            descTxt = dialogBinding.healthDescTxt.text.toString()
            val add = checkedStudentList?.add(data?.studentID!!)

            if (descTxt == "" || !descTxt.isEmpty()) {

                val dailySheetSerailize = DailySheetSerializeRequest()
                val checkedStudentList = ArrayList<Int>()

                val add = checkedStudentList?.add( AppInstance.teacherMedicationModel?.data?.get(medicationposition)?.studentMedicationID!!)

                dailySheetSerailize.id = 0
                dailySheetSerailize.agencyID = AppInstance.getUser(view.context)?.agencyID
                dailySheetSerailize.classesID = 1
                dailySheetSerailize.activityTypeID = 1
                dailySheetSerailize.createdBy = AppInstance.getUser(view.context)?.releventUserID
                dailySheetSerailize.activityRegisterDate =
                    convertDate(getCurrentDate(), displayDate, eventDateSendFormat)

                dailySheetSerailize.selectedStudents = checkedStudentList

                val studentHealthActivity = DailySheetSerializeRequest().StudentActivityMedications()
                studentHealthActivity.id = 0
                studentHealthActivity.studentActivitiesID = 0
                studentHealthActivity.doseRepeatID = 1
                studentHealthActivity.agencyID = AppInstance.getUser(view.context)?.agencyID
                studentHealthActivity.recordedTemparture = tempTxt
                studentHealthActivity.studentHealthDescription = descTxt
                studentHealthActivity.studentMedicationID =
                    AppInstance.teacherMedicationModel?.data?.get(medicationposition)?.studentMedicationID
                studentHealthActivity.isTeacherAcknowledge = true
                studentHealthActivity.acknowledgeTeacherID = AppInstance.getUser(view.context)?.releventUserID
                studentHealthActivity.isMedicationDoneToday = true
                studentHealthActivity.acknowledgeParentID = 0
                studentHealthActivity.howTaken =tempTxt

                dailySheetSerailize.studentActivityMedications = studentHealthActivity

                editDS(view, mMaterialDialog, dailySheetSerailize)

            } else {
                showToast(view.context, "Please add note")
            }
        }
        mMaterialDialog.setCanceledOnTouchOutside(false)
        mMaterialDialog.setView(dialogView).show()
    }


    fun editDS(view: View, mMaterialDialog: MaterialDialog, dailySheetSerailize: DailySheetSerializeRequest) {
        val manager = NetworkManager()
        isLoading.value = true
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).setDailySheetData(dailySheetSerailize), object :
            ServiceListener<DailySheetSaveResponse> {
            override fun getServerResponse(response: DailySheetSaveResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    Log.i("Response GetStudent=", response.message.toString())
                    showToast(view.context, "" + "Detail updated successfully")
                    AppInstance.teacherMedicationModel?.data?.get(medicationposition)?.studentActivityMedicationID =
                        response.saveId
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
        studentRequest.agencyID = AppInstance.getUser(context)?.agencyID
        studentRequest.classId = 2
        studentRequest.studentId = intentstudentId

    }

    constructor(requestStudentData: StudentData, view: View) : this() {
        getStudentData(requestStudentData, view)
    }

    val imgUrl = ObservableField<String>("")
    private lateinit var data: StudentData
    private lateinit var teacherMedicationdata: TeacherMedicationData
    private lateinit var guardianData: GuardianData

    val studentName = ObservableField<String>("")
    val className = ObservableField<String>("")
    val parentName = ObservableField<String>("")
    val studentId = ObservableField<String>("")
    var medicationposition: Int = 0
    var studentposition:Int=0


    //Adapter constructor
    constructor(responseData: StudentData, i: Int,position:Int) : this() {
        if (i == 101) { //immunization

        }
        this.data = responseData
        imgUrl.set(data.imagePath)
        studentposition= data.studentId!!
        studentName.set(data.studentName)
        className.set(data.className)
        parentName.set(data.parentName)

    }

    //Medication constructor
    constructor(responseData: TeacherMedicationData, i: Int, flagData: String) : this() {
        this.medicationposition = i
        this.teacherMedicationdata = responseData

        studentMedicationName.set(teacherMedicationdata.studentName)
        medicationName.set(teacherMedicationdata.medicationName)
        strength.set(teacherMedicationdata.strength)
        units.set(teacherMedicationdata.units.toString())
        doses.set(teacherMedicationdata.doseRepeatName)
        howTaken.set(teacherMedicationdata.howTaken)
        if (teacherMedicationdata.isMedicationDone) {
            medicationstatusFlag.set(GIVEN)
        } else {
            medicationstatusFlag.set(NOT_GIVEN)

        }
    }

    fun getStudentData(requestStudentData: StudentData, view: View) {
        if (isLoading.value != true) {
            isLoading.value = true
            val manager = NetworkManager()
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).getClassStudentList(requestStudentData),
                object :
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

    }

    private fun getStudentDetailData(context: Context,postion:Int) {
        val loader = Loader()
        isLoading.value = true
        loader.startLoader(context)
        val mData = StudentData()
        mData.agencyID = data.agencyID
        mData.classId = data.classId
        mData.studentId = data.studentId
        mData.parentID = data.parentID
        cardPosition=postion
        AppInstance.studentPosition=cardPosition


        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getStudentDetail(mData), object :
            ServiceListener<StudentDetail> {
            override fun getServerResponse(response: StudentDetail, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.studentDetails = response
                    Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    try {
                        if (response.data != null) {
                            val intent = Intent(context, StudentDetailActivity::class.java)
                            intent.putExtra("positionData",cardPosition.toString())
                            context.startActivity(intent)
                        } else {
                            showToast(context, "Student details not available")
                        }
                    } catch (e: Exception) {
                        showToast(context, "Student details not available")
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


    fun onImageUpload(context: Context, imagePath:String,studentId:Int,position:Int) {
        if (imagePath?.isNotEmpty()!! && imagePath != null) {
            if(!imagePath!!.contains("https")||!imagePath!!.contains("http")){
                val imagePath =imagePath
                val file1 = File(imagePath)
                val manager = NetworkManager()
                val map = HashMap<String, String>()
                map["Accept"] = "application/json"
                isLoading.value = true
                val requestFile1 = RequestBody.create(MediaType.parse("multipart/form-data"), file1)
                val imagenPerfil1 = MultipartBody.Part.createFormData("fileData", file1.name, requestFile1)

                manager.createApiRequest(ApiUtilis.getAPIService(context).postQuestion(imagenPerfil1, map), object :
                    ServiceListener<UploadProfileImage> {
                    override fun getServerResponse(response: UploadProfileImage, requestcode: Int) {
                        isLoading.value = false
                        AppInstance.studentDetails?.data?.imagePath=response.data
                        uploadImage(response.data,studentId,context,position)
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        isLoading.value = false
                        Log.e("Error", error.error_message)
//                        isLoading.value = false
                    }
                })
            }
        }
    }

    private fun uploadImage(imagePath:String,studentId:Int,context: Context,position:Int) {
       // AppInstance.studentImagePath=""
        AppInstance.studentPosition=null
        val profileData = UploadProfileImage()
        isLoading.value = true
        val manager = NetworkManager()
        profileData.studentId = studentId
        profileData.agencyID= AppInstance.getUser(context)?.agencyID
        profileData.imagePath=imagePath

        manager.createApiRequest(ApiUtilis.getAPIService(context).updateStudentProfileImage(profileData), object :
            ServiceListener<BaseModel> {
            override fun getServerResponse(response: BaseModel, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    AppInstance.studentDetails?.data?.imagePath=imagePath
                   // AppInstance.studentImagePath=imagePath
                    AppInstance.studentPosition=position
                    imageApiResponse.value=response
                } else {
                    isLoading.value = false
                    Log.i("Error", response.statusCode.toString() + response.message)
                }
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
            }
        })
    }
}