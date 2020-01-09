package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class InjuryModel :BaseModel() {

    @SerializedName("data")
    var data: List<InjuryData>? = null
}
