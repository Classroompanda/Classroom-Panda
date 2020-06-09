//
//  Constant.swift
//  Inchora App
//
//  Created by Subhash Kumar on 09/10/18.
//  Copyright © 2018 smartData. All rights reserved.
//

import Foundation
import UIKit



struct ScreenSize{
  static let screenWidth  = UIScreen.main.bounds.size.width
  static let screenHeight = UIScreen.main.bounds.size.height
}

enum ApiVersion: String {
  case v1 = "1"
  case v2 = "2"
}


struct DateFormat {
  static let DatePickerFormat = "yyyy-MM-dd HH:mm:ss Z" // used while creating recurring payment
  static let utcDateFormat = "yyyy-MM-ddHH:mm:ss.sssZ" // used while creating recurring payment
  
}

struct AppDateFormat {
  static var format12Hour = "dd/MM/yyyy hh:mm a"
  static var format24Hour = "dd/MM/yyyy HH:mm"
}

enum fonts{
  static let customButtonFont = UIFont(name: "Poppins-Medium", size: 15.0)
  static let customButtonFontForPad = UIFont(name: "Poppins-Medium", size: 20.0)
  static let navigationTitleFont = UIFont(name: "Poppins-Regular", size: 18.0)
  static let calendarDateFont = UIFont(name: "Poppins-Medium", size: 13.0)
  static let customLoginButtonPadFont = UIFont(name: "Poppins-Medium", size: 20.0)
  static let customLoginButtonFont = UIFont(name: "Poppins-Medium", size: 15.0)
  static let fieldTitle = UIFont(name: "Poppins-Regular", size: 15.0)
  static let customPopupButtonFont = UIFont(name: "Poppins", size: 13.0)
}


enum colorCode{
  static let applicationColor = UIColor(red: 255.0/255.0, green: 108.0/255.0, blue: 108.0/255.0, alpha: 1.0)
  static let gradientTopColor = UIColor(red: 88.0/255.0, green: 167.0/255.0, blue: 254.0/255.0, alpha: 1.0)
  static let gradinetBottomColor = UIColor(red: 255.0/255.0, green: 108.0/255.0, blue: 108.0/255.0, alpha: 1.0)
  static let grayShadeColor    = UIColor(red: 112.0/255.0, green: 112.0/255.0, blue: 112.0/255.0, alpha: 1.0)
  static let grayShadeColorr    = UIColor(red: 112.0/255.0, green: 112.0/255.0, blue: 112.0/255.0, alpha: 0.3)
  static let dullColoer   =   UIColor(red: 120.0/255.0, green: 120.0/255.0, blue: 140.0/255.0, alpha: 0.4)
  static let selectedButtonColor    = UIColor(red: 112.0/255.0, green: 112.0/255.0, blue: 112.0/255.0, alpha: 1.0)
  static let unSelectedButtonColor  = UIColor(red: 180.0/255.0, green: 180.0/255.0, blue: 180.0/255.0, alpha: 1.0)
  static let cellSelectedColor    =   UIColor(red: 255.0/255.0, green: 0.0/255.0, blue: 0.0/255.0, alpha: 0.1)
  static let lblGrayColor = UIColor(red: 149.0/255.0, green: 157.0/255.0, blue: 173.0/255.0, alpha: 1.0)
}

struct Gender {
  static let male     :   Int =   1
  static let female   :   Int =   2
}

struct RoleId {
  static let parent   : Int   = 4
  static let teacher  : Int   = 3
}

struct Macros
{
  static let  ApplictionName : String = NSLocalizedString("Daycare Parent", comment: "")
  
  struct DefaultKeys {
    static let kUserDetails:String = "UserDetails"
    static let kDeviceToken:String = "device_token"
    static let kParentDetails: String = "ParentDetails"
    static let kAccessToken: String = "AccessToken"
    static let kLoginUser : String = "LoginUser"
  }
  enum Config {
    static let chattingUrl: String = "https://www.stagingwin.com:9943/chat" // Live server
    //        static let chattingUrl: String = "https://schoolpandaapp.azurewebsites.net/chat" //Azure server
    
    static let baseServer  : String = "https://www.stagingwin.com:9943/api" // Live Server
    //        static let baseServer : String = "https://schoolpandaapp.azurewebsites.net/api" //Azure server
    
    
    //Image Server URL
    static let imageUrl :   String =    "http://75.126.168.31:9942/" // Live Server
    
  }
  
  // Below are the service name which will be apended with Base server for requests
  struct ServiceName{
    static let chatroom                     :   String  =   "/chatroom"
    
