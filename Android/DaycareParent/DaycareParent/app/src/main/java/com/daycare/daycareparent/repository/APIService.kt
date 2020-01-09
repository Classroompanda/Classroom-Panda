package com.daycare.daycareparent.repository

import com.daycare.daycareparent.utill.WebServices.CHECKIN_ATTENDANCE_STUDENT
import com.daycare.daycareparent.utill.WebServices.CHECKOUT_ATTENDANCE_STUDENT
import com.daycare.daycareparent.utill.WebServices.GET_ALL_CLASSES
import com.daycare.daycareparent.utill.WebServices.GET_ALL_GUARDIANS_FOR_STUDENTS
import com.daycare.daycareparent.utill.WebServices.GET_CLASS_ATTENDENCE
import com.daycare.daycareparent.model.*
import com.daycare.daycareparent.ui.dashboard.messenging.ChatData
import com.daycare.daycareparent.utill.WebServices.ABSENT_ATTENDANCE_STUDENT
import com.daycare.daycareparent.utill.WebServices.ADD_DAILYSHEET
import com.daycare.daycareparent.utill.WebServices.ADD_EVENT
import com.daycare.daycareparent.utill.WebServices.ADD_INCIDENT
import com.daycare.daycareparent.utill.WebServices.DELETE_EVENT
import com.daycare.daycareparent.utill.WebServices.DELETE_INCIDENT
import com.daycare.daycareparent.utill.WebServices.DELETE_POST_ACTIVITY
import com.daycare.daycareparent.utill.WebServices.FORGOT_PASSWORD
import com.daycare.daycareparent.utill.WebServices.GET_ACTIVITYDATA
import com.daycare.daycareparent.utill.WebServices.GET_ALLERGY_NAME_TYPE
import com.daycare.daycareparent.utill.WebServices.GET_ALLERGY_TYPE
import com.daycare.daycareparent.utill.WebServices.GET_ALL_DOSAGE_REPEAT
import com.daycare.daycareparent.utill.WebServices.GET_ALL_INCIDENTS
import com.daycare.daycareparent.utill.WebServices.GET_ALL_NATURE_OF_INJURY
import com.daycare.daycareparent.utill.WebServices.GET_ALL_STUDENTS_BY_CLASS
import com.daycare.daycareparent.utill.WebServices.GET_ALL_STUDENT_OF_PARENT
import com.daycare.daycareparent.utill.WebServices.GET_ALL_TEACHERS
import com.daycare.daycareparent.utill.WebServices.GET_CHAT_HISTORY
import com.daycare.daycareparent.utill.WebServices.GET_CITY_LIST
import com.daycare.daycareparent.utill.WebServices.GET_CLASS_DAILY_SHEET
import com.daycare.daycareparent.utill.WebServices.GET_CLASS_POST_ACTIVITY
import com.daycare.daycareparent.utill.WebServices.GET_COUNTRY_LIST
import com.daycare.daycareparent.utill.WebServices.GET_DIAPERDATA
import com.daycare.daycareparent.utill.WebServices.GET_DUE_PAYMENT_LIST
import com.daycare.daycareparent.utill.WebServices.GET_ENROLLMENT_DATA
import com.daycare.daycareparent.utill.WebServices.GET_EVENT_CALENDAR_DATA
import com.daycare.daycareparent.utill.WebServices.GET_HEALTHDATA
import com.daycare.daycareparent.utill.WebServices.GET_IMMUNIZATION_TYPE
import com.daycare.daycareparent.utill.WebServices.GET_LEAVE_REASONS
import com.daycare.daycareparent.utill.WebServices.GET_LIST_FOR_CHAT
import com.daycare.daycareparent.utill.WebServices.GET_MEAL_CALENDAR_DATA
import com.daycare.daycareparent.utill.WebServices.GET_MEAL_CATEGORY
import com.daycare.daycareparent.utill.WebServices.GET_MEAL_DATA
import com.daycare.daycareparent.utill.WebServices.GET_MEAL_PLAN
import com.daycare.daycareparent.utill.WebServices.GET_MOODDATA
import com.daycare.daycareparent.utill.WebServices.GET_NAPDATA
import com.daycare.daycareparent.utill.WebServices.GET_NOTEDATA
import com.daycare.daycareparent.utill.WebServices.GET_PARENT_ACCORDING_TO_LOGIN
import com.daycare.daycareparent.utill.WebServices.GET_PARENT_INFORMATION
import com.daycare.daycareparent.utill.WebServices.GET_PARTICULAR_MEAL_PLAN
import com.daycare.daycareparent.utill.WebServices.GET_PAYMENT_DETAILS
import com.daycare.daycareparent.utill.WebServices.GET_POSTS_BY_CHILD_ID
import com.daycare.daycareparent.utill.WebServices.GET_PROFILE_DETAIL
import com.daycare.daycareparent.utill.WebServices.GET_REACION_TYPE
import com.daycare.daycareparent.utill.WebServices.GET_RELATION_TYPE
import com.daycare.daycareparent.utill.WebServices.GET_REPEAT_INTERVAL_DATA
import com.daycare.daycareparent.utill.WebServices.GET_STATE_LIST
import com.daycare.daycareparent.utill.WebServices.GET_STRIPE_DETAILS_FOR_AGENCY
import com.daycare.daycareparent.utill.WebServices.GET_STUDENT_DETAIL
import com.daycare.daycareparent.utill.WebServices.GET_STUDENT_INFO
import com.daycare.daycareparent.utill.WebServices.GET_STUDENT_LIST
import com.daycare.daycareparent.utill.WebServices.GET_STUDENT_MEDICATION
import com.daycare.daycareparent.utill.WebServices.GET_TEACHER_BREAK_LOG
import com.daycare.daycareparent.utill.WebServices.GET_TEACHER_CLASS_CHECKIN_STATUS
import com.daycare.daycareparent.utill.WebServices.GET_TEACHER_CLASS_LOG
import com.daycare.daycareparent.utill.WebServices.LOGIN_TEACHER
import com.daycare.daycareparent.utill.WebServices.PAYMENT_DETAILS
import com.daycare.daycareparent.utill.WebServices.POSTACTIVITY_PICS_UPLOAD
import com.daycare.daycareparent.utill.WebServices.PROFILE_PICS_UPLOAD
import com.daycare.daycareparent.utill.WebServices.SAVE_PARENT_DASHBOARD_IMAGE_LIKED_INFO
import com.daycare.daycareparent.utill.WebServices.SAVE_PARENT_DASHBOARD_VIDEO_LIKED_INFO
import com.daycare.daycareparent.utill.WebServices.SAVE_PARENT_INFO
import com.daycare.daycareparent.utill.WebServices.SAVE_POST_ACTIVITY
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_ALLERGIES
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_DISABILITY
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_ENROLLMENT
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_GUARDIAN
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_IMMUNIZATION
import com.daycare.daycareparent.utill.WebServices.SAVE_STUDENT_MEDICATION
import com.daycare.daycareparent.utill.WebServices.STUDENT_BREAK_IN_OUT_STATUS
import com.daycare.daycareparent.utill.WebServices.STUDENT_BREAK_LIST
import com.daycare.daycareparent.utill.WebServices.TEACHER_BREAK_IN_OUT
import com.daycare.daycareparent.utill.WebServices.TEACHER_BREAK_IN_OUT_STATUS
import com.daycare.daycareparent.utill.WebServices.TEACHER_CHECKIN_CHECKOUT
import com.daycare.daycareparent.utill.WebServices.TEACHER_CLOCKIN_CLOCKOUT
import com.daycare.daycareparent.utill.WebServices.UPDATE_INCIDENT
import com.daycare.daycareparent.utill.WebServices.UPDATE_PASSWORD
import com.daycare.daycareparent.utill.WebServices.UPDATE_PROFILE

