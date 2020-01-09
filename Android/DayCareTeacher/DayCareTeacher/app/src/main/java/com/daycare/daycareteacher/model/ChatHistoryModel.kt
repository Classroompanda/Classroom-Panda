package com.daycare.daycareteacher.model

import com.daycare.daycareteacher.ui.dashboard.messenging.ChatHistoryData
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class ChatHistoryModel : BaseModel() {


    @SerializedName("data")
    @Expose
    var data: ArrayList<ChatHistoryData>? = null
    @SerializedName("filePath")
    @Expose
    var filePath: Any? = null
    @SerializedName("fileName")
    @Expose
    var fileName: Any? = null

}