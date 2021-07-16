package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class GuardianModel : BaseModel() {
    @SerializedName("data")
    val data: List<GuardianData>? = null
}