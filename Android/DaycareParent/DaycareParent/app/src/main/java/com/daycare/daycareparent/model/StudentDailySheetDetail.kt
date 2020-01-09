package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class StudentDailySheetDetail {
    @SerializedName("studentActivityID")
     var studentActivityID: Int? = null
    @SerializedName("activityTypeID")
     var activityTypeID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null

    @SerializedName("activityDescription")
    var activityDescription: String? = null
    @SerializedName("startTime")
    var startTime: String? = null
    @SerializedName("endTime")
    var endTime: String? = null



}
