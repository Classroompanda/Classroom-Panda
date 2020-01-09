package com.daycare.kiosk.ui.dashboard

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.kiosk.databinding.ActivityDashboardBinding
import com.daycare.kiosk.repository.NetworkManager
import com.daycare.kiosk.interfaces.ILoaderCallback
import com.daycare.kiosk.model.*
import com.daycare.kiosk.repository.ApiUtilis
import com.daycare.kiosk.repository.ErrorModel
import com.daycare.kiosk.repository.ResponseCodes
import com.daycare.kiosk.repository.ServiceListener
import com.daycare.kiosk.utill.*
import com.daycare.kiosk.utill.AppInstance.parentPosition
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import org.greenrobot.eventbus.EventBus
import java.io.File
import java.util.HashMap

class DashboardViewModel() : ViewModel() {
    var isLoading = MutableLiveData<Boolean>()
    var loader = Loader()
    val studentListApiResponse = MutableLiveData<StudentListResponse>()
    var statusFlag = ObservableField<Int>(IS_TO_BE_CHECKED)
    val updatedListResponse = MutableLiveData<UpdateStatusResponse>()
    val updateListApiResponse = MutableLiveData<UpdateStatusResponse>()
    val studentListApiResponseNew = MutableLiveData<StudentListResponse>()

    val sampleResponse = MutableLiveData<Boolean>()


    private lateinit var iLoaderCallback: ILoaderCallback
    private lateinit var data: StudentListResponse.Datum
    var position: Int = 0
    fun setLoader(iLoaderCallback: ILoaderCallback) {
        this.iLoaderCallback = iLoaderCallback
    }

    constructor(childData: StudentListResponse.Datum, position: Int) : this() {
        this.data = childData
        statusFlag.set(this.data.currentStatus)
        this.position = position
//    AppInstance.selectedDate= dialogDisplayDate.format(Date())
//        AppInstance.selectedTime = dialogDisplayTime.format(Date())
    }


//    fun onClickCheckOut(view: View) {
//        isLoading.value = true
////        val bind = DataBindingUtil.findBinding<ActivityDashboardBinding>(view)
//        if (statusFlag.get() == IS_TO_BE_CHECKED || statusFlag.get() == IS_CHECKED_OUT) {
//            // iLoaderCallback.startLoader(true)
//            //showToast(view.context, "Click")
//            statusFlag.set(IS_CHECKED_IN)
//            val incidentData = DropInOutRequest()
//            incidentData.kioskeStudentSignInDetails =
//                AppInstance.studentListResponse?.data?.get(position)?.studentId?.let { getSelectedStudents(it) }
////            if(AppInstance.studentListResponse?.data?.get(position)?.isSubsidy!!) {
////                bind?.sign?.visibility = View.VISIBLE
////            }
//
//            getChildUpdateStatus(view, incidentData)
//
//        } else if (statusFlag.get() == IS_CHECKED_IN || statusFlag.get() == IS_BREAK_IN) {
//            //showToast(view.context, "Check Out")
//            statusFlag.set(IS_CHECKED_OUT)
//            val incidentData = DropInOutRequest()
//            incidentData.kioskeStudentSignInDetails =
//                AppInstance.studentListResponse!!.data?.get(position)?.studentId?.let { getSelectedStudents(it) }
//            getChildUpdateStatus(view, incidentData)
//
//        }
//
//    }
//
//    fun onClickBreakOut(view: View) {
//        if (statusFlag.get() == IS_BREAK_OUT) {
//            // showToast(view.context, "Break In")
//            statusFlag.set(IS_CHECKED_IN)
//            val incidentData = DropInOutRequest()
//            incidentData.kioskeStudentSignInDetails =
//                AppInstance.studentListResponse!!.data?.get(position)?.studentId?.let { getSelectedStudents(it) }
//            getChildUpdateStatus(view, incidentData)
//
//        } else {
//            //showToast(view.context, "Break Out")
//            statusFlag.set(IS_BREAK_OUT)
//            val incidentData = DropInOutRequest()
//            incidentData.kioskeStudentSignInDetails =
//                AppInstance.studentListResponse!!.data?.get(position)?.studentId?.let { getSelectedStudents(it) }
//            getChildUpdateStatus(view, incidentData)
//        }
//
//    }


