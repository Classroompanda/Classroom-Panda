package com.daycare.kiosk.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose



class DropInOutRequest{
   /* @SerializedName("incidentInvolvments")
    internal var incidentInvolvments: List<DropInOutRequestList>? = null
*/
    @SerializedName("kioskeStudentSignInDetails")
    @Expose
    var kioskeStudentSignInDetails: List<DropInOutRequestList>? = null
}
