export const TeacherAPIURLs = {
    /** Student attendence page API URL */
    GetClassAttendence : 'api/Teacher/GetClassAttendence',
    CheckInAttendenceStudent: 'api/Teacher/CheckInAttendenceStudent',
    CheckOutAttendenceStudent: 'api/Teacher/CheckOutAttendenceStudent',
    AbsentAttendenceStudent: 'api/Teacher/AbsentAttendenceStudent',
    GetAllClasses: 'api/Classes/GetAllClasses',
    GetAllClassesForStudentAttendenceTransfer: 'api/Agency/GetAllClassesForStudentAttendenceTransfer',
    GetAllLeaveReasonType: 'api/Masters/GetAllLeaveReasonType',
    GetAllGuardiansForStudents: 'api/Agency/GetAllGuardiansForStudents',
    GetDailySheetActivityReportByEmail: 'api/Classes/GetDailySheetActivityReportByEmail',
    /**Students break page url */
    BreakInAttendenceStudent: 'api/Teacher/BreakInAttendenceStudent',
    BreakOutAttendenceStudent: 'api/Teacher/BreakOutAttendenceStudent',
    GetStudentBreakLogs: 'api/Teacher/GetStudentBreakLogs',
    /** Student List */
    GetAllStudents: 'api/Agency/GetAllStudents',
    GetAllStudentsByClass: 'api/Agency/GetAllStudentsByClass',
    /**Student details page */
    GetStudentInformation : 'api/Agency/GetStudentInformation',
    UpdateStudentProfilePicByTeacher: 'api/Teacher/UpdateStudentProfilePicByTeacher',
    /**Incident Page */
    GetAllIncidents: 'api/Agency/GetAllIncidents',
    SaveIncident: 'api/Agency/SaveIncident',
    GetAllTeachers: 'api/Teacher/GetAllTeachers',
    GetIncidentsDetails: 'api/Agency/GetIncidentsDetails',
    DeleteIncident: 'api/Agency/DeleteIncident',
    GetAllNatureofinjury: 'api/Masters/GetAllNatureofinjury',
    /**Teacher profile page */
    GetTeacherInformation: 'api/Teacher/GetTeacherInformation',
    SaveTeacherDetails: 'api/Teacher/SaveTeacherDetails',
    GetBittingIncidentsDetails: 'api/Agency/GetBittingIncidentsDetails',
    /**Master APIs */
   GetAllCountry:  'api/Masters/GetAllCountry',
   GetAllStates: 'api/Masters/GetAllStates',
   GetAllCities: 'api/Masters/GetAllCities',
   GetAllStudentDropdown: 'api/Masters/GetAllStudentDropdown',  // API for all student in multiselect format
   GetAllClassesDropdown: 'api/Masters/GetAllClassesDropdown',
   GetAllRepeatTypeDropdown: 'api/Masters/GetAllRepeatTypeDropdown',
   GetAllIncidentPriortyTypeDropdown: 'api/Masters/GetAllIncidentPriortyTypeDropdown',
   GetAllMoodTypeDropdown: 'api/Masters/GetAllMoodTypeDropdown',
   GetTeacherOperationalClasses: 'api/Teacher/GetTeacherOperationalClasses',
   /**Event planner page */
   GetAllEvents: 'api/Agency/GetAllEvents',
   GetEventDetails: 'api/Agency/GetEventDetails',
   SaveEvent: 'api/Agency/SaveEvent',
   DeleteEvent: 'api/Agency/DeleteEvent',
   /**Meal planner page */
   GetAllMealPlan: 'api/Agency/GetAllMealPlan',
   DeleteMealPlan:  'api/Agency/DeleteMealPlan',
   GetAllMealTypeDropdown: 'api/Masters/GetAllMealTypeDropdown',
   GetAllMeasureUnitTypeDropdown: 'api/Masters/GetAllMeasureUnitTypeDropdown',
   GetAllMeasureQuantityDropdown: 'api/Masters/GetAllMeasureQuantityDropdown',
   GetAllFoodTypeDropdown: 'api/Masters/GetAllFoodTypeDropdown',
   DeleteParticularMealPlan: 'api/Classes/DeleteParticularMealPlan',
   /**Daily sheet page */
   GetDailySheet: 'api/Classes/GetDailySheet',
   SaveStudentActivity: 'api/Classes/SaveStudentActivity',
   GetAllSubActivityType: 'api/Masters/GetAllSubActivityType',
   GetTodayMealPlan: 'api/Classes/GetTodayMealPlan',
   UploadImage: 'api/Agency/GetImage',
   UpImage: 'api/Common/SignatureSave',
   GetAllFoodConsumtion: 'api/Masters/GetAllFoodConsumtion',
   GetParticularStudentActivityMeals: 'api/Classes/GetParticularStudentActivityMeals',
   /**Post Activity */
   GetAllPostActivities: 'api/Teacher/GetAllPostActivities',
   /**Dashboard */
   SavePostActivites: 'api/Teacher/SavePostActivites',
   MultipleImageUpload : 'api/common/MultipleImageUpload',
   GetAllStudentsDropDownByClass: 'api/Agency/GetAllStudentsDropDownByClass',
   GetTeacherClassLog: 'api/Teacher/GetTeacherClassLog',
   TeacherCheckInCheckOut: 'api/Teacher/TeacherCheckInCheckOut',
   GetTeacherTodayMedicationTasks: 'api/Teacher/GetTeacherTodayMedicationTasks',
   GetStudentAllergy: 'api/Teacher/GetStudentAllergy',
   GetTeacherCurrentClassLogStatus: 'api/Teacher/GetTeacherCurrentClassLogStatus',
   TeacherDashboardInfo: 'api/Teacher/TeacherDashboardInfo',
   /**Post details page */
   GetPostActivityInfo: 'api/Teacher/GetPostActivityInfo',
   /**Teacher Break Page */
   GetTeacherBreakLog: 'api/Teacher/GetTeacherBreakLog',
   TeacherBreakInBreakOut: 'api/Teacher/TeacherBreakInBreakOut',
   GetTeacherCurrentBreakStatus: 'api/Teacher/GetTeacherCurrentBreakStatus',

   GetAllIncidentsByChildID : 'api/Parent/GetAllIncidentsByChildID',
   /**Message Page */
   GetAssociatedParentListForChat: 'api/Message/GetAssociatedParentListForChat',
   GetMessageByIDForTeacher: 'api/Message/GetMessageByIDForTeacher',
   GetListForChat: 'api/Message/GetListForChat',
   StudentClassTransferAttendence: 'api/Teacher/StudentClassTransferAttendence',

   // Section Video
   SaveSectionVideo: 'api/Masters/SaveSectionVideo',
   GetSectionVideo: 'api/Masters/GetSectionVideo',
   GetSectionList: 'api/Masters/GetSectionList',
   GetVideoForSection: 'api/Masters/GetVideoForSection',

   // Get All UnRead Messages Count
   GetUnReadMessageCount: 'api/Message/GetUnReadMessageCount'

};


