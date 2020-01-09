package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class DailySheetModel: BaseModel() {
    @SerializedName("data")
    val data: List<DailySheetData>? = null

}
