package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class PostActivityStudentList {
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
    public ArrayList<PostActivityStudentData> data = null;




}
