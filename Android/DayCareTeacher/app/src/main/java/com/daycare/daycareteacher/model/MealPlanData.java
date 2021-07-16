package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class MealPlanData {
    @SerializedName("mealTypeName")
     public String mealTypeName;
    @SerializedName("id")
    public  Integer id;
    @SerializedName("agencyID")
    public Integer agencyID;
    @SerializedName("studentID")
    public Integer studentID;
    @SerializedName("studentActivitiesID")
    public Integer studentActivitiesID;
    @SerializedName("mealTypeID")
    public Integer mealTypeID;
    @SerializedName("mealComment")
    public String mealComment;
    @SerializedName("otherThanPlanMeal")
    public String otherThanPlanMeal;
    @SerializedName("otherThanPlanMealComment")
    public String otherThanPlanMealComment;
    @SerializedName("stringId")
    public Object stringId;
    @SerializedName("activityTypeID")
    public Integer activityTypeID;
    @SerializedName("mealPlannerID")
    public Integer mealPlannerID;
    @SerializedName("mealPlanTitle")
    public String mealPlanTitle;
    @SerializedName("studentActivityMealFoodItems")
    public ArrayList<StudentActivityMealFoodItem> studentActivityMealFoodItems = null;
    @SerializedName("isActive")
    public Boolean isActive;
}
