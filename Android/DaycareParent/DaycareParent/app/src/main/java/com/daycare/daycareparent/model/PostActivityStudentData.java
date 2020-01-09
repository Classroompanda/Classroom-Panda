package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class PostActivityStudentData {
    @SerializedName("studentName")
    public String studentName;
    @SerializedName("postActivityImages")
    public ArrayList<PostActivityImage> postActivityImages = null;
    @SerializedName("postActivityVideos")
    public ArrayList<PostActivityVideo> postActivityVideos = null;
    @SerializedName("id")
    public Integer id;
    @SerializedName("imagePath")
    public Object imagePath;
    @SerializedName("teacherID")
    public Integer teacherID;
    @SerializedName("sender")
    public String sender;
    @SerializedName("postTitle")
    public String postTitle;
    @SerializedName("postDescription")
    public String postDescription;
    @SerializedName("agencyID")
    public Integer agencyID;
    @SerializedName("studentID")
    public Integer studentID;
    @SerializedName("classesID")
    public Integer classesID;
    @SerializedName("postedDate")
    public String postedDate;
    @SerializedName("isPublic")
    public Boolean isPublic;
    @SerializedName("selectedStudents")
    public ArrayList<Integer> selectedStudents;
    @SerializedName("isActive")
    public Boolean isActive;

    public class PostActivityImage {

        @SerializedName("id")
        public Integer id;
        @SerializedName("postActivitiesID")
        public Integer postActivitiesID;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("classesID")
        public Integer classesID;
        @SerializedName("imageServerPath")
        public String imageServerPath;
        @SerializedName("isActive")
        public Boolean isActive;
    }
    public class PostActivityVideo {

        @SerializedName("id")
        public Integer id;
        @SerializedName("postActivitiesID")
        public Integer postActivitiesID;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("classesID")
        public Integer classesID;
        @SerializedName("vedioServerPath")
        public String vedioServerPath;
        @SerializedName("isActive")
        public Boolean isActive;
        @SerializedName("isDeleted")
        public Boolean isDeleted;
    }
}
