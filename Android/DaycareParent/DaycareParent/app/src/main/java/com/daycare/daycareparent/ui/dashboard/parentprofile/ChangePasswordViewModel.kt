package com.daycare.daycareparent.ui.dashboard.parentprofile

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.databinding.DataBindingUtil
import android.databinding.ObservableField
import android.util.Log
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityChangePasswordBinding
import com.daycare.daycareparent.model.BaseModel
import com.daycare.daycareparent.model.UpdatePassReq
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.utill.PreferenceConnector
import com.daycare.daycareparent.utill.showDialog

class ChangePasswordViewModel : ViewModel() {
    var isLoading = MutableLiveData<Boolean>()

    var oldPass = ObservableField<String>()
    var newPass = ObservableField<String>()
    var cnfPass = ObservableField<String>()

    fun onClickSubmit(view: View) {
        val req = UpdatePassReq()
        req.requestedEmail = PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.emailAddress
        req.updatedPassword = newPass.get()
        if (valid(view)) {

            if (isLoading.value != true) {
                isLoading.value = true
                val manager = NetworkManager()
                manager.createApiRequest(ApiUtilis.getAPIService(view.context).updatePassword(req), object :
                    ServiceListener<BaseModel> {
                    override fun getServerResponse(response: BaseModel, requestcode: Int) {

                        if (response.statusCode == ResponseCodes.Success) {
                            showDialog(
                                view.context,
                                view.context.getString(R.string.app_name),
                                response.message.toString()
                            )
                        }
                        isLoading.value = false

                    }

                    override fun getError(error: ErrorModel, requestcode: Int) {
                        Log.e("Error", error.error_message)
                        showDialog(
                            view.context,
                            view.context.getString(R.string.app_name),
                            error.error_message
                        )
                        isLoading.value = false
                    }

                })
            }
        }
    }


    private fun valid(view: View): Boolean {
        val binding = DataBindingUtil.findBinding<ActivityChangePasswordBinding>(view)
        when {
            oldPass.get().isNullOrEmpty() -> {
                binding?.oldpassLayout?.error = "Please enter old password"
                view.requestFocus(R.id.oldPassEdt)
                binding?.newPassLayout?.isErrorEnabled = false
                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            oldPass.get() != PreferenceConnector.readUser(view.context, PreferenceConnector.USER)?.password -> {
                binding?.oldpassLayout?.error = "Please enter correct password"
                view.requestFocus(R.id.oldPassEdt)
                binding?.newPassLayout?.isErrorEnabled = false
                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            newPass.get().isNullOrEmpty() -> {
                binding?.newPassLayout?.error = "Please enter new password"
                view.requestFocus(R.id.newPassEdt)
                binding?.oldpassLayout?.isErrorEnabled = false
                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            newPass.get()?.length!! < 6 -> {
                binding?.newPassLayout?.error = "Password must contain at least 6 characters"
                view.requestFocus(R.id.newPassEdt)
                binding?.oldpassLayout?.isErrorEnabled = false
                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            cnfPass.get().isNullOrEmpty() -> {
                binding?.cnfpassLayout?.error = "Please enter confirm password"
                view.requestFocus(R.id.cnfPassEdt)
                binding?.oldpassLayout?.isErrorEnabled = false
                binding?.newPassLayout?.isErrorEnabled = false
                return false
            }
            cnfPass.get() != newPass.get() -> {
                binding?.cnfpassLayout?.error = "Password do not match"
                view.requestFocus(R.id.cnfPassEdt)
                binding?.oldpassLayout?.isErrorEnabled = false
                binding?.newPassLayout?.isErrorEnabled = false
                return false
            }
            else -> return true
        }
    }
}