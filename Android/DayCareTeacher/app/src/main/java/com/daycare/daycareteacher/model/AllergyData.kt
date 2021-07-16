package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class AllergyData {

    @SerializedName("classID")
    var classID: Int? = null

    @SerializedName("agencyID")
    var agencyID: Int? = null

    @SerializedName("teacherID")
    var teacherID: Int? = null

    @SerializedName("askingDate")
    var askingDate: String? = null

    @SerializedName("askedDateString")
    var askedDateString: String? = null

}