    static let UserLogin                    :   String  =   "/User/login"
    static let ParentSignup                 :   String  =   "/Common/RegisterParentInformation"
    static let ForgotPassword               :   String  =   "/Common/ForgotPassword"
    static let GetAllStudentsListOfParent   :   String  =   "/Parent/GetAllStudentsListOfParent"
    static let GetAllEvents                 :   String  =   "/Agency/GetAllEvents"
    static let GetAllMealPlan               :   String  =   "/Agency/GetAllMealPlan"
    static let GetAllMealTypeDropdown       :   String  =   "/Masters/GetAllMealTypeDropdown"
    static let GetAllIncidentsByChildID     :   String  =   "/Parent/GetAllIncidentsByChildID"
    static let GetDailySheetForParent       :   String  =   "/Parent/GetDailySheetForParent"
    static let GetAllStudentsOfParent       :   String  =   "/Parent/GetAllStudentsOfParent"
    static let GetAllCountry                :   String  =   "/Masters/GetAllCountry"
    static let GetAllStates                 :   String  =   "/Masters/GetAllStates"
    static let GetAllCities                 :   String  =   "/Masters/GetAllCities"
    static let MultipleImageUpload          :   String  =   "/Common/MultipleImageUpload"
    static let SaveStudent                  :   String  =   "/Parent/SaveStudent"
    static let GetStudentClassEnrollment    :   String  =   "/Parent/GetStudentClassEnrollment"
    static let GetAttendanceListforparent   :   String  =   "/Parent/GetAttendanceListforparent"
    static let GetStudentBreakLogs          :   String  =   "/Teacher/GetStudentBreakLogs"
    static let GetAllSubActivityType        :   String  =   "/Masters/GetAllSubActivityType"
    static let GetTodayMealPlan             :   String  =   "/Classes/GetTodayMealPlan"
    static let GetRelationType              :   String  =   "/Masters/GetRelationType"
    static let SaveStudentGaurdians         :   String  =   "/Parent/SaveStudentGaurdians"
    static let GetAllGuardiansForStudents   :   String  =   "/Agency/GetAllGuardiansForStudents"
    static let GetImmunizationType          :   String  =   "/Masters/GetImmunizationType"
    static let GetAllergyName               :   String  =   "/Masters/GetAllergyName"
    static let GetAllergyReactionType       :   String  =   "/Masters/GetAllergyReactionType"
    static let GetAllergyType               :   String  =   "/Masters/GetAllergyType"
    static let GetAllDoseRepeat             :   String  =   "/Masters/GetAllDoseRepeat"
    static let SaveStudentMedication        :   String  =   "/Parent/SaveStudentMedication"
    static let SaveStudentImmunization      :   String  =   "/Parent/SaveStudentImmunization"
    static let SaveStudentAllergies         :   String  =   "/Parent/SaveStudentAllergies"
    static let SaveStudentDisabilities      :   String  =   "/Parent/SaveStudentDisabilities"
    static let GetStudentInformation        :   String  =   "/Agency/GetStudentInformation"
    static let getAllClassesAPI             :   String  =   "/Classes/GetAllClasses"
    static let SaveStudentEnrollment        :   String  =   "/Parent/SaveStudentEnrollment"
    static let GetParentInformation         :   String  =   "/Parent/GetParentInformation"
    static let GetAllPostActivitiesByChildID:   String  =   "/Parent/GetAllPostActivitiesByChildID"
    static let SaveParentInformation        :   String  =   "/Parent/SaveParentInformation"
    static let GetParentAccordingtoLogin    :   String  =   "/Parent/GetParentAccordingtoLogin"
    static let PaymentDetails               :   String  =   "/Masters/PaymentDetails"
    static let GetStripeDetailsForAgency    :   String  =   "/Masters/GetStripeDetailsForAgency"
    static let GetPaymentDetailsForParent   :   String  =   "/Masters/GetPaymentDetailsForParent"
    static let GetParticularMealPlan        :   String  =   "/Agency/GetParticularMealPlan"
    static let UpdatedPassword              :   String  =   "/Common/UpdatedPassword"
    static let GetListForChat               :   String  =   "/Message/GetListForChat"
    static let GetMessageByID               :   String  =   "/Message/GetMessageByID"
    static let GetUnreadMessageCount           =   "/Message/GetUnReadMessageCount"
    static let SaveStudentActivity          :   String  =   "/Classes/SaveStudentActivity"
    static let UpdateIncidentDetailsByParent:  String  =   "/Agency/UpdateIncidentDetailsByParent"
    static let GetDuePaymentAccordingToParent           :   String  =   "/Masters/GetDuePaymentAccordingToParent"
    static let SaveParentDashboardImagedLikeInformation :   String  =   "/Parent/SaveParentDashboardImagedLikeInformation"
    static let SaveParentDashboardVideoLikeInformation  :   String  =   "/Parent/SaveParentDashboardVideoLikeInformation"
    static let GetParticularStudentActivityNap          :   String  =   "/Classes/GetParticularStudentActivityNap"
    static let GetParticularStudentOtherActivity        :   String  =   "/Classes/GetParticularStudentOtherActivity"
    static let GetParticularStudentActivityMoods        :   String  =   "/Classes/GetParticularStudentActivityMoods"
    static let GetParticularStudentActivityNotes        :   String  =   "/Classes/GetParticularStudentActivityNotes"
    static let GetParticularStudentActivityMedications  :   String  =   "/Classes/GetParticularStudentActivityMedications"
    static let GetParticularStudentActivityMeals        :   String  =   "/Classes/GetParticularStudentActivityMeals"
    static let GetParticularStudentActivityDiaperChanges:   String  =   "/Classes/GetParticularStudentActivityDiaperChanges"
    
