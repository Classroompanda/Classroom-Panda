package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class AllParentChilds : BaseModel() {
    @SerializedName("data")
    @Expose
    var data: List<ParentChild>? = null
}

class ParentChild() : Parcelable {
    @SerializedName("studentId")
    @Expose
    var studentId: Int? = null
    @SerializedName("studentName")
    @Expose
    var studentName: String? = null
    @SerializedName("classId")
    @Expose
    var classId: Int? = null
    @SerializedName("className")
    @Expose
    var className: Any? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("parentID")
    @Expose
    var parentID: Int? = null
    @SerializedName("parentName")
    @Expose
    var parentName: String? = null
    @SerializedName("parentEmailAddress")
    @Expose
    var parentEmailAddress: Any? = null
    @SerializedName("parentContactNumber")
    @Expose
    var parentContactNumber: Int? = null
    @SerializedName("firstName")
    @Expose
    var firstName: String? = null
    @SerializedName("lastName")
    @Expose
    var lastName: String? = null
    @SerializedName("genderID")
    @Expose
    var genderID: Int? = null
    @SerializedName("genderName")
    @Expose
    var genderName: String? = null
    @SerializedName("imagePath")
    @Expose
    var imagePath: String? = null
    @SerializedName("address")
    @Expose
    var address: String? = null
    @SerializedName("countryId")
    @Expose
    var countryId: Int? = null
    @SerializedName("countryName")
    @Expose
    var countryName: String? = null
    @SerializedName("stateId")
    @Expose
    var stateId: Int? = null
    @SerializedName("stateName")
    @Expose
    var stateName: String? = null
    @SerializedName("cityId")
    @Expose
    var cityId: Int? = null
    @SerializedName("cityName")
    @Expose
    var cityName: String? = null
    @SerializedName("postalCode")
    @Expose
    var postalCode: String? = null
    @SerializedName("schoolName")
    @Expose
    var schoolName: String? = null
    @SerializedName("transportationID")
    @Expose
    var transportationID: Int? = null
    @SerializedName("transportationTypeName")
    @Expose
    var transportationTypeName: String? = null
    @SerializedName("dateOfBirth")
    @Expose
    var dateOfBirth: String? = null
    @SerializedName("feePaymentTypeID")
    @Expose
    var feePaymentTypeID: Int? = null
    @SerializedName("feePaymentTypeName")
    @Expose
    var feePaymentTypeName: String? = null
    @SerializedName("insuranceCarrier")
    @Expose
    var insuranceCarrier: String? = null
    @SerializedName("insurancePolicyNumber")
    @Expose
    var insurancePolicyNumber: String? = null
    @SerializedName("registeredDate")
    @Expose
    var registeredDate: String? = null
    @SerializedName("childsAddress")
    @Expose
    var childsAddress: String? = null
    @SerializedName("physicianName")
    @Expose
    var physicianName: String? = null
    @SerializedName("preferredHospital")
    @Expose
    var preferredHospital: String? = null
    @SerializedName("childsContactNumber")
    @Expose
    var childsContactNumber: String? = null
    @SerializedName("physicianContactNumber")
    @Expose
    var physicianContactNumber: String? = null

    @SerializedName("guardians")
    @Expose
    var guardians: Any? = null
    @SerializedName("studentImmunizations")
    @Expose
    var studentImmunizations: Any? = null
    @SerializedName("studentAllergies")
    @Expose
    var studentAllergies: Any? = null
    @SerializedName("studentMedications")
    @Expose
    var studentMedications: Any? = null
    @SerializedName("studentDisabilities")
    @Expose
    var studentDisabilities: Any? = null
    @SerializedName("enrolledClassesInformation")
    @Expose
    var enrolledClassesInformation: List<EnrolledClassesInformation>? = ArrayList()
    @SerializedName("paymentCalculations")
    @Expose
    var paymentCalculations: List<PaymentCalculation>? = null
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
    var deletedDate: Any? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: Any? = null
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
        studentId = parcel.readValue(Int::class.java.classLoader) as? Int
        studentName = parcel.readString()
        classId = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentName = parcel.readString()
        parentContactNumber = parcel.readValue(Int::class.java.classLoader) as? Int
        firstName = parcel.readString()
        lastName = parcel.readString()
        genderID = parcel.readValue(Int::class.java.classLoader) as? Int
        genderName = parcel.readString()
        imagePath = parcel.readString()
        address = parcel.readString()
        countryId = parcel.readValue(Int::class.java.classLoader) as? Int
        countryName = parcel.readString()
        stateId = parcel.readValue(Int::class.java.classLoader) as? Int
        stateName = parcel.readString()
        cityId = parcel.readValue(Int::class.java.classLoader) as? Int
        cityName = parcel.readString()
        postalCode = parcel.readString()
        schoolName = parcel.readString()
        transportationID = parcel.readValue(Int::class.java.classLoader) as? Int
        transportationTypeName = parcel.readString()
        dateOfBirth = parcel.readString()
        feePaymentTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        feePaymentTypeName = parcel.readString()
        insuranceCarrier = parcel.readString()
        insurancePolicyNumber = parcel.readString()
        registeredDate = parcel.readString()
        childsAddress = parcel.readString()
        physicianName = parcel.readString()
        preferredHospital = parcel.readString()
        childsContactNumber = parcel.readString()
        physicianContactNumber = parcel.readString()
        enrolledClassesInformation = parcel.createTypedArrayList(EnrolledClassesInformation)
        paymentCalculations = parcel.createTypedArrayList(PaymentCalculation)
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
        updatedBy = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(studentId)
        parcel.writeString(studentName)
        parcel.writeValue(classId)
        parcel.writeValue(agencyID)
        parcel.writeValue(parentID)
        parcel.writeString(parentName)
        parcel.writeValue(parentContactNumber)
        parcel.writeString(firstName)
        parcel.writeString(lastName)
        parcel.writeValue(genderID)
        parcel.writeString(genderName)
        parcel.writeString(imagePath)
        parcel.writeString(address)
        parcel.writeValue(countryId)
        parcel.writeString(countryName)
        parcel.writeValue(stateId)
        parcel.writeString(stateName)
        parcel.writeValue(cityId)
        parcel.writeString(cityName)
        parcel.writeString(postalCode)
        parcel.writeString(schoolName)
        parcel.writeValue(transportationID)
        parcel.writeString(transportationTypeName)
        parcel.writeString(dateOfBirth)
        parcel.writeValue(feePaymentTypeID)
        parcel.writeString(feePaymentTypeName)
        parcel.writeString(insuranceCarrier)
        parcel.writeString(insurancePolicyNumber)
        parcel.writeString(registeredDate)
        parcel.writeString(childsAddress)
        parcel.writeString(physicianName)
        parcel.writeString(preferredHospital)
        parcel.writeString(childsContactNumber)
        parcel.writeString(physicianContactNumber)
        parcel.writeTypedList(enrolledClassesInformation)
        parcel.writeTypedList(paymentCalculations)
        parcel.writeValue(id)
        parcel.writeValue(stringId)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
        parcel.writeValue(updatedBy)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ParentChild> {
        override fun createFromParcel(parcel: Parcel): ParentChild {
            return ParentChild(parcel)
        }

        override fun newArray(size: Int): Array<ParentChild?> {
            return arrayOfNulls(size)
        }
    }


}
