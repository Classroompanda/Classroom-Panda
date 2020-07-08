using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Model.Teacher;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Entity.Teachers;
using DayCare.Model.Agency;
using DayCare.Entity.Student;
using DayCare.Entity.Masters;
using DayCare.Service.IService.Agency;
using DayCare.Model.Master;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.Teacher
{
    public class TeacherAttendenceService : ITeacherAttendenceService
    {
        #region Initialize Dependency
        private readonly IStudentRepository _studentRepository;
        private readonly IClassAttendenceRepository _classAttendenceRepository;
        private readonly IClassesRepository _classesRepository;
        private readonly IClassEnrollmentRepository _classEnrollmentRepository;
        private readonly IAttendenceStatusRepository _attendenceStatusRepository;
        private readonly IGuardianRepository _guardianRepository;
        private readonly IStudentBreakLogRepository _studentBreakLogRepository;
        private readonly IClassTransferAttendenceRepository _classTransferAttendenceRepository;
        public IDailySheetService _dailySheetService;
        private readonly ITeacherDailyAttendenceRepository _teacherDailyAttendenceRepository;
        // private JsonModel response;
        public DataContext _dataContext;
        public IClassesRepository _classRepository;
        public IInvoiceDetailsRepository _invoiceDetailsRepository;
        #endregion

        public TeacherAttendenceService(DataContext dataContext,
            IStudentRepository studentRepository, IClassAttendenceRepository classAttendenceRepository
            , IClassesRepository classesRepository, IClassEnrollmentRepository classEnrollmentRepository,
            IAttendenceStatusRepository attendenceStatusRepository, IGuardianRepository guardianRepository, IStudentBreakLogRepository studentBreakLogRepository, IClassTransferAttendenceRepository classTransferAttendenceRepository,
            IDailySheetService dailySheetService, ITeacherDailyAttendenceRepository teacherDailyAttendenceRepository, IClassesRepository classRepository,
            IInvoiceDetailsRepository invoiceDetailsRepository)
        {
            _dataContext = dataContext;
            _studentRepository = studentRepository;
            _classAttendenceRepository = classAttendenceRepository;
            _classesRepository = classesRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _attendenceStatusRepository = attendenceStatusRepository;
            _guardianRepository = guardianRepository;
            _studentBreakLogRepository = studentBreakLogRepository;
            _classTransferAttendenceRepository = classTransferAttendenceRepository;
            _dailySheetService = dailySheetService;
            _teacherDailyAttendenceRepository = teacherDailyAttendenceRepository;
            _classRepository = classRepository;
            _invoiceDetailsRepository = invoiceDetailsRepository;
        }
        

      //  public ResponseViewModal GetClassAttendence(AttendanceRequestViewModel attendaceRequest)
      //{
      //   ResponseViewModal res = new ResponseViewModal();
      //    try
      //      {
      //         if (attendaceRequest.AgencyID != null && attendaceRequest.AgencyID > 0 && attendaceRequest.AskedDate != null)
      //          {
      //              IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= attendaceRequest.AskedDate.Date
      //              && classCheck.ClassesID == attendaceRequest.ClassID && classCheck.AgencyID == attendaceRequest.AgencyID && classCheck.EnrollmentStatus == 2);
                    
      //              IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID);
                    
      //              IQueryable<Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= attendaceRequest.AskedDate.Date
      //              && classCheck.Id == attendaceRequest.ClassID && classCheck.AgencyID == attendaceRequest.AgencyID);
                    
      //              IQueryable<ClassAttendence> classAttendance = _classAttendenceRepository.GetAll().Where(filter => filter.ClassesID == attendaceRequest.ClassID
      //              && filter.AttendanceDate.Date == attendaceRequest.AskedDate.Date && filter.AgencyID == attendaceRequest.AgencyID && filter.Transfer == false);
                    
      //              IQueryable<StudentBreakLog> breaks = _studentBreakLogRepository.GetAll().Where(filter => filter.AgencyID == attendaceRequest.AgencyID)
      //                                                      .GroupBy(x => x.StudentID)
      //                                                      .Select(x => new { Key = x.Key, Value = x.OrderByDescending(t => t.BreakOutTime == null ? t.BreakInTime : t.BreakOutTime) })
      //                                                      .Select(x => x.Value.FirstOrDefault());

      //             List<AttendenceViewModel> classAttendence = new List<AttendenceViewModel>();

      //             IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendence = _classTransferAttendenceRepository.GetAll().Where(Check => Convert.ToDateTime(Check.TransferDate.Date) == DateTime.Now.Date && Check.AgencyID == attendaceRequest.AgencyID && !Check.IsDeleted);

      //              if (attendaceRequest.AgencyID != null && attendaceRequest.AgencyID > 0 && Convert.ToDateTime(attendaceRequest.AskedDate.Date) == DateTime.Now.Date)
      //              {                        
      //                  classAttendence = (from classEnrollmentObj in classEnrollment
      //                                     join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
      //                                     join classObj in classes
      //                                     on classEnrollmentObj.ClassesID equals classObj.Id

      //                                     join classAttendenceprimeobj in classAttendance
      //                                     on studentObj.Id equals classAttendenceprimeobj.StudentID
      //                                     into classAttendenceobj
      //                                     from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

      //                                     join attendenceStatusprimeobj in classAttendance //_attendenceStatusRepository.GetAll()
      //                                     on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
      //                                     into attendenceStatusobj
      //                                     from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

      //                                     join breaksobjprimeObj in breaks
      //                                     on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
      //                                     into breakstatusobj
      //                                     from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()

      //                                     where !classtransferattendence.Any(pv => pv.StudentID == studentObj.Id && pv.FromClassID == classObj.Id &&
      //                                         Convert.ToDateTime(pv.TransferDate.Date) == DateTime.Now.Date && pv.AgencyID == attendaceRequest.AgencyID && !pv.IsDeleted)  
      //                                         && 
      //                                         (!classEnrollmentObj.IsDeleted &&
      //                                     !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID)
      //                                     select new AttendenceViewModel
      //                                     {
      //                                         StudentID = studentObj.Id,
      //                                         StudentName = studentObj.StudentName ?? String.Empty,
      //                                         ImagePath = studentObj.ImagePath ?? String.Empty,
      //                                         ClassName = classObj.ClassName ?? String.Empty,
      //                                         AgencyID = classEnrollmentObj.AgencyID,
      //                                         Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
      //                                         ClassesID = classObj.Id,
      //                                         Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
      //                                         Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
      //                                         AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
      //                                         //AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
      //                                         AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
      //                                         DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
      //                                         DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
      //                                         PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
      //                                         PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
      //                                         ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
      //                                         ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
      //                                         PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
      //                                         OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
      //                                         OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
      //                                         DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
      //                                         ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
      //                                         DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
      //                                         CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
      //                                         CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
      //                                         BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
      //                                     }).OrderBy(c => c.StudentName).ToList();

      //                  var getAllDetails = (from CLTAObj in classtransferattendence                                            
      //                                       where CLTAObj.ToClassID == attendaceRequest.ClassID && CLTAObj.AgencyID == attendaceRequest.AgencyID &&
      //                                       Convert.ToDateTime(CLTAObj.TransferDate.Date) == DateTime.Now.Date && !CLTAObj.IsDeleted && CLTAObj.Status == true
      //                                       select new ClassTransferAttendenceViewModel()
      //                                       {
      //                                           StudentID = CLTAObj.StudentID,
      //                                           FromClassID = CLTAObj.FromClassID,
      //                                           ToClassID = CLTAObj.ToClassID,
      //                                           TransferDate = CLTAObj.TransferDate
      //                                       }).ToList();

                      
      //                  if (getAllDetails.Count > 0)
      //                  {
      //                      List<AttendenceViewModel> allDetails = new List<AttendenceViewModel>();
      //                      List<AttendenceViewModel> classAttendencee = new List<AttendenceViewModel>();

      //                      IQueryable<ClassEnrollment> classEnrollmente = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= attendaceRequest.AskedDate.Date
      //                      && classCheck.AgencyID == attendaceRequest.AgencyID && classCheck.EnrollmentStatus == 2 && !classCheck.IsDeleted);
      //                      IQueryable<Entity.Student.Student> studentse = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted);
      //                      IQueryable<Classes> classese = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= attendaceRequest.AskedDate.Date
      //                      && classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted);
      //                      IQueryable<ClassTransferAttendence> studentclass = _classTransferAttendenceRepository.GetAll().Where(classCheck => Convert.ToDateTime(classCheck.TransferDate.Date) == DateTime.Now.Date && classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted && classCheck.Status == true);
      //                      IQueryable<ClassAttendence> classAttendancee = _classAttendenceRepository.GetAll().Where(filter => filter.AttendanceDate.Date == attendaceRequest.AskedDate.Date && filter.AgencyID == attendaceRequest.AgencyID && !filter.IsDeleted && filter.Transfer == false);
      //                      IQueryable<StudentBreakLog> breakse = _studentBreakLogRepository.GetAll().Where(filter => filter.AgencyID == attendaceRequest.AgencyID)
      //                                                              .GroupBy(x => x.StudentID)
      //                                                              .Select(x => new { Key = x.Key, Value = x.OrderByDescending(t => t.BreakOutTime == null ? t.BreakInTime : t.BreakOutTime) })
      //                                                              .Select(x => x.Value.FirstOrDefault());

      //                      allDetails = (from CTAObj in studentclass
      //                                    join classEnrollmentObj in classEnrollmente on CTAObj.StudentID equals classEnrollmentObj.StudentID

      //                                    join studentObj in studentse on CTAObj.StudentID equals studentObj.Id                                        

      //                                    join classObj in classese on CTAObj.ToClassID equals classObj.Id

      //                                    join classAttendenceprimeobj in classAttendancee
      //                                    on studentObj.Id equals classAttendenceprimeobj.StudentID
      //                                    into classAttendenceobj
      //                                    from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

      //                                    join attendenceStatusprimeobj in classAttendancee //_attendenceStatusRepository.GetAll()
      //                                    on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
      //                                    into attendenceStatusobj
      //                                    from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

      //                                    join breaksobjprimeObj in breakse
      //                                    on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
      //                                    into breakstatusobj
      //                                    from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()
      //                                    where (CTAObj.ToClassID == attendaceRequest.ClassID && Convert.ToDateTime(CTAObj.TransferDate.Date) == DateTime.Now.Date &&
      //                                           !CTAObj.IsDeleted && CTAObj.AgencyID == attendaceRequest.AgencyID)                                                
      //                                    select new AttendenceViewModel
      //                                    {
      //                                        StudentID = studentObj.Id,
      //                                        StudentName = studentObj.StudentName ?? String.Empty,
      //                                        ImagePath = studentObj.ImagePath ?? String.Empty,
      //                                        ClassName = classObj.ClassName ?? String.Empty,
      //                                        AgencyID = classEnrollmentObj.AgencyID,
      //                                        Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
      //                                        ClassesID = classObj.Id,
      //                                        Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
      //                                        Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
      //                                        AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
      //                                       // AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
      //                                        AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
      //                                        DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
      //                                        DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
      //                                        PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
      //                                        PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
      //                                        ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
      //                                        ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
      //                                        PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
      //                                        OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
      //                                        OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
      //                                        DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
      //                                        ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
      //                                        DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
      //                                        CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
      //                                        CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
      //                                        BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
      //                                    }).OrderBy(c => c.Id).ToList();

      //                      allDetails = allDetails.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();

      //                      classAttendence.AddRange(allDetails);

      //                      classAttendence = classAttendence.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();                           
      //                  }
      //              }
      //              else
      //              {
      //                  classAttendence = (from classEnrollmentObj in classEnrollment
      //                                     join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
      //                                     join classObj in classes
      //                                     on classEnrollmentObj.ClassesID equals classObj.Id

      //                                     join classAttendenceprimeobj in classAttendance
      //                                     on studentObj.Id equals classAttendenceprimeobj.StudentID
      //                                     into classAttendenceobj
      //                                     from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

      //                                     join attendenceStatusprimeobj in classAttendance //_attendenceStatusRepository.GetAll()
      //                                     on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
      //                                     into attendenceStatusobj
      //                                     from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

      //                                     join breaksobjprimeObj in breaks
      //                                     on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
      //                                     into breakstatusobj
      //                                     from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()

      //                                     where !classEnrollmentObj.IsDeleted && !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID
      //                                     select new AttendenceViewModel
      //                                     {
      //                                         StudentID = studentObj.Id,
      //                                         StudentName = studentObj.StudentName ?? String.Empty,
      //                                         ImagePath = studentObj.ImagePath ?? String.Empty,
      //                                         ClassName = classObj.ClassName ?? String.Empty,
      //                                         AgencyID = classEnrollmentObj.AgencyID,
      //                                         Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
      //                                         ClassesID = classObj.Id,
      //                                         Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
      //                                         Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
      //                                         AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
      //                                       //  AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
      //                                         AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
      //                                         DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
      //                                         DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
      //                                         PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
      //                                         PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
      //                                         ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
      //                                         ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
      //                                         PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
      //                                         OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
      //                                         OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
      //                                         DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
      //                                         ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
      //                                         DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
      //                                         CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
      //                                         CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
      //                                         BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
      //                                     }).OrderBy(c => c.StudentName).ToList();

      //                  classAttendence = classAttendence.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
      //              }                   

      //              res.Data = classAttendence;

      //              if (attendaceRequest.limit != 0)
      //              {
      //                  res.Data = classAttendence.Skip((attendaceRequest.page) * attendaceRequest.limit).Take(attendaceRequest.limit).ToList();
      //              }
      //              res.TotalRows = classAttendence.Count();
      //              res.StatusCode = (long)HttpStatusCodes.OK;
      //              res.Message = "Class Attendance has been fetched.";
      //              res.IsSuccess = true;
      //          }
      //          else
      //          {
      //              res.StatusCode = 986;
      //              res.Message = "Missing Parameter.";
      //              res.IsSuccess = false;
      //          }
      //      }
      //      catch (Exception ex)
      //      {               
      //          res.IsSuccess = false;
      //          res.StatusCode = 987;
      //          res.Message = "Something went wrong.";               
      //      }
      //      return res;
      //  }

        public ResponseViewModal GetClassAttendence(AttendanceRequestViewModel attendaceRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var fromDate = attendaceRequest.AskedDate.Date;
                var toDate = fromDate.AddHours(23);
                toDate = toDate.AddMinutes(59);
                toDate = toDate.AddSeconds(59);
                if (attendaceRequest.AskedDateString != null)
                {
                    var Date = Convert.ToDateTime(attendaceRequest.AskedDateString);
                    var difference = attendaceRequest.AskedDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                    toDate = fromDate.AddHours(24);
                }
                if (attendaceRequest.AgencyID != null && attendaceRequest.AgencyID > 0 && attendaceRequest.AskedDate != null)
                {
                    IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= attendaceRequest.AskedDate.Date
                    && classCheck.ClassesID == attendaceRequest.ClassID && classCheck.AgencyID == attendaceRequest.AgencyID && classCheck.EnrollmentStatus == 2);

                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID);

                    IQueryable<Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= attendaceRequest.AskedDate.Date
                    && classCheck.Id == attendaceRequest.ClassID && classCheck.AgencyID == attendaceRequest.AgencyID);

                    IQueryable<ClassAttendence> classAttendance = _classAttendenceRepository.GetAll().Where(filter => filter.ClassesID == attendaceRequest.ClassID
                    && (fromDate <= filter.AttendanceDate && filter.AttendanceDate <= toDate) && filter.AgencyID == attendaceRequest.AgencyID && filter.Transfer == false);

                    IQueryable<StudentBreakLog> breaks = _studentBreakLogRepository.GetAll().Where(filter => filter.AgencyID == attendaceRequest.AgencyID)
                                                            .GroupBy(x => x.StudentID)
                                                            .Select(x => new { Key = x.Key, Value = x.OrderByDescending(t => t.BreakOutTime == null ? t.BreakInTime : t.BreakOutTime) })
                                                            .Select(x => x.Value.FirstOrDefault());

                    List<AttendenceViewModel> classAttendence = new List<AttendenceViewModel>();

                    IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendence = _classTransferAttendenceRepository.GetAll().Where(Check => (fromDate <= Check.TransferDate && Check.TransferDate <= toDate) && Check.AgencyID == attendaceRequest.AgencyID && !Check.IsDeleted);

                    if (attendaceRequest.AgencyID != null && attendaceRequest.AgencyID > 0 && fromDate <= DateTime.Now && DateTime.Now <= toDate)
                    {
                        classAttendence = (from classEnrollmentObj in classEnrollment
                                           join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                           join classObj in classes
                                           on classEnrollmentObj.ClassesID equals classObj.Id

                                           join classAttendenceprimeobj in classAttendance
                                           on studentObj.Id equals classAttendenceprimeobj.StudentID
                                           into classAttendenceobj
                                           from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

                                           join attendenceStatusprimeobj in classAttendance //_attendenceStatusRepository.GetAll()
                                           on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
                                           into attendenceStatusobj
                                           from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

                                           join breaksobjprimeObj in breaks
                                           on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
                                           into breakstatusobj
                                           from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()

                                           where !classtransferattendence.Any(pv => pv.StudentID == studentObj.Id && pv.FromClassID == classObj.Id &&
                                              (fromDate <= pv.TransferDate && pv.TransferDate <= toDate) && pv.AgencyID == attendaceRequest.AgencyID && !pv.IsDeleted)
                                               &&
                                               (!classEnrollmentObj.IsDeleted &&
                                           !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID)
                                           select new AttendenceViewModel
                                           {
                                               StudentID = studentObj.Id,
                                               StudentName = studentObj.StudentName ?? String.Empty,
                                               ImagePath = studentObj.ImagePath ?? String.Empty,
                                               ClassName = classObj.ClassName ?? String.Empty,
                                               AgencyID = classEnrollmentObj.AgencyID,
                                               Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
                                               ClassesID = classObj.Id,
                                               Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
                                               Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
                                               AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
                                               //AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
                                               AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
                                               DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
                                               DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
                                               PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
                                               PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
                                               ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
                                               ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
                                               PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
                                               OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
                                               OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
                                               DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
                                               ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
                                               DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
                                               CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
                                               CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
                                               BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
                                           }).OrderBy(c => c.StudentName).ToList();

                        var getAllDetails = (from CLTAObj in classtransferattendence
                                             where CLTAObj.ToClassID == attendaceRequest.ClassID && CLTAObj.AgencyID == attendaceRequest.AgencyID &&
                                            (fromDate <= CLTAObj.TransferDate && CLTAObj.TransferDate <= toDate) && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                             select new ClassTransferAttendenceViewModel()
                                             {
                                                 StudentID = CLTAObj.StudentID,
                                                 FromClassID = CLTAObj.FromClassID,
                                                 ToClassID = CLTAObj.ToClassID,
                                                 TransferDate = CLTAObj.TransferDate
                                             }).ToList();


                        if (getAllDetails.Count > 0)
                        {
                            List<AttendenceViewModel> allDetails = new List<AttendenceViewModel>();
                            List<AttendenceViewModel> classAttendencee = new List<AttendenceViewModel>();

                            IQueryable<ClassEnrollment> classEnrollmente = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEnrollEndDate.Value.Date >= attendaceRequest.AskedDate.Date
                            && classCheck.AgencyID == attendaceRequest.AgencyID && classCheck.EnrollmentStatus == 2 && !classCheck.IsDeleted);
                            IQueryable<Entity.Student.Student> studentse = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted);
                            IQueryable<Classes> classese = _classesRepository.GetAll().Where(classCheck => classCheck.ClassStartDate.Date <= attendaceRequest.AskedDate.Date && classCheck.ClassEndDate.Date >= attendaceRequest.AskedDate.Date
                            && classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted);
                            IQueryable<ClassTransferAttendence> studentclass = _classTransferAttendenceRepository.GetAll().Where(classCheck => (fromDate <= classCheck.TransferDate && classCheck.TransferDate <= toDate) && classCheck.AgencyID == attendaceRequest.AgencyID && !classCheck.IsDeleted && classCheck.Status == true);
                            IQueryable<ClassAttendence> classAttendancee = _classAttendenceRepository.GetAll().Where(filter => (fromDate <= filter.AttendanceDate && filter.AttendanceDate <= toDate) && filter.AgencyID == attendaceRequest.AgencyID && !filter.IsDeleted && filter.Transfer == false);
                            IQueryable<StudentBreakLog> breakse = _studentBreakLogRepository.GetAll().Where(filter => filter.AgencyID == attendaceRequest.AgencyID)
                                                                    .GroupBy(x => x.StudentID)
                                                                    .Select(x => new { Key = x.Key, Value = x.OrderByDescending(t => t.BreakOutTime == null ? t.BreakInTime : t.BreakOutTime) })
                                                                    .Select(x => x.Value.FirstOrDefault());

                            allDetails = (from CTAObj in studentclass
                                          join classEnrollmentObj in classEnrollmente on CTAObj.StudentID equals classEnrollmentObj.StudentID

                                          join studentObj in studentse on CTAObj.StudentID equals studentObj.Id

                                          join classObj in classese on CTAObj.ToClassID equals classObj.Id

                                          join classAttendenceprimeobj in classAttendancee
                                          on studentObj.Id equals classAttendenceprimeobj.StudentID
                                          into classAttendenceobj
                                          from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

                                          join attendenceStatusprimeobj in classAttendancee //_attendenceStatusRepository.GetAll()
                                          on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
                                          into attendenceStatusobj
                                          from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

                                          join breaksobjprimeObj in breakse
                                          on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
                                          into breakstatusobj
                                          from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()
                                          where (CTAObj.ToClassID == attendaceRequest.ClassID && (fromDate <= CTAObj.TransferDate && CTAObj.TransferDate <= toDate) &&
                                                 !CTAObj.IsDeleted && CTAObj.AgencyID == attendaceRequest.AgencyID)
                                          select new AttendenceViewModel
                                          {
                                              StudentID = studentObj.Id,
                                              StudentName = studentObj.StudentName ?? String.Empty,
                                              ImagePath = studentObj.ImagePath ?? String.Empty,
                                              ClassName = classObj.ClassName ?? String.Empty,
                                              AgencyID = classEnrollmentObj.AgencyID,
                                              Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
                                              ClassesID = classObj.Id,
                                              Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
                                              Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
                                              AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
                                              // AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
                                              AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
                                              DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
                                              DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
                                              PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
                                              PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
                                              ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
                                              ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
                                              PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
                                              OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
                                              OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
                                              DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
                                              ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
                                              DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
                                              CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
                                              CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
                                              BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
                                          }).OrderBy(c => c.Id).ToList();

                            allDetails = allDetails.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();

                            classAttendence.AddRange(allDetails);

                            classAttendence = classAttendence.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
                        }
                    }
                    else
                    {
                        classAttendence = (from classEnrollmentObj in classEnrollment
                                           join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                           join classObj in classes
                                           on classEnrollmentObj.ClassesID equals classObj.Id

                                           join classAttendenceprimeobj in classAttendance
                                           on studentObj.Id equals classAttendenceprimeobj.StudentID
                                           into classAttendenceobj
                                           from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

                                           join attendenceStatusprimeobj in classAttendance //_attendenceStatusRepository.GetAll()
                                           on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
                                           into attendenceStatusobj
                                           from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

                                           join breaksobjprimeObj in breaks
                                           on classAttendenceprimeobj.Id equals breaksobjprimeObj.ClassAttendenceID
                                           into breakstatusobj
                                           from breaksobjprimeObj in breakstatusobj.DefaultIfEmpty()

                                           where !classEnrollmentObj.IsDeleted && !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID
                                           select new AttendenceViewModel
                                           {
                                               StudentID = studentObj.Id,
                                               StudentName = studentObj.StudentName ?? String.Empty,
                                               ImagePath = studentObj.ImagePath ?? String.Empty,
                                               ClassName = classObj.ClassName ?? String.Empty,
                                               AgencyID = classEnrollmentObj.AgencyID,
                                               Id = classAttendenceprimeobj.Id == null ? 0 : classAttendenceprimeobj.Id,
                                               ClassesID = classObj.Id,
                                               Checkin = classAttendenceprimeobj.Checkin == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkin,
                                               Checkout = classAttendenceprimeobj.Checkout == null ? System.DateTime.UtcNow : classAttendenceprimeobj.Checkout,
                                               AttendenceStatusID = classAttendenceprimeobj.AttendenceStatusID == null ? 2 : classAttendenceprimeobj.AttendenceStatusID,
                                               //  AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
                                               AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
                                               DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
                                               DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
                                               PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
                                               PickupByOtherId = classAttendenceprimeobj.PickupByOtherId == null ? 0 : classAttendenceprimeobj.PickupByOtherId,
                                               ApprovedDropedById = classAttendenceprimeobj.ApprovedDropedById == null ? 0 : classAttendenceprimeobj.ApprovedDropedById,
                                               ApprovedPickupById = classAttendenceprimeobj.ApprovedPickupById == null ? 0 : classAttendenceprimeobj.ApprovedPickupById,
                                               PickupByOtherName = classAttendenceprimeobj.PickupByOtherName ?? String.Empty,
                                               OnLeave = classAttendenceprimeobj.OnLeave == null ? false : classAttendenceprimeobj.OnLeave,
                                               OnLeaveComment = classAttendenceprimeobj.OnLeaveComment ?? String.Empty,
                                               DisableOnLeave = classAttendenceprimeobj.DisableOnLeave ?? String.Empty,
                                               ReasonId = classAttendenceprimeobj.ReasonId == null ? 0 : classAttendenceprimeobj.ReasonId,
                                               DropedByOtherNames = classAttendenceprimeobj.DropedByOtherNames ?? String.Empty,
                                               CheckInTime = classAttendenceprimeobj.CheckInTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckInTime,
                                               CheckOutTime = classAttendenceprimeobj.CheckOutTime == null ? System.DateTime.UtcNow : classAttendenceprimeobj.CheckOutTime,
                                               BreakStatusId = breaksobjprimeObj.BreakStatusId == null ? 0 : breaksobjprimeObj.BreakStatusId
                                           }).OrderBy(c => c.StudentName).ToList();

                        classAttendence = classAttendence.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
                    }

                    res.Data = classAttendence;

                    if (attendaceRequest.limit != 0)
                    {
                        res.Data = classAttendence.Skip((attendaceRequest.page) * attendaceRequest.limit).Take(attendaceRequest.limit).ToList();
                    }
                    res.TotalRows = classAttendence.Count();
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Attendance has been fetched.";
                    res.IsSuccess = true;
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
            }
            return res;
        }


        public ResponseViewModal CheckInAttendenceStudent(AttendenceViewModel requestCheckInAttendenceStudent)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (requestCheckInAttendenceStudent.Checkin != null && requestCheckInAttendenceStudent.DropedById > 0 && requestCheckInAttendenceStudent.StudentID > 0
                        && requestCheckInAttendenceStudent.AgencyID > 0 && requestCheckInAttendenceStudent.ClassesID > 0)
                    {
                        long id = 0;
                        long invId = 0;
                        ClassAttendence classAttendenceobj = null;
                        InvoiceDetailsViewModel invoiceDetailsModel = new InvoiceDetailsViewModel();
                        Student studentObj = new Student();
                        ClassAttendence classAttendenceobjs = null;
                        Classes classObj = null;
                        InvoiceDetails invoiceObj = null;
                        if (requestCheckInAttendenceStudent.Id == 0 && !requestCheckInAttendenceStudent.IsEditModeOn && requestCheckInAttendenceStudent.AttendenceStatusID == 3)
                        {                            
                            requestCheckInAttendenceStudent.CreatedDate = DateTime.UtcNow;
                            classAttendenceobj = new ClassAttendence();
                            Mapper.Map(requestCheckInAttendenceStudent, classAttendenceobj);
                            _classAttendenceRepository.Create(classAttendenceobj);
                            _classAttendenceRepository.SaveChanges();
                            id = classAttendenceobj.Id;
                        }
                        
                        else if (requestCheckInAttendenceStudent.IsEditModeOn && requestCheckInAttendenceStudent.StudentID != 0 && requestCheckInAttendenceStudent.AttendenceStatusID == 3)
                        {
                            classAttendenceobj = _classAttendenceRepository.Get(x => x.Id == requestCheckInAttendenceStudent.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAttendenceobj, null))
                            {                                
                                classAttendenceobj.UpdatedDate = DateTime.UtcNow;
                                //classAttendenceobj.AttendenceStatusID = requestCheckInAttendenceStudent.AttendenceStatusID;
                                classAttendenceobj.Checkin = requestCheckInAttendenceStudent.Checkin;
                                classAttendenceobj.DropedByOtherNames = requestCheckInAttendenceStudent.DropedByOtherNames;
                                classAttendenceobj.CheckInTime = requestCheckInAttendenceStudent.CheckInTime;
                                classAttendenceobj.DropedById = requestCheckInAttendenceStudent.DropedById;
                                classAttendenceobj.DropedByOtherId = requestCheckInAttendenceStudent.DropedByOtherId;
                                classAttendenceobj.ApprovedDropedById = requestCheckInAttendenceStudent.ApprovedDropedById; // Teacher id or id of the person taking attendence                           
                                _classAttendenceRepository.SaveChanges();
                                id = classAttendenceobj.Id;
                            }
                            classObj = _classRepository.Get(x => x.Id == requestCheckInAttendenceStudent.ClassesID && x.AgencyID == requestCheckInAttendenceStudent.AgencyID);
                            if (id > 0 && classObj.CategoryId == 6)
                            {
                                if (classAttendenceobj.AttendenceStatusID == 4)
                                {
                                    studentObj = _studentRepository.Get(x => x.Id == requestCheckInAttendenceStudent.StudentID);
                                    classAttendenceobjs = _classAttendenceRepository.Get(x => x.Id == requestCheckInAttendenceStudent.Id && !x.IsDeleted);
                                    classAttendenceobj.CheckInTime = classAttendenceobj.CheckInTime.AddMilliseconds(-classAttendenceobj.CheckInTime.Millisecond);
                                    classAttendenceobj.CheckInTime = classAttendenceobj.CheckInTime.AddSeconds(-classAttendenceobj.CheckInTime.Second);
                                    classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddMilliseconds(-classAttendenceobj.CheckOutTime.Millisecond);
                                    classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddSeconds(-classAttendenceobj.CheckOutTime.Second);
                                    classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddSeconds(-classAttendenceobj.CheckOutTime.Second);

                                    var hour = (classAttendenceobjs.CheckOutTime - classAttendenceobjs.CheckInTime).TotalHours;
                                    hour = Math.Ceiling(hour);
                                    if (hour < 0)
                                    {
                                        hour = hour * -1;
                                        hour = hour % 24;
                                        hour = 24 - hour;                                    
                                    }
                                    else
                                    {
                                        hour = hour % 24;
                                    }
                                    var amount = hour * classObj.Fees;

                                    invoiceObj = _invoiceDetailsRepository.Get(x => x.ClassAttendenceID == requestCheckInAttendenceStudent.Id && x.AgencyID == requestCheckInAttendenceStudent.AgencyID);
                                    if (invoiceObj != null)
                                    {
                                        invoiceObj.InvoiceAmount = Convert.ToDecimal(amount); ;
                                        invoiceObj.DiscountAmount = 0;
                                        invoiceObj.TotalAmount = Convert.ToDecimal(amount);
                                        invoiceObj.UpdatedBy = requestCheckInAttendenceStudent.AgencyID;
                                        invoiceObj.UpdatedDate = DateTime.Now;
                                        _invoiceDetailsRepository.SaveChanges();
                                    }
                                }
                            }

                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully check in for the student" + requestCheckInAttendenceStudent.StudentName;
                        res.SaveId = id;
                        res.ReturnMessage.Add("successfully check in for the student" + requestCheckInAttendenceStudent.StudentName);
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
                }
            }
            return res;
        }
        
        public ResponseViewModal CheckOutAttendenceStudent(AttendenceViewModel requestCheckOutAttendenceStudent)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (requestCheckOutAttendenceStudent.CheckOutTime != null && requestCheckOutAttendenceStudent.PickupById > 0 && requestCheckOutAttendenceStudent.StudentID > 0
                        && requestCheckOutAttendenceStudent.AgencyID > 0 && requestCheckOutAttendenceStudent.ClassesID > 0)
                    {
                        long id = 0;
                        long invId = 0;
                        InvoiceDetailsViewModel invoiceDetailsModel = new InvoiceDetailsViewModel();
                        Student studentObj = new Student();
                        ClassAttendence classAttendenceobj = null;
                        ClassAttendence classAttendenceobjs = null;
                        Classes classObj = null;
                        InvoiceDetails invoiceObj = null;
                        if (requestCheckOutAttendenceStudent.IsEditModeOn && requestCheckOutAttendenceStudent.StudentID != null && requestCheckOutAttendenceStudent.StudentID != 0 && requestCheckOutAttendenceStudent.AttendenceStatusID == 4)
                        {
                            classAttendenceobj = _classAttendenceRepository.Get(x => x.Id == requestCheckOutAttendenceStudent.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAttendenceobj, null))
                            {                                
                                classAttendenceobj.UpdatedDate = DateTime.UtcNow;
                                classAttendenceobj.AttendenceStatusID = requestCheckOutAttendenceStudent.AttendenceStatusID; // Status will become 4 here

                                classAttendenceobj.CheckOutTime = requestCheckOutAttendenceStudent.CheckOutTime;
                                classAttendenceobj.PickupById = requestCheckOutAttendenceStudent.PickupById;
                                classAttendenceobj.PickupByOtherId = requestCheckOutAttendenceStudent.PickupByOtherId;
                                classAttendenceobj.ApprovedPickupById = requestCheckOutAttendenceStudent.ApprovedPickupById; // Teacher id or id of the person taking attendence
                                classAttendenceobj.PickupByOtherName = requestCheckOutAttendenceStudent.PickupByOtherName ?? String.Empty;
                                _classAttendenceRepository.SaveChanges();
                                id = classAttendenceobj.Id;
                            }
                            classObj = _classRepository.Get(x => x.Id == requestCheckOutAttendenceStudent.ClassesID && x.AgencyID == requestCheckOutAttendenceStudent.AgencyID);
                            if (id > 0 && classObj.CategoryId == 6)
                            {
                                studentObj = _studentRepository.Get(x => x.Id == requestCheckOutAttendenceStudent.StudentID);
                                classAttendenceobjs = _classAttendenceRepository.Get(x => x.Id == requestCheckOutAttendenceStudent.Id && !x.IsDeleted);
                                classAttendenceobj.CheckInTime = classAttendenceobj.CheckInTime.AddMilliseconds(-classAttendenceobj.CheckInTime.Millisecond);
                                classAttendenceobj.CheckInTime = classAttendenceobj.CheckInTime.AddSeconds(-classAttendenceobj.CheckInTime.Second);
                                classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddMilliseconds(-classAttendenceobj.CheckOutTime.Millisecond);
                                classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddSeconds(-classAttendenceobj.CheckOutTime.Second);
                                classAttendenceobj.CheckOutTime = classAttendenceobj.CheckOutTime.AddSeconds(-classAttendenceobj.CheckOutTime.Second);
                                var hour = (classAttendenceobjs.CheckOutTime - classAttendenceobjs.CheckInTime).TotalHours;
                                hour = Math.Ceiling(hour);
                                if (hour < 0)
                                {
                                    hour = hour * -1;
                                    hour = hour % 24;
                                    hour = 24 - hour;
                                }
                                if (hour > 24)
                                {
                                    hour = hour % 24;
                                }
                                var amount = hour * classObj.Fees;

                                invoiceObj = _invoiceDetailsRepository.Get(x => x.ClassAttendenceID == requestCheckOutAttendenceStudent.Id && x.AgencyID == requestCheckOutAttendenceStudent.AgencyID);
                                if (invoiceObj == null)
                                {                                  
                                    Random random = new Random();
                                    int num = random.Next(1, 999999999);
                                    invoiceDetailsModel.IsActive = true;
                                    invoiceDetailsModel.IsDeleted = false;
                                    invoiceDetailsModel.CreatedDate = DateTime.UtcNow;
                                    invoiceDetailsModel.InvoiceNo = requestCheckOutAttendenceStudent.AgencyID + "-" + studentObj.ParentID + "-" + requestCheckOutAttendenceStudent.StudentID + "-" + DateTime.Now.ToString("yyyyMMdd") + "-" + num;
                                    invoiceDetailsModel.AgencyID = requestCheckOutAttendenceStudent.AgencyID;
                                    invoiceDetailsModel.ParentID = studentObj.ParentID;
                                    invoiceDetailsModel.StudentID = requestCheckOutAttendenceStudent.StudentID;
                                    invoiceDetailsModel.InvoiceDate = requestCheckOutAttendenceStudent.AttendanceDate;
                                    invoiceDetailsModel.InvoiceFromDate = requestCheckOutAttendenceStudent.AttendanceDate;
                                    invoiceDetailsModel.InvoiceToDate = requestCheckOutAttendenceStudent.AttendanceDate;
                                    invoiceDetailsModel.InvoiceAmount = Convert.ToDecimal(amount);
                                    invoiceDetailsModel.DiscountAmount = 0;
                                    invoiceDetailsModel.TotalAmount = Convert.ToDecimal(amount); ;
                                    invoiceDetailsModel.IsInvoicePaid = false;
                                    invoiceDetailsModel.DueAmount = 0;
                                    invoiceDetailsModel.IsPartialPayment = false;
                                    invoiceDetailsModel.PerDayFeeCalculationID = 0;
                                    invoiceDetailsModel.InvoiceDescription = "Drop In Class";
                                    invoiceDetailsModel.ClassAttendenceID = requestCheckOutAttendenceStudent.Id;

                                    invoiceObj = new InvoiceDetails();
                                    invoiceObj = Mapper.Map<InvoiceDetails>(invoiceDetailsModel);
                                    _invoiceDetailsRepository.Create(invoiceObj);
                                    _invoiceDetailsRepository.SaveChanges();
                                    invId = invoiceObj.Id;
                                }
                                else
                                {
                                    invoiceObj.InvoiceAmount = Convert.ToDecimal(amount); ;
                                    invoiceObj.DiscountAmount = 0;
                                    invoiceObj.TotalAmount = Convert.ToDecimal(amount);
                                    invoiceObj.UpdatedBy = requestCheckOutAttendenceStudent.AgencyID;
                                    invoiceObj.UpdatedDate = DateTime.Now;
                                    _invoiceDetailsRepository.SaveChanges();
                                }
                            }

                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "successfully check out for the student" + requestCheckOutAttendenceStudent.StudentName;                       
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
                }
            }
            return res;
        }
       
        public ResponseViewModal AbsentAttendenceStudent(AttendenceViewModel requestAbsentAttendenceStudent)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (requestAbsentAttendenceStudent.AgencyID > 0 && requestAbsentAttendenceStudent.AttendenceStatusID > 0 && requestAbsentAttendenceStudent.StudentID > 0)
                    {
                        long id = 0;
                        ClassAttendence classAttendenceobj = null;
                        if (requestAbsentAttendenceStudent.Id == 0 && !requestAbsentAttendenceStudent.IsEditModeOn && requestAbsentAttendenceStudent.AttendenceStatusID == 5)
                        {
                            requestAbsentAttendenceStudent.CreatedDate = DateTime.UtcNow;
                            classAttendenceobj = new ClassAttendence();
                            Mapper.Map(requestAbsentAttendenceStudent, classAttendenceobj);
                            _classAttendenceRepository.Create(classAttendenceobj);
                            _classAttendenceRepository.SaveChanges();
                            id = classAttendenceobj.Id;
                        }
                        else if (requestAbsentAttendenceStudent.Id > 0 && !requestAbsentAttendenceStudent.IsEditModeOn && requestAbsentAttendenceStudent.AttendenceStatusID == 2)
                        {
                            // deleting row if undo absent request 
                            classAttendenceobj = _classAttendenceRepository.Get(x => x.Id == requestAbsentAttendenceStudent.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAttendenceobj, null))
                            {                               
                                _classAttendenceRepository.Delete(classAttendenceobj);
                                _classAttendenceRepository.SaveChanges();
                            }
                        }
                        else
                        {
                            classAttendenceobj = _classAttendenceRepository.Get(x => x.Id == requestAbsentAttendenceStudent.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAttendenceobj, null))
                            {
                                classAttendenceobj.UpdatedDate = DateTime.UtcNow;
                                classAttendenceobj.AttendenceStatusID = requestAbsentAttendenceStudent.AttendenceStatusID; // Status will become 5 here
                                classAttendenceobj.OnLeave = requestAbsentAttendenceStudent.OnLeave;
                                classAttendenceobj.OnLeaveComment = requestAbsentAttendenceStudent.OnLeaveComment ?? String.Empty;
                                classAttendenceobj.ReasonId = requestAbsentAttendenceStudent.ReasonId;
                                _classAttendenceRepository.SaveChanges();
                                id = classAttendenceobj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully marked student as on leave" + requestAbsentAttendenceStudent.StudentName;
                        res.SaveId = id;
                        res.ReturnMessage.Add("Successfully marked student as on leave" + requestAbsentAttendenceStudent.StudentName);
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
        
        public ResponseViewModal GetStudentBreakLogs(StudentBreakLogRequestViewModel getStudentBreakLogsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentBreakLogsRequest.AgencyID > 0 && getStudentBreakLogsRequest.ClassAttendenceID > 0 && getStudentBreakLogsRequest.StudentID > 0)
                {
                    List<StudentBreakLogViewModel> studentBreakLogs = new List<StudentBreakLogViewModel>();
                    IQueryable<StudentBreakLog> selectedStudentBreakLogs = _studentBreakLogRepository.GetAll().Where(check => check.AgencyID == getStudentBreakLogsRequest.AgencyID
                    && check.StudentID == getStudentBreakLogsRequest.StudentID && check.ClassAttendenceID == getStudentBreakLogsRequest.ClassAttendenceID);
                    IQueryable<Entity.Parent.Guardian> guardianList = _guardianRepository.GetAll().Where(check => check.AgencyID == getStudentBreakLogsRequest.AgencyID && check.StudentID == getStudentBreakLogsRequest.StudentID);

                    studentBreakLogs = (from studentBreakLogObj in selectedStudentBreakLogs
                                           
                                        join guardianDropPrimObj in guardianList
                                        on studentBreakLogObj.DropedById equals guardianDropPrimObj.Id
                                        into guardiandropobj
                                        from guardianDropPrimObj in guardiandropobj.DefaultIfEmpty()

                                        join guardianPickPrimObj in guardianList
                                        on studentBreakLogObj.PickupById equals guardianPickPrimObj.Id
                                        into guardianpickobj
                                        from guardianPickPrimObj in guardianpickobj.DefaultIfEmpty()

                                        where (!studentBreakLogObj.IsDeleted)
                                        select new StudentBreakLogViewModel
                                        {
                                            Id = studentBreakLogObj.Id,
                                            AgencyID = studentBreakLogObj.AgencyID,
                                            StudentID = studentBreakLogObj.Id,
                                            ClassAttendenceID = studentBreakLogObj.ClassAttendenceID,
                                            BreakInTime = studentBreakLogObj.BreakInTime,
                                            BreakOutTime = studentBreakLogObj.BreakOutTime,
                                            PickupBy = guardianPickPrimObj != null ? guardianPickPrimObj.GuardianName : "",
                                            DropedBy = guardianDropPrimObj != null ? guardianDropPrimObj.GuardianName : "",
                                            AttendenceStatusID = studentBreakLogObj.AttendenceStatusID,
                                            AttendanceDate = studentBreakLogObj.AttendanceDate,
                                            DropedById = studentBreakLogObj.DropedById,
                                            DropedByOtherId = studentBreakLogObj.DropedByOtherId,
                                            PickupById = studentBreakLogObj.PickupById,
                                            PickupByOtherId = studentBreakLogObj.PickupByOtherId,
                                            ApprovedDropedById = studentBreakLogObj.ApprovedDropedById,
                                            ApprovedPickupById = studentBreakLogObj.ApprovedPickupById,
                                            DropedByOtherNames = studentBreakLogObj.DropedByOtherNames,
                                            PickupByOtherName = studentBreakLogObj.PickupByOtherName,
                                            BreakReason = studentBreakLogObj.BreakReason,
                                            BreakStatusId = studentBreakLogObj.BreakStatusId                                            
                                        }
                                            ).OrderBy(c => c.BreakOutTime).ToList();
                    res.Data = studentBreakLogs;
                    if (getStudentBreakLogsRequest.limit != 0)
                    {
                        res.Data = studentBreakLogs.Skip((getStudentBreakLogsRequest.page - 1) * getStudentBreakLogsRequest.limit).Take(getStudentBreakLogsRequest.limit).ToList();
                    }
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Student Break Logs has been fetched.";
                    res.IsSuccess = true;
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
            }
            return res;
        }
       
        public ResponseViewModal BreakInAttendenceStudent(StudentBreakLogViewModel breakInAttendenceStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (breakInAttendenceStudentRequest.ClassAttendenceID > 0 && breakInAttendenceStudentRequest.DropedById > 0 && breakInAttendenceStudentRequest.StudentID > 0 &&
                        breakInAttendenceStudentRequest.BreakInTime != null && breakInAttendenceStudentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentBreakLog studentBreakLogObj = null;
                        if (breakInAttendenceStudentRequest.Id == 0)
                        {                           
                            breakInAttendenceStudentRequest.CreatedDate = DateTime.UtcNow;
                            studentBreakLogObj = new StudentBreakLog();
                            Mapper.Map(breakInAttendenceStudentRequest, studentBreakLogObj);
                            _studentBreakLogRepository.Create(studentBreakLogObj);
                            _studentBreakLogRepository.SaveChanges();
                            id = studentBreakLogObj.Id;
                        }
                        else
                        {
                            studentBreakLogObj = _studentBreakLogRepository.Get(x => x.Id == breakInAttendenceStudentRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentBreakLogObj, null))
                            {                                
                                studentBreakLogObj.UpdatedDate = DateTime.UtcNow;
                                studentBreakLogObj.BreakStatusId = breakInAttendenceStudentRequest.BreakStatusId;
                                studentBreakLogObj.BreakInTime = breakInAttendenceStudentRequest.BreakInTime;
                                studentBreakLogObj.DropedByOtherNames = breakInAttendenceStudentRequest.DropedByOtherNames;
                                studentBreakLogObj.DropedById = breakInAttendenceStudentRequest.DropedById;
                                studentBreakLogObj.DropedByOtherId = breakInAttendenceStudentRequest.DropedByOtherId;
                                studentBreakLogObj.ApprovedDropedById = breakInAttendenceStudentRequest.ApprovedDropedById;
                                _classAttendenceRepository.SaveChanges();
                                id = studentBreakLogObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully break in for the student";
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
                }
            }
            return res;
        }
       
        public ResponseViewModal BreakOutAttendenceStudent(StudentBreakLogViewModel breakOutAttendenceStudentRequest)
        {
                ResponseViewModal res = new ResponseViewModal();
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    try
                    {
                        if (breakOutAttendenceStudentRequest.ClassAttendenceID > 0 && breakOutAttendenceStudentRequest.PickupById > 0 && breakOutAttendenceStudentRequest.StudentID > 0 &&
                            breakOutAttendenceStudentRequest.BreakInTime != null && breakOutAttendenceStudentRequest.AgencyID > 0)
                        {
                            long id = 0;
                            StudentBreakLog studentBreakLogObj = null;
                            if (breakOutAttendenceStudentRequest.Id == 0)
                            {
                                breakOutAttendenceStudentRequest.CreatedDate = DateTime.UtcNow;
                                studentBreakLogObj = new StudentBreakLog();
                                Mapper.Map(breakOutAttendenceStudentRequest, studentBreakLogObj);
                                _studentBreakLogRepository.Create(studentBreakLogObj);
                                _studentBreakLogRepository.SaveChanges();
                                id = studentBreakLogObj.Id;
                            }
                            else
                            {
                                studentBreakLogObj = _studentBreakLogRepository.Get(x => x.Id == breakOutAttendenceStudentRequest.Id && !x.IsDeleted);
                                if (!ReferenceEquals(studentBreakLogObj, null))
                                {                                    
                                    studentBreakLogObj.UpdatedDate = DateTime.UtcNow;
                                    studentBreakLogObj.AttendenceStatusID = breakOutAttendenceStudentRequest.AttendenceStatusID; // Status will become 4 here
                                    studentBreakLogObj.BreakStatusId = breakOutAttendenceStudentRequest.BreakStatusId;
                                    studentBreakLogObj.BreakOutTime = breakOutAttendenceStudentRequest.BreakOutTime;
                                    studentBreakLogObj.PickupById = breakOutAttendenceStudentRequest.PickupById;
                                    studentBreakLogObj.PickupByOtherId = breakOutAttendenceStudentRequest.PickupByOtherId;
                                    studentBreakLogObj.ApprovedPickupById = breakOutAttendenceStudentRequest.ApprovedPickupById; // Teacher id or id of the person taking attendence
                                    studentBreakLogObj.PickupByOtherName = breakOutAttendenceStudentRequest.PickupByOtherName ?? String.Empty;
                                    studentBreakLogObj.BreakReason = breakOutAttendenceStudentRequest.BreakReason;
                                    _classAttendenceRepository.SaveChanges();
                                    id = studentBreakLogObj.Id;
                                }
                            }
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Successfully break out for the student";
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
                    }
                }
                return res;            
        }

        public ResponseViewModal BreakInOutAttendenceStudentMobile(StudentBreakLogViewModel breakInOutAttendenceStudentMobileRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (breakInOutAttendenceStudentMobileRequest.ClassAttendenceID > 0 && breakInOutAttendenceStudentMobileRequest.StudentID > 0 
                        && breakInOutAttendenceStudentMobileRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentBreakLog studentBreakLogObj = null;
                        if (breakInOutAttendenceStudentMobileRequest.Id == 0)
                        {                            
                            breakInOutAttendenceStudentMobileRequest.CreatedDate = DateTime.UtcNow;
                            studentBreakLogObj = new StudentBreakLog();
                            Mapper.Map(breakInOutAttendenceStudentMobileRequest, studentBreakLogObj);
                            _studentBreakLogRepository.Create(studentBreakLogObj);
                            _studentBreakLogRepository.SaveChanges();
                            id = studentBreakLogObj.Id;
                        }
                        else
                        {
                            studentBreakLogObj = _studentBreakLogRepository.Get(x => x.Id == breakInOutAttendenceStudentMobileRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentBreakLogObj, null))
                            {                                
                                studentBreakLogObj.UpdatedDate = DateTime.UtcNow;
                                studentBreakLogObj.BreakStatusId = breakInOutAttendenceStudentMobileRequest.BreakStatusId;
                                studentBreakLogObj.BreakOutTime = breakInOutAttendenceStudentMobileRequest.BreakOutTime;
                                studentBreakLogObj.BreakInTime = breakInOutAttendenceStudentMobileRequest.BreakInTime;
                                studentBreakLogObj.DropedByOtherNames = breakInOutAttendenceStudentMobileRequest.DropedByOtherNames;
                                studentBreakLogObj.DropedById = breakInOutAttendenceStudentMobileRequest.DropedById;
                                studentBreakLogObj.DropedByOtherId = breakInOutAttendenceStudentMobileRequest.DropedByOtherId;
                                studentBreakLogObj.ApprovedDropedById = breakInOutAttendenceStudentMobileRequest.ApprovedDropedById;
                                studentBreakLogObj.PickupById = breakInOutAttendenceStudentMobileRequest.PickupById;
                                studentBreakLogObj.PickupByOtherId = breakInOutAttendenceStudentMobileRequest.PickupByOtherId;
                                studentBreakLogObj.ApprovedPickupById = breakInOutAttendenceStudentMobileRequest.ApprovedPickupById; // Teacher id or id of the person taking attendence
                                studentBreakLogObj.PickupByOtherName = breakInOutAttendenceStudentMobileRequest.PickupByOtherName ?? String.Empty;
                                _classAttendenceRepository.SaveChanges();
                                id = studentBreakLogObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully break in for the student";
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
                }
            }
            return res;
        }

        public ResponseViewModal StudentClassTransferAttendence(ClassTransferAttendenceViewModel getClassTransferAttendenceInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            ClassTransferAttendence CTAObj = null;

            bool Transferwithcheckout = false;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                   if (getClassTransferAttendenceInfoRequest.AgencyID > 0)
                    {
                        IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollStartDate.Date <= DateTime.Now.Date && classCheck.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date
                        && classCheck.StudentID == getClassTransferAttendenceInfoRequest.StudentID && classCheck.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID && classCheck.EnrollmentStatus == 2 && !classCheck.IsDeleted);

                        IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendencee = _classTransferAttendenceRepository.GetAll().Where(Check => Convert.ToDateTime(Check.TransferDate.Date) == DateTime.Now.Date && Check.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID && !Check.IsDeleted && Check.Status == true);

                        var allDetails = (from CEDObj in classEnrollment
                                          where CEDObj.StudentID == getClassTransferAttendenceInfoRequest.StudentID
                                          && CEDObj.ClassesID == getClassTransferAttendenceInfoRequest.ToClassID
                                          && CEDObj.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID
                                          && !CEDObj.IsDeleted
                                          orderby CEDObj.Id descending
                                          select new ClassEnrollmentViewModel
                                          {
                                              StudentID = CEDObj.StudentID,
                                              ClassesID = CEDObj.ClassesID
                                          }).ToList();

                        var getAllDetailss = (from CLTAObj in classtransferattendencee
                                              where CLTAObj.StudentID == getClassTransferAttendenceInfoRequest.StudentID
                                                   && CLTAObj.FromClassID == getClassTransferAttendenceInfoRequest.ToClassID
                                                   && CLTAObj.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID
                                                   && Convert.ToDateTime(CLTAObj.TransferDate.Date) == DateTime.Now.Date
                                                   && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                              select new ClassTransferAttendenceViewModel()
                                              {
                                                  Id = CLTAObj.Id,
                                                  StudentID = CLTAObj.StudentID,
                                                  FromClassID = CLTAObj.FromClassID,
                                                  ToClassID = CLTAObj.ToClassID,
                                                  TransferDate = CLTAObj.TransferDate
                                              }).ToList();

                        var getAllDetailsss = (from CLTAObj in classtransferattendencee
                                              where CLTAObj.StudentID == getClassTransferAttendenceInfoRequest.StudentID
                                                   && CLTAObj.ToClassID == getClassTransferAttendenceInfoRequest.ToClassID
                                                   && CLTAObj.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID
                                                   && Convert.ToDateTime(CLTAObj.TransferDate.Date) == DateTime.Now.Date
                                                   && !CLTAObj.IsDeleted && CLTAObj.Status == true
                                              select new ClassTransferAttendenceViewModel()
                                              {
                                                  Id = CLTAObj.Id,
                                                  StudentID = CLTAObj.StudentID,
                                                  FromClassID = CLTAObj.FromClassID,
                                                  ToClassID = CLTAObj.ToClassID,
                                                  TransferDate = CLTAObj.TransferDate
                                              }).ToList();

                        if (allDetails.Count > 0 && getAllDetailss.Count == 0)
                        {
                            res.IsSuccess = true;
                            res.StatusCode = 987;
                            res.Message = "Student allready exist selected class.";
                            return res;
                        }
                        if (allDetails.Count == 0 && getAllDetailsss.Count > 0)
                        {
                            res.IsSuccess = true;
                            res.StatusCode = 987;
                            res.Message = "Student allready exist selected class.";
                            return res;
                        }
                        else
                        {
                            IQueryable<ClassAttendence> classattendence = _classAttendenceRepository.GetAll().Where(classCheck => Convert.ToDateTime(classCheck.AttendanceDate).Date == DateTime.Now.Date && classCheck.StudentID == getClassTransferAttendenceInfoRequest.StudentID && classCheck.ClassesID == getClassTransferAttendenceInfoRequest.FromClassID && classCheck.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID && !classCheck.IsDeleted);

                            var classAttendenceDetails = (from CADObj in classattendence
                                          where Convert.ToDateTime(CADObj.AttendanceDate).Date == DateTime.Now.Date
                                          && CADObj.StudentID == getClassTransferAttendenceInfoRequest.StudentID
                                          && CADObj.ClassesID == getClassTransferAttendenceInfoRequest.FromClassID
                                          && CADObj.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID
                                          && !CADObj.IsDeleted
                                          orderby CADObj.Id descending
                                          select new AttendenceViewModel
                                          {
                                              Id = CADObj.Id,
                                              StudentID = CADObj.StudentID,
                                              ClassesID = CADObj.ClassesID,
                                              AttendanceDate = CADObj.AttendanceDate
                                          }).ToList();

                        if(classAttendenceDetails.Count > 0)
                        {
                            ClassAttendence classAttendenceobj = null;
                            classAttendenceobj = _classAttendenceRepository.Get(x => x.Id == classAttendenceDetails[0].Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAttendenceobj, null))
                            {
                                classAttendenceobj.UpdatedDate = DateTime.UtcNow;
                                classAttendenceobj.AttendenceStatusID = 4;//requestCheckOutAttendenceStudent.AttendenceStatusID; // Status will become 4 here

                                classAttendenceobj.CheckOutTime = DateTime.UtcNow;//requestCheckOutAttendenceStudent.CheckOutTime;
                                classAttendenceobj.PickupById = 0;//requestCheckOutAttendenceStudent.PickupById;
                                classAttendenceobj.PickupByOtherId = 0;//requestCheckOutAttendenceStudent.PickupByOtherId;
                                classAttendenceobj.ApprovedPickupById = 0;//requestCheckOutAttendenceStudent.ApprovedPickupById; // Teacher id or id of the person taking attendence
                                classAttendenceobj.PickupByOtherName = "";
                                classAttendenceobj.Transfer = true;
                                res.Transferwithcheckout = true;
                                _classAttendenceRepository.SaveChanges();
                            }
                        }                       
                                                                       
                         IQueryable<Entity.Teachers.ClassTransferAttendence> classtransferattendence = _classTransferAttendenceRepository.GetAll().Where(Check => Convert.ToDateTime(Check.TransferDate.Date) == DateTime.Now.Date && Check.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID && !Check.IsDeleted && Check.Status == true);

                         var getAllDetails = (from CLTAObj in classtransferattendence
                                                 where CLTAObj.StudentID == getClassTransferAttendenceInfoRequest.StudentID && CLTAObj.AgencyID == getClassTransferAttendenceInfoRequest.AgencyID &&
                                                  Convert.ToDateTime(CLTAObj.TransferDate.Date) == DateTime.Now.Date && !CLTAObj.IsDeleted && CLTAObj.Status ==true
                                                 select new ClassTransferAttendenceViewModel()
                                                 {
                                                     Id = CLTAObj.Id,
                                                     StudentID = CLTAObj.StudentID,
                                                     FromClassID = CLTAObj.FromClassID,
                                                     ToClassID = CLTAObj.ToClassID,
                                                     TransferDate = CLTAObj.TransferDate
                                                 }).ToList();

                            if (getAllDetails.Count > 0)
                            {
                                ClassTransferAttendence CTADObj = null;
                                CTADObj = _classTransferAttendenceRepository.Get(x => x.Id == getAllDetails[0].Id && !x.IsDeleted);
                                if (!ReferenceEquals(CTADObj, null))
                                {
                                    CTADObj.Status = false;
                                    CTADObj.UpdatedDate = DateTime.UtcNow;
                                    _classTransferAttendenceRepository.SaveChanges();                                   
                                }
                            }
                            //========Add StudentClassTransferAttendence =======//
                            long Id = 0;
                            getClassTransferAttendenceInfoRequest.CreatedDate = DateTime.UtcNow;
                            getClassTransferAttendenceInfoRequest.IsActive = true;
                            getClassTransferAttendenceInfoRequest.IsDeleted = false;
                            getClassTransferAttendenceInfoRequest.TransferDate = DateTime.UtcNow;
                            getClassTransferAttendenceInfoRequest.Status = true;
                            CTAObj = Mapper.Map<ClassTransferAttendence>(getClassTransferAttendenceInfoRequest);
                            _classTransferAttendenceRepository.Create(CTAObj);
                            _classTransferAttendenceRepository.SaveChanges();
                            Id = CTAObj.Id;

                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Class Transfer has been saved.";                           

                            daycaredb.Commit();
                            return res;
                        }                        
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

        public ResponseViewModal UpdateTeacherClockOutTime(AttendanceRequestViewModel clockOutTimeUpdateReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (clockOutTimeUpdateReq.ID > 0 && clockOutTimeUpdateReq.AgencyID > 0)
                    {
                        long id = 0;
                        clockOutTimeUpdateReq.ClockOutTime = clockOutTimeUpdateReq.ClockOutTime;
                        TeacherDailyAttendence teacherDailyAttendanceObj = null;

                        teacherDailyAttendanceObj = _teacherDailyAttendenceRepository.Get(x => x.Id == clockOutTimeUpdateReq.ID && !x.IsDeleted);
                        if (!ReferenceEquals(teacherDailyAttendanceObj, null))
                        {
                            var newClockOut = new DateTime(teacherDailyAttendanceObj.ClockIn.Year, teacherDailyAttendanceObj.ClockIn.Month, teacherDailyAttendanceObj.ClockIn.Day,
                                clockOutTimeUpdateReq.ClockOutTime.Hour, clockOutTimeUpdateReq.ClockOutTime.Minute, clockOutTimeUpdateReq.ClockOutTime.Second);

                            teacherDailyAttendanceObj.ClockOut = newClockOut;
                            id = teacherDailyAttendanceObj.Id;
                            _teacherDailyAttendenceRepository.SaveChanges();
                        }

                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Update Clock out time";
                        res.SaveId = id;
                    }
                    else
                    {
                        res.IsSuccess = true;
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter";
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


        public ResponseViewModal UpdateTeacherClockInTime(AttendanceRequestViewModel clockOutTimeUpdateReq)
        {
           ResponseViewModal res = new ResponseViewModal();
           using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                   if (clockOutTimeUpdateReq.ID > 0 && clockOutTimeUpdateReq.AgencyID > 0)
                    {
                        long id = 0;
                        clockOutTimeUpdateReq.ClockInTime = clockOutTimeUpdateReq.ClockInTime;
                        TeacherDailyAttendence teacherDailyAttendanceObj = null;

                        teacherDailyAttendanceObj = _teacherDailyAttendenceRepository.Get(x => x.Id == clockOutTimeUpdateReq.ID && !x.IsDeleted);
                        if (!ReferenceEquals(teacherDailyAttendanceObj, null))
                        {
                            var newClockIn = new DateTime(teacherDailyAttendanceObj.ClockIn.Year, teacherDailyAttendanceObj.ClockIn.Month, teacherDailyAttendanceObj.ClockIn.Day,
                                clockOutTimeUpdateReq.ClockInTime.Hour, clockOutTimeUpdateReq.ClockInTime.Minute, clockOutTimeUpdateReq.ClockInTime.Second);

                            teacherDailyAttendanceObj.ClockIn = newClockIn;
                            id = teacherDailyAttendanceObj.Id;
                            _teacherDailyAttendenceRepository.SaveChanges();
                        }

                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Successfully Update Clock In time";
                        res.SaveId = id;
                    }
                    else
                    {
                        res.IsSuccess = true;
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter";
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
    }
}
