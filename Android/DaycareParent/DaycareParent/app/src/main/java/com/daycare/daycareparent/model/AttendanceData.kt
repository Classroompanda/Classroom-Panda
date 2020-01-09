package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose



class AttendanceData {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("studentName")
     var studentName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("classesID")
     var classesID: Int? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("checkin")
     var checkin: String? = null
    @SerializedName("checkout")
     var checkout: String? = null
    @SerializedName("attendenceStatusID")
     var attendenceStatusID: Int? = null
    @SerializedName("attendenceStatusName")
     var attendenceStatusName: String? = null
    @SerializedName("vedioFolder")
     var vedioFolder: String? = null
    @SerializedName("imagefolder")
     var imagefolder: String? = null
    @SerializedName("attendanceDate")
    var attendanceDate: String? = null
    @SerializedName("dropedById")
    var dropedById: Int? = null


    @SerializedName("dropedByName")
    @Expose
   var dropedByName: String? = null

    @SerializedName("dropedByOtherId")
     var dropedByOtherId: Int? = null
    @SerializedName("pickupById")
    var pickupById: Int? = null

    @SerializedName("pickupByName")
    @Expose
   var pickupByName: String? = null

    @SerializedName("pickupByOtherId")
     var pickupByOtherId: Int? = null
    @SerializedName("approvedDropedById")
     var approvedDropedById: Int? = null
    @SerializedName("approvedPickupById")
     var approvedPickupById: Int? = null
    @SerializedName("dropedByOtherNames")
     var dropedByOtherNames: String? = null
    @SerializedName("pickupByOtherName")
     var pickupByOtherName: String? = null
    @SerializedName("checkInTime")
     var checkInTime: String? = null
    @SerializedName("checkOutTime")
     var checkOutTime: String? = null
    @SerializedName("onLeave")
     var onLeave: Boolean? = null
    @SerializedName("onLeaveComment")
    var onLeaveComment: String? = null
    @SerializedName("disableOnLeave")
     var disableOnLeave: String? = null
    @SerializedName("reasonId")
    var reasonId: Int? = null
    @SerializedName("isEditModeOn")
     var isEditModeOn: Boolean? = null
    @SerializedName("stringId")
     var stringId: Int? = null
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

    //    EXTRA
    var classID: Int? = null
    var askedDate: String? = null
    var agencyId: Int? = null
    var parentID: Int? = null



}
