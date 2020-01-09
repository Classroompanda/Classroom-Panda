package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class StudentAllergy() : Parcelable {

    @SerializedName("studentAllergiesID")
    var studentAllergiesID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("allergyReactionTypeID")
    var allergyReactionTypeID: Int? = null
    @SerializedName("allergyReactionTypeName")
    var allergyReactionTypeName: String? = null
    @SerializedName("allergyNameID")
    var allergyNameID: Int? = null
    @SerializedName("allergyName")
    var allergyName: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("allergyComment")
    var allergyComment: String? = null
    @SerializedName("firstAllergyObservation")
    var firstAllergyObservation: String? = null
    @SerializedName("lastAllergyObservation")
    var lastAllergyObservation: String? = null
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("allergyTypeID")
    var allergyTypeID: Int? = null
    @SerializedName("allergyTypeName")
    var allergyTypeName: String? = null
    @SerializedName("treatment")
    var treatment: String? = null
    @SerializedName("isActive")
    var isActive: Boolean? = null
    @SerializedName("isDeleted")
    var isDeleted: Boolean? = null
    @SerializedName("deletedBy")
    var deletedBy: Int? = null
    @SerializedName("deletedDate")
    var deletedDate: String? = null
    @SerializedName("createdBy")
    var createdBy: Int? = null
    @SerializedName("createdDate")
    var createdDate: String? = null
    @SerializedName("updatedDate")
    var updatedDate: String? = null
    @SerializedName("updatedBy")
    var updatedBy: Int? = null

    constructor(parcel: Parcel) : this() {
        studentAllergiesID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        allergyReactionTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        allergyReactionTypeName = parcel.readString()
        allergyNameID = parcel.readValue(Int::class.java.classLoader) as? Int
        allergyName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        allergyComment = parcel.readString()
        firstAllergyObservation = parcel.readString()
        lastAllergyObservation = parcel.readString()
        allergyTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        allergyTypeName = parcel.readString()
        treatment = parcel.readString()
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
        parcel.writeValue(studentAllergiesID)
        parcel.writeValue(studentID)
        parcel.writeValue(allergyReactionTypeID)
        parcel.writeString(allergyReactionTypeName)
        parcel.writeValue(allergyNameID)
        parcel.writeString(allergyName)
        parcel.writeValue(agencyID)
        parcel.writeString(allergyComment)
        parcel.writeString(firstAllergyObservation)
        parcel.writeString(lastAllergyObservation)
        parcel.writeValue(allergyTypeID)
        parcel.writeString(allergyTypeName)
        parcel.writeString(treatment)
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

    companion object CREATOR : Parcelable.Creator<StudentAllergy> {
        override fun createFromParcel(parcel: Parcel): StudentAllergy {
            return StudentAllergy(parcel)
        }

        override fun newArray(size: Int): Array<StudentAllergy?> {
            return arrayOfNulls(size)
        }
    }
}
