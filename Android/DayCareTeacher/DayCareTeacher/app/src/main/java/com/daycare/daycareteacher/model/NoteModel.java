package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

public class NoteModel {
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
         @SerializedName("studentActivitiesID")
         public Integer studentActivitiesID;
         @SerializedName("studentID")
         public Integer studentID;
         @SerializedName("noteDescription")
         public String noteDescription;
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
