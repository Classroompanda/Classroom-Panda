package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class StudentInfoDetail() : BaseModel(), Parcelable {
    @SerializedName("data")
    @Expose
    var data: DetailStdData? = null

    init {
        data = DetailStdData()
    }

    constructor(parcel: Parcel) : this() {
        data = parcel.readParcelable(DetailStdData::class.java.classLoader)
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeParcelable(data, flags)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<StudentInfoDetail> {
        override fun createFromParcel(parcel: Parcel): StudentInfoDetail {
            return StudentInfoDetail(parcel)
        }

        override fun newArray(size: Int): Array<StudentInfoDetail?> {
            return arrayOfNulls(size)
        }
    }


}

class DetailStdData() : StudentData(), Parcelable {
    @SerializedName("parentEmailAddress")
    @Expose
    var parentEmailAddress: String? = null
    @SerializedName("parentContactNumber")
    @Expose
    var parentContactNumber: String? = null
    @SerializedName("registeredDate")
    @Expose
    var registeredDate: String? = null
    @SerializedName("childsAddress")
    @Expose
    var childsAddress: String? = null
    @SerializedName("physicianName")
    @Expose
    var physicianName: String? = null
    @SerializedName("preferredHospital")
    @Expose
    var preferredHospital: String? = null
    @SerializedName("childsContactNumber")
    @Expose
    var childsContactNumber: String? = null
    @SerializedName("enrolledClassesInformation")
    @Expose
    var enrolledClassesInformation: List<EnrolledClassesInformation>? = ArrayList()
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
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
        parentEmailAddress = parcel.readString()
        parentContactNumber = parcel.readString()
        registeredDate = parcel.readString()
        childsAddress = parcel.readString()
        physicianName = parcel.readString()
        preferredHospital = parcel.readString()
        childsContactNumber = parcel.readString()
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(parentEmailAddress)
        parcel.writeString(parentContactNumber)
        parcel.writeString(registeredDate)
        parcel.writeString(childsAddress)
        parcel.writeString(physicianName)
        parcel.writeString(preferredHospital)
        parcel.writeString(childsContactNumber)
        parcel.writeValue(id)
        parcel.writeValue(stringId)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<DetailStdData> {
        override fun createFromParcel(parcel: Parcel): DetailStdData {
            return DetailStdData(parcel)
        }

        override fun newArray(size: Int): Array<DetailStdData?> {
            return arrayOfNulls(size)
        }
    }
}

class EnrolledClassesInformation() : Parcelable {
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("classesID")
    @Expose
    var classesID: Int? = null
    @SerializedName("className")
    @Expose
    var className: String? = null
    @SerializedName("studentID")
    @Expose
    var studentID: Int? = null
    @SerializedName("studentName")
    @Expose
    var studentName: Any? = null
    @SerializedName("classEnrollStartDate")
    @Expose
    var classEnrollStartDate: String? = null
    @SerializedName("classEnrollEndDate")
    @Expose
    var classEnrollEndDate: String? = null
    @SerializedName("enrollmentStatus")
    @Expose
    var enrollmentStatus: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
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
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: String? = null
    @SerializedName("updatedBy")
    @Expose
    var updatedBy: Int? = null
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
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        className = parcel.readString()
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        classEnrollStartDate = parcel.readString()
        classEnrollEndDate = parcel.readString()
        enrollmentStatus = parcel.readValue(Int::class.java.classLoader) as? Int
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        deletedDate = parcel.readString()
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
        updatedDate = parcel.readString()
        updatedBy = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(classesID)
        parcel.writeString(className)
        parcel.writeValue(studentID)
        parcel.writeString(classEnrollStartDate)
        parcel.writeString(classEnrollEndDate)
        parcel.writeValue(enrollmentStatus)
        parcel.writeValue(stringId)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeString(deletedDate)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
        parcel.writeString(updatedDate)
        parcel.writeValue(updatedBy)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<EnrolledClassesInformation> {
        override fun createFromParcel(parcel: Parcel): EnrolledClassesInformation {
            return EnrolledClassesInformation(parcel)
        }

        override fun newArray(size: Int): Array<EnrolledClassesInformation?> {
            return arrayOfNulls(size)
        }
    }
}
