using DayCare.Service.IService.Agency;
using DayCare.Data;
using DayCare.Repository.IRepository;
using DayCare.Model.Response;
using System;
using DayCare.Model.Master;
using System.Collections.Generic;
using System.Linq;
using DayCare.Model.Agency;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.IO;
using iTextSharp.text.pdf;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using Microsoft.AspNetCore.Hosting;
using System.Data.SqlTypes;
using DayCare.Entity.Agency;
using DayCare.Model.Teacher;
using DayCare.Service.IService.Common;
using Microsoft.AspNetCore.Http;
using DayCare.Entity.Student;
using DayCare.Model.Student;
using DayCare.Entity.Masters;
using AutoMapper;
using iTextSharp.text.html;
using SelectPdf;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Entity.Parent;
using Dapper;
using System.Data;
using DayCare.Repository.Base;
using System.Threading.Tasks;
using MoreLinq;

namespace DayCare.Service.Service.Agency
{
    public class ReportService : IReportService
    {
        public DataContext _dataContext;
        public IStudentActivitiesRepository _studentActivitiesRepository;
        public IIncidentRepository _incidentRepository;
        public IIncidentInvolvmentRepository _incidentInvolvmentRepository;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classesRepository;
        public ITeacherInfoRepository _teacherRepository;
        public IIncidentPriortyTypeRepository _incidentPriortyTypeRepository;
        public INatureOfInjuryRepository _natureOfInjuryRepository;
        public ITeacherInfoRepository _teacherInfoRepository;
        public IParentStudentMappingRepository _parentStudentMappingRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IClassAssignmentLogRepository _classAssignmentLogRepository;
        public IChatPrivateMessageDetailsRepository _chatPrivateMessageDetailsRepository;
        public IParentRepository _parentRepository;
        public IClassAttendenceRepository _attendceRepository;
        public IInvoiceDetailsRepository _invoiceDetailsRepository;
        public IInvoiceItemDetailsRepository _invoiceItemDetailsRepository;
        public IPayementDetailsRepository _payementDetailsRepository;
        public ICFRepository _cfRepository;
        public ICFDRepository _cfdRepository;
        public IIVDRepository _ivdRepository;
        public IEFDRepository _efdRepository;
        private IHostingEnvironment hostingEnvironment;
        private IKioskeStudentSignInDetailsRepository _kioskeStudentSignInDetails;
        private IStudentMedicationRepository _studentMedicationRepository;
        private IDoseRepeatRepository _doseRepeatRepository;
        public IKioskeStudentSignInDetailsRepository _kioskeStudentSignInDetailsRepository;
        private IStudentAllergiesRepository _studentAllergiesRepository;
        private IAllergyNameRepository _allergyNameRepository;
        private IAllergyTypeRepository _allergyTypeRepository;
        private IAllergyReactionTypeRepository _allergyReactionTypeRepository;
        private IStudentActivityMedicationRepository _studentActivityMedicationRepository;
        private ITeacherClassAttendenceRepository _teacherClassAttendenceRepository;
        private IUserRepository _userRepository;
        public ITeacherDailyAttendenceRepository _teacherDailyAttendenceRepository;
        public ITransactionTypeRepository _transactionTypeRepository;
        public ITransactionMasterRepository _transactionMasterRepository;
        public ITransactionDetailsRepository _transactionDetailsRepository;
        public IAccountLedgerRepository _accountLedgerRepository;
        public IClassTransferAttendenceRepository _classTransferAttendenceRepository;
        public IClassCategoryRepository _classCategoryRepository;
        private IHostingEnvironment _hostingEnvironment;
        public IAdvanceFeePaymentDetailsRepository _advanceFeePaymentDetailsRepository;
        public IStudentSubsidyDetailsRepository _studentsubsidyDetailsRepository;
        public ISubsidyDetailsRepository _subsidyDetailsRepository;
        public IAgencyRepository _agencyDetailsRepository;
        public ICommonService _commonService;
        public IStudentActivityMealRepository _studentActivityMealRepository;
        public IMealPlannerRepository _mealPlannerRepository;
        public IStudentActivityMealFoodItemsRepository _studentActivityMealFoodItemsRepository;
        public IInvolvedMealFoodItemsRepository _involvedMealFoodItemsRepository;
        public IMeasureQuantityTypeRepository _measureQuantityTypeRepository;
        public IMeasureUnitTypeRepository _measureUnitTypeRepository;
        public IFoodTypeRepository _foodTypeRepository;
        public IFoodConsumtionRepository _foodConsumtionRepository;
        public IDailySheetAndBalanceLogRepository _DailySheetAndBalanceLogRepository;
        public IActivityTypeRepository _activityTypeRepository;
        public IErrorlogRepository _errorlogRepository;
        public IMealServeTimeDetailsRepository _mealServeTimeDetails;
        public IGenderRepository _genderRepository;
        public ICityRepository _cityRepository;
        public IStateRepository _stateRepository;
        public ICountryRepository _countryRepository;
        public IRelationTypeRepository _relationTypeRepository;
        public IAuthorizedPersonRepository _authorizedPersonDetails;
        public IStudentImmunizationRepository _studentImmunizationRepository;
        public IImmunizationRepository _immunizationRepository;
        public IStudentDisabilitiesRepository _studentDisabilitiesRepository;
        public IBaseRepository _baserepository;
        public IBusRepository _busRepository;


        public ReportService(DataContext dataContext,
           IStudentActivitiesRepository studentActivitiesRepository,
           IIncidentRepository incidentRepository,
           IIncidentInvolvmentRepository incidentInvolvmentRepository,
           IStudentRepository studentRepository,
           IClassesRepository classesRepository,
           IClassesRepository classRepository,
           ITeacherInfoRepository teacherRepository,
           IIncidentPriortyTypeRepository incidentPriortyTypeRepository,
           INatureOfInjuryRepository natureOfInjuryRepository,
           ITeacherInfoRepository teacherInfoRepository,
           IParentStudentMappingRepository parentStudentMappingRepository,
           IClassEnrollmentRepository classEnrollmentRepository,
           IClassAssignmentLogRepository classAssignmentLogRepository,
           IChatPrivateMessageDetailsRepository chatPrivateMessageDetailsRepository,
           IParentRepository parentRepository,
           IClassAttendenceRepository attendceRepository,
           IInvoiceDetailsRepository invoiceDetailsRepository,
             IHostingEnvironment HostingEnvironment,
             IPayementDetailsRepository payementDetailsRepository,
             IKioskeStudentSignInDetailsRepository kioskeStudentSignInDetails,
             IStudentMedicationRepository studentMedicationRepository,
             IDoseRepeatRepository doseRepeatRepository,
             IStudentAllergiesRepository studentAllergiesRepository,
             IAllergyNameRepository allergyNameRepository,
             IAllergyTypeRepository allergyTypeRepository,
             IAllergyReactionTypeRepository allergyReactionTypeRepository,
             IStudentActivityMedicationRepository studentActivityMedicationRepository,
             IUserRepository userRepository,
             ITeacherClassAttendenceRepository teacherClassAttendenceRepository,
             ITeacherDailyAttendenceRepository teacherDailyAttendenceRepository,
             ITransactionTypeRepository transactionTypeRepository,
             ITransactionMasterRepository transactionMasterRepository,
             ITransactionDetailsRepository transactionDetailsRepository,
             IAccountLedgerRepository accountLedgerRepository,
             IKioskeStudentSignInDetailsRepository kioskeStudentSignInDetailsRepository,
             IClassTransferAttendenceRepository classTransferAttendenceRepository,
             IClassCategoryRepository classCategoryRepository,
             IHostingEnvironment hostingEnvironment,
             IInvoiceItemDetailsRepository invoiceItemDetailsRepository,
             IAdvanceFeePaymentDetailsRepository advanceFeePaymentDetailsRepository,
             IStudentSubsidyDetailsRepository studentsubsidyDetailsRepository,
             ISubsidyDetailsRepository subsidyDetailsRepository,
             IAgencyRepository agencyDetailsRepository,
             ICommonService commonService,
             IStudentActivityMealRepository studentActivityMealRepository,
             IStudentActivityMealFoodItemsRepository studentActivityMealFoodItemsRepository,
             IMealPlannerRepository mealPlannerRepository,
             IMeasureQuantityTypeRepository measureQuantityTypeRepository,
             IInvolvedMealFoodItemsRepository involvedMealFoodItemsRepository,
             IMeasureUnitTypeRepository measureUnitTypeRepository,
             IFoodConsumtionRepository foodConsumtionRepository,
             IFoodTypeRepository foodTypeRepository,
             IDailySheetAndBalanceLogRepository dailySheetAndBalanceLogRepository,
             ICFRepository cfRepository,
             ICFDRepository cfdRepository,
             IEFDRepository efdRepository,
             IActivityTypeRepository activityTypeRepository,
             IErrorlogRepository errorlogRepository,
             IMealServeTimeDetailsRepository mealServeTimeDetails,
             IGenderRepository genderRepository,
             ICityRepository cityRepository,
             IStateRepository stateRepository,
             ICountryRepository countryRepository,
             IRelationTypeRepository relationTypeRepository,
             IAuthorizedPersonRepository authorizedPersonDetails,
             IStudentImmunizationRepository studentImmunizationRepository,
             IStudentDisabilitiesRepository studentDisabilitiesRepository,
             IImmunizationRepository immunizationRepository,
             IBaseRepository baseRepository,
              IBusRepository busRepository
           )
        {
            _dataContext = dataContext;
            _studentActivitiesRepository = studentActivitiesRepository;
            _incidentRepository = incidentRepository;
            _incidentInvolvmentRepository = incidentInvolvmentRepository;
            _studentRepository = studentRepository;
            _classesRepository = classesRepository;
            _teacherRepository = teacherRepository;
            _incidentPriortyTypeRepository = incidentPriortyTypeRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
            _teacherInfoRepository = teacherInfoRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _classAssignmentLogRepository = classAssignmentLogRepository;
            _chatPrivateMessageDetailsRepository = chatPrivateMessageDetailsRepository;
            _parentRepository = parentRepository;
            _attendceRepository = attendceRepository;
            _invoiceDetailsRepository = invoiceDetailsRepository;
            hostingEnvironment = HostingEnvironment;
            _payementDetailsRepository = payementDetailsRepository;
            _kioskeStudentSignInDetails = kioskeStudentSignInDetails;
            _studentMedicationRepository = studentMedicationRepository;
            _doseRepeatRepository = doseRepeatRepository;
            _studentAllergiesRepository = studentAllergiesRepository;
            _allergyNameRepository = allergyNameRepository;
            _allergyTypeRepository = allergyTypeRepository;
            _allergyReactionTypeRepository = allergyReactionTypeRepository;
            _studentActivityMedicationRepository = studentActivityMedicationRepository;
            _userRepository = userRepository;
            _teacherClassAttendenceRepository = teacherClassAttendenceRepository;
            _teacherDailyAttendenceRepository = teacherDailyAttendenceRepository;
            _transactionTypeRepository = transactionTypeRepository;
            _transactionMasterRepository = transactionMasterRepository;
            _transactionDetailsRepository = transactionDetailsRepository;
            _kioskeStudentSignInDetailsRepository = kioskeStudentSignInDetailsRepository;
            _accountLedgerRepository = accountLedgerRepository;
            _classTransferAttendenceRepository = classTransferAttendenceRepository;
            _classCategoryRepository = classCategoryRepository;
            _hostingEnvironment = hostingEnvironment;
            _invoiceItemDetailsRepository = invoiceItemDetailsRepository;
            _advanceFeePaymentDetailsRepository = advanceFeePaymentDetailsRepository;
            _studentsubsidyDetailsRepository = studentsubsidyDetailsRepository;
            _subsidyDetailsRepository = subsidyDetailsRepository;
            _commonService = commonService;
            _agencyDetailsRepository = agencyDetailsRepository;
            _studentActivityMealRepository = studentActivityMealRepository;
            _mealPlannerRepository = mealPlannerRepository;
            _studentActivityMealFoodItemsRepository = studentActivityMealFoodItemsRepository;
            _involvedMealFoodItemsRepository = involvedMealFoodItemsRepository;
            _measureUnitTypeRepository = measureUnitTypeRepository;
            _measureQuantityTypeRepository = measureQuantityTypeRepository;
            _foodTypeRepository = foodTypeRepository;
            _foodConsumtionRepository = foodConsumtionRepository;
            _DailySheetAndBalanceLogRepository = dailySheetAndBalanceLogRepository;
            _cfRepository = cfRepository;
            _cfdRepository = cfdRepository;
            _activityTypeRepository = activityTypeRepository;
            _efdRepository = efdRepository;
            _errorlogRepository = errorlogRepository;
            _mealServeTimeDetails = mealServeTimeDetails;
            _genderRepository = genderRepository;
            _cityRepository = cityRepository;
            _stateRepository = stateRepository;
            _countryRepository = countryRepository;
            _relationTypeRepository = relationTypeRepository;
            _authorizedPersonDetails = authorizedPersonDetails;
            _studentImmunizationRepository = studentImmunizationRepository;
            _immunizationRepository = immunizationRepository;
            _studentDisabilitiesRepository = studentDisabilitiesRepository;
            _baserepository = baseRepository;
            _busRepository = busRepository;
        }
        public ResponseViewModal GetBirthDateReport(ReportViewModel getBirthDateRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getBirthDateRequest.StudentName = (getBirthDateRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.StudentName);

                getBirthDateRequest.ClassesName = (getBirthDateRequest.ClassesName ?? string.Empty).Trim().ToLower();
                var isClassNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.ClassesName);


                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getBirthDateRequest.FromDate;
                var toDate = getBirthDateRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                var fromMonthDate = fromDate.Month * 100 + fromDate.Day;
                var toMonthDate = toDate.Month * 100 + toDate.Day;

                long newmonth = getBirthDateRequest.month;
                if (newmonth != 0)
                {
                    newmonth = getBirthDateRequest.month;
                }
                else
                {
                    newmonth = 0;
                }

                List<ReportViewModel> allBirthDateList = new List<ReportViewModel>();

                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && (fromMonthDate <= (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) && (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) <= toMonthDate));

                if (newmonth != 0)
                {
                    studentCollection = studentCollection.Where(a => a.DateOfBirth.Month == newmonth);
                }

                string Studentname = getBirthDateRequest.StudentName.TrimStart();
                Studentname = Studentname.TrimEnd();

