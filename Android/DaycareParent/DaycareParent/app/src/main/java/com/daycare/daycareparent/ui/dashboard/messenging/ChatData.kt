package com.daycare.daycareparent.ui.dashboard.messenging

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class ChatData {
    @SerializedName("message")
    @Expose
    var message: String? = null
    @SerializedName("sender")
    @Expose
    var senderUserID: Int? = null
    @SerializedName("receiver")
    @Expose
    var receiverUserID: Int? = null

    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null

    //    request
    @SerializedName("senderuserid")
    @Expose
    var senderuserid: Int? = null
    @SerializedName("receiveruserid")
    @Expose
    var receiveruserid: Int? = null

}

class ChatHistoryData() {
    constructor(senderUserID: Int?, receiverUserID: Int?, message: String?, createdDateTime: String?) : this() {
        this.senderUserID = senderUserID
        this.receiverUserID = receiverUserID
        this.message = message
        this.createdDateTime = createdDateTime
    }

    @SerializedName("senderUserID")
    @Expose
    var senderUserID: Int? = null
    @SerializedName("receiverUserID")
    @Expose
    var receiverUserID: Int? = null
    @SerializedName("message")
    @Expose
    var message: String? = null
    @SerializedName("createdDateTime")
    @Expose
    var createdDateTime: String? = null
}