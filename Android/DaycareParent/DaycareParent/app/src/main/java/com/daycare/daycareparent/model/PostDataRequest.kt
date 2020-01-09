package com.daycare.daycareparent.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class PostDataRequest {

    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("postActivitiesID")
    @Expose
    var postActivitiesID: Int? = null
    @SerializedName("postActivityImagesID")
    @Expose
    var postActivityImagesID: Int? = null

    @SerializedName("postActivityVideosID")
    @Expose
    var postActivityVideosID: Int? = null

    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("studentID")
    @Expose
    var studentID: Int? = null
    @SerializedName("likeCount")
    @Expose
    var likeCount: Int? = null
    @SerializedName("comment")
    @Expose
    var comment: String? = null
    @SerializedName("isActive")
    @Expose
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    @Expose
    var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    @Expose
    var deletedBy: Int? = null
    @SerializedName("deletedDate")
    @Expose
    var deletedDate: String? = null
    @SerializedName("deletedFromIP")
    @Expose
    var deletedFromIP: String? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("createdFromIP")
    @Expose
    var createdFromIP: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: String? = null
    @SerializedName("updatedFromIP")
    @Expose
    var updatedFromIP: String? = null
    @SerializedName("updatedBy")
    @Expose
    var updatedBy: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null



}