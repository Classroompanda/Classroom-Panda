package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class OperationalClassModel{

    @SerializedName("totalPages")
    var totalPages: Int? = null

    @SerializedName("totalRows")
    var totalRows: Int? = null

    @SerializedName("pageSize")
    var pageSize: Int? = null

    @SerializedName("id")
    var id: Int? = null

    @SerializedName("saveId")
    var saveId: Int? = null

    @SerializedName("isExist")
    var isExist: Boolean? = null

    @SerializedName("statusCode")
    var statusCode: Int? = null

    @SerializedName("isSuccess")
    var isSuccess: Boolean? = null

    @SerializedName("message")
    var message: Boolean? = null

    @SerializedName("data")
    val data: List<OperationalClassData>? = null
}

class OperationalClassData {

    @SerializedName("value")
    var value: Int? = null


    @SerializedName("label")
    var label: String? = null

    @SerializedName("checkInTime")
    var checkInTime: String? = null


}
