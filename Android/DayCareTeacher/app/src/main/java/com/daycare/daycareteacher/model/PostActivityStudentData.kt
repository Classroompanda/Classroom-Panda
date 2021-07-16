package com.daycare.daycareteacher.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

import java.util.ArrayList

class PostActivityStudentData {
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("postActivityImages")
    var postActivityImages: ArrayList<PostActivityImage>? = null
    @SerializedName("postActivityVideos")
    var postActivityVideos: ArrayList<PostActivityVideo>? = null
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("imagePath")
    var imagePath: Any? = null
    @SerializedName("teacherID")
    var teacherID: Int? = null
    @SerializedName("sender")
    var sender: String? = null
    @SerializedName("postTitle")
    var postTitle: String? = null
    @SerializedName("postDescription")
    var postDescription: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("postedDate")
    var postedDate: String? = null
    @SerializedName("isPublic")
    var isPublic: Boolean? = null
    @SerializedName("selectedStudents")
    var selectedStudents: ArrayList<Int>? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
    @SerializedName("totalLikes")
    @Expose
    var totalLikes: Int? = null
    @SerializedName("postComment")
    @Expose
    var postComment: String? = null

    inner class PostActivityImage {

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
        @SerializedName("isActive")
        var isActive: Boolean? = null
    }

    inner class PostActivityVideo {

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
        @SerializedName("isActive")
        var isActive: Boolean? = null
        @SerializedName("isDeleted")
        var isDeleted: Boolean? = null
    }
}
