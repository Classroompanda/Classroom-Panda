package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose



class LoginRequest {
    @SerializedName("userName")
    var userName: String? = null
    @SerializedName("emailAddress")
    var emailAddress: String? = null

    @SerializedName("password")
    var password: String? = null
    @SerializedName("isValid")
    var isValid: Boolean? = null


    @SerializedName("ipAddress")
    var ipAddress: String? = null
    @SerializedName("macAddress")
    var macAddress: String? = null

    @SerializedName("businessToken")
    var businessToken: String? = null

    @SerializedName("deviceToken")
    var deviceToken: String? = null

    @SerializedName("phoneTypeID")
    var phoneTypeID: Int? =0

    @SerializedName("quickPin")
    @Expose
    var quickPin: String? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("osType")
    @Expose
    var osType: Int? = null
    @SerializedName("deviceModel")
    @Expose
    var deviceModel: String? = null
    @SerializedName("operatingSystemVersion")
    @Expose
    var operatingSystemVersion: String? = null
    @SerializedName("latitude")
    @Expose
    var latitude: String? = null
    @SerializedName("longitude")
    @Expose
    var longitude: String? = null
    @SerializedName("loggedUserId")
    @Expose
    var loggedUserId: Int? = null
//Forgot Password field
var requestedEmail:String?=null


}