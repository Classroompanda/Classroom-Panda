package com.daycare.daycareteacher.utill

/**
 * It contain all the constant field values that are used into other classes
 */

val MUTE = 15
val UN_MUTE = 16
val ARCHIVE = 17
val LONG_PRESS = 100
val DEVICE_TYPE = "Android"
/**
 * ADD Event Activity
 */
val START_DATE = "start_date"
val END_DATE = "end_date"
val EVENT_DATA = "event_data_bundled"
val EVENT_TITLE = "event_title"
val EVENT_DESCRIPTION = "description"
val CLASS_NAME = "class_name"
val INCIDENT_DATA = "incidentData"
val STUDENT_BREAK_DATA = "studentBreakData"
val POST_DATA = "incidentData"
var iscamera:Boolean=false


val ATTENDANCE = 101
val DAILYSHEET = 102
val POSTACTIVITY = 103
val BREAKLOGACTIVITY = 104

//Student Attendance Fragment status code
val IS_CHECKED_IN = 3
val IS_CHECKED_OUT = 4
val IS_CHECKED_ABSENT = 5
val IS_TO_BE_CHECKED = 2
val IS_ON_BREAK =10
val NOT_GIVEN=6
val GIVEN=7


/*
0=>Is to be checked in
1=>Check in
2=>break Out
* 3=> BreakIn
* 4=>Check out
*
* */



//Break Statusval ON_BREAK_OUT=1
val OPEN_BREAK=0
val ON_BREAK_OUT=1
val ON_BREAK_IN=2

//Teacher class checkin code
val CLASS_ACTIVE = 201
val CLASS_OVER = 202
val CLASS_INACTIVE = 203
val AVAILABLE_CHECKIN_STATUS=0
val CHECK_IN_STATUS=1
val CHECK_OUT_STATUS=2
val BREAK_IN_STATUS=3
val BREAK_OUT_STATUS=4


object WebServices {
    var IMAGE_URL="http://75.126.168.31:9942/"
   // var WS_Staging_URL = "https://schoolpandaapp.azurewebsites.net/api/"
   var WS_Staging_URL = "https://www.stagingwin.com:9943/api/"
        //"https://www.stagingwin.com:9943/api/"

  //  var IMAGE_URL="http://75.126.168.31:9189/"
   // var WS_Staging_URL = "http://75.126.168.31:9189/api/"

