package com.daycare.kiosk.model

import com.google.gson.annotations.SerializedName

class SignData {
    @SerializedName("message")
    var message: Any? = null
    @SerializedName("statusCode")
    var statusCode: Int? = null

    @SerializedName("agencyID")
    var agencyID: String? = null
    @SerializedName("studentID")
    var studentID: String? = null
    @SerializedName("parentID")
    var parentID: String? = null
    @SerializedName("imagePath")
    var imagePath: String? = null


}