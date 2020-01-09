package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class StudentModel{

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
     val message: Any? = null
    @SerializedName("data")
     val data: List<StudentData>? = null
    @SerializedName("returnStatus")
     val returnStatus: Boolean? = null

}