package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class TeacherBreakModel : BaseModel() {
   /* @SerializedName("data")
    var data: List<TeacherBreakData>? = null*/

    @SerializedName("data")
   var data: TeacherBreakData? = null

}