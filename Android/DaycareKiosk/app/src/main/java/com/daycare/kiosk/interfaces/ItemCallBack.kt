package com.daycare.kiosk.interfaces

import android.view.View
import com.daycare.kiosk.model.Data
import com.daycare.kiosk.model.StudentListResponse

interface ItemCallBack {

    fun onPickNDropClick(view: View,data: StudentListResponse.Datum,pos:Int)
    fun onBreakClick(view: View,data:StudentListResponse.Datum,pos:Int)
}