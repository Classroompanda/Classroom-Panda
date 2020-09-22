using DayCare.Service.IService.Agency;
using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Entity.Student;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Model.Teacher;
using DayCare.Model.Master;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Service.Common;
using DayCare.Service.IService.Common;

namespace DayCare.Service.Service.Agency
{
    public class DailySheetService : IDailySheetService
    {
        public DataContext _dataContext;
        public IStudentActivitiesRepository _studentActivitiesRepository;
        public IStudentActivityMealRepository _studentActivityMealRepository;
        public IStudentActivityMedicationRepository _studentActivityMedicationRepository;
        public IStudentActivityNoteRepository _studentActivityNoteRepository;
        public IStudentActivityMoodRepository _studentActivityMoodRepository;
        public IStudentOtherActivityRepository _studentOtherActivityRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classesRepository;
        public IMealTypeRepository _mealTypeRepository;
        public IMoodTypeRepository _moodTypeRepository;
        public ISubActivityTypeRepository _subActivityTypeRepository;
        public IActivityTypeRepository _activityTypeRepository;
        public IClassTransferAttendenceRepository _classTransferAttendenceRepository;
        public IStudentAcitivityNapRepository _studentAcitivityNapRepository;
        public IMealPlannerRepository _mealPlannerRepository;
        public IInvolvedMealClassesRepository _involvedMealClassesRepository;
        public IFoodTypeRepository _foodTypeRepository;
        public IMeasureUnitTypeRepository _measureUnitTypeRepository;
        public IMeasureQuantityTypeRepository _measureQuantityTypeRepository;
        public IInvolvedMealFoodItemsRepository _involvedMealFoodItemsRepository;
        public IStudentActivityMealFoodItemsRepository _studentActivityMealFoodItemsRepository;
        public IFoodConsumtionRepository _foodConsumtionRepository;
        public IStudentMedicationRepository _studentMedicationRepository;
        public IDoseRepeatRepository _doseRepeatRepository;
        public IStudentActivityDiaperRepository _studentActivityDiaperRepository;
        public IUserRepository _userRepository;
        public IClassAttendenceRepository _classAttendenceRepository;
        public IParentRepository _parentRepository;
        public IReportService _reportService;
        public IErrorlogRepository _errorlogRepository;
        public IMealServeTimeDetailsRepository _mealServeTimeDetails;
        private readonly ICommonService _commonService;
        public DailySheetService(DataContext dataContext,
        IStudentActivitiesRepository studentActivitiesRepository,
        IStudentActivityMealRepository studentActivityMealRepository,
        IStudentActivityMedicationRepository studentActivityMedicationRepository,
        IStudentActivityNoteRepository studentActivityNoteRepository,
        IStudentActivityMoodRepository studentActivityMoodRepository,
        IStudentOtherActivityRepository studentOtherActivityRepository,
        IClassEnrollmentRepository classEnrollmentRepository,
        IStudentRepository studentRepository,
        IClassesRepository classesRepository,
        IMealTypeRepository mealTypeRepository,
        IMoodTypeRepository moodTypeRepository,
        ISubActivityTypeRepository subActivityTypeRepository,
        IActivityTypeRepository activityTypeRepository,
        IStudentAcitivityNapRepository studentAcitivityNapRepository,
        IMealPlannerRepository mealPlannerRepository,
        IInvolvedMealClassesRepository involvedMealClassesRepository,
        IFoodTypeRepository foodTypeRepository,
        IMeasureUnitTypeRepository measureUnitTypeRepository,
        IMeasureQuantityTypeRepository measureQuantityTypeRepository,
        IInvolvedMealFoodItemsRepository involvedMealFoodItemsRepository,
        IStudentActivityMealFoodItemsRepository studentActivityMealFoodItemsRepository,
        IFoodConsumtionRepository foodConsumtionRepository,
        IStudentMedicationRepository studentMedicationRepository,
        IDoseRepeatRepository doseRepeatRepository,
        IStudentActivityDiaperRepository studentActivityDiaperRepository,
        IUserRepository userRepository,
        IClassAttendenceRepository classAttendenceRepository,
        IParentRepository parentRepository,
        IReportService reportService,
        IClassTransferAttendenceRepository classTransferAttendenceRepository,
        IErrorlogRepository errorlogRepository,
        IMealServeTimeDetailsRepository mealServeTimeDetails,
        ICommonService commonService
            )
        {
            _dataContext = dataContext;
            _studentActivitiesRepository = studentActivitiesRepository;
            _studentActivityMealRepository = studentActivityMealRepository;
            _studentActivityMedicationRepository = studentActivityMedicationRepository;
            _studentActivityNoteRepository = studentActivityNoteRepository;
            _studentActivityMoodRepository = studentActivityMoodRepository;
            _studentOtherActivityRepository = studentOtherActivityRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _studentRepository = studentRepository;
            _classesRepository = classesRepository;
            _mealTypeRepository = mealTypeRepository;
            _moodTypeRepository = moodTypeRepository;
            _subActivityTypeRepository = subActivityTypeRepository;
            _activityTypeRepository = activityTypeRepository;
            _studentAcitivityNapRepository = studentAcitivityNapRepository;
            _mealPlannerRepository = mealPlannerRepository;
            _involvedMealClassesRepository = involvedMealClassesRepository;
            _foodTypeRepository = foodTypeRepository;
            _measureUnitTypeRepository = measureUnitTypeRepository;
            _measureQuantityTypeRepository = measureQuantityTypeRepository;
            _involvedMealFoodItemsRepository = involvedMealFoodItemsRepository;
            _studentActivityMealFoodItemsRepository = studentActivityMealFoodItemsRepository;
            _foodConsumtionRepository = foodConsumtionRepository;
            _studentMedicationRepository = studentMedicationRepository;
            _doseRepeatRepository = doseRepeatRepository;
            _studentActivityDiaperRepository = studentActivityDiaperRepository;
            _userRepository = userRepository;
            _classAttendenceRepository = classAttendenceRepository;
            _reportService = reportService;
            _parentRepository = parentRepository;
            _classTransferAttendenceRepository = classTransferAttendenceRepository;
            _errorlogRepository = errorlogRepository;
            _mealServeTimeDetails = mealServeTimeDetails;
            _commonService = commonService;
        }

        public ResponseViewModal GetDailySheet(DailySheetRequestViewModel getDailySheetRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var fromDate = getDailySheetRequest.AskedDate.Date;
                var toDate = fromDate.AddHours(23);
                toDate = toDate.AddMinutes(59);
                toDate = toDate.AddSeconds(59);
                if (getDailySheetRequest.AskedDateString != null)
                {
                    var Date = Convert.ToDateTime(getDailySheetRequest.AskedDateString);
                    var difference = getDailySheetRequest.AskedDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                    toDate = fromDate.AddHours(24);
                }

                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null)
                {
                    List<DailySheetViewModel> dailySheet = new List<DailySheetViewModel>();
                    List<DailySheetViewModel> dailySheetTransferStudent = new List<DailySheetViewModel>();

                    IQueryable<ClassAttendence> selectedAttendance = _classAttendenceRepository.GetAll(check => check.AgencyID == getDailySheetRequest.AgencyID && !check.IsDeleted && 
                    (fromDate <= check.AttendanceDate && check.AttendanceDate <= toDate)
                     && check.AttendenceStatusID >= 3 && check.AttendenceStatusID < 5 && check.Transfer == false && check.ClassesID == getDailySheetRequest.ClassID);

                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= getDailySheetRequest.AskedDate.Date 
                    && classCheck.ClassEnrollEndDate.Value.Date >= getDailySheetRequest.AskedDate.Date 
                    && classCheck.ClassesID == getDailySheetRequest.ClassID && classCheck.AgencyID == getDailySheetRequest.AgencyID && classCheck.EnrollmentStatus == 2);

