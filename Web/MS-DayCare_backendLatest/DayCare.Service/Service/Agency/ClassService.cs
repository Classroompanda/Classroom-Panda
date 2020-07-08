using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Agency;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Entity.Agency;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.IO;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Model.Master;

namespace DayCare.Service.Service.Agency
{
    public class ClassService : IClassService
    {
        public DataContext _dataContext;
        public IClassesRepository _classesRepository;
        public IStudentAgeCategoriesRepository _studentAgeCategoriesRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IClassAttendenceRepository _classAttendenceRepository;
        public IClassStatusRepository _classStatusRepository;
        public IFeePaymentTypeRepository _feePaymentTypeRepository;
        public IClassCategoryRepository _classCategoryRepository;
        public IClassAssignmentLogRepository _classAssignmentLogRepository;
        public ITeacherInfoRepository _teacherInfoRepository;
        public IStudentRepository _studentRepository;
        public IParentStudentMappingRepository _parentStudentMappingRepository;

        public ClassService(DataContext dataContext,
           IClassesRepository classesRepository,
           IStudentAgeCategoriesRepository studentAgeCategoriesRepository,
           IClassEnrollmentRepository classEnrollmentRepository,
           IClassStatusRepository classStatusRepository,
           IFeePaymentTypeRepository feePaymentTypeRepository,
           IClassCategoryRepository classCategoryRepository,
           IClassAssignmentLogRepository classAssignmentLogRepository,
           ITeacherInfoRepository teacherInfoRepository,
           IClassAttendenceRepository classAttendenceRepository,
           IStudentRepository studentRepository,
           IParentStudentMappingRepository parentStudentMappingRepository
           )
        {
            _dataContext = dataContext;
            _classesRepository = classesRepository;
            _studentAgeCategoriesRepository = studentAgeCategoriesRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _classStatusRepository = classStatusRepository;
            _feePaymentTypeRepository = feePaymentTypeRepository;
            _classCategoryRepository = classCategoryRepository;
            _classAssignmentLogRepository = classAssignmentLogRepository;
            _teacherInfoRepository = teacherInfoRepository;
            _classAttendenceRepository = classAttendenceRepository;
            _studentRepository = studentRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
        }

        public ResponseViewModal GetAllClasses(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllClassesRequest.AgencyID != null && getAllClassesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.ClassEndDate > DateTime.Now.Date);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();
                    List<ClassesViewModel> allClasses = new List<ClassesViewModel>();

                    allClasses = (from ClassObj in selectedClasses
                                  join classCategoryObj in selectedClassCategory on ClassObj.CategoryId equals classCategoryObj.Id
                                  join feePaymentTypeObj in feePaymentType on ClassObj.FeeTypeId equals feePaymentTypeObj.Id
                                  where (!ClassObj.IsDeleted && getAllClassesRequest.AgencyID == ClassObj.AgencyID)
                                  select new ClassesViewModel()
                                  {
                                      Id = ClassObj.Id,
                                      ClassesID = ClassObj.Id,
                                      AgencyID = ClassObj.AgencyID,
                                      ClassName = ClassObj.ClassName ?? String.Empty,
                                      CategoryId = ClassObj.CategoryId,
                                      CategoryName = classCategoryObj.CategoryName,
                                      ClassStatusId = ClassObj.ClassStatusId,
                                      EnrollCapacity = ClassObj.EnrollCapacity,
                                      MinAgeFrom = ClassObj.MinAgeFrom,
                                      MinAgeTo = ClassObj.MinAgeTo,
                                      MaxAgeFrom = ClassObj.MaxAgeFrom,
                                      MaxAgeTo = ClassObj.MaxAgeTo,
                                      AgeCutOffDate = ClassObj.AgeCutOffDate,
                                      RegistrationStartDate = ClassObj.RegistrationStartDate,
                                      ClassStartDate = ClassObj.ClassStartDate,
                                      ClassEndDate = ClassObj.ClassEndDate,
                                      StartTime = ClassObj.StartTime,
                                      EndTime = ClassObj.EndTime,
                                      Description = ClassObj.Description ?? String.Empty,
                                      Mon = ClassObj.Mon,
                                      Tue = ClassObj.Tue,
                                      Wed = ClassObj.Wed,
                                      Thu = ClassObj.Thu,
                                      Fri = ClassObj.Fri,
                                      Sat = ClassObj.Sat,
                                      Sun = ClassObj.Sun,
                                      OnGoing = ClassObj.OnGoing,
                                      Fees = ClassObj.Fees,
                                      FeeTypeId = ClassObj.FeeTypeId,
                                      FeeTypeName = feePaymentTypeObj.FeePaymentTypeName ?? String.Empty
                                  }).OrderBy(c => c.ClassName).ToList();