    static let getAgencyListing               :   String  =   "/Common/GetAllAgencyList"
    static let GetDueBalanceAccordingToParent :  String  = "/Masters/GetBalanceAccordingToParent"
    
    static let getACHAccount        :   String  =   "/Masters/GetACHInformationByParentID"
    static let saveACHAccount       :   String  =   "/Masters/SaveACHInformationByParentID"
    static let verifyACHAccount     :   String  =   "/Masters/VerifyACHBankAccountByParentID"
    static let deleteACHAccount     :   String  =   "/Masters/DeleteACHInformationByParentID"
    
    static let createOneTimePayment :   String  =   "/Masters/OneTimePaymentByACH"
    static let createRecurringPayment :   String  =   "/Masters/SaveRecurringPaymentByParentID"
    static let deleteRecurringPayment :   String  =   "/Masters/DeleteRecurringPaymentByParentID"
    
    static let getRecurringPayments               :   String  =   "/Masters/GetRecurringPaymentByParentID"
    static let makeCustomPayment               :   String  =   "/Masters/PayPayment"
    
    
  }
  
  enum Identifiers {
    
    enum Controllers {
      static let LoginNavigation              =   "LoginNavigation"
      static let LoginVC                      =   "LoginVC"
      static let SignupVC                      =   "SignupVC"
      static let ForgotPasswordVC             =   "ForgotPasswordVC"
      static let ChildListVC                  =   "ChildListVC"
      static let LeftMenuTableVC              =   "LeftMenuTableVC"
      static let SideMenuVC                   =   "SideMenuVC"
      static let NavigationVC                 =   "NavigationVC"
      static let DashboardVC                  =   "DashboardVC"
      static let ChildActivityVC              =   "ChildActivityVC"
      static let AttendanceVC                 =   "AttendanceVC"
      static let MealPlannerVC                =   "MealPlannerVC"
      static let MessageVC                    =   "MessageVC"
      static let IncidentVC                   =   "IncidentVC"
      static let PaymentHistoryVC             =   "PaymentHistoryVC"
      static let ActivityDetailsVC            =   "ActivityDetailsVC"
      static let AddKidVC                     =   "AddKidVC"
      static let MyKidsVC                     =   "MyKidsVC"
      static let EnrollmentHistoryVC          =   "EnrollmentHistoryVC"
      static let StudentBreaksVC              =   "StudentBreaksVC"
      static let EditDailySheetPopupVC        =   "EditDailySheetPopupVC"
      static let AddGuardianVC                =   "AddGuardianVC"
      static let AddImmunizationPopupVC       =   "AddImmunizationPopupVC"
      static let AddAllergiesPopupVC          =   "AddAllergiesPopupVC"
      static let AddDisabilityPopupVC         =   "AddDisabilityPopupVC"
      static let AddMedicationPopupVC         =   "AddMedicationPopupVC"
      static let StudentHealthDescriptionVC   =   "StudentHealthDescriptionVC"
      static let ChatVC                       =   "ChatVC"
      static let EnrollStudentVC              =   "EnrollStudentVC"
      static let PaymentVC                    =   "PaymentVC"
      static let ProfileVC                    =   "ProfileVC"
      static let AddExistingGuardianVC        =   "AddExistingGuardianVC"
      static let MealDetailsVC                =   "MealDetailsVC"
      static let ChangePasswordVC             =   "ChangePasswordVC"
      static let EventDetailVC                =   "EventDetailVC"
      static let IncidentDetailVC             =   "IncidentDetailVC"
      static let ACHPaymentVC                 =   "ACHPaymentVC"
      static let AddACHAccount                =   "AddACHAccount"
      static let AddPaymentVC                 =   "AddPaymentVC"
      static let VerifyACHAccountVC             =   "VerifyACHAccountVC"
      
    }
    
