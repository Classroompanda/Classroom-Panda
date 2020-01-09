package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class IncidentInvolvment():Parcelable {
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("className")
     val className: String? = null
    @SerializedName("incidentID")
    var incidentID: Int? = null
    @SerializedName("stringId")
     val stringId: Int? = null
    @SerializedName("isActive")
     val isActive: Boolean? = null
    @SerializedName("isDeleted")
     val isDeleted: Boolean? = null
    @SerializedName("deletedBy")
     val deletedBy: Int? = null
    @SerializedName("deletedDate")
     val deletedDate: String? = null
    @SerializedName("createdBy")
     val createdBy: Int? = null
    @SerializedName("createdDate")
     val createdDate: String? = null
    @SerializedName("updatedDate")
     val updatedDate: String? = null
    @SerializedName("updatedBy")
     val updatedBy: Int? = null

    constructor(parcel: Parcel) : this() {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {

    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<IncidentInvolvment> {
        override fun createFromParcel(parcel: Parcel): IncidentInvolvment {
            return IncidentInvolvment(parcel)
        }

        override fun newArray(size: Int): Array<IncidentInvolvment?> {
            return arrayOfNulls(size)
        }
    }
}