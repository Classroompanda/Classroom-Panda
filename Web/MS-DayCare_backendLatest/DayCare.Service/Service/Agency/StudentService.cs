using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Model.Agency;
using DayCare.Model.Parent;
using DayCare.Model.Student;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Agency;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Model.Common;
using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using DayCare.Entity.Parent;
using DayCare.Entity.Student;
using AutoMapper;
using DayCare.Model.Master;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Service.Common;

namespace DayCare.Service.Service.Agency
{
    public class StudentService : IStudentService
    {
        public DataContext _dataContext;
        public IStudentRepository _studentRepository;
        public IGuardianRepository _guardianRepository;
        public IStudentImmunizationRepository _studentImmunizationRepository;
        public IStudentMedicationRepository _studentMedicationRepository;
        public IStudentAllergiesRepository _studentAllergiesRepository;
        public IAllergyNameRepository _allergyNameRepository;
        public IAllergyReactionTypeRepository _allergyReactionTypeRepository;
        public IImmunizationRepository _immunizationRepository;
        public IClassesRepository _classesRepository;
        public IClassCategoryRepository _classCategoryRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public ICityRepository _cityRepository;
        public IStateRepository _stateRepository;
        public ICountryRepository _countryRepository;
        public IStudentDisabilitiesRepository _studentDisabilitiesRepository;
        public IRelationTypeRepository _relationTypeRepository;
        public IGenderRepository _genderRepository;
        public ITransportationTypeRepository _transportationTypeRepository;
        public IFeePaymentTypeRepository _feePaymentTypeRepository;
        public IAllergyTypeRepository _allergyTypeRepository;
        public IParentRepository _parentRepository;
        public IDosageQuantityRepository _dosageQuantityRepository;
        public IDoseRepeatRepository _doseRepeatRepository;
        public IKioskeStudentSignInDetailsRepository _kioskeStudentSignInDetailsRepository;
        public IStudentSubsidyDetailsRepository _studentsubsidyDetailsRepository;
        public IPerDayFeeCalculationRepository _perDayFeeCalculationRepository;
        public IAuthorizedPersonRepository _authorizedPersonDetails;
        string DisplayMessage = "";
        public IParentStudentMappingRepository _parentStudentMappingRepository;
        public IKioskeStudentSignInDetailsRepository _kioskeStudentSignInDetails;
        public IErrorlogRepository _errorlogRepository;
        public StudentService(DataContext dataContext,
           IStudentRepository studentRepository,
           IGuardianRepository guardianRepository,
           IStudentImmunizationRepository studentImmunizationRepository,
           IStudentMedicationRepository studentMedicationRepository,
           IStudentAllergiesRepository studentAllergiesRepository,
           IAllergyNameRepository allergyNameRepository,
           IAllergyReactionTypeRepository allergyReactionTypeRepository,
           IImmunizationRepository immunizationRepository,
           IClassesRepository classesRepository,
           IClassCategoryRepository classCategoryRepository,
           IClassEnrollmentRepository classEnrollmentRepository,
           ICityRepository cityRepository,
           IStateRepository stateRepository,
           ICountryRepository countryRepository,
           IStudentDisabilitiesRepository studentDisabilitiesRepository,
           IRelationTypeRepository relationTypeRepository,
           IGenderRepository genderRepository,
           ITransportationTypeRepository transportationTypeRepository,
           IFeePaymentTypeRepository feePaymentTypeRepository,
           IAllergyTypeRepository allergyTypeRepository,
           IParentRepository parentRepository,
           IDosageQuantityRepository dosageQuantityRepositor,
           IDoseRepeatRepository doseRepeatRepository,
           IKioskeStudentSignInDetailsRepository kioskeStudentSignInDetailsRepository,
           IParentStudentMappingRepository parentStudentMappingRepository,
           IPerDayFeeCalculationRepository perDayFeeCalculationRepository,
           IAuthorizedPersonRepository authorizedPersonDetails,
           IStudentSubsidyDetailsRepository studentsubsidyDetailsRepository,
           IKioskeStudentSignInDetailsRepository kioskeStudentSignInDetails,
           IErrorlogRepository errorlogRepository
           )
        {
            _dataContext = dataContext;
            _studentRepository = studentRepository;
            _guardianRepository = guardianRepository;
            _studentImmunizationRepository = studentImmunizationRepository;
            _studentMedicationRepository = studentMedicationRepository;
            _studentAllergiesRepository = studentAllergiesRepository;
            _allergyNameRepository = allergyNameRepository;
            _allergyReactionTypeRepository = allergyReactionTypeRepository;
            _immunizationRepository = immunizationRepository;
            _classesRepository = classesRepository;
            _classCategoryRepository = classCategoryRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _cityRepository = cityRepository;
            _stateRepository = stateRepository;
            _countryRepository = countryRepository;
            _studentDisabilitiesRepository = studentDisabilitiesRepository;
            _relationTypeRepository = relationTypeRepository;
            _genderRepository = genderRepository;
            _transportationTypeRepository = transportationTypeRepository;
            _feePaymentTypeRepository = feePaymentTypeRepository;
            _allergyTypeRepository = allergyTypeRepository;
            _parentRepository = parentRepository;
            _dosageQuantityRepository = dosageQuantityRepositor;
            _doseRepeatRepository = doseRepeatRepository;
            _kioskeStudentSignInDetailsRepository = kioskeStudentSignInDetailsRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
            _perDayFeeCalculationRepository = perDayFeeCalculationRepository;
            _authorizedPersonDetails = authorizedPersonDetails;
            _studentsubsidyDetailsRepository = studentsubsidyDetailsRepository;
            _errorlogRepository = errorlogRepository;
            _kioskeStudentSignInDetails = kioskeStudentSignInDetails;
        }

        
        public ResponseViewModal GetAllGuardiansForStudents(StudentBaseRequestViewModel getAllGuardiansForStudentsRequest)
        {
           ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllGuardiansForStudentsRequest.AgencyID > 0)
                {
                    List<GuardianViewModel> allGuardians = new List<GuardianViewModel>();
                    if (getAllGuardiansForStudentsRequest.isAuthorized == true)
                    {
                        allGuardians = GetAllAuthorizedGuardians(getAllGuardiansForStudentsRequest);
                    }                    
                    res.Data = allGuardians;
                    if (getAllGuardiansForStudentsRequest.limit != 0)
                    {
                        res.Data = allGuardians.Skip((getAllGuardiansForStudentsRequest.page) * getAllGuardiansForStudentsRequest.limit).Take(getAllGuardiansForStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = allGuardians.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Guardians have been feteched.";
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
                //========Add Error Log Deatils =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllGuardiansForStudentsRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Id = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
               
        public ResponseViewModal GetAllStudents(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsRequest.AgencyID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    string StudentName = getAllStudentsRequest.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(StudentName.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                    //IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    //IQueryable<Entity.Masters.Gender> selectedGender = _genderRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    //IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    //IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);//Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);//.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted); //.Where(check => check.AgencyID == getAllStudentsOfParentRequest.AgencyID);
                    //IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    //IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.ClassEnrollStartDate.Date <= DateTime.Now.Date && check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date
                    && check.AgencyID == getAllStudentsRequest.AgencyID && check.EnrollmentStatus==2);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.ClassStartDate.Date <= DateTime.Now.Date && check.ClassEndDate.Date >= DateTime.Now.Date
                    && check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();

                    allStudents = (from studentObj in selectedStudents
                                   //join cityObj in selectedCity on studentObj.CityId equals cityObj.Id
                                   join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                   //join genderObj in selectedGenders on studentObj.GenderID equals genderObj.Id
                                   //join stateObj in selectedState on studentObj.StateId equals stateObj.Id
                                   //join countryObj in selectedCountry on studentObj.CountryId equals countryObj.Id
                                   //join transportationTypeObj in selectedTransportationType on studentObj.TransportationID equals transportationTypeObj.Id
                                   //join feePaymentTypeObj in selectedFeePaymentType on studentObj.FeePaymentTypeID equals feePaymentTypeObj.Id

                                   join cityObj in selectedCity on studentObj.CityId equals cityObj.Id into InfoCity
                                   from InfoCityObj in InfoCity.DefaultIfEmpty()

                                   join genderObj in selectedGenders on studentObj.GenderID equals genderObj.Id into InfoGender
                                   from InfoGenderObj in InfoGender.DefaultIfEmpty()

                                   join stateObj in selectedState on studentObj.StateId equals stateObj.Id into InfoState
                                   from InfoStateObj in InfoState.DefaultIfEmpty()

                                   join countryObj in selectedCountry on studentObj.CountryId equals countryObj.Id into InfoCountry
                                   from InfoCountryObj in InfoCountry.DefaultIfEmpty()

                                   join transportationTypeObj in selectedTransportationType on studentObj.TransportationID equals transportationTypeObj.Id into InfoTransport
                                   from InfoTransportObj in InfoTransport.DefaultIfEmpty()

                                   join feePaymentTypeObj in selectedFeePaymentType on studentObj.FeePaymentTypeID equals feePaymentTypeObj.Id into InfoFee
                                   from InfoFeeObj in InfoFee.DefaultIfEmpty()


                                   join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                   join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id
                                   join classCategoryObj in selectedClassCategory on classObj.CategoryId equals classCategoryObj.Id

                                   where (!studentObj.IsDeleted && getAllStudentsRequest.AgencyID == studentObj.AgencyID && studentObj.Id == classEnrollmentObj.StudentID &&
                                   (getAllStudentsRequest.ClassID == 0 || getAllStudentsRequest.ClassID == null))
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName ?? String.Empty,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                       ParentName = parentObj.ParentName ?? String.Empty,
                                       FirstName = studentObj.FirstName ?? String.Empty,
                                       LastName = studentObj.LastName ?? String.Empty,
                                       GenderID = studentObj.GenderID,
                                       GenderName = InfoGenderObj.GenderName ?? String.Empty,
                                       ImagePath = studentObj.ImagePath ?? String.Empty,
                                       Address = studentObj.Address ?? String.Empty,
                                       CountryId = studentObj.CountryId,
                                       CountryName = InfoCountryObj.CountryName ?? String.Empty,
                                       StateId = studentObj.StateId,
                                       StateName = InfoStateObj.StateName ?? String.Empty,
                                       CityId = studentObj.CityId,
                                       CityName = InfoCityObj.CityName ?? String.Empty,
                                       PostalCode = studentObj.PostalCode ?? String.Empty,
                                       SchoolName = studentObj.SchoolName ?? String.Empty,
                                       TransportationID = studentObj.TransportationID,
                                       TransportationTypeName = InfoTransportObj.TransportationTypeName ?? String.Empty,
                                       DateOfBirth = studentObj.DateOfBirth,
                                       FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                       FeePaymentTypeName = InfoFeeObj.FeePaymentTypeName ?? String.Empty,
                                       InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                       InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,

                                       CreatedBy = studentObj.CreatedBy ?? 0,
                                       CreatedDate = studentObj.CreatedDate ?? DateTime.MinValue,
                                       UpdatedBy = studentObj.UpdatedBy ?? 0,
                                       UpdatedDate = studentObj.UpdatedDate ?? DateTime.MinValue,
                                       DeletedBy = studentObj.DeletedBy ?? 0,
                                       DeletedDate = studentObj.DeletedDate ?? DateTime.MinValue,
                                       ClassId = classObj.Id,
                                       ClassName = classObj.ClassName,
                                       EnrolledStatus = classEnrollmentObj.EnrollmentStatus,
                                       classEnnrollmentID = classEnrollmentObj.Id,
                                       CategoryID = classCategoryObj.Id,
                                       CategoryName = classCategoryObj.CategoryName

                                   }).OrderBy(c => c.StudentName).Distinct().ToList();

                    var result = allStudents.GroupBy(p => p.StudentId).Select(p => p.First()).ToList();
                    //to add class names
                    foreach (var r in result)
                    {
                        var clasess = allStudents.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassName).ToArray();
                        r.ClassName = string.Join(",", clasess);

                        var classesid = allStudents.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassId).ToArray();
                        r.ClassesId = string.Join(",", classesid);
                    }

                    res.Data = result;

                    if (getAllStudentsRequest.limit != 0)
                    {                      
                        res.Data = result.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = result.Count();
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
                
        public ResponseViewModal GetAllStudentsByClass(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsRequest.AgencyID > 0 && getAllStudentsRequest.ClassID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck =>  namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.ClassEnrollStartDate.Date <= DateTime.Now.Date && check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date
                    && check.AgencyID == getAllStudentsRequest.AgencyID && check.EnrollmentStatus==2);
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.ClassStartDate.Date <= DateTime.Now.Date && check.ClassEndDate.Date >= DateTime.Now.Date
                    && check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll();
                    IQueryable<Entity.Masters.Gender> selectedGender = _genderRepository.GetAll();
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll();
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll();
                    IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll();
                    IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);

                    allStudents = (from studentObj in selectedStudents
                                   join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                   join classObj in selectedClasses on classEnrollmentObj.ClassesID equals classObj.Id                                  

                                   join cityObj in selectedCity on studentObj.CityId equals cityObj.Id into InfoCity
                                   from InfoCityObj in InfoCity.DefaultIfEmpty()

                                   join genderObj in selectedGender on studentObj.GenderID equals genderObj.Id into InfoGender
                                   from InfoGenderObj in InfoGender.DefaultIfEmpty()

                                   join stateObj in selectedState on studentObj.StateId equals stateObj.Id into InfoState
                                   from InfoStateObj in InfoState.DefaultIfEmpty()

                                   join countryObj in selectedCountry on studentObj.CountryId equals countryObj.Id into InfoCountry
                                   from InfoCountryObj in InfoCountry.DefaultIfEmpty()

                                   join transportationTypeObj in selectedTransportationType on studentObj.TransportationID equals transportationTypeObj.Id into InfoTransport
                                   from InfoTransportObj in InfoTransport.DefaultIfEmpty()

                                   join feePaymentTypeObj in selectedFeePaymentType on studentObj.FeePaymentTypeID equals feePaymentTypeObj.Id into InfoFee
                                   from InfoFeeObj in InfoFee.DefaultIfEmpty()


                                   join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                   where (!studentObj.IsDeleted && getAllStudentsRequest.AgencyID == studentObj.AgencyID && classEnrollmentObj.ClassesID == getAllStudentsRequest.ClassID)
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName ?? String.Empty,
                                       ClassId = classObj.Id,
                                       ClassName = classObj.ClassName ?? String.Empty,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                       ParentName = parentObj.ParentName ?? String.Empty,
                                       FirstName = studentObj.FirstName ?? String.Empty,
                                       LastName = studentObj.LastName ?? String.Empty,
                                       GenderID = studentObj.GenderID,
                                       GenderName = InfoGenderObj.GenderName ?? String.Empty,
                                       ImagePath = studentObj.ImagePath ?? String.Empty,
                                       Address = studentObj.Address ?? String.Empty,
                                       CountryId = studentObj.CountryId,
                                       CountryName = InfoCountryObj.CountryName ?? String.Empty,
                                       StateId = studentObj.StateId,
                                       StateName = InfoStateObj.StateName ?? String.Empty,
                                       CityId = studentObj.CityId,
                                       CityName = InfoCityObj.CityName ?? String.Empty,
                                       PostalCode = studentObj.PostalCode ?? String.Empty,
                                       SchoolName = studentObj.SchoolName ?? String.Empty,
                                       TransportationID = studentObj.TransportationID,
                                       TransportationTypeName = InfoTransportObj.TransportationTypeName ?? String.Empty,
                                       DateOfBirth = studentObj.DateOfBirth,
                                       FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                       FeePaymentTypeName = InfoFeeObj.FeePaymentTypeName ?? String.Empty,
                                       InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                       InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,                                     
                                       EnrolledStatus= classEnrollmentObj.EnrollmentStatus,
                                       classEnnrollmentID = classEnrollmentObj.Id
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsRequest.limit != 0)
                    {                       
                        res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = allStudents.Count();
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

        public ResponseViewModal GetAllStudentsDropDownByClass(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsRequest.AgencyID > 0 && getAllStudentsRequest.ClassID > 0)
                {
                    List<DropdownViewModel> allStudents = new List<DropdownViewModel>();
                    string StudentName = getAllStudentsRequest.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(StudentName.ToUpper())
                    && namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    allStudents = (from studentObj in selectedStudents
                                   join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                   join classObj in selectedClasses on classEnrollmentObj.ClassesID equals classObj.Id
                                   where (!studentObj.IsDeleted && getAllStudentsRequest.AgencyID == studentObj.AgencyID && classEnrollmentObj.StudentID == studentObj.Id &&
                                   (getAllStudentsRequest.ClassID == 0 || getAllStudentsRequest.ClassID == null || classEnrollmentObj.ClassesID == getAllStudentsRequest.ClassID))
                                   select new DropdownViewModel()
                                   {
                                       Value = studentObj.Id,
                                       label = studentObj.StudentName ?? String.Empty
                                   }).OrderBy(c => c.label).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsRequest.limit != 0)
                    {                       
                        res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = allStudents.Count();
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

        public ResponseViewModal GetStudentInformation(StudentBaseRequestViewModel getStudentInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentInformationRequest.AgencyID > 0 && getStudentInformationRequest.StudentID > 0)
                {
                    StudentViewModel studentInformation = new StudentViewModel();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.Id == getStudentInformationRequest.StudentID && namecheck.AgencyID == getStudentInformationRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentInformationRequest.AgencyID
                    && check.StudentID == getStudentInformationRequest.StudentID);
                    IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.AgencyID == getStudentInformationRequest.AgencyID);
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getStudentInformationRequest.AgencyID);
                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll();
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll();
                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll();
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll();
                    IQueryable<Entity.Parent.ParentStudentMapping> selectedMapping = _parentStudentMappingRepository.GetAll().Where(namecheck => namecheck.StudentID == getStudentInformationRequest.StudentID && namecheck.AgencyID == getStudentInformationRequest.AgencyID && namecheck.ParentID == getStudentInformationRequest.ParentID);

                    if (selectedClassEnrollment != null && selectedClassEnrollment.Count() > 0)
                    {
                        studentInformation = (from mapObj in selectedMapping
                                              join studentObj in selectedStudents on mapObj.StudentID equals studentObj.Id
                                              join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id

                                              join classEnrollmentPrimeObj in selectedClassEnrollment
                                              on mapObj.StudentID equals classEnrollmentPrimeObj.StudentID
                                              into classEnrollmentObj
                                              from classEnrollmentPrimeObj in classEnrollmentObj.DefaultIfEmpty()

                                              join classPrimeObj in selectedClasses
                                              on classEnrollmentPrimeObj.ClassesID equals classPrimeObj.Id
                                              into classObj
                                              from classPrimeObj in classObj.DefaultIfEmpty()                                                                                              

                                              join cityPrimeObj in selectedCity on studentObj.CityId equals cityPrimeObj.Id
                                              into cityObj
                                              from cityPrimeObj in cityObj.DefaultIfEmpty()

                                              join genderPrimeObj in selectedGenders on studentObj.GenderID equals genderPrimeObj.Id
                                              into genderObj
                                              from genderPrimeObj in genderObj.DefaultIfEmpty()

                                              join statePrimeObj in selectedState on studentObj.StateId equals statePrimeObj.Id
                                              into stateObj
                                              from statePrimeObj in stateObj.DefaultIfEmpty()

                                              join countryPrimeObj in selectedCountry on studentObj.CountryId equals countryPrimeObj.Id
                                              into countryObj
                                              from countryPrimeObj in countryObj.DefaultIfEmpty()

                                              where (!mapObj.IsDeleted &&  mapObj.AgencyID == getStudentInformationRequest.AgencyID)
                                              select new StudentViewModel()
                                              {
                                                  StudentId = mapObj.StudentID,
                                                  StudentName = studentObj.StudentName ?? String.Empty,
                                                  ClassId = 0,
                                                  ClassName = "",                                               
                                                  AgencyID = studentObj.AgencyID,
                                                  ParentID = mapObj.ParentID,
                                                  ParentName = parentObj.ParentName ?? String.Empty,
                                                  ParentEmailAddress = parentObj.EmailId ?? String.Empty,
                                                  ParentContactNumber = parentObj.Mobile,
                                                  FirstName = studentObj.FirstName ?? String.Empty,
                                                  LastName = studentObj.LastName ?? String.Empty,
                                                  GenderID = studentObj.GenderID,
                                                  GenderName = genderPrimeObj.GenderName ?? String.Empty,
                                                  ImagePath = studentObj.ImagePath ?? String.Empty,
                                                  Address = studentObj.Address ?? String.Empty,
                                                  CountryId = studentObj.CountryId,
                                                  CountryName = countryPrimeObj.CountryName ?? String.Empty,
                                                  StateId = studentObj.StateId,
                                                  StateName = statePrimeObj.StateName ?? String.Empty,
                                                  CityId = studentObj.CityId,
                                                  CityName = cityPrimeObj.CityName ?? String.Empty,
                                                  PostalCode = studentObj.PostalCode ?? String.Empty,
                                                  SchoolName = studentObj.SchoolName ?? String.Empty,
                                                  TransportationID = studentObj.TransportationID,
                                                  DateOfBirth = studentObj.DateOfBirth,
                                                  FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                                  InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                                  InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,
                                                  RegisteredDate = studentObj.RegisteredDate,
                                                  ChildsAddress = studentObj.ChildsAddress ?? String.Empty,
                                                  PhysicianName = studentObj.PhysicianName ?? String.Empty,
                                                  PhysicianAddress = studentObj.PhysicianAddress ?? String.Empty,
                                                  ChildNotes = studentObj.ChildNotes ?? String.Empty,
                                                  ChildStartDate = studentObj.ChildStartDate ,                                                 
                                                  PreferredHospital = studentObj.PreferredHospital ?? String.Empty,
                                                  ChildsContactNumber = studentObj.ChildsContactNumber,
                                                  PhysicianContactNumber = studentObj.PhysicianContactNumber,
                                                  BusID = studentObj.BusID,
                                                  Guardians = GetAllGuardians(getStudentInformationRequest),
                                                  StudentAllergies = GetAllStudentAllergies(getStudentInformationRequest),
                                                  StudentImmunizations = GetAllStudentImmunization(getStudentInformationRequest),
                                                  StudentMedications = GetAllStudentMedication(getStudentInformationRequest),
                                                  StudentDisabilities = GetAllStudentDisabilities(getStudentInformationRequest),
                                                  EnrolledClassesInformation = GetStudentEnrolledClasses(getStudentInformationRequest)                                                
                                              }).OrderBy(c => c.StudentName).FirstOrDefault();
                    }
                    else
                    {
                        studentInformation = (from mapObj in selectedMapping
                                              join studentObj in selectedStudents on mapObj.StudentID equals studentObj.Id
                                              join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                                             
                                              join cityPrimeObj in selectedCity on studentObj.CityId equals cityPrimeObj.Id
                                              into cityObj
                                              from cityPrimeObj in cityObj.DefaultIfEmpty()

                                              join genderPrimeObj in selectedGenders on studentObj.GenderID equals genderPrimeObj.Id
                                              into genderObj
                                              from genderPrimeObj in genderObj.DefaultIfEmpty()

                                              join statePrimeObj in selectedState on studentObj.StateId equals statePrimeObj.Id
                                              into stateObj
                                              from statePrimeObj in stateObj.DefaultIfEmpty()

                                              join countryPrimeObj in selectedCountry on studentObj.CountryId equals countryPrimeObj.Id
                                              into countryObj
                                              from countryPrimeObj in countryObj.DefaultIfEmpty()

                                              where (!mapObj.IsDeleted && getStudentInformationRequest.AgencyID == mapObj.AgencyID)
                                              select new StudentViewModel()
                                              {
                                                  StudentId = mapObj.StudentID,
                                                  StudentName = studentObj.StudentName ?? String.Empty,
                                                  ClassId = 0,
                                                  ClassName = "",
                                                  AgencyID = mapObj.AgencyID,
                                                  ParentID = mapObj.ParentID,
                                                  ParentName = parentObj.ParentName ?? String.Empty,
                                                  ParentEmailAddress = parentObj.EmailId,
                                                  ParentContactNumber = parentObj.Mobile,
                                                  FirstName = studentObj.FirstName ?? String.Empty,
                                                  LastName = studentObj.LastName ?? String.Empty,
                                                  GenderID = studentObj.GenderID,
                                                  GenderName = genderPrimeObj.GenderName ?? String.Empty,
                                                  ImagePath = studentObj.ImagePath ?? String.Empty,
                                                  Address = studentObj.Address ?? String.Empty,
                                                  CountryId = studentObj.CountryId,
                                                  CountryName = countryPrimeObj.CountryName ?? String.Empty,
                                                  StateId = studentObj.StateId,
                                                  StateName = statePrimeObj.StateName ?? String.Empty,
                                                  CityId = studentObj.CityId,
                                                  CityName = cityPrimeObj.CityName ?? String.Empty,
                                                  PostalCode = studentObj.PostalCode ?? String.Empty,
                                                  SchoolName = studentObj.SchoolName ?? String.Empty,
                                                  TransportationID = studentObj.TransportationID,
                                                  DateOfBirth = studentObj.DateOfBirth,
                                                  FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                                  InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                                  InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,
                                                  RegisteredDate = studentObj.RegisteredDate,
                                                  ChildsAddress = studentObj.ChildsAddress ?? String.Empty,
                                                  BusID = studentObj.BusID,
                                                  PhysicianName = studentObj.PhysicianName ?? String.Empty,
                                                  PhysicianAddress = studentObj.PhysicianAddress ?? String.Empty,
                                                  ChildNotes = studentObj.ChildNotes ?? String.Empty,
                                                  ChildStartDate = studentObj.ChildStartDate ,   
                                                  PreferredHospital = studentObj.PreferredHospital ?? String.Empty,
                                                  ChildsContactNumber = studentObj.ChildsContactNumber,
                                                  PhysicianContactNumber = studentObj.PhysicianContactNumber,
                                                  Guardians = GetAllGuardians(getStudentInformationRequest),
                                                  StudentAllergies = GetAllStudentAllergies(getStudentInformationRequest),
                                                  StudentImmunizations = GetAllStudentImmunization(getStudentInformationRequest),
                                                  StudentMedications = GetAllStudentMedication(getStudentInformationRequest),
                                                  StudentDisabilities = GetAllStudentDisabilities(getStudentInformationRequest),
                                                  EnrolledClassesInformation = GetStudentEnrolledClasses(getStudentInformationRequest)                                                
                                              }).OrderBy(c => c.StudentName).FirstOrDefault();
                    }

                    res.Data = studentInformation;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Student Information has been fetched.";
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
             
        private List<GuardianViewModel> GetAllGuardians(StudentBaseRequestViewModel getAllStudentRequest)
        {
           List<GuardianViewModel> allGuardians = new List<GuardianViewModel>();
            try
            {
                allGuardians=(from mapObj in _parentStudentMappingRepository.GetAll() 
                              join parentObj in _parentRepository.GetAll() on mapObj.ParentID equals parentObj.Id
                              join studObj in _studentRepository.GetAll() on mapObj.StudentID equals studObj.Id                             
                              join relationshipPrimeObj in _relationTypeRepository.GetAll() on parentObj.RelationTypeId equals relationshipPrimeObj.Id
                              into relationshipObj
                              from relationshipPrimeObj in relationshipObj.DefaultIfEmpty()
                              where (!parentObj.IsDeleted && parentObj.AddedByID == getAllStudentRequest.ParentID && mapObj.StudentID==getAllStudentRequest.StudentID)
                                select new GuardianViewModel()
                                {
                                    GuardianId = parentObj.Id,
                                    GuardianName = parentObj.ParentName ?? String.Empty,
                                    AgencyID = parentObj.AgencyID,
                                    RelationTypeName = relationshipPrimeObj.RelationTypeName ?? String.Empty,
                                    RelationTypeId = parentObj.RelationTypeId,
                                    StudentID = mapObj.StudentID,
                                    FirstName = parentObj.FirstName ?? String.Empty,
                                    LastName = parentObj.LastName ?? String.Empty,
                                    Address = parentObj.Address ?? String.Empty,
                                    CountryId = parentObj.CountryId,
                                    StateId = parentObj.StateId,
                                    CityId = parentObj.CityId,
                                    PostalCode = parentObj.PostalCode ?? String.Empty,
                                    PinNumber = parentObj.PinNumber,
                                    IsAuthorizedToPickup = parentObj.IsAuthorizedToPickup,
                                    ReasonNotToAllow = parentObj.ReasonNotToAllow,
                                    EmailId = parentObj.EmailId ?? String.Empty,
                                    ImagePath = parentObj.ImagePath ?? String.Empty,
                                    Mobile = parentObj.Mobile,
                                    DateOfBirth=parentObj.DateOfBirth,
                                    GenderID=parentObj.GenderID,
                                    Profession=parentObj.Profession,
                                    FailedLoginAttemptCount = parentObj.FailedLoginAttemptCount                                   
                                }).OrderBy(c => c.GuardianName).ToList();
                if (getAllStudentRequest.limit != 0)
                {
                    allGuardians = allGuardians.Skip((getAllStudentRequest.page - 1) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return allGuardians;

        }
                       
        private List<GuardianViewModel> GetAllAuthorizedGuardians(StudentBaseRequestViewModel getAllStudentRequest)
        {
            List<GuardianViewModel> allGuardians = new List<GuardianViewModel>();
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<GuardianViewModel> allAuthorizedPersonForPerticularStudent = new List<GuardianViewModel>();
                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPerson = _authorizedPersonDetails.GetAll().Where(check => check.AgencyID == getAllStudentRequest.AgencyID && check.IsActive && !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getAllStudentRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == getAllStudentRequest.AgencyID && Check.IsDeleted == false);

                allGuardians =(from mapObj in _parentStudentMappingRepository.GetAll()
                              join studObj in selectedStudent on mapObj.StudentID equals studObj.Id
                              join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                              join relationshipObjprimeobj in _relationTypeRepository.GetAll()
                              on parentObj.RelationTypeId equals relationshipObjprimeobj.Id
                              into relationshipObj
                              from relationshipObjprimeobj in relationshipObj.DefaultIfEmpty()
                              where (!mapObj.IsDeleted && mapObj.StudentID == getAllStudentRequest.StudentID && parentObj.IsAuthorizedToPickup == true)
                              select new GuardianViewModel()
                                {
                                    GuardianId = parentObj.Id,
                                    GuardianName = parentObj.ParentName ?? String.Empty,
                                    AgencyID = parentObj.AgencyID,
                                    RelationTypeName = relationshipObjprimeobj.RelationTypeName ?? String.Empty,
                                    RelationTypeId = parentObj.RelationTypeId,
                                    StudentID = mapObj.StudentID,
                                    FirstName = parentObj.FirstName ?? String.Empty,
                                    LastName = parentObj.LastName ?? String.Empty,
                                    Address = parentObj.Address ?? String.Empty,
                                    CountryId = parentObj.CountryId,
                                    StateId = parentObj.StateId,
                                    CityId = parentObj.CityId,
                                    PostalCode = parentObj.PostalCode ?? String.Empty,
                                    PinNumber = parentObj.PinNumber,
                                    IsAuthorizedToPickup = parentObj.IsAuthorizedToPickup,
                                    ReasonNotToAllow = parentObj.ReasonNotToAllow,
                                    EmailId = parentObj.EmailId ?? String.Empty,
                                    ImagePath = parentObj.ImagePath ?? String.Empty,
                                    Mobile = parentObj.Mobile,
                                    FailedLoginAttemptCount = parentObj.FailedLoginAttemptCount                                  
                                }).OrderBy(c => c.GuardianName).ToList();
                

                allAuthorizedPersonForPerticularStudent = (from apObj in authorizedPerson
                                           join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                           join studentObj in selectedStudent on apObj.StudentID equals studentObj.Id
                                           where apObj.StudentID == getAllStudentRequest.StudentID && !apObj.IsDeleted && getAllStudentRequest.AgencyID == studentObj.AgencyID
                                           select new GuardianViewModel()
                                           {
                                               GuardianName = apObj.AuthorizedPersonName,
                                               Mobile = apObj.Mobile,
                                               EmailId = apObj.EmailId,
                                               AgencyID = apObj.AgencyID,
                                               GuardianId = apObj.Id
                                           }).ToList();

                allGuardians.AddRange(allAuthorizedPersonForPerticularStudent);                         

                if (getAllStudentRequest.limit != 0)
                {
                    allGuardians = allGuardians.Skip((getAllStudentRequest.page - 1) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Record successfully fetched.";
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
            }
            return allGuardians;
        }
                       
        private List<StudentMedicationViewModel> GetAllStudentMedication(StudentBaseRequestViewModel getAllStudentRequest)
        {
           List<StudentMedicationViewModel> allStudentMedications = new List<StudentMedicationViewModel>();
            try
            {
                IQueryable<Entity.Student.StudentMedication> studentMedications = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getAllStudentRequest.AgencyID);
                IQueryable<Entity.Masters.DoseRepeat> doseRepeats = _doseRepeatRepository.GetAll();
                allStudentMedications = (from studentMedicationObj in studentMedications
                                         join doseRepeatObj in doseRepeats on studentMedicationObj.DoseRepeatID equals doseRepeatObj.Id
                                         where (!studentMedicationObj.IsDeleted && studentMedicationObj.StudentID == getAllStudentRequest.StudentID)
                                         select new StudentMedicationViewModel()
                                         {
                                             StudentMedicationID = studentMedicationObj.Id,
                                             StudentID = studentMedicationObj.StudentID,
                                             MedicationName = studentMedicationObj.MedicationName ?? String.Empty,
                                             AgencyID = studentMedicationObj.AgencyID,
                                             Units = studentMedicationObj.Units,
                                             strength = studentMedicationObj.strength ?? String.Empty,
                                             DoseRepeatID = studentMedicationObj.DoseRepeatID,
                                             DosageQuantityID = studentMedicationObj.DoseRepeatID,                                             
                                             DoseRepeatName = doseRepeatObj.DoseRepeatName,
                                             StartDate = studentMedicationObj.StartDate,
                                             EndDate = studentMedicationObj.EndDate,
                                             HowTaken = studentMedicationObj.HowTaken,
                                             OtherMedication = studentMedicationObj.OtherMedication                                            
                                         }).OrderBy(c => c.MedicationName).ToList();
                if (getAllStudentRequest.limit != 0)
                {
                    allStudentMedications = allStudentMedications.Skip((getAllStudentRequest.page - 1) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return allStudentMedications;

        }
              
        private List<StudentImmunizationViewModel> GetAllStudentImmunization(StudentBaseRequestViewModel getAllStudentRequest)
        {
            List<StudentImmunizationViewModel> studentImmunizations = new List<StudentImmunizationViewModel>();
            try
            {

                studentImmunizations = (from studentImmunizationObj in _studentImmunizationRepository.GetAll()
                                        join immunizationObj in _immunizationRepository.GetAll() on studentImmunizationObj.ImmunizationID equals immunizationObj.Id
                                        where (!studentImmunizationObj.IsDeleted && studentImmunizationObj.StudentID == getAllStudentRequest.StudentID)
                                        select new StudentImmunizationViewModel()
                                        {
                                            StudentImmunizationID = studentImmunizationObj.Id,
                                            StudentID = studentImmunizationObj.StudentID,
                                            ImmunizationID = studentImmunizationObj.ImmunizationID,
                                            ImmunizationName = immunizationObj.ImmunizationDescription ?? String.Empty,
                                            AgencyID = studentImmunizationObj.AgencyID,
                                            OtherImmunization = studentImmunizationObj.OtherImmunization ?? String.Empty,
                                            Abbreviation = studentImmunizationObj.Abbreviation ?? String.Empty,
                                            DateReceived = studentImmunizationObj.DateReceived                                           
                                        }).OrderBy(c => c.ImmunizationID).ToList();
                if (getAllStudentRequest.limit != 0)
                {
                    studentImmunizations = studentImmunizations.Skip((getAllStudentRequest.page) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return studentImmunizations;
        }
               
        private List<StudentAllergiesViewModel> GetAllStudentAllergies(StudentBaseRequestViewModel getAllStudentRequest)
        {
            List<StudentAllergiesViewModel> studentAllergies = new List<StudentAllergiesViewModel>();
            try
            {
                studentAllergies = (from studentAllergiesObj in _studentAllergiesRepository.GetAll()
                                    join allergyNameObj in _allergyNameRepository.GetAll() on studentAllergiesObj.AllergyNameID equals allergyNameObj.Id
                                    join allergyReactionTypeObj in _allergyReactionTypeRepository.GetAll() on studentAllergiesObj.AllergyReactionTypeID equals allergyReactionTypeObj.Id
                                    join allergyTypeObj in _allergyTypeRepository.GetAll() on studentAllergiesObj.AllergyTypeID equals allergyTypeObj.Id
                                    where (!studentAllergiesObj.IsDeleted && studentAllergiesObj.StudentID == getAllStudentRequest.StudentID)
                                    select new StudentAllergiesViewModel()
                                    {
                                        StudentAllergiesID = studentAllergiesObj.Id,
                                        StudentID = studentAllergiesObj.StudentID,
                                        AllergyReactionTypeID = studentAllergiesObj.AllergyReactionTypeID,
                                        AllergyReactionTypeName = allergyReactionTypeObj.AllergyReactionTypeName ?? String.Empty,
                                        AllergyNameID = studentAllergiesObj.AllergyNameID,
                                        AllergyName = allergyNameObj.NameOfAllergy ?? String.Empty,
                                        AgencyID = studentAllergiesObj.AgencyID,
                                        AllergyComment = studentAllergiesObj.AllergyComment ?? String.Empty,
                                        FirstAllergyObservation = studentAllergiesObj.FirstAllergyObservation,
                                        LastAllergyObservation = studentAllergiesObj.LastAllergyObservation,
                                        AllergyTypeID = allergyTypeObj.Id,
                                        AllergyTypeName = allergyTypeObj.AllergyTypeName ?? String.Empty,
                                        Treatment = studentAllergiesObj.Treatment ?? String.Empty                                       
                                    }).OrderBy(c => c.AllergyNameID).ToList();
                if (getAllStudentRequest.limit != 0)
                {
                    studentAllergies = studentAllergies.Skip((getAllStudentRequest.page) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return studentAllergies;
        }

        private List<StudentDisabilitiesViewModel> GetAllStudentDisabilities(StudentBaseRequestViewModel getAllStudentRequest)
        {
            List<StudentDisabilitiesViewModel> studentDisabilities = new List<StudentDisabilitiesViewModel>();
            try
            {
                studentDisabilities = (from studentDisabilitiesObj in _studentDisabilitiesRepository.GetAll()
                                       where (!studentDisabilitiesObj.IsDeleted && studentDisabilitiesObj.StudentID == getAllStudentRequest.StudentID)
                                       select new StudentDisabilitiesViewModel()
                                       {
                                           Id = studentDisabilitiesObj.Id,
                                           StudentID = studentDisabilitiesObj.StudentID,
                                           Description = studentDisabilitiesObj.Description ?? String.Empty,
                                           AgencyID = studentDisabilitiesObj.AgencyID                                          
                                       }).OrderBy(c => c.Description).ToList();
                if (getAllStudentRequest.limit != 0)
                {
                    studentDisabilities = studentDisabilities.Skip((getAllStudentRequest.page) * getAllStudentRequest.limit).Take(getAllStudentRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return studentDisabilities;
        }

        private List<ClassEnrollmentViewModel> GetStudentEnrolledClasses(StudentBaseRequestViewModel getStudentEnrolledClassesRequest)
        {
            List<ClassEnrollmentViewModel> studentEnrolledClasses = new List<ClassEnrollmentViewModel>();
            try
            {
                IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(check => check.AgencyID == getStudentEnrolledClassesRequest.AgencyID);
                IQueryable<Entity.Agency.ClassEnrollment> selectedEnrolledClasses = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentEnrolledClassesRequest.AgencyID && check.StudentID == getStudentEnrolledClassesRequest.StudentID);
                studentEnrolledClasses = (from enrolledClassesObj in selectedEnrolledClasses
                                          join classesObj in selectedClasses on enrolledClassesObj.ClassesID equals classesObj.Id
                                          where (!enrolledClassesObj.IsDeleted && enrolledClassesObj.StudentID == getStudentEnrolledClassesRequest.StudentID)
                                          select new ClassEnrollmentViewModel()
                                          {
                                              Id = enrolledClassesObj.Id,
                                              ClassesID = enrolledClassesObj.ClassesID,
                                              ClassName = classesObj.ClassName,
                                              ClassEnrollStartDate = enrolledClassesObj.ClassEnrollStartDate,
                                              ClassEnrollEndDate = enrolledClassesObj.ClassEnrollEndDate,
                                              AgencyID = enrolledClassesObj.AgencyID                                             
                                          }).OrderBy(c => c.ClassName).ToList();
                if (getStudentEnrolledClassesRequest.limit != 0)
                {
                    studentEnrolledClasses = studentEnrolledClasses.Skip((getStudentEnrolledClassesRequest.page) * getStudentEnrolledClassesRequest.limit).Take(getStudentEnrolledClassesRequest.limit).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return studentEnrolledClasses;
        }

        public ResponseViewModal GetAllUnaaprovedStudents(StudentBaseRequestViewModel getStudentUnapprovedStudentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentUnapprovedStudentRequest.AgencyID > 0)
                {
                    List<UnapprovedStudentViewModel> studentInformation = new List<UnapprovedStudentViewModel>();
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getStudentUnapprovedStudentRequest.AgencyID);
                    IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(check => check.AgencyID == getStudentUnapprovedStudentRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectEnrolledStudent = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentUnapprovedStudentRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> selectClassess = _classesRepository.GetAll().Where(check => check.AgencyID == getStudentUnapprovedStudentRequest.AgencyID);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    studentInformation = (from studentEnrolledObj in selectEnrolledStudent
                                          join studentObj in selectedStudent on studentEnrolledObj.StudentID equals studentObj.Id
                                          join classObj in selectClassess on studentEnrolledObj.ClassesID equals classObj.Id
                                          join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                         // join feePaymentTypeObj in feePaymentType on classObj.FeeTypeId equals feePaymentTypeObj.Id
                                          where (!studentEnrolledObj.IsDeleted && studentEnrolledObj.EnrollmentStatus == 1)//(studentEnrolledObj.EnrollmentStatus == 1 || studentEnrolledObj.EnrollmentStatus == 4)) // status 1 - requested for enrolment
                                          select new UnapprovedStudentViewModel()
                                          {
                                              EnrollmentID = studentEnrolledObj.Id,
                                              ParentName = parentObj.ParentName,
                                              StudentName = studentObj.StudentName,
                                              ClassName = classObj.ClassName,
                                              ClassID = classObj.Id,
                                              ParentID = parentObj.Id,
                                              StudentID = studentObj.Id,
                                              AgencyID = parentObj.AgencyID,
                                              ImagePath = studentObj.ImagePath ?? String.Empty,
                                              EnrolledStatus = studentEnrolledObj.EnrollmentStatus,
                                              ClassEnrollStartDate = studentEnrolledObj.ClassEnrollStartDate,
                                              classEnrollEndDate = studentEnrolledObj.ClassEnrollEndDate,
                                              Fees=classObj.Fees,
                                              FeeTypeId= classObj.FeeTypeId                                             
                                          }).OrderBy(c => c.StudentName).ToList(); ;
                    res.Data = studentInformation;
                    res.TotalRows = studentInformation.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Non enrolled student Information has been fetched.";
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

        static string CalculateYourAge(DateTime Dob)
        {
            try
            {
                if (Dob != DateTime.MinValue)
                {
                    DateTime Now = DateTime.Now;
                    int Years = new DateTime(DateTime.Now.Subtract(Dob).Ticks).Year - 1;
                    DateTime PastYearDate = Dob.AddYears(Years);
                    int Months = 0;
                    for (int i = 1; i <= 12; i++)
                    {
                        if (PastYearDate.AddMonths(i) == Now)
                        {
                            Months = i;
                            break;
                        }
                        else if (PastYearDate.AddMonths(i) >= Now)
                        {
                            Months = i - 1;
                            break;
                        }
                    }
                    int Days = Now.Subtract(PastYearDate.AddMonths(Months)).Days;
                    int Hours = Now.Subtract(PastYearDate).Hours;
                    int Minutes = Now.Subtract(PastYearDate).Minutes;
                    int Seconds = Now.Subtract(PastYearDate).Seconds;
                    return String.Format("{0} Year(s) {1} Month(s) {2} Day(s)",
                    Years, Months, Days);
                }
                else
                {
                    return "NA";
                }
            }
            catch (Exception ex)
            {
                return "NA";
            }
        }

        public ResponseViewModal GetAllStudentsforKioskApp(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllStudentsRequest.IsAuthPerson == false)
                {
                    if (getAllStudentsRequest.AgencyID > 0)
                    {
                        List<StudentViewModel> allStudents = new List<StudentViewModel>();
                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                        IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll();
                        IQueryable<Entity.Masters.Gender> selectedGender = _genderRepository.GetAll();
                        IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll();
                        IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll();
                        IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll();
                        IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll();
                        IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID && check.Id == getAllStudentsRequest.ParentID);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID && check.EnrollmentStatus == 2);
                        IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                        IQueryable<Entity.Parent.ParentStudentMapping> selectedMapping = _parentStudentMappingRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID && check.ParentID == getAllStudentsRequest.ParentID);
                        IQueryable<KioskeStudentSignInDetails> kioskeDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(filter => filter.AgencyID == getAllStudentsRequest.AgencyID)
                                                               .GroupBy(x => x.StudentID)
                                                               .Select(x => new
                                                               {
                                                                   Key = x.Key,
                                                                   Value = x.OrderByDescending(t => t.DropOutDateTime != null ? t.DropOutDateTime
                                                                                               : t.BreakOutDateTime != null ? t.BreakOutDateTime
                                                                                               : t.BreakInDateTime != null ? t.BreakInDateTime
                                                                                               : t.DropInDateTime)
                                                               })
                                                               .Select(x => x.Value.FirstOrDefault());


                        IQueryable<Entity.Student.StudentAllergies> allergyDetails = _studentAllergiesRepository.GetAll().Where(Check => Check.AgencyID == getAllStudentsRequest.AgencyID && !Check.IsDeleted);
                        IQueryable<Entity.Masters.AllergyType> allergyTypes = _allergyTypeRepository.GetAll(check => !check.IsDeleted);
                        IQueryable<Entity.Masters.AllergyName> allergyNames = _allergyNameRepository.GetAll(check => !check.IsDeleted);
                        IQueryable<Entity.Masters.AllergyReactionType> allergyReaction = _allergyReactionTypeRepository.GetAll(check => !check.IsDeleted);
                        IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.AgencyID == getAllStudentsRequest.AgencyID && !Check.IsDeleted);
                        IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();

                        allStudents = (from mapObj in selectedMapping
                                       join studentObj in selectedStudents on mapObj.StudentID equals studentObj.Id                                      
                                       join classEnrollmentObj in selectedClassEnrollment on mapObj.StudentID equals classEnrollmentObj.StudentID
                                       join genderObj in selectedGender on studentObj.GenderID equals genderObj.Id                                    
                                       join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                                       join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id                                                                     
                                       join kioskeDetailsprimeobj in kioskeDetails on mapObj.StudentID equals kioskeDetailsprimeobj.StudentID
                                       into kioskeDetailsObj
                                       from kioskeDetailsprimeobj in kioskeDetailsObj.DefaultIfEmpty()
                                       where (!mapObj.IsDeleted && getAllStudentsRequest.AgencyID == mapObj.AgencyID && getAllStudentsRequest.ParentID == mapObj.ParentID)
                                       select new StudentViewModel()
                                       {
                                           StudentId = mapObj.StudentID,
                                           StudentName = studentObj.StudentName ?? String.Empty,
                                           AgencyID = studentObj.AgencyID,
                                           ParentID = studentObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           FirstName = studentObj.FirstName ?? String.Empty,
                                           LastName = studentObj.LastName ?? String.Empty,
                                           GenderID = studentObj.GenderID,
                                           GenderName = genderObj.GenderName ?? String.Empty,
                                           ImagePath = studentObj.ImagePath ?? String.Empty,
                                           Address = studentObj.Address ?? String.Empty,                                         
                                           PostalCode = studentObj.PostalCode ?? String.Empty,
                                           SchoolName = studentObj.SchoolName ?? String.Empty,                                        
                                           DateOfBirth = studentObj.DateOfBirth,                                        
                                           InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                           InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,                                          
                                           ClassId = classObj.Id,
                                           ClassName = classObj.ClassName,
                                           EnrolledStatus = classEnrollmentObj.EnrollmentStatus,
                                           CurrentCheckInStatus = kioskeDetailsprimeobj.IsDropIn,
                                           CurrentCheckOutStatus = kioskeDetailsprimeobj.IsDropOut,
                                           CurrentBreakInStatus = kioskeDetailsprimeobj.IsBreakIn,
                                           CurrentBreakOutStatus = kioskeDetailsprimeobj.IsBreakOut
                                       }).OrderBy(c => c.StudentName).ToList();

                        var result = allStudents.GroupBy(p => p.StudentId).Select(p => p.First()).ToList();
                        //to add class names
                        foreach (var r in result)
                        {
                            var getStudentsubsidydetails = _studentsubsidyDetailsRepository.GetAll().Where(check => check.StudentID == r.StudentId && check.AgencyID == getAllStudentsRequest.AgencyID && check.IsDeleted == false);

                            var allStudentSubsidyDetails = (from SSD in getStudentsubsidydetails
                                                            where SSD.StudentID == r.StudentId && !SSD.IsDeleted && SSD.AgencyID == getAllStudentsRequest.AgencyID &&
                                                            SSD.FromDate.Date <= DateTime.Now.Date && SSD.ToDate.Date >= DateTime.Now.Date
                                                            select new StudentSubsidyDetailsViewModel()
                                                            {
                                                               StudentID = SSD.StudentID
                                                            }).ToList();

                                if (allStudentSubsidyDetails.Count > 0)
                                {
                                    r.IsSubsidy = true;                                   
                                }
                                else
                                {
                                    r.IsSubsidy = false;
                                }

                            var aallergyDetails = (from allergyDetailsObj in allergyDetails
                                                   join alleryTypeObj in allergyTypes on allergyDetailsObj.AllergyTypeID equals alleryTypeObj.Id
                                                   join allergyNameObj in allergyNames on allergyDetailsObj.AllergyNameID equals allergyNameObj.Id
                                                   join allergyReactionObj in allergyReaction on allergyDetailsObj.AllergyReactionTypeID equals allergyReactionObj.Id
                                                   where allergyDetailsObj.StudentID == r.StudentId && allergyDetailsObj.IsDeleted == false
                                                   select new ReportViewModel()
                                                   {
                                                       StudentID = allergyDetailsObj.StudentID,
                                                       AllergyName = allergyNameObj.NameOfAllergy,
                                                       Allergy = alleryTypeObj.AllergyTypeName,
                                                       AllergyReaction = allergyReactionObj.AllergyReactionTypeName,
                                                       AllergyTreatment = allergyDetailsObj.Treatment,
                                                       AllergyFirstObservedDate = allergyDetailsObj.FirstAllergyObservation,
                                                       AllergyLastObservedDate = allergyDetailsObj.LastAllergyObservation,
                                                       AllergyComment = allergyDetailsObj.AllergyComment
                                                   }).ToList();

                            if(aallergyDetails.Count > 0)
                            {
                                var allerggy = aallergyDetails.Where(p => p.StudentID == r.StudentId).Select(p => p.AllergyName).ToArray();

                                r.AllergyName = string.Join(",", allerggy);
                                r.AllergyStatus = true;
                            }
                            else
                            {
                                r.AllergyName = "";
                                r.AllergyStatus = false;
                            }

                            var allMedicationList = (from medicationObj in medicationCollection
                                                     join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id
                                                     where medicationObj.StudentID == r.StudentId && medicationObj.IsDeleted == false
                                                     select new ReportViewModel
                                                     {
                                                         StudentID = medicationObj.StudentID,
                                                         MedicationName = medicationObj.MedicationName,
                                                         Units = medicationObj.Units,
                                                         Strength = medicationObj.strength,
                                                         HowToTake = medicationObj.HowTaken,
                                                         MedStartDate = medicationObj.StartDate.Date,
                                                         MedEndDate = medicationObj.EndDate.Date,
                                                         OtherMedication = medicationObj.OtherMedication,
                                                         DoseRepeat = doseObj.DoseRepeatName,
                                                         MedQuantity = medicationObj.DosageQuantityID
                                                     }).ToList();

                            if (allMedicationList.Count > 0)
                            {
                                var Medication = allMedicationList.Where(p => p.StudentID == r.StudentId).Select(p => p.MedicationName).ToArray();

                                r.MedicationName = string.Join(",", Medication);
                                r.MedicationStatus = true;
                            }
                            else
                            {
                                r.MedicationName = "";
                                r.MedicationStatus = false;
                            }
                            var clasess = allStudents.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassName).ToArray();
                            r.ClassName = string.Join(",", clasess);

                            r.Age = CalculateYourAge(r.DateOfBirth);

                            if (r.CurrentCheckInStatus == false && r.CurrentCheckOutStatus == false && r.CurrentBreakInStatus == false && r.CurrentBreakOutStatus == false)
                            {
                                r.CurrentStatus = 0;
                            }
                            else if (r.CurrentCheckInStatus == true)
                            {
                                r.CurrentStatus = 1;
                            }
                            else if (r.CurrentBreakOutStatus == true)
                            {
                                r.CurrentStatus = 2;
                            }
                            else if (r.CurrentBreakInStatus == true)
                            {
                                r.CurrentStatus = 3;
                            }
                            else if (r.CurrentCheckOutStatus == true)
                            {
                                r.CurrentStatus = 4;
                            }
                        }
                       res.Data = result;

                        if (getAllStudentsRequest.limit != 0)
                        {
                            res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                        }
                        res.TotalRows = result.Count();
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
                else
                {
                    if (getAllStudentsRequest.AgencyID > 0)
                    {
                        List<StudentViewModel> allStudents = new List<StudentViewModel>();                       
                        IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                        IQueryable<Entity.Masters.Gender> selectedGender = _genderRepository.GetAll();                  
                        IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID && check.Id == getAllStudentsRequest.ParentID);
                        IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                        IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);                      
                        IQueryable<Entity.Masters.AuthorizedPerson> authorizedPerson = _authorizedPersonDetails.GetAll().Where(check => check.QuickPin == getAllStudentsRequest.QuickPin && check.AgencyID == getAllStudentsRequest.AgencyID && check.ParentID == getAllStudentsRequest.ParentID && check.IsActive == true);
                        IQueryable<KioskeStudentSignInDetails> kioskeDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(filter => filter.AgencyID == getAllStudentsRequest.AgencyID)
                                                               .GroupBy(x => x.StudentID)
                                                               .Select(x => new
                                                               {
                                                                   Key = x.Key,
                                                                   Value = x.OrderByDescending(t => t.DropOutDateTime != null ? t.DropOutDateTime
                                                                                               : t.BreakOutDateTime != null ? t.BreakOutDateTime
                                                                                               : t.BreakInDateTime != null ? t.BreakInDateTime
                                                                                               : t.DropInDateTime)
                                                               })
                                                               .Select(x => x.Value.FirstOrDefault());                     

                        allStudents = (from mapObj in authorizedPerson
                                       join studentObj in selectedStudents on mapObj.StudentID equals studentObj.Id                                     
                                       join classEnrollmentObj in selectedClassEnrollment on mapObj.StudentID equals classEnrollmentObj.StudentID
                                       join genderObj in selectedGender on studentObj.GenderID equals genderObj.Id                                      
                                       join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                                       join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id
                                       join kioskeDetailsprimeobj in kioskeDetails on mapObj.StudentID equals kioskeDetailsprimeobj.StudentID
                                       into kioskeDetailsObj
                                       from kioskeDetailsprimeobj in kioskeDetailsObj.DefaultIfEmpty()
                                       where (mapObj.QuickPin == getAllStudentsRequest.QuickPin && mapObj.IsActive == true
                                             && mapObj.AgencyID == getAllStudentsRequest.AgencyID && mapObj.ParentID == getAllStudentsRequest.ParentID)
                                       select new StudentViewModel()
                                       {
                                           StudentId = studentObj.Id,
                                           StudentName = studentObj.StudentName ?? String.Empty,
                                           AgencyID = studentObj.AgencyID,
                                           ParentID = studentObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           FirstName = studentObj.FirstName ?? String.Empty,
                                           LastName = studentObj.LastName ?? String.Empty,
                                           GenderID = studentObj.GenderID,
                                           GenderName = genderObj.GenderName ?? String.Empty,
                                           ImagePath = studentObj.ImagePath ?? String.Empty,
                                           Address = studentObj.Address ?? String.Empty,                                        
                                           PostalCode = studentObj.PostalCode ?? String.Empty,
                                           SchoolName = studentObj.SchoolName ?? String.Empty,                                       
                                           DateOfBirth = studentObj.DateOfBirth,                                         
                                           ClassId = classObj.Id,
                                           ClassName = classObj.ClassName,
                                           EnrolledStatus = classEnrollmentObj.EnrollmentStatus,
                                           CurrentCheckInStatus = kioskeDetailsprimeobj.IsDropIn,
                                           CurrentCheckOutStatus = kioskeDetailsprimeobj.IsDropOut,
                                           CurrentBreakInStatus = kioskeDetailsprimeobj.IsBreakIn,
                                           CurrentBreakOutStatus = kioskeDetailsprimeobj.IsBreakOut
                                       }).OrderBy(c => c.StudentName).ToList();

                        var result = allStudents.GroupBy(p => p.StudentId).Select(p => p.First()).ToList();
                        //to add class names
                        foreach (var r in result)
                        {
                            var clasess = allStudents.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassName).ToArray();
                            r.ClassName = string.Join(",", clasess);
                            if (r.CurrentCheckInStatus == false && r.CurrentCheckOutStatus == false && r.CurrentBreakInStatus == false && r.CurrentBreakOutStatus == false)
                            {
                                r.CurrentStatus = 0;
                            }
                            else if (r.CurrentCheckInStatus == true)
                            {
                                r.CurrentStatus = 1;
                            }
                            else if (r.CurrentBreakOutStatus == true)
                            {
                                r.CurrentStatus = 2;
                            }
                            else if (r.CurrentBreakInStatus == true)
                            {
                                r.CurrentStatus = 3;
                            }
                            else if (r.CurrentCheckOutStatus == true)
                            {
                                r.CurrentStatus = 4;
                            }
                        }
                        res.Data = result;

                        if (getAllStudentsRequest.limit != 0)
                        {
                            res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                        }
                        res.TotalRows = result.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "All Authorized Person Student List has been fetched.";
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
        
        public ResponseViewModal SaveKioskeStudentSignInDetailsInformation(params KioskeStudentSignInDetailsViewModel[] saveKioskeSignInDetailsRequests)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var saveKioskeSignInDetailsRequest in saveKioskeSignInDetailsRequests)
                    {
                        long id = 0;
                        KioskeStudentSignInDetails kStudentSignInDetailsObj = null;

                        if (saveKioskeSignInDetailsRequest.AgencyID > 0)
                        {
                            saveKioskeSignInDetailsRequest.CreatedBy = saveKioskeSignInDetailsRequest.CreatedBy;
                            saveKioskeSignInDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveKioskeSignInDetailsRequest.IsActive = true;
                            saveKioskeSignInDetailsRequest.IsDeleted = false;
                            if (saveKioskeSignInDetailsRequest.IsDropIn == true)
                            {
                                saveKioskeSignInDetailsRequest.DropInDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsDropOut == true)
                            {
                                saveKioskeSignInDetailsRequest.DropOutDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsBreakOut == true)
                            {
                                saveKioskeSignInDetailsRequest.BreakOutDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsBreakIn == true)
                            {
                                saveKioskeSignInDetailsRequest.BreakInDateTime = DateTime.Now;
                            }
                            kStudentSignInDetailsObj = new KioskeStudentSignInDetails();
                            Mapper.Map(saveKioskeSignInDetailsRequest, kStudentSignInDetailsObj);
                            _kioskeStudentSignInDetailsRepository.Create(kStudentSignInDetailsObj);
                            _kioskeStudentSignInDetailsRepository.SaveChanges();
                            id = kStudentSignInDetailsObj.Id;
                            res.SaveId = id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Action Completed Successfully.";                            
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Missing Parameter.";
                            res.IsSuccess = false;
                            daycaredb.Rollback();
                            return res;
                        }
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                    return res;
                }
            }
            return res;
        }

        public ResponseViewModal SaveKioskeStudentSignInDetails(KioskeStudentSignInDetailsViewModel saveKioskeSignInDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                        long id = 0;
                        KioskeStudentSignInDetails kStudentSignInDetailsObj = null;

                        if (saveKioskeSignInDetailsRequest.AgencyID > 0)
                        {
                            saveKioskeSignInDetailsRequest.CreatedBy = saveKioskeSignInDetailsRequest.CreatedBy;
                            saveKioskeSignInDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveKioskeSignInDetailsRequest.IsActive = true;
                            saveKioskeSignInDetailsRequest.IsDeleted = false;
                            if (saveKioskeSignInDetailsRequest.IsDropIn == true)
                            {
                                saveKioskeSignInDetailsRequest.DropInDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsDropOut == true)
                            {
                                saveKioskeSignInDetailsRequest.DropOutDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsBreakOut == true)
                            {
                                saveKioskeSignInDetailsRequest.BreakOutDateTime = DateTime.Now;
                            }
                            else if (saveKioskeSignInDetailsRequest.IsBreakIn == true)
                            {
                                saveKioskeSignInDetailsRequest.BreakInDateTime = DateTime.Now;
                            }
                            kStudentSignInDetailsObj = new KioskeStudentSignInDetails();
                            Mapper.Map(saveKioskeSignInDetailsRequest, kStudentSignInDetailsObj);
                            _kioskeStudentSignInDetailsRepository.Create(kStudentSignInDetailsObj);
                            _kioskeStudentSignInDetailsRepository.SaveChanges();
                            id = kStudentSignInDetailsObj.Id;
                            res.SaveId = id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Action Completed Successfully.";
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Missing Parameter.";
                            res.IsSuccess = false;
                            daycaredb.Rollback();
                            return res;
                        }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                    return res;
                }
            }
            return res;
        }

        public ResponseViewModal GetActiveAndDeaactiveStudents(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Student.Student> selectedStudents;
                if (getAllStudentsRequest.AgencyID > 0)
                {
                    string studentname = getAllStudentsRequest.StudentName.TrimStart();
                    studentname = studentname.TrimEnd();

                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    if (getAllStudentsRequest.ActivationType.ToLower() == "activated")
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID && !namecheck.IsDeleted);
                    }
                    else if (getAllStudentsRequest.ActivationType.ToLower() == "deactivated")
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID && namecheck.IsDeleted);
                    }
                    else
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                    }

                    IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted); 
                    IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Masters.TransportationType> selectedTransportationType = _transportationTypeRepository.GetAll().Where(check => !check.IsDeleted); 
                    IQueryable<Entity.Masters.FeePaymentType> selectedFeePaymentType = _feePaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);                                                                             
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);

                    allStudents = (from studentObj in selectedStudents
                                   join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id

                                   join cityPrimeObj in selectedCity on studentObj.CityId equals cityPrimeObj.Id
                                   into cityObj
                                   from cityPrimeObj in cityObj.DefaultIfEmpty()

                                   join genderPrimeObj in selectedGenders on studentObj.GenderID equals genderPrimeObj.Id
                                   into genderObj
                                   from genderPrimeObj in genderObj.DefaultIfEmpty()

                                   join statePrimeObj in selectedState on studentObj.StateId equals statePrimeObj.Id
                                   into stateObj
                                   from statePrimeObj in stateObj.DefaultIfEmpty()

                                   join countryPrimeObj in selectedCountry on studentObj.CountryId equals countryPrimeObj.Id
                                   into countryObj
                                   from countryPrimeObj in countryObj.DefaultIfEmpty()

                                   join transportationTypePrimeObj in selectedTransportationType on studentObj.TransportationID equals transportationTypePrimeObj.Id
                                   into transportationTypeObj
                                   from transportationTypePrimeObj in transportationTypeObj.DefaultIfEmpty()

                                   join feePaymentTypePrimeObj in selectedFeePaymentType on studentObj.FeePaymentTypeID equals feePaymentTypePrimeObj.Id
                                   into feePaymentTypeObj
                                   from feePaymentTypePrimeObj in feePaymentTypeObj.DefaultIfEmpty()
                                  
                                   where (getAllStudentsRequest.AgencyID == studentObj.AgencyID &&
                                   (getAllStudentsRequest.ClassID == 0 || getAllStudentsRequest.ClassID == null))
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName ?? String.Empty,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                       ParentName = parentObj.ParentName ?? String.Empty,
                                       FirstName = studentObj.FirstName ?? String.Empty,
                                       LastName = studentObj.LastName ?? String.Empty,
                                       GenderID = studentObj.GenderID,
                                       GenderName = genderPrimeObj.GenderName ?? String.Empty,
                                       ImagePath = studentObj.ImagePath ?? String.Empty,
                                       Address = studentObj.Address ?? String.Empty,
                                       CountryId = studentObj.CountryId,
                                       CountryName = countryPrimeObj.CountryName ?? String.Empty,
                                       StateId = studentObj.StateId,
                                       StateName = statePrimeObj.StateName ?? String.Empty,
                                       CityId = studentObj.CityId,
                                       CityName = cityPrimeObj.CityName ?? String.Empty,
                                       PostalCode = studentObj.PostalCode ?? String.Empty,
                                       SchoolName = studentObj.SchoolName ?? String.Empty,
                                       TransportationID = studentObj.TransportationID,
                                       TransportationTypeName = transportationTypePrimeObj.TransportationTypeName ?? String.Empty,
                                       DateOfBirth = studentObj.DateOfBirth,
                                       FeePaymentTypeID = studentObj.FeePaymentTypeID,
                                       FeePaymentTypeName = feePaymentTypePrimeObj.FeePaymentTypeName ?? String.Empty,
                                       InsuranceCarrier = studentObj.InsuranceCarrier ?? String.Empty,
                                       InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? String.Empty,
                                       IsDeleted = studentObj.IsDeleted,
                                       DeletedReason = studentObj.DeletedReason
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsRequest.limit != 0)
                    {
                        res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = allStudents.Count();
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
        
        public ResponseViewModal GetKioskeSigninDetailsForAgency(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.StudentName = (getKioskeDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.StudentName);

                string studentname = getKioskeDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                IQueryable<Entity.Agency.KioskeStudentSignInDetails> kioskeDetailCollection;
                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                if (getKioskeDetailsRequest.AskDate == DateTime.MinValue)
                {
                    kioskeDetailCollection = _kioskeStudentSignInDetails.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted && !Check.IsBreakOut && !Check.IsBreakIn);
                }
                else
                {
                    kioskeDetailCollection = _kioskeStudentSignInDetails.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && getKioskeDetailsRequest.AskDate.Date == Convert.ToDateTime(Check.CreatedDate).Date && !Check.IsDeleted
                    && !Check.IsBreakOut && !Check.IsBreakIn);
                }
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);

                allKioskeDetailsList = (from kiosObj in kioskeDetailCollection
                                        join studObj in studentCollection on kiosObj.StudentID equals studObj.Id
                                        where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = kiosObj.AgencyID,
                                            StudentID = studObj.Id,
                                            StudentName = studObj.StudentName,
                                            CheckInTime = Convert.ToDateTime(kiosObj.DropInDateTime),
                                            CheckOutTime = Convert.ToDateTime(kiosObj.DropOutDateTime),
                                            ID = kiosObj.Id
                                        }).OrderBy(c => c.StudentName).ToList();
                res.Data = allKioskeDetailsList;
                if (getKioskeDetailsRequest.limit != 0)
                {
                    res.Data = allKioskeDetailsList.Skip((getKioskeDetailsRequest.page) * getKioskeDetailsRequest.limit).Take(getKioskeDetailsRequest.limit).ToList();
                }

                res.TotalRows = allKioskeDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Kioske Details list has been feteched";
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
        
        public ResponseViewModal GetStudentKioskeDropInOutList(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.StudentName = (getKioskeDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.StudentName);

                string studentname = getKioskeDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                IQueryable<Entity.Agency.KioskeStudentSignInDetails> kioskeDetailCollection;
                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                List<KioskDropINOutTimeViewModel> stdDropInAndOutDetails = new List<KioskDropINOutTimeViewModel>();
                kioskeDetailCollection = _kioskeStudentSignInDetails.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted
                    && !Check.IsBreakOut && !Check.IsBreakIn && Check.StudentID == getKioskeDetailsRequest.StudentID);            

                allKioskeDetailsList = (from kiosObj in kioskeDetailCollection
                                        where (Convert.ToDateTime(kiosObj.CreatedDate).Date == getKioskeDetailsRequest.AskDate.Date)
                                        select new ReportViewModel
                                        {
                                            AgencyID = kiosObj.AgencyID,                                           
                                            CheckInTime = Convert.ToDateTime(kiosObj.DropInDateTime),
                                            CheckOutTime = Convert.ToDateTime(kiosObj.DropOutDateTime),
                                            IsDropIn = kiosObj.IsDropIn,
                                            IsDropOut = kiosObj.IsDropOut,
                                            ID = kiosObj.Id,
                                            AskDate = Convert.ToDateTime(kiosObj.CreatedDate),
                                        }).OrderByDescending(c => c.ID).ToList();

                var count = 0;
                var index = 0;
                KioskDropINOutTimeViewModel obj = new KioskDropINOutTimeViewModel();
                foreach (var item in allKioskeDetailsList)
                {
                    if (count == 0)
                    {
                        obj = new KioskDropINOutTimeViewModel();
                        obj.DropInID = item.IsDropIn ? item.ID : 0;
                        obj.DropOutID = item.IsDropOut ? item.ID : 0;
                        obj.IsDropIn = item.IsDropIn;
                        obj.IsDropOut = item.IsDropOut;
                        obj.AgencyID = item.AgencyID;
                        obj.DropInAndOutDate = item.AskDate;
                        obj.DropInTime = item.CheckInTime;
                        obj.DropOutTime = item.CheckOutTime;

                        count = count + 1;
                    }
                    else
                    {
                        if (obj.IsDropIn)
                        {
                            obj.DropOutID = item.ID;
                            obj.DropOutTime = item.CheckOutTime;
                            if (obj.DropOutTime != DateTime.MinValue && obj.DropInTime != DateTime.MinValue)
                            {
                                count = 0;
                            }
                        }
                        else
                        {
                            obj.DropInID = item.ID;
                            obj.DropInTime = item.CheckInTime;
                            if (obj.DropOutTime != DateTime.MinValue && obj.DropInTime != DateTime.MinValue)
                            {
                                count = 0;
                            }
                        }
                        stdDropInAndOutDetails.Add(obj);
                    }
                }
                res.Data = stdDropInAndOutDetails;
               
                res.TotalRows = allKioskeDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Kioske Details list has been feteched";
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
        
        public ResponseViewModal UpdateStudentKioskeTime(StudentBaseRequestViewModel timeUpdateReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (timeUpdateReq.ID > 0 && timeUpdateReq.AgencyID > 0)
                {
                    long id = 0;                    
                    KioskeStudentSignInDetails kiosksignDetailsObj = null;

                    kiosksignDetailsObj = _kioskeStudentSignInDetailsRepository.Get(x => x.Id == timeUpdateReq.ID && !x.IsDeleted);

                    if (!ReferenceEquals(kiosksignDetailsObj, null))
                    {
                        var DropInDateTime = Convert.ToDateTime(kiosksignDetailsObj.DropInDateTime);
                        var DropOutDateTime = Convert.ToDateTime(kiosksignDetailsObj.DropOutDateTime);

                        // Updating  kioske check in (DropinTime) time
                        if (timeUpdateReq.IsCheckInTime)
                        {
                            var newClockinTime = new DateTime(DropInDateTime.Year, DropInDateTime.Month, DropInDateTime.Day,
                           timeUpdateReq.CheckInTime.Hour, timeUpdateReq.CheckInTime.Minute, timeUpdateReq.CheckInTime.Second);
                            KioskeStudentSignInDetails kioskSignOutObj = null;

                            // bellow code find immidiate CheckOut record to compare time that  checkinTime should be less than checkout time

                            kioskSignOutObj = _kioskeStudentSignInDetailsRepository.GetFirstOrDefault(x => Convert.ToDateTime(x.DropOutDateTime).Date == Convert.ToDateTime(kiosksignDetailsObj.DropInDateTime).Date
                            && !x.IsDeleted && x.StudentID == timeUpdateReq.StudentID && x.IsDropOut && x.Id > timeUpdateReq.ID);

                            // check break in and breacout time comparision with check in  time
                            KioskeStudentSignInDetails kioskBreaksObj = null;
                            if (!ReferenceEquals(kioskSignOutObj, null))
                            {
                                kioskBreaksObj = _kioskeStudentSignInDetailsRepository.GetFirstOrDefault(x => !x.IsDeleted && x.StudentID == timeUpdateReq.StudentID
                                && (x.IsBreakOut || x.IsBreakIn) && x.Id > timeUpdateReq.ID && x.Id < kioskSignOutObj.Id &&
                                (newClockinTime.ToLocalTime() >= Convert.ToDateTime(x.BreakInDateTime).ToLocalTime() || newClockinTime.ToLocalTime() >= Convert.ToDateTime(x.BreakOutDateTime).ToLocalTime()));
                            }
                            else
                            {
                                kioskBreaksObj = _kioskeStudentSignInDetailsRepository.GetFirstOrDefault(x => !x.IsDeleted && x.StudentID == timeUpdateReq.StudentID && (x.IsBreakOut || x.IsBreakIn)
                                && (Convert.ToDateTime(x.BreakInDateTime).Date == Convert.ToDateTime(kiosksignDetailsObj.DropInDateTime).Date || Convert.ToDateTime(x.BreakOutDateTime).Date == Convert.ToDateTime(kiosksignDetailsObj.DropInDateTime).Date)
                                && (newClockinTime.ToLocalTime() >= Convert.ToDateTime(x.BreakInDateTime).ToLocalTime() || newClockinTime.ToLocalTime() >= Convert.ToDateTime(x.BreakOutDateTime).ToLocalTime()));

                            }

                            if (!ReferenceEquals(kioskSignOutObj, null))
                            {
                                if (newClockinTime.ToLocalTime() >= Convert.ToDateTime(kioskSignOutObj.DropOutDateTime).ToLocalTime())
                                {
                                    res.IsSuccess = false;
                                    res.StatusCode = 985;
                                    res.Message = ResponseViewModal.Constants.GreaterCheckInTime;
                                    return res;
                                }
                                else
                                {
                                    kiosksignDetailsObj.DropInDateTime = newClockinTime;
                                    kiosksignDetailsObj.UpdatedBy = timeUpdateReq.UpdatedBy;
                                    kiosksignDetailsObj.UpdatedDate = DateTime.UtcNow;
                                    res.IsSuccess = true;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    res.Message = ResponseViewModal.Constants.TimeUpdatedSuccess;
                                }
                            }
                            else if (!ReferenceEquals(kioskBreaksObj, null))
                            {
                                res.IsSuccess = false;
                                res.StatusCode = 985;
                                res.Message = ResponseViewModal.Constants.GreaterCheckInTimeBreak;
                                return res;
                            }
                            else
                            {
                                kiosksignDetailsObj.DropInDateTime = newClockinTime;
                                kiosksignDetailsObj.UpdatedBy = timeUpdateReq.UpdatedBy;
                                kiosksignDetailsObj.UpdatedDate = DateTime.UtcNow;
                                res.IsSuccess = true;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                                res.Message = ResponseViewModal.Constants.TimeUpdatedSuccess;
                            }
                        }
                        // code for updating kioske check out time (Drop out time) 
                        else
                        {
                            res = UpdateStudentKioskeCheckoutTime(timeUpdateReq, kiosksignDetailsObj);
                            return res;                           
                        }

                        id = kiosksignDetailsObj.Id;
                        _kioskeStudentSignInDetailsRepository.SaveChanges();
                    }

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
            return res;
        }
                       
        public ResponseViewModal UpdateStudentKioskeCheckoutTime(StudentBaseRequestViewModel timeUpdateReq, KioskeStudentSignInDetails kiosksignDetailsObj)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (timeUpdateReq.ID > 0 && timeUpdateReq.AgencyID > 0)
                    {
                        long id = 0;
                        timeUpdateReq.CheckOutTime = timeUpdateReq.CheckOutTime;

                        if (!ReferenceEquals(kiosksignDetailsObj, null))
                        {
                            var DropOutDateTime = Convert.ToDateTime(kiosksignDetailsObj.DropOutDateTime);

                            // Updating  kioske check in (DropinTime) time
                            if (!timeUpdateReq.IsCheckInTime)
                            {
                                var newClockinTime = new DateTime(DropOutDateTime.Year, DropOutDateTime.Month, DropOutDateTime.Day,
                               timeUpdateReq.CheckOutTime.Hour, timeUpdateReq.CheckOutTime.Minute, timeUpdateReq.CheckOutTime.Second);
                                KioskeStudentSignInDetails kioskSignInObj = null;

                                // below code find immidiate Checkin record to compare time that  checkinTime should be less than checkout time

                                kioskSignInObj = _kioskeStudentSignInDetailsRepository.GetFirstOrDefault(x => Convert.ToDateTime(x.DropInDateTime).Date == Convert.ToDateTime(kiosksignDetailsObj.DropOutDateTime).Date
                                && !x.IsDeleted && x.StudentID == timeUpdateReq.StudentID && x.IsDropIn && x.Id < timeUpdateReq.ID);

                                // check break in and breacout time comparision with check in  time
                                KioskeStudentSignInDetails kioskBreaksObj = null;
                                if (!ReferenceEquals(kiosksignDetailsObj, null))
                                {
                                    kioskBreaksObj = _kioskeStudentSignInDetailsRepository.GetFirstOrDefault(x => !x.IsDeleted && x.StudentID == timeUpdateReq.StudentID
                                    && (x.IsBreakOut || x.IsBreakIn) && x.Id < timeUpdateReq.ID && x.Id > kioskSignInObj.Id &&
                                    (newClockinTime.ToLocalTime() <= Convert.ToDateTime(x.BreakInDateTime).ToLocalTime() || newClockinTime.ToLocalTime() <= Convert.ToDateTime(x.BreakOutDateTime).ToLocalTime()));
                                }                                

                                if (!ReferenceEquals(kioskSignInObj, null))
                                {
                                    if (newClockinTime.ToLocalTime() <= Convert.ToDateTime(kioskSignInObj.DropInDateTime).ToLocalTime())
                                    {
                                        res.IsSuccess = false;
                                        res.StatusCode = 985;
                                        res.Message = ResponseViewModal.Constants.LessCheckOutTime;
                                        return res;
                                    }
                                    else
                                    {
                                        kiosksignDetailsObj.DropOutDateTime = newClockinTime;
                                        kiosksignDetailsObj.UpdatedBy = timeUpdateReq.UpdatedBy;
                                        kiosksignDetailsObj.UpdatedDate = DateTime.UtcNow;
                                        res.IsSuccess = true;
                                        res.StatusCode = (long)HttpStatusCodes.OK;
                                        res.Message = ResponseViewModal.Constants.TimeUpdatedSuccess;
                                    }
                                }
                                else if (!ReferenceEquals(kioskBreaksObj, null))
                                {
                                    res.IsSuccess = false;
                                    res.StatusCode = 985;
                                    res.Message = ResponseViewModal.Constants.LessCheckOutTimeBreak;
                                    return res;
                                }
                                else
                                {
                                    kiosksignDetailsObj.DropOutDateTime = newClockinTime;
                                    kiosksignDetailsObj.UpdatedBy = timeUpdateReq.UpdatedBy;
                                    kiosksignDetailsObj.UpdatedDate = DateTime.UtcNow;
                                    res.IsSuccess = true;
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                    res.Message = ResponseViewModal.Constants.TimeUpdatedSuccess;
                                }
                            }

                            id = kiosksignDetailsObj.Id;
                            _kioskeStudentSignInDetailsRepository.SaveChanges();
                        }

                        daycaredb.Commit();
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

        public ResponseViewModal GetAllStudentInformationForCSV(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Student.Student> selectedStudents;
                if (getAllStudentsRequest.AgencyID > 0)
                {
                    string studentname = getAllStudentsRequest.StudentName.TrimStart();
                    studentname = studentname.TrimEnd();

                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    if (getAllStudentsRequest.ActivationType.ToLower() == ConstantString.Activated)
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID && !namecheck.IsDeleted);
                    }
                    else if (getAllStudentsRequest.ActivationType.ToLower() == ConstantString.Deactivated)
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID && namecheck.IsDeleted);
                    }
                    else
                    {
                        selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(studentname.ToUpper()) && namecheck.AgencyID == getAllStudentsRequest.AgencyID);
                    }

