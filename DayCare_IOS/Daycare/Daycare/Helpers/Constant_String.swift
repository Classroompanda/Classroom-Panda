//
//  Constant_String.swift
//  IntervalloPatient
//
//  Created by Subhash Kumar on 9/10/18.
//  Copyright © 2018 Subhash Kumar. All rights reserved.
//

import Foundation
import UIKit


struct Macros
{
  static let  ApplictionName : String = NSLocalizedString("Daycare", comment: "")
  static let refresh : String = "Pull to refresh"
  
  struct DefaultKeys {
    static let kUserDetails:String = "UserDetails"
    static let kDeviceToken:String = "device_token"
    static let kisFirstLogin:String = "isFirstLogin"
    static let kTeacherDetails = "TeacherDetail"
  }
  
  
  struct Constants{
    static var plistFileName = Bundle.main.infoDictionary?["TargetName"] as! String
  }
  
  
  //MARK:----- URLs -----
  struct URLs{
    // Here we will fetch BASE SERVER URL from pList
    static let baseServer  : String = "https://www.stagingwin.com:9943/api" // Live Server
    //        static let baseServer  : String = "https://schoolpandaapp.azurewebsites.net/api" // AZURE SERVER
    
    
    static let chattingUrl: String = "https://www.stagingwin.com:9943/chat"
    //        static let chattingUrl: String = "https://schoolpandaapp.azurewebsites.net/chat" // AZURE SERVER
    
    
  }
  
  //MARK:----- API Service Names -----
  // Below are the service name which will be apended with Base server for requests
  struct ServiceName{
    static let getAllClassesAPI               =   "/Classes/GetAllClasses"
    static let GetClassAttendence             =   "/Teacher/GetClassAttendence"
    static let GetAllGuardiansForStudents     =   "/Agency/GetAllGuardiansForStudents"
    static let CheckInAttendenceStudent       =   "/Teacher/CheckInAttendenceStudent"
    static let CheckOutAttendenceStudent      =   "/Teacher/CheckOutAttendenceStudent"
    static let GetAllLeaveReasonType          =   "/Masters/GetAllLeaveReasonType"
    static let AbsentAttendenceStudent        =   "/Teacher/AbsentAttendenceStudent"
    static let GetAllIncidents                =   "/Agency/GetAllIncidents"
    static let GetAllStudentsByClass          =   "/Agency/GetAllStudentsByClass"
    static let GetAllStudents                 =   "/Agency/GetAllStudents"
    static let GetStudentInformation          =   "/Agency/GetStudentInformation"
    static let UserLogin                      =   "/User/login"
    static let GetAllNatureofinjury           =   "/Masters/GetAllNatureofinjury"
    static let GetAllTeachers                 =   "/Teacher/GetAllTeachers"
    static let SaveIncident                   =   "/Agency/SaveIncident"
    static let DeleteIncident                 =   "/Agency/DeleteIncident"
    static let GetAllRepeatTypeDropdown       =   "/Masters/GetAllRepeatTypeDropdown"
    static let SaveEvent                      =   "/Agency/SaveEvent"
    static let GetAllEvents                   =   "/Agency/GetAllEvents"
    static let DeleteEvent                    =   "/Agency/DeleteEvent"
    static let GetAllMealPlan                 =   "/Agency/GetAllMealPlan"
    static let GetAllMealTypeDropdown         =   "/Masters/GetAllMealTypeDropdown"
    static let GetTeacherInformation          =   "/Teacher/GetTeacherInformation"
    static let GetAllCities                   =   "/Masters/GetAllCities"
    static let GetAllStates                   =   "/Masters/GetAllStates"
    static let GetAllCountry                  =   "/Masters/GetAllCountry"
    static let SaveTeacherDetails             =   "/Teacher/SaveTeacherDetails"
    static let GetDailySheet                  =   "/Classes/GetDailySheet"
    static let GetDailySheetMobile            =   "/Classes/GetDailySheetMobile"
    static let GetAllSubActivityType          =   "/Masters/GetAllSubActivityType"
    static let SaveStudentActivity            =   "/Classes/SaveStudentActivity"
    static let GetAllPostActivities           =   "/Teacher/GetAllPostActivities"
    static let MultipleImageUpload            =   "/Common/MultipleImageUpload"
    static let SavePostActivites              =   "/Teacher/SavePostActivites"
    static let GetTeacherClassLog             =   "/Teacher/GetTeacherClassLog"
    static let TeacherCheckInCheckOut         =   "/Teacher/TeacherCheckInCheckOut"
    static let TeacherClockInClockOut         =   "/Teacher/TeacherClockInClockOut"
    static let GetStudentBreakLogs            =   "/Teacher/GetStudentBreakLogs"
    static let ForgotPassword                 =   "/Common/ForgotPassword"
    static let GetTeacherBreakLog             =   "/Teacher/GetTeacherBreakLog"
    static let TeacherBreakInBreakOut         =   "/Teacher/TeacherBreakInBreakOut"
    static let GetTodayMealPlan               =   "/Classes/GetTodayMealPlan"
    static let GetBittingIncidentsDetails     =   "/Agency/GetBittingIncidentsDetails"
    static let GetParticularMealPlan          =   "/Agency/GetParticularMealPlan"
    static let UpdatedPassword                =   "/Common/UpdatedPassword"
    static let GetListForChat                 =   "/Message/GetListForChat"
    static let GetMessageByID                 =   "/Message/GetMessageByID"
    static let GetUnreadMessageCount           =   "/Message/GetUnReadMessageCount"
    static let GetAllStudentDropdown          =   "/Masters/GetAllStudentDropdown"
    static let GetTeacherOperationalClasses   =   "/Teacher/GetTeacherOperationalClasses"
    static let GetTeacherTodayMedicationTasks =   "/Teacher/GetTeacherTodayMedicationTasks"
    static let GetTeacherCurrentBreakStatus   =   "/Teacher/GetTeacherCurrentBreakStatus"
    static let UpdateStudentProfilePicByTeacher          =   "/Teacher/UpdateStudentProfilePicByTeacher"
    static let GetParticularStudentActivityDiaperChanges  =   "/Classes/GetParticularStudentActivityDiaperChanges"
    static let BreakInOutAttendenceStudentMobile          =   "/Teacher/BreakInOutAttendenceStudentMobile"
    static let GetParticularStudentActivityNap            =   "/Classes/GetParticularStudentActivityNap"
    static let GetParticularStudentOtherActivity          =   "/Classes/GetParticularStudentOtherActivity"
    static let GetParticularStudentActivityMoods          =   "/Classes/GetParticularStudentActivityMoods"
    static let GetParticularStudentActivityNotes          =   "/Classes/GetParticularStudentActivityNotes"
    static let GetParticularStudentActivityMedications    =   "/Classes/GetParticularStudentActivityMedications"
    static let GetParticularStudentActivityMeals          =   "/Classes/GetParticularStudentActivityMeals"
    static let GetDailySheetActivityReportByEmail         =   "/Classes/GetDailySheetActivityReportByEmail"
    static let GetAllClassesForStudentAttendenceTransfer  =   "/Agency/GetAllClassesForStudentAttendenceTransfer"
    static let StudentClassTransferAttendence =   "/Teacher/StudentClassTransferAttendence"
    static let GetAllStudentsAllergy                 =   "/Teacher/GetStudentAllergy"
    
  }
  
