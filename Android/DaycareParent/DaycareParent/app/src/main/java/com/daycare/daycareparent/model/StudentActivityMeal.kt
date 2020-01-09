package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class StudentActivityMeal {
    @SerializedName("mealTypeName")
     var mealTypeName: Any? = null
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("studentActivitiesID")
     var studentActivitiesID: Int? = null
    @SerializedName("mealTypeID")
     var mealTypeID: Int? = null
    @SerializedName("mealComment")
     var mealComment: String? = null
    @SerializedName("otherThanPlanMeal")
     var otherThanPlanMeal: String? = null
    @SerializedName("otherThanPlanMealComment")
     var otherThanPlanMealComment: String? = null
    @SerializedName("stringId")
     var stringId: Any? = null
    @SerializedName("activityTypeID")
     var activityTypeID: Int? = null
    @SerializedName("mealPlannerID")
     var mealPlannerID: Int? = null
    @SerializedName("mealPlanTitle")
     var mealPlanTitle: String? = null
    @SerializedName("studentActivityMealFoodItems")
     var studentActivityMealFoodItems: List<StudentActivityMealFoodItem>? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null
    @SerializedName("isDeleted")
     var isDeleted: Boolean? = null

}
