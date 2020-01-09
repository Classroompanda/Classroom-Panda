package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class DailySheetStudentData {
    @SerializedName("studentName")
     var studentName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("activityTypeName")
     var activityTypeName: Any? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("totalActivityCount")
     var totalActivityCount: Int? = null
    @SerializedName("activityDetail")
     var activityDetail: ArrayList<StudentDailySheetDetail>? = null

    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("classesID")
     var classesID: Int? = null
    @SerializedName("activityTypeID")
     var activityTypeID: Int? = null
    @SerializedName("activityRegisterDate")
     var activityRegisterDate: String? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null

}
