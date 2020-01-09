package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class ClassLogData:BaseModel() {
   
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("teacherID")
     var teacherID: Int? = null
    @SerializedName("teacherDailyAttendenceID")
     var teacherDailyAttendenceID: Int? = null
    @SerializedName("classesID")
     var classesID: Int? = null
    @SerializedName("checkInTime")
     var checkInTime: String? = null
    @SerializedName("checkOutTime")
     var checkOutTime: String? = null
    @SerializedName("checkStatus")
     var checkStatus: Int? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("classStartTime")
     var classStartTime: String? = null
    @SerializedName("classEndTime")
     var classEndTime: String? = null
    @SerializedName("stringId")
     var stringId: Int? = null
    @SerializedName("classAssignmentLogID")
     var classAssignmentLogID: Int? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null
    @SerializedName("isDeleted")
     var isDeleted: Boolean? = null


}
