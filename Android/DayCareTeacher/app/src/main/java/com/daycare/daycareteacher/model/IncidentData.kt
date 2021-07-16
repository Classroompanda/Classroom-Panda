package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.daycare.daycareteacher.utill.AppInstance
import com.google.gson.annotations.SerializedName


class IncidentData() : Parcelable {
    @SerializedName("id")
    var id: Int? = null

    @SerializedName("incidentDate")
    var incidentDate: String? = null

    @SerializedName("incidentTime")
    var incidentTime: String? = null

    @SerializedName("description")
    var description: String? = null

    @SerializedName("actionTaken")
    var actionTaken: String? = null

    @SerializedName("partOfBody")
    var partOfBody: String? = null

    @SerializedName("contextEnviroment")
    var contextEnviroment: String? = null

    @SerializedName("contextChild")
    var contextChild: String? = null


    @SerializedName("parentComment")
    var parentComment: String? = null

    @SerializedName("isAcknowledge")
    var isAcknowledge: Boolean? = null

    @SerializedName("isEmergency")
    var isEmergency: Boolean? = null

    @SerializedName("isGeneric")
    var isGeneric: Boolean? = null

    @SerializedName("studentID")
    var studentID: Int? = null

    @SerializedName("studentName")
    var studentName: String? = null

    /*fun setStudent(){
     studentName =   AppInstance.studentsSelected
    }*/

    @SerializedName("teacherID")
    var teacherID: Int? = null

    @SerializedName("teacherName")
    var teacherName: String? = null

    @SerializedName("incidentPriortyTypeID")
    var incidentPriortyTypeID: Int? = null

    @SerializedName("incidentPriortyTypeName")
    var incidentPriortyTypeName: String? = null

    @SerializedName("agencyID")
    var agencyID: Int? = null

    @SerializedName("classesID")
    var classesID: Int? = null

    @SerializedName("className")
    var className: String? = null

    @SerializedName("placeOfIncident")
    var placeOfIncident: String? = null

    @SerializedName("natureOfInjuryID")
    var natureOfInjuryID: Int? = null

    @SerializedName("natureOfInjuryName")
    var natureOfInjuryName: Any? = null

    @SerializedName("firstAidAdministeredID")
    var firstAidAdministeredID: Int? = null

    @SerializedName("firstAidAdministeredName")
    var firstAidAdministeredName: Any? = null

    @SerializedName("isDoctorRequired")
    var isDoctorRequired: Boolean? = null

    @SerializedName("wasParentInformed")
    var wasParentInformed: Boolean? = null

    @SerializedName("parentInformedBy")
    var parentInformedBy: String? = null

    @SerializedName("incidentInvolvments")
    var incidentInvolvments: List<IncidentInvolvment>? = null

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
        incidentDate = parcel.readString()
        incidentTime = parcel.readString()
        description = parcel.readString()
        actionTaken = parcel.readString()
        partOfBody = parcel.readString()
        contextEnviroment = parcel.readString()
        contextChild = parcel.readString()
        isEmergency = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isGeneric = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentName = parcel.readString()
        teacherID = parcel.readValue(Int::class.java.classLoader) as? Int
        teacherName = parcel.readString()
        incidentPriortyTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        incidentPriortyTypeName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        classesID = parcel.readValue(Int::class.java.classLoader) as? Int
        className = parcel.readString()
        placeOfIncident = parcel.readString()
        natureOfInjuryID = parcel.readValue(Int::class.java.classLoader) as? Int
        firstAidAdministeredID = parcel.readValue(Int::class.java.classLoader) as? Int
        isDoctorRequired = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        wasParentInformed = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        parentInformedBy = parcel.readString()
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
        parcel.writeString(incidentDate)
        parcel.writeString(incidentTime)
        parcel.writeString(description)
        parcel.writeString(actionTaken)
        parcel.writeString(partOfBody)
        parcel.writeString(contextEnviroment)
        parcel.writeString(contextChild)

        parcel.writeValue(isEmergency)
        parcel.writeValue(isGeneric)
        parcel.writeValue(studentID)
        parcel.writeString(studentName)
        parcel.writeValue(teacherID)
        parcel.writeString(teacherName)
        parcel.writeValue(incidentPriortyTypeID)
        parcel.writeString(incidentPriortyTypeName)
        parcel.writeValue(agencyID)
        parcel.writeValue(classesID)
        parcel.writeString(className)
        parcel.writeString(placeOfIncident)
        parcel.writeValue(natureOfInjuryID)
        parcel.writeValue(firstAidAdministeredID)
        parcel.writeValue(isDoctorRequired)
        parcel.writeValue(wasParentInformed)
        parcel.writeString(parentInformedBy)
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

    companion object CREATOR : Parcelable.Creator<IncidentData> {
        override fun createFromParcel(parcel: Parcel): IncidentData {
            return IncidentData(parcel)
        }

        override fun newArray(size: Int): Array<IncidentData?> {
            return arrayOfNulls(size)
        }
    }
}