  //Array constant
  enum ConstantArray {
    static let numberStringArray = ["1","2","3","4","5","6","7","8","9","0","","."]
    static let arrForIncidentTitle = ["Class Name","Student Name","Place of Incident","Nature of Injury","Involved Student(s)","First Aid Administered","Doctor Required","","Was Parent Informed?","If Yes, Then How?","Description of the Injury","Action Taken","Part Of Body","Context Enviornment","Context Child"]
    static let arrForEventTitle:[Any] = [["Begins","Ends"],["Start Time","End Time"],"Select Class","Event Title","Description (Max limit 500 characters)","Repeat","Ends on"]
    static let arrForProfileTitle = ["First Name","Last Name","Email Address","Mobile","Address","Country","State","City","Zip Code","Date Of Birth","Date of Hiring","Gross Pay","Certification","Home phone"]
    
    static let arrForDailySheetTitles:[[Any]] = [[["Start Time", "End Time"], "Activity Notes", "Select Activity"],["Meal Plan","","Other than plan meal","Other than plan meal comment","Comment"],["Add Temperature(F)","Health Note"],["Notes if any"],["Select Mood","Comments"],[["Sleep-At Time","Woke-Up Time"],"Description"],["Enter Time","Description",""]]
    
    static let arrForDailySheetMealTitles:[String] = ["Other than plan meal","Other than plan meal comment","Comment"]
    
    static let arrForEditDailySheetTitles:[[Any]] = [["Add Temperature(F)","Health Note","Medicine Name","How to take","Dosage","Unit"],["Notes if any"],["Meal Plan","","Other than plan meal","Other than plan meal comment","Comment"],["Select Mood","Comments"],["Start Time", "End Time", "Activity Notes", "Select Activity"],["Sleep-At Time","Woke-Up Time","Description"],["Enter Time","Description",""]]
    
    static let arrForNewPostTitle:[String] = ["Upload Gallery","Activity Title","Post Description","Select Class","Select Student(s)","Is Public"]
    
