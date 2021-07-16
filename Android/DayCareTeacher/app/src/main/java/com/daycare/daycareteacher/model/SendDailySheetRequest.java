package com.daycare.daycareteacher.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SendDailySheetRequest extends BaseModel  {
    @SerializedName("studentActivitiesId")
    @Expose
    public Integer studentActivitiesId;
    @SerializedName("agencyID")
    @Expose
    public Integer agencyID;
    @SerializedName("studentID")
    @Expose
    public Integer studentID;
    @SerializedName("classID")
    @Expose
    public Integer classID;
    @SerializedName("parentID")
    @Expose
    public Integer parentID;
    @SerializedName("askedDate")
    @Expose
    public String askedDate;
    @SerializedName("limit")
    @Expose
    public Integer limit;
    @SerializedName("page")
    @Expose
    public Integer page;

   public String askedDateString = "";


}
