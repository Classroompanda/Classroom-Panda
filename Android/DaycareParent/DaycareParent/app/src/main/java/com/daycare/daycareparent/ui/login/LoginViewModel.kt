package com.daycare.daycareparent.ui.login

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Intent
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.R.id.*
import com.daycare.daycareparent.databinding.ActivityLoginBinding
import com.daycare.daycareparent.model.LoginRequest
import com.daycare.daycareparent.model.LoginResponse
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.forgotpassword.ForgotPasswordActivity
import com.daycare.daycareparent.utill.AppInstance
import com.daycare.daycareparent.utill.Loader
import com.daycare.daycareparent.utill.showDialog
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.iid.FirebaseInstanceId

class LoginViewModel : ViewModel() {

    var isLoading = MutableLiveData<Boolean>()
    var apiError = MutableLiveData<String>()
    var apiResponse = MutableLiveData<Any>()
    var phoneNo = ObservableField<String>()
    var isRemember = ObservableField<Boolean>(false)
    var password = ObservableField<String>()
    var emailError = ObservableField<String>()
    var passwordError = ObservableField<String>()
    var isClickedForgotPassword = MutableLiveData<Boolean>()
    //    var isLoggedIn = MutableLiveData<Boolean>()
    var loader = Loader()
    val loginApiResponse = MutableLiveData<Any>()

    init {
        phoneNo.set("")
        password.set("")
    }

    fun onClickForgotPassword(view: View) {
        val intent = Intent(view.context, ForgotPasswordActivity::class.java)
        view.context.startActivity(intent)
        isClickedForgotPassword.value = true
    }


    fun onClickLoginBtn(view: View) {
        loader.startLoader(view.context)
        val binding = DataBindingUtil.findBinding<ActivityLoginBinding>(view)
        if (validated(view)) {
            //check validation over network/api service
            login(view)


        } else {
            loader.stopLoader()
            view.isEnabled = true
            view.visibility = View.VISIBLE
            binding?.progressbar?.visibility = View.INVISIBLE

        }
    }

    private fun login(view: View) {
        FirebaseInstanceId.getInstance().instanceId
            .addOnCompleteListener(OnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.i("TAG", "getInstanceId failed", task.exception)
                    return@OnCompleteListener
                }
                val loginRequest = LoginRequest()
                loginRequest.emailAddress = phoneNo.get()
                loginRequest.password = password.get()
                loginRequest.isValid = true
                loginRequest.businessToken = task.result?.token
                loginRequest.phoneTypeID = 1
                loginRequest.osType =1
                callLogin(loginRequest, view)
                Log.i("TAG", "getInstanceId failed" + task.result?.token)

            })
    }

    private fun callLogin(loginRequest: LoginRequest, view: View) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService(view.context).loginRequestApi(loginRequest), object :
            ServiceListener<LoginResponse> {
            override fun getServerResponse(response: LoginResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    //Log.i("Response GetStudent=", response.message.toString())
                    isLoading.value = false
                    loader.stopLoader()
                    if (response.data?.roleId == 4) {
                        AppInstance.loginResponse = response
                        response.data?.password = password.get()
                        loginApiResponse.value = response
                    } else {
                        showDialog(
                            view.context,
                            view.context.getString(R.string.app_name),
                            "Invalid Username or password."
                        )

                    }
//                    isLoggedIn.value = true
                } else {
                    loader.stopLoader()
                    isLoading.value = false
                    showDialog(view.context, view.context.getString(R.string.app_name), response.message.toString())
                }
                loader.stopLoader()
                isLoading.value = false
            }

            override fun getError(error: ErrorModel, requestcode: Int) {
                Log.e("Error", error.error_message)
                isLoading.value = false
                loader.stopLoader()
                showDialog(
                    view.context,
                    view.context.getString(R.string.app_name),
                    error.error_message
                )

            }
        })
    }

    private fun validated(view: View): Boolean {

        val loginBinding = DataBindingUtil.findBinding<ActivityLoginBinding>(view)
        bindTextChangeListener(loginBinding)
        if (phoneNo.get().isNullOrEmpty()) {
            loginBinding!!.edtlPhoneNo.error = view.context.getString(R.string.empty_error_string)
            view.requestFocus(edtPhoneNo)
            return false
        }
//        else if (!isMobileNoValid(phoneNo.get()!!)) {
//            loginBinding!!.edtlPhoneNo.error = view.context.getString(R.string.invalid_error_string)
//            return false
//
//        }
        else {
            loginBinding!!.edtlPhoneNo.isErrorEnabled = false

        }
        if (password.get().isNullOrEmpty()) {
            loginBinding.edtlPassword.error = view.context.getString(R.string.enter_password)
            view.requestFocus(edtPassword)
            return false
        } else {
            loginBinding.edtlPassword.isErrorEnabled = false
        }
        return true
    }

    private fun bindTextChangeListener(binding: ActivityLoginBinding?) {
        binding?.edtPhoneNo?.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (!phoneNo.get().isNullOrEmpty()) {
                    binding.edtlPhoneNo.isErrorEnabled = false
                }
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {

            }
        })

        binding?.edtPassword?.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                if (!password.get().isNullOrEmpty()) {
                    binding.edtlPassword.isErrorEnabled = false
                }
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {

            }
        })
    }
}