    static let arrForSideMenuTitle:[String] = ["Dashboard","Student","Daily Sheets","Post Activity","Attendance","Calendar","Message","Incident","My Breaks","Medication","Allergy","Log Out"]
    
    static let arrForMoreMenu = ["Profile","BreakOut","ClockOut"]
    static let arrForBreakInOutTitles = ["Picked-Up by", "Drop-Off by", "Reason"]
    static let arrForCheckInTitles = ["Drop-Off by","Picked-Up by"]
    static let arrForStudentsDetilTabs=["Basic Info","Guardian Info","Allergies and Immunization"]
    static let arrForMoodImage:[String] = ["moodHappyG", "moodCryingG", "moodPlayfullG", "moodFussyG", "moodGrumpyG"]
    static let arrForSelectedMoodImages:[String] = ["moodHappyL","cryingL","moodPlayfullL","moodFussyL","moodGrumpyL"]
    static let arrForMoodTitle:[String] = ["Happy", "Sad", "Playful","Fussy","Grumpy"]
    static let arrForMealPlanConsume:[String] = ["None","Some","Most","All"]
    
    static let arrForDiperTypeSelection:[String] = ["Diaper","Toilet","Wet","B/M","Dry"]
    static let arrForDiperTypeDescription:[String] = ["Diaper Change","Toilet Training / Tiolet Used","Wet","B/M","Dry"]
    static let arrForClassCheckInOutEdit:[String] = ["Checked-In Time","Checked-Out Time"]
  }
  
  enum Identifiers {
    
    //MARK:----- Storyboards -----
    enum Storyboard {
      static let Main         =   "Main"
      static let Dashboard    =   "Dashboard"
      static let Popover      =   "Popover"
      static let Other        =   "Other"
    }
    
    //MARK:----- Controllers -----
    enum Controller {
      
      //Navigation Identifires
      static let LoginNavigation  =   "LoginNavigation"
      static let NavigationVC     =   "NavigationVC"
      
      //PopUp's
      static let CheckInPopUpVC           =   "CheckInPopUpVC"
      static let ClockInPopupVC           =   "ClockInPopupVC"
      static let AbsentPopupVC            =   "AbsentPopupVC"
      static let StudentListPopupVC       =   "StudentListPopupVC"
      static let ClassListPopupVC         =   "ClassListPopupVC"
      static let EditDailySheetPopupVC    =   "EditDailySheetPopupVC"
      static let TeacherBreakOutPopupVC   =   "TeacherBreakOutPopupVC"
      static let ClassCheckInCheckOutPopupVC  =   "ClassCheckInCheckOutPopupVC"
      static let StudentListByClassPopupVC    =   "StudentListByClassPopupVC"
      static let TransferStudentPopupVC   =   "TransferStudentPopupVC"
      
      //View Controller Identifires
      static let LoginVC                      =   "LoginVC"
      static let ForgotPasswordVC             =   "ForgotPasswordVC"
      static let LeftMenuTableVC              =   "LeftMenuTableVC"
      static let SideMenuVC                   =   "SideMenuVC"
      static let DashboardVC                  =   "DashboardVC"
      static let PostActivityVC               =   "PostActivityVC"
      static let AttendanceVC                 =   "AttendanceVC"
      static let IncidentVC                   =   "IncidentVC"
      static let StudentListVC                =   "StudentListVC"
      static let DailySheetsVC                =   "DailySheetsVC"
      static let CalendarVC                   =   "CalendarVC"
      static let MessageVC                    =   "MessageVC"
      static let AddIncidentVC                =   "AddIncidentVC"
      static let StudentDetailVC              =   "StudentDetailVC"
      static let StudentHealthDescriptionVC   =   "StudentHealthDescriptionVC"
      static let AddEventVC                   =   "AddEventVC"
      static let ProfileVC                    =   "ProfileVC"
      static let DailySheetDetailVC           =   "DailySheetDetailVC"
      static let AddDailySheetVC              =   "AddDailySheetVC"
      static let ActivityDetailsVC            =   "ActivityDetailsVC"
      static let AddNewPostVC                 =   "AddNewPostVC"
      static let BreaksVC                     =   "BreaksVC"
      static let StudentBreakInOutVC          =   "StudentBreakInOutVC"
      static let TeacherBreakLogVC            =   "TeacherBreakLogVC"
      static let MedicationsVC                =   "MedicationsVC"
      static let ChatVC                       =   "ChatVC"
      static let MealDetailsVC                =   "MealDetailsVC"
      static let ChangePasswordVC             =   "ChangePasswordVC"
      static let AllergyVC                    =   "AllergyVC"
    }
    
