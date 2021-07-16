package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

public class TransferClassRequest {

    @SerializedName("agencyID")
    public Integer agencyID;

    @SerializedName("classID")
    public Integer classID;

    @SerializedName("studentID")
    public Integer studentID;

    @SerializedName("fromClassID")
    public Integer fromClassID;

    @SerializedName("toClassID")
    public Integer toClassID;

    @SerializedName("teacherID")
    public Integer teacherID;






   /* "id": 0,
            "agencyID": 0,
            "studentID": 0,
            "fromClassID": 0,
            "toClassID": 0,
            "transferDate": "2019-09-14T08:49:09.994Z",
            "teacherID": 0,*/

}
