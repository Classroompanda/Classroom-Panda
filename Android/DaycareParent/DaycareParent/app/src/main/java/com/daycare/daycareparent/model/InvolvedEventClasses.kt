package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class InvolvedEventClasses(): Parcelable {
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null




    @SerializedName("classesID")
    var classesID: Int? = null


    @SerializedName("className")
    val className: String? = null
    @SerializedName("eventID")
    var eventID: Int? = null




    constructor(parcel: Parcel) : this() {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {

    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<InvolvedEventClasses> {
        override fun createFromParcel(parcel: Parcel): InvolvedEventClasses {
            return InvolvedEventClasses(parcel)
        }

        override fun newArray(size: Int): Array<InvolvedEventClasses?> {
            return arrayOfNulls(size)
        }
    }
}