    //MARK:----- Cells -----
    enum Cells {
      
      //TableView Cells
      static let Cell                                 =   "cell"
      static let LeftSideMenuHeaderCell               =   "LeftSideMenuHeaderCell"
      static let LeftSideMenuTableViewCell            =   "LeftSideMenuTableViewCell"
      static let DashboardHeaderTableViewCell         =   "DashboardHeaderTableViewCell"
      static let DashboardCollectionTableViewCell     =   "DashboardCollectionTableViewCell"
      static let DashboardBottomTableViewCell         =   "DashboardBottomTableViewCell"
      static let PostActivityTableViewCell            =   "PostActivityTableViewCell"
      static let DateToddlerHeaderCell                =   "DateToddlerHeaderCell"
      static let AttendanceListTableViewCell          =   "AttendanceListTableViewCell"
      static let IncidentLisTableViewCell             =   "IncidentLisTableViewCell"
      static let StudentListTableViewCell             =   "StudentListTableViewCell"
      static let StudentDetailTableViewCell           =   "StudentDetailTableViewCell"
      static let GuardianListTableViewCell            =   "GuardianListTableViewCell"
      static let NoRecordFoundTableViewCell           =   "NoRecordFoundTableViewCell"
      static let AddIncidentSwitchTableViewCell       =   "AddIncidentSwitchTableViewCell"
      static let NoDataFoundTableViewCell             =   "NoDataFoundTableViewCell"
      static let EventDetailTableViewCell             =   "EventDetailTableViewCell"
      static let NoEventFoundTableViewCell            =   "NoEventFoundTableViewCell"
      static let ProfileImageHeaderCell               =   "ProfileImageHeaderCell"
      static let DailySheetDetailTableViewCell        =   "DailySheetDetailTableViewCell"
      static let DateTimeSelectionTableViewCell       =   "DateTimeSelectionTableViewCell"
      static let AddDailySheetHeaderTableView         =   "AddDailySheetHeaderTableView"
      static let ActivityDetailHeaderTableViewCell    =   "ActivityDetailHeaderTableViewCell"
      static let ActivityPhotoGallaryTableViewCell    =   "ActivityPhotoGallaryTableViewCell"
      static let PostActivityMediaTableViewCell       =   "PostActivityMediaTableViewCell"
      static let PostActivityHeaderTableViewCell      =   "PostActivityHeaderTableViewCell"
      static let DropDownTextFieldTableViewCell       =   "DropDownTextFieldTableViewCell"
      static let SubmitButtonTableViewCell            =   "SubmitButtonTableViewCell"
      static let TextViewTableViewCell                =   "TextViewTableViewCell"
      static let PostActivitySwitchTableViewCell      =   "PostActivitySwitchTableViewCell"
      static let BreakListHeaderTableViewCell         =   "BreakListHeaderTableViewCell"
      static let BreakListTableViewCell               =   "BreakListTableViewCell"
      static let BreakInOutHeaderTableViewCell        =   "BreakInOutHeaderTableViewCell"
      static let CheckInOutHeaderTableViewCell        =   "CheckInOutHeaderTableViewCell"
      static let DropDownButtonCell                   =   "DropDownButtonCell"
      static let ListTableViewCell                    =   "ListTableViewCell"
      static let TeacherBreakLogTableViewCell         =   "TeacherBreakLogTableViewCell"
      static let MedicationListTableViewCell          =   "MedicationListTableViewCell"
      static let AddMealPlanTitleTableViewCell        =   "AddMealPlanTitleTableViewCell"
      static let MealPlanAddItemTableViewCell         =   "MealPlanAddItemTableViewCell"
      static let MedicationDescriptionTableViewCell   =   "MedicationDescriptionTableViewCell"
      static let MessageListTableViewCell             =   "MessageListTableViewCell"
      static let MessageSenderCell                    =   "MessageSenderCell"
      static let MessageReceiverCell                  =   "MessageReceiverCell"
      static let MealDetailsHeaderTableViewCell       =   "MealDetailsHeaderTableViewCell"
      static let FoodListTableViewCell                =   "FoodListTableViewCell"
      static let OhterHealthDescriptionTableViewCell  =   "OhterHealthDescriptionTableViewCell"
      static let MealPlanEditItemTableViewCell        =   "MealPlanEditItemTableViewCell"
      static let EditMealPlanTitleTableViewCell       =   "EditMealPlanTitleTableViewCell"
      static let AddDailySheetCollectionTableViewCell    =   "AddDailySheetCollectionTableViewCell"
      static let ActivityDetailPeopleListTableViewCell    =   "ActivityDetailPeopleListTableViewCell"
      static let EditDailySheetCollectionTableViewCell    =   "EditDailySheetCollectionTableViewCell"
      static let ParentCommentOnIncidentTableViewCell =   "ParentCommentOnIncidentTableViewCell"
      
      
      
