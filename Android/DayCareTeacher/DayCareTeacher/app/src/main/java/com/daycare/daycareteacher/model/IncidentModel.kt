package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class IncidentModel : BaseModel() {

    @SerializedName("data")
    var data: ArrayList<IncidentData>? = null
}