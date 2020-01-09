package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class MealPlanModel : BaseModel() {

    @SerializedName("data")
    var data: List<MealPlanData>? = null
    /*@JsonProperty("data")
    private val data: List<Datum>? = null*/
}