      //CollectionView Cells
      static let CurrentClassCollectionViewCell   =   "CurrentClassCollectionViewCell"
      static let EmptyClassCollectionViewCell     =   "EmptyClassCollectionViewCell"
      static let StudentDetailCollectionViewCell  =   "StudentDetailCollectionViewCell"
      static let DailySheetCollectionViewCell     =   "DailySheetCollectionViewCell"
      static let DailySheetNoRecordFound          =   "DailySheetNoRecordFound"
      static let AddDailySheetMoodCollectionViewCell  =   "AddDailySheetMoodCollectionViewCell"
      static let EditDailySheetMoodCollectionViewCell =   "EditDailySheetMoodCollectionViewCell"
      static let ActivityPeopleListCollectionViewCell =   "ActivityPeopleListCollectionViewCell"
      static let EditDailySheetActivityCollectionViewCell     =   "EditDailySheetActivityCollectionViewCell"
      static let AddDailySheetActivityCollectionViewCell      =   "AddDailySheetActivityCollectionViewCell"
      static let PostActivitySelectMediaCollectionViewCell    =   "PostActivitySelectMediaCollectionViewCell"
      static let PostActivityDisplayMediaCollectionViewCell   =   "PostActivityDisplayMediaCollectionViewCell"
    }
  }
  
  //MARK:----- Navigation Titles -----
  struct NavigationTitle {
    static let Dashboard        :   String  =   "Dashboard"
    static let PostActivity     :   String  =   "Post Activity"
    static let Attendance       :   String  =   "Attendance"
    static let IncidentReport   :   String  =   "Incident Report"
    static let AddIncident      :   String  =   "Add Incident"
    static let UpdateIncident   :   String  =   "Update Incident"
    static let StudentList      :   String  =   "Student List"
    static let DailySheet       :   String  =   "Daily Sheet"
    static let Calendar         :   String  =   "Calendar"
    static let Message          :   String  =   "Message"
    static let StudentDetail    :   String  =   "Student Detail"
    static let Immunization     :   String  =   "Immunization"
    static let Allergies        :   String  =   "Allergies"
    static let Medication       :   String  =   "Medication"
    static let Disabilities     :   String  =   "Disabilities"
    static let AddNewEvent      :   String  =   "Add New Event"
    static let EditEvent        :   String  =   "Update Event"
    static let Profile          :   String  =   "Profile"
    static let DailySheetDetail :   String  =   "Daily Sheet Detail"
    static let AddDailySheet    :   String  =   "Add Daily Sheet"
    static let ActivityDetails  :   String  =   "Activity Details"
    static let AddNewPost       :   String  =   "Add New Post"
    static let Breaks           :   String  =   "Breaks"
    static let MyBreaks         :   String  =   "My Breaks"
    static let mealDetails      :   String  =   "Meal Details"
    static let changePassword   :   String  =   "Change Password"
    static let chat             :   String  =   "Chat"
    static let incident         :   String  =   "Incident"
    static let allergy          :   String  =   "Allergies"
  }
  
