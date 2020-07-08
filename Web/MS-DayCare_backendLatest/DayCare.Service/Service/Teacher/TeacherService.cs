using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.Teachers;
using DayCare.Model.Teacher;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Entity.User;
using DayCare.Model.Common;
using DayCare.Entity.Agency;
using DayCare.Service.IService.Common;
using DayCare.Service.Service.Login;
using Microsoft.AspNetCore.Http;
using DayCare.Model.Agency;
using System.Globalization;
using System.IO;
using static DayCare.Service.Common.CommonEnum;
using Microsoft.Extensions.Configuration;
using DayCare.Service.Common;
using DayCare.Model.Student;

namespace DayCare.Service.Service.Teacher
{
    public class TeacherService : ITeacherService
    {
        #region Initialize Dependency
        private readonly ITeacherInfoRepository _teacherRepository;
        private readonly DataContext _dataContext;
        private readonly ITeacherClassAttendenceRepository _teacherClassAttendenceRepository;
        private readonly ITeacherBreakLogRepository _teacherBreakLogRepository;
        private readonly ITeacherDailyAttendenceRepository _teacherDailyAttendenceRepository;
        private readonly IClassAssignmentLogRepository _classAssignmentLogRepository;
        private readonly IClassesRepository _classesRepository;
        private readonly IClassEnrollmentRepository _classEnrollmentRepository;
        private readonly IStudentMedicationRepository _studentMedicationRepository;
        private readonly IStudentActivityMedicationRepository _studentActivityMedicationRepository;
        private readonly IBreakTypesRepository _breakTypesRepository;
        public IStudentRepository _studentRepository;
        public IDoseRepeatRepository _doseRepeatRepository;
        private readonly IUserRepository _userRepository;
        private readonly ITeacherAvailabilityRepository _teacherAvailabilityRepository;
        private readonly CommonMethods commonMethods = null;
        public IClassAttendenceRepository _classAttendenceRepository;


        private readonly IEventPlannerRepository _eventPlannerRepository;
        private readonly IInvolvedEventClassesRepository _involvedEventClassesRepository;
        string NewPassword = "";
        private readonly ICommonService _commonService;
        string DisplayMessage = "";
        private IConfiguration configuration;
        private readonly IStudentAllergiesRepository _studentAllergyRepository;
        private readonly IAllergyNameRepository _allergyNameRepository;
        private readonly IAllergyReactionTypeRepository _allergyReactionRepository;
        private readonly IAllergyTypeRepository _allergyTypeRepository;

        #endregion