                    foreach (var i in allClasses)
                    {
                        i.EnrolledStudentCount = _classEnrollmentRepository.GetAll().Where(x => x.ClassesID == i.ClassesID && !x.IsDeleted && x.EnrollmentStatus == 2).Count();
                    }
                    res.Data = allClasses;
                    if (getAllClassesRequest.limit != 0)
                    {
                        res.Data = allClasses.Skip((getAllClassesRequest.page) * getAllClassesRequest.limit).Take(getAllClassesRequest.limit).ToList();
                    }
                    res.TotalRows = allClasses.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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


        public ResponseViewModal GetAllClassesForStudentAttendenceTransfer(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllClassesRequest.AgencyID != null && getAllClassesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.ClassEndDate > DateTime.Now.Date);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();
                    List<ClassesViewModel> allClasses = new List<ClassesViewModel>();
                    allClasses = (from ClassObj in selectedClasses
                                  join classCategoryObj in selectedClassCategory on ClassObj.CategoryId equals classCategoryObj.Id
                                  join feePaymentTypeObj in feePaymentType on ClassObj.FeeTypeId equals feePaymentTypeObj.Id
                                  where ClassObj.Id != getAllClassesRequest.ClassID &&
                                  (!ClassObj.IsDeleted && getAllClassesRequest.AgencyID == ClassObj.AgencyID)
                                  select new ClassesViewModel()
                                  {
                                      Id = ClassObj.Id,
                                      ClassesID = ClassObj.Id,
                                      AgencyID = ClassObj.AgencyID,
                                      ClassName = ClassObj.ClassName ?? String.Empty,
                                      CategoryId = ClassObj.CategoryId,
                                      CategoryName = classCategoryObj.CategoryName,
                                      ClassStatusId = ClassObj.ClassStatusId,
                                      EnrollCapacity = ClassObj.EnrollCapacity,
                                      MinAgeFrom = ClassObj.MinAgeFrom,
                                      MinAgeTo = ClassObj.MinAgeTo,
                                      MaxAgeFrom = ClassObj.MaxAgeFrom,
                                      MaxAgeTo = ClassObj.MaxAgeTo,
                                      AgeCutOffDate = ClassObj.AgeCutOffDate,
                                      RegistrationStartDate = ClassObj.RegistrationStartDate,
                                      ClassStartDate = ClassObj.ClassStartDate,
                                      ClassEndDate = ClassObj.ClassEndDate,
                                      StartTime = ClassObj.StartTime,
                                      EndTime = ClassObj.EndTime,
                                      Description = ClassObj.Description ?? String.Empty,
                                      Mon = ClassObj.Mon,
                                      Tue = ClassObj.Tue,
                                      Wed = ClassObj.Wed,
                                      Thu = ClassObj.Thu,
                                      Fri = ClassObj.Fri,
                                      Sat = ClassObj.Sat,
                                      Sun = ClassObj.Sun,
                                      OnGoing = ClassObj.OnGoing,
                                      Fees = ClassObj.Fees,
                                      FeeTypeId = ClassObj.FeeTypeId,
                                      FeeTypeName = feePaymentTypeObj.FeePaymentTypeName ?? String.Empty
                                  }).OrderBy(c => c.ClassName).ToList();
                    foreach (var i in allClasses)
                    {
                        i.EnrolledStudentCount = _classEnrollmentRepository.GetAll().Where(x => x.ClassesID == i.ClassesID && !x.IsDeleted && x.EnrollmentStatus == 2).Count();
                    }
                    res.Data = allClasses;
                    if (getAllClassesRequest.limit != 0)
                    {
                        res.Data = allClasses.Skip((getAllClassesRequest.page) * getAllClassesRequest.limit).Take(getAllClassesRequest.limit).ToList();
                    }
                    res.TotalRows = allClasses.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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

