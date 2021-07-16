package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class DailySheetRequest {

    @SerializedName("askedDate")
    var askedDate: String? = null

    @SerializedName("askedDateString")
    var askedDateString: String? = null

    @SerializedName("StudentName")
    var StudentName: String? = null

    @SerializedName("agencyID")
    var agencyID: Int? = null

    @SerializedName("studentActivitiesId")
    var studentActivitiesId: Int? = null

    @SerializedName("studentID")
    var studentID: Int? = null


}