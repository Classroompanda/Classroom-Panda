package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class MyBreakData {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("breakIn")
     var breakIn: String? = null
    @SerializedName("breakOut")
     var breakOut: String? = null
    @SerializedName("teacherDailyAttendenceID")
     var teacherDailyAttendenceID: Int? = null
    @SerializedName("breakTypesID")
     var breakTypesID: Int? = null
    @SerializedName("breakTypesName")
     var breakTypesName: Any? = null
    @SerializedName("breakStatusID")
     var breakStatusID: Int? = null
    @SerializedName("stringId")
     var stringId: Int? = null
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
    @SerializedName("createdBy")
     var createdBy: Any? = null
    @SerializedName("createdDate")
     var createdDate: Any? = null
    @SerializedName("updatedDate")
     var updatedDate: Any? = null
    @SerializedName("updatedBy")
     var updatedBy: Any? = null
}