    enum Storyboards {
      static let Main                                 =   "Main"
      static let Dashboard                            =   "Dashboard"
      static let Popover                              =   "Popover"
      static let Other                                =   "Other"
      static let Payment                              =   "Payment"
      
    }
    
    enum Cells {
      //TableViewCells
      static let NoDataFoundTableViewCell             =   "NoDataFoundTableViewCell"
      static let LeftSideMenuTableViewCell            =   "LeftSideMenuTableViewCell"
      static let LeftSideMenuHeaderCell               =   "LeftSideMenuHeaderCell"
      static let ChildListTableViewHeaderCell         =   "ChildListTableViewHeaderCell"
      static let ChildListTableViewCell               =   "ChildListTableViewCell"
      static let PostActivityTableViewCell            =   "PostActivityTableViewCell"
      static let PostActivityPublicTableViewCell      =   "PostActivityPublicTableViewCell"
      static let ActivityDetailHeaderTableViewCell    =   "ActivityDetailHeaderTableViewCell"
      static let ActivityPhotoGallaryTableViewCell    =   "ActivityPhotoGallaryTableViewCell"
      static let EventDetailTableViewCell             =   "EventDetailTableViewCell"
      static let IncidentLisTableViewCell             =   "IncidentLisTableViewCell"
      static let DailySheetListTableViewCell          =   "DailySheetListTableViewCell"
      static let ParentChildListTableViewCell         =   "ParentChildListTableViewCell"
      static let DropDownTextFieldTableViewCell       =   "DropDownTextFieldTableViewCell"
      static let AddChildProfileHeaderCell            =   "AddChildProfileHeaderCell"
      static let DateTimeSelectionTableViewCell       =   "DateTimeSelectionTableViewCell"
      static let GenderSelectionTableViewCell         =   "GenderSelectionTableViewCell"
      static let DropDownButtonCell                   =   "DropDownButtonCell"
      static let SubmitButtonTableViewCell            =   "SubmitButtonTableViewCell"
      static let EnrollmentHistoryTableViewCell       =   "EnrollmentHistoryTableViewCell"
      static let BreakListHeaderTableViewCell         =   "BreakListHeaderTableViewCell"
      static let BreakListTableViewCell               =   "BreakListTableViewCell"
      static let AttendanceListTableViewCell          =   "AttendanceListTableViewCell"
      static let TextViewTableViewCell                =   "TextViewTableViewCell"
      static let EditMealPlanTitleTableViewCell       =   "EditMealPlanTitleTableViewCell"
      static let MealPlanEditItemTableViewCell        =   "MealPlanEditItemTableViewCell"
      static let RadioButtonTableViewCell             =   "RadioButtonTableViewCell"
      static let AddGuardianProfileHeaderCell         =   "AddGuardianProfileHeaderCell"
      static let GuardianListTableViewCell            =   "GuardianListTableViewCell"
      static let AllergiesImmunizationTableViewCell   =   "AllergiesImmunizationTableViewCell"
      static let MedicationDescriptionTableViewCell   =   "MedicationDescriptionTableViewCell"
      static let OhterHealthDescriptionTableViewCell  =   "OhterHealthDescriptionTableViewCell"
      static let DropdownStudentTableViewCell         =   "DropdownStudentTableViewCell"
      static let MessageListTableViewCell             =   "MessageListTableViewCell"
      static let MessageSenderCell                    =   "MessageSenderCell"
      static let MessageReceiverCell                  =   "MessageReceiverCell"
      static let EnrollStudentHederCell               =   "EnrollStudentHederCell"
      static let PaymentListTableViewCell             =   "PaymentListTableViewCell"
      static let ProfileHeaderCell                    =   "ProfileHeaderCell"
      static let AddGuardianCell                      =   "AddGuardianCell"
      static let GuardianListCell                     =   "GuardianListCell"
      static let DuePaymentListTableViewCell          =   "DuePaymentListTableViewCell"
      static let MealDetailsHeaderTableViewCell       =   "MealDetailsHeaderTableViewCell"
      static let FoodListTableViewCell                =   "FoodListTableViewCell"
      static let EventDetailsTableViewCell            =   "EventDetailsTableViewCell"
      static let IncidentDetailTableViewCell          =   "IncidentDetailTableViewCell"
      static let MedicationTitleLabelCell             =   "MedicationTitleLabelCell"
      static let MedicationAcknowledgeCheckTableViewCell  =   "MedicationAcknowledgeCheckTableViewCell"
      static let IncidentAcknowledgeCheckTableViewCell    =   "IncidentAcknowledgeCheckTableViewCell"
      