    const val GET_ALL_CLASSES="Classes/GetAllClasses"
    const val GET_CLASS_ATTENDENCE="Teacher/GetClassAttendence"
    const val CHECKIN_ATTENDANCE_STUDENT="Teacher/CheckInAttendenceStudent"
    const val CHECKOUT_ATTENDANCE_STUDENT="Teacher/CheckOutAttendenceStudent"
    const val ABSENT_ATTENDANCE_STUDENT="Teacher/AbsentAttendenceStudent"
    const val GET_ALL_TEACHERS ="Teacher/GetAllTeachers"
    const val GET_ALL_GUARDIANS_FOR_STUDENTS="Agency/GetAllGuardiansForStudents"
    const val GET_STUDENT_LIST="Agency/GetAllStudents"
    const val GET_STUDENT_DETAIL="Agency/GetStudentInformation"
    const val GET_ALL_INCIDENTS="Agency/GetAllIncidents"
    const val GET_ALL_STUDENTS_BY_CLASS ="Agency/GetAllStudentsByClass"
    const val GET_LEAVE_REASONS="Masters/GetAllLeaveReasonType"
    const val GET_ALL_NATURE_OF_INJURY ="Masters/GetAllNatureofinjury"
    const val ADD_INCIDENT ="Agency/SaveIncident"
    const val DELETE_INCIDENT ="Agency/DeleteIncident"
    const val LOGIN_TEACHER="User/login"
    const val GET_REPEAT_INTERVAL_DATA="Masters/GetAllRepeatTypeDropdown"
    const val ADD_EVENT="Agency/SaveEvent"
    const val GET_EVENT_CALENDAR_DATA="Agency/GetAllEvents"
    const val GET_MEAL_CALENDAR_DATA="Agency/GetAllMealPlan"
    const val DELETE_EVENT="Agency/DeleteEvent"
    const val GET_COUNTRY_LIST="Masters/GetAllCountry"
    const val GET_MEAL_CATEGORY="Masters/GetAllMealTypeDropdown"
    const val GET_STATE_LIST="Masters/GetAllStates"
    const val GET_CITY_LIST="Masters/GetAllCities"
    const val GET_PROFILE_DETAIL="Teacher/GetTeacherInformation"
    const val GET_CLASS_DAILY_SHEET="Classes/GetDailySheetMobile"
    const val ADD_DAILYSHEET="Classes/SaveStudentActivity"
    const val GET_HEALTHDATA="Classes/GetParticularStudentActivityMedications"
    const val GET_NOTEDATA="Classes/GetParticularStudentActivityNotes"
    const val GET_ACTIVITYDATA="Classes/GetParticularStudentOtherActivity"
    const val GET_NAPDATA="Classes/GetParticularStudentActivityNap"
    const val GET_MOODDATA="Classes/GetParticularStudentActivityMoods"
    const val GET_CLASS_POST_ACTIVITY="Teacher/GetAllPostActivities"
    const val PROFILE_PICS_UPLOAD="Agency/GetImage"
    const val POSTACTIVITY_PICS_UPLOAD="Common/MultipleImageUpload"
    const val SAVE_POST_ACTIVITY="Teacher/SavePostActivites"
    const val DELETE_POST_ACTIVITY="Teacher/SavePostActivites"
    const val UPDATE_PROFILE="Teacher/SaveTeacherDetails"
    const val GET_TEACHER_CLASS_LOG="Teacher/GetTeacherClassLog"
    const val TEACHER_CHECKIN_CHECKOUT="Teacher/TeacherCheckInCheckOut"
    const val TEACHER_CLOCKIN_CLOCKOUT="Teacher/TeacherClockInClockOut"
    const val STUDENT_BREAK_LIST="Teacher/GetStudentBreakLogs"
    const val STUDENT_BREAK_IN_OUT_STATUS="Teacher/BreakInOutAttendenceStudentMobile"
    const val TEACHER_BREAK_IN_OUT="Teacher/TeacherBreakInBreakOut"
    const val TEACHER_BREAK_IN_OUT_STATUS="Teacher/GetTeacherCurrentBreakStatus"
    const val FORGOT_PASSWORD="Common/ForgotPassword"
    const val GET_MEAL_PLAN="Classes/GetTodayMealPlan"
    const val GET_TEACHER_BREAK_LOG="Teacher/GetTeacherBreakLog"
    const val GET_STUDENT_MEDICATION="Teacher/GetTeacherTodayMedicationTasks"
    const val GET_MEAL_DATA="Classes/GetParticularStudentActivityMeals"
    const val GET_TEACHER_CLASS_CHECKIN_STATUS="Teacher/GetTeacherOperationalClasses"
    const val GET_DIAPERDATA="Classes/GetParticularStudentActivityDiaperChanges"
    const val  GET_PARTICULAR_MEAL_PLAN = "Agency/GetParticularMealPlan"
    const val  UPDATE_PASSWORD = "Common/UpdatedPassword"
    const val GET_LIST_FOR_CHAT = "Message/GetListForChat"
    const val GET_CHAT_HISTORY = "Message/GetMessageByID"
}

object OptionConstant {
    val COPY = 1
    val DELETE = 2
    val PIN = 3
    val FORWORD = 4
    val UNPIN = 5
    val EDIT = 6
    val OPEN_PROFILE = 7
    val EDIT_PROFILE = 8
    val ADD_REACTION = 9
    val ADD_LOG = 10
    val VIEW_LOG = 11
    val ADD_TASK = 12
    val ADD_IMAGE = 13
    val VIEW_PROFILE = 14
    val CAMERA = 15
    val CHOOSE_EXISTING = 16
    val NONE=100
}

object DailySheetConstant{
    val HEALTH=1
    val NOTES=2
    val MEAL=3
    val MOOD=4
    val ACTIVITY=5
    val NAP=6
    val DIAPER=7
}


enum class eLinkDownloadType {
    NONE, LOADING, LOADED, ERROR
}
