package com.daycare.daycareparent.ui.dashboard.addchildform

import android.app.Activity
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.util.Log
import android.view.View
import com.daycare.daycareparent.model.GuardianData
import com.daycare.daycareparent.model.GuardianRequest
import com.daycare.daycareparent.model.ParentChild
import com.daycare.daycareparent.model.StudentInfoDetail
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.AppInstance

class AddFormViewModel : ViewModel() {

    val viewGuardianData = MutableLiveData<ArrayList<GuardianData>>()

    fun onClickCancel(view: View) {
        (view.context as Activity).finish()
    }

    fun onClickNext(view: View) {

    }

    fun getStudentInfoDetail(view: View, childData: ParentChild?) {
//        isLoading.value = true
        val info = GuardianRequest()
        info.agencyID = childData?.agencyID
        info.studentID = childData?.studentId
        info.parentID = childData?.parentID

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStudentInfo(info), object :
            ServiceListener<StudentInfoDetail> {
            override fun getServerResponse(response: StudentInfoDetail, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    AppInstance.completeStdDetail = response
                    viewGuardianData.value = response.data?.guardians as ArrayList<GuardianData>?
                } else {
                    viewGuardianData.value = ArrayList()
                }
//                isLoading.value = false

            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
            }
        })


    }
}