        public ResponseViewModal SaveClassInformation(ClassesViewModel saveClassInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long id = 0;
                Classes classObj = null;
                try
                {
                    if (saveClassInformationRequest.AgencyID > 0)
                    {
                        if (saveClassInformationRequest.AgencyID != 0 && saveClassInformationRequest.Id == 0)
                        {
                            IQueryable<Entity.Agency.Classes> classDetails = _classesRepository.GetAll().Where(Check => Check.AgencyID == saveClassInformationRequest.AgencyID && Check.IsDeleted == false);
                            string ClassNameSpace = saveClassInformationRequest.ClassName.TrimStart();
                            string ClassName = ClassNameSpace.TrimEnd();
                            var allDetails = (from CD in classDetails
                                              where CD.ClassName.TrimStart().TrimEnd().ToUpper() == ClassName.ToUpper() && CD.IsDeleted == false
                                              && CD.AgencyID == saveClassInformationRequest.AgencyID
                                              orderby CD.Id descending
                                              select new ClassesViewModel()
                                              {
                                                  ClassName = CD.ClassName
                                              }).ToList();

                            if (allDetails.Count > 0)
                            {
                                res.IsSuccess = true;
                                res.StatusCode = 900;
                                res.Message = "Class Name Allready Exist! ";
                                return res;
                            }
                            else
                            {
                                saveClassInformationRequest.LocationId = 1;
                                saveClassInformationRequest.RoomId = 1;//future Scope
                                saveClassInformationRequest.CreatedBy = saveClassInformationRequest.CreatedBy;
                                saveClassInformationRequest.CreatedDate = DateTime.UtcNow;
                                saveClassInformationRequest.IsActive = true;
                                saveClassInformationRequest.IsDeleted = false;
                                saveClassInformationRequest.ClassEndDate = saveClassInformationRequest.ClassEndDate.Date;
                                classObj = new Classes();
                                Mapper.Map(saveClassInformationRequest, classObj);
                                _classesRepository.Create(classObj);
                                _classesRepository.SaveChanges();
                                id = classObj.Id;
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                                res.Message = "Class Information has been saved.";
                            }

                        }
                        else if (saveClassInformationRequest.Id > 0)
                        {
                            classObj = _classesRepository.Get(x => x.Id == saveClassInformationRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classObj, null))
                            {
                                if (saveClassInformationRequest.IsDeleted == true)
                                {
                                    var classStudentCountObj = _classEnrollmentRepository.GetAll(x => x.ClassesID == saveClassInformationRequest.ClassesID && !x.IsDeleted && x.EnrollmentStatus == 2).ToList();

                                    var ClassAttendence = _classAttendenceRepository.GetAll(x => x.ClassesID == saveClassInformationRequest.ClassesID && !x.IsDeleted).ToList();

                                    if (classStudentCountObj.Count == 0 && ClassAttendence.Count == 0)
                                    {
                                        classObj.DeletedBy = saveClassInformationRequest.DeletedBy;
                                        classObj.IsDeleted = saveClassInformationRequest.IsDeleted;
                                        classObj.DeletedDate = saveClassInformationRequest.DeletedDate;
                                        _classesRepository.SaveChanges();

                                        res.IsSuccess = true;
                                        res.StatusCode = (long)HttpStatusCodes.OK;
                                        res.Message = "Class Information has been deleted.";
                                    }
                                    else
                                    {
                                        res.IsSuccess = false;
                                        res.StatusCode = 988;
                                        res.Message = "Students are assigned to this class.";
                                        return res;
                                    }
                                }
                                else
                                {
                                    classObj.AgencyID = saveClassInformationRequest.AgencyID;
                                    classObj.CategoryId = saveClassInformationRequest.CategoryId;
                                    classObj.ClassName = saveClassInformationRequest.ClassName;
                                    classObj.ClassStartDate = saveClassInformationRequest.ClassStartDate;
                                    classObj.ClassEndDate = saveClassInformationRequest.ClassEndDate;
                                    classObj.ClassStatusId = saveClassInformationRequest.ClassStatusId;
                                    classObj.Description = saveClassInformationRequest.Description;
                                    classObj.AgeCutOffDate = saveClassInformationRequest.AgeCutOffDate;
                                    classObj.EndTime = saveClassInformationRequest.EndTime;
                                    classObj.EnrollCapacity = saveClassInformationRequest.EnrollCapacity;
                                    classObj.Fees = saveClassInformationRequest.Fees;
                                    classObj.FeeTypeId = saveClassInformationRequest.FeeTypeId;
                                    classObj.MaxAgeFrom = saveClassInformationRequest.MaxAgeFrom;
                                    classObj.MaxAgeTo = saveClassInformationRequest.MaxAgeTo;
                                    classObj.MinAgeFrom = saveClassInformationRequest.MinAgeFrom;
                                    classObj.MinAgeTo = saveClassInformationRequest.MinAgeTo;
                                    classObj.OnGoing = saveClassInformationRequest.OnGoing;
                                    classObj.RegistrationStartDate = saveClassInformationRequest.RegistrationStartDate;
                                    classObj.StartTime = saveClassInformationRequest.StartTime;
                                    classObj.EndTime = saveClassInformationRequest.EndTime;
                                    classObj.Mon = saveClassInformationRequest.Mon;
                                    classObj.Tue = saveClassInformationRequest.Tue;
                                    classObj.Wed = saveClassInformationRequest.Wed;
                                    classObj.Thu = saveClassInformationRequest.Thu;
                                    classObj.Fri = saveClassInformationRequest.Fri;
                                    classObj.Sat = saveClassInformationRequest.Sat;
                                    classObj.UpdatedBy = saveClassInformationRequest.UpdatedBy;
                                    classObj.UpdatedDate = DateTime.UtcNow;
                                    classObj.LocationId = saveClassInformationRequest.LocationId;
                                    classObj.RoomId = saveClassInformationRequest.RoomId;
                                    _classesRepository.SaveChanges();
                                    id = classObj.Id;

                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    res.Message = "Class Information has been updated.";
                                }
                            }
                            daycaredb.Commit();
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetParticularClassDetails(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllClassesRequest.AgencyID != null && getAllClassesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.ClassEndDate > DateTime.Now.Date);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();
                    List<ClassesViewModel> allClasses = new List<ClassesViewModel>();
                    allClasses = (from ClassObj in selectedClasses
                                  join classCategoryObj in selectedClassCategory on ClassObj.CategoryId equals classCategoryObj.Id
                                  where (!ClassObj.IsDeleted && getAllClassesRequest.AgencyID == ClassObj.AgencyID && getAllClassesRequest.ClassID == ClassObj.Id)
                                  select new ClassesViewModel()
                                  {
                                      Id = ClassObj.Id,
                                      ClassesID = ClassObj.Id,
                                      AgencyID = ClassObj.AgencyID,
                                      ClassName = ClassObj.ClassName ?? String.Empty,
                                      CategoryId = ClassObj.CategoryId,
                                      CategoryName = classCategoryObj.CategoryName,
                                      ClassStatusId = ClassObj.ClassStatusId,
                                      EnrollCapacity = ClassObj.EnrollCapacity,
                                      MinAgeFrom = ClassObj.MinAgeFrom,
                                      MinAgeTo = ClassObj.MinAgeTo,
                                      MaxAgeFrom = ClassObj.MaxAgeFrom,
                                      MaxAgeTo = ClassObj.MaxAgeTo,
                                      AgeCutOffDate = ClassObj.AgeCutOffDate,
                                      RegistrationStartDate = ClassObj.RegistrationStartDate,
                                      ClassStartDate = ClassObj.ClassStartDate,
                                      ClassEndDate = ClassObj.ClassEndDate,
                                      StartTime = ClassObj.StartTime,
                                      EndTime = ClassObj.EndTime,
                                      Description = ClassObj.Description ?? String.Empty,
                                      Mon = ClassObj.Mon,
                                      Tue = ClassObj.Tue,
                                      Wed = ClassObj.Wed,
                                      Thu = ClassObj.Thu,
                                      Fri = ClassObj.Fri,
                                      Sat = ClassObj.Sat,
                                      Sun = ClassObj.Sun,
                                      OnGoing = ClassObj.OnGoing,
                                      Fees = ClassObj.Fees,
                                      FeeTypeId = ClassObj.FeeTypeId,
                                  }).OrderBy(c => c.ClassName).ToList();
                    res.Data = allClasses;
                    if (getAllClassesRequest.limit != 0)
                    {
                        res.Data = allClasses.Skip((getAllClassesRequest.page) * getAllClassesRequest.limit).Take(getAllClassesRequest.limit).ToList();
                    }
                    res.TotalRows = allClasses.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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



        public ResponseViewModal SaveClassAssignmentInformation(ClassAssignmentViewModel saveClassAssignmentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long id = 0;
                ClassAssignmentLog classAssignObj = null;
                try
                {
                    if (saveClassAssignmentInformationRequest.AgencyID > 0)
                    {
                        if (saveClassAssignmentInformationRequest.AgencyID != 0 && saveClassAssignmentInformationRequest.Id == 0)
                        {
                            classAssignObj = _classAssignmentLogRepository.Get(x => x.TeacherID == saveClassAssignmentInformationRequest.TeacherID && x.ClassesID == saveClassAssignmentInformationRequest.ClassesID && !x.IsDeleted);
                            if (ReferenceEquals(classAssignObj, null))
                            {
                                saveClassAssignmentInformationRequest.CreatedDate = DateTime.UtcNow;
                                saveClassAssignmentInformationRequest.IsActive = true;
                                saveClassAssignmentInformationRequest.IsDeleted = false;
                                saveClassAssignmentInformationRequest.ClassEnrollEndDate = saveClassAssignmentInformationRequest.ClassEnrollEndDate.Date;
                                classAssignObj = new ClassAssignmentLog();
                                Mapper.Map(saveClassAssignmentInformationRequest, classAssignObj);
                                _classAssignmentLogRepository.Create(classAssignObj);
                                _classAssignmentLogRepository.SaveChanges();
                                id = classAssignObj.Id;
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                                res.Message = "Class Assignment Information has been saved.";
                            }
                            else
                            {
                                res.StatusCode = 700; //status code for already exists.
                                res.Message = "Teacher is already assigned same class.";
                                res.IsSuccess = false;
                            }
                        }
                        else if (saveClassAssignmentInformationRequest.Id > 0)
                        {
                            classAssignObj = _classAssignmentLogRepository.Get(x => x.Id == saveClassAssignmentInformationRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classAssignObj, null))
                            {
                                if (saveClassAssignmentInformationRequest.IsDeleted == true)
                                {
                                    classAssignObj.IsDeleted = saveClassAssignmentInformationRequest.IsDeleted;
                                    classAssignObj.DeletedDate = DateTime.UtcNow;
                                    _classAssignmentLogRepository.SaveChanges();
                                }
                                else
                                {
                                    classAssignObj.AgencyID = saveClassAssignmentInformationRequest.AgencyID;
                                    classAssignObj.ClassEndTime = saveClassAssignmentInformationRequest.ClassEndTime;
                                    classAssignObj.ClassEnrollEndDate = saveClassAssignmentInformationRequest.ClassEnrollEndDate;
                                    classAssignObj.ClassEnrollStartDate = saveClassAssignmentInformationRequest.ClassEnrollStartDate;
                                    classAssignObj.ClassesID = saveClassAssignmentInformationRequest.ClassesID;
                                    classAssignObj.ClassStartTime = saveClassAssignmentInformationRequest.ClassStartTime;
                                    classAssignObj.TeacherID = saveClassAssignmentInformationRequest.TeacherID;
                                    classAssignObj.IsSwapped = saveClassAssignmentInformationRequest.IsSwapped;
                                    classAssignObj.ClassEnrollEndDate = saveClassAssignmentInformationRequest.ClassEnrollEndDate;
                                    classAssignObj.UpdatedDate = DateTime.UtcNow;
                                    _classAssignmentLogRepository.SaveChanges();
                                    id = classAssignObj.Id;
                                }
                            }
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Class Assignment Information has been updated.";
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        public ResponseViewModal GetAllClassAssignmentLog(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllClassesRequest.AgencyID != null && getAllClassesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.ClassAssignmentLog> selectedClassAssign = _classAssignmentLogRepository.GetAll().Where(classAssignCheck => classAssignCheck.AgencyID == getAllClassesRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.ClassEndDate > DateTime.Now.Date);
                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherInfoRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID);
                    List<ClassAssignmentViewModel> allClassesAssign = new List<ClassAssignmentViewModel>();

                    allClassesAssign = (from classAssignObj in selectedClassAssign
                                        join classObj in selectedClasses on classAssignObj.ClassesID equals classObj.Id
                                        join teacherObj in selectedTeacher on classAssignObj.TeacherID equals teacherObj.Id
                                        where (!classAssignObj.IsDeleted && getAllClassesRequest.AgencyID == classAssignObj.AgencyID)
                                        select new ClassAssignmentViewModel()
                                        {
                                            Id = classAssignObj.Id,
                                            ClassesID = classAssignObj.ClassesID,
                                            AgencyID = classAssignObj.AgencyID,
                                            ClassName = classObj.ClassName ?? String.Empty,
                                            TeacherID = classAssignObj.TeacherID,
                                            TeacherName = teacherObj.TeacherName ?? String.Empty,
                                            ClassStartDate = classObj.ClassStartDate,
                                            ClassEndDate = classObj.ClassEndDate,
                                            ClassStartTime = classObj.StartTime,
                                            ClassEndTime = classObj.EndTime,
                                            ClassEnrollEndDate = classAssignObj.ClassEnrollEndDate,
                                            ClassEnrollStartDate = classAssignObj.ClassEnrollStartDate
                                        }).OrderBy(c => c.ClassName).ToList();
                    res.Data = allClassesAssign;
                    if (getAllClassesRequest.limit != 0)
                    {
                        res.Data = allClassesAssign.Skip((getAllClassesRequest.page) * getAllClassesRequest.limit).Take(getAllClassesRequest.limit).ToList();
                    }
                    res.TotalRows = allClassesAssign.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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


        public ResponseViewModal UploadClassesWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM)
        {
            List<ClassesViewModel> rejectedClassInformationList = new List<ClassesViewModel>();
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var columnMap = new Dictionary<int, Action<string, ClassesViewModel>>
                    {
                        { 0, (x, model) => model.ClassName = x },
                        { 1, (x, model) => model.CategoryName = x },
                        { 2, (x, model) =>
                            {
                                var enrollCapc = 0L;

                                long.TryParse(x, out enrollCapc);

                                model.EnrollCapacity = enrollCapc;
                            }
                        },
                        {3, (x, model) =>
                            {
                                var localStartDate = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localStartDate);

                                model.ClassStartDate = localStartDate;
                            }
                        },
                        {4, (x, model) =>
                            {
                                var localEndDate = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localEndDate);

                                model.ClassEndDate = localEndDate.ToUniversalTime();
                            }
                        },
                        {5, (x, model) =>
                            {
                                var localStartTime = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "HH:mm", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localStartTime);

                                model.StartTime = localStartTime.ToUniversalTime();
                            }
                        },
                        {6, (x, model) =>
                            {
                                var localEndTime = Convert.ToDateTime(x);


                                DateTime.TryParseExact(x, "HH:mm", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localEndTime);

                                model.EndTime = localEndTime.ToUniversalTime();
                            }
                        },
                           { 7, (x, model) =>
                            {
                                var fess = 0L;

                                long.TryParse(x, out fess);

                                model.Fees = fess;
                            }
                        },

                            { 8, (x, model) => model.FeeTypeName = x },

                    };

                using (StreamReader streamReader = new StreamReader(file.OpenReadStream()))
                {

                    string line = streamReader.ReadLine();
                    var isFirstLine = true;
                    while (!string.IsNullOrEmpty(line))
                    {
                        if (isFirstLine)
                        {
                            isFirstLine = false;
                            line = streamReader.ReadLine();
                            continue;
                        }

                        var values = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                        var model = new ClassesViewModel();
                        foreach (var item in columnMap)
                        {
                            if (values.Length > item.Key)
                            {
                                item.Value(values[item.Key], model);
                            }
                        }

                        model.AgencyID = objCSVFILEREQVM.AgencyId;
                        model.CreatedBy = objCSVFILEREQVM.CreatedBy;
                        model.CategoryName = model.CategoryName.ToUpper().Trim();
                        Console.WriteLine(model.StartTime.ToUniversalTime());

                        if (model.CategoryName == "INFANT")
                        {
                            model.CategoryId = 1;
                        }
                        else if (model.CategoryName == "YOUNG TODDLER")
                        {
                            model.CategoryId = 2;
                        }
                        else if (model.CategoryName == "OLDER TODDLER")
                        {
                            model.CategoryId = 3;
                        }
                        else if (model.CategoryName == "PRESCHOOLER")
                        {
                            model.CategoryId = 4;
                        }
                        else if (model.CategoryName == "SCHOOL AGE")
                        {
                            model.CategoryId = 5;
                        }
                        else if (model.CategoryName == "DROP IN")
                        {
                            model.CategoryId = 6; // DROP IN CATEGORY
                        }
                        else
                        {
                            // INVALID CATEGORY NAME
                        }

                        model.FeeTypeName = model.FeeTypeName.ToUpper().Trim();
                        if (model.FeeTypeName == "WEEKLY")
                        {
                            model.FeeTypeId = 2;
                        }
                        else if (model.FeeTypeName == "MONTHLY")
                        {
                            model.FeeTypeId = 1;
                        }
                        else if (model.FeeTypeName == "ANNUALY")
                        {
                            model.FeeTypeId = 3; // Annulay paymewnt
                        }
                        else
                        {
                            // invalid fee type name
                        }


                        var response = SaveClassInformation(model);
                        if (response.StatusCode != (long)HttpStatusCodes.OK)
                        {
                            model.msg = "Class Already Exists";
                            rejectedClassInformationList.Add(model);
                            res.Data = rejectedClassInformationList;
                        }
                        line = streamReader.ReadLine();
                    }
                }

                if (rejectedClassInformationList.Count == 0)
                {
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.IsSuccess = true;
                    res.Data = string.Empty;
                }
                else if (rejectedClassInformationList.Count > 0)
                {
                    res.StatusCode = 987;
                    res.IsSuccess = false;
                    res.Data = rejectedClassInformationList;
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


        public ResponseViewModal ClassAssignmentUsingFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM)
        {
            List<ClassAssignmentViewModel> rejectedClassInformationList = new List<ClassAssignmentViewModel>();
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var columnMap = new Dictionary<int, Action<string, ClassAssignmentViewModel>>
                    {
                        { 0, (x, model) => model.ClassName = x },
                        { 1, (x, model) => model.Email = x },
                        {2, (x, model) =>
                            {
                                var localStartDate = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localStartDate);

                                model.ClassEnrollStartDate = localStartDate;
                            }
                        },
                        {3, (x, model) =>
                            {
                                var localEndDate = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localEndDate);

                                model.ClassEnrollEndDate = localEndDate;
                            }
                        }
                    };

                using (StreamReader streamReader = new StreamReader(file.OpenReadStream()))
                {

                    string line = streamReader.ReadLine();
                    var isFirstLine = true;
                    while (!string.IsNullOrEmpty(line))
                    {
                        if (isFirstLine)
                        {
                            isFirstLine = false;
                            line = streamReader.ReadLine();
                            continue;
                        }

                        var values = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                        var model = new ClassAssignmentViewModel();
                        foreach (var item in columnMap)
                        {
                            if (values.Length > item.Key)
                            {
                                item.Value(values[item.Key], model);
                            }
                            // Db operation
                        }

                        model.AgencyID = objCSVFILEREQVM.AgencyId;
                        model.CreatedBy = objCSVFILEREQVM.CreatedBy;
                        model.ClassName = model.ClassName.TrimStart();
                        model.ClassName = model.ClassName.TrimEnd();
                        model.Email = model.Email.TrimStart();
                        model.Email = model.Email.TrimEnd();
                        Classes classDetails = _classesRepository.GetFirstOrDefault(check => check.ClassName.ToUpper() == model.ClassName.ToUpper());
                        model.TeacherID = _teacherInfoRepository.GetFirstOrDefault(check => check.Email == model.Email).Id;
                        model.ClassesID = classDetails.Id;
                        model.ClassStartTime = classDetails.StartTime;
                        model.ClassEndTime = classDetails.EndTime;
                        model.ClassesID = classDetails.Id;

                        var response = SaveClassAssignmentInformation(model);
                        if (response.StatusCode != (long)HttpStatusCodes.OK)
                        {
                            model.message = "Class Already Assign To Teacher";
                            rejectedClassInformationList.Add(model);
                            res.Data = rejectedClassInformationList;
                        }
                        line = streamReader.ReadLine();
                    }
                }
                if (rejectedClassInformationList.Count == 0)
                {
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.IsSuccess = true;
                    res.Data = string.Empty;
                }
                else if (rejectedClassInformationList.Count > 0)
                {
                    res.StatusCode = 987;
                    res.IsSuccess = false;
                    res.Data = rejectedClassInformationList;
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

        public ResponseViewModal GetClassesByStudentID(ClassesViewModel getClassInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getClassInformationRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.ClassEnrollStartDate.Date <= DateTime.Now.Date && check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date
                    && check.AgencyID == getClassInformationRequest.AgencyID && check.EnrollmentStatus == 2 && check.StudentID == getClassInformationRequest.StudentID);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.ClassStartDate.Date <= DateTime.Now.Date && check.ClassEndDate.Date >= DateTime.Now.Date
                    && check.AgencyID == getClassInformationRequest.AgencyID);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    List<ClassesViewModel> allClasses = new List<ClassesViewModel>();

                    allClasses = (from ClassEnrollObj in selectedClassEnrollment
                                  join classObj in selectedClass on ClassEnrollObj.ClassesID equals classObj.Id
                                  join feePaymentTypeObj in feePaymentType on ClassEnrollObj.FeeTypeId equals feePaymentTypeObj.Id
                                  where (getClassInformationRequest.AgencyID == ClassEnrollObj.AgencyID)
                                  select new ClassesViewModel()
                                  {
                                      ClassesID = classObj.Id,
                                      ClassName = classObj.ClassName ?? String.Empty,
                                      ClassStartDate = classObj.ClassStartDate,
                                      ClassEndDate = classObj.ClassEndDate,
                                      FeeTypeId = ClassEnrollObj.FeeTypeId,
                                      FeeTypeName = feePaymentTypeObj.FeePaymentTypeName ?? String.Empty,
                                      EnrollStartDate = ClassEnrollObj.ClassEnrollStartDate,
                                      EnrollEndDate = ClassEnrollObj.ClassEnrollEndDate,
                                      Fees = ClassEnrollObj.Fees,
                                      ClassEnrollmentsID = ClassEnrollObj.Id
                                  }).OrderBy(c => c.ClassName).ToList();

                    res.Data = allClasses;
                    if (getClassInformationRequest.limit != 0)
                    {
                        res.Data = allClasses.Skip((getClassInformationRequest.page) * getClassInformationRequest.limit).Take(getClassInformationRequest.limit).ToList();
                    }
                    res.TotalRows = allClasses.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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

        public ResponseViewModal GetFeeType(FeeTypeViewModel feeTypeViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (feeTypeViewModel.AgencyID > 0)
                {
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    List<FeeTypeViewModel> allFeeType = new List<FeeTypeViewModel>();

                    allFeeType = (from FeeTypeObj in feePaymentType
                                  where (FeeTypeObj.IsDeleted == false)
                                  select new FeeTypeViewModel()
                                  {
                                      FeeTypeId = FeeTypeObj.Id,
                                      FeeTypeName = FeeTypeObj.FeePaymentTypeName ?? String.Empty,
                                  }).OrderBy(c => c.Id).ToList();

                    res.Data = allFeeType;
                    res.TotalRows = allFeeType.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Fee Type Information is successfully fetched.";
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

        public ResponseViewModal GetAllClassesForParent(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllClassesRequest.AgencyID != null && getAllClassesRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == getAllClassesRequest.AgencyID && Check.IsDeleted == false);
                    IQueryable<Entity.Parent.ParentStudentMapping> parentStudentMapping = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getAllClassesRequest.AgencyID && !Check.IsDeleted && Check.ParentID == getAllClassesRequest.ParentID);
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassEnrollEndDate >= DateTime.Now
                    && classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.EnrollmentStatus == 2);                   
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllClassesRequest.AgencyID && classCheck.ClassEndDate > DateTime.Now.Date);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();
                    List<ClassesViewModel> allClasses = new List<ClassesViewModel>();

                    allClasses = (from StudentObj in selectedStudent
                                  join parentStudentMappingObj in parentStudentMapping on StudentObj.Id equals parentStudentMappingObj.StudentID
                                  join ClassEnrollmentObj in classEnrollment on parentStudentMappingObj.StudentID equals ClassEnrollmentObj.StudentID
                                  join ClassObj in selectedClasses on ClassEnrollmentObj.ClassesID equals ClassObj.Id
                                  join classCategoryObj in selectedClassCategory on ClassObj.CategoryId equals classCategoryObj.Id
                                  join feePaymentTypeObj in feePaymentType on ClassObj.FeeTypeId equals feePaymentTypeObj.Id
                                  where (!ClassObj.IsDeleted && getAllClassesRequest.AgencyID == ClassObj.AgencyID)
                                  select new ClassesViewModel()
                                  {
                                      Id = ClassObj.Id,
                                      ClassesID = ClassObj.Id,
                                      AgencyID = ClassObj.AgencyID,
                                      ClassName = ClassObj.ClassName ?? String.Empty,
                                      CategoryId = ClassObj.CategoryId,
                                      CategoryName = classCategoryObj.CategoryName,
                                      ClassStatusId = ClassObj.ClassStatusId,
                                      EnrollCapacity = ClassObj.EnrollCapacity,
                                      MinAgeFrom = ClassObj.MinAgeFrom,
                                      MinAgeTo = ClassObj.MinAgeTo,
                                      MaxAgeFrom = ClassObj.MaxAgeFrom,
                                      MaxAgeTo = ClassObj.MaxAgeTo,
                                      AgeCutOffDate = ClassObj.AgeCutOffDate,
                                      RegistrationStartDate = ClassObj.RegistrationStartDate,
                                      ClassStartDate = ClassObj.ClassStartDate,
                                      ClassEndDate = ClassObj.ClassEndDate,
                                      StartTime = ClassObj.StartTime,
                                      EndTime = ClassObj.EndTime,
                                      Description = ClassObj.Description ?? String.Empty,
                                      Mon = ClassObj.Mon,
                                      Tue = ClassObj.Tue,
                                      Wed = ClassObj.Wed,
                                      Thu = ClassObj.Thu,
                                      Fri = ClassObj.Fri,
                                      Sat = ClassObj.Sat,
                                      Sun = ClassObj.Sun,
                                      OnGoing = ClassObj.OnGoing,
                                      Fees = ClassObj.Fees,
                                      FeeTypeId = ClassObj.FeeTypeId,
                                      FeeTypeName = feePaymentTypeObj.FeePaymentTypeName ?? String.Empty
                                  }).OrderBy(c => c.ClassName).ToList();

                    foreach (var i in allClasses)
                    {
                        i.EnrolledStudentCount = _classEnrollmentRepository.GetAll().Where(x => x.ClassesID == i.ClassesID && !x.IsDeleted && x.EnrollmentStatus == 2).Count();
                    }
                    res.Data = allClasses;
                    if (getAllClassesRequest.limit != 0)
                    {
                        res.Data = allClasses.Skip((getAllClassesRequest.page) * getAllClassesRequest.limit).Take(getAllClassesRequest.limit).ToList();
                    }
                    res.TotalRows = allClasses.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Class Information is successfully fetched.";
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




    }
}
