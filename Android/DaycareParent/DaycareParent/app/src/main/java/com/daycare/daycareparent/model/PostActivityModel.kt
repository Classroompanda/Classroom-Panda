package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class PostActivityModel {
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("postedDate")
    var postedDate: String? = null
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


class PostActivityImage() :Parcelable {

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

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        postActivitiesID = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        imageServerPath = parcel.readString()
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(postActivitiesID)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(classesID)
        parcel.writeString(imageServerPath)
        parcel.writeValue(stringId)
        parcel.writeValue(isActive)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<PostActivityImage> {
        override fun createFromParcel(parcel: Parcel): PostActivityImage {
            return PostActivityImage(parcel)
        }

        override fun newArray(size: Int): Array<PostActivityImage?> {
            return arrayOfNulls(size)
        }
    }
}

class PostActivityVideo() :Parcelable{

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

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        postActivitiesID = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        vedioServerPath = parcel.readString()
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(postActivitiesID)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(classesID)
        parcel.writeString(vedioServerPath)
        parcel.writeValue(stringId)
        parcel.writeValue(isActive)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<PostActivityVideo> {
        override fun createFromParcel(parcel: Parcel): PostActivityVideo {
            return PostActivityVideo(parcel)
        }

        override fun newArray(size: Int): Array<PostActivityVideo?> {
            return arrayOfNulls(size)
        }
    }
}

