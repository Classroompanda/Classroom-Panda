package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class EditMealModel {
    @SerializedName("totalPages")
    public Integer totalPages;
    @SerializedName("totalRows")
    public Integer totalRows;
    @SerializedName("pageSize")
    public Integer pageSize;
    @SerializedName("id")
    public Integer id;
    @SerializedName("isExist")
    public Boolean isExist;
    @SerializedName("saveId")
    public Integer saveId;
    @SerializedName("statusCode")
    public Integer statusCode;
    @SerializedName("isSuccess")
    public Boolean isSuccess;
    @SerializedName("message")
    public String message;
    @SerializedName("data")
    public Data data;
    
    public class Data {
    @SerializedName("mealTypeName")
    public Object mealTypeName;
    @SerializedName("id")
    public Integer id;
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
    public Integer stringId;
    @SerializedName("activityTypeID")
    public Integer activityTypeID;
    @SerializedName("mealPlannerID")
    public Integer mealPlannerID;
    @SerializedName("mealPlanTitle")
    public String mealPlanTitle;
    @SerializedName("studentActivityMealFoodItems")
    public List<StudentActivityMealFoodItem> studentActivityMealFoodItems = null;}
}
