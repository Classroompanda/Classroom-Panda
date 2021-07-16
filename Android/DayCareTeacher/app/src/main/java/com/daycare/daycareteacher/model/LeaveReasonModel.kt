package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class LeaveReasonModel:BaseModel() {
    @SerializedName("data")
     val data: List<LeaveReasonData>? = null
}