package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class MyBreakLogModel : BaseModel() {

    @SerializedName("data")
    val data: ArrayList<MyBreakData>? = null




    var agencyID: Int? = null
    var teacherID: Int? = null
    var askingDate: String? = null
    var askedDateString : String?=null
}
