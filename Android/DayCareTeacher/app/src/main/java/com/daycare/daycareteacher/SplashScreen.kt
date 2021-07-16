package com.daycare.daycareteacher

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.daycare.daycareteacher.databinding.ActivitySplashScreenBinding
import com.daycare.daycareteacher.ui.login.LoginActivity

class SplashScreen : AppCompatActivity() {

    lateinit var binding: ActivitySplashScreenBinding;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_splash_screen)
       // Fabric.with(this, Crashlytics())
        Handler().postDelayed({
            val intent: Intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }, 3000)
    }
}

