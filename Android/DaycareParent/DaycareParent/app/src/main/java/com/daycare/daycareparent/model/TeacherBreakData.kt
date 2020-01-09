package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class TeacherBreakData {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("breakIn")
     var breakIn: String? = null
    @SerializedName("breakOut")
     var breakOut: String? = null
    @SerializedName("breakStatusID")
     var breakStatusID: Int? = null
    @SerializedName("teacherDailyAttendenceID")
     var teacherDailyAttendenceID: Int? = null
    @SerializedName("breakTypesID")
     var breakTypesID: Int? = null
    @SerializedName("breakReason")
     var breakReason: String? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null
    @SerializedName("isDeleted")
     var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
     var deletedBy: Any? = null
    @SerializedName("deletedDate")
     var deletedDate: Any? = null
    @SerializedName("deletedFromIP")
     var deletedFromIP: Any? = null
    @SerializedName("createdBy")
     var createdBy: Int? = null
}
