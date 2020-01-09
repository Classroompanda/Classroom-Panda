package com.daycare.daycareparent.model

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
    val totalPages: Int? = null
    @SerializedName("totalRows")
    @Expose
    val totalRows: Int? = null
    @SerializedName("pageSize")
    @Expose
    val pageSize: Int? = null
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("isExist")
    @Expose
    val isExist: Boolean? = null
    @SerializedName("saveId")
    @Expose
    val saveId: Int? = null
    @SerializedName("statusCode")
    @Expose
    val statusCode: Int? = null
    @SerializedName("isSuccess")
    @Expose
    val isSuccess: Boolean? = null
    @SerializedName("message")
    @Expose
    val message: String? = null
    @SerializedName("returnStatus")
    @Expose
    val returnStatus: Boolean? = null
    @SerializedName("returnMessage")
    @Expose
    val returnMessage: List<Any>? = null
    @SerializedName("emailValidation")
    @Expose
    val emailValidation: Any? = null
}