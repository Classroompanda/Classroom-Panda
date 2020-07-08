export interface ParentDetailsVM {
  UpdatedFlag?: number;
  Id?: number;
  TeacherName?: string;
  AgencyID?: number;
  UserID?: number;
  FirstName?: string;
  LastName?: string;
  GenderID?: number;
  DateOfBirth?: any;
  ImagePath?: string;
  PositionTypeID?: number;
  TeacherStatusID?: number;
  DateHired?: any;
  Email?: string;
  EmailId?: string;
  Address?: string;
  CountryId?: number;
  StateId?: number;
  CityId?: number;
  Certification?: string;
  PostalCode?: string;
  PhoneNumber?: number;
  HomePhone?: number;
  GrossPayPerHour?: any;
  Password?: any;
  Mobile?: number;
  Apartment?: string;
  Profession?: string;
  createdBy?: number;
  updatedBy?: number;
  relationTypeId?: number;
  addedByID?: number;
  isParent?: boolean;
  AssociatedChild?: any;
  IsAuthorizedToPickup?: boolean;
  ReasonNotToAllow?: string;
  IsJoinClassroom?: boolean;
  isSecondaryParent?: boolean;
  isGaurdian?: boolean;
  isDeleted?: boolean;
  isActive?: boolean;
  parentName?: string;
  imagePath?: string;
  parentID?: number;
  parentUserID?: number;
  listUserName?: string;
  listUserId?: number;
  employerNumber?: number;
  employerName?: string;
  employerAddress?: string;
  count?: number;

}



export interface ChildListVM {
  classActive?: string;
  address?: string;
  agencyID?: number;
  childsAddress?: string;
  childsContactNumber?: number;
  cityId?: number;
  cityName?: string;
  classId?: number;
  className?: string;
  countryId?: number;
  countryName?: string;
  createdBy?: number;
  createdDate?: any;
  createdFromIP?: number;
  dateOfBirth?: any;
  deletedBy?: number;
  deletedDate?: any;
  deletedFromIP?: number;
  enrolledClassesInformation?: any;
  feePaymentTypeID?: number;
  feePaymentTypeName?: string;
  firstName?: string;
  genderID?: number;
  genderName?: string;
  guardians?: any;
  imagePath?: string;
  insuranceCarrier?: any;
  insurancePolicyNumber?: string;
  isDeleted?: boolean;
  lastName?: string;
  parentContactNumber?: number;
  parentEmailAddress?: any;
  parentID?: number;
  parentName?: string;
  physicianName?: any;
  postalCode?: string;
  preferredHospital?: any;
  registeredDate?: string;
  schoolName?: string;
  stateId?: number;
  stateName?: string;
  studentAllergies?: any;
  studentDisabilities?: any;
  studentId?: any;
  studentImmunizations?: any;
  studentMedications?: any;
  studentName?: string;
  transportationID?: number;
  transportationTypeName?: string;
  updatedBy?: number;
  updatedDate?: any;
  updatedFromIP?: any;
  isActive: boolean;
}


export interface MedicationVM {
  updatedBy?: number;
  UpdatedFlag?: number;
  studentMedicationID?: number;
  studentID?: number;
  medicationName?: string;
  agencyID?: number;
  units?: number;
  strength?: string;
  doseRepeatID?: number;
  dosageQuantityID?: number;
  dosageQuantityName?: string;
  doseRepeatName?: string;
  howTaken?: string;
  otherMedication?: string;
  startDate?: any;
  endDate?: any;
  id?: number;
  createdBy?: number;
  modifiedBy?: number;
}



export interface ImmunizationVM {
  updatedBy?: number;
  UpdatedFlag?: number;
  studentImmunizationID?: number;
  studentID?: number;
  immunizationID?: number;
  immunizationName?: string;
  agencyID?: number;
  otherImmunization?: string;
  abbreviation?: string;
  dateReceived?: any;
  id?: number;
  stringId?: number;
  isActive?: true;
  isDeleted?: true;
  createdBy?: number;
  modifiedBy?: number;
}


export interface AllergyVM {
  updatedBy?: number;
  UpdatedFlag?: number;
  studentAllergiesID?: number;
  studentID?: number;
  allergyReactionTypeID?: number;
  allergyReactionTypeName?: string;
  allergyNameID?: number;
  allergyName?: string;
  agencyID?: number;
  allergyComment?: string;
  firstAllergyObservation?: any;
  lastAllergyObservation?: any;
  allergyTypeID?: number;
  allergyTypeName?: string;
  treatment?: string;
  id?: number;
  createdBy?: number;
  modifiedBy?: number;


}



export interface PostDetailsVM {
  updatedBy?: number;
  UpdatedFlag?: number;
  totalLikes?: number;
  isPublic?: boolean;
  postComment?: string;
  postActivityImages?: any;
  postActivityVideos?: any;
  id?: number;
  isPostALreadyLiked?: boolean;
  isAlreadyPostComment?: boolean;
  imagePath?: string;
  studentName?: string;
  postedDate?: any;
  postTitle?: any;
  postDescription?: string;
  isTodaysPost?: boolean;
}

export interface AchInfoVM {
  accountNumber?: any;
  routingNumber?: any;
  accountHolderName?: string;
  accountType?: any;
  agencyID?: number;
  parentID?: number;
}

export interface RecurringPayment {
  id?: any;
  amount?: any;
  billingCycle?: any;
  paymentFromDate?: any;
  paymentToDate?: any;
  firstPaymentDate?: any;
  agencyID?: number;
  parentID?: number;
  onGoing?: boolean;
}

export interface VerifyAccountVM {
  amountFirst?: any;
  amountSecond?: any;
  agencyID?: number;
  parentID?: number;
}

export interface OneTimePaymentVM {
  amount?: any;
  date?: any;
  agencyID?: number;
  parentID?: number;
}