import io.reactivex.Observable
import okhttp3.MultipartBody
import retrofit2.http.*


interface APIService {

    /**

     * @Base APIService interface :  This interface contain the all the mehtods
    of apis (Communicate to  servers with prdefined parameters ).
     **/

    @POST(GET_ENROLLMENT_DATA)
    fun getAllMyEnrollment(@Body requestData: EnrollmentModel): Observable<EnrollmentModel>


    @POST(GET_ALL_STUDENT_OF_PARENT)
    fun getAllStudentsOfParent(@Body requestData: StudentData): Observable<AllParentChilds>

    @POST(GET_CLASS_ATTENDENCE)
    fun getClassAttendence(@Body data: AttendanceData): Observable<AttendanceResponse>


    @POST(STUDENT_BREAK_LIST)
    fun getStudentBreakStatus(@Body requestData: BreakData): Observable<BreakData>


    @POST(GET_CLASS_DAILY_SHEET)
    fun getClassDailySheet(@Body data: DailySheetData): Observable<DailySheetStudentList>


    @POST(GET_ALL_CLASSES)
    fun getAllClasses(@Body classes: ClassData): Observable<ClassModel>


    @POST(CHECKIN_ATTENDANCE_STUDENT)
    fun setAttendenceCheckin(@Body data: AttendanceRequest): Observable<AttendanceResponse>

