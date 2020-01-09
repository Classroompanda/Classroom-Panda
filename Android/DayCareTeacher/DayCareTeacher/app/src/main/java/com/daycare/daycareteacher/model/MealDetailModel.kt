package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class MealDetailModel : BaseModel() {

    var data: List<MealDetail>? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("mealPlanID")
    @Expose
    var mealPlanID: Int? = null
}

class MealDetail {
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("foodTypeID")
    @Expose
    var foodTypeID: Int? = null
    @SerializedName("mealTypeID")
    @Expose
    var mealTypeID: Int? = null
    @SerializedName("amount")
    @Expose
    var amount: Int? = null
    @SerializedName("quantity")
    @Expose
    var quantity: Int? = null
    @SerializedName("plannerRepeatTypeID")
    @Expose
    var plannerRepeatTypeID: Int? = null
    @SerializedName("title")
    @Expose
    var title: String? = null
    @SerializedName("start")
    @Expose
    var start: String? = null
    @SerializedName("end")
    @Expose
    var end: String? = null
    @SerializedName("endsOn")
    @Expose
    var endsOn: String? = null
    @SerializedName("description")
    @Expose
    var description: String? = null
    @SerializedName("mon")
    @Expose
    var mon: Boolean? = null
    @SerializedName("tue")
    @Expose
    var tue: Boolean? = null
    @SerializedName("wed")
    @Expose
    var wed: Boolean? = null
    @SerializedName("thu")
    @Expose
    var thu: Boolean? = null
    @SerializedName("fri")
    @Expose
    var fri: Boolean? = null
    @SerializedName("sat")
    @Expose
    var sat: Boolean? = null
    @SerializedName("sun")
    @Expose
    var sun: Boolean? = null
    @SerializedName("involvedClass")
    @Expose
    var involvedClass: List<MealDataResponse.InvolvedClas>? = null
    @SerializedName("involvedMealFoodItems")
    @Expose
    var involvedMealFoodItems: List<MealDataResponse.InvolvedMealFoodItem>? = null
    @SerializedName("selectedWeekDay")
    @Expose
    var selectedWeekDay: Any? = null
    @SerializedName("rangeOfDate")
    @Expose
    var rangeOfDate: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
    @SerializedName("startTime")
    @Expose
    var startTime: String? = null
    @SerializedName("endTime")
    @Expose
    var endTime: String? = null
    @SerializedName("isActive")
    @Expose
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    @Expose
    var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    @Expose
    var deletedBy: Int? = null
    @SerializedName("deletedDate")
    @Expose
    var deletedDate: String? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: String? = null
    @SerializedName("updatedBy")
    @Expose
    var updatedBy: Int? = null
    @SerializedName("deletedFromIP")
    @Expose
    var deletedFromIP: Any? = null
    @SerializedName("createdFromIP")
    @Expose
    var createdFromIP: Any? = null
    @SerializedName("updatedFromIP")
    @Expose
    var updatedFromIP: Any? = null
    var category: String? = null
}
