package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose


class StudentMedication() : Parcelable {

    @SerializedName("studentMedicationID")
    var studentMedicationID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("medicationName")
    var medicationName: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("units")
    var units: String? = null
    @SerializedName("strength")
    var strength: String? = null
    @SerializedName("doses")
    var doses: String? = null
    @SerializedName("howTaken")
    var howTaken: String? = null
    @SerializedName("otherMedication")
    var otherMedication: String? = null
    @SerializedName("startDate")
    var startDate: String? = null
    @SerializedName("endDate")
    var endDate: String? = null
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
    @SerializedName("dosageQuantityID")
    @Expose
    var dosageQuantityID: Int? = null
    @SerializedName("doseRepeatID")
    @Expose
    var doseRepeatID: Int? = null
    @SerializedName("dosageQuantityName")
    @Expose
    var dosageQuantityName: String? = null
    @SerializedName("doseRepeatName")
    @Expose
    var doseRepeatName: String? = null
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
        studentMedicationID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        medicationName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        units = parcel.readString()
        strength = parcel.readString()
        doses = parcel.readString()
        howTaken = parcel.readString()
        otherMedication = parcel.readString()
        startDate = parcel.readString()
        endDate = parcel.readString()
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        deletedDate = parcel.readString()
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
        updatedDate = parcel.readString()
        updatedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        dosageQuantityID = parcel.readValue(Int::class.java.classLoader) as? Int
        doseRepeatID = parcel.readValue(Int::class.java.classLoader) as? Int
        dosageQuantityName = parcel.readString()
        doseRepeatName = parcel.readString()
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(studentMedicationID)
        parcel.writeValue(studentID)
        parcel.writeString(medicationName)
        parcel.writeValue(agencyID)
        parcel.writeString(units)
        parcel.writeString(strength)
        parcel.writeString(doses)
        parcel.writeString(howTaken)
        parcel.writeString(otherMedication)
        parcel.writeString(startDate)
        parcel.writeString(endDate)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeString(deletedDate)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
        parcel.writeString(updatedDate)
        parcel.writeValue(updatedBy)
        parcel.writeValue(dosageQuantityID)
        parcel.writeValue(doseRepeatID)
        parcel.writeString(dosageQuantityName)
        parcel.writeString(doseRepeatName)
        parcel.writeValue(id)
        parcel.writeValue(stringId)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<StudentMedication> {
        override fun createFromParcel(parcel: Parcel): StudentMedication {
            return StudentMedication(parcel)
        }

        override fun newArray(size: Int): Array<StudentMedication?> {
            return arrayOfNulls(size)
        }
    }


}
