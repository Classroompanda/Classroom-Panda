package com.daycare.daycareteacher.model

import android.os.Parcel
import android.os.Parcelable
import com.daycare.daycareteacher.utill.alohaDate
import com.daycare.daycareteacher.utill.convertDateUTC
import com.daycare.daycareteacher.utill.dialogDisplayTime
import com.google.gson.annotations.SerializedName

class StudentDailySheetDetail() :BaseModel(),Parcelable {
    @SerializedName("studentActivityID")
     var studentActivityID: Int? = null
    @SerializedName("activityTypeID")
     var activityTypeID: Int? = null
    @SerializedName("studentID")
     var studentID: Int? = null

    @SerializedName("activityDescription")
    var activityDescription: String? = null
    @SerializedName("startTime")
    var startTime: String? = null
    @SerializedName("endTime")
    var endTime: String? = null

   /* var createdData:String?= convertDateUTC(this.startTime!!,alohaDate, dialogDisplayTime)+ " - " + convertDateUTC(
        this.endTime!!,
        alohaDate,
        dialogDisplayTime
    )*/

    constructor(parcel: Parcel) : this() {
        studentActivityID = parcel.readValue(Int::class.java.classLoader) as? Int
        activityTypeID = parcel.readValue(Int::class.java.classLoader) as? Int
        studentID = parcel.readValue(Int::class.java.classLoader) as? Int
        activityDescription = parcel.readString()
        startTime = parcel.readString()
        endTime = parcel.readString()
       // createdData = parcel.readString()
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(studentActivityID)
        parcel.writeValue(activityTypeID)
        parcel.writeValue(studentID)
        parcel.writeString(activityDescription)
        parcel.writeString(startTime)
        parcel.writeString(endTime)
      //  parcel.writeString(createdData)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<StudentDailySheetDetail> {
        override fun createFromParcel(parcel: Parcel): StudentDailySheetDetail {
            return StudentDailySheetDetail(parcel)
        }

        override fun newArray(size: Int): Array<StudentDailySheetDetail?> {
            return arrayOfNulls(size)
        }
    }
}
