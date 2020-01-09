package com.daycare.daycareparent.model

import android.os.Parcel
import android.os.Parcelable
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class DuePaymentModel : BaseModel() {

    @SerializedName("data")
    @Expose
    var data: List<DuePayment>? = null

}

class DuePayment() : Parcelable {
    @SerializedName("invoiceDetailsID")
    @Expose
    var invoiceDetailsID: Int? = null
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("invoiceNo")
    @Expose
    var invoiceNo: String? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("parentID")
    @Expose
    var parentID: Int? = null
    @SerializedName("studentID")
    @Expose
    var studentID: Int? = null
    @SerializedName("invoiceDate")
    @Expose
    var invoiceDate: String? = null
    @SerializedName("invoiceFromDate")
    @Expose
    var invoiceFromDate: String? = null
    @SerializedName("invoiceToDate")
    @Expose
    var invoiceToDate: String? = null
    @SerializedName("invoiceAmount")
    @Expose
    var invoiceAmount: Double? = null
    @SerializedName("discountAmount")
    @Expose
    var discountAmount: Int? = null
    @SerializedName("totalAmount")
    @Expose
    var totalAmount: String? = null
    @SerializedName("isInvoicePaid")
    @Expose
    var isInvoicePaid: Boolean? = null
    @SerializedName("dueAmount")
    @Expose
    var dueAmount: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
    @SerializedName("feePercentage")
    @Expose
    var feePercentage: Int? = null
    @SerializedName("limit")
    @Expose
    var limit: Int? = null
    @SerializedName("page")
    @Expose
    var page: Int? = null
    @SerializedName("parentName")
    @Expose
    var parentName: String? = null
    @SerializedName("studentName")
    @Expose
    var studentName: String? = null
    @SerializedName("className")
    @Expose
    var className: String? = null
    @SerializedName("classId")
    @Expose
    var classId: String? = null
    @SerializedName("classFees")
    @Expose
    var classFees: String? = null
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
        invoiceDetailsID = parcel.readValue(Int::class.java.classLoader) as? Int
        id = parcel.readValue(Int::class.java.classLoader) as? Int
        invoiceNo = parcel.readString()
        agencyID = parcel.readValue(Int::class.java.classLoader) as? Int
        parentID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        invoiceDate = parcel.readString()
        invoiceFromDate = parcel.readString()
        invoiceToDate = parcel.readString()
        invoiceAmount = parcel.readValue(Double::class.java.classLoader) as? Double
        discountAmount = parcel.readValue(Int::class.java.classLoader) as? Int
        totalAmount = parcel.readString()
        isInvoicePaid = parcel.readValue(Boolean::class.java.classLoader) as? Boolean
        dueAmount = parcel.readValue(Int::class.java.classLoader) as? Int
        stringId = parcel.readValue(Int::class.java.classLoader) as? Int
        feePercentage = parcel.readValue(Int::class.java.classLoader) as? Int
        limit = parcel.readValue(Int::class.java.classLoader) as? Int
        page = parcel.readValue(Int::class.java.classLoader) as? Int
        parentName = parcel.readString()
        studentName = parcel.readString()
        className = parcel.readString()
        classId = parcel.readString()
        classFees = parcel.readString()
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
        parcel.writeValue(invoiceDetailsID)
        parcel.writeValue(id)
        parcel.writeString(invoiceNo)
        parcel.writeValue(agencyID)
        parcel.writeValue(parentID)
        parcel.writeValue(studentID)
        parcel.writeString(invoiceDate)
        parcel.writeString(invoiceFromDate)
        parcel.writeString(invoiceToDate)
        parcel.writeValue(invoiceAmount)
        parcel.writeValue(discountAmount)
        parcel.writeString(totalAmount)
        parcel.writeValue(isInvoicePaid)
        parcel.writeValue(dueAmount)
        parcel.writeValue(stringId)
        parcel.writeValue(feePercentage)
        parcel.writeValue(limit)
        parcel.writeValue(page)
        parcel.writeString(parentName)
        parcel.writeString(studentName)
        parcel.writeString(className)
        parcel.writeString(classId)
        parcel.writeString(classFees)
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

    companion object CREATOR : Parcelable.Creator<DuePayment> {
        override fun createFromParcel(parcel: Parcel): DuePayment {
            return DuePayment(parcel)
        }

        override fun newArray(size: Int): Array<DuePayment?> {
            return arrayOfNulls(size)
        }
    }
}
