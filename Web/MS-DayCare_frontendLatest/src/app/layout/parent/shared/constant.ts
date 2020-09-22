export const ParentAPIURLs = {
    // Child Form page
    GetParentInformation: 'api/Parent/GetParentInformation',
    GetParentUpdatedInformation: 'api/Parent/GetParentUpdatedInformation',
    DeleteParentUpdatedInformation: 'api/Parent/DeleteParentUpdatedInformation',
    GetAllStudentsOfParent: 'api/Parent/GetAllStudentsOfParent',
    GetAllStudentsForEnroll: 'api/Parent/GetAllStudentsForEnroll',
    SaveParentInformation: 'api/Parent/SaveParentInformation',
    SaveStudent: 'api/Parent/SaveStudent',
    ActivateStudent: 'api/Agency/ActivateStudent',
    SaveStudentGaurdians: 'api/Parent/SaveStudentGaurdians',
    SaveStudentMedication: 'api/Parent/SaveStudentMedication',
    GetRelationType: 'api/Masters/GetRelationType',
    GetAllDoseRepeat: 'api/Masters/GetAllDoseRepeat',
    GetImmunizationType: 'api/Masters/GetImmunizationType',
    SaveStudentImmunization: 'api/Parent/SaveStudentImmunization',
    SaveStudentDisabilities: 'api/Parent/SaveStudentDisabilities',
    GetAllergyType: 'api/Masters/GetAllergyType',
    GetAllergyReactionType: 'api/Masters/GetAllergyReactionType',
    GetAllergyName: 'api/Masters/GetAllergyName',
    SaveStudentAllergies: 'api/Parent/SaveStudentAllergies',
    // Attendance Page
    GetStudentClassEnrollment: 'api/Parent/GetStudentClassEnrollment',
    GetAttendanceListforparent: 'api/Parent/GetAttendanceListforparent',
    SaveStudentEnrollment: 'api/Parent/SaveStudentEnrollment',
    // daily activity report page
    GetDailySheetForParent: 'api/Parent/GetDailySheetForParent',
    GetParticularStudentActivityDiaperChanges: 'api/Classes/GetParticularStudentActivityDiaperChanges',
    GetParticularStudentActivityNap: 'api/Classes/GetParticularStudentActivityNap',
    GetParticularStudentOtherActivity: 'api/Classes/GetParticularStudentOtherActivity',
    GetParticularStudentActivityMoods: 'api/Classes/GetParticularStudentActivityMoods',
    GetParticularStudentActivityNotes: 'api/Classes/GetParticularStudentActivityNotes',
    GetParticularStudentActivityMedications: 'api/Classes/GetParticularStudentActivityMedications',
    GetParticularStudentActivityMeals: 'api/Classes/GetParticularStudentActivityMeals',
    GetAllPostActivitiesByChildID : 'api/Parent/GetAllPostActivitiesByChildID',

    // Dashboardpage
    SaveParentDashboardImagedLikeInformation: 'api/Parent/SaveParentDashboardImagedLikeInformation',
    SaveParentDashboardVideoLikeInformation: 'api/Parent/SaveParentDashboardVideoLikeInformation',
    GetAllParentInformation: 'api/Parent/GetAllParentInformation',
    PaymentDetails: 'api/Masters/PaymentDetails',
    PayPayment: 'api/Masters/PayPayment',
    //GetDuePaymentAccordingToParent: 'api/Masters/GetDuePaymentAccordingToParent',
    GetBalanceAccordingToParent: 'api/Masters/GetBalanceAccordingToParent',
    // Payment page
    GetPaymentDetailsForParent: 'api/Masters/GetPaymentDetailsForParent',
    GetPaymentDetailForParent: 'api/Masters/GetPaymentDetailForParent',
    // Message

    GetAssociatedTeacherListForChat: 'api/Message/GetAssociatedTeacherListForChat',
    GetMessageByID: 'api/Message/GetMessageByID',
    GetListForChat: 'api/Message/GetListForChat',
    SaveAdvanceFeePaymentDetails: 'api/Masters/SaveAdvanceFeePaymentDetails',
    UnreadMessageByID: 'api/Message/UnreadMessageByID',

    // Get Parent Address
    GetParentAddress: 'api/Parent/GetParentAddress',
    // Update data of Student's Enroll class
    UpdateStudentEnrollment: 'api/Parent/UpdateStudentEnrollment',

    // tslint:disable-next-line: comment-format
    //For ACH Information
    SaveACHInformationByParentID: 'api/Masters/SaveACHInformationByParentID',
    GetACHInformationByParentID : 'api/Masters/GetACHInformationByParentID',
    SaveRecurringPaymentByParentID : 'api/Masters/SaveRecurringPaymentByParentID',
    DeleteRecurringPaymentByParentID : 'api/Masters/DeleteRecurringPaymentByParentID',
    GetRecurringPaymentByParentID : 'api/Masters/GetRecurringPaymentByParentID',
    VerifyACHBankAccountByParentID : 'api/Masters/VerifyACHBankAccountByParentID',
    OneTimePaymentByACH: 'api/Masters/OneTimePaymentByACH',

    // Save Allergy By Super Admin
    SaveAllergyType: 'api/Masters/SaveAllergyType',
    SaveAllergyReactionType: 'api/Masters/SaveAllergyReactionType',
    SaveAllergyName: 'api/Masters/SaveAllergyName',

    // For Dose Repeat
    SaveAllDoseRepeat: 'api/Masters/SaveAllDoseRepeat',

    // Notification Setting
    GetNotificationSetting: 'api/Message/GetNotificationSetting',
    SaveNotificationSetting: 'api/Message/SaveNotificationSetting',

    // Save Coupon
    SaveCoupon: 'api/Masters/SaveCoupon',
    GetCoupons: 'api/Masters/GetCoupons',
    ActivateDeactivateCoupon: 'api/Masters/ActivateDeactivateCoupon',
    CheckCoupon: 'api/Masters/CheckCoupon',

    // For Deactivate Reason
    GetDeactivateReason: 'api/Masters/GetDeactivateReason',
    SaveDeactivateReason: 'api/Masters/SaveDeactivateReason'

};

