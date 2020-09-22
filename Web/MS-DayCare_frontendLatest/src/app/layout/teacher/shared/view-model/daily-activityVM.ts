export interface ActivityVM {
  studentID?: string;
  description?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  otherActivityNote?: string;
  activityTypeID?: number;
  studentActivitiesID?: number;
}

export interface MealVM {
  studentID?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  MealTypeName?: string;
  MealTypeID?: number;
  MealComment?: string;
  activityTypeID?: number;
  mealTypeID?: number;
  mealComment?: string;
  otherThanPlanMeal?: string;
  otherThanPlanMealComment?: string;
  studentActivitiesID?: number;
  StudentActivityMealFoodItems?: any;
  MealPlannerID?: any;
  mealPlanTitle?: string;

}

export interface HealthVM {
  studentID?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  activityTypeID?: number;
  studentActivitiesID?: number;
  studentHealthDescription?: string;
  recordedTemparture?: any;
  howTaken?: string;
  studentMedicationID?: number;
  doseRepeatID?: number;
  dosageQuantityID?: number;
  studentMedicationName?: string;
  unit?: number;
  doseRepeatName?: string;
  isParentAcknowledge?: boolean;
  isTeacherAcknowledge?: boolean;
  AcknowledgeTeacherID?: number;
  AcknowledgeParentID?: number;
  acknowledgeTeacherName?: string;
  acknowledgeParentName?: string;
  classesID?: number;
  IsMedicationDoneToday?: boolean;

}

export interface MoodVM {
  studentID?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  activityTypeID?: number;
  studentActivitiesID?: number;
  moodTypeID?: number;
  studentMoodDescription?: string;

}

export interface NotesVM {
  studentID?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  activityTypeID?: number;
  studentActivitiesID?: number;
  noteDescription?: string;

}


export interface DailySheetList {
  isMarked?: boolean;
  activityRegisterDate?: any;
  activityTypeID?: number;
  activityTypeName?: string;
  agencyID?: number;
  classesID?: number;
  createdBy?: number;
  createdDate?: any;
  createdFromIP?: any;
  deletedBy?: any;
  deletedDate?: any;
  deletedFromIP?: any;
  id?: number;
  imagePath?: any;
  studentID?: number;
  studentName?: string;
  studentOtherActivity?: any;
  studentActivityNotes?: any;
  studentActivityMoods?: any;
  studentActivityMedications?: any;
  studentActivityMeals?: any;
  studentAcitivityNap?: any;
  studentActivityDiaper?: any;
  myActivity?: any ;
  studentId?: any; // this is added to use diffrent code
}

export interface MoodList {
  studentID?: string;
  startTime?: any;
  endTime?: any;
  agencyID?: number;
  id?: number;
  activityTypeID?: number;
  studentActivitiesID?: number;
  label?: string;
  value?: number;
  imagepath?: any;

}

export interface NapVM {
  studentID?: string;
  description?: string;
  sleptAtTime?: any;
  workUpTime?: any;
  napNote?: string;
  agencyID?: number;
  id?: number;
  otherActivityNote?: string;
  activityTypeID?: number;
  studentActivitiesID?: number;
}


export interface DiperVM {
  studentID?: string;
  StudentActivityDiaperNote?: string;
  diaperChangeTime?: any;
  agencyID?: number;
  id?: number;
  otherActivityNote?: string;
  activityTypeID?: number;
  studentActivitiesID?: number;
}


