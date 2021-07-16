package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class OperationalClassRequestData {

    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("teacherID")
    var teacherID: Int? = null
    @SerializedName("askedDateString")
     var askedDateString: String? = null
    @SerializedName("askingDate")
     var askingDate: String? = null
    @SerializedName("teacherDailyAttendenceID")
     var teacherDailyAttendenceID: Int? = null

}
