package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class DailySheetStudentList: BaseModel(){

    @SerializedName("data")
     var data: List<DailySheetStudentData>? = null
}
