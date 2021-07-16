package com.daycare.daycareteacher.ui.messagebroadcast

import androidx.databinding.DataBindingUtil
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityMessageBroadcastBinding
import kotlinx.android.synthetic.main.toolbar.view.*

class MessageBroadcastActivity : AppCompatActivity() {

    lateinit var binding: ActivityMessageBroadcastBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_message_broadcast)
        binding=DataBindingUtil.setContentView(this,R.layout.activity_message_broadcast)
        binding.actionBar.toolbar.navigationIcon=resources.getDrawable(R.drawable.ic_arrow_back_24dp)
        binding.actionBar.toolbar.setNavigationOnClickListener { finish() }

    }

}
