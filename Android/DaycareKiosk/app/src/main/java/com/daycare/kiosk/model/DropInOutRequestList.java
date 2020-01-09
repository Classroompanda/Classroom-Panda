package com.daycare.kiosk.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DropInOutRequestList {
    @SerializedName("id")
    @Expose
    public Integer id;
    @SerializedName("agencyID")
    @Expose
    public Integer agencyID;
    @SerializedName("parentID")
    @Expose
    public Integer parentID;
    @SerializedName("studentID")
    @Expose
    public Integer studentID;
    @SerializedName("isDropIn")
    @Expose
    public Boolean isDropIn;
    @SerializedName("dropInDateTime")
    @Expose
    public String dropInDateTime;
    @SerializedName("isDropOut")
    @Expose
    public Boolean isDropOut;
    @SerializedName("dropOutDateTime")
    @Expose
    public String dropOutDateTime;
    @SerializedName("isBreakIn")
    @Expose
    public Boolean isBreakIn;
    @SerializedName("breakInDateTime")
    @Expose
    public String breakInDateTime;
    @SerializedName("isBreakOut")
    @Expose
    public Boolean isBreakOut;
    @SerializedName("breakOutDateTime")
    @Expose
    public String breakOutDateTime;


    @SerializedName("createdBy")
    @Expose
    public Integer createdBy;


}
