package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

public class UploadProfileImage {
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

        @SerializedName("refferalName")
        public String refferalName;
        @SerializedName("filePath")
        public String filePath;
        @SerializedName("originalFileName")
        public String originalFileName;
    }
}
