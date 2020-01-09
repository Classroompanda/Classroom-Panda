package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class BreakData:BaseModel(){
    @SerializedName("data")
    var data: ArrayList<StudentBreakData>? = null


    //Extra Parameter
    var agencyID: Int? = null
    var studentID: Int? = null
    var classAttendenceID: String? = null



}
