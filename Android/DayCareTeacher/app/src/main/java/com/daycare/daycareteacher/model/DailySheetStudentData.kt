package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

class DailySheetStudentData : Serializable{

    @SerializedName("studentName")
     var studentName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("activityTypeName")
     var activityTypeName: Any? = null
    @SerializedName("className")
     var className: String? = null
    @SerializedName("totalActivityCount")
     var totalActivityCount: Int? = null

    @SerializedName("activityDetail")
     var activityDetail: ArrayList<StudentDailySheetDetail>? = null

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

    // for complete daily sheet missing params
    @SerializedName("parentID")
    var parentID : Int?=null

    @SerializedName("userID")
    var userID : Int?=null

    @SerializedName("studentActivityMeals")
    var studentActivityMeals : ArrayList<ArrayData>? = null

    class ArrayData: Serializable {
        @SerializedName("activityTypeID")
        var activityTypeID : Int? = null
    }

    @SerializedName("studentActivityMedications")
    var studentActivityMedications : ArrayList<ArrayData>? = null

    @SerializedName("studentActivityNotes")
    var studentActivityNotes : ArrayList<ArrayData>? = null


    @SerializedName("studentActivityMoods")
    var studentActivityMoods : ArrayList<ArrayData>? = null


    @SerializedName("studentOtherActivity")
    var studentOtherActivity : ArrayList<ArrayData>? = null


    @SerializedName("studentAcitivityNap")
    var studentAcitivityNap : ArrayList<ArrayData>? = null

    @SerializedName("studentActivityDiaper")
    var studentActivityDiaper : ArrayList<ArrayData>? = null


    var selection : Boolean=false

}
