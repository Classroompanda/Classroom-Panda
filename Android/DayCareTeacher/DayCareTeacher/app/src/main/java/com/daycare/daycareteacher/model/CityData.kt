package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class CityData {
    @SerializedName("totalPages")
     var totalPages: Int? = null
    @SerializedName("totalRows")
     var totalRows: Int? = null
    @SerializedName("pageSize")
     var pageSize: Int? = null
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("isExist")
     var isExist: Boolean? = null
    @SerializedName("saveId")
     var saveId: Int? = null
    @SerializedName("statusCode")
     var statusCode: Int? = null
    @SerializedName("isSuccess")
     var isSuccess: Boolean? = null
    @SerializedName("message")
     var message: String? = null
    @SerializedName("data")
     var data: List<Datum>? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("StateId")
    var StateId: Int? = null


    inner class Datum {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("cityName")
         var cityName: String? = null
        @SerializedName("cityCode")
         var cityCode: String? = null
        @SerializedName("stateID")
         var stateID: Int? = null
        @SerializedName("numCode")
         var numCode: Any? = null
        @SerializedName("phoneCode")
         var phoneCode: String? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
    }
}
