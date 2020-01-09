package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class Posts : BaseModel() {
    @SerializedName("data")
    @Expose
    var data: List<Post>? = null
}

class Post() : Parcelable {

    @SerializedName("studentName")
    @Expose
    var studentName: String? = null
    @SerializedName("postActivityImages")
    @Expose
    var postActivityImages: List<PostActivityImage>? = null
    @SerializedName("postActivityVideos")
    @Expose
    var postActivityVideos: List<PostActivityVideo>? = null
    @SerializedName("totalLikes")
    @Expose
    var totalLikes: Int? = null
    @SerializedName("commentCount")
    @Expose
    var commentCount: Int? = null
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("imagePath")
    @Expose
    var imagePath: String? = null
    @SerializedName("teacherID")
    @Expose
    var teacherID: Int? = null
    @SerializedName("sender")
    @Expose
    var sender: String? = null
    @SerializedName("postTitle")
    @Expose
    var postTitle: String? = null
    @SerializedName("postDescription")
    @Expose
    var postDescription: String? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("studentID")
    @Expose
    var studentID: Int? = null
    @SerializedName("classesID")
    @Expose
    var classesID: Int? = null
    @SerializedName("className")
    @Expose
    var className: Any? = null
    @SerializedName("postedDate")
    @Expose
    var postedDate: String? = null
    @SerializedName("isPublic")
    @Expose
    var isPublic: Boolean? = null
    @SerializedName("selectedStudents")
    @Expose
    var selectedStudents: List<Int>? = null
    @SerializedName("postLikeCount")
    @Expose
    var postLikeCount: Int? = null
    @SerializedName("isPostALreadyLiked")
    @Expose
    var isPostALreadyLiked: Boolean? = null
    @SerializedName("postComment")
    @Expose
    var postComment: String? = null

    @SerializedName("isAlreadyPostComment")
    @Expose
    var isAlreadyPostComment: Boolean? = null
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
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
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

    constructor(parcel: Parcel) : this() {
        studentName = parcel.readString()
        postActivityImages = parcel.createTypedArrayList(PostActivityImage)
        postActivityVideos = parcel.createTypedArrayList(PostActivityVideo)
        totalLikes = parcel.readValue(Int::class.java.classLoader) as? Int
        commentCount = parcel.readValue(Int::class.java.classLoader) as? Int
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        imagePath = parcel.readString()
        teacherID = parcel.readValue(Int::class.java.classLoader) as? Int
        sender = parcel.readString()
        postTitle = parcel.readString()
        postDescription = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        postedDate = parcel.readString()
        isPublic = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        postLikeCount = parcel.readValue(Int::class.java.classLoader) as? Int
        isPostALreadyLiked = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        postComment = parcel.readString()
        isAlreadyPostComment = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
    }

    init {
        postActivityImages = ArrayList()
        postActivityVideos = ArrayList()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(studentName)
        parcel.writeTypedList(postActivityImages)
        parcel.writeTypedList(postActivityVideos)
        parcel.writeValue(totalLikes)
        parcel.writeValue(commentCount)
        parcel.writeValue(id)
        parcel.writeString(imagePath)
        parcel.writeValue(teacherID)
        parcel.writeString(sender)
        parcel.writeString(postTitle)
        parcel.writeString(postDescription)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(classesID)
        parcel.writeString(postedDate)
        parcel.writeValue(isPublic)
        parcel.writeValue(postLikeCount)
        parcel.writeValue(isPostALreadyLiked)
        parcel.writeString(postComment)
        parcel.writeValue(isAlreadyPostComment)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Post> {
        override fun createFromParcel(parcel: Parcel): Post {
            return Post(parcel)
        }

        override fun newArray(size: Int): Array<Post?> {
            return arrayOfNulls(size)
        }
    }


}
