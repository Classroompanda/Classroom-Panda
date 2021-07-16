package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

public class TeacherMedicationData {
    @SerializedName("studentID")
    public Integer studentID;
    @SerializedName("studentFirstName")
    public String studentFirstName;
    @SerializedName("studentLastName")
    public String studentLastName;
    @SerializedName("studentName")
    public String studentName;
    @SerializedName("studentMedicationID")
    public Integer studentMedicationID;
    @SerializedName("medicationName")
    public String medicationName;
    @SerializedName("agencyID")
    public Integer agencyID;
    @SerializedName("units")
    public Integer units;
    @SerializedName("strength")
    public String strength;
    @SerializedName("doseRepeatID")
    public Integer doseRepeatID;
    @SerializedName("doseRepeatName")
    public String doseRepeatName;
    @SerializedName("dosageQuantityID")
    public Integer dosageQuantityID;
    @SerializedName("howTaken")
    public String howTaken;
    @SerializedName("otherMedication")
    public String otherMedication;
    @SerializedName("startDate")
    public String startDate;
    @SerializedName("endDate")
    public String endDate;
    @SerializedName("studentActivityMedicationID")
    public Integer studentActivityMedicationID;
    @SerializedName("isActive")
    public Boolean isActive;


    @SerializedName("isMedicationDone")
    public Boolean isMedicationDone;



    @SerializedName("isDeleted")
    public Boolean isDeleted;
    @SerializedName("deletedBy")
    public Object deletedBy;
    @SerializedName("deletedDate")
    public Object deletedDate;
}