    @POST(CHECKOUT_ATTENDANCE_STUDENT)
    fun setAttendenceCheckout(@Body data: AttendanceRequest): Observable<AttendanceResponse>

    @POST(ABSENT_ATTENDANCE_STUDENT)
    fun setAttendenceAbsent(@Body data: AttendanceRequest): Observable<AttendanceResponse>

    @POST(GET_ALL_GUARDIANS_FOR_STUDENTS)
    fun getGuardians(@Body data: GuardianRequest): Observable<GuardianModel>

    @POST(GET_STUDENT_LIST)
    fun getClassStudentList(@Body requestStudentData: StudentData): Observable<StudentModel>

    @POST(GET_LEAVE_REASONS)
    fun getReasons(@Body data: AttendanceRequest): Observable<LeaveReasonModel>

    @POST(GET_STUDENT_DETAIL)
    fun getStudentDetail(@Body requestStudentDetail: StudentData): Observable<StudentDetail>

    @POST(GET_ALL_INCIDENTS)
    fun getAllIncidents(@Body data: IncidentData): Observable<IncidentModel>

    @POST(GET_ALL_STUDENTS_BY_CLASS)
    fun getStudentsByClass(@Body requestStudentData: StudentData): Observable<StudentModel>

    @POST(GET_ALL_TEACHERS)
    fun getAllTeacher(@Body requestData: TeacherData): Observable<TeacherModel>

    @POST(GET_ALL_NATURE_OF_INJURY)
    fun getNatureOfInjury(@Body requestData: InjuryData): Observable<InjuryModel>

    @POST(ADD_INCIDENT)
    fun setIncident(@Body requestData: IncidentData): Observable<IncidentModel>

    @POST(DELETE_INCIDENT)
    fun deleteIncident(@Body requestData: IncidentData): Observable<IncidentModel>

    @POST(LOGIN_TEACHER)
    fun loginRequestApi(@Body requestData: LoginRequest): Observable<LoginResponse>

    @POST(GET_REPEAT_INTERVAL_DATA)
    fun getAllRepeatData(@Body requestData: StudentData): Observable<RepeatDataResponse>

    @POST(ADD_EVENT)
    fun saveEvent(@Body requestData: EventDataSave): Observable<EventSaveResponse>


    @POST(GET_EVENT_CALENDAR_DATA)
    fun getEventCalenderData(@Body requestData: EventCalenderRequest): Observable<AllEventDataResponse>

    @POST(GET_MEAL_CALENDAR_DATA)
    fun getMealCalenderData(@Body requestData: EventCalenderRequest): Observable<AllMealDataResponse>


    @POST(DELETE_EVENT)
    fun deleteEvent(@Body requestData: AllEventDataList): Observable<AllEventDataResponse>


    @POST(GET_COUNTRY_LIST)
    fun getCountryList(@Body country: CountryData): Observable<CountryData>

    @POST(GET_MEAL_CATEGORY)
    fun getMealCategory(@Body country: StudentData): Observable<MealCategoryData>

    @POST(GET_STATE_LIST)
    fun getStateList(@Body country: StateData): Observable<StateData>

    @POST(GET_CITY_LIST)
    fun getCityList(@Body country: CityData): Observable<CityData>


    @POST(GET_PROFILE_DETAIL)
    fun getProfileDetail(@Body getprofile: GetProfileRequest): Observable<ProfileData>


    @POST(ADD_DAILYSHEET)
    fun setDailySheetData(@Body requestData: DailySheetSerializeRequest): Observable<DailySheetSaveResponse>


    @POST(GET_HEALTHDATA)
    fun getHealthData(@Body requestData: DSDetailRequestData): Observable<HealthModel>

    @POST(GET_NOTEDATA)
    fun getNoteData(@Body requestData: DSDetailRequestData): Observable<NoteModel>

