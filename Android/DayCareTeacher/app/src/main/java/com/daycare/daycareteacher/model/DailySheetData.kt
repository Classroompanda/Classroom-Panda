package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class DailySheetData {
    @SerializedName("studentName")
     var studentName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("activityTypeName")
     var activityTypeName: String? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("studentActivityMeals")
     var studentActivityMeals: List<StudentActivityMeal>? = null
    @SerializedName("studentActivityMedications")
     var studentActivityMedications: Any? = null
    @SerializedName("studentActivityNotes")
     var studentActivityNotes: Any? = null
    @SerializedName("studentActivityMoods")
     var studentActivityMoods: Any? = null
    @SerializedName("studentOtherActivity")
     var studentOtherActivity: Any? = null
    @SerializedName("studentAcitivityNap")
     var studentAcitivityNap: Any? = null
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
    @SerializedName("isActive")
     var isActive: Boolean? = null
    @SerializedName("isDeleted")
     var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
     var deletedBy: Int? = null
    @SerializedName("deletedDate")
     var deletedDate: Any? = null
    @SerializedName("deletedFromIP")
     var deletedFromIP: Any? = null
    @SerializedName("createdBy")
     var createdBy: Int? = null
    @SerializedName("createdDate")
     var createdDate: String? = null
    @SerializedName("createdFromIP")
     var createdFromIP: Any? = null
    @SerializedName("updatedDate")
     var updatedDate: String? = null
    @SerializedName("updatedFromIP")
     var updatedFromIP: Any? = null
    @SerializedName("updatedBy")
     var updatedBy: Int? = null
    @SerializedName("stringId")
     var stringId: String? = null

    //    EXTRA
    var classID: Int? = null
    var askedDate: String? = null
    var askedDateString : String?=null

}
