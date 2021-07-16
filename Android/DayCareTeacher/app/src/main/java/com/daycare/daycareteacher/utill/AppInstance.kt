package com.daycare.daycareteacher.utill

import android.content.Context
import com.daycare.daycareteacher.model.*
import java.util.*

object AppInstance {

   var fnameChangedOnProfile : String?= null
   var lnameChangedOnProfile : String?= null
   var emailChangedOnProfile : String?= null
   var imageChangedOnProfile:String?=null
   var profileimagePath:String? = ""
   var allClasses: OperationalClassModel? = null



   var allTypesOfClasses: ClassModel? = null

   var allGuardians: GuardianModel? = null
   var allInjuries: InjuryModel? = null
   var allAttendanceData: AttendanceModel? = null
   var allTeachers: TeacherModel? = null
   var allStudents: StudentModel? = null
   var classId: Int?=null
   var dailyClassId:Int?=null

   var studentPosition:Int?=null

   var selectedDate: String? = dialogDisplayDate.format(Date())
   var studentDetails: StudentDetail? = null
   var incidentData: IncidentData? = null
   var bitingData: IncidentData? = null

   var isComingfromEdit: Boolean = false

   var incidentInvolvments:List<IncidentInvolvment>?=null
   var eventInvolvments:List<InvolvedEventClassesList>?=null

   var eventItemData: AllEventDataList? = null

   var repeatDataResponse:RepeatDataResponse?=null
   var alleventDataResponse:AllEventDataResponse?=null
   var allmealDataResponse: AllMealDataResponse?=null
   //var allCountry: CountryData? = null
   var mealCategoryData:MealCategoryData?=null
   //var allState: StateData? = null
   // var allCity:CityData?=null
   var profileDetail:ProfileData?=null
   //var allCompleteDailySheetData: DailySheetModel? = null
   var allDailySheetStidentList: DailySheetStudentList?=null

   var selectedDailySheetActivity:String? = "5"
   var selectedMood: Int = 1
   var napModel:NapModel?=null
   var moodModel:MoodModel?=null
   var postActivityDetailData:ArrayList<PostActivityStudentData>?=null
   var clockInSaveID:Int?=null
   var doClockOut:Boolean?=false
   var breakData:BreakData?=null
   var breakReason:String?=null

   var breakParentPosition:Int?=null
   var breakPosition:Int?=null
   var mealPlanModel:MealPlanModel?=null
   var studentBreakData: StudentBreakData? = null
   var teacherMedicationModel:TeacherMedicationModel?=null
   var MealPlanPos:Int?=null
   // var teacherClassCheckInModel:TeacherClassCheckInModel?=null
   var editMealModel:EditMealModel?=null
   //var diaperModel:DiaperModel?=null

   private operator fun invoke(): AppInstance? {
      return null
   }

   fun getUser(context: Context): LoginResponse.Data?{
      return PreferenceConnector.readUser(context, PreferenceConnector.USER_INFO)
   }

   fun getTeacherInfo(context: Context): TeacherClassCheckInModel?{
      return PreferenceConnector.readTeacherInfo(context, PreferenceConnector.TEACHER_CHECKIN)
   }

}