package com.daycare.kiosk.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UpdateStatusResponse {
    /*@SerializedName("totalPages")
    @Expose
    public Integer totalPages;
    @SerializedName("totalRows")
    @Expose
    public Integer totalRows;
    @SerializedName("pageSize")
    @Expose
    public Integer pageSize;
    @SerializedName("id")
    @Expose
    public Integer id;
    @SerializedName("isExist")
    @Expose
    public Boolean isExist;
    @SerializedName("saveId")
    @Expose
    public Integer saveId;*/
    @SerializedName("statusCode")
    @Expose
    public Integer statusCode;
    @SerializedName("isSuccess")
    @Expose
    public Boolean isSuccess;
    @SerializedName("message")
    @Expose
    public String message;
}
