package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

open class BaseModel {

//    @SerializedName("code")
//    @Expose
//    var code: Int? = null
//    @SerializedName("status")
//    @Expose
//    var status: String? = null

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
    @SerializedName("returnStatus")
    @Expose
    var returnStatus: Boolean? = null
    @SerializedName("returnMessage")
    @Expose
    var returnMessage: List<Any>? = null
    @SerializedName("emailvaridation")
    @Expose
    var emailvaridation: Any? = null
    @SerializedName("deletedBy")
    @Expose
    var deletedBy: Int? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("updatedBy")
    @Expose
    var updatedBy: Int? = null
}