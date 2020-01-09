package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose


class LoginResponse {

    @SerializedName("access_token")
    var accessToken: String? = null
    @SerializedName("expires_in")
    var expiresIn: Int? = null
    @SerializedName("firstTimeLogin")
    var firstTimeLogin: Boolean? = null
    @SerializedName("data")
    var data: Data? = null
    @SerializedName("message")
    var message: Any? = null
    @SerializedName("statusCode")
    var statusCode: Int? = null


}


class Data {
    @SerializedName("loginUserID")
    var loginUserID: Int? = null
    @SerializedName("releventUserID")
    var releventUserID: Int? = null
    @SerializedName("firstName")
    var firstName: String? = null
    @SerializedName("lastName")
    var lastName: String? = null
    @SerializedName("imagePath")
    var imagePath: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("roleId")
    @Expose
    var roleId: Int? = null
    @SerializedName("isParent")
    var isParent: Boolean? = null

    @SerializedName("isSubscriptionActive")
    var isSubscriptionActive: Boolean? = null
    
    @SerializedName("isGaurdian")
    var isGaurdian: Boolean? = null
    @SerializedName("isSecondaryParent")
    var isSecondaryParent: Boolean? = null
    @SerializedName("emailAddress")
    @Expose
    var emailAddress: String? = null
    @SerializedName("teacherTodayAttendenceStatusId")
    @Expose
    var teacherTodayAttendenceStatusId: Int? = null
    @SerializedName("teacherTodayAttendenceId")
    @Expose
    var teacherTodayAttendenceId: Int? = null
    @SerializedName("childCount")
    @Expose
    var childCount: Int? = null
    @SerializedName("isStripeAccount")
    @Expose
    var isStripeAccount: Boolean = false
    var password:String? = null

}


