package com.daycare.daycareparent.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class MealDataResponse {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("foodTypeID")
     var foodTypeID: Int? = null
    @SerializedName("mealTypeID")
     var mealTypeID: Int? = null
    @SerializedName("amount")
     var amount: Int? = null
    @SerializedName("quantity")
     var quantity: Int? = null
    @SerializedName("plannerRepeatTypeID")
     var plannerRepeatTypeID: Int? = null
    @SerializedName("title")
     var title: String? = null
    @SerializedName("start")
     var start: String? = null
    @SerializedName("end")
     var end: String? = null
    @SerializedName("startTime")
    @Expose
    var startTime: String? = null
    @SerializedName("endTime")
    @Expose
    var endTime: String? = null
    @SerializedName("endsOn")
     var endsOn: String? = null
    @SerializedName("description")
     var description: String? = null
    @SerializedName("mon")
     var mon: Boolean? = null
    @SerializedName("tue")
     var tue: Boolean? = null
    @SerializedName("wed")
     var wed: Boolean? = null
    @SerializedName("thu")
     var thu: Boolean? = null
    @SerializedName("fri")
     var fri: Boolean? = null
    @SerializedName("sat")
     var sat: Boolean? = null
    @SerializedName("sun")
     var sun: Boolean? = null
    @SerializedName("involvedClass")
     var involvedClass: List<InvolvedClas>? = null
    @SerializedName("involvedMealFoodItems")
     var involvedMealFoodItems: List<InvolvedMealFoodItem>? = null
    @SerializedName("selectedWeekDay")
     var selectedWeekDay: Any? = null
    @SerializedName("deletedFromIP")
     var deletedFromIP: Any? = null
    @SerializedName("createdFromIP")
     var createdFromIP: Any? = null
    @SerializedName("updatedFromIP")
     var updatedFromIP: Any? = null
    @SerializedName("stringId")
     var stringId: Any? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null

    inner class InvolvedClas {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("mealPlannerID")
         var mealPlannerID: Int? = null
        @SerializedName("classesID")
         var classesID: Int? = null
        @SerializedName("className")
         var className: String? = null
        @SerializedName("deletedFromIP")
         var deletedFromIP: Any? = null
        @SerializedName("createdFromIP")
         var createdFromIP: Any? = null
        @SerializedName("updatedFromIP")
         var updatedFromIP: Any? = null
        @SerializedName("stringId")
         var stringId: Any? = null
        @SerializedName("isActive")
         var isActive: Boolean? = null
    }

    inner class InvolvedMealFoodItem {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("mealPlannerID")
         var mealPlannerID: Int? = null
        @SerializedName("foodTypeID")
         var foodTypeID: Int? = null
        @SerializedName("foodTypeName")
         var foodTypeName: String? = null
        @SerializedName("amount")
         var amount: String? = null
        @SerializedName("quantity")
         var quantity: String? = null
        @SerializedName("measureUnitTypeID")
         var measureUnitTypeID: Int? = null
        @SerializedName("measureUnitTypeName")
         var measureUnitTypeName: String? = null
        @SerializedName("measureQuantityTypeID")
         var measureQuantityTypeID: Int? = null
        @SerializedName("measureQuantityTypeName")
         var measureQuantityTypeName: String? = null
        @SerializedName("isActive")
         var isActive: Boolean? = null
    }
}
