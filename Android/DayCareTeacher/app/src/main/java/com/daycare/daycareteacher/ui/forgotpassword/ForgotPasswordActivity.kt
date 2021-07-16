package com.daycare.daycareteacher.ui.forgotpassword

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityForgotPasswordBinding

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
               // if (AppInstance.forgotPasswordResponse?.statusCode == ResponseCodes.Success) {
                    binding.edtEmail.setText("")
                    binding.edtEmail.setHint(R.string.hint_email)
                   /* finish()
                    overridePendingTransition(R.anim.slide_from_left, R.anim.slide_to_right)
*/
               // }
            }
        })
    }
}
