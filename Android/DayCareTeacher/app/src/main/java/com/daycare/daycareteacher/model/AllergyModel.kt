package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class AllergyModel {
    @SerializedName("totalPages") val totalPages : Int?=null
    @SerializedName("totalRows") val totalRows : Int?=null
    @SerializedName("pageSize") val pageSize : Int?=null
    @SerializedName("id") val id : Int?=null
    @SerializedName("isExist") val isExist : Boolean?=null
    @SerializedName("saveId") val saveId : Int?=null
    @SerializedName("statusCode") val statusCode : Int?=null
    @SerializedName("isSuccess") val isSuccess : Boolean?=null
    @SerializedName("message") val message : String?=null
    @SerializedName("data") val data : List<Allergy>?=null

    @SerializedName("filePath") val filePath : String?=null
    @SerializedName("fileName") val fileName : String?=null
    @SerializedName("totalInvoiceAmount") val totalInvoiceAmount : Int?=null
    @SerializedName("discountAmount") val discountAmount : Int?=null
    @SerializedName("totalPaidAmount") val totalPaidAmount : Int?=null
    @SerializedName("totalBalanceAmount") val totalBalanceAmount : Int?=null
    @SerializedName("lastDate") val lastDate : String?=null
    @SerializedName("calculatedFeeDate") val calculatedFeeDate : String?=null
    @SerializedName("paidFeeDate") val paidFeeDate : String?=null
    @SerializedName("enrollClassesId") val enrollClassesId : String?=null
    @SerializedName("transferwithcheckout") val transferwithcheckout : Boolean?=null
    @SerializedName("totalHours") val totalHours : String?=null
    @SerializedName("studentmealdetail") val studentmealdetail : String?=null
    @SerializedName("parentName") val parentName : String?=null
    @SerializedName("lastName") val lastName : String?=null
    @SerializedName("studentNames") val studentNames : String?=null
    @SerializedName("emailId") val emailId : String?=null
    @SerializedName("agencyId") val agencyId : Int?=null
    @SerializedName("returnStatus") val returnStatus : Boolean?=null
    @SerializedName("returnMessage") val returnMessage : List<String>?=null
    @SerializedName("emailValidation") val emailValidation : String?=null

    class Allergy {

        @SerializedName("studentAllergiesID") val studentAllergiesID : Int?=null
        @SerializedName("studentID") val studentID : Int?=null
        @SerializedName("studentName") val studentName : String?=null
        @SerializedName("allergyReactionTypeID") val allergyReactionTypeID : Int?=null
        @SerializedName("allergyReactionTypeName") val allergyReactionTypeName : String?=null
        @SerializedName("allergyNameID") val allergyNameID : Int?=null
        @SerializedName("allergyName") val allergyName : String?=null
        @SerializedName("agencyID") val agencyID : Int?=null
        @SerializedName("allergyComment") val allergyComment : String?=null
        @SerializedName("firstAllergyObservation") val firstAllergyObservation : String?=null
        @SerializedName("lastAllergyObservation") val lastAllergyObservation : String?=null
        @SerializedName("allergyTypeID") val allergyTypeID : Int?=null
        @SerializedName("allergyTypeName") val allergyTypeName : String?=null
        @SerializedName("treatment") val treatment : String?=null
        @SerializedName("id") val id : Int?=null
        @SerializedName("stringId") val stringId : Int?=null
        @SerializedName("isActive") val isActive : Boolean?=null
        @SerializedName("isDeleted") val isDeleted : Boolean?=null
        @SerializedName("deletedBy") val deletedBy : String?=null
        @SerializedName("deletedDate") val deletedDate : String?=null
        @SerializedName("createdBy") val createdBy : String?=null
        @SerializedName("createdDate") val createdDate : String?=null
        @SerializedName("updatedDate") val updatedDate : String?=null
        @SerializedName("updatedBy") val updatedBy : String?=null
        @SerializedName("deletedFromIP") val deletedFromIP : String?=null
        @SerializedName("createdFromIP") val createdFromIP : String?=null
        @SerializedName("updatedFromIP") val updatedFromIP : String?=null

    }


}