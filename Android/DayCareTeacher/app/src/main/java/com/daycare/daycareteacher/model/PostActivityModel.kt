package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class PostActivityModel:BaseModel() {
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("userID")
    var userID: Int? = null
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("postedDate")
    var postedDate: String? = null
    @SerializedName("askedDateString")
    var askedDateString: String? = null
    @SerializedName("postTitle")
    var postTitle: String? = null
    @SerializedName("postDescription")
    var postDescription: String? = null
    @SerializedName("teacherID")
    var teacherID: Int? = null
    @SerializedName("isPublic")
    var isPublic: Boolean? = null
    @SerializedName("stringId")
    var stringId: Int? = null
    @SerializedName("selectedStudents")
    var selectedStudents: List<Int>? = null
    @SerializedName("postActivityImages")
    var postActivityImages: List<PostActivityImage>? = null
    @SerializedName("postActivityVideos")
    var postActivityVideos: List<PostActivityVideo>? = null
    @SerializedName("limit")
    var limit: Int? = null
    @SerializedName("page")
    var page: Int? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    var isDeleted: Boolean? = null

}


class PostActivityImage {

    @SerializedName("id")
    var id: Int? = null
    @SerializedName("postActivitiesID")
    var postActivitiesID: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("imageServerPath")
    var imageServerPath: String? = null
    @SerializedName("stringId")
    var stringId: Int? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
}

class PostActivityVideo {

    @SerializedName("id")
    var id: Int? = null
    @SerializedName("postActivitiesID")
    var postActivitiesID: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("vedioServerPath")
    var vedioServerPath: String? = null
    @SerializedName("stringId")
    var stringId: Int? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
}

