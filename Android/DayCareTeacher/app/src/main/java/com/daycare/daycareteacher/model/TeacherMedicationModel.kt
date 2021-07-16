package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class TeacherMedicationModel:BaseModel() {
    @SerializedName("data")
    var data: List<TeacherMedicationData>? = null

    var agencyID:Int?=null
    var askingDate:String?=null
    var teacherID:Int?=null
    var classID:Int?=null
    var askedDateString:String?=null

    var activityTypeID:Int?=null
    var selectedStudents: List<Int>? = null
    var studentActivityMedications:String?=null





}