      //CollectionViewCells
      static let StudentDetailCollectionViewCell      =   "StudentDetailCollectionViewCell"
      static let EditDailySheetCollectionTableViewCell    =   "EditDailySheetCollectionTableViewCell"
      static let EditDailySheetActivityCollectionViewCell =   "EditDailySheetActivityCollectionViewCell"
      static let EditDailySheetMoodCollectionViewCell     =   "EditDailySheetMoodCollectionViewCell"
      static let SignupFooterTVC                   = "SignupFooterTVC"
      static let AccountDetailTVC             = "AccountDetailTVC"
      static let ACHPaymentFooterTVC             = "ACHPaymentFooterTVC"
      static let RecurringPaymentTVC             =  "RecurringPaymentTVC"
      static let CheckMarkTVC                   =   "CheckMarkTVC"
      
    }
  }
  struct ConstantArray {
    static let numberStringArray = ["1","2","3","4","5","6","7","8","9","0",""]
    static let arrForSideMenuTitle:[String] = ["Dashboard","Child Daily Sheet","Attendance","Calendar","Message","Incident","Enrollment","Payment History","ACH Payment","Add Child","Profile","Log Out"]
    static let arrForStudentsDetilTabs=["Basic Info","Guardian Info","Allergies and Immunization"]
    static let arrForAddChild = ["",["First Name","Last Name"],"Date of Birth","","Address","Country","State","City","Zip Code","Phone No.","Child Start Date","Physician Name","Physician Contact Number","Physician Address","Preferred Hospital","Child Notes"] as [Any]
    static let arrForAddChildValidationMsg = ["",["Please enter first name", "Please enter last name"], "Please select date of birth","","Please enter address","Please select country","Please select state","Please select City","","please enter phone number","Please enter Child Start Date","", "","",""] as [Any]
    static let arrForEditDailySheetTitles:[[Any]] = [["Temperature(F)","Health Note","Medicine Name","How to take","Dosage","Unit"],["Notes"],["Meal Plan","","Other than plan meal","Other than plan meal comment","Comment"],["Mood","Comment"],["Start Time", "End Time", "Activity Notes", "Activity"],["Sleep-At Time","Woke-Up Time","Description"],["Diper Change Time","Description",""]]
    static let arrForMoodTitle:[String] = ["Happy", "Sad", "Playful", "Fussy","Grumpy"]
    static let arrForMoodImage:[String] = ["moodHappyG", "moodCryingG", "moodPlayfullG", "moodFussyG", "moodGrumpyG"]
    static let arrForSelectedMoodImages:[String] = ["moodHappyL","cryingL","moodPlayfullL","moodFussyL","moodGrumpyL"]
    static let arrForDiperTypeSelection:[String] = ["Diaper","Tiolet","Dry","B/M"]
    static let arrForAddGuardianTitle = ["",["First Name", "Last Name"],"Gender","Date of Birth","Email","Mobile","Profession","Relation","Address","Country","State","City","Zip Code","Employer Name","Employer Number","Allowed Pickup","Reason for not allowing pickup"] as [Any]
    static let arrForAddGuardianValidationMsg = ["",["Please enter first name","Please enter last name"],"","Please select date of birth","Please enter email","Please enter mobile","","Please select relation","Please enter address","Please select country","Please select state","Please select city","","","","","Please enter reason"] as [Any]
    static let arrForAddAllergies = ["Allergy","Allergy Name","Reaction","Treatment","First Observed","Last Observed","Comment"]
    static let arrForAddAllergiesValidationMsg = ["Please select allergy","Please select allergy name","Please select reaction","Please enter treatment","","",""]
    static let arrForAllergiesImmunizationTitle = ["Immunization","Allergies","Medication","Disability"]
    static let arrForMedicationTitle = ["Medicine","Strength","Units","Dose","How to Take?","Other Medication","Start Date","End Date"]
    static let arrForMedicationValidationMsg = ["Please enter medication","Please enter strength","Please enter units","Please select dose","Please enter how to take","","Please select start date","Please select end date"]
    static let arrForImmunizationTitle = ["Immunization","Date Received","Other Immunization","Abbreviation"]
    static let arrForImmunizationValidationMsg = ["Please select immunization","Please select date","Please enter other immunization",""]
    static let arrForEnrollStudentTitle:[String] = ["","For Class","Start Date","End Date"]
    static let arrForEnrollStudentValidations:[String] = ["","Please select class","Please select start date","Please select end date"]
    static let arrForSignUp = ["First Name","Last Name","Email Address","Select Agency"]
    static let arrForSignUpErrors = ["Please enter first name","Please enter last name","Please enter email","Please select agency"]
    static let arrForACHAccount = ["Account Number","Routing Number","Account Holder Name","Account Type"]
    static let arrForACHAccountErrors = ["Please enter Account Number","Please enter Routing Number","Please enter Account Holder Name","Please select Account Type"]
    static let arrForAccountType = ["Individual","Company"]
    static let arrForSinglePayment = ["Amount","Payment for Date"]
    static let arrForSinglePaymentErrors = ["Please enter Amount","Please enter Payment Date"]
    static let arrForRecurringPayment = ["Amount","Cycle","Start Date","On Going","End Date"]
    static let arrForRecurringPaymentErrors = ["Please enter Amount","Please enter Billing Cycle","Please enter Payment Start Date","","Please enter Payment End Date"]
    static let arrForBillingCycle = ["Monthly","Weekly"]
    static let arrForACHAccountVerification = ["Amount 1","Amount 2"]
    static let arrForACHAccountVerificationErrors = ["Please enter Amount 1","Please enter Amount 2"]
    
    
  }
  