     fun getSelectedStudents(studentId: Int): ArrayList<DropInOutRequestList>? {
        val list = ArrayList<DropInOutRequestList>()
        val involvment = DropInOutRequestList()

        if (studentId != null) {
            involvment.studentID = studentId
            involvment.agencyID = AppInstance.logObj!!.data!!.agencyID
            involvment.parentID = AppInstance.logObj!!.data!!.releventUserID
            involvment.createdBy = AppInstance.logObj!!.data!!.releventUserID
            if (statusFlag.get() == IS_CHECKED_IN)
                involvment.isDropIn = true
            else if (statusFlag.get() == IS_BREAK_OUT)
                involvment.isBreakOut = true
            else if (statusFlag.get() == IS_BREAK_IN)
                involvment.isBreakIn = true
            else if (statusFlag.get() == IS_CHECKED_OUT)
                involvment.isDropOut = true
        }


        list.add(involvment)

        return list
    }


    fun getChildList() {
        val studentListResponse = StudentListResponse()
        studentListResponse.parentID = AppInstance.logObj?.data?.releventUserID
        studentListResponse.agencyID = AppInstance.logObj?.data?.agencyID
        studentListResponse.isAuthPerson = AppInstance.logObj?.isAuthPerson
        studentListResponse.quickPin = AppInstance.logObj?.quickPin

        val authToken = "Bearer " + AppInstance.logObj?.accessToken

        // callLogin(loginRequest)

        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(
            ApiUtilis.getAPIService().studentListRequestApi(authToken, studentListResponse),
            object :
                ServiceListener<StudentListResponse> {
                override fun getServerResponse(response: StudentListResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        loader.stopLoader()
                        AppInstance.studentListResponse = response
                        studentListApiResponse.value = response


                    } else {

                        loader.stopLoader()
                        isLoading.value = false

                    }
                    loader.stopLoader()
                    isLoading.value = false
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    isLoading.value = false
                    loader.stopLoader()
                }
            })

    }


    fun getChildUpdateStatus(view: View, incidentData: DropInOutRequest) {
        loader.startLoader(view.context)
        isLoading.value = true
        val authToken = "Bearer " + AppInstance.logObj?.accessToken
        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService().updateCheckin(authToken, incidentData), object :
            ServiceListener<UpdateStatusResponse> {
            override fun getServerResponse(response: UpdateStatusResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    loader.stopLoader()
                    val e = MessageEvent("Hey event subscriber!")
                    parentPosition = position
                    // loader.stopLoader()

                    // timerStart(view.context)

                    EventBus.getDefault().post(e);
                    updateListApiResponse.value = response


                } else {

                    loader.stopLoader()
                    isLoading.value = false

                }
                loader.stopLoader()
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                loader.stopLoader()
            }
        })

    }

    fun uploadImage(imagePath: String,context: Context,signData: SignData) {

        val file = File(imagePath)
        val map = HashMap<String, String>()
        map["Accept"] = "application/json"
        if (file.exists()) {
//            val userId = PreferenceConnector.readUser(context,PreferenceConnector.USER_INFO)?.userId
//            val userType: String? =PreferenceConnector.readUser(context,PreferenceConnector.USER_INFO)?.userType.toString()
            // create RequestBody instance from file
            val agencyId = RequestBody.create(MediaType.parse("text/plain"), signData.agencyID!!)
            val studentId = RequestBody.create(MediaType.parse("text/plain"), signData.studentID!!)
            val parentId = RequestBody.create(MediaType.parse("text/plain"), signData.parentID!!)
            val requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), file)
            // MultipartBody.Part is used to send also the actual file name
            val profile = MultipartBody.Part.createFormData("file", file.name, requestFile)


            /*val call = apiService.updateProfileImage(id, imagenPerfil,map)
            commObj.CallWebService(this, tasksID, call)*/

            val manager = NetworkManager()
            manager.createApiRequest(
                ApiUtilis.getAPIService().postSign(agencyId,studentId,parentId,profile, map),
                object :
                    ServiceListener<SignData> {
                    override fun getServerResponse(response: SignData, requestcode: Int) {
                        if (response.statusCode == ResponseCodes.Success) {
//                            profileUrl.set(response.imageData)

                        }
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
//                        apiError.value = error.error_message
                        showToast(context,error.error_message)
                    }
                })
        }
    }

}