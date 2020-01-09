package com.daycare.daycareparent.model

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName



class PaymentModel:BaseModel() {

    @SerializedName("data")
    @Expose
    var data: List<StripeData>? = null

}

class StripeData {
    @SerializedName("id")
    @Expose
    var id: Int? = null
    @SerializedName("userId")
    @Expose
    var userId: Int? = null
    @SerializedName("stringId")
    @Expose
    var stringId: Int? = null
    @SerializedName("stripeUserId")
    @Expose
    var stripeUserId: String? = null
    @SerializedName("accessToken")
    @Expose
    var accessToken: String? = null
    @SerializedName("refreshToken")
    @Expose
    var refreshToken: String? = null
    @SerializedName("scope")
    @Expose
    var scope: String? = null
    @SerializedName("liveMode")
    @Expose
    var liveMode: Boolean? = null
    @SerializedName("stripePublishableKey")
    @Expose
    var stripePublishableKey: String? = null
    @SerializedName("isDefault")
    @Expose
    var isDefault: Boolean? = null
    @SerializedName("firstName")
    @Expose
    var firstName: Any? = null
    @SerializedName("lastName")
    @Expose
    var lastName: Any? = null
    @SerializedName("email")
    @Expose
    var email: String? = null
    @SerializedName("isDeleteRequested")
    @Expose
    var isDeleteRequested: Boolean? = null
    @SerializedName("code")
    @Expose
    var code: Any? = null
    @SerializedName("agencyID")
    @Expose
    var agencyID: Int? = null
    @SerializedName("currentUserId")
    @Expose
    var currentUserId: Int? = null
    @SerializedName("apikey")
    @Expose
    var apikey: Any? = null
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
}