                    IQueryable<Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetRequest.AgencyID);

                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= getDailySheetRequest.AskedDate.Date && 
                    classCheck.ClassEndDate.Date >= getDailySheetRequest.AskedDate.Date
                    && classCheck.Id == getDailySheetRequest.ClassID && classCheck.AgencyID == getDailySheetRequest.AgencyID);

                    IQueryable<StudentActivities> selectedStudentActivities = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetRequest.AgencyID
                    && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate) && !filter.IsDeleted
                    && (getDailySheetRequest.StudentID == 0 || getDailySheetRequest.StudentID == null || filter.StudentID == getDailySheetRequest.StudentID)
                    && (getDailySheetRequest.ClassID == null || getDailySheetRequest.ClassID == 0 || filter.ClassesID == getDailySheetRequest.ClassID));

                    IQueryable<Entity.Masters.ActivityType> selectedActivityType = _activityTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendence = _classTransferAttendenceRepository.GetAll().Where(Check => (fromDate <= Check.TransferDate && Check.TransferDate <= toDate) 
                    && Check.AgencyID == getDailySheetRequest.AgencyID && !Check.IsDeleted && Check.Status == true);

                    dailySheet = (from classEnrollmentObj in classEnrollment
                                  join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                  join classObj in classes  on classEnrollmentObj.ClassesID equals classObj.Id

                                  join studentActivitiesprimeobj in selectedStudentActivities
                                  on studentObj.Id equals studentActivitiesprimeobj.StudentID
                                  into studentActivitiesobj
                                  from studentActivitiesprimeobj in studentActivitiesobj.DefaultIfEmpty()

                                  join activityTypeprimeobj in selectedActivityType
                                  on studentActivitiesprimeobj.ActivityTypeID equals activityTypeprimeobj.Id
                                  into activityTypeobj
                                  from activityTypeprimeobj in activityTypeobj.DefaultIfEmpty()

                                  join attendanceObj in selectedAttendance on studentObj.Id equals attendanceObj.StudentID

                                  where (!classEnrollmentObj.IsDeleted && !studentObj.IsDeleted
                                  && studentObj.Id == classEnrollmentObj.StudentID)
                                  select new DailySheetViewModel
                                  {
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName ?? String.Empty,
                                      ImagePath = studentObj.ImagePath ?? string.Empty,
                                      Id = studentActivitiesprimeobj != null ? studentActivitiesprimeobj.Id : 0,
                                      ClassesID = classObj.Id,
                                      ClassName = classObj.ClassName,
                                      AgencyID = studentObj.AgencyID,
                                      ActivityTypeID = studentActivitiesprimeobj != null ? studentActivitiesprimeobj.ActivityTypeID : 0,
                                      ActivityTypeName = studentActivitiesprimeobj != null ? activityTypeprimeobj.ActivityTypeName : "",
                                      ActivityRegisterDate = studentActivitiesprimeobj != null ? studentActivitiesprimeobj.ActivityRegisterDate : DateTime.MinValue                                     
                                  }).Distinct().OrderBy(c => c.Id).ToList();

                    var getAllDetails = (from CLTAObj in classtransferattendence
                                         where CLTAObj.ToClassID == getDailySheetRequest.ClassID && CLTAObj.AgencyID == getDailySheetRequest.AgencyID &&
                                         (fromDate <= CLTAObj.TransferDate && CLTAObj.TransferDate <= toDate) && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                         select new ClassTransferAttendenceViewModel()
                                         {
                                             StudentID = CLTAObj.StudentID,
                                             FromClassID = CLTAObj.FromClassID,
                                             ToClassID = CLTAObj.ToClassID,
                                             TransferDate = CLTAObj.TransferDate
                                         }).ToList();

                    var getAllDetailsStudent = (from CLTAObj in classtransferattendence
                                               where CLTAObj.AgencyID == getDailySheetRequest.AgencyID &&
                                              (fromDate <= CLTAObj.TransferDate && CLTAObj.TransferDate <= toDate) && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                              select new ClassTransferAttendenceViewModel()
                                             {
                                               StudentID = CLTAObj.StudentID,
                                               FromClassID = CLTAObj.FromClassID,
                                               ToClassID = CLTAObj.ToClassID,
                                               TransferDate = CLTAObj.TransferDate
                                             }).ToList();

                    if(getAllDetailsStudent.Count > 0)
                    {
                        dailySheet.RemoveAll(x => getAllDetailsStudent.Exists(y => y.StudentID == x.StudentID));
                    }

                    if (getAllDetails.Count > 0)
                    {
                        IQueryable<Entity.Agency.ClassEnrollment> classEnrollmentTransfer = _classEnrollmentRepository.GetAll().Where(Check => Check.ClassEnrollStartDate.Date <= getDailySheetRequest.AskedDate.Date && Check.ClassEnrollEndDate.Value.Date >= getDailySheetRequest.AskedDate.Date
                        && Check.AgencyID == getDailySheetRequest.AgencyID && Check.EnrollmentStatus == 2 && !Check.IsDeleted);

                        IQueryable<Student> studentsTransfer = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetRequest.AgencyID  && !Check.IsDeleted);

                        IQueryable<Entity.Agency.Classes> classeTransfer = _classesRepository.GetAll().Where(Check => Check.ClassStartDate.Date <= getDailySheetRequest.AskedDate.Date && Check.ClassEndDate.Date >= getDailySheetRequest.AskedDate.Date
                        && Check.AgencyID == getDailySheetRequest.AgencyID && !Check.IsDeleted);

                        IQueryable<StudentActivities> selectedStudentActivitiesTransfer = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetRequest.AgencyID
                        && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate) && !filter.IsDeleted && filter.ClassesID == getDailySheetRequest.ClassID);                      

                        IQueryable<Entity.Masters.ActivityType> selectedActivityTypeTransfer = _activityTypeRepository.GetAll().Where(Check => !Check.IsDeleted);

                        dailySheetTransferStudent = (from CTAObj in classtransferattendence                                                
                                                     join studentObj in studentsTransfer on CTAObj.StudentID equals studentObj.Id
                                                     join classObj in classeTransfer on CTAObj.ToClassID equals classObj.Id

                                                     join studentActivitiesprimeobj in selectedStudentActivitiesTransfer
                                                     on studentObj.Id equals studentActivitiesprimeobj.StudentID
                                                     into studentActivitiesobj
                                                     from studentActivitiesprimeobj in studentActivitiesobj.DefaultIfEmpty()

                                                     join activityTypeprimeobj in selectedActivityTypeTransfer
                                                     on studentActivitiesprimeobj.ActivityTypeID equals activityTypeprimeobj.Id
                                                     into activityTypeobj
                                                     from activityTypeprimeobj in activityTypeobj.DefaultIfEmpty()

                                                     join attendanceObj in selectedAttendance on studentObj.Id equals attendanceObj.StudentID

                                                     where (CTAObj.ToClassID == getDailySheetRequest.ClassID && (fromDate <= CTAObj.TransferDate && CTAObj.TransferDate <= toDate) &&
                                                            !CTAObj.IsDeleted && CTAObj.AgencyID == getDailySheetRequest.AgencyID)                                                      
                                                    select new DailySheetViewModel
                                                    {
                                                     StudentID = studentObj.Id,
                                                     StudentName = studentObj.StudentName ?? String.Empty,
                                                     ImagePath = studentObj.ImagePath ?? string.Empty,
                                                     Id = (long?)(studentActivitiesprimeobj.Id) ?? 0,
                                                     //Id = (long?)studentActivitiesprimeobj != null ? studentActivitiesprimeobj.Id : 0,                                                      
                                                     ClassesID = classObj.Id,
                                                     ClassName = classObj.ClassName,
                                                     AgencyID = studentObj.AgencyID,
                                                     //ActivityTypeID = studentActivitiesprimeobj == null ? studentActivitiesprimeobj.ActivityTypeID : 0,
                                                     ActivityTypeID = (long?)(studentActivitiesprimeobj.ActivityTypeID) ?? 0,
                                                     //ActivityTypeName = studentActivitiesprimeobj == null ? activityTypeprimeobj.ActivityTypeName : "",
                                                     ActivityTypeName = activityTypeprimeobj.ActivityTypeName ?? String.Empty,
                                                    //ActivityRegisterDate = studentActivitiesprimeobj == null ? studentActivitiesprimeobj.ActivityRegisterDate : DateTime.MinValue
                                                     ActivityRegisterDate = (DateTime?)studentActivitiesprimeobj.ActivityRegisterDate ?? DateTime.MinValue
                                                   }).Distinct().OrderBy(c => c.Id).ToList();                     

                        dailySheet.AddRange(dailySheetTransferStudent);
                    }

                    if (dailySheet != null && dailySheet.Count > 0)
                    {
                        for (int i = 0; i < dailySheet.Count; i++)
                        {
                            switch (dailySheet[i].ActivityTypeID)
                            {
                                case 1:
                                    dailySheet[i].StudentActivityMedications = GetStudentActivityMedications(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID); //1:"Health"
                                    break;
                                case 2:
                                    dailySheet[i].StudentActivityNotes = GetStudentActivityNotes(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//2:"Notes"
                                    break;
                                case 3:
                                    dailySheet[i].StudentActivityMeals = GetStudentActivityMeals(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//3:"Meal"
                                    break;
                                case 4:
                                    dailySheet[i].StudentActivityMoods = GetStudentActivityMoods(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//4:"Mood"
                                    break;
                                case 5:
                                    dailySheet[i].StudentOtherActivity = GetStudentOtherActivity(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//5:"Activity"
                                    break;
                                case 6:
                                    dailySheet[i].StudentAcitivityNap = GetStudentActivityNap(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//6:"Nap"
                                    break;
                                case 7:
                                    dailySheet[i].StudentActivityDiaper = GetStudentActivityDiaperChange(getDailySheetRequest, dailySheet[i].Id, dailySheet[i].StudentID);//7:"Diaper Change"
                                    break;
                                default:

                                   break;
                            }
                        }
                        res.Data = dailySheet;
                        if (getDailySheetRequest.limit != 0)
                        {
                            res.Data = dailySheet.Skip((getDailySheetRequest.page) * getDailySheetRequest.limit).Take(getDailySheetRequest.limit).ToList();
                        }
                        res.TotalRows = dailySheet.Count();
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = ResponseViewModal.Constants.Retreived; //"Daily Sheet Attendance has been fetched.";
                        res.IsSuccess = true;
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.OK; ;
                        res.Message = StatusMessage.NotFound;
                        res.IsSuccess = true;
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = ResponseViewModal.Constants.Missing;
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {                
                //========Add Error Log Deatils =======//
                long Id = 0;               
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getDailySheetRequest.AgencyID);
               // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Id = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = ResponseViewModal.Constants.Error;
            }
            return res;
        }

             
        public ResponseViewModal GetDailySheetMobile(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var fromDate = getDailySheetMobileRequest.AskedDate.Date;
                var toDate = fromDate.AddHours(23);
                toDate = toDate.AddMinutes(59);
                toDate = toDate.AddSeconds(59);
                if (getDailySheetMobileRequest.AskedDateString != null)
                {
                    var Date = Convert.ToDateTime(getDailySheetMobileRequest.AskedDateString);
                    var difference = getDailySheetMobileRequest.AskedDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                    toDate = fromDate.AddHours(24);
                }
                if (getDailySheetMobileRequest.AgencyID != null && getDailySheetMobileRequest.AgencyID > 0 && getDailySheetMobileRequest.AskedDate != null)
                {
                    List<DailySheetViewModel> dailySheet = new List<DailySheetViewModel>();
                    List<DailySheetViewModel> dailySheetTransferStudent = new List<DailySheetViewModel>();

                    IQueryable<ClassAttendence> selectedAttendance = _classAttendenceRepository.GetAll(check => check.AgencyID == getDailySheetMobileRequest.AgencyID && !check.IsDeleted &&
                    (fromDate <= check.AttendanceDate && check.AttendanceDate <= toDate)
                          && check.AttendenceStatusID >= 3 && check.AttendenceStatusID < 5 && check.Transfer == false && check.ClassesID == getDailySheetMobileRequest.ClassID);                                    

                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= getDailySheetMobileRequest.AskedDate.Date
                     && classCheck.ClassesID == getDailySheetMobileRequest.ClassID && classCheck.AgencyID == getDailySheetMobileRequest.AgencyID && classCheck.EnrollmentStatus == 2);

                    IQueryable<Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetMobileRequest.AgencyID);                                       
                    
                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= getDailySheetMobileRequest.AskedDate.Date
                    && classCheck.Id == getDailySheetMobileRequest.ClassID && classCheck.AgencyID == getDailySheetMobileRequest.AgencyID);

                    IQueryable<StudentActivities> selectedStudentActivities = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetMobileRequest.AgencyID
                    && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate) && !filter.IsDeleted
                    && (getDailySheetMobileRequest.StudentID == 0 || getDailySheetMobileRequest.StudentID == null || filter.StudentID == getDailySheetMobileRequest.StudentID)
                    && (getDailySheetMobileRequest.ClassID == null || getDailySheetMobileRequest.ClassID == 0 || filter.ClassesID == getDailySheetMobileRequest.ClassID));

                    IQueryable<Entity.Masters.ActivityType> selectedActivityType = _activityTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendence = _classTransferAttendenceRepository.GetAll().Where(Check => (fromDate <= Check.TransferDate && Check.TransferDate <= toDate) && Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted && Check.Status == true);

                    dailySheet = (from classEnrollmentObj in classEnrollment
                                  join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                  join classObj in classes on classEnrollmentObj.ClassesID equals classObj.Id
                                  join attendanceObj in selectedAttendance on studentObj.Id equals attendanceObj.StudentID
                                  where (!classEnrollmentObj.IsDeleted && !studentObj.IsDeleted
                                  && studentObj.Id == classEnrollmentObj.StudentID)
                                  select new DailySheetViewModel
                                  {
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName ?? String.Empty,
                                      ImagePath = studentObj.ImagePath ?? string.Empty,
                                      ClassesID = classObj.Id,
                                      ClassName = classObj.ClassName,
                                      AgencyID = studentObj.AgencyID
                                  }).Distinct().OrderByDescending(c => c.Id).ToList();

                    var getAllDetails = (from CLTAObj in classtransferattendence
                                         where CLTAObj.ToClassID == getDailySheetMobileRequest.ClassID && CLTAObj.AgencyID == getDailySheetMobileRequest.AgencyID &&
                                         (fromDate <= CLTAObj.TransferDate && CLTAObj.TransferDate <= toDate) && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                         select new ClassTransferAttendenceViewModel()
                                         {
                                             StudentID = CLTAObj.StudentID,
                                             FromClassID = CLTAObj.FromClassID,
                                             ToClassID = CLTAObj.ToClassID,
                                             TransferDate = CLTAObj.TransferDate
                                         }).ToList();

                    var getAllDetailsStudent = (from CLTAObj in classtransferattendence
                                                where CLTAObj.AgencyID == getDailySheetMobileRequest.AgencyID &&
                                                (fromDate <= CLTAObj.TransferDate && CLTAObj.TransferDate <= toDate) && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                                select new ClassTransferAttendenceViewModel()
                                                {
                                                    StudentID = CLTAObj.StudentID,
                                                    FromClassID = CLTAObj.FromClassID,
                                                    ToClassID = CLTAObj.ToClassID,
                                                    TransferDate = CLTAObj.TransferDate
                                                }).ToList();

                    if (getAllDetailsStudent.Count > 0)
                    {
                        dailySheet.RemoveAll(x => getAllDetailsStudent.Exists(y => y.StudentID == x.StudentID));
                    }

                    if (getAllDetails.Count > 0)
                    {
                        IQueryable<Entity.Agency.ClassEnrollment> classEnrollmentTransfer = _classEnrollmentRepository.GetAll().Where(Check => Check.ClassEnrollStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && Check.ClassEnrollEndDate.Value.Date >= getDailySheetMobileRequest.AskedDate.Date
                       && Check.AgencyID == getDailySheetMobileRequest.AgencyID && Check.EnrollmentStatus == 2 && !Check.IsDeleted);
                        IQueryable<Student> studentsTransfer = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);
                        IQueryable<Entity.Agency.Classes> classeTransfer = _classesRepository.GetAll().Where(Check => Check.ClassStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && Check.ClassEndDate.Date >= getDailySheetMobileRequest.AskedDate.Date
                        && Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                        IQueryable<StudentActivities> selectedStudentActivitiesTransfer = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetMobileRequest.AgencyID
                        && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate) && !filter.IsDeleted && filter.ClassesID == getDailySheetMobileRequest.ClassID);

                        IQueryable<Entity.Masters.ActivityType> selectedActivityTypeTransfer = _activityTypeRepository.GetAll().Where(Check => !Check.IsDeleted);

                        dailySheetTransferStudent = (from CTAObj in classtransferattendence
                                                     join studentObj in studentsTransfer on CTAObj.StudentID equals studentObj.Id
                                                     join classObj in classeTransfer on CTAObj.ToClassID equals classObj.Id                                                   
                                                     join attendanceObj in selectedAttendance on studentObj.Id equals attendanceObj.StudentID
                                                     where (CTAObj.ToClassID == getDailySheetMobileRequest.ClassID && (fromDate <= CTAObj.TransferDate && CTAObj.TransferDate <= toDate) &&
                                                            !CTAObj.IsDeleted && CTAObj.AgencyID == getDailySheetMobileRequest.AgencyID)
                                                     select new DailySheetViewModel
                                                     {
                                                         StudentID = studentObj.Id,
                                                         StudentName = studentObj.StudentName ?? string.Empty,
                                                         ImagePath = studentObj.ImagePath ?? string.Empty,                                              
                                                         ClassesID = classObj.Id,
                                                         ClassName = classObj.ClassName,
                                                         AgencyID = studentObj.AgencyID
                                                     }).Distinct().OrderBy(c => c.Id).ToList();                       

                        dailySheet.AddRange(dailySheetTransferStudent);
                    }

                    if (dailySheet != null && dailySheet.Count > 0)
                    {
                        foreach (DailySheetViewModel activity in dailySheet)
                        {
                            List<StudentsDailyActivityViewModel> relatedActivities = new List<StudentsDailyActivityViewModel>();

                            relatedActivities = (from studentActivitiesobj in selectedStudentActivities
                                                 where (!studentActivitiesobj.IsDeleted
                                                 && activity.StudentID == studentActivitiesobj.StudentID)
                                                 select new StudentsDailyActivityViewModel
                                                 {
                                                     StudentID = studentActivitiesobj.StudentID,
                                                     StudentActivityID = studentActivitiesobj.Id,
                                                     ActivityTypeID = studentActivitiesobj.ActivityTypeID                                                     
                                                 }).OrderBy(c => c.StudentActivityID).ToList();

                            if (relatedActivities != null && relatedActivities.Count > 0)
                            {
                                foreach (StudentsDailyActivityViewModel relatedActivity in relatedActivities)
                                {
                                    if (relatedActivity.StudentActivityID > 0 && activity.AgencyID > 0 && relatedActivity.ActivityTypeID > 0)
                                    {
                                        switch (relatedActivity.ActivityTypeID)
                                        {
                                            case 1:
                                                IQueryable<StudentActivityMedication> selectedStudentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID); //1:"Health"
                                                if (selectedStudentActivityMedication != null)
                                                {
                                                    var description = selectedStudentActivityMedication.Select(select => select.StudentHealthDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                }
                                                break;
                                            case 2:
                                                IQueryable<StudentActivityNote> selectedStudentActivityNote = _studentActivityNoteRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                        && check.StudentActivitiesID == relatedActivity.StudentActivityID);//2:"Notes"
                                                if (selectedStudentActivityNote != null)
                                                {
                                                    var description = selectedStudentActivityNote.Select(select => select.NoteDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                }
                                                break;
                                            case 3:
                                                IQueryable<StudentActivityMeal> selectedStudentActivityMeal = _studentActivityMealRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//3:"Meal"
                                                if (selectedStudentActivityMeal != null)
                                                {
                                                    var description = selectedStudentActivityMeal.Select(select => select.MealComment).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                }
                                                break;
                                            case 4:
                                                IQueryable<StudentActivityMood> selectedStudentActivityMood = _studentActivityMoodRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                        && check.StudentActivitiesID == relatedActivity.StudentActivityID);//4:"Mood"
                                                if (selectedStudentActivityMood != null)
                                                {
                                                    var description = selectedStudentActivityMood.Select(select => select.StudentMoodDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                }
                                                break;
                                            case 5:
                                                IQueryable<StudentOtherActivity> selectedStudentOtherActivity = _studentOtherActivityRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                        && check.StudentActivitiesID == relatedActivity.StudentActivityID);//5:"Activity"
                                                if (selectedStudentOtherActivity != null)
                                                {
                                                    var description = selectedStudentOtherActivity.Select(select => select.OtherActivityNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.StartTime = selectedStudentOtherActivity.Select(select => select.StartTime).FirstOrDefault();
                                                    relatedActivity.EndTime = selectedStudentOtherActivity.Select(select => select.EndTime).FirstOrDefault();
                                                }
                                                break;
                                            case 6:
                                                IQueryable<StudentAcitivityNap> selectedStudentAcitivityNap = _studentAcitivityNapRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                        && check.StudentActivitiesID == relatedActivity.StudentActivityID);//6:"Nap"
                                                if (selectedStudentAcitivityNap != null)
                                                {
                                                    var description = selectedStudentAcitivityNap.Select(select => select.NapNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.StartTime = selectedStudentAcitivityNap.Select(select => select.SleptAtTime).FirstOrDefault();
                                                    relatedActivity.EndTime = selectedStudentAcitivityNap.Select(select => select.WorkUpTime).FirstOrDefault();
                                                }
                                                break;
                                            case 7:
                                                IQueryable<StudentActivityDiaper> selectedStudentAcitivityDiaper = _studentActivityDiaperRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                        && check.StudentActivitiesID == relatedActivity.StudentActivityID);//7:"Diaper"
                                                if (selectedStudentAcitivityDiaper != null)
                                                {
                                                    var description = selectedStudentAcitivityDiaper.Select(select => select.StudentActivityDiaperNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                            activity.ActivityDetail = relatedActivities;
                            activity.TotalActivityCount = relatedActivities.Count();
                        }
                        if (dailySheet.Count > 0)
                        {
                            res.Data = dailySheet;

                            if (getDailySheetMobileRequest.limit != 0)
                            {
                                res.Data = dailySheet.Skip((getDailySheetMobileRequest.page) * getDailySheetMobileRequest.limit).Take(getDailySheetMobileRequest.limit).ToList();
                            }
                            res.TotalRows = dailySheet.Count();
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Daily Sheet Attendance has been fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.Data = new List<DailySheetViewModel>();
                            res.StatusCode = 987;
                            res.Message = "No Data found.";
                            res.IsSuccess = true;
                        }
                    }
                    else
                    {
                        res.StatusCode = 987;
                        res.Message = "No Data found.";
                        res.IsSuccess = true;
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        private List<StudentActivityMealViewModel> GetStudentActivityMeals(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentActivityMealViewModel> StudentActivityMeals = new List<StudentActivityMealViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentActivityMeal> selectedStudentActivityMeal = _studentActivityMealRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    IQueryable<StudentActivityMealFoodItems> selectedStudentActivityMealFoodItems = _studentActivityMealFoodItemsRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetRequest.AgencyID);
                    IQueryable<Entity.Agency.MealPlanner> selectedMealPlans = _mealPlannerRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID);
                    if (selectedStudentActivityMeal.Count() > 0)
                    {
                        StudentActivityMeals = (from studentActivityMealObj in selectedStudentActivityMeal
                                                join studentActivityMealFoodItemObj in selectedStudentActivityMealFoodItems on studentActivityMealObj.Id equals studentActivityMealFoodItemObj.StudentActivityMealID
                                                join mealplanObj in selectedMealPlans on studentActivityMealObj.MealPlannerID equals mealplanObj.Id
                                                where (!studentActivityMealObj.IsDeleted)
                                                select new StudentActivityMealViewModel
                                                {
                                                    Id = studentActivityMealObj.Id,
                                                    AgencyID = studentActivityMealObj.AgencyID,
                                                    StudentActivitiesID = studentActivityMealObj.StudentActivitiesID,
                                                    StudentID = studentID,
                                                    MealComment = studentActivityMealObj.MealComment,
                                                    OtherThanPlanMeal = studentActivityMealObj.OtherThanPlanMeal,
                                                    OtherThanPlanMealComment = studentActivityMealObj.OtherThanPlanMealComment,
                                                    MealPlannerID = studentActivityMealObj.MealPlannerID,
                                                    MealPlanTitle = mealplanObj.Title,
                                                    ActivityTypeID = 3                                                  
                                                }
                                           ).OrderBy(c => c.StudentActivitiesID).ToList();
                        for (int i = 0; i < StudentActivityMeals.Count; i++)
                        {
                            StudentActivityMeals[i].StudentActivityMealFoodItems = GetStudentActivityMealFoodItems(StudentActivityMeals[i].Id, StudentActivityMeals[i].MealPlannerID, StudentActivityMeals[i].AgencyID, studentID);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityMeals = new List<StudentActivityMealViewModel>();
            }
            return StudentActivityMeals;
        }

        public ResponseViewModal GetParticularStudentActivityMeals(ParticularStudentActivityRequestViewModel getParticularStudentActivityMealsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentActivityMealsRequest.AgencyID > 0 && getParticularStudentActivityMealsRequest.StudentAcitivityId > 0)
                {
                    StudentActivityMealViewModel StudentActivityMeals = new StudentActivityMealViewModel();
                    IQueryable<StudentActivityMeal> selectedStudentActivityMeal = _studentActivityMealRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMealsRequest.AgencyID  && check.StudentActivitiesID == getParticularStudentActivityMealsRequest.StudentAcitivityId);
                    IQueryable<StudentActivityMealFoodItems> selectedStudentActivityMealFoodItems = _studentActivityMealFoodItemsRepository.GetAll().Where(classCheck => classCheck.AgencyID == getParticularStudentActivityMealsRequest.AgencyID);
                    IQueryable<Entity.Agency.MealPlanner> selectedMealPlans = _mealPlannerRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMealsRequest.AgencyID);

                    if (selectedStudentActivityMeal.Count() > 0)
                    {
                        StudentActivityMeals = (from studentActivityMealObj in selectedStudentActivityMeal
                                                join studentActivityMealFoodItemObj in selectedStudentActivityMealFoodItems on studentActivityMealObj.Id equals studentActivityMealFoodItemObj.StudentActivityMealID
                                                join mealplanObj in selectedMealPlans on studentActivityMealObj.MealPlannerID equals mealplanObj.Id                                               
                                                select new StudentActivityMealViewModel
                                                {
                                                    Id = studentActivityMealObj.Id,
                                                    AgencyID = studentActivityMealObj.AgencyID,
                                                    StudentActivitiesID = studentActivityMealObj.StudentActivitiesID,
                                                    StudentID = getParticularStudentActivityMealsRequest.StudentID,
                                                    MealComment = studentActivityMealObj.MealComment,
                                                    OtherThanPlanMeal = studentActivityMealObj.OtherThanPlanMeal,
                                                    OtherThanPlanMealComment = studentActivityMealObj.OtherThanPlanMealComment,
                                                    MealPlannerID = studentActivityMealObj.MealPlannerID,
                                                    MealPlanTitle = mealplanObj.Title,
                                                    ActivityTypeID = 3                                                    
                                                }
                                           ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityMeals != null)
                        {
                            StudentActivityMeals.StudentActivityMealFoodItems = GetStudentActivityMealFoodItems(StudentActivityMeals.Id, StudentActivityMeals.MealPlannerID, StudentActivityMeals.AgencyID, getParticularStudentActivityMealsRequest.StudentID);
                            res.Data = StudentActivityMeals;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Meals Details are fetched.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        private List<StudentActivityMealFoodItemsViewModel> GetStudentActivityMealFoodItems(long studentActivityMealID, long mealPlannerID, long agencyID, long studentID)
        {
            List<StudentActivityMealFoodItemsViewModel> studentActivityMealFoodItems = new List<StudentActivityMealFoodItemsViewModel>();
            try
            {
                if (studentActivityMealID > 0 && mealPlannerID > 0 && agencyID > 0)
                {
                    IQueryable<StudentActivityMealFoodItems> selectedStudentActivityMealFoodItems = _studentActivityMealFoodItemsRepository.GetAll().Where(check => check.AgencyID == agencyID
                    && check.StudentActivityMealID == studentActivityMealID);
                    IQueryable<Entity.Agency.InvolvedMealFoodItems> selectedinvolvedFoodItems = _involvedMealFoodItemsRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == agencyID
                   && mealPlanCheck.MealPlannerID == mealPlannerID);
                    IQueryable<Entity.Masters.MeasureQuantityType> selectMeasureQuantity = _measureQuantityTypeRepository.GetAll();//.Where(check => check.AgencyID == agencyID);
                    IQueryable<Entity.Masters.MeasureUnitType> selectedMeasureUnitType = _measureUnitTypeRepository.GetAll();//.Where(check => check.AgencyID == agencyID);
                    IQueryable<Entity.Masters.FoodConsumtion> selectedFoodConsumptions = _foodConsumtionRepository.GetAll();//.Where(check => check.AgencyID == agencyID);
                    if (selectedStudentActivityMealFoodItems.Count() > 0)
                    {
                        studentActivityMealFoodItems = (from studentActivityMealFoodItemObj in selectedStudentActivityMealFoodItems
                                                        join involvedFoodItem in selectedinvolvedFoodItems on mealPlannerID equals involvedFoodItem.MealPlannerID
                                                        join foodTypeObj in _foodTypeRepository.GetAll() on involvedFoodItem.FoodTypeID equals foodTypeObj.Id

                                                        join measureQuantityTypePrimeObj in selectMeasureQuantity
                                                        on involvedFoodItem.MeasureQuantityTypeID equals measureQuantityTypePrimeObj.Id
                                                        into measureQuantityTypeObj
                                                        from measureQuantityTypePrimeObj in measureQuantityTypeObj.DefaultIfEmpty()

                                                        join measureUnitTypePrimeObj in selectedMeasureUnitType
                                                        on involvedFoodItem.MeasureUnitTypeID equals measureUnitTypePrimeObj.Id
                                                        into measureUnitTypeObj
                                                        from measureUnitTypePrimeObj in measureUnitTypeObj.DefaultIfEmpty()


                                                        join foodConsumtionPrimeObj in selectedFoodConsumptions
                                                        on involvedFoodItem.FoodTypeID equals foodConsumtionPrimeObj.Id
                                                        into foodConsumtionObj
                                                        from foodConsumtionPrimeObj in foodConsumtionObj.DefaultIfEmpty()

                                                        where (!studentActivityMealFoodItemObj.IsDeleted && !involvedFoodItem.IsDeleted  &&
                                                        (studentActivityMealFoodItemObj != null && involvedFoodItem.FoodTypeID == studentActivityMealFoodItemObj.FoodTypeID))
                                                        select new StudentActivityMealFoodItemsViewModel
                                                        {
                                                            Id = studentActivityMealFoodItemObj.Id,
                                                            AgencyID = studentActivityMealFoodItemObj.AgencyID,
                                                            StudentID = studentID,
                                                            StudentActivityMealID = studentActivityMealFoodItemObj.StudentActivityMealID,
                                                            FoodTypeID = involvedFoodItem.FoodTypeID,
                                                            FoodTypeName = foodTypeObj.FoodTypeName,
                                                            MeasureUnitTypeID = involvedFoodItem.MeasureUnitTypeID,
                                                            MeasureUnitTypeName = measureUnitTypePrimeObj.MeasureUnitTypeName,
                                                            MeasureQuantityTypeID = involvedFoodItem.MeasureQuantityTypeID,
                                                            MeasureQuantityTypeName = measureQuantityTypePrimeObj.MeasureQuantityTypeName,
                                                            FoodConsumtionID = studentActivityMealFoodItemObj.FoodConsumtionID,
                                                            FoodConsumtionName = foodConsumtionPrimeObj.FoodConsumtionName,
                                                            MilkConsumptionQuantity = studentActivityMealFoodItemObj.MilkConsumptionQuantity,
                                                            Amount = involvedFoodItem.Amount,
                                                            Quantity = involvedFoodItem.quantity                                                            
                                                        }).OrderBy(c => c.FoodTypeID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                studentActivityMealFoodItems = new List<StudentActivityMealFoodItemsViewModel>();
            }
            return studentActivityMealFoodItems;
        }

        private List<StudentActivityMedicationViewModel> GetStudentActivityMedications(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentActivityMedicationViewModel> StudentActivityMedications = new List<StudentActivityMedicationViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentActivityMedication> selectedStudentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    IQueryable<Entity.Student.StudentMedication> selectedStudentMedication = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID);
                                       
                    IQueryable<Entity.User.Users> selectedParentUsers = _userRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID);
                    IQueryable<Entity.User.Users> selectedTeacherUsers = _userRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID);
                    IQueryable<Entity.Masters.DoseRepeat> selectedDoseRepeatType = _doseRepeatRepository.GetAll();
                    if (selectedStudentActivityMedication.Count() > 0)
                    {
                        StudentActivityMedications = (from studentActivityMedicationObj in selectedStudentActivityMedication

                                                      join selectedStudentMedicationPrimeObj in selectedStudentMedication
                                                      on studentActivityMedicationObj.StudentMedicationID equals selectedStudentMedicationPrimeObj.Id
                                                      into selectedStudentMedicationObj
                                                      from selectedStudentMedicationPrimeObj in selectedStudentMedicationObj.DefaultIfEmpty()

                                                      join doseRepeatTypePrimeObj in selectedDoseRepeatType
                                                      on selectedStudentMedicationPrimeObj.DoseRepeatID equals doseRepeatTypePrimeObj.Id
                                                      into doseRepeatTypeObj
                                                      from doseRepeatTypePrimeObj in doseRepeatTypeObj.DefaultIfEmpty()

                                                      join selectedParentUsersPrimObj in selectedParentUsers
                                                      on studentActivityMedicationObj.AcknowledgeParentID equals selectedParentUsersPrimObj.Id
                                                      into parentUsersObj
                                                      from selectedParentUsersPrimObj in parentUsersObj.DefaultIfEmpty()

                                                      join selectedTeacherPrimObj in selectedParentUsers
                                                      on studentActivityMedicationObj.AcknowledgeTeacherID equals selectedTeacherPrimObj.Id
                                                      into teacherUserObj
                                                      from selectedTeacherPrimObj in teacherUserObj.DefaultIfEmpty()

                                                      where (!studentActivityMedicationObj.IsDeleted)
                                                      select new StudentActivityMedicationViewModel
                                                      {
                                                          Id = studentActivityMedicationObj.Id,
                                                          AgencyID = studentActivityMedicationObj.AgencyID,
                                                          StudentActivitiesID = studentActivityMedicationObj.StudentActivitiesID,
                                                          StudentHealthDescription = studentActivityMedicationObj.StudentHealthDescription,
                                                          RecordedTemparture = studentActivityMedicationObj.RecordedTemparture,
                                                          StudentMedicationID = studentActivityMedicationObj.StudentMedicationID,
                                                          StudentMedicationName = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.MedicationName : "",
                                                          HowTaken = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.HowTaken : "",
                                                          DoseRepeatID = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.DoseRepeatID : 0,
                                                          DoseRepeatName = doseRepeatTypePrimeObj != null ? doseRepeatTypePrimeObj.DoseRepeatName : "",
                                                          DosageQuantityID = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.DosageQuantityID : 0,
                                                          Unit = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.Units : 0,
                                                          isParentAcknowledge = studentActivityMedicationObj.isParentAcknowledge,
                                                          isTeacherAcknowledge = studentActivityMedicationObj.isTeacherAcknowledge,
                                                          AcknowledgeParentID = studentActivityMedicationObj.AcknowledgeParentID,
                                                          AcknowledgeTeacherID = studentActivityMedicationObj.AcknowledgeTeacherID,
                                                          AcknowledgeParentName = selectedParentUsersPrimObj.UserName,
                                                          AcknowledgeTeacherName = selectedTeacherPrimObj.UserName,
                                                          ActivityTypeID = 1,
                                                          StudentID = studentID,                                                         
                                                          IsMedicationDoneToday= studentActivityMedicationObj.IsMedicationDoneToday
                                                      }).OrderBy(c => c.StudentActivitiesID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityMedications = new List<StudentActivityMedicationViewModel>();
            }
            return StudentActivityMedications;
        }
        public ResponseViewModal GetParticularStudentActivityMedications(ParticularStudentActivityRequestViewModel getParticularStudentActivityMedicationsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                StudentActivityMedicationViewModel StudentActivityMedications = new StudentActivityMedicationViewModel();
                if (getParticularStudentActivityMedicationsRequest.AgencyID > 0 && getParticularStudentActivityMedicationsRequest.StudentAcitivityId > 0)
                {
                    IQueryable<StudentActivityMedication> selectedStudentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMedicationsRequest.AgencyID
                    && check.StudentActivitiesID == getParticularStudentActivityMedicationsRequest.StudentAcitivityId);
                    IQueryable<Entity.Student.StudentMedication> selectedStudentMedication = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMedicationsRequest.AgencyID);
                    IQueryable<Entity.Masters.DoseRepeat> selectedDoseRepeatType = _doseRepeatRepository.GetAll();
                    IQueryable<Entity.User.Users> selectedParentUsers = _userRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMedicationsRequest.AgencyID);
                    IQueryable<Entity.User.Users> selectedTeacherUsers = _userRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMedicationsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMedicationsRequest.AgencyID);
                    
                    if (selectedStudentActivityMedication.Count() > 0)
                    {
                        StudentActivityMedications = (from studentActivityMedicationObj in selectedStudentActivityMedication                                                         

                                                      join selectedStudentMedicationPrimeObj in selectedStudentMedication
                                                      on studentActivityMedicationObj.StudentMedicationID equals selectedStudentMedicationPrimeObj.Id
                                                      into selectedStudentMedicationObj
                                                      from selectedStudentMedicationPrimeObj in selectedStudentMedicationObj.DefaultIfEmpty()                                                         

                                                      join doseRepeatTypePrimeObj in selectedDoseRepeatType
                                                      on selectedStudentMedicationPrimeObj.DoseRepeatID equals doseRepeatTypePrimeObj.Id
                                                      into doseRepeatTypeObj
                                                      from doseRepeatTypePrimeObj in doseRepeatTypeObj.DefaultIfEmpty()

                                                      join selectedParentUsersPrimObj in selectedParentUsers
                                                      on studentActivityMedicationObj.AcknowledgeParentID equals selectedParentUsersPrimObj.Id
                                                      into parentUsersObj
                                                      from selectedParentUsersPrimObj in parentUsersObj.DefaultIfEmpty()

                                                      join selectedTeacherPrimObj in selectedParentUsers
                                                      on studentActivityMedicationObj.AcknowledgeTeacherID equals selectedTeacherPrimObj.Id
                                                      into teacherUserObj
                                                      from selectedTeacherPrimObj in teacherUserObj.DefaultIfEmpty()

                                                      from selectedEnrollmentObj in selectedEnrollment
                                                      join medObj in selectedStudentMedication 
                                                      on selectedEnrollmentObj.StudentID equals medObj.StudentID
                                                      where (!studentActivityMedicationObj.IsDeleted)
                                                      select new StudentActivityMedicationViewModel
                                                      {
                                                          Id = studentActivityMedicationObj.Id,
                                                          AgencyID = studentActivityMedicationObj.AgencyID,
                                                          StudentActivitiesID = studentActivityMedicationObj.StudentActivitiesID,
                                                          StudentHealthDescription = studentActivityMedicationObj.StudentHealthDescription,
                                                          RecordedTemparture = studentActivityMedicationObj.RecordedTemparture,
                                                          StudentMedicationID = studentActivityMedicationObj.StudentMedicationID,
                                                          StudentMedicationName = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.MedicationName : "",
                                                          HowTaken = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.HowTaken : "",
                                                          DoseRepeatID = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.DoseRepeatID : 0,
                                                          DoseRepeatName = doseRepeatTypePrimeObj != null ? doseRepeatTypePrimeObj.DoseRepeatName : "",
                                                          DosageQuantityID = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.DosageQuantityID : 0,
                                                          Unit = selectedStudentMedicationPrimeObj != null ? selectedStudentMedicationPrimeObj.Units : 0,
                                                          ActivityTypeID = 1,
                                                          AcknowledgeTeacherID = studentActivityMedicationObj.AcknowledgeTeacherID,
                                                          AcknowledgeParentID = studentActivityMedicationObj.AcknowledgeParentID,
                                                          AcknowledgeParentName = selectedParentUsersPrimObj.UserName,
                                                          AcknowledgeTeacherName = selectedTeacherPrimObj.UserName,
                                                          isParentAcknowledge = studentActivityMedicationObj.isParentAcknowledge,
                                                          isTeacherAcknowledge = studentActivityMedicationObj.isTeacherAcknowledge,
                                                          ClassesID  = selectedEnrollmentObj.ClassesID,
                                                          StudentID = getParticularStudentActivityMedicationsRequest.StudentID                                                          
                                                      }).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityMedications != null)
                        {
                            res.Data = StudentActivityMedications;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Medications Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }
        private List<StudentActivityNoteViewModel> GetStudentActivityNotes(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentActivityNoteViewModel> StudentActivityNotes = new List<StudentActivityNoteViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentActivityNote> selectedStudentActivityNote = _studentActivityNoteRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    if (selectedStudentActivityNote.Count() > 0)
                    {
                        StudentActivityNotes = (from studentActivityNoteObj in selectedStudentActivityNote
                                                where (!studentActivityNoteObj.IsDeleted)
                                                select new StudentActivityNoteViewModel
                                                {
                                                    Id = studentActivityNoteObj.Id,
                                                    AgencyID = studentActivityNoteObj.AgencyID,
                                                    StudentActivitiesID = studentActivityNoteObj.StudentActivitiesID,
                                                    NoteDescription = studentActivityNoteObj.NoteDescription,
                                                    StudentID = studentID,
                                                    ActivityTypeID = 2                                                   
                                                }
                                           ).OrderBy(c => c.StudentActivitiesID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityNotes = new List<StudentActivityNoteViewModel>();
            }
            return StudentActivityNotes;
        }
        public ResponseViewModal GetParticularStudentActivityNotes(ParticularStudentActivityRequestViewModel getParticularStudentActivityNotesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentActivityNotesRequest.AgencyID > 0 && getParticularStudentActivityNotesRequest.StudentAcitivityId > 0)
                {
                    StudentActivityNoteViewModel StudentActivityNotes = new StudentActivityNoteViewModel();
                    IQueryable<StudentActivityNote> selectedStudentActivityNote = _studentActivityNoteRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityNotesRequest.AgencyID
                   && check.StudentActivitiesID == getParticularStudentActivityNotesRequest.StudentAcitivityId);
                    if (selectedStudentActivityNote.Count() > 0)
                    {
                        StudentActivityNotes = (from studentActivityNoteObj in selectedStudentActivityNote
                                                where (!studentActivityNoteObj.IsDeleted)
                                                select new StudentActivityNoteViewModel
                                                {
                                                    Id = studentActivityNoteObj.Id,
                                                    AgencyID = studentActivityNoteObj.AgencyID,
                                                    StudentActivitiesID = studentActivityNoteObj.StudentActivitiesID,
                                                    NoteDescription = studentActivityNoteObj.NoteDescription,
                                                    StudentID = getParticularStudentActivityNotesRequest.StudentID,
                                                    ActivityTypeID = 2                                                   
                                                }
                                           ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityNotes != null)
                        {
                            res.Data = StudentActivityNotes;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Notes Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());

            }
            return res;
        }
        private List<StudentActivityMoodViewModel> GetStudentActivityMoods(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentActivityMoodViewModel> StudentActivityMoods = new List<StudentActivityMoodViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentActivityMood> selectedStudentActivityMood = _studentActivityMoodRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    IQueryable<Entity.Masters.MoodType> selectedMoodTypes = _moodTypeRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getDailySheetRequest.AgencyID);
                    if (selectedStudentActivityMood.Count() > 0)
                    {
                        StudentActivityMoods = (from studentActivityMoodObj in selectedStudentActivityMood
                                                join moodTypeObj in selectedMoodTypes on studentActivityMoodObj.MoodTypeID equals moodTypeObj.Id
                                                where (!studentActivityMoodObj.IsDeleted)
                                                select new StudentActivityMoodViewModel
                                                {
                                                    Id = studentActivityMoodObj.Id,
                                                    AgencyID = studentActivityMoodObj.AgencyID,
                                                    StudentActivitiesID = studentActivityMoodObj.StudentActivitiesID,
                                                    MoodTypeID = studentActivityMoodObj.MoodTypeID,
                                                    MoodTypeName = moodTypeObj.MoodTypeName,
                                                    StudentMoodDescription = studentActivityMoodObj.StudentMoodDescription,
                                                    StudentID = studentID,
                                                    ActivityTypeID = 4                                                   
                                                }
                                            ).OrderBy(c => c.StudentActivitiesID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityMoods = new List<StudentActivityMoodViewModel>();
            }
            return StudentActivityMoods;
        }
        public ResponseViewModal GetParticularStudentActivityMoods(ParticularStudentActivityRequestViewModel getParticularStudentActivityMoodsRequest)
        {

            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentActivityMoodsRequest.AgencyID > 0 && getParticularStudentActivityMoodsRequest.StudentAcitivityId > 0)
                {
                    StudentActivityMoodViewModel StudentActivityMoods = new StudentActivityMoodViewModel();
                    IQueryable<StudentActivityMood> selectedStudentActivityMood = _studentActivityMoodRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityMoodsRequest.AgencyID
                    && check.StudentActivitiesID == getParticularStudentActivityMoodsRequest.StudentAcitivityId);
                    IQueryable<Entity.Masters.MoodType> selectedMoodTypes = _moodTypeRepository.GetAll();
                    if (selectedStudentActivityMood.Count() > 0)
                    {
                        StudentActivityMoods = (from studentActivityMoodObj in selectedStudentActivityMood
                                                join moodTypeObj in selectedMoodTypes on studentActivityMoodObj.MoodTypeID equals moodTypeObj.Id
                                                where (!studentActivityMoodObj.IsDeleted)
                                                select new StudentActivityMoodViewModel
                                                {
                                                    Id = studentActivityMoodObj.Id,
                                                    AgencyID = studentActivityMoodObj.AgencyID,
                                                    StudentActivitiesID = studentActivityMoodObj.StudentActivitiesID,
                                                    MoodTypeID = studentActivityMoodObj.MoodTypeID,
                                                    MoodTypeName = moodTypeObj.MoodTypeName,
                                                    StudentMoodDescription = studentActivityMoodObj.StudentMoodDescription,
                                                    StudentID = getParticularStudentActivityMoodsRequest.StudentID,
                                                    ActivityTypeID = 4                                                   
                                                }
                                            ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityMoods != null)
                        {
                            res.Data = StudentActivityMoods;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Moods Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }
        private List<StudentOtherActivityViewModel> GetStudentOtherActivity(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentOtherActivityViewModel> StudentOtherActivities = new List<StudentOtherActivityViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentOtherActivity> selectedStudentOtherActivity = _studentOtherActivityRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    if (selectedStudentOtherActivity.Count() > 0)
                    {
                        StudentOtherActivities = (from studentOtherActivityObj in selectedStudentOtherActivity
                                                  where (!studentOtherActivityObj.IsDeleted)
                                                  select new StudentOtherActivityViewModel
                                                  {
                                                      Id = studentOtherActivityObj.Id,
                                                      AgencyID = studentOtherActivityObj.AgencyID,
                                                      StudentActivitiesID = studentOtherActivityObj.StudentActivitiesID,
                                                      StartTime = studentOtherActivityObj.StartTime,
                                                      EndTime = studentOtherActivityObj.EndTime,
                                                      OtherActivityNote = studentOtherActivityObj.OtherActivityNote,
                                                      StudentID = studentID,
                                                      ActivityTypeID = 5                                                     
                                                  }
                                            ).OrderBy(c => c.StudentActivitiesID).ToList();
                    }

                }
            }
            catch (Exception ex)
            {
                StudentOtherActivities = new List<StudentOtherActivityViewModel>();
            }
            return StudentOtherActivities;
        }
        public ResponseViewModal GetParticularStudentOtherActivity(ParticularStudentActivityRequestViewModel getParticularStudentOtherActivityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentOtherActivityRequest.AgencyID > 0 && getParticularStudentOtherActivityRequest.StudentAcitivityId > 0)
                {
                    StudentOtherActivityViewModel StudentOtherActivities = new StudentOtherActivityViewModel();
                    IQueryable<StudentOtherActivity> selectedStudentOtherActivity = _studentOtherActivityRepository.GetAll().Where(check => check.AgencyID == getParticularStudentOtherActivityRequest.AgencyID
                   && check.StudentActivitiesID == getParticularStudentOtherActivityRequest.StudentAcitivityId);
                    if (selectedStudentOtherActivity.Count() > 0)
                    {
                        StudentOtherActivities = (from studentOtherActivityObj in selectedStudentOtherActivity
                                                  where (!studentOtherActivityObj.IsDeleted)
                                                  select new StudentOtherActivityViewModel
                                                  {
                                                      Id = studentOtherActivityObj.Id,
                                                      AgencyID = studentOtherActivityObj.AgencyID,
                                                      StudentActivitiesID = studentOtherActivityObj.StudentActivitiesID,
                                                      StartTime = studentOtherActivityObj.StartTime,
                                                      EndTime = studentOtherActivityObj.EndTime,
                                                      OtherActivityNote = studentOtherActivityObj.OtherActivityNote,
                                                      StudentID = getParticularStudentOtherActivityRequest.StudentID,
                                                      ActivityTypeID = 5,                                                     
                                                  }
                                            ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentOtherActivities != null)
                        {
                            res.Data = StudentOtherActivities;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Other Activities Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }
        private List<StudentAcitivityNapViewModel> GetStudentActivityNap(DailySheetRequestViewModel getStudentActivityNapRequest, long studentAcitivityId, long studentID)
        {
            List<StudentAcitivityNapViewModel> StudentActivityNap = new List<StudentAcitivityNapViewModel>();
            try
            {
                if (getStudentActivityNapRequest.AgencyID != null && getStudentActivityNapRequest.AgencyID > 0 && getStudentActivityNapRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentAcitivityNap> selectedStudentAcitivityNap = _studentAcitivityNapRepository.GetAll().Where(check => check.AgencyID == getStudentActivityNapRequest.AgencyID
                    && check.StudentActivitiesID == studentAcitivityId);
                    if (selectedStudentAcitivityNap.Count() > 0)
                    {
                        StudentActivityNap = (from studentAcitivityNapObj in selectedStudentAcitivityNap
                                              where (!studentAcitivityNapObj.IsDeleted)
                                              select new StudentAcitivityNapViewModel
                                              {
                                                  Id = studentAcitivityNapObj.Id,
                                                  AgencyID = studentAcitivityNapObj.AgencyID,
                                                  StudentActivitiesID = studentAcitivityNapObj.StudentActivitiesID,
                                                  SleptAtTime = studentAcitivityNapObj.SleptAtTime,
                                                  WorkUpTime = studentAcitivityNapObj.WorkUpTime,
                                                  NapNote = studentAcitivityNapObj.NapNote,
                                                  ActivityTypeID = 6,
                                                  StudentID = studentID                                                 
                                              }
                                            ).OrderBy(c => c.StudentActivitiesID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityNap = new List<StudentAcitivityNapViewModel>();
            }
            return StudentActivityNap;
        }
        public ResponseViewModal GetParticularStudentActivityNap(ParticularStudentActivityRequestViewModel getParticularStudentActivityNapRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentActivityNapRequest.AgencyID > 0 && getParticularStudentActivityNapRequest.StudentAcitivityId > 0)
                {
                    StudentAcitivityNapViewModel StudentActivityNap = new StudentAcitivityNapViewModel();
                    IQueryable<StudentAcitivityNap> selectedStudentAcitivityNap = _studentAcitivityNapRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityNapRequest.AgencyID
                    && check.StudentActivitiesID == getParticularStudentActivityNapRequest.StudentAcitivityId);
                    if (selectedStudentAcitivityNap.Count() > 0)
                    {
                        StudentActivityNap = (from studentAcitivityNapObj in selectedStudentAcitivityNap
                                              where (!studentAcitivityNapObj.IsDeleted)
                                              select new StudentAcitivityNapViewModel
                                              {
                                                  Id = studentAcitivityNapObj.Id,
                                                  AgencyID = studentAcitivityNapObj.AgencyID,
                                                  StudentActivitiesID = studentAcitivityNapObj.StudentActivitiesID,
                                                  SleptAtTime = studentAcitivityNapObj.SleptAtTime,
                                                  WorkUpTime = studentAcitivityNapObj.WorkUpTime,
                                                  NapNote = studentAcitivityNapObj.NapNote,
                                                  ActivityTypeID = 6,
                                                  StudentID = getParticularStudentActivityNapRequest.StudentID                                                 
                                              }
                                            ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityNap != null)
                        {
                            res.Data = StudentActivityNap;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Nap Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        private List<StudentActivityDiaperViewModel> GetStudentActivityDiaperChange(DailySheetRequestViewModel getDailySheetRequest, long studentAcitivityId, long studentID)
        {
            List<StudentActivityDiaperViewModel> StudentActivityDiaperChanges = new List<StudentActivityDiaperViewModel>();
            try
            {
                if (getDailySheetRequest.AgencyID != null && getDailySheetRequest.AgencyID > 0 && getDailySheetRequest.AskedDate != null && studentAcitivityId != 0)
                {
                    IQueryable<StudentActivityDiaper> selectedStudentActivityDiaperChange = _studentActivityDiaperRepository.GetAll().Where(check => check.AgencyID == getDailySheetRequest.AgencyID && check.StudentActivitiesID == studentAcitivityId);
                    if (selectedStudentActivityDiaperChange.Count() > 0)
                    {
                        StudentActivityDiaperChanges = (from studentActivityDiaperChangeObj in selectedStudentActivityDiaperChange
                                                        where (!studentActivityDiaperChangeObj.IsDeleted)
                                                        select new StudentActivityDiaperViewModel
                                                        {
                                                            Id = studentActivityDiaperChangeObj.Id,
                                                            AgencyID = studentActivityDiaperChangeObj.AgencyID,
                                                            StudentActivitiesID = studentActivityDiaperChangeObj.StudentActivitiesID,
                                                            StudentActivityDiaperNote = studentActivityDiaperChangeObj.StudentActivityDiaperNote,
                                                            DiaperChangeTime = studentActivityDiaperChangeObj.DiaperChangeTime,
                                                            ActivityTypeID = 7,
                                                            StudentID = studentID,                                                           
                                                        }
                                           ).OrderBy(c => c.StudentActivitiesID).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                StudentActivityDiaperChanges = new List<StudentActivityDiaperViewModel>();
            }
            return StudentActivityDiaperChanges;
        }
        public ResponseViewModal GetParticularStudentActivityDiaperChanges(ParticularStudentActivityRequestViewModel getParticularStudentActivityDiaperChangesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParticularStudentActivityDiaperChangesRequest.AgencyID > 0
                    && getParticularStudentActivityDiaperChangesRequest.StudentAcitivityId > 0)
                {
                    StudentActivityDiaperViewModel StudentActivityDiaperChanges = new StudentActivityDiaperViewModel();
                    IQueryable<StudentActivityDiaper> selectedStudentActivityDiaperChange = _studentActivityDiaperRepository.GetAll().Where(check => check.AgencyID == getParticularStudentActivityDiaperChangesRequest.AgencyID && check.StudentActivitiesID == getParticularStudentActivityDiaperChangesRequest.StudentAcitivityId);
                    if (selectedStudentActivityDiaperChange.Count() > 0)
                    {
                        StudentActivityDiaperChanges = (from studentActivityDiaperChangeObj in selectedStudentActivityDiaperChange
                                                        where (!studentActivityDiaperChangeObj.IsDeleted)
                                                        select new StudentActivityDiaperViewModel
                                                        {
                                                            Id = studentActivityDiaperChangeObj.Id,
                                                            AgencyID = studentActivityDiaperChangeObj.AgencyID,
                                                            StudentActivitiesID = studentActivityDiaperChangeObj.StudentActivitiesID,
                                                            StudentActivityDiaperNote = studentActivityDiaperChangeObj.StudentActivityDiaperNote,
                                                            DiaperChangeTime = studentActivityDiaperChangeObj.DiaperChangeTime,
                                                            ActivityTypeID = 7,                                                            
                                                        }
                                           ).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();
                        if (StudentActivityDiaperChanges != null)
                        {
                            res.Data = StudentActivityDiaperChanges;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Activity Diaper change Details are fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "No information was found.";
                            res.IsSuccess = false;
                        }

                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }

            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());

            }
            return res;
        }
        public ResponseViewModal SaveStudentActivity(SaveStudentsActivityViewModel saveStudentActivityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            for (int i = 0; i < saveStudentActivityRequest.selectedStudents.Count; i++)
            {
                saveStudentActivityRequest.StudentID = saveStudentActivityRequest.selectedStudents[i];
                res = SaveSingleStudentActivity(saveStudentActivityRequest);
            }
            return res;

        }
        private ResponseViewModal SaveSingleStudentActivity(SaveStudentsActivityViewModel saveSingleStudentActivityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {                   
                    if (saveSingleStudentActivityRequest.AgencyID > 0 && saveSingleStudentActivityRequest.ClassesID > 0)
                    {
                        long id = 0;
                        StudentActivities studentActivitiesObj = null;
                        if (saveSingleStudentActivityRequest.Id == 0)
                        {
                            if (saveSingleStudentActivityRequest.ActivityTypeID == 3)
                            {
                                IQueryable<Entity.Masters.MealServeTimeDetails> mealServeTimeDetails = _mealServeTimeDetails.GetAll().Where(Check => !Check.IsDeleted);
                                
                                var allDetails = (from MealObj in mealServeTimeDetails                                                  
                                                  where !MealObj.IsDeleted orderby MealObj.Id ascending
                                                  select new MealServeTimeDetailsViewModel()
                                                  {
                                                     // AgencyID = MealObj.AgencyID,
                                                      MealServeTimeFrom = MealObj.MealServeTimeFrom,
                                                      MealServeTimeTo = MealObj.MealServeTimeTo,
                                                      MealServeType = MealObj.MealServeType
                                                  }).ToList();

                                if(allDetails.Count > 0)
                                {
                                    var ActivityRegisterDate = Convert.ToDateTime(allDetails[0].MealServeTimeFrom);

                                    var NewActivityRegisterDate = new DateTime(ActivityRegisterDate.Year, ActivityRegisterDate.Month, ActivityRegisterDate.Day,
                                     saveSingleStudentActivityRequest.ActivityRegisterDate.Hour, saveSingleStudentActivityRequest.ActivityRegisterDate.Minute, saveSingleStudentActivityRequest.ActivityRegisterDate.Second);

                                    var GetallDetails = (from MealObj in mealServeTimeDetails
                                                         where MealObj.MealServeTimeFrom <= NewActivityRegisterDate
                                                         && MealObj.MealServeTimeTo >= NewActivityRegisterDate
                                                        // && MealObj.AgencyID == saveSingleStudentActivityRequest.AgencyID
                                                         && !MealObj.IsDeleted
                                                         select new MealServeTimeDetailsViewModel()
                                                         {
                                                           Id = MealObj.Id,
                                                        //   AgencyID = MealObj.AgencyID,
                                                           MealServeTimeFrom = MealObj.MealServeTimeFrom,
                                                           MealServeTimeTo = MealObj.MealServeTimeTo,
                                                           MealServeType = MealObj.MealServeType
                                                      }).ToList();

                                    if(GetallDetails.Count > 0)
                                    {
                                        saveSingleStudentActivityRequest.MealServeTimeDetailsID = GetallDetails[0].Id;
                                    }
                                }
                               
                                saveSingleStudentActivityRequest.CreatedDate = DateTime.UtcNow;
                                studentActivitiesObj = new StudentActivities();
                                Mapper.Map(saveSingleStudentActivityRequest, studentActivitiesObj);
                                _studentActivitiesRepository.Create(studentActivitiesObj);
                                _studentActivitiesRepository.SaveChanges();
                                id = studentActivitiesObj.Id;
                            }
                            else
                            {
                                saveSingleStudentActivityRequest.CreatedDate = DateTime.UtcNow;
                                studentActivitiesObj = new StudentActivities();
                                Mapper.Map(saveSingleStudentActivityRequest, studentActivitiesObj);
                                _studentActivitiesRepository.Create(studentActivitiesObj);
                                _studentActivitiesRepository.SaveChanges();
                                id = studentActivitiesObj.Id;
                            }
                            
                        }
                        else
                        {
                            studentActivitiesObj = _studentActivitiesRepository.Get(x => x.Id == saveSingleStudentActivityRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivitiesObj, null))
                            {                                
                                studentActivitiesObj.UpdatedDate = DateTime.UtcNow;
                                studentActivitiesObj.IsDeleted = saveSingleStudentActivityRequest.IsDeleted;
                                studentActivitiesObj.DeletedDate = saveSingleStudentActivityRequest.DeletedDate;
                                studentActivitiesObj.UpdatedDate = DateTime.UtcNow;
                                studentActivitiesObj.AgencyID = saveSingleStudentActivityRequest.AgencyID;
                                studentActivitiesObj.StudentID = saveSingleStudentActivityRequest.StudentID;
                                studentActivitiesObj.ClassesID = saveSingleStudentActivityRequest.ClassesID;
                                studentActivitiesObj.ActivityTypeID = saveSingleStudentActivityRequest.ActivityTypeID;
                                studentActivitiesObj.ActivityRegisterDate = saveSingleStudentActivityRequest.ActivityRegisterDate;
                                _studentActivitiesRepository.SaveChanges();
                                id = studentActivitiesObj.Id;
                            }
                        }
                        daycaredb.Commit();                       
                        if (saveSingleStudentActivityRequest.StudentActivityMedications != null && saveSingleStudentActivityRequest.ActivityTypeID == 1)//1:"Health"
                        {
                            saveSingleStudentActivityRequest.StudentActivityMedications.StudentActivitiesID = id;
                            SaveStudentActivityMedications(saveSingleStudentActivityRequest.StudentActivityMedications);
                        }
                        else if (saveSingleStudentActivityRequest.StudentActivityNotes != null && saveSingleStudentActivityRequest.ActivityTypeID == 2)//2:"Notes"
                        {
                            saveSingleStudentActivityRequest.StudentActivityNotes.StudentActivitiesID = id;
                            SaveStudentActivityNotes(saveSingleStudentActivityRequest.StudentActivityNotes);
                        }
                        else if (saveSingleStudentActivityRequest.StudentActivityMeals != null && saveSingleStudentActivityRequest.ActivityTypeID == 3)//3:"Meal"
                        {
                            saveSingleStudentActivityRequest.StudentActivityMeals.StudentActivitiesID = id;
                            SaveStudentActivityMeals(saveSingleStudentActivityRequest.StudentActivityMeals);
                        }
                        else if (saveSingleStudentActivityRequest.StudentActivityMoods != null && saveSingleStudentActivityRequest.ActivityTypeID == 4)//4:"Mood"
                        {
                            saveSingleStudentActivityRequest.StudentActivityMoods.StudentActivitiesID = id;
                            SaveStudentActivityMoods(saveSingleStudentActivityRequest.StudentActivityMoods);
                        }
                        else if (saveSingleStudentActivityRequest.StudentOtherActivity != null && saveSingleStudentActivityRequest.ActivityTypeID == 5)//5:"Activity"
                        {
                            saveSingleStudentActivityRequest.StudentOtherActivity.StudentActivitiesID = id;
                            SaveStudentOtherActivity(saveSingleStudentActivityRequest.StudentOtherActivity);
                        }
                        else if (saveSingleStudentActivityRequest.StudentAcitivityNap != null && saveSingleStudentActivityRequest.ActivityTypeID == 6)//6:"Nap"
                        {
                            saveSingleStudentActivityRequest.StudentAcitivityNap.StudentActivitiesID = id;
                            SaveStudentActivityNap(saveSingleStudentActivityRequest.StudentAcitivityNap);
                        }
                        else if (saveSingleStudentActivityRequest.StudentActivityDiaper != null && saveSingleStudentActivityRequest.ActivityTypeID == 7)//7:"Diaper Change"
                        {
                            saveSingleStudentActivityRequest.StudentActivityDiaper.StudentActivitiesID = id;
                            SaveStudentActivityDiaperChange(saveSingleStudentActivityRequest.StudentActivityDiaper);
                        }
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Activity registered for the student";
                        res.SaveId = id;                     
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityMeals(StudentActivityMealViewModel saveStudentActivityMealsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {                    
                   if (saveStudentActivityMealsRequest.AgencyID > 0 && saveStudentActivityMealsRequest.StudentActivitiesID > 0)
                    {
                        long id = 0;
                        StudentActivityMeal studentActivityMealObj = null;
                        if (saveStudentActivityMealsRequest.Id == 0)
                        {
                            saveStudentActivityMealsRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityMealObj = new StudentActivityMeal();
                            Mapper.Map(saveStudentActivityMealsRequest, studentActivityMealObj);
                            _studentActivityMealRepository.Create(studentActivityMealObj);
                            _studentActivityMealRepository.SaveChanges();
                            id = studentActivityMealObj.Id;
                        }
                        else
                        {
                            studentActivityMealObj = _studentActivityMealRepository.Get(x => x.Id == saveStudentActivityMealsRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityMealObj, null))
                            {                                
                                studentActivityMealObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityMealObj.DeletedDate = saveStudentActivityMealsRequest.DeletedDate;
                                studentActivityMealObj.DeletedBy = saveStudentActivityMealsRequest.DeletedBy;
                                studentActivityMealObj.IsDeleted = saveStudentActivityMealsRequest.DeletedBy > 0 ? saveStudentActivityMealsRequest.IsDeleted : false;
                                studentActivityMealObj.AgencyID = saveStudentActivityMealsRequest.AgencyID;
                                studentActivityMealObj.MealPlannerID = saveStudentActivityMealsRequest.MealPlannerID;
                                studentActivityMealObj.MealComment = saveStudentActivityMealsRequest.MealComment;
                                studentActivityMealObj.OtherThanPlanMeal = saveStudentActivityMealsRequest.OtherThanPlanMeal;
                                studentActivityMealObj.OtherThanPlanMealComment = saveStudentActivityMealsRequest.OtherThanPlanMealComment;
                                _studentActivitiesRepository.SaveChanges();
                                id = studentActivityMealObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        for (int i = 0; i < saveStudentActivityMealsRequest.StudentActivityMealFoodItems.Count; i++)
                        {
                            saveStudentActivityMealsRequest.StudentActivityMealFoodItems[i].StudentActivityMealID = id;
                            SaveStudentActivityMealFoodItems(saveStudentActivityMealsRequest.StudentActivityMealFoodItems[i]);
                        }
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Activity registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Activity registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityMealFoodItems(StudentActivityMealFoodItemsViewModel saveStudentActivityMealFoodItemsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentActivityMealFoodItemsRequest.AgencyID > 0 && saveStudentActivityMealFoodItemsRequest.StudentActivityMealID > 0)
                    {

                        long id = 0;
                        StudentActivityMealFoodItems studentActivityMealFoodItemObj = null;
                        if (saveStudentActivityMealFoodItemsRequest.Id == 0)
                        {
                            saveStudentActivityMealFoodItemsRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityMealFoodItemObj = new StudentActivityMealFoodItems();
                            Mapper.Map(saveStudentActivityMealFoodItemsRequest, studentActivityMealFoodItemObj);
                            _studentActivityMealFoodItemsRepository.Create(studentActivityMealFoodItemObj);
                            _studentActivityMealFoodItemsRepository.SaveChanges();
                            id = studentActivityMealFoodItemObj.Id;
                        }
                        else
                        {
                            studentActivityMealFoodItemObj = _studentActivityMealFoodItemsRepository.Get(x => x.Id == saveStudentActivityMealFoodItemsRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityMealFoodItemObj, null))
                            {
                                
                                studentActivityMealFoodItemObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityMealFoodItemObj.DeletedDate = saveStudentActivityMealFoodItemsRequest.DeletedDate;
                                studentActivityMealFoodItemObj.DeletedBy = saveStudentActivityMealFoodItemsRequest.DeletedBy;
                                studentActivityMealFoodItemObj.IsDeleted = saveStudentActivityMealFoodItemsRequest.DeletedBy > 0 ? saveStudentActivityMealFoodItemsRequest.IsDeleted : false;
                                studentActivityMealFoodItemObj.StudentActivityMealID = saveStudentActivityMealFoodItemsRequest.StudentActivityMealID;
                                studentActivityMealFoodItemObj.FoodTypeID = saveStudentActivityMealFoodItemsRequest.FoodTypeID;
                                //studentActivityMealFoodItemObj.ConsumedAmount = saveStudentActivityMealFoodItemsRequest.ConsumedAmount;
                                //studentActivityMealFoodItemObj.ConsumedQuantity = saveStudentActivityMealFoodItemsRequest.ConsumedQuantity;
                                //studentActivityMealFoodItemObj.ConsumedMeasureUnitTypeID = saveStudentActivityMealFoodItemsRequest.ConsumedMeasureUnitTypeID;
                                //studentActivityMealFoodItemObj.ConsumedMeasureQuantityTypeID = saveStudentActivityMealFoodItemsRequest.ConsumedMeasureQuantityTypeID;
                                studentActivityMealFoodItemObj.FoodConsumtionID = saveStudentActivityMealFoodItemsRequest.FoodConsumtionID;
                                studentActivityMealFoodItemObj.MilkConsumptionQuantity = saveStudentActivityMealFoodItemsRequest.MilkConsumptionQuantity;
                                //studentActivityMealFoodItemObj.Amount = saveStudentActivityMealsRequest.DeletedBy;
                                //studentActivityMealFoodItemObj.Quantity = saveStudentActivityMealsRequest.DeletedBy;
                                //studentActivityMealFoodItemObj.MeasureUnitTypeID = saveStudentActivityMealsRequest.DeletedBy;
                                //studentActivityMealFoodItemObj.MeasureQuantityTypeID = saveStudentActivityMealsRequest.DeletedBy;
                                _studentActivitiesRepository.SaveChanges();
                                id = studentActivityMealFoodItemObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Activity Meal Food Item registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully  Student Activity Meal Food Item registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityMedications(StudentActivityMedicationViewModel saveStudentActivityMedicationsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentActivityMedicationsRequest.AgencyID > 0 && saveStudentActivityMedicationsRequest.StudentActivitiesID > 0)
                    {
                        long id = 0;
                        StudentActivityMedication studentActivityMedicationObj = null;
                        if (saveStudentActivityMedicationsRequest.Id == 0)
                        {
                            saveStudentActivityMedicationsRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityMedicationObj = new StudentActivityMedication();
                            Mapper.Map(saveStudentActivityMedicationsRequest, studentActivityMedicationObj);
                            _studentActivityMedicationRepository.Create(studentActivityMedicationObj);
                            _studentActivityMedicationRepository.SaveChanges();
                            id = studentActivityMedicationObj.Id;
                        }
                        else
                        {
                            studentActivityMedicationObj = _studentActivityMedicationRepository.Get(x => x.Id == saveStudentActivityMedicationsRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityMedicationObj, null))
                            {
                                
                                studentActivityMedicationObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityMedicationObj.DeletedDate = saveStudentActivityMedicationsRequest.DeletedDate;
                                studentActivityMedicationObj.DeletedBy = saveStudentActivityMedicationsRequest.DeletedBy;
                                studentActivityMedicationObj.IsDeleted = saveStudentActivityMedicationsRequest.DeletedBy > 0 ? saveStudentActivityMedicationsRequest.IsDeleted : false;
                                studentActivityMedicationObj.AgencyID = saveStudentActivityMedicationsRequest.AgencyID;
                                studentActivityMedicationObj.StudentActivitiesID = saveStudentActivityMedicationsRequest.StudentActivitiesID;
                                studentActivityMedicationObj.StudentHealthDescription = saveStudentActivityMedicationsRequest.StudentHealthDescription;
                                studentActivityMedicationObj.RecordedTemparture = saveStudentActivityMedicationsRequest.RecordedTemparture;
                                studentActivityMedicationObj.DoseRepeatID = saveStudentActivityMedicationsRequest.DoseRepeatID;
                                studentActivityMedicationObj.DosageQuantityID = saveStudentActivityMedicationsRequest.DosageQuantityID;
                                studentActivityMedicationObj.HowTaken = saveStudentActivityMedicationsRequest.HowTaken;
                                studentActivityMedicationObj.StudentMedicationID = saveStudentActivityMedicationsRequest.StudentMedicationID;
                                studentActivityMedicationObj.isParentAcknowledge = saveStudentActivityMedicationsRequest.isParentAcknowledge;
                                studentActivityMedicationObj.isTeacherAcknowledge = saveStudentActivityMedicationsRequest.isTeacherAcknowledge;
                                studentActivityMedicationObj.AcknowledgeParentID = saveStudentActivityMedicationsRequest.AcknowledgeParentID;
                                studentActivityMedicationObj.AcknowledgeTeacherID = saveStudentActivityMedicationsRequest.AcknowledgeTeacherID;
                                _studentActivityMedicationRepository.SaveChanges();
                                id = studentActivityMedicationObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Activity Medication registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Activity Medication registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityNotes(StudentActivityNoteViewModel saveStudentActivityNotesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {                   
                    if (saveStudentActivityNotesRequest.AgencyID > 0 && saveStudentActivityNotesRequest.StudentActivitiesID > 0)
                    {

                        long id = 0;
                        StudentActivityNote studentActivityNoteObj = null;
                        if (saveStudentActivityNotesRequest.Id == 0)
                        {
                            saveStudentActivityNotesRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityNoteObj = new StudentActivityNote();
                            Mapper.Map(saveStudentActivityNotesRequest, studentActivityNoteObj);
                            _studentActivityNoteRepository.Create(studentActivityNoteObj);
                            _studentActivityNoteRepository.SaveChanges();
                            id = studentActivityNoteObj.Id;
                        }
                        else
                        {
                            studentActivityNoteObj = _studentActivityNoteRepository.Get(x => x.Id == saveStudentActivityNotesRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityNoteObj, null))
                            {
                                
                                studentActivityNoteObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityNoteObj.DeletedDate = saveStudentActivityNotesRequest.DeletedDate;
                                studentActivityNoteObj.DeletedBy = saveStudentActivityNotesRequest.DeletedBy;
                                studentActivityNoteObj.IsDeleted = saveStudentActivityNotesRequest.DeletedBy > 0 ? saveStudentActivityNotesRequest.IsDeleted : false;
                                studentActivityNoteObj.AgencyID = saveStudentActivityNotesRequest.AgencyID;
                                studentActivityNoteObj.StudentActivitiesID = saveStudentActivityNotesRequest.StudentActivitiesID;
                                studentActivityNoteObj.NoteDescription = saveStudentActivityNotesRequest.NoteDescription;
                                _studentActivityNoteRepository.SaveChanges();
                                id = studentActivityNoteObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Activity Note registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Student Activity Note registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityMoods(StudentActivityMoodViewModel saveStudentActivityMoodsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {                    
                    if (saveStudentActivityMoodsRequest.AgencyID > 0 && saveStudentActivityMoodsRequest.StudentActivitiesID > 0)
                    {
                        long id = 0;
                        StudentActivityMood studentActivityMoodObj = null;
                        if (saveStudentActivityMoodsRequest.Id == 0)
                        {
                            saveStudentActivityMoodsRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityMoodObj = new StudentActivityMood();
                            Mapper.Map(saveStudentActivityMoodsRequest, studentActivityMoodObj);
                            _studentActivityMoodRepository.Create(studentActivityMoodObj);
                            _studentActivityMoodRepository.SaveChanges();
                            id = studentActivityMoodObj.Id;
                        }
                        else
                        {
                            studentActivityMoodObj = _studentActivityMoodRepository.Get(x => x.Id == saveStudentActivityMoodsRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityMoodObj, null))
                            {                                
                                studentActivityMoodObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityMoodObj.DeletedDate = saveStudentActivityMoodsRequest.DeletedDate;
                                studentActivityMoodObj.DeletedBy = saveStudentActivityMoodsRequest.DeletedBy;
                                studentActivityMoodObj.IsDeleted = saveStudentActivityMoodsRequest.DeletedBy > 0 ? saveStudentActivityMoodsRequest.IsDeleted : false;
                                studentActivityMoodObj.AgencyID = saveStudentActivityMoodsRequest.AgencyID;
                                studentActivityMoodObj.StudentActivitiesID = saveStudentActivityMoodsRequest.StudentActivitiesID;
                                studentActivityMoodObj.MoodTypeID = saveStudentActivityMoodsRequest.MoodTypeID;
                                studentActivityMoodObj.StudentMoodDescription = saveStudentActivityMoodsRequest.StudentMoodDescription;
                                _studentActivityMoodRepository.SaveChanges();
                                id = studentActivityMoodObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Activity Moods registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Student Activity Moods registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentOtherActivity(StudentOtherActivityViewModel saveStudentOtherActivityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {                    
                    if (saveStudentOtherActivityRequest.AgencyID > 0 && saveStudentOtherActivityRequest.StudentActivitiesID > 0)
                    {
                        long id = 0;
                        StudentOtherActivity studentOtherActivityObj = null;
                        if (saveStudentOtherActivityRequest.Id == 0)
                        {
                            
                            saveStudentOtherActivityRequest.CreatedDate = DateTime.UtcNow;
                            studentOtherActivityObj = new StudentOtherActivity();
                            Mapper.Map(saveStudentOtherActivityRequest, studentOtherActivityObj);
                            _studentOtherActivityRepository.Create(studentOtherActivityObj);
                            _studentOtherActivityRepository.SaveChanges();
                            id = studentOtherActivityObj.Id;
                        }
                        else
                        {
                            studentOtherActivityObj = _studentOtherActivityRepository.Get(x => x.Id == saveStudentOtherActivityRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentOtherActivityObj, null))
                            {
                                
                                studentOtherActivityObj.UpdatedDate = DateTime.UtcNow;
                                studentOtherActivityObj.DeletedDate = saveStudentOtherActivityRequest.DeletedDate;
                                studentOtherActivityObj.DeletedBy = saveStudentOtherActivityRequest.DeletedBy;
                                studentOtherActivityObj.IsDeleted = saveStudentOtherActivityRequest.DeletedBy > 0 ? saveStudentOtherActivityRequest.IsDeleted : false;
                                studentOtherActivityObj.AgencyID = saveStudentOtherActivityRequest.AgencyID;
                                studentOtherActivityObj.StudentActivitiesID = saveStudentOtherActivityRequest.StudentActivitiesID;
                                studentOtherActivityObj.SubActivityTypeID = saveStudentOtherActivityRequest.SubActivityTypeID;
                                studentOtherActivityObj.StartTime = saveStudentOtherActivityRequest.StartTime;
                                studentOtherActivityObj.EndTime = saveStudentOtherActivityRequest.EndTime;
                                studentOtherActivityObj.OtherActivityNote = saveStudentOtherActivityRequest.OtherActivityNote;
                                _studentOtherActivityRepository.SaveChanges();
                                id = studentOtherActivityObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Other Activity registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Student Other Activity registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }
        private ResponseViewModal SaveStudentActivityNap(StudentAcitivityNapViewModel saveStudentActivityNapRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {                    
                    if (saveStudentActivityNapRequest.AgencyID > 0 && saveStudentActivityNapRequest.StudentActivitiesID > 0)
                    {

                        long id = 0;
                        StudentAcitivityNap studentAcitivityNapObj = null;
                        if (saveStudentActivityNapRequest.Id == 0)
                        {                            
                            saveStudentActivityNapRequest.CreatedDate = DateTime.UtcNow;
                            studentAcitivityNapObj = new StudentAcitivityNap();
                            Mapper.Map(saveStudentActivityNapRequest, studentAcitivityNapObj);
                            _studentAcitivityNapRepository.Create(studentAcitivityNapObj);
                            _studentAcitivityNapRepository.SaveChanges();
                            id = studentAcitivityNapObj.Id;
                        }
                        else
                        {
                            studentAcitivityNapObj = _studentAcitivityNapRepository.Get(x => x.Id == saveStudentActivityNapRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentAcitivityNapObj, null))
                            {                                
                                studentAcitivityNapObj.UpdatedDate = DateTime.UtcNow;
                                studentAcitivityNapObj.DeletedDate = saveStudentActivityNapRequest.DeletedDate;
                                studentAcitivityNapObj.DeletedBy = saveStudentActivityNapRequest.DeletedBy;
                                studentAcitivityNapObj.IsDeleted = saveStudentActivityNapRequest.DeletedBy > 0 ? saveStudentActivityNapRequest.IsDeleted : false;
                                studentAcitivityNapObj.AgencyID = saveStudentActivityNapRequest.AgencyID;
                                studentAcitivityNapObj.StudentActivitiesID = saveStudentActivityNapRequest.StudentActivitiesID;
                                studentAcitivityNapObj.SleptAtTime = saveStudentActivityNapRequest.SleptAtTime;
                                studentAcitivityNapObj.WorkUpTime = saveStudentActivityNapRequest.WorkUpTime;
                                studentAcitivityNapObj.NapNote = saveStudentActivityNapRequest.NapNote;
                                _studentAcitivityNapRepository.SaveChanges();
                                id = studentAcitivityNapObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Acitivity Nap registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Student Acitivity Nap registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        private ResponseViewModal SaveStudentActivityDiaperChange(StudentActivityDiaperViewModel saveStudentActivityDiaperRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                    if (saveStudentActivityDiaperRequest.AgencyID > 0 && saveStudentActivityDiaperRequest.StudentActivitiesID > 0)
                    {
                        long id = 0;
                        StudentActivityDiaper studentActivityDiaperObj = null;
                        if (saveStudentActivityDiaperRequest.Id == 0)
                        {                            
                            saveStudentActivityDiaperRequest.CreatedDate = DateTime.UtcNow;
                            studentActivityDiaperObj = new StudentActivityDiaper();
                            Mapper.Map(saveStudentActivityDiaperRequest, studentActivityDiaperObj);
                            _studentActivityDiaperRepository.Create(studentActivityDiaperObj);
                            _studentActivityDiaperRepository.SaveChanges();
                            id = studentActivityDiaperObj.Id;
                        }
                        else
                        {
                            studentActivityDiaperObj = _studentActivityDiaperRepository.Get(x => x.Id == saveStudentActivityDiaperRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentActivityDiaperObj, null))
                            {                                
                                studentActivityDiaperObj.UpdatedDate = DateTime.UtcNow;
                                studentActivityDiaperObj.DeletedDate = saveStudentActivityDiaperRequest.DeletedDate;
                                studentActivityDiaperObj.DeletedBy = saveStudentActivityDiaperRequest.DeletedBy;
                                studentActivityDiaperObj.IsDeleted = saveStudentActivityDiaperRequest.DeletedBy > 0 ? saveStudentActivityDiaperRequest.IsDeleted : false;
                                studentActivityDiaperObj.AgencyID = saveStudentActivityDiaperRequest.AgencyID;
                                studentActivityDiaperObj.StudentActivitiesID = saveStudentActivityDiaperRequest.StudentActivitiesID;
                                studentActivityDiaperObj.StudentActivityDiaperNote = saveStudentActivityDiaperRequest.StudentActivityDiaperNote;
                                studentActivityDiaperObj.DiaperChangeTime = saveStudentActivityDiaperRequest.DiaperChangeTime;
                                _studentAcitivityNapRepository.SaveChanges();
                                id = studentActivityDiaperObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Student Acitivity Diaper Change registered for the student";
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully Student Acitivity Diaper Change registered for the student");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }                     

        public ResponseViewModal GetTodayMealPlan(DailySheetRequestViewModel getTodayMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getTodayMealPlanRequest.AgencyID != null && getTodayMealPlanRequest.AgencyID > 0 && getTodayMealPlanRequest.AskedDate != null)
                {
                    List<StudentActivityMealViewModel> appliedMealPlans = new List<StudentActivityMealViewModel>();                   
                    IQueryable<Entity.Agency.MealPlanner> selectedMealPlans = null;

                    if (DateTime.Now.DayOfWeek == DayOfWeek.Monday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Mon == true && !mealPlanCheck.IsDeleted));
                                              
                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Tuesday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Tue == true && !mealPlanCheck.IsDeleted));

                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Wednesday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Wed == true && !mealPlanCheck.IsDeleted));

                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Thursday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Thu == true && !mealPlanCheck.IsDeleted));

                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Friday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Fri == true && !mealPlanCheck.IsDeleted));

                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Saturday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Sat == true && !mealPlanCheck.IsDeleted));

                    }
                    if (DateTime.Now.DayOfWeek == DayOfWeek.Sunday)
                    {

                        selectedMealPlans = _mealPlannerRepository.GetAll().Where(mealPlanCheck => mealPlanCheck.AgencyID == getTodayMealPlanRequest.AgencyID
                        && (getTodayMealPlanRequest.AskedDate.Date >= mealPlanCheck.StartDate.Date && getTodayMealPlanRequest.AskedDate.Date <= mealPlanCheck.EndDate.Date && mealPlanCheck.Sun == true && !mealPlanCheck.IsDeleted));

                    }                   
                    

                    IQueryable<Entity.Agency.InvolvedMealClasses> allInvolvedClasses = _involvedMealClassesRepository.GetAll().Where(check => check.AgencyID == getTodayMealPlanRequest.AgencyID &&
                    check.ClassesID == getTodayMealPlanRequest.ClassID && !check.IsDeleted);

                    List<InvolvedMealClassesViewModel> selectedInvolvedClasses = (from mealPlansObj in selectedMealPlans
                                                                                  join allInvolvedClassObj in allInvolvedClasses on mealPlansObj.Id equals allInvolvedClassObj.MealPlannerID
                                                                                  where (!allInvolvedClassObj.IsDeleted &&
                                                                                  !mealPlansObj.IsDeleted
                                                                                  && mealPlansObj.Id == allInvolvedClassObj.MealPlannerID
                                                                                  && allInvolvedClassObj.ClassesID == getTodayMealPlanRequest.ClassID)
                                                                                  select new InvolvedMealClassesViewModel
                                                                                  {
                                                                                      Id = allInvolvedClassObj.Id,
                                                                                      AgencyID = allInvolvedClassObj.AgencyID,
                                                                                      MealPlannerID = allInvolvedClassObj.MealPlannerID,
                                                                                      ClassesID = allInvolvedClassObj.ClassesID,
                                                                                  }).OrderBy(c => c.ClassesID).ToList();
                    if (selectedInvolvedClasses.Count > 0)
                    {                       
                        IQueryable<Entity.Masters.FoodType> selectedFoodType = _foodTypeRepository.GetAll().Where(classCheck => classCheck.AgencyID == getTodayMealPlanRequest.AgencyID);
                        IQueryable<Entity.Masters.MeasureUnitType> selectedMeasureUnitType = _measureUnitTypeRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getTodayMealPlanRequest.AgencyID);
                        IQueryable<Entity.Masters.MeasureQuantityType> selectedMeasureQuantityType = _measureQuantityTypeRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getTodayMealPlanRequest.AgencyID);
                        IQueryable<Entity.Agency.InvolvedMealFoodItems> selectedInvolvedMealFoodItemsRepository = _involvedMealFoodItemsRepository.GetAll().Where(classCheck => classCheck.AgencyID == getTodayMealPlanRequest.AgencyID);

                        appliedMealPlans = (from mealPlannerObj in selectedMealPlans
                                            join involvedMealClassesObj in allInvolvedClasses on mealPlannerObj.Id equals involvedMealClassesObj.MealPlannerID
                                            where (!mealPlannerObj.IsDeleted && mealPlannerObj.AgencyID == getTodayMealPlanRequest.AgencyID)
                                            select new StudentActivityMealViewModel()
                                            {
                                                Id = 0,
                                                AgencyID = mealPlannerObj.AgencyID,
                                                MealTypeID = mealPlannerObj.MealTypeID,
                                                StudentActivitiesID = 0,
                                                MealComment = "",
                                                OtherThanPlanMeal = "",
                                                OtherThanPlanMealComment = "",
                                                ActivityTypeID = 3,
                                                MealPlannerID = mealPlannerObj.Id,
                                                MealPlanTitle = mealPlannerObj.Title
                                            }).Distinct().OrderBy(c => c.MealTypeID).ToList();                       

                        for (var i = 0; i < appliedMealPlans.Count; i++)
                        {
                            List<StudentActivityMealFoodItemsViewModel> StudentActivityMealFoodItems = (from involvedMealFoodItemsObj in selectedInvolvedMealFoodItemsRepository
                                                                                                        join foodTypeObj in _foodTypeRepository.GetAll() on involvedMealFoodItemsObj.FoodTypeID equals foodTypeObj.Id
                                                                                                        join measureUnitTypeObj in _measureUnitTypeRepository.GetAll() on involvedMealFoodItemsObj.MeasureUnitTypeID equals measureUnitTypeObj.Id
                                                                                                        join involvedMealClassesObj in allInvolvedClasses on involvedMealFoodItemsObj.MealPlannerID equals involvedMealClassesObj.MealPlannerID
                                                                                                        where (!involvedMealFoodItemsObj.IsDeleted && involvedMealFoodItemsObj.AgencyID == getTodayMealPlanRequest.AgencyID && involvedMealFoodItemsObj.MealPlannerID == appliedMealPlans[i].MealPlannerID)
                                                                                                        select new StudentActivityMealFoodItemsViewModel()
                                                                                                        {
                                                                                                            Id = 0,
                                                                                                            AgencyID = involvedMealFoodItemsObj.AgencyID,
                                                                                                            FoodTypeID = involvedMealFoodItemsObj.FoodTypeID,
                                                                                                            FoodTypeName = foodTypeObj.FoodTypeName,
                                                                                                            Amount = involvedMealFoodItemsObj.Amount,
                                                                                                            MeasureUnitTypeID = involvedMealFoodItemsObj.MeasureUnitTypeID,
                                                                                                            MeasureUnitTypeName = measureUnitTypeObj.MeasureUnitTypeName,
                                                                                                            MeasureQuantityTypeID = involvedMealFoodItemsObj.MeasureQuantityTypeID,
                                                                                                            StudentActivityMealID = involvedMealFoodItemsObj.MeasureQuantityTypeID,
                                                                                                            Quantity = involvedMealFoodItemsObj.MeasureQuantityTypeID
                                                                                                        }).Distinct().ToList();
                            appliedMealPlans[i].StudentActivityMealFoodItems.AddRange(StudentActivityMealFoodItems);
                        }

                        res.Data = appliedMealPlans;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Plan for given date has been fetched.";
                        res.IsSuccess = true;
                    }
                    else
                    {
                        res.Data = new List<StudentActivityMealViewModel>();
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "No Meal Plan Found for this date.";
                        res.IsSuccess = true;
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal DeleteParticularMealPlan(DeleteMealPlanViewModel getDeleteMealPlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                    MealPlanner mealPlannerObj = null;
                    InvolvedMealClasses involvedMealClassesObj = null;
                    InvolvedMealFoodItems involvedMealFoodItemsObj = null;

                    mealPlannerObj = _mealPlannerRepository.Get(x => x.Id == getDeleteMealPlanRequest.MealPlannerID && !x.IsDeleted);
                    involvedMealClassesObj = _involvedMealClassesRepository.Get(x => x.MealPlannerID == getDeleteMealPlanRequest.MealPlannerID && !x.IsDeleted);
                    involvedMealFoodItemsObj = _involvedMealFoodItemsRepository.Get(x => x.MealPlannerID == getDeleteMealPlanRequest.MealPlannerID && !x.IsDeleted);

                    if (!ReferenceEquals(mealPlannerObj, null))                   
                    {
                        if(getDeleteMealPlanRequest.Mon == true)
                        {
                            mealPlannerObj.Mon = false;
                        }
                        if (getDeleteMealPlanRequest.Tue == true)
                        {
                            mealPlannerObj.Tue = false;
                        }
                        if (getDeleteMealPlanRequest.Wed == true)
                        {
                            mealPlannerObj.Wed = false;
                        }
                        if (getDeleteMealPlanRequest.Thu == true)
                        {
                            mealPlannerObj.Thu = false;
                        }
                        if (getDeleteMealPlanRequest.Fri == true)
                        {
                            mealPlannerObj.Fri = false;
                        }
                        if (getDeleteMealPlanRequest.Sat == true)
                        {
                            mealPlannerObj.Sat = false;
                        }
                        if (getDeleteMealPlanRequest.Sun == true)
                        {
                            mealPlannerObj.Sun = false;
                        }
                         mealPlannerObj.UpdatedBy = getDeleteMealPlanRequest.DeletedBy;                      
                         mealPlannerObj.UpdatedDate = DateTime.Now;
                        _mealPlannerRepository.SaveChanges();                      
                                               
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Planner Deleted successfully";
                    }
                }
                catch (Exception ex)
                {
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetDailySheetActivityReportByEmail(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var fromDate = getDailySheetMobileRequest.AskedDate.Date;
                var toDate = fromDate.AddHours(23);
                toDate = toDate.AddMinutes(59);
                toDate = toDate.AddSeconds(59);
                if (getDailySheetMobileRequest.AskedDateString != null)
                {
                    var Date = Convert.ToDateTime(getDailySheetMobileRequest.AskedDateString);
                    var difference = getDailySheetMobileRequest.AskedDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                    toDate = fromDate.AddHours(24);
                }

                if (getDailySheetMobileRequest.AgencyID != null && getDailySheetMobileRequest.AgencyID > 0 && getDailySheetMobileRequest.AskedDate != null
                    && getDailySheetMobileRequest.StudentID > 0 && getDailySheetMobileRequest.ClassID > 0)
                {
                    List<DailySheetViewModel> dailySheet = new List<DailySheetViewModel>();
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= getDailySheetMobileRequest.AskedDate.Date
                    && classCheck.AgencyID == getDailySheetMobileRequest.AgencyID && (getDailySheetMobileRequest.StudentID == 0 || classCheck.StudentID == getDailySheetMobileRequest.StudentID));

                    IQueryable<Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetMobileRequest.AgencyID
                    && classCheck.Id == getDailySheetMobileRequest.StudentID);
                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= getDailySheetMobileRequest.AskedDate.Date
                    && classCheck.AgencyID == getDailySheetMobileRequest.AgencyID && !classCheck.IsDeleted);
                    IQueryable<StudentActivities> selectedStudentActivities = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetMobileRequest.AgencyID
                    && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate)
                    && filter.StudentID == getDailySheetMobileRequest.StudentID && filter.ClassesID == getDailySheetMobileRequest.ClassID);
                    IQueryable<Entity.Masters.ActivityType> selectedActivityType = _activityTypeRepository.GetAll();

                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getDailySheetMobileRequest.AgencyID && !check.IsDeleted);

                    List<StudentsDailyActivityViewModel> relatedActivities = new List<StudentsDailyActivityViewModel>();

                    List<Entity.Agency.Classes> classesget = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= getDailySheetMobileRequest.AskedDate.Date
                    && classCheck.AgencyID == getDailySheetMobileRequest.AgencyID && classCheck.Id == getDailySheetMobileRequest.ClassID).ToList();

                    dailySheet = (from classEnrollmentObj in classEnrollment
                                  join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                  join classObj in classes on classEnrollmentObj.ClassesID equals classObj.Id
                                  join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                  where (!classEnrollmentObj.IsDeleted && !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID)
                                  select new DailySheetViewModel
                                  {
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName ?? String.Empty,
                                      ImagePath = studentObj.ImagePath ?? string.Empty,
                                      ClassesID = classesget[0].Id,
                                      ClassName = classesget[0].ClassName,
                                      AgencyID = studentObj.AgencyID,
                                      ParentID = parentObj.Id,
                                      ParentEmail = parentObj.EmailId
                                  }).Distinct().OrderBy(c => c.Id).ToList();
                  
                    if (dailySheet != null && dailySheet.Count > 0)
                    {                        
                        foreach (DailySheetViewModel activity in dailySheet)
                        {
                            
                            relatedActivities = (from studentActivitiesobj in selectedStudentActivities
                                                 where (!studentActivitiesobj.IsDeleted
                                                 && activity.StudentID == studentActivitiesobj.StudentID)
                                                 select new StudentsDailyActivityViewModel
                                                 {
                                                     StudentID = studentActivitiesobj.StudentID,
                                                     StudentActivityID = studentActivitiesobj.Id,
                                                     ActivityTypeID = studentActivitiesobj.ActivityTypeID
                                                 }).OrderBy(c => c.StudentActivityID).ToList();

                            if (relatedActivities != null && relatedActivities.Count > 0)
                            {
                                foreach (StudentsDailyActivityViewModel relatedActivity in relatedActivities)
                                {
                                    if (relatedActivity.StudentActivityID > 0 && activity.AgencyID > 0 && relatedActivity.ActivityTypeID > 0)
                                    {
                                        switch (relatedActivity.ActivityTypeID)
                                        {
                                            case 1:
                                                IQueryable<StudentActivityMedication> selectedStudentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID); //1:"Health"
                                                if (selectedStudentActivityMedication.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentActivityMedication.Select(select => select.StudentHealthDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.ActivityTypeName = "Health Checkup";
                                                    relatedActivity.RecordTemp = selectedStudentActivityMedication.Select(select => select.RecordedTemparture).FirstOrDefault();
                                                }
                                                break;
                                            case 2:
                                                IQueryable<StudentActivityNote> selectedStudentActivityNote = _studentActivityNoteRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//2:"Notes"
                                                if (selectedStudentActivityNote.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentActivityNote.Select(select => select.NoteDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.ActivityTypeName = "Notes";
                                                }
                                                break;
                                            case 3:
                                                IQueryable<StudentActivityMeal> selectedStudentActivityMeal = _studentActivityMealRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//3:"Meal"
                                                if (selectedStudentActivityMeal.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentActivityMeal.Select(select => select.MealComment).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.ActivityTypeName = "Meal";
                                                    relatedActivity.AgencyID = dailySheet[0].AgencyID;
                                                    relatedActivity.StudentID = dailySheet[0].StudentID;

                                                }
                                                break;
                                            case 4:
                                                IQueryable<StudentActivityMood> selectedStudentActivityMood = _studentActivityMoodRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//4:"Mood"
                                                if (selectedStudentActivityMood.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentActivityMood.Select(select => select.StudentMoodDescription).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.ActivityTypeName = "Mood";

                                                    var MoodId = selectedStudentActivityMood.Select(select => select.MoodTypeID).FirstOrDefault();

                                                    IQueryable<MoodType> Moodtype = _moodTypeRepository.GetAll().Where(check => check.Id == MoodId);

                                                    relatedActivity.Mood = Moodtype.Select(select => select.MoodTypeName).FirstOrDefault();
                                                }
                                                break;
                                            case 5:
                                                IQueryable<StudentOtherActivity> selectedStudentOtherActivity = _studentOtherActivityRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//5:"Activity"
                                                if (selectedStudentOtherActivity.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentOtherActivity.Select(select => select.OtherActivityNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.StartTime = selectedStudentOtherActivity.Select(select => select.StartTime).FirstOrDefault();
                                                    relatedActivity.EndTime = selectedStudentOtherActivity.Select(select => select.EndTime).FirstOrDefault();
                                                    relatedActivity.StartTime = relatedActivity.StartTime.ToLocalTime();
                                                    relatedActivity.EndTime = relatedActivity.EndTime.ToLocalTime();
                                                    relatedActivity.ActivityTypeName = "Activity";
                                                }
                                                break;
                                            case 6:
                                                IQueryable<StudentAcitivityNap> selectedStudentAcitivityNap = _studentAcitivityNapRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//6:"Nap"
                                                if (selectedStudentAcitivityNap.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentAcitivityNap.Select(select => select.NapNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.StartTime = selectedStudentAcitivityNap.Select(select => select.SleptAtTime).FirstOrDefault();
                                                    relatedActivity.EndTime = selectedStudentAcitivityNap.Select(select => select.WorkUpTime).FirstOrDefault();
                                                    relatedActivity.ActivityTypeName = "Nap";

                                                    relatedActivity.StartTime = relatedActivity.StartTime.ToLocalTime();
                                                    relatedActivity.EndTime = relatedActivity.EndTime.ToLocalTime();
                                                }
                                                break;
                                            case 7:
                                                IQueryable<StudentActivityDiaper> selectedStudentAcitivityDiaper = _studentActivityDiaperRepository.GetAll().Where(check => check.AgencyID == activity.AgencyID
                                                && check.StudentActivitiesID == relatedActivity.StudentActivityID);//7:"Diaper"
                                                if (selectedStudentAcitivityDiaper.ToList().Count > 0)
                                                {
                                                    var description = selectedStudentAcitivityDiaper.Select(select => select.StudentActivityDiaperNote).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = description != null ? description.ToString() : "";
                                                    relatedActivity.ActivityTypeName = "Toileting";
                                                    relatedActivity.StartTime = selectedStudentAcitivityDiaper.Select(select => select.DiaperChangeTime).FirstOrDefault();
                                                    relatedActivity.StartTime = relatedActivity.StartTime.ToLocalTime();                                                  
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                            else
                            {
                                res.StatusCode = 987;
                                res.Message = "No Activity Sheet available for the day.";
                                res.IsSuccess = true;
                            }
                            activity.ActivityDetail = relatedActivities.OrderByDescending(c => c.CreatedDate).ToList();
                            activity.TotalActivityCount = relatedActivities.Count();
                        }
                        if (relatedActivities.Count > 0)
                        {
                            res.Data = dailySheet;
                            _reportService.GenerateDailySheetReportPDF(dailySheet);

                            List<Entity.Agency.ClassAttendence> classattendence = _classAttendenceRepository.GetAll().Where(Check => (fromDate <= Check.AttendanceDate && Check.AttendanceDate <= toDate) && Check.AgencyID == getDailySheetMobileRequest.AgencyID 
                            && Check.ClassesID == getDailySheetMobileRequest.ClassID && Check.StudentID == getDailySheetMobileRequest.StudentID && !Check.IsDeleted && !Check.DailySheetSend).ToList();

                            if (classattendence.Count > 0)
                            {
                                ClassAttendence CAObj = null;
                                CAObj = _classAttendenceRepository.Get(x => x.Id == classattendence[0].Id && !x.IsDeleted);
                                if (!ReferenceEquals(CAObj, null))
                                {
                                    CAObj.DailySheetSend = true;
                                    _classAttendenceRepository.SaveChanges();
                                }
                            }

                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Daily sheet details send successfully";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 987;
                            res.Message = "No Data found.";
                            res.IsSuccess = true;
                        }
                    }
                    else
                    {
                        res.StatusCode = 987;
                        res.Message = "No Data found.";
                        res.IsSuccess = true;
                    }
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }


    }
}

