package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class ProfileUploadByTeacherData {
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("imagePath")
    var imagePath:String? = null
}