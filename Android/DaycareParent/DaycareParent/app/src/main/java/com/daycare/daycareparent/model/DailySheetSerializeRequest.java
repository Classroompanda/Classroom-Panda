package com.daycare.daycareparent.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DailySheetSerializeRequest implements Serializable {
    @SerializedName("id")
    public Integer id;
    @SerializedName("agencyID")
    public Integer agencyID;
    @SerializedName("studentID")
    public Integer studentID;
    @SerializedName("classesID")
    public Integer classesID;
    @SerializedName("activityTypeID")
    public Integer activityTypeID;
    @SerializedName("activityRegisterDate")
    public String activityRegisterDate;

    @SerializedName("selectedStudents")
    public List<Integer> selectedStudents = null;
    @SerializedName("studentActivityMeals")
    public StudentActivityMeals studentActivityMeals;
    @SerializedName("studentActivityMedications")
    public StudentActivityMedications studentActivityMedications;
    @SerializedName("studentActivityNotes")
    public StudentActivityNotes studentActivityNotes;
    @SerializedName("studentActivityMoods")
    public StudentActivityMoods studentActivityMoods;
    @SerializedName("studentOtherActivity")
    public StudentOtherActivity studentOtherActivity;
    @SerializedName("studentAcitivityNap")
    public StudentAcitivityNap studentAcitivityNap;
    @SerializedName("stringId")
    public String stringId;
    @SerializedName("isActive")
    public Boolean isActive;
    @SerializedName("isDeleted")
    public Boolean isDeleted;
    @SerializedName("deletedBy")
    public Integer deletedBy;

    @SerializedName("studentActivitiesID")
    public Integer studentActivitiesID;


    @SerializedName("DeletedDate")
    public String DeletedDate;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAgencyID() {
        return agencyID;
    }

    public void setAgencyID(Integer agencyID) {
        this.agencyID = agencyID;
    }

    public Integer getStudentID() {
        return studentID;
    }

    public void setStudentID(Integer studentID) {
        this.studentID = studentID;
    }

    public Integer getClassesID() {
        return classesID;
    }

    public void setClassesID(Integer classesID) {
        this.classesID = classesID;
    }

    public Integer getActivityTypeID() {
        return activityTypeID;
    }

    public void setActivityTypeID(Integer activityTypeID) {
        this.activityTypeID = activityTypeID;
    }

    public String getActivityRegisterDate() {
        return activityRegisterDate;
    }

    public void setActivityRegisterDate(String activityRegisterDate) {
        this.activityRegisterDate = activityRegisterDate;
    }

    public List<Integer> getSelectedStudents() {
        return selectedStudents;
    }

    public void setSelectedStudents(List<Integer> selectedStudents) {
        this.selectedStudents = selectedStudents;
    }

    public StudentActivityMeals getStudentActivityMeals() {
        return studentActivityMeals;
    }

    public void setStudentActivityMeals(StudentActivityMeals studentActivityMeals) {
        this.studentActivityMeals = studentActivityMeals;
    }

    public StudentActivityMedications getStudentActivityMedications() {
        return studentActivityMedications;
    }

    public void setStudentActivityMedications(StudentActivityMedications studentActivityMedications) {
        this.studentActivityMedications = studentActivityMedications;
    }

    public StudentActivityNotes getStudentActivityNotes() {
        return studentActivityNotes;
    }

    public void setStudentActivityNotes(StudentActivityNotes studentActivityNotes) {
        this.studentActivityNotes = studentActivityNotes;
    }

    public StudentActivityMoods getStudentActivityMoods() {
        return studentActivityMoods;
    }

    public void setStudentActivityMoods(StudentActivityMoods studentActivityMoods) {
        this.studentActivityMoods = studentActivityMoods;
    }

    public StudentOtherActivity getStudentOtherActivity() {
        return studentOtherActivity;
    }

    public void setStudentOtherActivity(StudentOtherActivity studentOtherActivity) {
        this.studentOtherActivity = studentOtherActivity;
    }

    public StudentAcitivityNap getStudentAcitivityNap() {
        return studentAcitivityNap;
    }

    public void setStudentAcitivityNap(StudentAcitivityNap studentAcitivityNap) {
        this.studentAcitivityNap = studentAcitivityNap;
    }

    public String getStringId() {
        return stringId;
    }

    public void setStringId(String stringId) {
        this.stringId = stringId;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Integer getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(Integer deletedBy) {
        this.deletedBy = deletedBy;
    }


    public class StudentOtherActivity {

        @SerializedName("subActivityTypeName")
        public String subActivityTypeName;
        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("subActivityTypeID")
        public Integer subActivityTypeID;
        @SerializedName("startTime")
        public String startTime;
        @SerializedName("endTime")
        public String endTime;
        @SerializedName("otherActivityNote")
        public String otherActivityNote;
        @SerializedName("stringId")
        public String stringId;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;
        @SerializedName("isActive")
        public Boolean isActive;

        public String getSubActivityTypeName() {
            return subActivityTypeName;
        }

        public void setSubActivityTypeName(String subActivityTypeName) {
            this.subActivityTypeName = subActivityTypeName;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(Integer agencyID) {
            this.agencyID = agencyID;
        }

        public Integer getStudentID() {
            return studentID;
        }

        public void setStudentID(Integer studentID) {
            this.studentID = studentID;
        }

        public Integer getStudentActivitiesID() {
            return studentActivitiesID;
        }

        public void setStudentActivitiesID(Integer studentActivitiesID) {
            this.studentActivitiesID = studentActivitiesID;
        }

        public Integer getSubActivityTypeID() {
            return subActivityTypeID;
        }

        public void setSubActivityTypeID(Integer subActivityTypeID) {
            this.subActivityTypeID = subActivityTypeID;
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        public String getOtherActivityNote() {
            return otherActivityNote;
        }

        public void setOtherActivityNote(String otherActivityNote) {
            this.otherActivityNote = otherActivityNote;
        }

        public String getStringId() {
            return stringId;
        }

        public void setStringId(String stringId) {
            this.stringId = stringId;
        }

        public Integer getActivityTypeID() {
            return activityTypeID;
        }

        public void setActivityTypeID(Integer activityTypeID) {
            this.activityTypeID = activityTypeID;
        }

        public Boolean getActive() {
            return isActive;
        }

        public void setActive(Boolean active) {
            isActive = active;
        }
    }

    public class StudentActivityMedications {

        @SerializedName("id")
        public Integer id;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;

        @SerializedName("studentMedicationID")
        public Integer studentMedicationID;



        @SerializedName("studentHealthDescription")
        public String studentHealthDescription;
        @SerializedName("recordedTemparture")
        public Integer recordedTemparture;
        @SerializedName("stringId")
        public String stringId;
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

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getStudentID() {
            return studentID;
        }

        public void setStudentID(Integer studentID) {
            this.studentID = studentID;
        }

        public Integer getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(Integer agencyID) {
            this.agencyID = agencyID;
        }

        public Integer getStudentActivitiesID() {
            return studentActivitiesID;
        }

        public void setStudentActivitiesID(Integer studentActivitiesID) {
            this.studentActivitiesID = studentActivitiesID;
        }

        public String getStudentHealthDescription() {
            return studentHealthDescription;
        }

        public void setStudentHealthDescription(String studentHealthDescription) {
            this.studentHealthDescription = studentHealthDescription;
        }

        public Integer getRecordedTemparture() {
            return recordedTemparture;
        }

        public void setRecordedTemparture(Integer recordedTemparture) {
            this.recordedTemparture = recordedTemparture;
        }

        public String getStringId() {
            return stringId;
        }

        public void setStringId(String stringId) {
            this.stringId = stringId;
        }

        public Integer getActivityTypeID() {
            return activityTypeID;
        }

        public void setActivityTypeID(Integer activityTypeID) {
            this.activityTypeID = activityTypeID;
        }

        public Boolean getActive() {
            return isActive;
        }

        public void setActive(Boolean active) {
            isActive = active;
        }

        public Boolean getDeleted() {
            return isDeleted;
        }

        public void setDeleted(Boolean deleted) {
            isDeleted = deleted;
        }

        public Integer getDeletedBy() {
            return deletedBy;
        }

        public void setDeletedBy(Integer deletedBy) {
            this.deletedBy = deletedBy;
        }

        public String getDeletedDate() {
            return deletedDate;
        }

        public void setDeletedDate(String deletedDate) {
            this.deletedDate = deletedDate;
        }

        public Integer getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(Integer createdBy) {
            this.createdBy = createdBy;
        }
    }


    public class StudentActivityNotes {

        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("noteDescription")
        public String noteDescription;
        @SerializedName("stringId")
        public String stringId;
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

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(Integer agencyID) {
            this.agencyID = agencyID;
        }

        public Integer getStudentActivitiesID() {
            return studentActivitiesID;
        }

        public void setStudentActivitiesID(Integer studentActivitiesID) {
            this.studentActivitiesID = studentActivitiesID;
        }

        public Integer getStudentID() {
            return studentID;
        }

        public void setStudentID(Integer studentID) {
            this.studentID = studentID;
        }

        public String getNoteDescription() {
            return noteDescription;
        }

        public void setNoteDescription(String noteDescription) {
            this.noteDescription = noteDescription;
        }

        public String getStringId() {
            return stringId;
        }

        public void setStringId(String stringId) {
            this.stringId = stringId;
        }

        public Integer getActivityTypeID() {
            return activityTypeID;
        }

        public void setActivityTypeID(Integer activityTypeID) {
            this.activityTypeID = activityTypeID;
        }

        public Boolean getActive() {
            return isActive;
        }

        public void setActive(Boolean active) {
            isActive = active;
        }

        public Boolean getDeleted() {
            return isDeleted;
        }

        public void setDeleted(Boolean deleted) {
            isDeleted = deleted;
        }

        public Integer getDeletedBy() {
            return deletedBy;
        }

        public void setDeletedBy(Integer deletedBy) {
            this.deletedBy = deletedBy;
        }

        public String getDeletedDate() {
            return deletedDate;
        }

        public void setDeletedDate(String deletedDate) {
            this.deletedDate = deletedDate;
        }

        public Integer getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(Integer createdBy) {
            this.createdBy = createdBy;
        }
    }

    public class StudentActivityMoods {

        @SerializedName("moodTypeName")
        public String moodTypeName;
        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("moodTypeID")
        public Integer moodTypeID;
        @SerializedName("studentMoodDescription")
        public String studentMoodDescription;
        @SerializedName("stringId")
        public String stringId;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;
        @SerializedName("isActive")
        public Boolean isActive;

        public String getMoodTypeName() {
            return moodTypeName;
        }

        public void setMoodTypeName(String moodTypeName) {
            this.moodTypeName = moodTypeName;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(Integer agencyID) {
            this.agencyID = agencyID;
        }

        public Integer getStudentID() {
            return studentID;
        }

        public void setStudentID(Integer studentID) {
            this.studentID = studentID;
        }

        public Integer getStudentActivitiesID() {
            return studentActivitiesID;
        }

        public void setStudentActivitiesID(Integer studentActivitiesID) {
            this.studentActivitiesID = studentActivitiesID;
        }

        public Integer getMoodTypeID() {
            return moodTypeID;
        }

        public void setMoodTypeID(Integer moodTypeID) {
            this.moodTypeID = moodTypeID;
        }

        public String getStudentMoodDescription() {
            return studentMoodDescription;
        }

        public void setStudentMoodDescription(String studentMoodDescription) {
            this.studentMoodDescription = studentMoodDescription;
        }

        public String getStringId() {
            return stringId;
        }

        public void setStringId(String stringId) {
            this.stringId = stringId;
        }

        public Integer getActivityTypeID() {
            return activityTypeID;
        }

        public void setActivityTypeID(Integer activityTypeID) {
            this.activityTypeID = activityTypeID;
        }

        public Boolean getActive() {
            return isActive;
        }

        public void setActive(Boolean active) {
            isActive = active;
        }
    }
    public class StudentAcitivityNap {

        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("sleptAtTime")
        public String sleptAtTime;
        @SerializedName("workUpTime")
        public String workUpTime;
        @SerializedName("napNote")
        public String napNote;
        @SerializedName("stringId")
        public String stringId;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;
        @SerializedName("isActive")
        public Boolean isActive;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(Integer agencyID) {
            this.agencyID = agencyID;
        }

        public Integer getStudentID() {
            return studentID;
        }

        public void setStudentID(Integer studentID) {
            this.studentID = studentID;
        }

        public Integer getStudentActivitiesID() {
            return studentActivitiesID;
        }

        public void setStudentActivitiesID(Integer studentActivitiesID) {
            this.studentActivitiesID = studentActivitiesID;
        }

        public String getSleptAtTime() {
            return sleptAtTime;
        }

        public void setSleptAtTime(String sleptAtTime) {
            this.sleptAtTime = sleptAtTime;
        }

        public String getWorkUpTime() {
            return workUpTime;
        }

        public void setWorkUpTime(String workUpTime) {
            this.workUpTime = workUpTime;
        }

        public String getNapNote() {
            return napNote;
        }

        public void setNapNote(String napNote) {
            this.napNote = napNote;
        }

        public String getStringId() {
            return stringId;
        }

        public void setStringId(String stringId) {
            this.stringId = stringId;
        }

        public Integer getActivityTypeID() {
            return activityTypeID;
        }

        public void setActivityTypeID(Integer activityTypeID) {
            this.activityTypeID = activityTypeID;
        }

        public Boolean getActive() {
            return isActive;
        }

        public void setActive(Boolean active) {
            isActive = active;
        }
    }

    public class StudentActivityMeals{
        @SerializedName("id")
        public Integer id;
        @SerializedName("agencyID")
        public Integer agencyID;
        @SerializedName("studentID")
        public Integer studentID;
        @SerializedName("studentActivitiesID")
        public Integer studentActivitiesID;
        @SerializedName("mealTypeName")
        public String mealTypeName;
        @SerializedName("mealTypeID")
        public Integer mealTypeID;
        @SerializedName("mealComment")
        public String mealComment;
        @SerializedName("otherThanPlanMeal")
        public String otherThanPlanMeal;
        @SerializedName("otherThanPlanMealComment")
        public String otherThanPlanMealComment;
        @SerializedName("activityTypeID")
        public Integer activityTypeID;

        @SerializedName("mealPlannerID")
        public Integer mealPlannerID;

        @SerializedName("mealPlanTitle")
        public String mealPlanTitle;

        @SerializedName("studentActivityMealFoodItems")
        public ArrayList<StudentActivityMealFoodItem> studentActivityMealFoodItems=null;



    }
}
