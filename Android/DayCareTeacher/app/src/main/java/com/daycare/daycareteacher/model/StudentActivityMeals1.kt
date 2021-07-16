package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class StudentActivityMeals11() : Parcelable {
    @SerializedName("mealTypeName")
    var mealTypeName: String? = null
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
    var stringId: String? = null
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
    @SerializedName("deletedBy")
    var deletedBy: Int? = null
    @SerializedName("deletedDate")
    var deletedDate: String? = null
    @SerializedName("createdBy")
    var createdBy: Int? = null
    @SerializedName("createdDate")
    var createdDate: String? = null

    constructor(parcel: Parcel) : this() {
        mealTypeName = parcel.readString()
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentActivitiesID = parcel.readValue(Int::class.java.classLoader) as? Int
        mealTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        mealComment = parcel.readString()
        otherThanPlanMeal = parcel.readString()
        otherThanPlanMealComment = parcel.readString()
        stringId = parcel.readString()
        activityTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        mealPlannerID = parcel.readValue(Int::class.java.classLoader) as? Int
        mealPlanTitle = parcel.readString()
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        deletedDate = parcel.readString()
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(mealTypeName)
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(studentActivitiesID)
        parcel.writeValue(mealTypeID)
        parcel.writeString(mealComment)
        parcel.writeString(otherThanPlanMeal)
        parcel.writeString(otherThanPlanMealComment)
        parcel.writeString(stringId)
        parcel.writeValue(activityTypeID)
        parcel.writeValue(mealPlannerID)
        parcel.writeString(mealPlanTitle)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeString(deletedDate)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
    }

    override fun describeContents(): Int {
        return 0
    }

  /*  companion object CREATOR : Parcelable.Creator<StudentActivityMeals1> {
        override fun createFromParcel(parcel: Parcel): StudentActivityMeals1 {
            return StudentActivityMeals1(parcel)
        }

        override fun newArray(size: Int): Array<StudentActivityMeals1?> {
            return arrayOfNulls(size)
        }
    }*/
    companion object CREATOR : Parcelable.Creator<StudentActivityMeals11> {
        override fun createFromParcel(parcel: Parcel): StudentActivityMeals11 {
            return StudentActivityMeals11(parcel)
        }

        override fun newArray(size: Int): Array<StudentActivityMeals11?> {
            return arrayOfNulls(size)
        }
    }
}