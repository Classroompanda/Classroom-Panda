package com.daycare.daycareparent.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName



class ReactionType:BaseModel() {

    @SerializedName("data")
    @Expose
    var data: List<Reactions>? = null

}

class Reactions {
    @SerializedName("value")
    @Expose
    var value: Int? = null
    @SerializedName("label")
    @Expose
    var label: String? = null
    @SerializedName("isActive")
    @Expose
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    @Expose
    var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    @Expose
    var deletedBy: Any? = null
    @SerializedName("deletedDate")
    @Expose
    var deletedDate: Any? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Any? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: Any? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: Any? = null
    @SerializedName("updatedBy")
    @Expose
    var updatedBy: Any? = null
    @SerializedName("deletedFromIP")
    @Expose
    var deletedFromIP: Any? = null
    @SerializedName("createdFromIP")
    @Expose
    var createdFromIP: Any? = null
    @SerializedName("updatedFromIP")
    @Expose
    var updatedFromIP: Any? = null
}
