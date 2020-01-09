package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

class GuardianData() : BaseModel(), Parcelable {
    @SerializedName("guardianId")
    var guardianId: Int? = null
    @SerializedName("guardianName")
    var guardianName: String? = null
    @SerializedName("agencyID")
    var agencyID: Int? = null
    @SerializedName("userID")
    var userID: Int? = null
    @SerializedName("relationTypeId")
    var relationTypeId: Int? = null
    @SerializedName("relationTypeName")
    var relationTypeName: String? = null
    @SerializedName("studentID")
    var studentID: Int? = null
    @SerializedName("firstName")
    var firstName: String? = null
    @SerializedName("lastName")
    var lastName: String? = null
    @SerializedName("address")
    var address: String? = null
    @SerializedName("countryId")
    var countryId: Int? = null
    @SerializedName("stateId")
    var stateId: Int? = null
    @SerializedName("cityId")
    var cityId: Int? = null
    @SerializedName("postalCode")
    var postalCode: String? = null
    @SerializedName("pinNumber")
    var pinNumber: Int? = null
    @SerializedName("isAuthorizedToPickup")
    var isAuthorizedToPickup: Boolean? = null
    @SerializedName("reasonNotToAllow")
    var reasonNotToAllow: String? = null
    @SerializedName("emailId")
    var emailId: String? = null
    @SerializedName("imagePath")
    var imagePath: String? = null
    @SerializedName("securityKey")
    var securityKey: Int? = null
    @SerializedName("mobile")
    var mobile: String? = null
    @SerializedName("failedLoginAttemptCount")
    var failedLoginAttemptCount: Int? = null
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
    @SerializedName("dateOfBirth")
    @Expose
    var dateOfBirth: String? = null
    @SerializedName("profession")
    @Expose
    var profession: String? = null
    @SerializedName("genderID")
    @Expose
    var genderID: Int? = null

    constructor(parcel: Parcel) : this() {
        guardianId = parcel.readValue(Int::class.java.classLoader) as? Int
        guardianName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        userID = parcel.readValue(Int::class.java.classLoader) as? Int
        relationTypeId = parcel.readValue(Int::class.java.classLoader) as? Int
        relationTypeName = parcel.readString()
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        firstName = parcel.readString()
        lastName = parcel.readString()
        address = parcel.readString()
        countryId = parcel.readValue(Int::class.java.classLoader) as? Int
        stateId = parcel.readValue(Int::class.java.classLoader) as? Int
        cityId = parcel.readValue(Int::class.java.classLoader) as? Int
        postalCode = parcel.readString()
        pinNumber = parcel.readValue(Int::class.java.classLoader) as? Int
        isAuthorizedToPickup = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        reasonNotToAllow = parcel.readString()
        emailId = parcel.readString()
        imagePath = parcel.readString()
        securityKey = parcel.readValue(Int::class.java.classLoader) as? Int
        mobile = parcel.readString()
        failedLoginAttemptCount = parcel.readValue(Int::class.java.classLoader) as? Int
        isActive = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isDeleted = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        deletedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        deletedDate = parcel.readString()
        createdBy = parcel.readValue(Int::class.java.classLoader) as? Int
        createdDate = parcel.readString()
        updatedDate = parcel.readString()
        updatedBy = parcel.readValue(Int::class.java.classLoader) as? Int
        dateOfBirth = parcel.readString()
        profession = parcel.readString()
        genderID = parcel.readValue(Int::class.java.classLoader) as? Int
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(guardianId)
        parcel.writeString(guardianName)
        parcel.writeValue(agencyID)
        parcel.writeValue(userID)
        parcel.writeValue(relationTypeId)
        parcel.writeString(relationTypeName)
        parcel.writeValue(studentID)
        parcel.writeString(firstName)
        parcel.writeString(lastName)
        parcel.writeString(address)
        parcel.writeValue(countryId)
        parcel.writeValue(stateId)
        parcel.writeValue(cityId)
        parcel.writeString(postalCode)
        parcel.writeValue(pinNumber)
        parcel.writeValue(isAuthorizedToPickup)
        parcel.writeString(reasonNotToAllow)
        parcel.writeString(emailId)
        parcel.writeString(imagePath)
        parcel.writeValue(securityKey)
        parcel.writeString(mobile)
        parcel.writeValue(failedLoginAttemptCount)
        parcel.writeValue(isActive)
        parcel.writeValue(isDeleted)
        parcel.writeValue(deletedBy)
        parcel.writeString(deletedDate)
        parcel.writeValue(createdBy)
        parcel.writeString(createdDate)
        parcel.writeString(updatedDate)
        parcel.writeValue(updatedBy)
        parcel.writeString(dateOfBirth)
        parcel.writeString(profession)
        parcel.writeValue(genderID)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<GuardianData> {
        override fun createFromParcel(parcel: Parcel): GuardianData {
            return GuardianData(parcel)
        }

        override fun newArray(size: Int): Array<GuardianData?> {
            return arrayOfNulls(size)
        }
    }


}