        public TeacherService(ITeacherInfoRepository teacherRepository, DataContext dataContext
            , ITeacherClassAttendenceRepository teacherClassAttendenceRepository, ITeacherBreakLogRepository teacherBreakLogRepository,
            ITeacherDailyAttendenceRepository teacherDailyAttendenceRepository, IClassAssignmentLogRepository classAssignmentLogRepository, IClassesRepository classesRepository,
            IClassEnrollmentRepository classEnrollmentRepository, IStudentActivityMedicationRepository studentActivityMedicationRepository,
            IStudentMedicationRepository studentMedicationRepository, IStudentRepository studentRepository, IBreakTypesRepository breakTypesRepository
            , IDoseRepeatRepository doseRepeatRepository, IUserRepository userRepository, ITeacherAvailabilityRepository teacherAvailabilityRepository,
            IEventPlannerRepository eventPlannerRepository, IInvolvedEventClassesRepository involvedEventClassesRepository,
            ICommonService commonService, IConfiguration iConfig, IStudentAllergiesRepository studentAllergyRepository, IAllergyTypeRepository allergyTypeRepository , 
            IAllergyReactionTypeRepository allergyReactionTypeRepository , IAllergyNameRepository allergyNameRepository, IClassAttendenceRepository classAttendenceRepository
            )
        {
            _teacherRepository = teacherRepository;
            _dataContext = dataContext;
            _teacherClassAttendenceRepository = teacherClassAttendenceRepository;
            _teacherBreakLogRepository = teacherBreakLogRepository;
            _teacherDailyAttendenceRepository = teacherDailyAttendenceRepository;
            _classAssignmentLogRepository = classAssignmentLogRepository;
            _classesRepository = classesRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _studentActivityMedicationRepository = studentActivityMedicationRepository;
            _studentMedicationRepository = studentMedicationRepository;
            _studentRepository = studentRepository;
            _breakTypesRepository = breakTypesRepository;
            _doseRepeatRepository = doseRepeatRepository;
            _userRepository = userRepository;
            _teacherAvailabilityRepository = teacherAvailabilityRepository;
            _eventPlannerRepository = eventPlannerRepository;
            _involvedEventClassesRepository = involvedEventClassesRepository;
            _commonService = commonService;
            configuration = iConfig;
            commonMethods = new CommonMethods();
            _studentAllergyRepository = studentAllergyRepository;
            _allergyNameRepository = allergyNameRepository;
            _allergyReactionRepository = allergyReactionTypeRepository;
            _allergyTypeRepository = allergyTypeRepository;
            _classAttendenceRepository = classAttendenceRepository;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="getAllTeachersRequest"></param>
        /// <returns></returns>
        public ResponseViewModal GetAllTeachers(TeacherRequestViewModel getAllTeachersRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllTeachersRequest.AgencyID > 0)
                {
                    List<TeachersDetailsViewModel> allTeachers = new List<TeachersDetailsViewModel>();
                    var teacherCollection = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID);
                    allTeachers = (from teachersObj in teacherCollection
                                   where (!teachersObj.IsDeleted)
                                   select new TeachersDetailsViewModel
                                   {
                                       Id = teachersObj.Id,
                                       TeacherName = teachersObj.TeacherName ?? String.Empty,
                                       AgencyID = teachersObj.AgencyID,
                                       UserID = teachersObj.UserID,
                                       FirstName = teachersObj.FirstName ?? String.Empty,
                                       LastName = teachersObj.LastName ?? String.Empty,
                                       ImagePath = teachersObj.ImagePath ?? String.Empty,
                                       PositionTypeID = teachersObj.PositionTypeID,
                                       TeacherStatusID = teachersObj.TeacherStatusID,
                                       Email = teachersObj.Email ?? String.Empty,
                                       CreatedBy = teachersObj.CreatedBy ?? 0,
                                       CreatedDate = teachersObj.CreatedDate ?? DateTime.MinValue,
                                       UpdatedBy = teachersObj.UpdatedBy ?? 0,
                                       UpdatedDate = teachersObj.UpdatedDate ?? DateTime.MinValue,
                                       DeletedBy = teachersObj.DeletedBy ?? 0,
                                       DeletedDate = teachersObj.DeletedDate ?? DateTime.MinValue
                                   }).OrderBy(c => c.TeacherName).ToList();
                    res.Data = allTeachers;
                    if (getAllTeachersRequest.limit != 0)
                    {
                        res.Data = allTeachers.Skip((getAllTeachersRequest.page - 1) * getAllTeachersRequest.limit).Take(getAllTeachersRequest.limit).ToList();
                    }
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Teahers list has been feteched";
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
        public ResponseViewModal GetTeacherInformation(TeacherRequestViewModel getTeacherInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getTeacherInformationRequest.AgencyID > 0 && getTeacherInformationRequest.TeacherID > 0)
                {
                    TeachersDetailsViewModel teachersInformation = new TeachersDetailsViewModel();
                    var teacherCollection = _teacherRepository.GetAll().Where(check => check.AgencyID == getTeacherInformationRequest.AgencyID
                    && check.Id == getTeacherInformationRequest.TeacherID);
                    teachersInformation = (from teachersObj in teacherCollection
                                           where (!teachersObj.IsDeleted)
                                           select new TeachersDetailsViewModel
                                           {
                                               Id = teachersObj.Id,
                                               TeacherName = teachersObj.TeacherName ?? String.Empty,
                                               AgencyID = teachersObj.AgencyID,
                                               UserID = teachersObj.UserID,
                                               FirstName = teachersObj.FirstName ?? String.Empty,
                                               LastName = teachersObj.LastName ?? String.Empty,
                                               GenderID = teachersObj.GenderID,
                                               DateOfBirth = teachersObj.DateOfBirth,
                                               ImagePath = teachersObj.ImagePath ?? String.Empty,
                                               PositionTypeID = teachersObj.PositionTypeID,
                                               TeacherStatusID = teachersObj.TeacherStatusID,
                                               DateHired = teachersObj.DateHired,
                                               Email = teachersObj.Email ?? String.Empty,
                                               Address = teachersObj.Address ?? String.Empty,
                                               CountryId = teachersObj.CountryId,
                                               StateId = teachersObj.StateId,
                                               CityId = teachersObj.CityId,
                                               Certification = teachersObj.Certification ?? String.Empty,
                                               PostalCode = teachersObj.PostalCode ?? String.Empty,
                                               PhoneNumber = teachersObj.PhoneNumber,
                                               HomePhone = teachersObj.HomePhone,
                                               GrossPayPerHour = teachersObj.GrossPayPerHour,
                                               CreatedBy = teachersObj.CreatedBy ?? 0,
                                               CreatedDate = teachersObj.CreatedDate ?? DateTime.MinValue,
                                               UpdatedBy = teachersObj.UpdatedBy ?? 0,
                                               UpdatedDate = teachersObj.UpdatedDate ?? DateTime.MinValue,
                                               DeletedBy = teachersObj.DeletedBy ?? 0,
                                               DeletedDate = teachersObj.DeletedDate ?? DateTime.MinValue,
                                               MPhoneNumber = teachersObj.MPhoneNumber ?? String.Empty,
                                               MHomePhone = teachersObj.MHomePhone ?? String.Empty
                                           }).OrderBy(c => c.TeacherName).FirstOrDefault();
                    res.Data = teachersInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Teacher information has been feteched";
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
        public ResponseViewModal SaveTeacherDetails(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                    if (saveTeacherDetailsRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long userid = 0;
                        Users userObj = new Users();
                        TeacherInfo teacherObj = null;

                        if (saveTeacherDetailsRequest.Email != null)
                        {
                            string EmailIdSpace = saveTeacherDetailsRequest.Email.TrimStart();
                            string Email = EmailIdSpace.TrimEnd();

                            // saveTeacherDetailsRequest.Email = saveTeacherDetailsRequest.Email.Trim();
                        }                            

                        if (saveTeacherDetailsRequest.AgencyID > 0 && saveTeacherDetailsRequest.Id == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveTeacherDetailsRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveTeacherDetailsRequest.LastName ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else
                            {
                                string EmailIdSpace = saveTeacherDetailsRequest.Email.TrimStart();
                                string Email = EmailIdSpace.TrimEnd();

                                IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == Email.ToUpper());
                                if (selectedUser.GetEnumerator().MoveNext() == false)
                                {
                                    userObj.UserName = saveTeacherDetailsRequest.FirstName + ' ' + saveTeacherDetailsRequest.LastName;
                                    userObj.FirstName = saveTeacherDetailsRequest.FirstName;
                                    userObj.LastName = saveTeacherDetailsRequest.LastName;
                                    userObj.PhoneNumber = saveTeacherDetailsRequest.PhoneNumber;
                                    userObj.EmailAddress = saveTeacherDetailsRequest.Email;
                                    userObj.AgencyID = saveTeacherDetailsRequest.AgencyID;
                                    userObj.IsActive = true;
                                    userObj.IsDeleted = false;
                                    userObj.CreatedDate = DateTime.UtcNow;
                                    userObj.RoleId = 3;
                                    NewPassword = _commonService.GeneratePassword();
                                    //userObj.Password = NewPassword;
                                    userObj.Password = Crypto.HashPassword(NewPassword);
                                    _userRepository.Create(userObj);
                                    _userRepository.SaveChanges();
                                    userid = userObj.Id;
                                    if (userid > 0)
                                    {
                                        saveTeacherDetailsRequest.TeacherName = saveTeacherDetailsRequest.FirstName + " " + saveTeacherDetailsRequest.LastName;
                                        
                                        saveTeacherDetailsRequest.CreatedDate = DateTime.UtcNow;
                                        saveTeacherDetailsRequest.UserID = userid;
                                        saveTeacherDetailsRequest.IsActive = true;
                                        saveTeacherDetailsRequest.IsDeleted = false;
                                        teacherObj = new TeacherInfo();
                                        Mapper.Map(saveTeacherDetailsRequest, teacherObj);
                                        _teacherRepository.Create(teacherObj);
                                        _teacherRepository.SaveChanges();
                                        id = teacherObj.Id;
                                    }
                                    if (userid > 0 && id > 0)
                                    {
                                        //var encodedUserId = commonMethods.Encryption(userid);
                                        var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/><p> Welcome to Classroom Panda!<p><br/><p>Your User Name:</p><b> " + userObj.EmailAddress + "</b> <br> <p>Please click below the link to create your password</p> <b><a href = '" + url + "/" + userid + "'> Create Your Password </a> </b> " + "</b><br><p> Thanks.</p>";
                                        _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", message);

                                        // _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", "Hello,<br/>Welcome to Classroom Panda!<br/>Your Login Credentials are User Name :<b> " + userObj.EmailAddress + "</b> and Password : <b>" + NewPassword + "</b><br> Thanks.");
                                    }
                                    DisplayMessage = "Teacher Information has been saved.";
                                    daycaredb.Commit();
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                }
                                else
                                {
                                    res.StatusCode = 986;
                                    DisplayMessage = "User Already Exist.";
                                    res.IsSuccess = false;
                                }
                            }
                        }
                        else if (saveTeacherDetailsRequest.Id > 0 && saveTeacherDetailsRequest.IsDeleted == true)
                        {
                            teacherObj = _teacherRepository.Get(x => x.Id == saveTeacherDetailsRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == teacherObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(teacherObj, null) && !ReferenceEquals(userObj, null))
                            {
                                userObj.IsDeleted = saveTeacherDetailsRequest.IsDeleted;
                                userObj.DeletedBy = saveTeacherDetailsRequest.DeletedBy;
                                userObj.DeletedDate = saveTeacherDetailsRequest.DeletedDate;
                                teacherObj.IsDeleted = saveTeacherDetailsRequest.IsDeleted;
                                teacherObj.DeletedBy = saveTeacherDetailsRequest.DeletedBy;
                                teacherObj.DeletedDate = saveTeacherDetailsRequest.DeletedDate;
                                _teacherRepository.SaveChanges();
                                _userRepository.SaveChanges();
                                DisplayMessage = "Teacher Information has been deleted.";
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveTeacherDetailsRequest.Id > 0)
                        {
                            teacherObj = _teacherRepository.Get(x => x.Id == saveTeacherDetailsRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == teacherObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(teacherObj, null))
                            {
                                if (string.IsNullOrWhiteSpace(saveTeacherDetailsRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveTeacherDetailsRequest.LastName ?? string.Empty))
                                {
                                    res.StatusCode = 205;//code for blank space
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    teacherObj.TeacherName = saveTeacherDetailsRequest.FirstName + " " + saveTeacherDetailsRequest.LastName;
                                    teacherObj.AgencyID = saveTeacherDetailsRequest.AgencyID;
                                    teacherObj.FirstName = saveTeacherDetailsRequest.FirstName;
                                    teacherObj.LastName = saveTeacherDetailsRequest.LastName;
                                    teacherObj.GenderID = saveTeacherDetailsRequest.GenderID;
                                    teacherObj.DateOfBirth = saveTeacherDetailsRequest.DateOfBirth;
                                    teacherObj.ImagePath = saveTeacherDetailsRequest.ImagePath;
                                    teacherObj.PositionTypeID = saveTeacherDetailsRequest.PositionTypeID;
                                    teacherObj.TeacherStatusID = saveTeacherDetailsRequest.TeacherStatusID;
                                    teacherObj.DateHired = saveTeacherDetailsRequest.DateHired;
                                    teacherObj.Email = saveTeacherDetailsRequest.Email;
                                    teacherObj.Address = saveTeacherDetailsRequest.Address;
                                    teacherObj.CountryId = saveTeacherDetailsRequest.CountryId;
                                    teacherObj.StateId = saveTeacherDetailsRequest.StateId;
                                    teacherObj.CityId = saveTeacherDetailsRequest.CityId;
                                    teacherObj.Certification = saveTeacherDetailsRequest.Certification;
                                    teacherObj.PostalCode = saveTeacherDetailsRequest.PostalCode;
                                    teacherObj.PhoneNumber = saveTeacherDetailsRequest.PhoneNumber;
                                    teacherObj.HomePhone = saveTeacherDetailsRequest.HomePhone;
                                    teacherObj.GrossPayPerHour = saveTeacherDetailsRequest.GrossPayPerHour;
                                    teacherObj.MHomePhone = saveTeacherDetailsRequest.MHomePhone;
                                    teacherObj.MPhoneNumber = saveTeacherDetailsRequest.MPhoneNumber;
                                    teacherObj.IsDeleted = saveTeacherDetailsRequest.IsDeleted;
                                    teacherObj.UpdatedBy = saveTeacherDetailsRequest.UpdatedBy;
                                    teacherObj.UpdatedDate = saveTeacherDetailsRequest.UpdatedDate;
                                    teacherObj.DeletedBy = saveTeacherDetailsRequest.DeletedBy;
                                    teacherObj.DeletedDate = saveTeacherDetailsRequest.DeletedDate;
                                    userObj.FirstName = saveTeacherDetailsRequest.FirstName;
                                    userObj.LastName = saveTeacherDetailsRequest.LastName;
                                    userObj.UserName= saveTeacherDetailsRequest.FirstName + " " + saveTeacherDetailsRequest.LastName;
                                    _userRepository.SaveChanges();
                                    _teacherRepository.SaveChanges();
                                    id = teacherObj.Id;
                                    DisplayMessage = "Teacher Information has been updated.";
                                    daycaredb.Commit();
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                }

                            }
                        }
                        res.Message = DisplayMessage;
                        res.ReturnMessage.Add(DisplayMessage);
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

        public ResponseViewModal UpdateEmailForTeacher(TeachersDetailsViewModel updateTeacherEmailRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            TeacherInfo teacherObj = null;
            Users userObj = new Users();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (updateTeacherEmailRequest.AgencyID > 0 && (updateTeacherEmailRequest.Email != null || updateTeacherEmailRequest.Email != "")
                        && updateTeacherEmailRequest.Id > 0)
                    {
                        string EmailIdSpace = updateTeacherEmailRequest.Email.TrimStart();
                        string EmailId = EmailIdSpace.TrimEnd();

                        IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == EmailId.ToUpper());
                        if (selectedUser.GetEnumerator().MoveNext() == false)
                        {
                            teacherObj = _teacherRepository.Get(x => x.Id == updateTeacherEmailRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == teacherObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(teacherObj, null))
                            {
                                teacherObj.Email = updateTeacherEmailRequest.Email;
                                userObj.EmailAddress = updateTeacherEmailRequest.Email;
                                _userRepository.SaveChanges();
                                _teacherRepository.SaveChanges();
                                daycaredb.Commit();
                                string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Email Address Changed!</p> <br><p> Your New User Name /Email Address is :</p><b> " + userObj.EmailAddress + " </b><br/> <p>Thanks.</p></body></html>";
                                _commonService.SendEmailSync(userObj.EmailAddress, "Your Email/Username has been changed for Classroom Panda", message);

                                res.StatusCode = (long)HttpStatusCodes.OK;
                                res.Message = "Email Address has been updated successfully!";
                                res.IsSuccess = true;
                            }
                            else
                            {
                                res.StatusCode = 986;
                                res.Message = "User not found!";
                                res.IsSuccess = false;
                            }
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Email Already Exist!";
                            res.IsSuccess = false;
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Somthing Went wrong!";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                }
                return res;
            }
        }

        public ResponseViewModal GetTeacherDailyAttendence(TeacherDailyAttendenceRequestViewModel getTeacherDailyAttendenceRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getTeacherDailyAttendenceRequest.AgencyID > 0)
                    {
                        List<TeacherDailyAttendenceViewModel> teachersDailyAttendence = new List<TeacherDailyAttendenceViewModel>();
                        var selectedteachersDailyAttendence = _teacherDailyAttendenceRepository.GetAll().Where(check => check.AgencyID == getTeacherDailyAttendenceRequest.AgencyID
                        && check.AttendanceDate == getTeacherDailyAttendenceRequest.AskingDate && check.TeacherID == getTeacherDailyAttendenceRequest.TeacherID);
                        if (selectedteachersDailyAttendence != null && selectedteachersDailyAttendence.Count() > 0)
                        {
                            teachersDailyAttendence = (from teachersDailyAttendenceObj in selectedteachersDailyAttendence
                                                       where (!teachersDailyAttendenceObj.IsDeleted)
                                                       select new TeacherDailyAttendenceViewModel
                                                       {
                                                           Id = teachersDailyAttendenceObj.Id,
                                                           TeacherAttendenceStatusName = teachersDailyAttendenceObj.TeacherAttendenceStatusName,
                                                           AgencyID = teachersDailyAttendenceObj.AgencyID,
                                                           TeacherID = teachersDailyAttendenceObj.TeacherID,
                                                           ClockIn = teachersDailyAttendenceObj.ClockIn,
                                                           ClockOut = teachersDailyAttendenceObj.ClockOut,
                                                           AttendenceStatusID = teachersDailyAttendenceObj.AttendenceStatusID,
                                                           AttendanceDate = teachersDailyAttendenceObj.AttendanceDate,
                                                           OnLeave = teachersDailyAttendenceObj.OnLeave,
                                                           OnLeaveComment = teachersDailyAttendenceObj.OnLeaveComment,
                                                           DisableOnLeave = teachersDailyAttendenceObj.DisableOnLeave,
                                                           ReasonId = teachersDailyAttendenceObj.ReasonId
                                                       }).OrderBy(c => c.TeacherID).ToList();
                            res.Data = teachersDailyAttendence;
                            if (getTeacherDailyAttendenceRequest.limit != 0)
                            {
                                res.Data = teachersDailyAttendence.Skip((getTeacherDailyAttendenceRequest.page - 1) * getTeacherDailyAttendenceRequest.limit).Take(getTeacherDailyAttendenceRequest.limit).ToList();
                            }
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher Attendence has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher has not cloaked In Till now";
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
        public ResponseViewModal GetTeacherClassLog(TeacherDailyAttendenceRequestViewModel getTeacherClassLogRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getTeacherClassLogRequest.AgencyID > 0 && getTeacherClassLogRequest.TeacherID > 0)
                    {
                        List<TeacherClassAttendenceViewModel> teachersDailyAttendence = new List<TeacherClassAttendenceViewModel>();
                        List<TeacherClassAttendenceViewModel> newteachersDailyAttendence = new List<TeacherClassAttendenceViewModel>();
                        IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getTeacherClassLogRequest.AgencyID);

                        IQueryable<TeacherClassAttendence> selectedTeacherClassAttendence = _teacherClassAttendenceRepository.GetAll().Where(check => check.AgencyID == getTeacherClassLogRequest.AgencyID
                        && check.CreatedDate != null && check.CreatedDate.Value.Date == getTeacherClassLogRequest.AskingDate.Date
                        && check.TeacherID == getTeacherClassLogRequest.TeacherID);

                        IQueryable<Entity.Agency.ClassAssignmentLog> selectedclassAssignment = _classAssignmentLogRepository.GetAll().Where(check => check.AgencyID == getTeacherClassLogRequest.AgencyID
                        && check.ClassEnrollEndDate.Date >= getTeacherClassLogRequest.AskingDate.Date && check.ClassEnrollStartDate.Date <= getTeacherClassLogRequest.AskingDate.Date
                        && check.TeacherID == getTeacherClassLogRequest.TeacherID);

                        if (selectedclassAssignment != null && selectedclassAssignment.Count() > 0)
                        {
                            teachersDailyAttendence = (from classAssignmentObj in selectedclassAssignment                                                         
                                                       join teacherClassAttendenceprimeobj in selectedTeacherClassAttendence
                                                       on classAssignmentObj.Id equals teacherClassAttendenceprimeobj.ClassAssignmentLogID
                                                       into teacherClassAttendenceobj
                                                       from teacherClassAttendenceprimeobj in teacherClassAttendenceobj.DefaultIfEmpty()
                                                       join classesObj in classes on classAssignmentObj.ClassesID equals classesObj.Id
                                                       where (!classAssignmentObj.IsDeleted)
                                                       select new TeacherClassAttendenceViewModel
                                                       {
                                                           Id = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.Id : 0,
                                                           ClassAssignmentLogID = classAssignmentObj.Id,
                                                           AgencyID = classAssignmentObj.AgencyID,
                                                           TeacherID = classAssignmentObj.TeacherID,
                                                           ClassesID = classAssignmentObj.ClassesID,
                                                           ClassName = classesObj.ClassName,
                                                           CheckStatus = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckStatus : 0,
                                                           CheckInTime = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckInTime : DateTime.MinValue,
                                                           CheckOutTime = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckOutTime : DateTime.MinValue,
                                                           ClassStartTime = classAssignmentObj.ClassStartTime,
                                                           ClassEndTime = classAssignmentObj.ClassEndTime
                                                       }).OrderBy(c => c.ClassStartTime).ToList();


                            var filteredClassIds = teachersDailyAttendence.GroupBy(x => new { x.ClassAssignmentLogID, x.AgencyID, x.TeacherID, x.ClassesID, x.ClassName })
                                                    .Select(x => x.Max(p => p.Id));

                            newteachersDailyAttendence = (from x in teachersDailyAttendence
                                                          join y in filteredClassIds on x.Id equals y
                                                          select x).ToList();

                            var result = newteachersDailyAttendence.GroupBy(p => p.ClassAssignmentLogID).Select(p => p.First()).ToList();
                            for(int i =0; i< result.Count(); i++)
                            {
                                var count = _classAttendenceRepository.GetAll().Count(check => !check.IsDeleted && result[i].AgencyID == check.AgencyID 
                                && check.ClassesID == result[i].ClassesID && check.CheckInTime.Date == DateTime.Now.Date);

                                result[i].PresentStudentCount = count;
                            }

                            res.Data = result;
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher Attendence has been feteched";
                        }
                        else
                        {
                            res.Data = new List<TeacherClassAttendenceViewModel>();
                            res.StatusCode = (long)HttpStatusCodes.OK;                            
                            res.IsSuccess = false;
                            res.Message = "Teaher has not cloaked In Till now";
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
        public ResponseViewModal TeacherClockInClockOut(TeacherDailyAttendenceViewModel teacherClockInClockOutRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                    if (teacherClockInClockOutRequest.AgencyID > 0)
                    {
                        long id = 0;
                        TeacherDailyAttendence teacherObj = null;
                        if (teacherClockInClockOutRequest.AgencyID > 0 && teacherClockInClockOutRequest.Id == 0)
                        {                            
                            teacherClockInClockOutRequest.CreatedDate = DateTime.UtcNow;
                            teacherClockInClockOutRequest.TeacherAttendenceStatusName = teacherClockInClockOutRequest.AttendenceStatusID == 1 ? "Present" : "Left";
                            teacherClockInClockOutRequest.ClockOut = DateTime.MinValue;
                            teacherObj = new TeacherDailyAttendence();
                            Mapper.Map(teacherClockInClockOutRequest, teacherObj);
                            _teacherDailyAttendenceRepository.Create(teacherObj);
                            _teacherDailyAttendenceRepository.SaveChanges();
                            id = teacherObj.Id;
                        }
                        else if (teacherClockInClockOutRequest.Id > 0)
                        {
                            teacherObj = _teacherDailyAttendenceRepository.Get(x => x.Id == teacherClockInClockOutRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(teacherObj, null))
                            {
                                teacherObj.TeacherAttendenceStatusName = teacherClockInClockOutRequest.AttendenceStatusID == 1 ? "Present" : "Left";
                                teacherObj.AgencyID = teacherClockInClockOutRequest.AgencyID;
                                teacherObj.TeacherID = teacherClockInClockOutRequest.TeacherID;                               
                                teacherObj.ClockOut = teacherClockInClockOutRequest.ClockOut;
                                teacherObj.AttendenceStatusID = teacherClockInClockOutRequest.AttendenceStatusID;
                                teacherObj.AttendanceDate = teacherClockInClockOutRequest.AttendanceDate;
                                teacherObj.OnLeave = teacherClockInClockOutRequest.OnLeave;
                                teacherObj.OnLeaveComment = teacherClockInClockOutRequest.OnLeaveComment;
                                teacherObj.DisableOnLeave = teacherClockInClockOutRequest.DisableOnLeave;
                                teacherObj.ReasonId = teacherClockInClockOutRequest.ReasonId;

                                teacherObj.IsDeleted = teacherClockInClockOutRequest.IsDeleted;
                                teacherObj.UpdatedBy = teacherClockInClockOutRequest.UpdatedBy;
                                teacherObj.UpdatedDate = teacherClockInClockOutRequest.UpdatedDate;
                                teacherObj.DeletedBy = teacherClockInClockOutRequest.DeletedBy;
                                teacherObj.DeletedDate = teacherClockInClockOutRequest.DeletedDate;
                                _teacherDailyAttendenceRepository.SaveChanges();
                                id = teacherObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Teacher Information has been saved.";                       
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
        public ResponseViewModal TeacherCheckInCheckOut(TeacherClassAttendenceViewModel teacherCheckInCheckOutRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (teacherCheckInCheckOutRequest.AgencyID > 0)
                    {
                        long id = 0;
                        TeacherClassAttendence teacherClassAttendenceObj = null;
                        if (teacherCheckInCheckOutRequest.AgencyID > 0 && teacherCheckInCheckOutRequest.Id == 0)
                        {
                            
                            teacherCheckInCheckOutRequest.CreatedDate = DateTime.UtcNow;
                            teacherClassAttendenceObj = new TeacherClassAttendence();
                            Mapper.Map(teacherCheckInCheckOutRequest, teacherClassAttendenceObj);
                            _teacherClassAttendenceRepository.Create(teacherClassAttendenceObj);
                            _teacherClassAttendenceRepository.SaveChanges();
                            id = teacherClassAttendenceObj.Id;
                        }
                        else if (teacherCheckInCheckOutRequest.Id > 0)
                        {
                            teacherClassAttendenceObj = _teacherClassAttendenceRepository.Get(x => x.Id == teacherCheckInCheckOutRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(teacherClassAttendenceObj, null))
                            {
                                teacherClassAttendenceObj.AgencyID = teacherCheckInCheckOutRequest.AgencyID;
                                teacherClassAttendenceObj.TeacherID = teacherCheckInCheckOutRequest.TeacherID;
                                teacherClassAttendenceObj.TeacherDailyAttendenceID = teacherCheckInCheckOutRequest.TeacherDailyAttendenceID;
                                teacherClassAttendenceObj.ClassesID = teacherCheckInCheckOutRequest.ClassesID;
                                teacherClassAttendenceObj.CheckInTime = teacherCheckInCheckOutRequest.CheckInTime;
                                teacherClassAttendenceObj.CheckOutTime = teacherCheckInCheckOutRequest.CheckOutTime;
                                teacherClassAttendenceObj.CheckStatus = teacherCheckInCheckOutRequest.CheckStatus;
                                teacherCheckInCheckOutRequest.ClassAssignmentLogID = teacherCheckInCheckOutRequest.ClassAssignmentLogID;                                          
                                _teacherClassAttendenceRepository.SaveChanges();
                                id = teacherClassAttendenceObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Teacher Information has been saved.";
                        res.ReturnMessage.Add("Teacher Registered");
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
        public ResponseViewModal GetTeacherTodayMedicationTasks(TeacherTodayMedicationTasksRequestViewModel getTeacherTodayMedicationTasksRequest)
        {

            ResponseViewModal res = new ResponseViewModal();           
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                    if (getTeacherTodayMedicationTasksRequest.AgencyID > 0 && getTeacherTodayMedicationTasksRequest.TeacherID > 0 && getTeacherTodayMedicationTasksRequest.ClassID > 0)
                    {
                        List<TeacherTodayMedicationTasksViewModel> teacherTodayMedicationTasks = new List<TeacherTodayMedicationTasksViewModel>();
                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                        && check.ClassesID == getTeacherTodayMedicationTasksRequest.ClassID && check.EnrollmentStatus== 2);
                        IQueryable<Entity.Student.StudentMedication> selectedStudentMedication = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                        && check.StartDate.Date <= getTeacherTodayMedicationTasksRequest.AskingDate.Date && check.EndDate.Date >= getTeacherTodayMedicationTasksRequest.AskingDate.Date
                        );

                        IQueryable<Entity.Masters.DoseRepeat> selectedDoseRepeatType = _doseRepeatRepository.GetAll();//.Where(namecheck => namecheck.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);

                        IQueryable<Entity.Student.StudentActivityMedication> studentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);//&& check.StudentMedicationID != 0);

                        if (selectedStudentMedication != null && selectedStudentMedication.Count() > 0 && selectedStudentMedication != null && selectedStudentMedication.Count() > 0)
                        {
                            teacherTodayMedicationTasks = (from classEnrollmentObj in selectedClassEnrollment
                                                           join studentsObj in selectedStudents on classEnrollmentObj.StudentID equals studentsObj.Id
                                                           join studentMedicationObj in selectedStudentMedication on studentsObj.Id equals studentMedicationObj.StudentID

                                                           join doseRepeatTypeObj in selectedDoseRepeatType on studentMedicationObj.DoseRepeatID equals doseRepeatTypeObj.Id
                                                                                                                      
                                                           into studentActivityMedicationObj
                                                           from studentActivityMedicationPrimeObj in studentActivityMedicationObj.DefaultIfEmpty()

                                                           where (!classEnrollmentObj.IsDeleted && !studentsObj.IsDeleted && !studentMedicationObj.IsDeleted)
                                                           select new TeacherTodayMedicationTasksViewModel
                                                           {
                                                               StudentID = studentMedicationObj.StudentID,
                                                               StudentFirstName = studentsObj.FirstName,
                                                               StudentLastName = studentsObj.LastName,
                                                               StudentName = studentsObj.StudentName,
                                                               StudentMedicationID = studentMedicationObj.Id,
                                                               MedicationName = studentMedicationObj.MedicationName,
                                                               AgencyID = studentMedicationObj.AgencyID,
                                                               Units = studentMedicationObj.Units,
                                                               strength = studentMedicationObj.strength,
                                                               DoseRepeatID = studentMedicationObj.DoseRepeatID,
                                                               DoseRepeatName = studentActivityMedicationPrimeObj.DoseRepeatName,
                                                               DosageQuantityID = studentMedicationObj.DosageQuantityID,
                                                               HowTaken = studentMedicationObj.HowTaken,
                                                               OtherMedication = studentMedicationObj.OtherMedication,
                                                               StartDate = studentMedicationObj.StartDate,
                                                               EndDate = studentMedicationObj.EndDate,
                                                               StudentActivityMedicationID = studentActivityMedicationPrimeObj != null && studentActivityMedicationPrimeObj.Id > 0 ? studentActivityMedicationPrimeObj.Id : 0,
                                                               CreatedDate = studentActivityMedicationPrimeObj.CreatedDate,                                                              
                                                               isMedicationDone = false                                                              
                                                           }).OrderBy(c => c.StudentID).ToList();

                            foreach (var i in teacherTodayMedicationTasks)
                            {
                                var isdone = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                                                                    && check.StudentMedicationID == i.StudentMedicationID                                                                    
                                                                    ).OrderByDescending(x => x.CreatedDate).FirstOrDefault();
                                if (isdone != null && Convert.ToDateTime(isdone.CreatedDate).Date == getTeacherTodayMedicationTasksRequest.AskingDate.Date)
                                {
                                    i.isMedicationDone = true;
                                }
                            }
                            
                            res.Data = teacherTodayMedicationTasks.GroupBy(p => p.StudentMedicationID).Select(p => p.First()).ToList();

                            if (getTeacherTodayMedicationTasksRequest.limit != 0)
                            {
                                res.Data = teacherTodayMedicationTasks.Skip((getTeacherTodayMedicationTasksRequest.page - 1) * getTeacherTodayMedicationTasksRequest.limit).Take(getTeacherTodayMedicationTasksRequest.limit).ToList();
                            }
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teacher Today Medication Tasks has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Data = new List<TeacherTodayMedicationTasksViewModel>();
                            res.Message = "No Medication has been found.";
                        }
                    }
                    else if (getTeacherTodayMedicationTasksRequest.AgencyID > 0 && getTeacherTodayMedicationTasksRequest.TeacherID ==  0 && getTeacherTodayMedicationTasksRequest.ClassID > 0)
                    {
                        List<TeacherTodayMedicationTasksViewModel> teacherTodayMedicationTasks = new List<TeacherTodayMedicationTasksViewModel>();
                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                        && check.ClassesID == getTeacherTodayMedicationTasksRequest.ClassID && check.EnrollmentStatus == 2);
                        IQueryable<Entity.Student.StudentMedication> selectedStudentMedication = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                        && check.StartDate.Date <= getTeacherTodayMedicationTasksRequest.AskingDate.Date && check.EndDate.Date >= getTeacherTodayMedicationTasksRequest.AskingDate.Date
                        );

                        IQueryable<Entity.Masters.DoseRepeat> selectedDoseRepeatType = _doseRepeatRepository.GetAll();//.Where(namecheck => namecheck.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);

                        IQueryable<Entity.Student.StudentActivityMedication> studentActivityMedication = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID);//&& check.StudentMedicationID != 0);

                        if (selectedStudentMedication != null && selectedStudentMedication.Count() > 0 && selectedStudentMedication != null && selectedStudentMedication.Count() > 0)
                        {
                            teacherTodayMedicationTasks = (from classEnrollmentObj in selectedClassEnrollment
                                                           join studentsObj in selectedStudents on classEnrollmentObj.StudentID equals studentsObj.Id
                                                           join studentMedicationObj in selectedStudentMedication on studentsObj.Id equals studentMedicationObj.StudentID

                                                           join doseRepeatTypeObj in selectedDoseRepeatType on studentMedicationObj.DoseRepeatID equals doseRepeatTypeObj.Id
                                                                                                                      
                                                           into studentActivityMedicationObj
                                                           from studentActivityMedicationPrimeObj in studentActivityMedicationObj.DefaultIfEmpty()

                                                           where (!classEnrollmentObj.IsDeleted && !studentsObj.IsDeleted && !studentMedicationObj.IsDeleted)
                                                           select new TeacherTodayMedicationTasksViewModel
                                                           {
                                                               StudentID = studentMedicationObj.StudentID,
                                                               StudentFirstName = studentsObj.FirstName,
                                                               StudentLastName = studentsObj.LastName,
                                                               StudentName = studentsObj.StudentName,
                                                               StudentMedicationID = studentMedicationObj.Id,
                                                               MedicationName = studentMedicationObj.MedicationName,
                                                               AgencyID = studentMedicationObj.AgencyID,
                                                               Units = studentMedicationObj.Units,
                                                               strength = studentMedicationObj.strength,
                                                               DoseRepeatID = studentMedicationObj.DoseRepeatID,
                                                               DoseRepeatName = studentActivityMedicationPrimeObj.DoseRepeatName,
                                                               DosageQuantityID = studentMedicationObj.DosageQuantityID,
                                                               HowTaken = studentMedicationObj.HowTaken,
                                                               OtherMedication = studentMedicationObj.OtherMedication,
                                                               StartDate = studentMedicationObj.StartDate,
                                                               EndDate = studentMedicationObj.EndDate,
                                                               StudentActivityMedicationID = studentActivityMedicationPrimeObj != null && studentActivityMedicationPrimeObj.Id > 0 ? studentActivityMedicationPrimeObj.Id : 0,
                                                               CreatedDate = studentActivityMedicationPrimeObj.CreatedDate,                                                              
                                                               isMedicationDone = false                                                               
                                                           }).OrderBy(c => c.StudentID).ToList();

                            foreach (var i in teacherTodayMedicationTasks)
                            {
                                var isdone = _studentActivityMedicationRepository.GetAll().Where(check => check.AgencyID == getTeacherTodayMedicationTasksRequest.AgencyID
                                                                    && check.StudentMedicationID == i.StudentMedicationID                                                                   
                                                                    ).OrderByDescending(x => x.CreatedDate).FirstOrDefault();
                                if (isdone != null && Convert.ToDateTime(isdone.CreatedDate).Date == getTeacherTodayMedicationTasksRequest.AskingDate.Date)
                                {
                                    i.isMedicationDone = true;
                                }
                            }
                            res.Data = teacherTodayMedicationTasks.GroupBy(p => p.StudentMedicationID).Select(p => p.First()).ToList();
                            if (getTeacherTodayMedicationTasksRequest.limit != 0)
                            {
                                res.Data = teacherTodayMedicationTasks.Skip((getTeacherTodayMedicationTasksRequest.page - 1) * getTeacherTodayMedicationTasksRequest.limit).Take(getTeacherTodayMedicationTasksRequest.limit).ToList();
                            }
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teacher Today Medication Tasks has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Data = new List<TeacherTodayMedicationTasksViewModel>();
                            res.Message = "No Medication has been found.";
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


        public ResponseViewModal GetStudentAllergy(StudentAllergyRequestViewModel getStudentAllergyRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getStudentAllergyRequest.AgencyID > 0 && getStudentAllergyRequest.TeacherID > 0 && getStudentAllergyRequest.ClassID > 0)
                    {
                        List<StudentAllergiesViewModel> studentAllergiesForClass = new List<StudentAllergiesViewModel>();

                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getStudentAllergyRequest.AgencyID && namecheck.IsDeleted == false);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentAllergyRequest.AgencyID
                        && check.ClassesID == getStudentAllergyRequest.ClassID && check.EnrollmentStatus == 2 && check.ClassEnrollEndDate >= DateTime.Now);
                        IQueryable<Entity.Student.StudentAllergies> selectedStudentAllergy = _studentAllergyRepository.GetAll().Where(check => check.AgencyID == getStudentAllergyRequest.AgencyID
                        && check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyName> selectedAllergyNames = _allergyNameRepository.GetAll().Where(check => check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyReactionType> selectedAllergyReactionTypes = _allergyReactionRepository.GetAll().Where(check => check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyType> selectedAllergyTypes = _allergyTypeRepository.GetAll().Where(check => check.IsDeleted == false);

                        if (selectedStudentAllergy != null && selectedStudentAllergy.Count() > 0)
                        {
                            studentAllergiesForClass = (from classEnrollmentObj in selectedClassEnrollment
                                                        join studentsObj in selectedStudents on classEnrollmentObj.StudentID equals studentsObj.Id
                                                        join studentAllergyObj in selectedStudentAllergy on studentsObj.Id equals studentAllergyObj.StudentID
                                                        join allergyNameObj in selectedAllergyNames on studentAllergyObj.AllergyNameID equals allergyNameObj.Id
                                                        join allergyReactionTypeObj in selectedAllergyReactionTypes on studentAllergyObj.AllergyReactionTypeID equals allergyReactionTypeObj.Id
                                                        join allergyTypeObj in selectedAllergyTypes on studentAllergyObj.AllergyTypeID equals allergyTypeObj.Id

                                                        where (!classEnrollmentObj.IsDeleted && !studentsObj.IsDeleted && !studentAllergyObj.IsDeleted)
                                                        select new StudentAllergiesViewModel
                                                        {
                                                            StudentID = studentAllergyObj.StudentID,
                                                            StudentName = studentsObj.StudentName,
                                                            StudentAllergiesID = studentAllergyObj.Id,
                                                            AllergyReactionTypeID = studentAllergyObj.AllergyReactionTypeID,
                                                            AllergyReactionTypeName = allergyReactionTypeObj.AllergyReactionTypeName,
                                                            AllergyNameID = studentAllergyObj.AllergyNameID,
                                                            AllergyName = allergyNameObj.NameOfAllergy,
                                                            AgencyID = studentAllergyObj.AgencyID,
                                                            AllergyComment = studentAllergyObj.AllergyComment,
                                                            Treatment = studentAllergyObj.Treatment,
                                                            AllergyTypeID = studentAllergyObj.AllergyTypeID,
                                                            AllergyTypeName = allergyTypeObj.AllergyTypeName
                                                        }).OrderBy(c => c.StudentID).ToList();

                            res.Data = studentAllergiesForClass.GroupBy(p => p.StudentAllergiesID).Select(p => p.First()).ToList();

                            //if (getTeacherTodayMedicationTasksRequest.limit != 0)
                            //{
                            //    res.Data = teacherTodayMedicationTasks.Skip((getTeacherTodayMedicationTasksRequest.page - 1) * getTeacherTodayMedicationTasksRequest.limit).Take(getTeacherTodayMedicationTasksRequest.limit).ToList();
                            //}
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Students Allergies for class has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Data = new List<StudentAllergiesViewModel>();
                            res.Message = "No Allergy has been found.";
                        }
                    }
                    else if (getStudentAllergyRequest.AgencyID > 0 && getStudentAllergyRequest.TeacherID == 0 && getStudentAllergyRequest.ClassID > 0)
                    {
                        List<StudentAllergiesViewModel> studentAllergiesForClass = new List<StudentAllergiesViewModel>();

                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getStudentAllergyRequest.AgencyID && namecheck.IsDeleted == false);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentAllergyRequest.AgencyID
                        && check.ClassesID == getStudentAllergyRequest.ClassID && check.EnrollmentStatus == 2 && check.ClassEnrollEndDate >= DateTime.Now);
                        IQueryable<Entity.Student.StudentAllergies> selectedStudentAllergy = _studentAllergyRepository.GetAll().Where(check => check.AgencyID == getStudentAllergyRequest.AgencyID
                        && check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyName> selectedAllergyNames = _allergyNameRepository.GetAll().Where(check => check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyReactionType> selectedAllergyReactionTypes = _allergyReactionRepository.GetAll().Where(check => check.IsDeleted == false);
                        IQueryable<Entity.Masters.AllergyType> selectedAllergyTypes = _allergyTypeRepository.GetAll().Where(check => check.IsDeleted == false);

                        if (selectedStudentAllergy != null && selectedStudentAllergy.Count() > 0)
                        {
                            studentAllergiesForClass = (from classEnrollmentObj in selectedClassEnrollment
                                                        join studentsObj in selectedStudents on classEnrollmentObj.StudentID equals studentsObj.Id
                                                        join studentAllergyObj in selectedStudentAllergy on studentsObj.Id equals studentAllergyObj.StudentID
                                                        join allergyNameObj in selectedAllergyNames on studentAllergyObj.AllergyNameID equals allergyNameObj.Id
                                                        join allergyReactionTypeObj in selectedAllergyReactionTypes on studentAllergyObj.AllergyReactionTypeID equals allergyReactionTypeObj.Id
                                                        join allergyTypeObj in selectedAllergyTypes on studentAllergyObj.AllergyTypeID equals allergyTypeObj.Id

                                                        where (!classEnrollmentObj.IsDeleted && !studentsObj.IsDeleted && !studentAllergyObj.IsDeleted)
                                                        select new StudentAllergiesViewModel
                                                        {
                                                            StudentID = studentAllergyObj.StudentID,
                                                            StudentName = studentsObj.StudentName,
                                                            StudentAllergiesID = studentAllergyObj.Id,
                                                            AllergyReactionTypeID = studentAllergyObj.AllergyReactionTypeID,
                                                            AllergyReactionTypeName = allergyReactionTypeObj.AllergyReactionTypeName,
                                                            AllergyNameID = studentAllergyObj.AllergyNameID,
                                                            AllergyName = allergyNameObj.NameOfAllergy,
                                                            AgencyID = studentAllergyObj.AgencyID,
                                                            AllergyComment = studentAllergyObj.AllergyComment,
                                                            Treatment = studentAllergyObj.Treatment,
                                                            AllergyTypeID = studentAllergyObj.AllergyTypeID,
                                                            AllergyTypeName = allergyTypeObj.AllergyTypeName
                                                        }).OrderBy(c => c.StudentID).ToList();

                            res.Data = studentAllergiesForClass.GroupBy(p => p.StudentAllergiesID).Select(p => p.First()).ToList();

                            //if (getTeacherTodayMedicationTasksRequest.limit != 0)
                            //{
                            //    res.Data = teacherTodayMedicationTasks.Skip((getTeacherTodayMedicationTasksRequest.page - 1) * getTeacherTodayMedicationTasksRequest.limit).Take(getTeacherTodayMedicationTasksRequest.limit).ToList();
                            //}
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Students Allergies for class has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Data = new List<StudentAllergiesViewModel>();
                            res.Message = "No Allergy has been found.";
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

        public ResponseViewModal GetTeacherBreakLog(GetTeacherBreakLogRequestViewModel getTeacherBreakLogRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getTeacherBreakLogRequest.AgencyID > 0 && getTeacherBreakLogRequest.AskingDate != null)
                    {
                        List<TeacherBreakLogViewModel> teacherBreakLog = new List<TeacherBreakLogViewModel>();
                        IQueryable<TeacherBreakLog> selectBreakLog = _teacherBreakLogRepository.GetAll().Where(check => check.AgencyID == getTeacherBreakLogRequest.AgencyID                                            
                        && check.CreatedDate != null && check.CreatedDate.Value.Date == getTeacherBreakLogRequest.AskingDate.Date);

                        IQueryable<TeacherDailyAttendence> selectedAttendence = _teacherDailyAttendenceRepository.GetAll().Where(check => check.TeacherID == getTeacherBreakLogRequest.TeacherID);
                        if (selectBreakLog != null && selectBreakLog.Count() > 0)
                        {
                            teacherBreakLog = (from breakObj in selectBreakLog
                                               join attendObj in selectedAttendence on breakObj.TeacherDailyAttendenceID equals attendObj.Id
                                               where (!breakObj.IsDeleted)
                                               select new TeacherBreakLogViewModel
                                               {
                                                   Id = breakObj.Id,
                                                   AgencyID = breakObj.AgencyID,
                                                   BreakIn = breakObj.BreakIn,
                                                   BreakOut = breakObj.BreakOut,
                                                   TeacherDailyAttendenceID = breakObj.TeacherDailyAttendenceID,
                                                   BreakStatusID = breakObj.BreakStatusID,
                                                   BreakReason = breakObj.BreakReason
                                               }).OrderBy(c => c.BreakOut).ToList();
                            res.Data = teacherBreakLog;
                            if (getTeacherBreakLogRequest.limit != 0)
                            {
                                res.Data = selectBreakLog.Skip((getTeacherBreakLogRequest.page - 1) * getTeacherBreakLogRequest.limit).Take(getTeacherBreakLogRequest.limit).ToList();
                            }
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher Break Log has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher has taken any break till now";
                            res.Data = new List<TeacherBreakLogViewModel>();
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
        public ResponseViewModal TeacherBreakInBreakOut(TeacherBreakLogViewModel teacherBreakInBreakOutRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (teacherBreakInBreakOutRequest.AgencyID > 0)
                    {
                        long id = 0;
                        TeacherBreakLog teacherBreakLogObj = null;
                        if (teacherBreakInBreakOutRequest.AgencyID > 0 && teacherBreakInBreakOutRequest.Id == 0)
                        {                            
                            teacherBreakInBreakOutRequest.CreatedDate = DateTime.UtcNow;
                            teacherBreakLogObj = new TeacherBreakLog();
                            Mapper.Map(teacherBreakInBreakOutRequest, teacherBreakLogObj);
                            _teacherBreakLogRepository.Create(teacherBreakLogObj);
                            _teacherBreakLogRepository.SaveChanges();
                            id = teacherBreakLogObj.Id;
                        }
                        else if (teacherBreakInBreakOutRequest.Id > 0)
                        {
                            teacherBreakLogObj = _teacherBreakLogRepository.Get(x => x.Id == teacherBreakInBreakOutRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(teacherBreakLogObj, null))
                            {
                                teacherBreakLogObj.Id = teacherBreakInBreakOutRequest.Id;
                                teacherBreakLogObj.AgencyID = teacherBreakInBreakOutRequest.AgencyID;
                                teacherBreakLogObj.BreakIn = teacherBreakInBreakOutRequest.BreakIn;
                                teacherBreakLogObj.TeacherDailyAttendenceID = teacherBreakInBreakOutRequest.TeacherDailyAttendenceID;
                                teacherBreakLogObj.BreakStatusID = teacherBreakInBreakOutRequest.BreakStatusID;
                                teacherBreakLogObj.IsDeleted = teacherBreakInBreakOutRequest.IsDeleted;
                                teacherBreakLogObj.UpdatedBy = teacherBreakInBreakOutRequest.UpdatedBy;
                                teacherBreakLogObj.UpdatedDate = teacherBreakInBreakOutRequest.UpdatedDate;
                                teacherBreakLogObj.DeletedBy = teacherBreakInBreakOutRequest.DeletedBy;
                                teacherBreakLogObj.DeletedDate = teacherBreakInBreakOutRequest.DeletedDate;
                                _teacherClassAttendenceRepository.SaveChanges();
                                id = teacherBreakLogObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Data = teacherBreakLogObj.BreakStatusID;
                        res.Message = "Teacher Information has been saved.";
                        res.ReturnMessage.Add("Teacher Registered");
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
        public ResponseViewModal GetTeacherOperationalClasses(GetTeacherBreakLogRequestViewModel getTeacherOperationalClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getTeacherOperationalClassesRequest.AgencyID > 0 && getTeacherOperationalClassesRequest.TeacherID > 0 && getTeacherOperationalClassesRequest.AskingDate != null)
                    {
                        List<DropdownViewModel> teacherOperationalClasses = new List<DropdownViewModel>();
                        IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getTeacherOperationalClassesRequest.AgencyID);
                        IQueryable<TeacherClassAttendence> selectedTeacherClassAttendence = _teacherClassAttendenceRepository.GetAll().Where(check => check.AgencyID == getTeacherOperationalClassesRequest.AgencyID
                        && check.CreatedDate != null && check.CreatedDate.Value.Date == getTeacherOperationalClassesRequest.AskingDate.Date
                        && check.TeacherID == getTeacherOperationalClassesRequest.TeacherID && check.CheckStatus > 0);
                        IQueryable<Entity.Agency.ClassAssignmentLog> selectedclassAssignment = _classAssignmentLogRepository.GetAll().Where(check => check.AgencyID == getTeacherOperationalClassesRequest.AgencyID
                        && check.ClassEnrollEndDate.Date >= getTeacherOperationalClassesRequest.AskingDate.Date && check.ClassEnrollStartDate.Date <= getTeacherOperationalClassesRequest.AskingDate.Date
                        && check.TeacherID == getTeacherOperationalClassesRequest.TeacherID);

                        if (selectedclassAssignment != null && selectedclassAssignment.Count() > 0)
                        {
                            teacherOperationalClasses = (from classAssignmentObj in selectedclassAssignment

                                                         join teacherClassAttendenceprimeobj in selectedTeacherClassAttendence
                                                         on classAssignmentObj.Id equals teacherClassAttendenceprimeobj.ClassAssignmentLogID
                                                         into teacherClassAttendenceobj
                                                         from teacherClassAttendenceprimeobj in teacherClassAttendenceobj.DefaultIfEmpty()

                                                         join classesObj in classes on classAssignmentObj.ClassesID equals classesObj.Id

                                                         where (!classAssignmentObj.IsDeleted && teacherClassAttendenceprimeobj.CheckStatus > 0)
                                                         select new DropdownViewModel
                                                         {
                                                             Value = classAssignmentObj.ClassesID,
                                                             label = classesObj.ClassName,
                                                             CheckInTime=Convert.ToDateTime(teacherClassAttendenceprimeobj.CreatedDate)
                                                         }).OrderByDescending(c => c.CheckInTime).ToList();
                            
                            var result = teacherOperationalClasses.GroupBy(p => p.Value).Select(p => p.First()).ToList();
                            res.Data = result;
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teacher Operational Classes has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher has not Checked In Till now";
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
        public ResponseViewModal GetTeacherCurrentBreakStatus(GetTeacherBreakLogRequestViewModel getTeacherBreakStatusRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (getTeacherBreakStatusRequest.AgencyID > 0 && getTeacherBreakStatusRequest.TeacherDailyAttendenceID > 0)
                    {
                        TeacherBreakLogViewModel lastTeacherBreakLog = new TeacherBreakLogViewModel();
                        IQueryable<TeacherBreakLog> selectBreakLog = _teacherBreakLogRepository.GetAll().Where(check => check.AgencyID == getTeacherBreakStatusRequest.AgencyID
                        && check.TeacherDailyAttendenceID == getTeacherBreakStatusRequest.TeacherDailyAttendenceID);
                        if (selectBreakLog != null && selectBreakLog.Count() > 0)
                        {
                            lastTeacherBreakLog = (from breakObj in selectBreakLog
                                                   where (!breakObj.IsDeleted)
                                                   select new TeacherBreakLogViewModel
                                                   {
                                                       Id = breakObj.Id,
                                                       AgencyID = breakObj.AgencyID,
                                                       BreakIn = breakObj.BreakIn,
                                                       BreakOut = breakObj.BreakOut,
                                                       TeacherDailyAttendenceID = breakObj.TeacherDailyAttendenceID,
                                                       BreakTypesID = breakObj.BreakTypesID,
                                                       BreakStatusID = breakObj.BreakStatusID
                                                   }).OrderBy(c => c.BreakOut).LastOrDefault();
                            res.Data = selectBreakLog.LastOrDefault();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher current Break Log has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher has taken any break till now";
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
        public ResponseViewModal GetTeacherCurrentClassLogStatus(TeacherDailyAttendenceRequestViewModel getTeacherCurrentClassLogStatusRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
               try
                {
                    if (getTeacherCurrentClassLogStatusRequest.AgencyID > 0 && getTeacherCurrentClassLogStatusRequest.TeacherID > 0)
                    {
                        TeacherClassAttendenceViewModel teachersDailyAttendence = new TeacherClassAttendenceViewModel();
                        IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getTeacherCurrentClassLogStatusRequest.AgencyID);
                        IQueryable<TeacherClassAttendence> selectedTeacherClassAttendence = _teacherClassAttendenceRepository.GetAll().Where(check => check.AgencyID == getTeacherCurrentClassLogStatusRequest.AgencyID
                        && check.CreatedDate != null && check.CreatedDate.Value.Date == getTeacherCurrentClassLogStatusRequest.AskingDate.Date
                        && check.TeacherID == getTeacherCurrentClassLogStatusRequest.TeacherID && check.CheckStatus > 0);
                        IQueryable<Entity.Agency.ClassAssignmentLog> selectedclassAssignment = _classAssignmentLogRepository.GetAll().Where(check => check.AgencyID == getTeacherCurrentClassLogStatusRequest.AgencyID
                        && check.ClassEnrollEndDate >= getTeacherCurrentClassLogStatusRequest.AskingDate && check.ClassEnrollStartDate <= getTeacherCurrentClassLogStatusRequest.AskingDate
                        && check.TeacherID == getTeacherCurrentClassLogStatusRequest.TeacherID);

                        if (selectedclassAssignment != null && selectedclassAssignment.Count() > 0)
                        {
                            teachersDailyAttendence = (from classAssignmentObj in selectedclassAssignment

                                                       join teacherClassAttendenceprimeobj in selectedTeacherClassAttendence
                                                       on classAssignmentObj.Id equals teacherClassAttendenceprimeobj.ClassAssignmentLogID
                                                       into teacherClassAttendenceobj
                                                       from teacherClassAttendenceprimeobj in teacherClassAttendenceobj.DefaultIfEmpty()

                                                       join classesObj in classes on classAssignmentObj.ClassesID equals classesObj.Id

                                                       where (!classAssignmentObj.IsDeleted && teacherClassAttendenceprimeobj.CheckStatus == 1)
                                                       select new TeacherClassAttendenceViewModel
                                                       {
                                                           Id = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.Id : 0,
                                                           ClassAssignmentLogID = classAssignmentObj.Id,
                                                           AgencyID = classAssignmentObj.AgencyID,
                                                           TeacherID = classAssignmentObj.TeacherID,
                                                           ClassesID = classAssignmentObj.ClassesID,
                                                           ClassName = classesObj.ClassName,
                                                           CheckStatus = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckStatus : 0,
                                                           CheckInTime = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckInTime : DateTime.MinValue,
                                                           CheckOutTime = teacherClassAttendenceprimeobj != null ? teacherClassAttendenceprimeobj.CheckOutTime : DateTime.MinValue,
                                                           ClassStartTime = classAssignmentObj.ClassStartTime,
                                                           ClassEndTime = classAssignmentObj.ClassEndTime
                                                       }).OrderBy(c => c.ClassStartTime).LastOrDefault();
                            res.Data = teachersDailyAttendence;
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teacher Current Class Log has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher has not cloaked In Till now";
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
        public ResponseViewModal GetTeacherAvailability(GetTeacherAvailabilityViewModel getTeacherAvailabilityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                    if (getTeacherAvailabilityRequest.AgencyID > 0 && getTeacherAvailabilityRequest.AskingDate != null)
                    {
                        List<TeacherAvailabilityViewModel> teacherBreakLog = new List<TeacherAvailabilityViewModel>();
                        IQueryable<TeacherAvailability> selectTeacherAvailability = _teacherAvailabilityRepository.GetAll().Where(check => check.AgencyID == getTeacherAvailabilityRequest.AgencyID
                        && check.StartDate != null && check.StartDate.Date == getTeacherAvailabilityRequest.AskingDate.Date);
                        if (selectTeacherAvailability != null && selectTeacherAvailability.Count() > 0)
                        {
                            teacherBreakLog = (from teacherAvailabilityObj in selectTeacherAvailability
                                               where (!teacherAvailabilityObj.IsDeleted)
                                               select new TeacherAvailabilityViewModel
                                               {
                                                   Id = teacherAvailabilityObj.Id,
                                                   AgencyID = teacherAvailabilityObj.AgencyID,
                                                   TeacherID = teacherAvailabilityObj.TeacherID,
                                                   StartDate = teacherAvailabilityObj.StartDate,
                                                   EndDate = teacherAvailabilityObj.EndDate,
                                                   OnLeave = teacherAvailabilityObj.OnLeave,
                                                   OnLeaveComment = teacherAvailabilityObj.OnLeaveComment,
                                                   DisableOnLeave = teacherAvailabilityObj.DisableOnLeave,
                                                   ReasonId = teacherAvailabilityObj.ReasonId
                                               }).OrderBy(c => c.Id).ToList();
                            res.Data = teacherBreakLog;
                            if (getTeacherAvailabilityRequest.limit != 0)
                            {
                                res.Data = selectTeacherAvailability.Skip((getTeacherAvailabilityRequest.page - 1) * getTeacherAvailabilityRequest.limit).Take(getTeacherAvailabilityRequest.limit).ToList();
                            }
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher Availability has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teaher availability data not found.";
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


        private bool ResetUserEmail(long UserID, string newEmailAddress)
        {
            bool res;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (UserID > 0 && newEmailAddress != string.Empty)
                    {
                        long id = 0;
                        Users UserObj = null;
                        UserObj = _userRepository.Get(x => x.Id == UserID && !x.IsDeleted);
                        if (!ReferenceEquals(UserObj, null))
                        {
                            UserObj.UpdatedDate = DateTime.UtcNow;
                            UserObj.EmailAddress = newEmailAddress;
                            _userRepository.SaveChanges();
                            id = UserObj.Id;
                        }
                        daycaredb.Commit();
                        res = true;
                    }
                    else
                    {
                        res = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;
                }
            }
            return res;
        }



        public ResponseViewModal TeacherDashboardInfo(TeacherDashboardInfoRequestViewModel teacherDashboardInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (teacherDashboardInfoRequest.AgencyID > 0 && teacherDashboardInfoRequest.TeacherID > 0 && teacherDashboardInfoRequest.ClassID > 0)
                    {
                        TeacherDashboardInfoViewModel teacherDashboardInfo = new TeacherDashboardInfoViewModel();

                        IQueryable<Entity.Teachers.TeacherClassAttendence> selectedTeacherClassAttendence = _teacherClassAttendenceRepository.GetAll().Where(check => check.AgencyID == teacherDashboardInfoRequest.AgencyID
                        && check.CreatedDate != null && check.ClassesID == teacherDashboardInfoRequest.ClassID && check.CreatedDate.Value.Date == teacherDashboardInfoRequest.AskingDate.Date
                        && check.TeacherID == teacherDashboardInfoRequest.TeacherID);

                        IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.ClassesID == teacherDashboardInfoRequest.ClassID && classCheck.AgencyID == teacherDashboardInfoRequest.AgencyID);
                        IQueryable<InvolvedEventClasses> selectedEventClassInvolvment = _involvedEventClassesRepository.GetAll().Where(classCheck => classCheck.ClassesID == teacherDashboardInfoRequest.ClassID && classCheck.AgencyID == teacherDashboardInfoRequest.AgencyID);
                        IQueryable<EventPlanner> selectedEvents = _eventPlannerRepository.GetAll().Where(check => teacherDashboardInfoRequest.AskingDate.Date >= check.StartDate
                        && teacherDashboardInfoRequest.AskingDate.Date <= check.EndDate.Date && teacherDashboardInfoRequest.AgencyID == check.AgencyID);

                        long eventCount = 0;
                        foreach (EventPlanner consideredEvent in selectedEvents)
                        {
                            long consideredEventID = consideredEvent.Id;
                            if (selectedEventClassInvolvment.Where(check => check.EventPlannerID == consideredEventID && check.ClassesID == teacherDashboardInfoRequest.ClassID).Count() > 0)
                            {
                                eventCount = eventCount + 1;
                            }
                        }
                        if (classEnrollment != null && classEnrollment.Count() > 0)
                        {
                            teacherDashboardInfo.EventCount = eventCount;
                            teacherDashboardInfo.PresentStudentCount = selectedTeacherClassAttendence != null ? selectedTeacherClassAttendence.Count() : 0;
                            teacherDashboardInfo.StudentEnrolledCount = classEnrollment != null ? classEnrollment.Count() : 0;
                            res.Data = teacherDashboardInfo;
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Teacher Dashboard Info has been feteched";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "No Data Found.";
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

        public ResponseViewModal SaveTeacherAvailabilityInformartion(TeacherAvailabilityViewModel saveTeacherAvailability)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveTeacherAvailability.AgencyID > 0)
                    {
                        long id = 0;
                        TeacherAvailability teacherAvailObj;
                        DateTime StartDate;
                        DateTime EndDate;

                        if (saveTeacherAvailability.AgencyID != 0 && saveTeacherAvailability.Id == 0)
                        {
                            teacherAvailObj = _teacherAvailabilityRepository.Get(x => x.TeacherID == saveTeacherAvailability.TeacherID);
                            if (!ReferenceEquals(teacherAvailObj, null))
                            {
                                StartDate = teacherAvailObj.StartDate;
                                EndDate = teacherAvailObj.EndDate;
                                if (saveTeacherAvailability.StartDate > EndDate && saveTeacherAvailability.EndDate > EndDate)
                                {
                                    saveTeacherAvailability.CreatedDate = DateTime.UtcNow;
                                    teacherAvailObj = new TeacherAvailability();
                                    Mapper.Map(saveTeacherAvailability, teacherAvailObj);
                                    _teacherAvailabilityRepository.Create(teacherAvailObj);
                                    _teacherAvailabilityRepository.SaveChanges();
                                    id = teacherAvailObj.Id;
                                }
                                else
                                {
                                    res.StatusCode = 986;
                                    res.Message = "Please select proper available dates";
                                    res.IsSuccess = false;
                                }
                            }
                            else
                            {
                                saveTeacherAvailability.CreatedDate = DateTime.UtcNow;
                                saveTeacherAvailability.OnLeave = false;
                                teacherAvailObj = new TeacherAvailability();
                                Mapper.Map(saveTeacherAvailability, teacherAvailObj);
                                _teacherAvailabilityRepository.Create(teacherAvailObj);
                                _teacherAvailabilityRepository.SaveChanges();
                                id = teacherAvailObj.Id;
                            }
                        }
                        else if (saveTeacherAvailability.Id > 0)
                        {
                            teacherAvailObj = _teacherAvailabilityRepository.Get(x => x.Id == saveTeacherAvailability.Id);
                            if (!ReferenceEquals(teacherAvailObj, null))
                            {
                                teacherAvailObj.StartDate = saveTeacherAvailability.StartDate;
                                teacherAvailObj.EndDate = saveTeacherAvailability.EndDate;
                                teacherAvailObj.AgencyID = saveTeacherAvailability.AgencyID;
                                teacherAvailObj.OnLeave = saveTeacherAvailability.OnLeave;
                                teacherAvailObj.OnLeaveComment = saveTeacherAvailability.OnLeaveComment;
                                teacherAvailObj.UpdatedBy = saveTeacherAvailability.UpdatedBy;
                                teacherAvailObj.UpdatedDate = DateTime.UtcNow; 
                              
                                _teacherAvailabilityRepository.SaveChanges();
                                id = teacherAvailObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Teacher Avialability Information has been saved.";                       
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="getAllTeachersForAgencyRequest"></param>
        /// <returns></returns>
       

        public ResponseViewModal ActivateTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveTeacherDetailsRequest.AgencyID > 0 && saveTeacherDetailsRequest.Id > 0)
                    {
                        long id = 0;                      
                        Users userObj = new Users();
                        TeacherInfo teacherObj = null;

                        teacherObj = _teacherRepository.Get(x => x.Id == saveTeacherDetailsRequest.Id && x.IsDeleted);
                        userObj = _userRepository.Get(x => x.Id == teacherObj.UserID && x.IsDeleted);
                        if (!ReferenceEquals(teacherObj, null))
                        {

                            if (saveTeacherDetailsRequest.IsDeleted == false)
                            {
                                userObj.IsDeleted = saveTeacherDetailsRequest.IsDeleted;
                                userObj.UpdatedBy = saveTeacherDetailsRequest.UpdatedBy;
                                userObj.UpdatedDate = DateTime.UtcNow;
                                userObj.IsActive = true;
                                teacherObj.IsDeleted = saveTeacherDetailsRequest.IsDeleted;
                                teacherObj.UpdatedBy = saveTeacherDetailsRequest.UpdatedBy;
                                teacherObj.UpdatedDate = DateTime.UtcNow;
                                teacherObj.IsActive = true;
                                _teacherRepository.SaveChanges();
                                _userRepository.SaveChanges();
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "This user has been activated.";                        
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


        public ResponseViewModal GetAllTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllTeachersRequest.AgencyID > 0)
                {
                    var fromDate = getAllTeachersRequest.AskedDate.Date;
                    var toDate = fromDate.AddHours(23);
                    toDate = toDate.AddMinutes(59);
                    toDate = toDate.AddSeconds(59);
                    if (getAllTeachersRequest.AskedDateString != null)
                    {
                        var Date = Convert.ToDateTime(getAllTeachersRequest.AskedDateString);
                        var difference = getAllTeachersRequest.AskedDate - Date;
                        Date = Date.Date;
                        fromDate = Date.Add(difference);
                        toDate = fromDate.AddHours(24);
                    }

                    IQueryable<Entity.Teachers.TeacherDailyAttendence> teacherattendance = _teacherDailyAttendenceRepository.GetAll().Where(Check => Check.AgencyID == getAllTeachersRequest.AgencyID && 
                    Check.AttendenceStatusID == 2 && (fromDate <= Check.ClockIn && Check.ClockIn <= toDate) && Check.IsDeleted == false);

                    IQueryable<TeacherInfo> teacherCollection;
                    List<TeachersDetailsViewModel> allTeachers = new List<TeachersDetailsViewModel>();
                   
                    string teachername = getAllTeachersRequest.TeacherName.TrimStart();
                    teachername = teachername.TrimEnd();

                    if (getAllTeachersRequest.ActivationType.ToLower() == "activated")
                    {
                        teacherCollection = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID && !check.IsDeleted && check.TeacherName.ToUpper().Contains(teachername.ToUpper()));
                    }
                    else if (getAllTeachersRequest.ActivationType.ToLower() == "deactivated")
                    {
                        teacherCollection = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID && check.IsDeleted && check.TeacherName.ToUpper().Contains(teachername.ToUpper()));
                    }
                    else
                    {
                        teacherCollection = _teacherRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID && check.TeacherName.ToUpper().Contains(teachername.ToUpper()));
                    }

                    allTeachers = (from teachersObj in teacherCollection
                                   select new TeachersDetailsViewModel
                                   {
                                       Id = teachersObj.Id,
                                       TeacherName = teachersObj.TeacherName ?? String.Empty,
                                       AgencyID = teachersObj.AgencyID,
                                       UserID = teachersObj.UserID,
                                       FirstName = teachersObj.FirstName ?? String.Empty,
                                       LastName = teachersObj.LastName ?? String.Empty,
                                       ImagePath = teachersObj.ImagePath ?? String.Empty,
                                       PositionTypeID = teachersObj.PositionTypeID,
                                       TeacherStatusID = teachersObj.TeacherStatusID,
                                       Email = teachersObj.Email ?? String.Empty,
                                       IsDeleted = teachersObj.IsDeleted,
                                       CreatedBy = teachersObj.CreatedBy ?? 0,
                                       CreatedDate = teachersObj.CreatedDate ?? DateTime.MinValue,
                                       UpdatedBy = teachersObj.UpdatedBy ?? 0,
                                       UpdatedDate = teachersObj.UpdatedDate ?? DateTime.MinValue,
                                       DeletedBy = teachersObj.DeletedBy ?? 0,
                                       DeletedDate = teachersObj.DeletedDate ?? DateTime.MinValue,    
                                       DateOfBirth = teachersObj.DateOfBirth.Date,
                                       DateHired = teachersObj.DateHired.Date,
                                       Address = teachersObj.Address ?? String.Empty,
                                       Certification = teachersObj.Certification ?? String.Empty,
                                       PhoneNumber = teachersObj.PhoneNumber,
                                       GrossPayPerHour = teachersObj.GrossPayPerHour,
                                       MPhoneNumber = teachersObj.MPhoneNumber ?? String.Empty,
                                   }).OrderBy(c => c.TeacherName).ToList();

                    res.Data = allTeachers;

                    foreach (var item in allTeachers)
                    {                     
                             var allDetails = (from TAObj in teacherattendance                                          
                                          where TAObj.TeacherID == item.Id && Convert.ToDateTime(TAObj.ClockIn.Date) == DateTime.Now.Date
                                          && TAObj.AgencyID == getAllTeachersRequest.AgencyID && TAObj.IsDeleted == false
                                          && TAObj.AttendenceStatusID == 2 orderby TAObj.Id descending
                                          select new TeacherDailyAttendenceRequestViewModel()
                                          {
                                             TeacherDailyAttendenceID = TAObj.Id,
                                             TeacherID = TAObj.TeacherID
                                          }).ToList();

                        if (allDetails.Count > 0)
                        {
                            item.ClockOut = true;                         
                            item.TeacherDailyAttendenceID = allDetails[0].TeacherDailyAttendenceID;
                        }
                        else
                        {
                            item.ClockOut = false;
                        }
                    }

                    if (getAllTeachersRequest.limit != 0)
                    {
                        res.Data = allTeachers.Skip((getAllTeachersRequest.page) * getAllTeachersRequest.limit).Take(getAllTeachersRequest.limit).ToList();
                    }
                    res.TotalRows = allTeachers.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Teahers list has been feteched";
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


        public ResponseViewModal ActivateClockInTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
              try
                {
                   if (saveTeacherDetailsRequest.AgencyID > 0)
                    {
                        long id = 0;                      
                        TeacherDailyAttendence tdaObj  = null;                     

                        tdaObj = _teacherDailyAttendenceRepository.Get(x => x.Id == saveTeacherDetailsRequest.TeacherDailyAttendenceID && x.IsDeleted == false);

                        if (!ReferenceEquals(tdaObj, null))
                        {
                           if (saveTeacherDetailsRequest.IsDeleted == false)
                            {                               
                                tdaObj.AttendenceStatusID = 0;
                                tdaObj.UpdatedBy = saveTeacherDetailsRequest.UpdatedBy;
                                tdaObj.UpdatedDate = DateTime.UtcNow;
                                tdaObj.IsActive = true;
                                _teacherDailyAttendenceRepository.Update(tdaObj);
                                _teacherDailyAttendenceRepository.SaveChanges();
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "This user has been activated.";                   
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

        public ResponseViewModal GetAllPresentTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllTeachersRequest.AgencyID > 0)
                {
                    var fromDate = getAllTeachersRequest.AskedDate.Date;
                    var toDate = fromDate.AddHours(23);
                    toDate = toDate.AddMinutes(59);
                    toDate = toDate.AddSeconds(59);
                    if (getAllTeachersRequest.AskedDateString != null)
                    {
                        var Date = Convert.ToDateTime(getAllTeachersRequest.AskedDateString);
                        var difference = getAllTeachersRequest.AskedDate - Date;
                        Date = Date.Date;
                        fromDate = Date.Add(difference);
                        toDate = fromDate.AddHours(24);
                    }
                    List<TeachersDetailsViewModel> allTeachers = new List<TeachersDetailsViewModel>();

                    IQueryable<TeacherInfo> teacherCollection= _teacherRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID && !check.IsDeleted);
                    IQueryable<TeacherDailyAttendence> attenceCollection = _teacherDailyAttendenceRepository.GetAll().Where(check => check.AgencyID == getAllTeachersRequest.AgencyID && !check.IsDeleted &&
                    (fromDate <= check.ClockIn && check.ClockIn <= toDate));

                    allTeachers = (from attendenceObj in attenceCollection
                                   join teachersObj in teacherCollection on attendenceObj.TeacherID equals teachersObj.Id
                                   select new TeachersDetailsViewModel
                                   {                                       
                                       Id = teachersObj.Id,
                                       TeacherName = teachersObj.TeacherName ?? String.Empty,
                                       AgencyID = teachersObj.AgencyID,
                                       UserID = teachersObj.UserID,
                                       FirstName = teachersObj.FirstName ?? String.Empty,
                                       LastName = teachersObj.LastName ?? String.Empty,
                                       ImagePath = teachersObj.ImagePath ?? String.Empty,
                                       PositionTypeID = teachersObj.PositionTypeID,
                                       TeacherStatusID = teachersObj.TeacherStatusID,
                                       Email = teachersObj.Email ?? String.Empty,
                                       IsDeleted = teachersObj.IsDeleted,
                                       CreatedBy = teachersObj.CreatedBy ?? 0,
                                       CreatedDate = teachersObj.CreatedDate ?? DateTime.MinValue,
                                       UpdatedBy = teachersObj.UpdatedBy ?? 0,
                                       UpdatedDate = teachersObj.UpdatedDate ?? DateTime.MinValue,
                                       DeletedBy = teachersObj.DeletedBy ?? 0,
                                       DeletedDate = teachersObj.DeletedDate ?? DateTime.MinValue,
                                       TimeIn = attendenceObj.ClockIn,
                                       TimeOut = attendenceObj.ClockOut
                                   }).OrderBy(c => c.TeacherName).ToList();

                    var result = allTeachers.GroupBy(p => p.Id).Select(p => p.First()).ToList();

                    res.Data = result;

                    if (getAllTeachersRequest.limit != 0)
                    {
                        res.Data = allTeachers.Skip((getAllTeachersRequest.page) * getAllTeachersRequest.limit).Take(getAllTeachersRequest.limit).ToList();
                    }
                    res.TotalRows = allTeachers.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Teahers list has been feteched";
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

        public ResponseViewModal UploadTeacherUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM)
        {
            List<TeachersDetailsViewModel> rejectedParentInformationList = new List<TeachersDetailsViewModel>();
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var columnMap = new Dictionary<int, Action<string, TeachersDetailsViewModel>>
                    {
                        { 0, (x, model) => model.FirstName = x.Trim() },
                        { 1, (x, model) => model.LastName = x.Trim() },
                        { 2, (x, model) => model.Email = x.Trim() },
                        //{ 3, (x, model) => model.Mobile = Convert.ToInt64(x) },

                        { 3, (x, model) =>
                            {
                              //  var mobileNo = 0L;

                              //  long.TryParse(x, out mobileNo);

                                model.MPhoneNumber = x;
                            }
                        },

                        { 4, (x, model) => model.Address = x },
                        { 5, (x, model) =>
                            {
                                var localDate = Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localDate);

                                model.DateOfBirth = localDate;
                            }
                        },
                        { 6, (x, model) => model.Certification = x },
                        { 7, (x, model) =>
                         {
                                var localDate =  Convert.ToDateTime(x);

                                DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localDate);

                                model.DateHired = localDate;
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

                        var model = new TeachersDetailsViewModel();
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

                        var response = SaveTeacherDetails(model);
                       
                        if (response.StatusCode != (long)HttpStatusCodes.OK)
                        {
                            model.msg = "User Already Exists";
                            rejectedParentInformationList.Add(model);
                            res.Data = rejectedParentInformationList;
                        }
                        line = streamReader.ReadLine();
                    }
                }
               
                if (rejectedParentInformationList.Count == 0)
                {
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.IsSuccess = true;
                    res.Data = string.Empty;
                }
                else if (rejectedParentInformationList.Count > 0)
                {
                    res.StatusCode = 987;
                    res.IsSuccess = false;
                    res.Data = rejectedParentInformationList;
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
