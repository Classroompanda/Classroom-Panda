package com.daycare.daycareteacher.ui.profile

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.databinding.DataBindingUtil
import androidx.databinding.ObservableField
import android.util.Log
import android.view.View
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityChangePasswordBinding
import com.daycare.daycareteacher.model.BaseModel
import com.daycare.daycareteacher.model.UpdatePassReq
import com.daycare.daycareteacher.repository.*
import com.daycare.daycareteacher.utill.AppInstance
import com.daycare.daycareteacher.utill.showDialog

class ChangePasswordViewModel : ViewModel() {
    var isLoading = MutableLiveData<Boolean>()

    var oldPass = ObservableField<String>()
    var newPass = ObservableField<String>()
    var cnfPass = ObservableField<String>()

    fun onClickSubmit(view: View) {
        val req = UpdatePassReq()
        req.requestedEmail = AppInstance.getUser(view.context)?.emailAddress
        req.updatedPassword = newPass.get()
        if (valid(view)) {
            if(isLoading.value != false) {
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
                showDialog(view.context,view.context.getString(R.string.app_name),"Please enter current password")
//                binding?.oldpassLayout?.error = "Please enter old password"
//                view.requestFocus(R.id.oldPassEdt)
//                binding?.newPassLayout?.isErrorEnabled = false
//                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            oldPass.get() != AppInstance.getUser(view.context)?.password -> {
                showDialog(view.context,view.context.getString(R.string.app_name),"Please enter correct password")
//                binding?.oldpassLayout?.error = "Please enter correct password"
//                view.requestFocus(R.id.oldPassEdt)
//                binding?.newPassLayout?.isErrorEnabled = false
//                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            newPass.get().isNullOrEmpty() -> {
                showDialog(view.context,view.context.getString(R.string.app_name),"Please enter new password")
//                binding?.newPassLayout?.error = "Please enter new password"
//                view.requestFocus(R.id.newPassEdt)
//                binding?.oldpassLayout?.isErrorEnabled = false
//                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            newPass.get()?.length!! < 6 -> {
                showDialog(view.context,view.context.getString(R.string.app_name),"Password must contain at least 6 characters")
//                binding?.newPassLayout?.error = "Password must contain at least 6 characters"
//                view.requestFocus(R.id.newPassEdt)
//                binding?.oldpassLayout?.isErrorEnabled = false
//                binding?.cnfpassLayout?.isErrorEnabled = false
                return false
            }
            cnfPass.get().isNullOrEmpty() -> {
                showDialog(view.context,view.context.getString(R.string.app_name),"Please enter confirm password")
                binding?.cnfpassLayout?.error = "Please enter confirm password"
//                view.requestFocus(R.id.cnfPassEdt)
//                binding?.oldpassLayout?.isErrorEnabled = false
//                binding?.newPassLayout?.isErrorEnabled = false
                return false
            }
            cnfPass.get() != newPass.get() -> {
                showDialog(view.context,view.context.getString(R.string.app_name),"Password do not match")
//                binding?.cnfpassLayout?.error = "Password do not match"
//                view.requestFocus(R.id.cnfPassEdt)
//                binding?.oldpassLayout?.isErrorEnabled = false
//                binding?.newPassLayout?.isErrorEnabled = false
                return false
            }
            else -> return true
        }
    }
}