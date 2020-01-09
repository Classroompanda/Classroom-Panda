package com.daycare.daycareparent.ui.dashboard.addchild

import android.arch.lifecycle.MutableLiveData
import android.arch.lifecycle.ViewModel
import android.content.Intent
import android.util.Log
import android.view.View
import com.daycare.daycareparent.model.AllParentChilds
import com.daycare.daycareparent.model.StudentData
import com.daycare.daycareparent.repository.*
import com.daycare.daycareparent.ui.dashboard.addchildform.AddFormActivity
import com.daycare.daycareparent.utill.PreferenceConnector

class AddChildViewModel : ViewModel() {

    var isLoading = MutableLiveData<Boolean>()
    var apiResponse = MutableLiveData<Any>()

    fun onClickAddChild(view: View) {
        view.context.startActivity(Intent(view.context, AddFormActivity::class.java))
    }

    fun onclickFab(view: View) {
        view.context.startActivity(Intent(view.context, AddFormActivity::class.java))
    }
}