package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class AttendanceRequest {

    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("studentName")
    val studentName: String? = null
    @SerializedName("imagePath")
    val imagePath: String? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("className")
    var className: String? = null
    @SerializedName("checkin")
    val checkin: String? = null
    @SerializedName("checkout")
    val checkout: String? = null
    @SerializedName("attendenceStatusID")
    var attendenceStatusID: Int? = null
    @SerializedName("attendenceStatusName")
    val attendenceStatusName: String? = null
    @SerializedName("vedioFolder")
    val vedioFolder: String? = null
    @SerializedName("imagefolder")
    val imagefolder: String? = null
    @SerializedName("attendanceDate")
    var attendanceDate: String? = null
    @SerializedName("dropedById")
    var dropedById: Int? = null
    @SerializedName("dropedByOtherId")
    val dropedByOtherId: Int? = null
    @SerializedName("pickupById")
    var pickupById: Int? = null
    @SerializedName("pickupByOtherId")
    val pickupByOtherId: Int? = null
    @SerializedName("approvedDropedById")
    val approvedDropedById: Int? = null
    @SerializedName("approvedPickupById")
    val approvedPickupById: Int? = null
    @SerializedName("dropedByOtherNames")
    val dropedByOtherNames: String? = null
    @SerializedName("pickupByOtherName")
    val pickupByOtherName: String? = null
    @SerializedName("checkInTime")
    var checkInTime: String? = null
    @SerializedName("checkOutTime")
    var checkOutTime: String? = null
    @SerializedName("onLeave")
    var onLeave: Boolean? = null
    @SerializedName("onLeaveComment")
    var onLeaveComment: String? = null
    @SerializedName("disableOnLeave")
    val disableOnLeave: String? = null
    @SerializedName("reasonId")
    var reasonId: Int? = null
    @SerializedName("isEditModeOn")
    var isEditModeOn: Boolean? = null
    @SerializedName("stringId")
    val stringId: Int? = null
    @SerializedName("isActive")
    val isActive: Boolean? = null
    @SerializedName("isDeleted")
    val isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    val deletedBy: Int? = null
    @SerializedName("deletedDate")
    val deletedDate: String? = null
    @SerializedName("createdBy")
    val createdBy: Int? = null
    @SerializedName("createdDate")
    val createdDate: String? = null
    @SerializedName("updatedDate")
    val updatedDate: String? = null
    @SerializedName("updatedBy")
    val updatedBy: Int? = null


    @SerializedName("Date")
    val date: String? = null
    var classID: Int? = null

}