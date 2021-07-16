package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName



class UpdatePassReq {
    @SerializedName("requestedEmail")
    @Expose
    var requestedEmail: String? = null
    @SerializedName("updatedPassword")
    @Expose
    var updatedPassword: String? = null

}