                string Classname = getBirthDateRequest.ClassesName.TrimStart();
                Classname = Classname.TrimEnd();
                IQueryable<Entity.Agency.Classes> classesCollection;
                IQueryable<Entity.Agency.ClassEnrollment> enrollementCollection;
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && Check.IsParent == true);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted);

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted);

                    enrollementCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID
                    && !Check.IsDeleted && Check.EnrollmentStatus == 2 && Check.ClassEnrollStartDate.Date <= DateTime.Now.Date
                    && Check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date);
                }
                else
                {
                    classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted
                    && Check.Id == getBirthDateRequest.ClassesIDReq);

                    enrollementCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID
                    && !Check.IsDeleted && Check.EnrollmentStatus == 2 && Check.ClassEnrollStartDate.Date <= DateTime.Now.Date
                    && Check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date && Check.ClassesID == getBirthDateRequest.ClassesIDReq);
                }

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    allBirthDateList = (from studentObj in studentCollection
                                        join enrollObj in enrollementCollection on studentObj.Id equals enrollObj.StudentID
                                        into enrollInfo
                                        from enrollInfoobj in enrollInfo.DefaultIfEmpty()

                                        join classObj in classesCollection on enrollInfoobj.ClassesID equals classObj.Id
                                        into classInfo
                                        from classInfoobj in classInfo.DefaultIfEmpty()

                                        where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(Studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = studentObj.AgencyID,
                                            StudentID = studentObj.Id,
                                            StudentName = studentObj.StudentName,
                                            StudentFirstName = studentObj.FirstName,
                                            StudentLastName = studentObj.LastName,
                                            DateofBirth = studentObj.DateOfBirth,
                                            Age = CalculateYourAge(studentObj.DateOfBirth),
                                            ClassesName = classInfoobj.ClassName
                                        }).OrderBy(c => c.StudentName).ToList();
                }

                else
                {
                    allBirthDateList = (from studentObj in enrollementCollection
                                        join enrollObj in studentCollection on studentObj.StudentID equals enrollObj.Id

                                        join classObj in classesCollection on studentObj.ClassesID equals classObj.Id

                                        where (isStudentNameEmpty || enrollObj.StudentName.ToUpper().Contains(Studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = studentObj.AgencyID,
                                            StudentID = studentObj.Id,
                                            StudentName = enrollObj.StudentName,
                                            StudentFirstName = enrollObj.FirstName,
                                            StudentLastName = enrollObj.LastName,
                                            DateofBirth = enrollObj.DateOfBirth,
                                            Age = CalculateYourAge(enrollObj.DateOfBirth),
                                            ClassesName = classObj.ClassName
                                        }).OrderBy(c => c.StudentName).ToList();

                }
                var result = allBirthDateList.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();

                foreach (var r in result)
                {
                    var clasess = allBirthDateList.Where(p => p.StudentID == r.StudentID).Select(p => p.ClassesName).ToArray();
                    r.ClassesName = string.Join(",", clasess);
                }

                if (getBirthDateRequest.limit != 0)
                {
                    res.Data = result.Skip((getBirthDateRequest.page) * getBirthDateRequest.limit).Take(getBirthDateRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Date of Birth list has been feteched";
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

        public ResponseViewModal GetStaffBirthDateReport(ReportViewModel getBirthDateRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getBirthDateRequest.TeacherName = (getBirthDateRequest.TeacherName ?? string.Empty).Trim().ToLower();
                var isTeacherNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getBirthDateRequest.FromDate;
                var toDate = getBirthDateRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                var fromMonthDate = fromDate.Month * 100 + fromDate.Day;
                var toMonthDate = toDate.Month * 100 + toDate.Day;

                long newmonth = getBirthDateRequest.month;
                if (newmonth != 0)
                {
                    newmonth = getBirthDateRequest.month;
                }
                else
                {
                    newmonth = 0;
                }

                List<ReportViewModel> allBirthDateList = new List<ReportViewModel>();

                IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && (fromMonthDate <= (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) && (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) <= toMonthDate));

                if (newmonth != 0)
                {
                    teacherCollection = teacherCollection.Where(a => a.DateOfBirth.Month == newmonth);
                }

                string Teachername = getBirthDateRequest.TeacherName.TrimStart();
                Teachername = Teachername.TrimEnd();

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    allBirthDateList = (from teacherObj in teacherCollection
                                        where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().Contains(Teachername.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = teacherObj.AgencyID,
                                            StudentID = teacherObj.Id,
                                            TeacherName = teacherObj.TeacherName,
                                            TeacherFirstName = teacherObj.FirstName,
                                            TeacherLastName = teacherObj.LastName,
                                            DateofBirth = teacherObj.DateOfBirth,
                                            Age = CalculateYourAge(teacherObj.DateOfBirth)
                                        }).OrderBy(c => c.TeacherName).ToList();
                }

                var result = allBirthDateList;


                if (getBirthDateRequest.limit != 0)
                {
                    res.Data = result.Skip((getBirthDateRequest.page) * getBirthDateRequest.limit).Take(getBirthDateRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Date of Birth list has been feteched";
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

        public ResponseViewModal GetClassAttendenceReport(ReportViewModel getClassAttendenceRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getClassAttendenceRequest.StudentName = (getClassAttendenceRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getClassAttendenceRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getClassAttendenceRequest.FromDate;
                var toDate = getClassAttendenceRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string Studentname = getClassAttendenceRequest.StudentName.TrimStart();
                Studentname = Studentname.TrimEnd();
                List<ReportViewModel> allClassAttendenceList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.ClassAttendence> attendenceCollection = _attendceRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && (fromDate.Date <= Check.AttendanceDate.Date && Check.AttendanceDate.Date <= toDate.Date) && !Check.IsDeleted);

                allClassAttendenceList = (from attendenceObj in attendenceCollection
                                          join studentObj in studentCollection on attendenceObj.StudentID equals studentObj.Id
                                          join classObj in classesCollection on attendenceObj.ClassesID equals classObj.Id
                                          where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(Studentname.ToUpper()))
                                          select new ReportViewModel
                                          {
                                              AgencyID = studentObj.AgencyID,
                                              StudentID = studentObj.Id,
                                              StudentName = studentObj.StudentName,
                                              StudentFirstName = studentObj.FirstName,
                                              StudentLastName = studentObj.LastName,
                                              ClassesName = classObj.ClassName,
                                              CheckInTime = attendenceObj.CheckInTime,
                                              CheckOutTime = attendenceObj.CheckOutTime,
                                              AttendenceStatus = attendenceObj.OnLeave,
                                              AttendanceDate = attendenceObj.AttendanceDate.Date
                                          }).OrderBy(c => c.StudentName).ToList();

                res.Data = allClassAttendenceList;
                if (getClassAttendenceRequest.limit != 0)
                {
                    res.Data = allClassAttendenceList.Skip((getClassAttendenceRequest.page) * getClassAttendenceRequest.limit).Take(getClassAttendenceRequest.limit).ToList();
                }

                res.TotalRows = allClassAttendenceList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Class Attendence list has been feteched";
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

        public ResponseViewModal GetChildEnrollmentReport(ReportViewModel getChildEnrollRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getChildEnrollRequest.StudentName = (getChildEnrollRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getChildEnrollRequest.StudentName);

                getChildEnrollRequest.ClassesName = (getChildEnrollRequest.ClassesName ?? string.Empty).Trim().ToLower();
                var isClassNameEmpty = string.IsNullOrEmpty(getChildEnrollRequest.ClassesName);


                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getChildEnrollRequest.FromDate;
                var toDate = getChildEnrollRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }


                List<ReportViewModel> allChidEnrollList = new List<ReportViewModel>();
                IQueryable<Entity.Agency.ClassEnrollment> classesEnrollemnt;
                if (getChildEnrollRequest.EnrollmentStatus == 10)
                {
                    classesEnrollemnt = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && (fromDate.Date <= Check.ClassEnrollStartDate && Check.ClassEnrollStartDate <= toDate.Date) && !Check.IsDeleted);
                }
                else
                {
                    classesEnrollemnt = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && (fromDate.Date <= Check.ClassEnrollStartDate && Check.ClassEnrollStartDate <= toDate.Date) && (Check.EnrollmentStatus == getChildEnrollRequest.EnrollmentStatus) && !Check.IsDeleted);
                }

                string Studentname = getChildEnrollRequest.StudentName.TrimStart();
                Studentname = Studentname.TrimEnd();
                string Classname = getChildEnrollRequest.ClassesName.TrimStart();
                Classname = Classname.TrimEnd();

                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted && Check.IsParent == true);

                allChidEnrollList = (from enrollObj in classesEnrollemnt
                                     join studentObj in studentCollection on enrollObj.StudentID equals studentObj.Id
                                     join mapObj in mappingCollection on studentObj.Id equals mapObj.StudentID
                                     join parentObj in parentCollection on mapObj.ParentID equals parentObj.Id
                                     join classObj in classesCollection on enrollObj.ClassesID equals classObj.Id
                                     where ((isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(Studentname.ToUpper())) && (isClassNameEmpty || classObj.ClassName.ToUpper().Contains(Classname.ToUpper())))
                                     select new ReportViewModel
                                     {
                                         AgencyID = studentObj.AgencyID,
                                         StudentID = studentObj.Id,
                                         StudentName = studentObj.StudentName,
                                         StudentFirstName = studentObj.FirstName,
                                         StudentLastName = studentObj.LastName,
                                         ParentContactNumber = parentObj.Mobile,
                                         ParentContactAddress = parentObj.Address,
                                         Physician = studentObj.PhysicianName,
                                         EnrollStartDate = enrollObj.ClassEnrollStartDate,
                                         EnrollEndDate = enrollObj.ClassEnrollStartDate,
                                         EnrollmentStatus = enrollObj.EnrollmentStatus,
                                         ClassesName = classObj.ClassName,
                                         DateofBirth = studentObj.DateOfBirth.Date,
                                         ParentName = parentObj.ParentName
                                     }).OrderBy(c => c.StudentName).ToList();

                res.Data = allChidEnrollList;
                if (getChildEnrollRequest.limit != 0)
                {
                    res.Data = allChidEnrollList.Skip((getChildEnrollRequest.page) * getChildEnrollRequest.limit).Take(getChildEnrollRequest.limit).ToList();
                }

                res.TotalRows = allChidEnrollList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";
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

        //public ResponseViewModal GetDuePaymentReport(ReportViewModel getDuePaymentRequest)
        //{
        //    ResponseViewModal res = new ResponseViewModal();
        //    try
        //    {
        //        getDuePaymentRequest.StudentName = (getDuePaymentRequest.StudentName ?? string.Empty).Trim().ToLower();
        //        var isStudentNameEmpty = string.IsNullOrEmpty(getDuePaymentRequest.StudentName);

        //        var maxDate = (DateTime)SqlDateTime.MaxValue;
        //        var minDate = (DateTime)SqlDateTime.MinValue;

        //        var fromDate = getDuePaymentRequest.FromDate;
        //        var toDate = getDuePaymentRequest.ToDate;

        //        if (!(minDate <= fromDate && fromDate <= maxDate))
        //        {
        //            fromDate = minDate;
        //        }

        //        if (!(minDate <= toDate && toDate <= maxDate))
        //        {
        //            toDate = maxDate;
        //        }

        //        string studentname = getDuePaymentRequest.StudentName.TrimStart();
        //        studentname = studentname.TrimEnd();
        //        List<ReportViewModel> allDuePaymentList = new List<ReportViewModel>();
        //        IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID && !Check.IsDeleted);
        //        IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID && !Check.IsDeleted);
        //        IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted && Check.IsInvoicePaid == false);

        //        allDuePaymentList = (from invoiceObj in invoiceCollection
        //                             join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
        //                             join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
        //                             where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
        //                             select new ReportViewModel
        //                             {
        //                                 AgencyID = studentObj.AgencyID,
        //                                 StudentID = studentObj.Id,
        //                                 StudentName = studentObj.StudentName,
        //                                 ParentName = parentObj.ParentName,
        //                                 InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate).Date,
        //                                 InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate).Date,
        //                                 Amount = invoiceObj.InvoiceAmount
        //                             }).OrderBy(c => c.StudentName).ToList();

        //        res.Data = allDuePaymentList;
        //        if (getDuePaymentRequest.limit != 0)
        //        {
        //            res.Data = allDuePaymentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
        //        }

        //        res.TotalRows = allDuePaymentList.Count();
        //        res.IsSuccess = true;
        //        res.StatusCode = (long)HttpStatusCodes.OK;
        //        res.Message = "Child Enrollment list has been feteched";
        //    }
        //    catch (Exception ex)
        //    {
        //        res.IsSuccess = false;
        //        res.StatusCode = 987;
        //        res.Message = "Something went wrong.";
        //        res.ReturnMessage.Add(ex.ToString());
        //    }
        //    return res;
        //}

        public async Task<ResponseViewModal> GetDuePaymentReport(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
            try
            {
                //========Claculate Debit Amount from PamentDetails Table =======//
                int aid = Convert.ToInt32(getLedgerReportRequest.AgencyID);
                string debitQuery = "parent_ledger_payment";
                DynamicParameters debitParameters = new DynamicParameters();
                debitParameters.Add("agencyid", aid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<ReportViewModel> ReportModel = await _baserepository.GetAsync<ReportViewModel>(debitQuery, debitParameters, CommandType.StoredProcedure);
                allLedgerList = ReportModel.ToList();

                //========Claculate Invoice Amount from InvoiceDetails Table =======//
                int pid = Convert.ToInt32(getLedgerReportRequest.AgencyID);
                string invoiceQuery = "parent_ledger_invoice";
                DynamicParameters invoiceParameters = new DynamicParameters();
                invoiceParameters.Add("parentid", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<AmountModel> AmountModel = await _baserepository.GetAsync<AmountModel>(invoiceQuery, invoiceParameters, CommandType.StoredProcedure);
                var InvoiceAmount = AmountModel.ToList();

                for (int i = 0; i < InvoiceAmount.Count; i++)
                {
                    allLedgerList[i].Amount = InvoiceAmount[i].Invoice_Amount;
                    allLedgerList[i].ParentName = InvoiceAmount[i].ParentName;
                    allLedgerList[i].ParentFirstName = InvoiceAmount[i].ParentFirstName;
                    allLedgerList[i].ParentLastName = InvoiceAmount[i].ParentLastName;
                    allLedgerList[i].BalanceAmount = InvoiceAmount[i].Invoice_Amount - allLedgerList[i].DebitAmount;
                }

                allLedgerList = allLedgerList.Where(x => x.BalanceAmount > 0).ToList();
                allLedgerList = allLedgerList.OrderBy(a => a.ParentName).ToList();
                res.Data = allLedgerList;
                if (getLedgerReportRequest.limit != 0)
                {
                    res.Data = allLedgerList.Skip((getLedgerReportRequest.page) * getLedgerReportRequest.limit).Take(getLedgerReportRequest.limit).ToList();
                }

                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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

        [Obsolete]
        public async Task<ResponseViewModal> PdfReportForDuePayment(ReportViewModel getDuePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allDuePaymentList = new List<ReportViewModel>();
            try
            {
                //========Claculate Debit Amount from PamentDetails Table =======//
                int aid = Convert.ToInt32(getDuePaymentRequest.AgencyID);
                string debitQuery = "parent_ledger_payment";
                DynamicParameters debitParameters = new DynamicParameters();
                debitParameters.Add("agencyid", aid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<ReportViewModel> ReportModel = await _baserepository.GetAsync<ReportViewModel>(debitQuery, debitParameters, CommandType.StoredProcedure);
                allDuePaymentList = ReportModel.ToList();

                //========Claculate Invoice Amount from InvoiceDetails Table =======//
                int pid = Convert.ToInt32(getDuePaymentRequest.AgencyID);
                string invoiceQuery = "parent_ledger_invoice";
                DynamicParameters invoiceParameters = new DynamicParameters();
                invoiceParameters.Add("parentid", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<AmountModel> AmountModel = await _baserepository.GetAsync<AmountModel>(invoiceQuery, invoiceParameters, CommandType.StoredProcedure);
                var InvoiceAmount = AmountModel.ToList();

                for (int i = 0; i < InvoiceAmount.Count; i++)
                {
                    allDuePaymentList[i].Amount = InvoiceAmount[i].Invoice_Amount;
                    allDuePaymentList[i].ParentName = InvoiceAmount[i].ParentName;
                    allDuePaymentList[i].ParentFirstName = InvoiceAmount[i].ParentFirstName;
                    allDuePaymentList[i].ParentLastName = InvoiceAmount[i].ParentLastName;
                    allDuePaymentList[i].BalanceAmount = InvoiceAmount[i].Invoice_Amount - allDuePaymentList[i].DebitAmount;
                }

                allDuePaymentList = allDuePaymentList.Where(x => x.BalanceAmount > 0).ToList();
                allDuePaymentList = allDuePaymentList.OrderBy(a => a.ParentName).ToList();
                res.Data = allDuePaymentList;
                if (getDuePaymentRequest.limit != 0)
                {
                    res.Data = allDuePaymentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
                }

                res.TotalRows = allDuePaymentList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";

                StringBuilder sb = new StringBuilder();
                if (allDuePaymentList != null & allDuePaymentList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Family Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Parent Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Amount</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allDuePaymentList)
                    {
                        sb.Append("<tr>");
                        if (item.ParentLastName != null)
                        {
                            sb.Append("<td>" + item.ParentLastName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.ParentName != null)
                        {
                            sb.Append("<td>" + item.ParentName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        if (item.BalanceAmount != 0)
                        {
                            sb.Append("<td>" + item.BalanceAmount.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }
                        sb.Append("</tr>");
                    }

                    sb.Append("</table>");
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);


                    #region Top table
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Due Payment", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }


                Guid guid = Guid.NewGuid();
                var downloadName = "DuePayment_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allDuePaymentList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";
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

        public ResponseViewModal PdfReportForBirthday(ReportViewModel getBirthDateRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getBirthDateRequest.StudentName = (getBirthDateRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.StudentName);

                getBirthDateRequest.ClassesName = (getBirthDateRequest.ClassesName ?? string.Empty).Trim().ToLower();
                var isClassNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.ClassesName);


                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getBirthDateRequest.FromDate;
                var toDate = getBirthDateRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                var fromMonthDate = fromDate.Month * 100 + fromDate.Day;
                var toMonthDate = toDate.Month * 100 + toDate.Day;



                long newmonth = getBirthDateRequest.month;
                if (newmonth != 0)
                {
                    newmonth = getBirthDateRequest.month;
                }
                else
                {
                    newmonth = 0;
                }

                List<ReportViewModel> allBirthDateList = new List<ReportViewModel>();

                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && (fromMonthDate <= (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) && (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) <= toMonthDate));

                if (newmonth != 0)
                {
                    studentCollection = studentCollection.Where(a => a.DateOfBirth.Month == newmonth);
                }

                string Studentname = getBirthDateRequest.StudentName.TrimStart();
                Studentname = Studentname.TrimEnd();

                string Classname = getBirthDateRequest.ClassesName.TrimStart();
                Classname = Classname.TrimEnd();
                IQueryable<Entity.Agency.Classes> classesCollection;
                IQueryable<Entity.Agency.ClassEnrollment> enrollementCollection;
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && Check.IsParent == true);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted);

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted);

                    enrollementCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID
                    && !Check.IsDeleted && Check.EnrollmentStatus == 2 && Check.ClassEnrollStartDate.Date <= DateTime.Now.Date
                    && Check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date);
                }
                else
                {
                    classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted
                    && Check.Id == getBirthDateRequest.ClassesIDReq);

                    enrollementCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID
                    && !Check.IsDeleted && Check.EnrollmentStatus == 2 && Check.ClassEnrollStartDate.Date <= DateTime.Now.Date
                    && Check.ClassEnrollEndDate.Value.Date >= DateTime.Now.Date && Check.ClassesID == getBirthDateRequest.ClassesIDReq);
                }

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    allBirthDateList = (from studentObj in studentCollection
                                        join enrollObj in enrollementCollection on studentObj.Id equals enrollObj.StudentID
                                        into enrollInfo
                                        from enrollInfoobj in enrollInfo.DefaultIfEmpty()

                                        join classObj in classesCollection on enrollInfoobj.ClassesID equals classObj.Id
                                        into classInfo
                                        from classInfoobj in classInfo.DefaultIfEmpty()

                                        where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(Studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = studentObj.AgencyID,
                                            StudentID = studentObj.Id,
                                            StudentName = studentObj.StudentName,
                                            StudentFirstName = studentObj.FirstName,
                                            StudentLastName = studentObj.LastName,
                                            DateofBirth = studentObj.DateOfBirth,
                                            Age = CalculateYourAge(studentObj.DateOfBirth),
                                            ClassesName = classInfoobj.ClassName
                                        }).OrderBy(c => c.StudentName).ToList();
                }

                else
                {
                    allBirthDateList = (from studentObj in enrollementCollection
                                        join enrollObj in studentCollection on studentObj.StudentID equals enrollObj.Id

                                        join classObj in classesCollection on studentObj.ClassesID equals classObj.Id

                                        where (isStudentNameEmpty || enrollObj.StudentName.ToUpper().Contains(Studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = studentObj.AgencyID,
                                            StudentID = studentObj.Id,
                                            StudentName = enrollObj.StudentName,
                                            StudentFirstName = enrollObj.FirstName,
                                            StudentLastName = enrollObj.LastName,
                                            DateofBirth = enrollObj.DateOfBirth,
                                            Age = CalculateYourAge(enrollObj.DateOfBirth),
                                            ClassesName = classObj.ClassName
                                        }).OrderBy(c => c.StudentName).ToList();

                }
                var result = allBirthDateList.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();

                foreach (var r in result)
                {
                    var clasess = allBirthDateList.Where(p => p.StudentID == r.StudentID).Select(p => p.ClassesName).ToArray();
                    r.ClassesName = string.Join(",", clasess);
                }

                if (getBirthDateRequest.limit != 0)
                {
                    res.Data = result.Skip((getBirthDateRequest.page) * getBirthDateRequest.limit).Take(getBirthDateRequest.limit).ToList();
                }
                StringBuilder sb = new StringBuilder();
                if (result != null & result.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Birthday Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Date of Birth(dd/MM/yyyy)</strong></th>");
                    sb.Append("<th><strong>Age</strong></th>");
                    sb.Append("<th><strong>Class</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in result)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.DateofBirth.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.Age.ToString() + "</td>");
                        if (item.ClassesName == "")
                        {
                            sb.Append("<td>" + "--" + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + item.ClassesName.ToString() + "</td>");
                        }

                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "Bday_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Date of Birth list has been feteched";
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

        [Obsolete]
        public ResponseViewModal PdfReportForStaffBirthday(ReportViewModel getBirthDateRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getBirthDateRequest.TeacherName = (getBirthDateRequest.TeacherName ?? string.Empty).Trim().ToLower();
                var isTeacherNameEmpty = string.IsNullOrEmpty(getBirthDateRequest.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getBirthDateRequest.FromDate;
                var toDate = getBirthDateRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                var fromMonthDate = fromDate.Month * 100 + fromDate.Day;
                var toMonthDate = toDate.Month * 100 + toDate.Day;

                long newmonth = getBirthDateRequest.month;
                if (newmonth != 0)
                {
                    newmonth = getBirthDateRequest.month;
                }
                else
                {
                    newmonth = 0;
                }

                List<ReportViewModel> allBirthDateList = new List<ReportViewModel>();

                IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherRepository.GetAll().Where(Check => Check.AgencyID == getBirthDateRequest.AgencyID && !Check.IsDeleted && (fromMonthDate <= (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) && (Check.DateOfBirth.Month * 100 + Check.DateOfBirth.Day) <= toMonthDate));

                if (newmonth != 0)
                {
                    teacherCollection = teacherCollection.Where(a => a.DateOfBirth.Month == newmonth);
                }

                string Teachername = getBirthDateRequest.TeacherName.TrimStart();
                Teachername = Teachername.TrimEnd();

                if (getBirthDateRequest.ClassesIDReq == null)
                {
                    allBirthDateList = (from teacherObj in teacherCollection
                                        where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().Contains(Teachername.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = teacherObj.AgencyID,
                                            StudentID = teacherObj.Id,
                                            TeacherName = teacherObj.TeacherName,
                                            TeacherFirstName = teacherObj.FirstName,
                                            TeacherLastName = teacherObj.LastName,
                                            DateofBirth = teacherObj.DateOfBirth,
                                            Age = CalculateYourAge(teacherObj.DateOfBirth)
                                        }).OrderBy(c => c.TeacherName).ToList();
                }

                var result = allBirthDateList.ToList();


                if (getBirthDateRequest.limit != 0)
                {
                    res.Data = result.Skip((getBirthDateRequest.page) * getBirthDateRequest.limit).Take(getBirthDateRequest.limit).ToList();
                }
                StringBuilder sb = new StringBuilder();
                if (result != null & result.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Teacher Name</strong></th>");
                    sb.Append("<th><strong>Date of Birth(dd/MM/yyyy)</strong></th>");
                    sb.Append("<th><strong>Age</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in result)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.TeacherName.ToString() + "</td>");
                        sb.Append("<td>" + item.DateofBirth.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.Age.ToString() + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    #region Top table
                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Staff Birthday", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "StaffBday_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Date of Birth list has been feteched";
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

        public ResponseViewModal PdfReportForClassAttendence(ReportViewModel getClassAttendenceRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getClassAttendenceRequest.FromDate;
                var toDate = getClassAttendenceRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                getClassAttendenceRequest.StudentName = (getClassAttendenceRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getClassAttendenceRequest.StudentName);

                string studentname = getClassAttendenceRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                List<ReportViewModel> allClassAttendenceList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.ClassAttendence> attendenceCollection = _attendceRepository.GetAll().Where(Check => Check.AgencyID == getClassAttendenceRequest.AgencyID && (fromDate.Date <= Check.AttendanceDate.Date && Check.AttendanceDate.Date <= toDate.Date) && !Check.IsDeleted);


                allClassAttendenceList = (from attendenceObj in attendenceCollection
                                          join studentObj in studentCollection on attendenceObj.StudentID equals studentObj.Id
                                          join classObj in classesCollection on attendenceObj.ClassesID equals classObj.Id
                                          where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                          select new ReportViewModel
                                          {
                                              AgencyID = studentObj.AgencyID,
                                              StudentID = studentObj.Id,
                                              StudentName = studentObj.StudentName,
                                              StudentFirstName = studentObj.FirstName,
                                              StudentLastName = studentObj.LastName,
                                              ClassesName = classObj.ClassName,
                                              CheckInTime = attendenceObj.CheckInTime,
                                              CheckOutTime = attendenceObj.CheckOutTime,
                                              AttendenceStatus = attendenceObj.OnLeave,
                                              AttendanceDate = attendenceObj.AttendanceDate
                                          }).OrderBy(c => c.StudentName).ToList();

                if (getClassAttendenceRequest.limit != 0)
                {
                    res.Data = allClassAttendenceList.Skip((getClassAttendenceRequest.page) * getClassAttendenceRequest.limit).Take(getClassAttendenceRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allClassAttendenceList != null & allClassAttendenceList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Class Attendance Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Class Name</strong></th>");
                    sb.Append("<th><strong>Attendance Date</strong></th>");
                    sb.Append("<th><strong>Check In Time</strong></th>");
                    sb.Append("<th><strong>Check Out Time</strong></th>");
                    sb.Append("<th><strong>Attendance Status</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allClassAttendenceList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ClassesName.ToString() + "</td>");
                        sb.Append("<td>" + item.AttendanceDate.Date.ToString("dd/MM/yyyy") + "</td>");

                        if (Convert.ToDateTime(item.CheckInTime) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.CheckInTime).ToString("hh:mm tt") + "</td>");
                        }
                        if (Convert.ToDateTime(item.CheckOutTime) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.CheckOutTime).ToString("hh:mm tt") + "</td>");
                        }
                        if (item.AttendenceStatus == true)
                        {
                            sb.Append("<td>" + "Absent" + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "Present" + "</td>");
                        }
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                //var tt = sb.ToString();

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();


                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }


                Guid guid = Guid.NewGuid();
                var downloadName = "ClassAttendence_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FileName = FileName;
                res.FilePath = filePath;
                res.TotalRows = allClassAttendenceList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Class Attendance list has been feteched";
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

        public ResponseViewModal PdfReportForChildEnrollment(ReportViewModel getChildEnrollRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getChildEnrollRequest.StudentName = (getChildEnrollRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getChildEnrollRequest.StudentName);

                getChildEnrollRequest.ClassesName = (getChildEnrollRequest.ClassesName ?? string.Empty).Trim().ToLower();
                var isClassNameEmpty = string.IsNullOrEmpty(getChildEnrollRequest.ClassesName);


                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getChildEnrollRequest.FromDate;
                var toDate = getChildEnrollRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                List<ReportViewModel> allChidEnrollList = new List<ReportViewModel>();
                IQueryable<Entity.Agency.ClassEnrollment> classesEnrollemnt;
                if (getChildEnrollRequest.EnrollmentStatus == 10)
                {
                    classesEnrollemnt = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && (fromDate.Date <= Check.ClassEnrollStartDate && Check.ClassEnrollStartDate <= toDate.Date) && !Check.IsDeleted);
                }
                else
                {
                    classesEnrollemnt = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && (fromDate.Date <= Check.ClassEnrollStartDate && Check.ClassEnrollStartDate <= toDate.Date) && (Check.EnrollmentStatus == getChildEnrollRequest.EnrollmentStatus) && !Check.IsDeleted);
                }

                string studentname = getChildEnrollRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                string classname = getChildEnrollRequest.ClassesName.TrimStart();
                classname = classname.TrimEnd();

                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getChildEnrollRequest.AgencyID && !Check.IsDeleted && Check.IsParent == true);

                allChidEnrollList = (from enrollObj in classesEnrollemnt
                                     join studentObj in studentCollection on enrollObj.StudentID equals studentObj.Id
                                     join mapObj in mappingCollection on studentObj.Id equals mapObj.StudentID
                                     join parentObj in parentCollection on mapObj.ParentID equals parentObj.Id
                                     join classObj in classesCollection on enrollObj.ClassesID equals classObj.Id
                                     where ((isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper())) && (isClassNameEmpty || classObj.ClassName.ToUpper().Contains(classname.ToUpper())))
                                     select new ReportViewModel
                                     {
                                         AgencyID = studentObj.AgencyID,
                                         StudentID = studentObj.Id,
                                         StudentName = studentObj.StudentName,
                                         StudentFirstName = studentObj.FirstName,
                                         StudentLastName = studentObj.LastName,
                                         ParentContactNumber = parentObj.Mobile,
                                         ParentContactAddress = parentObj.Address ?? "",
                                         Physician = studentObj.PhysicianName,
                                         EnrollStartDate = enrollObj.ClassEnrollStartDate,
                                         EnrollEndDate = enrollObj.ClassEnrollStartDate,
                                         EnrollmentStatus = enrollObj.EnrollmentStatus,
                                         ClassesName = classObj.ClassName,
                                         DateofBirth = studentObj.DateOfBirth.Date,
                                         ParentName = parentObj.ParentName
                                     }).OrderBy(c => c.StudentName).ToList();

                res.Data = allChidEnrollList;
                if (getChildEnrollRequest.limit != 0)
                {
                    res.Data = allChidEnrollList.Skip((getChildEnrollRequest.page) * getChildEnrollRequest.limit).Take(getChildEnrollRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allChidEnrollList != null & allChidEnrollList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Child Enrollement Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Parent Name</strong></th>");
                    sb.Append("<th><strong>Contact Name</strong></th>");
                    sb.Append("<th><strong>Contact Address</strong></th>");
                    sb.Append("<th><strong>Class Name</strong></th>");
                    sb.Append("<th><strong>Enrollement Start Date</strong></th>");
                    sb.Append("<th><strong>Enrollement End Date</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allChidEnrollList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentContactNumber.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentContactAddress.ToString() + "</td>");
                        sb.Append("<td>" + item.ClassesName.ToString() + "</td>");
                        sb.Append("<td>" + item.EnrollStartDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.EnrollEndDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }


                Guid guid = Guid.NewGuid();
                var downloadName = "ClassEnrollement_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allChidEnrollList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";
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

        public ResponseViewModal DeleteExistingFile(ReportViewModel getBirthDateRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getBirthDateRequest != null && !string.IsNullOrEmpty(getBirthDateRequest.FileName))
                {
                    string rootFolder = _hostingEnvironment.WebRootPath;
                    string htmlfilePath = rootFolder + getBirthDateRequest.FileName;
                    if (File.Exists(htmlfilePath))
                    {
                        File.Delete(htmlfilePath);
                        res.IsSuccess = true;
                        res.Message = "File Deleted Successfully";
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.Message = "File not found";
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

        public ResponseViewModal GetLedgerReport(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getLedgerReportRequest.StudentName = (getLedgerReportRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getLedgerReportRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getLedgerReportRequest.FromDate;
                var toDate = getLedgerReportRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                string studentname = getLedgerReportRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.PaymentFromDate && Check.PaymentFromDate <= toDate.Date) && !Check.IsDeleted);
                var totalAmount = invoiceCollection.Sum(a => a.InvoiceAmount);
                var paidAmount = payementCollection.Sum(b => b.TotalAmount);
                var balanceAmount = totalAmount - paidAmount;
                allLedgerList = (from invoiceObj in payementCollection
                                 join paymentPrimeObj in invoiceCollection on invoiceObj.InvoiceDetailsID equals paymentPrimeObj.Id
                                 into paymentObj
                                 from paymentPrimeObj in paymentObj.DefaultIfEmpty()
                                 join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
                                 join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
                                 where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                 select new ReportViewModel
                                 {
                                     AgencyID = studentObj.AgencyID,
                                     StudentID = studentObj.Id,
                                     StudentName = studentObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     InvoiceFromDate = Convert.ToDateTime(paymentPrimeObj.InvoiceFromDate).Date,
                                     InvoiceToDate = Convert.ToDateTime(paymentPrimeObj.InvoiceToDate).Date,
                                     Amount = (decimal?)(paymentPrimeObj.InvoiceAmount) ?? 0,
                                     PaidStatus = (bool?)paymentPrimeObj.IsInvoicePaid ?? false,
                                     PaymentDate = Convert.ToDateTime(invoiceObj.PaymentDate).Date,
                                     DebitAmount = invoiceObj.AmoutPaid,
                                     CreditAmount = invoiceObj.BalanceAmount,
                                 }).OrderBy(c => c.StudentName).ToList();

                res.Data = allLedgerList;
                if (getLedgerReportRequest.limit != 0)
                {
                    res.Data = allLedgerList.Skip((getLedgerReportRequest.page) * getLedgerReportRequest.limit).Take(getLedgerReportRequest.limit).ToList();
                }
                res.TotalRows = allLedgerList.Count();
                res.TotalInvoiceAmount = totalAmount;
                res.TotalPaidAmount = paidAmount;
                res.TotalBalanceAmount = balanceAmount;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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

        public ResponseViewModal GetKioskeDetails(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.StudentName = (getKioskeDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getKioskeDetailsRequest.FromDate;
                var toDate = getKioskeDetailsRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string studentname = getKioskeDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.KioskeStudentSignInDetails> kioskeDetailCollection = _kioskeStudentSignInDetails.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && (fromDate.Date <= Check.CreatedDate && Check.CreatedDate <= toDate.Date) && !Check.IsDeleted
                && !Check.IsBreakIn && !Check.IsBreakOut);
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
                                        }).OrderByDescending(c => c.ID).ToList();
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

        public ResponseViewModal GetKioskeIDDetails(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.ParentName = (getKioskeDetailsRequest.ParentName ?? string.Empty).Trim().ToLower();
                var isParentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.ParentName);

                string parentname = getKioskeDetailsRequest.ParentName.TrimStart();
                parentname = parentname.TrimEnd();

                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                List<ReportViewModel> allKioskeDetailsList1 = new List<ReportViewModel>();
                IQueryable<Entity.User.Users> usersCollection = _userRepository.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted && check.RoleId == 4);
                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPeople = _authorizedPersonDetails.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentsCollection = _parentRepository.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted);

                allKioskeDetailsList = (from userObj in usersCollection
                                        where (isParentNameEmpty || userObj.UserName.ToUpper().Contains(parentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = userObj.AgencyID,
                                            ParentFirstName = userObj.FirstName,
                                            ParentLastName = userObj.LastName,
                                            ParentName = userObj.UserName,
                                            QuickPin = userObj.QuickPin,
                                            ID = userObj.Id
                                        }).OrderBy(c => c.ParentLastName).ToList();

                allKioskeDetailsList1 = (from authObj in authorizedPeople
                                         join parObj in parentsCollection on authObj.ParentID equals parObj.Id
                                         where (isParentNameEmpty || authObj.AuthorizedPersonName.ToUpper().Contains(parentname.ToUpper()))
                                         select new ReportViewModel
                                         {
                                             AgencyID = authObj.AgencyID,
                                             ParentFirstName = authObj.AuthorizedPersonName,
                                             ParentLastName = parObj.LastName,
                                             ParentName = authObj.AuthorizedPersonName,
                                             QuickPin = authObj.QuickPin,
                                             ID = authObj.Id
                                         }).OrderBy(x => x.ParentLastName).GroupBy(x => x.QuickPin).Select(x => x.First()).ToList();
                allKioskeDetailsList.AddRange(allKioskeDetailsList1);

                var result = allKioskeDetailsList.OrderBy(x => x.ParentLastName);

                if (getKioskeDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((getKioskeDetailsRequest.page) * getKioskeDetailsRequest.limit).Take(getKioskeDetailsRequest.limit).ToList();
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

        [Obsolete]
        public ResponseViewModal PdfReportForKioskeIDDetails(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.ParentName = (getKioskeDetailsRequest.ParentName ?? string.Empty).Trim().ToLower();
                var isParentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.ParentName);

                string parentname = getKioskeDetailsRequest.ParentName.TrimStart();
                parentname = parentname.TrimEnd();

                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                List<ReportViewModel> allKioskeDetailsList1 = new List<ReportViewModel>();
                IQueryable<Entity.User.Users> usersCollection = _userRepository.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted && check.RoleId == 4);
                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPeople = _authorizedPersonDetails.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentsCollection = _parentRepository.GetAll().Where(check => check.AgencyID == getKioskeDetailsRequest.AgencyID && !check.IsDeleted);

                allKioskeDetailsList = (from userObj in usersCollection
                                        where (isParentNameEmpty || userObj.UserName.ToUpper().Contains(parentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = userObj.AgencyID,
                                            ParentFirstName = userObj.FirstName,
                                            ParentLastName = userObj.LastName,
                                            ParentName = userObj.UserName,
                                            QuickPin = userObj.QuickPin,
                                            ID = userObj.Id
                                        }).OrderBy(c => c.ParentLastName).ToList();

                allKioskeDetailsList1 = (from authObj in authorizedPeople
                                         join parObj in parentsCollection on authObj.ParentID equals parObj.Id
                                         where (isParentNameEmpty || authObj.AuthorizedPersonName.ToUpper().Contains(parentname.ToUpper()))
                                         select new ReportViewModel
                                         {
                                             AgencyID = authObj.AgencyID,
                                             ParentFirstName = authObj.AuthorizedPersonName,
                                             ParentLastName = parObj.LastName,
                                             ParentName = authObj.AuthorizedPersonName,
                                             QuickPin = authObj.QuickPin,
                                             ID = authObj.Id
                                         }).GroupBy(x => x.QuickPin).Select(x => x.First()).ToList();
                allKioskeDetailsList.AddRange(allKioskeDetailsList1);
                var result = allKioskeDetailsList.OrderBy(x => x.ParentLastName);

                if (getKioskeDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((getKioskeDetailsRequest.page) * getKioskeDetailsRequest.limit).Take(getKioskeDetailsRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (result != null & result.Count() > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Family Key</strong></th>");
                    sb.Append("<th><strong>Parent Name</strong></th>");
                    sb.Append("<th><strong>Quick Pin</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in result)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.ParentLastName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentName.ToString() + "</td>");
                        sb.Append("<td>" + item.QuickPin.ToString() + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    #region Top table
                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Kiosk ID", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "KioskID_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Date of Birth list has been feteched";
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

        public ResponseViewModal PdfReportForLedger(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getLedgerReportRequest.StudentName = (getLedgerReportRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getLedgerReportRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getLedgerReportRequest.FromDate;
                var toDate = getLedgerReportRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string studentname = getLedgerReportRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.PaymentFromDate && Check.PaymentFromDate <= toDate.Date) && !Check.IsDeleted);

                var totalAmount = invoiceCollection.Sum(a => a.InvoiceAmount);
                var paidAmount = payementCollection.Sum(b => b.TotalAmount);
                var balanceAmount = totalAmount - paidAmount;

                allLedgerList = (from invoiceObj in invoiceCollection
                                 join paymentPrimeObj in payementCollection
                                 on invoiceObj.Id equals paymentPrimeObj.InvoiceDetailsID
                                 into paymentObj
                                 from paymentPrimeObj in paymentObj.DefaultIfEmpty()

                                 join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
                                 join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
                                 where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                 select new ReportViewModel
                                 {
                                     AgencyID = studentObj.AgencyID,
                                     StudentID = studentObj.Id,
                                     StudentName = studentObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate).Date,
                                     InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate).Date,
                                     Amount = invoiceObj.InvoiceAmount,
                                     PaidStatus = invoiceObj.IsInvoicePaid,
                                     PaymentDate = Convert.ToDateTime(paymentPrimeObj.PaymentDate).Date
                                 }).OrderBy(c => c.StudentName).ToList();

                res.Data = allLedgerList;
                if (getLedgerReportRequest.limit != 0)
                {
                    res.Data = allLedgerList.Skip((getLedgerReportRequest.page) * getLedgerReportRequest.limit).Take(getLedgerReportRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allLedgerList != null & allLedgerList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Ledger Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Parent Name</strong></th>");
                    sb.Append("<th><strong>Invoice From Date</strong></th>");
                    sb.Append("<th><strong>Invoice To Date</strong></th>");
                    sb.Append("<th><strong>Amount</strong></th>");
                    sb.Append("<th><strong>Status</strong></th>");
                    sb.Append("<th><strong>Payment Date</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allLedgerList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentName.ToString() + "</td>");
                        sb.Append("<td>" + item.InvoiceFromDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.InvoiceToDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.Amount.ToString() + "</td>");
                        sb.Append("<td>" + item.PaidStatus.ToString() + "</td>");
                        sb.Append("<td>" + item.PaymentDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                //var tt = sb.ToString();

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "LedgerDetails_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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


        public ResponseViewModal PdfReportForKioskeDetails(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getKioskeDetailsRequest.StudentName = (getKioskeDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getKioskeDetailsRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getKioskeDetailsRequest.FromDate;
                var toDate = getKioskeDetailsRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string studentname = getKioskeDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allKioskeDetailsList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.KioskeStudentSignInDetails> kioskeDetailCollection = _kioskeStudentSignInDetails.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && (fromDate.Date <= Check.CreatedDate && Check.CreatedDate <= toDate.Date) && !Check.IsDeleted);
                allKioskeDetailsList = (from kiosObj in kioskeDetailCollection
                                        join studObj in studentCollection on kiosObj.StudentID equals studObj.Id
                                        where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                        select new ReportViewModel
                                        {
                                            AgencyID = kiosObj.AgencyID,
                                            StudentID = kiosObj.Id,
                                            StudentName = studObj.StudentName,
                                            CheckInTime = Convert.ToDateTime(kiosObj.DropInDateTime),
                                            CheckOutTime = Convert.ToDateTime(kiosObj.DropOutDateTime)
                                        }).OrderBy(c => c.StudentName).ToList();

                res.Data = allKioskeDetailsList;

                if (getKioskeDetailsRequest.limit != 0)
                {
                    res.Data = allKioskeDetailsList.Skip((getKioskeDetailsRequest.page) * getKioskeDetailsRequest.limit).Take(getKioskeDetailsRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allKioskeDetailsList != null & allKioskeDetailsList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Kioske Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Date(dd/mm/yyyy)</strong></th>");
                    sb.Append("<th><strong>CheckIn Time</strong></th>");
                    sb.Append("<th><strong>CheckOut Time</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allKioskeDetailsList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.CheckInTime.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.CheckInTime.ToString("hh:mm tt") + "</td>");
                        if (Convert.ToDateTime(item.CheckOutTime) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.CheckOutTime).ToString("hh:mm tt") + "</td>");
                        }

                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "KioskeDetails_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allKioskeDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Kioske Detials list has been feteched";
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


        public ResponseViewModal PdfReportForDropInCareStudentDetails(ReportViewModel getKioskeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> allDetailsList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getKioskeDetailsRequest.AgencyID && Check.Id == getKioskeDetailsRequest.StudentID && !Check.IsDeleted);

                var ParentId = (from stdObj in studentCollection
                                where stdObj.Id == getKioskeDetailsRequest.StudentID && stdObj.AgencyID == getKioskeDetailsRequest.AgencyID && stdObj.IsDeleted == false
                                select stdObj.ParentID).FirstOrDefault();

                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.Id == ParentId && Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Student.StudentAllergies> allergyDetails = _studentAllergiesRepository.GetAll().Where(Check => Check.StudentID == getKioskeDetailsRequest.StudentID && Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.AllergyType> allergyTypes = _allergyTypeRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyName> allergyNames = _allergyNameRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyReactionType> allergyReaction = _allergyReactionTypeRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.StudentID == getKioskeDetailsRequest.StudentID && Check.AgencyID == getKioskeDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();

                allDetailsList = (from StdObj in studentCollection
                                  join parentObj in parentCollection on StdObj.ParentID equals parentObj.Id
                                  where StdObj.Id == getKioskeDetailsRequest.StudentID && StdObj.IsDeleted == false
                                  select new ReportViewModel
                                  {
                                      AgencyID = StdObj.AgencyID,
                                      StudentID = StdObj.Id,
                                      StudentName = StdObj.StudentName,
                                      ParentContactNumber = parentObj.Mobile
                                  }).OrderBy(c => c.StudentName).ToList();

                foreach (var student in allDetailsList)
                {
                    IQueryable<Entity.Agency.KioskeStudentSignInDetails> getKioskeStudentSignInDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(Check => Check.StudentID == getKioskeDetailsRequest.StudentID && (Convert.ToDateTime(Check.DropInDateTime)).Date == DateTime.Now.Date);

                    var dropinDetails = (from kioskDetailsObj in getKioskeStudentSignInDetails
                                         where (Convert.ToDateTime(kioskDetailsObj.DropInDateTime.Value.Date)) == DateTime.Now.Date && kioskDetailsObj.StudentID == student.StudentID && kioskDetailsObj.IsDeleted == false
                                         select new ReportViewModel()
                                         {
                                             CheckInTime = Convert.ToDateTime(kioskDetailsObj.DropInDateTime)
                                         }).ToList();

                    if (dropinDetails.Count > 0)
                    {
                        student.CheckInTime = dropinDetails[0].CheckInTime;
                    }
                    else
                    {
                        // student.CheckInTime = null;
                    }

                    var aallergyDetails = (from allergyDetailsObj in allergyDetails
                                           join alleryTypeObj in allergyTypes on allergyDetailsObj.AllergyTypeID equals alleryTypeObj.Id
                                           join allergyNameObj in allergyNames on allergyDetailsObj.AllergyNameID equals allergyNameObj.Id
                                           join allergyReactionObj in allergyReaction on allergyDetailsObj.AllergyReactionTypeID equals allergyReactionObj.Id
                                           where allergyDetailsObj.StudentID == student.StudentID && allergyDetailsObj.IsDeleted == false
                                           select new ReportViewModel()
                                           {
                                               AllergyName = allergyNameObj.NameOfAllergy,
                                               Allergy = alleryTypeObj.AllergyTypeName,
                                               AllergyReaction = allergyReactionObj.AllergyReactionTypeName,
                                               AllergyTreatment = allergyDetailsObj.Treatment,
                                               AllergyFirstObservedDate = allergyDetailsObj.FirstAllergyObservation,
                                               AllergyLastObservedDate = allergyDetailsObj.LastAllergyObservation,
                                               AllergyComment = allergyDetailsObj.AllergyComment
                                           }).ToList();

                    if (aallergyDetails.Count > 0)
                    {
                        student.AllergyName = aallergyDetails[0].AllergyName;
                        student.Allergy = aallergyDetails[0].Allergy;
                        student.AllergyReaction = aallergyDetails[0].AllergyReaction;
                        student.AllergyTreatment = aallergyDetails[0].AllergyTreatment;
                        student.AllergyFirstObservedDate = aallergyDetails[0].AllergyFirstObservedDate;
                        student.AllergyLastObservedDate = aallergyDetails[0].AllergyLastObservedDate;
                        student.AllergyComment = aallergyDetails[0].AllergyComment;
                    }
                    else
                    {
                        student.AllergyName = null;
                        student.Allergy = null;
                        student.AllergyReaction = null;
                        student.AllergyTreatment = null;
                        student.AllergyFirstObservedDate = null;
                        student.AllergyLastObservedDate = null;
                        student.AllergyComment = null;
                    }

                    var allMedicationList = (from medicationObj in medicationCollection
                                             join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id
                                             where medicationObj.StudentID == student.StudentID && medicationObj.IsDeleted == false
                                             select new ReportViewModel
                                             {
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
                        student.MedicationName = allMedicationList[0].MedicationName;
                        student.Units = allMedicationList[0].Units;
                        student.Strength = allMedicationList[0].Strength;
                        student.HowToTake = allMedicationList[0].HowToTake;
                        student.MedStartDate = allMedicationList[0].MedStartDate;
                        student.MedEndDate = allMedicationList[0].MedEndDate;
                        student.OtherMedication = allMedicationList[0].OtherMedication;
                        student.MedQuantity = allMedicationList[0].MedQuantity;
                    }
                    else
                    {
                        student.MedicationName = null;
                        student.Units = 0;
                        student.Strength = null;
                        student.HowToTake = null;
                        student.OtherMedication = null;
                        student.MedQuantity = 0;
                    }
                }

                res.Data = allDetailsList;

                if (getKioskeDetailsRequest.limit != 0)
                {
                    res.Data = allDetailsList.Skip((getKioskeDetailsRequest.page) * getKioskeDetailsRequest.limit).Take(getKioskeDetailsRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allDetailsList != null & allDetailsList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Family Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1' style='border-radius:10px;'>");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("</tr>");
                    sb.Append("<tr>");
                    sb.Append("<td>");
                    sb.Append("<div>");
                    sb.Append("<div style='margin-bottom:2px;border-style:solid;border-color:red;'>");
                    sb.Append("<b>");
                    sb.Append("Student Name");
                    sb.Append("</b>");
                    sb.Append("&nbsp;");
                    sb.Append(":" + allDetailsList[0].StudentName.ToString());
                    sb.Append("</div>");
                    sb.Append("</div>");
                    sb.Append("</td>");
                    sb.Append("</tr>");
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;

                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "StudentDetails_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = " Student Details list has been feteched";
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

        public ResponseViewModal GetFamilyDetailsReport(ReportViewModel getFamilyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getFamilyDetailsRequest.StudentName = (getFamilyDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getFamilyDetailsRequest.StudentName);

                string studentname = getFamilyDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allFamilyList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.ClassEnrollment> enrollmentCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);

                allFamilyList = (from studObj in studentCollection
                                 join mapObj in mappingCollection on studObj.Id equals mapObj.StudentID
                                 join parentObj in parentCollection on mapObj.ParentID equals parentObj.Id
                                 where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                 select new ReportViewModel
                                 {
                                     StudentName = studObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     ParentEmail = parentObj.EmailId,
                                     ParentContactNumber = parentObj.Mobile,
                                     Physician = studObj.PhysicianName ?? "",
                                     PhysicianNumber = studObj.PhysicianContactNumber,
                                     DateofBirth = studObj.DateOfBirth,
                                     isAuthorisedToPickup = parentObj.IsAuthorizedToPickup,
                                     StudentID = studObj.Id,
                                     ParentID = mapObj.ParentID
                                 }).ToList();

                res.Data = allFamilyList;

                if (getFamilyDetailsRequest.limit != 0)
                {
                    res.Data = allFamilyList.Skip((getFamilyDetailsRequest.page) * getFamilyDetailsRequest.limit).Take(getFamilyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allFamilyList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Family Details list has been feteched";
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

        public ResponseViewModal PdfReportForFamily(ReportViewModel getFamilyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getFamilyDetailsRequest.StudentName = (getFamilyDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getFamilyDetailsRequest.StudentName);

                string studentname = getFamilyDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allFamilyList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.ClassEnrollment> enrollmentCollection = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> classesCollection = _classesRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);

                allFamilyList = (from studObj in studentCollection
                                 join mapObj in mappingCollection on studObj.Id equals mapObj.StudentID
                                 join parentObj in parentCollection on mapObj.ParentID equals parentObj.Id
                                 where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                 select new ReportViewModel
                                 {
                                     StudentName = studObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     ParentEmail = parentObj.EmailId,
                                     ParentContactNumber = parentObj.Mobile,
                                     Physician = studObj.PhysicianName,
                                     PhysicianNumber = studObj.PhysicianContactNumber,
                                     DateofBirth = studObj.DateOfBirth,
                                     isAuthorisedToPickup = parentObj.IsAuthorizedToPickup,
                                     StudentID = studObj.Id
                                 }).ToList();

                res.Data = allFamilyList;

                if (getFamilyDetailsRequest.limit != 0)
                {
                    res.Data = allFamilyList.Skip((getFamilyDetailsRequest.page) * getFamilyDetailsRequest.limit).Take(getFamilyDetailsRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allFamilyList != null & allFamilyList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Family Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Parent Name</strong></th>");
                    sb.Append("<th><strong>Parent Email</strong></th>");
                    sb.Append("<th><strong>Parent Contact</strong></th>");
                    sb.Append("<th><strong>Physician Name</strong></th>");
                    sb.Append("<th><strong>Physician Number</strong></th>");
                    sb.Append("<th><strong>Date of Birth</strong></th>");
                    sb.Append("<th><strong>Authorised to Pickup</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allFamilyList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentName.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentEmail.ToString() + "</td>");
                        sb.Append("<td>" + item.ParentContactNumber.ToString() + "</td>");
                        if (item.Physician != null)
                        {
                            sb.Append("<td>" + item.Physician.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "Not Avialable" + "</td>");
                        }
                        if (item.PhysicianNumber != 0)
                        {
                            sb.Append("<td>" + item.PhysicianNumber.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "Not Avialable" + "</td>");
                        }
                        sb.Append("<td>" + item.DateofBirth.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.isAuthorisedToPickup.ToString() + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "FamilyDetails_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allFamilyList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Family Detials list has been feteched";
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


        public ResponseViewModal GetMedicationReport(ReportViewModel getMedicationDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();

            try
            {
                getMedicationDetailsRequest.StudentName = (getMedicationDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getMedicationDetailsRequest.StudentName);

                string StudentName = getMedicationDetailsRequest.StudentName.TrimStart();
                StudentName = StudentName.TrimEnd();
                List<ReportViewModel> allMedicationList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getMedicationDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.AgencyID == getMedicationDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();

                allMedicationList = (from studObj in studentCollection
                                     join medicationObj in medicationCollection on studObj.Id equals medicationObj.StudentID
                                     join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id
                                     where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(StudentName.ToUpper()))
                                     select new ReportViewModel
                                     {
                                         StudentName = studObj.StudentName,
                                         StudentID = studObj.Id,
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
                res.Data = allMedicationList;
                if (getMedicationDetailsRequest.limit != 0)
                {
                    res.Data = allMedicationList.Skip((getMedicationDetailsRequest.page) * getMedicationDetailsRequest.limit).Take(getMedicationDetailsRequest.limit).ToList();
                }
                res.TotalRows = allMedicationList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Medication Details list has been feteched";
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


        public ResponseViewModal PdfMedicationReport(ReportViewModel getMedicationDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getMedicationDetailsRequest.StudentName = (getMedicationDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getMedicationDetailsRequest.StudentName);
                string studentname = getMedicationDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> allMedicationList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getMedicationDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.AgencyID == getMedicationDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();

                allMedicationList = (from studObj in studentCollection
                                     join medicationObj in medicationCollection on studObj.Id equals medicationObj.StudentID
                                     join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id
                                     where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                     select new ReportViewModel
                                     {
                                         StudentName = studObj.StudentName,
                                         StudentID = studObj.Id,
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
                res.Data = allMedicationList;
                if (getMedicationDetailsRequest.limit != 0)
                {
                    res.Data = allMedicationList.Skip((getMedicationDetailsRequest.page) * getMedicationDetailsRequest.limit).Take(getMedicationDetailsRequest.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (allMedicationList != null & allMedicationList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Medication Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Medication Name</strong></th>");
                    sb.Append("<th><strong>Units</strong></th>");
                    sb.Append("<th><strong>Strength</strong></th>");
                    sb.Append("<th><strong>How to Take</strong></th>");
                    sb.Append("<th><strong>Start Date</strong></th>");
                    sb.Append("<th><strong>End Date</strong></th>");
                    sb.Append("<th><strong>Other Medication</strong></th>");
                    sb.Append("<th><strong>Dose Repeat</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allMedicationList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.MedicationName.ToString() + "</td>");
                        sb.Append("<td>" + item.Units.ToString() + "</td>");
                        sb.Append("<td>" + item.Strength.ToString() + "</td>");
                        sb.Append("<td>" + item.HowToTake.ToString() + "</td>");
                        sb.Append("<td>" + item.MedStartDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.MedEndDate.Date.ToString("dd/MM/yyyy") + "</td>");
                        sb.Append("<td>" + item.OtherMedication.ToString() + "</td>");
                        sb.Append("<td>" + item.DoseRepeat.ToString() + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "Medication_report_" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allMedicationList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Medication Detials list has been feteched";
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

        public ResponseViewModal GetAllergyReport(ReportViewModel getAllergyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getAllergyDetailsRequest.StudentName = (getAllergyDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getAllergyDetailsRequest.StudentName);

                string studentname = getAllergyDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                List<ReportViewModel> allergyDetailsList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getAllergyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentAllergies> allergyDetails = _studentAllergiesRepository.GetAll().Where(Check => Check.AgencyID == getAllergyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.AllergyType> allergyTypes = _allergyTypeRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyName> allergyNames = _allergyNameRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyReactionType> allergyReaction = _allergyReactionTypeRepository.GetAll(check => !check.IsDeleted);

                allergyDetailsList = (from studObj in studentCollection
                                      join allergyDetailsObj in allergyDetails on studObj.Id equals allergyDetailsObj.StudentID
                                      join alleryTypeObj in allergyTypes on allergyDetailsObj.AllergyTypeID equals alleryTypeObj.Id
                                      join allergyNameObj in allergyNames on allergyDetailsObj.AllergyNameID equals allergyNameObj.Id
                                      join allergyReactionObj in allergyReaction on allergyDetailsObj.AllergyReactionTypeID equals allergyReactionObj.Id
                                      where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                      select new ReportViewModel
                                      {
                                          StudentName = studObj.StudentName,
                                          StudentID = studObj.Id,
                                          AllergyName = allergyNameObj.NameOfAllergy,
                                          Allergy = alleryTypeObj.AllergyTypeName,
                                          AllergyReaction = allergyReactionObj.AllergyReactionTypeName,
                                          AllergyTreatment = allergyDetailsObj.Treatment,
                                          AllergyFirstObservedDate = allergyDetailsObj.FirstAllergyObservation,
                                          AllergyLastObservedDate = allergyDetailsObj.LastAllergyObservation,
                                          AllergyComment = allergyDetailsObj.AllergyComment
                                      }).ToList();
                res.Data = allergyDetailsList;
                if (getAllergyDetailsRequest.limit != 0)
                {
                    res.Data = allergyDetailsList.Skip((getAllergyDetailsRequest.page) * getAllergyDetailsRequest.limit).Take(getAllergyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allergyDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Medication Details list has been feteched";
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


        public ResponseViewModal PdfAllergyReport(ReportViewModel getAllergyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getAllergyDetailsRequest.StudentName = (getAllergyDetailsRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getAllergyDetailsRequest.StudentName);
                string studentname = getAllergyDetailsRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                List<ReportViewModel> allergyDetailsList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getAllergyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentAllergies> allergyDetails = _studentAllergiesRepository.GetAll().Where(Check => Check.AgencyID == getAllergyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.AllergyType> allergyTypes = _allergyTypeRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyName> allergyNames = _allergyNameRepository.GetAll(check => !check.IsDeleted);
                IQueryable<Entity.Masters.AllergyReactionType> allergyReaction = _allergyReactionTypeRepository.GetAll(check => !check.IsDeleted);

                allergyDetailsList = (from studObj in studentCollection
                                      join allergyDetailsObj in allergyDetails on studObj.Id equals allergyDetailsObj.StudentID
                                      join alleryTypeObj in allergyTypes on allergyDetailsObj.AllergyTypeID equals alleryTypeObj.Id
                                      join allergyNameObj in allergyNames on allergyDetailsObj.AllergyNameID equals allergyNameObj.Id
                                      join allergyReactionObj in allergyReaction on allergyDetailsObj.AllergyReactionTypeID equals allergyReactionObj.Id
                                      where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                      select new ReportViewModel
                                      {
                                          StudentName = studObj.StudentName,
                                          StudentID = studObj.Id,
                                          AllergyName = allergyNameObj.NameOfAllergy,
                                          Allergy = alleryTypeObj.AllergyTypeName,
                                          AllergyReaction = allergyReactionObj.AllergyReactionTypeName,
                                          AllergyTreatment = allergyDetailsObj.Treatment,
                                          AllergyFirstObservedDate = allergyDetailsObj.FirstAllergyObservation,
                                          AllergyLastObservedDate = allergyDetailsObj.LastAllergyObservation,
                                          AllergyComment = allergyDetailsObj.AllergyComment
                                      }).ToList();
                res.Data = allergyDetailsList;
                if (getAllergyDetailsRequest.limit != 0)
                {
                    res.Data = allergyDetailsList.Skip((getAllergyDetailsRequest.page) * getAllergyDetailsRequest.limit).Take(getAllergyDetailsRequest.limit).ToList();
                }
                StringBuilder sb = new StringBuilder();
                if (allergyDetailsList != null & allergyDetailsList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Allergy Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Allergy</strong></th>");
                    sb.Append("<th><strong>Allergy Name</strong></th>");
                    sb.Append("<th><strong>Allergy Reaction</strong></th>");
                    sb.Append("<th><strong>Allergy Treatment</strong></th>");
                    sb.Append("<th><strong>First Observed Date</strong></th>");
                    sb.Append("<th><strong>Last Observed Date</strong></th>");
                    sb.Append("<th><strong>Comment</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allergyDetailsList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.Allergy.ToString() + "</td>");
                        sb.Append("<td>" + item.AllergyName.ToString() + "</td>");
                        sb.Append("<td>" + item.AllergyReaction.ToString() + "</td>");
                        sb.Append("<td>" + item.AllergyTreatment.ToString() + "</td>");
                        if (Convert.ToDateTime(item.AllergyFirstObservedDate) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.AllergyFirstObservedDate).Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        if (Convert.ToDateTime(item.AllergyLastObservedDate) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.AllergyLastObservedDate).Date.ToString("dd/MM/yyyy") + "</td>");
                        }

                        sb.Append("<td>" + item.AllergyComment.ToString() + "</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "Medication_report_" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allergyDetailsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Medication Detials list has been feteched";
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


        public ResponseViewModal GetGivenMedicationReport(ReportViewModel getGiventMedicationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getGiventMedicationRequest.StudentName = (getGiventMedicationRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getGiventMedicationRequest.StudentName);

                string studentname = getGiventMedicationRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> GivenMedicationList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentActivityMedication> studentActivityMedication = _studentActivityMedicationRepository.GetAll(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();
                IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.AgencyID == getGiventMedicationRequest.AgencyID);

                GivenMedicationList = (from studObj in studentCollection
                                       join medicationObj in medicationCollection on studObj.Id equals medicationObj.StudentID
                                       join activityMedObj in studentActivityMedication on medicationObj.Id equals activityMedObj.StudentMedicationID
                                       join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id

                                       join selectedParentUsersPrimObj in selectedUser
                                       on activityMedObj.AcknowledgeParentID equals selectedParentUsersPrimObj.Id
                                       into parentUsersObj
                                       from selectedParentUsersPrimObj in parentUsersObj.DefaultIfEmpty()

                                       join selectedTeacherPrimObj in selectedUser
                                       on activityMedObj.AcknowledgeTeacherID equals selectedTeacherPrimObj.Id
                                       into teacherUserObj
                                       from selectedTeacherPrimObj in teacherUserObj.DefaultIfEmpty()

                                       where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                       select new ReportViewModel
                                       {
                                           StudentName = studObj.StudentName,
                                           StudentID = studObj.Id,
                                           MedicationName = medicationObj.MedicationName,
                                           MedicationGivenDate = Convert.ToDateTime(activityMedObj.CreatedDate),
                                           AcknowledgeByFromAgency = selectedTeacherPrimObj.UserName,
                                           AcknowledgeByParent = selectedParentUsersPrimObj.UserName,
                                           IsAcknowledgeByParent = activityMedObj.isParentAcknowledge,
                                           IsAcknowledgeByAgencyStaff = activityMedObj.isTeacherAcknowledge
                                       }).OrderByDescending(x => x.MedicationGivenDate).ToList();
                res.Data = GivenMedicationList;
                if (getGiventMedicationRequest.limit != 0)
                {
                    res.Data = GivenMedicationList.Skip((getGiventMedicationRequest.page) * getGiventMedicationRequest.limit).Take(getGiventMedicationRequest.limit).ToList();
                }
                res.TotalRows = GivenMedicationList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Given Medication Details list has been feteched";
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


        public ResponseViewModal PdfGivenMedicationList(ReportViewModel getGiventMedicationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getGiventMedicationRequest.StudentName = (getGiventMedicationRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getGiventMedicationRequest.StudentName);

                string studentname = getGiventMedicationRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();

                List<ReportViewModel> GivenMedicationList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentActivityMedication> studentActivityMedication = _studentActivityMedicationRepository.GetAll(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.StudentMedication> medicationCollection = _studentMedicationRepository.GetAll().Where(Check => Check.AgencyID == getGiventMedicationRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.DoseRepeat> doseCollection = _doseRepeatRepository.GetAll();
                IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.AgencyID == getGiventMedicationRequest.AgencyID);

                GivenMedicationList = (from studObj in studentCollection
                                       join medicationObj in medicationCollection on studObj.Id equals medicationObj.StudentID
                                       join activityMedObj in studentActivityMedication on medicationObj.Id equals activityMedObj.StudentMedicationID
                                       join doseObj in doseCollection on medicationObj.DoseRepeatID equals doseObj.Id


                                       join selectedParentUsersPrimObj in selectedUser
                                       on activityMedObj.AcknowledgeParentID equals selectedParentUsersPrimObj.Id
                                       into parentUsersObj
                                       from selectedParentUsersPrimObj in parentUsersObj.DefaultIfEmpty()

                                       join selectedTeacherPrimObj in selectedUser
                                       on activityMedObj.AcknowledgeTeacherID equals selectedTeacherPrimObj.Id
                                       into teacherUserObj
                                       from selectedTeacherPrimObj in teacherUserObj.DefaultIfEmpty()

                                       where (isStudentNameEmpty || studObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                       select new ReportViewModel
                                       {
                                           StudentName = studObj.StudentName,
                                           StudentID = studObj.Id,
                                           MedicationName = medicationObj.MedicationName,
                                           MedicationGivenDate = Convert.ToDateTime(activityMedObj.CreatedDate),
                                           AcknowledgeByFromAgency = selectedTeacherPrimObj.UserName,
                                           AcknowledgeByParent = selectedParentUsersPrimObj.UserName,
                                           IsAcknowledgeByParent = activityMedObj.isParentAcknowledge,
                                           IsAcknowledgeByAgencyStaff = activityMedObj.isTeacherAcknowledge
                                       }).OrderByDescending(x => x.MedicationGivenDate).ToList();
                res.Data = GivenMedicationList;
                if (getGiventMedicationRequest.limit != 0)
                {
                    res.Data = GivenMedicationList.Skip((getGiventMedicationRequest.page) * getGiventMedicationRequest.limit).Take(getGiventMedicationRequest.limit).ToList();
                }
                StringBuilder sb = new StringBuilder();
                if (GivenMedicationList != null & GivenMedicationList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Allergy Details Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Student Name</strong></th>");
                    sb.Append("<th><strong>Medicine Name </strong></th>");
                    sb.Append("<th><strong>Medicine Given Date</strong></th>");
                    sb.Append("<th><strong>Acknowledge By(Teacher or Admin)</strong></th>");
                    sb.Append("<th><strong>Acknowledge By Parent</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in GivenMedicationList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                        sb.Append("<td>" + item.MedicationName.ToString() + "</td>");
                        sb.Append("<td>" + item.MedicationGivenDate.Date.ToString("dd/MM/yyyy") + "</td>");

                        if (item.AcknowledgeByFromAgency != null || !string.IsNullOrEmpty(item.AcknowledgeByFromAgency))
                        {
                            sb.Append("<td>" + item.AcknowledgeByFromAgency.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + " " + "</td>");
                        }
                        if (item.AcknowledgeByParent != null || !string.IsNullOrEmpty(item.AcknowledgeByParent))
                        {
                            sb.Append("<td>" + item.AcknowledgeByParent.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + " " + "</td>");
                        }
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "Medication_report_" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = GivenMedicationList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Given Medication Detials list has been feteched";
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


        public ResponseViewModal TeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getTeacherAttendReport.TeacherName = (getTeacherAttendReport.TeacherName ?? string.Empty).Trim().ToLower();
                var isTeacherNameEmpty = string.IsNullOrEmpty(getTeacherAttendReport.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getTeacherAttendReport.FromDate;
                var toDate = getTeacherAttendReport.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string TeacherName = getTeacherAttendReport.TeacherName.TrimStart();
                TeacherName = TeacherName.TrimEnd();

                List<ReportViewModel> ClassAttendenceReportList = new List<ReportViewModel>();
                IQueryable<Entity.Teachers.TeacherDailyAttendence> attendenceCollection = _teacherDailyAttendenceRepository.GetAll().Where(Check => Check.AgencyID == getTeacherAttendReport.AgencyID && (fromDate.Date <= Convert.ToDateTime(Check.ClockIn.Date) && Convert.ToDateTime(Check.ClockIn.Date) <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == getTeacherAttendReport.AgencyID && !Check.IsDeleted);
                ClassAttendenceReportList = (from attendenceObj in attendenceCollection
                                             join teacherObj in teacherCollection on attendenceObj.TeacherID equals teacherObj.Id
                                             orderby attendenceObj.Id descending
                                             where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().Contains(TeacherName.ToUpper()))
                                             select new ReportViewModel
                                             {
                                                 ID = attendenceObj.Id,
                                                 TeacherID = teacherObj.Id,
                                                 TeacherName = teacherObj.TeacherName,
                                                 TeacherClockIN = attendenceObj.ClockIn,
                                                 TeacherClockOut = attendenceObj.ClockOut
                                             }).OrderByDescending(x => x.TeacherClockIN).ToList();

                res.Data = ClassAttendenceReportList;
                if (getTeacherAttendReport.limit != 0)
                {
                    res.Data = ClassAttendenceReportList.Skip((getTeacherAttendReport.page) * getTeacherAttendReport.limit).Take(getTeacherAttendReport.limit).ToList();
                }
                res.TotalRows = ClassAttendenceReportList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Staff Details list has been feteched";
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


        public ResponseViewModal PDFTeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getTeacherAttendReport.TeacherName = (getTeacherAttendReport.TeacherName ?? string.Empty).Trim().ToLower();
                var isTeacherNameEmpty = string.IsNullOrEmpty(getTeacherAttendReport.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getTeacherAttendReport.FromDate;
                var toDate = getTeacherAttendReport.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string TeacherName = getTeacherAttendReport.TeacherName.TrimStart();
                TeacherName = TeacherName.TrimEnd();

                List<ReportViewModel> ClassAttendenceReportList = new List<ReportViewModel>();
                IQueryable<Entity.Teachers.TeacherDailyAttendence> attendenceCollection = _teacherDailyAttendenceRepository.GetAll().Where(Check => Check.AgencyID == getTeacherAttendReport.AgencyID && (fromDate.Date <= Convert.ToDateTime(Check.ClockIn.Date) && Convert.ToDateTime(Check.ClockIn.Date) <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Teachers.TeacherInfo> teacherCollection = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == getTeacherAttendReport.AgencyID && !Check.IsDeleted);
                ClassAttendenceReportList = (from attendenceObj in attendenceCollection
                                             join teacherObj in teacherCollection on attendenceObj.TeacherID equals teacherObj.Id
                                             where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().Contains(TeacherName.ToUpper()))
                                             select new ReportViewModel
                                             {
                                                 TeacherID = teacherObj.Id,
                                                 TeacherName = teacherObj.TeacherName,
                                                 TeacherClockIN = attendenceObj.ClockIn,
                                                 TeacherClockOut = attendenceObj.ClockOut
                                             }).OrderByDescending(x => x.TeacherClockIN).ToList();

                res.Data = ClassAttendenceReportList;
                if (getTeacherAttendReport.limit != 0)
                {
                    res.Data = ClassAttendenceReportList.Skip((getTeacherAttendReport.page) * getTeacherAttendReport.limit).Take(getTeacherAttendReport.limit).ToList();
                }

                StringBuilder sb = new StringBuilder();
                if (ClassAttendenceReportList != null & ClassAttendenceReportList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Teacher Attendance Report</h1>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Teacher Name</strong></th>");
                    sb.Append("<th><strong>ClockIn Date </strong></th>");
                    sb.Append("<th><strong>ClockOut Date</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in ClassAttendenceReportList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.TeacherName.ToString() + "</td>");
                        if (Convert.ToDateTime(item.TeacherClockIN) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.TeacherClockIN).Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        if (Convert.ToDateTime(item.TeacherClockOut) == DateTime.MinValue)
                        {
                            sb.Append("<td>" + " -- " + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + Convert.ToDateTime(item.TeacherClockOut).Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "Medication_report_" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;

                res.TotalRows = ClassAttendenceReportList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Staff Details list has been feteched";
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


        public ResponseViewModal AccountPaymentLedgerReport(ReportViewModel getAccountReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> AccountList = new List<ReportViewModel>();
                IQueryable<Entity.Agency.InvoiceDetails> InvoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> ParentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> paymentCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                AccountList = (from accountObj in paymentCollection
                               join parentprimeobj in ParentCollection on accountObj.ParentID equals parentprimeobj.Id
                               into parentobj
                               from parentprimeobj in parentobj.DefaultIfEmpty()

                               join invoiceprimeobj in InvoiceCollection
                               on accountObj.InvoiceDetailsID equals invoiceprimeobj.Id
                               into invoiceobj
                               from invoiceprimeobj in invoiceobj.DefaultIfEmpty()
                               select new ReportViewModel
                               {
                                   InvoiceNumber = invoiceprimeobj.InvoiceNo,
                                   CustomerName = parentprimeobj.ParentName,
                                   DebitAmount = accountObj.AmoutPaid,
                                   CreditAmount = accountObj.BalanceAmount
                               }).ToList();

                res.Data = AccountList;

                if (getAccountReport.limit != 0)
                {
                    res.Data = AccountList.Skip((getAccountReport.page) * getAccountReport.limit).Take(getAccountReport.limit).ToList();
                }
                res.TotalRows = AccountList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Account Details list has been feteched";
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


        public ResponseViewModal AccountLedgerReport(ReportViewModel getAccountReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> AccountList = new List<ReportViewModel>();
                IQueryable<Entity.Masters.AccountLedger> accountCollection = _accountLedgerRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.TransactionMaster> transMasterCollection = _transactionMasterRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.TransactionType> transTypeCollection = _transactionTypeRepository.GetAll();
                IQueryable<Entity.Agency.InvoiceDetails> InvoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> ParentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> paymentCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getAccountReport.AgencyID && !Check.IsDeleted);

                AccountList = (from accountObj in accountCollection
                               join paymentObj in paymentCollection on accountObj.PaymentDetailsID equals paymentObj.Id

                               join transprimeobj in transMasterCollection
                               on accountObj.AccountID equals transprimeobj.Id
                               into transobj
                               from transprimeobj in transobj.DefaultIfEmpty()

                               join parentprimeobj in ParentCollection
                               on accountObj.CustomerID equals parentprimeobj.Id
                               into parentobj
                               from parentprimeobj in parentobj.DefaultIfEmpty()

                               join invoiceprimeobj in InvoiceCollection
                               on paymentObj.InvoiceDetailsID equals invoiceprimeobj.Id
                               into invoiceobj
                               from invoiceprimeobj in invoiceobj.DefaultIfEmpty()
                               select new ReportViewModel
                               {
                                   InvoiceNumber = invoiceprimeobj.InvoiceNo,
                                   AccountName = transprimeobj.Description,
                                   CustomerName = parentprimeobj.ParentName,
                                   DebitAmount = accountObj.DebitAmount,
                                   CreditAmount = accountObj.CreditAmount
                               }).ToList();
                res.Data = AccountList;
                if (getAccountReport.limit != 0)
                {
                    res.Data = AccountList.Skip((getAccountReport.page) * getAccountReport.limit).Take(getAccountReport.limit).ToList();
                }
                res.TotalRows = AccountList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Account Details list has been feteched";
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

        public ResponseViewModal PDFAllIncidents(IncidentRequestViewModel getAllIncidentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllIncidentsRequest.AgencyID > 0)
                {
                    var maxDate = (DateTime)SqlDateTime.MaxValue;
                    var minDate = (DateTime)SqlDateTime.MinValue;

                    var fromDate = getAllIncidentsRequest.FromDate;
                    var toDate = getAllIncidentsRequest.ToDate;

                    if (!(minDate <= fromDate && fromDate <= maxDate))
                    {
                        fromDate = minDate;
                    }

                    if (!(minDate <= toDate && toDate <= maxDate))
                    {
                        toDate = maxDate;
                    }

                    getAllIncidentsRequest.StudentName = (getAllIncidentsRequest.StudentName ?? string.Empty).Trim().ToLower();
                    var isStudentEmpty = string.IsNullOrEmpty(getAllIncidentsRequest.StudentName);

                    string StudentName = getAllIncidentsRequest.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();

                    List<IncidentDetailsViewModel> allIncidents = new List<IncidentDetailsViewModel>();
                    var selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID && !classCheck.IsDeleted && (fromDate.Date <= classCheck.IncidentDate.Date && classCheck.IncidentDate.Date <= toDate.Date));
                    var selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedTeachers = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();
                    var selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();
                    var selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);

                    allIncidents = (from incidentObj in selectedIncident
                                    join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                    join teacherObj in selectedTeachers on incidentObj.TeacherID equals teacherObj.Id
                                    join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                    join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                    join classObj in selectedClasses on incidentObj.ClassesID equals classObj.Id
                                    join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                    where (!incidentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentObj.AgencyID && isStudentEmpty || studentObj.StudentName.ToUpper().Contains(StudentName.ToUpper()))
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
                                                               where (!incidentInvolvmentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentInvolvmentObj.AgencyID)
                                                               select new IncidentInvolvmentViewModel()
                                                               {
                                                                   Id = incidentInvolvmentObj.Id,
                                                                   AgencyID = incidentInvolvmentObj.AgencyID,
                                                                   StudentID = incidentInvolvmentObj.StudentID,
                                                                   StudentName = studentObj.StudentName ?? String.Empty,
                                                                   IncidentID = incidentInvolvmentObj.IncidentID
                                                               }).ToList(),
                                    }).OrderByDescending(c => c.IncidentDate).ToList();
                    res.Data = allIncidents;
                    StringBuilder sb = new StringBuilder();
                    if (allIncidents != null & allIncidents.Count > 0)
                    {
                        sb.Append("<header class='clearfix'>");
                        sb.Append("<h1 style='margin-bottom: 25px;'>Incident Report</h1>");
                        sb.Append("<div> </div>");
                        sb.Append("<table border='1'");
                        sb.Append("<tr>");
                        sb.Append("<th><strong>Incident Date(dd/MM/YYYY)</strong></th>");
                        sb.Append("<th><strong>Student Name</strong></th>");
                        sb.Append("<th><strong>Location</strong></th>");
                        sb.Append("<th><strong>Reporter</strong></th>");
                        sb.Append("<th><strong>Action Taken</strong></th>");
                        sb.Append("<th><strong>Parent Acknowledge</strong></th>");
                        sb.Append("<th><strong>Nature Of Injury</strong></th>");
                        sb.Append("</tr>");
                        foreach (var item in allIncidents)
                        {
                            sb.Append("<tr>");
                            sb.Append("<td>" + Convert.ToDateTime(item.IncidentDate).Date.ToString("dd/MM/yyyy") + "</td>");
                            sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                            sb.Append("<td>" + item.PlaceOfIncident.ToString() + "</td>");
                            sb.Append("<td>" + item.TeacherName.ToString() + "</td>");
                            if (item.ActionTaken != null)
                            {
                                sb.Append("<td>" + item.ActionTaken.ToString() + "</td>");
                            }
                            else
                            {
                                sb.Append("<td>" + "---" + "</td>");
                            }

                            if (item.IsAcknowledge == true)
                            {
                                sb.Append("<td>" + "Yes" + "</td>");
                            }
                            else
                            {
                                sb.Append("<td>" + "No" + "</td>");
                            }

                            if (item.NatureOfInjuryName != null)
                            {
                                sb.Append("<td>" + item.NatureOfInjuryName + "</td>");
                            }
                            else
                            {
                                sb.Append("<td>" + "---" + "</td>");
                            }
                            sb.Append("</tr>");
                        }
                        sb.Append("</table>");
                    }
                    StringReader sr = new StringReader(sb.ToString());
                    byte[] bytes;
                    Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();

                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        bytes = memoryStream.ToArray();
                        memoryStream.Close();
                    }

                    Guid guid = Guid.NewGuid();
                    var downloadName = "Incident_report-" + guid;

                    downloadName += ".pdf";
                    string rootFolder = _hostingEnvironment.WebRootPath;
                    string filePath = rootFolder + "\\DownloadPdfFiles\\";

                    var savedFilePath = (filePath) + downloadName;
                    var path = Path.GetDirectoryName(savedFilePath);
                    if (path != null && !Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                    file.Write(bytes, 0, bytes.Length);
                    file.Close();

                    var filepath = savedFilePath;
                    var FileName = "/DownloadPdfFiles/" + downloadName;
                    res.FilePath = filepath;
                    res.FileName = FileName;
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

        public ResponseViewModal StudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentTransferAttendanceReport.AgencyID > 0)
                {
                    List<ReportViewModel> allAttendanceTransferStudents = new List<ReportViewModel>();

                    getStudentTransferAttendanceReport.StudentName = (getStudentTransferAttendanceReport.StudentName ?? string.Empty).Trim().ToLower();
                    var isStudentNameEmpty = string.IsNullOrEmpty(getStudentTransferAttendanceReport.StudentName);

                    var maxDate = (DateTime)SqlDateTime.MaxValue;
                    var minDate = (DateTime)SqlDateTime.MinValue;

                    var fromDate = getStudentTransferAttendanceReport.FromDate;
                    var toDate = getStudentTransferAttendanceReport.ToDate;

                    if (!(minDate <= fromDate && fromDate <= maxDate))
                    {
                        fromDate = minDate;
                    }

                    if (!(minDate <= toDate && toDate <= maxDate))
                    {
                        toDate = maxDate;
                    }

                    string StudentName = getStudentTransferAttendanceReport.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();

                    IQueryable<Entity.Teachers.ClassTransferAttendence> studentTransferAttendence = _classTransferAttendenceRepository.GetAll().Where(Check => Check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !Check.IsDeleted && (fromDate.Date <= Convert.ToDateTime(Check.TransferDate.Date) && Convert.ToDateTime(Check.TransferDate.Date) <= toDate.Date));
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(StudentName.ToUpper()) && namecheck.AgencyID == getStudentTransferAttendanceReport.AgencyID && !namecheck.IsDeleted);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Teachers.TeacherInfo> teacherdetails = _teacherInfoRepository.GetAll().Where(check => check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !check.IsDeleted);

                    allAttendanceTransferStudents = (from stuclasstraattObj in studentTransferAttendence
                                                     join studentObj in selectedStudents on stuclasstraattObj.StudentID equals studentObj.Id
                                                     join fromclassObj in selectedClass on stuclasstraattObj.FromClassID equals fromclassObj.Id
                                                     join toclassObj in selectedClass on stuclasstraattObj.ToClassID equals toclassObj.Id
                                                     join teacherObj in teacherdetails on stuclasstraattObj.TeacherID equals teacherObj.Id
                                                     orderby stuclasstraattObj.Id descending
                                                     where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(StudentName.ToUpper()))
                                                     select new ReportViewModel
                                                     {
                                                         AgencyID = studentObj.AgencyID,
                                                         StudentID = studentObj.Id,
                                                         StudentName = studentObj.StudentName,
                                                         FromClassName = fromclassObj.ClassName,
                                                         ToClassName = toclassObj.ClassName,
                                                         TransferDate = stuclasstraattObj.TransferDate,
                                                         TeacherID = teacherObj.Id,
                                                         TeacherName = teacherObj.TeacherName
                                                     }).ToList();

                    var result = allAttendanceTransferStudents;

                    res.Data = result;

                    if (getStudentTransferAttendanceReport.limit != 0)
                    {
                        res.Data = result.Skip((getStudentTransferAttendanceReport.page) * getStudentTransferAttendanceReport.limit).Take(getStudentTransferAttendanceReport.limit).ToList();
                    }
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Student Transfer Attendance report list has been fetched.";
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

        public ResponseViewModal PDFStudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getStudentTransferAttendanceReport.AgencyID > 0)
                {
                    List<ReportViewModel> allAttendanceTransferStudents = new List<ReportViewModel>();
                    List<ReportViewModel> result = new List<ReportViewModel>();

                    getStudentTransferAttendanceReport.StudentName = (getStudentTransferAttendanceReport.StudentName ?? string.Empty).Trim().ToLower();
                    var isStudentNameEmpty = string.IsNullOrEmpty(getStudentTransferAttendanceReport.StudentName);

                    var maxDate = (DateTime)SqlDateTime.MaxValue;
                    var minDate = (DateTime)SqlDateTime.MinValue;

                    var fromDate = getStudentTransferAttendanceReport.FromDate;
                    var toDate = getStudentTransferAttendanceReport.ToDate;

                    if (!(minDate <= fromDate && fromDate <= maxDate))
                    {
                        fromDate = minDate;
                    }

                    if (!(minDate <= toDate && toDate <= maxDate))
                    {
                        toDate = maxDate;
                    }

                    string StudentName = getStudentTransferAttendanceReport.StudentName.TrimStart();
                    StudentName = StudentName.TrimEnd();

                    IQueryable<Entity.Teachers.ClassTransferAttendence> studentTransferAttendence = _classTransferAttendenceRepository.GetAll().Where(Check => Check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !Check.IsDeleted && (fromDate.Date <= Convert.ToDateTime(Check.TransferDate.Date) && Convert.ToDateTime(Check.TransferDate.Date) <= toDate.Date));
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(namecheck => namecheck.StudentName.ToUpper().Contains(StudentName.ToUpper()) && namecheck.AgencyID == getStudentTransferAttendanceReport.AgencyID && !namecheck.IsDeleted);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Teachers.TeacherInfo> teacherdetails = _teacherInfoRepository.GetAll().Where(check => check.AgencyID == getStudentTransferAttendanceReport.AgencyID && !check.IsDeleted);


                    allAttendanceTransferStudents = (from stuclasstraattObj in studentTransferAttendence
                                                     join studentObj in selectedStudents on stuclasstraattObj.StudentID equals studentObj.Id
                                                     join fromclassObj in selectedClass on stuclasstraattObj.FromClassID equals fromclassObj.Id
                                                     join toclassObj in selectedClass on stuclasstraattObj.ToClassID equals toclassObj.Id
                                                     join teacherObj in teacherdetails on stuclasstraattObj.TeacherID equals teacherObj.Id
                                                     orderby stuclasstraattObj.Id descending
                                                     where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(StudentName.ToUpper()))
                                                     select new ReportViewModel
                                                     {
                                                         AgencyID = studentObj.AgencyID,
                                                         StudentID = studentObj.Id,
                                                         StudentName = studentObj.StudentName,
                                                         FromClassName = fromclassObj.ClassName,
                                                         ToClassName = toclassObj.ClassName,
                                                         TransferDate = stuclasstraattObj.TransferDate,
                                                         TeacherID = teacherObj.Id,
                                                         TeacherName = teacherObj.TeacherName
                                                     }).ToList();

                    result = allAttendanceTransferStudents;

                    res.Data = result;

                    StringBuilder sb = new StringBuilder();
                    if (result != null & result.Count > 0)
                    {
                        sb.Append("<header class='clearfix'>");
                        sb.Append("<h1 style='margin-bottom: 25px;'>Student Attendance Transfer Report</h1>");
                        sb.Append("<div> </div>");
                        sb.Append("<table border='1'");
                        sb.Append("<tr>");
                        sb.Append("<th><strong>Student Name</strong></th>");
                        sb.Append("<th><strong>Teacher Name</strong></th>");
                        sb.Append("<th><strong>Transfer Date(dd/MM/YYYY)</strong></th>");
                        sb.Append("<th><strong>From Class</strong></th>");
                        sb.Append("<th><strong>To Class</strong></th>");
                        sb.Append("</tr>");
                        foreach (var item in result)
                        {
                            sb.Append("<tr>");
                            sb.Append("<td>" + item.StudentName.ToString() + "</td>");
                            sb.Append("<td>" + item.TeacherName.ToString() + "</td>");
                            sb.Append("<td>" + Convert.ToDateTime(item.TransferDate).Date.ToString("dd/MM/yyyy") + "</td>");
                            sb.Append("<td>" + item.FromClassName.ToString() + "</td>");
                            sb.Append("<td>" + item.ToClassName.ToString() + "</td>");
                            sb.Append("</tr>");
                        }
                        sb.Append("</table>");
                    }
                    StringReader sr = new StringReader(sb.ToString());
                    byte[] bytes;
                    Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();

                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        bytes = memoryStream.ToArray();
                        memoryStream.Close();
                    }

                    Guid guid = Guid.NewGuid();
                    var downloadName = "StudentAttendenceTransfer_report-" + guid;

                    downloadName += ".pdf";
                    string rootFolder = _hostingEnvironment.WebRootPath;
                    string filePath = rootFolder + "\\DownloadPdfFiles\\";

                    var savedFilePath = (filePath) + downloadName;
                    var path = Path.GetDirectoryName(savedFilePath);
                    if (path != null && !Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                    file.Write(bytes, 0, bytes.Length);
                    file.Close();

                    var filepath = savedFilePath;
                    var FileName = "/DownloadPdfFiles/" + downloadName;
                    res.FilePath = filepath;
                    res.FileName = FileName;
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Student Attendence Transfer is successfully fetched.";
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

        public ResponseViewModal GetDuePaymentAccordingToParentAgency(InvoiceDetailsParentViewModel invoiceDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<InvoiceDetailsParentViewModel> allDuePayementDetails = new List<InvoiceDetailsParentViewModel>();
                IQueryable<Entity.Agency.InvoiceDetails> selectedInvoice = _invoiceDetailsRepository.GetAll().Where(Check => Check.ParentID == invoiceDetailsRequest.ParentID && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsInvoicePaid == false);
                IQueryable<Entity.Parent.ParentStudentMapping> selectedMap = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.Id == invoiceDetailsRequest.ParentID);
                IQueryable<Entity.Agency.InvoiceItemDetails> selectedInvoiceItemDetails = _invoiceItemDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classesRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidyDetails = _studentsubsidyDetailsRepository.GetAll().Where(Check => (Check.FromDate.Date <= DateTime.Now.Date && Check.ToDate.Date >= DateTime.Now.Date) && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.SubsidyDetails> subsidyDetails = _subsidyDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);

                allDuePayementDetails = (from invoiceObj in selectedInvoice
                                         join invoiceItemObj in selectedInvoiceItemDetails on invoiceObj.Id equals invoiceItemObj.InvoiceDetailsID
                                         join classObj in selectedClasses on invoiceItemObj.ClassesID equals classObj.Id
                                         join parentObj in selectedParent on invoiceObj.ParentID equals parentObj.Id
                                         join studObj in selectedStudent on invoiceObj.StudentID equals studObj.Id
                                         where invoiceObj.AgencyID == invoiceDetailsRequest.AgencyID && invoiceObj.ParentID == invoiceDetailsRequest.ParentID
                                         && invoiceObj.IsDeleted == false && invoiceObj.IsInvoicePaid == false
                                         select new InvoiceDetailsParentViewModel()
                                         {
                                             Id = invoiceObj.Id,
                                             ParentID = invoiceObj.ParentID,
                                             StudentID = invoiceObj.StudentID,
                                             InvoiceAmount = invoiceObj.InvoiceAmount,
                                             TotalAmount = invoiceObj.TotalAmount,
                                             InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate),
                                             InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate),
                                             DueAmount = invoiceObj.DueAmount,
                                             AgencyID = invoiceObj.AgencyID,
                                             ParentName = parentObj.ParentName,
                                             StudentName = studObj.StudentName,
                                             ClassName = classObj.ClassName,
                                             ClassId = Convert.ToString(invoiceItemObj.ClassesID),
                                             ClassFees = Convert.ToString(invoiceItemObj.ClassFees),
                                             InvoiceNo = invoiceObj.InvoiceNo,
                                             IsPartialPayment = invoiceObj.IsPartialPayment
                                         }).ToList();
                var result = allDuePayementDetails.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
                foreach (var r in result)
                {
                    IQueryable<Entity.Agency.InvoiceDetails> selectedInvoiceForPArent = _invoiceDetailsRepository.GetAll().Where(Check => Check.ParentID == invoiceDetailsRequest.ParentID && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsInvoicePaid == false && !Check.IsDeleted);

                    var StudentAmount = ((from items in selectedInvoiceForPArent
                                          where items.StudentID == r.StudentID && items.AgencyID == invoiceDetailsRequest.AgencyID && !items.IsDeleted
                                          select items.TotalAmount)).Sum(x => (x));

                    r.TotalAmount = StudentAmount;
                }
                res.Data = result;
                decimal AllTotalAmount = result.Select(x => x.TotalAmount).Sum();
                res.TotalBalanceAmount = AllTotalAmount;
                res.TotalRows = result.Count();

                var parent = selectedParent.ToList();

                GenerateInvoice(result, parent[0].EmailId);
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

        public ResponseViewModal GetAllLedgerReport(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getLedgerReportRequest.ParentName = (getLedgerReportRequest.ParentName ?? string.Empty).Trim().ToLower();
                var isParentNameEmpty = string.IsNullOrEmpty(getLedgerReportRequest.ParentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getLedgerReportRequest.FromDate;
                var toDate = getLedgerReportRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                string parentname = getLedgerReportRequest.ParentName.TrimStart();
                parentname = parentname.TrimEnd();

                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.PaymentFromDate && Check.PaymentFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Masters.CalculatedFees> calculatedFees = _cfRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);

                allLedgerList = (from paymentObj in payementCollection
                                 join invoiceObj in invoiceCollection on paymentObj.InvoiceDetailsID equals invoiceObj.Id
                                 join calcultedfeesObj in calculatedFees on invoiceObj.PerDayFeeCalculationID equals calcultedfeesObj.Id
                                 join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
                                 join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
                                 where (isParentNameEmpty || parentObj.ParentName.ToUpper().Contains(parentname.ToUpper()))
                                 orderby paymentObj.Id descending
                                 select new ReportViewModel
                                 {
                                     AgencyID = studentObj.AgencyID,
                                     StudentID = studentObj.Id,
                                     StudentName = studentObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     TotalAmount = calcultedfeesObj.TotalPerDayFee,
                                     DiscountAmount = calcultedfeesObj.DiscountAmount,
                                     AdvanceAmount = paymentObj.AdvanceAmount,
                                     SubsidyAmount = paymentObj.SubsidyAmount,
                                     InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate).Date,
                                     InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate).Date,
                                     PaidStatus = (bool?)invoiceObj.IsInvoicePaid ?? false,
                                     PaymentDate = Convert.ToDateTime(paymentObj.PaymentDate).Date,
                                     PerDayFeeCalculationID = invoiceObj.PerDayFeeCalculationID,
                                     IsPartailPayment = paymentObj.IsPartialPayment
                                 }).ToList();

                foreach (var items in allLedgerList)
                {
                    ExtraFeesDetails extrafessObj = null;
                    IQueryable<ExtraFeesDetails> extraFeesdetail = _efdRepository.GetAll(x => x.CalculatedFeesID == items.PerDayFeeCalculationID && x.AgencyID == items.AgencyID && !x.IsDeleted);
                    if (!ReferenceEquals(extraFeesdetail, null))
                    {
                        foreach (var detail in extraFeesdetail)
                        {
                            extrafessObj = _efdRepository.Get(x => x.Id == detail.Id && x.AgencyID == detail.AgencyID && !x.IsDeleted);
                            if (!ReferenceEquals(extrafessObj, null))
                            {
                                items.TotalAmount = items.TotalAmount + extrafessObj.ChargeAmount;
                            }
                        }
                    }
                }

                var result = allLedgerList;

                res.Data = result;

                if (getLedgerReportRequest.limit != 0)
                {
                    res.Data = result.Skip((getLedgerReportRequest.page) * getLedgerReportRequest.limit).Take(getLedgerReportRequest.limit).ToList();
                }

                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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

        public ResponseViewModal GetAllLedgerReportPDF(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getLedgerReportRequest.ParentName = (getLedgerReportRequest.ParentName ?? string.Empty).Trim().ToLower();
                var isParentNameEmpty = string.IsNullOrEmpty(getLedgerReportRequest.ParentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getLedgerReportRequest.FromDate;
                var toDate = getLedgerReportRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                string parentname = getLedgerReportRequest.ParentName.TrimStart();
                parentname = parentname.TrimEnd();

                List<ReportViewModel> result = new List<ReportViewModel>();
                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.PaymentFromDate && Check.PaymentFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Masters.CalculatedFees> calculatedFees = _cfRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Masters.Agency> agencydetails = _agencyDetailsRepository.GetAll().Where(Check => Check.Id == getLedgerReportRequest.AgencyID && !Check.IsDeleted);

                allLedgerList = (from paymentObj in payementCollection
                                 join invoiceObj in invoiceCollection on paymentObj.InvoiceDetailsID equals invoiceObj.Id
                                 join calcultedfeesObj in calculatedFees on invoiceObj.PerDayFeeCalculationID equals calcultedfeesObj.Id
                                 join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
                                 join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
                                 join agencyObj in agencydetails on paymentObj.AgencyID equals agencyObj.Id
                                 where (isParentNameEmpty || parentObj.ParentName.ToUpper().Contains(parentname.ToUpper()))
                                 orderby paymentObj.Id descending
                                 select new ReportViewModel
                                 {
                                     AgencyID = agencyObj.Id,
                                     AgencyAddress = agencyObj.Address,
                                     AgencyMobile = agencyObj.Mobile,
                                     AgencyEmailID = agencyObj.EmailId,
                                     AgencyName = agencyObj.AgencyName,
                                     StudentID = studentObj.Id,
                                     StudentName = studentObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     TotalAmount = calcultedfeesObj.TotalPerDayFee,
                                     DiscountAmount = calcultedfeesObj.DiscountAmount,
                                     AdvanceAmount = paymentObj.AdvanceAmount,
                                     SubsidyAmount = paymentObj.SubsidyAmount,
                                     InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate).Date,
                                     InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate).Date,
                                     PaidStatus = (bool?)invoiceObj.IsInvoicePaid ?? false,
                                     PaymentDate = Convert.ToDateTime(paymentObj.PaymentDate).Date,
                                     PerDayFeeCalculationID = invoiceObj.PerDayFeeCalculationID,
                                     IsPartailPayment = paymentObj.IsPartialPayment
                                 }).ToList();

                foreach (var items in allLedgerList)
                {
                    ExtraFeesDetails extrafessObj = null;
                    IQueryable<ExtraFeesDetails> extraFeesdetail = _efdRepository.GetAll(x => x.CalculatedFeesID == items.PerDayFeeCalculationID && x.AgencyID == items.AgencyID && !x.IsDeleted);
                    if (!ReferenceEquals(extraFeesdetail, null))
                    {
                        foreach (var detail in extraFeesdetail)
                        {
                            extrafessObj = _efdRepository.Get(x => x.Id == detail.Id && x.AgencyID == detail.AgencyID && !x.IsDeleted);
                            if (!ReferenceEquals(extrafessObj, null))
                            {
                                items.TotalAmount = items.TotalAmount + extrafessObj.ChargeAmount;
                            }
                        }
                    }
                }

                res.Data = allLedgerList;
                result = allLedgerList;

                HtmlToPdf converter = new HtmlToPdf();
                string _assessmentReport = System.IO.File.ReadAllText(_hostingEnvironment.WebRootPath + "/Template/invoice.html");
                string paymentDetails = string.Empty;

                foreach (var item in result)
                {
                    int index = result.IndexOf(item);

                    decimal DrTotal = (item.DiscountAmount + item.AdvanceAmount + item.SubsidyAmount);
                    decimal NetTotal = ((item.TotalAmount) - (item.DiscountAmount + item.AdvanceAmount + item.SubsidyAmount));

                    if (NetTotal < 0)
                    {
                        NetTotal = Convert.ToDecimal(0.00);
                    }
                    paymentDetails = paymentDetails + "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tbody><tr>" +

                     "<td width'100' valign='top' style='font-size:13px;'>" +
                              "Parent Name : " + item.ParentName + "<br>" +
                              "Paid on : " + item.PaymentDate.ToShortDateString() + "<br>" +
                              "From date : " + item.InvoiceFromDate.ToShortDateString() + " , " + "To Date : " + item.InvoiceToDate.ToShortDateString() +
                             "</td> </tr> </tbody></table>" +

                   "<table width='100%' border='1' bordercolor='#e9e9e9' cellspacing='0' cellpadding='10' style='border-collapse:collapse;'> <tbody>" +

                         "<tr bgcolor='#ebecec'>" +
                         "<td bgcolor='#ebecec' valign='middle'><strong>" + "Items" + "</strong></td>" +
                         "<td bgcolor='#ebecec' align='center' valign='middle'> <strong>" + "Dr" + "</strong></td>" +
                         "<td bgcolor='#ebecec' align='center' valign='middle'> <strong>" + "Cr" + "</strong></td>" +
                         "<td bgcolor='#ebecec' align='center' valign='middle'> <strong>" + "Net" + "</strong></td>" +
                         "</tr>" +

                         "<tr>" +

                        "<td valign='middle'><span>" + "Total Amount" + "</span></td>" +
                        "<td align='center' valign='middle'>$" + "0.00" + "</td>" +
                        "<td align='center' valign='middle'>$" + item.TotalAmount + ".00" + "</td>" +
                        "<td align='center' valign='middle'>$" + item.TotalAmount + ".00" + "</td>" +

                        "</tr>" +

                        "<td valign='middle'><span>" + "Discount" + "</span> </td>" +
                        "<td align='center' valign='middle'>$" + item.DiscountAmount + ".00" + "</td>" +
                        "<td align='center' valign='middle'>$" + "0.00" + "</td>" +
                        "<td align='center' valign='middle'>$" + item.DiscountAmount + ".00" + "</td>" +

                        "<tr>" +

                        "<td valign='middle'><span>" + "Advance Fee" + "</span> </td>" +
                        "<td align='center' valign='middle'>$" + item.AdvanceAmount + "</td>" +
                        "<td align='center' valign='middle'>$" + "0.00" + "</td>" +
                        "<td align='center' valign='middle'>$" + item.AdvanceAmount + "</td>" +

                        "</tr>" +

                        "<td valign='middle'><span>" + "Subsidy Fee" + "</span> </td>" +
                        "<td align='center' valign='middle'>$" + item.SubsidyAmount + "</td>" +
                        "<td align='center' valign='middle'>$" + "0.00" + "</td>" +
                        "<td align='center' valign='middle'>$" + item.SubsidyAmount + "</td>" +

                         "<tr>" +


                    "<td valign= 'middle' align='right' style='border-top: 2px solid #000000; padding-right: 30px;'colspan='1'><strong>" +
                             "Total:</strong></td>" +

                     "<td align='center' valign='middle' style='border-top: 2px solid #000000'><strong>$" + (DrTotal) + "</strong></td>" +
                     "<td align='center' valign='middle' style='border-top: 2px solid #000000'><strong>$" + item.TotalAmount + ".00" + "</td>" +
                     "<td align='center' valign='middle' style='border-top: 2px solid #000000'><strong>$" + (NetTotal) + " </ strong ></ td > " +

                    "</tr>" +
                    "</tbody>" + "</table>";
                }
                _assessmentReport = _assessmentReport.Replace("{{currentDate}}", DateTime.Now.Date.ToLongDateString());
                _assessmentReport = _assessmentReport.Replace("{{paymentDetails}}", paymentDetails);
                _assessmentReport = _assessmentReport.Replace("{{address}}", result[0].AgencyAddress);
                _assessmentReport = _assessmentReport.Replace("{{mobile}}", result[0].AgencyMobile.ToString());
                _assessmentReport = _assessmentReport.Replace("{{emailid}}", result[0].AgencyEmailID);
                _assessmentReport = _assessmentReport.Replace("{{agencyname}}", result[0].AgencyName);
                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(_assessmentReport);
                // save pdf document 
                byte[] pdf = doc.Save();
                // close pdf document 
                doc.Close();

                Guid guid = Guid.NewGuid();

                string _fileName = "Ledger_Report-" + guid + ".pdf";
                // return resulted pdf document 
                FileResult fileResult = new FileContentResult(pdf, "application/pdf");
                fileResult.FileDownloadName = _fileName;
                string webRootPath = Directory.GetCurrentDirectory();

                string DirectoryUrl = _hostingEnvironment.WebRootPath + "\\DownloadPdfFiles\\";

                //if (!Directory.Exists(webRootPath + DirectoryUrl))
                //{
                //    Directory.CreateDirectory(webRootPath + DirectoryUrl);
                //}

                string path = DirectoryUrl;
                File.WriteAllBytes(Path.Combine(path, _fileName), pdf);

                var filepath = _fileName;
                var FileName = "/DownloadPdfFiles/" + _fileName;
                res.FilePath = filepath;
                res.FileName = FileName;

                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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


        public ResponseViewModal GetIncidentsDetailsPDF(IncidentRequestViewModel getIncidentsDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getIncidentsDetailsRequest.AgencyID > 0)
                {
                    IncidentDetailsViewModel incidentsDetails = new IncidentDetailsViewModel();
                    var selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedTeacher = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();
                    var selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();
                    var selectedClass = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);

                    var agencydetails = _agencyDetailsRepository.GetAll().Where(Check => Check.Id == getIncidentsDetailsRequest.AgencyID && !Check.IsDeleted);

                    incidentsDetails = (from incidentObj in selectedIncident
                                        join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                        join teacherObj in selectedTeacher on incidentObj.TeacherID equals teacherObj.Id
                                        join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                        join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                        join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                        join classObj in selectedClass on incidentObj.ClassesID equals classObj.Id
                                        join agencyObj in agencydetails on incidentObj.AgencyID equals agencyObj.Id
                                        where (!incidentObj.IsDeleted && getIncidentsDetailsRequest.AgencyID == incidentObj.AgencyID
                                        && getIncidentsDetailsRequest.IncidentID == incidentObj.Id)
                                        select new IncidentDetailsViewModel()
                                        {
                                            Id = incidentObj.Id,
                                            IncidentDate = incidentObj.IncidentDate,
                                            IncidentTime = incidentObj.IncidentTime,
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
                                            AgencyAddress = agencyObj.Address,
                                            AgencyMobile = agencyObj.Mobile,
                                            AgencyEmailID = agencyObj.EmailId,
                                            AgencyName = agencyObj.AgencyName,
                                            ClassesID = incidentObj.ClassesID,
                                            ClassName = classObj.ClassName ?? String.Empty,
                                            PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty,
                                            NatureOfInjuryID = incidentObj.NatureOfInjuryID,
                                            NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                            FirstAidAdministeredID = incidentObj.FirstAidAdministeredID,
                                            FirstAidAdministeredName = FirstAidAdministeredObj.TeacherName ?? String.Empty,
                                            IsDoctorRequired = incidentObj.IsDoctorRequired,
                                            WasParentInformed = incidentObj.WasParentInformed,
                                            ParentComment = incidentObj.ParentComment,
                                            ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty,
                                            IsAcknowledge = incidentObj.IsAcknowledge,
                                            PartOfBody = incidentObj.PartOfBody,
                                            ContextEnviroment = incidentObj.ContextEnviroment,
                                            ContextChild = incidentObj.ContextChild,

                                            IncidentInvolvments = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll().Where(check => check.IncidentID == incidentObj.Id)
                                                                   join studentObj in _studentRepository.GetAll() on incidentInvolvmentObj.StudentID equals studentObj.Id
                                                                   where (!incidentInvolvmentObj.IsDeleted && getIncidentsDetailsRequest.AgencyID == incidentInvolvmentObj.AgencyID)
                                                                   select new IncidentInvolvmentViewModel()
                                                                   {
                                                                       Id = incidentInvolvmentObj.Id,
                                                                       AgencyID = incidentInvolvmentObj.AgencyID,
                                                                       StudentID = incidentInvolvmentObj.StudentID,
                                                                       StudentName = studentObj.StudentName ?? String.Empty,
                                                                       IncidentID = incidentInvolvmentObj.IncidentID
                                                                   }).ToList(),

                                        }).OrderBy(c => c.IncidentDate).FirstOrDefault();

                    res.Data = incidentsDetails;

                    var result = incidentsDetails;

                    string IncidentInvolvmentsName = "";
                    foreach (var r in result.IncidentInvolvments)
                    {
                        IncidentInvolvmentsName += r.StudentName + ",";
                    }

                    IncidentInvolvmentsName = IncidentInvolvmentsName.Trim(',');

                    string IsDoctorRequired = "";
                    if (incidentsDetails.IsDoctorRequired == true)
                    {
                        IsDoctorRequired = "Yes";
                    }
                    else
                    {
                        IsDoctorRequired = "No";
                    }

                    string WasParentInformed = "";
                    if (incidentsDetails.WasParentInformed == true)
                    {
                        WasParentInformed = "Yes";
                    }
                    else
                    {
                        WasParentInformed = "No";
                    }

                    string parentacknowlegement = "";
                    if (incidentsDetails.IsAcknowledge == true)
                    {
                        parentacknowlegement = "Yes";
                    }
                    else
                    {
                        parentacknowlegement = "No";
                    }

                    HtmlToPdf converter = new HtmlToPdf();
                    string _assessmentReport = System.IO.File.ReadAllText(_hostingEnvironment.WebRootPath + "/Template/Incident.html");
                    string paymentDetails = string.Empty;

                    _assessmentReport = _assessmentReport.Replace("{{currentDate}}", DateTime.Now.Date.ToLongDateString());
                    _assessmentReport = _assessmentReport.Replace("{{studentname}}", incidentsDetails.StudentName);
                    _assessmentReport = _assessmentReport.Replace("{{classname}}", incidentsDetails.ClassName);
                    _assessmentReport = _assessmentReport.Replace("{{dateofincident}}", incidentsDetails.IncidentDate.ToShortDateString());
                    _assessmentReport = _assessmentReport.Replace("{{timeofincident}}", Convert.ToDateTime(incidentsDetails.IncidentTime.ToLocalTime()).ToString("hh:mm tt"));//incidentsDetails.IncidentTime.ToShortDateString());
                    _assessmentReport = _assessmentReport.Replace("{{placeofincident}}", incidentsDetails.PlaceOfIncident);
                    _assessmentReport = _assessmentReport.Replace("{{involvedparticipant}}", IncidentInvolvmentsName.ToString());
                    _assessmentReport = _assessmentReport.Replace("{{natureofinjury}}", incidentsDetails.NatureOfInjuryName);
                    _assessmentReport = _assessmentReport.Replace("{{firstaidadministeredby}}", incidentsDetails.FirstAidAdministeredName);
                    _assessmentReport = _assessmentReport.Replace("{{doctorrequired}}", IsDoctorRequired);
                    _assessmentReport = _assessmentReport.Replace("{{wasparentinformed}}", WasParentInformed);
                    _assessmentReport = _assessmentReport.Replace("{{ifyesthenhow}}", incidentsDetails.ParentInformedBy);
                    _assessmentReport = _assessmentReport.Replace("{{actiontaken}}", incidentsDetails.ActionTaken);
                    _assessmentReport = _assessmentReport.Replace("{{incidentpriority}}", incidentsDetails.IncidentPriortyTypeName);
                    _assessmentReport = _assessmentReport.Replace("{{partofbody}}", incidentsDetails.PartOfBody);
                    _assessmentReport = _assessmentReport.Replace("{{contextenvironment}}", incidentsDetails.ContextEnviroment);
                    _assessmentReport = _assessmentReport.Replace("{{commentfromparent}}", incidentsDetails.ParentComment);
                    _assessmentReport = _assessmentReport.Replace("{{contextchild}}", incidentsDetails.ContextChild);
                    _assessmentReport = _assessmentReport.Replace("{{address}}", incidentsDetails.AgencyAddress);
                    _assessmentReport = _assessmentReport.Replace("{{mobile}}", incidentsDetails.AgencyMobile.ToString());
                    _assessmentReport = _assessmentReport.Replace("{{emailid}}", incidentsDetails.AgencyEmailID);
                    _assessmentReport = _assessmentReport.Replace("{{agencyname}}", incidentsDetails.AgencyName);
                    _assessmentReport = _assessmentReport.Replace("{{parentacknowlegement}}", parentacknowlegement);
                    _assessmentReport = _assessmentReport.Replace("{{injurydescription}}", incidentsDetails.Description);

                    SelectPdf.PdfDocument doc = converter.ConvertHtmlString(_assessmentReport);

                    // save pdf document 
                    byte[] pdf = doc.Save();
                    // close pdf document 
                    doc.Close();

                    Guid guid = Guid.NewGuid();

                    string _fileName = "Incident_Report-" + guid + ".pdf";
                    // return resulted pdf document 
                    FileResult fileResult = new FileContentResult(pdf, "application/pdf");
                    fileResult.FileDownloadName = _fileName;
                    string webRootPath = Directory.GetCurrentDirectory();

                    string DirectoryUrl = _hostingEnvironment.WebRootPath + "\\DownloadPdfFiles\\";

                    //if (!Directory.Exists(webRootPath + DirectoryUrl))
                    //{
                    //    Directory.CreateDirectory(webRootPath + DirectoryUrl);
                    //}

                    string path = DirectoryUrl;
                    File.WriteAllBytes(Path.Combine(path, _fileName), pdf);

                    var filepath = _fileName;
                    var FileName = "/DownloadPdfFiles/" + _fileName;
                    res.FilePath = filepath;
                    res.FileName = FileName;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Incidents Details has been feteched";
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


        public void GenerateInvoice(List<InvoiceDetailsParentViewModel> result, string email)
        {
            DailySheetAndBalanceLog DSBLObj = null;

            string folderName = "ParentBalanceAmountPdfFiles";
            string webRootPath = _hostingEnvironment.WebRootPath;

            string path = Path.Combine(webRootPath, folderName);

            // if directory not exists create one
            bool exists = Directory.Exists(path);

            if (!exists)
                Directory.CreateDirectory(path);

            string fileName = string.Empty;
            DateTime fileCreationDatetime = DateTime.Now;
            Guid guid = Guid.NewGuid();
            fileName = "ParentBalanceAmountPdfFiles_report-" + guid + ".pdf";
            string pdfPath = Path.Combine(path, fileName);

            using (FileStream msReport = new FileStream(pdfPath, FileMode.Create))
            {
                using (Document pdfDoc = new Document(PageSize.A4, 10, 10, 10, 30))
                {
                    try
                    {
                        PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, msReport);
                        pdfDoc.Open();

                        var titleFont = FontFactory.GetFont("Arial", 12, Font.BOLD);
                        var titleFontBlue = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                        var boldTableFont = FontFactory.GetFont("Arial", 8, Font.BOLD);
                        var bodyFont = FontFactory.GetFont("Arial", 8, Font.NORMAL);
                        var EmailFont = FontFactory.GetFont("Arial", 8, Font.NORMAL, BaseColor.BLACK);


                        #region Top table
                        // Create the header table 
                        PdfPTable headertable = new PdfPTable(3);
                        headertable.HorizontalAlignment = 0;
                        headertable.WidthPercentage = 100;
                        headertable.SetWidths(new float[] { 100f, 320f, 100f });  // then set the column's __relative__ widths
                                                                                  //headertable.DefaultCell.Border = Rectangle.NO_BORDER;
                                                                                  //headertable.DefaultCell.Border = Rectangle.BOX; //for testing           

                        List<AgencyDetailsViewModel> agencyDetails = new List<AgencyDetailsViewModel>();

                        IQueryable<Entity.Masters.Agency> getagencyDetails = _agencyDetailsRepository.GetAll().Where(check => check.IsDeleted == false);

                        agencyDetails = (from ADObj in getagencyDetails
                                         where !ADObj.IsDeleted && ADObj.Id == result[0].AgencyID
                                         select new AgencyDetailsViewModel()
                                         {
                                             agencyID = ADObj.Id,
                                             AgencyName = ADObj.AgencyName ?? String.Empty,
                                             AgencyAddress = ADObj.Address ?? String.Empty,
                                             AgencyMobile = Convert.ToUInt64(ADObj.Mobile).ToString(),
                                             AgencyEmail = ADObj.EmailId ?? String.Empty,
                                             AgencyImage = ADObj.ImagePath ?? String.Empty
                                         }).ToList();

                        iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                        logo.ScaleToFit(100, 100);
                        {
                            PdfPCell pdfCelllogo = new PdfPCell(logo);
                            pdfCelllogo.Border = 0;
                            pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            pdfCelllogo.BorderWidthBottom = 1f;
                            headertable.AddCell(pdfCelllogo);
                        }
                        {
                            PdfPCell middlecell = new PdfPCell();
                            middlecell.Border = Rectangle.NO_BORDER;
                            middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            middlecell.BorderWidthBottom = 1f;
                            headertable.AddCell(middlecell);
                        }


                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            PdfPCell nextPostCell1 = new PdfPCell(new Phrase(agencyDetails[0].AgencyName, titleFont));
                            nextPostCell1.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase(agencyDetails[0].AgencyAddress, bodyFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            PdfPCell nextPostCell3 = new PdfPCell(new Phrase(agencyDetails[0].AgencyMobile, bodyFont));
                            nextPostCell3.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell3);
                            PdfPCell nextPostCell4 = new PdfPCell(new Phrase(agencyDetails[0].AgencyEmail, EmailFont));
                            nextPostCell4.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell4);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            headertable.AddCell(nesthousing);
                        }


                        PdfPTable Invoicetable = new PdfPTable(3);
                        Invoicetable.HorizontalAlignment = 0;
                        Invoicetable.WidthPercentage = 100;
                        Invoicetable.SetWidths(new float[] { 100f, 320f, 100f });  // then set the column's __relative__ widths
                        Invoicetable.DefaultCell.Border = Rectangle.NO_BORDER;

                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            PdfPCell nextPostCell1 = new PdfPCell(new Phrase("TO:", bodyFont));
                            nextPostCell1.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase(result[0].ParentName, titleFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            //nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            Invoicetable.AddCell(nesthousing);
                        }

                        {
                            PdfPCell middlecell = new PdfPCell();
                            middlecell.Border = Rectangle.NO_BORDER;
                            //middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //middlecell.BorderWidthBottom = 1f;
                            Invoicetable.AddCell(middlecell);
                        }


                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            //PdfPCell nextPostCell1 = new PdfPCell(new Phrase("INVOICE 3-2-1", titleFontBlue));
                            //nextPostCell1.Border = 0;// Rectangle.NO_BORDER;
                            //nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase("Date: " + DateTime.Now.ToShortDateString(), bodyFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            //PdfPCell nextPostCell3 = new PdfPCell(new Phrase("Due Date: " + DateTime.Now.AddDays(30).ToShortDateString(), bodyFont));
                            //nextPostCell3.Border = Rectangle.NO_BORDER;
                            //nested.AddCell(nextPostCell3);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            //nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            Invoicetable.AddCell(nesthousing);
                        }


                        pdfDoc.Add(headertable);
                        Invoicetable.PaddingTop = 10f;

                        pdfDoc.Add(Invoicetable);
                        #endregion

                        #region Items Table
                        //Create body table
                        PdfPTable itemTable = new PdfPTable(4);

                        itemTable.HorizontalAlignment = 1;
                        itemTable.WidthPercentage = 100;
                        itemTable.SetWidths(new float[] { 5, 40, 10, 20 });  // then set the column's __relative__ widths
                        itemTable.SpacingAfter = 30;
                        itemTable.DefaultCell.Border = Rectangle.BOX;

                        PdfPCell cell1 = new PdfPCell(new Phrase("NO", boldTableFont));
                        // cell1.BackgroundColor = TabelHeaderBackGroundColor;
                        cell1.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell1);

                        PdfPCell cell2 = new PdfPCell(new Phrase("CHILD NAME", boldTableFont));
                        // cell2.BackgroundColor = TabelHeaderBackGroundColor;
                        cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell2);

                        PdfPCell cell3 = new PdfPCell(new Phrase("BALANCE($)", boldTableFont));
                        // cell3.BackgroundColor = TabelHeaderBackGroundColor;
                        cell3.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell3);

                        PdfPCell cell4 = new PdfPCell(new Phrase("TOTAL($)", boldTableFont));
                        // cell5.BackgroundColor = TabelHeaderBackGroundColor;
                        cell4.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell4);


                        foreach (var details in result)
                        {
                            int index = result.IndexOf(details);


                            PdfPCell numberCell = new PdfPCell(new Phrase(Convert.ToInt64(index + 1).ToString(), bodyFont));
                            numberCell.HorizontalAlignment = 1;
                            numberCell.PaddingLeft = 10f;
                            numberCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                            itemTable.AddCell(numberCell);


                            PdfPCell qtyCell = new PdfPCell(new Phrase(details.StudentName, bodyFont));
                            qtyCell.HorizontalAlignment = 1;
                            qtyCell.PaddingLeft = 10f;
                            qtyCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                            itemTable.AddCell(qtyCell);

                            PdfPCell amountCell = new PdfPCell(new Phrase(Convert.ToDecimal(details.TotalAmount).ToString(), bodyFont));
                            amountCell.HorizontalAlignment = 1;
                            amountCell.PaddingLeft = 10f;
                            amountCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                            itemTable.AddCell(amountCell);

                            PdfPCell totalamtCell = new PdfPCell(new Phrase(Convert.ToDecimal(details.TotalAmount).ToString(), bodyFont));
                            totalamtCell.HorizontalAlignment = 1;
                            totalamtCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                            itemTable.AddCell(totalamtCell);

                        }
                        // Table footer
                        PdfPCell totalAmtCell1 = new PdfPCell(new Phrase(""));
                        totalAmtCell1.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        totalAmtCell1.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell1);

                        PdfPCell totalAmtCell2 = new PdfPCell(new Phrase(""));
                        totalAmtCell2.Border = Rectangle.TOP_BORDER; //Rectangle.NO_BORDER; //Rectangle.TOP_BORDER;
                        totalAmtCell2.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell2);


                        decimal AllTotalAmount = result.Select(x => x.TotalAmount).Sum();

                        PdfPCell totalAmtStrCell = new PdfPCell(new Phrase("Total Amount($)", boldTableFont));
                        totalAmtStrCell.Border = Rectangle.TOP_BORDER;
                        totalAmtStrCell.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtStrCell);
                        PdfPCell totalAmtCell = new PdfPCell(new Phrase(Convert.ToDecimal(AllTotalAmount).ToString(), boldTableFont));
                        totalAmtCell.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell);

                        //  string wordednumberstring = IntegerToWords(Convert.ToString(AllTotalAmount)).Trim();

                        PdfPCell cell = new PdfPCell(new Phrase("", bodyFont));
                        cell.Colspan = 4;
                        cell.HorizontalAlignment = 1;
                        itemTable.AddCell(cell);
                        pdfDoc.Add(itemTable);

                        #endregion

                        pdfDoc.NewPage();

                        pdfDoc.Close();

                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p>Student Balance Details</p><b> </b><br/> <p>Thanks.</p></body></html>";
                        _commonService.SendEmailAttachmentSync(email, "Student Balance Details", message, pdfPath);

                        long Id = 0;
                        DailySheetAndBalanceLog dailysheetbalance = new DailySheetAndBalanceLog();

                        dailysheetbalance.CreatedDate = DateTime.UtcNow;
                        dailysheetbalance.IsActive = true;
                        dailysheetbalance.IsDeleted = false;
                        dailysheetbalance.AgencyID = result[0].AgencyID;
                        dailysheetbalance.ParentID = result[0].ParentID;
                        dailysheetbalance.Type = "Student Balance Details";
                        dailysheetbalance.TeacherID = result[0].UserID;
                        dailysheetbalance.Path = pdfPath;
                        dailysheetbalance.SendDate = DateTime.UtcNow;
                        DSBLObj = Mapper.Map<DailySheetAndBalanceLog>(dailysheetbalance);
                        _DailySheetAndBalanceLogRepository.Create(DSBLObj);
                        _DailySheetAndBalanceLogRepository.SaveChanges();
                        Id = DSBLObj.Id;
                    }
                    catch (Exception ex)
                    {
                        //handle exception  
                    }

                }
            }
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

                                                        where (!studentActivityMealFoodItemObj.IsDeleted && !involvedFoodItem.IsDeleted &&
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


        public void GenerateDailySheetReportPDF(List<DailySheetViewModel> result)
        {
            string folderName = "DailySheetReportPdfFiles";
            string webRootPath = _hostingEnvironment.WebRootPath;

            string path = Path.Combine(webRootPath, folderName);

            // if directory not exists create one
            bool exists = Directory.Exists(path);

            if (!exists)
                Directory.CreateDirectory(path);

            string fileName = string.Empty;
            DateTime fileCreationDatetime = DateTime.Now;
            Guid guid = Guid.NewGuid();
            fileName = "DailySheetReportPdfFiles_report-" + guid + ".pdf";
            string pdfPath = Path.Combine(path, fileName);

            using (FileStream msReport = new FileStream(pdfPath, FileMode.Create))
            {
                using (Document pdfDoc = new Document(PageSize.A4, 88f, 88f, 10f, 10f))
                {
                    try
                    {
                        PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, msReport);
                        pdfDoc.Open();

                        PdfPCell cell = null;
                        PdfPTable table = null;

                        table = new PdfPTable(3);
                        table.TotalWidth = 500f;
                        table.LockedWidth = true;
                        table.SetWidths(new float[] { 0.3f, 0.7f, 0.3f });

                        var titleFont = FontFactory.GetFont("Arial", 12, Font.BOLD);
                        var titleFontBlue = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLUE);
                        var boldTableFont = FontFactory.GetFont("Arial", 8, Font.BOLD);
                        var bodyFont = FontFactory.GetFont("Arial", 8, Font.NORMAL);
                        var EmailFont = FontFactory.GetFont("Arial", 8, Font.NORMAL, BaseColor.BLUE);

                        List<StudentViewModel> studentDetails = new List<StudentViewModel>();

                        IQueryable<Entity.Student.Student> studentdetail = _studentRepository.GetAll().Where(check => check.Id == result[0].StudentID && !check.IsDeleted);

                        studentDetails = (from SDObj in studentdetail
                                          where !SDObj.IsDeleted && SDObj.Id == result[0].StudentID
                                          select new StudentViewModel()
                                          {
                                              StudentId = SDObj.Id,
                                              StudentName = SDObj.StudentName,
                                              ImagePath = SDObj.ImagePath
                                          }).ToList();

                        iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                        logo.ScaleToFit(100, 100);
                        {
                            PdfPCell pdfCelllogo = new PdfPCell(logo);
                            pdfCelllogo.Border = 0;
                            pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            pdfCelllogo.BorderWidthBottom = 1f;
                            table.AddCell(pdfCelllogo);
                        }
                        {
                            PdfPCell middlecell = new PdfPCell();
                            middlecell.Border = Rectangle.NO_BORDER;
                            middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            middlecell.BorderWidthBottom = 1f;
                            table.AddCell(middlecell);
                        }
                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;

                            iTextSharp.text.Image logoStudent = null;
                            if (studentDetails[0].ImagePath == null || studentDetails[0].ImagePath == "")
                            {
                                logoStudent = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/user.png");
                            }
                            else
                            {
                                logoStudent = iTextSharp.text.Image.GetInstance(studentDetails[0].ImagePath);
                            }


                            logoStudent.ScaleToFit(50, 50);
                            {
                                PdfPCell nextPostCell1 = new PdfPCell(logoStudent);
                                nextPostCell1.Border = 0;
                                nested.AddCell(nextPostCell1);
                            }

                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase(studentDetails[0].StudentName, titleFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);

                            PdfPCell nextPostCell3 = new PdfPCell(new Phrase("Date: " + DateTime.Now.ToShortDateString(), bodyFont));
                            nextPostCell3.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell3);

                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            table.AddCell(nesthousing);
                        }

                        pdfDoc.Add(table);

                        table = new PdfPTable(2);
                        table.HorizontalAlignment = 1;
                        table.SetWidths(new float[] { 6f, 6f });
                        table.SpacingBefore = 25f;
                        table.TotalWidth = 600f;

                        cell = PhraseCell(new Phrase("Dear Mom & Dad" + "\n" + result[0].ClassName + " Class wants to share what i did today!", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)), Element.ALIGN_CENTER);
                        cell.Colspan = 2;
                        table.AddCell(cell);
                        cell = PhraseCell(new Phrase(), Element.ALIGN_CENTER);
                        cell.Colspan = 2;
                        cell.PaddingBottom = 40f;
                        table.AddCell(cell);

                        pdfDoc.Add(table);

                        var list = result[0].ActivityDetail;

                        list.RemoveAll(s => s.ActivityTypeName == null);

                        var filteredHealth = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Health Checkup"))).ToList();
                        var filteredNotes = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Notes"))).ToList();
                        var filteredMeal = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Meal"))).ToList();
                        var filteredMood = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Mood"))).ToList();
                        var filteredActivity = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Activity"))).ToList();
                        var filteredNap = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Nap"))).ToList();
                        var filteredToileting = list.Where(p => list.All(tag => p.ActivityTypeName.Contains("Toileting"))).ToList();

                        //==== For Health ====//
                        if (filteredHealth.Count > 0)
                        {
                            PdfPTable tableHealth = new PdfPTable(2);
                            tableHealth.TotalWidth = 400f;
                            tableHealth.LockedWidth = true;
                            tableHealth.SetWidths(new float[] { 4f, 4f });
                            tableHealth.HorizontalAlignment = 0;
                            tableHealth.SpacingBefore = 10f;
                            tableHealth.SpacingAfter = 10f;

                            PdfPCell cellHealth = new PdfPCell(new Phrase("Health", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellHealth.Colspan = 2;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellHealth.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellHealth.HorizontalAlignment = 1;
                            tableHealth.AddCell(cellHealth);

                            cellHealth = new PdfPCell(new Phrase("Temperature(°F)"));
                            tableHealth.AddCell(cellHealth);
                            cellHealth = new PdfPCell(new Phrase("Health Note"));
                            tableHealth.AddCell(cellHealth);

                            foreach (var health in filteredHealth)
                            {
                                cellHealth = new PdfPCell(new Phrase(health.RecordTemp));
                                tableHealth.AddCell(cellHealth);
                                cellHealth = new PdfPCell(new Phrase(health.ActivityDescription));
                                tableHealth.AddCell(cellHealth);
                            }

                            pdfDoc.Add(tableHealth);
                        }

                        //==== For Notes ====//
                        if (filteredNotes.Count > 0)
                        {
                            PdfPTable tableNotes = new PdfPTable(1);
                            tableNotes.TotalWidth = 400f;
                            tableNotes.LockedWidth = true;
                            tableNotes.SetWidths(new float[] { 4f });
                            tableNotes.HorizontalAlignment = 0;
                            tableNotes.SpacingBefore = 10f;
                            tableNotes.SpacingAfter = 10f;

                            PdfPCell cellNotes = new PdfPCell(new Phrase("Notes", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellNotes.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellNotes.Colspan = 1;
                            cellNotes.HorizontalAlignment = 1;
                            tableNotes.AddCell(cellNotes);

                            foreach (var Notes in filteredNotes)
                            {
                                cellNotes = new PdfPCell(new Phrase(Notes.ActivityDescription));
                                tableNotes.AddCell(cellNotes);
                            }

                            pdfDoc.Add(tableNotes);
                        }

                        //==== For Mood ====//
                        if (filteredMood.Count > 0)
                        {
                            PdfPTable tableMood = new PdfPTable(2);
                            tableMood.TotalWidth = 400f;
                            tableMood.LockedWidth = true;
                            tableMood.SetWidths(new float[] { 4f, 4f });
                            tableMood.HorizontalAlignment = 0;
                            tableMood.SpacingBefore = 10f;
                            tableMood.SpacingAfter = 10f;

                            PdfPCell cellMood = new PdfPCell(new Phrase("Mood", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellMood.Colspan = 2;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellMood.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellMood.HorizontalAlignment = 1;
                            tableMood.AddCell(cellMood);

                            cellMood = new PdfPCell(new Phrase("My Mood was"));
                            tableMood.AddCell(cellMood);
                            cellMood = new PdfPCell(new Phrase("Comments"));
                            tableMood.AddCell(cellMood);

                            foreach (var Mood in filteredMood)
                            {
                                cellMood = new PdfPCell(new Phrase(Mood.Mood));
                                tableMood.AddCell(cellMood);
                                cellMood = new PdfPCell(new Phrase(Mood.ActivityDescription));
                                tableMood.AddCell(cellMood);
                            }

                            pdfDoc.Add(tableMood);
                        }

                        //==== For Activity ====//
                        if (filteredActivity.Count > 0)
                        {
                            PdfPTable tableActivity = new PdfPTable(3);
                            tableActivity.TotalWidth = 400f;
                            tableActivity.LockedWidth = true;
                            tableActivity.SetWidths(new float[] { 1f, 1f, 4f });
                            tableActivity.HorizontalAlignment = 0;
                            tableActivity.SpacingBefore = 10f;
                            tableActivity.SpacingAfter = 10f;

                            PdfPCell cellActivity = new PdfPCell(new Phrase("Activity", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellActivity.Colspan = 3;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellActivity.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellActivity.HorizontalAlignment = 1;
                            tableActivity.AddCell(cellActivity);

                            cellActivity = new PdfPCell(new Phrase("Start Time"));
                            tableActivity.AddCell(cellActivity);
                            cellActivity = new PdfPCell(new Phrase("End Time"));
                            tableActivity.AddCell(cellActivity);
                            cellActivity = new PdfPCell(new Phrase("Activity Note"));
                            tableActivity.AddCell(cellActivity);

                            foreach (var Activity in filteredActivity)
                            {
                                cellActivity = new PdfPCell(new Phrase(Convert.ToDateTime(Activity.StartTime).ToString("hh:mm tt")));
                                tableActivity.AddCell(cellActivity);
                                cellActivity = new PdfPCell(new Phrase(Convert.ToDateTime(Activity.EndTime).ToString("hh:mm tt")));
                                tableActivity.AddCell(cellActivity);
                                cellActivity = new PdfPCell(new Phrase(Activity.ActivityDescription));
                                tableActivity.AddCell(cellActivity);
                            }

                            pdfDoc.Add(tableActivity);
                        }

                        //==== For Nap ====//
                        if (filteredNap.Count > 0)
                        {
                            PdfPTable tableNap = new PdfPTable(3);
                            tableNap.TotalWidth = 400f;
                            tableNap.LockedWidth = true;
                            tableNap.SetWidths(new float[] { 2f, 2f, 4f });
                            tableNap.HorizontalAlignment = 0;
                            tableNap.SpacingBefore = 10f;
                            tableNap.SpacingAfter = 10f;

                            PdfPCell cellNap = new PdfPCell(new Phrase("Nap", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellNap.Colspan = 3;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellNap.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellNap.HorizontalAlignment = 1;
                            tableNap.AddCell(cellNap);

                            cellNap = new PdfPCell(new Phrase("Sleep-At Time"));
                            tableNap.AddCell(cellNap);
                            cellNap = new PdfPCell(new Phrase("Woke-Up Time"));
                            tableNap.AddCell(cellNap);
                            cellNap = new PdfPCell(new Phrase("Description"));
                            tableNap.AddCell(cellNap);

                            foreach (var Nap in filteredNap)
                            {
                                cellNap = new PdfPCell(new Phrase(Convert.ToDateTime(Nap.StartTime).ToString("hh:mm tt")));
                                tableNap.AddCell(cellNap);
                                cellNap = new PdfPCell(new Phrase(Convert.ToDateTime(Nap.EndTime).ToString("hh:mm tt")));
                                tableNap.AddCell(cellNap);
                                cellNap = new PdfPCell(new Phrase(Nap.ActivityDescription));
                                tableNap.AddCell(cellNap);
                            }

                            pdfDoc.Add(tableNap);
                        }


                        //==== For Toileting ====//
                        if (filteredToileting.Count > 0)
                        {
                            PdfPTable tableToileting = new PdfPTable(2);
                            tableToileting.TotalWidth = 400f;
                            tableToileting.LockedWidth = true;
                            tableToileting.SetWidths(new float[] { 1f, 4f });
                            tableToileting.HorizontalAlignment = 0;
                            tableToileting.SpacingBefore = 10f;
                            tableToileting.SpacingAfter = 10f;

                            PdfPCell cellToileting = new PdfPCell(new Phrase("Toileting", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellToileting.Colspan = 2;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellToileting.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellToileting.HorizontalAlignment = 1;
                            tableToileting.AddCell(cellToileting);

                            cellToileting = new PdfPCell(new Phrase("Time"));
                            tableToileting.AddCell(cellToileting);
                            cellToileting = new PdfPCell(new Phrase("Description"));
                            tableToileting.AddCell(cellToileting);

                            foreach (var Toileting in filteredToileting)
                            {
                                cellToileting = new PdfPCell(new Phrase(Convert.ToDateTime(Toileting.StartTime).ToString("hh:mm tt")));
                                tableToileting.AddCell(cellToileting);
                                cellToileting = new PdfPCell(new Phrase(Toileting.ActivityDescription));
                                tableToileting.AddCell(cellToileting);
                            }

                            pdfDoc.Add(tableToileting);
                        }


                        //==== For Meal ====//
                        if (filteredMeal.Count > 0)
                        {

                            PdfPTable tableMeal = new PdfPTable(5);
                            tableMeal.TotalWidth = 400f;
                            tableMeal.LockedWidth = true;
                            tableMeal.SetWidths(new float[] { 4f, 4f, 2f, 3f, 4f });
                            tableMeal.HorizontalAlignment = 0;
                            tableMeal.SpacingBefore = 10f;
                            tableMeal.SpacingAfter = 10f;

                            PdfPCell cellMeal = new PdfPCell(new Phrase("Meal", FontFactory.GetFont("Arial", 14, Font.BOLD, BaseColor.BLACK)));
                            cellMeal.Colspan = 5;
                            BaseColor myColor = WebColors.GetRGBColor("#58A7FE");
                            cellMeal.BackgroundColor = myColor;//BaseColor.BLUE;
                            cellMeal.HorizontalAlignment = 1;
                            tableMeal.AddCell(cellMeal);

                            cellMeal = new PdfPCell(new Phrase("Meal Plan"));
                            tableMeal.AddCell(cellMeal);
                            cellMeal = new PdfPCell(new Phrase("Food Item"));
                            tableMeal.AddCell(cellMeal);
                            cellMeal = new PdfPCell(new Phrase("Amount"));
                            tableMeal.AddCell(cellMeal);
                            cellMeal = new PdfPCell(new Phrase("Unit"));
                            tableMeal.AddCell(cellMeal);
                            cellMeal = new PdfPCell(new Phrase("Consumed"));
                            tableMeal.AddCell(cellMeal);

                            foreach (var Meal in filteredMeal)
                            {
                                string MealPlanTitle;
                                string FoodItem;
                                string FoodAmount;
                                string FoodUnit;
                                string FoodConsumed;
                                ResponseViewModal res = new ResponseViewModal();

                                if (Meal.AgencyID > 0 && Meal.StudentActivityID > 0)
                                {
                                    StudentActivityMealViewModel StudentActivityMeals = new StudentActivityMealViewModel();
                                    IQueryable<StudentActivityMeal> selectedStudentActivityMeal = _studentActivityMealRepository.GetAll().Where(check => check.AgencyID == Meal.AgencyID && check.StudentActivitiesID == Meal.StudentActivityID);
                                    IQueryable<StudentActivityMealFoodItems> selectedStudentActivityMealFoodItems = _studentActivityMealFoodItemsRepository.GetAll().Where(classCheck => classCheck.AgencyID == Meal.AgencyID);
                                    IQueryable<Entity.Agency.MealPlanner> selectedMealPlans = _mealPlannerRepository.GetAll().Where(check => check.AgencyID == Meal.AgencyID);

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
                                                                    StudentID = Meal.StudentID,
                                                                    MealComment = studentActivityMealObj.MealComment,
                                                                    OtherThanPlanMeal = studentActivityMealObj.OtherThanPlanMeal,
                                                                    OtherThanPlanMealComment = studentActivityMealObj.OtherThanPlanMealComment,
                                                                    MealPlannerID = studentActivityMealObj.MealPlannerID,
                                                                    MealPlanTitle = mealplanObj.Title,
                                                                    ActivityTypeID = 3
                                                                }).OrderBy(c => c.StudentActivitiesID).FirstOrDefault();

                                        if (StudentActivityMeals != null)
                                        {
                                            StudentActivityMeals.StudentActivityMealFoodItems = GetStudentActivityMealFoodItems(StudentActivityMeals.Id, StudentActivityMeals.MealPlannerID, StudentActivityMeals.AgencyID, Meal.StudentID);
                                            res.Data = StudentActivityMeals;

                                            MealPlanTitle = StudentActivityMeals.MealPlanTitle;
                                            FoodItem = StudentActivityMeals.StudentActivityMealFoodItems[0].FoodTypeName;
                                            FoodAmount = StudentActivityMeals.StudentActivityMealFoodItems[0].Amount.ToString();
                                            FoodUnit = StudentActivityMeals.StudentActivityMealFoodItems[0].MeasureUnitTypeName;

                                            IQueryable<Entity.Masters.FoodConsumtion> selectedFoodConsumptions = _foodConsumtionRepository.GetAll().Where(check => check.Id == StudentActivityMeals.StudentActivityMealFoodItems[0].FoodConsumtionID);

                                            FoodConsumed = selectedFoodConsumptions.Select(select => select.FoodConsumtionName).FirstOrDefault();

                                            cellMeal = new PdfPCell(new Phrase(MealPlanTitle));
                                            tableMeal.AddCell(cellMeal);
                                            cellMeal = new PdfPCell(new Phrase(FoodItem));
                                            tableMeal.AddCell(cellMeal);
                                            cellMeal = new PdfPCell(new Phrase(FoodAmount));
                                            tableMeal.AddCell(cellMeal);
                                            cellMeal = new PdfPCell(new Phrase(FoodUnit));
                                            tableMeal.AddCell(cellMeal);
                                            cellMeal = new PdfPCell(new Phrase(FoodConsumed));
                                            tableMeal.AddCell(cellMeal);
                                        }
                                    }
                                }
                            }

                            pdfDoc.Add(tableMeal);
                        }


                        pdfDoc.Close();

                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p>Student DailySheet Details</p><b> </b><br/> <p>Thanks.</p></body></html>";
                        _commonService.SendEmailAttachmentSync(result[0].ParentEmail, "Student DailySheet Report", message, pdfPath);

                        DailySheetAndBalanceLog DSBLObj = null;
                        long Id = 0;
                        DailySheetAndBalanceLog dailysheetbalance = new DailySheetAndBalanceLog();

                        dailysheetbalance.CreatedDate = DateTime.UtcNow;
                        dailysheetbalance.IsActive = true;
                        dailysheetbalance.IsDeleted = false;
                        dailysheetbalance.AgencyID = result[0].AgencyID;
                        dailysheetbalance.StudentID = result[0].StudentID;
                        dailysheetbalance.ParentID = result[0].ParentID;
                        dailysheetbalance.Type = "DailySheet Details";
                        dailysheetbalance.TeacherID = result[0].UserID;
                        dailysheetbalance.Path = pdfPath;
                        dailysheetbalance.SendDate = DateTime.Now;
                        DSBLObj = Mapper.Map<DailySheetAndBalanceLog>(dailysheetbalance);
                        _DailySheetAndBalanceLogRepository.Create(DSBLObj);
                        _DailySheetAndBalanceLogRepository.SaveChanges();
                        Id = DSBLObj.Id;
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
        }

        private static void DrawLine(PdfWriter writer, float x1, float y1, float x2, float y2, string color)
        {
            PdfContentByte contentByte = writer.DirectContent;
            contentByte.SetColorStroke(BaseColor.BLACK);
            contentByte.MoveTo(x1, y1);
            contentByte.LineTo(x2, y2);
            contentByte.Stroke();
        }

        private static PdfPCell PhraseCell(Phrase phrase, int align)
        {
            PdfPCell cell = new PdfPCell(phrase);
            cell.VerticalAlignment = Element.ALIGN_TOP;
            cell.HorizontalAlignment = align;
            cell.PaddingBottom = 2f;
            cell.PaddingTop = 0f;
            return cell;
        }

        private static PdfPCell ImageCell(string path, float scale, int align)
        {
            iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(path);
            image.ScaleAbsolute(50f, 50f);
            PdfPCell cell = new PdfPCell(image);
            cell.BorderColor = new BaseColor(System.Drawing.Color.Black);
            cell.VerticalAlignment = Element.ALIGN_TOP;
            cell.HorizontalAlignment = align;
            cell.PaddingBottom = 0f;
            cell.PaddingTop = 0f;
            return cell;
        }

        public ResponseViewModal GetLedgerAccordingNewpayment(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                getLedgerReportRequest.StudentName = (getLedgerReportRequest.StudentName ?? string.Empty).Trim().ToLower();
                var isStudentNameEmpty = string.IsNullOrEmpty(getLedgerReportRequest.StudentName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getLedgerReportRequest.FromDate;
                var toDate = getLedgerReportRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                string studentname = getLedgerReportRequest.StudentName.TrimStart();
                studentname = studentname.TrimEnd();
                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.InvoiceFromDate && Check.InvoiceFromDate <= toDate.Date) && !Check.IsDeleted);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && (fromDate.Date <= Check.PaymentFromDate && Check.PaymentFromDate <= toDate.Date) && !Check.IsDeleted);


                var totalAmount = payementCollection.Sum(a => a.TotalAmount - a.DiscountAmount);
                var paidAmount = payementCollection.Sum(b => b.AmoutPaid);
                var balanceAmount = totalAmount - paidAmount;
                allLedgerList = (from invoiceObj in payementCollection
                                 join paymentPrimeObj in invoiceCollection on invoiceObj.InvoiceDetailsID equals paymentPrimeObj.Id
                                 into paymentObj
                                 from paymentPrimeObj in paymentObj.DefaultIfEmpty()
                                 join studentObj in studentCollection on invoiceObj.StudentID equals studentObj.Id
                                 join parentObj in parentCollection on invoiceObj.ParentID equals parentObj.Id
                                 where (isStudentNameEmpty || studentObj.StudentName.ToUpper().Contains(studentname.ToUpper()))
                                 select new ReportViewModel
                                 {
                                     AgencyID = studentObj.AgencyID,
                                     StudentID = studentObj.Id,
                                     StudentName = studentObj.StudentName,
                                     ParentName = parentObj.ParentName,
                                     InvoiceFromDate = Convert.ToDateTime(paymentPrimeObj.InvoiceFromDate).Date,
                                     InvoiceToDate = Convert.ToDateTime(paymentPrimeObj.InvoiceToDate).Date,
                                     Amount = (decimal?)(paymentPrimeObj.InvoiceAmount) ?? 0,
                                     PaidStatus = (bool?)paymentPrimeObj.IsInvoicePaid ?? false,
                                     PaymentDate = Convert.ToDateTime(invoiceObj.PaymentDate).Date,
                                     DebitAmount = invoiceObj.AmoutPaid,
                                     CreditAmount = invoiceObj.BalanceAmount,
                                 }).OrderBy(c => c.StudentName).ToList();

                res.Data = allLedgerList;
                if (getLedgerReportRequest.limit != 0)
                {
                    res.Data = allLedgerList.Skip((getLedgerReportRequest.page) * getLedgerReportRequest.limit).Take(getLedgerReportRequest.limit).ToList();
                }
                res.TotalRows = allLedgerList.Count();
                res.TotalInvoiceAmount = totalAmount;
                res.TotalPaidAmount = paidAmount;
                res.TotalBalanceAmount = balanceAmount;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Ledger list has been feteched";
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


        public ResponseViewModal GetTeacherSpentHoursReport(ReportViewModel teachersHoursRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var isTeacherNameEmpty = string.IsNullOrEmpty(teachersHoursRequest.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = teachersHoursRequest.FromDate;
                var toDate = teachersHoursRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string teacherName = teachersHoursRequest.TeacherName.TrimStart();
                teacherName = teacherName.TrimEnd();

                List<ReportViewModel> allTeachersHours = new List<ReportViewModel>();
                List<ReportViewModel> resposeForPdf = new List<ReportViewModel>();
                IQueryable<Entity.Teachers.TeacherInfo> selectedTeachers = _teacherInfoRepository.GetAll(check => check.AgencyID == teachersHoursRequest.AgencyID);

                IQueryable<Entity.Teachers.TeacherDailyAttendence> selectedDailyattendance = _teacherDailyAttendenceRepository.GetAll(check => check.AgencyID == teachersHoursRequest.AgencyID
                && !check.IsDeleted && (fromDate.Date <= Convert.ToDateTime(check.AttendanceDate.Date) && Convert.ToDateTime(check.AttendanceDate.Date) <= toDate.Date));

                allTeachersHours = (from dailyAttObj in selectedDailyattendance
                                    join teacherObj in selectedTeachers on dailyAttObj.TeacherID equals teacherObj.Id
                                    where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().TrimStart().TrimEnd().Contains(teacherName.ToUpper().TrimStart().TrimEnd()))
                                    select new ReportViewModel
                                    {
                                        TeacherName = teacherObj.TeacherName,
                                        TeacherID = teacherObj.Id,
                                        TeacherClockIN = dailyAttObj.ClockIn,
                                        ID = dailyAttObj.Id,
                                        TeacherClockOut = dailyAttObj.ClockOut,
                                        Email = teacherObj.Email
                                    }).OrderByDescending(p => p.ID).ToList();

                var getTeacherDetails = allTeachersHours.GroupBy(p => p.TeacherID).Select(p => p.First()).ToList();

                foreach (var item in getTeacherDetails)
                {
                    int TeacherHours = 0;
                    int TeacherMintues = 0;
                    int TeacherSecond = 0;

                    var allTeachersHoursdetails = (from dailyAttObj in selectedDailyattendance
                                                   join teacherObj in selectedTeachers on dailyAttObj.TeacherID equals teacherObj.Id
                                                   where dailyAttObj.TeacherID == item.TeacherID && dailyAttObj.ClockOut != DateTime.MinValue
                                                   && !dailyAttObj.IsDeleted && dailyAttObj.AgencyID == teachersHoursRequest.AgencyID
                                                   select new ReportViewModel
                                                   {
                                                       TeacherName = teacherObj.TeacherName,
                                                       TeacherID = teacherObj.Id,
                                                       TeacherClockIN = dailyAttObj.ClockIn,
                                                       ID = dailyAttObj.Id,
                                                       TeacherClockOut = dailyAttObj.ClockOut,
                                                       Email = teacherObj.Email
                                                   }).OrderByDescending(p => p.ID).ToList();

                    if (allTeachersHoursdetails.Count > 0)
                    {
                        foreach (var teachhr in allTeachersHoursdetails)
                        {
                            var ClockIN = Convert.ToDateTime(teachhr.TeacherClockIN).ToLocalTime();
                            var ClockOut = Convert.ToDateTime(teachhr.TeacherClockOut).ToLocalTime();

                            TimeSpan Hr = new TimeSpan();
                            Hr = ClockOut.Subtract(ClockIN);
                            TeacherHours += Hr.Hours;
                            TeacherMintues += Hr.Minutes;
                            TeacherSecond += Hr.Seconds;
                        }

                        int TeachTotalHours = 0;
                        int TeachTotalMintues = 0;
                        int TeachTotalSec = 0;

                        TeacherHours = Math.Abs(TeacherHours);
                        TeacherMintues = Math.Abs(TeacherMintues);
                        TeacherSecond = Math.Abs(TeacherSecond);

                        DateTime InHoursMinutesSec = new DateTime();
                        InHoursMinutesSec = InHoursMinutesSec.AddHours(TeacherHours);
                        InHoursMinutesSec = InHoursMinutesSec.AddMinutes(TeacherMintues);
                        InHoursMinutesSec = InHoursMinutesSec.AddSeconds(TeacherSecond);

                        if (TeacherMintues >= 60)
                        {
                            TimeSpan spWorkMin = TimeSpan.FromMinutes(TeacherMintues);

                            TeachTotalHours = TeacherHours + (int)spWorkMin.Hours;
                            TeachTotalMintues = spWorkMin.Minutes;

                            if (TeacherSecond >= 60)
                            {
                                TimeSpan spWorkSec = TimeSpan.FromSeconds(TeacherSecond);

                                TeachTotalMintues = TeachTotalMintues + (int)spWorkSec.Minutes;
                                TeachTotalSec = spWorkSec.Seconds;

                                item.TotalHoursInAgency = (string.Format("{0:00}", TeachTotalHours) + ":" + string.Format("{0:00}", TeachTotalMintues) + ":" + string.Format("{0:00}", TeachTotalSec));
                            }
                            else
                            {
                                item.TotalHoursInAgency = (string.Format("{0:00}", TeachTotalHours) + ":" + string.Format("{0:00}", TeachTotalMintues) + ":" + string.Format("{0:00}", TeacherSecond));
                            }
                        }
                        else
                        {
                            item.TotalHoursInAgency = (string.Format("{0:00}", TeacherHours) + ":" + string.Format("{0:00}", TeacherMintues) + ":" + string.Format("{0:00}", TeacherSecond));
                        }
                    }
                    else
                    {
                        item.TotalHoursInAgency = ("00" + ":" + "00" + ":" + "00");
                    }
                }

                res.Data = getTeacherDetails;

                int TeacherTotalHours = 0;
                int TeacherTotalMintues = 0;
                int TeacherTotalSecond = 0;

                foreach (var items in getTeacherDetails)
                {
                    var parts = items.TotalHoursInAgency.Split(':');
                    int Hours = int.Parse(parts[0]);
                    int Minutes = int.Parse(parts[1]);
                    int Second = int.Parse(parts[2]);

                    TeacherTotalHours += Hours;
                    TeacherTotalMintues += Minutes;
                    TeacherTotalSecond += Second;
                }

                if (TeacherTotalMintues >= 60)
                {
                    TimeSpan spWorkMin = TimeSpan.FromMinutes(TeacherTotalMintues);

                    TeacherTotalHours = TeacherTotalHours + (int)spWorkMin.Hours;
                    TeacherTotalMintues = spWorkMin.Minutes;
                }

                if (TeacherTotalSecond >= 60)
                {
                    TimeSpan spWorkSec = TimeSpan.FromSeconds(TeacherTotalSecond);

                    TeacherTotalMintues = TeacherTotalMintues + (int)spWorkSec.Minutes;
                    TeacherTotalSecond = spWorkSec.Seconds;
                }

                res.TotalHours = (string.Format("{0:00}", TeacherTotalHours) + ":" + string.Format("{0:00}", TeacherTotalMintues) + ":" + string.Format("{0:00}", TeacherTotalSecond));
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Teacher total hours fetched successfully!";
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


        public ResponseViewModal PDFTeacherHoursReport(ReportViewModel teachersHoursRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                TimeSpan time = new TimeSpan(0, 23, 55, 0);
                var isTeacherNameEmpty = string.IsNullOrEmpty(teachersHoursRequest.TeacherName);

                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = teachersHoursRequest.FromDate;
                var toDate = teachersHoursRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }
                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }

                string teacherName = teachersHoursRequest.TeacherName.TrimStart();
                teacherName = teacherName.TrimEnd();

                List<ReportViewModel> allTeachersHours = new List<ReportViewModel>();
                List<ReportViewModel> resposeForPdf = new List<ReportViewModel>();
                IQueryable<Entity.Teachers.TeacherInfo> selectedTeachers = _teacherInfoRepository.GetAll(check => check.AgencyID == teachersHoursRequest.AgencyID);

                IQueryable<Entity.Teachers.TeacherDailyAttendence> selectedDailyattendance = _teacherDailyAttendenceRepository.GetAll(check => check.AgencyID == teachersHoursRequest.AgencyID
                                                        && (fromDate.Date <= check.AttendanceDate && check.AttendanceDate <= toDate.Date) && !check.IsDeleted);

                allTeachersHours = (from dailyAttObj in selectedDailyattendance
                                    join teacherObj in selectedTeachers on dailyAttObj.TeacherID equals teacherObj.Id
                                    where (isTeacherNameEmpty || teacherObj.TeacherName.ToUpper().Contains(teacherName.ToUpper()))
                                    select new ReportViewModel
                                    {
                                        TeacherName = teacherObj.TeacherName,
                                        TeacherID = teacherObj.Id,
                                        TeacherClockIN = dailyAttObj.ClockIn,
                                        ID = dailyAttObj.Id,
                                        TeacherClockOut = dailyAttObj.ClockOut,
                                        Email = teacherObj.Email
                                    }).OrderByDescending(p => p.ID).ToList();

                var getTeacherDetails = allTeachersHours.GroupBy(p => p.TeacherID).Select(p => p.First()).ToList();

                foreach (var item in getTeacherDetails)
                {
                    int TeacherHours = 0;
                    int TeacherMintues = 0;
                    int TeacherSecond = 0;

                    var allTeachersHoursdetails = (from dailyAttObj in selectedDailyattendance
                                                   join teacherObj in selectedTeachers on dailyAttObj.TeacherID equals teacherObj.Id
                                                   where dailyAttObj.TeacherID == item.TeacherID && dailyAttObj.ClockOut != DateTime.MinValue
                                                   && !dailyAttObj.IsDeleted && dailyAttObj.AgencyID == teachersHoursRequest.AgencyID
                                                   select new ReportViewModel
                                                   {
                                                       TeacherName = teacherObj.TeacherName,
                                                       TeacherID = teacherObj.Id,
                                                       TeacherClockIN = dailyAttObj.ClockIn,
                                                       ID = dailyAttObj.Id,
                                                       TeacherClockOut = dailyAttObj.ClockOut,
                                                       Email = teacherObj.Email
                                                   }).OrderByDescending(p => p.ID).ToList();

                    if (allTeachersHoursdetails.Count > 0)
                    {
                        foreach (var teachhr in allTeachersHoursdetails)
                        {
                            var ClockIN = Convert.ToDateTime(teachhr.TeacherClockIN).ToLocalTime();
                            var ClockOut = Convert.ToDateTime(teachhr.TeacherClockOut).ToLocalTime();

                            TimeSpan Hr = new TimeSpan();
                            Hr = ClockOut.Subtract(ClockIN);
                            TeacherHours += Hr.Hours;
                            TeacherMintues += Hr.Minutes;
                            TeacherSecond += Hr.Seconds;
                        }

                        int TeachTotalHours = 0;
                        int TeachTotalMintues = 0;
                        int TeachTotalSec = 0;

                        DateTime InHoursMinutesSec = new DateTime();
                        InHoursMinutesSec = InHoursMinutesSec.AddHours(TeacherHours);
                        InHoursMinutesSec = InHoursMinutesSec.AddMinutes(TeacherMintues);
                        InHoursMinutesSec = InHoursMinutesSec.AddSeconds(TeacherSecond);

                        if (TeacherMintues >= 60)
                        {
                            TimeSpan spWorkMin = TimeSpan.FromMinutes(TeacherMintues);

                            TeachTotalHours = TeacherHours + (int)spWorkMin.Hours;
                            TeachTotalMintues = spWorkMin.Minutes;

                            if (TeacherSecond >= 60)
                            {
                                TimeSpan spWorkSec = TimeSpan.FromSeconds(TeacherSecond);

                                TeachTotalMintues = TeachTotalMintues + (int)spWorkSec.Minutes;
                                TeachTotalSec = spWorkSec.Seconds;

                                item.TotalHoursInAgency = (string.Format("{0:00}", TeachTotalHours) + ":" + string.Format("{0:00}", TeachTotalMintues) + ":" + string.Format("{0:00}", TeachTotalSec));

                            }
                            else
                            {
                                item.TotalHoursInAgency = (string.Format("{0:00}", TeachTotalHours) + ":" + string.Format("{0:00}", TeachTotalMintues) + ":" + string.Format("{0:00}", TeacherSecond));

                            }
                        }
                        else
                        {
                            item.TotalHoursInAgency = (string.Format("{0:00}", TeacherHours) + ":" + string.Format("{0:00}", TeacherMintues) + ":" + string.Format("{0:00}", TeacherSecond));

                        }
                    }
                    else
                    {
                        item.TotalHoursInAgency = ("00" + ":" + "00" + ":" + "00");
                    }
                }

                res.Data = getTeacherDetails;

                int TeacherTotalHours = 0;
                int TeacherTotalMintues = 0;
                int TeacherTotalSecond = 0;

                foreach (var items in getTeacherDetails)
                {
                    var parts = items.TotalHoursInAgency.Split(':');
                    int Hours = int.Parse(parts[0]);
                    int Minutes = int.Parse(parts[1]);
                    int Second = int.Parse(parts[2]);

                    TeacherTotalHours += Hours;
                    TeacherTotalMintues += Minutes;
                    TeacherTotalSecond += Second;
                }

                if (TeacherTotalMintues >= 60)
                {
                    TimeSpan spWorkMin = TimeSpan.FromMinutes(TeacherTotalMintues);

                    TeacherTotalHours = TeacherTotalHours + (int)spWorkMin.Hours;
                    TeacherTotalMintues = spWorkMin.Minutes;
                }

                if (TeacherTotalSecond >= 60)
                {
                    TimeSpan spWorkSec = TimeSpan.FromSeconds(TeacherTotalSecond);

                    TeacherTotalMintues = TeacherTotalMintues + (int)spWorkSec.Minutes;
                    TeacherTotalSecond = spWorkSec.Seconds;
                }

                res.TotalHours = (TeacherTotalHours + ":" + TeacherTotalMintues + ":" + TeacherTotalSecond);

                string totalHours = (string.Format("{0:00}", TeacherTotalHours) + ":" + string.Format("{0:00}", TeacherTotalMintues) + ":" + string.Format("{0:00}", TeacherTotalSecond));

                StringBuilder sb = new StringBuilder();
                if (getTeacherDetails != null && getTeacherDetails.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<h1 style='margin-bottom: 25px;'>Teacher Attended Hours Report</h1>");
                    if (totalHours.ToString() == "00:00:00")
                    {
                        sb.Append("<h3><b>Total Hours :</b>" + totalHours.ToString() + "</h3>");
                    }
                    else
                    {
                        string hrs = totalHours;
                        sb.Append("<h3>Total Hours " + hrs.ToString() + "</h3>");
                    }

                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>Teacher Name</strong></th>");
                    sb.Append("<th><strong>Email </strong></th>");
                    sb.Append("<th><strong>Total Hours</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in getTeacherDetails)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + item.TeacherName.ToString() + "</td>");
                        sb.Append("<td>" + item.Email.ToString() + "</td>");

                        if (item.TotalHoursInAgency.ToString() == "00:00:00")
                        {
                            sb.Append("<td>" + item.TotalHoursInAgency.ToString() + "</td>");
                        }
                        else
                        {
                            string hrs = item.TotalHoursInAgency.ToString();
                            sb.Append("<td>" + hrs + "</td>");
                        }
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "TeacherHoursReport_report_" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Teacher Spend Hours list has been feteched";
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


        public ResponseViewModal GetMealServeTodayPDF(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getDailySheetMobileRequest.AgencyID > 0)
                {
                    int month = getDailySheetMobileRequest.Month;
                    int year = getDailySheetMobileRequest.Year;
                    string classname = "";

                    DateTime firstDayOfMonth = new DateTime(year, month, 1);
                    DateTime lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddSeconds(-1);

                    IQueryable<Entity.Agency.ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(Check => Check.ClassEnrollStartDate.Date <= getDailySheetMobileRequest.AskedDate.Date && Check.ClassEnrollEndDate.Value.Date >= getDailySheetMobileRequest.AskedDate.Date
                    && Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    IQueryable<Student> students = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    IQueryable<Entity.Agency.Classes> classes;

                    if (getDailySheetMobileRequest.ClassesIDReq == null)
                    {
                        classes = _classesRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);
                        classname = "All Class";
                    }
                    else
                    {
                        classes = _classesRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && Check.Id == getDailySheetMobileRequest.ClassesIDReq && !Check.IsDeleted);

                        Classes ClassObj = null;
                        ClassObj = _classesRepository.Get(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && Check.Id == getDailySheetMobileRequest.ClassesIDReq && !Check.IsDeleted);
                        if (!(ReferenceEquals(ClassObj, null)))
                        {
                            classname = ClassObj.ClassName;
                        }
                    }

                    IQueryable<StudentActivities> selectedStudentActivities = _studentActivitiesRepository.GetAll().Where(filter => filter.ActivityRegisterDate.Date >= firstDayOfMonth.Date && filter.ActivityRegisterDate.Date <= lastDayOfMonth.Date
                     && !filter.IsDeleted && filter.ActivityTypeID == 3);

                    IQueryable<Entity.Masters.ActivityType> selectedActivityType = _activityTypeRepository.GetAll();

                    IQueryable<Entity.Agency.MealPlanner> mealplanner = _mealPlannerRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    IQueryable<StudentActivityMeal> studentActivityMeal = _studentActivityMealRepository.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);//3:"Meal"

                    List<StudentsDailyActivityViewModel> studentActivities = new List<StudentsDailyActivityViewModel>();

                    IQueryable<Entity.Masters.MealServeTimeDetails> mealServeTimeDetails = _mealServeTimeDetails.GetAll().Where(Check => Check.AgencyID == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    IQueryable<Entity.Masters.Agency> agencydetails = _agencyDetailsRepository.GetAll().Where(Check => Check.Id == getDailySheetMobileRequest.AgencyID && !Check.IsDeleted);

                    studentActivities = (from studentActivitiesObj in selectedStudentActivities
                                         join studentObj in students on studentActivitiesObj.StudentID equals studentObj.Id
                                         join classObj in classes on studentActivitiesObj.ClassesID equals classObj.Id
                                         join mealserveObj in mealServeTimeDetails on studentActivitiesObj.MealServeTimeDetailsID equals mealserveObj.Id
                                         join agencyObj in agencydetails on studentActivitiesObj.AgencyID equals agencyObj.Id
                                         where (studentActivitiesObj.ActivityTypeID == 3 && !studentActivitiesObj.IsDeleted)
                                         orderby studentActivitiesObj.ActivityRegisterDate descending
                                         select new StudentsDailyActivityViewModel
                                         {
                                             ActivityDate = studentActivitiesObj.ActivityRegisterDate,
                                             StudentID = studentObj.Id,
                                             StudentName = studentObj.StudentName ?? String.Empty,
                                             ClassID = classObj.Id,
                                             ClassName = classObj.ClassName,
                                             AgencyID = studentObj.AgencyID,
                                             StudentActivityID = studentActivitiesObj.Id,
                                             ActivityTypeID = studentActivitiesObj.ActivityTypeID,
                                             MealServeTimeDetailsID = studentActivitiesObj.MealServeTimeDetailsID,
                                             MealServeType = mealserveObj.MealServeType,
                                             AgencyAddress = agencyObj.Address,
                                             AgencyMobile = agencyObj.Mobile,
                                             AgencyEmailID = agencyObj.EmailId,
                                             AgencyName = agencyObj.AgencyName
                                         }).OrderBy(c => c.StudentName).Distinct().ToList();

                    var getStudentDetails = studentActivities.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();

                    if (getStudentDetails != null && getStudentDetails.Count > 0)
                    {
                        string studentmealdetail = string.Empty;

                        string ForDay1 = ""; string ForDay2 = ""; string ForDay3 = ""; string ForDay4 = ""; string ForDay5 = "";
                        string ForDay6 = ""; string ForDay7 = ""; string ForDay8 = ""; string ForDay9 = ""; string ForDay10 = "";
                        string ForDay11 = ""; string ForDay12 = ""; string ForDay13 = ""; string ForDay14 = ""; string ForDay15 = "";
                        string ForDay16 = ""; string ForDay17 = ""; string ForDay18 = ""; string ForDay19 = ""; string ForDay20 = "";
                        string ForDay21 = ""; string ForDay22 = ""; string ForDay23 = ""; string ForDay24 = ""; string ForDay25 = "";
                        string ForDay26 = ""; string ForDay27 = ""; string ForDay28 = ""; string ForDay29 = ""; string ForDay30 = "";
                        string ForDay31 = "";

                        foreach (var stdid in getStudentDetails)
                        {
                            var studentMealActivities = (from studentActivitiesObj in selectedStudentActivities
                                                         join studentObj in students on studentActivitiesObj.StudentID equals studentObj.Id
                                                         join classObj in classes on studentActivitiesObj.ClassesID equals classObj.Id
                                                         join mealserveObj in mealServeTimeDetails on studentActivitiesObj.MealServeTimeDetailsID equals mealserveObj.Id
                                                         join agencyObj in agencydetails on studentActivitiesObj.AgencyID equals agencyObj.Id
                                                         where (studentActivitiesObj.StudentID == stdid.StudentID && studentActivitiesObj.ActivityTypeID == 3 && !studentActivitiesObj.IsDeleted)
                                                         orderby studentActivitiesObj.ActivityRegisterDate descending
                                                         select new StudentsDailyActivityViewModel
                                                         {
                                                             ActivityDate = studentActivitiesObj.ActivityRegisterDate,
                                                             StudentID = studentObj.Id,
                                                             StudentName = studentObj.StudentName ?? String.Empty,
                                                             ClassID = classObj.Id,
                                                             ClassName = classObj.ClassName,
                                                             AgencyID = studentObj.AgencyID,
                                                             StudentActivityID = studentActivitiesObj.Id,
                                                             ActivityTypeID = studentActivitiesObj.ActivityTypeID,
                                                             MealServeTimeDetailsID = studentActivitiesObj.MealServeTimeDetailsID,
                                                             MealServeType = mealserveObj.MealServeType,
                                                             AgencyAddress = agencyObj.Address,
                                                             AgencyMobile = agencyObj.Mobile,
                                                             AgencyEmailID = agencyObj.EmailId,
                                                             AgencyName = agencyObj.AgencyName
                                                         }).OrderBy(c => c.ActivityDate).ToList();

                            string StudentName = studentMealActivities[0].StudentName.ToString();

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 1)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 1).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay1 =   //For 1
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                         " " + Mealtype + "<br>" +
                                      "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 1);
                                }
                                else
                                {
                                    ForDay1 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay1 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }


                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 2)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 2).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay2 =   //For 2
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                        " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 2);
                                }
                                else
                                {
                                    ForDay2 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay2 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 3)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 3).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay3 =   //For 3
                                      "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       " " + Mealtype + "<br>" +
                                      "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 3);
                                }
                                else
                                {
                                    ForDay3 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay3 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 4)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 4).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay4 =   //For 4
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 4);
                                }
                                else
                                {
                                    ForDay4 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay4 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 5)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 5).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay5 =   //For 5
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 5);
                                }
                                else
                                {
                                    ForDay5 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay5 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 6)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 6).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay6 =   //For 6
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 6);
                                }
                                else
                                {
                                    ForDay6 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay6 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 7)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 7).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay7 =   //For 7
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 7);
                                }
                                else
                                {
                                    ForDay7 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay7 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 8)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 8).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay8 =   //For 8
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 8);
                                }
                                else
                                {
                                    ForDay8 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay8 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }


                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 9)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 9).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay9 =   //For 9
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 9);
                                }
                                else
                                {
                                    ForDay9 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay9 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 10)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 10).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay10 =   //For 10
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                         " " + Mealtype + "<br>" +
                                      "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 10);
                                }
                                else
                                {
                                    ForDay10 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay10 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 11)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 11).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay11 =   //For 11
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 11);
                                }
                                else
                                {
                                    ForDay11 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay11 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 12 || studentMealActivities.Count == 0)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 12).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay12 =   //For 12
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 12);
                                }
                                else
                                {
                                    ForDay12 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay12 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 13)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 13).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay13 =   //For 13
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 13);
                                }
                                else
                                {
                                    ForDay13 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay13 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 14)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 14).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay14 =   //For 14
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 14);
                                }
                                else
                                {
                                    ForDay14 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay14 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 15)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 15).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay15 =   //For 15
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 15);
                                }
                                else
                                {
                                    ForDay15 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay15 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 16)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 16).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay16 =   //For 16
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 16);
                                }
                                else
                                {
                                    ForDay16 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay16 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 17)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 17).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay17 =   //For 17
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 17);
                                }
                                else
                                {
                                    ForDay17 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay17 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 18)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 18).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay18 =   //For 18
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 18);
                                }
                                else
                                {
                                    ForDay18 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay18 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 19)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 19).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay19 =   //For 19
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 19);
                                }
                                else
                                {
                                    ForDay19 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay19 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 20)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 20).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay20 =   //For 20
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 20);
                                }
                                else
                                {
                                    ForDay20 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay20 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 21)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 21).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay21 =   //For 21
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 21);
                                }
                                else
                                {
                                    ForDay21 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay21 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 22)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 22).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay22 =   //For 22
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 22);
                                }
                                else
                                {
                                    ForDay22 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay22 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 23)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 23).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay23 =   //For 23
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 23);
                                }
                                else
                                {
                                    ForDay23 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay23 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 24)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 24).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay24 =   //For 24
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 24);
                                }
                                else
                                {
                                    ForDay24 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay24 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 25)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 25).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay25 =   //For 25
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 25);
                                }
                                else
                                {
                                    ForDay25 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay25 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 26)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 26).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay26 =   //For 26
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 26);
                                }
                                else
                                {
                                    ForDay26 = "<td valign='top' align=' center'style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay26 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 27)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 27).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay27 =   //For 27
                                    "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                    " " + Mealtype + "<br>" +
                                    "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 27);
                                }
                                else
                                {
                                    ForDay27 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay27 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 28)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 28).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay28 =   //For 28
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 28);
                                }
                                else
                                {
                                    ForDay28 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay28 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 29)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 29).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay29 =   //For 29
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 29);
                                }
                                else
                                {
                                    ForDay29 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay29 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }

                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 30)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 30).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay30 =   //For 30
                                     "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 30);
                                }
                                else
                                {
                                    ForDay30 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay30 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }


                            if (studentMealActivities.Count > 0)
                            {
                                if (studentMealActivities[0].ActivityDate.Day == 31)
                                {
                                    var mealDetails = studentMealActivities.Where(p => p.ActivityDate.Day == 31).Select(p => p.MealServeType).ToArray();
                                    string Mealtype = string.Join("<br>", mealDetails);

                                    ForDay31 =   //For 31
                                     "<td valign='top' align='center'style='padding:5px;' class='border'>" +
                                     " " + Mealtype + "<br>" +
                                     "</td>";

                                    studentMealActivities.RemoveAll(s => s.ActivityDate.Day == 31);
                                }
                                else
                                {
                                    ForDay31 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                           "-" +
                                        "</td>";
                                }
                            }
                            else
                            {
                                ForDay31 = "<td valign='top' align='center' style='padding:5px;' class='border'>" +
                                       "-" +
                                    "</td>";
                            }


                            if (lastDayOfMonth.Day == 28)
                            {
                                studentmealdetail = studentmealdetail + "<tr>" +
                                "<td valign='middle' align='center' style='padding:5px;' class='border'>" +
                                 StudentName +
                                "</td>" + ForDay1 + ForDay2 + ForDay3 + ForDay4 + ForDay5 + ForDay6 + ForDay7 + ForDay8 + ForDay9 + ForDay10
                                        + ForDay11 + ForDay12 + ForDay13 + ForDay14 + ForDay15 + ForDay16 + ForDay17 + ForDay18 + ForDay19 + ForDay20
                                        + ForDay21 + ForDay22 + ForDay23 + ForDay24 + ForDay25 + ForDay26 + ForDay27 + ForDay28 + "</tr>";
                            }

                            if (lastDayOfMonth.Day == 30)
                            {
                                studentmealdetail = studentmealdetail + "<tr>" +
                                "<td valign='middle' align='center' style='padding:5px;' class='border'>" +
                                 StudentName +
                                "</td>" + ForDay1 + ForDay2 + ForDay3 + ForDay4 + ForDay5 + ForDay6 + ForDay7 + ForDay8 + ForDay9 + ForDay10
                                        + ForDay11 + ForDay12 + ForDay13 + ForDay14 + ForDay15 + ForDay16 + ForDay17 + ForDay18 + ForDay19 + ForDay20
                                        + ForDay21 + ForDay22 + ForDay23 + ForDay24 + ForDay25 + ForDay26 + ForDay27 + ForDay28 + ForDay29 + ForDay30
                                        + "</tr>";
                            }

                            if (lastDayOfMonth.Day == 31)
                            {
                                studentmealdetail = studentmealdetail + "<tr>" +
                                "<td valign='middle' align='center' style='padding:5px;' class='border'>" +
                                 StudentName +
                                "</td>" + ForDay1 + ForDay2 + ForDay3 + ForDay4 + ForDay5 + ForDay6 + ForDay7 + ForDay8 + ForDay9 + ForDay10
                                        + ForDay11 + ForDay12 + ForDay13 + ForDay14 + ForDay15 + ForDay16 + ForDay17 + ForDay18 + ForDay19 + ForDay20
                                        + ForDay21 + ForDay22 + ForDay23 + ForDay24 + ForDay25 + ForDay26 + ForDay27 + ForDay28 + ForDay29 + ForDay30
                                        + ForDay31 + "</tr>";
                            }

                        }

                        HtmlToPdf converter = new HtmlToPdf();
                        string _MealServeReport = System.IO.File.ReadAllText(_hostingEnvironment.WebRootPath + "/Template/MealServeReport.html");

                        List<DateTime> range = Enumerable.Range(0, (lastDayOfMonth - firstDayOfMonth).Days + 1).Select(i => firstDayOfMonth.AddDays(i)).ToList();

                        string dateDetails = string.Empty;

                        if (range.Count > 0)
                        {
                            foreach (var item in range)
                            {
                                dateDetails = dateDetails + "<th valign='top' align='center' style='padding:5px;' class='border'>" +
                                                  "" + item.Day + "" +
                                   "</th>";
                            }
                        }

                        _MealServeReport = _MealServeReport.Replace("{{agencyaddress}}", studentActivities[0].AgencyAddress);
                        _MealServeReport = _MealServeReport.Replace("{{agencymobile}}", studentActivities[0].AgencyMobile.ToString());
                        _MealServeReport = _MealServeReport.Replace("{{agencyemailid}}", studentActivities[0].AgencyEmailID);
                        _MealServeReport = _MealServeReport.Replace("{{agencyname}}", studentActivities[0].AgencyName);

                        var Datetime = new DateTime(getDailySheetMobileRequest.Year, getDailySheetMobileRequest.Month, getDailySheetMobileRequest.AskedDate.Day);

                        _MealServeReport = _MealServeReport.Replace("{{MonthYear}}", Datetime.ToString("MMMM yyyy"));

                        _MealServeReport = _MealServeReport.Replace("{{currentDate}}", DateTime.Now.Date.ToString("dd/MM/yyyy"));

                        _MealServeReport = _MealServeReport.Replace("{{dateDetails}}", dateDetails);
                        _MealServeReport = _MealServeReport.Replace("{{studentmealdetail}}", studentmealdetail);

                        _MealServeReport = _MealServeReport.Replace("{{class}}", classname);

                        int totalstudent = getStudentDetails.Count;

                        _MealServeReport = _MealServeReport.Replace("{{totalstudent}}", totalstudent.ToString());

                        SelectPdf.PdfDocument doc = converter.ConvertHtmlString(_MealServeReport);

                        // save pdf document 
                        byte[] pdf = doc.Save();
                        // close pdf document 
                        doc.Close();

                        Guid guid = Guid.NewGuid();

                        string _fileName = "MealServeReport_Report-" + guid + ".pdf";
                        // return resulted pdf document 
                        FileResult fileResult = new FileContentResult(pdf, "application/pdf");
                        fileResult.FileDownloadName = _fileName;
                        string webRootPath = Directory.GetCurrentDirectory();

                        string DirectoryUrl = _hostingEnvironment.WebRootPath + "\\DownloadPdfFiles\\";

                        //if (!Directory.Exists(webRootPath + DirectoryUrl))
                        //{
                        //    Directory.CreateDirectory(webRootPath + DirectoryUrl);
                        //}

                        string path = DirectoryUrl;
                        File.WriteAllBytes(Path.Combine(path, _fileName), pdf);

                        var filepath = _fileName;
                        var FileName = "/DownloadPdfFiles/" + _fileName;
                        res.FilePath = filepath;
                        res.FileName = FileName;
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Meal Serve Details has been feteched";
                    }
                    else
                    {
                        res.StatusCode = 987;
                        res.Message = "No Data found.";
                        res.IsSuccess = true;
                    }
                }
            }
            catch (Exception ex)
            {
                //========Add Error Log Deatils =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getDailySheetMobileRequest.AgencyID);
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


        private List<StudentImmunizationViewModel> GetAllStudentImmunization(StudentViewModel getFamilyDetailsRequest)
        {
            List<StudentImmunizationViewModel> studentImmunizations = new List<StudentImmunizationViewModel>();
            try
            {
                studentImmunizations = (from studentImmunizationObj in _studentImmunizationRepository.GetAll()
                                        join immunizationObj in _immunizationRepository.GetAll() on studentImmunizationObj.ImmunizationID equals immunizationObj.Id
                                        where (!studentImmunizationObj.IsDeleted && studentImmunizationObj.StudentID == getFamilyDetailsRequest.StudentId)
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
            }
            catch (Exception ex)
            {

            }
            return studentImmunizations;
        }

        private List<StudentMedicationViewModel> GetAllStudentMedication(StudentViewModel getFamilyDetailsRequest)
        {
            List<StudentMedicationViewModel> allStudentMedications = new List<StudentMedicationViewModel>();
            try
            {
                IQueryable<Entity.Student.StudentMedication> studentMedications = _studentMedicationRepository.GetAll().Where(check => check.AgencyID == getFamilyDetailsRequest.AgencyID);
                IQueryable<Entity.Masters.DoseRepeat> doseRepeats = _doseRepeatRepository.GetAll();
                allStudentMedications = (from studentMedicationObj in studentMedications
                                         join doseRepeatObj in doseRepeats on studentMedicationObj.DoseRepeatID equals doseRepeatObj.Id
                                         where (!studentMedicationObj.IsDeleted && studentMedicationObj.StudentID == getFamilyDetailsRequest.StudentId)
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
            }
            catch (Exception ex)
            {

            }
            return allStudentMedications;
        }

        private List<StudentAllergiesViewModel> GetAllStudentAllergies(StudentViewModel getFamilyDetailsRequest)
        {
            List<StudentAllergiesViewModel> studentAllergies = new List<StudentAllergiesViewModel>();
            try
            {
                studentAllergies = (from studentAllergiesObj in _studentAllergiesRepository.GetAll()
                                    join allergyNameObj in _allergyNameRepository.GetAll() on studentAllergiesObj.AllergyNameID equals allergyNameObj.Id
                                    join allergyReactionTypeObj in _allergyReactionTypeRepository.GetAll() on studentAllergiesObj.AllergyReactionTypeID equals allergyReactionTypeObj.Id
                                    join allergyTypeObj in _allergyTypeRepository.GetAll() on studentAllergiesObj.AllergyTypeID equals allergyTypeObj.Id
                                    where (!studentAllergiesObj.IsDeleted && studentAllergiesObj.StudentID == getFamilyDetailsRequest.StudentId)
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
            }
            catch (Exception ex)
            {

            }
            return studentAllergies;
        }

        private List<StudentDisabilitiesViewModel> GetAllStudentDisabilities(StudentViewModel getFamilyDetailsRequest)
        {
            List<StudentDisabilitiesViewModel> studentDisabilities = new List<StudentDisabilitiesViewModel>();
            try
            {
                studentDisabilities = (from studentDisabilitiesObj in _studentDisabilitiesRepository.GetAll()
                                       where (!studentDisabilitiesObj.IsDeleted && studentDisabilitiesObj.StudentID == getFamilyDetailsRequest.StudentId)
                                       select new StudentDisabilitiesViewModel()
                                       {
                                           Id = studentDisabilitiesObj.Id,
                                           StudentID = studentDisabilitiesObj.StudentID,
                                           Description = studentDisabilitiesObj.Description ?? String.Empty,
                                           AgencyID = studentDisabilitiesObj.AgencyID
                                       }).OrderBy(c => c.Description).ToList();
            }
            catch (Exception ex)
            {

            }
            return studentDisabilities;
        }

        public ResponseViewModal GetFamilyDetailsReportByStudentID(StudentViewModel getFamilyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StudentViewModel> studentdetails = new List<StudentViewModel>();

                IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(Check => Check.Id == getFamilyDetailsRequest.StudentId && Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(check => !check.IsDeleted);
                IQueryable<Entity.Masters.Gender> selectedGenders = _genderRepository.GetAll().Where(check => !check.IsDeleted);
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(check => !check.IsDeleted);
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(check => !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getFamilyDetailsRequest.AgencyID && check.EnrollmentStatus == 2);
                IQueryable<Entity.Masters.Agency> agencydetails = _agencyDetailsRepository.GetAll().Where(Check => Check.Id == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Agency.Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getFamilyDetailsRequest.AgencyID && !check.IsDeleted);

                IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();


                studentdetails = (from studentObj in selectedStudents

                                  join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                  into classEnrollments
                                  from classEnrollmentsObj in classEnrollments.DefaultIfEmpty()

                                  join cityObj in selectedCity on studentObj.CityId equals cityObj.Id into InfoCity
                                  from InfoCityObj in InfoCity.DefaultIfEmpty()

                                  join genderObj in selectedGenders on studentObj.GenderID equals genderObj.Id into InfoGender
                                  from InfoGenderObj in InfoGender.DefaultIfEmpty()

                                  join stateObj in selectedState on studentObj.StateId equals stateObj.Id into InfoState
                                  from InfoStateObj in InfoState.DefaultIfEmpty()

                                  join countryObj in selectedCountry on studentObj.CountryId equals countryObj.Id into InfoCountry
                                  from InfoCountryObj in InfoCountry.DefaultIfEmpty()

                                  join classObj in selectedClass on classEnrollmentsObj.ClassesID equals classObj.Id
                                  into classes
                                  from classesObj in classes.DefaultIfEmpty()

                                  join agencyObj in agencydetails on studentObj.AgencyID equals agencyObj.Id

                                  where (studentObj.Id == getFamilyDetailsRequest.StudentId && !studentObj.IsDeleted)
                                  select new StudentViewModel()
                                  {
                                      StudentId = studentObj.Id,
                                      StudentName = studentObj.StudentName ?? "NA",
                                      AgencyID = studentObj.AgencyID,
                                      ParentID = studentObj.ParentID,
                                      FirstName = studentObj.FirstName ?? "NA",
                                      LastName = studentObj.LastName ?? "NA",
                                      GenderName = InfoGenderObj.GenderName ?? "NA",
                                      Address = studentObj.Address ?? "NA",
                                      CountryName = InfoCountryObj.CountryName ?? "NA",
                                      StateName = InfoStateObj.StateName ?? "NA",
                                      CityName = InfoCityObj.CityName ?? "NA",
                                      PostalCode = studentObj.PostalCode ?? "NA",
                                      SchoolName = studentObj.SchoolName ?? "NA",
                                      DateofBirth = studentObj.DateOfBirth,
                                      InsuranceCarrier = studentObj.InsuranceCarrier ?? "NA",
                                      InsurancePolicyNumber = studentObj.InsurancePolicyNumber ?? "NA",
                                      PhysicianName = studentObj.PhysicianName ?? "NA",
                                      PreferredHospital = studentObj.PreferredHospital ?? "NA",
                                      PhysicianContactNumber = studentObj.PhysicianContactNumber,
                                      ClassName = classesObj.ClassName ?? "NA",

                                      AgencyAddress = agencyObj.Address,
                                      AgencyMobile = agencyObj.Mobile,
                                      AgencyEmailID = agencyObj.EmailId,
                                      AgencyName = agencyObj.AgencyName,
                                      StudentAddress = studentObj.Address ?? "NA",
                                      StudentContactNumber = studentObj.ChildsContactNumber,

                                      StudentAllergies = GetAllStudentAllergies(getFamilyDetailsRequest),
                                      StudentImmunizations = GetAllStudentImmunization(getFamilyDetailsRequest),
                                      StudentMedications = GetAllStudentMedication(getFamilyDetailsRequest),
                                      StudentDisabilities = GetAllStudentDisabilities(getFamilyDetailsRequest)
                                  }).OrderBy(c => c.StudentName).Distinct().ToList();

                var result = studentdetails.GroupBy(p => p.StudentId).Select(p => p.First()).ToList();

                //to add class names
                foreach (var r in result)
                {
                    var clasess = studentdetails.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassName).ToArray();
                    r.ClassName = string.Join(",", clasess);
                }

                res.Data = result;

                IQueryable<Entity.Parent.ParentStudentMapping> parentstudentmapping = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == result[0].AgencyID && Check.StudentID == result[0].StudentId && Check.IsParent == true && !Check.IsDeleted);

                IQueryable<Entity.Masters.RelationType> relationtype = _relationTypeRepository.GetAll();

                var PrimaryParent = (from parentObj in parentstudentmapping
                                     where (parentObj.ParentID == result[0].ParentID)
                                     select new StudentViewModel()
                                     {
                                         ParentID = parentObj.ParentID
                                     }).FirstOrDefault();

                // Get Info For Primary Parent
                StudentViewModel primaryparentInformation = new StudentViewModel();

                primaryparentInformation = (from parentObj in selectedParent
                                            join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id into parentInfoCountry
                                            from parentInfoCountryObj in parentInfoCountry.DefaultIfEmpty()

                                            join cityObj in selectedCity on parentObj.CityId equals cityObj.Id into parentInfoCity
                                            from parentInfoCityobj in parentInfoCity.DefaultIfEmpty()

                                            join genderObj in selectedGenders on parentObj.GenderID equals genderObj.Id into parentCityGender
                                            from parentCityGenderObj in parentCityGender.DefaultIfEmpty()

                                            join stateObj in selectedState on parentObj.StateId equals stateObj.Id into parentState
                                            from parentStateObj in parentState.DefaultIfEmpty()

                                            join relationObj in relationtype on parentObj.RelationTypeId equals relationObj.Id
                                            into relations
                                            from relationsObj in relations.DefaultIfEmpty()

                                            where (parentObj.Id == PrimaryParent.ParentID)
                                            select new StudentViewModel()
                                            {
                                                Id = parentObj.Id,
                                                ParentName = parentObj.ParentName ?? "NA",
                                                Address = parentObj.Address ?? "NA",
                                                CountryName = parentInfoCountryObj.CountryName ?? "NA",
                                                StateName = parentStateObj.StateName ?? "NA",
                                                CityName = parentInfoCityobj.CityName ?? "NA",
                                                PostalCode = parentObj.PostalCode ?? "NA",
                                                ParentAddress = parentObj.Address ?? "NA",
                                                ParentEmailAddress = parentObj.EmailId ?? "NA",
                                                PrimaryParentMobile = parentObj.Mobile,
                                                GenderName = parentCityGenderObj.GenderName ?? "NA",
                                                DateOfBirth = parentObj.DateOfBirth,
                                                ParentProfession = parentObj.Profession ?? "NA",
                                                EmployerName = parentObj.EmployerName ?? "NA",
                                                EmployerNumber = parentObj.EmployerNumber,
                                                RelationName = relationsObj.RelationTypeName ?? "NA"
                                            }).OrderBy(c => c.ParentName).FirstOrDefault();


                HtmlToPdf converter = new HtmlToPdf();
                string _FamilyDetailsReport = System.IO.File.ReadAllText(_hostingEnvironment.WebRootPath + "/Template/FamilyDetails.html");
                string paymentDetails = string.Empty;

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{agencyaddress}}", result[0].AgencyAddress);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{agencymobile}}", result[0].AgencyMobile.ToString());
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{agencyemailid}}", result[0].AgencyEmailID);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{agencyname}}", result[0].AgencyName);

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{currentDate}}", DateTime.Now.Date.ToLongDateString());
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentname}}", result[0].StudentName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentdob}}", result[0].DateofBirth.ToString("dd/MM/yyyy"));
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentaddress}}", result[0].StudentAddress);

                if (result[0].StudentContactNumber == 0)
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentcontactnumber}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentcontactnumber}}", result[0].StudentContactNumber.ToString());
                }

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentgender}}", result[0].GenderName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentclass}}", result[0].ClassName);

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentcountry}}", result[0].CountryName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentstate}}", result[0].StateName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentcity}}", result[0].CityName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentzipcode}}", result[0].PostalCode);

                // ======= Primary Parent Details   =============//

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentname}}", primaryparentInformation.ParentName);

                if (primaryparentInformation.PrimaryParentMobile == 0)
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentmobile}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentmobile}}", primaryparentInformation.PrimaryParentMobile.ToString());
                }

                if (primaryparentInformation.EmployerNumber == 0)
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentemployernumber}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentemployernumber}}", primaryparentInformation.EmployerNumber.ToString());
                }

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentemail}}", primaryparentInformation.ParentEmailAddress);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentaddress}}", primaryparentInformation.ParentAddress);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentcountry}}", primaryparentInformation.CountryName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentstate}}", primaryparentInformation.StateName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentcity}}", primaryparentInformation.CityName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentzipcode}}", primaryparentInformation.PostalCode);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentdob}}", primaryparentInformation.DateOfBirth.ToString("dd/MM/yyyy"));
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentprofession}}", primaryparentInformation.ParentProfession);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentgender}}", primaryparentInformation.GenderName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentemployername}}", primaryparentInformation.EmployerName);
                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{primaryparentrelwithstd}}", primaryparentInformation.RelationName);


                // Get Info For Secodary Parent
                List<StudentViewModel> secondaryparentInformation = new List<StudentViewModel>();

                string secondaryparentdetails = string.Empty;

                IQueryable<Entity.Parent.ParentStudentMapping> mappingCollection = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == getFamilyDetailsRequest.AgencyID && !Check.IsDeleted);

                secondaryparentInformation = (from mapObj in mappingCollection
                                              join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                                              join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id into parentInfoCountry
                                              from parentInfoCountryObj in parentInfoCountry.DefaultIfEmpty()

                                              join cityObj in selectedCity on parentObj.CityId equals cityObj.Id into parentInfoCity
                                              from parentInfoCityobj in parentInfoCity.DefaultIfEmpty()

                                              join genderObj in selectedGenders on parentObj.GenderID equals genderObj.Id into parentCityGender
                                              from parentCityGenderObj in parentCityGender.DefaultIfEmpty()

                                              join stateObj in selectedState on parentObj.StateId equals stateObj.Id into parentState
                                              from parentStateObj in parentState.DefaultIfEmpty()

                                              join relationObj in relationtype on parentObj.RelationTypeId equals relationObj.Id into parentrelation
                                              from parentrelationObj in parentrelation.DefaultIfEmpty()

                                              where mapObj.IsSecondaryParent == true && mapObj.StudentID == getFamilyDetailsRequest.StudentId && !parentObj.IsDeleted
                                              select new StudentViewModel()
                                              {
                                                  Id = parentObj.Id,
                                                  ParentName = parentObj.ParentName ?? "NA",
                                                  Address = parentObj.Address ?? "NA",
                                                  CountryName = parentInfoCountryObj.CountryName ?? "NA",
                                                  StateName = parentStateObj.StateName ?? "NA",
                                                  CityName = parentInfoCityobj.CityName ?? "NA",
                                                  PostalCode = parentObj.PostalCode ?? "NA",
                                                  ParentAddress = parentObj.Address ?? "NA",
                                                  ParentEmailAddress = parentObj.EmailId ?? "NA",
                                                  PrimaryParentMobile = parentObj.Mobile,
                                                  GenderName = parentCityGenderObj.GenderName ?? "NA",
                                                  DateOfBirth = parentObj.DateOfBirth,
                                                  ParentProfession = parentObj.Profession ?? "NA",
                                                  EmployerName = parentObj.EmployerName ?? "NA",
                                                  EmployerNumber = parentObj.EmployerNumber,
                                                  RelationName = parentrelationObj.RelationTypeName ?? "NA"
                                              }).OrderBy(c => c.ParentName).ToList();

                if (secondaryparentInformation.Count > 0)
                {
                    foreach (var item in secondaryparentInformation)
                    {
                        string mobile = "";
                        if (item.PrimaryParentMobile == 0)
                        {
                            mobile = "NA";
                        }
                        else
                        {
                            mobile = item.PrimaryParentMobile.ToString();
                        }

                        string EmployeeNumber = "";
                        if (item.EmployerNumber == 0)
                        {
                            EmployeeNumber = "NA";
                        }
                        else
                        {
                            EmployeeNumber = item.EmployerNumber.ToString();
                        }

                        secondaryparentdetails = secondaryparentdetails + "<table width='100%' border='1px' cellspacing='0' cellpadding='0'>" +
                           "<tr>" +

                          "<td style='padding:10px;'>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'>" +
                          "<tr>" +
                          "<td colspan='2' align='center'><strong> SECONDARY PARENT DETAILS</strong ></td> " +
                          "</tr>" +
                          "<tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Parent Name : </span><span>" + item.ParentName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Mobile : </span><span>" + mobile + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width: 100%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Email Address : </span><span>" + item.ParentEmailAddress + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:100%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Address : </span><span>" + item.ParentAddress + "</td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Country : </span><span>" + item.CountryName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> State : </span><span>" + item.StateName + "</span></td> " +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> City : </span><span>" + item.CityName + "</span ></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Zip Code : </span><span>" + item.PostalCode + "</span ></td> " +
                          "</tr></table>" +

                          "<table width='100%' border='0; cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> DOB : </span><span>" + item.DateOfBirth.ToString("dd/MM/yyyy") + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Profession : </span><span>" + item.ParentProfession + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Gender : </span><span>" + item.GenderName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Employer Name : </span><span>" + item.EmployerName + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0'; cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Employer Number : </span><span>" + EmployeeNumber + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Relation With Student : </span><span>" + item.RelationName + "</span></td>" +
                          "</tr></table>" +

                          "</td>" +

                          "</tr>" +

                         "</table>";
                    }
                }

                // Get Info For Guardian Parent
                List<StudentViewModel> guardianparentInformation = new List<StudentViewModel>();

                string guardianparentdetails = string.Empty;

                guardianparentInformation = (from mapObj in mappingCollection
                                             join parentObj in selectedParent on mapObj.ParentID equals parentObj.Id
                                             join countryObj in selectedCountry on parentObj.CountryId equals countryObj.Id into parentInfoCountry
                                             from parentInfoCountryObj in parentInfoCountry.DefaultIfEmpty()

                                             join cityObj in selectedCity on parentObj.CityId equals cityObj.Id into parentInfoCity
                                             from parentInfoCityobj in parentInfoCity.DefaultIfEmpty()

                                             join genderObj in selectedGenders on parentObj.GenderID equals genderObj.Id into parentCityGender
                                             from parentCityGenderObj in parentCityGender.DefaultIfEmpty()

                                             join stateObj in selectedState on parentObj.StateId equals stateObj.Id into parentState
                                             from parentStateObj in parentState.DefaultIfEmpty()

                                             join relationObj in relationtype on parentObj.RelationTypeId equals relationObj.Id into parentrelation
                                             from parentrelationObj in parentrelation.DefaultIfEmpty()

                                             where mapObj.IsGaurdian == true && mapObj.StudentID == getFamilyDetailsRequest.StudentId && !parentObj.IsDeleted
                                             select new StudentViewModel()
                                             {
                                                 Id = parentObj.Id,
                                                 ParentName = parentObj.ParentName ?? "NA",
                                                 Address = parentObj.Address ?? "NA",
                                                 CountryName = parentInfoCountryObj.CountryName ?? "NA",
                                                 StateName = parentStateObj.StateName ?? "NA",
                                                 CityName = parentInfoCityobj.CityName ?? "NA",
                                                 PostalCode = parentObj.PostalCode ?? "NA",
                                                 ParentAddress = parentObj.Address ?? "NA",
                                                 ParentEmailAddress = parentObj.EmailId ?? "NA",
                                                 PrimaryParentMobile = parentObj.Mobile,
                                                 GenderName = parentCityGenderObj.GenderName ?? "NA",
                                                 DateOfBirth = parentObj.DateOfBirth,
                                                 ParentProfession = parentObj.Profession ?? "NA",
                                                 EmployerName = parentObj.EmployerName ?? "NA",
                                                 EmployerNumber = parentObj.EmployerNumber,
                                                 RelationName = parentrelationObj.RelationTypeName ?? "NA"
                                             }).OrderBy(c => c.ParentName).ToList();

                if (guardianparentInformation.Count > 0)
                {
                    foreach (var item in guardianparentInformation)
                    {
                        string mobile = "";
                        if (item.PrimaryParentMobile == 0)
                        {
                            mobile = "NA";
                        }
                        else
                        {
                            mobile = item.PrimaryParentMobile.ToString();
                        }

                        string EmployeeNumber = "";
                        if (item.EmployerNumber == 0)
                        {
                            EmployeeNumber = "NA";
                        }
                        else
                        {
                            EmployeeNumber = item.EmployerNumber.ToString();
                        }

                        guardianparentdetails = guardianparentdetails + "<table width='100%' border='1px' cellspacing='0' cellpadding='0'>" +
                           "<tr>" +

                          "<td style='padding:10px;'>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'>" +
                          "<tr>" +
                          "<td colspan='2' align='center'><strong> GUARDIAN PARENT DETAILS</strong ></td> " +
                          "</tr>" +
                          "<tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Parent Name : </span><span>" + item.ParentName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Mobile : </span><span>" + mobile + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width: 100%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Email Address: </span><span>" + item.ParentEmailAddress + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:100%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Address : </span><span>" + item.ParentAddress + "</td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Country : </span><span>" + item.CountryName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> State : </span><span>" + item.StateName + "</span></td> " +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> City : </span><span>" + item.CityName + "</span ></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Zip Code: </span><span>" + item.PostalCode + "</span ></td> " +
                          "</tr></table>" +

                          "<table width='100%' border='0; cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> DOB : </span><span>" + item.DateOfBirth.ToString("dd/MM/yyyy") + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Profession : </span><span>" + item.ParentProfession + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0' cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Gender : </span><span>" + item.GenderName + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Employer Name: </span><span>" + item.EmployerName + "</span></td>" +
                          "</tr></table>" +

                          "<table width='100%' border='0'; cellspacing='0' cellpadding='10'><tr>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Employer Number: </span><span>" + EmployeeNumber + "</span></td>" +
                          "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width:200px;float:left;'> Relation With Student : </span><span>" + item.RelationName + "</span></td>" +
                          "</tr></table>" +

                          "</td>" +

                          "</tr>" +

                         "</table>";
                    }
                }

                // Get Info For Auth Person
                List<StudentViewModel> authPersonInformation = new List<StudentViewModel>();

                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPerson = _authorizedPersonDetails.GetAll().Where(check => check.StudentID == getFamilyDetailsRequest.StudentId && !check.IsDeleted);

                string authPersondetails = string.Empty;

                authPersonInformation = (from apObj in authorizedPerson
                                         join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                         where apObj.StudentID == getFamilyDetailsRequest.StudentId && !apObj.IsDeleted
                                         select new StudentViewModel()
                                         {
                                             ParentName = apObj.AuthorizedPersonName ?? "NA",
                                             PrimaryParentMobile = apObj.Mobile,
                                             ParentEmail = apObj.EmailId ?? "NA",
                                             isAuthorisedToPickup = apObj.IsAuthorizedPickUp,
                                             QuickPin = apObj.QuickPin
                                         }).OrderBy(c => c.ParentName).ToList();

                var authPersonInformations = authPersonInformation.Where(x => x.AgencyID == x.AgencyID).GroupBy(s => s.QuickPin).Select(p => p.First()).ToList();

                if (authPersonInformations.Count > 0)
                {
                    foreach (var item in authPersonInformations)
                    {
                        string isAuthorisedToPickup = "";
                        if (item.isAuthorisedToPickup == true)
                        {
                            isAuthorisedToPickup = "Yes";
                        }
                        else
                        {
                            isAuthorisedToPickup = "No";
                        }

                        string mobile = "";
                        if (item.PrimaryParentMobile == 0)
                        {
                            mobile = "NA";
                        }
                        else
                        {
                            mobile = item.PrimaryParentMobile.ToString();
                        }

                        string ParentEmail = "";
                        if (item.ParentEmail == null || item.ParentEmail == "")
                        {
                            ParentEmail = "NA";
                        }
                        else
                        {
                            ParentEmail = item.ParentEmail;
                        }

                        authPersondetails = authPersondetails + "<table width='100%' border='1px' cellspacing='0' cellpadding='0'>" +
                      "<tr>" +
                      "<td style='padding:10px;'>" +
                      "<table width='100%' border='0' cellspacing='0' cellpadding='10'>" +
                      "<tr>" +
                      "<td colspan='2' align='center'><strong> AUTHORIZED PARENT DETAILS</strong ></td> " +
                      "</tr>" +
                      "<tr>" +
                      "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr>" +
                      "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width: 200px;float:left;'> Name : </span><span>" + item.ParentName + "</span></td>" +
                      "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width: 200px;float:left;'> Mobile : </span><span>" + mobile + "</span></td>" +
                      "</tr></table>" +
                      "<br>" +
                      "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr>" +
                      "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width: 200px;float:left;'> Email :</span><span>" + ParentEmail + "</span></td>" +
                      "<td style='width:50%;color:#333333;padding-bottom:0;'><span style='width: 200px;float:left;'> IsAuthorized PickUp : </span><span>" + isAuthorisedToPickup + " </span></td>" +
                      "</tr></table>" +

                      "</td>" +
                      "</tr>" +
                      "</table>";
                    }
                }


                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{secondaryparentdetails}}", secondaryparentdetails);

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{guardianparentdetails}}", guardianparentdetails);

                _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{authPersondetails}}", authPersondetails);

                if (result[0].PhysicianName == null || result[0].PhysicianName == "" || result[0].PhysicianName == "null")
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentPhysicianname}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentPhysicianname}}", result[0].PhysicianName);
                }

                if (result[0].PhysicianContactNumber == 0)
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentPhysiciancontact}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentPhysiciancontact}}", result[0].PhysicianContactNumber.ToString());
                }

                if (result[0].PreferredHospital == null || result[0].PreferredHospital == "" || result[0].PreferredHospital == "null")
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentHospital}}", "NA");
                }
                else
                {
                    _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentHospital}}", result[0].PreferredHospital);
                }

                if (result.Count > 0)
                {
                    var AllergyList = result[0].StudentAllergies.ToList();

                    if (AllergyList.Count > 0)
                    {
                        var allergyname = AllergyList.Where(p => p.StudentID == getFamilyDetailsRequest.StudentId).Select(p => p.AllergyTypeName).ToArray();
                        string allergynames = string.Join(",", allergyname);

                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentAllergies}}", allergynames);
                    }
                    else
                    {
                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentAllergies}}", "NA");
                    }

                    var ImmunizationList = result[0].StudentImmunizations.ToList();

                    if (ImmunizationList.Count > 0)
                    {
                        var immunizationname = ImmunizationList.Where(p => p.StudentID == getFamilyDetailsRequest.StudentId).Select(p => p.ImmunizationName).ToArray();
                        string immunizationnames = string.Join(",", immunizationname);

                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentImmunization}}", immunizationnames);
                    }
                    else
                    {
                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentImmunization}}", "NA");
                    }

                    var MedicationList = result[0].StudentMedications.ToList();

                    if (MedicationList.Count > 0)
                    {
                        var medication = MedicationList.Where(p => p.StudentID == getFamilyDetailsRequest.StudentId).Select(p => p.MedicationName).ToArray();
                        string medications = string.Join(",", medication);

                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentmedication}}", medications);
                    }
                    else
                    {
                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentmedication}}", "NA");
                    }

                    var DisabilityList = result[0].StudentDisabilities.ToList();

                    if (DisabilityList.Count > 0)
                    {
                        var disability = DisabilityList.Where(p => p.StudentID == getFamilyDetailsRequest.StudentId).Select(p => p.Description).ToArray();
                        string disabilitys = string.Join(",", disability);

                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentdisability}}", disabilitys);
                    }
                    else
                    {
                        _FamilyDetailsReport = _FamilyDetailsReport.Replace("{{studentdisability}}", "NA");
                    }

                }

                SelectPdf.PdfDocument doc = converter.ConvertHtmlString(_FamilyDetailsReport);

                // save pdf document 
                byte[] pdf = doc.Save();
                // close pdf document 
                doc.Close();

                Guid guid = Guid.NewGuid();

                string _fileName = "FamilyDetails_Report-" + guid + ".pdf";
                // return resulted pdf document 
                FileResult fileResult = new FileContentResult(pdf, "application/pdf");
                fileResult.FileDownloadName = _fileName;
                string webRootPath = Directory.GetCurrentDirectory();

                string DirectoryUrl = _hostingEnvironment.WebRootPath + "\\DownloadPdfFiles\\";

                //if (!Directory.Exists(webRootPath + DirectoryUrl))
                //{
                //    Directory.CreateDirectory(webRootPath + DirectoryUrl);
                //}

                string path = DirectoryUrl;
                File.WriteAllBytes(Path.Combine(path, _fileName), pdf);

                var filepath = _fileName;
                var FileName = "/DownloadPdfFiles/" + _fileName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Family Details list has been feteched";
            }
            catch (Exception ex)
            {
                //========Add Error Log Deatils =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getFamilyDetailsRequest.AgencyID);
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


        public async Task<ResponseViewModal> PdfReportForPaymentLedgerAsync(ReportViewModel getLedgerReportRequest)
        {
            decimal paidAmount = 0;
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                Parent parent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted && Check.Id == getLedgerReportRequest.ParentID).FirstOrDefault();
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted).OrderBy(s => s.Id);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted).OrderBy(s => s.InvoiceDetailsID);

                var totalAmount = invoiceCollection.Sum(a => a.InvoiceAmount);
                var TotalAmount = payementCollection.Sum(s => s.TotalAmount);
                var BalanceAmount = payementCollection.Sum(s => s.BalanceAmount);
                var DiscountAmount = payementCollection.Sum(s => s.DiscountAmount);
                paidAmount = TotalAmount - BalanceAmount - DiscountAmount;
                var balanceAmount = totalAmount - paidAmount;

                // Create Student Ledger
                int pid = Convert.ToInt32(getLedgerReportRequest.ParentID);
                string debitQuery = "studentledger";
                DynamicParameters debitParameters = new DynamicParameters();
                debitParameters.Add("ledgerparentid", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<ReportViewModel> ReportModel = await _baserepository.GetAsync<ReportViewModel>(debitQuery, debitParameters, CommandType.StoredProcedure);
                allLedgerList = ReportModel.ToList();

                res.ParentName = parent.ParentName;
                res.LastName = parent.LastName;
                res.TotalBalanceAmount = balanceAmount;
                res.Data = allLedgerList;

                StringBuilder sb = new StringBuilder();
                if (allLedgerList != null & allLedgerList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Ledger</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Posting Date</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Check#</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Description-Comment</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Billing Period</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Child Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Charges</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Credit</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Balance</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allLedgerList)
                    {
                        sb.Append("<tr>");
                        sb.Append("<td>" + "Sponsor" + "</td>");
                        if (item.InvoicesDate != null)
                        {
                            sb.Append("<td>" + item.InvoicesDate.Value.Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + item.PaymentsDate.Value.Date.ToString("dd/MM/yyyy") + "</td>");
                        }

                        if (item.CardNo != 0)
                        {
                            sb.Append("<td>" + item.CardNo + "</td>");
                        }
                        else if (item.ChequeNo != 0)
                        {
                            sb.Append("<td>" + item.ChequeNo + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.Description != null && item.Coment != null)
                        {
                            sb.Append("<td>" + item.Description.ToString() + "<br>" + item.Coment.ToString() + "</td>");
                        }
                        else if (item.Description != null && item.Coment == null)
                        {
                            sb.Append("<td>" + item.Description.ToString() + "</td>");
                        }
                        else if (item.Description == null && item.Coment != null)
                        {
                            sb.Append("<td>" + item.Coment.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }


                        if (item.InvoicesFromDate != null)
                        {
                            sb.Append("<td>" + item.InvoicesFromDate.Value.Date.ToString("dd/MM/yyyy") + "<br>" + item.InvoicesToDate.Value.Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        sb.Append("<td>" + item.StudentName.ToString() + "</td>");

                        if (item.CreditAmount != 0)
                        {
                            sb.Append("<td>" + "$" + item.CreditAmount + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        if (item.DebitAmount != 0)
                        {
                            sb.Append("<td>" + "$" + item.DebitAmount + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        sb.Append("<td>" + item.BalanceAmount.ToString() + "</td>");

                        sb.Append("</tr>");

                    }

                    sb.Append("</table>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("Today's Balance  :" + "  $  " + balanceAmount);
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    #region Top table
                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);

                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Payment Ledger", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        PdfPCell nextPostCell2 = new PdfPCell(new Phrase("Family Name: " + parent.LastName, EmailFont));
                        nextPostCell2.Border = Rectangle.NO_BORDER;
                        nextPostCell2.PaddingTop = 10f;
                        nested.AddCell(nextPostCell2);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "PaymentLedger" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Ledger list has been feteched";
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


        public ResponseViewModal SendInvoiceMail(ReportViewModel getLedgerReportRequest)
        {

            decimal paidAmount = 0;
            decimal subsidyAmount = 0;

            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
                List<ReportViewModel> allLedgerList1 = new List<ReportViewModel>();

                Parent parent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && !Check.IsDeleted && Check.Id == getLedgerReportRequest.ParentID).FirstOrDefault();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted);
                IQueryable<Entity.Agency.InvoiceDetails> invoiceCollection = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted).OrderBy(s => s.Id);
                IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted).OrderBy(s => s.InvoiceDetailsID);
                List<PayementDetails> listPayementDetails = payementCollection.ToList();
                List<InvoiceDetails> listInvoiceDetails = invoiceCollection.ToList();

                var TotalAmount = payementCollection.Sum(a => a.TotalAmount);
                var BalanceAmount = payementCollection.Sum(a => a.BalanceAmount);
                var DiscountAmount = payementCollection.Sum(a => a.DiscountAmount);
                paidAmount = TotalAmount - BalanceAmount - DiscountAmount;
                var totalAmount = invoiceCollection.Sum(a => a.InvoiceAmount);
                var balanceAmount = totalAmount - paidAmount;


                var result = studentCollection.ToList();
                foreach (var r in result)
                {
                    var studentName = studentCollection.Where(p => p.ParentID == r.ParentID).Select(p => p.StudentName).ToArray();
                    res.StudentNames = string.Join(",", studentName);
                }

                res.ParentName = parent.ParentName;
                res.LastName = parent.LastName;
                res.TotalBalanceAmount = balanceAmount;
                res.Data = allLedgerList;
                res.EmailId = parent.EmailId;
                res.AgencyId = getLedgerReportRequest.AgencyID;
                SendMailInvoice(res, res.EmailId);

                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Mail Has been Sent";

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

        public void SendMailInvoice(ResponseViewModal result, string email)
        {
            DailySheetAndBalanceLog DSBLObj = null;

            string folderName = "ParentBalanceAmountPdfFiles";
            string webRootPath = _hostingEnvironment.WebRootPath;

            string path = Path.Combine(webRootPath, folderName);

            // if directory not exists create one
            bool exists = Directory.Exists(path);

            if (!exists)
                Directory.CreateDirectory(path);

            string fileName = string.Empty;
            DateTime fileCreationDatetime = DateTime.Now;
            Guid guid = Guid.NewGuid();
            fileName = "ParentBalanceAmountPdfFiles_report-" + guid + ".pdf";
            string pdfPath = Path.Combine(path, fileName);

            using (FileStream msReport = new FileStream(pdfPath, FileMode.Create))
            {
                using (Document pdfDoc = new Document(PageSize.A4, 10, 10, 10, 30))
                {
                    try
                    {
                        PdfWriter pdfWriter = PdfWriter.GetInstance(pdfDoc, msReport);
                        pdfDoc.Open();

                        var titleFont = FontFactory.GetFont("Arial", 12, Font.BOLD);
                        var titleFontBlue = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                        var boldTableFont = FontFactory.GetFont("Arial", 8, Font.BOLD);
                        var bodyFont = FontFactory.GetFont("Arial", 8, Font.NORMAL);
                        var EmailFont = FontFactory.GetFont("Arial", 8, Font.NORMAL, BaseColor.BLACK);


                        #region Top table
                        // Create the header table 
                        PdfPTable headertable = new PdfPTable(3);
                        headertable.HorizontalAlignment = 0;
                        headertable.WidthPercentage = 100;
                        headertable.SetWidths(new float[] { 100f, 320f, 100f });  // then set the column's __relative__ widths
                                                                                  //headertable.DefaultCell.Border = Rectangle.NO_BORDER;
                                                                                  //headertable.DefaultCell.Border = Rectangle.BOX; //for testing           

                        List<AgencyDetailsViewModel> agencyDetails = new List<AgencyDetailsViewModel>();

                        IQueryable<Entity.Masters.Agency> getagencyDetails = _agencyDetailsRepository.GetAll().Where(check => check.IsDeleted == false);

                        agencyDetails = (from ADObj in getagencyDetails
                                         where !ADObj.IsDeleted && ADObj.Id == result.AgencyId
                                         select new AgencyDetailsViewModel()
                                         {
                                             agencyID = ADObj.Id,
                                             AgencyName = ADObj.AgencyName ?? String.Empty,
                                             AgencyAddress = ADObj.Address ?? String.Empty,
                                             AgencyMobile = Convert.ToUInt64(ADObj.Mobile).ToString(),
                                             AgencyEmail = ADObj.EmailId ?? String.Empty,
                                             AgencyImage = ADObj.ImagePath ?? String.Empty
                                         }).ToList();

                        iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                        logo.ScaleToFit(100, 100);
                        {
                            PdfPCell pdfCelllogo = new PdfPCell(logo);
                            pdfCelllogo.Border = 0;
                            pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            pdfCelllogo.BorderWidthBottom = 1f;
                            headertable.AddCell(pdfCelllogo);
                        }
                        {
                            PdfPCell middlecell = new PdfPCell();
                            middlecell.Border = Rectangle.NO_BORDER;
                            middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            middlecell.BorderWidthBottom = 1f;
                            headertable.AddCell(middlecell);
                        }


                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            PdfPCell nextPostCell1 = new PdfPCell(new Phrase(agencyDetails[0].AgencyName, titleFont));
                            nextPostCell1.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase(agencyDetails[0].AgencyAddress, bodyFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            PdfPCell nextPostCell3 = new PdfPCell(new Phrase(agencyDetails[0].AgencyMobile, bodyFont));
                            nextPostCell3.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell3);
                            PdfPCell nextPostCell4 = new PdfPCell(new Phrase(agencyDetails[0].AgencyEmail, EmailFont));
                            nextPostCell4.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell4);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            headertable.AddCell(nesthousing);
                        }


                        PdfPTable Invoicetable = new PdfPTable(3);
                        Invoicetable.HorizontalAlignment = 0;
                        Invoicetable.WidthPercentage = 100;
                        Invoicetable.SetWidths(new float[] { 100f, 320f, 100f });  // then set the column's __relative__ widths
                        Invoicetable.DefaultCell.Border = Rectangle.NO_BORDER;

                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            PdfPCell nextPostCell1 = new PdfPCell(new Phrase("TO:", bodyFont));
                            nextPostCell1.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase(result.ParentName, titleFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            //nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            Invoicetable.AddCell(nesthousing);
                        }

                        {
                            PdfPCell middlecell = new PdfPCell();
                            middlecell.Border = Rectangle.NO_BORDER;
                            //middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //middlecell.BorderWidthBottom = 1f;
                            Invoicetable.AddCell(middlecell);
                        }


                        {
                            PdfPTable nested = new PdfPTable(1);
                            nested.DefaultCell.Border = Rectangle.NO_BORDER;
                            //PdfPCell nextPostCell1 = new PdfPCell(new Phrase("INVOICE 3-2-1", titleFontBlue));
                            //nextPostCell1.Border = 0;// Rectangle.NO_BORDER;
                            //nested.AddCell(nextPostCell1);
                            PdfPCell nextPostCell2 = new PdfPCell(new Phrase("Date: " + DateTime.Now.ToShortDateString(), bodyFont));
                            nextPostCell2.Border = Rectangle.NO_BORDER;
                            nested.AddCell(nextPostCell2);
                            //PdfPCell nextPostCell3 = new PdfPCell(new Phrase("Due Date: " + DateTime.Now.AddDays(30).ToShortDateString(), bodyFont));
                            //nextPostCell3.Border = Rectangle.NO_BORDER;
                            //nested.AddCell(nextPostCell3);
                            nested.AddCell("");
                            PdfPCell nesthousing = new PdfPCell(nested);
                            nesthousing.Border = Rectangle.NO_BORDER;
                            //nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                            //nesthousing.BorderWidthBottom = 1f;
                            nesthousing.Rowspan = 5;
                            nesthousing.PaddingBottom = 10f;
                            Invoicetable.AddCell(nesthousing);
                        }


                        pdfDoc.Add(headertable);
                        Invoicetable.PaddingTop = 10f;

                        pdfDoc.Add(Invoicetable);
                        #endregion

                        #region Items Table
                        //Create body table
                        PdfPTable itemTable = new PdfPTable(4);

                        itemTable.HorizontalAlignment = 1;
                        itemTable.WidthPercentage = 100;
                        itemTable.SetWidths(new float[] { 5, 40, 10, 20 });  // then set the column's __relative__ widths
                        itemTable.SpacingAfter = 30;
                        itemTable.DefaultCell.Border = Rectangle.BOX;

                        PdfPCell cell1 = new PdfPCell(new Phrase("NO", boldTableFont));
                        // cell1.BackgroundColor = TabelHeaderBackGroundColor;
                        cell1.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell1);

                        PdfPCell cell2 = new PdfPCell(new Phrase("CHILD NAMES", boldTableFont));
                        // cell2.BackgroundColor = TabelHeaderBackGroundColor;
                        cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell2);

                        PdfPCell cell3 = new PdfPCell(new Phrase("BALANCE($)", boldTableFont));
                        // cell3.BackgroundColor = TabelHeaderBackGroundColor;
                        cell3.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell3);

                        PdfPCell cell4 = new PdfPCell(new Phrase("TOTAL($)", boldTableFont));
                        // cell5.BackgroundColor = TabelHeaderBackGroundColor;
                        cell4.HorizontalAlignment = Element.ALIGN_CENTER;
                        itemTable.AddCell(cell4);



                        //int index = result;


                        PdfPCell numberCell = new PdfPCell(new Phrase("1", bodyFont));
                        numberCell.HorizontalAlignment = 1;
                        numberCell.PaddingLeft = 10f;
                        numberCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        itemTable.AddCell(numberCell);


                        PdfPCell qtyCell = new PdfPCell(new Phrase(result.StudentNames, bodyFont));
                        qtyCell.HorizontalAlignment = 1;
                        qtyCell.PaddingLeft = 10f;
                        qtyCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        itemTable.AddCell(qtyCell);

                        PdfPCell amountCell = new PdfPCell(new Phrase(Convert.ToDecimal(result.TotalBalanceAmount).ToString(), bodyFont));
                        amountCell.HorizontalAlignment = 1;
                        amountCell.PaddingLeft = 10f;
                        amountCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        itemTable.AddCell(amountCell);

                        PdfPCell totalamtCell = new PdfPCell(new Phrase(Convert.ToDecimal(result.TotalBalanceAmount).ToString(), bodyFont));
                        totalamtCell.HorizontalAlignment = 1;
                        totalamtCell.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        itemTable.AddCell(totalamtCell);


                        // Table footer
                        PdfPCell totalAmtCell1 = new PdfPCell(new Phrase(""));
                        totalAmtCell1.Border = Rectangle.LEFT_BORDER | Rectangle.RIGHT_BORDER;
                        totalAmtCell1.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell1);

                        PdfPCell totalAmtCell2 = new PdfPCell(new Phrase(""));
                        totalAmtCell2.Border = Rectangle.TOP_BORDER; //Rectangle.NO_BORDER; //Rectangle.TOP_BORDER;
                        totalAmtCell2.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell2);


                        decimal AllTotalAmount = result.TotalBalanceAmount;

                        PdfPCell totalAmtStrCell = new PdfPCell(new Phrase("Total Amount($)", boldTableFont));
                        totalAmtStrCell.Border = Rectangle.TOP_BORDER;
                        totalAmtStrCell.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtStrCell);
                        PdfPCell totalAmtCell = new PdfPCell(new Phrase(Convert.ToDecimal(AllTotalAmount).ToString(), boldTableFont));
                        totalAmtCell.HorizontalAlignment = 1;
                        itemTable.AddCell(totalAmtCell);

                        //  string wordednumberstring = IntegerToWords(Convert.ToString(AllTotalAmount)).Trim();

                        PdfPCell cell = new PdfPCell(new Phrase("", bodyFont));
                        cell.Colspan = 4;
                        cell.HorizontalAlignment = 1;
                        itemTable.AddCell(cell);
                        pdfDoc.Add(itemTable);

                        #endregion

                        pdfDoc.NewPage();

                        pdfDoc.Close();

                        string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p>Student Balance Details</p><b> </b><br/> <p>Thanks.</p></body></html>";
                        _commonService.SendEmailAttachmentSync(email, "Student Balance Details", message, pdfPath);
                    }


                    catch (Exception ex)
                    {
                        //handle exception  
                    }

                }
            }
        }

        public ResponseViewModal GetBankDepositReport(ReportViewModel getDuePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var Date = Convert.ToDateTime(getDuePaymentRequest.AskedDateString);
                var difference = getDuePaymentRequest.AskedDate - Date;
                Date = Date.Date;
                var fromDate = Date.Add(difference);
                var toDate = fromDate.AddHours(24);

                List<ReportViewModel> allDepositPaymentList = new List<ReportViewModel>();
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Agency.PayementDetails> paymentCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID &&
                (fromDate <= Check.PaymentDate && Check.PaymentDate <= toDate) && Check.IsDeleted == false && (Check.PaymentType == "Cash" || Check.PaymentType == "Check"));

                var TotalAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.TotalAmount);
                var BalanceAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.BalanceAmount);
                var DiscountAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.DiscountAmount);
                var paidAmountCheck = TotalAmountCheck - BalanceAmountCheck - DiscountAmountCheck;

                var TotalAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.TotalAmount);
                var BalanceAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.BalanceAmount);
                var DiscountAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.DiscountAmount);
                var paidAmountCash = TotalAmountCash - BalanceAmountCash - DiscountAmountCash;

                var checkCount = paymentCollection.Where(x => x.PaymentType == "Check").Count();
                var totalAmount = paidAmountCheck + paidAmountCash;

                allDepositPaymentList = (from paymentObj in paymentCollection
                                         join parentObj in parentCollection on paymentObj.ParentID equals parentObj.Id
                                         where (parentObj.IsDeleted == false)
                                         select new ReportViewModel
                                         {
                                             AgencyID = parentObj.AgencyID,
                                             ParentName = parentObj.ParentName,
                                             ParentLastName = parentObj.LastName,
                                             InvoiceFromDate = Convert.ToDateTime(paymentObj.PaymentDate).Date,
                                             PaymentType = paymentObj.PaymentType,
                                             Amount = paymentObj.TotalAmount - paymentObj.BalanceAmount - paymentObj.DiscountAmount
                                         }).OrderBy(c => c.ID).ToList();

                res.Data = allDepositPaymentList;
                if (getDuePaymentRequest.limit != 0)
                {
                    res.Data = allDepositPaymentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
                }

                res.TotalRows = allDepositPaymentList.Count();
                res.Count = checkCount;
                res.PaidAmountCash = paidAmountCash;
                res.PaidAmountCheck = paidAmountCheck;
                res.TotalPaidAmount = totalAmount;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";
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

        public ResponseViewModal PdfReportForBankDeposit(ReportViewModel getDuePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var Date = Convert.ToDateTime(getDuePaymentRequest.AskedDateString);
                var difference = getDuePaymentRequest.AskedDate - Date;
                Date = Date.Date;
                var fromDate = Date.Add(difference);
                var toDate = fromDate.AddHours(24);


                List<ReportViewModel> allDepositPaymentList = new List<ReportViewModel>();
                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID && !Check.IsDeleted);

                IQueryable<Entity.Agency.PayementDetails> paymentCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID &&
               (fromDate <= Check.PaymentDate && Check.PaymentDate <= toDate) && Check.IsDeleted == false && (Check.PaymentType == "Cash" || Check.PaymentType == "Check"));

                var TotalAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.TotalAmount);
                var BalanceAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.BalanceAmount);
                var DiscountAmountCheck = paymentCollection.Where(x => x.PaymentType == "Check").Sum(a => a.DiscountAmount);
                var paidAmountCheck = TotalAmountCheck - BalanceAmountCheck - DiscountAmountCheck;

                var TotalAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.TotalAmount);
                var BalanceAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.BalanceAmount);
                var DiscountAmountCash = paymentCollection.Where(x => x.PaymentType == "Cash").Sum(a => a.DiscountAmount);
                var paidAmountCash = TotalAmountCash - BalanceAmountCash - DiscountAmountCash;

                var checkCount = paymentCollection.Where(x => x.PaymentType == "Check").Count();
                var totalAmount = paidAmountCheck + paidAmountCash;

                allDepositPaymentList = (from paymentObj in paymentCollection
                                         join parentObj in parentCollection on paymentObj.ParentID equals parentObj.Id
                                         where (parentObj.IsDeleted == false)
                                         select new ReportViewModel
                                         {
                                             AgencyID = parentObj.AgencyID,
                                             ParentName = parentObj.ParentName,
                                             ParentLastName = parentObj.LastName,
                                             InvoiceFromDate = Convert.ToDateTime(paymentObj.PaymentDate).Date,
                                             PaymentType = paymentObj.PaymentType,
                                             Amount = paymentObj.TotalAmount - paymentObj.BalanceAmount - paymentObj.DiscountAmount
                                         }).OrderBy(c => c.ID).ToList();

                res.Data = allDepositPaymentList;
                if (getDuePaymentRequest.limit != 0)
                {
                    res.Data = allDepositPaymentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
                }

                res.TotalRows = allDepositPaymentList.Count();
                res.Count = checkCount;
                res.PaidAmountCash = paidAmountCash;
                res.PaidAmountCheck = paidAmountCheck;
                res.TotalPaidAmount = totalAmount;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";

                StringBuilder sb = new StringBuilder();
                if (allDepositPaymentList != null & allDepositPaymentList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Family Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Parent Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Payment Type (Cash/Check)</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Amount</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allDepositPaymentList)
                    {
                        sb.Append("<tr>");
                        if (item.ParentLastName != null)
                        {
                            sb.Append("<td>" + item.ParentLastName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.ParentName != null)
                        {
                            sb.Append("<td>" + item.ParentName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.PaymentType != null)
                        {
                            sb.Append("<td>" + item.PaymentType.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        if (item.Amount != 0)
                        {
                            sb.Append("<td>" + item.Amount.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }
                        sb.Append("</tr>");

                    }

                    sb.Append("</table>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("Checks  :" + " (" + checkCount + ")" + "  $  " + paidAmountCheck);
                    sb.Append("<br>");
                    sb.Append("Cash  :" + "  $  " + paidAmountCash);
                    sb.Append("<br>");
                    sb.Append("Deposit Amount  :" + "  $  " + totalAmount);
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);


                    #region Top table
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Bank Deposit", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "BankDeposit" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allDepositPaymentList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Ledger list has been feteched";
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

        // Deactivated Students Report

        public ResponseViewModal GetDeactivatedStudentsReport(ReportViewModel getDuePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getDuePaymentRequest.FromDate;
                var toDate = getDuePaymentRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }
                else
                {
                    var Date = Convert.ToDateTime(getDuePaymentRequest.FromDateString);
                    var difference = getDuePaymentRequest.FromDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                else
                {
                    var Date = Convert.ToDateTime(getDuePaymentRequest.ToDateString);
                    var difference = getDuePaymentRequest.ToDate - Date;
                    Date = Date.Date;
                    toDate = Date.Add(difference);
                    toDate = toDate.AddHours(24);
                }

                List<ReportViewModel> allStudentList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID &&
                Check.IsDeleted == true && (fromDate <= Check.DeletedDate && Check.DeletedDate <= toDate));

                allStudentList = (from studentObj in studentCollection
                                  where (studentObj.IsDeleted == true)
                                  select new ReportViewModel
                                  {
                                      AgencyID = studentObj.AgencyID,
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName,
                                      DeletedReason = studentObj.DeletedReason,
                                      DeletedDate = Convert.ToDateTime(studentObj.DeletedDate).Date,
                                  }).OrderByDescending(c => c.DeletedDate).ToList();

                var NonPaymentCount = studentCollection.Where(x => x.DeletedReason == "Non-Payment").Count();
                var RelocationCount = studentCollection.Where(x => x.DeletedReason == "Relocation").Count();
                var CertificateCount = studentCollection.Where(x => x.DeletedReason == "State Certificate Expried").Count();
                var GraduatedCount = studentCollection.Where(x => x.DeletedReason == "Graduated").Count();
                var ServiceCount = studentCollection.Where(x => x.DeletedReason == "Service Issue").Count();
                var BehaviorCount = studentCollection.Where(x => x.DeletedReason == "Child/Parent Behavior").Count();
                var HealthCount = studentCollection.Where(x => x.DeletedReason == "Health").Count();
                var SeasonalCount = studentCollection.Where(x => x.DeletedReason == "Seasonal care").Count();
                var LostJobCount = studentCollection.Where(x => x.DeletedReason == "Parent Lost Job").Count();
                var LivingCount = studentCollection.Where(x => x.DeletedReason == "Change in Living Situation").Count();

                res.Data = allStudentList;
                if (getDuePaymentRequest.limit != 0)
                {
                    res.Data = allStudentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
                }

                res.TotalRows = allStudentList.Count();
                res.NonPaymentCount = NonPaymentCount;
                res.RelocationCount = RelocationCount;
                res.CertificateCount = CertificateCount;
                res.GraduatedCount = GraduatedCount;
                res.ServiceCount = ServiceCount;
                res.BehaviorCount = BehaviorCount;
                res.HealthCount = HealthCount;
                res.SeasonalCount = SeasonalCount;
                res.LostJobCount = LostJobCount;
                res.LivingCount = LivingCount;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";
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

        public ResponseViewModal PdfReportForDeactivatedStudents(ReportViewModel getDuePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var maxDate = (DateTime)SqlDateTime.MaxValue;
                var minDate = (DateTime)SqlDateTime.MinValue;

                var fromDate = getDuePaymentRequest.FromDate;
                var toDate = getDuePaymentRequest.ToDate;

                if (!(minDate <= fromDate && fromDate <= maxDate))
                {
                    fromDate = minDate;
                }
                else
                {
                    var Date = Convert.ToDateTime(getDuePaymentRequest.FromDateString);
                    var difference = getDuePaymentRequest.FromDate - Date;
                    Date = Date.Date;
                    fromDate = Date.Add(difference);
                }

                if (!(minDate <= toDate && toDate <= maxDate))
                {
                    toDate = maxDate;
                }
                else
                {
                    var Date = Convert.ToDateTime(getDuePaymentRequest.ToDateString);
                    var difference = getDuePaymentRequest.ToDate - Date;
                    Date = Date.Date;
                    toDate = Date.Add(difference);
                    toDate = toDate.AddHours(24);
                }

                List<ReportViewModel> allStudentList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getDuePaymentRequest.AgencyID &&
                Check.IsDeleted == true && (fromDate <= Check.DeletedDate && Check.DeletedDate <= toDate));

                allStudentList = (from studentObj in studentCollection
                                  where (studentObj.IsDeleted == true)
                                  select new ReportViewModel
                                  {
                                      AgencyID = studentObj.AgencyID,
                                      StudentID = studentObj.Id,
                                      StudentName = studentObj.StudentName,
                                      DeletedReason = studentObj.DeletedReason,
                                      DeletedDate = Convert.ToDateTime(studentObj.DeletedDate).Date,
                                  }).OrderByDescending(c => c.DeletedDate).ToList();

                var NonPaymentCount = studentCollection.Where(x => x.DeletedReason == "Non-Payment").Count();
                var RelocationCount = studentCollection.Where(x => x.DeletedReason == "Relocation").Count();
                var CertificateCount = studentCollection.Where(x => x.DeletedReason == "State Certificate Expried").Count();
                var GraduatedCount = studentCollection.Where(x => x.DeletedReason == "Graduated").Count();
                var ServiceCount = studentCollection.Where(x => x.DeletedReason == "Service Issue").Count();
                var BehaviorCount = studentCollection.Where(x => x.DeletedReason == "Child/Parent Behavior").Count();
                var HealthCount = studentCollection.Where(x => x.DeletedReason == "Health").Count();
                var SeasonalCount = studentCollection.Where(x => x.DeletedReason == "Seasonal care").Count();
                var LostJobCount = studentCollection.Where(x => x.DeletedReason == "Parent Lost Job").Count();
                var LivingCount = studentCollection.Where(x => x.DeletedReason == "Change in Living Situation").Count();
                var TotalRows = allStudentList.Count();

                res.Data = allStudentList;
                if (getDuePaymentRequest.limit != 0)
                {
                    res.Data = allStudentList.Skip((getDuePaymentRequest.page) * getDuePaymentRequest.limit).Take(getDuePaymentRequest.limit).ToList();
                }

                res.TotalRows = allStudentList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Child Enrollment list has been feteched";

                StringBuilder sb = new StringBuilder();
                if (allStudentList != null & allStudentList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Student Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Deactivated Date</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Deactivate Reason</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allStudentList)
                    {
                        sb.Append("<tr>");
                        if (item.StudentName != null)
                        {
                            sb.Append("<td>" + item.StudentName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.DeletedDate != null)
                        {
                            sb.Append("<td>" + item.DeletedDate.Value.Date.ToString("dd/MM/yyyy") + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        if (item.DeletedReason != null)
                        {
                            sb.Append("<td>" + item.DeletedReason.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }

                        sb.Append("</tr>");

                    }

                    sb.Append("</table>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("Health: " + HealthCount);
                    sb.Append("<br>");
                    sb.Append("Graduated: " + GraduatedCount);
                    sb.Append("<br>");
                    sb.Append("Relocation: " + RelocationCount);
                    sb.Append("<br>");
                    sb.Append("Non-Payment: " + NonPaymentCount);
                    sb.Append("<br>");
                    sb.Append("Service Issue: " + ServiceCount);
                    sb.Append("<br>");
                    sb.Append("Seasonal care: " + SeasonalCount);
                    sb.Append("<br>");
                    sb.Append("Parent Lost Job: " + LostJobCount);
                    sb.Append("<br>");
                    sb.Append("Child/Parent Behavior: " + BehaviorCount);
                    sb.Append("<br>");
                    sb.Append("Change in Living Situation: " + LivingCount);
                    sb.Append("<br>");
                    sb.Append("State Certificate Expried: " + CertificateCount);
                    sb.Append("<br>");
                    sb.Append("Total Withdrawn This Term: " + TotalRows);
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    #region Top table
                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Deactivated Students", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "DeactivatedStudents" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allStudentList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Deactivated Students list has been feteched";
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


        // FOr Tax Statement

        public async Task<ResponseViewModal> GetTaxStatementReport(ReportViewModel getTaxStatementRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
            try
            {
                //========Claculate Debit Amount from PamentDetails Table =======//
                int aid = Convert.ToInt32(getTaxStatementRequest.AgencyID);
                var date = getTaxStatementRequest.AskedDate.Date;
                var date1 = Convert.ToDateTime(getTaxStatementRequest.AskedDateString).Date;
                string debitQuery = "agency_tax_statement";
                DynamicParameters debitParameters = new DynamicParameters();
                debitParameters.Add("agencyid", aid, DbType.Int32, ParameterDirection.Input);
                debitParameters.Add("start_date", date1, DbType.Date, ParameterDirection.Input);

                IEnumerable<ReportViewModel> ReportModel = await _baserepository.GetAsync<ReportViewModel>(debitQuery, debitParameters, CommandType.StoredProcedure);
                allLedgerList = ReportModel.ToList();
                var sum = allLedgerList.Sum(x => x.DebitAmount);


                res.Data = allLedgerList;
                if (getTaxStatementRequest.limit != 0)
                {
                    res.Data = allLedgerList.Skip((getTaxStatementRequest.page) * getTaxStatementRequest.limit).Take(getTaxStatementRequest.limit).ToList();
                }

                res.TotalPaidAmount = sum;
                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Tax Statement list has been feteched";
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

        [Obsolete]
        public async Task<ResponseViewModal> PdfReportForTaxStatement(ReportViewModel getTaxStatementRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allTaxList = new List<ReportViewModel>();
            try
            {
                int aid = Convert.ToInt32(getTaxStatementRequest.AgencyID);
                var date = getTaxStatementRequest.AskedDate.Date;
                string debitQuery = "agency_tax_statement";
                DynamicParameters debitParameters = new DynamicParameters();
                debitParameters.Add("agencyid", aid, DbType.Int32, ParameterDirection.Input);
                debitParameters.Add("start_date", date, DbType.Date, ParameterDirection.Input);

                IEnumerable<ReportViewModel> ReportModel = await _baserepository.GetAsync<ReportViewModel>(debitQuery, debitParameters, CommandType.StoredProcedure);
                allTaxList = ReportModel.ToList();
                var sum = allTaxList.Sum(x => x.DebitAmount);


                res.Data = allTaxList;
                if (getTaxStatementRequest.limit != 0)
                {
                    res.Data = allTaxList.Skip((getTaxStatementRequest.page) * getTaxStatementRequest.limit).Take(getTaxStatementRequest.limit).ToList();
                }

                res.TotalRows = allTaxList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Tax Statement list has been feteched";

                StringBuilder sb = new StringBuilder();
                if (allTaxList != null & allTaxList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Family Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Amount</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allTaxList)
                    {
                        sb.Append("<tr>");
                        if (item.ParentLastName != null)
                        {
                            sb.Append("<td>" + item.ParentLastName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.DebitAmount != 0)
                        {
                            sb.Append("<td>" + item.DebitAmount.ToString() + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "-" + "</td>");
                        }
                        sb.Append("</tr>");
                    }

                    sb.Append("</table>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("<br>");
                    sb.Append("Total Amount  :" + "  $  " + sum);
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);


                    #region Top table
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Tax Statement", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }


                Guid guid = Guid.NewGuid();
                var downloadName = "TaxStatement_report-" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;
                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allTaxList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Tax Statement list has been feteched";
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

        public ResponseViewModal GetBusReport(ReportViewModel getBusReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> allBusList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection;

                if (getBusReport.BusIDReq > 0)
                {
                    studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted &&
                    Check.BusID == getBusReport.BusIDReq);
                }
                else
                {
                    studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted &&
                    Check.BusID != 0);
                }

                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Bus> busesCollection = _busRepository.GetAll().Where(check => check.AgencyID == getBusReport.AgencyID && !check.IsDeleted);

                allBusList = (from studentObj in studentCollection
                              join parentObj in parentCollection on studentObj.ParentID equals parentObj.Id
                              join busObj in busesCollection on studentObj.BusID equals busObj.Id
                              where (studentObj.IsDeleted == false)
                              select new ReportViewModel
                              {
                                  AgencyID = studentObj.AgencyID,
                                  StudentID = studentObj.Id,
                                  StudentName = studentObj.StudentName,
                                  ParentName = parentObj.ParentName,
                                  BusID = busObj.Id,
                                  BusName = busObj.BusName,
                              }).OrderBy(c => c.StudentName).ToList();


                var result = allBusList.ToList();

                if (getBusReport.limit != 0)
                {
                    res.Data = result.Skip((getBusReport.page) * getBusReport.limit).Take(getBusReport.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Bus Student list has been feteched";
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

        public ResponseViewModal PdfReportForBus(ReportViewModel getBusReport)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ReportViewModel> allBusList = new List<ReportViewModel>();
                IQueryable<Entity.Student.Student> studentCollection;

                if (getBusReport.BusIDReq > 0)
                {
                    studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted &&
                    Check.BusID == getBusReport.BusIDReq);
                }
                else
                {
                    studentCollection = _studentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted &&
                    Check.BusID != 0);
                }

                IQueryable<Entity.Parent.Parent> parentCollection = _parentRepository.GetAll().Where(Check => Check.AgencyID == getBusReport.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Bus> busesCollection = _busRepository.GetAll().Where(check => check.AgencyID == getBusReport.AgencyID && !check.IsDeleted);

                allBusList = (from studentObj in studentCollection
                              join parentObj in parentCollection on studentObj.ParentID equals parentObj.Id
                              join busObj in busesCollection on studentObj.BusID equals busObj.Id
                              where (studentObj.IsDeleted == false)
                              select new ReportViewModel
                              {
                                  AgencyID = studentObj.AgencyID,
                                  StudentID = studentObj.Id,
                                  StudentName = studentObj.StudentName,
                                  ParentName = parentObj.ParentName,
                                  BusID = busObj.Id,
                                  BusName = busObj.BusName,
                              }).OrderBy(c => c.StudentName).ToList();


                var result = allBusList.ToList();

                if (getBusReport.limit != 0)
                {
                    res.Data = result.Skip((getBusReport.page) * getBusReport.limit).Take(getBusReport.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Bus Student list has been feteched";

                StringBuilder sb = new StringBuilder();
                if (allBusList != null & allBusList.Count > 0)
                {
                    sb.Append("<header class='clearfix'>");
                    sb.Append("<div> </div>");
                    sb.Append("<table border='1'");
                    sb.Append("<tr>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Student Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Parent Name</strong></th>");
                    sb.Append("<th><strong>&nbsp;&nbsp;Bus</strong></th>");
                    sb.Append("</tr>");
                    foreach (var item in allBusList)
                    {
                        sb.Append("<tr>");
                        if (item.StudentName != null)
                        {
                            sb.Append("<td>" + item.StudentName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        if (item.ParentName != null)
                        {
                            sb.Append("<td>" + item.ParentName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }
                        if (item.BusName != null)
                        {
                            sb.Append("<td>" + item.BusName + "</td>");
                        }
                        else
                        {
                            sb.Append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + " -" + "</td>");
                        }

                        sb.Append("</tr>");

                    }

                    sb.Append("</table>");
                }

                StringReader sr = new StringReader(sb.ToString());
                byte[] bytes;
                Document pdfDoc = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 0f);

                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    #region Top table
                    var titleFont = FontFactory.GetFont("Arial", 20, Font.NORMAL);
                    var EmailFont = FontFactory.GetFont("Arial", 14, Font.NORMAL, BaseColor.BLACK);
                    // Create the header table 
                    PdfPTable headertable = new PdfPTable(3);
                    headertable.HorizontalAlignment = 0;
                    headertable.WidthPercentage = 100;
                    headertable.SetWidths(new float[] { 100f, 320f, 100f });

                    iTextSharp.text.Image logo = iTextSharp.text.Image.GetInstance("https://classroompanda.org/assets/img/logo-new.png");

                    {
                        PdfPTable nested = new PdfPTable(1);
                        nested.DefaultCell.Border = Rectangle.NO_BORDER;
                        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Bus Students", titleFont));
                        nextPostCell1.Border = Rectangle.NO_BORDER;
                        nextPostCell1.PaddingTop = 10f;
                        nested.AddCell(nextPostCell1);
                        nested.AddCell("");
                        PdfPCell nesthousing = new PdfPCell(nested);
                        nesthousing.Border = Rectangle.NO_BORDER;
                        nesthousing.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        nesthousing.BorderWidthBottom = 1f;
                        nesthousing.Rowspan = 5;
                        nesthousing.PaddingBottom = 10f;
                        headertable.AddCell(nesthousing);
                    }
                    {
                        PdfPCell middlecell = new PdfPCell();
                        middlecell.Border = Rectangle.NO_BORDER;
                        middlecell.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        middlecell.BorderWidthBottom = 1f;
                        headertable.AddCell(middlecell);
                    }

                    logo.ScaleToFit(110, 110);
                    {
                        PdfPCell pdfCelllogo = new PdfPCell(logo);
                        pdfCelllogo.Border = 0;
                        pdfCelllogo.BorderColorBottom = new BaseColor(System.Drawing.Color.Black);
                        pdfCelllogo.BorderWidthBottom = 1f;
                        pdfCelllogo.PaddingBottom = 10f;
                        headertable.AddCell(pdfCelllogo);
                    }
                    pdfDoc.Add(headertable);
                    #endregion

                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    bytes = memoryStream.ToArray();
                    memoryStream.Close();
                }

                Guid guid = Guid.NewGuid();
                var downloadName = "busStudents" + guid;

                downloadName += ".pdf";
                string rootFolder = _hostingEnvironment.WebRootPath;
                string filePath = rootFolder + "\\DownloadPdfFiles\\";

                var savedFilePath = (filePath) + downloadName;
                var path = Path.GetDirectoryName(savedFilePath);
                if (path != null && !Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var file = new FileStream(savedFilePath, FileMode.Create, FileAccess.Write);
                file.Write(bytes, 0, bytes.Length);
                file.Close();

                var filepath = savedFilePath;
                var FileName = "/DownloadPdfFiles/" + downloadName;

                res.FilePath = filepath;
                res.FileName = FileName;
                res.TotalRows = allBusList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Bus Students list has been feteched";
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

