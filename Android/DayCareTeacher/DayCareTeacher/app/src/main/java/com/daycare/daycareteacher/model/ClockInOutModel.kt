package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName



class ClockInOutModel:BaseModel(){
    var attendanceDate: String? = null
    var teacherID: Int? = null
    var agencyID: Int? = null
    var classesID: Int? = null
    var attendenceStatusID: Int? = null
    var clockIn: String? = null
    var clockOut: String? = null
  
}
