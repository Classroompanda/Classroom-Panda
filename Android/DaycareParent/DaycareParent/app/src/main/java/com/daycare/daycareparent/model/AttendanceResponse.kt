package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose



class AttendanceResponse : BaseModel() {

    @SerializedName("data")
    var data: List<AttendanceData>? = null
}