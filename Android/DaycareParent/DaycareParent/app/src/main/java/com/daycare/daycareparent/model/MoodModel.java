package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

public class MoodModel {
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
    @SerializedName("returnStatus")
    public Boolean returnStatus;


    public class Data {

        @SerializedName("moodTypeName")
        public String moodTypeName;
        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("moodTypeID")
        public Integer moodTypeID;
        @SerializedName("studentMoodDescription")
        public String studentMoodDescription;
        @SerializedName("stringId")
        public Object stringId;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;
        @SerializedName("isActive")
        public Boolean isActive;
        @SerializedName("isDeleted")
        public Boolean isDeleted;
        @SerializedName("deletedBy")
        public Integer deletedBy;
        @SerializedName("deletedDate")
        public String deletedDate;
    }
}
