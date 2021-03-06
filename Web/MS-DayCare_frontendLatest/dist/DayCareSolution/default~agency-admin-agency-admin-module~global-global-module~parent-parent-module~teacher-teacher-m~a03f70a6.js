(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~agency-admin-agency-admin-module~global-global-module~parent-parent-module~teacher-teacher-m~a03f70a6"],{

/***/ "./src/app/layout/agency-admin/components/shared/constatant.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/agency-admin/components/shared/constatant.ts ***!
  \*********************************************************************/
/*! exports provided: AgencyAPIURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgencyAPIURLs", function() { return AgencyAPIURLs; });
var AgencyAPIURLs = {
    // Student page
    GetAllEnrolledStudents: 'api/Agency/GetAllEnrolledStudents',
    GetAllUnaaprovedStudents: 'api/Agency/GetAllUnaaprovedStudents',
    GetActivatedAndDeactivatedStudents: 'api/Agency/GetActivatedAndDeactivatedStudents',
    SaveClassInformation: 'api/Agency/SaveClassInformation',
    GetAllClasses: 'api/Agency/GetAllClasses',
    GetAllClassesForParent: 'api/Agency/GetAllClassesForParent',
    GetParticularClassDetails: 'api/Agency/GetParticularClassDetails',
    GetAllClassCategories: 'api/Masters/GetAllClassCategories',
    GetAllPostActivitiesForAgencyAdmin: 'api/Agency/GetAllPostActivitiesForAgencyAdmin',
    UploadStudentUserWithFile: 'api/Parent/UploadStudentUserWithFile',
    // Class assignment page
    GetAllClassAssignmentLog: 'api/Agency/GetAllClassAssignmentLog',
    SaveClassAssignmentInformation: 'api/Agency/SaveClassAssignmentInformation',
    ClassAssignmentUsingFile: 'api/Agency/ClassAssignmentUsingFile',
    // Class page
    GetFessPaymentTypeDropdown: 'api/Masters/GetFessPaymentTypeDropdown',
    // Teacher Page
    GetAllTeacherForAgency: 'api/Agency/GetAllTeacherForAgency',
    ActivateTeacher: 'api/Agency/ActivateTeacher',
    ActivateClockInTeacher: 'api/Agency/ActivateClockInTeacher',
    UploadTeacherUserWithFile: 'api/Agency/UploadTeacherUserWithFile',
    UpdateEmailForTeacher: 'api/Teacher/UpdateEmailForTeacher',
    // Parent page
    GetAllParentInformationForAgency: 'api/Agency/GetAllParentInformationForAgency',
    GetParentAccordingtoLogin: 'api/Parent/GetParentAccordingtoLogin',
    ActivateParent: 'api/Agency/ActivateParent',
    GetMasterParentForDropdown: 'api/Parent/GetMasterParentForDropdown',
    GetAllStudentForParentDropdown: 'api/Masters/GetAllStudentForParentDropdown',
    UploadParentUserWithFile: 'api/Parent/UploadParentUserWithFile',
    UpdateEmailForParent: 'api/Parent/UpdateEmailForParent',
    ChangeQuickPinForParent: 'api/Parent/ChangeQuickPinForParent',
    // Class Page
    GetAllParentWithoutGuardian: 'api/Parent/GetAllParentWithoutGuardian',
    UploadClassesWithFile: 'api/Agency/UploadClassesWithFile',
    // Payment page
    CreateStripeAccount: 'api/Masters/CreateStripeAccount',
    GetStripeDetailsForAgency: 'api/Masters/GetStripeDetailsForAgency',
    GetDuePaymentAccordingToAgency: 'api/Masters/GetDuePaymentAccordingToAgency',
    InvoiceSchedular: '/api/Masters/InvoiceSchedular',
    GetPaymentDetailsForAgency: 'api/Agency/GetPaymentDetailsForAgency',
    GetTransactionType: 'api/Masters/GetTransactionType',
    GetBankAccountDetails: 'api/Masters/GetBankAccountDetails',
    GetTransactionMaster: 'api/Masters/GetTransactionMaster',
    SaveTransactionMasterInfo: 'api/Masters/SaveTransactionMasterInfo',
    GetTransactionMasterDetails: 'api/Masters/GetTransactionMasterDetails',
    SaveTransactionDetailsInfo: 'api/Masters/SaveTransactionDetailsInfo',
    SaveExtraChargeFeeMasterInfo: 'api/Masters/SaveExtraChargeFeeMasterInfo',
    GetExtraFeeChargeMasterList: 'api/Masters/GetExtraFeeChargeMasterList',
    BulkFeeCalculation: 'api/Masters/BulkFeeCalculation',
    GetParentsListForSendBalance: 'api/Masters/GetParentsListForSendBalance',
    GetDuePaymentAccordingToParentAgency: 'api/Report/GetDuePaymentAccordingToParentAgency',
    // Meal Planner
    SaveMealPlan: 'api/Agency/SaveMealPlan',
    UpdateParticularMealPlan: 'api/Agency/UpdateParticularMealPlan',
    GetParticularMealPlan: 'api/Agency/GetParticularMealPlan',
    SaveMealItemInformation: 'api/Agency/SaveMealItemInformation',
    GetParticularAgencyDetails: 'api/Agency/GetParticularAgencyDetails',
    GetMealItemInformation: 'api/Agency/GetMealItemInformation',
    // Agency Dashboard page
    GetAllPresentTeachersForAgency: 'api/Agency/GetAllPresentTeachersForAgency',
    GetCountDetailsForAgencyAdmin: 'api/Agency/GetCountDetailsForAgencyAdmin',
    UpdateLastLogin: 'api/Agency/UpdateLastLogin',
    // Attendance Report
    GetClassAttendenceReport: 'api/Report/GetClassAttendenceReport',
    //  Report pages
    GetDuePaymentReport: 'api/Report/GetDuePaymentReport',
    GetChildEnrollmentReport: 'api/Report/GetChildEnrollmentReport',
    GetBirthDateReport: 'api/Report/GetBirthDateReport',
    PdfReportForBirthday: 'api/Report/PdfReportForBirthday',
    PdfReportForStaffBirthday: 'api/Report/PdfReportForStaffBirthday',
    PdfReportForKioskeIDDetails: 'api/Report/PdfReportForKioskeIDDetails',
    GetStaffBirthDateReport: 'api/Report/GetStaffBirthDateReport',
    PdfReportForClassAttendence: 'api/Report/PdfReportForClassAttendence',
    GetKioskeIDDetails: 'api/Report/GetKioskeIDDetails',
    PdfReportForDuePayment: 'api/Report/PdfReportForDuePayment',
    PdfReportForChildEnrollment: 'api/Report/PdfReportForChildEnrollment',
    DeleteExistingFile: 'api/Report/DeleteExistingFile',
    GetListForChat: 'api/Message/GetListForChat',
    SendEmail: 'api/Message/SendEmail',
    SendTextMessage: 'api/Message/SendTextMessage',
    GetRemainingTextMessages: 'api/Message/GetRemainingTextMessages',
    BuyTextMessagePlan: 'api/Message/BuyTextMessagePlan',
    GetLedgerReport: 'api/Report/GetLedgerReport',
    UpdateStudentKioskeTime: 'api/Agency/UpdateStudentKioskeTime',
    GetBusReport: 'api/Report/GetBusReport',
    PdfReportForBus: 'api/Report/PdfReportForBus',
    // AccountLedgerReport: 'api/Report/AccountLedgerReport',
    AccountLedgerReport: 'api/Report/GetAllLedgerReport',
    GetKioskDetails: 'api/Report/GetKioskeDetails',
    PdfReportForkioskeDetails: 'api/Report/PdfReportForkioskeDetails',
    PdfReportForLedger: 'api/Report/PdfReportForLedger',
    GetAllLedgerReportPDF: 'api/Report/GetAllLedgerReportPDF',
    GetFamilyDetailsReport: 'api/Report/GetFamilyDetailsReport',
    PdfReportForFamily: 'api/Report/PdfReportForFamily',
    GetMedicationReport: 'api/Report/GetMedicationReport',
    PdfMedicationReport: 'api/Report/PdfMedicationReport',
    GetAllergyReport: 'api/Report/GetAllergyReport',
    PdfAllergyReport: 'api/Report/PdfAllergyReport',
    PdfGivenMedicationList: 'api/Report/PdfGivenMedicationList',
    GetGivenMedicationReport: 'api/Report/GetGivenMedicationReport',
    TeacherClassAttendenceReport: 'api/Report/TeacherClassAttendenceReport',
    PDFTeacherClassAttendenceReport: 'api/Report/PDFTeacherClassAttendenceReport',
    GetTeacherSpentHoursReport: 'api/Report/GetTeacherSpentHoursReport',
    GetPDFTeacherSpenHoursReport: 'api/Report/GetPDFTeacherSpenHoursReport',
    GetBankDepositReport: 'api/Report/GetBankDepositReport',
    PdfReportForBankDeposit: 'api/Report/PdfReportForBankDeposit',
    GetDeactivatedStudentsReport: 'api/Report/GetDeactivatedStudentsReport',
    PdfReportForDeactivatedStudents: 'api/Report/PdfReportForDeactivatedStudents',
    GetTaxStatementReport: 'api/Report/GetTaxStatementReport',
    PdfReportForTaxStatement: 'api/Report/PdfReportForTaxStatement',
    /**Setting Page */
    SaveDDMasterInformation: 'api/Masters/SaveDDMasterInformation',
    SaveDDMasterInformationIndStudent: 'api/Masters/SaveDDMasterInformationIndStudent',
    GetDDMasterInformationIndStudent: 'api/Masters/GetDDMasterInformationIndStudent',
    SaveSubsidyDetails: 'api/Masters/SaveSubsidyDetails',
    GetSubsidyDetails: 'api/Masters/GetSubsidyDetails',
    getCurrentDDActivityIntervalSetting: 'api/Masters/getCurrentDDActivityIntervalSetting',
    /**Add Fees Page */
    PerDayFeeCalculation: 'api/Masters/GetPerDayFeeCalculation',
    SaveCalculatedFees: 'api/Masters/SaveCalculatedFees',
    GetAddFeesDetails: 'api/Masters/GetAddFeesDetails',
    SaveInvoiceDetails: 'api/Masters/GenerateInvoice',
    GetAddFeesDetailsView: 'api/Masters/GetAddFeesDetailsView',
    UpdateCalculatedFees: 'api/Masters/UpdateCalculatedFees',
    DeleteFeesCalculation: 'api/Masters/DeleteFeesCalculation',
    /**Incident page */
    PDFAllIncidents: 'api/Report/PDFAllIncidents',
    PDFAllIncidentsParticularID: 'api/Report/GetIncidentsDetailsPDF',
    PDFFamilyDetailsReportByStudentID: 'api/Report/GetFamilyDetailsReportByStudentID',
    /**Discount page */
    SaveStudentFeesDiscountAmount: 'api/Masters/SaveStudentFeesDiscountAmount',
    GetStudentFeesDiscountAmount: 'api/Masters/GetStudentFeesDiscountAmount',
    GetSubsidyType: 'api/Masters/GetSubsidyType',
    SaveStudentSubsidyDetails: 'api/Masters/SaveStudentSubsidyDetails',
    GetStudentSubsidyDetails: 'api/Masters/GetStudentSubsidyDetails',
    DeleteStudentSubsidyType: 'api/Masters/DeleteStudentSubsidyType',
    DeleteSubsidyType: 'api/Masters/DeleteSubsidyType',
    // Subsidy
    GetStudentSubsidyList: 'api/Masters/GetStudentSubsidyList',
    GetAllStudentDropdown: 'api/Masters/GetAllStudentDropdown',
    // Student details
    GetAuthorizedPersonByStudentId: 'api/Masters/GetAuthorizedPersonByStudentId',
    GetRestrictedPersonByStudentId: 'api/Masters/GetRestrictedPersonByStudentId',
    StudentTransferAttendanceReport: 'api/Report/StudentTransferAttendanceReport',
    PDFStudentTransferAttendanceReport: 'api/Report/PDFStudentTransferAttendanceReport',
    UpdateTeacherClockOutTime: 'api/Teacher/UpdateTeacherClockOutTime',
    UpdateTeacherClockInTime: 'api/Teacher/UpdateTeacherClockInTime',
    GetMealServeReportPDF: '/api/Report/GetMealServeTodayPDF',
    SavestudentFiles: 'api/Masters/SavestudentFiles',
    GetUploadedFilesByStudentId: 'api/Masters/GetUploadedFilesByStudentId',
    DeleteStudentFilesById: 'api/Masters/DeleteStudentFilesById',
    // Parent Student CSV Download
    GetAllParentInformationForCSV: 'api/Agency/GetAllParentInformationForCSV',
    GetAllStudentInformationForCSV: 'api/Agency/GetAllStudentInformationForCSV',
    // Get Agency Country And State ID
    GetAgencyCountryStateID: 'api/Masters/GetAgencyCountryStateID',
    // Get Parent Ledger
    GetParentLedger: 'api/Masters/GetParentLedger',
    GetStudentLedger: 'api/Masters/GetStudentLedger',
    GetPdfReportForPaymentLedger: 'api/Report/PdfReportForPaymentLedger',
    SendInvoiceMail: 'api/Report/SendInvoiceMail',
    // Get Classes By Student ID
    GetClassesByStudentID: 'api/Agency/GetClassesByStudentID',
    // Get All Fee Type List
    GetFeeType: 'api/Agency/GetFeeType',
    //
    CreateInvoiceLedgerItem: 'api/Masters/SaveInvoiceDetails',
    CreatePaymentLedgerItem: 'api/Masters/SavePaymentDetails',
    GetRecurringBillingByStudentID: 'api/Masters/GetRecurringBillingByStudentID',
    SaveRecurringBillingByStudentID: 'api/Masters/SaveRecurringBillingByStudentID',
    // For Image Approval Type
    GetImageApprovalType: 'api/Masters/GetImageApprovalType',
    SaveImageApprovalType: 'api/Masters/SaveImageApprovalType',
    GetUnApproveImages: 'api/Masters/GetUnApproveImages',
    ApproveImages: 'api/Masters/ApproveImages',
    // For Parent Kiosk Login
    GetAllStudentsforKioskApp: 'api/Agency/GetAllStudentsforKioskApp',
    SaveKioskeStudentSignInDetails: 'api/Agency/SaveKioskeStudentSignInDetails',
    SaveParentSignatureDetails: 'api/Parent/SaveParentSignatureDetails',
    // For Agency Bus Data
    SaveAllBus: 'api/Agency/SaveAllBus',
    GetAllBus: 'api/Agency/GetAllBus'
};


/***/ })

}]);
//# sourceMappingURL=default~agency-admin-agency-admin-module~global-global-module~parent-parent-module~teacher-teacher-m~a03f70a6.js.map