package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

 class EnrollmentModel : BaseModel() {

        @SerializedName("data")
        val data: ArrayList<EnrollmentData>? = null




     var agencyID: Int? = null
     var parentID: Int? = null
     var askingDate: String? = null
     var studentID: Int? = null




    }
