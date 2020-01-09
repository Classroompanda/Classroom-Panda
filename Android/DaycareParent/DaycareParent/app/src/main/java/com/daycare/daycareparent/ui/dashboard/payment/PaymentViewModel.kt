package com.daycare.daycareparent.ui.dashboard.payment

import android.annotation.SuppressLint
import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.showDialog

class PaymentViewModel : ViewModel() {
    val isLoading = MutableLiveData<Boolean>()
    val stripeKey = MutableLiveData<StripeData>()
    val payHistoryResponse = MutableLiveData<List<PaymentHistoryData>>()
    val isPaymentSuccess = MutableLiveData<Boolean>()
    val duePaymentsList = MutableLiveData<DuePaymentModel>()
//    getStripeDetailsForAgency

    fun getStripeDetails(view: View) {
        if (isLoading.value != true) {

            isLoading.value = true
            val info = GuardianRequest()
            info.agencyID = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.agencyID
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getStripeDetailsForAgency(info), object :
                ServiceListener<PaymentModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: PaymentModel, requestcode: Int) {
                    isLoading.value = false

                    if (response.statusCode == ResponseCodes.Success) {
                        stripeKey.value = response.data?.get(0)
//                        showToast(view.context, response.message.toString())
                    } else {
                        showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)

                }
            })
        }
    }

    //paymentDetails
    fun setpaymentDetails(info: PaymentRequest, view: View) {

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).paymentDetails(info), object :
            ServiceListener<BaseModel> {
            @SuppressLint("LogNotTimber")
            override fun getServerResponse(response: BaseModel, requestcode: Int) {
//                    isLoading.value = false

                isPaymentSuccess.value = response.statusCode == ResponseCodes.Success
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
                isPaymentSuccess.value = false
            }
        })
    }

    //getPaymentDetails
    fun paymentHistory(view: View) {
        if (isLoading.value != true) {

            isLoading.value = true
            val info = GuardianRequest()
            val user = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)
            info.agencyID = user?.agencyID
            info.parentID = user?.releventUserID
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getPaymentDetails(info), object :
                ServiceListener<PaymentHistoryModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: PaymentHistoryModel, requestcode: Int) {
                    isLoading.value = false

                    if (response.statusCode == ResponseCodes.Success) {
                        payHistoryResponse.value = response.data
//                        showToast(view.context, response.message.toString())
                    } else {
                        showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
                    }
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }
    }

    //    getDuePaymetList
    fun getDuePaymetList(view: View) {
        if (isLoading.value != true) {
            isLoading.value = true
            val user = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)
            val info = DuePayment()
            info.agencyID = user?.agencyID
            info.parentID = user?.releventUserID
            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).getDuePaymetList(info), object :
                ServiceListener<DuePaymentModel> {
                @SuppressLint("LogNotTimber")
                override fun getServerResponse(response: DuePaymentModel, requestcode: Int) {
                    isLoading.value = false
                    duePaymentsList.value = response
                }

                override fun getError(error: ErrorModel, requestcode: Int) {
                    Log.e("Error", error.error_message)
                    showDialog(view.context, view.context.getString(R.string.app_name), error.error_message)
                    isLoading.value = false

                }
            })
        }
    }
}