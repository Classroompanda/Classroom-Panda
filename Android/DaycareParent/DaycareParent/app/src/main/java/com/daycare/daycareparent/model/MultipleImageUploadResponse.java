package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class MultipleImageUploadResponse {
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
    public Object message;
    @SerializedName("data")
    public ArrayList<String> data = null;
    @SerializedName("returnStatus")
    public Boolean returnStatus;
}
