package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class IncidentModel : BaseModel() {

    @SerializedName("data")
    val data: ArrayList<IncidentData>? = null
}