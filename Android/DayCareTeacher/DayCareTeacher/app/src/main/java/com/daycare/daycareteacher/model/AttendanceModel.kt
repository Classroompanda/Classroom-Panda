package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class AttendanceModel : BaseModel() {
    @SerializedName("data")
    val data: List<AttendanceData>? = null

}
