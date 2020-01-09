package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class EventDataSave() : Parcelable {
    @SerializedName("id")
    var id: Int? = null

    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("plannerRepeatTypeID")
     var plannerRepeatTypeID: Int? = null
    @SerializedName("plannerRepeatTypeName")
     var plannerRepeatTypeName: String? = null
    @SerializedName("title")
     var title: String? = null
    @SerializedName("start")
     var start: String? = null
    @SerializedName("end")
     var end: String? = null
    @SerializedName("startTime")
     var startTime: String? = null
    @SerializedName("endTime")
     var endTime: String? = null
    @SerializedName("endsOn")
     var endsOn: String? = null
    @SerializedName("description")
     var description: String? = null


    @SerializedName("involvedEventClassesList")
    var involvedEventClassesList: List<InvolvedEventClasses>? = null



    @SerializedName("stringId")
    var stringId: Int? = null
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

    var reporter: Int? = null

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        start = parcel.readString()
        end = parcel.readString()
        startTime=parcel.readString()
        endTime=parcel.readString()
        endsOn=parcel.readString()
        title=parcel.readString()
        description = parcel.readString()

        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int

    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeString(start)
        parcel.writeString(end)
        parcel.writeString(description)
        parcel.writeString(startTime)
        parcel.writeValue(agencyID)
        parcel.writeString(endTime)
        parcel.writeString(title)
        parcel.writeValue(endsOn)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<EventDataSave> {
        override fun createFromParcel(parcel: Parcel): EventDataSave {
            return EventDataSave(parcel)
        }

        override fun newArray(size: Int): Array<EventDataSave?> {
            return arrayOfNulls(size)
        }
    }
}