    @POST(GET_ACTIVITYDATA)
    fun getActivityData(@Body requestData: DSDetailRequestData): Observable<OtherActivityModel>

    @POST(GET_NAPDATA)
    fun getNapData(@Body requestData: DSDetailRequestData): Observable<NapModel>

    @POST(GET_MOODDATA)
    fun getMoodData(@Body requestData: DSDetailRequestData): Observable<MoodModel>

    @POST(GET_CLASS_POST_ACTIVITY)
    fun getClassPostActivity(@Body data: PostActivityModel): Observable<PostActivityStudentList>

    @POST(GET_PARTICULAR_MEAL_PLAN)
    fun getParticularMealPlan(@Body data: MealDetailModel): Observable<MealDetailModel>

    @POST(UPDATE_PASSWORD)
    fun updatePassword(@Body requestData: UpdatePassReq): Observable<BaseModel>

    @Multipart
    @POST(PROFILE_PICS_UPLOAD)
    fun postQuestion(
        @Part file1: MultipartBody.Part?,
        @HeaderMap headers: Map<String, String>
    ): Observable<UploadProfileImage>

    @Multipart
    @POST(POSTACTIVITY_PICS_UPLOAD)
    fun multipleImageUpload(
        @Part file1: MultipartBody.Part?,
        @Part file2: MultipartBody.Part?,
        @Part file3: MultipartBody.Part?,
        @HeaderMap headers: Map<String, String>
    ): Observable<MultipleImageUploadResponse>

    @Multipart
    @POST(POSTACTIVITY_PICS_UPLOAD)
    fun multipleImageUpload2(
        @Part file1: MultipartBody.Part?,
        @Part file2: MultipartBody.Part?,
        @HeaderMap headers: Map<String, String>
    ): Observable<MultipleImageUploadResponse>

    @Multipart
    @POST(POSTACTIVITY_PICS_UPLOAD)
    fun multipleImageUpload1(
        @Part file1: MultipartBody.Part?,
        @HeaderMap headers: Map<String, String>
    ): Observable<MultipleImageUploadResponse>


    @POST(SAVE_POST_ACTIVITY)
    fun postActivitySave(@Body requestData: PostActivityModel): Observable<PostActivitySaveResponse>


    @POST(DELETE_POST_ACTIVITY)
    fun deletepostActivity(@Body requestData: PostActivityModel): Observable<PostActivitySaveResponse>


    @POST(UPDATE_PROFILE)
    fun updateProfile(@Body requestData: TeacherData): Observable<BaseModel>

    @POST(GET_TEACHER_CLASS_LOG)
    fun getTeacherClassLog(@Body requestData: TeacherClassLogModel): Observable<TeacherClassLogModel>

    @POST(TEACHER_CHECKIN_CHECKOUT)
    fun teacherCheckInCheckOut(@Body requestData: ClassLogData): Observable<BaseModel>

    @POST(TEACHER_CLOCKIN_CLOCKOUT)
    fun getClockInOut(@Body requestData: ClockInOutModel): Observable<BaseModel>


    @POST(STUDENT_BREAK_IN_OUT_STATUS)
    fun setBreakData(@Body requestData: StudentBreakData): Observable<BaseModel>

    @POST(TEACHER_BREAK_IN_OUT)
    fun getBreakInOut(@Body requestData: TeacherBreakInOutModel): Observable<BaseModel>


    @POST(TEACHER_BREAK_IN_OUT_STATUS)
    fun getBreakTeacherStatus(@Body requestData: TeacherBreakInOutModel): Observable<TeacherBreakModel>

    @POST(FORGOT_PASSWORD)
    fun forgotRequestApi(@Body requestData: LoginRequest): Observable<ForgotPasswordResponse>

    @POST(GET_MEAL_PLAN)
    fun getMealPlan(@Body requestData: DailySheetData): Observable<MealPlanModel>


    @POST(GET_STUDENT_MEDICATION)
    fun getTeacherMedication(@Body requestData: TeacherMedicationModel): Observable<TeacherMedicationModel>

    @POST(GET_MEAL_DATA)
    fun getMealData(@Body requestData: DSDetailRequestData): Observable<EditMealModel>


    @POST(GET_TEACHER_CLASS_CHECKIN_STATUS)
    fun getCheckInTeacherStatus(@Body requestData: TeacherBreakInOutModel): Observable<TeacherClassCheckInModel>