  //MARK:----- Alert Messages -----
  struct alertMessages {
    static let inProgress           :   String  =   "In Progress"
    static let Delete               :   String  =   "Are you sure you want to delete?"
    static let logout               :   String  =   "Are you sure you want to logout?"
    static let CommonMessage        :   String  =   "All fields are mandatory."
    static let okString             :   String  =   "Ok"
    static let cancelString         :   String  =   "Cancel"
    static let yesString            :   String  =   "Yes"
    static let noString             :   String  =   "No"
    static let selectAbsentReason   :   String  =   "Please select reson"
    static let mandatoryFields      :   String  =   "Please fill all the mandatory fields"
    static let selectDropOff        :   String  =   "Please select drop off by"
    static let pickedUp             :   String  =   "Please select picked up by"
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
    static let max3Images           :   String  =   "You can not select more than 3 images."
    static let cameraAccess         :   String  =   "Camera access required for capturing photos!"
    static let noCameraPermission   :   String  =   "You don't have camera access permission"
    static let cameraPermissionRequestTitle :   String  =   "Would Like To Access the Camera"
    static let cameraPermissionRequst   :   String  =   "Please grant permission to use the Camera."
    static let checkIn              :   String  =   "Are you sure you want to checked in?"
    static let checkOut             :   String  =   "Are you sure you want to checked out?"
    static let clockIn              :   String  =   "Clock In"
    static let clockOut             :   String  =   "Are you sure you want to clocked out?"
    static let breakOut             :   String  =   "Are you sure you want to break out?"
    static let descriptionMaxLength :   String  =   "The text must contain only 500 characters."
    static let classSelectFirst     :   String  =   "Please select the class first"
    static let resetLink            :   String  =   "Email sent Successfully"
    static let breakOutAlert        :   String  =   "Are you sure to go for break?"
    static let breakInAlert         :   String  =   "Please break in to access the system"
    static let pleaseCheckedInClass :   String  =   "Please check in to a class"
    static let breakInHeader        :   String  =   "Break In"
    static let breakOutHeader       :   String  =   "Break Out"
    static let alreadyCheckInAlert  :   String  =   "Already checked in in another class"
    static let clockOutAlert        :   String  =   "You are clocked out for today"
    static let firstName            :   String  =   "Please enter first name"
    static let lastName             :   String  =   "Please enter last name"
    static let phoneNumber          :   String  =   "Please enter phone number"
    static let address              :   String  =   "Please enter address"
    static let country              :   String  =   "Please select country"
    static let state                :   String  =   "Please select state"
    static let city                 :   String  =   "Please select city"
    static let dateOfBirth          :   String  =   "Please select date of birth"
    static let dateOfHire           :   String  =   "Please select date of hiring"
    static let certification        :   String  =   "Please enter certification"
    static let invalidCredentials   :   String  =   "Invalid username or password"
    static let startDate            :   String  =   "Please select start date"
    static let endDate              :   String  =   "Please select end date"
    static let startTime            :   String  =   "Please select start time"
    static let endTime              :   String  =   "Please select end time"
    static let classes              :   String  =   "Please select class"
    static let title                :   String  =   "Please enter title"
    static let description          :   String  =   "Please enter description"
    static let repeatType           :   String  =   "Please select repeat type"
    static let endsOnDate           :   String  =   "Please select ends on date"
    static let student              :   String  =   "Please select student"
    static let image                :   String  =   "Please select image"
    static let video                :   String  =   "Please select video"
    static let profileUpdate        :   String  =   "Profile has been updated"
    static let placeOfIncident      :   String  =   "Please enter place of incident"
    static let natureOfInjury       :   String  =   "Please select nature of injury"
    static let firstAidAdministrator:   String  =   "Please select first aid administrator"
    static let date                 :   String  =   "Please select date"
    static let time                 :   String  =   "Please select time"
    static let activityNote         :   String  =   "Please enter activity note"
    static let temprature           :   String  =   "Please enter temprature"
    static let mealPlan             :   String  =   "Please select meal plan"
    static let milk                 :   String  =   "Please enter milk quantity"
    static let mealConsumption      :   String  =   "Please select food consumption"
    static let mood                 :   String  =   "Please select mood"
    static let wokeUptime           :   String  =   "Please select woke up time"
    static let sleepAttime          :   String  =   "Please select sleep at time"
    static let oldPassword          :   String  =   "Please enter old password"
    static let newPassword          :   String  =   "Please enter new password"
    static let validNewPassword     :   String  =   "Please enter valid password"
    static let confirmPassword      :   String  =   "Please enter confirm password"
    static let validConfirmPassword :   String  =   "Password does not match"
    static let coorectPassword      :   String  =   "Please enter the correct password"
    static let pickedUpTime         :   String  =   "Please select picked up time"
    static let dropOffTime          :   String  =   "Please select drop off time"
    static let pickedUpBy           :   String  =   "Please select picked up by"
    static let dropOffBy            :   String  =   "Please select drop off by"
    static let reason               :   String  =   "Please enter reson"
    //        static let checkOutConfirmation :   String  =   "Are you sure you want send the DailySheet to parent?"
    static let checkOutConfirmation :   String  =   "Do you want to send the daily activity report?"
  }
  
  //MARK:----- Controller Constatnts-----
  
