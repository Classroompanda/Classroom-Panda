package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class TeacherData {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("teacherName")
     var teacherName: String? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("userID")
     var userID: Int? = null
    @SerializedName("createdFromIP")
    var createdFromIP: String?=null

    @SerializedName("firstName")
     var firstName: String? = null
    @SerializedName("lastName")
     var lastName: String? = null
    @SerializedName("genderID")
     var genderID: Int? = null
    @SerializedName("dateOfBirth")
     var dateOfBirth: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("positionTypeID")
     var positionTypeID: Int? = null
    @SerializedName("teacherStatusID")
     var teacherStatusID: Int? = null
    @SerializedName("dateHired")
     var dateHired: String? = null
    @SerializedName("email")
     var email: String? = null
    @SerializedName("address")
     var address: String? = null
    @SerializedName("countryId")
     var countryId: Int? = null
    @SerializedName("stateId")
     var stateId: Int? = null
    @SerializedName("cityId")
     var cityId: Int? = null
    @SerializedName("certification")
     var certification: String? = null
    @SerializedName("postalCode")
     var postalCode: String? = null
    @SerializedName("phoneNumber")
     var phoneNumber: String? = null
    @SerializedName("homePhone")
     var homePhone: String? = null

    @SerializedName("mPhoneNumber")
    var mPhoneNumber: String? = null
    @SerializedName("mHomePhone")
    var mHomePhone: String? = null


    @SerializedName("grossPayPerHour")
     var grossPayPerHour: Int? = null
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

    @SerializedName("updatedFromIP")
    var updatedFromIP :Int?=null
    @SerializedName("deletedFromIP")
    var deletedFromIP:String?=null
}