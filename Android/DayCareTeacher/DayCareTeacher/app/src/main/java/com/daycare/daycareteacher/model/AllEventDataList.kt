package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

class AllEventDataList() : Parcelable {

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
    @SerializedName("mon")
    var mon: Boolean? = null
    @SerializedName("tue")
    var tue: Boolean? = null
    @SerializedName("wed")
    var wed: Boolean? = null
    @SerializedName("thu")
    var thu: Boolean? = null
    @SerializedName("fri")
    var fri: Boolean? = null
    @SerializedName("sat")
    var sat: Boolean? = null
    @SerializedName("sun")
    var sun: Boolean? = null
    @SerializedName("selectedWeekDay")
    var selectedWeekDay: Any? = null
    @SerializedName("rangeOfDate")
    var rangeOfDate: Int? = null
    @SerializedName("involvedEventClassesList")
    var involvedEventClassesList: List<InvolvedEventClassesList>? = null
    @SerializedName("deletedFromIP")
    var deletedFromIP: Any? = null
    @SerializedName("createdFromIP")
    var createdFromIP: Any? = null
    @SerializedName("updatedFromIP")
    var updatedFromIP: Any? = null
    @SerializedName("stringId")
    var stringId: Any? = null
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
    var className: String? = ""

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        plannerRepeatTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        plannerRepeatTypeName = parcel.readString()
        title = parcel.readString()
        start = parcel.readString()
        end = parcel.readString()
        startTime = parcel.readString()
        endTime = parcel.readString()
        endsOn = parcel.readString()
        description = parcel.readString()
        mon = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        tue = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        wed = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        thu = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        fri = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        sat = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        sun = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        rangeOfDate = parcel.readValue(Int::class.java.classLoader) as? Int
        involvedEventClassesList = parcel.createTypedArrayList(InvolvedEventClassesList)
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        deletedDate = parcel.readString()
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
        updatedDate = parcel.readString()
        updatedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        className = parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(plannerRepeatTypeID)
        parcel.writeString(plannerRepeatTypeName)
        parcel.writeString(title)
        parcel.writeString(start)
        parcel.writeString(end)
        parcel.writeString(startTime)
        parcel.writeString(endTime)
        parcel.writeString(endsOn)
        parcel.writeString(description)
        parcel.writeValue(mon)
        parcel.writeValue(tue)
        parcel.writeValue(wed)
        parcel.writeValue(thu)
        parcel.writeValue(fri)
        parcel.writeValue(sat)
        parcel.writeValue(sun)
        parcel.writeValue(rangeOfDate)
        parcel.writeTypedList(involvedEventClassesList)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeString(deletedDate)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
        parcel.writeString(updatedDate)
        parcel.writeValue(updatedBy)
        parcel.writeString(className)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<AllEventDataList> {
        override fun createFromParcel(parcel: Parcel): AllEventDataList {
            return AllEventDataList(parcel)
        }

        override fun newArray(size: Int): Array<AllEventDataList?> {
            return arrayOfNulls(size)
        }
    }
}

class InvolvedEventClassesList() : Parcelable {
    @SerializedName("id")
    var id: Int? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("eventPlannerID")
    var eventPlannerID: Int? = null
    @SerializedName("classesID")
    var classesID: Int? = null
    @SerializedName("className")
    var className: String? = null
    var eventID: Int? = null

    constructor(parcel: Parcel) : this() {
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        eventPlannerID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        className = parcel.readString()
        eventID = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(id)
        parcel.writeValue(agencyID)
        parcel.writeValue(eventPlannerID)
        parcel.writeValue(classesID)
        parcel.writeString(className)
        parcel.writeValue(eventID)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<InvolvedEventClassesList> {
        override fun createFromParcel(parcel: Parcel): InvolvedEventClassesList {
            return InvolvedEventClassesList(parcel)
        }

        override fun newArray(size: Int): Array<InvolvedEventClassesList?> {
            return arrayOfNulls(size)
        }
    }

}