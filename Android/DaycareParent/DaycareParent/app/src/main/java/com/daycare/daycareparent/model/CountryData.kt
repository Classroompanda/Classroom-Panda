package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class CountryData {
    @SerializedName("agencyID")
    var agencyID: Int? = null
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

    inner class Datum {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("countryName")
         var countryName: String? = null
        @SerializedName("countryCode")
         var countryCode: String? = null
        @SerializedName("numCode")
         var numCode: String? = null
        @SerializedName("phoneCode")
         var phoneCode: String? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
    }
}
