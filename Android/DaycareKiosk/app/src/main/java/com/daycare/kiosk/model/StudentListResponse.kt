package com.daycare.kiosk.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class StudentListResponse {
    @SerializedName("totalPages")
    @Expose
    var totalPages: Int? = null
    @SerializedName("totalRows")
    @Expose
    var totalRows: Int? = null
    @SerializedName("pageSize")
    @Expose
    var pageSize: Int? = null
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("isExist")
    @Expose
    var isExist: Boolean? = null
    @SerializedName("saveId")
    @Expose
    var saveId: Int? = null
    @SerializedName("statusCode")
    @Expose
    var statusCode: Int? = null
    @SerializedName("isSuccess")
    @Expose
    var isSuccess: Boolean? = null
    @SerializedName("message")
    @Expose
    var message: String? = null
    var agencyID: Int? = null
    var parentID: Int? = null
    var isAuthPerson :Boolean? = null
    var quickPin :String? = null


    @SerializedName("data")
    @Expose
    var data: List<Datum>? = null

    inner class Datum {

        @SerializedName("studentId")
        @Expose
        var studentId: Int? = null
        @SerializedName("studentName")
        @Expose
        var studentName: String? = null
        @SerializedName("classId")
        @Expose
        var classId: Int? = null
        @SerializedName("className")
        @Expose
        var className: String? = null
        @SerializedName("agencyID")
        @Expose
        var agencyID: Int? = null
        @SerializedName("parentID")
        @Expose
        var parentID: Int? = null
        @SerializedName("parentName")
        @Expose
        var parentName: String? = null
        @SerializedName("parentEmailAddress")
        @Expose
        var parentEmailAddress: Any? = null
        @SerializedName("parentContactNumber")
        @Expose
        var parentContactNumber: Int? = null
        @SerializedName("firstName")
        @Expose
        var firstName: String? = null
        @SerializedName("lastName")
        @Expose
        var lastName: String? = null
        @SerializedName("genderID")
        @Expose
        var genderID: Int? = null
        @SerializedName("genderName")
        @Expose
        var genderName: String? = null
        @SerializedName("imagePath")
        @Expose
        var imagePath: String? = null
        @SerializedName("address")
        @Expose
        var address: String? = null
        @SerializedName("countryId")
        @Expose
        var countryId: Int? = null
        @SerializedName("countryName")
        @Expose
        var countryName: String? = null
        @SerializedName("stateId")
        @Expose
        var stateId: Int? = null
        @SerializedName("stateName")
        @Expose
        var stateName: String? = null
        @SerializedName("cityId")
        @Expose
        var cityId: Int? = null
        @SerializedName("cityName")
        @Expose
        var cityName: String? = null
        @SerializedName("postalCode")
        @Expose
        var postalCode: String? = null
        @SerializedName("schoolName")
        @Expose
        var schoolName: String? = null
        @SerializedName("transportationID")
        @Expose
        var transportationID: Int? = null
        @SerializedName("transportationTypeName")
        @Expose
        var transportationTypeName: String? = null
        @SerializedName("dateOfBirth")
        @Expose
        var dateOfBirth: String? = null
        @SerializedName("feePaymentTypeID")
        @Expose
        var feePaymentTypeID: Int? = null
        @SerializedName("feePaymentTypeName")
        @Expose
        var feePaymentTypeName: String? = null
        @SerializedName("insuranceCarrier")
        @Expose
        var insuranceCarrier: String? = null
        @SerializedName("insurancePolicyNumber")
        @Expose
        var insurancePolicyNumber: String? = null
        @SerializedName("registeredDate")
        @Expose
        var registeredDate: String? = null
        @SerializedName("childsAddress")
        @Expose
        var childsAddress: Any? = null
        @SerializedName("physicianName")
        @Expose
        var physicianName: Any? = null
        @SerializedName("preferredHospital")
        @Expose
        var preferredHospital: Any? = null
        @SerializedName("childsContactNumber")
        @Expose
        var childsContactNumber: Int? = null
        @SerializedName("guardians")
        @Expose
        var guardians: Any? = null
        @SerializedName("studentImmunizations")
        @Expose
        var studentImmunizations: Any? = null
        @SerializedName("studentAllergies")
        @Expose
        var studentAllergies: Any? = null
        @SerializedName("studentMedications")
        @Expose
        var studentMedications: Any? = null
        @SerializedName("studentDisabilities")
        @Expose
        var studentDisabilities: Any? = null
        @SerializedName("enrolledClassesInformation")
        @Expose
        var enrolledClassesInformation: Any? = null
        @SerializedName("id")
        @Expose
        var id: Int? = null
        @SerializedName("stringId")
        @Expose
        var stringId: Int? = null
        @SerializedName("enrolledStatus")
        @Expose
        var enrolledStatus: Int? = null
        @SerializedName("isActive")
        @Expose
        var isActive: Boolean? = null
        @SerializedName("isDeleted")
        @Expose
        var isDeleted: Boolean? = null
        @SerializedName("deletedBy")
        @Expose
        var deletedBy: Int? = null
        @SerializedName("deletedDate")
        @Expose
        var deletedDate: String? = null
        @SerializedName("createdBy")
        @Expose
        var createdBy: Int? = null
        @SerializedName("createdDate")
        @Expose
        var createdDate: String? = null
        @SerializedName("updatedDate")
        @Expose
        var updatedDate: String? = null
        @SerializedName("updatedBy")
        @Expose
        var updatedBy: Int? = null
        @SerializedName("deletedFromIP")
        @Expose
        var deletedFromIP: Any? = null
        @SerializedName("createdFromIP")
        @Expose
        var createdFromIP: Any? = null
        @SerializedName("updatedFromIP")
        @Expose
        var updatedFromIP: Any? = null


        @SerializedName("currentCheckInStatus")
        @Expose
        var currentCheckInStatus: Boolean? = null
        @SerializedName("currentCheckOutStatus")
        @Expose
        var currentCheckOutStatus: Boolean? = null
        @SerializedName("currentBreakInStatus")
        @Expose
        var currentBreakInStatus: Boolean? = null

        @SerializedName("currentBreakOutStatus")
        @Expose
        var currentBreakOutStatus: Boolean? = null

        @SerializedName("currentStatus")
        @Expose
        var currentStatus: Int? = null

        @SerializedName("isSubsidy")
        @Expose
        var isSubsidy:Boolean = false

    }
}
