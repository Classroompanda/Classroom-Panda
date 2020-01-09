package com.daycare.daycareparent.ui.forgotpassword

import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityForgotPasswordBinding
import com.daycare.daycareparent.repository.ResponseCodes
import com.daycare.daycareparent.utill.AppInstance

class ForgotPasswordActivity : AppCompatActivity() {

    lateinit var binding: ActivityForgotPasswordBinding
    lateinit var forgotPasswordViewModel:ForgotPasswordViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_forgot_password)
        binding=DataBindingUtil.setContentView(this,R.layout.activity_forgot_password)
        forgotPasswordViewModel= ForgotPasswordViewModel()
        binding.viewModel=forgotPasswordViewModel
        attachObserver()

    }

    private fun attachObserver() {
        forgotPasswordViewModel.isBackClicked.observe(this, Observer<Boolean> { it ->
            it?.let {
                finish()
                overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
            }
        })

        forgotPasswordViewModel.forgotApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (AppInstance.forgotPasswordResponse?.statusCode == ResponseCodes.Success) {
                    binding.edtEmail.setText("")
                    binding.edtEmail.setHint(R.string.hint_email)
                   /* finish()
                    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
*/
                }
            }
        })
    }
}
