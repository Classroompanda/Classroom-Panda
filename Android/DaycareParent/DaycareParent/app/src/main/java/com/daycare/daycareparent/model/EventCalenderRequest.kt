package com.daycare.daycareparent.model

import com.google.gson.annotations.SerializedName

class EventCalenderRequest {

    @SerializedName("eventID")
     var eventID: Int? = null
    @SerializedName("classID")
     var classID: String? = null
    @SerializedName("agencyID")
     var agencyID: Int? = null
    @SerializedName("userID")
     var userID: Int? = null
    @SerializedName("eventSearchFromDate")
     var eventSearchFromDate: String? = null
    @SerializedName("eventSearchToDate")
     var eventSearchToDate: String? = null

}
