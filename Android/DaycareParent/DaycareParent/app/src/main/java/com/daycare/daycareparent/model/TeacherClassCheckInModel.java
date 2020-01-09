package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TeacherClassCheckInModel {
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
    public List<Datum> data = null;

    public class Datum {

        @SerializedName("value")
        public Integer value;
        @SerializedName("label")
        public String label;
        @SerializedName("isActive")
        public Boolean isActive;
    }
}
