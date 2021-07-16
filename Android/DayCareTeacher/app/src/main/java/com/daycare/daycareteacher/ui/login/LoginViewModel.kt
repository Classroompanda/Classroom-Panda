package com.daycare.daycareteacher.ui.login

import android.content.Intent
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.daycareteacher.DaycareTeacherApp
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.R.id.edtPassword
import com.daycare.daycareteacher.R.id.edtPhoneNo
import com.daycare.daycareteacher.databinding.ActivityLoginBinding
import com.daycare.daycareteacher.model.LoginRequest
import com.daycare.daycareteacher.model.LoginResponse
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.ui.forgotpassword.ForgotPasswordActivity
import com.daycare.daycareteacher.utill.*
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.iid.FirebaseInstanceId

class LoginViewModel : ViewModel() {

    var isLoading = MutableLiveData<Boolean>()
    var phoneNo = ObservableField<String>()
    var password = ObservableField<String>()
    var isClickedForgotPassword = MutableLiveData<Boolean>()
    var loader = Loader()
    val loginApiResponse = MutableLiveData<Any>()

    init {
//        phoneNo.set("finalteacher@yopmail.com")
//        password.set("1217Ds85.")

        phoneNo.set("")
        password.set("")

        /*  phoneNo.set("toby@yopmail.com")
          password.set("daycare@123")*/

        /* phoneNo.set("tom@yopmail.com")
         password.set("daycare@123")*/
    }

    fun onClickForgotPassword(view: View) {
        val intent = Intent(view.context, ForgotPasswordActivity::class.java)
        view.context.startActivity(intent)
        isClickedForgotPassword.value = true
    }


    fun onClickLoginBtn(view: View) {
        loader.startLoader(view.context)
        val binding = DataBindingUtil.findBinding<ActivityLoginBinding>(view)
        //check validation over network/api service
        if (validated(view)) {
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
                }
                val loginRequest = LoginRequest()
                loginRequest.emailAddress = phoneNo.get()
                loginRequest.password = password.get()
                loginRequest.isValid = true
                loginRequest.askedDateString = getCurrentDateTime()
                loginRequest.askedDate = getCurrentUTC()

                try {
                    if (task.result != null) {
                        loginRequest.businessToken = task.result?.token
                    } else {
                        loginRequest.businessToken = ""
                    }
                } catch (e: Exception) {
                    loginRequest.businessToken = ""
                }
                loginRequest.phoneTypeID = 1;
                loginRequest.osType = 1
                callLogin(loginRequest, view)

            })

    }

    private fun callLogin(loginRequest: LoginRequest, view: View) {
        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(
            ApiUtilis.getAPIService(view.context).loginRequestApi(loginRequest), object :
                ServiceListener<LoginResponse> {
                override fun getServerResponse(response: LoginResponse, requestcode: Int) {

                    if (response.statusCode == ResponseCodes.Success) {
                        isLoading.value = false
                        loader.stopLoader()

                        response.data?.let {
                            PreferenceConnector.writeUserInfo(
                                view.context!!,
                                PreferenceConnector.USER_INFO,
                                it
                            )
//                            DaycareTeacherApp.INSTANCE.teacherAttendanceId =
//                                it.teacherTodayAttendenceId ?: 0
                        }

                        if (response.data?.roleId == 3 && response.data?.teacherTodayAttendenceStatusId == 2) {
                            showDialog(
                                view.context,
                                view.context.getString(R.string.app_name),
                                "You are clocked out for today."
                            )

                        } else if (response.data?.roleId == 3) {
                            response.data?.password = password.get()
                            loginApiResponse.value = response
//                        isLoggedIn.value = true
                            response.accessToken?.let {
                                PreferenceConnector.writeString(
                                    view.context, PreferenceConnector.ACCESS_TOKEN,
                                    it
                                )
                            }

                        } else {
                            loader.stopLoader()
                            isLoading.value = false
//                        isLoggedIn.value = false
                            showDialog(
                                view.context,
                                view.context.getString(R.string.app_name),
                                "Invalid Username or password."
                            )

                        }
                        loader.stopLoader()
                        isLoading.value = false
                    } else {
                        loader.stopLoader()
                        isLoading.value = false
                        showDialog(
                            view.context,
                            view.context.getString(R.string.app_name),
                            response.message.toString()
                        )
                    }
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
        } else {
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
    }
}