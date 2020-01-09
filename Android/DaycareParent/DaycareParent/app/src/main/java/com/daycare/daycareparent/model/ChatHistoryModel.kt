package com.daycare.daycareparent.model

import com.daycare.daycareparent.ui.dashboard.messenging.ChatData
import com.daycare.daycareparent.ui.dashboard.messenging.ChatHistoryData
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