  struct alertMessages {
    static let Delete               :   String  =   "Are you sure you want to delete?"
    static let logout               :   String  =   "Are you sure you want to logout?"
    static let okString             :   String  =   "Ok"
    static let cancelString         :   String  =   "Cancel"
    static let yesString            :   String  =   "Yes"
    static let noString             :   String  =   "No"
    static let mandatoryFields      :   String  =   "Please fill all the mandatory fields"
    static let emailValid           :   String  =   "Please enter valid email"
    static let phoneNo              :   String  =   "Please enter valid phone number"
    static let Warning              :   String  =   "Warning"
    static let savedPhotos          :   String  =   "Saved Photos"
    static let removePhoto          :   String  =   "Remove Photo"
    static let chooseOption         :   String  =   "Choose Option"
    static let Camera               :   String  =   "Camera"
    static let photoLibrary         :   String  =   "Photo Library"
    static let videoLibrary         :   String  =   "Video Library"
    static let openSetting          :   String  =   "Open Settings"
    static let cameraAccess         :   String  =   "Camera access required for capturing photos!"
    static let noCameraPermission   :   String  =   "You don't have camera access permission"
    static let resetLink            :   String  =   "Email sent Successfully"
    static let cameraPermissionRequestTitle :   String  =   "Would Like To Access the Camera"
    static let cameraPermissionRequst       :   String  =   "Please grant permission to use the Camera."
    static let addBasicInfo         :   String  =   "Please add basic information"
    static let firstName            :   String  =   "Please enter first name"
    static let lastName             :   String  =   "Please enter last name"
    static let contactNumber        :   String  =   "Please enter contact number"
    static let dateOfBirth          :   String  =   "Please enter date of birth"
    static let address              :   String  =   "Please enter address"
    static let country              :   String  =   "Please select country"
    static let state                :   String  =   "Please select state"
    static let city                 :   String  =   "Please select city"
    static let medication           :   String  =   "Please enter student medication"
    static let strength             :   String  =   "Please enter student strength"
    static let units                :   String  =   "Please enter units"
    static let dose                 :   String  =   "Please select dose"
    static let howToTake            :   String  =   "Please enter how to take?"
    static let startDate            :   String  =   "Please select start Date"
    static let endDate              :   String  =   "Please select end Date"
    static let description          :   String  =   "Please enter description"
    static let descriptionMaxLength :   String  =   "The text must contain only 500 characters."
    static let invalidCredentials   :   String  =   "Invalid username or password"
    static let email                :   String  =   "Please enter email"
    static let password             :   String  =   "Please enter password"
    static let cardDetail           :   String  =   "Please enter valid card details."
    static let guardianAssign       :   String  =   "Are you sure you want to add"
    static let guardianAlreadyAdded :   String  =   "Guardian already exist."
    static let unauthorizedUser     :   String  =   "Not an authorized user!!"
    static let paymentAlert         :   String  =   "Please contact with agency for payment."
    static let oldPassword          :   String  =   "Please enter old password"
    static let newPassword          :   String  =   "Please enter new password"
    static let validNewPassword     :   String  =   "Please enter valid password"
    static let confirmPassword      :   String  =   "Please enter confirm password"
    static let validConfirmPassword :   String  =   "Password does not match"
    static let coorectPassword      :   String  =   "Please enter the correct password"
    static let comment              :   String  =   "Please enter comment"
    static let updateIncident       :   String  =   "Are you sure you want to update incident?"
    static let sessionExpired       :   String  =   "Your session has been expired please login again."
    static let selectAgency         :   String  =   "Please select Agency."
    static let addACHAccount        :   String  =   "Please add ACH Account."
    static let verifyACHAccount        :   String  =   "Please verify your ACH Account."
    
  }
  
