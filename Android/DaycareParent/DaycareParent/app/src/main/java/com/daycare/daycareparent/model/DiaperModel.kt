package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class DiaperModel {
    @SerializedName("totalPages")
    var totalPages: Int? = null
    @SerializedName("totalRows")
    var totalRows: Int? = null
    @SerializedName("pageSize")
    var pageSize: Int? = null
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("isExist")
    var isExist: Boolean? = null
    @SerializedName("saveId")
    var saveId: Int? = null
    @SerializedName("statusCode")
    var statusCode: Int? = null
    @SerializedName("isSuccess")
    var isSuccess: Boolean? = null
    @SerializedName("message")
    var message: String? = null
    @SerializedName("data")
    var data: Data? = null

    inner class Data {

        @SerializedName("id")
        var id: Int? = null
        @SerializedName("agencyID")
        var agencyID: Int? = null
        @SerializedName("studentActivitiesID")
        var studentActivitiesID: Int? = null
        @SerializedName("diaperChangeTime")
        var diaperChangeTime: String? = null
        @SerializedName("studentActivityDiaperNote")
        var studentActivityDiaperNote: String? = null
        @SerializedName("activityTypeID")
        var activityTypeID: Int? = null
        @SerializedName("stringId")
        var stringId: Int? = null
        @SerializedName("studentID")
        var studentID: Int? = null
        @SerializedName("isActive")
        var isActive: Boolean? = null
        @SerializedName("isDeleted")
        var isDeleted: Boolean? = null
        @SerializedName("deletedBy")
        var deletedBy: Int? = null
    }
}
