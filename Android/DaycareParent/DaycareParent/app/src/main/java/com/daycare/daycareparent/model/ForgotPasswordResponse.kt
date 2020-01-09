package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class ForgotPasswordResponse {
    @SerializedName("access_token")
    var accessToken: Any? = null
    @SerializedName("expires_in")
    var expiresIn: Int? = null
    @SerializedName("firstTimeLogin")
    var firstTimeLogin: Boolean? = null
    @SerializedName("message")
    var message: String? = null
    @SerializedName("statusCode")
    var statusCode: Int? = null
    @SerializedName("meta")
    var meta: Any? = null
    @SerializedName("id")
    var id: Int? = null
}
