package com.daycare.daycareparent

import android.content.Intent
import android.databinding.DataBindingUtil
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.crashlytics.android.Crashlytics
import com.daycare.daycareparent.databinding.ActivitySplashScreenBinding
import com.daycare.daycareparent.ui.login.LoginActivity
import com.daycare.daycareparent.utill.PreferenceConnector
import io.fabric.sdk.android.Fabric

class SplashScreen : AppCompatActivity() {

    lateinit var binding: ActivitySplashScreenBinding;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_splash_screen)
        Fabric.with(this, Crashlytics())
        Handler().postDelayed({
            val intent: Intent
            val isLoggin = PreferenceConnector.readBoolean(this, PreferenceConnector.isRemember, false)

//            if (isLoggin) {
////                intent = Intent(this, Dashboard::class.java)
//            } else {
                intent  = Intent(this, LoginActivity::class.java)
//            }
            startActivity(intent)
            finish()
        }, 3000)
    }
}

