package com.daycare.daycareparent.ui.homescreen

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Context
import android.util.Log
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.PreferenceConnector

class HomeViewModel : ViewModel() {
    var isLoading = MutableLiveData<Boolean>()
    var apiResponse = MutableLiveData<Any>()

     fun getChildList(mParentId: Int,context: Context) {

        val requestData=StudentData()
        requestData.agencyID=PreferenceConnector.readUser(context,PreferenceConnector.USER)?.agencyID
        requestData.parentID=mParentId
        requestData.studentName=""
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(context).getAllStudentsOfParent(requestData), object :
            ServiceListener<AllParentChilds> {
            override fun getServerResponse(response: AllParentChilds, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    apiResponse.value = response

                } else {
                    isLoading.value = false
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