  struct ControllerStrings {
    enum StudentDetailVC {
      static let Immunization     :   String  =   "Immunization"
      static let Allergies        :   String  =   "Allergies"
      static let Medication       :   String  =   "Medication"
      static let Disability       :   String  =   "Disability"
      static let PickupAllowed    :   String  =   "Pickup Allowed"
      static let PickupNotAllowed :   String  =   "Pickup Not Allowed"
      static let NoRecordAvailable:   String  =   "No record available"
      static let RecordAvailable  :   String  =   "Record available"
      static let NoGuardiansFound :   String  =   "No guardians found"
    }
    enum StudentHealthDescriptionVC {
      static let Abbreviation     :   String  =   "Abbreviation"
      static let Other            :   String  =   "Other"
      static let type             :   String  =   "Type"
      static let Comment          :   String  =   "Comment"
      static let DateReceived     :   String  =   "Date Received"
      static let otherImmunization    :   String  =   "Other Immunization"
      static let reaction         :   String  =   "Reaction"
      static let treatment        :   String  =   "Treatment"
    }
    enum AddIncidentVC {
      static let ActionToken      :   String  =   "Action goes here"
      static let Description      :   String  =   "Description goes here"
      static let Place            :   String  =   "Place"
      static let DateOfIncident   :   String  =   "Date Of Incident"
      static let TimeOfIncident   :   String  =   "Time Of Incident"
      static let partOfBody       :   String  =   "enter part of body"
      static let contextEnviornment   :   String  =   "enter context enviornment"
      static let contextChild     :   String  =   "enter context child"
      static let parentComment    :   String  =   "Comment added by parent"
    }
    enum AddEventVC {
      static let DescriptionPlaceholder      :   String  =   "Event description here"
      static let TitlePlaceholder            :   String  =   "Event Event title"
    }
    enum CalendarVC {
      static let TodayMeal        :   String  =   "Today Meal"
      static let TodayEvents      :   String  =   "Today Events"
      static let NoData           :   String  =   "No Record Found"
    }
    enum DailySheetVC {
      static let selectAll        :   String  =   "Select All"
      static let deselectAll      :   String  =   "Deselect All"
      static let milk             :   String  =   "Milk"
      static let None             :   String  =   "None"
      static let Some             :   String  =   "Some"
      static let Most             :   String  =   "Most"
      static let All              :   String  =   "All"
    }
    enum DailySheetDetailVC {
      static let emptyRecord      :   String  =   "No Activity Available"
      static let mealData         :   String  =   "Meal Data"
      static let medicationData   :   String  =   "Medication Data"
      static let moodData         :   String  =   "Mood Data"
      static let notesData        :   String  =   "Notes Data"
      static let diaper           :   String  =   "Diaper"
    }
    enum DashboardVC {
      static let checkedIn        :   String  =   "Checked In"
      static let checkedOut       :   String  =   "Checked Out"
      static let notCheckIn       :   String  =   "Open"
      static let checkIn          :   String  =   "Check In"
      static let checkOut         :   String  =   "Check Out"
    }
    enum StudentBreakInOutVC {
      static let pickedUp         :   String  =   "Picked-Up by"
      static let dropoff          :   String  =   "Drop-Off by"
      static let pickedupTime     :   String  =   "Picked-Up time"
      static let dropoffTime      :   String  =   "Drop-Off time"
      static let reason           :   String  =   "Reason"
    }
  }
  
  //MARK:----- API Service Keys -----
  
