package com.daycare.daycareteacher.model

import com.google.gson.annotations.SerializedName

class StudentMedication {
    @SerializedName("studentMedicationID")
     val studentMedicationID: Int? = null
    @SerializedName("studentID")
     val studentID: Int? = null
    @SerializedName("medicationName")
     val medicationName: String? = null
    @SerializedName("agencyID")
     val agencyID: Int? = null
    @SerializedName("units")
     val units: String? = null
    @SerializedName("strength")
     val strength: String? = null
    @SerializedName("doses")
     val doses: String? = null
    @SerializedName("howTaken")
     val howTaken: Any? = null
    @SerializedName("otherMedication")
     val otherMedication: Any? = null
    @SerializedName("startDate")
     val startDate: String? = null
    @SerializedName("endDate")
     val endDate: String? = null
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
}
