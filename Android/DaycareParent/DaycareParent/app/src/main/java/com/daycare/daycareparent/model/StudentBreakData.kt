package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class StudentBreakData() : Parcelable {
    @SerializedName("id")
     var id: Int? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("classAttendenceID")
     var classAttendenceID: Int? = null
    @SerializedName("breakInTime")
     var breakInTime: String? = null
    @SerializedName("breakOutTime")
     var breakOutTime: String? = null
    @SerializedName("attendenceStatusID")
     var attendenceStatusID: Int? = null
    @SerializedName("attendanceDate")
     var attendanceDate: String? = null
    @SerializedName("dropedById")
     var dropedById: Int? = null
    @SerializedName("dropedByOtherId")
     var dropedByOtherId: Int? = null
    @SerializedName("pickupById")
     var pickupById: Int? = null


    @SerializedName("pickupBy")
    var pickupBy: String? = null

    @SerializedName("dropedBy")
    var dropedBy: String? = null

    


    @SerializedName("pickupByOtherId")
     var pickupByOtherId: Int? = null
    @SerializedName("approvedDropedById")
     var approvedDropedById: Int? = null
    @SerializedName("approvedPickupById")
     var approvedPickupById: Int? = null
    @SerializedName("dropedByOtherNames")
     var dropedByOtherNames: String? = null
    @SerializedName("pickupByOtherName")
     var pickupByOtherName: String? = null
    @SerializedName("stringId")
     var stringId: Int? = null
    @SerializedName("breakStatusId")
     var breakStatusId: Int? = null
    @SerializedName("breakReason")
     var breakReason: String? = null
    @SerializedName("isActive")
     var isActive: Boolean? = null
    @SerializedName("isDeleted")
     var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
     var deletedBy: Int? = null

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classAttendenceID = parcel.readValue(Int::class.java.classLoader) as? Int
        breakInTime = parcel.readString()
        breakOutTime = parcel.readString()
        attendenceStatusID = parcel.readValue(Int::class.java.classLoader) as? Int
        attendanceDate = parcel.readString()
        dropedById = parcel.readValue(Int::class.java.classLoader) as? Int
        dropedByOtherId = parcel.readValue(Int::class.java.classLoader) as? Int
        pickupById = parcel.readValue(Int::class.java.classLoader) as? Int
        pickupByOtherId = parcel.readValue(Int::class.java.classLoader) as? Int
        approvedDropedById = parcel.readValue(Int::class.java.classLoader) as? Int
        approvedPickupById = parcel.readValue(Int::class.java.classLoader) as? Int
        dropedByOtherNames = parcel.readString()
        pickupByOtherName = parcel.readString()
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        breakStatusId = parcel.readValue(Int::class.java.classLoader) as? Int
        breakReason = parcel.readString()
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(studentID)
        parcel.writeValue(classAttendenceID)
        parcel.writeString(breakInTime)
        parcel.writeString(breakOutTime)
        parcel.writeValue(attendenceStatusID)
        parcel.writeString(attendanceDate)
        parcel.writeValue(dropedById)
        parcel.writeValue(dropedByOtherId)
        parcel.writeValue(pickupById)
        parcel.writeValue(pickupByOtherId)
        parcel.writeValue(approvedDropedById)
        parcel.writeValue(approvedPickupById)
        parcel.writeString(dropedByOtherNames)
        parcel.writeString(pickupByOtherName)
        parcel.writeValue(stringId)
        parcel.writeValue(breakStatusId)
        parcel.writeString(breakReason)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<StudentBreakData> {
        override fun createFromParcel(parcel: Parcel): StudentBreakData {
            return StudentBreakData(parcel)
        }

        override fun newArray(size: Int): Array<StudentBreakData?> {
            return arrayOfNulls(size)
        }
    }
}
