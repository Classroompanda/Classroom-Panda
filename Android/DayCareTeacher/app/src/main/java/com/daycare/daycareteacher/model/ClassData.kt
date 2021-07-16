package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class ClassData {

    @SerializedName("classesID")
     var classesID: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("categoryId")
     var categoryId: Int? = null
    @SerializedName("classStatusId")
     var classStatusId: Int? = null
    @SerializedName("enrollCapacity")
     var enrollCapacity: Int? = null
    @SerializedName("minAgeFrom")
     var minAgeFrom: Int? = null
    @SerializedName("minAgeTo")
     var minAgeTo: Int? = null
    @SerializedName("maxAgeFrom")
     var maxAgeFrom: Int? = null
    @SerializedName("maxAgeTo")
     var maxAgeTo: Int? = null
    @SerializedName("ageCutOffDate")
     var ageCutOffDate: String? = null
    @SerializedName("registrationStartDate")
     var registrationStartDate: String? = null
    @SerializedName("classStartDate")
     var classStartDate: String? = null
    @SerializedName("classEndDate")
     var classEndDate: String? = null
    @SerializedName("startTime")
     var startTime: String? = null
    @SerializedName("endTime")
     var endTime: String? = null
    @SerializedName("description")
     var description: String? = null
    @SerializedName("mon")
     var mon: Boolean? = null
    @SerializedName("tue")
     var tue: Boolean? = null
    @SerializedName("wed")
     var wed: Boolean? = null
    @SerializedName("thu")
     var thu: Boolean? = null
    @SerializedName("fri")
     var fri: Boolean? = null
    @SerializedName("sat")
     var sat: Boolean? = null
    @SerializedName("sun")
     var sun: Boolean? = null
    @SerializedName("onGoing")
     var onGoing: Boolean? = null
    @SerializedName("fees")
     var fees: Int? = null
    @SerializedName("feeTypeId")
     var feeTypeId: Int? = null
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
