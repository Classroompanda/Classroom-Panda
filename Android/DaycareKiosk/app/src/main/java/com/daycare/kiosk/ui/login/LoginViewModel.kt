package com.daycare.kiosk.ui.login

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.View
import androidx.databinding.ObservableField
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.daycare.kiosk.repository.NetworkManager
import com.daycare.kiosk.model.LoginRequest
import com.daycare.kiosk.model.LoginResponse
import com.daycare.kiosk.repository.ApiUtilis
import com.daycare.kiosk.repository.ErrorModel
import com.daycare.kiosk.repository.ResponseCodes
import com.daycare.kiosk.repository.ServiceListener
import com.daycare.kiosk.ui.dashboard.DashboardActivity
import com.daycare.kiosk.utill.AppInstance
import com.daycare.kiosk.utill.Loader
import com.daycare.kiosk.utill.showToast

class LoginViewModel : ViewModel() {
    var isLoading = MutableLiveData<Boolean>()
    var loader = Loader()
    var pinInput = ObservableField<String>()



    fun onClickEnterBtn(view: View) {
       // view.context.startActivity(Intent(view.context, DashboardActivity::class.java))
      /*  loader.startLoader(view.context)
        val binding = DataBindingUtil.findBinding<ActivityLoginBinding>(view)
        if (validated(view)) {
            //check validation over network/api service
            login(view)


        }else{
            loader.stopLoader()
            view.isEnabled =true
            view.visibility=View.VISIBLE
           // binding?.progressbar?.visibility=View.INVISIBLE

        }*/
    }


    fun loginTextChange(context:Context, s: CharSequence){
        // view.context.startActivity(Intent(view.context, DashboardActivity::class.java))
        loader.startLoader(context)
        login(context,s.toString())

       /* if (validated(s)) {
            //check validation over network/api service
            login(context,s)


        }else{
            loader.stopLoader()


        }*/
    }
    private fun login(context:Context,s:String){
        val loginRequest = LoginRequest()
        loginRequest.quickPin=s//Integer.parseInt(s)
//        loginRequest.agencyId=4
        var sss:String="hello"
       // callLogin(loginRequest)

        isLoading.value = true

        val manager = NetworkManager()
        manager.createApiRequest(ApiUtilis.getAPIService().loginRequestApi(loginRequest), object :
            ServiceListener<LoginResponse> {
            override fun getServerResponse(response: LoginResponse, requestcode: Int) {

                if (response.statusCode == ResponseCodes.Success) {
                    isLoading.value = false
                    loader.stopLoader()
                    AppInstance.logObj=response
                    context.startActivity(Intent(context, DashboardActivity::class.java))
                    (context as Activity).finish()


                } else {
                    showToast(context, "Kindly check the Pin")
                    loader.stopLoader()
                    isLoading.value = false
                   context.startActivity(Intent(context, LoginActivity::class.java))
                    (context as Activity).finish()


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

    private fun validated(s:String): Boolean {



        if (pinInput.get().isNullOrEmpty()) {
           // pinInput!!.error = view.context.getString(R.string.enter_your_pin)

            return false
        } else {
            //loginBinding?.pinInput.isErrorEnabled = false
        }
        return true
    }
}