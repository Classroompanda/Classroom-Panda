package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

public class OtherActivityModel {
    @SerializedName("totalPages")
    public Integer totalPages;
    @SerializedName("totalRows")
    public Integer totalRows;
    @SerializedName("pageSize")
    public Integer pageSize;
    @SerializedName("id")
    public Integer id;
    @SerializedName("isExist")
    public Boolean isExist;
    @SerializedName("saveId")
    public Integer saveId;
    @SerializedName("statusCode")
    public Integer statusCode;
    @SerializedName("isSuccess")
    public Boolean isSuccess;
    @SerializedName("message")
    public String message;
    @SerializedName("data")
    public Data data;

    public class Data {

        @SerializedName("subActivityTypeName")
        public Object subActivityTypeName;
        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("subActivityTypeID")
        public Integer subActivityTypeID;
        @SerializedName("startTime")
        public String startTime;
        @SerializedName("endTime")
        public String endTime;
        @SerializedName("otherActivityNote")
        public String otherActivityNote;
        @SerializedName("stringId")
        public Object stringId;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;
        @SerializedName("isActive")
        public Boolean isActive;
        @SerializedName("isDeleted")
        public Boolean isDeleted;
    }
}
