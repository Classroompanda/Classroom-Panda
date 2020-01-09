package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class EnrollmentData {

    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null

    @SerializedName("classesID")
    var classesID: Int? = null

    @SerializedName("className")
    var className: String? = null
    @SerializedName("studentID")
    var studentID: Int? = null

    @SerializedName("studentName")
    var studentName: String? = null

    @SerializedName("classEnrollStartDate")
    var classEnrollStartDate: String? = null

    @SerializedName("classEnrollEndDate")
    var classEnrollEndDate: String? = null

    @SerializedName("enrollmentStatus")
    var enrollmentStatus: Int? = null

    @SerializedName("stringId")
    var stringId: Int? = null

    @SerializedName("isActive")
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    var isDeleted: Boolean? = null









    


}
