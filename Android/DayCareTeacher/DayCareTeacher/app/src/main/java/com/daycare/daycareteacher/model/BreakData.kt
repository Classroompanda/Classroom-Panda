package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class BreakData:BaseModel(){
    @SerializedName("data")
    var data: ArrayList<StudentBreakData>? = ArrayList()


    //Extra Parameter
    var agencyID: Int? = null
    var studentID: String? = null
    var classAttendenceID: String? = null



}
