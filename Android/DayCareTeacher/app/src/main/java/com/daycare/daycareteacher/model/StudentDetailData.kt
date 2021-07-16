package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class StudentDetailData {

    @SerializedName("parentDateOfBirth")
    var parentDateOfBirth: String? = null

    @SerializedName("studentContactNumber")
    var studentContactNumber: String? = null

    @SerializedName("studentEmailID")
    var studentEmailID: String? = null

    @SerializedName("parentGenderName")
    var parentGenderName: String? = null

    @SerializedName("addressAsParent")
    var addressAsParent: String? = null

    @SerializedName("childsAddress")
    var childsAddress: String? = null

    @SerializedName("registeredDate")
    var registeredDate: String? = null

    @SerializedName("childStartDate")
    var childStartDate: String? = null

    @SerializedName("preferredHospital")
    var preferredHospital: String? = null

    @SerializedName("physicianName")
    var physicianName: String? = null

    @SerializedName("childsContactNumber")
    var childsContactNumber: Long? = null

    @SerializedName("physicianContactNumber")
    var physicianContactNumber: String? = null



    @SerializedName("studentId")
     var studentId: Int? = null
    @SerializedName("studentName")
     var studentName: String? = null
    @SerializedName("classId")
     var classId: Int? = null
    @SerializedName("classesId")
    var classesId: Int? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("parentID")
     var parentID: Int? = null
    @SerializedName("parentName")
     var parentName: String? = null


    @SerializedName("parentEmailAddress")
    var parentEmailAddress: String? = null

    @SerializedName("parentContactNumber")
    var parentContactNumber: String? = null

    @SerializedName("parentFirstName")
    var parentFirstName: String? = null

    @SerializedName("parentLastName")
    var parentLastName: String? = null

    @SerializedName("firstName")
     var firstName: String? = null
    @SerializedName("lastName")
     var lastName: String? = null
    @SerializedName("genderID")
     var genderID: Int? = null

    @SerializedName("genderName")
     var genderName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("address")
     var address: String? = null
    @SerializedName("countryId")
     var countryId: Int? = null
    @SerializedName("countryName")
     var countryName: String? = null
    @SerializedName("stateId")
     var stateId: Int? = null
    @SerializedName("stateName")
     var stateName: String? = null
    @SerializedName("cityId")
     var cityId: Int? = null
    @SerializedName("cityName")
     var cityName: String? = null
    @SerializedName("postalCode")
     var postalCode: String? = null
    @SerializedName("schoolName")
     var schoolName: String? = null
    @SerializedName("transportationID")
     var transportationID: Int? = null
    @SerializedName("transportationTypeName")
     var transportationTypeName: String? = null
    @SerializedName("dateOfBirth")
     var dateOfBirth: String? = null
    @SerializedName("feePaymentTypeID")
     var feePaymentTypeID: Int? = null
    @SerializedName("feePaymentTypeName")
     var feePaymentTypeName: Any? = null
    @SerializedName("insuranceCarrier")
     var insuranceCarrier: String? = null
    @SerializedName("insurancePolicyNumber")
     var insurancePolicyNumber: String? = null
    @SerializedName("guardians")
     var guardians: List<GuardianData>? = null
    @SerializedName("studentImmunizations")
     var studentImmunizations: List<StudentImmunizationData>? = null
    @SerializedName("studentAllergies")
     var studentAllergies: List<StudentAllergy>? = null
    @SerializedName("studentMedications")
     var studentMedications: List<StudentMedication>? = null
    @SerializedName("studentDisabilities")
     var studentDisabilities: List<StudentDisabilityData>? = null
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
