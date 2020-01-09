package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName



class TeacherChatList:BaseModel() {

    @SerializedName("data")
    @Expose
    var data: List<ChatListData>? = null
    @SerializedName("filePath")
    @Expose
    var filePath: Any? = null
    @SerializedName("fileName")
    @Expose
    var fileName: Any? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("roleID")
    @Expose
    var roleID: Int? = null
    @SerializedName("limit")
    @Expose
    var limit: Int? = null
    @SerializedName("page")
    @Expose
    var page: Int? = null
    @SerializedName("parentID")
    @Expose
    var parentID: Int? = null
    @SerializedName("teacherID")
    @Expose
    var teacherID: Int? = null
}

class ChatListData() :Parcelable{
    @SerializedName("listUserId")
    @Expose
    var listUserId: Int? = null
    @SerializedName("listUserName")
    @Expose
    var listUserName: String? = null
    @SerializedName("imagePath")
    @Expose
    var imagePath: String? = null

    constructor(parcel: Parcel) : this() {
        listUserId = parcel.readValue(Int::class.java.classLoader) as? Int
        listUserName = parcel.readString()
        imagePath = parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(listUserId)
        parcel.writeString(listUserName)
        parcel.writeString(imagePath)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ChatListData> {
        override fun createFromParcel(parcel: Parcel): ChatListData {
            return ChatListData(parcel)
        }

        override fun newArray(size: Int): Array<ChatListData?> {
            return arrayOfNulls(size)
        }
    }
}