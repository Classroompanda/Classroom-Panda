package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class TeacherChatList:BaseModel() {
    @SerializedName("data")
    @Expose
    var data: ArrayList<ChatListData>? = null
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

    @SerializedName("userID")
    @Expose
    var userID: Int? = null

    @SerializedName("ReceiverUserID")
    @Expose
    var ReceiverUserID: Int?=null

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

    @SerializedName("count")
    @Expose
    var count: Int? = null

    @SerializedName("userRole")
    @Expose
    var userRole: String? = null

    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null

    @SerializedName("fromID")
    @Expose
    var fromID: Int? = null

    @SerializedName("toID")
    @Expose
    var toID: Int? = null

    @SerializedName("id")
    @Expose
    var id: Int? = null


    @SerializedName("phoneNumber")
    @Expose
    var phoneNumber: Int? = null

    @SerializedName("isAgencyAdminAdmin")
    @Expose
    var isAgencyAdminAdmin: Boolean? = null

    @SerializedName("emailID")
    @Expose
    var emailID: String? = null



    constructor(parcel: Parcel) : this() {
        listUserId = parcel.readValue(Int::class.java.classLoader) as? Int
        listUserName = parcel.readString()
        imagePath = parcel.readString()
        count = parcel.readValue(Int::class.java.classLoader)as?Int

        userRole = parcel.readString()
        createdDate = parcel.readString()
        fromID= parcel.readValue(Int::class.java.classLoader)as?Int
        toID= parcel.readValue(Int::class.java.classLoader)as?Int
        id= parcel.readValue(Int::class.java.classLoader)as?Int

        phoneNumber= parcel.readValue(Int::class.java.classLoader)as?Int
        isAgencyAdminAdmin= parcel.readValue(Boolean::class.java.classLoader)as?Boolean
        emailID= parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(listUserId)
        parcel.writeString(listUserName)
        parcel.writeString(imagePath)
        parcel.writeValue(count)

        parcel.writeString(userRole)
        parcel.writeString(createdDate)
        parcel.writeValue(fromID)
        parcel.writeValue(toID)
        parcel.writeValue(id)

        parcel.writeValue(phoneNumber)
        parcel.writeValue(isAgencyAdminAdmin)
        parcel.writeValue(emailID)

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