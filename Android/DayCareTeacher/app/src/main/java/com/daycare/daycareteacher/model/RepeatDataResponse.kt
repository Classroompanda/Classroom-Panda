package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class RepeatDataResponse {
    @SerializedName("totalPages")
    val totalPages: Int? = null
    @SerializedName("totalRows")
    val totalRows: Int? = null
    @SerializedName("pageSize")
    val pageSize: Int? = null
    @SerializedName("id")
    val id: Int? = null
    @SerializedName("isExist")
    val isExist: Boolean? = null
    @SerializedName("saveId")
    val saveId: Int? = null
    @SerializedName("statusCode")
    val statusCode: Int? = null
    @SerializedName("isSuccess")
    val isSuccess: Boolean? = null
    @SerializedName("message")
    val message: String? = null
    @SerializedName("data")
    val data: List<Datum>? = null


    inner class Datum {

        @SerializedName("value")
        val value: Int? = null
        @SerializedName("label")
        val label: String? = null
        @SerializedName("isActive")
        val isActive: Boolean? = null
        @SerializedName("isDeleted")
        val isDeleted: Boolean? = null
        @SerializedName("deletedBy")
        val deletedBy: Any? = null
        @SerializedName("deletedDate")
        val deletedDate: Any? = null
        @SerializedName("createdBy")
        val createdBy: Any? = null
        @SerializedName("createdDate")
        val createdDate: Any? = null
        @SerializedName("updatedDate")
        val updatedDate: Any? = null
        @SerializedName("updatedBy")
        val updatedBy: Any? = null
    }
}




