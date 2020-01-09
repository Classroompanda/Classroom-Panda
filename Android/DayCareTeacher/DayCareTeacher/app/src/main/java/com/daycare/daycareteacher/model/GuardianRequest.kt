package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class GuardianRequest {
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("classID")
    var classID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("isAuthorized")
    var isAuthorized: Boolean? = null
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    var deletedBy: Int? = null
    @SerializedName("deletedDate")
    var deletedDate: String? = null
    @SerializedName("createdBy")
    var createdBy: Int? = null
    @SerializedName("createdDate")
    var createdDate: String? = null
    @SerializedName("updatedDate")
    var updatedDate: String? = null
    @SerializedName("updatedBy")
    var updatedBy: Int? = null
}