package com.daycare.daycareteacher.model;

import com.google.gson.annotations.SerializedName;

public class HealthModel {
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
            @SerializedName("studentID")
            public Integer studentID;
            @SerializedName("agencyID")
            public Integer agencyID;
            @SerializedName("studentActivitiesID")
            public Integer studentActivitiesID;
            @SerializedName("studentHealthDescription")
            public String studentHealthDescription;
            @SerializedName("recordedTemparture")
            public String recordedTemparture;

            @SerializedName("doseRepeatName")
            public String doseRepeatName;
            @SerializedName("dosageQuantityID")
            public Integer dosageQuantityID;
            @SerializedName("unit")
            public Integer unit;
            @SerializedName("howTaken")
            public String howTaken;
            @SerializedName("studentMedicationID")
            public Integer studentMedicationID;
            @SerializedName("studentMedicationName")
            public String studentMedicationName;



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
            @SerializedName("createdBy")
            public Integer createdBy;
            @SerializedName("createdDate")
            public String createdDate;
        }
}