  struct NavigationBarTitle {
    static let Dashboard        :   String  =   "Dashboard"
    static let Attendance       :   String  =   "Attendance"
    static let ActivityDetails  :   String  =   "Activity Details"
    static let MealPlanner      :   String  =   "Meal Planner"
    static let IncidentReport   :   String  =   "Incident Report"
    static let ChildActivity    :   String  =   "Daily Activity"
    static let MyKids           :   String  =   "My Kids"
    static let ChildList        :   String  =   "Child List"
    static let AddKids          :   String  =   "Add Kids"
    static let AddChild         :   String  =   "Add Child"
    static let EnrollmentHistory:   String  =   "Enrollment History"
    static let Breaks           :   String  =   "Breaks"
    static let AddGuardian      :   String  =   "Add Guardian"
    static let EditGuardian     :   String  =   "Update Guardian"
    static let Immunization     :   String  =   "Immunization"
    static let Allergies        :   String  =   "Allergies"
    static let Medication       :   String  =   "Medication"
    static let Disabilities     :   String  =   "Disabilities"
    static let addMedication    :   String  =   "Add Medication"
    static let addImmunization  :   String  =   "Add Immunization"
    static let addAllergies     :   String  =   "Add Allergies"
    static let addDisability    :   String  =   "Add Disability"
    static let editMedication   :   String  =   "Edit Medication"
    static let editImmunization :   String  =   "Edit Immunization"
    static let editAllergies    :   String  =   "Edit Allergies"
    static let editDisability   :   String  =   "Edit Disability"
    static let Message          :   String  =   "Message"
    static let enrollStudent    :   String  =   "Enroll Student"
    static let paymentHistory   :   String  =   "Payment History"
    static let Payment          :   String  =   "Payment"
    static let Profile          :   String  =   "Profile"
    static let selectGuardian   :   String  =   "Select Guardian"
    static let mealDetails      :   String  =   "Meal Details"
    static let changePassword   :   String  =   "Change Password"
    static let chat             :   String  =   "Chat"
    static let EventDetail      :   String  =   "Event Detail"
    static let IncidentDetail   :   String  =   "Incident Detail"
    static let AddACHAccount   :   String  =   "Add Account"
    static let ACHPayment   :   String  =   "ACH Payment"
    
  }
  
  struct ControllerString {
    static let notEnrolledInClass : String  =   "Not enrolled in class"
    static let TodayMeal        :   String  =   "Today Meal"
    static let TodayEvents      :   String  =   "Today Events"
    static let NoData           :   String  =   "No Record Found"
    static let refresh          :   String  =   "Pull to refresh"
    static let mealData         :   String  =   "Meal Data"
    static let medicationData   :   String  =   "Medication Data"
    static let moodData         :   String  =   "Mood Data"
    static let notesData        :   String  =   "Notes Data"
    static let diaper           :   String  =   "Diaper"
    static let None             :   String  =   "None"
    static let Some             :   String  =   "Some"
    static let Most             :   String  =   "Most"
    static let All              :   String  =   "All"
    static let milk             :   String  =   "Milk"
    static let PickupAllowed    :   String  =   "Pickup Allowed"
    static let PickupNotAllowed :   String  =   "Pickup Not Allowed"
    static let Abbreviation     :   String  =   "Abbreviation"
    static let Other            :   String  =   "Other"
    static let type             :   String  =   "Type"
    static let Comment          :   String  =   "Comment"
    static let DateReceived     :   String  =   "Date Received"
    static let otherImmunization:   String  =   "Other Immunization"
    static let reaction         :   String  =   "Reaction"
    static let treatment        :   String  =   "Treatment"
    static let update           :   String  =   "Update"
    static let add              :   String  =   "Add"
    static let childList        :   String  =   "Child List"
    static let male             :   String  =   "Male"
    static let female           :   String  =   "Female"
    static let yes              :   String  =   "Yes"
    static let no               :   String  =   "No"
    static let recordAvailable  :   String  =   "Record available"
    static let noRecordAvailable:   String  =   "No record available"
  }
  
  //MARK:----- API Service Keys -----
  
