package com.daycare.daycareteacher.ui.dashboard.fragments.allergy

import android.util.Log
import android.view.View
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.daycareteacher.model.AllergyData
import com.daycare.daycareteacher.model.AllergyModel
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.getCurrentDateTime
import com.daycare.daycareteacher.utill.getCurrentUTC

class AllergyViewModel() : ViewModel() {

    val isLoading = MutableLiveData<Boolean>()
    val allergyApiResponse = MutableLiveData<Any>()
    var mSelectedDate = getCurrentDateTime()
    
    val studentName = ObservableField<String>("")
    val className = ObservableField<String>("")
    val parentName = ObservableField<String>("")


    fun allergyList(view: View) {
        if (isLoading.value != true) {
            isLoading.value = true
            val allergyRequest = AllergyData()
            allergyRequest.agencyID = AppInstance.getUser(view.context)?.agencyID
            allergyRequest.classID =  AppInstance.getTeacherInfo(view.context)?.data?.get(0)?.value
            allergyRequest.teacherID = AppInstance.getUser(view.context)?.releventUserID
            allergyRequest.askingDate = getCurrentUTC()//getServerDate(mSelectedDate)
            allergyRequest.askedDateString = getCurrentDateTime()
            val manager = NetworkManager()
            manager.createApiRequest(
                ApiUtilis.getAPIService(view.context).getAllergy(allergyRequest),
                object :
                    ServiceListener<AllergyModel> {
                    override fun getServerResponse(response: AllergyModel, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            Log.i("Response GetStudent=", response.message.toString())
                            isLoading.value = false
                          //  AppInstance.allergy = response
                        } else {
                            Log.i("Error", response.statusCode.toString() + response.message)
                        }
                        allergyApiResponse.value = response
                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        isLoading.value = false
                    }
                })
        }
    }

}