package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class GuardianModel : BaseModel() {
    @SerializedName("data")
    val data: List<GuardianData>? = null
}