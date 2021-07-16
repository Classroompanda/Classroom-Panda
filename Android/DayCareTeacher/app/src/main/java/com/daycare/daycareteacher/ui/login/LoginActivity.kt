package com.daycare.daycareteacher.ui.login

import android.Manifest
import android.annotation.TargetApi
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityLoginBinding
import com.daycare.daycareteacher.model.LoginResponse
import com.daycare.daycareteacher.ui.dashboard.activities.DashboardActivity
import com.daycare.daycareteacher.utill.Loader
import com.daycare.daycareteacher.utill.PreferenceConnector
import com.google.android.material.snackbar.Snackbar

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var loginViewModel: LoginViewModel
    var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_login)
        loginViewModel = LoginViewModel()
        binding.viewModel = loginViewModel

        PreferenceConnector.clearSharePreferenceKey(this, PreferenceConnector.USER_INFO)
        PreferenceConnector.clearSharePreferenceKey(this, PreferenceConnector.TEACHER_CHECKIN)

        attachObserver()
        bindTextChangeListener(binding)
    }

    private fun attachObserver() {
        loginViewModel.isClickedForgotPassword.observe(this, Observer<Boolean> { it ->
            it?.let {
                overridePendingTransition(R.anim.slide_from_right, R.anim.slide_to_left)
            }
        })

        loginViewModel.loginApiResponse.observe(this, Observer<Any> { it ->
            it?.let {
                if (it is LoginResponse) {
                    PreferenceConnector.writeBoolean(this, PreferenceConnector.isRemember, true)
                    val intent = Intent(this, DashboardActivity::class.java)
                    startActivity(intent)
                    finish()
                }
            }
        })

        loginViewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })

    }

    private fun bindTextChangeListener(binding: ActivityLoginBinding?) {
        binding?.edtPhoneNo?.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {

            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                if (binding.viewModel!!.phoneNo.get()?.length == 3 || binding.viewModel!!.phoneNo.get()?.length == 6) {

                }
            }
        })
    }

    private val REQUEST_PERMISSIONS_REQUEST_CODE = 34
    private fun checkAndRequestPermissions(): Boolean {

        val storagePermission = ContextCompat.checkSelfPermission(
            this,
            android.Manifest.permission.WRITE_EXTERNAL_STORAGE
        )

        val cameraPermission = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.CAMERA
        )

        val listPermissionsNeeded = ArrayList<String>()

        if (storagePermission != PackageManager.PERMISSION_GRANTED) {
            listPermissionsNeeded.add(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
        }

        if (cameraPermission != PackageManager.PERMISSION_GRANTED) {
            listPermissionsNeeded.add(Manifest.permission.CAMERA)
        }


        if (!listPermissionsNeeded.isEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                listPermissionsNeeded.toTypedArray(),
                REQUEST_PERMISSIONS_REQUEST_CODE
            )
            return false
        }
        return true
    }


    @TargetApi(Build.VERSION_CODES.M)
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        when (requestCode) {
            REQUEST_PERMISSIONS_REQUEST_CODE -> {

                val neverAskagainList = ArrayList<String>()

                if (grantResults.isNotEmpty()) {
                    for (i in grantResults.indices) {
                        if (grantResults[i] == PackageManager.PERMISSION_DENIED) {
                            if (!shouldShowRequestPermissionRationale(permissions[i])) {
                                if (permissions[i].equals(
                                        android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                                        ignoreCase = true
                                    )
                                ) {

                                    neverAskagainList.add("Storage")
                                } else if (permissions[i].equals(Manifest.permission.CAMERA, ignoreCase = true)) {
                                    neverAskagainList.add("Camera")
                                }

                            }
                        }
                    }

                    if (neverAskagainList.size > 0) {
                        val snackBarString = StringBuilder()
                        for (perm in neverAskagainList) {
                            if (snackBarString.isNotEmpty()) {
                                snackBarString.append(", $perm")
                            } else {
                                snackBarString.append(perm)
                            }
                        }

                        Snackbar.make(
                            binding.cardView,
                            snackBarString.toString() + getString(R.string.access_denied_please_enable_from_settings),
                            Snackbar.LENGTH_SHORT
                        ).show()
                    } else {
                        checkAndRequestPermissions()
                    }
                }
            }
            else -> super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        }
    }
}
