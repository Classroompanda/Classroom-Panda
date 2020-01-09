package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class StudentImmunization() :Parcelable {
    @SerializedName("studentImmunizationID")
    @Expose
   var studentImmunizationID: Int? = null
    @SerializedName("studentID")
    @Expose
   var studentID: Int? = null
    @SerializedName("immunizationID")
    @Expose
   var immunizationID: Int? = null
    @SerializedName("immunizationName")
    @Expose
   var immunizationName: String? = null
    @SerializedName("agencyID")
    @Expose
   var agencyID: Int? = null
    @SerializedName("otherImmunization")
    @Expose
   var otherImmunization: String? = null
    @SerializedName("abbreviation")
    @Expose
   var abbreviation: String? = null
    @SerializedName("dateReceived")
    @Expose
   var dateReceived: String? = null
    @SerializedName("id")
    @Expose
   var id: Int? = null
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
        studentImmunizationID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        immunizationID = parcel.readValue(Int::class.java.classLoader) as? Int
        immunizationName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        otherImmunization = parcel.readString()
        abbreviation = parcel.readString()
        dateReceived = parcel.readString()
        id = parcel.readValue(Int::class.java.classLoader) as? Int
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
        parcel.writeValue(studentImmunizationID)
        parcel.writeValue(studentID)
        parcel.writeValue(immunizationID)
        parcel.writeString(immunizationName)
        parcel.writeValue(agencyID)
        parcel.writeString(otherImmunization)
        parcel.writeString(abbreviation)
        parcel.writeString(dateReceived)
        parcel.writeValue(id)
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

    companion object CREATOR : Parcelable.Creator<StudentImmunization> {
        override fun createFromParcel(parcel: Parcel): StudentImmunization {
            return StudentImmunization(parcel)
        }

        override fun newArray(size: Int): Array<StudentImmunization?> {
            return arrayOfNulls(size)
        }
    }

}