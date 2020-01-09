package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose



open class StudentData() :Parcelable {
    @SerializedName("studentId")
     var studentId: Int? = null
    @SerializedName("studentName")
    var studentName: String? = null
    @SerializedName("classId")
    var classId: Int? = null
    @SerializedName("className")
    var className: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("parentID")
     var parentID: Int? = null
    @SerializedName("parentName")
     var parentName: String? = null
    @SerializedName("firstName")
     var firstName: String? = null
    @SerializedName("lastName")
     var lastName: String? = null
    @SerializedName("genderID")
     var genderID: Int? = null
    @SerializedName("genderName")
     var genderName: String? = null
    @SerializedName("imagePath")
     var imagePath: String? = null
    @SerializedName("address")
     var address: String? = null
    @SerializedName("countryId")
     var countryId: Int? = null
    @SerializedName("countryName")
     var countryName: String? = null
    @SerializedName("stateId")
     var stateId: Int? = null
    @SerializedName("stateName")
     var stateName: String? = null
    @SerializedName("cityId")
     var cityId: Int? = null
    @SerializedName("cityName")
     var cityName: String? = null
    @SerializedName("postalCode")
     var postalCode: String? = null
    @SerializedName("schoolName")
     var schoolName: String? = null
    @SerializedName("transportationID")
     var transportationID: Int? = null
    @SerializedName("transportationTypeName")
     var transportationTypeName: String? = null
    @SerializedName("dateOfBirth")
     var dateOfBirth: String? = null
    @SerializedName("feePaymentTypeID")
     var feePaymentTypeID: Int? = null
    @SerializedName("feePaymentTypeName")
     var feePaymentTypeName: String? = null
    @SerializedName("insuranceCarrier")
     var insuranceCarrier: String? = null
    @SerializedName("insurancePolicyNumber")
     var insurancePolicyNumber: String? = null
    @SerializedName("guardians")
     var guardians: ArrayList<GuardianData>? = ArrayList()
    @SerializedName("studentImmunizations")
    @Expose
   var studentImmunizations: ArrayList<StudentImmunization>? = ArrayList()
    @SerializedName("studentAllergies")
    @Expose
   var studentAllergies: ArrayList<StudentAllergy>? = ArrayList()
    @SerializedName("studentMedications")
    @Expose
   var studentMedications: ArrayList<StudentMedication>? = ArrayList()
    @SerializedName("studentDisabilities")
    @Expose
   var studentDisabilities: ArrayList<StudentDisability>? = ArrayList()
    @SerializedName("paymentCalculations")
    @Expose
    var paymentCalculations: ArrayList<PaymentCalculation>? = null
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
        studentId = parcel.readValue(Int::class.java.classLoader) as? Int
        studentName = parcel.readString()
        classId = parcel.readValue(Int::class.java.classLoader) as? Int
        className = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentName = parcel.readString()
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
        guardians = parcel.createTypedArrayList(GuardianData)
        studentImmunizations = parcel.createTypedArrayList(StudentImmunization)
        studentAllergies = parcel.createTypedArrayList(StudentAllergy)
        studentMedications = parcel.createTypedArrayList(StudentMedication)
        studentDisabilities = parcel.createTypedArrayList(StudentDisability)
        paymentCalculations = parcel.createTypedArrayList(PaymentCalculation)
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
        parcel.writeValue(studentId)
        parcel.writeString(studentName)
        parcel.writeValue(classId)
        parcel.writeString(className)
        parcel.writeValue(agencyID)
        parcel.writeValue(parentID)
        parcel.writeString(parentName)
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
        parcel.writeTypedList(guardians)
        parcel.writeTypedList(studentImmunizations)
        parcel.writeTypedList(studentAllergies)
        parcel.writeTypedList(studentMedications)
        parcel.writeTypedList(studentDisabilities)
        parcel.writeTypedList(paymentCalculations)
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

    companion object CREATOR : Parcelable.Creator<StudentData> {
        override fun createFromParcel(parcel: Parcel): StudentData {
            return StudentData(parcel)
        }

        override fun newArray(size: Int): Array<StudentData?> {
            return arrayOfNulls(size)
        }
    }


}


class PaymentCalculation() :Parcelable {
    @SerializedName("totalHoursAttended")
    @Expose
    var totalHoursAttended: Int? = null
    @SerializedName("totalFees")
    @Expose
    var totalFees: Int? = null
    @SerializedName("feeToBePaid")
    @Expose
    var feeToBePaid: Int? = null
    @SerializedName("balanceFees")
    @Expose
    var balanceFees: Int? = null

    constructor(parcel: Parcel) : this() {
        totalHoursAttended = parcel.readValue(Int::class.java.classLoader) as? Int
        totalFees = parcel.readValue(Int::class.java.classLoader) as? Int
        feeToBePaid = parcel.readValue(Int::class.java.classLoader) as? Int
        balanceFees = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(totalHoursAttended)
        parcel.writeValue(totalFees)
        parcel.writeValue(feeToBePaid)
        parcel.writeValue(balanceFees)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<PaymentCalculation> {
        override fun createFromParcel(parcel: Parcel): PaymentCalculation {
            return PaymentCalculation(parcel)
        }

        override fun newArray(size: Int): Array<PaymentCalculation?> {
            return arrayOfNulls(size)
        }
    }
}






