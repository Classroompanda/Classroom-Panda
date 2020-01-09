package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

public class NapModel {
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

        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("sleptAtTime")
        public String sleptAtTime;
        @SerializedName("workUpTime")
        public String workUpTime;
        @SerializedName("napNote")
        public String napNote;
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
