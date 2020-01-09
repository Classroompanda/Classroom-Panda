package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class ParentModel : BaseModel() {

    @SerializedName("data")
    @Expose
    var data: ParentData? = null
}
class GuardianListModel : BaseModel() {

    @SerializedName("data")
    @Expose
    var data: ArrayList<ParentData>? = null
}
class ParentData() :Parcelable {
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("parentName")
    @Expose
    var parentName: String? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
//    For Request
    @SerializedName("parentID")
    @Expose
    var parentID: Int? = null
    @SerializedName("userID")
    @Expose
    var userID: Int? = null
    @SerializedName("relationTypeId")
    @Expose
    var relationTypeId: Int? = null
    @SerializedName("firstName")
    @Expose
    var firstName: String? = null
    @SerializedName("lastName")
    @Expose
    var lastName: String? = null
    @SerializedName("address")
    @Expose
    var address: String? = null
    @SerializedName("countryId")
    @Expose
    var countryId: Int? = null
    @SerializedName("stateId")
    @Expose
    var stateId: Int? = null
    @SerializedName("cityId")
    @Expose
    var cityId: Int? = null
    @SerializedName("postalCode")
    @Expose
    var postalCode: String? = null


    @SerializedName("employerNumber")
    @Expose
    var employerNumber: Long? = 0


    @SerializedName("employerName")
    @Expose
    var employerName: String? = null


    @SerializedName("pinNumber")
    @Expose
    var pinNumber: Int? = null
    @SerializedName("securityQuestionId")
    @Expose
    var securityQuestionId: Int? = null
    @SerializedName("securityQuestionAnswer")
    @Expose
    var securityQuestionAnswer: Any? = null
    @SerializedName("emailId")
    @Expose
    var emailId: String? = null
    @SerializedName("imagePath")
    @Expose
    var imagePath: String? = null
    @SerializedName("securityKey")
    @Expose
    var securityKey: Int? = null
    @SerializedName("mobile")
    @Expose
    var mobile: String? = null
    @SerializedName("failedLoginAttemptCount")
    @Expose
    var failedLoginAttemptCount: Int? = null
    @SerializedName("genderID")
    @Expose
    var genderID: Int? = null
    @SerializedName("genderName")
    @Expose
    var genderName: String? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
    @SerializedName("dateOfBirth")
    @Expose
    var dateOfBirth: String? = null
    @SerializedName("profession")
    @Expose
    var profession: String? = null
    @SerializedName("apartment")
    @Expose
    var apartment: Any? = null
    @SerializedName("isParent")
    @Expose
    var isParent: Boolean? = null
    @SerializedName("isSecondaryParent")
    @Expose
    var isSecondaryParent: Boolean? = null
    @SerializedName("isGaurdian")
    @Expose
    var isGaurdian: Boolean? = null
    @SerializedName("addedByID")
    @Expose
    var addedByID: Int? = null
    @SerializedName("isAuthorizedToPickup")
    @Expose
    var isAuthorizedToPickup: Boolean? = null
    @SerializedName("reasonNotToAllow")
    @Expose
    var reasonNotToAllow: String? = null
    @SerializedName("associatedChild")
    @Expose
    var associatedChild: ArrayList<AssociatedChild>? = ArrayList()
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
    var deletedDate: String? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: String? = null
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
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        parentName = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentID = parcel.readValue(Int::class.java.classLoader) as? Int
        userID = parcel.readValue(Int::class.java.classLoader) as? Int
        relationTypeId = parcel.readValue(Int::class.java.classLoader) as? Int
        firstName = parcel.readString()
        lastName = parcel.readString()
        address = parcel.readString()
        countryId = parcel.readValue(Int::class.java.classLoader) as? Int
        stateId = parcel.readValue(Int::class.java.classLoader) as? Int
        cityId = parcel.readValue(Int::class.java.classLoader) as? Int
        postalCode = parcel.readString()
        pinNumber = parcel.readValue(Int::class.java.classLoader) as? Int
        employerName = parcel.readString()
        employerNumber = parcel.readValue(Int::class.java.classLoader) as? Long

