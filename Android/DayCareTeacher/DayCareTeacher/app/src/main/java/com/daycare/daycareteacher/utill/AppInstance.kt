package com.daycare.daycareteacher.utill


import com.daycare.daycareteacher.model.*
import java.util.*
import kotlin.collections.ArrayList


object AppInstance {

    private var appInstance: AppInstance? = null
    var logObj: LoginResponse? = null
    var allClasses: ClassModel? = null
    var allGuardians: GuardianModel? = null
    var allLeaveReasons: LeaveReasonModel? = null
    var allInjuries: InjuryModel? = null
    var allAttendanceData: AttendanceModel? = null
    var allTeachers: TeacherModel? = null
    var allStudents: StudentModel? = null
    var selectedDate: String? = dialogDisplayDate.format(Date())
    var selectedTime: String? = null
    var studentDetails: StudentDetail? = null
    var incidentData: IncidentData? = null
    var loginResponse:LoginResponse?=null
    var incidentInvolvments:List<IncidentInvolvment>?=null
    var eventInvolvments:List<InvolvedEventClassesList>?=null

    var eventItemData: AllEventDataList? = null

    var repeatDataResponse:RepeatDataResponse?=null
    var alleventDataResponse:AllEventDataResponse?=null
    var allmealDataResponse: AllMealDataResponse?=null
    var allCountry: CountryData? = null
    var mealCategoryData:MealCategoryData?=null
    var allState: StateData? = null
    var allCity:CityData?=null
    var profileDetail:ProfileData?=null
    var allDailySheetData: DailySheetModel? = null
    var allDailySheetStidentList: DailySheetStudentList?=null
    var selectedStudentsListDailySheet = ArrayList<Int>()
    var dailySheetStudentData:ArrayList<DailySheetStudentData>?=null
    var selectedDailySheetActivity:String? = "5"
    var selectedMood: Int = 1
    var studentDSDetail:StudentDailySheetDetail?=null
    var healthData:HealthModel?=null
    var noteData:NoteModel?=null
    var otherActivityModel:OtherActivityModel?=null
    var napModel:NapModel?=null
    var moodModel:MoodModel?=null
    var postActivityStudentList:PostActivityStudentList?=null
    var postActivityDetailData:ArrayList<PostActivityStudentData>?=null
    var profileimagePath:String? = ""
    var postActivityImage:MultipleImageUploadResponse?=null
    var postActivityVideo:MultipleImageUploadResponse?=null
    var teacherClassLogModel:TeacherClassLogModel?=null
    var checkinSaveID:Int?=null
    var checkinTime:String?=null
    var clockInSaveID:Int?=null
    var clockInOutModel:ClockInOutModel?=null
    var doClockOut:Boolean?=false
    var breakData:BreakData?=null
    var breakParentPosition:Int?=null
    var breakPosition:Int?=null
    var HadBreakIn:Boolean?=false
    var BreakOutID:Int?=null
    var teacherBreakModel:TeacherBreakModel?=null
    var forgotPasswordResponse:ForgotPasswordResponse?=null
    var mealPlanModel:MealPlanModel?=null
    var studentBreakData: StudentBreakData? = null
    var teacherMedicationModel:TeacherMedicationModel?=null
    var MealPlanPos:Int?=null
    var teacherClassCheckInModel:TeacherClassCheckInModel?=null
    var editMealModel:EditMealModel?=null
    var diaperModel:DiaperModel?=null

    /**
     * To initialize the appInstance Object
     *
     * @return singleton instance
     */

    fun getAppInstance(): AppInstance {
        if (appInstance == null) {
            appInstance = AppInstance()

            /**
             * The object will manage the User information
             */
            logObj = LoginResponse()
        }

        return appInstance as AppInstance
    }

    private operator fun invoke(): AppInstance? {
        return null
    }

}