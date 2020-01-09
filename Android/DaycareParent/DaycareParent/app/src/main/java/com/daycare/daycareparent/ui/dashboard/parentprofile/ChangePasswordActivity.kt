package com.daycare.daycareparent.ui.dashboard.parentprofile

import android.arch.lifecycle.Observer
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import android.view.View
import com.daycare.daycareparent.R
import com.daycare.daycareparent.databinding.ActivityChangePasswordBinding
import com.daycare.daycareparent.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class ChangePasswordActivity : AppCompatActivity() {

    lateinit var binding: ActivityChangePasswordBinding
    lateinit var viewModel: ChangePasswordViewModel
    private lateinit var toolbar: Toolbar
    private var loader = Loader()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_change_password)
        viewModel = ChangePasswordViewModel()
        binding.viewModel = viewModel
        setUpToolBar()
        attachObserver()
    }

    private fun setUpToolBar() {
        toolbar = binding.include.toolbar
        toolbar.headerTxt.text = "Change Password"
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener {
            finish()

        }
    }

    fun attachObserver() {
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