        securityQuestionId = parcel.readValue(Int::class.java.classLoader) as? Int
        emailId = parcel.readString()
        imagePath = parcel.readString()
        securityKey = parcel.readValue(Int::class.java.classLoader) as? Int
        mobile = parcel.readString()
        failedLoginAttemptCount = parcel.readValue(Int::class.java.classLoader) as? Int
        genderID = parcel.readValue(Int::class.java.classLoader) as? Int
        genderName = parcel.readString()
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        dateOfBirth = parcel.readString()
        profession = parcel.readString()
        isParent = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isSecondaryParent = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isGaurdian = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        addedByID = parcel.readValue(Int::class.java.classLoader) as? Int
        isAuthorizedToPickup = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        reasonNotToAllow = parcel.readString()
        associatedChild = parcel.createTypedArrayList(AssociatedChild)
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
        parcel.writeString(parentName)
        parcel.writeValue(agencyID)
        parcel.writeValue(parentID)
        parcel.writeValue(userID)
        parcel.writeValue(relationTypeId)
        parcel.writeString(firstName)
        parcel.writeString(lastName)
        parcel.writeString(address)
        parcel.writeValue(countryId)
        parcel.writeValue(stateId)
        parcel.writeValue(cityId)
        parcel.writeString(postalCode)
        parcel.writeValue(employerNumber)
        parcel.writeString(employerName)
        parcel.writeValue(pinNumber)
        parcel.writeValue(securityQuestionId)
        parcel.writeString(emailId)
        parcel.writeString(imagePath)
        parcel.writeValue(securityKey)
        parcel.writeString(mobile)
        parcel.writeValue(failedLoginAttemptCount)
        parcel.writeValue(genderID)
        parcel.writeString(genderName)
        parcel.writeValue(stringId)
        parcel.writeString(dateOfBirth)
        parcel.writeString(profession)
        parcel.writeValue(isParent)
        parcel.writeValue(isSecondaryParent)
        parcel.writeValue(isGaurdian)
        parcel.writeValue(addedByID)
        parcel.writeValue(isAuthorizedToPickup)
        parcel.writeString(reasonNotToAllow)
        parcel.writeTypedList(associatedChild)
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

    companion object CREATOR : Parcelable.Creator<ParentData> {
        override fun createFromParcel(parcel: Parcel): ParentData {
            return ParentData(parcel)
        }

        override fun newArray(size: Int): Array<ParentData?> {
            return arrayOfNulls(size)
        }
    }
}

class AssociatedChild() :Parcelable {
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("parentID")
    @Expose
    var parentID: Int? = null
    @SerializedName("studentID")
    @Expose
    var studentID: Int? = null
    @SerializedName("isParent")
    @Expose
    var isParent: Boolean? = null
    @SerializedName("isGaurdian")
    @Expose
    var isGaurdian: Boolean? = null
    @SerializedName("isSecondaryParent")
    @Expose
    var isSecondaryParent: Boolean? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
    @SerializedName("studentName")
    @Expose
    var studentName: String? = null
    @SerializedName("firstName")
    @Expose
    var firstName: String? = null
    @SerializedName("lastName")
    @Expose
    var lastName: String? = null
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
    var deletedDate: String? = null
    @SerializedName("createdBy")
    @Expose
    var createdBy: Int? = null
    @SerializedName("createdDate")
    @Expose
    var createdDate: String? = null
    @SerializedName("updatedDate")
    @Expose
    var updatedDate: String? = null
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
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        isParent = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isGaurdian = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        isSecondaryParent = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        studentName = parcel.readString()
        firstName = parcel.readString()
        lastName = parcel.readString()
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
        parcel.writeValue(agencyID)
        parcel.writeValue(parentID)
        parcel.writeValue(studentID)
        parcel.writeValue(isParent)
        parcel.writeValue(isGaurdian)
        parcel.writeValue(isSecondaryParent)
        parcel.writeValue(stringId)
        parcel.writeString(studentName)
        parcel.writeString(firstName)
        parcel.writeString(lastName)
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

    companion object CREATOR : Parcelable.Creator<AssociatedChild> {
        override fun createFromParcel(parcel: Parcel): AssociatedChild {
            return AssociatedChild(parcel)
        }

        override fun newArray(size: Int): Array<AssociatedChild?> {
            return arrayOfNulls(size)
        }
    }
}
