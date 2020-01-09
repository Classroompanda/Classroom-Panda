package com.daycare.kiosk.ui.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextWatcher
import androidx.core.widget.doOnTextChanged
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.daycare.kiosk.R
import com.daycare.kiosk.databinding.ActivityLoginBinding
import com.daycare.kiosk.utill.hideVirtualKeyboard
import com.daycare.kiosk.utill.Loader
import androidx.databinding.adapters.TextViewBindingAdapter.setText
import android.text.Editable
import com.daycare.kiosk.utill.showDialog


class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: LoginViewModel
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_login)
        viewModel = LoginViewModel()
        binding.viewModel = viewModel

        attachObserver()
        hideVirtualKeyboard(this)

        binding.pinInput.addTextChangedListener(object : TextWatcher {

            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(
                s: CharSequence, start: Int,
                count: Int, after: Int
            ) {
            }

            override fun onTextChanged(
                s: CharSequence, start: Int,
                before: Int, count: Int
            ) {
                if(s.length==4){
                    viewModel.loginTextChange(binding.pinInput.context,s)
                   // showDialog(this@LoginActivity, "Alert", "Kindly check the credential."+count)
                }
               // field2.setText("")
            }
        });

    }

    override fun onResume() {
        super.onResume()
        binding.pinInput.setText("")
    }
    private fun attachObserver() {
       /* loginViewModel.isClickedForgotPassword.observe(this, Observer<Boolean> { it ->
            it?.let {
                overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left)
            }
        })
        loginViewModel.isLoggedIn.observe(this, Observer<Boolean> { it ->
            it?.let {
                // finish()
                if(it) {
                    val intent = Intent(this, DashboardActivity::class.java)
                    startActivity(intent)
                    finish()
                }else{
                    showDialog(this, "Alert", "Kindly check the credential.")
                }

            }
        })


        loginViewModel.loginApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (AppInstance.loginResponse?.statusCode == ResponseCodes.Success) {

                }
            }
        })
*/
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }
}
