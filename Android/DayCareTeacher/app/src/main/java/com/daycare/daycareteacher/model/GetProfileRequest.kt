package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class GetProfileRequest{
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("teacherID")
    var teacherID: Int? = null
}
