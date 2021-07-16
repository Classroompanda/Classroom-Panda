package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class StateData {
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
    @SerializedName("CountryId")
    var CountryId: Int? = null

    inner class Datum {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("stateName")
         var stateName: String? = null
        @SerializedName("countryID")
         var countryID: Int? = null
        @SerializedName("stateCode")
         var stateCode: String? = null
        @SerializedName("numCode")
         var numCode: String? = null
        @SerializedName("phoneCode")
         var phoneCode: String? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
    }
}