  struct ApiKeys {
    static let kuserID                =   "userID"
    static let kagencyID              =   "agencyID"
    static let kisActive              =   "isActive"
    static let kisDeleted             =   "isDeleted"
    static let kdeletedBy             =   "deletedBy"
    static let kdeletedDate           =   "deletedDate"
    static let kcreatedBy             =   "createdBy"
    static let kcreatedDate           =   "createdDate"
    static let kupdatedDate           =   "updatedDate"
    static let kupdatedBy             =   "updatedBy"
    static let kattendenceId          =   "attendenceId"
    static let kstudentID             =   "studentID"
    static let kclassID               =   "classID"
    static let kaskedDate             =   "askedDate"
    static let kstudentName           =   "studentName"
    static let kattendanceDate        =   "attendanceDate"
    static let kattendenceStatusID    =   "attendenceStatusID"
    static let kclassName             =   "className"
    static let kclassesID             =   "classesID"
    static let kdate                  =   "date"
    static let kdropedById            =   "dropedById"
    static let kid                    =   "id"
    static let kisEditModeOn          =   "isEditModeOn"
    static let kcheckInTime           =   "checkInTime"
    static let kpickupById            =   "pickupById"
    static let kcheckOutTime          =   "checkOutTime"
    static let konLeave               =   "onLeave"
    static let konLeaveComment        =   "onLeaveComment"
    static let kreasonId              =   "reasonId"
    static let kemailAddress          =   "emailAddress"
    static let kpassword              =   "password"
    static let kisValid               =   "isValid"
    static let kbusinessToken         =   "businessToken"
    static let kincidentDate          =   "incidentDate"
    static let kincidentTime          =   "incidentTime"
    static let kdescription           =   "description"
    static let kactionTaken           =   "actionTaken"
    static let kplaceOfIncident       =   "placeOfIncident"
    static let knatureOfInjuryID      =   "natureOfInjuryID"
    static let knatureOfInjuryName    =   "natureOfInjuryName"
    static let kisDoctorRequired      =   "isDoctorRequired"
    static let kwasParentInformed     =   "wasParentInformed"
    static let kparentInformedBy      =   "parentInformedBy"
    static let kincidentInvolvments   =   "incidentInvolvments"
    static let kteacherID             =   "teacherID"
    static let kteacherName           =   "teacherName"
    static let kincidentID            =   "incidentID"
    static let keventSearchFromDate   =   "eventSearchFromDate"
    static let keventSearchToDate     =   "eventSearchToDate"
    static let keventID               =   "eventID"
    static let kcountryID             =   "countryID"
    static let kstateID               =   "stateID"
    static let kdateOfBirth           =   "dateOfBirth"
    static let kdateHired             =   "dateHired"
    static let kactivityTypeID        =   "activityTypeID"
    static let kselectedStudents      =   "selectedStudents"
    static let kstudentActivityMeals  =   "studentActivityMeals"
    static let kstudentActivityNotes  =   "studentActivityNotes"
    static let kstudentActivityMoods  =   "studentActivityMoods"
    static let kstudentOtherActivity  =   "studentOtherActivity"
    static let kstudentAcitivityNap   =   "studentAcitivityNap"
    static let kstudentAcitivityDiper =   "studentActivityDiaper"
    static let kstudentActivitiesID   =   "studentActivitiesID"
    static let kstudentAcitivityId    =   "studentAcitivityId"
    static let kpostedDate            =   "postedDate"
    static let kpostActivityVideos    =   "postActivityVideos"
    static let kpostActivityvideos    =   "postActivityvideos"
    static let kpostActivitiesID      =   "postActivitiesID"
    static let kimageServerPath       =   "imageServerPath"
    static let kpostActivityImages    =   "postActivityImages"
    static let kisPublic              =   "isPublic"
    static let kaccess_token          =   "access_token"
    static let kfirstTimeLogin        =   "firstTimeLogin"
    static let kdata                  =   "data"
    static let kvedioServerPath       =   "vedioServerPath"
    static let kaskingDate            =   "askingDate"
    static let kclassAssignmentLogID  =   "classAssignmentLogID"
    static let kclassEndTime          =   "classEndTime"
    static let kclassStartTime        =   "classStartTime"
    static let kclockIn               =   "clockIn"
    static let kclockOut              =   "clockOut"
    static let kcheckStatus           =   "checkStatus"
    static let kclassAttendenceID     =   "classAttendenceID"
    static let krequestedEmail        =   "requestedEmail"
    static let ksleptAtTime           =   "sleptAtTime"
    static let kworkUpTime            =   "workUpTime"
    static let knapNote               =   "napNote"
    static let kmoodTypeID            =   "moodTypeID"
    static let kstartTime             =   "startTime"
    static let kendTime               =   "endTime"
    static let kotherActivityNote     =   "otherActivityNote"
    static let knoteDescription       =   "noteDescription"
    static let krecordedTemparture    =   "recordedTemparture"
    static let kparentID              =   "parentID"
    static let kisAuthorized          =   "isAuthorized"
    static let kdoseRepeatID          =   "doseRepeatID"
    static let kstudentMedicationID   =   "studentMedicationID"
    static let khowTaken              =   "howTaken"
    static let kmealPlanID            =   "mealPlanID"
    static let kupdatedPassword       =   "updatedPassword"
    static let kroleID                =   "roleID"
    static let ksenderUserID          =   "senderUserID"
    static let kreceiverUserID        =   "receiverUserID"
    static let kosType                =   "osType"
    static let kpage                  =   "page"
    static let klimit                 =   "limit"
    static let kisTeacherAcknowledge  =   "isTeacherAcknowledge"
    static let kactivityRegisterDate  =   "activityRegisterDate"
    static let kfromClassID           =   "fromClassID"
    static let ktoClassID             =   "toClassID"
    static let kimagePath             =   "imagePath"
    static let kstudentMedicationName   :   String  =   "studentMedicationName"
    static let kstudentHealthDescription:   String  =   "studentHealthDescription"
    static let kstudentMoodDescription  :   String  =   "studentMoodDescription"
    static let kteacherDailyAttendenceID:   String  =   "teacherDailyAttendenceID"
    static let kfirstAidAdministeredID  :   String  =   "firstAidAdministeredID"
    static let kfirstAidAdministeredName:   String  =   "firstAidAdministeredName"
    static let kincidentPriortyTypeID   :   String  =   "incidentPriortyTypeID"
    static let kinvolvedEventClassesList:   String  =   "involvedEventClassesList"
    static let kstudentActivityMedications  :   String  =   "studentActivityMedications"
    static let kstudentActivityMealFoodItems:   String  =   "studentActivityMealFoodItems"
  }
}