                    IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getAllStudentsRequest.AgencyID);
                    IQueryable<Entity.Parent.ParentStudentMapping> parentStudentMapping = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getAllStudentsRequest.AgencyID && !Check.IsDeleted && Check.IsSecondaryParent == true);

                    allStudents = (from studentObj in selectedStudents

                                   join genderPrimeStudentObj in selectedGenders on studentObj.GenderID equals genderPrimeStudentObj.Id
                                   into genderStudentObj
                                   from genderPrimeStudentObj in genderStudentObj.DefaultIfEmpty()

                                   join parentStudentPrimeMappingObj in parentStudentMapping on studentObj.Id equals parentStudentPrimeMappingObj.StudentID
                                   into parentStudentMappingObj
                                   from parentStudentPrimeMappingObj in parentStudentMappingObj.DefaultIfEmpty()

                                   join parentPrimeObj in selectedParent on parentStudentPrimeMappingObj.ParentID equals parentPrimeObj.Id
                                   into parentObj
                                   from parentPrimeObj in parentObj.DefaultIfEmpty()

                                   join genderPrimeParentObj in selectedGenders on parentPrimeObj.GenderID equals genderPrimeParentObj.Id
                                   into genderParentObj
                                   from genderPrimeParentObj in genderParentObj.DefaultIfEmpty()

                                   where (getAllStudentsRequest.AgencyID == studentObj.AgencyID &&
                                   (getAllStudentsRequest.ClassID == 0 || getAllStudentsRequest.ClassID == null))
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName,
                                       FirstName = studentObj.FirstName ?? string.Empty,
                                       LastName = studentObj.LastName ?? string.Empty,
                                       StudentEmailID = studentObj.StudentName,
                                       StudentContactNumber = studentObj.ChildsContactNumber,
                                       DateOfBirth = studentObj.DateOfBirth,
                                       GenderName = genderPrimeStudentObj.GenderName ?? string.Empty,
                                       Address = studentObj.Address ?? string.Empty,
                                       PhysicianName = studentObj.PhysicianName ?? string.Empty,
                                       PreferredHospital = studentObj.PreferredHospital ?? string.Empty,
                                       PhysicianContactNumber = studentObj.PhysicianContactNumber,

                                       ParentID = parentPrimeObj != null ? parentPrimeObj.Id : 0,
                                       ParentName = parentPrimeObj.ParentName ?? string.Empty,
                                       ParentFirstName = parentPrimeObj.FirstName ?? string.Empty,
                                       ParentLastName = parentPrimeObj.LastName ?? string.Empty,
                                       ParentEmailAddress = parentPrimeObj.EmailId ?? string.Empty,
                                       ParentContactNumber = parentPrimeObj != null ? parentPrimeObj.Mobile : 0,
                                       ParentAddress = parentPrimeObj.Address ?? string.Empty,
                                       ParentDateOfBirth = parentPrimeObj.DateOfBirth != null ? parentPrimeObj.DateOfBirth : Convert.ToDateTime(null),
                                       ParentProfession = parentPrimeObj.Profession ?? string.Empty,
                                       ParentGenderName = genderPrimeParentObj.GenderName ?? string.Empty,
                                       EmployerName = parentPrimeObj.EmployerName ?? string.Empty,
                                       EmployerNumber = parentPrimeObj != null ? parentPrimeObj.EmployerNumber:0,
                                       //ParentDateOfBirth = DateTime.TryParse(dateTimeEnd, out validValue)? parentPrimeObj.DateOfBirth : (DateTime?)null

                }).OrderBy(c => c.StudentName).Distinct().ToList();
                    res.Data = allStudents;
                    if (getAllStudentsRequest.limit != 0)
                    {
                        res.Data = allStudents.Skip((getAllStudentsRequest.page) * getAllStudentsRequest.limit).Take(getAllStudentsRequest.limit).ToList();
                    }
                    res.TotalRows = allStudents.Count();
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
    }


}

