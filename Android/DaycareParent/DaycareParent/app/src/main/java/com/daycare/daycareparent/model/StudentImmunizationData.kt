package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class StudentImmunizationData {
    @SerializedName("studentImmunizationID")
     var studentImmunizationID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null
    @SerializedName("immunizationID")
     var immunizationID: Int? = null
    @SerializedName("immunizationName")
     var immunizationName: String? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("otherImmunization")
     var otherImmunization: String? = null
    @SerializedName("abbreviation")
     var abbreviation: String? = null
    @SerializedName("dateReceived")
     var dateReceived: String? = null
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
}