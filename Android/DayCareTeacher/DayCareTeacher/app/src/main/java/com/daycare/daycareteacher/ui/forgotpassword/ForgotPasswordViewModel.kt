package com.daycare.daycareteacher.ui.forgotpassword

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import com.daycare.daycareteacher.databinding.ActivityForgotPasswordBinding
import com.daycare.daycareteacher.databinding.ActivityLoginBinding
import com.daycare.daycareteacher.model.ForgotPasswordResponse
import com.daycare.daycareteacher.model.LoginRequest
import com.daycare.daycareteacher.model.LoginResponse
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.showToast

class ForgotPasswordViewModel:ViewModel() {

    var isBackClicked = MutableLiveData<Boolean>()
    var emailId = ObservableField<String>()
    var loader = Loader()
    var isLoading = MutableLiveData<Boolean>()
    val forgotApiResponse = MutableLiveData<Any>()


    fun onClickBack(view: View) {
        isBackClicked.value = true
    }
    fun onClickSubmit(view: View){
        if(validated(view)){
           // showToast(view.context,"Reset Password")
            loader.startLoader(view.context)
            val loginRequest = LoginRequest()
            loginRequest.requestedEmail= emailId.get()


            val manager = NetworkManager()
            manager.createApiRequest(ApiUtilis.getAPIService(view.context).forgotRequestApi(loginRequest), object :
                ServiceListener<ForgotPasswordResponse> {
                override fun getServerResponse(response: ForgotPasswordResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        //Log.i("Response GetStudent=", response.message.toString())
                        isLoading.value = false
                        loader.stopLoader()
                        showToast(view.context,"New password is shared on your email id. Kindly check it.")
                        AppInstance.forgotPasswordResponse = response
                        forgotApiResponse.value=response

                    } else {
                        loader.stopLoader()
                        showToast(view.context, response.message!!)

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
    private fun validated(view: View): Boolean {

        val binding = DataBindingUtil.findBinding<ActivityForgotPasswordBinding>(view)

        bindTextChangeListener(binding)

        if (emailId.get().isNullOrEmpty()) {
            binding!!.edtlPhoneNo.error = "Enter email id"
//            view.requestFocus(loginBinding.edtPhoneNo)
            return false
        } else {
            binding!!.edtlPhoneNo.isErrorEnabled = false

        }

        return true
    }
    private fun bindTextChangeListener(binding: ActivityForgotPasswordBinding?) {
        binding?.edtEmail?.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (!emailId.get().isNullOrEmpty()) {
                    binding.edtlPhoneNo.isErrorEnabled = false
                }

            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {

            }
        })

    }
}