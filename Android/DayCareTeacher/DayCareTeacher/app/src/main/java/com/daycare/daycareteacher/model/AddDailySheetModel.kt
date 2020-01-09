package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class AddDailySheetModel() : Parcelable{


    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("classesID")
     var classesID: Int? = null
    @SerializedName("activityTypeID")
     var activityTypeID: Int? = null
    @SerializedName("activityRegisterDate")
     var activityRegisterDate: String? = null
    @SerializedName("selectedStudents")
     var selectedStudents: List<Int>? = null
   /* @SerializedName("studentActivityMeals")
     var studentActivityMeals: StudentOtherActivity? = null
*/
    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        activityTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        activityRegisterDate = parcel.readString()
     //   studentActivityMeals = parcel.readParcelable(StudentOtherActivity::class.java.classLoader)
    }


/*
    inner class StudentActivityMedications() :Parcelable {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("studentID")
         var studentID: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("studentActivitiesID")
         var studentActivitiesID: Int? = null
        @SerializedName("studentHealthDescription")
         var studentHealthDescription: String? = null
        @SerializedName("recordedTemparture")
         var recordedTemparture: Int? = null
        @SerializedName("stringId")
         var stringId: String? = null
        @SerializedName("activityTypeID")
         var activityTypeID: Int? = null
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

         constructor(parcel: Parcel) : this() {
             id = parcel.readValue(Int::class.java.classLoader) as? Int
             studentID = parcel.readValue(Int::class.java.classLoader) as? Int
             agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
             studentActivitiesID = parcel.readValue(Int::class.java.classLoader) as? Int
             studentHealthDescription = parcel.readString()
             recordedTemparture = parcel.readValue(Int::class.java.classLoader) as? Int
             stringId = parcel.readString()
             activityTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
             isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
             isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
             deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
             deletedDate = parcel.readString()
             createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
         }

         override fun writeToParcel(parcel: Parcel, flags: Int) {
             parcel.writeValue(id)
             parcel.writeValue(studentID)
             parcel.writeValue(agencyID)
             parcel.writeValue(studentActivitiesID)
             parcel.writeString(studentHealthDescription)
             parcel.writeValue(recordedTemparture)
             parcel.writeString(stringId)
             parcel.writeValue(activityTypeID)
             parcel.writeValue(isActive)
             parcel.writeValue(isDeleted)
             parcel.writeValue(deletedBy)
             parcel.writeString(deletedDate)
             parcel.writeValue(createdBy)
         }

         override fun describeContents(): Int {
             return 0
         }

         companion object CREATOR : Parcelable.Creator<StudentActivityMedications> {
             override fun createFromParcel(parcel: Parcel): StudentActivityMedications {
                 return StudentActivityMedications(parcel)
             }

             override fun newArray(size: Int): Array<StudentActivityMedications?> {
                 return arrayOfNulls(size)
             }
         }
     }

    inner class StudentAcitivityNap {

        @SerializedName("id")
         var id: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("studentID")
         var studentID: Int? = null
        @SerializedName("studentActivitiesID")
         var studentActivitiesID: Int? = null
        @SerializedName("sleptAtTime")
         var sleptAtTime: String? = null
        @SerializedName("workUpTime")
         var workUpTime: String? = null
        @SerializedName("napNote")
         var napNote: String? = null
        @SerializedName("stringId")
         var stringId: String? = null
        @SerializedName("activityTypeID")
         var activityTypeID: Int? = null
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
    }

    inner class StudentActivityMeals {

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
    }

    inner class StudentOtherActivity {

        @SerializedName("subActivityTypeName")
         var subActivityTypeName: String? = null
        @SerializedName("id")
         var id: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("studentID")
         var studentID: Int? = null
        @SerializedName("studentActivitiesID")
         var studentActivitiesID: Int? = null
        @SerializedName("subActivityTypeID")
         var subActivityTypeID: Int? = null
        @SerializedName("startTime")
         var startTime: String? = null
        @SerializedName("endTime")
         var endTime: String? = null
        @SerializedName("otherActivityNote")
         var otherActivityNote: String? = null
        @SerializedName("stringId")
         var stringId: String? = null
        @SerializedName("activityTypeID")
         var activityTypeID: Int? = null
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
    }

    inner class StudentActivityMoods {

        @SerializedName("moodTypeName")
         var moodTypeName: String? = null
        @SerializedName("id")
         var id: Int? = null
        @SerializedName("agencyID")
         var agencyID: Int? = null
        @SerializedName("studentID")
         var studentID: Int? = null
        @SerializedName("studentActivitiesID")
         var studentActivitiesID: Int? = null
        @SerializedName("moodTypeID")
         var moodTypeID: Int? = null
        @SerializedName("studentMoodDescription")
         var studentMoodDescription: String? = null
        @SerializedName("stringId")
         var stringId: String? = null
        @SerializedName("activityTypeID")
         var activityTypeID: Int? = null
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
    }
    init {
        StudentActivityMoods
    }*/
    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(classesID)
        parcel.writeValue(activityTypeID)
        parcel.writeString(activityRegisterDate)
      //  parcel.writeParcelable(studentActivityMeals, flags)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<AddDailySheetModel> {
        override fun createFromParcel(parcel: Parcel): AddDailySheetModel {
            return AddDailySheetModel(parcel)
        }

        override fun newArray(size: Int): Array<AddDailySheetModel?> {
            return arrayOfNulls(size)
        }
    }


}
