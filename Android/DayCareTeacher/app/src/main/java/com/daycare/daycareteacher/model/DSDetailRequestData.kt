package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class DSDetailRequestData {

    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentAcitivityId")
    var studentAcitivityId: Int? = null
}