    @POST(SAVE_STUDENT)
    fun saveStudent(@Body requestData: ParentChild): Observable<BaseModel>

    @POST(SAVE_STUDENT_GUARDIAN)
    fun saveStudntGuardian(@Body requestData: GuardianData): Observable<BaseModel>

    @POST(GET_RELATION_TYPE)
    fun getRelationType(@Body requestData: GuardianRequest): Observable<RelationType>

    @POST(GET_IMMUNIZATION_TYPE)
    fun getImmunizationType(@Body requestData: GuardianRequest): Observable<ImmunizationType>

    @POST(SAVE_STUDENT_IMMUNIZATION)
    fun saveStudentImmunization(@Body requestData: StudentImmunization): Observable<BaseModel>

    @POST(GET_ALLERGY_TYPE)
    fun getAllergyType(@Body requestData: GuardianRequest): Observable<AllergyType>

    @POST(GET_ALLERGY_NAME_TYPE)
    fun getAllergyNameType(@Body requestData: GuardianRequest): Observable<AllergyNameType>

    @POST(GET_REACION_TYPE)
    fun getReactionType(@Body requestData: GuardianRequest): Observable<ReactionType>

    @POST(SAVE_STUDENT_ALLERGIES)
    fun saveStudentAllergies(@Body requestData: StudentAllergy): Observable<BaseModel>

    @POST(SAVE_STUDENT_MEDICATION)
    fun saveStudentMedication(@Body requestData: StudentMedication): Observable<BaseModel>

    @POST(SAVE_STUDENT_DISABILITY)
    fun saveStudentDisability(@Body requestData: StudentDisability): Observable<BaseModel>

    @POST(GET_DIAPERDATA)
    fun getDiaperData(@Body requestData: DSDetailRequestData): Observable<DiaperModel>

    @POST(GET_POSTS_BY_CHILD_ID)
    fun getChildsPosts(@Body requestData: Post): Observable<Posts>

    @POST(SAVE_PARENT_DASHBOARD_IMAGE_LIKED_INFO)
    fun saveImageLikedInfo(@Body requestData: PostDataRequest): Observable<BaseModel>

    @POST(SAVE_PARENT_DASHBOARD_VIDEO_LIKED_INFO)
    fun saveVideoLikedInfo(@Body requestData: PostDataRequest): Observable<BaseModel>

    @POST(GET_STUDENT_INFO)
    fun getStudentInfo(@Body requestData: GuardianRequest): Observable<StudentInfoDetail>

    @POST(GET_ALL_DOSAGE_REPEAT)
    fun getAllDosage(@Body requestData: GuardianRequest): Observable<ReactionType>

    @POST(SAVE_STUDENT_ENROLLMENT)
    fun saveStudentEnrollment(@Body requestData: EnrollmentData): Observable<BaseModel>

    @POST(GET_PARENT_INFORMATION)
    fun getParentInformation(@Body requestedData: ParentData): Observable<ParentModel>

    @POST(SAVE_PARENT_INFO)
    fun saveParentInfo(@Body requestData: ParentData): Observable<BaseModel>

    @POST(GET_PARENT_ACCORDING_TO_LOGIN)
    fun getParentAccToLogin(@Body requestData: ParentData): Observable<GuardianListModel>

    @POST(GET_STRIPE_DETAILS_FOR_AGENCY)
    fun getStripeDetailsForAgency(@Body requestData: GuardianRequest): Observable<PaymentModel>

    @POST(PAYMENT_DETAILS)
    fun paymentDetails(@Body requestData: PaymentRequest): Observable<BaseModel>

    @POST(GET_PAYMENT_DETAILS)
    fun getPaymentDetails(@Body requestData: GuardianRequest): Observable<PaymentHistoryModel>

    @POST(GET_DUE_PAYMENT_LIST)
    fun getDuePaymetList(@Body requestData: DuePayment): Observable<DuePaymentModel>

    @POST(GET_LIST_FOR_CHAT)
    fun getListForChat(@Body requestData: TeacherChatList): Observable<TeacherChatList>

    @POST(GET_CHAT_HISTORY)
    fun getChatHistory(@Body requestData: ChatData): Observable<ChatHistoryModel>

    @POST(UPDATE_INCIDENT)
    fun updateIncident(@Body requestData: IncidentData): Observable<IncidentModel>


}