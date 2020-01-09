package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class ClassModel : BaseModel() {
    @SerializedName("data")
    val data: List<ClassData>? = null
}
