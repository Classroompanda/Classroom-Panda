package com.daycare.daycareteacher.ui.profile

import androidx.lifecycle.Observer
import androidx.databinding.DataBindingUtil
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityChangePasswordBinding
import com.daycare.daycareteacher.utill.Loader
import kotlinx.android.synthetic.main.toolbar.view.*

class ChangePasswordActivity : AppCompatActivity() {

    lateinit var binding: ActivityChangePasswordBinding
    lateinit var viewModel: ChangePasswordViewModel
    private lateinit var toolbar: Toolbar
    var loader = Loader()

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
        toolbar.headerTxt.text = getString(R.string.change_password)
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }
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
