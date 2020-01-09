package com.daycare.daycareparent.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName


class PaymentRequest {
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
    @SerializedName("stringID")
    @Expose
    var stringID: Int? = null
    @SerializedName("email")
    @Expose
    var email: String? = null
    @SerializedName("sourceToken")
    @Expose
    var sourceToken: String? = null
    @SerializedName("tokenID")
    @Expose
    var tokenID: String? = null
    @SerializedName("stripeDetailsID")
    @Expose
    var stripeDetailsID: Int? = null
    @SerializedName("studentName")
    @Expose
    var studentName: String? = null
    @SerializedName("parentName")
    @Expose
    var parentName: String? = null
    @SerializedName("paymentFromDate")
    @Expose
    var paymentFromDate: String? = null
    @SerializedName("paymentToDate")
    @Expose
    var paymentToDate: String? = null
    @SerializedName("paymentDate")
    @Expose
    var paymentDate: String? = null
    @SerializedName("totalAmount")
    @Expose
    var totalAmount: String? = null
    @Expose
    @SerializedName("IsOffline")
    var IsOffline: Boolean? = null
    @SerializedName("invoiceDetailsID")
    @Expose
    var invoiceDetailsID: Int? = null
    @SerializedName("limit")
    @Expose
    var limit: Int? = null
    @SerializedName("page")
    @Expose
    var page: Int? = null
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
    var deletedFromIP: String? = null
    @SerializedName("createdFromIP")
    @Expose
    var createdFromIP: String? = null
    @SerializedName("updatedFromIP")
    @Expose
    var updatedFromIP: String? = null

}