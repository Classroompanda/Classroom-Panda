package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class TeacherModel : BaseModel() {

    @SerializedName("data")
    var data: List<TeacherData>? = null

}