package com.daycare.kiosk.model

import com.google.gson.annotations.SerializedName

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
    var isAuthPerson :Boolean? = null
    var quickPin :String? = null

    inner class Data {

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
        var roleId: Int? = null
        @SerializedName("emailAddress")
        var emailAddress: String? = null


        @SerializedName("teacherTodayAttendenceStatusId")
        var teacherTodayAttendenceStatusId: Int? = null

        @SerializedName("teacherTodayAttendenceId")
        var teacherTodayAttendenceId: Int? = null

    }
}