  struct ApiKeys {
    static let kstatus              :   String  =   "status"
    static let kagencyName          :   String  =   "agencyname"
    static let kfirstName           :   String  =   "firstName"
    static let klastName            :   String  =   "lastName"
    static let kemailId             :   String  =   "emailId"
    static let kemailAddress        :   String  =   "emailAddress"
    static let kpassword            :   String  =   "password"
    static let kisValid             :   String  =   "isValid"
    static let kbusinessToken       :   String  =   "businessToken"
    static let krequestedEmail      :   String  =   "requestedEmail"
    static let kaccess_token        :   String  =   "access_token"
    static let kagencyID            :   String  =   "agencyID"
    static let kparentID            :   String  =   "parentID"
    static let kstudentName         :   String  =   "studentName"
    static let keventSearchFromDate :   String  =   "eventSearchFromDate"
    static let keventSearchToDate   :   String  =   "eventSearchToDate"
    static let kstudentID           :   String  =   "studentID"
    static let kincidentDate        :   String  =   "incidentDate"
    static let kaskedDate           :   String  =   "askedDate"
    static let kcountryID           :   String  =   "countryID"
    static let kstateID             :   String  =   "stateID"
    static let kclassAttendenceID   :   String  =   "classAttendenceID"
    static let kstudentAcitivityId  :   String  =   "studentAcitivityId"
    static let kclassID             :   String  =   "classID"
    static let kisAuthorizedToPickup:   String  =   "isAuthorizedToPickup"
    static let kIsDeleted           :   String  =   "IsDeleted"
    static let kdescription         :   String  =   "description"
    static let kid                  :   String  =   "id"
    static let kuserID              :   String  =   "userID"
    static let kisPublic            :   String  =   "isPublic"
    static let kpostActivitiesID    :   String  =   "postActivitiesID"
    static let kpostActivityImagesID:   String  =   "postActivityImagesID"
    static let kpostActivityVideosID:   String  =   "postActivityVideosID"
    static let klikeCount           :   String  =   "likeCount"
    static let kcomment             :   String  =   "comment"
    static let kisActive            :   String  =   "isActive"
    static let kcreatedBy           :   String  =   "createdBy"
    static let kupdatedBy           :   String  =   "updatedBy"
    static let kisParent            :   String  =   "isParent"
    static let kisSecondaryparent   :   String  =   "isSecondaryparent"
    static let kisGaurdian          :   String  =   "isGaurdian"
    static let kassociatedChild     :   String  =   "associatedChild"
    static let ktotalFees           :   String  =   "totalFees"
    static let kfeesPaid            :   String  =   "feesPaid"
    static let kEmail               :   String  =   "feesEmail"
    static let kSourceToken         :   String  =   "SourceToken"
    static let ktokenID             :   String  =   "tokenID"
    static let kCreatedBy           :   String  =   "CreatedBy"
    static let kstripePublishableKey:   String  =   "stripePublishableKey"
    static let kmealPlanID          :   String  =   "mealPlanID"
    static let kupdatedPassword     :   String  =   "updatedPassword"
    static let kroleID              :   String  =   "roleID"
    static let ksenderUserID        :   String  =   "senderUserID"
    static let kreceiverUserID      :   String  =   "receiverUserID"
    static let kosType              :   String  =   "osType"
    static let kparentComment       :   String  =   "parentComment"
    static let kisAcknowledge       :   String  =   "isAcknowledge"
    static let klimit               :   String  =   "limit"
    static let kpage                :   String  =   "page"
    static let kisParentAcknowledge :   String  =   "isParentAcknowledge"
    static let kstudentActivityMedications  :   String  =   "studentActivityMedications"
    static let kactivityRegisterDate    :   String  =   "activityRegisterDate"
    static let kselectedStudents    :   String  =   "selectedStudents"
    static let kclassesID           :   String  =   "classesID"
    static let kactivityTypeID      :   String  =   "activityTypeID"
    static let kDeletedBy           :   String  =   "DeletedBy"
    static let kDeletedDate         :   String  =   "DeletedDate"
    
  }
}

enum ActivityTypeID {
  static let Health = 1
  static let Notes = 2
  static let Meal = 3
  static let Mood = 4
  static let Activity = 5
  static let Nap = 6
  static let Diper = 7
}
enum FoodConsumptionID {
  static let None = 4
  static let Some = 3
  static let Most = 2
  static let All = 1
}

enum HealthDecriptionStatus {
  static let Immunization = 1
  static let Allergies    = 2
  static let Medication   = 3
  static let Disability   = 4
}

enum StudentEnrollmentStatus {
  static let notEnrolled  = 0
  static let requested    = 1
  static let enrolled     = 2
  static let requestCancelled = 3
  static let deniedByAgency   = 4
  static let completed    = 5
}

enum StudentEnrollmentStatusTitle {
  static let notEnrolled  = "Not Enrolled"
  static let requested    = "Requested"
  static let enrolled     = "Enrolled"
  static let requestCancelled = "Request Cancelled"
  static let deniedByAgency   = "Denied By Agency"
  static let completed    = "Completed"
}

enum ChatEvents : String{
  case sendMessage = "SendMessage" // while sending the message
  case receiveMessage = "messageReceived" // received message by other user
  case connect = "getConnectionId" // for connection with signal r
  case messageReceived = "messageSent" // received message by sender
  case onDisconnect   =   "OnConnectedAsync"
}
