package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

import java.io.Serializable
import java.util.ArrayList
import com.google.gson.annotations.Expose



class DailySheetSerializeRequest : Serializable {
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
    @SerializedName("studentActivityMeals")
    var studentActivityMeals: StudentActivityMeals? = null
    @SerializedName("studentActivityMedications")
    var studentActivityMedications: StudentActivityMedications? = null
    @SerializedName("studentActivityNotes")
    var studentActivityNotes: StudentActivityNotes? = null
    @SerializedName("studentActivityMoods")
    var studentActivityMoods: StudentActivityMoods? = null
    @SerializedName("studentOtherActivity")
    var studentOtherActivity: StudentOtherActivity? = null
    @SerializedName("studentAcitivityNap")
    var studentAcitivityNap: StudentAcitivityNap? = null
    @SerializedName("studentActivityDiaper")
    var studentActivityDiaper: StudentAcitivityDiaper? = null


    @SerializedName("stringId")
    var stringId: String? = null
    @SerializedName("isActive")
    var active: Boolean? = null
    @SerializedName("isDeleted")
    var deleted: Boolean? = null
    @SerializedName("deletedBy")
    var deletedBy: Int? = null
    @SerializedName("createdBy")
    var createdBy: Int? = null
    @SerializedName("studentActivitiesID")
    var studentActivitiesID: Int? = null


    @SerializedName("DeletedDate")
    var DeletedDate: String? = null


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
        var active: Boolean? = null
    }

    inner class StudentActivityMedications {


        @SerializedName("id")
        @Expose
        var id: Int? = null
        @SerializedName("studentID")
        @Expose
        var studentID: Int? = null
        @SerializedName("agencyID")
        @Expose
        var agencyID: Int? = null
        @SerializedName("studentActivitiesID")
        @Expose
        var studentActivitiesID: Int? = null
        @SerializedName("studentHealthDescription")
        @Expose
        var studentHealthDescription: String? = null
        @SerializedName("recordedTemparture")
        @Expose
        var recordedTemparture: String? = null
        @SerializedName("stringId")
        @Expose
        var stringId: Int? = null
        @SerializedName("activityTypeID")
        @Expose
        var activityTypeID: Int? = null
        @SerializedName("doseRepeatID")
        @Expose
        var doseRepeatID: Int? = null
        @SerializedName("doseRepeatName")
        @Expose
        var doseRepeatName: String? = null
        @SerializedName("dosageQuantityID")
        @Expose
        var dosageQuantityID: Int? = null
        @SerializedName("unit")
        @Expose
        var unit: Int? = null
        @SerializedName("classesID")
        @Expose
        var classesID: Int? = null
        @SerializedName("howTaken")
        @Expose
        var howTaken: String? = null
        @SerializedName("studentMedicationID")
        @Expose
        var studentMedicationID: Int? = null
        @SerializedName("studentMedicationName")
        @Expose
        var studentMedicationName: String? = null
        @SerializedName("isParentAcknowledge")
        @Expose
        var isParentAcknowledge: Boolean? = null
        @SerializedName("isTeacherAcknowledge")
        @Expose
        var isTeacherAcknowledge: Boolean? = null
        @SerializedName("acknowledgeParentID")
        @Expose
        var acknowledgeParentID: Int? = null
        @SerializedName("acknowledgeTeacherID")
        @Expose
        var acknowledgeTeacherID: Int? = null
        @SerializedName("acknowledgeParentName")
        @Expose
        var acknowledgeParentName: String? = null
        @SerializedName("acknowledgeTeacherName")
        @Expose
        var acknowledgeTeacherName: String? = null
        @SerializedName("isMedicationDoneToday")
        @Expose
        var isMedicationDoneToday: Boolean? = null
        @SerializedName("medicationDoneDate")
        @Expose
        var medicationDoneDate: String? = null
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
        var deletedFromIP: String? = null
        @SerializedName("createdFromIP")
        @Expose
        var createdFromIP: String? = null
        @SerializedName("updatedFromIP")
        @Expose
        var updatedFromIP: String? = null

    }


    inner class StudentActivityNotes {

        @SerializedName("id")
        var id: Int? = null
        @SerializedName("agencyID")
        var agencyID: Int? = null
        @SerializedName("studentActivitiesID")
        var studentActivitiesID: Int? = null
        @SerializedName("studentID")
        var studentID: Int? = null
        @SerializedName("noteDescription")
        var noteDescription: String? = null
        @SerializedName("stringId")
        var stringId: String? = null
        @SerializedName("activityTypeID")
        var activityTypeID: Int? = null
        @SerializedName("isActive")
        var active: Boolean? = null
        @SerializedName("isDeleted")
        var deleted: Boolean? = null
        @SerializedName("deletedBy")
        var deletedBy: Int? = null
        @SerializedName("deletedDate")
        var deletedDate: String? = null
        @SerializedName("createdBy")
        var createdBy: Int? = null
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
        var active: Boolean? = null
    }


    inner class StudentAcitivityDiaper {
        @SerializedName("id")
        var id: Int? = null
        @SerializedName("agencyID")
        var agencyID: Int? = null
        @SerializedName("studentID")
        var studentID: Int? = null
        @SerializedName("studentActivitiesID")
        var studentActivitiesID: Int? = null
        @SerializedName("diaperChangeTime")
        var diaperChangeTime: String?=null
        @SerializedName("studentActivityDiaperNote")
        var studentActivityDiaperNote: String?=null
        @SerializedName("stringId")
        var stringId: String?=null
        @SerializedName("activityTypeID")
        var activityTypeID: Int? = null
        @SerializedName("isActive")
        var active: Boolean? = null
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
        var sleptAtTime: String?=null
        @SerializedName("workUpTime")
        var workUpTime: String?=null
        @SerializedName("napNote")
        var napNote: String?=null
        @SerializedName("stringId")
        var stringId: String?=null
        @SerializedName("activityTypeID")
        var activityTypeID: Int? = null
        @SerializedName("isActive")
        var active: Boolean? = null
    }

    inner class StudentActivityMeals {
        @SerializedName("id")
        var id: Int? = null
        @SerializedName("agencyID")
        var agencyID: Int? = null
        @SerializedName("studentID")
        var studentID: Int? = null
        @SerializedName("studentActivitiesID")
        var studentActivitiesID: Int? = null
        @SerializedName("mealTypeName")
        var mealTypeName: String? = null
        @SerializedName("mealTypeID")
        var mealTypeID: Int? = null
        @SerializedName("mealComment")
        var mealComment: String? = null
        @SerializedName("otherThanPlanMeal")
        var otherThanPlanMeal: String? = null
        @SerializedName("otherThanPlanMealComment")
        var otherThanPlanMealComment: String? = null
        @SerializedName("activityTypeID")
        var activityTypeID: Int? = null

        @SerializedName("mealPlannerID")
        var mealPlannerID: Int? = null

        @SerializedName("mealPlanTitle")
        var mealPlanTitle: String? = null

        @SerializedName("studentActivityMealFoodItems")
        var studentActivityMealFoodItems: ArrayList<StudentActivityMealFoodItem>? = null


    }
}
