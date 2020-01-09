package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class DailySheetStudentList: BaseModel(){

    @SerializedName("data")
     var data: ArrayList<DailySheetStudentData>? = null
}
