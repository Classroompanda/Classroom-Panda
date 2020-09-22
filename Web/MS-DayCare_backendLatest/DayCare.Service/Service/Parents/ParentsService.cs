using AutoMapper;
using AutoMapper.Configuration;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Entity.Parent;
using DayCare.Entity.PostActivity;
using DayCare.Entity.Student;
using DayCare.Entity.User;
using DayCare.Model.Agency;
using DayCare.Model.Master;
using DayCare.Model.Parent;
using DayCare.Model.PostActivity;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Model.Teacher;
using DayCare.Repository.IRepository;
using DayCare.Service.Common;
using DayCare.Service.IService.Common;
using DayCare.Service.IService.Parents;
using DayCare.Service.IService.User;
using DayCare.Service.Service.Common;
using DayCare.Service.Service.Login;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Globalization;
using System.IO;
using System.Linq;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.Parents
{

    public class ParentsService : IParentsService
    {
        #region Initialize Dependency
        public IConfiguration Configuration { get; }
        private readonly IStudentRepository _studentRepository;
        private readonly DataContext _dataContext;
        private readonly ICityRepository _cityRepository;
        private readonly IStateRepository _stateRepository;
        private readonly ICountryRepository _countryRepository;
        private readonly ITransportationTypeRepository _transportationTypeRepository;
        private readonly IFeePaymentTypeRepository _feePaymentTypeRepository;
        private readonly IParentRepository _parentRepository;
        private readonly IGuardianRepository _guardianRepository;
        private readonly IGenderRepository _genderRepository;
        private readonly IStudentMedicationRepository _studentMedicationRepository;
        private readonly IStudentImmunizationRepository _studentImmunizationRepository;
        private readonly IStudentAllergiesRepository _studentAllergiesRepository;
        private readonly IStudentDisabilitiesRepository _studentDisabilitiesRepository;
        private readonly IClassEnrollmentRepository _classEnrollmentRepository;
        private readonly IClassAttendenceRepository _classAttendenceRepository;
        private readonly IClassesRepository _classesRepository;
        private readonly IAttendenceStatusRepository _attendenceStatusRepository;
        private readonly ITeacherInfoRepository _teacherRepository;
        private readonly IIncidentPriortyTypeRepository _incidentPriortyTypeRepository;
        private readonly INatureOfInjuryRepository _natureOfInjuryRepository;
        private readonly IIncidentInvolvmentRepository _incidentInvolvmentRepository;
        private readonly IIncidentRepository _incidentRepository;

        private readonly IStudentActivitiesRepository _studentActivitiesRepository;
        private readonly IStudentActivityMealRepository _studentActivityMealRepository;
        private readonly IStudentActivityMedicationRepository _studentActivityMedicationRepository;
        private readonly IStudentActivityNoteRepository _studentActivityNoteRepository;
        private readonly IStudentActivityMoodRepository _studentActivityMoodRepository;
        private readonly IStudentOtherActivityRepository _studentOtherActivityRepository;
        private readonly IStudentAcitivityNapRepository _studentAcitivityNapRepository;
        private readonly IStudentActivityDiaperRepository _studentActivityDiaperRepository;
        private readonly IActivityTypeRepository _activityTypeRepository;
        private readonly IPostImageslikeDetailsRepository _postactivityImageslikeRepository;
        private readonly IPostActivityImagesRepository _postActivityImagesRepository;
        private readonly IPostVideolikeDetailsRepository _postVideolikeDetailsRepository;
        private readonly IPostActivityVideosRepository _postActivityVideosRepository;
        private readonly IUserRepository _userRepository;
        private readonly IParentStudentMappingRepository _parentStudentMapping;
        private readonly IPayementDetailsRepository _payementDetailsRepository;
        private readonly IParentSignatureDetailsRepository _parentSignatureDetailsRepository;
        string NewPassword = "";
        string QuickPin = "";
        string DisplayMessage = "";
        private readonly ICommonService _commonService;
        private readonly IPushNotification _pushNotification;
        private readonly IUserLoginDeviceRepository _userLoginDeviceRepository;
        public IAdvanceFeePaymentDetailsRepository _advanceFeePaymentDetailsRepository;
        public IMealPlannerRepository _mealPlannerRepository;
        private Microsoft.Extensions.Configuration.IConfiguration configuration;
        private readonly CommonMethods commonMethods = null;
        private readonly IParentLogRepository _pLogRepository;
        private readonly IRelationTypeRepository _relationTypeRepository;
        private readonly IImmunizationRepository _immunizationRepository;
        private readonly IAllergyNameRepository _allergyNameRepository;
        private readonly IAllergyTypeRepository _allergyTypeRepository;
        private readonly IAllergyReactionTypeRepository _allergyReactionTypeRepository;
        private readonly IAuthorizedPersonRepository _authorizedPersonDetails;

        #endregion

        public ParentsService(IStudentRepository studentRepository, DataContext dataContext,
          ICityRepository cityRepository,
          IStateRepository stateRepository,
          ICountryRepository countryRepository,
          ITransportationTypeRepository transportationTypeRepository,
          IFeePaymentTypeRepository feePaymentTypeRepository,
          IParentRepository parentRepository,
          IGuardianRepository guardianRepository,
          IGenderRepository genderRepository,
          IStudentMedicationRepository studentMedicationRepository,
          IStudentImmunizationRepository studentImmunizationRepository,
          IStudentAllergiesRepository studentAllergiesRepository,
          IStudentDisabilitiesRepository studentDisabilitiesRepository,
          IClassEnrollmentRepository classEnrollmentRepository,
          IClassAttendenceRepository classAttendenceRepository,
          IClassesRepository classesRepository,
          IAttendenceStatusRepository attendenceStatusRepository,
          IIncidentRepository incidentRepository,
          ITeacherInfoRepository teacherRepository,
          IIncidentPriortyTypeRepository incidentPriortyTypeRepository,
          INatureOfInjuryRepository natureOfInjuryRepository,
          IIncidentInvolvmentRepository incidentInvolvmentRepository,


          IStudentActivitiesRepository studentActivitiesRepository,
          IStudentActivityMealRepository studentActivityMealRepository,
          IStudentActivityMedicationRepository studentActivityMedicationRepository,
          IStudentActivityNoteRepository studentActivityNoteRepository,
          IStudentActivityMoodRepository studentActivityMoodRepository,
          IStudentOtherActivityRepository studentOtherActivityRepository,
          IStudentAcitivityNapRepository studentAcitivityNapRepository,
          IStudentActivityDiaperRepository studentActivityDiaperRepository,
          IActivityTypeRepository activityTypeRepository,
          IPostImageslikeDetailsRepository postactivityImageslikeRepository,
          IPostActivityImagesRepository postactivityimagesrepository,
          IPostVideolikeDetailsRepository postVideolikeDetailsRepository,
          IPostActivityVideosRepository postActivityVideosRepository,
          IUserRepository userRepository,
          ICommonService commonService,
          IParentStudentMappingRepository parentStudentMapping,
          IPayementDetailsRepository payementDetailsRepository,
          IPushNotification pushNotification,
          IUserLoginDeviceRepository userLoginDeviceRepository,
          IAdvanceFeePaymentDetailsRepository advanceFeePaymentDetailsRepository,
          IParentSignatureDetailsRepository parentSignatureDetailsRepository,
          IMealPlannerRepository mealPlannerRepository,
          Microsoft.Extensions.Configuration.IConfiguration iConfig,
          IParentLogRepository parentLogRepository,
          IRelationTypeRepository relationTypeRepository,
          IImmunizationRepository immunizationRepository,
          IAllergyNameRepository allergyNameRepository,
          IAllergyTypeRepository allergyTypeRepository,
          IAllergyReactionTypeRepository allergyReactionTypeRepository,
          IAuthorizedPersonRepository authorizedPersonRepository
           )
        {
            _studentRepository = studentRepository;
            _dataContext = dataContext;
            _cityRepository = cityRepository;
            _stateRepository = stateRepository;
            _countryRepository = countryRepository;
            _transportationTypeRepository = transportationTypeRepository;
            _feePaymentTypeRepository = feePaymentTypeRepository;
            _parentRepository = parentRepository;
            _guardianRepository = guardianRepository;
            _genderRepository = genderRepository;
            _studentMedicationRepository = studentMedicationRepository;
            _studentImmunizationRepository = studentImmunizationRepository;
            _studentAllergiesRepository = studentAllergiesRepository;
            _studentDisabilitiesRepository = studentDisabilitiesRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _classAttendenceRepository = classAttendenceRepository;
            _classesRepository = classesRepository;
            _attendenceStatusRepository = attendenceStatusRepository;
            _teacherRepository = teacherRepository;
            _incidentPriortyTypeRepository = incidentPriortyTypeRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
            _incidentInvolvmentRepository = incidentInvolvmentRepository;
            _incidentRepository = incidentRepository;
            _studentActivitiesRepository = studentActivitiesRepository;
            _studentActivityMealRepository = studentActivityMealRepository;
            _studentActivityMedicationRepository = studentActivityMedicationRepository;
            _studentActivityNoteRepository = studentActivityNoteRepository;
            _studentActivityMoodRepository = studentActivityMoodRepository;
            _studentOtherActivityRepository = studentOtherActivityRepository;
            _studentAcitivityNapRepository = studentAcitivityNapRepository;
            _studentActivityDiaperRepository = studentActivityDiaperRepository;
            _activityTypeRepository = activityTypeRepository;
            _postactivityImageslikeRepository = postactivityImageslikeRepository;
            _postActivityImagesRepository = postactivityimagesrepository;
            _postVideolikeDetailsRepository = postVideolikeDetailsRepository;
            _postActivityVideosRepository = postActivityVideosRepository;
            _userRepository = userRepository;
            _commonService = commonService;
            _parentStudentMapping = parentStudentMapping;
            _payementDetailsRepository = payementDetailsRepository;
            _pushNotification = pushNotification;
            _userLoginDeviceRepository = userLoginDeviceRepository;
            _advanceFeePaymentDetailsRepository = advanceFeePaymentDetailsRepository;
            _parentSignatureDetailsRepository = parentSignatureDetailsRepository;
            _mealPlannerRepository = mealPlannerRepository;
            configuration = iConfig;
            commonMethods = new CommonMethods();
            _pLogRepository = parentLogRepository;
            _relationTypeRepository = relationTypeRepository;
            _immunizationRepository = immunizationRepository;
            _allergyNameRepository = allergyNameRepository;
            _allergyTypeRepository = allergyTypeRepository;
            _allergyReactionTypeRepository = allergyReactionTypeRepository;
            _authorizedPersonDetails = authorizedPersonRepository;
        }

        /// <summary>
        /// Get All Students
        /// </summary>
        /// <returns></returns>
        /// 
        public ResponseViewModal GetAllStudentsListOfParent(ParentsStudentRequestViewModel getAllStudentsListOfParentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsListOfParentRequest.AgencyID > 0 && getAllStudentsListOfParentRequest.ParentID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    string StudentName = getAllStudentsListOfParentRequest.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();

                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(StudentName.ToUpper()) && namecheck.AgencyID == getAllStudentsListOfParentRequest.AgencyID
                    && namecheck.ParentID == getAllStudentsListOfParentRequest.ParentID);

                    allStudents = (from studentObj in selectedStudents
                                   where (!studentObj.IsDeleted && getAllStudentsListOfParentRequest.AgencyID == studentObj.AgencyID &&
                                   (getAllStudentsListOfParentRequest.ClassID == 0 || getAllStudentsListOfParentRequest.ClassID == null))
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsListOfParentRequest.limit != 0)
                    {
                        res.Data = allStudents.Skip((getAllStudentsListOfParentRequest.page - 1) * getAllStudentsListOfParentRequest.limit).Take(getAllStudentsListOfParentRequest.limit).ToList();
                    }
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Student list has been fetched.";
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

        public ResponseViewModal GetAllStudentsOfParent(ParentsStudentRequestViewModel getAllStudentsOfParentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsOfParentRequest.AgencyID > 0 && getAllStudentsOfParentRequest.ParentID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);//Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Gender> selectedGender = _genderRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID && check.Id == getAllStudentsOfParentRequest.ParentID);
                    IQueryable<Entity.Parent.ParentStudentMapping> selectedMapStudents = _parentStudentMapping.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID && check.ParentID == getAllStudentsOfParentRequest.ParentID);
                    IQueryable<Entity.Agency.ClassAttendence> selectedAttendence = _classAttendenceRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Agency.PayementDetails> selectedPayment = _payementDetailsRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);


                    allStudents = (from parentObj in selectedParent
                                   join mapObj in selectedMapStudents on parentObj.Id equals mapObj.ParentID
                                   join studentObj in selectedStudents on mapObj.StudentID equals studentObj.Id

                                   join cityObj in selectedCity on parentObj.CityId equals cityObj.Id into InfoCity
                                   from InfoCityObj in InfoCity.DefaultIfEmpty()

                                   join genderObj in selectedGender on studentObj.GenderID equals genderObj.Id into InfoGender
                                   from InfoGenderObj in InfoGender.DefaultIfEmpty()

                                   join stateObj in selectedState on parentObj.StateId equals stateObj.Id into InfoState
                                   from InfoStateObj in InfoState.DefaultIfEmpty()

                                   join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id into InfoCountry
                                   from InfoCountryObj in InfoCountry.DefaultIfEmpty()


                                   join transportationTypeObj in selectedTransportationType on studentObj.TransportationID equals transportationTypeObj.Id into InfoTransportationType
                                   from InfoTransportationTypeObj in InfoTransportationType.DefaultIfEmpty()

                                   join feePaymentTypeObj in selectedFeePaymentType on studentObj.FeePaymentTypeID equals feePaymentTypeObj.Id into InfofeePaymentType
                                   from InfofeePaymentTypeObj in InfofeePaymentType.DefaultIfEmpty()



                                   where (!studentObj.IsDeleted && getAllStudentsOfParentRequest.AgencyID == studentObj.AgencyID) &&
                                   (getAllStudentsOfParentRequest.ClassID == 0 || getAllStudentsOfParentRequest.ClassID == null)
                                   select new StudentViewModel()
                                   {
                                       StudentId = mapObj.StudentID,
                                       StudentName = studentObj.FirstName + ' ' + studentObj.LastName,
                                       AgencyID = mapObj.AgencyID,
                                       ParentID = mapObj.ParentID,
                                       ParentName = parentObj.ParentName,
                                       FirstName = studentObj.FirstName,
                                       LastName = studentObj.LastName,
                                       GenderID = studentObj.GenderID,
                                       GenderName = InfoGenderObj.GenderName,
                                       ImagePath = studentObj.ImagePath,
                                       Address = studentObj.Address,
                                       CountryId = studentObj.CountryId,
                                       CountryName = InfoCountryObj.CountryName,
                                       StateId = studentObj.StateId,
                                       StateName = InfoStateObj.StateName,
                                       CityId = studentObj.CityId,
                                       CityName = InfoCityObj.CityName,
                                       PostalCode = studentObj.PostalCode,
                                       SchoolName = studentObj.SchoolName,
                                       TransportationID = studentObj.TransportationID,
                                       TransportationTypeName = InfoTransportationTypeObj.TransportationTypeName,
                                       DateOfBirth = studentObj.DateOfBirth,
                                       FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                       FeePaymentTypeName = InfofeePaymentTypeObj.FeePaymentTypeName,
                                       InsuranceCarrier = studentObj.InsuranceCarrier,
                                       InsurancePolicyNumber = studentObj.InsurancePolicyNumber,
                                       ChildsContactNumber = studentObj.ChildsContactNumber,
                                       PhysicianContactNumber = studentObj.PhysicianContactNumber,
                                       PhysicianName = studentObj.PhysicianName,
                                       PreferredHospital = studentObj.PreferredHospital,
                                       PhysicianAddress = studentObj.PhysicianAddress,
                                       ChildStartDate = studentObj.ChildStartDate,
                                       ChildNotes = studentObj.ChildNotes,
                                       EnrolledClassesInformation = (from classEnrollmentObj in _classEnrollmentRepository.GetAll().Where(check => check.StudentID == mapObj.StudentID)
                                                                     join classObj in _classesRepository.GetAll() on classEnrollmentObj.ClassesID equals classObj.Id
                                                                     where (!classObj.IsDeleted && getAllStudentsOfParentRequest.AgencyID == classEnrollmentObj.AgencyID
                                                                     && classEnrollmentObj.EnrollmentStatus == 2)
                                                                     select new ClassEnrollmentViewModel()
                                                                     {
                                                                         EnrollmentStatus = classEnrollmentObj.EnrollmentStatus,
                                                                         ClassName = classObj.ClassName ?? String.Empty,
                                                                         StudentID = classEnrollmentObj.StudentID,
                                                                         StudentName = studentObj.StudentName,
                                                                         ClassesID = classEnrollmentObj.ClassesID
                                                                     }).ToList()
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsOfParentRequest.limit != 0)
                    {
                        res.Data = allStudents.Skip((getAllStudentsOfParentRequest.page - 1) * getAllStudentsOfParentRequest.limit).Take(getAllStudentsOfParentRequest.limit).ToList();
                    }
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Student list has been fetched.";
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

        public ResponseViewModal GetAllStudentsForEnroll(ParentsStudentRequestViewModel getAllStudentsOfParentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsOfParentRequest.AgencyID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);

                    allStudents = (from studentObj in selectedStudents
                                   where (!studentObj.IsDeleted && getAllStudentsOfParentRequest.AgencyID == studentObj.AgencyID) &&
                                   (getAllStudentsOfParentRequest.ClassID == 0 || getAllStudentsOfParentRequest.ClassID == null)
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.FirstName + ' ' + studentObj.LastName,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                       FirstName = studentObj.FirstName,
                                       LastName = studentObj.LastName,
                                       GenderID = studentObj.GenderID,

                                       EnrolledClassesInformation = (from classEnrollmentObj in _classEnrollmentRepository.GetAll().Where(check => check.StudentID == studentObj.Id)
                                                                     join classObj in _classesRepository.GetAll() on classEnrollmentObj.ClassesID equals classObj.Id
                                                                     where (!classObj.IsDeleted && getAllStudentsOfParentRequest.AgencyID == classEnrollmentObj.AgencyID
                                                                     && classEnrollmentObj.EnrollmentStatus == 2)
                                                                     select new ClassEnrollmentViewModel()
                                                                     {
                                                                         EnrollmentStatus = classEnrollmentObj.EnrollmentStatus,
                                                                         ClassName = classObj.ClassName ?? String.Empty,
                                                                         StudentID = classEnrollmentObj.StudentID,
                                                                         StudentName = studentObj.StudentName,
                                                                         ClassesID = classEnrollmentObj.ClassesID
                                                                     }).ToList()
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsOfParentRequest.limit != 0)
                    {
                        res.Data = allStudents.Skip((getAllStudentsOfParentRequest.page - 1) * getAllStudentsOfParentRequest.limit).Take(getAllStudentsOfParentRequest.limit).ToList();
                    }
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Student list has been fetched.";
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


        public ResponseViewModal GetParentInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0 && getParentInformationRequest.ParentID > 0)
                {
                    ParentInformationViewModel studentInformation = new ParentInformationViewModel();
                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);//Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);

                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.Id == getParentInformationRequest.ParentID);

                    studentInformation = (from parentObj in selectedParent
                                          join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id into parentInfoCountry
                                          from parentInfoCountryObj in parentInfoCountry.DefaultIfEmpty()

                                          join cityObj in selectedCity on parentObj.CityId equals cityObj.Id into parentInfoCity
                                          from parentInfoCityobj in parentInfoCity.DefaultIfEmpty()

                                          join genderObj in selectedGenders on parentObj.GenderID equals genderObj.Id into parentCityGender
                                          from parentCityGenderObj in parentCityGender.DefaultIfEmpty()

                                          join stateObj in selectedState on parentObj.StateId equals stateObj.Id into parentState
                                          from parentStateObj in parentState.DefaultIfEmpty()
                                          where (getParentInformationRequest.AgencyID == parentObj.AgencyID)
                                          select new ParentInformationViewModel()
                                          {
                                              Id = parentObj.Id,
                                              ParentName = parentObj.ParentName,
                                              AgencyID = parentObj.AgencyID,
                                              UserID = parentObj.UserID,
                                              RelationTypeId = parentObj.RelationTypeId,
                                              FirstName = parentObj.FirstName,
                                              LastName = parentObj.LastName,
                                              Address = parentObj.Address,
                                              CountryId = parentObj.CountryId,
                                              StateId = parentObj.StateId,
                                              CityId = parentObj.CityId,
                                              PostalCode = parentObj.PostalCode,
                                              PinNumber = parentObj.PinNumber,
                                              SecurityQuestionId = parentObj.SecurityQuestionId,
                                              SecurityQuestionAnswer = parentObj.SecurityQuestionAnswer,
                                              EmailId = parentObj.EmailId,
                                              ImagePath = parentObj.ImagePath,
                                              SecurityKey = parentObj.SecurityKey,
                                              Mobile = parentObj.Mobile,
                                              FailedLoginAttemptCount = parentObj.FailedLoginAttemptCount,
                                              GenderID = parentObj.GenderID,
                                              GenderName = parentCityGenderObj.GenderName,
                                              DateOfBirth = parentObj.DateOfBirth,
                                              Profession = parentObj.Profession,
                                              ReasonNotToAllow = parentObj.ReasonNotToAllow,
                                              IsAuthorizedToPickup = parentObj.IsAuthorizedToPickup,
                                              IsParent = parentObj.IsParent,
                                              IsGaurdian = parentObj.IsGaurdian,
                                              IsSecondaryParent = parentObj.IsSecondaryParent,
                                              AddedByID = parentObj.AddedByID,
                                              IsDeleted = parentObj.IsDeleted,
                                              EmployerName = parentObj.EmployerName,
                                              EmployerNumber = parentObj.EmployerNumber,
                                              EmployerAddress = parentObj.EmployerAddress,
                                              IsJoinClassroom = parentObj.IsJoinClassroom,
                                              AssociatedChild = (from associateChildObj in _parentStudentMapping.GetAll().Where(check => check.ParentID == parentObj.Id)
                                                                 join studentObj in _studentRepository.GetAll() on associateChildObj.StudentID equals studentObj.Id
                                                                 where (!associateChildObj.IsDeleted && getParentInformationRequest.AgencyID == associateChildObj.AgencyID)
                                                                 select new ParentStudentMappingViewModel()
                                                                 {
                                                                     Id = associateChildObj.Id,
                                                                     AgencyID = associateChildObj.AgencyID,
                                                                     StudentID = associateChildObj.StudentID,
                                                                     StudentName = studentObj.StudentName ?? String.Empty,
                                                                     FirstName = studentObj.FirstName ?? String.Empty,
                                                                     LastName = studentObj.LastName ?? String.Empty,
                                                                     ParentID = parentObj.Id,
                                                                     IsParent = associateChildObj.IsParent,
                                                                     IsSecondaryParent = associateChildObj.IsSecondaryParent,
                                                                     IsGaurdian = associateChildObj.IsGaurdian
                                                                 }).ToList()

                                          }).OrderBy(c => c.ParentName).FirstOrDefault();
                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Information has been fetched.";
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

        public ResponseViewModal GetParentUpdatedInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0 && getParentInformationRequest.ParentID > 0)
                {
                    List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                    IQueryable<Entity.Parent.ParentLog> parentLogs = _pLogRepository.GetAll().Where(check => check.ParentID == getParentInformationRequest.ParentID && check.IsDeleted == false);
                    IQueryable<Entity.Parent.Parent> parents = _parentRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == getParentInformationRequest.AgencyID);
                    parentLogViewModels = (from parentLogObj in parentLogs
                                           join parentObj in parents on parentLogObj.ParentID equals parentObj.Id
                                           where (!parentLogObj.IsDeleted && getParentInformationRequest.AgencyID == parentLogObj.AgencyID)
                                           select new ParentLogViewModel()
                                           {
                                               ID = parentLogObj.Id,
                                               ParentID = parentLogObj.ParentID,
                                               ColumnName = parentLogObj.ColumnName,
                                               OldValue = parentLogObj.OldValue,
                                               NewValue = parentLogObj.NewValue,
                                               ValueUpdateDate = parentLogObj.ValueUpdateDate.Date,
                                               ParentName = parentObj.ParentName,
                                               UpdatedFor = parentLogObj.UpdatedFor
                                           }).OrderBy(c => c.ValueUpdateDate).ToList();
                    res.Data = parentLogViewModels;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Updated Information has been fetched.";
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

        public ResponseViewModal DeleteParentUpdatedInformation(ParentsStudentRequestViewModel deleteParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    ParentLog parentLogObj = null;
                    if (deleteParentInformationRequest.AgencyID > 0 && deleteParentInformationRequest.ParentID > 0)
                    {

                        List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                        IQueryable<Entity.Parent.ParentLog> parentLogsObj = _pLogRepository.GetAll().Where(check => check.ParentID == deleteParentInformationRequest.ParentID && check.IsDeleted == false);

                        if (parentLogsObj.Count() != 0)
                        {
                            List<ParentLog> parentLogList = parentLogsObj.ToList();
                            for (int i = 0; i < parentLogList.Count(); i++)
                            {
                                parentLogList[i].IsDeleted = true;
                                parentLogList[i].DeletedBy = deleteParentInformationRequest.AgencyID;
                                parentLogList[i].DeletedDate = DateTime.UtcNow;
                            }
                            _pLogRepository.SaveChanges();
                            DisplayMessage = "Parent  pdated Information has been deleted.";
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                    }
                    else
                    {
                        res.StatusCode = 200;
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
            }
            return res;
        }
        // Service for api version 1.0 or default
        public ResponseViewModal SaveParentInformation(ParentInformationViewModel saveParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveParentInformationRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long userid = 0;
                        Parent parentObj = null;
                        Parent parentObjOld = null;
                        Users userObj = new Users();
                        Users userObjOld = new Users();
                        ParentLog parentLog = new ParentLog();
                        bool pin = false;
                        ParentStudentMapping mappingObj = new ParentStudentMapping();
                        //AddedByID = _parentStudentMapping.Get()

                        //AddedByID = _parentStudentMapping.GetFirstOrDefault();
                        //AddedBYID = _parentStudentMapping.GetAll().Where(check => check.IsParent == true && check.StudentID == saveParentInformationRequest.AssociatedChild);

                        if (saveParentInformationRequest.EmailId != null)
                        {
                            string EmailIdSpace = saveParentInformationRequest.EmailId.TrimStart();
                            string EmailId = EmailIdSpace.TrimEnd();
                        }

                        if (saveParentInformationRequest.AgencyID != 0 && saveParentInformationRequest.Id == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveParentInformationRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.LastName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.EmailId ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else
                            {
                                string EmailIdSpace = saveParentInformationRequest.EmailId.TrimStart();
                                string EmailId = EmailIdSpace.TrimEnd();

                                IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == EmailId.ToUpper());
                                if (selectedUser.GetEnumerator().MoveNext() == false)
                                {
                                    QuickPin = _commonService.GenerateRandomNo();
                                    while (pin == false)
                                    {
                                        IQueryable<Entity.User.Users> userDetails = _userRepository.GetAll().Where(Check => Check.AgencyID == saveParentInformationRequest.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                        IQueryable<Entity.Masters.AuthorizedPerson> authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.AgencyID == saveParentInformationRequest.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                        if (userDetails.Count() != 0 || authorizedPersonDetail.Count() != 0)
                                        {
                                            QuickPin = _commonService.GenerateRandomNo();
                                            pin = false;
                                        }
                                        else
                                        {
                                            pin = true;
                                        }
                                    }
                                    userObj.UserName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    userObj.FirstName = saveParentInformationRequest.FirstName;
                                    userObj.LastName = saveParentInformationRequest.LastName;
                                    userObj.PhoneNumber = saveParentInformationRequest.Mobile;
                                    userObj.EmailAddress = saveParentInformationRequest.EmailId;
                                    userObj.AgencyID = saveParentInformationRequest.AgencyID;
                                    userObj.IsActive = true;
                                    userObj.IsDeleted = false;
                                    userObj.CreatedDate = DateTime.UtcNow;
                                    userObj.CreatedBy = saveParentInformationRequest.CreatedBy;
                                    userObj.RoleId = 4;
                                    NewPassword = _commonService.GeneratePassword();
                                    //QuickPin = _commonService.GenerateRandomNo();
                                    userObj.QuickPin = QuickPin;
                                    userObj.Password = Crypto.HashPassword(NewPassword);
                                    _userRepository.Create(userObj);
                                    _userRepository.SaveChanges();
                                    userid = userObj.Id;
                                    if (userid > 0)
                                    {
                                        if (saveParentInformationRequest.IsParent == true)
                                        {
                                            saveParentInformationRequest.IsAuthorizedToPickup = true;
                                        }
                                        saveParentInformationRequest.ParentName = saveParentInformationRequest.FirstName + " " + saveParentInformationRequest.LastName;
                                        saveParentInformationRequest.CreatedBy = saveParentInformationRequest.CreatedBy;
                                        saveParentInformationRequest.CreatedDate = DateTime.UtcNow;
                                        saveParentInformationRequest.IsActive = true;
                                        saveParentInformationRequest.IsDeleted = false;
                                        saveParentInformationRequest.UserID = userid;
                                        parentObj = new Parent();
                                        //parentObj.EmployerAddress = string.Empty;
                                        Mapper.Map(saveParentInformationRequest, parentObj);
                                        _parentRepository.Create(parentObj);
                                        _parentRepository.SaveChanges();
                                        id = parentObj.Id;
                                        daycaredb.Commit();
                                    }
                                    if (id > 0 && (saveParentInformationRequest.IsParent == false))
                                    {
                                        if (saveParentInformationRequest.AssociatedChild != null && saveParentInformationRequest.AssociatedChild.Count != 0)
                                        {
                                            for (int i = 0; i < saveParentInformationRequest.AssociatedChild.Count; i++)
                                            {
                                                saveParentInformationRequest.AssociatedChild[i].AgencyID = saveParentInformationRequest.AgencyID;
                                                saveParentInformationRequest.AssociatedChild[i].ParentID = id;
                                                saveParentInformationRequest.AssociatedChild[i].IsGaurdian = saveParentInformationRequest.IsGaurdian;
                                                saveParentInformationRequest.AssociatedChild[i].IsSecondaryParent = saveParentInformationRequest.IsSecondaryParent;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedBy = saveParentInformationRequest.CreatedBy;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedDate = DateTime.UtcNow;
                                                saveParentInformationRequest.AssociatedChild[i].IsActive = true;
                                                saveParentInformationRequest.AssociatedChild[i].IsDeleted = false;
                                                SaveParentStudentMapping(saveParentInformationRequest.AssociatedChild[i]);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        res.IsSuccess = true;
                                        res.SaveId = id;
                                        res.StatusCode = (long)HttpStatusCodes.OK;
                                    }
                                    if (userid > 0 && id > 0 && saveParentInformationRequest.IsAuthorizedToPickup == true)
                                    {
                                        //var encodedUserId = commonMethods.Encryption(userid);
                                        var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                                        //string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your Login Credentials are User Name:</p><b> " + userObj.EmailAddress + " </b>and Password<b> " + NewPassword + " </b> and  " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + userObj.QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your User Name:</p><b> " + userObj.EmailAddress + " </b><br> <p>Please click the link to create your password</p> <b><a href = '" + url + "/" + userid + "'> Create Your Password </a> </b> " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + userObj.QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", message);
                                    }
                                    DisplayMessage = "Parent Information has been saved.";
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
                        else if (saveParentInformationRequest.Id > 0 && saveParentInformationRequest.IsDeleted == true)
                        {
                            parentObj = _parentRepository.Get(x => x.Id == saveParentInformationRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(parentObj, null) && !ReferenceEquals(userObj, null))
                            {
                                userObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                                userObj.DeletedBy = saveParentInformationRequest.DeletedBy;
                                userObj.DeletedDate = DateTime.UtcNow;
                                parentObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                                parentObj.DeletedBy = saveParentInformationRequest.DeletedBy;
                                parentObj.DeletedDate = DateTime.UtcNow;
                                _parentRepository.SaveChanges();
                                _userRepository.SaveChanges();
                                DisplayMessage = "Parent Information has been deleted.";
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveParentInformationRequest.Id > 0)
                        {
                            parentObj = _parentRepository.Get(x => x.Id == saveParentInformationRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                            string QuickPin = userObj.QuickPin;
                            long user_id = parentObj.UserID;
                            bool auth = parentObj.IsAuthorizedToPickup;
                            if (!ReferenceEquals(parentObj, null))
                            {
                                if (string.IsNullOrWhiteSpace(saveParentInformationRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.LastName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.EmailId ?? string.Empty))
                                {
                                    res.StatusCode = 205;
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    // For Create Parent Log
                                    if (saveParentInformationRequest.UpdatedFlag == 1)
                                    {
                                        SaveParentLog(saveParentInformationRequest, parentObj);
                                    }
                                    if (parentObj.IsParent == true)
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = true;
                                    }
                                    else if (parentObj.IsParent == true)
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = true;
                                    }
                                    else
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = saveParentInformationRequest.IsAuthorizedToPickup;
                                    }

                                    parentObj.ParentName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    parentObj.AgencyID = saveParentInformationRequest.AgencyID;
                                    parentObj.RelationTypeId = saveParentInformationRequest.RelationTypeId;
                                    parentObj.FirstName = saveParentInformationRequest.FirstName;
                                    parentObj.LastName = saveParentInformationRequest.LastName;
                                    parentObj.Address = saveParentInformationRequest.Address;
                                    parentObj.CountryId = saveParentInformationRequest.CountryId;
                                    parentObj.StateId = saveParentInformationRequest.StateId;
                                    parentObj.CityId = saveParentInformationRequest.CityId;
                                    parentObj.PostalCode = saveParentInformationRequest.PostalCode;
                                    parentObj.PinNumber = saveParentInformationRequest.PinNumber;
                                    parentObj.SecurityQuestionId = saveParentInformationRequest.SecurityQuestionId;
                                    parentObj.SecurityQuestionAnswer = saveParentInformationRequest.SecurityQuestionAnswer;
                                    parentObj.EmailId = saveParentInformationRequest.EmailId;
                                    parentObj.ImagePath = saveParentInformationRequest.ImagePath;
                                    parentObj.SecurityKey = saveParentInformationRequest.SecurityKey;
                                    parentObj.Mobile = saveParentInformationRequest.Mobile;
                                    parentObj.FailedLoginAttemptCount = saveParentInformationRequest.FailedLoginAttemptCount;
                                    parentObj.GenderID = saveParentInformationRequest.GenderID;
                                    parentObj.DateOfBirth = saveParentInformationRequest.DateOfBirth;
                                    parentObj.UpdatedBy = saveParentInformationRequest.UpdatedBy;
                                    parentObj.UpdatedDate = DateTime.UtcNow;
                                    parentObj.IsAuthorizedToPickup = saveParentInformationRequest.IsAuthorizedToPickup;
                                    parentObj.ReasonNotToAllow = saveParentInformationRequest.ReasonNotToAllow;
                                    parentObj.Profession = saveParentInformationRequest.Profession;
                                    parentObj.EmployerName = saveParentInformationRequest.EmployerName;
                                    parentObj.EmployerNumber = saveParentInformationRequest.EmployerNumber;
                                    parentObj.EmployerAddress = saveParentInformationRequest.EmployerAddress;
                                    parentObj.IsJoinClassroom = saveParentInformationRequest.IsJoinClassroom;
                                    userObj.FirstName = saveParentInformationRequest.FirstName;
                                    userObj.LastName = saveParentInformationRequest.LastName;
                                    userObj.UserName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    userObj.UpdatedDate = DateTime.UtcNow;
                                    _userRepository.SaveChanges();
                                    _parentRepository.SaveChanges();
                                    daycaredb.Commit();
                                    if (saveParentInformationRequest.Id > 0 && saveParentInformationRequest.IsParent == false)
                                    {
                                        if (saveParentInformationRequest.AssociatedChild != null && saveParentInformationRequest.AssociatedChild.Count != 0)
                                        {
                                            for (int i = 0; i < saveParentInformationRequest.AssociatedChild.Count; i++)
                                            {
                                                saveParentInformationRequest.AssociatedChild[i].AgencyID = saveParentInformationRequest.AgencyID;
                                                saveParentInformationRequest.AssociatedChild[i].ParentID = saveParentInformationRequest.Id;
                                                saveParentInformationRequest.AssociatedChild[i].IsGaurdian = saveParentInformationRequest.IsGaurdian;
                                                saveParentInformationRequest.AssociatedChild[i].IsSecondaryParent = saveParentInformationRequest.IsSecondaryParent;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedBy = saveParentInformationRequest.CreatedBy;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedDate = DateTime.UtcNow;
                                                saveParentInformationRequest.AssociatedChild[i].IsActive = true;
                                                saveParentInformationRequest.AssociatedChild[i].IsDeleted = false;
                                                SaveParentStudentMapping(saveParentInformationRequest.AssociatedChild[i]);
                                            }
                                        }
                                    }

                                    if (user_id > 0 && saveParentInformationRequest.IsAuthorizedToPickup == true && auth == false && parentObj.IsParent == false)
                                    {
                                        //var encodedUserId = commonMethods.Encryption(user_id);
                                        var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                                        //string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your Login Credentials are User Name:</p><b> " + userObj.EmailAddress + " </b>and Password<b> " + NewPassword + " </b> and  " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + userObj.QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your User Name:</p><b> " + userObj.EmailAddress + " </b><br> <p>Please click the link to create your password</p> <b><a href = '" + url + "/" + user_id + "'> Create Your Password </a> </b> " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", message);
                                    }
                                    res.IsSuccess = true;
                                    DisplayMessage = "Parent Information has been updated.";
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
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveParentLog(ParentInformationViewModel saveParentInformationRequest, Parent parentObjOld)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                string pname = null;
                if (parentObjOld.IsParent == true) { pname = "Parent"; }
                else if (parentObjOld.IsSecondaryParent == true) { pname = "Secondary Parent"; }
                else { pname = "Gaurdian"; }

                if (saveParentInformationRequest.UpdatedFlag == 1)
                {
                    if (parentObjOld.FirstName != saveParentInformationRequest.FirstName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " First Name";
                        parentLog.OldValue = parentObjOld.FirstName;
                        parentLog.NewValue = saveParentInformationRequest.FirstName;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.LastName != saveParentInformationRequest.LastName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Last Name";
                        parentLog.OldValue = parentObjOld.LastName;
                        parentLog.NewValue = saveParentInformationRequest.LastName;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.Mobile != saveParentInformationRequest.Mobile)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Mobile Number";
                        parentLog.OldValue = Convert.ToString(parentObjOld.Mobile);
                        parentLog.NewValue = Convert.ToString(saveParentInformationRequest.Mobile);
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.Address != saveParentInformationRequest.Address)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Address";
                        parentLog.OldValue = parentObjOld.Address;
                        parentLog.NewValue = saveParentInformationRequest.Address;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.StateId != saveParentInformationRequest.StateId)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        var OldStateName = _stateRepository.GetAll().Where(check => check.Id == parentObjOld.StateId).Select(s => s.StateName);
                        var NewStateName = _stateRepository.GetAll().Where(check => check.Id == saveParentInformationRequest.StateId).Select(s => s.StateName);
                        var OldStateName1 = OldStateName.ToList();
                        var NewStateName1 = NewStateName.ToList();
                        parentLog.ColumnName = pname + " State";
                        parentLog.OldValue = OldStateName1[0];
                        parentLog.NewValue = NewStateName1[0];
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.CityId != saveParentInformationRequest.CityId)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        var OldCityName = _cityRepository.GetAll().Where(check => check.Id == parentObjOld.CityId).Select(s => s.CityName);
                        var NewCityName = _cityRepository.GetAll().Where(check => check.Id == saveParentInformationRequest.CityId).Select(s => s.CityName);
                        var OldCityName1 = OldCityName.ToList();
                        var NewCityName1 = NewCityName.ToList();
                        parentLog.ColumnName = pname + " City";
                        parentLog.OldValue = OldCityName1[0];
                        parentLog.NewValue = NewCityName1[0];
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.PostalCode != saveParentInformationRequest.PostalCode)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Postal Code";
                        parentLog.OldValue = parentObjOld.PostalCode;
                        parentLog.NewValue = saveParentInformationRequest.PostalCode;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.DateOfBirth.Date != saveParentInformationRequest.DateOfBirth.Date)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Date of Birth";
                        parentLog.OldValue = parentObjOld.DateOfBirth.ToString("dd-MM-yyyy"); ;
                        parentLog.NewValue = saveParentInformationRequest.DateOfBirth.ToString("dd-MM-yyyy");
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.GenderID != saveParentInformationRequest.GenderID)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        var OldGenderName = _genderRepository.GetAll().Where(check => check.Id == parentObjOld.GenderID).Select(s => s.GenderName);
                        var NewGenderName = _genderRepository.GetAll().Where(check => check.Id == saveParentInformationRequest.GenderID).Select(s => s.GenderName);
                        var OldGenderName1 = OldGenderName.ToList();
                        var NewGenderName1 = NewGenderName.ToList();
                        parentLog.ColumnName = pname + " Gender Name";
                        parentLog.OldValue = OldGenderName1[0];
                        parentLog.NewValue = NewGenderName1[0];
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.EmployerName != saveParentInformationRequest.EmployerName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Employer Name";
                        parentLog.OldValue = parentObjOld.EmployerName;
                        parentLog.NewValue = saveParentInformationRequest.EmployerName;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.EmployerNumber != saveParentInformationRequest.EmployerNumber)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Employer Number";
                        parentLog.OldValue = Convert.ToString(parentObjOld.EmployerNumber);
                        parentLog.NewValue = Convert.ToString(saveParentInformationRequest.EmployerNumber);
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.EmployerAddress != saveParentInformationRequest.EmployerAddress)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Employer Address";
                        parentLog.OldValue = parentObjOld.EmployerAddress;
                        parentLog.NewValue = saveParentInformationRequest.EmployerAddress;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.Profession != saveParentInformationRequest.Profession)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Profession";
                        parentLog.OldValue = parentObjOld.Profession;
                        parentLog.NewValue = saveParentInformationRequest.Profession;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.RelationTypeId != saveParentInformationRequest.RelationTypeId)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        var OldRelationName = _relationTypeRepository.GetAll().Where(check => check.Id == parentObjOld.RelationTypeId).Select(s => s.RelationTypeName);
                        var NewRelationName = _relationTypeRepository.GetAll().Where(check => check.Id == saveParentInformationRequest.RelationTypeId).Select(s => s.RelationTypeName);
                        var OldRelationName1 = OldRelationName.ToList();
                        var NewRelationName1 = NewRelationName.ToList();
                        parentLog.ColumnName = pname + " Relation with children";
                        parentLog.OldValue = OldRelationName1[0];
                        parentLog.NewValue = NewRelationName1[0];
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (parentObjOld.IsAuthorizedToPickup != saveParentInformationRequest.IsAuthorizedToPickup)
                    {
                        string Old = null;
                        string New = null;
                        if (parentObjOld.IsAuthorizedToPickup == true) { Old = "True"; } else { Old = "False"; }
                        if (saveParentInformationRequest.IsAuthorizedToPickup == true) { New = "True"; } else { New = "False"; }
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " is Authorized to Pickup";
                        parentLog.OldValue = Old;
                        parentLog.NewValue = New;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }

                    if (parentObjOld.ReasonNotToAllow != saveParentInformationRequest.ReasonNotToAllow)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveParentInformationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveParentInformationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveParentInformationRequest.UpdatedBy;
                        parentLog.ColumnName = pname + " Reason Not To Allow";
                        parentLog.OldValue = parentObjOld.ReasonNotToAllow;
                        parentLog.NewValue = saveParentInformationRequest.ReasonNotToAllow;
                        parentLog.UpdatedFor = parentObjOld.ParentName;
                        parentLogViewModels.Add(parentLog);
                    }


                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }

        // Service for api version 2.0 
        public ResponseViewModal SaveParentInformation(ParentInformationV2ViewModel saveParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveParentInformationRequest.AgencyID > 0)
                    {
                        bool pin = false;
                        long id = 0;
                        long userid = 0;
                        Parent parentObj = null;
                        Users userObj = new Users();
                        ParentStudentMapping mappingObj = new ParentStudentMapping();
                        //AddedByID = _parentStudentMapping.Get()

                        //AddedByID = _parentStudentMapping.GetFirstOrDefault();
                        //AddedBYID = _parentStudentMapping.GetAll().Where(check => check.IsParent == true && check.StudentID == saveParentInformationRequest.AssociatedChild);

                        if (saveParentInformationRequest.EmailId != null)
                        {
                            string EmailIdSpace = saveParentInformationRequest.EmailId.TrimStart();
                            string EmailId = EmailIdSpace.TrimEnd();
                        }

                        if (saveParentInformationRequest.AgencyID != 0 && saveParentInformationRequest.Id == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveParentInformationRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.LastName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.EmailId ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else
                            {
                                string EmailIdSpace = saveParentInformationRequest.EmailId.TrimStart();
                                string EmailId = EmailIdSpace.TrimEnd();

                                IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == EmailId.ToUpper());
                                if (selectedUser.GetEnumerator().MoveNext() == false)
                                {
                                    QuickPin = _commonService.GenerateRandomNo();
                                    while (pin == false)
                                    {
                                        IQueryable<Entity.User.Users> userDetails = _userRepository.GetAll().Where(Check => Check.AgencyID == saveParentInformationRequest.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                        IQueryable<Entity.Masters.AuthorizedPerson> authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.AgencyID == saveParentInformationRequest.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                        if (userDetails.Count() != 0 || authorizedPersonDetail.Count() != 0)
                                        {
                                            QuickPin = _commonService.GenerateRandomNo();
                                            pin = false;
                                        }
                                        else
                                        {
                                            pin = true;
                                        }
                                    }
                                    userObj.UserName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    userObj.FirstName = saveParentInformationRequest.FirstName;
                                    userObj.LastName = saveParentInformationRequest.LastName;
                                    userObj.PhoneNumber = saveParentInformationRequest.Mobile;
                                    userObj.EmailAddress = saveParentInformationRequest.EmailId;
                                    userObj.AgencyID = saveParentInformationRequest.AgencyID;
                                    userObj.IsActive = true;
                                    userObj.IsDeleted = false;
                                    userObj.CreatedDate = DateTime.UtcNow;
                                    userObj.CreatedBy = saveParentInformationRequest.CreatedBy;
                                    userObj.RoleId = 4;
                                    NewPassword = _commonService.GeneratePassword();
                                    QuickPin = _commonService.GenerateRandomNo();
                                    userObj.QuickPin = QuickPin;
                                    userObj.Password = Crypto.HashPassword(NewPassword);
                                    _userRepository.Create(userObj);
                                    _userRepository.SaveChanges();
                                    userid = userObj.Id;
                                    if (userid > 0)
                                    {
                                        if (saveParentInformationRequest.IsParent == true)
                                        {
                                            saveParentInformationRequest.IsAuthorizedToPickup = true;
                                        }
                                        else if (saveParentInformationRequest.IsSecondaryParent == true)
                                        {
                                            saveParentInformationRequest.IsAuthorizedToPickup = true;
                                        }
                                        //else
                                        //{
                                        //    saveParentInformationRequest.IsAuthorizedToPickup = saveParentInformationRequest.IsAuthorizedToPickup;
                                        //}
                                        saveParentInformationRequest.ParentName = saveParentInformationRequest.FirstName + " " + saveParentInformationRequest.LastName;
                                        saveParentInformationRequest.CreatedBy = saveParentInformationRequest.CreatedBy;
                                        saveParentInformationRequest.CreatedDate = DateTime.UtcNow;
                                        saveParentInformationRequest.IsActive = true;
                                        saveParentInformationRequest.IsDeleted = false;
                                        saveParentInformationRequest.UserID = userid;

                                        //if(saveParentInformationRequest.IsSecondaryParent || saveParentInformationRequest.IsGaurdian)
                                        //{
                                        //    saveParentInformationRequest.AddedByID = AddedByID;
                                        //}
                                        parentObj = new Parent();
                                        Mapper.Map(saveParentInformationRequest, parentObj);
                                        _parentRepository.Create(parentObj);
                                        _parentRepository.SaveChanges();
                                        id = parentObj.Id;
                                        daycaredb.Commit();
                                    }
                                    if (id > 0 && (saveParentInformationRequest.IsParent == false))
                                    {
                                        if (saveParentInformationRequest.AssociatedChild != null && saveParentInformationRequest.AssociatedChild.Count != 0)
                                        {
                                            for (int i = 0; i < saveParentInformationRequest.AssociatedChild.Count; i++)
                                            {
                                                saveParentInformationRequest.AssociatedChild[i].AgencyID = saveParentInformationRequest.AgencyID;
                                                saveParentInformationRequest.AssociatedChild[i].ParentID = id;
                                                saveParentInformationRequest.AssociatedChild[i].IsGaurdian = saveParentInformationRequest.IsGaurdian;
                                                saveParentInformationRequest.AssociatedChild[i].IsSecondaryParent = saveParentInformationRequest.IsSecondaryParent;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedBy = saveParentInformationRequest.CreatedBy;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedDate = DateTime.UtcNow;
                                                saveParentInformationRequest.AssociatedChild[i].IsActive = true;
                                                saveParentInformationRequest.AssociatedChild[i].IsDeleted = false;
                                                SaveParentStudentMapping(saveParentInformationRequest.AssociatedChild[i]);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        res.IsSuccess = true;
                                        res.SaveId = id;
                                        res.StatusCode = (long)HttpStatusCodes.OK;
                                    }
                                    if (userid > 0 && id > 0)
                                    {
                                        //var encodedUserId = commonMethods.Encryption(userid);
                                        var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                                        //string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your Login Credentials are User Name:</p><b> " + userObj.EmailAddress + " </b>and Password<b> " + NewPassword + " </b> and  " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + userObj.QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Welcome to Classroom Panda!</p> <br><p> Your User Name:</p><b> " + userObj.EmailAddress + " </b><br> <p>Please click the link to create your password</p> <b><a href = '" + url + "/" + userid + "'> Create Your Password </a> </b> " + " <p>Quick Pin details for Kioske are QuickPin</p><b> : " + " " + userObj.QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                        _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", message);
                                    }
                                    DisplayMessage = "Parent Information has been saved.";
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
                        else if (saveParentInformationRequest.Id > 0 && saveParentInformationRequest.IsDeleted == true)
                        {
                            parentObj = _parentRepository.Get(x => x.Id == saveParentInformationRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(parentObj, null) && !ReferenceEquals(userObj, null))
                            {
                                userObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                                userObj.DeletedBy = saveParentInformationRequest.DeletedBy;
                                userObj.DeletedDate = DateTime.UtcNow;
                                parentObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                                parentObj.DeletedBy = saveParentInformationRequest.DeletedBy;
                                parentObj.DeletedDate = DateTime.UtcNow;
                                _parentRepository.SaveChanges();
                                _userRepository.SaveChanges();
                                DisplayMessage = "Parent Information has been deleted.";
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveParentInformationRequest.Id > 0)
                        {
                            parentObj = _parentRepository.Get(x => x.Id == saveParentInformationRequest.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(parentObj, null))
                            {
                                if (string.IsNullOrWhiteSpace(saveParentInformationRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.LastName ?? string.Empty) || string.IsNullOrWhiteSpace(saveParentInformationRequest.EmailId ?? string.Empty))
                                {
                                    res.StatusCode = 205;
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    if (parentObj.IsParent == true)
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = true;
                                    }
                                    else if (parentObj.IsParent == true)
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = true;
                                    }
                                    else
                                    {
                                        saveParentInformationRequest.IsAuthorizedToPickup = saveParentInformationRequest.IsAuthorizedToPickup;
                                    }

                                    parentObj.ParentName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    parentObj.AgencyID = saveParentInformationRequest.AgencyID;
                                    parentObj.RelationTypeId = saveParentInformationRequest.RelationTypeId;
                                    parentObj.FirstName = saveParentInformationRequest.FirstName;
                                    parentObj.LastName = saveParentInformationRequest.LastName;
                                    parentObj.Address = saveParentInformationRequest.Address;
                                    parentObj.CountryId = saveParentInformationRequest.CountryId;
                                    parentObj.StateId = saveParentInformationRequest.StateId;
                                    parentObj.CityId = saveParentInformationRequest.CityId;
                                    parentObj.PostalCode = saveParentInformationRequest.PostalCode;
                                    parentObj.PinNumber = saveParentInformationRequest.PinNumber;
                                    parentObj.SecurityQuestionId = saveParentInformationRequest.SecurityQuestionId;
                                    parentObj.SecurityQuestionAnswer = saveParentInformationRequest.SecurityQuestionAnswer;
                                    parentObj.EmailId = saveParentInformationRequest.EmailId;
                                    parentObj.ImagePath = saveParentInformationRequest.ImagePath;
                                    parentObj.SecurityKey = saveParentInformationRequest.SecurityKey;
                                    parentObj.Mobile = saveParentInformationRequest.Mobile;
                                    parentObj.FailedLoginAttemptCount = saveParentInformationRequest.FailedLoginAttemptCount;
                                    parentObj.GenderID = saveParentInformationRequest.GenderID;
                                    parentObj.DateOfBirth = saveParentInformationRequest.DateOfBirth;
                                    parentObj.UpdatedBy = saveParentInformationRequest.UpdatedBy;
                                    parentObj.UpdatedDate = DateTime.UtcNow;
                                    parentObj.IsAuthorizedToPickup = saveParentInformationRequest.IsAuthorizedToPickup;
                                    parentObj.ReasonNotToAllow = saveParentInformationRequest.ReasonNotToAllow;
                                    parentObj.Profession = saveParentInformationRequest.Profession;
                                    parentObj.EmployerName = saveParentInformationRequest.EmployerName;
                                    parentObj.EmployerNumber = saveParentInformationRequest.EmployerNumber;
                                    parentObj.EmployerAddress = saveParentInformationRequest.EmployerAddress;
                                    userObj.FirstName = saveParentInformationRequest.FirstName;
                                    userObj.LastName = saveParentInformationRequest.LastName;
                                    userObj.UserName = saveParentInformationRequest.FirstName + ' ' + saveParentInformationRequest.LastName;
                                    userObj.UpdatedDate = DateTime.UtcNow;
                                    _userRepository.SaveChanges();
                                    _parentRepository.SaveChanges();
                                    daycaredb.Commit();
                                    if (saveParentInformationRequest.Id > 0 && saveParentInformationRequest.IsParent == false)
                                    {
                                        if (saveParentInformationRequest.AssociatedChild != null && saveParentInformationRequest.AssociatedChild.Count != 0)
                                        {
                                            for (int i = 0; i < saveParentInformationRequest.AssociatedChild.Count; i++)
                                            {
                                                saveParentInformationRequest.AssociatedChild[i].AgencyID = saveParentInformationRequest.AgencyID;
                                                saveParentInformationRequest.AssociatedChild[i].ParentID = saveParentInformationRequest.Id;
                                                saveParentInformationRequest.AssociatedChild[i].IsGaurdian = saveParentInformationRequest.IsGaurdian;
                                                saveParentInformationRequest.AssociatedChild[i].IsSecondaryParent = saveParentInformationRequest.IsSecondaryParent;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedBy = saveParentInformationRequest.CreatedBy;
                                                saveParentInformationRequest.AssociatedChild[i].CreatedDate = DateTime.UtcNow;
                                                saveParentInformationRequest.AssociatedChild[i].IsActive = true;
                                                saveParentInformationRequest.AssociatedChild[i].IsDeleted = false;
                                                SaveParentStudentMapping(saveParentInformationRequest.AssociatedChild[i]);
                                            }
                                        }
                                    }
                                    res.IsSuccess = true;
                                    DisplayMessage = "Parent Information has been updated.";
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
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // Service for version 1.0 or default
        public ResponseViewModal SaveStudent(StudentViewModel saveStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long mapid = 0;
                        Student StudentObj = null;
                        Parent ParentObj = null;
                        string studentName = "";
                        if (saveStudentRequest.AgencyID != 0 && saveStudentRequest.StudentId == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else if (!string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) && !string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                            {
                                //StudentObj = _studentRepository.Get(x => x.FirstName == saveStudentRequest.FirstName && x.LastName == saveStudentRequest.LastName && !x.IsDeleted);
                                // Check the student name for the parent
                                StudentObj = _studentRepository.Get(x => x.FirstName == saveStudentRequest.FirstName && x.LastName == saveStudentRequest.LastName && !x.IsDeleted && x.ParentID == saveStudentRequest.ParentID);
                                if (!ReferenceEquals(StudentObj, null))
                                {
                                    res.StatusCode = 206;//code for blank space
                                    DisplayMessage = "Student Already Exists With Same Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    if (saveStudentRequest.AddressAsParent == true)
                                    {
                                        ParentObj = _parentRepository.Get(x => x.Id == saveStudentRequest.ParentID);
                                        saveStudentRequest.Address = ParentObj.Address;
                                    }
                                    studentName = saveStudentRequest.FirstName + ' ' + saveStudentRequest.LastName;
                                    saveStudentRequest.StudentName = studentName;
                                    saveStudentRequest.CreatedBy = saveStudentRequest.CreatedBy;
                                    saveStudentRequest.CreatedDate = DateTime.UtcNow;
                                    StudentObj = new Student();
                                    StudentObj.Id = saveStudentRequest.StudentId;
                                    StudentObj.PhysicianAddress = string.Empty;
                                    StudentObj.PhysicianAddress = string.Empty;
                                    StudentObj.ChildStartDate = DateTime.Now;
                                    Mapper.Map(saveStudentRequest, StudentObj);
                                    _studentRepository.Create(StudentObj);
                                    _studentRepository.SaveChanges();
                                    id = StudentObj.Id;
                                    if (id > 0)
                                    {
                                        ParentStudentMapping mappObj = new ParentStudentMapping();
                                        mappObj.AgencyID = saveStudentRequest.AgencyID;
                                        mappObj.StudentID = id;
                                        mappObj.ParentID = saveStudentRequest.ParentID;
                                        mappObj.IsParent = true;
                                        mappObj.IsSecondaryParent = false;
                                        mappObj.IsGaurdian = false;
                                        mappObj.IsActive = true;
                                        mappObj.IsDeleted = false;
                                        mappObj.CreatedBy = saveStudentRequest.CreatedBy;
                                        mappObj.CreatedDate = DateTime.UtcNow;
                                        _parentStudentMapping.Create(mappObj);
                                        _parentStudentMapping.SaveChanges();
                                        mapid = mappObj.Id;
                                    }
                                    DisplayMessage = "Student Information has been saved.";
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    daycaredb.Commit();
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    var parentList = _parentRepository.GetAll().Where(x => x.Id == saveStudentRequest.ParentID).FirstOrDefault();
                                    var userDeviceToken = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == parentList.UserID).Select(x => x.DeviceToken).FirstOrDefault();
                                    string[] deviceToken = { userDeviceToken };
                                    string title = "New Notification";
                                    string body = "New student added with name " + studentName;
                                    var response = _pushNotification.SendPushNotification(deviceToken, title, body, new object(), true);
                                }
                            }
                        }
                        else if (saveStudentRequest.StudentId > 0 && saveStudentRequest.IsDeleted == true)
                        {
                            StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId);
                            if (!ReferenceEquals(StudentObj, null))
                            {
                                StudentObj.IsDeleted = saveStudentRequest.IsDeleted;
                                StudentObj.DeletedBy = saveStudentRequest.DeletedBy;
                                StudentObj.DeletedDate = DateTime.UtcNow;
                                _studentRepository.SaveChanges();
                                id = StudentObj.Id;
                                DisplayMessage = "Student Information has been Activated.";
                                res.IsSuccess = true;
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveStudentRequest.StudentId > 0)
                        {
                            StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId && !x.IsDeleted);
                            if (!ReferenceEquals(StudentObj, null))
                            {
                                if (string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                                {
                                    res.StatusCode = 205;//code for blank space
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    StudentObj.AgencyID = saveStudentRequest.AgencyID;
                                    StudentObj.ParentID = saveStudentRequest.ParentID;
                                    StudentObj.FirstName = saveStudentRequest.FirstName ?? String.Empty;
                                    StudentObj.LastName = saveStudentRequest.LastName ?? String.Empty;
                                    studentName = saveStudentRequest.FirstName + ' ' + saveStudentRequest.LastName;
                                    saveStudentRequest.StudentName = studentName;
                                    StudentObj.StudentName = studentName;
                                    StudentObj.GenderID = saveStudentRequest.GenderID;
                                    StudentObj.ImagePath = saveStudentRequest.ImagePath ?? String.Empty;
                                    StudentObj.Address = saveStudentRequest.Address ?? String.Empty;
                                    StudentObj.CountryId = saveStudentRequest.CountryId;
                                    StudentObj.StateId = saveStudentRequest.StateId;
                                    StudentObj.CityId = saveStudentRequest.CityId;
                                    StudentObj.PostalCode = saveStudentRequest.PostalCode ?? String.Empty;
                                    StudentObj.SchoolName = saveStudentRequest.SchoolName ?? String.Empty;
                                    StudentObj.TransportationID = saveStudentRequest.TransportationID;
                                    StudentObj.DateOfBirth = saveStudentRequest.DateOfBirth;
                                    StudentObj.FeePaymentTypeID = saveStudentRequest.FeePaymentTypeID;
                                    StudentObj.InsuranceCarrier = saveStudentRequest.InsuranceCarrier ?? String.Empty;
                                    StudentObj.InsurancePolicyNumber = saveStudentRequest.InsurancePolicyNumber ?? String.Empty;
                                    StudentObj.RegisteredDate = saveStudentRequest.RegisteredDate;
                                    StudentObj.ChildsAddress = saveStudentRequest.ChildsAddress ?? String.Empty;
                                    StudentObj.PhysicianName = saveStudentRequest.PhysicianName ?? String.Empty;
                                    StudentObj.PreferredHospital = saveStudentRequest.PreferredHospital ?? String.Empty;
                                    StudentObj.ChildsContactNumber = saveStudentRequest.ChildsContactNumber;
                                    StudentObj.PhysicianContactNumber = saveStudentRequest.PhysicianContactNumber;
                                    StudentObj.IsDeleted = saveStudentRequest.IsDeleted;
                                    StudentObj.UpdatedBy = saveStudentRequest.UpdatedBy;
                                    StudentObj.UpdatedDate = saveStudentRequest.UpdatedDate;
                                    StudentObj.DeletedBy = saveStudentRequest.DeletedBy;
                                    StudentObj.DeletedDate = saveStudentRequest.DeletedDate;
                                    StudentObj.ChildNotes = String.Empty;
                                    StudentObj.PhysicianAddress = String.Empty;
                                    StudentObj.ChildStartDate = DateTime.Now;

                                    _studentRepository.SaveChanges();
                                    id = StudentObj.Id;
                                    DisplayMessage = "Student Information has been updated.";
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    daycaredb.Commit();
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
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // Service for version 2.0
        public ResponseViewModal SaveStudent(StudentV2ViewModel saveStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long mapid = 0;
                        Student StudentObj = null;
                        Parent ParentObj = null;
                        string studentName = "";
                        if (saveStudentRequest.AgencyID != 0 && saveStudentRequest.StudentId == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else if (!string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) && !string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                            {
                                //StudentObj = _studentRepository.Get(x => x.FirstName == saveStudentRequest.FirstName && x.LastName == saveStudentRequest.LastName && !x.IsDeleted);
                                // Check the student name for the parent
                                StudentObj = _studentRepository.Get(x => x.FirstName == saveStudentRequest.FirstName && x.LastName == saveStudentRequest.LastName && !x.IsDeleted && x.ParentID == saveStudentRequest.ParentID);
                                if (!ReferenceEquals(StudentObj, null))
                                {
                                    res.StatusCode = 206;//code for blank space
                                    DisplayMessage = "Student Already Exists With Same Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    if (saveStudentRequest.AddressAsParent == true)
                                    {
                                        ParentObj = _parentRepository.Get(x => x.Id == saveStudentRequest.ParentID);
                                        saveStudentRequest.Address = ParentObj.Address;
                                    }
                                    studentName = saveStudentRequest.FirstName + ' ' + saveStudentRequest.LastName;
                                    saveStudentRequest.StudentName = studentName;
                                    saveStudentRequest.CreatedBy = saveStudentRequest.CreatedBy;
                                    saveStudentRequest.CreatedDate = DateTime.UtcNow;
                                    StudentObj = new Student();
                                    StudentObj.Id = saveStudentRequest.StudentId;
                                    Mapper.Map(saveStudentRequest, StudentObj);
                                    _studentRepository.Create(StudentObj);
                                    _studentRepository.SaveChanges();
                                    id = StudentObj.Id;
                                    if (id > 0)
                                    {
                                        ParentStudentMapping mappObj = new ParentStudentMapping();
                                        mappObj.AgencyID = saveStudentRequest.AgencyID;
                                        mappObj.StudentID = id;
                                        mappObj.ParentID = saveStudentRequest.ParentID;
                                        mappObj.IsParent = true;
                                        mappObj.IsSecondaryParent = false;
                                        mappObj.IsGaurdian = false;
                                        mappObj.IsActive = true;
                                        mappObj.IsDeleted = false;
                                        mappObj.CreatedBy = saveStudentRequest.CreatedBy;
                                        mappObj.CreatedDate = DateTime.UtcNow;
                                        _parentStudentMapping.Create(mappObj);
                                        _parentStudentMapping.SaveChanges();
                                        mapid = mappObj.Id;
                                    }
                                    DisplayMessage = "Student Information has been saved.";
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    daycaredb.Commit();
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    var parentList = _parentRepository.GetAll().Where(x => x.Id == saveStudentRequest.ParentID).FirstOrDefault();
                                    var userDeviceToken = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == parentList.UserID).Select(x => x.DeviceToken).FirstOrDefault();
                                    string[] deviceToken = { userDeviceToken };
                                    string title = "New Notification";
                                    string body = "New student added with name " + studentName;
                                    var response = _pushNotification.SendPushNotification(deviceToken, title, body, new object(), true);
                                }
                            }
                        }
                        else if (saveStudentRequest.StudentId > 0 && saveStudentRequest.IsDeleted == true)
                        {
                            StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId);
                            if (!ReferenceEquals(StudentObj, null))
                            {
                                StudentObj.IsDeleted = saveStudentRequest.IsDeleted;
                                StudentObj.DeletedBy = saveStudentRequest.DeletedBy;
                                StudentObj.DeletedDate = DateTime.UtcNow;
                                StudentObj.DeletedReason = saveStudentRequest.DeletedReason;
                                _studentRepository.SaveChanges();
                                id = StudentObj.Id;
                                DisplayMessage = "Student Information has been Activated.";
                                res.IsSuccess = true;
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveStudentRequest.StudentId > 0)
                        {
                            StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId && !x.IsDeleted);
                            if (!ReferenceEquals(StudentObj, null))
                            {
                                if (string.IsNullOrWhiteSpace(saveStudentRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentRequest.LastName ?? string.Empty))
                                {
                                    res.StatusCode = 205;//code for blank space
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    if (saveStudentRequest.UpdatedFlag == 1)
                                    {
                                        SaveStudentLog(saveStudentRequest, StudentObj);
                                    }
                                    StudentObj.AgencyID = saveStudentRequest.AgencyID;
                                    StudentObj.ParentID = saveStudentRequest.ParentID;
                                    StudentObj.FirstName = saveStudentRequest.FirstName ?? String.Empty;
                                    StudentObj.LastName = saveStudentRequest.LastName ?? String.Empty;
                                    studentName = saveStudentRequest.FirstName + ' ' + saveStudentRequest.LastName;
                                    saveStudentRequest.StudentName = studentName;
                                    StudentObj.StudentName = studentName;
                                    StudentObj.GenderID = saveStudentRequest.GenderID;
                                    StudentObj.ImagePath = saveStudentRequest.ImagePath ?? String.Empty;
                                    StudentObj.Address = saveStudentRequest.Address ?? String.Empty;
                                    StudentObj.CountryId = saveStudentRequest.CountryId;
                                    StudentObj.StateId = saveStudentRequest.StateId;
                                    StudentObj.CityId = saveStudentRequest.CityId;
                                    StudentObj.PostalCode = saveStudentRequest.PostalCode ?? String.Empty;
                                    StudentObj.SchoolName = saveStudentRequest.SchoolName ?? String.Empty;
                                    StudentObj.TransportationID = saveStudentRequest.TransportationID;
                                    StudentObj.DateOfBirth = saveStudentRequest.DateOfBirth;
                                    StudentObj.FeePaymentTypeID = saveStudentRequest.FeePaymentTypeID;
                                    StudentObj.InsuranceCarrier = saveStudentRequest.InsuranceCarrier ?? String.Empty;
                                    StudentObj.InsurancePolicyNumber = saveStudentRequest.InsurancePolicyNumber ?? String.Empty;
                                    StudentObj.RegisteredDate = saveStudentRequest.RegisteredDate;
                                    StudentObj.ChildsAddress = saveStudentRequest.ChildsAddress ?? String.Empty;
                                    StudentObj.PhysicianName = saveStudentRequest.PhysicianName ?? String.Empty;
                                    StudentObj.PreferredHospital = saveStudentRequest.PreferredHospital ?? String.Empty;
                                    StudentObj.ChildsContactNumber = saveStudentRequest.ChildsContactNumber;
                                    StudentObj.PhysicianContactNumber = saveStudentRequest.PhysicianContactNumber;
                                    StudentObj.IsDeleted = saveStudentRequest.IsDeleted;
                                    StudentObj.UpdatedBy = saveStudentRequest.UpdatedBy;
                                    StudentObj.UpdatedDate = saveStudentRequest.UpdatedDate;
                                    StudentObj.DeletedBy = saveStudentRequest.DeletedBy;
                                    StudentObj.DeletedDate = saveStudentRequest.DeletedDate;
                                    StudentObj.ChildNotes = saveStudentRequest.ChildNotes ?? String.Empty;
                                    StudentObj.PhysicianAddress = saveStudentRequest.PhysicianAddress ?? String.Empty;
                                    StudentObj.ChildStartDate = saveStudentRequest.ChildStartDate;
                                    StudentObj.BusID = saveStudentRequest.BusID;

                                    _studentRepository.SaveChanges();
                                    id = StudentObj.Id;
                                    DisplayMessage = "Student Information has been updated.";
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    daycaredb.Commit();
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
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveStudentLog(StudentV2ViewModel saveStudentRequest, Student studentObjOld)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                if (saveStudentRequest.UpdatedFlag == 1)
                {
                    if (studentObjOld.FirstName != saveStudentRequest.FirstName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child First Name";
                        parentLog.OldValue = studentObjOld.FirstName;
                        parentLog.NewValue = saveStudentRequest.FirstName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.LastName != saveStudentRequest.LastName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child Last Name";
                        parentLog.OldValue = studentObjOld.LastName;
                        parentLog.NewValue = saveStudentRequest.LastName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.ChildsContactNumber != saveStudentRequest.ChildsContactNumber)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child Mobile Number";
                        parentLog.OldValue = Convert.ToString(studentObjOld.ChildsContactNumber);
                        parentLog.NewValue = Convert.ToString(saveStudentRequest.ChildsContactNumber);
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.GenderID != saveStudentRequest.GenderID)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        var OldGenderName = _genderRepository.GetAll().Where(check => check.Id == studentObjOld.GenderID).Select(s => s.GenderName);
                        var NewGenderName = _genderRepository.GetAll().Where(check => check.Id == saveStudentRequest.GenderID).Select(s => s.GenderName);
                        var OldGenderName1 = OldGenderName.ToList();
                        var NewGenderName1 = NewGenderName.ToList();
                        parentLog.ColumnName = "Child Gender Name";
                        parentLog.OldValue = OldGenderName1[0];
                        parentLog.NewValue = NewGenderName1[0];
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.DateOfBirth.Date != saveStudentRequest.DateOfBirth.Date)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child Date of Birth";
                        parentLog.OldValue = studentObjOld.DateOfBirth.ToString("dd-MM-yyyy"); ;
                        parentLog.NewValue = saveStudentRequest.DateOfBirth.ToString("dd-MM-yyyy");
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.Address != saveStudentRequest.Address)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child Address";
                        parentLog.OldValue = studentObjOld.Address;
                        parentLog.NewValue = saveStudentRequest.Address;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.StateId != saveStudentRequest.StateId)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        var OldStateName = _stateRepository.GetAll().Where(check => check.Id == studentObjOld.StateId).Select(s => s.StateName);
                        var NewStateName = _stateRepository.GetAll().Where(check => check.Id == saveStudentRequest.StateId).Select(s => s.StateName);
                        var OldStateName1 = OldStateName.ToList();
                        var NewStateName1 = NewStateName.ToList();
                        parentLog.ColumnName = "Child State";
                        parentLog.OldValue = OldStateName1[0];
                        parentLog.NewValue = NewStateName1[0];
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.CityId != saveStudentRequest.CityId)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        var OldCityName = _cityRepository.GetAll().Where(check => check.Id == studentObjOld.CityId).Select(s => s.CityName);
                        var NewCityName = _cityRepository.GetAll().Where(check => check.Id == saveStudentRequest.CityId).Select(s => s.CityName);
                        var OldCityName1 = OldCityName.ToList();
                        var NewCityName1 = NewCityName.ToList();
                        parentLog.ColumnName = "Child City";
                        parentLog.OldValue = OldCityName1[0];
                        parentLog.NewValue = NewCityName1[0];
                        parentLogViewModels.Add(parentLog);
                    }
                    //if (studentObjOld.ChildStartDate != saveStudentRequest.ChildStartDate)
                    //{
                    //    ParentLogViewModel parentLog = new ParentLogViewModel();
                    //    parentLog.AgencyID = saveStudentRequest.AgencyID;
                    //    parentLog.IsActive = true;
                    //    parentLog.IsDeleted = false;
                    //    parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                    //    parentLog.CreatedDate = DateTime.Now;
                    //    parentLog.ValueUpdateDate = DateTime.Now.Date;
                    //    parentLog.ParentID = saveStudentRequest.UpdatedBy;
                    //    parentLog.UpdatedFor = studentObjOld.StudentName;
                    //    parentLog.ColumnName = "Child Start Date";
                    //    parentLog.OldValue = studentObjOld.ChildStartDate.ToString();
                    //    parentLog.NewValue = saveStudentRequest.ChildStartDate.ToString();
                    //    parentLogViewModels.Add(parentLog);
                    //}
                    if (studentObjOld.PostalCode != saveStudentRequest.PostalCode)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child Postal Code";
                        parentLog.OldValue = studentObjOld.PostalCode;
                        parentLog.NewValue = saveStudentRequest.PostalCode;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.PhysicianName != saveStudentRequest.PhysicianName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child's Physician Name";
                        parentLog.OldValue = studentObjOld.PhysicianName;
                        parentLog.NewValue = saveStudentRequest.PhysicianName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.PhysicianContactNumber != saveStudentRequest.PhysicianContactNumber)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child's Physician Contact Number";
                        parentLog.OldValue = Convert.ToString(studentObjOld.PhysicianContactNumber);
                        parentLog.NewValue = Convert.ToString(saveStudentRequest.PhysicianContactNumber);
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.PhysicianAddress != saveStudentRequest.PhysicianAddress)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child's Physician Address";
                        parentLog.OldValue = studentObjOld.PhysicianAddress;
                        parentLog.NewValue = saveStudentRequest.PhysicianAddress;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (studentObjOld.PreferredHospital != saveStudentRequest.PreferredHospital)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Child's Preferred Hospital";
                        parentLog.OldValue = studentObjOld.PreferredHospital;
                        parentLog.NewValue = studentObjOld.PreferredHospital;
                        parentLogViewModels.Add(parentLog);
                    }

                    if (studentObjOld.ChildNotes != saveStudentRequest.ChildNotes)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentRequest.UpdatedBy;
                        parentLog.UpdatedFor = studentObjOld.StudentName;
                        parentLog.ColumnName = "Student's Child Notes";
                        parentLog.OldValue = studentObjOld.ChildNotes;
                        parentLog.NewValue = saveStudentRequest.ChildNotes;
                        parentLogViewModels.Add(parentLog);
                    }


                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }
        public ResponseViewModal SaveStudentGaurdians(GuardianViewModel saveStudentGaurdiansRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentGaurdiansRequest.AgencyID > 0)
                    {
                        long id = 0;
                        Guardian guardianObj = null;
                        saveStudentGaurdiansRequest.GuardianName = saveStudentGaurdiansRequest.FirstName + ' ' + saveStudentGaurdiansRequest.LastName;
                        if (saveStudentGaurdiansRequest.AgencyID != 0 && saveStudentGaurdiansRequest.GuardianId == 0)
                        {
                            if (string.IsNullOrWhiteSpace(saveStudentGaurdiansRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentGaurdiansRequest.LastName ?? string.Empty))
                            {
                                res.StatusCode = 205;//code for blank space
                                DisplayMessage = "Please Enter Proper Name.";
                                res.IsSuccess = false;
                            }
                            else
                            {
                                saveStudentGaurdiansRequest.CreatedBy = saveStudentGaurdiansRequest.CreatedBy;
                                saveStudentGaurdiansRequest.CreatedDate = DateTime.UtcNow;
                                saveStudentGaurdiansRequest.IsDeleted = false;
                                saveStudentGaurdiansRequest.IsActive = true;
                                guardianObj = new Guardian();
                                guardianObj.Id = saveStudentGaurdiansRequest.GuardianId;
                                Mapper.Map(saveStudentGaurdiansRequest, guardianObj);
                                _guardianRepository.Create(guardianObj);
                                _guardianRepository.SaveChanges();
                                id = guardianObj.Id;
                                DisplayMessage = "Guardians Information has been saved.";
                                res.IsSuccess = true;
                                res.SaveId = id;
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveStudentGaurdiansRequest.GuardianId > 0 && saveStudentGaurdiansRequest.IsDeleted == true)
                        {
                            guardianObj = _guardianRepository.Get(x => x.Id == saveStudentGaurdiansRequest.GuardianId && !x.IsDeleted);
                            if (!ReferenceEquals(guardianObj, null))
                            {
                                guardianObj.IsDeleted = saveStudentGaurdiansRequest.IsDeleted;
                                guardianObj.DeletedBy = saveStudentGaurdiansRequest.DeletedBy;
                                guardianObj.DeletedDate = DateTime.UtcNow;
                                _guardianRepository.SaveChanges();
                                id = guardianObj.Id;
                                DisplayMessage = "Guardians Information has been deleted.";
                                res.IsSuccess = true;
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else if (saveStudentGaurdiansRequest.GuardianId > 0)
                        {
                            guardianObj = _guardianRepository.Get(x => x.Id == saveStudentGaurdiansRequest.GuardianId && !x.IsDeleted);
                            if (!ReferenceEquals(guardianObj, null))
                            {

                                if (string.IsNullOrWhiteSpace(saveStudentGaurdiansRequest.FirstName ?? string.Empty) || string.IsNullOrWhiteSpace(saveStudentGaurdiansRequest.LastName ?? string.Empty))
                                {
                                    res.StatusCode = 205;//code for blank space
                                    DisplayMessage = "Please Enter Proper Name.";
                                    res.IsSuccess = false;
                                }
                                else
                                {
                                    guardianObj.GuardianName = saveStudentGaurdiansRequest.GuardianName;
                                    guardianObj.AgencyID = saveStudentGaurdiansRequest.AgencyID;
                                    guardianObj.RelationTypeId = saveStudentGaurdiansRequest.RelationTypeId;
                                    guardianObj.StudentID = saveStudentGaurdiansRequest.StudentID;
                                    guardianObj.FirstName = saveStudentGaurdiansRequest.FirstName;
                                    guardianObj.LastName = saveStudentGaurdiansRequest.LastName;
                                    guardianObj.Address = saveStudentGaurdiansRequest.Address;
                                    guardianObj.CountryId = saveStudentGaurdiansRequest.CountryId;
                                    guardianObj.StateId = saveStudentGaurdiansRequest.StateId;
                                    guardianObj.CityId = saveStudentGaurdiansRequest.CityId;
                                    guardianObj.PostalCode = saveStudentGaurdiansRequest.PostalCode;
                                    guardianObj.PinNumber = saveStudentGaurdiansRequest.PinNumber;
                                    guardianObj.IsAuthorizedToPickup = saveStudentGaurdiansRequest.IsAuthorizedToPickup;
                                    guardianObj.ReasonNotToAllow = saveStudentGaurdiansRequest.ReasonNotToAllow;
                                    guardianObj.EmailId = saveStudentGaurdiansRequest.EmailId;
                                    guardianObj.ImagePath = saveStudentGaurdiansRequest.ImagePath;
                                    guardianObj.Mobile = saveStudentGaurdiansRequest.Mobile;
                                    guardianObj.FailedLoginAttemptCount = guardianObj.FailedLoginAttemptCount;
                                    guardianObj.UpdatedBy = saveStudentGaurdiansRequest.UpdatedBy;
                                    guardianObj.UpdatedDate = DateTime.UtcNow;
                                    _guardianRepository.SaveChanges();
                                    id = guardianObj.Id;
                                    DisplayMessage = "Guardians Information has been updated.";
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    daycaredb.Commit();
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
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveStudentMedication(StudentMedicationViewModel saveStudentMedicationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentMedicationRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentMedication studentMedicationObj = null;
                        // For Add Record
                        if (saveStudentMedicationRequest.AgencyID != 0 && saveStudentMedicationRequest.StudentMedicationID == 0)
                        {
                            saveStudentMedicationRequest.CreatedDate = DateTime.UtcNow;
                            studentMedicationObj = new StudentMedication();
                            Mapper.Map(saveStudentMedicationRequest, studentMedicationObj);
                            _studentMedicationRepository.Create(studentMedicationObj);
                            _studentMedicationRepository.SaveChanges();
                            id = studentMedicationObj.Id;
                        }
                        // For Delete Record
                        if (saveStudentMedicationRequest.StudentMedicationID > 0 && saveStudentMedicationRequest.IsDeleted == true)
                        {
                            studentMedicationObj = _studentMedicationRepository.Get(x => x.Id == saveStudentMedicationRequest.StudentMedicationID && !x.IsDeleted);
                            if (!ReferenceEquals(studentMedicationObj, null))
                            {
                                studentMedicationObj.IsDeleted = true;
                                studentMedicationObj.DeletedBy = saveStudentMedicationRequest.DeletedBy;
                                studentMedicationObj.DeletedDate = DateTime.UtcNow;
                                _studentMedicationRepository.SaveChanges();
                                id = studentMedicationObj.Id;
                            }
                        }
                        // For Update Record
                        if (saveStudentMedicationRequest.StudentMedicationID > 0 && saveStudentMedicationRequest.IsDeleted == false)
                        {
                            studentMedicationObj = _studentMedicationRepository.Get(x => x.Id == saveStudentMedicationRequest.StudentMedicationID && !x.IsDeleted);
                            if (!ReferenceEquals(studentMedicationObj, null))
                            {
                                if (saveStudentMedicationRequest.UpdatedFlag == 1)
                                {
                                    SaveStudentMedicationLog(saveStudentMedicationRequest, studentMedicationObj);
                                }
                                studentMedicationObj.MedicationName = saveStudentMedicationRequest.MedicationName;
                                studentMedicationObj.strength = saveStudentMedicationRequest.strength;
                                studentMedicationObj.Units = saveStudentMedicationRequest.Units;
                                studentMedicationObj.DosageQuantityID = saveStudentMedicationRequest.DosageQuantityID;
                                studentMedicationObj.DoseRepeatID = saveStudentMedicationRequest.DoseRepeatID;
                                studentMedicationObj.HowTaken = saveStudentMedicationRequest.HowTaken;
                                studentMedicationObj.OtherMedication = saveStudentMedicationRequest.OtherMedication;
                                studentMedicationObj.StartDate = saveStudentMedicationRequest.StartDate;
                                studentMedicationObj.EndDate = saveStudentMedicationRequest.EndDate;
                                studentMedicationObj.UpdatedBy = saveStudentMedicationRequest.UpdatedBy;
                                studentMedicationObj.UpdatedDate = DateTime.UtcNow;
                                _studentMedicationRepository.Update(studentMedicationObj);
                                _studentMedicationRepository.SaveChanges();
                                id = studentMedicationObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student Medications Information has been saved.";
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
                }
            }
            return res;
        }

        public ResponseViewModal SaveStudentMedicationLog(StudentMedicationViewModel saveStudentMedicationRequest, StudentMedication studentMedicationObj)
        {
            IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == saveStudentMedicationRequest.AgencyID && check.Id == saveStudentMedicationRequest.StudentID);
            var result = selectedStudents.ToList();
            var StudentName = result[0].StudentName;
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                if (saveStudentMedicationRequest.UpdatedFlag == 1)
                {
                    if (saveStudentMedicationRequest.MedicationName != studentMedicationObj.MedicationName)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Medicine";
                        parentLog.OldValue = studentMedicationObj.MedicationName;
                        parentLog.NewValue = saveStudentMedicationRequest.MedicationName;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.strength != studentMedicationObj.strength)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Medicine Strength";
                        parentLog.OldValue = studentMedicationObj.strength;
                        parentLog.NewValue = saveStudentMedicationRequest.strength;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.Units != studentMedicationObj.Units)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Medicine Unit";
                        parentLog.OldValue = Convert.ToString(studentMedicationObj.Units);
                        parentLog.NewValue = Convert.ToString(saveStudentMedicationRequest.Units);
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.HowTaken != studentMedicationObj.HowTaken)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Medicine How Taken";
                        parentLog.OldValue = studentMedicationObj.HowTaken;
                        parentLog.NewValue = saveStudentMedicationRequest.HowTaken;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.OtherMedication != studentMedicationObj.OtherMedication)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Other Medication";
                        parentLog.OldValue = studentMedicationObj.OtherMedication;
                        parentLog.NewValue = saveStudentMedicationRequest.OtherMedication;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.StartDate.Date != studentMedicationObj.StartDate.Date)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Medicine Start Date";
                        parentLog.OldValue = studentMedicationObj.StartDate.ToString("dd-MM-yyyy");
                        parentLog.NewValue = saveStudentMedicationRequest.StartDate.ToString("dd-MM-yyyy");
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentMedicationRequest.EndDate.Date != studentMedicationObj.EndDate.Date)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentMedicationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentMedicationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Medicine End Date";
                        parentLog.OldValue = studentMedicationObj.EndDate.ToString("dd-MM-yyyy");
                        parentLog.NewValue = saveStudentMedicationRequest.EndDate.ToString("dd-MM-yyyy");
                        parentLogViewModels.Add(parentLog);
                    }

                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }

        public ResponseViewModal SaveStudentImmunization(StudentImmunizationViewModel saveStudentImmunizationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentImmunizationRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentImmunization studentImmunizationObj = null;
                        // For Add Record
                        if (saveStudentImmunizationRequest.AgencyID != 0 && saveStudentImmunizationRequest.StudentImmunizationID == 0)
                        {

                            saveStudentImmunizationRequest.CreatedDate = DateTime.UtcNow;
                            studentImmunizationObj = new StudentImmunization();
                            studentImmunizationObj.Id = saveStudentImmunizationRequest.StudentImmunizationID;
                            Mapper.Map(saveStudentImmunizationRequest, studentImmunizationObj);
                            _studentImmunizationRepository.Create(studentImmunizationObj);
                            _studentImmunizationRepository.SaveChanges();
                            id = studentImmunizationObj.Id;
                        }
                        // For Delete Record
                        if (saveStudentImmunizationRequest.StudentImmunizationID > 0 && saveStudentImmunizationRequest.IsDeleted == true)
                        {
                            studentImmunizationObj = _studentImmunizationRepository.Get(x => x.Id == saveStudentImmunizationRequest.StudentImmunizationID && !x.IsDeleted);
                            if (!ReferenceEquals(studentImmunizationObj, null))
                            {
                                studentImmunizationObj.IsDeleted = true;
                                studentImmunizationObj.DeletedBy = saveStudentImmunizationRequest.DeletedBy;
                                studentImmunizationObj.DeletedDate = DateTime.UtcNow;
                                _studentImmunizationRepository.SaveChanges();
                                id = studentImmunizationObj.Id;
                            }
                        }
                        // For Update Record
                        if (saveStudentImmunizationRequest.StudentImmunizationID > 0 && saveStudentImmunizationRequest.IsDeleted == false)
                        {
                            studentImmunizationObj = _studentImmunizationRepository.Get(x => x.Id == saveStudentImmunizationRequest.StudentImmunizationID && !x.IsDeleted);
                            if (!ReferenceEquals(studentImmunizationObj, null))
                            {
                                if (saveStudentImmunizationRequest.UpdatedFlag == 1)
                                {
                                    SaveStudentImmunizationLog(saveStudentImmunizationRequest, studentImmunizationObj);
                                }
                                studentImmunizationObj.ImmunizationID = saveStudentImmunizationRequest.ImmunizationID;
                                studentImmunizationObj.DateReceived = saveStudentImmunizationRequest.DateReceived;
                                studentImmunizationObj.OtherImmunization = saveStudentImmunizationRequest.OtherImmunization;
                                studentImmunizationObj.Abbreviation = saveStudentImmunizationRequest.Abbreviation;
                                studentImmunizationObj.UpdatedBy = saveStudentImmunizationRequest.UpdatedBy;
                                studentImmunizationObj.UpdatedDate = DateTime.UtcNow;
                                _studentImmunizationRepository.Update(studentImmunizationObj);
                                _studentImmunizationRepository.SaveChanges();
                                id = studentImmunizationObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student Immunization Information has been saved.";
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

        public ResponseViewModal SaveStudentImmunizationLog(StudentImmunizationViewModel saveStudentImmunizationRequest, StudentImmunization studentImmunizationObjOld)
        {
            IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == saveStudentImmunizationRequest.AgencyID && check.Id == saveStudentImmunizationRequest.StudentID);
            var result = selectedStudents.ToList();
            var StudentName = result[0].StudentName;
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                if (saveStudentImmunizationRequest.UpdatedFlag == 1)
                {
                    if (saveStudentImmunizationRequest.DateReceived.Date != studentImmunizationObjOld.DateReceived.Date)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentImmunizationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Immunization Received Date";
                        parentLog.OldValue = studentImmunizationObjOld.DateReceived.ToString("dd-MM-yyyy");
                        parentLog.NewValue = saveStudentImmunizationRequest.DateReceived.ToString("dd-MM-yyyy");
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentImmunizationRequest.OtherImmunization != studentImmunizationObjOld.OtherImmunization)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentImmunizationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Other Immunization";
                        parentLog.OldValue = studentImmunizationObjOld.OtherImmunization;
                        parentLog.NewValue = saveStudentImmunizationRequest.OtherImmunization;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentImmunizationRequest.Abbreviation != studentImmunizationObjOld.Abbreviation)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentImmunizationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Abbreviation";
                        parentLog.OldValue = studentImmunizationObjOld.Abbreviation;
                        parentLog.NewValue = saveStudentImmunizationRequest.Abbreviation;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentImmunizationRequest.ImmunizationID != studentImmunizationObjOld.ImmunizationID)
                    {
                        var OldRelationName = _immunizationRepository.GetAll().Where(check => check.Id == studentImmunizationObjOld.ImmunizationID).Select(s => s.ImmunizationDescription);
                        var NewRelationName = _immunizationRepository.GetAll().Where(check => check.Id == saveStudentImmunizationRequest.ImmunizationID).Select(s => s.ImmunizationDescription);
                        var OldRelationName1 = OldRelationName.ToList();
                        var NewRelationName1 = NewRelationName.ToList();
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentImmunizationRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentImmunizationRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Immunization";
                        parentLog.OldValue = OldRelationName1[0];
                        parentLog.NewValue = NewRelationName1[0];
                        parentLogViewModels.Add(parentLog);
                    }

                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }

        public ResponseViewModal SaveStudentAllergies(StudentAllergiesViewModel saveStudentAllergiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentAllergiesRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentAllergies studentAllergiesObj = null;
                        // For Add Record
                        if (saveStudentAllergiesRequest.AgencyID != 0 && saveStudentAllergiesRequest.StudentAllergiesID == 0)
                        {
                            saveStudentAllergiesRequest.CreatedDate = DateTime.UtcNow;
                            studentAllergiesObj = new StudentAllergies();
                            studentAllergiesObj.Id = saveStudentAllergiesRequest.StudentAllergiesID;
                            Mapper.Map(saveStudentAllergiesRequest, studentAllergiesObj);
                            _studentAllergiesRepository.Create(studentAllergiesObj);
                            _studentAllergiesRepository.SaveChanges();
                            id = studentAllergiesObj.Id;
                        }
                        // For Delete Record
                        if (saveStudentAllergiesRequest.StudentAllergiesID > 0 && saveStudentAllergiesRequest.IsDeleted == true)
                        {
                            studentAllergiesObj = _studentAllergiesRepository.Get(x => x.Id == saveStudentAllergiesRequest.StudentAllergiesID && !x.IsDeleted);
                            if (!ReferenceEquals(studentAllergiesObj, null))
                            {
                                studentAllergiesObj.IsDeleted = true;
                                studentAllergiesObj.DeletedBy = saveStudentAllergiesRequest.DeletedBy;
                                studentAllergiesObj.DeletedDate = DateTime.UtcNow;
                                _studentAllergiesRepository.SaveChanges();
                                id = studentAllergiesObj.Id;
                            }
                        }
                        // For Update Record
                        if (saveStudentAllergiesRequest.StudentAllergiesID > 0 && saveStudentAllergiesRequest.IsDeleted == false)
                        {
                            studentAllergiesObj = _studentAllergiesRepository.Get(x => x.Id == saveStudentAllergiesRequest.StudentAllergiesID && !x.IsDeleted);
                            if (!ReferenceEquals(studentAllergiesObj, null))
                            {
                                if (saveStudentAllergiesRequest.UpdatedFlag == 1)
                                {
                                    SaveStudentAllergiesLog(saveStudentAllergiesRequest, studentAllergiesObj);
                                }
                                studentAllergiesObj.AllergyReactionTypeID = saveStudentAllergiesRequest.AllergyReactionTypeID;
                                studentAllergiesObj.AllergyNameID = saveStudentAllergiesRequest.AllergyNameID;
                                studentAllergiesObj.AllergyComment = saveStudentAllergiesRequest.AllergyComment;
                                studentAllergiesObj.FirstAllergyObservation = saveStudentAllergiesRequest.FirstAllergyObservation;
                                studentAllergiesObj.LastAllergyObservation = saveStudentAllergiesRequest.LastAllergyObservation;
                                studentAllergiesObj.Treatment = saveStudentAllergiesRequest.Treatment;
                                studentAllergiesObj.AllergyTypeID = saveStudentAllergiesRequest.AllergyTypeID;
                                studentAllergiesObj.UpdatedBy = saveStudentAllergiesRequest.UpdatedBy;
                                studentAllergiesObj.UpdatedDate = DateTime.UtcNow;
                                _studentAllergiesRepository.Update(studentAllergiesObj);
                                _studentAllergiesRepository.SaveChanges();
                                id = studentAllergiesObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student Allergies Information has been saved.";
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

        public ResponseViewModal SaveStudentAllergiesLog(StudentAllergiesViewModel saveStudentAllergiesRequest, StudentAllergies studentAllergiesObjOld)
        {
            string FirstAllergyObservation = null; string LastAllergyObservation = null; string FirstAllergyObservationOld = null; string LastAllergyObservationOld = null;
            if (saveStudentAllergiesRequest.FirstAllergyObservation.HasValue)
            { FirstAllergyObservation = saveStudentAllergiesRequest.FirstAllergyObservation.Value.ToShortDateString(); }
            else { FirstAllergyObservation = Convert.ToString(saveStudentAllergiesRequest.FirstAllergyObservation); }

            if (saveStudentAllergiesRequest.LastAllergyObservation.HasValue)
            { LastAllergyObservation = saveStudentAllergiesRequest.LastAllergyObservation.Value.ToShortDateString(); }
            else { LastAllergyObservation = Convert.ToString(saveStudentAllergiesRequest.LastAllergyObservation); }

            if (studentAllergiesObjOld.FirstAllergyObservation.HasValue)
            { FirstAllergyObservationOld = studentAllergiesObjOld.FirstAllergyObservation.Value.ToShortDateString(); }
            else { FirstAllergyObservationOld = Convert.ToString(studentAllergiesObjOld.FirstAllergyObservation); }

            if (studentAllergiesObjOld.LastAllergyObservation.HasValue)
            { LastAllergyObservationOld = studentAllergiesObjOld.LastAllergyObservation.Value.ToShortDateString(); }
            else { LastAllergyObservationOld = Convert.ToString(studentAllergiesObjOld.LastAllergyObservation); }

            IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == saveStudentAllergiesRequest.AgencyID && check.Id == saveStudentAllergiesRequest.StudentID);
            var result = selectedStudents.ToList();
            var StudentName = result[0].StudentName;
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                if (saveStudentAllergiesRequest.UpdatedFlag == 1)
                {
                    if (saveStudentAllergiesRequest.Treatment != studentAllergiesObjOld.Treatment)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Treatment";
                        parentLog.OldValue = studentAllergiesObjOld.Treatment;
                        parentLog.NewValue = saveStudentAllergiesRequest.Treatment;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (FirstAllergyObservation != FirstAllergyObservationOld)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy First Observation";
                        parentLog.OldValue = FirstAllergyObservationOld;
                        parentLog.NewValue = FirstAllergyObservation;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (LastAllergyObservation != LastAllergyObservationOld)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy Last Observation";
                        parentLog.OldValue = LastAllergyObservationOld;
                        parentLog.NewValue = LastAllergyObservation;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentAllergiesRequest.AllergyComment != studentAllergiesObjOld.AllergyComment)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy Comment";
                        parentLog.OldValue = studentAllergiesObjOld.AllergyComment;
                        parentLog.NewValue = saveStudentAllergiesRequest.AllergyComment;
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentAllergiesRequest.AllergyNameID != studentAllergiesObjOld.AllergyNameID)
                    {
                        var OldRelationName = _allergyNameRepository.GetAll().Where(check => check.Id == studentAllergiesObjOld.AllergyNameID).Select(s => s.NameOfAllergy);
                        var NewRelationName = _allergyNameRepository.GetAll().Where(check => check.Id == saveStudentAllergiesRequest.AllergyNameID).Select(s => s.NameOfAllergy);
                        var OldRelationName1 = OldRelationName.ToList();
                        var NewRelationName1 = NewRelationName.ToList();
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy";
                        parentLog.OldValue = OldRelationName1[0];
                        parentLog.NewValue = NewRelationName1[0];
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentAllergiesRequest.AllergyTypeID != studentAllergiesObjOld.AllergyTypeID)
                    {
                        var OldRelationName = _allergyTypeRepository.GetAll().Where(check => check.Id == studentAllergiesObjOld.AllergyTypeID).Select(s => s.AllergyTypeName);
                        var NewRelationName = _allergyTypeRepository.GetAll().Where(check => check.Id == saveStudentAllergiesRequest.AllergyTypeID).Select(s => s.AllergyTypeName);
                        var OldRelationName1 = OldRelationName.ToList();
                        var NewRelationName1 = NewRelationName.ToList();
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy Type";
                        parentLog.OldValue = OldRelationName1[0];
                        parentLog.NewValue = NewRelationName1[0];
                        parentLogViewModels.Add(parentLog);
                    }
                    if (saveStudentAllergiesRequest.AllergyReactionTypeID != studentAllergiesObjOld.AllergyReactionTypeID)
                    {
                        var OldRelationName = _allergyReactionTypeRepository.GetAll().Where(check => check.Id == studentAllergiesObjOld.AllergyReactionTypeID).Select(s => s.AllergyReactionTypeName);
                        var NewRelationName = _allergyReactionTypeRepository.GetAll().Where(check => check.Id == saveStudentAllergiesRequest.AllergyReactionTypeID).Select(s => s.AllergyReactionTypeName);
                        var OldRelationName1 = OldRelationName.ToList();
                        var NewRelationName1 = NewRelationName.ToList();
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentAllergiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentAllergiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Allergy Reaction Type";
                        parentLog.OldValue = OldRelationName1[0];
                        parentLog.NewValue = NewRelationName1[0];
                        parentLogViewModels.Add(parentLog);
                    }

                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }


        public ResponseViewModal SaveStudentDisabilities(StudentDisabilitiesViewModel saveStudentDisabilitiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentDisabilitiesRequest.AgencyID > 0)
                    {
                        long id = 0;
                        StudentDisabilities studentDisabilitiesObj = null;
                        //For Add Record
                        if (saveStudentDisabilitiesRequest.AgencyID != 0 && saveStudentDisabilitiesRequest.Id == 0)
                        {
                            saveStudentDisabilitiesRequest.CreatedDate = DateTime.UtcNow;
                            studentDisabilitiesObj = new StudentDisabilities();
                            studentDisabilitiesObj.Id = saveStudentDisabilitiesRequest.Id;
                            Mapper.Map(saveStudentDisabilitiesRequest, studentDisabilitiesObj);
                            _studentDisabilitiesRepository.Create(studentDisabilitiesObj);
                            _studentDisabilitiesRepository.SaveChanges();
                            id = studentDisabilitiesObj.Id;
                        }
                        //For Delete Record
                        if (saveStudentDisabilitiesRequest.Id > 0 && saveStudentDisabilitiesRequest.IsDeleted == true)
                        {
                            studentDisabilitiesObj = _studentDisabilitiesRepository.Get(x => x.Id == saveStudentDisabilitiesRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentDisabilitiesObj, null))
                            {
                                studentDisabilitiesObj.IsDeleted = true;
                                studentDisabilitiesObj.DeletedBy = saveStudentDisabilitiesRequest.DeletedBy;
                                studentDisabilitiesObj.DeletedDate = DateTime.UtcNow;
                                _studentDisabilitiesRepository.SaveChanges();
                                id = studentDisabilitiesObj.Id;
                            }
                        }
                        //For Update Record
                        if (saveStudentDisabilitiesRequest.Id > 0 && saveStudentDisabilitiesRequest.IsDeleted == false)
                        {
                            studentDisabilitiesObj = _studentDisabilitiesRepository.Get(x => x.Id == saveStudentDisabilitiesRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(studentDisabilitiesObj, null))
                            {
                                if (saveStudentDisabilitiesRequest.UpdatedFlag == 1)
                                {
                                    SaveStudentDisabilitiesLog(saveStudentDisabilitiesRequest, studentDisabilitiesObj);
                                }
                                studentDisabilitiesObj.Description = saveStudentDisabilitiesRequest.Description;
                                studentDisabilitiesObj.UpdatedBy = saveStudentDisabilitiesRequest.UpdatedBy;
                                studentDisabilitiesObj.UpdatedDate = DateTime.UtcNow;
                                _studentDisabilitiesRepository.Update(studentDisabilitiesObj);
                                _studentDisabilitiesRepository.SaveChanges();
                                id = studentDisabilitiesObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student Disabilities Information has been saved.";
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

        public ResponseViewModal SaveStudentDisabilitiesLog(StudentDisabilitiesViewModel saveStudentDisabilitiesRequest, StudentDisabilities studentDisabilitiesObjOld)
        {
            IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == saveStudentDisabilitiesRequest.AgencyID && check.Id == saveStudentDisabilitiesRequest.StudentID);
            var result = selectedStudents.ToList();
            var StudentName = result[0].StudentName;
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ParentLogViewModel> parentLogViewModels = new List<ParentLogViewModel>();
                if (saveStudentDisabilitiesRequest.UpdatedFlag == 1)
                {
                    if (saveStudentDisabilitiesRequest.Description != studentDisabilitiesObjOld.Description)
                    {
                        ParentLogViewModel parentLog = new ParentLogViewModel();
                        parentLog.AgencyID = saveStudentDisabilitiesRequest.AgencyID;
                        parentLog.IsActive = true;
                        parentLog.IsDeleted = false;
                        parentLog.CreatedBy = saveStudentDisabilitiesRequest.UpdatedBy;
                        parentLog.CreatedDate = DateTime.Now;
                        parentLog.ValueUpdateDate = DateTime.Now.Date;
                        parentLog.ParentID = saveStudentDisabilitiesRequest.UpdatedBy;
                        parentLog.UpdatedFor = StudentName;
                        parentLog.ColumnName = "Child Disability";
                        parentLog.OldValue = studentDisabilitiesObjOld.Description;
                        parentLog.NewValue = saveStudentDisabilitiesRequest.Description;
                        parentLogViewModels.Add(parentLog);
                    }

                    foreach (var parentLogView in parentLogViewModels)
                    {
                        ParentLog parentLog1 = new ParentLog
                        {
                            AgencyID = parentLogView.AgencyID,
                            IsActive = parentLogView.IsActive,
                            IsDeleted = parentLogView.IsDeleted,
                            CreatedBy = parentLogView.CreatedBy,
                            CreatedDate = parentLogView.CreatedDate,
                            ValueUpdateDate = parentLogView.ValueUpdateDate,
                            ColumnName = parentLogView.ColumnName,
                            OldValue = parentLogView.OldValue,
                            NewValue = parentLogView.NewValue,
                            ParentID = parentLogView.ParentID,
                            UpdatedFor = parentLogView.UpdatedFor,
                        };
                        _pLogRepository.Create(parentLog1);
                    }
                    _pLogRepository.SaveChanges();

                }

                DisplayMessage = "Parent Information has been saved.";
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;

            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }


            return res;

        }

        public ResponseViewModal StudentClassEnrollment(ClassEnrollmentViewModel studentClassEnrollmentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    if (studentClassEnrollmentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        ClassEnrollment classEnrollmentObj = null;
                        if (studentClassEnrollmentRequest.AgencyID != 0 && studentClassEnrollmentRequest.Id == 0)
                        {
                            studentClassEnrollmentRequest.CreatedDate = DateTime.UtcNow;
                            classEnrollmentObj = new ClassEnrollment();
                            studentClassEnrollmentRequest.EnrollmentStatus = 1; // Requested - 1, Enrolled - 2, Cancelled by Parent - 3, Denied by Angency - 4, Completed - 5 
                            classEnrollmentObj.Id = studentClassEnrollmentRequest.Id;
                            Mapper.Map(studentClassEnrollmentRequest, classEnrollmentObj);
                            _classEnrollmentRepository.Create(classEnrollmentObj);
                            _classEnrollmentRepository.SaveChanges();
                            id = classEnrollmentObj.Id;
                        }
                        else if (studentClassEnrollmentRequest.Id > 0)
                        {
                            classEnrollmentObj = _classEnrollmentRepository.Get(x => x.Id == studentClassEnrollmentRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classEnrollmentObj, null))
                            {
                                classEnrollmentObj.ClassesID = studentClassEnrollmentRequest.ClassesID;
                                classEnrollmentObj.ClassEnrollStartDate = studentClassEnrollmentRequest.ClassEnrollStartDate;
                                classEnrollmentObj.ClassEnrollEndDate = studentClassEnrollmentRequest.ClassEnrollEndDate;
                                classEnrollmentObj.AgencyID = studentClassEnrollmentRequest.AgencyID;
                                classEnrollmentObj.IsDeleted = studentClassEnrollmentRequest.IsDeleted;
                                classEnrollmentObj.UpdatedBy = studentClassEnrollmentRequest.UpdatedBy;
                                classEnrollmentObj.UpdatedDate = studentClassEnrollmentRequest.UpdatedDate;
                                classEnrollmentObj.DeletedBy = studentClassEnrollmentRequest.DeletedBy;
                                classEnrollmentObj.DeletedDate = studentClassEnrollmentRequest.DeletedDate;
                                classEnrollmentObj.EnrollmentStatus = studentClassEnrollmentRequest.EnrollmentStatus;
                                _classEnrollmentRepository.SaveChanges();
                                id = classEnrollmentObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student Class Enrollment Information has been saved.";
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
                }
            }
            return res;
        }


        public ResponseViewModal GetAttendanceListforparent(StudentAttendanceRequestViewModel attendaceRequest)
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
                if (attendaceRequest.AgencyID != null && attendaceRequest.AgencyID > 0 && attendaceRequest.AskedDate != null && attendaceRequest.ParentID > 0 && attendaceRequest.StudentID > 0)
                {
                    List<AttendenceViewModel> classAttendence = new List<AttendenceViewModel>();
                    IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck =>
                    classCheck.AgencyID == attendaceRequest.AgencyID && classCheck.StudentID == attendaceRequest.StudentID);

                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID
                     && classCheck.Id == attendaceRequest.StudentID);

                    IQueryable<Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == attendaceRequest.AgencyID);

                    IQueryable<ClassAttendence> classAttendance = _classAttendenceRepository.GetAll().Where(filter => (fromDate <= filter.AttendanceDate && filter.AttendanceDate <= toDate)
                    && filter.AgencyID == attendaceRequest.AgencyID && filter.StudentID == attendaceRequest.StudentID);

                    IQueryable<Guardian> selectedGuardian = _guardianRepository.GetAll().Where(check => check.AgencyID == attendaceRequest.AgencyID);

                    IQueryable<Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == attendaceRequest.AgencyID);

                    classAttendence = (from classEnrollmentObj in classEnrollment

                                       join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id

                                       join classObj in classes
                                       on classEnrollmentObj.ClassesID equals classObj.Id

                                       join classAttendenceprimeobj in classAttendance
                                       on studentObj.Id equals classAttendenceprimeobj.StudentID
                                       into classAttendenceobj
                                       from classAttendenceprimeobj in classAttendenceobj.DefaultIfEmpty()

                                           //join selectedPrimeParentDropBy in selectedGuardian
                                           //on classAttendenceprimeobj.DropedById equals selectedPrimeParentDropBy.Id
                                           //into selectedParentDropBy
                                           //from selectedPrimeParentDropBy in selectedParentDropBy.DefaultIfEmpty()

                                       join selectedPrimeParentDropBy in selectedParent
                                      on classAttendenceprimeobj.DropedById equals selectedPrimeParentDropBy.Id
                                      into selectedParentDropBy
                                       from selectedPrimeParentDropBy in selectedParentDropBy.DefaultIfEmpty()


                                           //join selectedPrimeParentPickBy in selectedGuardian
                                           //on classAttendenceprimeobj.PickupById equals selectedPrimeParentPickBy.Id
                                           //into selectedParentPickBy
                                           //from selectedPrimeParentPickBy in selectedParentPickBy.DefaultIfEmpty()


                                       join selectedPrimeParentPickBy in selectedParent
                                       on classAttendenceprimeobj.PickupById equals selectedPrimeParentPickBy.Id
                                       into selectedParentPickBy
                                       from selectedPrimeParentPickBy in selectedParentPickBy.DefaultIfEmpty()

                                       join attendenceStatusprimeobj in _attendenceStatusRepository.GetAll()
                                       on classAttendenceprimeobj.AttendenceStatusID equals attendenceStatusprimeobj.Id
                                       into attendenceStatusobj
                                       from attendenceStatusprimeobj in attendenceStatusobj.DefaultIfEmpty()

                                       where (!classEnrollmentObj.IsDeleted &&
                                       !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID && classObj.Id == classAttendenceprimeobj.ClassesID)
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
                                           AttendenceStatusName = classAttendenceprimeobj.AttendenceStatusID == null ? "Attendance Not Done Yet" : attendenceStatusprimeobj.AttendenceStatusName,
                                           AttendanceDate = classAttendenceprimeobj.AttendanceDate == null ? attendaceRequest.AskedDate : classAttendenceprimeobj.AttendanceDate,
                                           DropedById = classAttendenceprimeobj.DropedById == null ? 0 : classAttendenceprimeobj.DropedById,
                                           DropedByName = selectedPrimeParentDropBy == null ? "" : selectedPrimeParentDropBy.ParentName,
                                           DropedByOtherId = classAttendenceprimeobj.DropedByOtherId == null ? 0 : classAttendenceprimeobj.DropedByOtherId,
                                           PickupById = classAttendenceprimeobj.PickupById == null ? 0 : classAttendenceprimeobj.PickupById,
                                           PickupByName = selectedPrimeParentPickBy == null ? "" : selectedPrimeParentPickBy.ParentName,
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

                                       }).OrderBy(c => c.StudentName).ToList();

                    res.Data = classAttendence;

                    if (attendaceRequest.limit != 0)
                    {
                        res.Data = classAttendence.Skip((attendaceRequest.page - 1) * attendaceRequest.limit).Take(attendaceRequest.limit).ToList();
                    }
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Student Attendance has been fetched.";
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


        public ResponseViewModal GetStudentClassEnrollment(ParentsStudentRequestViewModel getStudentClassEnrollmentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentClassEnrollmentRequest.AgencyID != null && getStudentClassEnrollmentRequest.AgencyID > 0 && getStudentClassEnrollmentRequest.ParentID > 0)
                {
                    List<ClassEnrollmentViewModel> studentClassEnrollments = new List<ClassEnrollmentViewModel>();
                    IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getStudentClassEnrollmentRequest.AgencyID
                    && (getStudentClassEnrollmentRequest.StudentID == 0 || classCheck.StudentID == getStudentClassEnrollmentRequest.StudentID));

                    IQueryable<Entity.Student.Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getStudentClassEnrollmentRequest.AgencyID
                    && (getStudentClassEnrollmentRequest.StudentID == 0 || classCheck.Id == getStudentClassEnrollmentRequest.StudentID));

                    IQueryable<Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getStudentClassEnrollmentRequest.AgencyID);

                    IQueryable<Entity.Parent.ParentStudentMapping> selectedMapStudents = _parentStudentMapping.GetAll().Where(check => check.AgencyID == getStudentClassEnrollmentRequest.AgencyID && check.ParentID == getStudentClassEnrollmentRequest.ParentID);

                    studentClassEnrollments = (from classEnrollmentObj in classEnrollment
                                               join mapObj in selectedMapStudents on classEnrollmentObj.StudentID equals mapObj.StudentID
                                               join studentObj in students on mapObj.StudentID equals studentObj.Id

                                               join classObj in classes
                                               on classEnrollmentObj.ClassesID equals classObj.Id

                                               where (!classEnrollmentObj.IsDeleted &&
                                               !studentObj.IsDeleted && studentObj.Id == classEnrollmentObj.StudentID)
                                               select new ClassEnrollmentViewModel
                                               {
                                                   Id = classEnrollmentObj.Id,
                                                   AgencyID = classEnrollmentObj.AgencyID,
                                                   ClassesID = classEnrollmentObj.ClassesID,
                                                   ClassName = classObj.ClassName,
                                                   StudentID = classEnrollmentObj.StudentID,
                                                   StudentName = studentObj.StudentName,
                                                   ClassEnrollStartDate = classEnrollmentObj.ClassEnrollStartDate,
                                                   ClassEnrollEndDate = classEnrollmentObj.ClassEnrollEndDate,
                                                   EnrollmentStatus = classEnrollmentObj.EnrollmentStatus
                                               }).OrderBy(c => c.StudentName).ToList();
                    res.Data = studentClassEnrollments;
                    if (getStudentClassEnrollmentRequest.limit != 0)
                    {
                        res.Data = studentClassEnrollments.Skip((getStudentClassEnrollmentRequest.page - 1) * getStudentClassEnrollmentRequest.limit).Take(getStudentClassEnrollmentRequest.limit).ToList();
                    }
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Student Enrollment has been fetched.";
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
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal GetAllIncidentsByChildID(IncidentRequestViewModel getAllIncidentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            IQueryable<Entity.Agency.Incident> selectedIncident;
            try
            {
                if (getAllIncidentsRequest.AgencyID > 0)
                {

                    getAllIncidentsRequest.StudentID = (getAllIncidentsRequest.StudentID == 0 ? 0 : getAllIncidentsRequest.StudentID);
                    var isStudentNameEmpty = getAllIncidentsRequest.StudentID;
                    var minDate = DateTime.MinValue;
                    var isMinDate = false;
                    if (getAllIncidentsRequest.IncidentDate.Date == minDate.Date)
                    {
                        isMinDate = true;
                    }
                    else
                    {
                        isMinDate = false;
                    }

                    List<IncidentDetailsViewModel> allIncidents = new List<IncidentDetailsViewModel>();
                    if (isMinDate)
                    {
                        selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    }
                    else
                    {
                        selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID && getAllIncidentsRequest.IncidentDate.Date == classCheck.IncidentDate.Date);
                    }

                    var selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID && getAllIncidentsRequest.StudentID == classCheck.Id);
                    var selectedTeachers = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    allIncidents = (from incidentObj in selectedIncident
                                    join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                    join teacherObj in selectedTeachers on incidentObj.TeacherID equals teacherObj.Id
                                    join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                    join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                    join classObj in selectedClasses on incidentObj.ClassesID equals classObj.Id
                                    join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                    //where (!incidentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentObj.AgencyID )
                                    where (!incidentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentObj.AgencyID)
                                    select new IncidentDetailsViewModel()
                                    {
                                        Id = incidentObj.Id,
                                        IncidentDate = incidentObj.IncidentDate,
                                        Description = incidentObj.Description ?? String.Empty,
                                        ActionTaken = incidentObj.ActionTaken ?? String.Empty,
                                        IsEmergency = incidentObj.IsEmergency,
                                        IsGeneric = incidentObj.IsGeneric,
                                        StudentID = incidentObj.StudentID,
                                        StudentName = studentObj.StudentName ?? String.Empty,
                                        TeacherID = incidentObj.TeacherID,
                                        TeacherName = teacherObj.TeacherName ?? String.Empty,
                                        IncidentPriortyTypeID = incidentObj.IncidentPriortyTypeID,
                                        IncidentPriortyTypeName = incidentPriortyTypeObj.IncidentPriortyTypeName ?? String.Empty,
                                        AgencyID = incidentObj.AgencyID,
                                        ClassesID = incidentObj.ClassesID,
                                        ClassName = classObj.ClassName ?? String.Empty,
                                        PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty,
                                        NatureOfInjuryID = incidentObj.NatureOfInjuryID,
                                        NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                        FirstAidAdministeredID = incidentObj.FirstAidAdministeredID,
                                        FirstAidAdministeredName = FirstAidAdministeredObj.TeacherName ?? String.Empty,
                                        IsDoctorRequired = incidentObj.IsDoctorRequired,
                                        WasParentInformed = incidentObj.WasParentInformed,
                                        ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty,
                                        IncidentTime = incidentObj.IncidentTime,
                                        ParentComment = incidentObj.ParentComment,
                                        IsAcknowledge = incidentObj.IsAcknowledge,
                                        PartOfBody = incidentObj.PartOfBody,
                                        ContextChild = incidentObj.ContextChild,
                                        ContextEnviroment = incidentObj.ContextEnviroment,
                                        IncidentInvolvments = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll().Where(check => check.IncidentID == incidentObj.Id)
                                                               join studentObj in _studentRepository.GetAll() on incidentInvolvmentObj.StudentID equals studentObj.Id
                                                               //join classObj in _classesRepository.GetAll() on incidentInvolvmentObj.ClassesID equals classObj.Id
                                                               where (!incidentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentObj.AgencyID && getAllIncidentsRequest.StudentID == incidentObj.StudentID && getAllIncidentsRequest.IncidentDate.Date == incidentObj.IncidentDate.Date)
                                                               select new IncidentInvolvmentViewModel()
                                                               {
                                                                   Id = incidentInvolvmentObj.Id,
                                                                   AgencyID = incidentInvolvmentObj.AgencyID,
                                                                   StudentID = incidentInvolvmentObj.StudentID,
                                                                   StudentName = studentObj.StudentName ?? String.Empty,
                                                                   //ClassesID = incidentInvolvmentObj.ClassesID,
                                                                   //ClassName = classObj.ClassName ?? String.Empty,                                                                   
                                                                   IncidentID = incidentInvolvmentObj.IncidentID,
                                                                   CreatedBy = incidentInvolvmentObj.CreatedBy ?? 0,
                                                                   CreatedDate = incidentInvolvmentObj.CreatedDate ?? DateTime.MinValue,
                                                                   UpdatedBy = incidentInvolvmentObj.UpdatedBy ?? 0,
                                                                   UpdatedDate = incidentInvolvmentObj.UpdatedDate ?? DateTime.MinValue,
                                                                   DeletedBy = incidentInvolvmentObj.DeletedBy ?? 0,
                                                                   DeletedDate = incidentInvolvmentObj.DeletedDate ?? DateTime.MinValue
                                                               }).ToList(),
                                        CreatedBy = incidentObj.CreatedBy ?? 0,
                                        CreatedDate = incidentObj.CreatedDate ?? DateTime.MinValue,
                                        UpdatedBy = incidentObj.UpdatedBy ?? 0,
                                        UpdatedDate = incidentObj.UpdatedDate ?? DateTime.MinValue,
                                        DeletedBy = incidentObj.DeletedBy ?? 0,
                                        DeletedDate = incidentObj.DeletedDate ?? DateTime.MinValue
                                    }).OrderBy(c => c.IncidentDate).ToList();
                    res.Data = allIncidents;
                    if (getAllIncidentsRequest.limit != 0)
                    {
                        res.Data = allIncidents.Skip((getAllIncidentsRequest.page) * getAllIncidentsRequest.limit).Take(getAllIncidentsRequest.limit).ToList();
                    }
                    res.TotalRows = allIncidents.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Incidents is successfully fetched.";
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
        public ResponseViewModal GetDailySheetForParent(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getDailySheetMobileRequest.AgencyID != null && getDailySheetMobileRequest.AgencyID > 0 && getDailySheetMobileRequest.AskedDate != null)
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

                    List<DailySheetViewModel> dailySheet = new List<DailySheetViewModel>();
                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetMobileRequest.AgencyID
                    && (getDailySheetMobileRequest.StudentID == 0 || classCheck.StudentID == getDailySheetMobileRequest.StudentID));

                    IQueryable<Student> students = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetMobileRequest.AgencyID
                    && (getDailySheetMobileRequest.StudentID == 0 || classCheck.Id == getDailySheetMobileRequest.StudentID));

                    IQueryable<Entity.Agency.Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getDailySheetMobileRequest.AgencyID);

                    IQueryable<StudentActivities> selectedStudentActivities = _studentActivitiesRepository.GetAll().Where(filter => filter.AgencyID == getDailySheetMobileRequest.AgencyID
                    && (fromDate <= filter.ActivityRegisterDate && filter.ActivityRegisterDate <= toDate)
                    && (getDailySheetMobileRequest.StudentID == 0 || getDailySheetMobileRequest.StudentID == null || filter.StudentID == getDailySheetMobileRequest.StudentID)
                    && (getDailySheetMobileRequest.ClassID == null || getDailySheetMobileRequest.ClassID == 0 || filter.ClassesID == getDailySheetMobileRequest.ClassID));
                    IQueryable<Entity.Masters.ActivityType> selectedActivityType = _activityTypeRepository.GetAll();

                    dailySheet = (from classEnrollmentObj in classEnrollment
                                  join studentObj in students on classEnrollmentObj.StudentID equals studentObj.Id
                                  join classObj in classes on classEnrollmentObj.ClassesID equals classObj.Id

                                  where (!classEnrollmentObj.IsDeleted &&
                                  !studentObj.IsDeleted
                                  && studentObj.Id == classEnrollmentObj.StudentID)
                                  select new DailySheetViewModel
                                  {
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName ?? String.Empty,
                                      ImagePath = studentObj.ImagePath ?? string.Empty,
                                      ClassesID = classObj.Id,
                                      ClassName = classObj.ClassName,
                                      AgencyID = studentObj.AgencyID
                                  }).Distinct().OrderBy(c => c.Id).ToList();

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
                                        //var description = null;
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
                                                    var actDetails = selectedStudentActivityMeal.ToList();
                                                    var mealTittl = _mealPlannerRepository.GetFirstOrDefault(check => check.Id == actDetails[0].MealPlannerID).Title;
                                                    // var description = selectedStudentActivityMeal.Select(select => select.MealComment).FirstOrDefault();
                                                    relatedActivity.ActivityDescription = mealTittl != null ? mealTittl.ToString() : "";
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
                                res.Data = dailySheet.Skip((getDailySheetMobileRequest.page - 1) * getDailySheetMobileRequest.limit).Take(getDailySheetMobileRequest.limit).ToList();
                            }
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Daily Sheet Attendance has been fetched.";
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "No Data found.";
                            res.IsSuccess = true;
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.OK;
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

        public ResponseViewModal UpdateEmailForParent(ParentInformationViewModel updateParebtmailReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            Parent parentObj = null;
            Users userObj = new Users();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (updateParebtmailReq.AgencyID > 0 && (updateParebtmailReq.EmailId != null || updateParebtmailReq.EmailId != "")
                        && updateParebtmailReq.Id > 0)
                    {
                        string EmailIdSpace = updateParebtmailReq.EmailId.TrimStart();
                        string EmailId = EmailIdSpace.TrimEnd();

                        IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == EmailId.ToUpper());
                        if (selectedUser.GetEnumerator().MoveNext() == false)
                        {
                            parentObj = _parentRepository.Get(x => x.Id == updateParebtmailReq.Id && !x.IsDeleted);
                            userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                            if (!ReferenceEquals(parentObj, null))
                            {
                                parentObj.EmailId = updateParebtmailReq.EmailId;
                                userObj.EmailAddress = updateParebtmailReq.EmailId;
                                _userRepository.SaveChanges();
                                _parentRepository.SaveChanges();
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

        public ResponseViewModal ChangeQuickPinForParent(ParentInformationViewModel updateParebtmailReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            Parent parentObj = null;
            Users userObj = new Users();
            bool pin = false;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (updateParebtmailReq.AgencyID > 0 && updateParebtmailReq.Id > 0)
                    {
                        parentObj = _parentRepository.Get(x => x.Id == updateParebtmailReq.Id && !x.IsDeleted);
                        userObj = _userRepository.Get(x => x.Id == parentObj.UserID && !x.IsDeleted);
                        if (!ReferenceEquals(parentObj, null))
                        {
                            QuickPin = _commonService.GenerateRandomNo();
                            while (pin == false)
                            {
                                IQueryable<Entity.User.Users> userDetails = _userRepository.GetAll().Where(Check => Check.AgencyID == updateParebtmailReq.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.AgencyID == updateParebtmailReq.AgencyID && Check.QuickPin == QuickPin && Check.IsDeleted == false);
                                if (userDetails.Count() != 0 || authorizedPersonDetail.Count() != 0)
                                {
                                    QuickPin = _commonService.GenerateRandomNo();
                                    pin = false;
                                }
                                else
                                {
                                    pin = true;
                                }
                            }
                            userObj.QuickPin = QuickPin;
                            _userRepository.SaveChanges();
                            daycaredb.Commit();
                            string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p> Quick Pin Changed!</p> <br><p> Your New Quick Pin is :</p><b> " + QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                            _commonService.SendEmailSync(userObj.EmailAddress, "Your Quick Pin has been changed for Classroom Panda", message);

                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Quick Pin has been updated successfully!";
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

        public ResponseViewModal SaveParentDashboardImagedLikeInformation(PostImageslikeDetailsViewModel postImageslikeDetailsInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (postImageslikeDetailsInformationRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long count = 0;
                        PostImageslikeDetails postimageslikedetailsObj = null;
                        if (postImageslikeDetailsInformationRequest.AgencyID != 0 && postImageslikeDetailsInformationRequest.Id == 0)
                        {

                            postImageslikeDetailsInformationRequest.CreatedDate = DateTime.UtcNow;
                            postimageslikedetailsObj = new PostImageslikeDetails();
                            Mapper.Map(postImageslikeDetailsInformationRequest, postimageslikedetailsObj);
                            List<PostImageslikeDetails> postImageslikeDetails = _postactivityImageslikeRepository.GetAll()
                                                                        .Where(x => x.PostActivitiesID == postImageslikeDetailsInformationRequest.PostActivitiesID
                                                                        && x.PostActivityImagesID == postImageslikeDetailsInformationRequest.PostActivityImagesID
                                                                        && x.AgencyID == postImageslikeDetailsInformationRequest.AgencyID
                                                                        && x.StudentID == postImageslikeDetailsInformationRequest.StudentID
                                                                        && x.CreatedBy == postImageslikeDetailsInformationRequest.CreatedBy
                                                                        && x.IsActive == true
                                                                        && !x.IsDeleted
                                                                        ).ToList();
                            if (postImageslikeDetails.Any())
                            {
                                _postactivityImageslikeRepository.Delete(postImageslikeDetails.FirstOrDefault().Id);
                            }
                            else
                            {
                                _postactivityImageslikeRepository.Create(postimageslikedetailsObj);
                            }

                            _postactivityImageslikeRepository.SaveChanges();
                            id = postimageslikedetailsObj.Id;

                        }

                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Parent Dashbord Images Like Information has been saved.";
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
                }
            }
            return res;
        }


        public ResponseViewModal SaveParentDashboardVideoLikeInformation(PostVideolikeDetailsViewModel postVideolikeDetailsInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (postVideolikeDetailsInformationRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long count = 0;
                        PostVideolikeDetails postvideolikedetailsObj = null;
                        if (postVideolikeDetailsInformationRequest.AgencyID != 0 && postVideolikeDetailsInformationRequest.Id == 0)
                        {

                            postVideolikeDetailsInformationRequest.CreatedDate = DateTime.UtcNow;
                            postvideolikedetailsObj = new PostVideolikeDetails();
                            Mapper.Map(postVideolikeDetailsInformationRequest, postvideolikedetailsObj);
                            List<PostVideolikeDetails> postVideolikeDetails = _postVideolikeDetailsRepository.GetAll()
                                                                        .Where(x => x.PostActivitiesID == postVideolikeDetailsInformationRequest.PostActivitiesID
                                                                        && x.PostActivityVideosID == postVideolikeDetailsInformationRequest.PostActivityVideosID
                                                                        && x.AgencyID == postVideolikeDetailsInformationRequest.AgencyID
                                                                        && x.StudentID == postVideolikeDetailsInformationRequest.StudentID
                                                                        && x.CreatedBy == postVideolikeDetailsInformationRequest.CreatedBy
                                                                        && x.IsActive == true
                                                                        && !x.IsDeleted
                                                                        ).ToList();
                            if (postVideolikeDetails.Any())
                            {
                                _postVideolikeDetailsRepository.Delete(postVideolikeDetails.FirstOrDefault().Id);
                            }
                            else
                            {
                                _postVideolikeDetailsRepository.Create(postvideolikedetailsObj);
                            }
                            _postVideolikeDetailsRepository.SaveChanges();
                            id = postvideolikedetailsObj.Id;
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Parent Dashbord Video Like Information has been saved.";
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
                }
            }
            return res;
        }


        public ResponseViewModal SaveStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentEnrollmentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        long dropInOppositeCatgCount = 0;
                        long regularClsOppositeCatgCount = 0;
                        ClassEnrollment classEnrollmentObj = null;
                        IQueryable<Classes> classes = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == saveStudentEnrollmentRequest.AgencyID && classCheck.IsDeleted == false);
                        IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.StudentID == saveStudentEnrollmentRequest.StudentID && classCheck.AgencyID == saveStudentEnrollmentRequest.AgencyID && classCheck.EnrollmentStatus == 2 && classCheck.IsDeleted == false);
                        long reqClassCategory = _classesRepository.Get(x => x.Id == saveStudentEnrollmentRequest.ClassesID && !x.IsDeleted).CategoryId;
                        var clsCategoriesObj = ((from classesObj in classes
                                                 join a in classEnrollment on classesObj.Id equals a.ClassesID
                                                 where a.StudentID == saveStudentEnrollmentRequest.StudentID && a.AgencyID == saveStudentEnrollmentRequest.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                                 orderby a.Id ascending
                                                 select classesObj.CategoryId).ToList());

                        if (saveStudentEnrollmentRequest.AgencyID != 0 && saveStudentEnrollmentRequest.Id == 0)
                        {
                            classEnrollmentObj = _classEnrollmentRepository.Get(x => x.ClassesID == saveStudentEnrollmentRequest.ClassesID && x.StudentID == saveStudentEnrollmentRequest.StudentID && !x.IsDeleted && (x.EnrollmentStatus == 2 || x.EnrollmentStatus == 1));

                            if (clsCategoriesObj.Count > 0 && reqClassCategory != 6)
                            {
                                if (reqClassCategory == 6)
                                {
                                    dropInOppositeCatgCount = clsCategoriesObj.FirstOrDefault(r => r != 6);
                                }
                                else
                                {
                                    regularClsOppositeCatgCount = clsCategoriesObj.FirstOrDefault(r => r == 6);
                                }

                                if (reqClassCategory == 6 && dropInOppositeCatgCount > 0)
                                {
                                    res.StatusCode = 207;
                                    res.Message = "This student is part of regular class , you cant enroll for drop in class";
                                    res.IsSuccess = false;
                                    return res;
                                }
                                else if (reqClassCategory != 6 && regularClsOppositeCatgCount > 0)
                                {
                                    res.StatusCode = 208;
                                    res.Message = "This student is part drop in class , you cant enroll for regular class";
                                    res.IsSuccess = false;
                                    return res;
                                }
                                else
                                {
                                    if (ReferenceEquals(classEnrollmentObj, null))
                                    {
                                        saveStudentEnrollmentRequest.CreatedDate = DateTime.UtcNow;
                                        classEnrollmentObj = new ClassEnrollment();
                                        classEnrollmentObj.Id = saveStudentEnrollmentRequest.Id;
                                        Mapper.Map(saveStudentEnrollmentRequest, classEnrollmentObj);
                                        _classEnrollmentRepository.Create(classEnrollmentObj);
                                        _classEnrollmentRepository.SaveChanges();
                                        id = classEnrollmentObj.Id;
                                        daycaredb.Commit();
                                        res.IsSuccess = true;
                                        res.SaveId = id;
                                        res.StatusCode = (long)HttpStatusCodes.OK;
                                        res.Message = "Student Enrollement Information has been saved.";
                                    }
                                    else
                                    {
                                        res.StatusCode = 205;
                                        res.Message = "Student Already Enrolled.";
                                        res.IsSuccess = false;
                                        return res;
                                    }
                                }
                            }
                            else if (clsCategoriesObj.Count > 0 && reqClassCategory == 6)
                            {
                                res.StatusCode = 209;
                                res.Message = "This Student is already a part of dropin care you can't enroll for another class!";
                                res.IsSuccess = false;
                                return res;
                            }
                            else
                            {
                                if (ReferenceEquals(classEnrollmentObj, null))
                                {
                                    saveStudentEnrollmentRequest.CreatedDate = DateTime.UtcNow;
                                    classEnrollmentObj = new ClassEnrollment();
                                    classEnrollmentObj.Id = saveStudentEnrollmentRequest.Id;
                                    Mapper.Map(saveStudentEnrollmentRequest, classEnrollmentObj);
                                    _classEnrollmentRepository.Create(classEnrollmentObj);
                                    _classEnrollmentRepository.SaveChanges();
                                    id = classEnrollmentObj.Id;
                                    daycaredb.Commit();
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    res.Message = "Student Enrollement Information has been saved.";
                                }
                                else
                                {
                                    res.StatusCode = 205;
                                    res.Message = "Student Already Enrolled.";
                                    res.IsSuccess = false;
                                    return res;
                                }
                            }
                        }
                        else if (saveStudentEnrollmentRequest.Id > 0)
                        {
                            // Check if student is upating for enrollment to get enrolled for same class category or not 

                            if (saveStudentEnrollmentRequest.EnrollmentStatus == 2 && clsCategoriesObj.Count > 0 && reqClassCategory != 6)
                            {
                                if (reqClassCategory == 6)
                                {
                                    dropInOppositeCatgCount = clsCategoriesObj.FirstOrDefault(r => r != 6);
                                }
                                else
                                {
                                    regularClsOppositeCatgCount = clsCategoriesObj.FirstOrDefault(r => r == 6);
                                }
                                if (reqClassCategory == 6 && dropInOppositeCatgCount > 0)
                                {
                                    res.StatusCode = 207;
                                    res.Message = "This student is part of regular class , you cant enroll for drop in class";
                                    res.IsSuccess = false;
                                    return res;
                                }
                                else if (reqClassCategory != 6 && regularClsOppositeCatgCount > 0)
                                {
                                    res.StatusCode = 208;
                                    res.Message = "This student is part drop in class , you cant enroll for regular class";
                                    res.IsSuccess = false;
                                    return res;
                                }
                                else
                                {
                                    classEnrollmentObj = _classEnrollmentRepository.Get(x => x.Id == saveStudentEnrollmentRequest.Id && x.ClassesID == saveStudentEnrollmentRequest.ClassesID && !x.IsDeleted);
                                    if (!ReferenceEquals(classEnrollmentObj, null))
                                    {
                                        classEnrollmentObj.StudentID = saveStudentEnrollmentRequest.StudentID;
                                        classEnrollmentObj.AgencyID = saveStudentEnrollmentRequest.AgencyID;
                                        classEnrollmentObj.ClassEnrollStartDate = saveStudentEnrollmentRequest.ClassEnrollStartDate;
                                        classEnrollmentObj.ClassEnrollEndDate = saveStudentEnrollmentRequest.ClassEnrollEndDate;
                                        classEnrollmentObj.ClassesID = saveStudentEnrollmentRequest.ClassesID;
                                        classEnrollmentObj.EnrollmentStatus = saveStudentEnrollmentRequest.EnrollmentStatus;
                                        classEnrollmentObj.IsActive = saveStudentEnrollmentRequest.IsActive;
                                        classEnrollmentObj.IsDeleted = saveStudentEnrollmentRequest.IsDeleted;
                                        classEnrollmentObj.UpdatedBy = saveStudentEnrollmentRequest.UpdatedBy;
                                        classEnrollmentObj.UpdatedDate = saveStudentEnrollmentRequest.UpdatedDate;
                                        classEnrollmentObj.DeletedBy = saveStudentEnrollmentRequest.DeletedBy;
                                        classEnrollmentObj.DeletedDate = saveStudentEnrollmentRequest.DeletedDate;
                                        _classEnrollmentRepository.SaveChanges();
                                        id = classEnrollmentObj.Id;
                                    }
                                    else
                                    {
                                        res.StatusCode = 987; // Statuscode
                                        res.Message = "Something went wrong.";
                                        res.IsSuccess = false;
                                        return res;
                                    }
                                }
                            }
                            else if (saveStudentEnrollmentRequest.EnrollmentStatus == 2 && clsCategoriesObj.Count > 0 && reqClassCategory == 6)
                            {
                                res.StatusCode = 209;
                                res.Message = "This Student is already a part of dropin care you can't enroll for another class!";
                                res.IsSuccess = false;
                                return res;
                            }
                            else
                            {
                                classEnrollmentObj = _classEnrollmentRepository.Get(x => x.Id == saveStudentEnrollmentRequest.Id && !x.IsDeleted);
                                if (!ReferenceEquals(classEnrollmentObj, null))
                                {
                                    classEnrollmentObj.StudentID = saveStudentEnrollmentRequest.StudentID;
                                    classEnrollmentObj.AgencyID = saveStudentEnrollmentRequest.AgencyID;
                                    classEnrollmentObj.ClassEnrollStartDate = saveStudentEnrollmentRequest.ClassEnrollStartDate;
                                    classEnrollmentObj.ClassEnrollEndDate = saveStudentEnrollmentRequest.ClassEnrollEndDate;
                                    classEnrollmentObj.ClassesID = saveStudentEnrollmentRequest.ClassesID;
                                    classEnrollmentObj.EnrollmentStatus = saveStudentEnrollmentRequest.EnrollmentStatus;
                                    classEnrollmentObj.IsActive = saveStudentEnrollmentRequest.IsActive;
                                    classEnrollmentObj.IsDeleted = saveStudentEnrollmentRequest.IsDeleted;
                                    classEnrollmentObj.UpdatedBy = saveStudentEnrollmentRequest.UpdatedBy;
                                    classEnrollmentObj.UpdatedDate = saveStudentEnrollmentRequest.UpdatedDate;
                                    classEnrollmentObj.DeletedBy = saveStudentEnrollmentRequest.DeletedBy;
                                    classEnrollmentObj.DeletedDate = saveStudentEnrollmentRequest.DeletedDate;
                                    _classEnrollmentRepository.SaveChanges();
                                    id = classEnrollmentObj.Id;
                                }
                            }
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Enrollement Information has been saved.";
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


        public ResponseViewModal GetAllParentInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0)
                {
                    List<ParentUserViewModel> studentInformation = new List<ParentUserViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                    IQueryable<Entity.Student.Student> selectedstudent = _studentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                    studentInformation = (from parentObj in selectedParent
                                          where (!parentObj.IsDeleted && getParentInformationRequest.AgencyID == parentObj.AgencyID)
                                          select new ParentUserViewModel()
                                          {
                                              Id = parentObj.Id,
                                              ParentName = parentObj.ParentName,
                                              UserName = parentObj.EmailId,
                                              Email = parentObj.EmailId,
                                              AgencyId = parentObj.AgencyID,
                                              ImagePath = parentObj.ImagePath
                                          }).OrderBy(c => c.ParentName).ToList();
                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Information has been fetched.";
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

        public ResponseViewModal ActivateStudent(StudentViewModel saveStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentRequest.AgencyID > 0 && saveStudentRequest.StudentId > 0)
                    {
                        long id = 0;
                        Student StudentObj = null;

                        StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId && x.IsDeleted);
                        if (!ReferenceEquals(StudentObj, null))
                        {
                            if (saveStudentRequest.IsDeleted == false)
                            {
                                StudentObj.IsDeleted = saveStudentRequest.IsDeleted;
                                StudentObj.DeletedBy = saveStudentRequest.DeletedBy;
                                StudentObj.UpdatedDate = DateTime.UtcNow;
                                StudentObj.IsActive = true;
                                id = StudentObj.Id;
                                _studentRepository.SaveChanges();
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Student  has been Activated.";
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


        public ResponseViewModal ActivateParent(ParentInformationViewModel saveParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    Parent parentObj = null;
                    Users userObj = new Users();

                    if (saveParentInformationRequest.AgencyID > 0 && saveParentInformationRequest.Id > 0 && saveParentInformationRequest.IsDeleted == false)
                    {
                        parentObj = _parentRepository.Get(x => x.Id == saveParentInformationRequest.Id && x.IsDeleted);
                        userObj = _userRepository.Get(x => x.Id == parentObj.UserID && x.IsDeleted);
                        if (!ReferenceEquals(parentObj, null) && !ReferenceEquals(userObj, null))
                        {
                            userObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                            userObj.UpdatedBy = saveParentInformationRequest.UpdatedBy;
                            userObj.UpdatedDate = DateTime.UtcNow;
                            parentObj.IsDeleted = saveParentInformationRequest.IsDeleted;
                            parentObj.UpdatedBy = saveParentInformationRequest.UpdatedBy;
                            parentObj.UpdatedDate = DateTime.UtcNow;
                            _parentRepository.SaveChanges();
                            _userRepository.SaveChanges();

                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "This parent has been activated.";
                        }
                        else
                        {
                            daycaredb.Rollback();
                            res.StatusCode = 987;
                            res.Message = "Something went wrong.";
                            res.IsSuccess = false;
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


        public ResponseViewModal GetMasterParentForDropdown(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0)
                {
                    List<ParentUserViewModel> studentInformation = new List<ParentUserViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);

                    studentInformation = (from parentObj in selectedParent
                                          where (!parentObj.IsDeleted && getParentInformationRequest.AgencyID == parentObj.AgencyID && parentObj.IsParent == true && (parentObj.AddedByID == 0))
                                          select new ParentUserViewModel()
                                          {
                                              Id = parentObj.Id,
                                              ParentName = parentObj.ParentName,
                                              UserName = parentObj.EmailId,
                                              Email = parentObj.EmailId,
                                              AgencyId = parentObj.AgencyID,
                                              ImagePath = parentObj.ImagePath
                                          }).OrderBy(c => c.ParentName).ToList();
                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Master Parent Information has been fetched.";
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

        public ResponseViewModal GetClassroomJoinParent(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0)
                {
                    List<ParentUserViewModel> parentInformation = new List<ParentUserViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.IsJoinClassroom == true && check.IsDeleted == false);

                    parentInformation = (from parentObj in selectedParent
                                         select new ParentUserViewModel()
                                         {
                                             Id = parentObj.Id,
                                             ParentName = parentObj.ParentName,
                                             Email = parentObj.EmailId,
                                             AgencyId = parentObj.AgencyID,
                                             ImagePath = parentObj.ImagePath,
                                             FirstName = parentObj.FirstName,
                                             LastName = parentObj.LastName
                                         }).OrderBy(c => c.ParentName).ToList();
                    res.Data = parentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Information has been fetched.";
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


        public ResponseViewModal SaveParentStudentMapping(ParentStudentMappingViewModel requestSaveParentStudentMapping)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    ParentStudentMapping parentStudentMapObj = null;
                    parentStudentMapObj = _parentStudentMapping.Get(x => x.ParentID == requestSaveParentStudentMapping.ParentID && x.StudentID == requestSaveParentStudentMapping.StudentID && !x.IsDeleted);
                    if (ReferenceEquals(parentStudentMapObj, null))
                    {
                        if (requestSaveParentStudentMapping.AgencyID != 0 && requestSaveParentStudentMapping.Id == 0)
                        {
                            requestSaveParentStudentMapping.CreatedDate = DateTime.UtcNow;
                            parentStudentMapObj = new ParentStudentMapping();
                            Mapper.Map(requestSaveParentStudentMapping, parentStudentMapObj);
                            _parentStudentMapping.Create(parentStudentMapObj);
                            _parentStudentMapping.SaveChanges();
                            id = parentStudentMapObj.Id;
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Mapping has been saved.";
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

        public ResponseViewModal GetAllParentWithoutGuardian(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0)
                {
                    List<ParentUserViewModel> studentInformation = new List<ParentUserViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                    IQueryable<Entity.Student.Student> selectedstudent = _studentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                    studentInformation = (from parentObj in selectedParent
                                          where (!parentObj.IsDeleted && getParentInformationRequest.AgencyID == parentObj.AgencyID && !parentObj.IsGaurdian && !parentObj.IsSecondaryParent)
                                          select new ParentUserViewModel()
                                          {
                                              Id = parentObj.Id,
                                              ParentName = parentObj.ParentName,
                                              UserName = parentObj.EmailId,
                                              Email = parentObj.EmailId,
                                              AgencyId = parentObj.AgencyID,
                                              ImagePath = parentObj.ImagePath
                                          }).OrderBy(c => c.ParentName).ToList();
                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Information has been fetched.";
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

        public ResponseViewModal GetParentAccordingToLogin(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getParentInformationRequest.AgencyID > 0)
                {
                    List<ParentUserViewModel> studentInformation = new List<ParentUserViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent;
                    if (getParentInformationRequest.isParent == true)
                    {
                        selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.AddedByID == getParentInformationRequest.ParentID && check.IsSecondaryParent == true || check.IsGaurdian == true);
                    }
                    else if (getParentInformationRequest.isSecondaryParent == true)
                    {
                        selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.AddedByID == getParentInformationRequest.ParentID && check.IsGaurdian == true);
                    }
                    else if (getParentInformationRequest.isGaurdian == true)
                    {
                        selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.AddedByID == getParentInformationRequest.ParentID && check.IsGaurdian == true);
                    }
                    else
                    {
                        selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                    }

                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);//Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);

                    studentInformation = (from parentObj in selectedParent
                                          join cityObj in selectedCity on parentObj.CityId equals cityObj.Id
                                          join genderObj in selectedGenders on parentObj.GenderID equals genderObj.Id
                                          join stateObj in selectedState on parentObj.StateId equals stateObj.Id
                                          join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id

                                          where (getParentInformationRequest.AgencyID == parentObj.AgencyID && parentObj.AddedByID == getParentInformationRequest.ParentID)
                                          select new ParentUserViewModel()
                                          {
                                              Id = parentObj.Id,
                                              ParentName = parentObj.ParentName,
                                              UserName = parentObj.EmailId,
                                              Email = parentObj.EmailId,
                                              AgencyId = parentObj.AgencyID,
                                              ImagePath = parentObj.ImagePath,
                                              IsDelete = parentObj.IsDeleted,
                                              IsGuardian = parentObj.IsGaurdian,
                                              IsSecondParent = parentObj.IsSecondaryParent,
                                              IsParent = parentObj.IsParent,
                                              UserID = parentObj.UserID,
                                              RelationTypeId = parentObj.RelationTypeId,
                                              FirstName = parentObj.FirstName,
                                              LastName = parentObj.LastName,
                                              Address = parentObj.Address,
                                              CountryId = parentObj.CountryId,
                                              StateId = parentObj.StateId,
                                              CityId = parentObj.CityId,
                                              PostalCode = parentObj.PostalCode,
                                              PinNumber = parentObj.PinNumber,
                                              SecurityQuestionId = parentObj.SecurityQuestionId,
                                              SecurityQuestionAnswer = parentObj.SecurityQuestionAnswer,
                                              EmailId = parentObj.EmailId,
                                              SecurityKey = parentObj.SecurityKey,
                                              Mobile = parentObj.Mobile,
                                              FailedLoginAttemptCount = parentObj.FailedLoginAttemptCount,
                                              GenderID = parentObj.GenderID,
                                              GenderName = genderObj.GenderName,
                                              DateOfBirth = parentObj.DateOfBirth,
                                              Profession = parentObj.Profession,

                                              AssociatedChild = (from associateChildObj in _parentStudentMapping.GetAll().Where(check => check.ParentID == parentObj.Id)
                                                                 join studentObj in _studentRepository.GetAll() on associateChildObj.StudentID equals studentObj.Id
                                                                 where (!associateChildObj.IsDeleted && getParentInformationRequest.AgencyID == associateChildObj.AgencyID)
                                                                 select new ParentStudentMappingViewModel()
                                                                 {
                                                                     Id = associateChildObj.Id,
                                                                     AgencyID = associateChildObj.AgencyID,
                                                                     StudentID = associateChildObj.StudentID,
                                                                     StudentName = studentObj.StudentName ?? String.Empty,
                                                                     FirstName = studentObj.FirstName ?? String.Empty,
                                                                     LastName = studentObj.LastName ?? String.Empty,
                                                                     ParentID = parentObj.Id,
                                                                     IsParent = associateChildObj.IsParent,
                                                                     IsSecondaryParent = associateChildObj.IsSecondaryParent,
                                                                     IsGaurdian = associateChildObj.IsGaurdian,
                                                                 }).ToList(),

                                              //below properties are use for mobile only
                                              isSecondaryParent = parentObj.IsSecondaryParent,
                                              isGaurdian = parentObj.IsGaurdian,
                                              //end mobile                     

                                          }).OrderBy(c => c.ParentName).ToList();
                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Information has been fetched.";
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

        public ResponseViewModal GetAllParentInformationForAgency(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Parent.Parent> selectedParent;
                if (getParentInformationRequest.AgencyID > 0)
                {
                    if (getParentInformationRequest.AgencyID > 0)
                    {
                        List<ParentUserViewModel> studentInformation = new List<ParentUserViewModel>();
                        IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == getParentInformationRequest.AgencyID && Check.IsDeleted == false);

                        string parentname = getParentInformationRequest.ParentName.TrimStart();
                        parentname = parentname.TrimEnd();

                        if (getParentInformationRequest.ActivationType.ToLower() == "activated")
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && !check.IsDeleted && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }
                        else if (getParentInformationRequest.ActivationType.ToLower() == "deactivated")
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.IsDeleted && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }
                        else
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }

                        var result = _pLogRepository.GetAll().Where(s => s.IsDeleted == false && s.AgencyID == getParentInformationRequest.AgencyID).GroupBy(x => x.ParentID);

                        IQueryable<Entity.Parent.ParentLog> parentLogs = _pLogRepository.GetAll().Where(s => s.IsDeleted == false && s.AgencyID == getParentInformationRequest.AgencyID).GroupBy(x => x.ParentID).Select(s => s.First());

                        IQueryable<Entity.Student.Student> selectedstudent = _studentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);

                        studentInformation = (from parentObj in selectedParent
                                              join plog in parentLogs on parentObj.Id equals plog.ParentID into pl
                                              from parentLog in pl.DefaultIfEmpty()
                                              where (getParentInformationRequest.AgencyID == parentObj.AgencyID)
                                              select new ParentUserViewModel()
                                              {
                                                  Id = parentObj.Id,
                                                  ParentName = parentObj.ParentName,
                                                  UserName = parentObj.EmailId,
                                                  Email = parentObj.EmailId,
                                                  AgencyId = parentObj.AgencyID,
                                                  ImagePath = parentObj.ImagePath,
                                                  IsDelete = parentObj.IsDeleted,
                                                  IsAuthorizedToPickup = parentObj.IsAuthorizedToPickup,
                                                  IsJoinClassroom = parentObj.IsJoinClassroom,
                                                  ParentLogID = (long?)(parentLog.ParentID) ?? 0,
                                              }).OrderBy(c => c.ParentName).ToList();
                        foreach (var r in studentInformation)
                        {
                            var allDetails = (from AFPDObj in advanceFeePaymentDetails
                                              where AFPDObj.ParentID == r.Id &&
                                              AFPDObj.IsDeleted == false
                                              orderby AFPDObj.Id descending
                                              select new AdvanceFeePaymentDetailsViewModel()
                                              {
                                                  BalanceAmount = AFPDObj.BalanceAmount,
                                              }).FirstOrDefault();

                            if (!(allDetails == null))
                            {
                                r.AdvancePaymentBalanceAmount = allDetails.BalanceAmount;
                            }
                            else
                            {
                                r.AdvancePaymentBalanceAmount = 0;
                            }
                        }
                        res.Data = studentInformation;
                        if (studentInformation.Count() < getParentInformationRequest.page * 10)
                        {
                            getParentInformationRequest.page = 0;
                        }
                        if (getParentInformationRequest.limit != 0)
                        {
                            res.Data = studentInformation.Skip((getParentInformationRequest.page) * getParentInformationRequest.limit).Take(getParentInformationRequest.limit).ToList();
                        }
                        res.TotalRows = studentInformation.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Parent Information has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
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
            return res;

        }

        public ResponseViewModal UploadParentUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM)
        {
            List<ParentInformationViewModel> rejectedParentInformationList = new List<ParentInformationViewModel>();
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var columnMap = new Dictionary<int, Action<string, ParentInformationViewModel>>
                    {
                        { 0, (x, model) => model.FirstName = x },
                        { 1, (x, model) => model.LastName = x },
                        { 2, (x, model) => model.EmailId = x },
                        //{ 3, (x, model) => model.Mobile = Convert.ToInt64(x) },

                        { 3, (x, model) =>
                            {
                                var mobileNo = 0L;

                                long.TryParse(x, out mobileNo);

                                model.Mobile = mobileNo;
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
                        { 6, (x, model) => model.Profession = x },
                        { 7, (x, model) => model.GenderName = x },
                        { 8, (x, model) => model.EmployerName = x },
                        { 9, (x, model) =>
                            {
                                var employerNo = 0L;

                                long.TryParse(x, out employerNo);

                                model.EmployerNumber = employerNo;
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

                        var model = new ParentInformationViewModel();
                        foreach (var item in columnMap)
                        {
                            if (values.Length > item.Key)
                            {
                                item.Value(values[item.Key], model);
                            }
                            // Db operation
                        }

                        model.IsParent = true;
                        model.AgencyID = objCSVFILEREQVM.AgencyId;
                        model.CreatedBy = objCSVFILEREQVM.CreatedBy;
                        model.IsAuthorizedToPickup = true;
                        if (string.Compare(model.GenderName, "M", true) == 1)
                        {
                            model.GenderID = 1;
                        }
                        else
                        {
                            model.GenderID = 2;
                        }
                        var response = SaveParentInformation(model);

                        if (response.StatusCode != (long)HttpStatusCodes.OK)
                        {
                            model.msg = "User Already Exists";
                            rejectedParentInformationList.Add(model);
                            res.Data = rejectedParentInformationList;
                        }
                        line = streamReader.ReadLine();
                    }
                }


                //res.IsSuccess = true;
                //res.Data = rejectedParentInformationList;
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


        private StudentViewModel GetStudentViewModel(params string[] values)
        {
            var viewModel = new StudentViewModel();

            var columnMap = new Dictionary<int, Action<string, StudentViewModel>>
            {
                { 0, (x, model) => model.FirstName = x },
                { 1, (x, model) => model.LastName = x },
                { 2, (x, model) => model.ParentEmailAddress = x },
                { 3, (x, model) =>
                    {
                        var parentNo = 0L;

                        long.TryParse(x, out parentNo);

                        model.ParentContactNumber = parentNo;
                    }
                },
                { 4, (x, model) =>
                    {
                       var localDate = Convert.ToDateTime(x);

                        DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localDate);

                        model.DateOfBirth = localDate;
                    }
                },
                { 5, (x, model) => model.GenderName = x },
                { 6, (x, model) => model.Address = x },
                { 7, (x, model) => model.PhysicianName = x },
                { 8 , (x, model) =>model.PreferredHospital = x },
                { 9, (x, model) =>
                    {
                        var physicianNo = 0L;

                        long.TryParse(x, out physicianNo);

                        model.PhysicianContactNumber = physicianNo;
                    }
                }
            };

            foreach (var item in columnMap)
            {
                if (values.Length > item.Key)
                {
                    item.Value(values[item.Key], viewModel);
                }
                // Db operation
            }

            viewModel.AgencyID = 0;
            viewModel.CreatedBy = 0;
            viewModel.ParentID = 0;
            viewModel.CityId = 0;
            viewModel.StateId = 0;
            viewModel.CountryId = 0;
            viewModel.PostalCode = string.Empty;

            if (string.Compare(viewModel.GenderName, "M", true) == 1)
            {
                viewModel.GenderID = 1;
            }
            else
            {
                viewModel.GenderID = 2;
            }

            return viewModel;
        }

        private ParentInformationViewModel GetParentInformationViewModel(params string[] values)
        {
            var columnMapForSecondaryParent = new Dictionary<int, Action<string, ParentInformationViewModel>>
            {
                { 10, (x, SPmodel) => SPmodel.FirstName = x },
                { 11, (x, SPmodel) => SPmodel.LastName = x },
                { 12, (x, SPmodel) => SPmodel.EmailId = x },
                { 13, (x, SPmodel) =>
                    {
                        var mobileNo = 0L;

                        long.TryParse((x ?? string.Empty).Trim(), out mobileNo);

                        SPmodel.Mobile = mobileNo;
                    }
                },
                { 14, (x, SPmodel) => SPmodel.Address = x },
                { 15, (x, SPmodel) =>
                    {
                       var localDate = Convert.ToDateTime(x);

                        DateTime.TryParseExact(x, "M/d/yyyy", DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None , out localDate);

                        SPmodel.DateOfBirth = localDate;
                    }
                },
                { 16, (x, SPmodel) => SPmodel.Profession = x },
                { 17, (x, SPmodel) => SPmodel.GenderName = x },
                { 18, (x, SPmodel) => SPmodel.EmployerName = x },
                { 19, (x, SPmodel) =>
                    {
                        var employerNo = 0L;

                        long.TryParse((x ?? string.Empty).Trim(), out employerNo);

                        SPmodel.EmployerNumber = employerNo;
                    }
                }
            };


            var SPViewModel = new ParentInformationViewModel();
            foreach (var item in columnMapForSecondaryParent)
            {
                if (values.Length > item.Key)
                {
                    item.Value(values[item.Key], SPViewModel);
                }
                // Db operation
            }

            SPViewModel.IsSecondaryParent = true;
            SPViewModel.AssociatedChild = SPViewModel.AssociatedChild ?? new List<ParentStudentMappingViewModel>();

            if (SPViewModel.AssociatedChild.Count == 0)
            {
                SPViewModel.AssociatedChild.Add(new ParentStudentMappingViewModel
                {
                    //AgencyID = objCSVFILEREQVM.AgencyId,
                    //StudentID = associatedStudentID,
                    AgencyID = 0,
                    StudentID = 0,
                });
            }
            else
            {
                //SPViewModel.AssociatedChild[0].StudentID = associatedStudentID;
                SPViewModel.AssociatedChild[0].StudentID = 0;
            }

            //SPViewModel.AgencyID = objCSVFILEREQVM.AgencyId;
            //SPViewModel.CreatedBy = objCSVFILEREQVM.CreatedBy;
            SPViewModel.AgencyID = 0;
            SPViewModel.CreatedBy = 0;
            SPViewModel.AddedByID = 0;
            //SPViewModel.AddedByID = model.ParentID;
            if (SPViewModel.GenderName == "M")
            {
                SPViewModel.GenderID = 1;
            }
            else
            {
                SPViewModel.GenderID = 2;
            }

            return SPViewModel;
        }


        private List<Tuple<StudentViewModel, ParentInformationViewModel>> GetStudentList(IFormFile file)
        {
            var studentList = new List<Tuple<StudentViewModel, ParentInformationViewModel>>();

            using (StreamReader streamReader = new StreamReader(file.OpenReadStream()))
            {
                string line = streamReader.ReadLine();
                var isFirstLine = true;
                while (!string.IsNullOrEmpty((line ?? string.Empty).Trim()))
                {
                    if (isFirstLine)
                    {
                        isFirstLine = false;
                        line = streamReader.ReadLine();
                        continue;
                    }

                    var values = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    var student = GetStudentViewModel(values);
                    var parent = GetParentInformationViewModel(values);

                    studentList.Add(new Tuple<StudentViewModel, ParentInformationViewModel>(student, parent));

                    line = streamReader.ReadLine();
                }
            }

            return studentList;
        }

        public ResponseViewModal UploadStudentUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM)
        {
            List<StudentViewModel> rejectedStudentInformationList = new List<StudentViewModel>();
            List<ParentInformationViewModel> rejectedSPParentInformationList = new List<ParentInformationViewModel>();

            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<Tuple<StudentViewModel, ParentInformationViewModel>> students = GetStudentList(file);

                foreach (Tuple<StudentViewModel, ParentInformationViewModel> item in students)
                {
                    var student = item.Item1;
                    var parent = item.Item2;
                    var parentInfo = _parentRepository.GetAll(x => x.EmailId.ToUpper() == student.ParentEmailAddress.ToUpper()).FirstOrDefault();

                    if (parentInfo != null)
                    {
                        student.AgencyID = objCSVFILEREQVM.AgencyId;
                        student.CreatedBy = objCSVFILEREQVM.CreatedBy;
                        student.ParentID = parentInfo.Id;
                        student.CityId = parentInfo.CityId;
                        student.StateId = parentInfo.StateId;
                        student.CountryId = parentInfo.CountryId;
                        student.PostalCode = parentInfo.PostalCode;

                        var response = SaveStudent(student);

                        if (response.SaveId > 0)
                        {
                            long associatedStudentID = response.SaveId;
                            parent.AssociatedChild[0].StudentID = associatedStudentID;
                            parent.AssociatedChild[0].AgencyID = objCSVFILEREQVM.AgencyId;
                            parent.AgencyID = objCSVFILEREQVM.AgencyId;
                            parent.CreatedBy = objCSVFILEREQVM.CreatedBy;
                            parent.AddedByID = student.ParentID;

                            var parentSaveResponse = SaveParentInformation(parent);
                        }

                        if (response.StatusCode != (long)HttpStatusCodes.OK)
                        {
                            student.msg = "Reason not known";
                            rejectedStudentInformationList.Add(student);
                            res.Data = rejectedStudentInformationList;
                        }
                    }
                    else
                    {
                        student.msg = "Parent Email Address does not exist";
                        rejectedStudentInformationList.Add(student);
                        res.Data = rejectedStudentInformationList;
                    }
                }

                if (rejectedStudentInformationList.Count == 0)
                {
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.IsSuccess = true;
                    res.Data = string.Empty;
                }
                else if (rejectedStudentInformationList.Count > 0)
                {
                    res.StatusCode = 987;
                    res.IsSuccess = false;
                    res.Data = rejectedStudentInformationList;
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


        public ResponseViewModal SaveParentSignatureDetails(ParentSignatureDetailsViewModel getParentSignatureInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            ParentSignatureDetails PSDObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    //========Save ParentSignatureDetails =======//
                    long Id = 0;
                    getParentSignatureInfoRequest.CreatedDate = DateTime.UtcNow;
                    getParentSignatureInfoRequest.IsActive = true;
                    getParentSignatureInfoRequest.IsDeleted = false;
                    PSDObj = Mapper.Map<ParentSignatureDetails>(getParentSignatureInfoRequest);
                    _parentSignatureDetailsRepository.Create(PSDObj);
                    _parentSignatureDetailsRepository.SaveChanges();
                    Id = PSDObj.Id;

                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Parent Signature Details Save Successfully";

                    daycaredb.Commit();
                    return res;
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

        public ResponseViewModal UpdateStudentProfilePicByTeacher(StudentViewModel saveStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            Student StudentObj = null;
            long id = 0;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentRequest.StudentId > 0 && saveStudentRequest.AgencyID > 0 && (saveStudentRequest.ImagePath != "" && saveStudentRequest.ImagePath != null))
                    {
                        StudentObj = _studentRepository.Get(x => x.Id == saveStudentRequest.StudentId && !x.IsDeleted && x.AgencyID == saveStudentRequest.AgencyID);

                        if (!ReferenceEquals(StudentObj, null))
                        {
                            StudentObj.ImagePath = saveStudentRequest.ImagePath ?? String.Empty;
                            _studentRepository.SaveChanges();
                            id = StudentObj.Id;
                            DisplayMessage = "Student Profile Picture has been updated.";
                            res.IsSuccess = true;
                            res.SaveId = id;
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else
                    {
                        res.Message = "Missing Parameter";
                        res.StatusCode = 986;
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

        public ResponseViewModal GetAllParentInformationForCSV(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Parent.Parent> selectedParent;
                IQueryable<Entity.Masters.Gender> selectedGender;
                if (getParentInformationRequest.AgencyID > 0)
                {
                    if (getParentInformationRequest.AgencyID > 0)
                    {
                        List<ParentUserViewModel> parentInformation = new List<ParentUserViewModel>();
                        IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == getParentInformationRequest.AgencyID && Check.IsDeleted == false);

                        string parentname = getParentInformationRequest.ParentName.TrimStart();
                        parentname = parentname.TrimEnd();

                        if (getParentInformationRequest.ActivationType.ToLower() == ConstantString.Activated)
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && !check.IsDeleted && check.IsParent == true && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }
                        else if (getParentInformationRequest.ActivationType.ToLower() == ConstantString.Deactivated)
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.IsDeleted && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }
                        else
                        {
                            selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID && check.ParentName.ToUpper().Contains(parentname.ToUpper()));
                        }

                        selectedGender = _genderRepository.GetAll().Where(check => check.IsDeleted == false);

                        IQueryable<Entity.Student.Student> selectedstudent = _studentRepository.GetAll().Where(check => check.AgencyID == getParentInformationRequest.AgencyID);
                        parentInformation = (from parentObj in selectedParent
                                             join genderPrimeObj in selectedGender on parentObj.GenderID equals genderPrimeObj.Id
                                             into genderObj
                                             from genderPrimeObj in genderObj.DefaultIfEmpty()
                                             where (getParentInformationRequest.AgencyID == parentObj.AgencyID)
                                             select new ParentUserViewModel()
                                             {
                                                 Id = parentObj.Id,
                                                 ParentName = parentObj.ParentName,
                                                 UserName = parentObj.EmailId,
                                                 Email = parentObj.EmailId,
                                                 AgencyId = parentObj.AgencyID,
                                                 ImagePath = parentObj.ImagePath,
                                                 IsDelete = parentObj.IsDeleted,
                                                 FirstName = parentObj.FirstName,
                                                 LastName = parentObj.LastName,
                                                 Mobile = parentObj.Mobile,
                                                 Address = parentObj.Address,
                                                 DateOfBirth = parentObj.DateOfBirth.Date,
                                                 Profession = parentObj.Profession,
                                                 GenderName = genderPrimeObj.GenderName ?? string.Empty,
                                                 EmployerName = parentObj.EmployerName,
                                                 EmployerNumber = parentObj.EmployerNumber

                                             }).OrderBy(c => c.ParentName).ToList();
                        foreach (var r in parentInformation)
                        {
                            var allDetails = (from AFPDObj in advanceFeePaymentDetails
                                              where AFPDObj.ParentID == r.Id &&
                                              AFPDObj.IsDeleted == false
                                              orderby AFPDObj.Id descending
                                              select new AdvanceFeePaymentDetailsViewModel()
                                              {
                                                  BalanceAmount = AFPDObj.BalanceAmount,
                                              }).FirstOrDefault();

                            if (!(allDetails == null))
                            {
                                r.AdvancePaymentBalanceAmount = allDetails.BalanceAmount;
                            }
                            else
                            {
                                r.AdvancePaymentBalanceAmount = 0;
                            }
                        }
                        res.Data = parentInformation;
                        if (getParentInformationRequest.limit != 0)
                        {
                            res.Data = parentInformation.Skip((getParentInformationRequest.page) * getParentInformationRequest.limit).Take(getParentInformationRequest.limit).ToList();
                        }
                        res.TotalRows = parentInformation.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Parent Information has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
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
            return res;

        }

        public ResponseViewModal GetParentAddress(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                Parent ParentObj = null;
                if (getParentInformationRequest.AgencyID > 0)
                {
                    if (getParentInformationRequest.AgencyID > 0)
                    {
                        ParentObj = _parentRepository.Get(x => x.Id == getParentInformationRequest.ParentID);

                        res.Data = ParentObj;
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Parent Information has been fetched.";
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
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
            return res;

        }

        public ResponseViewModal UpdateStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveStudentEnrollmentRequest.AgencyID > 0)
                    {
                        long id = 0;
                        ClassEnrollment classEnrollmentObj = null;
                        if (saveStudentEnrollmentRequest.Id > 0)
                        {
                            classEnrollmentObj = _classEnrollmentRepository.Get(x => x.Id == saveStudentEnrollmentRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(classEnrollmentObj, null))
                            {
                                classEnrollmentObj.ClassEnrollStartDate = saveStudentEnrollmentRequest.ClassEnrollStartDate;
                                classEnrollmentObj.ClassEnrollEndDate = saveStudentEnrollmentRequest.ClassEnrollEndDate;
                                classEnrollmentObj.Fees = saveStudentEnrollmentRequest.Fees;
                                classEnrollmentObj.FeeTypeId = saveStudentEnrollmentRequest.FeeTypeId;
                                _classEnrollmentRepository.SaveChanges();
                                id = classEnrollmentObj.Id;
                            }

                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Enrollement Information has been saved.";
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

    }
}
