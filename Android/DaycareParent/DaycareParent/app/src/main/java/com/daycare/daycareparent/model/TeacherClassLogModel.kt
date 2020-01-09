package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class TeacherClassLogModel:BaseModel(){
    @SerializedName("data")
    val data: ArrayList<ClassLogData>? = null

    //Extra

    var askingDate: String? = null
    var teacherID: Int? = null
    var agencyID: Int? = null


}