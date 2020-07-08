using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Model.Common;
using DayCare.Model.Master;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Masters;
using System;
using System.Collections.Generic;
using System.Linq;
using DayCare.Model.Agency;
using Stripe;
using DayCare.Entity.Agency;
using AutoMapper;
using DayCare.Model.User;
using DayCare.Entity.Masters;
using DayCare.Entity.Parent;
using Microsoft.Extensions.Configuration;
using DayCare.Service.IService.Common;
using DayCare.Entity.User;
using DayCare.Service.Service.Login;
using DayCare.Service.IService.User;
using System.Text;
using System.Collections;
using DayCare.Model.Student;
using System.Globalization;
using System.Reflection.Metadata;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;
using static DayCare.Service.Common.CommonEnum;
using DayCare.Service.Common;
using System.Data.SqlTypes;
using DayCare.Model.Parent;
using Npgsql;
using System.Data;
using DayCare.Repository.Core;
using DayCare.Entity.Student;
using DayCare.Repository.Base;
using System.Threading.Tasks;
using Dapper;
using DayCare.Repository.Repository;
using DayCare.Entity.PostActivity;

namespace DayCare.Service.Service.Masters
{
    public class MasterService : IMasterService
    {
        public DataContext _dataContext;
        public ILeaveReasonTypeRepository _leaveReasonTypeRepository;
        public ICityRepository _cityRepository;
        public IStateRepository _stateRepository;
        public ICountryRepository _countryRepository;
        public INatureOfInjuryRepository _natureOfInjuryRepository;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classRepository;
        public IPlannerRepeatTypeRepository _repeatTypeRepository;
        public IMealTypeRepository _mealTypeRepository;
        public IFoodTypeRepository _foodTypeRepository;
        public IMeasureQuantityTypeRepository _measureQuantityTypeRepository;
        public IMeasureUnitTypeRepository _measureUnitTypeRepository;
        public IIncidentPriortyTypeRepository _incidentPriortyTypeRepository;
        public IMoodTypeRepository _moodTypeRepository;
        public ISubActivityTypeRepository _subActivityTypeRepository;
        public IFoodConsumtionRepository _foodConsumtionRepository;
        public IDosageQuantityRepository _dosageQuantityRepository;
        public IDoseRepeatRepository _doseRepeatRepository;
        public IRelationTypeRepository _relationTypeRepository;
        public IImmunizationRepository _immunizationRepository;
        public IAllergyNameRepository _allergyNameRepository;
        public IAllergyReactionTypeRepository _allergyReactionTypeRepository;
        public IAllergyTypeRepository _allergyTypeRepository;
        public IClassCategoryRepository _classCategoryRepository;
        public IParentStudentMappingRepository _parentStudentMappingRepository;
        public IStripeDetailsRepository _stripeDetailsRepository;
        public IPayementDetailsRepository _payementDetailsRepository;
        public IParentRepository _parentRepository;
        public IInvoiceDetailsRepository _invoiceDetailsRepository;
        public IInvoiceItemDetailsRepository _invoiceItemDetailsRepository;
        public IClassEnrollmentRepository _classEnrollmentRepository;
        public IPerDayFeeCalculationRepository _perDayFeeCalculationRepository;
        public IStudentFeesDiscountRepository _studentfeesdiscountRepository;
        public IAdvanceFeePaymentDetailsRepository _advanceFeePaymentDetailsRepository;
        public ISubsidyDetailsRepository _subsidyDetailsRepository;
        public IStudentSubsidyDetailsRepository _studentsubsidyDetailsRepository;
        public IAuthorizedPersonRepository _authorizedPersonDetails;
        public IAuthorizedPersonLoginRepository _authorizedPersonLoginDetails;
        public IFeePaymentTypeRepository _feesPaymentTypeRepository;
        public IConfiguration configuration;
        public IAgencyRepository _agencyRepository;
        public IUserRepository _userRepository;
        string NewPassword = "";
        string AgencyQuickPin = "";
        string QuickPin = "";
        string DisplayMessage = "";
        public readonly ICommonService _commonService;
        public IPricingPlanRepository _planRepository;
        public ISubscriptionDetailsRepository _subscriptionRepository;
        public IMealItemMasterRepository _mealItemMasterRepository;
        public IClassAttendenceRepository _classAttendenceRepository;
        public IDDRepository _ddRepository;
        public ISTDDDRepository _stdddRepository;
        public ICFRepository _cfRepository;
        public ICFDRepository _cfdRepository;
        public IIVDRepository _ivdRepository;
        public IEFDRepository _efdRepository;
        public IINITRepository _initdRepository;
        public IStudentActivitiesRepository _studentActivitiesRepository;
        public IStudentActivityDiaperRepository _studentActivityDiaperRepository;
        public IKioskeStudentSignInDetailsRepository _kioskeStudentSignInDetailsRepository;
        public IClassAssignmentLogRepository _classAssignmentLogRepository;
        public ITeacherInfoRepository _teacherInfoRepository;
        private readonly IUserLoginDeviceRepository _userLoginDeviceRepository;
        private readonly IPushNotification _pushNotification;
        private readonly IStudentAcitivityNapRepository _studentAcitivityNapRepository;
        public ITransactionTypeRepository _transactionTypeRepository;
        public ITransactionMasterRepository _transactionMasterRepository;
        public ITransactionDetailsRepository _transactionDetailsRepository;
        public IAccountLedgerRepository _accountLedgerRepository;
        public IExtraFeeChargeMasterRepository _extraFeeChargeMasterRepository;
        public IExtraFeesDetailsRepository _extraFeesDetailsRepository;
        public IGenderRepository _genderRepository;
        public IAgencySettingRepository _agencySettingRepository;
        public IErrorlogRepository _errorlogRepository;
        public IStudentFilesRepository _studentFilesRepository;
        private readonly CommonMethods commonMethods = null;
        public IRecurringBillingRepository _recurringBillingRepository;
        public IACHInformationRepository _achInformationRepository;
        public IRecurringPaymentRepository _recurringPaymentRepository;
        public IBaseRepository _baserepository;
        public IRestrictedPersonRepository _restrictedPersonRepository;
        public ISectionVideoRepository _sectionVideoRepository;
        public ISectionRepository _sectionRepository;
        public IImageApproveTypeRepository _ImageApproveTypeRepository;
        public ICouponRepository _couponRepository;
        public IDeactivateReasonRepository _deactivateReasonRepository;
        public IBusRepository _busRepository;

        public MasterService(DataContext dataContext,
           ILeaveReasonTypeRepository leaveReasonTypeRepository,
           ICityRepository cityRepository,
           IStateRepository stateRepository,
           ICountryRepository countryRepository,
           INatureOfInjuryRepository natureOfInjuryRepository,
           IStudentRepository studentRepository,
           IClassesRepository classRepository,
           IPlannerRepeatTypeRepository repeatTypeRepository,
           IMealTypeRepository mealTypeRepository,
           IFoodTypeRepository foodTypeRepository,
           IMeasureQuantityTypeRepository measureQuantityTypeRepository,
           IMeasureUnitTypeRepository measureUnitTypeRepository,
           IIncidentPriortyTypeRepository incidentPriortyTypeRepository,
           IMoodTypeRepository moodTypeRepository,
           ISubActivityTypeRepository subActivityTypeRepository,
           IFoodConsumtionRepository foodConsumtionRepository,
           IDosageQuantityRepository dosageQuantityRepository,
           IDoseRepeatRepository doseRepeatRepository,
           IRelationTypeRepository relationTypeRepository,
           IImmunizationRepository immunizationRepository,
            IAllergyNameRepository allergyNameRepository,
            IAllergyReactionTypeRepository allergyReactionTypeRepository,
            IAllergyTypeRepository allergyTypeRepository,
            IClassCategoryRepository classCategoryRepository,
            IParentStudentMappingRepository parentStudentMappingRepository,
            IStripeDetailsRepository stripeDetailsRepository,
            IPayementDetailsRepository payementDetailsRepository,
            IParentRepository parentRepository,
            IInvoiceDetailsRepository invoiceDetailsRepository,
            IInvoiceItemDetailsRepository invoiceItemDetailsRepository,
            IClassEnrollmentRepository classEnrollmentRepository,
            IPerDayFeeCalculationRepository perDayFeeCalculationRepository,
            IStudentFeesDiscountRepository studentfeesdiscountRepository,
            IFeePaymentTypeRepository feesPaymentTypeRepository,
            IAgencyRepository agencyRepository,
            IUserRepository userRepository, ICommonService commonService,
            IPricingPlanRepository planRepository,
            ISubscriptionDetailsRepository subscriptionRepository,
            IMealItemMasterRepository mealItemMasterRepository,
            IClassAttendenceRepository classAttendenceRepository,
            ISTDDDRepository stdddRepository,
            IDDRepository ddRepository,
            ICFRepository cfRepository,
            ICFDRepository cfdRepository,
            IEFDRepository efdRepository,
            IStudentActivitiesRepository studentActivitiesRepository,
            IStudentActivityDiaperRepository studentActivityDiaperRepository,
            IKioskeStudentSignInDetailsRepository kioskeStudentSignInDetailsRepository,
            IClassAssignmentLogRepository classAssignmentLogRepository,
            ITeacherInfoRepository teacherInfoRepository,
            IUserLoginDeviceRepository userLoginDeviceRepository,
            IPushNotification pushNotification,
            IStudentAcitivityNapRepository studentAcitivityNapRepository,
            IStudentActivityMealRepository studentActivityMealRepository,
            ITransactionTypeRepository transactionTypeRepository,
            ITransactionMasterRepository transactionMasterRepository,
            ITransactionDetailsRepository transactionDetailsRepository,
            IAccountLedgerRepository accountLedgerRepository,
            IExtraFeeChargeMasterRepository extraFeeChargeMasterRepository,
            IExtraFeesDetailsRepository extraFeesDetailsRepository,
            IGenderRepository genderRepository,
            IAdvanceFeePaymentDetailsRepository advanceFeePaymentDetailsRepository,
            IAuthorizedPersonRepository authorizedPersonDetails,
            IAuthorizedPersonLoginRepository authorizedPersonLoginDetails,
            ISubsidyDetailsRepository subsidyDetailsRepository,
            IStudentSubsidyDetailsRepository studentsubsidyDetailsRepository,
            IAgencySettingRepository agencySettingRepository,
            IErrorlogRepository errorlogRepository,
            IStudentFilesRepository studentFilesRepository,
            IRecurringBillingRepository recurringBillingRepository,
            IConfiguration iConfig,
            IACHInformationRepository achInformationRepository,
            IRecurringPaymentRepository recurringPaymentRepository,
            IBaseRepository baseRepository,
            IRestrictedPersonRepository restrictedPersonRepository,
            ISectionVideoRepository sectionVideoRepository,
            ISectionRepository sectionRepository,
            IImageApproveTypeRepository ImageApproveTypeRepository,
            ICouponRepository couponRepository,
            IDeactivateReasonRepository deactivateReasonRepository,
            IBusRepository busRepository
           )
        {
            _dataContext = dataContext;
            _leaveReasonTypeRepository = leaveReasonTypeRepository;
            _cityRepository = cityRepository;
            _stateRepository = stateRepository;
            _countryRepository = countryRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
            _studentRepository = studentRepository;
            _classRepository = classRepository;
            _repeatTypeRepository = repeatTypeRepository;
            _mealTypeRepository = mealTypeRepository;
            _foodTypeRepository = foodTypeRepository;
            _measureQuantityTypeRepository = measureQuantityTypeRepository;
            _measureUnitTypeRepository = measureUnitTypeRepository;
            _incidentPriortyTypeRepository = incidentPriortyTypeRepository;
            _moodTypeRepository = moodTypeRepository;
            _subActivityTypeRepository = subActivityTypeRepository;
            _foodConsumtionRepository = foodConsumtionRepository;
            _dosageQuantityRepository = dosageQuantityRepository;
            _doseRepeatRepository = doseRepeatRepository;
            _relationTypeRepository = relationTypeRepository;
            _immunizationRepository = immunizationRepository;
            _allergyNameRepository = allergyNameRepository;
            _allergyReactionTypeRepository = allergyReactionTypeRepository;
            _allergyTypeRepository = allergyTypeRepository;
            _classCategoryRepository = classCategoryRepository;
            _parentStudentMappingRepository = parentStudentMappingRepository;
            _stripeDetailsRepository = stripeDetailsRepository;
            _payementDetailsRepository = payementDetailsRepository;
            _parentRepository = parentRepository;
            _invoiceDetailsRepository = invoiceDetailsRepository;
            _invoiceItemDetailsRepository = invoiceItemDetailsRepository;
            _classEnrollmentRepository = classEnrollmentRepository;
            _perDayFeeCalculationRepository = perDayFeeCalculationRepository;
            _studentfeesdiscountRepository = studentfeesdiscountRepository;
            _feesPaymentTypeRepository = feesPaymentTypeRepository;
            _agencyRepository = agencyRepository;
            _userRepository = userRepository;
            _commonService = commonService;
            _planRepository = planRepository;
            _subscriptionRepository = subscriptionRepository;
            _mealItemMasterRepository = mealItemMasterRepository;
            _classAttendenceRepository = classAttendenceRepository;
            _ddRepository = ddRepository;
            _cfRepository = cfRepository;
            _cfdRepository = cfdRepository;
            _efdRepository = efdRepository;
            _studentActivitiesRepository = studentActivitiesRepository;
            _studentActivityDiaperRepository = studentActivityDiaperRepository;
            _kioskeStudentSignInDetailsRepository = kioskeStudentSignInDetailsRepository;
            _classAssignmentLogRepository = classAssignmentLogRepository;
            _teacherInfoRepository = teacherInfoRepository;
            _userLoginDeviceRepository = userLoginDeviceRepository;
            _pushNotification = pushNotification;
            _studentAcitivityNapRepository = studentAcitivityNapRepository;
            _transactionTypeRepository = transactionTypeRepository;
            _transactionMasterRepository = transactionMasterRepository;
            _transactionDetailsRepository = transactionDetailsRepository;
            _accountLedgerRepository = accountLedgerRepository;
            _extraFeeChargeMasterRepository = extraFeeChargeMasterRepository;
            _extraFeesDetailsRepository = extraFeesDetailsRepository;
            _genderRepository = genderRepository;
            _advanceFeePaymentDetailsRepository = advanceFeePaymentDetailsRepository;
            _authorizedPersonDetails = authorizedPersonDetails;
            _authorizedPersonLoginDetails = authorizedPersonLoginDetails;
            _subsidyDetailsRepository = subsidyDetailsRepository;
            _studentsubsidyDetailsRepository = studentsubsidyDetailsRepository;
            _agencySettingRepository = agencySettingRepository;
            _errorlogRepository = errorlogRepository;
            _studentFilesRepository = studentFilesRepository;
            _stdddRepository = stdddRepository;
            commonMethods = new CommonMethods();
            _recurringBillingRepository = recurringBillingRepository;
            configuration = iConfig;
            _achInformationRepository = achInformationRepository;
            _recurringPaymentRepository = recurringPaymentRepository;
            _baserepository = baseRepository;
            _restrictedPersonRepository = restrictedPersonRepository;
            _sectionVideoRepository = sectionVideoRepository;
            _sectionRepository = sectionRepository;
            _ImageApproveTypeRepository = ImageApproveTypeRepository;
            _couponRepository = couponRepository;
            _deactivateReasonRepository = deactivateReasonRepository;
            _busRepository = busRepository;

        }


        public ResponseViewModal GetAllLeaveReasonType(MasterBaseRequestViewModel getAllleaveReasonTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<LeaveReasonTypeViewModel> allLeaveReasonType = new List<LeaveReasonTypeViewModel>();
                allLeaveReasonType = (from leaveReasonTypeObj in _leaveReasonTypeRepository.GetAll()
                                      where (!leaveReasonTypeObj.IsDeleted)
                                      select new LeaveReasonTypeViewModel()
                                      {
                                          LeaveReasonTypeID = leaveReasonTypeObj.Id,
                                          LeaveReasonTypeName = leaveReasonTypeObj.LeaveReasonTypeName ?? String.Empty,
                                          AgencyID = leaveReasonTypeObj.AgencyID
                                      }).OrderBy(c => c.LeaveReasonTypeName).ToList();
                res.Data = allLeaveReasonType;
                if (getAllleaveReasonTypeRequest.limit != 0)
                {
                    res.Data = allLeaveReasonType.Skip((getAllleaveReasonTypeRequest.page - 1) * getAllleaveReasonTypeRequest.limit).Take(getAllleaveReasonTypeRequest.limit).ToList();
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Leave Types have been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllleaveReasonTypeRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;

        }
        public ResponseViewModal GetAllCities(MasterBaseRequestViewModel getAllCitiesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<CitiesViewModel> allCities = new List<CitiesViewModel>();
                IQueryable<Entity.Masters.City> selectedCities = _cityRepository.GetAll().Where(check => check.StateID == getAllCitiesRequest.StateID && !check.IsDeleted);
                allCities = (from citiesObj in selectedCities
                             select new CitiesViewModel()
                             {
                                 Id = citiesObj.Id,
                                 CityName = citiesObj.CityName ?? String.Empty,
                                 CityCode = citiesObj.CityCode ?? String.Empty,
                                 StateID = citiesObj.StateID,
                                 PhoneCode = citiesObj.PhoneCode ?? String.Empty,
                                 AgencyID = citiesObj.AgencyID,
                             }).OrderBy(c => c.CityName).ToList();
                res.Data = allCities;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Cities have been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllCitiesRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllStates(MasterBaseRequestViewModel getAllStatesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StateViewModel> allState = new List<StateViewModel>();
                IQueryable<Entity.Masters.State> selectedStates = _stateRepository.GetAll().Where(check => check.CountryID == getAllStatesRequest.CountryID && !check.IsDeleted);
                allState = (from stateObj in selectedStates
                            select new StateViewModel()
                            {
                                Id = stateObj.Id,
                                StateName = stateObj.StateName ?? String.Empty,
                                CountryID = stateObj.CountryID,
                                StateCode = stateObj.StateCode ?? String.Empty,
                                NumCode = stateObj.NumCode ?? String.Empty,
                                PhoneCode = stateObj.PhoneCode ?? String.Empty,
                                AgencyID = stateObj.AgencyID
                            }).OrderBy(c => c.StateName).ToList();
                res.Data = allState;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "States have been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllStatesRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }

        public ResponseViewModal GetAllState(MasterBaseRequestViewModel getAllStatesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StateViewModel> allState = new List<StateViewModel>();
                IQueryable<Entity.Masters.State> selectedStates = _stateRepository.GetAll().Where(check => !check.IsDeleted);
                allState = (from stateObj in selectedStates
                            select new StateViewModel()
                            {
                                Id = stateObj.Id,
                                StateName = stateObj.StateName ?? String.Empty,
                                CountryID = stateObj.CountryID,
                                StateCode = stateObj.StateCode ?? String.Empty,
                                NumCode = stateObj.NumCode ?? String.Empty,
                                PhoneCode = stateObj.PhoneCode ?? String.Empty,
                                AgencyID = stateObj.AgencyID

                            }).OrderBy(c => c.StateName).ToList();
                res.Data = allState;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "States have been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllStatesRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }

        public ResponseViewModal SaveState(AddStateViewModel addstatecityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    State stateObj = null;
                    long Id = 0;
                    if (addstatecityRequest.Id == 0)
                    {
                        addstatecityRequest.CreatedBy = 1;
                        addstatecityRequest.CountryID = addstatecityRequest.CountryID;
                        addstatecityRequest.AgencyID = 4;
                        addstatecityRequest.StateName = addstatecityRequest.StateName;
                        addstatecityRequest.CreatedDate = DateTime.UtcNow;
                        addstatecityRequest.IsDeleted = false;
                        stateObj = new Entity.Masters.State();
                        Mapper.Map(addstatecityRequest, stateObj);
                        _stateRepository.Create(stateObj);
                        _stateRepository.SaveChanges();
                        Id = stateObj.Id;
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.Message = "State Information has been saved.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    //else if (savePlanRequest.Id > 0)
                    //{
                    //    planObj = _planRepository.Get(x => x.Id == savePlanRequest.Id && !x.IsDeleted);
                    //    subObj = _subscriptionRepository.Get(x => x.PlanID == savePlanRequest.Id && !x.IsDeleted);  //remove comment
                    //    if (!ReferenceEquals(planObj, null) && ReferenceEquals(subObj, null))
                    //    {
                    //        planObj.PlanName = savePlanRequest.PlanName;
                    //        planObj.PlanPrice = savePlanRequest.PlanPrice;
                    //        planObj.NumberofUsers = savePlanRequest.NumberofUsers;
                    //        planObj.Frequency = savePlanRequest.Frequency;
                    //        planObj.Remark = savePlanRequest.Remark;
                    //        planObj.IsActive = savePlanRequest.IsActive;
                    //        planObj.UpdatedBy = savePlanRequest.UpdatedBy;
                    //        planObj.UpdatedDate = DateTime.UtcNow;
                    //        _planRepository.SaveChanges();
                    //        daycaredb.Commit();
                    //        res.IsSuccess = true;
                    //        DisplayMessage = "Pricing Plan Information has been updated.";
                    //        res.StatusCode = (long)HttpStatusCodes.OK;
                    //    }
                    //    else
                    //    {
                    //        res.IsSuccess = false;
                    //        DisplayMessage = "Pricing Plan is in used.Record cannot be updated!";
                    //        res.StatusCode = 987;
                    //    }
                    //}                   
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

        public ResponseViewModal SaveCity(AddCityViewModel addstatecityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    City cityObj = null;
                    long Id = 0;
                    if (addstatecityRequest.Id == 0)
                    {
                        addstatecityRequest.CreatedBy = 1;
                        addstatecityRequest.CountryID = addstatecityRequest.CountryID;
                        addstatecityRequest.AgencyID = 4;
                        addstatecityRequest.StateID = addstatecityRequest.StateID;
                        addstatecityRequest.CityName = addstatecityRequest.CityName;
                        addstatecityRequest.CreatedDate = DateTime.UtcNow;
                        addstatecityRequest.IsDeleted = false;
                        cityObj = new Entity.Masters.City();
                        Mapper.Map(addstatecityRequest, cityObj);
                        _cityRepository.Create(cityObj);
                        _cityRepository.SaveChanges();
                        Id = cityObj.Id;
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.Message = "City Information has been saved.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    //else if (savePlanRequest.Id > 0)
                    //{
                    //    planObj = _planRepository.Get(x => x.Id == savePlanRequest.Id && !x.IsDeleted);
                    //    subObj = _subscriptionRepository.Get(x => x.PlanID == savePlanRequest.Id && !x.IsDeleted);  //remove comment
                    //    if (!ReferenceEquals(planObj, null) && ReferenceEquals(subObj, null))
                    //    {
                    //        planObj.PlanName = savePlanRequest.PlanName;
                    //        planObj.PlanPrice = savePlanRequest.PlanPrice;
                    //        planObj.NumberofUsers = savePlanRequest.NumberofUsers;
                    //        planObj.Frequency = savePlanRequest.Frequency;
                    //        planObj.Remark = savePlanRequest.Remark;
                    //        planObj.IsActive = savePlanRequest.IsActive;
                    //        planObj.UpdatedBy = savePlanRequest.UpdatedBy;
                    //        planObj.UpdatedDate = DateTime.UtcNow;
                    //        _planRepository.SaveChanges();
                    //        daycaredb.Commit();
                    //        res.IsSuccess = true;
                    //        DisplayMessage = "Pricing Plan Information has been updated.";
                    //        res.StatusCode = (long)HttpStatusCodes.OK;
                    //    }
                    //    else
                    //    {
                    //        res.IsSuccess = false;
                    //        DisplayMessage = "Pricing Plan is in used.Record cannot be updated!";
                    //        res.StatusCode = 987;
                    //    }
                    //}                   
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
        public ResponseViewModal GetAllCountry(MasterBaseRequestViewModel getAllCountryRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<CountryViewModel> allCountry = new List<CountryViewModel>();
                allCountry = (from countryObj in _countryRepository.GetAll()
                              where (!countryObj.IsDeleted)
                              select new CountryViewModel()
                              {
                                  Id = countryObj.Id,
                                  CountryName = countryObj.CountryName ?? String.Empty,
                                  CountryCode = countryObj.CountryCode ?? String.Empty,
                                  NumCode = countryObj.NumCode ?? String.Empty,
                                  PhoneCode = countryObj.PhoneCode ?? String.Empty,
                                  AgencyID = countryObj.AgencyID
                              }).OrderBy(c => c.CountryName).ToList();
                res.Data = allCountry;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Country has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllCountryRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllNatureofinjury(MasterBaseRequestViewModel getAllNatureofinjuryRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<NatureOfInjuryViewModel> allCountry = new List<NatureOfInjuryViewModel>();
                allCountry = (from natureOfInjuryObj in _natureOfInjuryRepository.GetAll()
                              where (!natureOfInjuryObj.IsDeleted)
                              select new NatureOfInjuryViewModel()
                              {
                                  Id = natureOfInjuryObj.Id,
                                  NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                  AgencyID = natureOfInjuryObj.AgencyID
                              }).OrderBy(c => c.NatureOfInjuryName).ToList();
                res.Data = allCountry;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Nature Of Injury has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllNatureofinjuryRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllStudentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllStudentDropdown = new List<DropdownViewModel>();
                allAllStudentDropdown = (from studentObj in _studentRepository.GetAll()
                                         join enrollObj in _classEnrollmentRepository.GetAll() on studentObj.Id equals enrollObj.StudentID
                                         where (!studentObj.IsDeleted && getAllStudentDropdownRequest.AgencyID == studentObj.AgencyID && enrollObj.EnrollmentStatus == 2)
                                         select new DropdownViewModel()
                                         {
                                             Value = studentObj.Id,
                                             label = studentObj.StudentName,
                                         }).OrderBy(c => c.label).ToList();
                var result = allAllStudentDropdown.GroupBy(p => p.Value).Select(p => p.First()).ToList();
                res.Data = result;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Students list has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllStudentDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllClassesDropdown(MasterBaseRequestViewModel getAllClassesDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllClassesDropdown = new List<DropdownViewModel>();
                allAllClassesDropdown = (from classObj in _classRepository.GetAll().Where(check => !check.IsDeleted && getAllClassesDropdownRequest.AgencyID == check.AgencyID && check.ClassEndDate > DateTime.Now.Date)
                                         select new DropdownViewModel()
                                         {
                                             Value = classObj.Id,
                                             label = classObj.ClassName,
                                         }).OrderBy(c => c.label).ToList();
                res.Data = allAllClassesDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Classes list has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllClassesDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllRepeatTypeDropdown(MasterBaseRequestViewModel getAllRepeatTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllRepeatTypeDropdown = new List<DropdownViewModel>();
                allAllRepeatTypeDropdown = (from classObj in _repeatTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                            select new DropdownViewModel()
                                            {
                                                Value = classObj.Id,
                                                label = classObj.PlannerRepeatTypeName,
                                            }).OrderBy(c => c.label).ToList();
                res.Data = allAllRepeatTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Planner Repeat Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllRepeatTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllMealTypeDropdown(MasterBaseRequestViewModel getAllMealTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllRepeatTypeDropdown = new List<DropdownViewModel>();
                allAllRepeatTypeDropdown = (from MealObj in _mealTypeRepository.GetAll().Where(check => check.AgencyID == getAllMealTypeDropdownRequest.AgencyID && !check.IsDeleted)
                                            select new DropdownViewModel()
                                            {
                                                Value = MealObj.Id,
                                                label = MealObj.MealTypeName,
                                            }).OrderBy(c => c.label).ToList();
                res.Data = allAllRepeatTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Meal Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllMealTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllFoodTypeDropdown(MasterBaseRequestViewModel getAllFoodTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allFoodTypeDropdown = new List<DropdownViewModel>();
                allFoodTypeDropdown = (from FoodObj in _foodTypeRepository.GetAll().Where(check => check.AgencyID == getAllFoodTypeDropdownRequest.AgencyID && !check.IsDeleted)
                                       select new DropdownViewModel()
                                       {
                                           Value = FoodObj.Id,
                                           label = FoodObj.FoodTypeName,
                                       }).OrderBy(c => c.label).ToList();
                res.Data = allFoodTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Food Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllFoodTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllMeasureQuantityDropdown(MasterBaseRequestViewModel getAllMeasureQuantityDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allMeausreQuantityTypeDropdown = new List<DropdownViewModel>();
                allMeausreQuantityTypeDropdown = (from classObj in _measureQuantityTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                                  select new DropdownViewModel()
                                                  {
                                                      Value = classObj.Id,
                                                      label = classObj.MeasureQuantityTypeName,
                                                  }).OrderBy(c => c.label).ToList();
                res.Data = allMeausreQuantityTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Measure Quantity Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllMeasureQuantityDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllMeasureUnitTypeDropdown(MasterBaseRequestViewModel getAllMeasureUnitTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allMeasureUnitTypeDropdown = new List<DropdownViewModel>();
                allMeasureUnitTypeDropdown = (from classObj in _measureUnitTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                              select new DropdownViewModel()
                                              {
                                                  Value = classObj.Id,
                                                  label = classObj.MeasureUnitTypeName,
                                              }).OrderBy(c => c.label).ToList();
                res.Data = allMeasureUnitTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Measure Units has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllMeasureUnitTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllIncidentPriortyTypeDropdown(MasterBaseRequestViewModel getAllIncidentPriortyTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allIncidentPriortyTypeDropdown = new List<DropdownViewModel>();
                allIncidentPriortyTypeDropdown = (from classObj in _incidentPriortyTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                                  select new DropdownViewModel()
                                                  {
                                                      Value = classObj.Id,
                                                      label = classObj.IncidentPriortyTypeName,
                                                  }).OrderBy(c => c.label).ToList();
                res.Data = allIncidentPriortyTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Incident Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllIncidentPriortyTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllMoodTypeDropdown(MasterBaseRequestViewModel getAllMoodTypeDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allMoodTypeDropdown = new List<DropdownViewModel>();
                allMoodTypeDropdown = (from classObj in _moodTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                       select new DropdownViewModel()
                                       {
                                           Value = classObj.Id,
                                           label = classObj.MoodTypeName,
                                       }).OrderBy(c => c.label).ToList();
                res.Data = allMoodTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Mood Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllMoodTypeDropdownRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllSubActivityType(MasterBaseRequestViewModel getAllSubActivityTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<SubActivityTypeViewModel> allSubActivityType = new List<SubActivityTypeViewModel>();
                allSubActivityType = (from subActivityTypeObj in _subActivityTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                      select new SubActivityTypeViewModel()
                                      {
                                          Id = subActivityTypeObj.Id,
                                          SubActivityLabel = subActivityTypeObj.SubActivityLabel,
                                          SubActivityText = subActivityTypeObj.SubActivityText,
                                      }).OrderBy(c => c.SubActivityLabel).ToList();
                res.Data = allSubActivityType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Activity Suggestion has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllSubActivityTypeRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllFoodConsumtion(MasterBaseRequestViewModel getAllFoodConsumtionRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<FoodConsumtionViewModel> allFoodConsumtion = new List<FoodConsumtionViewModel>();
                allFoodConsumtion = (from foodConsumtionObj in _foodConsumtionRepository.GetAll().Where(check => !check.IsDeleted)
                                     select new FoodConsumtionViewModel()
                                     {
                                         Id = foodConsumtionObj.Id,
                                         FoodConsumtionName = foodConsumtionObj.FoodConsumtionName,
                                     }).OrderBy(c => c.FoodConsumtionName).ToList();
                res.Data = allFoodConsumtion;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Food Consumtion  has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllFoodConsumtionRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllDosageQuantity(MasterBaseRequestViewModel getAllDosageQuantityRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> alldosageQuantity = new List<DropdownViewModel>();
                alldosageQuantity = (from dosageQuantityObj in _dosageQuantityRepository.GetAll().Where(check => !check.IsDeleted)
                                     select new DropdownViewModel()
                                     {
                                         Value = dosageQuantityObj.Id,
                                         label = dosageQuantityObj.DosageQuantityName,
                                     }).OrderBy(c => c.Value).ToList();
                res.Data = alldosageQuantity;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Dosage Quantity  has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllDosageQuantityRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetAllDoseRepeat(MasterBaseRequestViewModel getAllDoseRepeatRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allDoseRepeat = new List<DropdownViewModel>();
                allDoseRepeat = (from doseRepeatObj in _doseRepeatRepository.GetAll().Where(check => !check.IsDeleted)
                                 select new DropdownViewModel()
                                 {
                                     Value = doseRepeatObj.Id,
                                     label = doseRepeatObj.DoseRepeatName,
                                 }).OrderBy(c => c.Value).ToList();
                res.Data = allDoseRepeat;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Dose Repeat has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getAllDoseRepeatRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetRelationType(MasterBaseRequestViewModel getRelationTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allRelationType = new List<DropdownViewModel>();
                allRelationType = (from relationTypeObj in _relationTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                   select new DropdownViewModel()
                                   {
                                       Value = relationTypeObj.Id,
                                       label = relationTypeObj.RelationTypeName,
                                   }).OrderBy(c => c.Value).ToList();
                res.Data = allRelationType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Relation Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(getRelationTypeRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }
        public ResponseViewModal GetImmunizationType(MasterBaseRequestViewModel getImmunizationTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allimmunizationType = new List<DropdownViewModel>();
                allimmunizationType = (from immunizationObj in _immunizationRepository.GetAll().Where(check => !check.IsDeleted)
                                       select new DropdownViewModel()
                                       {
                                           Value = immunizationObj.Id,
                                           label = immunizationObj.ImmunizationDescription,
                                       }).OrderBy(c => c.Value).ToList();
                res.Data = allimmunizationType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Immunization Type has been successfully fetched.";
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
        public ResponseViewModal GetAllergyName(MasterBaseRequestViewModel getAllergyNameRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllergyName = new List<DropdownViewModel>();
                allAllergyName = (from allergyNameObj in _allergyNameRepository.GetAll().Where(check => !check.IsDeleted)
                                  join allergyTypeObj in _allergyTypeRepository.GetAll().Where(check => !check.IsDeleted) on allergyNameObj.AllergyTypeID equals allergyTypeObj.Id
                                  select new DropdownViewModel()
                                  {
                                      Value = allergyNameObj.Id,
                                      label = allergyNameObj.NameOfAllergy,
                                      AllergyType = allergyTypeObj.AllergyTypeName
                                  }).OrderBy(c => c.Value).ToList();
                res.Data = allAllergyName;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Allergy Name has been successfully fetched.";
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
        public ResponseViewModal GetAllergyReactionType(MasterBaseRequestViewModel getAllergyReactionTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllergyReactionType = new List<DropdownViewModel>();
                allAllergyReactionType = (from allergyReactionTypeObj in _allergyReactionTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                          join allergyTypeObj in _allergyTypeRepository.GetAll().Where(check => !check.IsDeleted) on allergyReactionTypeObj.AllergyTypeID equals allergyTypeObj.Id
                                          select new DropdownViewModel()
                                          {
                                              Value = allergyReactionTypeObj.Id,
                                              label = allergyReactionTypeObj.AllergyReactionTypeName,
                                              AllergyType = allergyTypeObj.AllergyTypeName
                                          }).OrderBy(c => c.Value).ToList();
                res.Data = allAllergyReactionType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All allAllergy Reaction Type has been successfully fetched.";
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
        public ResponseViewModal GetAllergyType(MasterBaseRequestViewModel getAllergyTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllergyType = new List<DropdownViewModel>();
                allAllergyType = (from allergyTypeObj in _allergyTypeRepository.GetAll().Where(check => !check.IsDeleted)
                                  select new DropdownViewModel()
                                  {
                                      Value = allergyTypeObj.Id,
                                      label = allergyTypeObj.AllergyTypeName,
                                  }).OrderBy(c => c.Value).ToList();
                res.Data = allAllergyType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Allergy Type has been successfully fetched.";
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

        public ResponseViewModal GetAllClassCategories(MasterBaseRequestViewModel getAllClassCategoriesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<ClassCategoryViewModel> allClassCategories = new List<ClassCategoryViewModel>();
                IQueryable<Entity.Agency.ClassCategory> selectedCategories = _classCategoryRepository.GetAll();
                allClassCategories = (from categoryObj in selectedCategories
                                      select new ClassCategoryViewModel()
                                      {
                                          Id = categoryObj.Id,
                                          CategoryName = categoryObj.CategoryName ?? String.Empty,
                                          FromAge = categoryObj.FromAge,
                                          ToAge = categoryObj.ToAge
                                      }).ToList();
                res.Data = allClassCategories;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Class Categories have been successfully fetched.";
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

        public ResponseViewModal GetAllStudentForParentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allStudentDropdown = new List<DropdownViewModel>();
                IQueryable<Entity.Student.Student> selectedStud = _studentRepository.GetAll().Where(studCheck => studCheck.AgencyID == getAllStudentDropdownRequest.AgencyID);
                IQueryable<Entity.Parent.ParentStudentMapping> selecteMap = _parentStudentMappingRepository.GetAll().Where(mapCheck => mapCheck.AgencyID == getAllStudentDropdownRequest.AgencyID && mapCheck.ParentID == getAllStudentDropdownRequest.ParentID);

                allStudentDropdown = (from mapObj in selecteMap
                                      join studObj in selectedStud on mapObj.StudentID equals studObj.Id
                                      where (!mapObj.IsDeleted && !studObj.IsDeleted && getAllStudentDropdownRequest.AgencyID == mapObj.AgencyID && getAllStudentDropdownRequest.ParentID == mapObj.ParentID)
                                      select new DropdownViewModel()
                                      {
                                          Value = mapObj.StudentID,
                                          label = studObj.StudentName,
                                      }).OrderBy(c => c.label).ToList();
                res.Data = allStudentDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Students list has been successfully fetched.";
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

        public ResponseViewModal CreateStripeAccount(StripeDetailsViewModel stripeAccountRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (stripeAccountRequest.AgencyID > 0)
                    {
                        StripeDetails stripeObj = null;
                        stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == stripeAccountRequest.AgencyID && !x.IsDeleted);

                        if (ReferenceEquals(stripeObj, null))
                        {
                            long id = 0;
                            StripeDetails stripeAccount = new StripeDetails(); ;
                            if (stripeAccountRequest.AgencyID != 0 && stripeAccountRequest.Id == 0)
                            {

                                //StripeConfiguration.SetApiKey("sk_test_xo8R3jflm7MviikEA9RpMAKq");
                                //StripeOAuthTokenService service = new StripeOAuthTokenService("sk_test_xo8R3jflm7MviikEA9RpMAKq");
                                //creates stripe account on stripe platform
                                StripeConfiguration.SetApiKey(APIValue);
                                StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);
                                StripeOAuthToken response = service.Create(new StripeOAuthTokenCreateOptions()
                                {
                                    Code = stripeAccountRequest.Code,
                                    GrantType = "authorization_code",
                                });

                                StripeAccountService accountService = new StripeAccountService();
                                StripeAccount account = accountService.Get(response.StripeUserId);

                                StripeAccountUpdateOptions accountOptions = new StripeAccountUpdateOptions()
                                {
                                    TransferScheduleInterval = "manual"
                                };
                                accountService.Update(response.StripeUserId, accountOptions);

                                stripeAccountRequest.StripeUserId = response.StripeUserId;
                                stripeAccountRequest.AccessToken = response.AccessToken;
                                stripeAccountRequest.RefreshToken = response.RefreshToken;
                                stripeAccountRequest.StripePublishableKey = response.StripePublishableKey;
                                stripeAccountRequest.LiveMode = response.LiveMode;
                                stripeAccountRequest.Scope = response.Scope;
                                stripeAccountRequest.Email = account.Email;
                                stripeAccountRequest.FirstName = account.DisplayName;
                                stripeAccountRequest.LastName = account.LegalEntity?.LastName;
                                stripeAccountRequest.UserId = stripeAccountRequest.currentUserId;
                                stripeAccountRequest.CreatedBy = stripeAccountRequest.currentUserId;
                                stripeAccountRequest.IsDefault = true;               //not completed IsDefault logic
                                stripeAccountRequest.AgencyID = stripeAccountRequest.AgencyID;
                                stripeAccountRequest.CreatedDate = DateTime.UtcNow;
                                stripeAccountRequest.IsActive = true;
                                stripeAccountRequest.IsDeleted = false;

                                Mapper.Map(stripeAccountRequest, stripeAccount);
                                _stripeDetailsRepository.Create(stripeAccount);
                                _stripeDetailsRepository.SaveChanges();
                                id = stripeAccount.Id;

                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Stripe Account Created Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Stripe Account Already Exists.";
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
                }
            }
            return res;
        }


        public ResponseViewModal PaymentDetails(PaymentDetailsViewModel payementDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (payementDetailsRequest.AgencyID > 0)
                    {
                        long id = 0;
                        PayementDetails paymentDetailsAccount = new PayementDetails();

                        if (payementDetailsRequest.AgencyID != 0 && payementDetailsRequest.Id == 0)
                        {
                            if (payementDetailsRequest.IsOffline == false)
                            {
                                StripeConfiguration.SetApiKey(APIValue);
                                StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);
                                //creates stripe account on stripe platform

                                var customers = new StripeCustomerService();
                                var usersViewModel = new UserViewModel();
                                var charges = new StripeChargeService();

                                StripeDetails stripeObj = null;
                                stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && !x.IsDeleted);

                                var stripeRequestOptions = new StripeRequestOptions();
                                stripeRequestOptions.StripeConnectAccountId = stripeObj.StripeUserId; //"acct_1EOHH1CA63N5RlJm";

                                var charge = charges.Create(new StripeChargeCreateOptions
                                {
                                    Amount = Convert.ToInt32(payementDetailsRequest.AmoutPaid) * 100,
                                    Description = "Sample Charge",
                                    Currency = "usd",
                                    SourceTokenOrExistingSourceId = payementDetailsRequest.tokenID
                                }, stripeRequestOptions);

                                payementDetailsRequest.StripeDetailsID = stripeObj.Id;
                                payementDetailsRequest.AgencyID = payementDetailsRequest.AgencyID;
                                payementDetailsRequest.ParentID = payementDetailsRequest.ParentID;
                                payementDetailsRequest.StudentID = payementDetailsRequest.StudentID;
                                payementDetailsRequest.TotalAmount = Math.Round(payementDetailsRequest.TotalAmount, 2);
                                payementDetailsRequest.PaymentFromDate = payementDetailsRequest.PaymentFromDate;
                                payementDetailsRequest.PaymentToDate = payementDetailsRequest.PaymentToDate;
                                payementDetailsRequest.AmoutPaid = Math.Round(payementDetailsRequest.AmoutPaid, 2);
                                payementDetailsRequest.BalanceAmount = payementDetailsRequest.BalanceAdvanceAmount;
                                payementDetailsRequest.PaymentDate = DateTime.UtcNow;
                                payementDetailsRequest.IsActive = true;
                                payementDetailsRequest.IsDeleted = false;
                                payementDetailsRequest.CreatedBy = payementDetailsRequest.CreatedBy;
                                payementDetailsRequest.InvoiceDetailsID = payementDetailsRequest.InvoiceDetailsID;
                                payementDetailsRequest.CreatedDate = DateTime.UtcNow;
                                payementDetailsRequest.IsOffline = false;
                                payementDetailsRequest.AdvanceAmount = payementDetailsRequest.DebitAdvanceAmount;
                                Mapper.Map(payementDetailsRequest, paymentDetailsAccount);
                                _payementDetailsRepository.Create(paymentDetailsAccount);
                                _payementDetailsRepository.SaveChanges();
                                id = paymentDetailsAccount.Id;
                                if (id > 0)
                                {
                                    InvoiceDetails invObj = new InvoiceDetails();
                                    invObj = _invoiceDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && x.Id == payementDetailsRequest.InvoiceDetailsID && !x.IsDeleted);
                                    if (!ReferenceEquals(invObj, null))
                                    {
                                        invObj.IsInvoicePaid = true;
                                        invObj.UpdatedBy = payementDetailsRequest.UpdatedBy;
                                        invObj.UpdatedDate = DateTime.UtcNow;
                                        _invoiceDetailsRepository.SaveChanges();
                                    }
                                }
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Payement Done Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                            else
                            {
                                if (payementDetailsRequest.IsPartialPayment == true)
                                {
                                    payementDetailsRequest.BalanceAmount = (Math.Round(payementDetailsRequest.PartialAmount, 2));
                                    payementDetailsRequest.IsPartialPayment = true;
                                }
                                else
                                {
                                    payementDetailsRequest.BalanceAmount = 0;
                                    payementDetailsRequest.IsPartialPayment = false;
                                }
                                payementDetailsRequest.AgencyID = payementDetailsRequest.AgencyID;
                                payementDetailsRequest.ParentID = payementDetailsRequest.ParentID;
                                payementDetailsRequest.StudentID = payementDetailsRequest.StudentID;
                                payementDetailsRequest.TotalAmount = Math.Round(payementDetailsRequest.TotalAmount, 2);
                                payementDetailsRequest.AmoutPaid = Math.Round(payementDetailsRequest.AmoutPaid, 2);
                                // payementDetailsRequest.BalanceAmount = ((Math.Round(payementDetailsRequest.TotalAmount, 2)) - (Math.Round(payementDetailsRequest.AmoutPaid, 2)));
                                payementDetailsRequest.PaymentFromDate = payementDetailsRequest.PaymentFromDate;
                                payementDetailsRequest.PaymentToDate = payementDetailsRequest.PaymentToDate;
                                payementDetailsRequest.PaymentDate = DateTime.UtcNow;
                                payementDetailsRequest.IsActive = true;
                                payementDetailsRequest.IsDeleted = false;
                                payementDetailsRequest.CreatedBy = payementDetailsRequest.CreatedBy;
                                payementDetailsRequest.InvoiceDetailsID = payementDetailsRequest.InvoiceDetailsID;
                                payementDetailsRequest.CreatedDate = DateTime.UtcNow;
                                payementDetailsRequest.IsOffline = true;
                                payementDetailsRequest.AdvanceAmount = payementDetailsRequest.DebitAdvanceAmount;
                                Mapper.Map(payementDetailsRequest, paymentDetailsAccount);
                                _payementDetailsRepository.Create(paymentDetailsAccount);
                                _payementDetailsRepository.SaveChanges();
                                id = paymentDetailsAccount.Id;
                                if (id > 0)
                                {
                                    InvoiceDetails invObj = new InvoiceDetails();
                                    invObj = _invoiceDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && x.Id == payementDetailsRequest.InvoiceDetailsID && !x.IsDeleted);
                                    if (!ReferenceEquals(invObj, null))
                                    {
                                        invObj.TotalAmount = payementDetailsRequest.BalanceAmount;
                                        if (invObj.TotalAmount == 0)
                                        {
                                            invObj.IsInvoicePaid = true;
                                        }
                                        else
                                        {
                                            invObj.IsPartialPayment = true;
                                            invObj.IsInvoicePaid = false;
                                        }
                                        invObj.UpdatedBy = payementDetailsRequest.UpdatedBy;
                                        invObj.UpdatedDate = DateTime.UtcNow;
                                        _invoiceDetailsRepository.SaveChanges();
                                    }
                                }
                                if (payementDetailsRequest.IsBalaceAmountused == true)
                                {
                                    AdvanceFeePaymentDetails afpdObj = null;
                                    payementDetailsRequest.AgencyID = payementDetailsRequest.AgencyID;
                                    payementDetailsRequest.ParentID = payementDetailsRequest.ParentID;
                                    payementDetailsRequest.StudentID = payementDetailsRequest.StudentID;
                                    payementDetailsRequest.InvoiceDetailsID = payementDetailsRequest.InvoiceDetailsID;
                                    payementDetailsRequest.IsAdvanceCreditAmount = false;
                                    payementDetailsRequest.CreditAdvanceAmount = payementDetailsRequest.CreditAdvanceAmount;
                                    payementDetailsRequest.IsAdvanceDebitAmount = true;
                                    payementDetailsRequest.DebitAdvanceAmount = payementDetailsRequest.DebitAdvanceAmount;
                                    payementDetailsRequest.BalanceAmount = payementDetailsRequest.BalanceAdvanceAmount;
                                    payementDetailsRequest.IsOffline = false;
                                    afpdObj = Mapper.Map<AdvanceFeePaymentDetails>(payementDetailsRequest);
                                    _advanceFeePaymentDetailsRepository.Create(afpdObj);
                                    _advanceFeePaymentDetailsRepository.SaveChanges();
                                }
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Payement Done Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal PayPayment(PaymentDetailsViewModel payementDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (payementDetailsRequest.AgencyID > 0)
                    {
                        IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(check => check.Id == payementDetailsRequest.ParentID);
                        var parentresult = parentDetails.ToList();
                        long id = 0;
                        PayementDetails paymentDetailsAccount = new PayementDetails();

                        if (payementDetailsRequest.AgencyID != 0 && payementDetailsRequest.Id == 0)
                        {
                            if (payementDetailsRequest.IsOffline == false)
                            {
                                StripeConfiguration.SetApiKey(APIValue);
                                StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);
                                //creates stripe account on stripe platform

                                var customers = new StripeCustomerService();
                                var usersViewModel = new UserViewModel();
                                var charges = new StripeChargeService();

                                StripeDetails stripeObj = null;
                                stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && !x.IsDeleted);

                                var stripeRequestOptions = new StripeRequestOptions();
                                stripeRequestOptions.StripeConnectAccountId = stripeObj.StripeUserId; //"acct_1EOHH1CA63N5RlJm";

                                var charge = charges.Create(new StripeChargeCreateOptions
                                {
                                    Amount = Convert.ToInt32(payementDetailsRequest.AmoutPaid) * 100,
                                    Description = "Sample Charge",
                                    Currency = "usd",
                                    SourceTokenOrExistingSourceId = payementDetailsRequest.tokenID
                                }, stripeRequestOptions);

                                if (parentresult[0].IsParent != true)
                                {
                                    payementDetailsRequest.ParentID = parentresult[0].AddedByID;
                                    IQueryable<Entity.Parent.ParentStudentMapping> parentStudents = _parentStudentMappingRepository.GetAll().Where(check => check.ParentID == payementDetailsRequest.ParentID &&
                                   check.IsDeleted == false);
                                    var studentresult = parentStudents.Select(s => s.StudentID).ToList();
                                    IQueryable<Entity.Student.Student> studentsDetails = _studentRepository.GetAll().Where(check => studentresult.Contains(check.Id) && check.IsDeleted == false);
                                    var student = studentsDetails.Select(s => s.Id).ToList();
                                    var ParentID = parentresult[0].AddedByID;
                                    IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted && student.Contains(x.StudentID));
                                    if (inv_Obj.Count() != 0)
                                    {
                                        var list = inv_Obj.Select(s => new { s.StudentID, s.Id }).ToList().OrderByDescending(s => s.Id).First();
                                        payementDetailsRequest.StudentID = list.StudentID;
                                    }
                                    IQueryable<Entity.Agency.InvoiceDetails> inv_Obj1 = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted);
                                    if (inv_Obj.Count() != 0)
                                    {
                                        var list1 = inv_Obj1.Select(s => new { s.AgencyID, s.Id, s.InvoiceDate, s.InvoiceFromDate, s.InvoiceToDate, s.StudentID }).ToList().OrderByDescending(s => s.Id).First();
                                        payementDetailsRequest.InvoiceDetailsID = list1.Id;
                                        payementDetailsRequest.PaymentFromDate = list1.InvoiceFromDate;
                                        payementDetailsRequest.PaymentToDate = list1.InvoiceToDate;
                                        payementDetailsRequest.PaymentComment = "Payment By Secondary Parent";

                                    }
                                }
                                else
                                {
                                    IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == payementDetailsRequest.ParentID && !x.IsDeleted);
                                    if (inv_Obj.Count() != 0)
                                    {
                                        var list = inv_Obj.Select(s => new { s.AgencyID, s.Id, s.InvoiceDate, s.InvoiceFromDate, s.InvoiceToDate, s.StudentID }).ToList().OrderByDescending(s => s.Id).First();
                                        payementDetailsRequest.InvoiceDetailsID = list.Id;
                                        payementDetailsRequest.StudentID = list.StudentID;
                                        payementDetailsRequest.PaymentFromDate = list.InvoiceFromDate;
                                        payementDetailsRequest.PaymentToDate = list.InvoiceToDate;
                                    }
                                }
                                payementDetailsRequest.StripeDetailsID = stripeObj.Id;
                                payementDetailsRequest.AgencyID = payementDetailsRequest.AgencyID;
                                payementDetailsRequest.ParentID = payementDetailsRequest.ParentID;
                                payementDetailsRequest.TotalAmount = Math.Round(payementDetailsRequest.AmoutPaid, 2);
                                payementDetailsRequest.AmoutPaid = Math.Round(payementDetailsRequest.AmoutPaid, 2);
                                payementDetailsRequest.BalanceAmount = payementDetailsRequest.BalanceAdvanceAmount;
                                payementDetailsRequest.PaymentDate = DateTime.UtcNow;
                                payementDetailsRequest.IsActive = true;
                                payementDetailsRequest.IsDeleted = false;
                                payementDetailsRequest.CreatedBy = payementDetailsRequest.CreatedBy;
                                payementDetailsRequest.CreatedDate = DateTime.UtcNow;
                                payementDetailsRequest.IsOffline = false;
                                payementDetailsRequest.PaymentType = "Online";
                                payementDetailsRequest.PaymentDescription = "Payment-Online";
                                payementDetailsRequest.AdvanceAmount = payementDetailsRequest.DebitAdvanceAmount;
                                Mapper.Map(payementDetailsRequest, paymentDetailsAccount);
                                _payementDetailsRepository.Create(paymentDetailsAccount);
                                _payementDetailsRepository.SaveChanges();
                                id = paymentDetailsAccount.Id;
                                if (id > 0)
                                {
                                    InvoiceDetails invObj = new InvoiceDetails();
                                    invObj = _invoiceDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && x.Id == payementDetailsRequest.InvoiceDetailsID && !x.IsDeleted);
                                    if (!ReferenceEquals(invObj, null))
                                    {
                                        invObj.IsInvoicePaid = true;
                                        invObj.UpdatedBy = payementDetailsRequest.UpdatedBy;
                                        invObj.UpdatedDate = DateTime.UtcNow;
                                        _invoiceDetailsRepository.SaveChanges();
                                    }
                                }
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Payement Done Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        public ResponseViewModal GetStripeDetailsForAgency(StripeDetailsRequestViewModel stripeDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StripeDetailsViewModel> allStripeDetails = new List<StripeDetailsViewModel>();
                IQueryable<Entity.Agency.StripeDetails> selectedStripe = _stripeDetailsRepository.GetAll().Where(Check => Check.AgencyID == stripeDetailsRequest.AgencyID); ;
                allStripeDetails = (from stripeObj in selectedStripe
                                    select new StripeDetailsViewModel()
                                    {
                                        Id = stripeObj.Id,
                                        UserId = stripeObj.UserId,
                                        StripeUserId = stripeObj.StripeUserId,
                                        AccessToken = stripeObj.AccessToken,
                                        RefreshToken = stripeObj.RefreshToken,
                                        Scope = stripeObj.Scope,
                                        LiveMode = stripeObj.LiveMode,
                                        StripePublishableKey = stripeObj.StripePublishableKey,
                                        IsDefault = stripeObj.IsDefault,
                                        FirstName = stripeObj.FirstName,
                                        LastName = stripeObj.LastName,
                                        Email = stripeObj.Email,
                                        IsDeleteRequested = stripeObj.IsDeleteRequested,
                                        currentUserId = stripeObj.UserId ?? 0,
                                        AgencyID = stripeObj.AgencyID
                                    }).ToList();
                res.Data = allStripeDetails;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Stripe Details have been successfully fetched.";
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

        public ResponseViewModal GetPaymentDetailsForParent(PaymentDetailsViewModel paymentDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<PaymentDetailsViewModel> allPayementDetails = new List<PaymentDetailsViewModel>();
                IQueryable<Entity.Agency.PayementDetails> selectedPayement = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID && Check.ParentID == paymentDetailsRequest.ParentID);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.ClassEnrollment> selectedEnrollement = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                allPayementDetails = (from paymentObj in selectedPayement
                                      join parentObj in selectedParent on paymentObj.ParentID equals parentObj.Id
                                      join studObj in selectedStudent on paymentObj.StudentID equals studObj.Id
                                      join enrollObj in selectedEnrollement on studObj.Id equals enrollObj.StudentID
                                      join classObj in selectedClasses on enrollObj.ClassesID equals classObj.Id
                                      select new PaymentDetailsViewModel()
                                      {
                                          Id = paymentObj.Id,
                                          ParentID = paymentObj.ParentID,
                                          StudentID = paymentObj.StudentID,
                                          TotalAmount = paymentObj.TotalAmount,
                                          AgencyID = paymentObj.AgencyID,
                                          ParentName = parentObj.ParentName,
                                          StudentName = studObj.StudentName,
                                          PaymentFromDate = Convert.ToDateTime(paymentObj.PaymentFromDate),
                                          PaymentToDate = Convert.ToDateTime(paymentObj.PaymentToDate),
                                          PaymentDate = Convert.ToDateTime(paymentObj.PaymentDate),
                                          IsOffline = paymentObj.IsOffline,
                                          ClassName = classObj.ClassName,
                                          PaymentDescription = paymentObj.PaymentDescription
                                      }).ToList();
                var result = allPayementDetails.GroupBy(p => p.Id).Select(p => p.First()).ToList();
                foreach (var r in result)
                {
                    var className = allPayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassName).ToArray();
                    r.ClassName = string.Join(",", className);
                }
                res.Data = result;

                if (paymentDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((paymentDetailsRequest.page) * paymentDetailsRequest.limit).Take(paymentDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Details have been successfully fetched.";
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

        // Create for Version 2
        public async Task<ResponseViewModal> GetPaymentDetailForParentAsync(PaymentDetailsViewModel paymentDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                int pid = Convert.ToInt32(paymentDetailsRequest.ParentID);
                string query = "paymentdetailsforparent";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("parent_id", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<PaymentDetailsViewModel> paymentDetails = await _baserepository.GetAsync<PaymentDetailsViewModel>(query, parameters, CommandType.StoredProcedure);
                var result = paymentDetails.ToList();
                res.Data = result;

                if (paymentDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((paymentDetailsRequest.page) * paymentDetailsRequest.limit).Take(paymentDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Details have been successfully fetched.";
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

        public static List<Tuple<DateTime, DateTime>> GetWeeklySlots(DateTime fromDate, DateTime toDate, DayOfWeek startOfWeek)
        {
            var fromDayOfWeek = (int)fromDate.DayOfWeek;
            var startDate = fromDate.AddDays((int)startOfWeek - fromDayOfWeek);

            var toDayOfWeek = (int)toDate.DayOfWeek;
            var endDate = toDate.AddDays(6 + (int)startOfWeek - toDayOfWeek);

            var slots = new List<Tuple<DateTime, DateTime>>();

            var tmpDate = startDate;
            while (tmpDate <= endDate)
            {
                slots.Add(new Tuple<DateTime, DateTime>(tmpDate, tmpDate.AddDays(6)));
                tmpDate = tmpDate.AddDays(7);
            }
            return slots;
        }

        public static List<Tuple<DateTime, DateTime>> GetMonthlySlots(DateTime fromDate, DateTime toDate)
        {
            var startDate = new DateTime(fromDate.Year, fromDate.Month, 1);
            var endDate = new DateTime(toDate.Year, toDate.Month, DateTime.DaysInMonth(toDate.Year, toDate.Month));

            var slots = new List<Tuple<DateTime, DateTime>>();

            var tmpDate = startDate;
            while (tmpDate < endDate)
            {
                slots.Add(new Tuple<DateTime, DateTime>(tmpDate, new DateTime(tmpDate.Year, tmpDate.Month, DateTime.DaysInMonth(tmpDate.Year, tmpDate.Month))));
                tmpDate = tmpDate.AddMonths(1);
            }
            return slots;
        }

        public ResponseViewModal InvoiceSchedular(InvoiceSchedularViewModel invoiceSchRequest)
        {
            ResponseViewModal res = new ResponseViewModal();

            try
            {
                if (invoiceSchRequest.Frequency == "Weekly")
                {
                    // cycle from monday to sunday
                    var MinDate = (from d in _classEnrollmentRepository.GetAll() select d.ClassEnrollStartDate).Min();
                    var fromDate = new DateTime(2019, 1, 1);
                    //var fromDate = MinDate;
                    var toDate = DateTime.Today;
                    //var toDate = DateTime.UtcNow;
                    var slots = GetWeeklySlots(fromDate, toDate, DayOfWeek.Monday);

                    var list = new List<ClassEnrollment>();
                    foreach (var slot in slots)
                    {
                        list = _classEnrollmentRepository.GetAll().Where(x => ((slot.Item1 >= x.ClassEnrollStartDate) || (slot.Item1 <= x.ClassEnrollStartDate && x.ClassEnrollStartDate <= slot.Item2)) && x.EnrollmentStatus == 2).ToList();

                        foreach (var item in list)
                        {
                            InvoiceDetails(new InvoiceDetailsViewModel
                            {
                                AgencyID = item.AgencyID,
                                InvoiceFromDate = slot.Item1,
                                InvoiceToDate = slot.Item2,
                                InvoiceDate = DateTime.Today,
                                StudentID = item.StudentID,
                                FeePercentage = (slot.Item1 <= item.ClassEnrollStartDate && item.ClassEnrollStartDate <= slot.Item2) ? (7M - (decimal)(item.ClassEnrollStartDate.Date - slot.Item1.Date).TotalDays) / 7M : 1M
                            });
                        }
                    }
                    res.IsSuccess = true;
                    res.Message = "Action Completed Successfully.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
                }
                else if (invoiceSchRequest.Frequency == "Monthly")
                {
                    // cycle from monday to sunday
                    var MinDate = (from d in _classEnrollmentRepository.GetAll() select d.ClassEnrollStartDate).Min();
                    var fromDate = MinDate;
                    var toDate = DateTime.UtcNow;
                    var slots = GetMonthlySlots(fromDate, toDate);

                    var list = new List<ClassEnrollment>();
                    foreach (var slot in slots)
                    {
                        list = _classEnrollmentRepository.GetAll().Where(x => ((slot.Item1 >= x.ClassEnrollStartDate) || (slot.Item1 <= x.ClassEnrollStartDate && x.ClassEnrollStartDate <= slot.Item2)) && x.EnrollmentStatus == 2).ToList();

                        foreach (var item in list)
                        {
                            InvoiceDetails(new InvoiceDetailsViewModel
                            {
                                AgencyID = item.AgencyID,
                                InvoiceFromDate = slot.Item1,
                                InvoiceToDate = slot.Item2,
                                InvoiceDate = DateTime.Today,
                                StudentID = item.StudentID,
                                FeePercentage = 4 * ((slot.Item1 <= item.ClassEnrollStartDate && item.ClassEnrollStartDate <= slot.Item2) ? (DateTime.DaysInMonth(slot.Item1.Year, slot.Item1.Month) - (decimal)(item.ClassEnrollStartDate.Date - slot.Item1.Date).TotalDays) / DateTime.DaysInMonth(slot.Item1.Year, slot.Item1.Month) : 1M)
                            });
                        }
                    }
                    if (res.IsSuccess == true)
                    {
                        res.IsSuccess = true;
                        res.Message = "Invoice Posted Successfully.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.Message = "Invoice Already Generated.";
                        res.StatusCode = 205;
                    }
                }
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

        public ResponseViewModal InvoiceDetails(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (invoiceDetailsRequest.AgencyID > 0)
                    {
                        long id = 0;
                        List<PayCalViewModel> payCalViewModels = new List<PayCalViewModel>();
                        List<ClassEnrollment> classEnrollment = new List<ClassEnrollment>();
                        InvoiceDetails invoiceDetails = null;
                        InvoiceItemDetails invoiceItemDetails = new InvoiceItemDetails();
                        ParentStudentMapping mappingParentStudent = new ParentStudentMapping();
                        Classes classDetails = new Classes();

                        payCalViewModels = (from enrollObj in _classEnrollmentRepository.GetAll()
                                            join classObj in _classRepository.GetAll() on enrollObj.ClassesID equals classObj.Id
                                            where enrollObj.StudentID == invoiceDetailsRequest.StudentID
                                            select new PayCalViewModel()
                                            {
                                                enrollmentID = enrollObj.Id,
                                                classFess = classObj.Fees,
                                                studentID = enrollObj.StudentID,
                                                classID = enrollObj.ClassesID
                                            }).ToList();

                        var result = payCalViewModels;
                        payCalViewModels = payCalViewModels.GroupBy(x => x.studentID).Select(x => new PayCalViewModel
                        {
                            classFess = Math.Round(x.Sum(f => f.classFess * invoiceDetailsRequest.FeePercentage), 2),
                            studentID = x.FirstOrDefault().studentID,
                        }).ToList();
                        mappingParentStudent = _parentStudentMappingRepository.Get(x => x.AgencyID == invoiceDetailsRequest.AgencyID && x.StudentID == invoiceDetailsRequest.StudentID && x.IsParent == true);
                        invoiceDetails = _invoiceDetailsRepository.Get(x => x.AgencyID == invoiceDetailsRequest.AgencyID && x.StudentID == invoiceDetailsRequest.StudentID && x.InvoiceFromDate == invoiceDetailsRequest.InvoiceFromDate && x.InvoiceToDate == invoiceDetailsRequest.InvoiceToDate && !x.IsDeleted);
                        foreach (var r in payCalViewModels)
                        {
                            if (ReferenceEquals(invoiceDetails, null))
                            {
                                Random random = new Random();
                                int num = random.Next(1, 999999999);
                                invoiceDetailsRequest.AgencyID = invoiceDetailsRequest.AgencyID;
                                invoiceDetailsRequest.ParentID = mappingParentStudent.ParentID;
                                //invoiceDetailsRequest.InvoiceFromDate = r.classEnrollDate;
                                invoiceDetailsRequest.InvoiceFromDate = invoiceDetailsRequest.InvoiceFromDate;
                                //DateTime newDate = invoiceDetailsRequest.InvoiceFromDate.AddDays(7);
                                invoiceDetailsRequest.InvoiceToDate = invoiceDetailsRequest.InvoiceToDate;
                                invoiceDetailsRequest.InvoiceAmount = r.classFess;
                                invoiceDetailsRequest.DiscountAmount = 0;
                                invoiceDetailsRequest.DueAmount = 0;
                                invoiceDetailsRequest.TotalAmount = (invoiceDetailsRequest.InvoiceAmount - invoiceDetailsRequest.DiscountAmount) + invoiceDetailsRequest.DueAmount;
                                invoiceDetailsRequest.InvoiceNo = invoiceDetailsRequest.AgencyID + "-" + invoiceDetailsRequest.ParentID + "-" + invoiceDetailsRequest.StudentID + "-" + DateTime.Now.ToString("yyyyMMdd") + "-" + num;
                                invoiceDetailsRequest.IsActive = true;
                                invoiceDetailsRequest.IsDeleted = false;
                                invoiceDetailsRequest.CreatedBy = invoiceDetailsRequest.CreatedBy;
                                invoiceDetailsRequest.CreatedDate = DateTime.UtcNow;
                                invoiceDetails = new InvoiceDetails();
                                Mapper.Map(invoiceDetailsRequest, invoiceDetails);
                                _invoiceDetailsRepository.Create(invoiceDetails);
                                _invoiceDetailsRepository.SaveChanges();
                                id = invoiceDetails.Id;
                                if (id > 0)
                                {
                                    foreach (var l in result)
                                    {
                                        long itemdetailsid = 0;
                                        invoiceItemDetails = new InvoiceItemDetails();
                                        invoiceItemDetails.Id = 0;
                                        invoiceItemDetails.AgencyID = invoiceDetailsRequest.AgencyID;
                                        invoiceItemDetails.ParentID = mappingParentStudent.ParentID;
                                        invoiceItemDetails.StudentID = invoiceDetailsRequest.StudentID;
                                        invoiceItemDetails.ClassesID = l.classID;
                                        invoiceItemDetails.ClassFees = (l.classFess);
                                        invoiceItemDetails.InvoiceDetailsID = id;
                                        invoiceItemDetails.IsActive = true;
                                        invoiceItemDetails.IsDeleted = false;
                                        invoiceItemDetails.CreatedBy = invoiceDetailsRequest.CreatedBy;
                                        invoiceItemDetails.CreatedDate = DateTime.UtcNow;
                                        _invoiceItemDetailsRepository.Create(invoiceItemDetails);
                                        _invoiceItemDetailsRepository.SaveChanges();
                                        itemdetailsid = invoiceItemDetails.Id;
                                    }
                                }
                                res.IsSuccess = true;
                                res.Message = "Invoice Generated Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                            else
                            {
                                res.IsSuccess = false;
                                res.Message = "Invoice Already Generated.";
                                res.StatusCode = 205;
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        public ResponseViewModal GetFessPaymentTypeDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allFessPaymentTypeDropdown = new List<DropdownViewModel>();
                allFessPaymentTypeDropdown = (from paymentObj in _feesPaymentTypeRepository.GetAll()
                                              where (!paymentObj.IsDeleted)
                                              select new DropdownViewModel()
                                              {
                                                  Value = paymentObj.Id,
                                                  label = paymentObj.FeePaymentTypeName,
                                              }).OrderBy(c => c.label).ToList();
                res.Data = allFessPaymentTypeDropdown;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment type list has been successfully fetched.";
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



        public ResponseViewModal GetDuePaymentAccordingToParent(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<InvoiceDetailsViewModel> allDuePayementDetails = new List<InvoiceDetailsViewModel>();
                IQueryable<Entity.Agency.InvoiceDetails> selectedInvoice = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsInvoicePaid == false && Check.ParentID == invoiceDetailsRequest.ParentID);
                IQueryable<Entity.Parent.ParentStudentMapping> selectedMap = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.ParentID == invoiceDetailsRequest.ParentID);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID); ;
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.InvoiceItemDetails> selectedInvoiceItemDetails = _invoiceItemDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidyDetails = _studentsubsidyDetailsRepository.GetAll().Where(Check => (Check.FromDate.Date <= DateTime.Now.Date && Check.ToDate.Date >= DateTime.Now.Date) && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.SubsidyDetails> subsidyDetails = _subsidyDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);

                allDuePayementDetails = (from invoiceObj in selectedInvoice
                                         join invoiceItemObj in selectedInvoiceItemDetails on invoiceObj.Id equals invoiceItemObj.InvoiceDetailsID
                                         join classObj in selectedClasses on invoiceItemObj.ClassesID equals classObj.Id
                                         join parentObj in selectedParent on invoiceObj.ParentID equals parentObj.Id
                                         join studObj in selectedStudent on invoiceObj.StudentID equals studObj.Id
                                         select new InvoiceDetailsViewModel()
                                         {
                                             Id = invoiceObj.Id,
                                             InvoiceDetailsID = invoiceObj.Id,
                                             ParentID = invoiceObj.ParentID,
                                             StudentID = invoiceObj.StudentID,
                                             InvoiceAmount = invoiceObj.InvoiceAmount,
                                             TotalAmount = invoiceObj.TotalAmount + invoiceObj.DiscountAmount,
                                             InvoiceFromDate = Convert.ToDateTime(invoiceObj.InvoiceFromDate),
                                             InvoiceToDate = Convert.ToDateTime(invoiceObj.InvoiceToDate),
                                             DueAmount = invoiceObj.DueAmount,
                                             AgencyID = invoiceObj.AgencyID,
                                             ParentName = parentObj.ParentName,
                                             StudentName = studObj.StudentName,
                                             ClassName = classObj.ClassName,
                                             ClassId = Convert.ToString(invoiceItemObj.ClassesID),
                                             ClassFees = Convert.ToString(invoiceItemObj.ClassFees),
                                             DiscountAmount = invoiceObj.DiscountAmount
                                         }).ToList();

                var result = allDuePayementDetails.GroupBy(p => p.Id).Select(p => p.First()).ToList();
                foreach (var r in result)
                {
                    var allDetailsSubsidy = (from SSDObj in studentsubsidyDetails
                                             join SDObj in subsidyDetails on SSDObj.SubsidyDetailsID equals SDObj.Id
                                             where (SSDObj.FromDate.Date <= DateTime.Now.Date && SSDObj.ToDate.Date >= DateTime.Now.Date)
                                             && SSDObj.StudentID == r.StudentID && SSDObj.IsDeleted == false
                                             select new SubsidyDetailsViewModel()
                                             {
                                                 Id = SSDObj.SubsidyDetailsID,
                                                 SubsidyAmount = SDObj.SubsidyAmount,
                                             }).FirstOrDefault();

                    if (!(allDetailsSubsidy == null))
                    {
                        if (r.InvoiceAmount <= allDetailsSubsidy.SubsidyAmount)
                        {
                            r.InvoiceAmount = 0;
                        }
                        else
                        {
                            decimal Amount = r.InvoiceAmount;
                            r.InvoiceAmount = (Amount - allDetailsSubsidy.SubsidyAmount);
                        }
                        r.SubsidyAmount = allDetailsSubsidy.SubsidyAmount;
                        r.SubsidyDetailsID = allDetailsSubsidy.Id;
                        r.TotalAmount = r.TotalAmount + r.SubsidyAmount;
                    }
                    else
                    {
                        r.SubsidyAmount = 0;
                        r.TotalAmount = r.TotalAmount + r.SubsidyAmount;
                    }

                    var className = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassName).ToArray();
                    var classId = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassId).ToArray();
                    var classFees = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassFees).ToArray();
                    r.ClassName = string.Join(",", className);
                    r.ClassId = string.Join(",", classId);
                    r.ClassFees = string.Join(",", classFees);
                }
                res.Data = result;
                if (invoiceDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((invoiceDetailsRequest.page) * invoiceDetailsRequest.limit).Take(invoiceDetailsRequest.limit).ToList();
                }

                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Due Details have been successfully fetched.";
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


        public ResponseViewModal GetDuePaymentAccordingToAgency(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<InvoiceDetailsViewModel> allDuePayementDetails = new List<InvoiceDetailsViewModel>();
                IQueryable<Entity.Agency.InvoiceDetails> selectedInvoice = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsInvoicePaid == false);
                IQueryable<Entity.Parent.ParentStudentMapping> selectedMap = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                string StudentName = invoiceDetailsRequest.StudentName.TrimStart();
                StudentName = StudentName.TrimEnd();
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.StudentName.ToUpper().Contains(StudentName.ToUpper()));
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.InvoiceItemDetails> selectedInvoiceItemDetails = _invoiceItemDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidyDetails = _studentsubsidyDetailsRepository.GetAll().Where(Check => (Check.FromDate.Date <= DateTime.Now.Date && Check.ToDate.Date >= DateTime.Now.Date) && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.SubsidyDetails> subsidyDetails = _subsidyDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);

                allDuePayementDetails = (from invoiceObj in selectedInvoice
                                         join invoiceItemObj in selectedInvoiceItemDetails on invoiceObj.Id equals invoiceItemObj.InvoiceDetailsID
                                         join classObj in selectedClasses on invoiceItemObj.ClassesID equals classObj.Id
                                         join parentObj in selectedParent on invoiceObj.ParentID equals parentObj.Id
                                         join studObj in selectedStudent on invoiceObj.StudentID equals studObj.Id
                                         select new InvoiceDetailsViewModel()
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
                var result = allDuePayementDetails.GroupBy(p => p.Id).Select(p => p.First()).ToList();
                TransactionDetails transObj = null;
                foreach (var r in result)
                {
                    var allDetails = (from AFPDObj in advanceFeePaymentDetails
                                      where AFPDObj.ParentID == r.ParentID &&
                                      AFPDObj.IsDeleted == false
                                      orderby AFPDObj.Id descending
                                      select new AdvanceFeePaymentDetailsViewModel()
                                      {
                                          BalanceAmount = AFPDObj.BalanceAmount
                                      }).FirstOrDefault();

                    if (!(allDetails == null))
                    {
                        r.AdvancePaymentBalanceAmount = allDetails.BalanceAmount;
                    }
                    else
                    {
                        r.AdvancePaymentBalanceAmount = 0;
                    }

                    if (r.IsPartialPayment == false)
                    {
                        var allDetailsSubsidy = (from SSDObj in studentsubsidyDetails
                                                 join SDObj in subsidyDetails on SSDObj.SubsidyDetailsID equals SDObj.Id
                                                 where (SSDObj.FromDate.Date <= DateTime.Now.Date && SSDObj.ToDate.Date >= DateTime.Now.Date)
                                                 && SSDObj.StudentID == r.StudentID && SSDObj.IsDeleted == false
                                                 select new SubsidyDetailsViewModel()
                                                 {
                                                     Id = SSDObj.SubsidyDetailsID,
                                                     SubsidyAmount = SDObj.SubsidyAmount,
                                                 }).FirstOrDefault();

                        if (!(allDetailsSubsidy == null))
                        {
                            r.SubsidyAmount = allDetailsSubsidy.SubsidyAmount;
                            r.SubsidyDetailsID = allDetailsSubsidy.Id;
                        }
                        else
                        {
                            r.SubsidyAmount = 0;
                        }
                    }
                    else
                    {
                        r.SubsidyAmount = 0;
                    }

                    var className = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassName).ToArray();
                    var classId = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassId).ToArray();
                    var classFees = allDuePayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassFees).ToArray();
                    r.ClassName = string.Join(",", className);
                    r.ClassId = string.Join(",", classId);
                    r.ClassFees = string.Join(",", classFees);
                    transObj = _transactionDetailsRepository.Get(x => x.InvoiceNo == r.InvoiceNo && !x.IsDeleted);
                    if (!ReferenceEquals(transObj, null))
                    {
                        r.isTrasactionHeadAdded = true;
                    }
                    else
                    {
                        r.isTrasactionHeadAdded = false;
                    }
                }
                res.Data = result;
                if (invoiceDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((invoiceDetailsRequest.page) * invoiceDetailsRequest.limit).Take(invoiceDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Due Details have been successfully fetched.";
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


        public ResponseViewModal AgencyRegistration(AgencyViewModel saveAgencyRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                SubscriptionDetailsViewModel saveSubscriptionDetailsRequest = new SubscriptionDetailsViewModel();
                if (saveAgencyRequest.Id == 0)
                {
                    saveAgencyRequest.Status = 1;
                    var result = SaveAgencyInformation(saveAgencyRequest);
                    if (result.StatusCode == 200)
                    {
                        saveSubscriptionDetailsRequest.AgencyID = result.AgencyId;
                        saveSubscriptionDetailsRequest.PlanID = saveAgencyRequest.PlanID;
                        saveSubscriptionDetailsRequest.SourceToken = saveAgencyRequest.SourceToken;
                        saveSubscriptionDetailsRequest.IsOffline = false;
                        saveSubscriptionDetailsRequest.EmailId = saveAgencyRequest.EmailId;
                        saveSubscriptionDetailsRequest.Amount = saveAgencyRequest.Amount;
                        saveSubscriptionDetailsRequest.IsNew = saveAgencyRequest.IsNew;
                        var result1 = SaveSubscriptionInformation(saveSubscriptionDetailsRequest);
                        if (result1.StatusCode == 200)
                        {
                            DisplayMessage = "Agency Information has been saved.";
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else if (result.StatusCode == 986)
                    {
                        res.StatusCode = 986;
                        DisplayMessage = "User Already Exist.";
                        res.IsSuccess = false;
                    }
                    else
                    {
                        res.StatusCode = 986;
                        DisplayMessage = "User Already Exist.";
                        res.IsSuccess = false;
                    }
                }
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;

        }



        public ResponseViewModal SaveAgencyInformation(AgencyViewModel saveAgencyRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    long userid = 0;
                    bool pin = false;
                    Users userObj = new Users();
                    Entity.Masters.Agency agObj = null;
                    if (saveAgencyRequest.Id == 0)
                    {
                        string EmailIdSpace = saveAgencyRequest.EmailId.TrimStart();
                        string EmailId = EmailIdSpace.TrimEnd();
                        IQueryable<Entity.User.Users> selectedUser = _userRepository.GetAll().Where(check => check.EmailAddress.ToUpper() == EmailId.ToUpper());
                        if (selectedUser.GetEnumerator().MoveNext() == false)
                        {
                            AgencyQuickPin = _commonService.GenerateAgencyCode();
                            while (pin == false)
                            {
                                IQueryable<Entity.Masters.Agency> agencyDetails = _agencyRepository.GetAll().Where(Check => Check.QuickPin == AgencyQuickPin && Check.IsDeleted == false);

                                if (agencyDetails.Count() != 0)
                                {
                                    AgencyQuickPin = _commonService.GenerateAgencyCode();
                                    pin = false;
                                }
                                else
                                {
                                    pin = true;
                                }
                            }
                            userObj.UserName = saveAgencyRequest.OwnerFirstName + ' ' + saveAgencyRequest.OwnerLastName;
                            userObj.FirstName = saveAgencyRequest.OwnerFirstName;
                            userObj.LastName = saveAgencyRequest.OwnerLastName;
                            userObj.PhoneNumber = saveAgencyRequest.Mobile;
                            userObj.EmailAddress = saveAgencyRequest.EmailId;
                            userObj.IsActive = true;
                            userObj.IsDeleted = false;
                            userObj.CreatedDate = DateTime.UtcNow;
                            userObj.CreatedBy = saveAgencyRequest.CreatedBy;
                            userObj.RoleId = 2;
                            NewPassword = "daycare@123";
                            QuickPin = string.Empty;
                            userObj.QuickPin = QuickPin;
                            userObj.Password = Crypto.HashPassword(NewPassword);
                            _userRepository.Create(userObj);
                            _userRepository.SaveChanges();
                            userid = userObj.Id;
                            if (userid > 0)
                            {
                                saveAgencyRequest.CreatedBy = saveAgencyRequest.CreatedBy;
                                saveAgencyRequest.CreatedDate = DateTime.UtcNow;
                                saveAgencyRequest.IsActive = true;
                                saveAgencyRequest.IsDeleted = false;
                                saveAgencyRequest.UserID = userid;
                                saveAgencyRequest.LoginStatus = false;
                                saveAgencyRequest.QuickPin = AgencyQuickPin;
                                saveAgencyRequest.MessageCount = 100;
                                saveAgencyRequest.MessageCountStartDate = DateTime.Now;
                                saveAgencyRequest.IsPolicyEULAAccept = true;
                                saveAgencyRequest.PolicyEULAAcceptDate = DateTime.Now;
                                agObj = new Entity.Masters.Agency();
                                Mapper.Map(saveAgencyRequest, agObj);
                                _agencyRepository.Create(agObj);
                                _agencyRepository.SaveChanges();
                                id = agObj.Id;
                                daycaredb.Commit();
                            }
                            if (userid > 0 && id > 0)
                            {
                                //var encodedUserId = commonMethods.Encryption(userid);
                                var url = configuration.GetSection("FrontEndUrl").GetSection("CreatePasswordUrl").Value;
                                // _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", "Hello,<br><br>Welcome to Classroom Panda!<br><br>Your Login Credentials are User Name :<b> " + userObj.EmailAddress + "</b> and Password : <b>" + NewPassword + "</b><br><br>If you require any assistance with accessing the system please contact us at info@classroompanda.com.<br><br>Administrators: Please ensure all data is migrated over to the system before resetting passwords.<br><br>The parents & teacher application are available on  Android, IOS & Amazon stores by searching Classroom Panda.<br><br>Thanks.");
                                string message = "<!DOCTYPE html><html><head><title></title></head><body>Hello,<br><br>Welcome to Classroom Panda!<br><br><p>Your User Name :</p><b> " + userObj.EmailAddress + "</b> <br> <p>Your Agency Code :</p><b> " + AgencyQuickPin + "</b> <br> <p>Please click below the link to create your password</p> <b><a href = '" + url + "/" + userid + "'> Create Your Password </a> </b> " + "<br><p>If you require any assistance with accessing the system please contact us at info@classroompanda.com.</p><br><br><p>Administrators: Please ensure all data is migrated over to the system before resetting passwords.</p><br><br><p>The parents & teacher application are available on  Android, IOS & Amazon stores by searching Classroom Panda.<p/><br><br><p>Thanks.</p></body></html>";
                                _commonService.SendEmailSync(userObj.EmailAddress, "Account Created for Classroom Panda", message);
                            }
                            DisplayMessage = "Agency Information has been saved.";
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.AgencyId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            DisplayMessage = "User Already Exist.";
                            res.IsSuccess = false;
                        }
                    }
                    else if (saveAgencyRequest.Id > 0)
                    {
                        agObj = _agencyRepository.Get(x => x.Id == saveAgencyRequest.Id && !x.IsDeleted);
                        userObj = _userRepository.Get(x => x.Id == agObj.UserID && !x.IsDeleted);
                        if (!ReferenceEquals(agObj, null))
                        {
                            agObj.OwnerFirstName = saveAgencyRequest.OwnerFirstName;
                            agObj.OwnerLastName = saveAgencyRequest.OwnerLastName;
                            agObj.AgencyName = saveAgencyRequest.AgencyName;
                            agObj.ContactPersonFirstName = saveAgencyRequest.ContactPersonFirstName;
                            agObj.ContactPersonLastName = saveAgencyRequest.ContactPersonLastName;
                            agObj.GenderID = saveAgencyRequest.GenderID;
                            agObj.Profession = saveAgencyRequest.Profession;
                            agObj.Mobile = saveAgencyRequest.Mobile;
                            agObj.CurrentSubscriptionPlanId = saveAgencyRequest.CurrentSubscriptionPlanId;
                            agObj.PayPalSubscriptionId = saveAgencyRequest.PayPalSubscriptionId;
                            agObj.PayPalUserId = saveAgencyRequest.PayPalUserId;
                            agObj.SubscriptionValidUpto = saveAgencyRequest.SubscriptionValidUpto;
                            agObj.TrialStart = saveAgencyRequest.TrialStart;
                            agObj.TrialEnd = saveAgencyRequest.TrialEnd;
                            agObj.IsTrialMailSent = saveAgencyRequest.IsTrialMailSent;
                            agObj.CityId = saveAgencyRequest.CityId;
                            agObj.StateId = saveAgencyRequest.StateId;
                            agObj.CountryId = saveAgencyRequest.CountryId;
                            agObj.PostalCode = saveAgencyRequest.PostalCode;
                            agObj.Address = saveAgencyRequest.Address;
                            agObj.Status = saveAgencyRequest.Status;
                            agObj.UpdatedBy = agObj.UpdatedBy;
                            agObj.UpdatedDate = DateTime.UtcNow;
                            agObj.ImagePath = saveAgencyRequest.ImagePath;
                            userObj.UserName = saveAgencyRequest.OwnerFirstName + ' ' + saveAgencyRequest.OwnerLastName;
                            userObj.FirstName = saveAgencyRequest.OwnerFirstName;
                            userObj.LastName = saveAgencyRequest.OwnerLastName;
                            _userRepository.SaveChanges();
                            _agencyRepository.SaveChanges();
                            daycaredb.Commit();
                        }
                        res.IsSuccess = true;
                        DisplayMessage = "Agency Information has been updated.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    res.Message = DisplayMessage;
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


        public ResponseViewModal GetAllAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                string AgencyName = getAgencyDetailsRequest.AgencyName.TrimStart();
                AgencyName = AgencyName.TrimEnd();

                List<AgencyViewModel> allAgency = new List<AgencyViewModel>();
                IQueryable<Entity.Masters.Agency> selectedAgency = _agencyRepository.GetAll().Where(Check => Check.Status == getAgencyDetailsRequest.status && Check.AgencyName.ToUpper().Contains(AgencyName.ToUpper()));
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(Check => !Check.IsDeleted);

                allAgency = (from agencyObj in selectedAgency
                             join countryObj in selectedCountry on agencyObj.CountryId equals countryObj.Id
                             join stateObj in selectedState on agencyObj.StateId equals stateObj.Id
                             join cityObj in selectedCity on agencyObj.CityId equals cityObj.Id
                             select new AgencyViewModel
                             {
                                 AgencyName = agencyObj.AgencyName,
                                 ContactPersonFirstName = agencyObj.ContactPersonFirstName,
                                 ContactPersonLastName = agencyObj.ContactPersonLastName,
                                 OwnerFirstName = agencyObj.OwnerFirstName,
                                 OwnerLastName = agencyObj.OwnerLastName,
                                 OwnerName = agencyObj.OwnerFirstName + " " + agencyObj.OwnerLastName,
                                 CityId = agencyObj.CityId,
                                 CityName = cityObj.CityName,
                                 StateId = agencyObj.StateId,
                                 StateName = stateObj.StateName,
                                 CountryId = agencyObj.CountryId,
                                 CountryName = countryObj.CountryName,
                                 CreatedFromIP = agencyObj.CreatedFromIP,
                                 CurrentSubscriptionPlanId = agencyObj.CurrentSubscriptionPlanId,
                                 Mobile = agencyObj.Mobile,
                                 EmailId = agencyObj.EmailId,
                                 PostalCode = agencyObj.PostalCode,
                                 TrialStart = agencyObj.TrialStart,
                                 TrialEnd = agencyObj.TrialEnd,
                                 IsTrial = agencyObj.IsTrial,
                                 IsActive = agencyObj.IsActive,
                                 IsExistingAccount = agencyObj.IsExistingAccount,
                                 IsLoggedFirstTime = agencyObj.IsLoggedFirstTime,
                                 IsTrialMailSent = agencyObj.IsTrialMailSent,
                                 GenderID = agencyObj.GenderID,
                                 Id = agencyObj.Id,
                                 DeletedFromIP = agencyObj.DeletedFromIP,
                                 PayPalSubscriptionId = agencyObj.PayPalSubscriptionId,
                                 PayPalUserId = agencyObj.PayPalUserId,
                                 Profession = agencyObj.Profession,
                                 SubscriptionValidUpto = agencyObj.SubscriptionValidUpto,
                                 TimeZoneSpecification = agencyObj.TimeZoneSpecification,
                                 Address = agencyObj.Address,
                                 UpdatedFromIP = agencyObj.UpdatedFromIP,
                                 UserID = agencyObj.UserID,
                                 IsDeleted = agencyObj.IsDeleted,
                                 IsPolicyEULAAccept = agencyObj.IsPolicyEULAAccept,
                                 PolicyEULAAcceptDate = agencyObj.PolicyEULAAcceptDate
                             }).OrderBy(c => c.AgencyName).ToList();

                res.Data = allAgency;

                if (getAgencyDetailsRequest.limit != 0)
                {
                    res.Data = allAgency.Skip((getAgencyDetailsRequest.page) * getAgencyDetailsRequest.limit).Take(getAgencyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allAgency.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Agency list has been feteched";
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


        public ResponseViewModal ActivateDeactivateAgency(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            Entity.Masters.Agency agObj;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    if (getAgencyDetailsRequest.agencyID > 0)
                    {
                        if (getAgencyDetailsRequest.IsDeleted == true)
                        {
                            // For Deactivate Agency                          
                            var agencyDetail = _agencyRepository.GetAll().Where(Check => Check.Id == getAgencyDetailsRequest.agencyID).ToList();

                            if (agencyDetail.Count > 0)
                            {
                                agObj = _agencyRepository.Get(Check => Check.Id == agencyDetail[0].Id);
                                if (!ReferenceEquals(agObj, null))
                                {
                                    agObj.IsDeleted = true;
                                    agObj.DeletedDate = DateTime.UtcNow;
                                    agObj.DeletedBy = getAgencyDetailsRequest.DeletedBy;
                                    _agencyRepository.Update(agObj);
                                    _agencyRepository.SaveChanges();
                                }
                            }
                        }

                        if (getAgencyDetailsRequest.IsDeleted == false)
                        {
                            // For Deactivate Agency                          
                            var agencyDetail = _agencyRepository.GetAll().Where(Check => Check.Id == getAgencyDetailsRequest.agencyID).ToList();

                            if (agencyDetail.Count > 0)
                            {
                                agObj = _agencyRepository.Get(Check => Check.Id == agencyDetail[0].Id);

                                if (!ReferenceEquals(agObj, null))
                                {
                                    agObj.IsDeleted = false;
                                    agObj.UpdatedDate = DateTime.UtcNow;
                                    agObj.UpdatedBy = getAgencyDetailsRequest.UpdatedBy;
                                    _agencyRepository.Update(agObj);
                                    _agencyRepository.SaveChanges();
                                }
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.StatusCode = 987;
                        res.Message = "Paramter Not Found";
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

        public ResponseViewModal SavePricingPlanInformation(PricingPlanViewModel savePlanRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    PricingPlan planObj = null;
                    SubscriptionDetails subObj = null;
                    long Id = 0;
                    if (savePlanRequest.Id == 0)
                    {
                        savePlanRequest.CreatedBy = savePlanRequest.CreatedBy;
                        savePlanRequest.CreatedDate = DateTime.UtcNow;
                        savePlanRequest.IsDeleted = false;
                        planObj = new Entity.Agency.PricingPlan();
                        Mapper.Map(savePlanRequest, planObj);
                        _planRepository.Create(planObj);
                        _planRepository.SaveChanges();
                        Id = planObj.Id;
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        DisplayMessage = "Pricing Plan Information has been saved.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else if (savePlanRequest.Id > 0)
                    {
                        planObj = _planRepository.Get(x => x.Id == savePlanRequest.Id && !x.IsDeleted);
                        subObj = _subscriptionRepository.Get(x => x.PlanID == savePlanRequest.Id && !x.IsDeleted);  //remove comment
                        if (!ReferenceEquals(planObj, null) && ReferenceEquals(subObj, null))
                        {
                            planObj.PlanName = savePlanRequest.PlanName;
                            planObj.PlanPrice = savePlanRequest.PlanPrice;
                            planObj.NumberofUsers = savePlanRequest.NumberofUsers;
                            planObj.Frequency = savePlanRequest.Frequency;
                            planObj.Remark = savePlanRequest.Remark;
                            planObj.IsActive = savePlanRequest.IsActive;
                            planObj.UpdatedBy = savePlanRequest.UpdatedBy;
                            planObj.UpdatedDate = DateTime.UtcNow;
                            _planRepository.SaveChanges();
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Pricing Plan Information has been updated.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else
                        {
                            res.IsSuccess = false;
                            DisplayMessage = "Pricing Plan is in used.Record cannot be updated!";
                            res.StatusCode = 987;
                        }
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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

        public ResponseViewModal GetAllPricingPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<PricingPlanViewModel> allPricingPlanDetails = new List<PricingPlanViewModel>();
                List<SubscriptionDetailsViewModel> details = new List<SubscriptionDetailsViewModel>();
                IQueryable<Entity.Agency.PricingPlan> selectedPricingPlan;

                IQueryable<Entity.Agency.SubscriptionDetails> subscriptionDetails;
                if (getAgencyDetailsRequest.agencyID > 0)
                {
                    subscriptionDetails = _subscriptionRepository.GetAll().Where(Check => Check.AgencyID == getAgencyDetailsRequest.agencyID && Check.IsActive == true && Check.IsDeleted == false);
                }
                else
                {
                    subscriptionDetails = _subscriptionRepository.GetAll().Where(Check => Check.IsDeleted == false);
                }


                if (getAgencyDetailsRequest.IsActive == true)
                {
                    selectedPricingPlan = _planRepository.GetAll().Where(Check => Check.IsActive == true && Check.IsDeleted == false);
                }
                else
                {
                    selectedPricingPlan = _planRepository.GetAll().Where(Check => Check.IsDeleted == false);
                }

                allPricingPlanDetails = (from planObj in selectedPricingPlan
                                         select new PricingPlanViewModel()
                                         {
                                             Id = planObj.Id,
                                             PlanName = planObj.PlanName,
                                             NumberofUsers = planObj.NumberofUsers,
                                             PlanPrice = planObj.PlanPrice,
                                             Frequency = planObj.Frequency,
                                             Remark = planObj.Remark,
                                             IsActive = planObj.IsActive,
                                             IsDeleted = planObj.IsDeleted
                                         }).OrderBy(x => x.Frequency).ToList();

                foreach (var items in allPricingPlanDetails)
                {
                    var detailss = (from planObj in subscriptionDetails
                                    where planObj.AgencyID == getAgencyDetailsRequest.agencyID && planObj.PlanID == items.Id
                                    select new SubscriptionDetailsViewModel()
                                    {
                                        Id = planObj.Id,
                                        PlanName = planObj.PlanName,
                                        AgencyID = planObj.AgencyID,
                                        IsActive = planObj.IsActive,
                                        IsDeleted = planObj.IsDeleted
                                    }).ToList();
                    if (detailss.Count > 0)
                    {
                        items.IsActive = true;
                    }
                    else
                    {
                        items.IsActive = false;
                    }
                }
                res.Data = allPricingPlanDetails;
                if (getAgencyDetailsRequest.limit != 0)
                {
                    res.Data = allPricingPlanDetails.Skip((getAgencyDetailsRequest.page) * getAgencyDetailsRequest.limit).Take(getAgencyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allPricingPlanDetails.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Pricing Plan have been successfully fetched.";
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


        public ResponseViewModal SaveSubscriptionInformation(SubscriptionDetailsViewModel saveSubscriptionDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long Id = 0;
                    SubscriptionDetails subscriptionObj = null;
                    StripeDetails stripeObj = new StripeDetails();
                    stripeObj.Email = saveSubscriptionDetailsRequest.EmailId;
                    PricingPlan planObj = new PricingPlan();
                    DateTime startDate = DateTime.Now;
                    DateTime endDate = DateTime.Now;
                    string APIValue = StripeKeySettings.APIKeySettings;
                    string subscriptionChargeId = "";
                    string lastFour = "";
                    planObj = _planRepository.Get(x => x.Id == saveSubscriptionDetailsRequest.PlanID);
                    if (saveSubscriptionDetailsRequest.IsNew == true)
                    {
                        planObj.PlanPrice = saveSubscriptionDetailsRequest.Amount;
                    }
                    if (planObj.Frequency.ToLower() == "month")
                    {
                        startDate = DateTime.Now.Date;
                        endDate = startDate.AddMonths(1);
                    }
                    else if (planObj.Frequency.ToLower() == "year")
                    {
                        startDate = DateTime.Now.Date;
                        endDate = startDate.AddYears(1);
                    }
                    subscriptionObj = _subscriptionRepository.Get(x => x.AgencyID == saveSubscriptionDetailsRequest.AgencyID && x.ValidToDate.Date != DateTime.Today.Date && x.IsDeleted == false);
                    if (ReferenceEquals(subscriptionObj, null))
                    {
                        if (saveSubscriptionDetailsRequest.Id == 0 && saveSubscriptionDetailsRequest.IsOffline == true)
                        {
                            saveSubscriptionDetailsRequest.ValidFromDate = startDate;
                            saveSubscriptionDetailsRequest.ValidToDate = endDate;
                            saveSubscriptionDetailsRequest.CreatedBy = saveSubscriptionDetailsRequest.CreatedBy;
                            saveSubscriptionDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveSubscriptionDetailsRequest.IsActive = true;
                            saveSubscriptionDetailsRequest.IsDeleted = false;
                            saveSubscriptionDetailsRequest.IsOffline = true;

                            subscriptionObj = new SubscriptionDetails();
                            Mapper.Map(saveSubscriptionDetailsRequest, subscriptionObj);
                            _subscriptionRepository.Create(subscriptionObj);
                            _subscriptionRepository.SaveChanges();
                            Id = subscriptionObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Subscription Plan Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else if (saveSubscriptionDetailsRequest.Id == 0 && saveSubscriptionDetailsRequest.IsOffline == false)
                        {
                            StripeConfiguration.SetApiKey(APIValue);
                            #region Create Product
                            StripeProductCreateOptions options = new StripeProductCreateOptions
                            {
                                Name = "Plan Subscription for " + planObj.PlanName + "_" + stripeObj.Email,
                                Type = "service",
                            };

                            StripeProductService service = new StripeProductService();
                            StripeProduct product = service.Create(options);
                            #endregion

                            #region create plan
                            StripePlanCreateOptions planOptions = new StripePlanCreateOptions
                            {
                                Currency = "usd",
                                Interval = planObj.Frequency.ToLower(),
                                Nickname = product.Name,
                                Amount = (int)planObj.PlanPrice * 100,
                                ProductId = product.Id,
                                Metadata = new Dictionary<string, string>()
                            {
                            { "Charge", "WithPlanSubscription" }
                            }
                            };


                            StripePlanService planService = new StripePlanService();
                            StripePlan plan = planService.Create(planOptions);
                            #endregion

                            #region Create Customer
                            StripeCustomerCreateOptions customerOptions = new StripeCustomerCreateOptions()
                            {
                                Description = "Customer for " + stripeObj.Email,
                                SourceToken = saveSubscriptionDetailsRequest.SourceToken,
                                Email = stripeObj.Email
                            };

                            StripeCustomerService customerService = new StripeCustomerService();
                            StripeCustomer customer = customerService.Create(customerOptions);

                            lastFour = customer.Sources.Data[0].Card.Last4;
                            #endregion

                            #region Craete subscription
                            List<StripeSubscriptionItemOption> items = new List<StripeSubscriptionItemOption> { new StripeSubscriptionItemOption { PlanId = plan.Id } };

                            StripeSubscriptionCreateOptions subscriptionOptions = new StripeSubscriptionCreateOptions
                            {
                                Items = items,
                                CustomerId = customer.Id,
                                BillingCycleAnchor = startDate.AddMonths(1),
                                Billing = StripeBilling.ChargeAutomatically,
                                TrialEnd = startDate.AddMonths(1),
                            };


                            StripeSubscriptionService subscriptionService = new StripeSubscriptionService();
                            StripeSubscription subscription = subscriptionService.Create(subscriptionOptions.CustomerId, subscriptionOptions);
                            #endregion

                            StripeInvoiceService invoiceService = new StripeInvoiceService();
                            StripeList<StripeInvoice> invoiceItems = invoiceService.List(
                                new StripeInvoiceListOptions()
                                {
                                    Billing = StripeBilling.ChargeAutomatically,
                                    CustomerId = customer.Id,
                                    SubscriptionId = subscription.Id,
                                });

                            subscriptionChargeId = invoiceItems.Data[0].ChargeId;

                            saveSubscriptionDetailsRequest.CustomerId = customer.Id;
                            saveSubscriptionDetailsRequest.CustomerName = customer.Email;
                            saveSubscriptionDetailsRequest.ProductId = product.Id;
                            saveSubscriptionDetailsRequest.ProductName = product.Name;
                            saveSubscriptionDetailsRequest.StripePlanId = plan.Id;
                            saveSubscriptionDetailsRequest.PlanName = plan.Nickname;
                            saveSubscriptionDetailsRequest.StripeSubscriptionId = subscription.Id;
                            saveSubscriptionDetailsRequest.Interval = plan.Interval;
                            saveSubscriptionDetailsRequest.Amount = planObj.PlanPrice;
                            saveSubscriptionDetailsRequest.ProductName = product.Name;
                            saveSubscriptionDetailsRequest.ValidFromDate = startDate;
                            saveSubscriptionDetailsRequest.ValidToDate = endDate;
                            saveSubscriptionDetailsRequest.CreatedBy = saveSubscriptionDetailsRequest.CreatedBy;
                            saveSubscriptionDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveSubscriptionDetailsRequest.IsActive = true;
                            saveSubscriptionDetailsRequest.IsDeleted = false;
                            saveSubscriptionDetailsRequest.IsOffline = false;
                            subscriptionObj = new SubscriptionDetails();
                            Mapper.Map(saveSubscriptionDetailsRequest, subscriptionObj);
                            _subscriptionRepository.Create(subscriptionObj);
                            _subscriptionRepository.SaveChanges();
                            Id = subscriptionObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Subscription Plan Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else
                    {
                        subscriptionObj.UpdatedBy = saveSubscriptionDetailsRequest.AgencyID;
                        subscriptionObj.IsActive = false;
                        subscriptionObj.IsDeleted = true;
                        subscriptionObj.DeletedBy = saveSubscriptionDetailsRequest.AgencyID;
                        subscriptionObj.DeletedDate = DateTime.UtcNow;
                        subscriptionObj.UpdatedDate = DateTime.UtcNow;
                        _subscriptionRepository.SaveChanges();
                        if (saveSubscriptionDetailsRequest.Id == 0 && saveSubscriptionDetailsRequest.IsOffline == true)
                        {
                            saveSubscriptionDetailsRequest.ValidFromDate = startDate;
                            saveSubscriptionDetailsRequest.ValidToDate = endDate;
                            saveSubscriptionDetailsRequest.CreatedBy = saveSubscriptionDetailsRequest.CreatedBy;
                            saveSubscriptionDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveSubscriptionDetailsRequest.IsActive = true;
                            saveSubscriptionDetailsRequest.IsDeleted = false;
                            saveSubscriptionDetailsRequest.IsOffline = true;

                            subscriptionObj = new SubscriptionDetails();
                            Mapper.Map(saveSubscriptionDetailsRequest, subscriptionObj);
                            _subscriptionRepository.Create(subscriptionObj);
                            _subscriptionRepository.SaveChanges();
                            Id = subscriptionObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Subscription Plan Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else if (saveSubscriptionDetailsRequest.Id == 0 && saveSubscriptionDetailsRequest.IsOffline == false)
                        {
                            StripeConfiguration.SetApiKey(APIValue);
                            #region Create Product
                            StripeProductCreateOptions options = new StripeProductCreateOptions
                            {
                                Name = "Plan Subscription for " + planObj.PlanName + "_" + stripeObj.Email,
                                Type = "service",
                            };

                            StripeProductService service = new StripeProductService();
                            StripeProduct product = service.Create(options);
                            #endregion

                            #region craete plan
                            StripePlanCreateOptions planOptions = new StripePlanCreateOptions
                            {
                                Currency = "usd",
                                Interval = planObj.Frequency.ToLower(),
                                Nickname = product.Name,
                                Amount = (int)planObj.PlanPrice * 100,
                                ProductId = product.Id,
                                Metadata = new Dictionary<string, string>()
                            {
                            { "Charge", "WithPlanSubscription" }
                            }
                            };


                            StripePlanService planService = new StripePlanService();
                            StripePlan plan = planService.Create(planOptions);
                            #endregion

                            #region Create Customer
                            StripeCustomerCreateOptions customerOptions = new StripeCustomerCreateOptions()
                            {
                                Description = "Customer for " + stripeObj.Email,
                                SourceToken = saveSubscriptionDetailsRequest.SourceToken,
                                Email = stripeObj.Email
                            };

                            StripeCustomerService customerService = new StripeCustomerService();
                            StripeCustomer customer = customerService.Create(customerOptions);

                            lastFour = customer.Sources.Data[0].Card.Last4;
                            #endregion

                            #region Craete subscription
                            List<StripeSubscriptionItemOption> items = new List<StripeSubscriptionItemOption> { new StripeSubscriptionItemOption { PlanId = plan.Id } };

                            StripeSubscriptionCreateOptions subscriptionOptions = new StripeSubscriptionCreateOptions
                            {
                                Items = items,
                                CustomerId = customer.Id,
                                BillingCycleAnchor = startDate.AddMonths(1),
                                Billing = StripeBilling.ChargeAutomatically,
                                TrialEnd = startDate.AddMonths(1),
                                // = startDate.AddDays
                            };


                            StripeSubscriptionService subscriptionService = new StripeSubscriptionService();
                            StripeSubscription subscription = subscriptionService.Create(subscriptionOptions.CustomerId, subscriptionOptions);
                            #endregion

                            StripeInvoiceService invoiceService = new StripeInvoiceService();
                            StripeList<StripeInvoice> invoiceItems = invoiceService.List(
                                new StripeInvoiceListOptions()
                                {
                                    Billing = StripeBilling.ChargeAutomatically,
                                    CustomerId = customer.Id,
                                    SubscriptionId = subscription.Id,
                                });

                            subscriptionChargeId = invoiceItems.Data[0].ChargeId;

                            saveSubscriptionDetailsRequest.CustomerId = customer.Id;
                            saveSubscriptionDetailsRequest.CustomerName = customer.Email;
                            saveSubscriptionDetailsRequest.ProductId = product.Id;
                            saveSubscriptionDetailsRequest.ProductName = product.Name;
                            saveSubscriptionDetailsRequest.StripePlanId = plan.Id;
                            saveSubscriptionDetailsRequest.PlanName = plan.Nickname;
                            saveSubscriptionDetailsRequest.StripeSubscriptionId = subscription.Id;
                            saveSubscriptionDetailsRequest.Interval = plan.Interval;
                            saveSubscriptionDetailsRequest.Amount = planObj.PlanPrice;
                            saveSubscriptionDetailsRequest.ProductName = product.Name;
                            saveSubscriptionDetailsRequest.ValidFromDate = startDate;
                            saveSubscriptionDetailsRequest.ValidToDate = endDate;
                            saveSubscriptionDetailsRequest.CreatedBy = saveSubscriptionDetailsRequest.CreatedBy;
                            saveSubscriptionDetailsRequest.CreatedDate = DateTime.UtcNow;
                            saveSubscriptionDetailsRequest.IsActive = true;
                            saveSubscriptionDetailsRequest.IsDeleted = false;
                            saveSubscriptionDetailsRequest.IsOffline = false;
                            subscriptionObj = new SubscriptionDetails();
                            Mapper.Map(saveSubscriptionDetailsRequest, subscriptionObj);
                            _subscriptionRepository.Create(subscriptionObj);
                            _subscriptionRepository.SaveChanges();
                            Id = subscriptionObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Subscription Plan Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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


        public ResponseViewModal SaveMealItemInformation(MealItemMasterViewModel saveMealItemRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            FoodType foodTypeObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveMealItemRequest.AgencyID > 0)
                    {
                        if (saveMealItemRequest.Id == 0)
                        {
                            foodTypeObj = _foodTypeRepository.Get(x => (x.FoodTypeName.ToLower()).Trim() == (saveMealItemRequest.FoodTypeName.ToLower()).Trim() && !x.IsDeleted && x.AgencyID == saveMealItemRequest.AgencyID);
                            if (ReferenceEquals(foodTypeObj, null))
                            {
                                saveMealItemRequest.CreatedBy = saveMealItemRequest.CreatedBy;
                                saveMealItemRequest.CreatedDate = DateTime.UtcNow;
                                saveMealItemRequest.IsActive = true;
                                saveMealItemRequest.IsDeleted = false;
                                foodTypeObj = new FoodType();
                                Mapper.Map(saveMealItemRequest, foodTypeObj);
                                _foodTypeRepository.Create(foodTypeObj);
                                _foodTypeRepository.SaveChanges();
                                Id = foodTypeObj.Id;
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                DisplayMessage = "Meal Item Information has been saved.";
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                            else
                            {
                                res.IsSuccess = false;
                                DisplayMessage = "Meal Item Already Exists.";
                                res.StatusCode = 987;
                            }
                        }
                        else if (saveMealItemRequest.Id > 0)
                        {
                            foodTypeObj = _foodTypeRepository.Get(x => x.Id == saveMealItemRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(foodTypeObj, null))
                            {
                                foodTypeObj.AgencyID = saveMealItemRequest.AgencyID;
                                foodTypeObj.FoodTypeName = saveMealItemRequest.FoodTypeName;
                                foodTypeObj.UpdatedBy = saveMealItemRequest.UpdatedBy;
                                foodTypeObj.UpdatedDate = DateTime.UtcNow;
                                _foodTypeRepository.SaveChanges();
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                DisplayMessage = "Meal Item Information has been updated.";
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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

        public ResponseViewModal GetMealItemInformation(MealItemMasterViewModel saveMealItemRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<MealItemMasterViewModel> allFood = new List<MealItemMasterViewModel>();
                allFood = (from foodObj in _foodTypeRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == saveMealItemRequest.AgencyID)
                          select new MealItemMasterViewModel()
                          {
                              Id = foodObj.Id,
                              FoodTypeName = foodObj.FoodTypeName,
                              AgencyID = foodObj.AgencyID,
                              IsDeleted = foodObj.IsDeleted,
                              IsActive = foodObj.IsActive
                          }).OrderByDescending(c => c.Id).ToList();

                res.Data = allFood;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Food list has been successfully fetched.";
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


        public ResponseViewModal GetAllAgencyPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AgencyViewModel> allAgency = new List<AgencyViewModel>();
                IQueryable<Entity.Masters.Agency> selectedAgency = _agencyRepository.GetAll().Where(Check => Check.IsDeleted == false && Check.AgencyName.ToUpper().Contains(getAgencyDetailsRequest.AgencyName.ToUpper()));
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Agency.PricingPlan> selectedPlan = _planRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Agency.SubscriptionDetails> selectedSubscription = _subscriptionRepository.GetAll().Where(Check => Check.IsDeleted == false);
                allAgency = (from subscriptionObj in selectedSubscription
                             join agencyObj in selectedAgency on subscriptionObj.AgencyID equals agencyObj.Id
                             join planObj in selectedPlan on subscriptionObj.PlanID equals planObj.Id  //remove comment
                             join countryObj in selectedCountry on agencyObj.CountryId equals countryObj.Id
                             join stateObj in selectedState on agencyObj.StateId equals stateObj.Id
                             join cityObj in selectedCity on agencyObj.CityId equals cityObj.Id
                             select new AgencyViewModel
                             {
                                 AgencyName = agencyObj.AgencyName,
                                 OwnerName = agencyObj.OwnerFirstName + " " + agencyObj.OwnerLastName,
                                 EmailId = agencyObj.EmailId,
                                 CityName = cityObj.CityName,
                                 StateName = stateObj.StateName,
                                 PlanName = planObj.PlanName,
                                 ValidFrom = subscriptionObj.ValidFromDate.Date,
                                 ValidTo = subscriptionObj.ValidToDate.Date,
                                 LastLogin = agencyObj.LastLogin
                             }).OrderBy(c => c.AgencyName).ToList();
                res.Data = allAgency;
                if (getAgencyDetailsRequest.limit != 0)
                {
                    res.Data = allAgency.Skip((getAgencyDetailsRequest.page) * getAgencyDetailsRequest.limit).Take(getAgencyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allAgency.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Agency list has been feteched";
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


        public ResponseViewModal GetCountDetailsForSuperAdmin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var model = new SuperAdminCountViewModel
                {
                    ApprovedAgencyCount = 0,
                    SubscriptionActiveAgencyCount = 0,
                    UnApprovedAgencyCount = 0
                };

                var validToEndDate = DateTime.Today.AddDays(1).AddSeconds(-1);
                model.ApprovedAgencyCount = _agencyRepository.GetAll().Count(check => !check.IsDeleted && check.Status == 1);
                model.UnApprovedAgencyCount = _agencyRepository.GetAll().Count(check => !check.IsDeleted && check.Status == 0);
                model.SubscriptionActiveAgencyCount = _subscriptionRepository.GetAll().Count(check => check.ValidToDate != validToEndDate);

                res.Data = model;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Dose Repeat has been successfully fetched.";
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

        public ResponseViewModal GetParticularAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AgencyViewModel> allAgency = new List<AgencyViewModel>();
                IQueryable<Entity.Masters.Agency> selectedAgency = _agencyRepository.GetAll().Where(Check => Check.Id == getAgencyDetailsRequest.agencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(Check => Check.IsDeleted == false);
                IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(Check => Check.IsDeleted == false);

                allAgency = (from agencyObj in selectedAgency
                             join countryObj in selectedCountry on agencyObj.CountryId equals countryObj.Id
                             join stateObj in selectedState on agencyObj.StateId equals stateObj.Id
                             join cityObj in selectedCity on agencyObj.CityId equals cityObj.Id
                             select new AgencyViewModel
                             {
                                 AgencyName = agencyObj.AgencyName,
                                 ContactPersonFirstName = agencyObj.ContactPersonFirstName,
                                 ContactPersonLastName = agencyObj.ContactPersonLastName,
                                 OwnerFirstName = agencyObj.OwnerFirstName,
                                 OwnerLastName = agencyObj.OwnerLastName,
                                 OwnerName = agencyObj.OwnerFirstName + " " + agencyObj.OwnerLastName,
                                 CityId = agencyObj.CityId,
                                 CityName = cityObj.CityName,
                                 StateId = agencyObj.StateId,
                                 StateName = stateObj.StateName,
                                 CountryId = agencyObj.CountryId,
                                 CountryName = countryObj.CountryName,
                                 CreatedFromIP = agencyObj.CreatedFromIP,
                                 CurrentSubscriptionPlanId = agencyObj.CurrentSubscriptionPlanId,
                                 Mobile = agencyObj.Mobile,
                                 EmailId = agencyObj.EmailId,
                                 PostalCode = agencyObj.PostalCode,
                                 TrialStart = agencyObj.TrialStart,
                                 TrialEnd = agencyObj.TrialEnd,
                                 IsTrial = agencyObj.IsTrial,
                                 IsActive = agencyObj.IsActive,
                                 IsExistingAccount = agencyObj.IsExistingAccount,
                                 IsLoggedFirstTime = agencyObj.IsLoggedFirstTime,
                                 IsTrialMailSent = agencyObj.IsTrialMailSent,
                                 GenderID = agencyObj.GenderID,
                                 Id = agencyObj.Id,
                                 ImagePath = agencyObj.ImagePath,
                                 DeletedFromIP = agencyObj.DeletedFromIP,
                                 PayPalSubscriptionId = agencyObj.PayPalSubscriptionId,
                                 PayPalUserId = agencyObj.PayPalUserId,
                                 Profession = agencyObj.Profession,
                                 SubscriptionValidUpto = agencyObj.SubscriptionValidUpto,
                                 TimeZoneSpecification = agencyObj.TimeZoneSpecification,
                                 Address = agencyObj.Address,
                                 UpdatedFromIP = agencyObj.UpdatedFromIP,
                                 UserID = agencyObj.UserID,
                                 IsDeleted = agencyObj.IsDeleted
                             }).OrderBy(c => c.AgencyName).ToList();
                res.Data = allAgency;
                if (getAgencyDetailsRequest.limit != 0)
                {
                    res.Data = allAgency.Skip((getAgencyDetailsRequest.page) * getAgencyDetailsRequest.limit).Take(getAgencyDetailsRequest.limit).ToList();
                }
                res.TotalRows = allAgency.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Agency list has been feteched";
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

        public ResponseViewModal GetCountDetailsForAgencyAdmin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                var model = new SuperAdminCountViewModel
                {
                    EnrolledStudent = 0,
                    RequestedStudent = 0,
                    PresentStudent = 0
                };

                var validToEndDate = DateTime.Today.AddDays(1).AddSeconds(-1);
                model.EnrolledStudent = _classEnrollmentRepository.GetAll().Where(check => getAgencyDetailsRequest.agencyID == check.AgencyID && !check.IsDeleted && check.EnrollmentStatus == 2).GroupBy(x => x.StudentID).Count();

                model.RequestedStudent = _classEnrollmentRepository.GetAll().Count(check => !check.IsDeleted && check.EnrollmentStatus == 1 && getAgencyDetailsRequest.agencyID == check.AgencyID);
                model.PresentStudent = _classAttendenceRepository.GetAll().Count(check => !check.IsDeleted && getAgencyDetailsRequest.agencyID == check.AgencyID && check.CheckInTime.Date == DateTime.Now.Date);

                res.Data = model;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Agency dashboard count has been successfully fetched.";
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

        public ResponseViewModal UpdateLastLogin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    DayCare.Entity.Masters.Agency agency = new DayCare.Entity.Masters.Agency();
                    if (getAgencyDetailsRequest.agencyID != 0)
                    {
                        agency = _agencyRepository.Get(check => !check.IsDeleted && check.Id == getAgencyDetailsRequest.agencyID);
                        agency.LastLogin = DateTime.Now;
                        _agencyRepository.SaveChanges();

                        res.IsSuccess = true;
                        res.Message = "Last Login Update.";
                        daycaredb.Commit();
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        daycaredb.Rollback();
                        res.StatusCode = 987;
                        res.Message = "Something went wrong.";
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


        public ResponseViewModal GetPaymentDetailsForAgency(PaymentDetailsViewModel paymentDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<PaymentDetailsViewModel> allPayementDetails = new List<PaymentDetailsViewModel>();
                IQueryable<Entity.Agency.PayementDetails> selectedPayement = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                string Studentname = paymentDetailsRequest.StudentName.TrimStart();
                Studentname = Studentname.TrimEnd();
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID && Check.StudentName.ToUpper().Contains(Studentname.ToUpper()));
                IQueryable<Entity.Agency.ClassEnrollment> selectedEnrollement = _classEnrollmentRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == paymentDetailsRequest.AgencyID);
                allPayementDetails = (from paymentObj in selectedPayement
                                      join parentObj in selectedParent on paymentObj.ParentID equals parentObj.Id
                                      join studObj in selectedStudent on paymentObj.StudentID equals studObj.Id
                                      join enrollObj in selectedEnrollement on studObj.Id equals enrollObj.StudentID
                                      join classObj in selectedClasses on enrollObj.ClassesID equals classObj.Id
                                      select new PaymentDetailsViewModel()
                                      {
                                          Id = paymentObj.Id,
                                          ParentID = paymentObj.ParentID,
                                          StudentID = paymentObj.StudentID,
                                          TotalAmount = paymentObj.TotalAmount,
                                          AgencyID = paymentObj.AgencyID,
                                          ParentName = parentObj.ParentName,
                                          StudentName = studObj.StudentName,
                                          PaymentFromDate = Convert.ToDateTime(paymentObj.PaymentFromDate),
                                          PaymentToDate = Convert.ToDateTime(paymentObj.PaymentToDate),
                                          PaymentDate = Convert.ToDateTime(paymentObj.PaymentDate),
                                          IsOffline = paymentObj.IsOffline,
                                          ClassName = classObj.ClassName,
                                          ChequeNo = paymentObj.ChequeNo,
                                          AmoutPaid = paymentObj.AmoutPaid,
                                          BalanceAmount = paymentObj.BalanceAmount,
                                          DiscountAmount = paymentObj.DiscountAmount,
                                          CardNo = paymentObj.CardNo,
                                          PaymentType = paymentObj.PaymentType,
                                          SubsidyAmount = paymentObj.SubsidyAmount
                                      }).ToList();
                var result = allPayementDetails.GroupBy(p => p.Id).Select(p => p.First()).OrderByDescending(o => o.PaymentDate).ToList();
                foreach (var r in result)
                {
                    var className = allPayementDetails.Where(p => p.Id == r.Id).Select(p => p.ClassName).ToArray();
                    r.ClassName = string.Join(",", className);
                }
                res.Data = result;

                if (paymentDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((paymentDetailsRequest.page) * paymentDetailsRequest.limit).Take(paymentDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Details have been successfully fetched.";
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

        public ResponseViewModal GetDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StudentDigitalDirectorViewModel> studentdigitaldirectorDetails = new List<StudentDigitalDirectorViewModel>();

                IQueryable<Entity.Masters.StudentDigitalDirector> studentdigitaldirector = _stdddRepository.GetAll().Where(Check => Check.AgencyID == saveDDInfoRequest.AgencyID && Check.StudentID == saveDDInfoRequest.StudentID && !Check.IsDeleted);

                studentdigitaldirectorDetails = (from StdDDObj in studentdigitaldirector
                                                 where StdDDObj.StudentID == saveDDInfoRequest.StudentID &&
                                                 StdDDObj.AgencyID == saveDDInfoRequest.AgencyID && !StdDDObj.IsDeleted
                                                 select new StudentDigitalDirectorViewModel()
                                                 {
                                                     Id = StdDDObj.Id,
                                                     StudentID = StdDDObj.StudentID,
                                                     HrsInterval = StdDDObj.HrsInterval,
                                                     AgencyID = StdDDObj.AgencyID,
                                                     MinInterval = StdDDObj.MinInterval,
                                                     ActivityTypeID = StdDDObj.ActivityTypeID
                                                 }).ToList();

                if (studentdigitaldirectorDetails.Count > 0)
                {
                    res.Data = studentdigitaldirectorDetails;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                }
                else
                {
                    res.Data = studentdigitaldirectorDetails;
                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.NotFound;
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

        public ResponseViewModal SaveDDMasterInformation(DigitalDirectorMasterViewModel saveDDInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            DigitalDirectorMaster ddObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveDDInfoRequest.AgencyID > 0)
                    {
                        if (saveDDInfoRequest.Id == 0)
                        {
                            saveDDInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveDDInfoRequest.IsActive = true;
                            saveDDInfoRequest.IsDeleted = false;
                            ddObj = new DigitalDirectorMaster();
                            ddObj = Mapper.Map<DigitalDirectorMaster>(saveDDInfoRequest);
                            _ddRepository.Create(ddObj);
                            _ddRepository.SaveChanges();
                            Id = ddObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "DD Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                        else if (saveDDInfoRequest.Id > 0)
                        {
                            ddObj = _ddRepository.Get(x => x.Id == saveDDInfoRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(ddObj, null))
                            {
                                ddObj.AgencyID = saveDDInfoRequest.AgencyID;
                                ddObj.ActivityTypeID = saveDDInfoRequest.ActivityTypeID;
                                ddObj.Interval = saveDDInfoRequest.Interval;
                                ddObj.MinInterval = saveDDInfoRequest.MinInterval;
                                ddObj.Comment = saveDDInfoRequest.Comment;
                                ddObj.UpdatedDate = DateTime.UtcNow;
                                _ddRepository.SaveChanges();
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                DisplayMessage = "DD Information has been updated.";
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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


        public ResponseViewModal SaveDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            StudentDigitalDirector StdddObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveDDInfoRequest.AgencyID > 0)
                    {
                        if (saveDDInfoRequest.Id == 0)
                        {
                            saveDDInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveDDInfoRequest.IsActive = true;
                            saveDDInfoRequest.IsDeleted = false;
                            StdddObj = new StudentDigitalDirector();
                            StdddObj = Mapper.Map<StudentDigitalDirector>(saveDDInfoRequest);
                            _stdddRepository.Create(StdddObj);
                            _stdddRepository.SaveChanges();
                            Id = StdddObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "DD Information has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else if (saveDDInfoRequest.Id > 0)
                        {
                            StdddObj = _stdddRepository.Get(x => x.Id == saveDDInfoRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(StdddObj, null))
                            {
                                StdddObj.AgencyID = saveDDInfoRequest.AgencyID;
                                StdddObj.ActivityTypeID = saveDDInfoRequest.ActivityTypeID;
                                StdddObj.HrsInterval = saveDDInfoRequest.HrsInterval;
                                StdddObj.MinInterval = saveDDInfoRequest.MinInterval;
                                StdddObj.StudentID = saveDDInfoRequest.StudentID;
                                StdddObj.UpdatedDate = DateTime.UtcNow;
                                _ddRepository.SaveChanges();
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                DisplayMessage = "DD Information has been updated.";
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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

        public ResponseViewModal SaveCalculatedFees(CalculatedFeesViewModel saveCalculatedFeesInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            CalculatedFees cfObj = null;
            CalculatedFeeDetails cfdObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                long extraId = 0;
                long cfdId = 0;
                try
                {
                    if (saveCalculatedFeesInfoRequest.AgencyID > 0)
                    {
                        if (saveCalculatedFeesInfoRequest.Id == 0)
                        {
                            foreach (var cls in saveCalculatedFeesInfoRequest.ClassesID)
                            {
                                saveCalculatedFeesInfoRequest.CreatedDate = DateTime.UtcNow;
                                saveCalculatedFeesInfoRequest.IsActive = true;
                                saveCalculatedFeesInfoRequest.IsDeleted = false;
                                saveCalculatedFeesInfoRequest.ClassID = cls;
                                cfObj = new CalculatedFees();
                                cfObj = Mapper.Map<CalculatedFees>(saveCalculatedFeesInfoRequest);
                                _cfRepository.Create(cfObj);
                                _cfRepository.SaveChanges();
                                Id = cfObj.Id;

                                saveCalculatedFeesInfoRequest.CreatedDate = DateTime.UtcNow;
                                saveCalculatedFeesInfoRequest.IsActive = true;
                                saveCalculatedFeesInfoRequest.IsDeleted = false;
                                saveCalculatedFeesInfoRequest.AgencyID = saveCalculatedFeesInfoRequest.AgencyID;
                                saveCalculatedFeesInfoRequest.PerDayFeeCalculationID = Id;
                                saveCalculatedFeesInfoRequest.StudentID = saveCalculatedFeesInfoRequest.StudentID;
                                saveCalculatedFeesInfoRequest.CalculatedFeeDate = saveCalculatedFeesInfoRequest.CalculatedFeeDate;
                                saveCalculatedFeesInfoRequest.Amount = saveCalculatedFeesInfoRequest.TotalCalculatedAmount;
                                cfdObj = new CalculatedFeeDetails();
                                cfdObj = Mapper.Map<CalculatedFeeDetails>(saveCalculatedFeesInfoRequest);
                                _cfdRepository.Create(cfdObj);
                                _cfdRepository.SaveChanges();
                                cfdId = cfdObj.Id;

                                if (!(saveCalculatedFeesInfoRequest.ExtraFees == null))
                                {
                                    foreach (var trans in saveCalculatedFeesInfoRequest.ExtraFees)
                                    {
                                        trans.CreatedDate = DateTime.UtcNow;
                                        trans.IsActive = true;
                                        trans.IsDeleted = false;
                                        trans.AgencyID = saveCalculatedFeesInfoRequest.AgencyID;
                                        trans.ChargeAmount = trans.Amount;
                                        trans.CalculatedFeesID = Id;
                                        ExtraFeesDetails extrafeesobj = null;
                                        extrafeesobj = new ExtraFeesDetails();
                                        extrafeesobj = Mapper.Map<ExtraFeesDetails>(trans);
                                        _efdRepository.Create(extrafeesobj);
                                        _efdRepository.SaveChanges();
                                        extraId = extrafeesobj.Id;
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.IsSuccess = true;
                    res.Message = "Record Save Successfully.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    daycaredb.Commit();
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


        public ResponseViewModal UpdateCalculatedFees(CalculatedFeesViewModel updateCalculatedFeesInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            CalculatedFees cfObj = null;
            ExtraFeesDetails efObj = new ExtraFeesDetails();
            long extraId = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    //========Update data for CalculatedFees table =======//
                    CalculatedFeesViewModel cfUpdate = new CalculatedFeesViewModel();
                    List<CalculatedFees> selectCalculatedFeesUpdate = _cfRepository.GetAll(check => (check.FromDate.Date >= updateCalculatedFeesInfoRequest.PreviousFromDate.Date && check.ToDate.Date <= updateCalculatedFeesInfoRequest.PreviousToDate.Date) && check.StudentID == updateCalculatedFeesInfoRequest.StudentID && check.AgencyID == updateCalculatedFeesInfoRequest.AgencyID && check.IsInvoiceGenrated == false && check.IsDeleted == false).ToList();

                    foreach (var idsc in selectCalculatedFeesUpdate)
                    {
                        cfObj = _cfRepository.Get(x => x.Id == idsc.Id && x.IsDeleted == false);
                        if (!ReferenceEquals(cfObj, null))
                        {
                            cfObj.FromDate = updateCalculatedFeesInfoRequest.FromDate;
                            cfObj.ToDate = updateCalculatedFeesInfoRequest.ToDate;
                            cfObj.TotalCalculatedAmount = updateCalculatedFeesInfoRequest.TotalCalculatedAmount;
                            cfObj.TotalPerDayFee = updateCalculatedFeesInfoRequest.TotalPerDayFee;
                            cfObj.DiscountAmount = updateCalculatedFeesInfoRequest.DiscountAmount;
                            cfObj.DiscountDetails = updateCalculatedFeesInfoRequest.DiscountDetails;
                            cfObj.UpdatedDate = DateTime.UtcNow;
                            _cfRepository.Update(cfObj);
                            _cfRepository.SaveChanges();
                        }
                    }
                    foreach (var Idsc in selectCalculatedFeesUpdate)
                    {
                        IQueryable<ExtraFeesDetails> efObj1 = _efdRepository.GetAll(x => x.CalculatedFeesID == Idsc.Id && x.IsDeleted == false);
                        if (!ReferenceEquals(efObj1, null))
                        {
                            foreach (var ids in efObj1)
                            {
                                long EtraFeesDetailsID = ids.Id;
                                efObj = _efdRepository.Get(x => x.Id == EtraFeesDetailsID && x.IsDeleted == false);
                                efObj.IsDeleted = true;
                                efObj.DeletedDate = DateTime.UtcNow;
                                _efdRepository.Update(efObj);
                                _efdRepository.SaveChanges();
                            }
                        }
                    }
                    foreach (var Idscfu in selectCalculatedFeesUpdate)
                    {
                        foreach (var trans in updateCalculatedFeesInfoRequest.ExtraFees)
                        {
                            long CalculatedFeesID = Idscfu.Id;
                            trans.CreatedDate = DateTime.UtcNow;
                            trans.IsActive = true;
                            trans.IsDeleted = false;
                            trans.AgencyID = updateCalculatedFeesInfoRequest.AgencyID;
                            trans.ChargeAmount = trans.Amount;
                            trans.CalculatedFeesID = CalculatedFeesID;
                            ExtraFeesDetails extrafeesobj = null;
                            extrafeesobj = new ExtraFeesDetails();
                            extrafeesobj = Mapper.Map<ExtraFeesDetails>(trans);
                            _efdRepository.Create(extrafeesobj);
                            _efdRepository.SaveChanges();
                            extraId = extrafeesobj.Id;
                        }
                    }
                    res.IsSuccess = true;
                    res.Message = "Record Updated Successfully.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    daycaredb.Commit();
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

        public ResponseViewModal SaveGenerateInvoice(InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            InvoiceDetails ivdObj = null;
            CalculatedFees cfObj = null;
            InvoiceItemDetails invoiceItemDetails = new InvoiceItemDetails();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveGenerateInvoiceInfoRequest.AgencyID > 0)
                    {
                        if (saveGenerateInvoiceInfoRequest.Id == 0)
                        {
                            //========Update data for CalculatedFees table =======//
                            CalculatedFeesViewModel cfUpdate = new CalculatedFeesViewModel();
                            IQueryable<CalculatedFees> selectcaluatedfeesUpdate = _cfRepository.GetAll(check => (check.FromDate.Date >= saveGenerateInvoiceInfoRequest.InvoiceFromDate.Date && check.ToDate.Date <= saveGenerateInvoiceInfoRequest.InvoiceToDate.Date) && check.StudentID == saveGenerateInvoiceInfoRequest.StudentID && check.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && check.IsInvoiceGenrated == false && check.IsDeleted == false);
                            var ClassesIdCF = ((from a in selectcaluatedfeesUpdate
                                                where a.FromDate.Date >= saveGenerateInvoiceInfoRequest.InvoiceFromDate.Date && a.ToDate.Date <= saveGenerateInvoiceInfoRequest.InvoiceToDate.Date && a.StudentID == saveGenerateInvoiceInfoRequest.StudentID && a.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && a.IsInvoiceGenrated == false && a.IsDeleted == false
                                                select a.Id));

                            //========Insert data for InvoiceDetails table =======//
                            Random random = new Random();
                            int num = random.Next(1, 999999999);
                            saveGenerateInvoiceInfoRequest.AgencyID = saveGenerateInvoiceInfoRequest.AgencyID;
                            saveGenerateInvoiceInfoRequest.ParentID = saveGenerateInvoiceInfoRequest.ParentID;
                            saveGenerateInvoiceInfoRequest.InvoiceFromDate = saveGenerateInvoiceInfoRequest.InvoiceFromDate.Date;
                            saveGenerateInvoiceInfoRequest.InvoiceToDate = saveGenerateInvoiceInfoRequest.InvoiceToDate.Date;
                            saveGenerateInvoiceInfoRequest.TotalAmount = saveGenerateInvoiceInfoRequest.TotalAmount;
                            saveGenerateInvoiceInfoRequest.InvoiceAmount = saveGenerateInvoiceInfoRequest.TotalAmount;
                            saveGenerateInvoiceInfoRequest.InvoiceNo = saveGenerateInvoiceInfoRequest.AgencyID + "-" + saveGenerateInvoiceInfoRequest.ParentID + "-" + saveGenerateInvoiceInfoRequest.StudentID + "-" + DateTime.Now.ToString("yyyyMMdd") + "-" + num;
                            saveGenerateInvoiceInfoRequest.IsActive = true;
                            saveGenerateInvoiceInfoRequest.IsDeleted = false;
                            saveGenerateInvoiceInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveGenerateInvoiceInfoRequest.InvoiceDate = DateTime.UtcNow.Date;
                            saveGenerateInvoiceInfoRequest.PerDayFeeCalculationID = ClassesIdCF.FirstOrDefault();
                            ivdObj = new InvoiceDetails();
                            ivdObj = Mapper.Map<InvoiceDetails>(saveGenerateInvoiceInfoRequest);
                            _invoiceDetailsRepository.Create(ivdObj);
                            _invoiceDetailsRepository.SaveChanges();
                            Id = ivdObj.Id;

                            if (Id > 0)
                            {
                                foreach (var cls in saveGenerateInvoiceInfoRequest.ClassesID)
                                {
                                    Classes clsObj = null;
                                    clsObj = _classRepository.Get(x => x.Id == cls && x.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && !x.IsDeleted);

                                    if (!ReferenceEquals(clsObj, null))
                                    {
                                        clsObj.Fees = clsObj.Fees;
                                    }
                                    else
                                    {
                                        clsObj.Fees = 0;
                                    }

                                    long itemdetailsid = 0;
                                    invoiceItemDetails = new InvoiceItemDetails();
                                    invoiceItemDetails.Id = 0;
                                    invoiceItemDetails.AgencyID = saveGenerateInvoiceInfoRequest.AgencyID;
                                    invoiceItemDetails.ParentID = saveGenerateInvoiceInfoRequest.ParentID;
                                    invoiceItemDetails.StudentID = saveGenerateInvoiceInfoRequest.StudentID;
                                    invoiceItemDetails.ClassesID = cls;
                                    invoiceItemDetails.ClassFees = clsObj.Fees;
                                    invoiceItemDetails.InvoiceDetailsID = Id;
                                    invoiceItemDetails.IsActive = true;
                                    invoiceItemDetails.IsDeleted = false;
                                    invoiceItemDetails.CreatedDate = DateTime.UtcNow;
                                    _invoiceItemDetailsRepository.Create(invoiceItemDetails);
                                    _invoiceItemDetailsRepository.SaveChanges();
                                    itemdetailsid = invoiceItemDetails.Id;
                                }
                            }
                        }
                        else
                        {
                            res.IsSuccess = false;
                            res.Message = "Invoice Already Generated.";
                            res.StatusCode = 205;
                        }
                    }

                    //========Update data for CalculatedFees table =======//                   
                    IQueryable<CalculatedFees> selectcaluatedfeesUpdatee = _cfRepository.GetAll(check => (check.FromDate.Date >= saveGenerateInvoiceInfoRequest.InvoiceFromDate.Date && check.ToDate.Date <= saveGenerateInvoiceInfoRequest.InvoiceToDate.Date) && check.StudentID == saveGenerateInvoiceInfoRequest.StudentID && check.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && check.IsInvoiceGenrated == false && check.IsDeleted == false);
                    var ClassesIdCFF = ((from a in selectcaluatedfeesUpdatee
                                         where a.FromDate.Date >= saveGenerateInvoiceInfoRequest.InvoiceFromDate.Date && a.ToDate.Date <= saveGenerateInvoiceInfoRequest.InvoiceToDate.Date && a.StudentID == saveGenerateInvoiceInfoRequest.StudentID && a.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && a.IsInvoiceGenrated == false && a.IsDeleted == false
                                         select a.Id));

                    foreach (var cls in ClassesIdCFF)
                    {
                        cfObj = _cfRepository.Get(x => x.Id == cls && x.IsDeleted == false);
                        if (!ReferenceEquals(cfObj, null))
                        {
                            cfObj.IsInvoiceGenrated = true;
                            cfObj.UpdatedDate = DateTime.UtcNow;
                            _cfRepository.Update(cfObj);
                            _cfRepository.SaveChanges();
                        }
                    }
                    res.IsSuccess = true;
                    res.Message = "Invoice Generated Successfully.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    daycaredb.Commit();
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


        public ResponseViewModal DeleteFeesCalculation(PerDayFeeCalculationViewModel reqDeleteFees)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (reqDeleteFees.AgencyID > 0 && reqDeleteFees.StudentID > 0 && reqDeleteFees.FromDate != DateTime.MinValue && reqDeleteFees.ToDate != DateTime.MinValue)
                    {
                        List<CalculatedFees> CalculationFeesList = new List<CalculatedFees>();
                        CalculationFeesList = _cfRepository.GetAll(check => check.AgencyID == reqDeleteFees.AgencyID && !check.IsDeleted && check.FromDate.Date ==
                              reqDeleteFees.FromDate.Date && check.ToDate.Date == reqDeleteFees.ToDate.Date && check.StudentID == reqDeleteFees.StudentID).ToList();

                        if (CalculationFeesList.Count != 0)
                        {
                            foreach (var item in CalculationFeesList)
                            {
                                item.IsDeleted = true;
                                item.DeletedBy = reqDeleteFees.DeletedBy;
                                item.DeletedDate = DateTime.UtcNow;
                                _cfRepository.SaveChanges();
                            }
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Calculation has been Deleted!";
                            return res;
                        }
                        else
                        {
                            res.Message = "Records not found!";
                            res.IsSuccess = false;
                            res.StatusCode = 204;
                            return res;
                        }
                    }
                    else
                    {
                        res.Message = "Missing Parameters.";
                        res.IsSuccess = false;
                        res.StatusCode = 987;
                        return res;
                    }
                }
                catch (Exception ex)
                {
                    res.IsSuccess = false;
                    res.StatusCode = 400;
                    res.Message = "Something went wrong.";
                }
            }
            return res;
        }

        public ResponseViewModal GetPerDayFeeCalculation(PerDayFeeCalculationViewModel getperdayfeeCalculationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            Classes clsObj = null;
            decimal PerDayFee = 0;
            decimal PerHourFee = 0;
            decimal TotalFeesForWeekly = 0;
            decimal TotalFeesForMonthly = 0;
            decimal TotalFeesForYearly = 0;
            decimal TotalFees = 0;
            string RemainingCalculatedFeesDate = null;
            string PaidCalculatedFeesDate = null;
            string Message = null;
            int StatusCode = 0;
            int differenceInDays = 0;

            int DropInDays = 0;
            int DropInHours = 0;
            int DropInMintues = 0;
            int DropInSecond = 0;
            int DropInMiliSecond = 0;

            int BreakInDays = 0;
            int BreakInHours = 0;
            int BreakInMintues = 0;
            int BreakInSecond = 0;
            int BreakInMiliSecond = 0;

            string TotalHours = Convert.ToInt32(0).ToString();
            string TotalMinutes = Convert.ToInt32(0).ToString();

            DateTime DropInDate = DateTime.Now;
            DateTime DropOutDate = DateTime.Now;
            DateTime BreakInDate = DateTime.Now;
            DateTime BreakOutDate = DateTime.Now;

            ArrayList EnrollClassesId = new ArrayList();

            try
            {
                List<CalculatedFeesViewModel> allDetails = new List<CalculatedFeesViewModel>();
                List<ClassEnrollment> ClassEnroll = new List<ClassEnrollment>();
                List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareDropInDate = new List<KioskeStudentSignInDetailsViewModel>();
                List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareDropOutDate = new List<KioskeStudentSignInDetailsViewModel>();
                List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareBreakOutDate = new List<KioskeStudentSignInDetailsViewModel>();
                List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareBreakInDate = new List<KioskeStudentSignInDetailsViewModel>();
                IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.StudentID == getperdayfeeCalculationRequest.StudentID && classCheck.AgencyID == getperdayfeeCalculationRequest.AgencyID && classCheck.EnrollmentStatus == 2 && classCheck.IsDeleted == false);
                IQueryable<Classes> classes = _classRepository.GetAll().Where(classCheck => classCheck.AgencyID == getperdayfeeCalculationRequest.AgencyID && classCheck.IsDeleted == false);
                IQueryable<FeePaymentType> feePaymentType = _feesPaymentTypeRepository.GetAll();
                IQueryable<ParentStudentMapping> ParentStudent = _parentStudentMappingRepository.GetAll();
                IQueryable<Entity.Masters.CalculatedFees> selecteddata = _cfRepository.GetAll().Where(Check => Check.AgencyID == getperdayfeeCalculationRequest.AgencyID && Check.StudentID == getperdayfeeCalculationRequest.StudentID && Check.IsDeleted == false);
                IQueryable<KioskeStudentSignInDetails> kioskeStudentSignInDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(classCheck => classCheck.StudentID == getperdayfeeCalculationRequest.StudentID && classCheck.AgencyID == getperdayfeeCalculationRequest.AgencyID && classCheck.IsDeleted == false);

                // =================For DropIn Care Stduent ==================================//

                if (getperdayfeeCalculationRequest.CategoryName == "Drop In")
                {
                    var clsEnrollObj = (from a in classEnrollment
                                        where a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID
                                               && a.EnrollmentStatus == 2 && a.IsDeleted == false
                                        select a.ClassesID);

                    EnrollClassesId.Add(clsEnrollObj.ToList());

                    //Check for Same date in database from given in UI(from date, to date)
                    var Checkforsamebothdate = ((from a in selecteddata
                                                 where (a.FromDate.Date == getperdayfeeCalculationRequest.FromDate.Date && a.ToDate.Date == getperdayfeeCalculationRequest.ToDate.Date) && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID && a.IsInvoiceGenrated == true && a.IsDeleted == false
                                                 select a).ToList());

                    if (Checkforsamebothdate.Count > 0)
                    {
                        StatusCode = 10;
                        Message = "Allready Invoice Generate for given date";
                    }

                    else
                    {
                        var startdate = (getperdayfeeCalculationRequest.FromDate.Date);
                        var enddate = (getperdayfeeCalculationRequest.ToDate.Date);

                        var GetMinDateStudent = ((from a in kioskeStudentSignInDetails
                                                  where a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID
                                                   && a.IsDeleted == false
                                                  select a.DropInDateTime).Min());

                        if (GetMinDateStudent.Value.Date >= startdate)
                        {
                            startdate = (GetMinDateStudent.Value.Date);
                            enddate = (getperdayfeeCalculationRequest.ToDate.Date);
                        }


                        List<DateTime> range = Enumerable.Range(0, (enddate - startdate).Days + 1).Select(i => startdate.AddDays(i)).ToList();
                        List<DateTime> DateList = new List<DateTime>();
                        List<string> DateListForRemainingDate = new List<string>();

                        List<DateTime> PaidDateList = new List<DateTime>();
                        List<string> PaidDateListDate = new List<string>();

                        foreach (var date in range)
                        {
                            allDetails = (from CalObj in selecteddata
                                          where CalObj.FromDate.Date <= date.Date && CalObj.ToDate.Date >= date.Date && CalObj.StudentID == getperdayfeeCalculationRequest.StudentID && CalObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && CalObj.IsDeleted == false
                                          orderby CalObj.Id descending
                                          select new CalculatedFeesViewModel()
                                          {
                                              PerDayFeeCalculationID = CalObj.Id,
                                              ParentID = CalObj.ParentID,
                                              StudentID = CalObj.StudentID,
                                              TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                              AgencyID = CalObj.AgencyID,
                                              FromDate = CalObj.FromDate,
                                              ToDate = CalObj.ToDate,
                                              IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                          }).ToList();
                            if (allDetails.Count == 0)
                            {
                                DateList.Add(date);

                                string Date = date.ToString("dd/MM/yyyy");
                                DateListForRemainingDate.Add(Date);
                            }
                            if (allDetails.Count > 0)
                            {
                                PaidDateList.Add(date.Date);
                                string Date = date.ToString("dd/MM/yyyy");
                                PaidDateListDate.Add(Date);
                            }
                        }

                        differenceInDays = DateList.Count;

                        if (differenceInDays > 0)
                        {
                            foreach (var date in DateList)
                            {
                                allDetailsDayCareDropInDate = (from KioObj in kioskeStudentSignInDetails
                                                               where KioObj.DropInDateTime.Value.Date == date.Date && KioObj.StudentID == getperdayfeeCalculationRequest.StudentID && KioObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && KioObj.IsDeleted == false
                                                               select new KioskeStudentSignInDetailsViewModel()
                                                               {
                                                                   DropInDateTime = KioObj.DropInDateTime,
                                                                   DropOutDateTime = KioObj.DropOutDateTime,
                                                                   BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                   BreakInDateTime = KioObj.BreakInDateTime,
                                                                   AgencyID = KioObj.AgencyID,
                                                                   StudentID = KioObj.StudentID,
                                                                   Id = KioObj.Id,
                                                               }).ToList();

                                allDetailsDayCareBreakOutDate = (from KioObj in kioskeStudentSignInDetails
                                                                 where KioObj.BreakOutDateTime.Value.Date == date.Date && KioObj.StudentID == getperdayfeeCalculationRequest.StudentID && KioObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && KioObj.IsDeleted == false
                                                                 select new KioskeStudentSignInDetailsViewModel()
                                                                 {
                                                                     DropInDateTime = KioObj.DropInDateTime,
                                                                     DropOutDateTime = KioObj.DropOutDateTime,
                                                                     BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                     BreakInDateTime = KioObj.BreakInDateTime,
                                                                     AgencyID = KioObj.AgencyID,
                                                                     StudentID = KioObj.StudentID,
                                                                     Id = KioObj.Id,
                                                                 }).ToList();

                                allDetailsDayCareBreakInDate = (from KioObj in kioskeStudentSignInDetails
                                                                where KioObj.BreakInDateTime.Value.Date == date.Date && KioObj.StudentID == getperdayfeeCalculationRequest.StudentID && KioObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && KioObj.IsDeleted == false
                                                                select new KioskeStudentSignInDetailsViewModel()
                                                                {
                                                                    DropInDateTime = KioObj.DropInDateTime,
                                                                    DropOutDateTime = KioObj.DropOutDateTime,
                                                                    BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                    BreakInDateTime = KioObj.BreakInDateTime,
                                                                    AgencyID = KioObj.AgencyID,
                                                                    StudentID = KioObj.StudentID,
                                                                    Id = KioObj.Id,
                                                                }).ToList();

                                allDetailsDayCareDropOutDate = (from KioObj in kioskeStudentSignInDetails
                                                                where KioObj.DropOutDateTime.Value.Date == date.Date && KioObj.StudentID == getperdayfeeCalculationRequest.StudentID && KioObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && KioObj.IsDeleted == false
                                                                select new KioskeStudentSignInDetailsViewModel()
                                                                {
                                                                    DropInDateTime = KioObj.DropInDateTime,
                                                                    DropOutDateTime = KioObj.DropOutDateTime,
                                                                    BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                    BreakInDateTime = KioObj.BreakInDateTime,
                                                                    AgencyID = KioObj.AgencyID,
                                                                    StudentID = KioObj.StudentID,
                                                                    Id = KioObj.Id,
                                                                }).ToList();


                                if (allDetailsDayCareDropInDate.Count > 0 && allDetailsDayCareDropOutDate.Count > 0)
                                {
                                    for (int i = 0, j = 0; i < allDetailsDayCareDropInDate.Count || j < allDetailsDayCareDropOutDate.Count; i++, j++)
                                    {
                                        DropInDate = System.Convert.ToDateTime(allDetailsDayCareDropInDate[i].DropInDateTime);
                                        DropOutDate = System.Convert.ToDateTime(allDetailsDayCareDropOutDate[j].DropOutDateTime);

                                        TimeSpan tsDropInOut = new TimeSpan();
                                        tsDropInOut = DropOutDate.Subtract(DropInDate);
                                        DropInDays += tsDropInOut.Days;
                                        DropInHours += tsDropInOut.Hours;
                                        DropInMintues += tsDropInOut.Minutes;
                                        DropInSecond += tsDropInOut.Seconds;
                                        DropInMiliSecond += tsDropInOut.Milliseconds;
                                    }

                                    for (int i = 0, j = 0; i < allDetailsDayCareBreakInDate.Count || j < allDetailsDayCareBreakOutDate.Count; i++, j++)
                                    {
                                        BreakInDate = System.Convert.ToDateTime(allDetailsDayCareBreakInDate[i].BreakInDateTime);
                                        BreakOutDate = System.Convert.ToDateTime(allDetailsDayCareBreakOutDate[j].BreakOutDateTime);

                                        TimeSpan tsBreakInOut = new TimeSpan();
                                        tsBreakInOut = BreakInDate.Subtract(BreakOutDate);
                                        BreakInDays += tsBreakInOut.Days;
                                        BreakInHours += tsBreakInOut.Hours;
                                        BreakInMintues += tsBreakInOut.Minutes;
                                        BreakInSecond += tsBreakInOut.Seconds;
                                        BreakInMiliSecond += tsBreakInOut.Milliseconds;
                                    }
                                }
                            }

                            DateTime DropInHoursMinutes = new DateTime();
                            DropInHoursMinutes = DropInHoursMinutes.AddHours(DropInHours);
                            DropInHoursMinutes = DropInHoursMinutes.AddMinutes(DropInMintues);
                            DropInHoursMinutes = DropInHoursMinutes.AddSeconds(DropInSecond);
                            DropInHoursMinutes = DropInHoursMinutes.AddMilliseconds(DropInMiliSecond);

                            DateTime BreakInHoursMinutes = new DateTime();
                            BreakInHoursMinutes = BreakInHoursMinutes.AddHours(BreakInHours);
                            BreakInHoursMinutes = BreakInHoursMinutes.AddMinutes(BreakInMintues);
                            BreakInHoursMinutes = BreakInHoursMinutes.AddSeconds(BreakInSecond);
                            BreakInHoursMinutes = BreakInHoursMinutes.AddMilliseconds(BreakInMiliSecond);

                            int tsHours;
                            int tsMinutes;

                            if (DropInHours >= 24 || BreakInHours >= 24)
                            {
                                tsHours = DropInHours - BreakInHours;
                                tsMinutes = DropInMintues - BreakInMintues;
                                if (tsMinutes >= 60)
                                {
                                    TimeSpan spWorkMin = TimeSpan.FromMinutes(tsMinutes);
                                    string workHours = spWorkMin.ToString(@"hh\:mm");
                                    decimal Minu = (decimal)spWorkMin.TotalHours;
                                    string HourMin = String.Format("{0:0.00}", Minu);
                                    var values = HourMin.ToString(CultureInfo.InvariantCulture).Split('.');
                                    int Hours = int.Parse(values[0]);
                                    int Minutes = int.Parse(values[1]);

                                    TotalHours = Convert.ToInt32(tsHours + Hours).ToString();
                                    TotalMinutes = Convert.ToInt32(Minutes).ToString();
                                }
                            }
                            else
                            {
                                TimeSpan ts = new TimeSpan();
                                ts = DropInHoursMinutes.Subtract(BreakInHoursMinutes);

                                TotalHours = Convert.ToInt32(ts.Hours).ToString();
                                TotalMinutes = Convert.ToInt32(ts.Minutes).ToString();
                            }

                            if (TotalHours != "0" || TotalMinutes != "0")
                            {
                                RemainingCalculatedFeesDate = string.Join(",", DateListForRemainingDate);
                                PaidCalculatedFeesDate = string.Join(",", PaidDateListDate);

                                long ClassId = clsEnrollObj.Single();

                                clsObj = _classRepository.Get(x => x.CategoryId == 6 && x.Id == ClassId && x.AgencyID == getperdayfeeCalculationRequest.AgencyID && x.IsDeleted == false);

                                if (!ReferenceEquals(clsObj, null))
                                {
                                    // For Hourly
                                    if (clsObj.CategoryId == 6)
                                    {
                                        PerHourFee = clsObj.Fees;
                                        decimal HoursCal = Convert.ToDecimal(Math.Round(PerHourFee * Convert.ToDecimal(TotalHours), MidpointRounding.AwayFromZero));
                                        decimal Permincal = Convert.ToDecimal(PerHourFee / 60);
                                        decimal MinutesCal = Convert.ToDecimal(Math.Round(Permincal * Convert.ToDecimal(TotalMinutes), MidpointRounding.AwayFromZero));

                                        TotalFees = Convert.ToDecimal(Math.Round(HoursCal + Convert.ToDecimal(MinutesCal), MidpointRounding.AwayFromZero));
                                        StatusCode = 200;
                                        Message = "Record Fetched successfully";
                                    }
                                }
                            }
                            else
                            {
                                RemainingCalculatedFeesDate = null;
                                PaidCalculatedFeesDate = null;
                                StatusCode = 12;
                                Message = "Student Not Present for this duration";
                            }
                        }
                        else
                        {
                            RemainingCalculatedFeesDate = null;
                            PaidCalculatedFeesDate = null;
                            StatusCode = 10;
                            Message = "Allready Invoice Generate for given date";
                        }
                    }
                }



                // ===============================For Regular Stduent ====================================//

                if (!(getperdayfeeCalculationRequest.CategoryName == "Drop In"))
                {
                    var clsEnrollObj = ((from a in classEnrollment
                                         where ((a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.FromDate.Date && a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.ToDate.Date) || (a.ClassEnrollStartDate.Date >= getperdayfeeCalculationRequest.FromDate.Date && a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.ToDate.Date)) && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                         orderby a.Id ascending
                                         select a.ClassesID));

                    ClassEnroll = ((from a in classEnrollment
                                    where ((a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.FromDate.Date && a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.ToDate.Date) || (a.ClassEnrollStartDate.Date >= getperdayfeeCalculationRequest.FromDate.Date && a.ClassEnrollStartDate.Date <= getperdayfeeCalculationRequest.ToDate.Date)) && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                    orderby a.Id ascending
                                    select a).ToList());


                    EnrollClassesId.Add(clsEnrollObj.ToList());

                    if (ClassEnroll.Count > 0)
                    {
                        // ======= (Regular Student) ============ //

                        foreach (var cls in clsEnrollObj)
                        {
                            var startdate = (getperdayfeeCalculationRequest.FromDate.Date);
                            var enddate = (getperdayfeeCalculationRequest.ToDate.Date);

                            var GetClassEnrollStartDate = ((from a in classEnrollment
                                                            where a.ClassesID == cls && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                                            select a.ClassEnrollStartDate).Single());

                            if (GetClassEnrollStartDate.Date >= startdate)
                            {
                                startdate = (GetClassEnrollStartDate.Date);
                                enddate = (getperdayfeeCalculationRequest.ToDate.Date);
                            }

                            List<DateTime> range = Enumerable.Range(0, (enddate - startdate).Days + 1).Select(i => startdate.AddDays(i)).ToList();
                            List<DateTime> DateList = new List<DateTime>();
                            List<string> DateListForRemainingDate = new List<string>();

                            List<DateTime> PaidDateList = new List<DateTime>();
                            List<string> PaidDateListDate = new List<string>();

                            foreach (var date in range)
                            {
                                allDetails = (from CalObj in selecteddata
                                              where CalObj.FromDate.Date <= date.Date && CalObj.ToDate.Date >= date.Date && CalObj.StudentID == getperdayfeeCalculationRequest.StudentID &&
                                              CalObj.ClassID == cls && CalObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && CalObj.IsDeleted == false
                                              select new CalculatedFeesViewModel()
                                              {
                                                  PerDayFeeCalculationID = CalObj.Id,
                                                  ParentID = CalObj.ParentID,
                                                  StudentID = CalObj.StudentID,
                                                  TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                                  AgencyID = CalObj.AgencyID,
                                                  FromDate = CalObj.FromDate,
                                                  ToDate = CalObj.ToDate,
                                                  IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                              }).ToList();
                                if (allDetails.Count == 0)
                                {
                                    DateList.Add(date.Date);
                                    string Date = date.ToString("dd/MM/yyyy");
                                    DateListForRemainingDate.Add(Date);
                                }
                                if (allDetails.Count > 0)
                                {
                                    PaidDateList.Add(date.Date);
                                    string Date = date.ToString("dd/MM/yyyy");
                                    PaidDateListDate.Add(Date);
                                }
                            }

                            if (DateList.Count > 0)
                            {
                                differenceInDays = DateList.Count;
                                RemainingCalculatedFeesDate = string.Join(",", DateListForRemainingDate);
                                PaidCalculatedFeesDate = string.Join(",", PaidDateListDate);

                                var ClassEnrollStartDate = ((from a in classEnrollment
                                                             where a.ClassesID == cls && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                                             select a.ClassEnrollStartDate).Single());

                                allDetails = (from CalObj in selecteddata
                                              where CalObj.FromDate.Date <= ClassEnrollStartDate.Date && CalObj.ToDate.Date >= ClassEnrollStartDate.Date && CalObj.StudentID == getperdayfeeCalculationRequest.StudentID &&
                                              CalObj.AgencyID == getperdayfeeCalculationRequest.AgencyID && CalObj.IsDeleted == false
                                              select new CalculatedFeesViewModel()
                                              {
                                                  PerDayFeeCalculationID = CalObj.Id,
                                                  ParentID = CalObj.ParentID,
                                                  StudentID = CalObj.StudentID,
                                                  TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                                  AgencyID = CalObj.AgencyID,
                                                  FromDate = CalObj.FromDate,
                                                  ToDate = CalObj.ToDate,
                                                  IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                              }).ToList();

                                if (allDetails.Count > 0)
                                {
                                    differenceInDays = DateList.Count;
                                }
                                else
                                {
                                    if (ClassEnrollStartDate.Date <= startdate.Date && ClassEnrollStartDate.Date <= enddate.Date)
                                    {
                                        differenceInDays = DateList.Count;
                                    }
                                    if (ClassEnrollStartDate.Date <= startdate.Date && ClassEnrollStartDate.Date >= enddate.Date)
                                    {
                                        differenceInDays = DateList.Count;
                                    }
                                    if (ClassEnrollStartDate.Date >= startdate.Date && ClassEnrollStartDate.Date <= enddate.Date)
                                    {
                                        TimeSpan tss = enddate.Date - ClassEnrollStartDate.Date;
                                        int differenceInDayss = tss.Days + 1;
                                        differenceInDays = differenceInDayss;
                                    }
                                }

                                if (!ReferenceEquals(clsEnrollObj, null))
                                {
                                    clsObj = _classRepository.Get(x => x.Id == cls && x.AgencyID == getperdayfeeCalculationRequest.AgencyID && x.IsDeleted == false);

                                    if (!ReferenceEquals(clsObj, null))
                                    {
                                        // For Weekly
                                        if (clsObj.FeeTypeId == 2)
                                        {
                                            PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(7), MidpointRounding.AwayFromZero));
                                            TotalFeesForWeekly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                        }

                                        // For Monthly
                                        if (clsObj.FeeTypeId == 1)
                                        {
                                            int days = DateTime.DaysInMonth(DateTime.UtcNow.Year, DateTime.UtcNow.Month);
                                            PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(days), MidpointRounding.AwayFromZero));
                                            TotalFeesForMonthly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                        }

                                        // For Year
                                        if (clsObj.FeeTypeId == 3)
                                        {
                                            int days = DateTime.IsLeapYear(DateTime.UtcNow.Year) ? 366 : 365;
                                            PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(days), MidpointRounding.AwayFromZero));
                                            TotalFeesForYearly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                        }
                                    }
                                    TotalFees = TotalFeesForWeekly + TotalFeesForMonthly + TotalFeesForYearly;
                                    StatusCode = 200;
                                    Message = "Record Fetched successfully";
                                }
                                else
                                {
                                    StatusCode = 10;
                                    Message = "Allready Invoice Generate for given date";
                                }
                            }
                            else
                            {
                                StatusCode = 10;
                                Message = "Allready Invoice Generate for given date";
                            }
                        }
                    }
                    else
                    {
                        StatusCode = 13;
                        Message = "Student not enroll for this duration";
                    }
                }

                // =======For Get Student Discount Fees inBetween Date (Regular/DayCareIn Stduent) ======//
                StudentFeesDiscountViewModel ps = new StudentFeesDiscountViewModel();
                IQueryable<StudentFeesDiscount> selctStudentDiscountFees = _studentfeesdiscountRepository.GetAll(check => (check.FromDate.Date <= getperdayfeeCalculationRequest.FromDate.Date && check.ToDate.Date >= getperdayfeeCalculationRequest.ToDate.Date) && check.StudentID == getperdayfeeCalculationRequest.StudentID && check.AgencyID == getperdayfeeCalculationRequest.AgencyID && check.IsDeleted == false);
                var StudentDiscountAmount = ((from a in selctStudentDiscountFees
                                              where a.FromDate.Date <= getperdayfeeCalculationRequest.FromDate.Date && a.ToDate.Date >= getperdayfeeCalculationRequest.ToDate && a.StudentID == getperdayfeeCalculationRequest.StudentID && a.AgencyID == getperdayfeeCalculationRequest.AgencyID && a.IsDeleted == false
                                              select a.DiscountAmount)).Sum(x => (x));

                res.EnrollClassesId = EnrollClassesId;
                res.Data = TotalFees;
                res.DiscountAmount = StudentDiscountAmount;
                res.CalculatedFeeDate = RemainingCalculatedFeesDate;
                res.PaidFeeDate = PaidCalculatedFeesDate;
                res.IsSuccess = true;
                res.StatusCode = StatusCode;
                res.Message = Message;
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
            }
            return res;
        }

        public ResponseViewModal BulkFeeCalculation(ClassIdCollection bulkfeeCalculationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            Classes clsObj = null;
            try
            {
                foreach (var studentcheck in bulkfeeCalculationRequest.BulkCalVM)
                {
                    List<CalculatedFeesViewModel> allDetails = new List<CalculatedFeesViewModel>();
                    List<ClassEnrollment> ClassEnroll = new List<ClassEnrollment>();
                    List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareDropInDate = new List<KioskeStudentSignInDetailsViewModel>();
                    List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareDropOutDate = new List<KioskeStudentSignInDetailsViewModel>();
                    List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareBreakOutDate = new List<KioskeStudentSignInDetailsViewModel>();
                    List<KioskeStudentSignInDetailsViewModel> allDetailsDayCareBreakInDate = new List<KioskeStudentSignInDetailsViewModel>();
                    IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.StudentID == studentcheck.StudentID && classCheck.AgencyID == studentcheck.AgencyID && classCheck.EnrollmentStatus == 2 && classCheck.IsDeleted == false);
                    IQueryable<Classes> classes = _classRepository.GetAll().Where(classCheck => classCheck.AgencyID == studentcheck.AgencyID && classCheck.IsDeleted == false);
                    IQueryable<FeePaymentType> feePaymentType = _feesPaymentTypeRepository.GetAll();
                    IQueryable<ParentStudentMapping> ParentStudent = _parentStudentMappingRepository.GetAll();
                    IQueryable<Entity.Masters.CalculatedFees> selecteddata = _cfRepository.GetAll().Where(Check => Check.AgencyID == studentcheck.AgencyID && Check.StudentID == studentcheck.StudentID && Check.IsDeleted == false);
                    IQueryable<KioskeStudentSignInDetails> kioskeStudentSignInDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(classCheck => classCheck.StudentID == studentcheck.StudentID && classCheck.AgencyID == studentcheck.AgencyID && classCheck.IsDeleted == false);

                    // ================= For DropIn Care Stduent ==============================//     

                    if (studentcheck.CategoryID == 6)
                    {
                        decimal PerHourFee = 0;
                        decimal TotalFees = 0;
                        string RemainingCalculatedFeesDate = null;
                        string PaidCalculatedFeesDate = null;

                        string TotalHours = Convert.ToInt32(0).ToString();
                        string TotalMinutes = Convert.ToInt32(0).ToString();

                        int DropInDays = 0;
                        int DropInHours = 0;
                        int DropInMintues = 0;
                        int DropInSecond = 0;
                        int DropInMiliSecond = 0;

                        int BreakInDays = 0;
                        int BreakInHours = 0;
                        int BreakInMintues = 0;
                        int BreakInSecond = 0;
                        int BreakInMiliSecond = 0;

                        DateTime DropInDate = DateTime.Now;
                        DateTime DropOutDate = DateTime.Now;
                        DateTime BreakInDate = DateTime.Now;
                        DateTime BreakOutDate = DateTime.Now;

                        int differenceInDays = 0;
                        ArrayList EnrollClassesId = new ArrayList();

                        var clsEnrollObj = (from a in classEnrollment
                                            where a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID
                                            && a.EnrollmentStatus == 2 && a.IsDeleted == false
                                            select a.ClassesID);

                        foreach (var cls in clsEnrollObj)
                        {
                            var startdate = (studentcheck.FromDate.Date);
                            var enddate = (studentcheck.ToDate.Date);

                            var GetMinDateStudent = ((from a in kioskeStudentSignInDetails
                                                      where a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID
                                                       && a.IsDeleted == false
                                                      select a.DropInDateTime).Min());

                            if (GetMinDateStudent.Value.Date >= startdate)
                            {
                                startdate = GetMinDateStudent.Value.Date;
                                enddate = studentcheck.ToDate.Date;
                            }

                            List<DateTime> range = Enumerable.Range(0, (enddate - startdate).Days + 1).Select(i => startdate.AddDays(i)).ToList();
                            List<DateTime> DateList = new List<DateTime>();
                            List<string> DateListForRemainingDate = new List<string>();

                            List<DateTime> PaidDateList = new List<DateTime>();
                            List<string> PaidDateListDate = new List<string>();

                            foreach (var date in range)
                            {
                                allDetails = (from CalObj in selecteddata
                                              where CalObj.FromDate.Date <= date.Date && CalObj.ToDate.Date >= date.Date && CalObj.StudentID == studentcheck.StudentID && CalObj.AgencyID == studentcheck.AgencyID && CalObj.IsDeleted == false
                                              orderby CalObj.Id descending
                                              select new CalculatedFeesViewModel()
                                              {
                                                  PerDayFeeCalculationID = CalObj.Id,
                                                  ParentID = CalObj.ParentID,
                                                  StudentID = CalObj.StudentID,
                                                  TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                                  AgencyID = CalObj.AgencyID,
                                                  FromDate = CalObj.FromDate,
                                                  ToDate = CalObj.ToDate,
                                                  IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                              }).ToList();

                                if (allDetails.Count == 0)
                                {
                                    DateList.Add(date);

                                    string Date = date.ToString("dd/MM/yyyy");
                                    DateListForRemainingDate.Add(Date);
                                }
                                if (allDetails.Count > 0)
                                {
                                    PaidDateList.Add(date.Date);
                                    string Date = date.ToString("dd/MM/yyyy");
                                    PaidDateListDate.Add(Date);
                                }
                            }

                            differenceInDays = DateList.Count;

                            if (differenceInDays > 0)
                            {
                                foreach (var date in DateList)
                                {
                                    allDetailsDayCareDropInDate = (from KioObj in kioskeStudentSignInDetails
                                                                   where KioObj.DropInDateTime.Value.Date == date.Date && KioObj.StudentID == studentcheck.StudentID && KioObj.AgencyID == studentcheck.AgencyID && KioObj.IsDeleted == false
                                                                   select new KioskeStudentSignInDetailsViewModel()
                                                                   {
                                                                       DropInDateTime = KioObj.DropInDateTime,
                                                                       DropOutDateTime = KioObj.DropOutDateTime,
                                                                       BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                       BreakInDateTime = KioObj.BreakInDateTime,
                                                                       AgencyID = KioObj.AgencyID,
                                                                       StudentID = KioObj.StudentID,
                                                                       Id = KioObj.Id,
                                                                   }).ToList();

                                    allDetailsDayCareBreakOutDate = (from KioObj in kioskeStudentSignInDetails
                                                                     where KioObj.BreakOutDateTime.Value.Date == date.Date && KioObj.StudentID == studentcheck.StudentID && KioObj.AgencyID == studentcheck.AgencyID && KioObj.IsDeleted == false
                                                                     select new KioskeStudentSignInDetailsViewModel()
                                                                     {
                                                                         DropInDateTime = KioObj.DropInDateTime,
                                                                         DropOutDateTime = KioObj.DropOutDateTime,
                                                                         BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                         BreakInDateTime = KioObj.BreakInDateTime,
                                                                         AgencyID = KioObj.AgencyID,
                                                                         StudentID = KioObj.StudentID,
                                                                         Id = KioObj.Id,
                                                                     }).ToList();

                                    allDetailsDayCareBreakInDate = (from KioObj in kioskeStudentSignInDetails
                                                                    where KioObj.BreakInDateTime.Value.Date == date.Date && KioObj.StudentID == studentcheck.StudentID && KioObj.AgencyID == studentcheck.AgencyID && KioObj.IsDeleted == false
                                                                    select new KioskeStudentSignInDetailsViewModel()
                                                                    {
                                                                        DropInDateTime = KioObj.DropInDateTime,
                                                                        DropOutDateTime = KioObj.DropOutDateTime,
                                                                        BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                        BreakInDateTime = KioObj.BreakInDateTime,
                                                                        AgencyID = KioObj.AgencyID,
                                                                        StudentID = KioObj.StudentID,
                                                                        Id = KioObj.Id,
                                                                    }).ToList();

                                    allDetailsDayCareDropOutDate = (from KioObj in kioskeStudentSignInDetails
                                                                    where KioObj.DropOutDateTime.Value.Date == date.Date && KioObj.StudentID == studentcheck.StudentID && KioObj.AgencyID == studentcheck.AgencyID && KioObj.IsDeleted == false
                                                                    select new KioskeStudentSignInDetailsViewModel()
                                                                    {
                                                                        DropInDateTime = KioObj.DropInDateTime,
                                                                        DropOutDateTime = KioObj.DropOutDateTime,
                                                                        BreakOutDateTime = KioObj.BreakOutDateTime,
                                                                        BreakInDateTime = KioObj.BreakInDateTime,
                                                                        AgencyID = KioObj.AgencyID,
                                                                        StudentID = KioObj.StudentID,
                                                                        Id = KioObj.Id,
                                                                    }).ToList();


                                    if (allDetailsDayCareDropInDate.Count > 0 && allDetailsDayCareDropOutDate.Count > 0)
                                    {
                                        for (int i = 0, j = 0; i < allDetailsDayCareDropInDate.Count || j < allDetailsDayCareDropOutDate.Count; i++, j++)
                                        {
                                            DropInDate = System.Convert.ToDateTime(allDetailsDayCareDropInDate[i].DropInDateTime);
                                            DropOutDate = System.Convert.ToDateTime(allDetailsDayCareDropOutDate[j].DropOutDateTime);

                                            TimeSpan tsDropInOut = new TimeSpan();
                                            tsDropInOut = DropOutDate.Subtract(DropInDate);
                                            DropInDays += tsDropInOut.Days;
                                            DropInHours += tsDropInOut.Hours;
                                            DropInMintues += tsDropInOut.Minutes;
                                            DropInSecond += tsDropInOut.Seconds;
                                            DropInMiliSecond += tsDropInOut.Milliseconds;
                                        }

                                        for (int i = 0, j = 0; i < allDetailsDayCareBreakInDate.Count || j < allDetailsDayCareBreakOutDate.Count; i++, j++)
                                        {
                                            BreakInDate = System.Convert.ToDateTime(allDetailsDayCareBreakInDate[i].BreakInDateTime);
                                            BreakOutDate = System.Convert.ToDateTime(allDetailsDayCareBreakOutDate[j].BreakOutDateTime);

                                            TimeSpan tsBreakInOut = new TimeSpan();
                                            tsBreakInOut = BreakInDate.Subtract(BreakOutDate);
                                            BreakInDays += tsBreakInOut.Days;
                                            BreakInHours += tsBreakInOut.Hours;
                                            BreakInMintues += tsBreakInOut.Minutes;
                                            BreakInSecond += tsBreakInOut.Seconds;
                                            BreakInMiliSecond += tsBreakInOut.Milliseconds;
                                        }
                                    }
                                }

                                DateTime DropInHoursMinutes = new DateTime();
                                DropInHoursMinutes = DropInHoursMinutes.AddHours(DropInHours);
                                DropInHoursMinutes = DropInHoursMinutes.AddMinutes(DropInMintues);
                                DropInHoursMinutes = DropInHoursMinutes.AddSeconds(DropInSecond);
                                DropInHoursMinutes = DropInHoursMinutes.AddMilliseconds(DropInMiliSecond);

                                DateTime BreakInHoursMinutes = new DateTime();
                                BreakInHoursMinutes = BreakInHoursMinutes.AddHours(BreakInHours);
                                BreakInHoursMinutes = BreakInHoursMinutes.AddMinutes(BreakInMintues);
                                BreakInHoursMinutes = BreakInHoursMinutes.AddSeconds(BreakInSecond);
                                BreakInHoursMinutes = BreakInHoursMinutes.AddMilliseconds(BreakInMiliSecond);

                                int tsHours;
                                int tsMinutes;

                                if (DropInHours >= 24 || BreakInHours >= 24)
                                {
                                    tsHours = DropInHours - BreakInHours;
                                    tsMinutes = DropInMintues - BreakInMintues;
                                    if (tsMinutes >= 60)
                                    {
                                        TimeSpan spWorkMin = TimeSpan.FromMinutes(tsMinutes);
                                        string workHours = spWorkMin.ToString(@"hh\:mm");
                                        decimal Minu = (decimal)spWorkMin.TotalHours;
                                        string HourMin = String.Format("{0:0.00}", Minu);
                                        var values = HourMin.ToString(CultureInfo.InvariantCulture).Split('.');
                                        int Hours = int.Parse(values[0]);
                                        int Minutes = int.Parse(values[1]);

                                        TotalHours = Convert.ToInt32(tsHours + Hours).ToString();
                                        TotalMinutes = Convert.ToInt32(Minutes).ToString();
                                    }
                                }
                                else
                                {
                                    TimeSpan ts = new TimeSpan();
                                    ts = DropInHoursMinutes.Subtract(BreakInHoursMinutes);

                                    TotalHours = Convert.ToInt32(ts.Hours).ToString();
                                    TotalMinutes = Convert.ToInt32(ts.Minutes).ToString();
                                }

                                if (TotalHours != "0" || TotalMinutes != "0")
                                {
                                    RemainingCalculatedFeesDate = string.Join(",", DateListForRemainingDate);
                                    PaidCalculatedFeesDate = string.Join(",", PaidDateListDate);

                                    clsObj = _classRepository.Get(x => x.CategoryId == 6 && x.Id == cls && x.AgencyID == studentcheck.AgencyID && x.IsDeleted == false);

                                    if (!ReferenceEquals(clsObj, null))
                                    {
                                        // For Hourly
                                        if (clsObj.CategoryId == 6)
                                        {
                                            PerHourFee = clsObj.Fees;
                                            decimal HoursCal = Convert.ToDecimal(Math.Round(PerHourFee * Convert.ToDecimal(TotalHours), MidpointRounding.AwayFromZero));
                                            decimal Permincal = Convert.ToDecimal(PerHourFee / 60);
                                            decimal MinutesCal = Convert.ToDecimal(Math.Round(Permincal * Convert.ToDecimal(TotalMinutes), MidpointRounding.AwayFromZero));

                                            TotalFees = Convert.ToDecimal(Math.Round(HoursCal + Convert.ToDecimal(MinutesCal), MidpointRounding.AwayFromZero));
                                        }

                                        if (TotalFees > 0)
                                        {
                                            CalculatedFeesViewModel saveCalculatedFeesInfoRequest = new CalculatedFeesViewModel();
                                            long[] ClassId = { cls };
                                            saveCalculatedFeesInfoRequest.CreatedDate = DateTime.UtcNow;
                                            saveCalculatedFeesInfoRequest.IsActive = true;
                                            saveCalculatedFeesInfoRequest.IsDeleted = false;
                                            saveCalculatedFeesInfoRequest.AgencyID = studentcheck.AgencyID;
                                            saveCalculatedFeesInfoRequest.ParentID = studentcheck.ParentID;
                                            saveCalculatedFeesInfoRequest.ClassesID = ClassId;
                                            saveCalculatedFeesInfoRequest.StudentID = studentcheck.StudentID;
                                            saveCalculatedFeesInfoRequest.TotalCalculatedAmount = TotalFees;
                                            saveCalculatedFeesInfoRequest.TotalPerDayFee = TotalFees;
                                            saveCalculatedFeesInfoRequest.FromDate = studentcheck.FromDate;
                                            saveCalculatedFeesInfoRequest.ToDate = studentcheck.ToDate;
                                            saveCalculatedFeesInfoRequest.CalculatedFeeDate = RemainingCalculatedFeesDate;
                                            SaveCalculatedFees(saveCalculatedFeesInfoRequest);
                                        }
                                    }
                                }
                                else
                                {
                                    RemainingCalculatedFeesDate = null;
                                    PaidCalculatedFeesDate = null;
                                }
                            }
                            else
                            {
                                RemainingCalculatedFeesDate = null;
                                PaidCalculatedFeesDate = null;
                            }

                        }
                    }


                    //================ For Regular Stduent ====================================//

                    if (!(studentcheck.CategoryID == 6))
                    {
                        decimal PerDayFee = 0;
                        decimal TotalFeesForWeekly = 0;
                        decimal TotalFeesForMonthly = 0;
                        decimal TotalFeesForYearly = 0;
                        decimal TotalFees = 0;
                        string RemainingCalculatedFeesDate = null;
                        string PaidCalculatedFeesDate = null;
                        string TotalHours = Convert.ToInt32(0).ToString();
                        string TotalMinutes = Convert.ToInt32(0).ToString();

                        int differenceInDays = 0;
                        ArrayList EnrollClassesId = new ArrayList();


                        var clsEnrollObj = ((from a in classEnrollment
                                             where ((a.ClassEnrollStartDate.Date <= studentcheck.FromDate.Date && a.ClassEnrollStartDate.Date <= studentcheck.ToDate.Date) || (a.ClassEnrollStartDate.Date >= studentcheck.FromDate.Date && a.ClassEnrollStartDate.Date <= studentcheck.ToDate.Date)) && a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                             orderby a.Id ascending
                                             select a.ClassesID));

                        ClassEnroll = ((from a in classEnrollment
                                        where ((a.ClassEnrollStartDate.Date <= studentcheck.FromDate.Date && a.ClassEnrollStartDate.Date <= studentcheck.ToDate.Date) || (a.ClassEnrollStartDate.Date >= studentcheck.FromDate.Date && a.ClassEnrollStartDate.Date <= studentcheck.ToDate.Date)) && a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                        orderby a.Id ascending
                                        select a).ToList());


                        EnrollClassesId.Add(clsEnrollObj.ToList());


                        if (ClassEnroll.Count > 0)
                        {
                            // ======= (Regular Student) ============ //

                            foreach (var cls in clsEnrollObj)
                            {
                                var startdate = studentcheck.FromDate.Date;
                                var enddate = studentcheck.ToDate.Date;

                                var GetClassEnrollStartDate = ((from a in classEnrollment
                                                                where a.ClassesID == cls && a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                                                select a.ClassEnrollStartDate).Single());

                                if (GetClassEnrollStartDate.Date >= startdate)
                                {
                                    startdate = (GetClassEnrollStartDate.Date);
                                    enddate = (studentcheck.ToDate.Date);
                                }

                                List<DateTime> range = Enumerable.Range(0, (enddate - startdate).Days + 1).Select(i => startdate.AddDays(i)).ToList();
                                List<DateTime> DateList = new List<DateTime>();
                                List<string> DateListForRemainingDate = new List<string>();

                                List<DateTime> PaidDateList = new List<DateTime>();
                                List<string> PaidDateListDate = new List<string>();

                                foreach (var date in range)
                                {
                                    allDetails = (from CalObj in selecteddata
                                                  where CalObj.FromDate.Date <= date.Date && CalObj.ToDate.Date >= date.Date && CalObj.StudentID == studentcheck.StudentID &&
                                                  CalObj.ClassID == cls && CalObj.AgencyID == studentcheck.AgencyID && CalObj.IsDeleted == false
                                                  select new CalculatedFeesViewModel()
                                                  {
                                                      PerDayFeeCalculationID = CalObj.Id,
                                                      ParentID = CalObj.ParentID,
                                                      StudentID = CalObj.StudentID,
                                                      TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                                      AgencyID = CalObj.AgencyID,
                                                      FromDate = CalObj.FromDate,
                                                      ToDate = CalObj.ToDate,
                                                      IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                                  }).ToList();
                                    if (allDetails.Count == 0)
                                    {
                                        DateList.Add(date.Date);
                                        string Date = date.ToString("dd/MM/yyyy");
                                        DateListForRemainingDate.Add(Date);
                                    }
                                    if (allDetails.Count > 0)
                                    {
                                        PaidDateList.Add(date.Date);
                                        string Date = date.ToString("dd/MM/yyyy");
                                        PaidDateListDate.Add(Date);
                                    }
                                }

                                if (DateList.Count > 0)
                                {
                                    differenceInDays = DateList.Count;
                                    RemainingCalculatedFeesDate = string.Join(",", DateListForRemainingDate);
                                    PaidCalculatedFeesDate = string.Join(",", PaidDateListDate);

                                    var ClassEnrollStartDate = ((from a in classEnrollment
                                                                 where a.ClassesID == cls && a.StudentID == studentcheck.StudentID && a.AgencyID == studentcheck.AgencyID & a.EnrollmentStatus == 2 && a.IsDeleted == false
                                                                 select a.ClassEnrollStartDate).Single());

                                    allDetails = (from CalObj in selecteddata
                                                  where CalObj.FromDate.Date <= ClassEnrollStartDate.Date && CalObj.ToDate.Date >= ClassEnrollStartDate.Date && CalObj.StudentID == studentcheck.StudentID &&
                                                  CalObj.AgencyID == studentcheck.AgencyID && CalObj.IsDeleted == false
                                                  select new CalculatedFeesViewModel()
                                                  {
                                                      PerDayFeeCalculationID = CalObj.Id,
                                                      ParentID = CalObj.ParentID,
                                                      StudentID = CalObj.StudentID,
                                                      TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                                      AgencyID = CalObj.AgencyID,
                                                      FromDate = CalObj.FromDate,
                                                      ToDate = CalObj.ToDate,
                                                      IsInvoiceGenrated = CalObj.IsInvoiceGenrated
                                                  }).ToList();


                                    if (allDetails.Count > 0)
                                    {
                                        differenceInDays = DateList.Count;
                                    }
                                    else
                                    {
                                        if (ClassEnrollStartDate.Date <= startdate.Date && ClassEnrollStartDate.Date <= enddate.Date)
                                        {
                                            differenceInDays = DateList.Count;
                                        }
                                        if (ClassEnrollStartDate.Date <= startdate.Date && ClassEnrollStartDate.Date >= enddate.Date)
                                        {
                                            differenceInDays = DateList.Count;
                                        }
                                        if (ClassEnrollStartDate.Date >= startdate.Date && ClassEnrollStartDate.Date <= enddate.Date)
                                        {
                                            TimeSpan tss = enddate.Date - ClassEnrollStartDate.Date;
                                            int differenceInDayss = tss.Days + 1;
                                            differenceInDays = differenceInDayss;
                                        }
                                    }

                                    if (!ReferenceEquals(clsEnrollObj, null))
                                    {
                                        clsObj = _classRepository.Get(x => x.Id == cls && x.AgencyID == studentcheck.AgencyID && x.IsDeleted == false);

                                        if (!ReferenceEquals(clsObj, null))
                                        {
                                            // For Weekly
                                            if (clsObj.FeeTypeId == 2)
                                            {
                                                PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(7), MidpointRounding.AwayFromZero));
                                                TotalFeesForWeekly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                            }

                                            // For Monthly
                                            if (clsObj.FeeTypeId == 1)
                                            {
                                                int days = DateTime.DaysInMonth(DateTime.UtcNow.Year, DateTime.UtcNow.Month);
                                                PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(days), MidpointRounding.AwayFromZero));
                                                TotalFeesForMonthly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                            }

                                            // For Year
                                            if (clsObj.FeeTypeId == 3)
                                            {
                                                int days = DateTime.IsLeapYear(DateTime.UtcNow.Year) ? 366 : 365;
                                                PerDayFee = Convert.ToDecimal(Math.Round(clsObj.Fees / Convert.ToDecimal(days), MidpointRounding.AwayFromZero));
                                                TotalFeesForYearly = Convert.ToDecimal(Math.Round(PerDayFee * differenceInDays, MidpointRounding.AwayFromZero) + TotalFees);
                                            }
                                        }

                                        TotalFees = TotalFeesForWeekly + TotalFeesForMonthly + TotalFeesForYearly;
                                    }
                                    else
                                    {

                                    }
                                }
                                else
                                {

                                }
                            }

                            if (TotalFees > 0)
                            {
                                CalculatedFeesViewModel saveCalculatedFeesInfoRequest = new CalculatedFeesViewModel();
                                long[] ClassId = clsEnrollObj.ToArray();
                                saveCalculatedFeesInfoRequest.CreatedDate = DateTime.UtcNow;
                                saveCalculatedFeesInfoRequest.IsActive = true;
                                saveCalculatedFeesInfoRequest.IsDeleted = false;
                                saveCalculatedFeesInfoRequest.AgencyID = studentcheck.AgencyID;
                                saveCalculatedFeesInfoRequest.ParentID = studentcheck.ParentID;
                                saveCalculatedFeesInfoRequest.ClassesID = ClassId;
                                saveCalculatedFeesInfoRequest.StudentID = studentcheck.StudentID;
                                saveCalculatedFeesInfoRequest.TotalCalculatedAmount = TotalFees;
                                saveCalculatedFeesInfoRequest.TotalPerDayFee = TotalFees;
                                saveCalculatedFeesInfoRequest.FromDate = studentcheck.FromDate;
                                saveCalculatedFeesInfoRequest.ToDate = studentcheck.ToDate;
                                saveCalculatedFeesInfoRequest.CalculatedFeeDate = RemainingCalculatedFeesDate;
                                SaveCalculatedFees(saveCalculatedFeesInfoRequest);
                            }
                        }
                        else
                        {

                        }
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


        public ResponseViewModal GetAddFeesDetails(CalculatedFeesViewModel calculatedDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            DateTime LastDate;
            try
            {
                List<CalculatedFeesViewModel> allDetails = new List<CalculatedFeesViewModel>();
                IQueryable<ClassEnrollment> classEnrollment = _classEnrollmentRepository.GetAll().Where(classCheck => classCheck.StudentID == calculatedDetailsRequest.StudentID && classCheck.AgencyID == calculatedDetailsRequest.AgencyID && classCheck.EnrollmentStatus == 2 && classCheck.IsDeleted == false);
                IQueryable<Entity.Masters.CalculatedFees> selecteddata = _cfRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && Check.IsDeleted == false);

                allDetails = (from CalObj in selecteddata
                              join parentObj in selectedParent on CalObj.ParentID equals parentObj.Id
                              join studObj in selectedStudent on CalObj.StudentID equals studObj.Id
                              join classObj in selectedClasses on CalObj.ClassID equals classObj.Id
                              where CalObj.StudentID == calculatedDetailsRequest.StudentID && CalObj.AgencyID == calculatedDetailsRequest.AgencyID && CalObj.IsDeleted == false
                              orderby CalObj.Id descending
                              select new CalculatedFeesViewModel()
                              {
                                  PerDayFeeCalculationID = CalObj.Id,
                                  ParentID = CalObj.ParentID,
                                  StudentID = CalObj.StudentID,
                                  TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                  AgencyID = CalObj.AgencyID,
                                  ParentName = parentObj.ParentName,
                                  StudentName = studObj.StudentName,
                                  ClassName = classObj.ClassName,
                                  ClassID = classObj.Id,
                                  FromDate = CalObj.FromDate,
                                  ToDate = CalObj.ToDate,
                                  IsInvoiceGenrated = CalObj.IsInvoiceGenrated,
                                  DiscountAmount = CalObj.DiscountAmount
                              }).ToList();

                var result = allDetails.Where(x => (x.StudentID == x.StudentID & x.ClassID == x.ClassID & x.AgencyID == x.AgencyID & x.IsDeleted == false)).GroupBy(s => s.TotalCalculatedAmount).Select(p => p.First()).ToList();

                if (result.Count > 0)
                {
                    var classesname = "";
                    var classesids = "";

                    var className = allDetails.Where(p => p.StudentID == calculatedDetailsRequest.StudentID).Select(p => p.ClassName).Distinct().ToArray();
                    classesname = string.Join(",", className);

                    var classesId = allDetails.Where(p => p.StudentID == calculatedDetailsRequest.StudentID).Select(p => p.ClassID).Distinct().ToArray();
                    classesids = string.Join(",", classesId);

                    foreach (var r in result)
                    {
                        r.ClassIDs = classesids;
                        r.ClassName = classesname;
                    }

                    res.Data = result;

                    if (calculatedDetailsRequest.limit != 0)
                    {
                        res.Data = result.Skip((calculatedDetailsRequest.page) * calculatedDetailsRequest.limit).Take(calculatedDetailsRequest.limit).ToList();
                    }

                    List<Entity.Masters.CalculatedFees> StudentFeesListDetails = _cfRepository.GetAll().Where(Check => Check.StudentID == calculatedDetailsRequest.StudentID && Check.AgencyID == calculatedDetailsRequest.AgencyID && Check.IsDeleted == false).ToList();

                    if (StudentFeesListDetails.Count > 0)
                    {
                        var maxObject = result.OrderByDescending(item => item.PerDayFeeCalculationID).First();

                        var selecteddate = ((from a in selecteddata
                                             where a.StudentID == calculatedDetailsRequest.StudentID && a.AgencyID == calculatedDetailsRequest.AgencyID && a.Id == maxObject.PerDayFeeCalculationID && a.IsDeleted == false
                                             select a.ToDate).Single());
                        DateTime dt = Convert.ToDateTime(selecteddate);
                        LastDate = Convert.ToDateTime(dt.AddDays(1));
                    }
                    else
                    {
                        var selecteddate = ((from a in classEnrollment
                                             where a.StudentID == calculatedDetailsRequest.StudentID && a.AgencyID == calculatedDetailsRequest.AgencyID && a.IsDeleted == false
                                             select a.ClassEnrollStartDate).Single());
                        DateTime dt = Convert.ToDateTime(selecteddate);
                        LastDate = Convert.ToDateTime(dt.AddDays(1));
                    }
                    res.LastDate = LastDate;
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Calculated Fees Details have been successfully fetched.";
                }
                else
                {
                    res.Data = result;
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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


        public ResponseViewModal GetAddFeesDetailsView(CalculatedFeesViewModel calculatedDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<CalculatedFeesViewModel> allDetails = new List<CalculatedFeesViewModel>();
                IQueryable<Entity.Masters.CalculatedFees> selecteddata = _cfRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.ExtraFeesDetails> extrafeesdetails = _efdRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);
                IQueryable<Entity.Masters.ExtraFeeChargeMaster> extrafeeschargedetails = _extraFeeChargeMasterRepository.GetAll().Where(Check => Check.AgencyID == calculatedDetailsRequest.AgencyID && !Check.IsDeleted);

                allDetails = (from CalObj in selecteddata
                              join parentObj in selectedParent on CalObj.ParentID equals parentObj.Id
                              join studObj in selectedStudent on CalObj.StudentID equals studObj.Id
                              join classObj in selectedClasses on CalObj.ClassID equals classObj.Id
                              where CalObj.FromDate.Date == calculatedDetailsRequest.FromDate.Date && CalObj.ToDate.Date == calculatedDetailsRequest.ToDate.Date &&
                              CalObj.StudentID == calculatedDetailsRequest.StudentID && !CalObj.IsDeleted &&
                              CalObj.AgencyID == calculatedDetailsRequest.AgencyID
                              select new CalculatedFeesViewModel()
                              {
                                  PerDayFeeCalculationID = CalObj.Id,
                                  ParentID = CalObj.ParentID,
                                  StudentID = CalObj.StudentID,
                                  TotalPerDayFee = CalObj.TotalPerDayFee,
                                  TotalCalculatedAmount = CalObj.TotalCalculatedAmount,
                                  AgencyID = CalObj.AgencyID,
                                  ParentName = parentObj.ParentName,
                                  StudentName = studObj.StudentName,
                                  ClassName = classObj.ClassName,
                                  ClassID = classObj.Id,
                                  FromDate = CalObj.FromDate,
                                  ToDate = CalObj.ToDate,
                                  IsInvoiceGenrated = CalObj.IsInvoiceGenrated,
                                  DiscountAmount = CalObj.DiscountAmount,
                                  DiscountDetails = CalObj.DiscountDetails,

                                  ExtraFees = (from CalObj in selecteddata
                                               join extrafeesdetailsObj in extrafeesdetails on CalObj.Id equals extrafeesdetailsObj.CalculatedFeesID
                                               join extrafee in extrafeeschargedetails on extrafeesdetailsObj.ExtraFeeChargeMasterID equals extrafee.Id
                                               where CalObj.FromDate.Date == calculatedDetailsRequest.FromDate.Date && CalObj.ToDate.Date == calculatedDetailsRequest.ToDate.Date &&
                                               CalObj.StudentID == calculatedDetailsRequest.StudentID && !extrafeesdetailsObj.IsDeleted &&
                                               extrafeesdetailsObj.AgencyID == calculatedDetailsRequest.AgencyID
                                               select new ExtraFeeChargeDetailsViewModel()
                                               {
                                                   Id = extrafeesdetailsObj.Id,
                                                   AgencyID = extrafeesdetailsObj.AgencyID,
                                                   ExtraFeeChargeMasterID = extrafeesdetailsObj.ExtraFeeChargeMasterID,
                                                   ExtraChargeName = extrafee.ExtraChargeName,
                                                   ChargeAmount = extrafeesdetailsObj.ChargeAmount,
                                                   DiscountDetails = extrafeesdetailsObj.DiscountDetails,
                                               }).GroupBy(p => p.ExtraFeeChargeMasterID).Select(p => p.First()).ToList(),

                              }).ToList();

                var result = allDetails.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
                foreach (var r in result)
                {
                    var className = allDetails.Where(p => p.StudentID == r.StudentID).Select(p => p.ClassName).ToArray();
                    r.ClassName = string.Join(",", className);

                    var classesId = allDetails.Where(p => p.StudentID == r.StudentID).Select(p => p.ClassID).ToArray();
                    r.ClassIDs = string.Join(",", classesId);
                }
                res.Data = result;

                if (calculatedDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((calculatedDetailsRequest.page) * calculatedDetailsRequest.limit).Take(calculatedDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Calculated Fees Details have been successfully fetched.";
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


        public ResponseViewModal SaveStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            StudentFeesDiscount stdObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    List<long> RemainingStudentListID = new List<long>();

                    foreach (var Sid in discountAmountViewModel.StudentIDs)
                    {
                        stdObj = _studentfeesdiscountRepository.Get(x => x.StudentID == Sid && !x.IsDeleted);
                        if (!ReferenceEquals(stdObj, null))
                        {
                            //========Update StudentFeesDiscount table For Perticular Student =======//
                            stdObj.FromDate = discountAmountViewModel.FromDate.Date;
                            stdObj.ToDate = discountAmountViewModel.ToDate.Date;
                            stdObj.DiscountAmount = discountAmountViewModel.DiscountAmount;
                            stdObj.DiscountDescription = discountAmountViewModel.DiscountDescription;
                            stdObj.UpdatedDate = DateTime.UtcNow;
                            _studentfeesdiscountRepository.Update(stdObj);
                            _studentfeesdiscountRepository.SaveChanges();
                        }
                        else
                        {
                            RemainingStudentListID.Add(Sid);
                        }
                    }

                    foreach (var Sid in RemainingStudentListID)
                    {
                        //========Add StudentFeesDiscount table For Perticular Student =======//
                        long Id = 0;
                        discountAmountViewModel.CreatedDate = DateTime.UtcNow;
                        discountAmountViewModel.IsActive = true;
                        discountAmountViewModel.IsDeleted = false;
                        discountAmountViewModel.StudentID = Sid;

                        stdObj = Mapper.Map<StudentFeesDiscount>(discountAmountViewModel);
                        _studentfeesdiscountRepository.Create(stdObj);
                        _studentfeesdiscountRepository.SaveChanges();
                        Id = stdObj.Id;
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    DisplayMessage = "Discount has been saved.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
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

        public ResponseViewModal GetStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (discountAmountViewModel.AgencyID > 0)
                {
                    List<StudentViewModel> allStudents = new List<StudentViewModel>();
                    IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == discountAmountViewModel.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Masters.StudentFeesDiscount> selectedStudentsFeesDiscount = _studentfeesdiscountRepository.GetAll().Where(check => check.AgencyID == discountAmountViewModel.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == discountAmountViewModel.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == discountAmountViewModel.AgencyID && check.EnrollmentStatus == 2 && !check.IsDeleted);
                    IQueryable<Entity.Agency.Classes> selectedClass = _classRepository.GetAll().Where(check => check.AgencyID == discountAmountViewModel.AgencyID && !check.IsDeleted);
                    IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();

                    allStudents = (from studentObj in selectedStudents
                                   join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                   join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                   join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id
                                   where !studentObj.IsDeleted && discountAmountViewModel.AgencyID == studentObj.AgencyID && studentObj.Id == classEnrollmentObj.StudentID
                                   select new StudentViewModel()
                                   {
                                       StudentId = studentObj.Id,
                                       StudentName = studentObj.StudentName ?? String.Empty,
                                       AgencyID = studentObj.AgencyID,
                                       ParentID = studentObj.ParentID,
                                       ClassName = classObj.ClassName,
                                       ParentName = parentObj.ParentName ?? String.Empty,
                                       FirstName = studentObj.FirstName ?? String.Empty,
                                       LastName = studentObj.LastName ?? String.Empty,
                                   }).OrderBy(c => c.StudentName).Distinct().ToList();

                    var result = allStudents.GroupBy(p => p.StudentId).Select(p => p.First()).ToList();
                    //to add class names
                    foreach (var r in result)
                    {
                        var clasess = allStudents.Where(p => p.StudentId == r.StudentId).Select(p => p.ClassName).ToArray();
                        r.ClassName = string.Join(",", clasess);
                    }

                    res.Data = result;

                    foreach (var item in result)
                    {
                        var allDetails = (from SFDObj in selectedStudentsFeesDiscount
                                          where SFDObj.FromDate.Date <= discountAmountViewModel.FromDate.Date && SFDObj.ToDate.Date >= discountAmountViewModel.ToDate.Date
                                          && SFDObj.StudentID == item.StudentId &&
                                          SFDObj.AgencyID == discountAmountViewModel.AgencyID && SFDObj.IsDeleted == false
                                          select new StudentFeesDiscountViewModel()
                                          {
                                              AgencyID = SFDObj.AgencyID,
                                              StudentID = SFDObj.StudentID,
                                              FromDate = SFDObj.FromDate.Date,
                                              ToDate = SFDObj.ToDate.Date,
                                              DiscountAmount = SFDObj.DiscountAmount
                                          }).ToList();

                        if (allDetails.Count > 0)
                        {
                            item.isMarked = true;
                            item.DiscountAmount = allDetails[0].DiscountAmount;
                        }
                        else
                        {
                            item.isMarked = false;
                        }
                    }
                    if (discountAmountViewModel.limit != 0)
                    {
                        res.Data = result.Skip((discountAmountViewModel.page) * discountAmountViewModel.limit).Take(discountAmountViewModel.limit).ToList();
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


        public ResponseViewModal SaveAdvanceFeePaymentDetails(AdvanceFeePaymentDetailsViewModel saveAdvanceFeePaymentInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            AdvanceFeePaymentDetails afpdObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == saveAdvanceFeePaymentInfoRequest.AgencyID && Check.ParentID == saveAdvanceFeePaymentInfoRequest.ParentID && Check.IsDeleted == false);

                    var allDetails = (from AFPDObj in advanceFeePaymentDetails
                                      where AFPDObj.ParentID == saveAdvanceFeePaymentInfoRequest.ParentID &&
                                      AFPDObj.IsDeleted == false
                                      orderby AFPDObj.Id descending
                                      select new AdvanceFeePaymentDetailsViewModel()
                                      {
                                          BalanceAmount = AFPDObj.BalanceAmount,
                                      }).FirstOrDefault();
                    if (!(allDetails == null))
                    {
                        long Id = 0;
                        saveAdvanceFeePaymentInfoRequest.CreatedDate = DateTime.UtcNow;
                        saveAdvanceFeePaymentInfoRequest.IsActive = true;
                        saveAdvanceFeePaymentInfoRequest.IsDeleted = false;
                        saveAdvanceFeePaymentInfoRequest.InvoiceDetailsID = 0;
                        saveAdvanceFeePaymentInfoRequest.StudentID = 0;
                        saveAdvanceFeePaymentInfoRequest.AgencyID = saveAdvanceFeePaymentInfoRequest.AgencyID;
                        saveAdvanceFeePaymentInfoRequest.ParentID = saveAdvanceFeePaymentInfoRequest.ParentID;
                        saveAdvanceFeePaymentInfoRequest.IsAdvanceCreditAmount = true;
                        saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount = saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount;
                        saveAdvanceFeePaymentInfoRequest.DebitAdvanceAmount = 0;
                        saveAdvanceFeePaymentInfoRequest.BalanceAmount = (allDetails.BalanceAmount + saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount);
                        saveAdvanceFeePaymentInfoRequest.IsAdvanceDebitAmount = false;
                        saveAdvanceFeePaymentInfoRequest.IsOffline = false;
                        saveAdvanceFeePaymentInfoRequest.TransactionDetails = null;
                        afpdObj = Mapper.Map<AdvanceFeePaymentDetails>(saveAdvanceFeePaymentInfoRequest);
                        _advanceFeePaymentDetailsRepository.Create(afpdObj);
                        _advanceFeePaymentDetailsRepository.SaveChanges();
                        Id = afpdObj.Id;
                    }
                    else
                    {
                        //========Add StudentFeesDiscount table For Perticular Student =======//
                        long Id = 0;
                        saveAdvanceFeePaymentInfoRequest.CreatedDate = DateTime.UtcNow;
                        saveAdvanceFeePaymentInfoRequest.IsActive = true;
                        saveAdvanceFeePaymentInfoRequest.IsDeleted = false;
                        saveAdvanceFeePaymentInfoRequest.InvoiceDetailsID = 0;
                        saveAdvanceFeePaymentInfoRequest.StudentID = 0;
                        saveAdvanceFeePaymentInfoRequest.AgencyID = saveAdvanceFeePaymentInfoRequest.AgencyID;
                        saveAdvanceFeePaymentInfoRequest.ParentID = saveAdvanceFeePaymentInfoRequest.ParentID;
                        saveAdvanceFeePaymentInfoRequest.IsAdvanceCreditAmount = true;
                        saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount = saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount;
                        saveAdvanceFeePaymentInfoRequest.DebitAdvanceAmount = 0;
                        saveAdvanceFeePaymentInfoRequest.BalanceAmount = saveAdvanceFeePaymentInfoRequest.CreditAdvanceAmount;
                        saveAdvanceFeePaymentInfoRequest.IsAdvanceDebitAmount = false;
                        saveAdvanceFeePaymentInfoRequest.IsOffline = false;
                        saveAdvanceFeePaymentInfoRequest.TransactionDetails = null;
                        afpdObj = Mapper.Map<AdvanceFeePaymentDetails>(saveAdvanceFeePaymentInfoRequest);
                        _advanceFeePaymentDetailsRepository.Create(afpdObj);
                        _advanceFeePaymentDetailsRepository.SaveChanges();
                        Id = afpdObj.Id;
                    }

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


        public ResponseViewModal GetAllStudentByParentIdDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allAllStudentDropdown = new List<DropdownViewModel>();
                var studentList = _studentRepository.GetAll(check => check.ParentID == getAllStudentDropdownRequest.ParentID && !check.IsDeleted &&
                check.AgencyID == getAllStudentDropdownRequest.AgencyID);
                var enrollList = _classEnrollmentRepository.GetAll(check => !check.IsDeleted && check.AgencyID == getAllStudentDropdownRequest.AgencyID && check.EnrollmentStatus == 2);

                allAllStudentDropdown = (from studentObj in studentList
                                         join enrollObj in enrollList on studentObj.Id equals enrollObj.StudentID
                                         select new DropdownViewModel()
                                         {
                                             Value = studentObj.Id,
                                             label = studentObj.StudentName,
                                         }).OrderBy(c => c.label).ToList();

                List<DropdownViewModel> result = allAllStudentDropdown.GroupBy(p => p.Value).Select(p => p.First()).ToList();

                res.Data = result;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Students list has been successfully fetched.";
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

        public ResponseViewModal SaveAuthorizedPersonDetails(AuthorizedPersonViewModel saveAuthorizedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long Id = 0;
            AuthorizedPerson apObj = null;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    // For Add Record
                    if (saveAuthorizedPersonInfoRequest.isaddMode == true && saveAuthorizedPersonInfoRequest.IsDeleted == false)
                    {
                        IQueryable<Entity.Masters.AuthorizedPerson> authorizedPersonDetails = _authorizedPersonDetails.GetAll().Where(Check => Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.IsDeleted == false);

                        if (saveAuthorizedPersonInfoRequest.EmailId == " " || saveAuthorizedPersonInfoRequest.EmailId == null || saveAuthorizedPersonInfoRequest.EmailId == "")
                        {
                            var AuthorizedPersonName = saveAuthorizedPersonInfoRequest.AuthorizedPersonName.TrimStart();
                            AuthorizedPersonName = AuthorizedPersonName.TrimEnd();

                            var authorizedPersonDetailByName = (from APDObj in authorizedPersonDetails
                                                                where APDObj.AuthorizedPersonName.ToUpper() == AuthorizedPersonName.ToUpper()
                                                                && APDObj.ParentID == saveAuthorizedPersonInfoRequest.ParentID && APDObj.IsDeleted == false
                                                                select new AuthorizedPersonViewModel()
                                                                {
                                                                    AuthorizedPersonName = APDObj.AuthorizedPersonName,
                                                                }).ToList();

                            if (authorizedPersonDetailByName.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Authorized Person Name Allready Exist.";
                                return res;
                            }
                        }

                        if (!(saveAuthorizedPersonInfoRequest.EmailId == " " || saveAuthorizedPersonInfoRequest.EmailId == null || saveAuthorizedPersonInfoRequest.EmailId == ""))
                        {
                            var authorizedPersonDetailByEmail = (from APDObj in authorizedPersonDetails
                                                                 where (APDObj.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper())
                                                                 && (APDObj.IsDeleted == false)
                                                                 select new AuthorizedPersonViewModel()
                                                                 {
                                                                     EmailId = APDObj.EmailId,
                                                                 }).ToList();

                            var AuthorizedPersonNamee = saveAuthorizedPersonInfoRequest.AuthorizedPersonName.TrimStart();
                            AuthorizedPersonNamee = AuthorizedPersonNamee.TrimEnd();

                            var authorizedPersonDetailByName = (from APDObj in authorizedPersonDetails
                                                                where APDObj.AuthorizedPersonName.ToUpper() == AuthorizedPersonNamee.ToUpper()
                                                                && APDObj.ParentID == saveAuthorizedPersonInfoRequest.ParentID && APDObj.IsDeleted == false
                                                                select new AuthorizedPersonViewModel()
                                                                {
                                                                    AuthorizedPersonName = APDObj.AuthorizedPersonName,
                                                                }).ToList();

                            if (authorizedPersonDetailByName.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Authorized Person Name Allready Exist.";
                                return res;
                            }

                            if (authorizedPersonDetailByEmail.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Email Allready Exist.";
                                return res;
                            }
                        }

                        if (saveAuthorizedPersonInfoRequest.ParentID > 0)
                        {
                            string QuickPin = "";
                            QuickPin = _commonService.GenerateRandomNo();

                            IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(Check => Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.Id == saveAuthorizedPersonInfoRequest.ParentID && Check.IsDeleted == false);
                            IQueryable<Entity.User.Users> userDetails = _userRepository.GetAll().Where(Check => Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID);

                            IQueryable<Entity.Masters.AuthorizedPerson> authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.QuickPin == QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID);

                            var QuickPinExistInUser = (from UDObj in userDetails
                                                       where UDObj.QuickPin == QuickPin
                                                       select new UserViewModel()
                                                       {
                                                           QuickPin = long.Parse(UDObj.QuickPin)
                                                       }).ToList();

                            var QuickPinExistAuthorizedPerson = (from APLDObj in authorizedPersonDetail
                                                                 where APLDObj.QuickPin == QuickPin
                                                                 select new AuthorizedPersonViewModel()
                                                                 {
                                                                     QuickPin = APLDObj.QuickPin
                                                                 }).ToList();

                            //Check for QuickPin Allready Exist Or Not in Users Table
                            if (QuickPinExistInUser.Count > 0 || QuickPinExistAuthorizedPerson.Count > 0)
                            {
                                QuickPin = _commonService.GenerateRandomNo();
                            }

                            foreach (var StudentId in saveAuthorizedPersonInfoRequest.StudentIDs)
                            {
                                saveAuthorizedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                saveAuthorizedPersonInfoRequest.IsActive = true;
                                saveAuthorizedPersonInfoRequest.IsDeleted = false;
                                saveAuthorizedPersonInfoRequest.StudentID = StudentId;
                                saveAuthorizedPersonInfoRequest.QuickPin = QuickPin;
                                apObj = Mapper.Map<AuthorizedPerson>(saveAuthorizedPersonInfoRequest);
                                _authorizedPersonDetails.Create(apObj);
                                _authorizedPersonDetails.SaveChanges();
                                Id = apObj.Id;
                            }

                            daycaredb.Commit();

                            if (!(saveAuthorizedPersonInfoRequest.EmailId == " " || saveAuthorizedPersonInfoRequest.EmailId == null || saveAuthorizedPersonInfoRequest.EmailId == ""))
                            {
                                string message = "<!DOCTYPE html><html><head><title></title></head><body> Hello,<br/> <p>Quick Pin for ClasroomPanda Kioske App is</p><b> : " + QuickPin + " </b><br/> <p>Thanks.</p></body></html>";
                                _commonService.SendEmailSync(saveAuthorizedPersonInfoRequest.EmailId, "ClasroomPanda Kioske app Quick Pin", message);
                            }
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Authorized Person Save successfully.";
                            return res;
                        }
                    }

                    if (saveAuthorizedPersonInfoRequest.isaddMode == false && saveAuthorizedPersonInfoRequest.IsDeleted == false)
                    {
                        // For Add/Update/Delete Record

                        var authorizedPersonDetails = _authorizedPersonDetails.GetAll().Where(Check => Check.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == saveAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.IsActive == true).ToList();

                        var StudentIDS = saveAuthorizedPersonInfoRequest.StudentIDs.ToList();

                        if (authorizedPersonDetails.Count() > StudentIDS.Count())
                        {
                            var RemainingStudentListIDDelete = authorizedPersonDetails.Where(x => !StudentIDS.Contains(x.StudentID)).ToList();

                            foreach (var DeleteStudentIds in RemainingStudentListIDDelete)
                            {
                                apObj = _authorizedPersonDetails.Get(Check => Check.StudentID == DeleteStudentIds.StudentID && Check.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == saveAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.IsActive = false;
                                    _authorizedPersonDetails.Update(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                }
                            }

                            foreach (var StudentIds in saveAuthorizedPersonInfoRequest.StudentIDs)
                            {
                                apObj = _authorizedPersonDetails.Get(Check => Check.StudentID == StudentIds && Check.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == saveAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.UpdatedDate = DateTime.UtcNow;
                                    apObj.AuthorizedPersonName = saveAuthorizedPersonInfoRequest.AuthorizedPersonName;
                                    apObj.Mobile = Convert.ToInt64(saveAuthorizedPersonInfoRequest.Mobile);
                                    apObj.ImagePath = saveAuthorizedPersonInfoRequest.ImagePath;
                                    apObj.IsEmergencyContact = saveAuthorizedPersonInfoRequest.IsEmergencyContact;
                                    _authorizedPersonDetails.Update(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                }
                                else
                                {
                                    saveAuthorizedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                    saveAuthorizedPersonInfoRequest.IsActive = true;
                                    saveAuthorizedPersonInfoRequest.IsDeleted = false;
                                    saveAuthorizedPersonInfoRequest.StudentID = StudentIds;
                                    saveAuthorizedPersonInfoRequest.QuickPin = saveAuthorizedPersonInfoRequest.QuickPin;
                                    apObj = Mapper.Map<AuthorizedPerson>(saveAuthorizedPersonInfoRequest);
                                    _authorizedPersonDetails.Create(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                    Id = apObj.Id;
                                }
                            }
                        }
                        else
                        {
                            foreach (var StudentIds in saveAuthorizedPersonInfoRequest.StudentIDs)
                            {
                                apObj = _authorizedPersonDetails.Get(Check => Check.StudentID == StudentIds && Check.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == saveAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.UpdatedDate = DateTime.UtcNow;
                                    apObj.AuthorizedPersonName = saveAuthorizedPersonInfoRequest.AuthorizedPersonName;
                                    apObj.Mobile = Convert.ToInt64(saveAuthorizedPersonInfoRequest.Mobile);
                                    apObj.ImagePath = saveAuthorizedPersonInfoRequest.ImagePath;
                                    apObj.IsEmergencyContact = saveAuthorizedPersonInfoRequest.IsEmergencyContact;
                                    _authorizedPersonDetails.Update(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                }
                                else
                                {
                                    saveAuthorizedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                    saveAuthorizedPersonInfoRequest.IsActive = true;
                                    saveAuthorizedPersonInfoRequest.IsDeleted = false;
                                    saveAuthorizedPersonInfoRequest.StudentID = StudentIds;
                                    saveAuthorizedPersonInfoRequest.QuickPin = saveAuthorizedPersonInfoRequest.QuickPin;
                                    apObj = Mapper.Map<AuthorizedPerson>(saveAuthorizedPersonInfoRequest);
                                    _authorizedPersonDetails.Create(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                    Id = apObj.Id;
                                }
                            }
                        }
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Authorized Person Update successfully.";
                        daycaredb.Commit();
                    }

                    if (saveAuthorizedPersonInfoRequest.isaddMode == false && saveAuthorizedPersonInfoRequest.IsDeleted == true)
                    {
                        // For Delete Record From AuthorizedPerson table
                        var authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.EmailId.ToUpper() == saveAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == saveAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == saveAuthorizedPersonInfoRequest.AgencyID).ToList();

                        if (authorizedPersonDetail.Count > 0)
                        {
                            foreach (var AuthorizedPersonID in authorizedPersonDetail)
                            {
                                apObj = _authorizedPersonDetails.Get(Check => Check.Id == AuthorizedPersonID.Id);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.IsDeleted = true;
                                    apObj.DeletedDate = DateTime.UtcNow;
                                    _authorizedPersonDetails.Update(apObj);
                                    _authorizedPersonDetails.SaveChanges();
                                }
                            }
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Authorized Person Deactive successfully.";
                        }
                        daycaredb.Commit();
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

        public ResponseViewModal GetAuthorizedPersonByStudentId(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AuthorizedPersonViewModel> allAuthorizedPerson = new List<AuthorizedPersonViewModel>();
                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPerson;

                if (getAuthorizedPersonInfoRequest.IsEmergencyContact == true)
                {
                    authorizedPerson = _authorizedPersonDetails.GetAll(check => check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID
                        && check.StudentID == getAuthorizedPersonInfoRequest.StudentID && check.IsEmergencyContact == true);
                }
                else
                {
                    authorizedPerson = _authorizedPersonDetails.GetAll(check => check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID
                      && check.StudentID == getAuthorizedPersonInfoRequest.StudentID);
                }

                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID);

                allAuthorizedPerson = (from apObj in authorizedPerson
                                       join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                       select new AuthorizedPersonViewModel()
                                       {
                                           QuickPin = apObj.QuickPin,
                                           AuthorizedPersonName = apObj.AuthorizedPersonName,
                                           Mobile = apObj.Mobile,
                                           EmailId = apObj.EmailId,
                                           AgencyID = apObj.AgencyID,
                                           ParentID = apObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           ImagePath = apObj.ImagePath ?? String.Empty,
                                           IsDeleted = apObj.IsDeleted,
                                           IsEmergencyContact = apObj.IsEmergencyContact
                                       }).ToList();

                List<AuthorizedPersonViewModel> result = allAuthorizedPerson.GroupBy(p => p.QuickPin).Select(p => p.First()).ToList();

                if (result.Count > 0)
                {
                    res.Data = result;

                    if (getAuthorizedPersonInfoRequest.limit != 0)
                    {
                        res.Data = result.Skip((getAuthorizedPersonInfoRequest.page) * getAuthorizedPersonInfoRequest.limit).Take(getAuthorizedPersonInfoRequest.limit).ToList();
                    }
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Authorized Person list has been fetched.";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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

        public ResponseViewModal GetRestrictedPersonByStudentId(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<RestrictedPersonViewModel> allRestrictedPerson = new List<RestrictedPersonViewModel>();
                IQueryable<Entity.Masters.RestrictedPerson> restrictedPerson;

                restrictedPerson = _restrictedPersonRepository.GetAll(check => check.AgencyID == getRestrictedPersonInfoRequest.AgencyID && check.StudentID == getRestrictedPersonInfoRequest.StudentID);

                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getRestrictedPersonInfoRequest.AgencyID);

                allRestrictedPerson = (from apObj in restrictedPerson
                                       join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                       select new RestrictedPersonViewModel()
                                       {
                                           CommonID = apObj.CommonID,
                                           RestrictedPersonName = apObj.RestrictedPersonName,
                                           Mobile = apObj.Mobile,
                                           EmailId = apObj.EmailId,
                                           AgencyID = apObj.AgencyID,
                                           ParentID = apObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           ImagePath = apObj.ImagePath ?? String.Empty,
                                           IsDeleted = apObj.IsDeleted,
                                           Description = apObj.Description
                                       }).ToList();

                List<RestrictedPersonViewModel> result = allRestrictedPerson.GroupBy(p => p.CommonID).Select(p => p.First()).ToList();

                if (result.Count > 0)
                {
                    res.Data = result;

                    if (getRestrictedPersonInfoRequest.limit != 0)
                    {
                        res.Data = result.Skip((getRestrictedPersonInfoRequest.page) * getRestrictedPersonInfoRequest.limit).Take(getRestrictedPersonInfoRequest.limit).ToList();
                    }
                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Restricted Person list has been fetched.";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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


        public ResponseViewModal GetAuthorizedPersonDetails(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AuthorizedPersonViewModel> allAuthorizedPerson = new List<AuthorizedPersonViewModel>();
                IQueryable<Entity.Masters.AuthorizedPerson> authorizedPerson;

                string AuthorizedPersonName = getAuthorizedPersonInfoRequest.AuthorizedPersonName.TrimStart();
                AuthorizedPersonName = AuthorizedPersonName.TrimEnd();

                if (getAuthorizedPersonInfoRequest.IsEmergencyContact == true)
                {
                    authorizedPerson = _authorizedPersonDetails.GetAll().Where(check => check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID
                     && check.ParentID == (getAuthorizedPersonInfoRequest.ParentID > 0 ? getAuthorizedPersonInfoRequest.ParentID : check.ParentID)
                     && check.AuthorizedPersonName.ToUpper().Contains(AuthorizedPersonName.ToUpper())
                     && check.IsEmergencyContact == true);
                }
                else
                {
                    authorizedPerson = _authorizedPersonDetails.GetAll().Where(check => check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID
                     && check.ParentID == (getAuthorizedPersonInfoRequest.ParentID > 0 ? getAuthorizedPersonInfoRequest.ParentID : check.ParentID)
                     && check.AuthorizedPersonName.ToUpper().Contains(AuthorizedPersonName.ToUpper()));
                }

                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID);

                allAuthorizedPerson = (from apObj in authorizedPerson
                                       join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                       join studentObj in selectedStudent on apObj.StudentID equals studentObj.Id
                                       where getAuthorizedPersonInfoRequest.AgencyID == studentObj.AgencyID && (apObj.IsActive == true)
                                       select new AuthorizedPersonViewModel()
                                       {
                                           QuickPin = apObj.QuickPin,
                                           AuthorizedPersonName = apObj.AuthorizedPersonName,
                                           Mobile = apObj.Mobile,
                                           EmailId = apObj.EmailId,
                                           StudentName = studentObj.StudentName ?? String.Empty,
                                           AgencyID = apObj.AgencyID,
                                           ParentID = apObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           ImagePath = apObj.ImagePath ?? String.Empty,
                                           StudentID = studentObj.Id,
                                           IsDeleted = apObj.IsDeleted,
                                           IsEmergencyContact = apObj.IsEmergencyContact
                                       }).OrderBy(c => c.AuthorizedPersonName).ToList();
                var result = allAuthorizedPerson.Where(x => x.AgencyID == x.AgencyID).GroupBy(s => s.QuickPin).Select(p => p.First()).ToList();
                if (result.Count > 0)
                {
                    foreach (var r in result)
                    {
                        var studentname = allAuthorizedPerson.Where(p => p.QuickPin == r.QuickPin).Select(p => p.StudentName).ToArray();
                        r.StudentName = string.Join(",", studentname);

                        var stdid = allAuthorizedPerson.Where(p => p.QuickPin == r.QuickPin).Select(p => p.StudentID).ToArray();
                        r.StudentIDs = stdid;
                    }

                    res.Data = result;

                    if (getAuthorizedPersonInfoRequest.limit != 0)
                    {
                        res.Data = result.Skip((getAuthorizedPersonInfoRequest.page) * getAuthorizedPersonInfoRequest.limit).Take(getAuthorizedPersonInfoRequest.limit).ToList();
                    }

                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Authorized Person list has been fetched.";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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


        public ResponseViewModal ActivateAuthPerson(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            AuthorizedPerson apObj = null;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    // For Update Record From AuthorizedPerson Table
                    var authorizedPersonDetail = _authorizedPersonDetails.GetAll().Where(Check => Check.EmailId.ToUpper() == getAuthorizedPersonInfoRequest.EmailId.ToUpper() && Check.QuickPin == getAuthorizedPersonInfoRequest.QuickPin && Check.AgencyID == getAuthorizedPersonInfoRequest.AgencyID).ToList();

                    if (authorizedPersonDetail.Count > 0)
                    {
                        foreach (var AuthorizedPersonID in authorizedPersonDetail)
                        {
                            apObj = _authorizedPersonDetails.Get(Check => Check.Id == AuthorizedPersonID.Id);

                            if (!ReferenceEquals(apObj, null))
                            {
                                apObj.IsDeleted = false;
                                apObj.UpdatedDate = DateTime.UtcNow;
                                _authorizedPersonDetails.Update(apObj);
                                _authorizedPersonDetails.SaveChanges();
                            }
                        }
                    }
                    daycaredb.Commit();
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


        public ResponseViewModal SaveSubsidyDetails(SubsidyDetailsViewModel saveSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            SubsidyDetails SSDObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (saveSubsidyDetailsInfoRequest.Id > 0)
                    {
                        SSDObj = _subsidyDetailsRepository.Get(x => x.Id == saveSubsidyDetailsInfoRequest.Id && x.AgencyID == saveSubsidyDetailsInfoRequest.AgencyID && x.IsDeleted == false);
                        if (!ReferenceEquals(SSDObj, null))
                        {
                            SSDObj.SubsidyName = saveSubsidyDetailsInfoRequest.SubsidyName;
                            SSDObj.SubsidyAmount = saveSubsidyDetailsInfoRequest.SubsidyAmount;
                            SSDObj.SubsidyDescription = saveSubsidyDetailsInfoRequest.SubsidyDescription;
                            SSDObj.UpdatedDate = DateTime.UtcNow;
                            _subsidyDetailsRepository.Update(SSDObj);
                            _subsidyDetailsRepository.SaveChanges();

                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Subsidy type Update Successfully";
                        }
                    }
                    else
                    {
                        IQueryable<Entity.Masters.SubsidyDetails> subsidyDetails = _subsidyDetailsRepository.GetAll().Where(Check => Check.AgencyID == saveSubsidyDetailsInfoRequest.AgencyID && Check.IsDeleted == false);

                        var SubsidyName = saveSubsidyDetailsInfoRequest.SubsidyName.TrimStart();
                        SubsidyName = SubsidyName.TrimEnd();

                        var allDetails = (from SSD in subsidyDetails
                                          where SSD.SubsidyName.ToUpper() == SubsidyName.ToUpper() && SSD.IsDeleted == false
                                          && SSD.AgencyID == saveSubsidyDetailsInfoRequest.AgencyID
                                          orderby SSD.Id descending
                                          select new SubsidyDetailsViewModel()
                                          {
                                              SubsidyName = SSD.SubsidyName
                                          }).ToList();

                        if (allDetails.Count > 0)
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "All Ready Exist Subsidy Details";
                        }
                        else
                        {
                            //========Add SubsidyDetails =======//
                            long Id = 0;
                            saveSubsidyDetailsInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveSubsidyDetailsInfoRequest.IsActive = true;
                            saveSubsidyDetailsInfoRequest.IsDeleted = false;
                            SSDObj = Mapper.Map<SubsidyDetails>(saveSubsidyDetailsInfoRequest);
                            _subsidyDetailsRepository.Create(SSDObj);
                            _subsidyDetailsRepository.SaveChanges();
                            Id = SSDObj.Id;

                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Subsidy type Save Successfully";
                        }
                    }

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


        public ResponseViewModal GetSubsidyDetails(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<SubsidyDetailsViewModel> allSubsidyDetails = new List<SubsidyDetailsViewModel>();
                IQueryable<Entity.Masters.SubsidyDetails> subsidydetails = _subsidyDetailsRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && check.IsDeleted == false);

                allSubsidyDetails = (from ssdObj in subsidydetails
                                     where ssdObj.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && ssdObj.IsDeleted == false
                                     select new SubsidyDetailsViewModel()
                                     {
                                         Id = ssdObj.Id,
                                         SubsidyTitle = ssdObj.SubsidyTitle,
                                         SubsidyName = ssdObj.SubsidyName,
                                         SubsidyDescription = ssdObj.SubsidyDescription,
                                         SubsidyAmount = ssdObj.SubsidyAmount
                                     }).ToList();

                if (allSubsidyDetails.Count > 0)
                {
                    res.Data = allSubsidyDetails;

                    if (getSubsidyDetailsInfoRequest.limit != 0)
                    {
                        res.Data = allSubsidyDetails.Skip((getSubsidyDetailsInfoRequest.page) * getSubsidyDetailsInfoRequest.limit).Take(getSubsidyDetailsInfoRequest.limit).ToList();
                    }

                    res.TotalRows = allSubsidyDetails.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Subsidy Details list has been fetched.";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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


        public ResponseViewModal SaveStudentSubsidyDetails(StudentSubsidyDetailsViewModel saveStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            StudentSubsidyDetails SSSDObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var Sid in saveStudentSubsidyDetailsInfoRequest.StudentIDs)
                    {
                        SSSDObj = _studentsubsidyDetailsRepository.Get(x => x.StudentID == Sid && x.IsDeleted == false);
                        if (ReferenceEquals(SSSDObj, null))
                        {
                            //========Add Student SubsidyDetails =======//
                            long Id = 0;
                            saveStudentSubsidyDetailsInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveStudentSubsidyDetailsInfoRequest.IsActive = true;
                            saveStudentSubsidyDetailsInfoRequest.IsDeleted = false;
                            saveStudentSubsidyDetailsInfoRequest.FromDate = saveStudentSubsidyDetailsInfoRequest.FromDate;
                            saveStudentSubsidyDetailsInfoRequest.ToDate = saveStudentSubsidyDetailsInfoRequest.ToDate;
                            saveStudentSubsidyDetailsInfoRequest.SubsidyDetailsID = saveStudentSubsidyDetailsInfoRequest.SubsidyDetailsID;
                            saveStudentSubsidyDetailsInfoRequest.StudentID = Sid;
                            SSSDObj = Mapper.Map<StudentSubsidyDetails>(saveStudentSubsidyDetailsInfoRequest);
                            _studentsubsidyDetailsRepository.Create(SSSDObj);
                            _studentsubsidyDetailsRepository.SaveChanges();
                            Id = SSSDObj.Id;

                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Student Subsidy Details Save successfully";
                        }
                        else
                        {
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Allready Exist Student Subsidy";
                        }
                    }
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

        public ResponseViewModal GetStudentSubsidyDetails(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StudentViewModel> allStudents = new List<StudentViewModel>();
                List<StudentSubsidyDetailsViewModel> allStudentSubsidyDetails = new List<StudentSubsidyDetailsViewModel>();
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidydetails = _studentsubsidyDetailsRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && check.IsDeleted == false);
                IQueryable<Entity.Masters.SubsidyDetails> subsidydetails = _subsidyDetailsRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && check.IsDeleted == false);

                IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && check.EnrollmentStatus == 2 && !check.IsDeleted);
                IQueryable<Entity.Agency.Classes> selectedClass = _classRepository.GetAll().Where(check => check.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();

                allStudentSubsidyDetails = (from SSD in studentsubsidydetails
                                            join studentObj in selectedStudents on SSD.StudentID equals studentObj.Id
                                            join SDObj in subsidydetails on SSD.SubsidyDetailsID equals SDObj.Id
                                            join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                            join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                            join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id
                                            where !SSD.IsDeleted && SSD.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID
                                            select new StudentSubsidyDetailsViewModel()
                                            {
                                                StudentID = studentObj.Id,
                                                StudentName = studentObj.StudentName ?? String.Empty,
                                                AgencyID = studentObj.AgencyID,
                                                ParentID = studentObj.ParentID,
                                                ClassName = classObj.ClassName,
                                                ParentName = parentObj.ParentName ?? String.Empty,
                                                FirstName = studentObj.FirstName ?? String.Empty,
                                                LastName = studentObj.LastName ?? String.Empty,
                                                Id = SSD.Id,
                                                SubsidyName = SDObj.SubsidyName,
                                                SubsidyAmount = SDObj.SubsidyAmount,
                                            }).OrderBy(c => c.StudentName).Distinct().ToList();

                var result = allStudentSubsidyDetails.GroupBy(p => p.StudentID).Select(p => p.First()).ToList();
                //to add class names
                foreach (var r in result)
                {
                    var clasess = allStudentSubsidyDetails.Where(p => p.StudentID == r.StudentID).Select(p => p.ClassName).ToArray();
                    r.ClassName = string.Join(",", clasess);
                }

                res.Data = result;

                if (getStudentSubsidyDetailsInfoRequest.limit != 0)
                {
                    res.Data = result.Skip((getStudentSubsidyDetailsInfoRequest.page) * getStudentSubsidyDetailsInfoRequest.limit).Take(getStudentSubsidyDetailsInfoRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Student Subsidy List has been fetched.";
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


        public ResponseViewModal GetSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DropdownViewModel> allSubsidyType = new List<DropdownViewModel>();
                allSubsidyType = (from allsubsidyTypeObj in _subsidyDetailsRepository.GetAll().Where(check => !check.IsDeleted)
                                  select new DropdownViewModel()
                                  {
                                      Value = allsubsidyTypeObj.Id,
                                      label = allsubsidyTypeObj.SubsidyName,
                                  }).OrderBy(c => c.Value).ToList();
                res.Data = allSubsidyType;
                res.TotalRows = allSubsidyType.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Subsidy List has been successfully fetched.";
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


        public ResponseViewModal GetStudentSubsidyList(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidydetails = _studentsubsidyDetailsRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && check.IsDeleted == false);
                IQueryable<Entity.Student.Student> selectedStudents = _studentRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Agency.ClassEnrollment> selectedClassEnrollment = _classEnrollmentRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && check.EnrollmentStatus == 2 && !check.IsDeleted);
                IQueryable<Entity.Agency.Classes> selectedClass = _classRepository.GetAll().Where(check => check.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && !check.IsDeleted);
                IQueryable<Entity.Agency.ClassCategory> selectedClassCategory = _classCategoryRepository.GetAll();

                List<DropdownViewModel> allStudentsList = new List<DropdownViewModel>();

                allStudentsList = (from studentObj in selectedStudents
                                   join classEnrollmentObj in selectedClassEnrollment on studentObj.Id equals classEnrollmentObj.StudentID
                                   join parentObj in selectedParent on studentObj.ParentID equals parentObj.Id
                                   join classObj in selectedClass on classEnrollmentObj.ClassesID equals classObj.Id
                                   where !studentsubsidydetails.Any(pv => pv.StudentID == studentObj.Id && !pv.IsDeleted) &&
                                    (!studentObj.IsDeleted) && getSubsidyDetailsInfoRequest.AgencyID == studentObj.AgencyID && studentObj.Id == classEnrollmentObj.StudentID
                                   select new DropdownViewModel()
                                   {
                                       Value = studentObj.Id,
                                       label = studentObj.StudentName ?? String.Empty
                                   }).OrderBy(c => c.label).Distinct().ToList();

                res.Data = allStudentsList;
                res.TotalRows = allStudentsList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Student Subsidy List has been successfully fetched.";
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

        public ResponseViewModal DeleteStudentSubsidyType(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            StudentSubsidyDetails SSDObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    SSDObj = _studentsubsidyDetailsRepository.Get(x => x.Id == getStudentSubsidyDetailsInfoRequest.Id && x.AgencyID == getStudentSubsidyDetailsInfoRequest.AgencyID && x.IsDeleted == false);
                    if (!ReferenceEquals(SSDObj, null))
                    {
                        SSDObj.IsDeleted = true;
                        SSDObj.DeletedDate = DateTime.UtcNow;
                        _studentsubsidyDetailsRepository.Update(SSDObj);
                        _studentsubsidyDetailsRepository.SaveChanges();
                    }
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

        public ResponseViewModal DeleteSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            SubsidyDetails SDObj = null;
            StudentSubsidyDetails SSDObj = null;

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    SSDObj = _studentsubsidyDetailsRepository.Get(x => x.SubsidyDetailsID == getSubsidyDetailsInfoRequest.Id && x.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && x.IsDeleted == false);

                    if (!ReferenceEquals(SSDObj, null))
                    {
                        res.IsSuccess = true;
                        res.StatusCode = 987;
                        res.Message = "This Subsidy is currently used.";
                        return res;
                    }
                    else
                    {
                        SDObj = _subsidyDetailsRepository.Get(x => x.Id == getSubsidyDetailsInfoRequest.Id && x.AgencyID == getSubsidyDetailsInfoRequest.AgencyID && x.IsDeleted == false);

                        if (!ReferenceEquals(SDObj, null))
                        {
                            SDObj.IsDeleted = true;
                            SDObj.DeletedDate = DateTime.UtcNow;
                            _subsidyDetailsRepository.Update(SDObj);
                            _subsidyDetailsRepository.SaveChanges();
                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Subsidy Delete Successfully.";
                        }
                        daycaredb.Commit();
                        return res;
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

        private ResponseViewModal ActivityNotifications(ActivityNotificationViewModel activityNotification)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DDAlertResponseViewModel> ddAlert = new List<DDAlertResponseViewModel>();
                IQueryable<KioskeStudentSignInDetails> getKioskeStudentSignInDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(Check => (Convert.ToDateTime(Check.DropInDateTime)).Date == DateTime.Now.Date);

                foreach (var agency in getKioskeStudentSignInDetails)
                {
                    long agencyId = agency.AgencyID;
                    var getStudentMasters = _studentRepository.GetAll().Where(Check => Check.AgencyID == agencyId);

                    ddAlert = (from signInDetails in getKioskeStudentSignInDetails
                               join student in getStudentMasters on signInDetails.StudentID equals student.Id
                               where signInDetails.IsDropOut == false
                               select new DDAlertResponseViewModel
                               {
                                   ActivityName = activityNotification.activityName,
                                   StudentID = signInDetails.StudentID,
                                   StudentName = student.StudentName,
                                   SignInTime = Convert.ToDateTime(signInDetails.DropInDateTime),
                                   AgencyID = student.AgencyID
                               }).ToList();

                    var result = ddAlert;

                    foreach (var stud in result)
                    {
                        var getDigitalDirectorMasters = _ddRepository.GetAll().Where(Check => Check.AgencyID == agencyId && Check.ActivityTypeID == activityNotification.activityId).FirstOrDefault();

                        var checkStudentActivity = _studentActivitiesRepository.GetAll().Where(Check => Check.AgencyID == agencyId && Convert.ToDateTime(Check.CreatedDate).Date == DateTime.Now.Date && Check.StudentID == stud.StudentID && Check.ActivityTypeID == activityNotification.activityId).LastOrDefault();

                        if (checkStudentActivity != null)
                        {
                            var getActivity = (from activity in _studentActivitiesRepository.GetAll()
                                               join diaperActivity in _studentActivityDiaperRepository.GetAll() on activity.Id equals diaperActivity.StudentActivitiesID
                                               where (activity.AgencyID == agencyId
                                                    && Convert.ToDateTime(activity.CreatedDate).Date == DateTime.UtcNow.Date
                                                    && activity.ActivityTypeID == activityNotification.activityId
                                                    && activity.StudentID == stud.StudentID)
                                               select new DDAlertResponseViewModel
                                               {
                                                   StudentID = stud.StudentID,
                                                   StudentName = stud.StudentName,
                                                   ActivityName = activityNotification.activityName,
                                                   DiaperChangeTime = diaperActivity.DiaperChangeTime,
                                                   StudentActivitiesID = diaperActivity.StudentActivitiesID,
                                                   AgencyID = diaperActivity.AgencyID
                                               }).LastOrDefault();

                            DateTime lastDiaperChangeTime = getActivity.DiaperChangeTime;
                            DateTime newActTime = lastDiaperChangeTime.AddMinutes(getDigitalDirectorMasters.Interval);

                            if (DateTime.UtcNow >= newActTime)
                            {
                                stud.Gong = true;
                                stud.DiaperChangeTime = lastDiaperChangeTime;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongEnableStatement;
                            }
                            else
                            {
                                stud.Gong = false;
                                stud.DiaperChangeTime = lastDiaperChangeTime;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongDisableStatement;
                            }
                        }
                        else
                        {
                            var getActivity = (from signInDetails in getKioskeStudentSignInDetails
                                               join student in getStudentMasters on signInDetails.StudentID equals student.Id
                                               where Convert.ToDateTime(signInDetails.DropInDateTime).Date == DateTime.UtcNow.Date && signInDetails.StudentID == stud.StudentID
                                               select new DDAlertResponseViewModel
                                               {
                                                   StudentID = stud.StudentID,
                                                   StudentName = stud.StudentName,
                                                   ActivityName = activityNotification.activityName,
                                                   SignInTime = Convert.ToDateTime(signInDetails.DropInDateTime),
                                                   AgencyID = signInDetails.AgencyID
                                               }).LastOrDefault();

                            DateTime newActTime = getActivity.SignInTime.AddMinutes(getDigitalDirectorMasters.Interval);
                            if (DateTime.UtcNow >= newActTime)
                            {
                                stud.Gong = true;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongEnableStatement;
                            }
                            else
                            {
                                stud.Gong = false;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongDisableStatement;
                            }
                        }
                    }

                    res.Data = result;
                    res.TotalRows = ddAlert.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "DD Details have been successfully fetched.";

                    foreach (var notify in result.Where(a => a.StudentID == agency.StudentID))
                    {
                        if (notify.Gong == true)
                        {
                            var getClassEnrollment = _classEnrollmentRepository.GetAll().Where(Check => Check.StudentID == notify.StudentID);
                            var getClassAssignmentLog = _classAssignmentLogRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);
                            var getTeacherInfo = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);
                            var getUsers = _userRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);

                            var getNotifyUsers = (from classEnrollObj in getClassEnrollment
                                                  join classAssignLogObj in getClassAssignmentLog on classEnrollObj.ClassesID equals classAssignLogObj.ClassesID
                                                  join teacherInfoObj in getTeacherInfo on classAssignLogObj.TeacherID equals teacherInfoObj.Id
                                                  where (classEnrollObj.EnrollmentStatus == 2 && classEnrollObj.StudentID == notify.StudentID)
                                                  select new DDAlertResponseViewModel
                                                  {
                                                      TeacherUserID = teacherInfoObj.UserID,
                                                      StudentID = classEnrollObj.StudentID,
                                                  }).GroupBy(p => p.TeacherUserID).Select(p => p.First()).ToList();

                            foreach (var users in getNotifyUsers)
                            {
                                var userDeviceToken = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == users.TeacherUserID).OrderByDescending(x => x.Id).Select(x => x.DeviceToken).FirstOrDefault();
                                var OsType = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == users.TeacherUserID).OrderByDescending(x => x.Id).Select(x => x.OSType).FirstOrDefault();
                                if (userDeviceToken != null)
                                {
                                    var userName = _userRepository.GetAll().Where(x => x.Id == users.TeacherUserID).Select(x => x.UserName).FirstOrDefault();
                                    var studName = _studentRepository.GetAll().Where(x => x.Id == users.StudentID).Select(x => x.StudentName).FirstOrDefault();

                                    string title = string.Empty;
                                    string body = activityNotification.notificationStatement + " " + studName;
                                    string msg = activityNotification.notificationStatement + " " + studName;
                                    var sb = new StringBuilder();
                                    if (OsType == 3)
                                    {
                                        title = sb.Append("Alert" + "<br/>" + msg).ToString();
                                        var response1 = _pushNotification.SendPushNotificationForWeb(new string[] { userDeviceToken }, title, body, new object(), msg);
                                    }
                                    else
                                    {
                                        title = "Alert";
                                        var response = _pushNotification.SendPushNotification(new string[] { userDeviceToken }, title, body, new object(), false);
                                    }
                                }
                            }
                        }
                    }
                }
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

        private ResponseViewModal ActivityNotificationsForNap(ActivityNotificationViewModel activityNotification)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DDAlertResponseViewModel> ddAlert = new List<DDAlertResponseViewModel>();
                var getKioskeStudentSignInDetails = _kioskeStudentSignInDetailsRepository.GetAll().Where(Check => (Convert.ToDateTime(Check.DropInDateTime)).Date == DateTime.Now.Date);

                foreach (var agency in getKioskeStudentSignInDetails)
                {
                    long agencyId = agency.AgencyID;
                    var getStudentMasters = _studentRepository.GetAll().Where(Check => Check.AgencyID == agencyId);

                    ddAlert = (from signInDetails in getKioskeStudentSignInDetails
                               join student in getStudentMasters on signInDetails.StudentID equals student.Id
                               where signInDetails.IsDropOut == false
                               select new DDAlertResponseViewModel
                               {
                                   ActivityName = activityNotification.activityName,
                                   StudentID = signInDetails.StudentID,
                                   StudentName = student.StudentName,
                                   SignInTime = Convert.ToDateTime(signInDetails.DropInDateTime),
                                   AgencyID = student.AgencyID
                               }).ToList();

                    var result = ddAlert;

                    foreach (var stud in result)
                    {
                        var getDigitalDirectorMasters = _ddRepository.GetAll().Where(Check => Check.AgencyID == agencyId && Check.ActivityTypeID == activityNotification.activityId).FirstOrDefault();

                        var checkStudentActivity = _studentActivitiesRepository.GetAll().Where(Check => Check.AgencyID == agencyId && Convert.ToDateTime(Check.CreatedDate).Date == DateTime.Now.Date && Check.StudentID == stud.StudentID && Check.ActivityTypeID == activityNotification.activityId).LastOrDefault();

                        if (checkStudentActivity != null)
                        {
                            var getActivity = (from activity in _studentActivitiesRepository.GetAll()
                                               join napActivity in _studentAcitivityNapRepository.GetAll() on activity.Id equals napActivity.StudentActivitiesID
                                               where (activity.AgencyID == agencyId
                                                    && Convert.ToDateTime(activity.CreatedDate).Date == DateTime.UtcNow.Date
                                                    && activity.ActivityTypeID == activityNotification.activityId
                                                    && activity.StudentID == stud.StudentID)
                                               select new DDAlertResponseViewModel
                                               {
                                                   StudentID = stud.StudentID,
                                                   StudentName = stud.StudentName,
                                                   ActivityName = activityNotification.activityName,
                                                   sleptAtTime = napActivity.SleptAtTime,
                                                   StudentActivitiesID = napActivity.StudentActivitiesID,
                                                   AgencyID = napActivity.AgencyID
                                               }).LastOrDefault();

                            DateTime lastSleptTime = getActivity.sleptAtTime;
                            DateTime newActTime = lastSleptTime.AddMinutes(getDigitalDirectorMasters.Interval);

                            if (DateTime.UtcNow >= newActTime)
                            {
                                stud.Gong = true;
                                stud.sleptAtTime = lastSleptTime;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongEnableStatement;
                            }
                            else
                            {
                                stud.Gong = false;
                                stud.sleptAtTime = lastSleptTime;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongDisableStatement;
                            }
                        }
                        else
                        {
                            var getActivity = (from signInDetails in getKioskeStudentSignInDetails
                                               join student in getStudentMasters on signInDetails.StudentID equals student.Id
                                               where Convert.ToDateTime(signInDetails.DropInDateTime).Date == DateTime.UtcNow.Date && signInDetails.StudentID == stud.StudentID
                                               select new DDAlertResponseViewModel
                                               {
                                                   StudentID = stud.StudentID,
                                                   StudentName = stud.StudentName,
                                                   ActivityName = activityNotification.activityName,
                                                   SignInTime = Convert.ToDateTime(signInDetails.DropInDateTime),
                                                   AgencyID = signInDetails.AgencyID
                                               }).LastOrDefault();

                            DateTime newActTime = getActivity.SignInTime.AddMinutes(getDigitalDirectorMasters.Interval);
                            if (DateTime.UtcNow >= newActTime)
                            {
                                stud.Gong = true;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongEnableStatement;
                            }
                            else
                            {
                                stud.Gong = false;
                                stud.NewActivityTime = newActTime;
                                stud.Hint = activityNotification.gongDisableStatement;
                            }
                        }
                    }
                    res.Data = result;
                    res.TotalRows = ddAlert.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "DD Details have been successfully fetched.";

                    foreach (var notify in result)
                    {
                        if (notify.Gong == true)
                        {
                            var getClassEnrollment = _classEnrollmentRepository.GetAll().Where(Check => Check.StudentID == notify.StudentID);
                            var getClassAssignmentLog = _classAssignmentLogRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);
                            var getTeacherInfo = _teacherInfoRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);
                            var getUsers = _userRepository.GetAll().Where(Check => Check.AgencyID == notify.AgencyID);

                            var getNotifyUsers = (from classEnrollObj in getClassEnrollment
                                                  join classAssignLogObj in getClassAssignmentLog on classEnrollObj.ClassesID equals classAssignLogObj.ClassesID
                                                  join teacherInfoObj in getTeacherInfo on classAssignLogObj.TeacherID equals teacherInfoObj.Id
                                                  join studentObj in _studentRepository.GetAll() on classEnrollObj.StudentID equals studentObj.Id
                                                  join userObj in getUsers on teacherInfoObj.UserID equals userObj.Id
                                                  where (classEnrollObj.EnrollmentStatus == 2 && classEnrollObj.StudentID == notify.StudentID)
                                                  select new DDAlertResponseViewModel
                                                  {
                                                      TeacherUserID = teacherInfoObj.UserID,
                                                      TeacherUserName = userObj.UserName,
                                                      StudentID = classEnrollObj.StudentID,
                                                      StudentName = studentObj.StudentName,
                                                  }).GroupBy(p => p.TeacherUserID).Select(p => p.First()).ToList();

                            foreach (var users in getNotifyUsers)
                            {
                                var userDeviceToken = _userLoginDeviceRepository.GetAll().Where(x => x.UserId == users.TeacherUserID).OrderByDescending(x => x.Id).Select(x => x.DeviceToken).FirstOrDefault();
                                if (userDeviceToken != null)
                                {
                                    var userName = users.TeacherUserName;
                                    var studName = users.StudentName;
                                    string title = "Alert";
                                    string body = activityNotification.notificationStatement + " " + studName;
                                    string msg = activityNotification.notificationStatement + " " + studName;
                                    var response = _pushNotification.SendPushNotification(new string[] { userDeviceToken }, title, body, new object(), false);
                                    var response1 = _pushNotification.SendPushNotificationForWeb(new string[] { userDeviceToken }, title, body, new object(), msg);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;
        }

        public ResponseViewModal GetAlertForStudentActivity()
        {
            var responseDiaper = ActivityNotifications(new ActivityNotificationViewModel
            {
                activityId = 7,
                activityName = "Toileting",
                gongEnableStatement = "It is time for Diaper Changed",
                gongDisableStatement = "Time is not complete to change diaper",
                notificationStatement = "It is Time to Change Diaper for "
            });

            return new ResponseViewModal
            {
                Data = new string[]
                {
                    responseDiaper.IsSuccess ? responseDiaper.Data.ToString() + " Diaper change notification(s) sent." : $"Error : {responseDiaper.ReturnMessage.FirstOrDefault()}",
                    //responseNap.IsSuccess ? responseNap.Data.ToString()+" Nap notification(s) sent." : $"Error : {responseNap.ReturnMessage.FirstOrDefault()}",
                },
                IsSuccess = true,
            };
        }


        public ResponseViewModal getCurrentDDActivityIntervalSetting(DDAlertRequestViewModel settingReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DDcurrentActivityViewModel> currentSetting = new List<DDcurrentActivityViewModel>();
                IQueryable<DigitalDirectorMaster> getCurrentSetting = _ddRepository.GetAll(check => check.AgencyID == settingReq.AgencyID && !check.IsDeleted);
                currentSetting = (from set in getCurrentSetting
                                  select new DDcurrentActivityViewModel()
                                  {
                                      AgencyID = set.AgencyID,
                                      TimeIntervalId = set.Interval,
                                      ActivityID = set.ActivityTypeID,
                                      ID = set.Id,
                                      MinIntervalId = set.MinInterval
                                  }).ToList();
                res.Data = currentSetting;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Current Activity interval setting fetched successfully";
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;
        }

        public ResponseViewModal GetTransactionType()
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<TransactionTypeViewModel> transType = new List<TransactionTypeViewModel>();
                IQueryable<TransactionType> getTransType = _transactionTypeRepository.GetAll();
                transType = (from transObj in getTransType
                             select new TransactionTypeViewModel()
                             {
                                 TransactionTypeID = transObj.Id,
                                 TransactionTypeName = transObj.TransactionTypeName
                             }).ToList();
                res.Data = transType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Transactiontype fetched successfully";
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;
        }

        public ResponseViewModal SaveTransactionMasterInfo(TransactionMasterViewModel saveTransMasterRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            TransactionMaster transObj = null;

            if (saveTransMasterRequest.TransactionTypeID == 1)
            {
                transObj = _transactionMasterRepository.GetFirstOrDefault(check => check.AgencyID == saveTransMasterRequest.AgencyID && check.IsDefaultAccount == true);

                if (transObj != null)
                {
                    saveTransMasterRequest.IsDefaultAccount = false;
                }
                else
                {
                    saveTransMasterRequest.IsDefaultAccount = true;
                }
            }

            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveTransMasterRequest.AgencyID > 0)
                    {
                        if (saveTransMasterRequest.Id == 0)
                        {
                            saveTransMasterRequest.CreatedDate = DateTime.UtcNow;
                            saveTransMasterRequest.IsActive = true;
                            saveTransMasterRequest.IsDeleted = false;
                            transObj = new TransactionMaster();
                            transObj = Mapper.Map<TransactionMaster>(saveTransMasterRequest);
                            _transactionMasterRepository.Create(transObj);
                            _transactionMasterRepository.SaveChanges();
                            Id = transObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Transaction Master has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
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

        public ResponseViewModal SaveTransactionDetailsInfo(List<TransactionDetailsViewModel> saveTransDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            TransactionDetails tranDetailsObj = null;
            InvoiceDetails invoiceDetailsObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    foreach (var trans in saveTransDetailsRequest)
                    {
                        if (trans.AgencyID > 0)
                        {
                            if (trans.Id == 0)
                            {
                                trans.CreatedDate = DateTime.UtcNow;
                                trans.IsActive = true;
                                trans.IsDeleted = false;
                                tranDetailsObj = new TransactionDetails();
                                invoiceDetailsObj = new InvoiceDetails();
                                tranDetailsObj = Mapper.Map<TransactionDetails>(trans);
                                _transactionDetailsRepository.Create(tranDetailsObj);
                                _transactionDetailsRepository.SaveChanges();
                                Id = tranDetailsObj.Id;
                                if (Id > 0)
                                {
                                    invoiceDetailsObj = _invoiceDetailsRepository.Get(x => x.InvoiceNo == tranDetailsObj.InvoiceNo && Convert.ToDateTime(x.InvoiceFromDate).Date == Convert.ToDateTime(trans.InvoiceFromDate).Date && Convert.ToDateTime(x.InvoiceToDate).Date == Convert.ToDateTime(trans.InvoiceToDate).Date && !x.IsDeleted);
                                    if (!ReferenceEquals(invoiceDetailsObj, null))
                                    {
                                        invoiceDetailsObj.InvoiceAmount = trans.TotalAmount;
                                        invoiceDetailsObj.TotalAmount = trans.TotalAmount;
                                        _invoiceDetailsRepository.SaveChanges();
                                        res.IsSuccess = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Missing Parameter.";
                            res.IsSuccess = false;
                        }
                        res.Message = DisplayMessage;
                        res.ReturnMessage.Add(DisplayMessage);
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    DisplayMessage = "Transaction Details has been saved.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
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

        public ResponseViewModal GetTransactionMaster(TransactionTypeViewModel transRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<TransactionTypeViewModel> transMaster = new List<TransactionTypeViewModel>();
                IQueryable<TransactionMaster> getTransMaster = _transactionMasterRepository.GetAll().Where(check => check.TransactionTypeID == transRequest.TransactionTypeID);
                transMaster = (from transObj in getTransMaster
                               select new TransactionTypeViewModel()
                               {
                                   TransactionTypeID = transObj.Id,
                                   Description = transObj.Description
                               }).ToList();
                res.Data = transMaster;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Transaction Master fetched successfully";
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
            }
            return res;
        }

        public ResponseViewModal GetTransactionMasterDetails()
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<TransactionTypeViewModel> transMaster = new List<TransactionTypeViewModel>();
                IQueryable<TransactionMaster> getTransMaster = _transactionMasterRepository.GetAll();
                IQueryable<TransactionType> getTransType = _transactionTypeRepository.GetAll();
                transMaster = (from transObj in getTransMaster
                               join transtypeObj in getTransType on transObj.TransactionTypeID equals transtypeObj.Id
                               select new TransactionTypeViewModel()
                               {
                                   TransactionTypeID = transObj.Id,
                                   TransactionTypeName = transtypeObj.TransactionTypeName,
                                   Description = transObj.Description
                               }).ToList();
                res.Data = transMaster;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Transaction Master Details fetched successfully";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = 0;//Convert.ToInt64(settingReq.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }

        public ResponseViewModal DeleteDeviceToken(DDAlertRequestViewModel settingReq)
        {
            ResponseViewModal res = new ResponseViewModal();
            UserLoginDevice deviceObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    deviceObj = _userLoginDeviceRepository.Get(x => x.DeviceToken == settingReq.BusinessToken);
                    if (!ReferenceEquals(deviceObj, null))
                    {
                        _userLoginDeviceRepository.Delete(deviceObj);
                        _userLoginDeviceRepository.SaveChanges();
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        DisplayMessage = "Information has been updated.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                }
                catch (Exception ex)
                {
                    //========Add Error Log Details =======//
                    long Idd = 0;
                    ErrorLog ELObj = null;
                    ErrorLogViewModel errorlogRequest = null;
                    errorlogRequest.CreatedDate = DateTime.UtcNow;
                    errorlogRequest.AgencyID = Convert.ToInt64(settingReq.AgencyID);
                    // errorlogRequest.UserID =
                    errorlogRequest.Message = ex.Message;
                    errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                    ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                    _errorlogRepository.Create(ELObj);
                    _errorlogRepository.SaveChanges();
                    Idd = ELObj.Id;

                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.InternalServerError; ;
                    res.Message = StatusMessage.ServerError;
                }
            }
            return res;
        }

        public ResponseViewModal GetBankAccountDetails(DDAlertRequestViewModel bankDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<TransactionMasterViewModel> transType = new List<TransactionMasterViewModel>();
                IQueryable<TransactionMaster> bankDetails = _transactionMasterRepository.GetAll(check => check.AgencyID == bankDetailsRequest.AgencyID && check.TransactionTypeID == 1);
                transType = (from bankObj in bankDetails
                             select new TransactionMasterViewModel()
                             {
                                 TransactionTypeID = bankObj.Id,
                                 Description = bankObj.Description, // Bank Name
                                 AccountHolderName = bankObj.AccountHolderName,
                                 AccountNumber = bankObj.AccountNumber,
                                 IFSC = bankObj.IFSC,
                                 OpeningBalance = bankObj.OpeningBalance,
                                 IsDefaultAccount = bankObj.IsDefaultAccount
                             }).ToList();
                res.Data = transType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "BankDetails fetched successfully";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Idd = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(bankDetailsRequest.AgencyID);
                // errorlogRequest.UserID =
                errorlogRequest.Message = ex.Message;
                errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                _errorlogRepository.Create(ELObj);
                _errorlogRepository.SaveChanges();
                Idd = ELObj.Id;

                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                res.Message = StatusMessage.ServerError;
            }
            return res;
        }

        public ResponseViewModal SaveDefaultBankAccount(DDAlertRequestViewModel defaultBankRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            TransactionMaster transMasterObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (defaultBankRequest.AgencyID > 0 && defaultBankRequest.TransactionMasterID > 0)
                    {
                        transMasterObj = _transactionMasterRepository.Get(x => x.AgencyID == defaultBankRequest.AgencyID && x.Id == defaultBankRequest.TransactionMasterID);
                        if (!ReferenceEquals(transMasterObj, null))
                        {
                            transMasterObj.IsDefaultAccount = true;
                            _transactionMasterRepository.SaveChanges();
                            res.IsSuccess = true;
                        }
                        else
                        {
                            res.StatusCode = 986;
                            res.Message = "Record Not Found";
                            res.IsSuccess = false;
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);

                    daycaredb.Commit();
                    res.IsSuccess = true;
                    DisplayMessage = "Transaction Details has been saved.";
                    res.StatusCode = (long)HttpStatusCodes.OK;
                }
                catch (Exception ex)
                {
                    //========Add Error Log Details =======//
                    long Id1 = 0;
                    ErrorLog ELObj = null;
                    ErrorLogViewModel errorlogRequest = null;
                    errorlogRequest.CreatedDate = DateTime.UtcNow;
                    errorlogRequest.AgencyID = Convert.ToInt64(defaultBankRequest.AgencyID);
                    // errorlogRequest.UserID =
                    errorlogRequest.Message = ex.Message;
                    errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                    ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                    _errorlogRepository.Create(ELObj);
                    _errorlogRepository.SaveChanges();
                    Id1 = ELObj.Id;

                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                    res.Message = StatusMessage.ServerError;
                }
            }
            return res;
        }

        public ResponseViewModal SaveExtraChargeFeeMasterInfo(TransactionMasterViewModel saveExtrFeeMasterRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            ExtraFeeChargeMaster transObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveExtrFeeMasterRequest.AgencyID > 0)
                    {
                        if (saveExtrFeeMasterRequest.Id == 0)
                        {
                            saveExtrFeeMasterRequest.CreatedDate = DateTime.UtcNow;
                            saveExtrFeeMasterRequest.IsActive = true;
                            saveExtrFeeMasterRequest.IsDeleted = false;
                            transObj = new ExtraFeeChargeMaster();
                            transObj = Mapper.Map<ExtraFeeChargeMaster>(saveExtrFeeMasterRequest);
                            _extraFeeChargeMasterRepository.Create(transObj);
                            _extraFeeChargeMasterRepository.SaveChanges();
                            Id = transObj.Id;
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            DisplayMessage = "Extra Fee Charge Name has been saved.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                    res.Message = DisplayMessage;
                    res.ReturnMessage.Add(DisplayMessage);
                }
                catch (Exception ex)
                {
                    //========Add Error Log Details =======//
                    long Idd = 0;
                    ErrorLog ELObj = null;
                    ErrorLogViewModel errorlogRequest = null;
                    errorlogRequest.CreatedDate = DateTime.UtcNow;
                    errorlogRequest.AgencyID = Convert.ToInt64(saveExtrFeeMasterRequest.AgencyID);
                    // errorlogRequest.UserID =
                    errorlogRequest.Message = ex.Message;
                    errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                    ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                    _errorlogRepository.Create(ELObj);
                    _errorlogRepository.SaveChanges();
                    Idd = ELObj.Id;

                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                    res.Message = StatusMessage.ServerError;
                }
            }
            return res;
        }

        public ResponseViewModal GetExtraFeeChargeMasterList(TransactionMasterViewModel extraFeesMasterRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (extraFeesMasterRequest.AgencyID > 0)
                {
                    List<TransactionMasterViewModel> allExtraFeeChargeMAster = new List<TransactionMasterViewModel>();
                    var selectedExtraFeeMaster = _extraFeeChargeMasterRepository.GetAll(check => check.AgencyID == extraFeesMasterRequest.AgencyID && !check.IsDeleted);

                    allExtraFeeChargeMAster = (from ExtraFeeMasterObj in selectedExtraFeeMaster
                                               select new TransactionMasterViewModel()
                                               {
                                                   ExtraChargeName = ExtraFeeMasterObj.ExtraChargeName,
                                                   Id = ExtraFeeMasterObj.Id
                                               }).ToList();

                    res.Data = allExtraFeeChargeMAster;
                    res.TotalRows = allExtraFeeChargeMAster.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Extra fees charges master has been successfully fetched.";
                }
                else
                {
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    return res;
                }
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(extraFeesMasterRequest.AgencyID);
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

        public ResponseViewModal GetParentsListForSendBalance(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<InvoiceDetailsViewModel> allDuePayementDetails = new List<InvoiceDetailsViewModel>();
                IQueryable<Entity.Agency.InvoiceDetails> selectedInvoice = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsInvoicePaid == false);
                IQueryable<Entity.Parent.ParentStudentMapping> selectedMap = _parentStudentMappingRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                string ParentName = invoiceDetailsRequest.ParentName.TrimStart();
                ParentName = ParentName.TrimEnd();
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.ParentName.ToUpper().Contains(ParentName.ToUpper()));
                IQueryable<Entity.Agency.InvoiceItemDetails> selectedInvoiceItemDetails = _invoiceItemDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Agency.Classes> selectedClasses = _classRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID);
                IQueryable<Entity.Masters.AdvanceFeePaymentDetails> advanceFeePaymentDetails = _advanceFeePaymentDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.StudentSubsidyDetails> studentsubsidyDetails = _studentsubsidyDetailsRepository.GetAll().Where(Check => (Check.FromDate.Date <= DateTime.Now.Date && Check.ToDate.Date >= DateTime.Now.Date) && Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);
                IQueryable<Entity.Masters.SubsidyDetails> subsidyDetails = _subsidyDetailsRepository.GetAll().Where(Check => Check.AgencyID == invoiceDetailsRequest.AgencyID && Check.IsDeleted == false);

                allDuePayementDetails = (from invoiceObj in selectedInvoice
                                         join invoiceItemObj in selectedInvoiceItemDetails on invoiceObj.Id equals invoiceItemObj.InvoiceDetailsID
                                         join classObj in selectedClasses on invoiceItemObj.ClassesID equals classObj.Id
                                         join parentObj in selectedParent on invoiceObj.ParentID equals parentObj.Id
                                         join studObj in selectedStudent on invoiceObj.StudentID equals studObj.Id
                                         select new InvoiceDetailsViewModel()
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
                                             Email = parentObj.EmailId,
                                             StudentName = studObj.StudentName,
                                             ClassName = classObj.ClassName,
                                             ClassId = Convert.ToString(invoiceItemObj.ClassesID),
                                             ClassFees = Convert.ToString(invoiceItemObj.ClassFees),
                                             InvoiceNo = invoiceObj.InvoiceNo,
                                             IsPartialPayment = invoiceObj.IsPartialPayment
                                         }).ToList();

                var result = allDuePayementDetails.GroupBy(p => p.ParentID).Select(p => p.First()).ToList();
                res.Data = result;
                if (invoiceDetailsRequest.limit != 0)
                {
                    res.Data = result.Skip((invoiceDetailsRequest.page) * invoiceDetailsRequest.limit).Take(invoiceDetailsRequest.limit).ToList();
                }
                res.TotalRows = result.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Payment Due Details have been successfully fetched.";
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(invoiceDetailsRequest.AgencyID);
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

        public ResponseViewModal GetAgencySetting(AgencySettingViewModel agencySettingRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AgencySettingViewModel> settingDetails = new List<AgencySettingViewModel>();

                if (agencySettingRequest.AgencyID > 0)
                {
                    var selectedSetting = _agencySettingRepository.GetAll(check => check.AgencyID == agencySettingRequest.AgencyID && !check.IsDeleted);

                    settingDetails = (from settingObj in selectedSetting
                                      where !settingObj.IsDeleted
                                      select new AgencySettingViewModel
                                      {
                                          Id = settingObj.Id,
                                          AgencyID = settingObj.AgencyID,
                                          TimeFormat = settingObj.TimeFormat
                                      }).ToList();

                    if (settingDetails.Count > 0)
                    {
                        res.Data = settingDetails;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.IsSuccess = true;
                        res.Message = StatusMessage.Retreived;
                    }
                    else
                    {
                        res.Data = settingDetails;
                        res.StatusCode = (long)HttpStatusCodes.NotFound;
                        res.IsSuccess = true;
                        res.Message = StatusMessage.NotFound;
                    }
                }
                else
                {
                    res.StatusCode = (long)HttpStatusCodes.BadRequest;
                    res.IsSuccess = false;
                    res.Message = StatusMessage.Missing;
                }
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(agencySettingRequest.AgencyID);
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


        public ResponseViewModal SavestudentFiles(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (studentfilesRequest.StudentID > 0 && studentfilesRequest.AgencyID > 0)
                    {
                        if (studentfilesRequest.StudentFiles != null && studentfilesRequest.StudentFiles.Count > 0)
                        {
                            StudentFiles studentfilesRequestObj = null;
                            long id = 0;

                            foreach (StudentFilesRequestViewModel uploadfiles in studentfilesRequest.StudentFiles)
                            {
                                studentfilesRequest.AgencyID = studentfilesRequest.AgencyID;
                                studentfilesRequest.StudentID = studentfilesRequest.StudentID;
                                studentfilesRequest.FilePath = uploadfiles.FilePath;
                                studentfilesRequest.CreatedDate = DateTime.UtcNow;
                                studentfilesRequest.FileName = "";
                                studentfilesRequestObj = Mapper.Map<StudentFiles>(studentfilesRequest);

                                _studentFilesRepository.Create(studentfilesRequestObj);
                                _studentFilesRepository.SaveChanges();

                                id = studentfilesRequestObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = StatusMessage.StudentFiles;
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.IsSuccess = true;
                        res.Message = StatusMessage.Missing;
                    }
                }
                catch (Exception ex)
                {
                    //========Add Error Log Details =======//
                    long Id = 0;
                    ErrorLog ELObj = null;
                    ErrorLogViewModel errorlogRequest = null;
                    errorlogRequest.CreatedDate = DateTime.UtcNow;
                    errorlogRequest.AgencyID = Convert.ToInt64(studentfilesRequest.AgencyID);
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
        }

        public ResponseViewModal GetUploadedFilesByStudentId(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<StudentFilesViewModel> studentfileDetails = new List<StudentFilesViewModel>();

                if (studentfilesRequest.AgencyID > 0)
                {
                    var fileDetails = _studentFilesRepository.GetAll(check => check.AgencyID == studentfilesRequest.AgencyID && check.StudentID == studentfilesRequest.StudentID && !check.IsDeleted);

                    studentfileDetails = (from studentfileObj in fileDetails
                                          where studentfileObj.StudentID == studentfilesRequest.StudentID &&
                                          studentfileObj.AgencyID == studentfilesRequest.AgencyID && !studentfileObj.IsDeleted
                                          orderby studentfileObj.Id descending
                                          select new StudentFilesViewModel
                                          {
                                              Id = studentfileObj.Id,
                                              AgencyID = studentfileObj.AgencyID,
                                              FilePath = studentfileObj.FilePath
                                          }).ToList();

                    if (studentfileDetails.Count > 0)
                    {
                        res.Data = studentfileDetails;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.IsSuccess = true;
                        res.Message = StatusMessage.Retreived;
                        res.TotalRows = studentfileDetails.Count();
                    }
                    else
                    {
                        res.Data = studentfileDetails;
                        res.StatusCode = (long)HttpStatusCodes.NotFound;
                        res.IsSuccess = true;
                        res.Message = StatusMessage.NotFound;
                        res.TotalRows = studentfileDetails.Count();
                    }
                }
                else
                {
                    res.StatusCode = (long)HttpStatusCodes.BadRequest;
                    res.IsSuccess = false;
                    res.Message = StatusMessage.Missing;
                }
            }
            catch (Exception ex)
            {
                //========Add Error Log Details =======//
                long Id = 0;
                ErrorLog ELObj = null;
                ErrorLogViewModel errorlogRequest = null;
                errorlogRequest.CreatedDate = DateTime.UtcNow;
                errorlogRequest.AgencyID = Convert.ToInt64(studentfilesRequest.AgencyID);
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

        public ResponseViewModal DeleteStudentFilesById(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            StudentFiles studentfileObj = null;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    studentfileObj = _studentFilesRepository.Get(x => x.Id == studentfilesRequest.Id && x.AgencyID == studentfilesRequest.AgencyID && !x.IsDeleted);
                    if (!ReferenceEquals(studentfileObj, null))
                    {
                        studentfileObj.IsDeleted = true;
                        studentfileObj.DeletedBy = studentfilesRequest.DeletedBy;
                        studentfileObj.DeletedDate = DateTime.UtcNow;
                        _studentFilesRepository.SaveChanges();

                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.Message = "This student files has been deleted successfully";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                }
                catch (Exception ex)
                {
                    //========Add Error Log Details =======//
                    long Idd = 0;
                    ErrorLog ELObj = null;
                    ErrorLogViewModel errorlogRequest = null;
                    errorlogRequest.CreatedDate = DateTime.UtcNow;
                    errorlogRequest.AgencyID = Convert.ToInt64(studentfilesRequest.AgencyID);
                    // errorlogRequest.UserID =
                    errorlogRequest.Message = ex.Message;
                    errorlogRequest.StackTrace = ex.Message + "###" + ex.StackTrace;
                    ELObj = Mapper.Map<ErrorLog>(errorlogRequest);
                    _errorlogRepository.Create(ELObj);
                    _errorlogRepository.SaveChanges();
                    Idd = ELObj.Id;

                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.InternalServerError;
                    res.Message = StatusMessage.ServerError;
                }
            }
            return res;
        }

        public ResponseViewModal GetAllAgencyList(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                string AgencyName = getAgencyDetailsRequest.AgencyName.TrimStart();
                AgencyName = AgencyName.TrimEnd();

                List<AgencyViewModel> allAgency = new List<AgencyViewModel>();
                IQueryable<Entity.Masters.Agency> selectedAgency = _agencyRepository.GetAll().Where(Check => Check.Status == getAgencyDetailsRequest.status && Check.AgencyName.ToUpper().Contains(AgencyName.ToUpper()));
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.City> selectedCity = _cityRepository.GetAll().Where(Check => !Check.IsDeleted);

                allAgency = (from agencyObj in selectedAgency
                             join countryObj in selectedCountry on agencyObj.CountryId equals countryObj.Id
                             join stateObj in selectedState on agencyObj.StateId equals stateObj.Id
                             join cityObj in selectedCity on agencyObj.CityId equals cityObj.Id
                             select new AgencyViewModel
                             {
                                 AgencyName = agencyObj.AgencyName,
                                 ContactPersonFirstName = agencyObj.ContactPersonFirstName,
                                 ContactPersonLastName = agencyObj.ContactPersonLastName,
                                 OwnerFirstName = agencyObj.OwnerFirstName,
                                 OwnerLastName = agencyObj.OwnerLastName,
                                 OwnerName = agencyObj.OwnerFirstName + " " + agencyObj.OwnerLastName,
                                 CityId = agencyObj.CityId,
                                 CityName = cityObj.CityName,
                                 StateId = agencyObj.StateId,
                                 StateName = stateObj.StateName,
                                 CountryId = agencyObj.CountryId,
                                 CountryName = countryObj.CountryName,
                                 CreatedFromIP = agencyObj.CreatedFromIP,
                                 CurrentSubscriptionPlanId = agencyObj.CurrentSubscriptionPlanId,
                                 Mobile = agencyObj.Mobile,
                                 EmailId = agencyObj.EmailId,
                                 PostalCode = agencyObj.PostalCode,
                                 TrialStart = agencyObj.TrialStart,
                                 TrialEnd = agencyObj.TrialEnd,
                                 IsTrial = agencyObj.IsTrial,
                                 IsActive = agencyObj.IsActive,
                                 IsExistingAccount = agencyObj.IsExistingAccount,
                                 IsLoggedFirstTime = agencyObj.IsLoggedFirstTime,
                                 IsTrialMailSent = agencyObj.IsTrialMailSent,
                                 GenderID = agencyObj.GenderID,
                                 Id = agencyObj.Id,
                                 DeletedFromIP = agencyObj.DeletedFromIP,
                                 PayPalSubscriptionId = agencyObj.PayPalSubscriptionId,
                                 PayPalUserId = agencyObj.PayPalUserId,
                                 Profession = agencyObj.Profession,
                                 SubscriptionValidUpto = agencyObj.SubscriptionValidUpto,
                                 TimeZoneSpecification = agencyObj.TimeZoneSpecification,
                                 Address = agencyObj.Address,
                                 UpdatedFromIP = agencyObj.UpdatedFromIP,
                                 UserID = agencyObj.UserID,
                                 IsDeleted = agencyObj.IsDeleted
                             }).OrderBy(c => c.AgencyName).ToList();

                res.Data = allAgency;
                res.TotalRows = allAgency.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Agency list has been feteched";
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


        public ResponseViewModal GetAgencyCountryStateID(MasterBaseRequestViewModel getAgencyCountryRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                CountryStateViewModel countrystateInformation = new CountryStateViewModel();
                IQueryable<Entity.Masters.State> selectedState = _stateRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.Country> selectedCountry = _countryRepository.GetAll().Where(Check => !Check.IsDeleted);
                IQueryable<Entity.Masters.Agency> selectedAgency = _agencyRepository.GetAll().Where(Check => Check.Id == getAgencyCountryRequest.AgencyID && Check.IsDeleted == false);

                countrystateInformation = (from agencyObj in selectedAgency
                                           join countryObj in selectedCountry on agencyObj.CountryId equals countryObj.Id
                                           join stateObj in selectedState on agencyObj.StateId equals stateObj.Id
                                           select new CountryStateViewModel()
                                           {
                                               CountryId = countryObj.Id,
                                               StateId = stateObj.Id,
                                               CountryName = countryObj.CountryName ?? String.Empty,
                                               CountryCode = countryObj.CountryCode ?? String.Empty,
                                               StateName = stateObj.StateName ?? String.Empty,
                                               StateCode = stateObj.StateCode ?? String.Empty,
                                               AgencyID = agencyObj.Id
                                           }).OrderBy(c => c.CountryName).FirstOrDefault();
                res.Data = countrystateInformation;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Agency State Country ID has been successfully fetched.";
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


        public async Task<ResponseViewModal> GetParentLedgerAsync(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
            IQueryable<Entity.Parent.Parent> selectParents = null;
            try
            {
                if (getLedgerReportRequest.ParentName != "")
                {
                    string parentname = getLedgerReportRequest.ParentName.TrimStart();
                    parentname = parentname.TrimEnd();
                    selectParents = _parentRepository.GetAll().Where(namecheck => namecheck.ParentName.ToUpper().Contains(parentname.ToUpper()) && namecheck.AgencyID == getLedgerReportRequest.AgencyID && !namecheck.IsDeleted);
                }

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

                // AssociateChild for the Parents
                string query = "parent_associatedchild";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("agencyid", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<ParentStudentMappingViewModel> AssociatedChild = await _baserepository.GetAsync<ParentStudentMappingViewModel>(query, parameters, CommandType.StoredProcedure);
                AssociatedChild = AssociatedChild.ToList();

                var result = AssociatedChild.GroupBy(p => p.ParentID).Select(p => p.First()).OrderBy(o => o.ParentID).ToList();
                foreach (var r in result)
                {
                    var studentName = AssociatedChild.Where(p => p.ParentID == r.ParentID).Select(p => p.FirstName).ToArray();
                    r.StudentNames = string.Join(", ", studentName);
                }
                var k = 0;
                for (int i = 0; i < allLedgerList.Count; i++)
                {
                    if (k < result.Count())
                    {
                        if (allLedgerList[i].ParentID == result[k].ParentID)
                        {
                            allLedgerList[i].StudentNames = result[k].StudentNames;
                            k++;
                        }
                    }
                }
                if (selectParents != null)
                {
                    if (selectParents.Count() > 0)
                    {
                        var parentResult = selectParents.Select(s => s.Id).ToList();
                        var result1 = allLedgerList.Where(x => parentResult.Contains(x.ParentID));
                        res.Data = result1.OrderBy(a => a.ParentName).ToList();
                        res.TotalRows = allLedgerList.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Ledger list has been feteched";
                    }
                    else
                    {
                        var result1 = allLedgerList.OrderBy(a => a.ParentName).ToList();
                        res.Data = result1;
                        res.TotalRows = allLedgerList.Count();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Ledger list has been feteched";
                    }
                }
                else
                {
                    var result1 = allLedgerList.OrderBy(a => a.ParentName).ToList();
                    res.Data = result1;
                    res.TotalRows = allLedgerList.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Ledger list has been feteched";
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

        public async Task<ResponseViewModal> GetStudentLedgerAsync(ReportViewModel getLedgerReportRequest)
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

        public ResponseViewModal SaveInvoiceDetails(InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            InvoiceDetails ivdObj = null;
            InvoiceItemDetails invoiceItemDetails = new InvoiceItemDetails();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                long Id = 0;
                try
                {
                    if (saveGenerateInvoiceInfoRequest.AgencyID > 0)
                    {
                        if (saveGenerateInvoiceInfoRequest.Id == 0)
                        {
                            Classes clsObj = null;
                            //========Insert data for InvoiceDetails table =======//
                            Random random = new Random();
                            int num = random.Next(1, 999999999);
                            saveGenerateInvoiceInfoRequest.IsActive = true;
                            saveGenerateInvoiceInfoRequest.IsDeleted = false;
                            saveGenerateInvoiceInfoRequest.CreatedDate = DateTime.UtcNow;
                            saveGenerateInvoiceInfoRequest.InvoiceNo = saveGenerateInvoiceInfoRequest.AgencyID + "-" + saveGenerateInvoiceInfoRequest.ParentID + "-" + saveGenerateInvoiceInfoRequest.StudentID + "-" + DateTime.Now.ToString("yyyyMMdd") + "-" + num;
                            saveGenerateInvoiceInfoRequest.AgencyID = saveGenerateInvoiceInfoRequest.AgencyID;
                            saveGenerateInvoiceInfoRequest.ParentID = saveGenerateInvoiceInfoRequest.ParentID;
                            saveGenerateInvoiceInfoRequest.StudentID = saveGenerateInvoiceInfoRequest.StudentID;
                            saveGenerateInvoiceInfoRequest.InvoiceDate = saveGenerateInvoiceInfoRequest.PostingDate;
                            saveGenerateInvoiceInfoRequest.InvoiceFromDate = saveGenerateInvoiceInfoRequest.PostingDate;
                            saveGenerateInvoiceInfoRequest.InvoiceToDate = saveGenerateInvoiceInfoRequest.PostingDate.AddDays(6);
                            saveGenerateInvoiceInfoRequest.InvoiceAmount = saveGenerateInvoiceInfoRequest.Amount;
                            saveGenerateInvoiceInfoRequest.DiscountAmount = 0;
                            saveGenerateInvoiceInfoRequest.TotalAmount = saveGenerateInvoiceInfoRequest.Amount;
                            saveGenerateInvoiceInfoRequest.IsInvoicePaid = false;
                            saveGenerateInvoiceInfoRequest.DueAmount = 0;
                            saveGenerateInvoiceInfoRequest.IsPartialPayment = false;
                            saveGenerateInvoiceInfoRequest.PerDayFeeCalculationID = 0;
                            if (saveGenerateInvoiceInfoRequest.ClassId == "0")
                            {
                                if (saveGenerateInvoiceInfoRequest.InvoiceDescription == ConstantString.Other)
                                {
                                    saveGenerateInvoiceInfoRequest.InvoiceDescription = saveGenerateInvoiceInfoRequest.Notes;
                                }
                                else
                                {
                                    saveGenerateInvoiceInfoRequest.InvoiceDescription = saveGenerateInvoiceInfoRequest.InvoiceDescription;
                                }
                                RecurringBilling recurringBilling = _recurringBillingRepository.Get(check => !check.IsDeleted && check.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID &&
                                check.StudentID == saveGenerateInvoiceInfoRequest.StudentID && check.ParentID == saveGenerateInvoiceInfoRequest.ParentID
                                && check.BillingDescription == saveGenerateInvoiceInfoRequest.InvoiceDescription);
                                if (recurringBilling != null)
                                {
                                    if (recurringBilling.InvoiceGenerateDate == null)
                                    {
                                        recurringBilling.InvoiceGenerateDate = saveGenerateInvoiceInfoRequest.PostingDate;
                                        _recurringBillingRepository.SaveChanges();
                                    }
                                }
                            }

                            else
                            {
                                clsObj = _classRepository.Get(x => x.Id == Convert.ToInt32(saveGenerateInvoiceInfoRequest.ClassId) && x.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID && !x.IsDeleted);
                                saveGenerateInvoiceInfoRequest.InvoiceDescription = clsObj.ClassName;

                                ClassEnrollment clsEnrollObj = _classEnrollmentRepository.Get(check => !check.IsDeleted && check.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID &&
                               check.EnrollmentStatus == 2 && check.StudentID == saveGenerateInvoiceInfoRequest.StudentID &&
                               check.ClassesID == Convert.ToInt32(saveGenerateInvoiceInfoRequest.ClassId));

                                if (clsEnrollObj == null)
                                {
                                    daycaredb.Rollback();
                                    res.StatusCode = 204;
                                    res.Message = "Select Enroll Class.";
                                    res.IsSuccess = false;
                                    return res;
                                }

                                RecurringBilling recurringBilling = _recurringBillingRepository.Get(check => !check.IsDeleted && check.AgencyID == saveGenerateInvoiceInfoRequest.AgencyID &&
                                check.StudentID == saveGenerateInvoiceInfoRequest.StudentID && check.ParentID == saveGenerateInvoiceInfoRequest.ParentID
                                && check.ClassesID == Convert.ToInt32(saveGenerateInvoiceInfoRequest.ClassId));
                                if (recurringBilling != null)
                                {
                                    if (recurringBilling.InvoiceGenerateDate == null)
                                    {
                                        recurringBilling.InvoiceGenerateDate = saveGenerateInvoiceInfoRequest.PostingDate;
                                        _recurringBillingRepository.SaveChanges();
                                    }
                                }

                            }

                            ivdObj = new InvoiceDetails();
                            ivdObj = Mapper.Map<InvoiceDetails>(saveGenerateInvoiceInfoRequest);
                            _invoiceDetailsRepository.Create(ivdObj);
                            _invoiceDetailsRepository.SaveChanges();
                            Id = ivdObj.Id;
                        }
                        else
                        {
                            res.IsSuccess = false;
                            res.Message = "Invoice Already Generated.";
                            res.StatusCode = 205;
                        }
                        res.IsSuccess = true;
                        res.Message = "Invoice Generated Successfully.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        daycaredb.Commit();
                    }
                    else
                    {
                        daycaredb.Rollback();
                        res.StatusCode = 987;
                        res.Message = "Something went wrong.";
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

        public ResponseViewModal SavePaymentDetails(PaymentDetailsViewModel payementDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (payementDetailsRequest.AgencyID > 0)
                    {
                        long id = 0;
                        PayementDetails paymentDetailsAccount = new PayementDetails();

                        if (payementDetailsRequest.AgencyID != 0 && payementDetailsRequest.Id == 0)
                        {
                            if (payementDetailsRequest.IsOffline == false)
                            {
                                //IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == payementDetailsRequest.ParentID
                                //&& x.StudentID == payementDetailsRequest.StudentID && !x.IsDeleted);
                                IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == payementDetailsRequest.ParentID && !x.IsDeleted);
                                if (inv_Obj.Count() != 0)
                                {
                                    var list = inv_Obj.Select(s => new { s.AgencyID, s.Id }).ToList().OrderByDescending(s => s.Id).First();
                                    payementDetailsRequest.InvoiceDetailsID = list.Id;
                                }
                                else
                                {
                                    IQueryable<Entity.Agency.InvoiceDetails> inv_Obj1 = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == payementDetailsRequest.AgencyID && x.ParentID == payementDetailsRequest.ParentID && !x.IsDeleted);
                                    if (inv_Obj1.Count() != 0)
                                    {
                                        var list1 = inv_Obj1.Select(s => new { s.AgencyID, s.Id }).ToList().OrderByDescending(s => s.Id).First();
                                        payementDetailsRequest.InvoiceDetailsID = list1.Id;
                                    }
                                    else
                                    {
                                        daycaredb.Rollback();
                                        res.StatusCode = 209;
                                        res.Message = "No Invoice for this Parent.";
                                        res.IsSuccess = false;
                                        return res;
                                    }

                                }

                                if (payementDetailsRequest.PaymentDescription == ConstantString.DepositRefund || payementDetailsRequest.PaymentDescription == ConstantString.SiblingDiscount)
                                {
                                    RecurringBilling recurringBilling = _recurringBillingRepository.Get(check => !check.IsDeleted && check.AgencyID == payementDetailsRequest.AgencyID &&
                                    check.StudentID == payementDetailsRequest.StudentID && check.ParentID == payementDetailsRequest.ParentID
                                    && check.BillingDescription == payementDetailsRequest.PaymentDescription);

                                    if (recurringBilling != null)
                                    {
                                        if (recurringBilling.InvoiceGenerateDate == null)
                                        {
                                            recurringBilling.InvoiceGenerateDate = payementDetailsRequest.PostingDate;
                                            _recurringBillingRepository.SaveChanges();
                                        }
                                    }
                                    //else
                                    //{
                                    //    daycaredb.Rollback();
                                    //    res.StatusCode = 203;
                                    //    res.Message = "Select Enroll Class.";
                                    //    res.IsSuccess = false;
                                    //    return res;
                                    //}
                                }
                                payementDetailsRequest.IsActive = true;
                                payementDetailsRequest.IsDeleted = false;
                                payementDetailsRequest.CreatedBy = payementDetailsRequest.AgencyID;
                                payementDetailsRequest.CreatedDate = DateTime.UtcNow;
                                payementDetailsRequest.AgencyID = payementDetailsRequest.AgencyID;
                                payementDetailsRequest.ParentID = payementDetailsRequest.ParentID;
                                payementDetailsRequest.StudentID = payementDetailsRequest.StudentID;
                                payementDetailsRequest.TotalAmount = Math.Round(payementDetailsRequest.Amount, 2);
                                payementDetailsRequest.StripeDetailsID = 0;
                                payementDetailsRequest.PaymentFromDate = payementDetailsRequest.PostingDate;
                                payementDetailsRequest.PaymentToDate = payementDetailsRequest.PostingDate.AddDays(6);
                                payementDetailsRequest.PaymentDate = DateTime.UtcNow;
                                payementDetailsRequest.IsOffline = true;
                                payementDetailsRequest.AmoutPaid = Math.Round(payementDetailsRequest.Amount, 2);
                                payementDetailsRequest.BalanceAmount = 0;
                                if (payementDetailsRequest.PaymentDescription == ConstantString.PaymentCreditCard)
                                {
                                    payementDetailsRequest.CardNo = payementDetailsRequest.ChequeNo;
                                    payementDetailsRequest.PaymentType = ConstantString.CreditCard;
                                    payementDetailsRequest.ChequeNo = 0;
                                }
                                else if (payementDetailsRequest.PaymentDescription == ConstantString.PaymentCheck)
                                {
                                    payementDetailsRequest.ChequeNo = payementDetailsRequest.ChequeNo;
                                    payementDetailsRequest.PaymentType = ConstantString.Check;
                                }
                                else if (payementDetailsRequest.PaymentDescription == ConstantString.PaymentCash)
                                {
                                    payementDetailsRequest.ChequeNo = 0;
                                    payementDetailsRequest.CardNo = 0;
                                    payementDetailsRequest.PaymentType = ConstantString.Cash;
                                }
                                else if (payementDetailsRequest.PaymentDescription == ConstantString.DepositRefund)
                                {
                                    payementDetailsRequest.ChequeNo = 0;
                                    payementDetailsRequest.CardNo = 0;
                                    payementDetailsRequest.PaymentType = ConstantString.Refund;
                                }
                                else if (payementDetailsRequest.PaymentDescription == ConstantString.Other)
                                {
                                    payementDetailsRequest.PaymentDescription = payementDetailsRequest.Notes;
                                    payementDetailsRequest.ChequeNo = 0;
                                    payementDetailsRequest.CardNo = 0;
                                    payementDetailsRequest.PaymentType = ConstantString.Other;
                                }
                                else if (payementDetailsRequest.PaymentDescription == ConstantString.CreditForward)
                                {
                                    payementDetailsRequest.PaymentDescription = payementDetailsRequest.PaymentDescription;
                                    payementDetailsRequest.ChequeNo = 0;
                                    payementDetailsRequest.CardNo = 0;
                                    payementDetailsRequest.PaymentType = ConstantString.Credit;
                                }
                                else
                                {
                                    payementDetailsRequest.ChequeNo = 0;
                                    payementDetailsRequest.CardNo = 0;
                                    payementDetailsRequest.PaymentType = ConstantString.Discount;
                                }
                                payementDetailsRequest.DiscountAmount = 0;
                                payementDetailsRequest.SubsidyAmount = 0;
                                payementDetailsRequest.SubsidyDetailsID = 0;
                                payementDetailsRequest.IsPartialPayment = false;
                                payementDetailsRequest.AdvanceAmount = 0;

                                Mapper.Map(payementDetailsRequest, paymentDetailsAccount);
                                _payementDetailsRepository.Create(paymentDetailsAccount);
                                _payementDetailsRepository.SaveChanges();
                                id = paymentDetailsAccount.Id;
                                if (id > 0)
                                {
                                    InvoiceDetails invObj = new InvoiceDetails();
                                    invObj = _invoiceDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && x.Id == payementDetailsRequest.InvoiceDetailsID && !x.IsDeleted);
                                    if (!ReferenceEquals(invObj, null))
                                    {
                                        invObj.IsInvoicePaid = true;
                                        invObj.UpdatedBy = payementDetailsRequest.UpdatedBy;
                                        invObj.UpdatedDate = DateTime.UtcNow;
                                        _invoiceDetailsRepository.SaveChanges();
                                    }
                                }
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Payement Done Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (recurringBillingRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Masters.RecurringBilling> selectedRecurringBilling = _recurringBillingRepository.GetAll().Where(check => check.BillingToDate.Date >= DateTime.Now.Date
                    && check.AgencyID == recurringBillingRequest.AgencyID && check.StudentID == recurringBillingRequest.StudentID && check.ParentID == recurringBillingRequest.ParentID
                    && check.IsDeleted == false);
                    IQueryable<Entity.Masters.FeePaymentType> feePaymentType = _feesPaymentTypeRepository.GetAll().Where(check => !check.IsDeleted);

                    List<RecurringBillingViewModel> allRecurringBilling = new List<RecurringBillingViewModel>();

                    allRecurringBilling = (from RecurringBillingObj in selectedRecurringBilling
                                           join feePaymentTypeObj in feePaymentType on RecurringBillingObj.BillingCycle equals feePaymentTypeObj.Id
                                           where (recurringBillingRequest.AgencyID == RecurringBillingObj.AgencyID)
                                           select new RecurringBillingViewModel()
                                           {
                                               Id = RecurringBillingObj.Id,
                                               AgencyID = RecurringBillingObj.AgencyID,
                                               ParentID = RecurringBillingObj.ParentID,
                                               StudentID = RecurringBillingObj.StudentID,
                                               Amount = RecurringBillingObj.Amount,
                                               BillingFromDate = RecurringBillingObj.BillingFromDate,
                                               BillingToDate = RecurringBillingObj.BillingToDate,
                                               ClassesID = RecurringBillingObj.ClassesID,
                                               BillingCycle = RecurringBillingObj.BillingCycle,
                                               BillingCycleName = feePaymentTypeObj.FeePaymentTypeName,
                                               BillingDescription = RecurringBillingObj.BillingDescription,
                                               TransactionType = RecurringBillingObj.TransactionType
                                           }).OrderBy(c => c.Id).ToList();

                    res.Data = allRecurringBilling;
                    res.TotalRows = allRecurringBilling.Count();
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

        public ResponseViewModal SaveRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (recurringBillingRequest.AgencyID > 0)
                    {
                        long id = 0;
                        RecurringBilling recurringBilling = new RecurringBilling();
                        if (recurringBillingRequest.AgencyID != 0 && recurringBillingRequest.Id == 0)
                        {
                            recurringBillingRequest.IsActive = true;
                            recurringBillingRequest.IsDeleted = false;
                            recurringBillingRequest.CreatedBy = recurringBillingRequest.AgencyID;
                            recurringBillingRequest.CreatedDate = DateTime.UtcNow;
                            recurringBillingRequest.AgencyID = recurringBillingRequest.AgencyID;
                            recurringBillingRequest.ParentID = recurringBillingRequest.ParentID;
                            recurringBillingRequest.StudentID = recurringBillingRequest.StudentID;
                            recurringBillingRequest.Amount = Math.Round(recurringBillingRequest.Amount, 2);
                            recurringBillingRequest.BillingFromDate = recurringBillingRequest.BillingFromDate;
                            recurringBillingRequest.BillingToDate = recurringBillingRequest.BillingToDate;
                            recurringBillingRequest.BillingDate = recurringBillingRequest.BillingFromDate;
                            recurringBillingRequest.BillingCycle = recurringBillingRequest.BillingCycle;
                            recurringBillingRequest.InvoiceGenerateDate = recurringBillingRequest.BillingFromDate;
                            recurringBillingRequest.TransactionType = recurringBillingRequest.TransactionType;
                            if (recurringBillingRequest.BillingDescription == ConstantString.DepositCharge || recurringBillingRequest.BillingDescription == ConstantString.ParentRefund ||
                                recurringBillingRequest.BillingDescription == ConstantString.ReturnCheck || recurringBillingRequest.BillingDescription == ConstantString.TuitionLateFee ||
                                recurringBillingRequest.BillingDescription == ConstantString.DepositRefund || recurringBillingRequest.BillingDescription == ConstantString.SiblingDiscount ||
                                recurringBillingRequest.BillingDescription == ConstantString.Subsidy || recurringBillingRequest.BillingDescription == ConstantString.StateProgram)
                            {
                                recurringBillingRequest.BillingDescription = recurringBillingRequest.BillingDescription;
                                recurringBillingRequest.ClassesID = 0;
                            }
                            else
                            {
                                ClassEnrollment clsEnrollObj = _classEnrollmentRepository.Get(check => !check.IsDeleted &&
                                check.AgencyID == recurringBillingRequest.AgencyID && check.EnrollmentStatus == 2 &&
                                check.StudentID == recurringBillingRequest.StudentID && check.ClassEnrollEndDate >= DateTime.UtcNow &&
                                check.ClassesID == Convert.ToInt32(recurringBillingRequest.BillingDescription));

                                if (clsEnrollObj == null)
                                {
                                    daycaredb.Rollback();
                                    res.StatusCode = 204;
                                    res.Message = "Not Enroll for this Class.";
                                    res.IsSuccess = false;
                                    return res;
                                }
                                else
                                {
                                    Classes clsObj = _classRepository.Get(x => x.Id == Convert.ToInt32(recurringBillingRequest.BillingDescription) && x.AgencyID == recurringBillingRequest.AgencyID && !x.IsDeleted);
                                    recurringBillingRequest.BillingDescription = clsObj.ClassName;
                                    recurringBillingRequest.ClassesID = clsObj.Id;
                                }
                            }

                            Mapper.Map(recurringBillingRequest, recurringBilling);
                            _recurringBillingRepository.Create(recurringBilling);
                            _payementDetailsRepository.SaveChanges();
                            id = recurringBilling.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Payement Done Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }

                        else if (recurringBillingRequest.Id > 0 && recurringBillingRequest.IsDeleted == true)
                        {
                            recurringBilling = _recurringBillingRepository.Get(x => x.Id == recurringBillingRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(recurringBilling, null) && !ReferenceEquals(recurringBilling, null))
                            {
                                recurringBilling.IsDeleted = recurringBillingRequest.IsDeleted;
                                recurringBilling.DeletedBy = recurringBillingRequest.DeletedBy;
                                recurringBilling.DeletedDate = DateTime.UtcNow;
                                recurringBilling.InvoiceGenerateDate = null;

                                _recurringBillingRepository.SaveChanges();
                                res.Message = "Recurring Billing Information has been deleted.";
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }

                        else if (recurringBillingRequest.Id > 0)
                        {
                            recurringBilling = _recurringBillingRepository.Get(x => x.Id == recurringBillingRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(recurringBilling, null))
                            {
                                recurringBilling.AgencyID = recurringBillingRequest.AgencyID;
                                recurringBilling.ParentID = recurringBillingRequest.ParentID;
                                recurringBilling.StudentID = recurringBillingRequest.StudentID;
                                recurringBilling.Amount = recurringBillingRequest.Amount;
                                recurringBilling.BillingFromDate = recurringBillingRequest.BillingFromDate;
                                recurringBilling.BillingToDate = recurringBillingRequest.BillingToDate;
                                recurringBilling.BillingDate = recurringBillingRequest.BillingFromDate;
                                recurringBilling.BillingCycle = recurringBillingRequest.BillingCycle;
                                recurringBilling.TransactionType = recurringBillingRequest.TransactionType;

                                if (recurringBillingRequest.BillingDescription == ConstantString.DepositCharge || recurringBillingRequest.BillingDescription == ConstantString.ParentRefund ||
                                recurringBillingRequest.BillingDescription == ConstantString.ReturnCheck || recurringBillingRequest.BillingDescription == ConstantString.TuitionLateFee ||
                                recurringBillingRequest.BillingDescription == ConstantString.DepositRefund || recurringBillingRequest.BillingDescription == ConstantString.SiblingDiscount)
                                {
                                    recurringBilling.BillingDescription = recurringBillingRequest.BillingDescription;
                                    recurringBilling.ClassesID = 0;
                                }
                                else
                                {
                                    ClassEnrollment clsEnrollObj = _classEnrollmentRepository.Get(check => !check.IsDeleted &&
                                    check.AgencyID == recurringBillingRequest.AgencyID && check.EnrollmentStatus == 2 &&
                                    check.StudentID == recurringBillingRequest.StudentID && check.ClassEnrollEndDate >= DateTime.UtcNow &&
                                    check.ClassesID == Convert.ToInt32(recurringBillingRequest.BillingDescription));

                                    if (clsEnrollObj == null)
                                    {
                                        daycaredb.Rollback();
                                        res.StatusCode = 204;
                                        res.Message = "Not Enroll for this Class.";
                                        res.IsSuccess = false;
                                        return res;
                                    }
                                    else
                                    {
                                        Classes clsObj = _classRepository.Get(x => x.Id == Convert.ToInt32(recurringBillingRequest.BillingDescription) && x.AgencyID == recurringBillingRequest.AgencyID && !x.IsDeleted);
                                        recurringBillingRequest.BillingDescription = clsObj.ClassName;
                                        recurringBillingRequest.ClassesID = clsObj.Id;
                                    }
                                }
                                _recurringBillingRepository.SaveChanges();
                                daycaredb.Commit();

                                res.IsSuccess = true;
                                res.Message = "Recurring Billing Information has been updated.";
                                res.StatusCode = (long)HttpStatusCodes.OK;

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
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public async Task<ResponseViewModal> GetBalanceAccordingToParentAsync(ReportViewModel getLedgerReportRequest)
        {
            decimal paidAmount = 0;
            ResponseViewModal res = new ResponseViewModal();
            List<ReportViewModel> allLedgerList = new List<ReportViewModel>();
            ReportViewModel obj = null;
            try
            {
                IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(check => check.Id == getLedgerReportRequest.ParentID);
                var parentresult = parentDetails.ToList();
                if (parentresult[0].IsParent == true)
                {
                    //Claculate Debit Amount from PamentDetails Table
                    paidAmount = 0;
                    obj = new ReportViewModel();
                    IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID
                    && Check.ParentID == getLedgerReportRequest.ParentID && !Check.IsDeleted).OrderBy(s => s.InvoiceDetailsID);

                    var TotalAmount = payementCollection.Sum(a => a.TotalAmount);
                    var BalanceAmount = payementCollection.Sum(a => a.BalanceAmount);
                    var DiscountAmount = payementCollection.Sum(a => a.DiscountAmount);
                    paidAmount = TotalAmount - BalanceAmount - DiscountAmount;
                    obj.ParentID = getLedgerReportRequest.ParentID;
                    obj.DebitAmount = (decimal?)(paidAmount) ?? 0;
                    allLedgerList.Add(obj);

                    //Claculate Invoice Amount from InvoiceDetails Table
                    IQueryable<Entity.Agency.InvoiceDetails> invoiceDetails = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID &&
                    Check.ParentID == getLedgerReportRequest.ParentID && Check.IsDeleted == false);
                    decimal InvoiceAmountSum = 0;
                    InvoiceAmountSum = invoiceDetails.Sum(a => a.InvoiceAmount);
                    allLedgerList[0].Amount = InvoiceAmountSum;
                    allLedgerList[0].BalanceAmount = InvoiceAmountSum - allLedgerList[0].DebitAmount;
                }
                else
                {
                    IQueryable<Entity.Parent.ParentStudentMapping> parentStudents = _parentStudentMappingRepository.GetAll().Where(check => check.ParentID == getLedgerReportRequest.ParentID &&
                    check.IsDeleted == false);
                    var studentresult = parentStudents.Select(s => s.StudentID).ToList();
                    IQueryable<Entity.Student.Student> studentsDetails = _studentRepository.GetAll().Where(check => studentresult.Contains(check.Id) && check.IsDeleted == false);
                    var student = studentsDetails.Select(s => s.Id).ToList();
                    var ParentID = parentresult[0].AddedByID;

                    //Claculate Debit Amount from PamentDetails Table
                    paidAmount = 0;
                    obj = new ReportViewModel();
                    IQueryable<Entity.Agency.PayementDetails> payementCollection = _payementDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID
                    && Check.ParentID == ParentID && !Check.IsDeleted && student.Contains(Check.StudentID)).OrderBy(s => s.InvoiceDetailsID);

                    var TotalAmount = payementCollection.Sum(a => a.TotalAmount);
                    var BalanceAmount = payementCollection.Sum(a => a.BalanceAmount);
                    var DiscountAmount = payementCollection.Sum(a => a.DiscountAmount);
                    paidAmount = TotalAmount - BalanceAmount - DiscountAmount;
                    obj.ParentID = getLedgerReportRequest.ParentID;
                    obj.DebitAmount = (decimal?)(paidAmount) ?? 0;
                    allLedgerList.Add(obj);

                    //Claculate Invoice Amount from InvoiceDetails Table
                    IQueryable<Entity.Agency.InvoiceDetails> invoiceDetails = _invoiceDetailsRepository.GetAll().Where(Check => Check.AgencyID == getLedgerReportRequest.AgencyID &&
                    Check.ParentID == ParentID && Check.IsDeleted == false && student.Contains(Check.StudentID));
                    decimal InvoiceAmountSum = 0;
                    InvoiceAmountSum = invoiceDetails.Sum(a => a.InvoiceAmount);
                    allLedgerList[0].Amount = InvoiceAmountSum;
                    allLedgerList[0].BalanceAmount = InvoiceAmountSum - allLedgerList[0].DebitAmount;

                }

                //AssociateChild
                int pid = Convert.ToInt32(getLedgerReportRequest.ParentID);
                string query = "parentassociatedchild";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("parent_id", pid, DbType.Int32, ParameterDirection.Input);

                IEnumerable<ParentStudentMappingViewModel> AssociatedChild = await _baserepository.GetAsync<ParentStudentMappingViewModel>(query, parameters, CommandType.StoredProcedure);
                AssociatedChild = AssociatedChild.ToList();
                var result = AssociatedChild.GroupBy(p => p.ParentID).Select(p => p.First()).OrderBy(o => o.ParentID).Where(p => p.ParentID == getLedgerReportRequest.ParentID).ToList();
                foreach (var r in result)
                {
                    var studentName = AssociatedChild.Where(p => p.ParentID == r.ParentID).Select(p => p.FirstName).ToArray();
                    r.StudentNames = string.Join(", ", studentName);
                }
                var k = 0;
                for (int i = 0; i < allLedgerList.Count; i++)
                {
                    if (k < result.Count())
                    {
                        if (allLedgerList[i].ParentID == result[k].ParentID)
                        {
                            allLedgerList[i].StudentNames = result[k].StudentNames;
                            k++;
                        }
                    }
                }

                res.Data = allLedgerList;
                res.StudentNames = allLedgerList[0].StudentNames;
                res.TotalRows = allLedgerList.Count();
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Balance list has been feteched";
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

        public ResponseViewModal SaveRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = StripeKeySettings.APIKeySettings;
            string Customer_ID = "";
            string BankAccount_ID = "";
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (recurringPaymentRequest.AgencyID > 0)
                    {
                        IQueryable<Entity.Masters.ACHInformation> selectedACHInformation = _achInformationRepository.GetAll().Where(check => check.AgencyID == recurringPaymentRequest.AgencyID
                        && check.ParentID == recurringPaymentRequest.ParentID && check.IsDeleted == false).OrderByDescending(check => check.Id);
                        if (selectedACHInformation.Count() == 0)
                        {
                            daycaredb.Rollback();
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            res.Message = "No Bank account added for ACH.";
                            res.IsSuccess = false;
                            return res;
                        }
                        else
                        {
                            List<ACHInformation> achInformationList = selectedACHInformation.ToList();
                            if (achInformationList[0].Status != 2)
                            {
                                daycaredb.Rollback();
                                res.StatusCode = (long)HttpStatusCodes.PartialContent;
                                res.Message = "Bank account for ACH is not verified.";
                                res.IsSuccess = false;
                                return res;
                            }
                            Customer_ID = achInformationList[0].CustomerID;
                            BankAccount_ID = achInformationList[0].BankAccountID;
                        }

                        StripeDetails stripeObj = null;
                        stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == recurringPaymentRequest.AgencyID && !x.IsDeleted);
                        var StripeKey = stripeObj.AccessToken;

                        long id = 0;
                        IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(check => check.Id == recurringPaymentRequest.ParentID);
                        var parentresult = parentDetails.ToList();
                        if (parentresult[0].IsParent != true)
                        {
                            recurringPaymentRequest.AddedParentID = parentresult[0].AddedByID;
                        }
                        else
                        {
                            recurringPaymentRequest.AddedParentID = recurringPaymentRequest.ParentID;
                        }
                        RecurringPayment recurringPayment = new RecurringPayment();
                        if (recurringPaymentRequest.AgencyID != 0 && recurringPaymentRequest.Id == 0)
                        {
                            recurringPaymentRequest.IsActive = true;
                            recurringPaymentRequest.IsDeleted = false;
                            recurringPaymentRequest.CreatedBy = recurringPaymentRequest.AgencyID;
                            recurringPaymentRequest.CreatedDate = DateTime.UtcNow;
                            recurringPaymentRequest.AgencyID = recurringPaymentRequest.AgencyID;
                            recurringPaymentRequest.ParentID = recurringPaymentRequest.ParentID;
                            recurringPaymentRequest.Amount = Math.Round(recurringPaymentRequest.Amount, 2);
                            recurringPaymentRequest.PaymentFromDate = recurringPaymentRequest.PaymentFromDate;
                            recurringPaymentRequest.PaymentToDate = recurringPaymentRequest.PaymentToDate.Date;
                            recurringPaymentRequest.PaymentDate = DateTime.UtcNow;
                            recurringPaymentRequest.FirstPaymentDate = recurringPaymentRequest.PaymentFromDate;
                            recurringPaymentRequest.NextPaymentDate = recurringPaymentRequest.PaymentFromDate;
                            //recurringPaymentRequest.PreviousPaymentDate = recurringPaymentRequest.PreviousPaymentDate;
                            recurringPaymentRequest.BillingCycle = recurringPaymentRequest.BillingCycle;
                            recurringPaymentRequest.CustomerID = Customer_ID;
                            recurringPaymentRequest.AgencyApikey = StripeKey;

                            Mapper.Map(recurringPaymentRequest, recurringPayment);
                            _recurringPaymentRepository.Create(recurringPayment);
                            _recurringPaymentRepository.SaveChanges();
                            id = recurringPayment.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Recurring Payement Add Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }

                        else if (recurringPaymentRequest.Id > 0 && recurringPaymentRequest.IsDeleted == true)
                        {
                            recurringPayment = _recurringPaymentRepository.Get(x => x.Id == recurringPaymentRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(recurringPayment, null) && !ReferenceEquals(recurringPayment, null))
                            {
                                recurringPayment.IsDeleted = recurringPaymentRequest.IsDeleted;
                                recurringPayment.DeletedBy = recurringPaymentRequest.DeletedBy;
                                recurringPayment.DeletedDate = DateTime.UtcNow;
                                recurringPayment.NextPaymentDate = null;

                                _recurringPaymentRepository.SaveChanges();
                                res.Message = "Recurring Payment Information has been deleted.";
                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }

                        else if (recurringPaymentRequest.Id > 0)
                        {
                            recurringPayment = _recurringPaymentRepository.Get(x => x.Id == recurringPaymentRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(recurringPayment, null))
                            {
                                recurringPayment.AgencyID = recurringPaymentRequest.AgencyID;
                                recurringPayment.ParentID = recurringPaymentRequest.ParentID;
                                recurringPayment.Amount = Math.Round(recurringPaymentRequest.Amount, 2);
                                recurringPayment.PaymentFromDate = recurringPaymentRequest.PaymentFromDate;
                                recurringPayment.PaymentToDate = recurringPaymentRequest.PaymentToDate.Date;
                                recurringPayment.PaymentDate = DateTime.UtcNow;
                                recurringPayment.FirstPaymentDate = recurringPaymentRequest.FirstPaymentDate;
                                recurringPayment.NextPaymentDate = recurringPaymentRequest.FirstPaymentDate;
                                //recurringPaymentRequest.PreviousPaymentDate = recurringPaymentRequest.PreviousPaymentDate;
                                recurringPayment.BillingCycle = recurringPaymentRequest.BillingCycle;

                                _recurringPaymentRepository.SaveChanges();
                                daycaredb.Commit();

                                res.IsSuccess = true;
                                res.Message = "Recurring Payment Information has been updated.";
                                res.StatusCode = (long)HttpStatusCodes.OK;

                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveACHInformationByParentID(BankDetailsViewModel bankDetailsRequest)
        {
            ACHInformationViewModel achInformationRequest = new ACHInformationViewModel();
            ResponseViewModal res = new ResponseViewModal();
            string APIValue = "";
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long AddedParentID = 0;
                    long id = 0;
                    if (bankDetailsRequest.AgencyID > 0 && bankDetailsRequest.Id == 0)
                    {
                        // Get Agency Stripe Key.
                        StripeDetails stripeObj = null;
                        stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == bankDetailsRequest.AgencyID && !x.IsDeleted);
                        if (stripeObj == null)
                        {
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Stripe account do not exist for the agency.";
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            return res;
                        }

                        APIValue = stripeObj.AccessToken;

                        ACHInformation achInformation = new ACHInformation();
                        if (bankDetailsRequest.Id == 0)
                        {
                            StripeConfiguration.SetApiKey(APIValue);
                            StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);

                            //Step1. Create Bank Token
                            var bankTokenoptions = new StripeTokenCreateOptions
                            {
                                BankAccount = new BankAccountOptions
                                {
                                    Country = ConstantString.Country,
                                    Currency = ConstantString.Currency,
                                    AccountHolderName = bankDetailsRequest.AccountHolderName,   //"Jenny Rosen"
                                    AccountHolderType = bankDetailsRequest.AccountType,   //"individual"
                                    RoutingNumber = bankDetailsRequest.RoutingNumber,   //"110000000"  //static
                                    AccountNumber = bankDetailsRequest.AccountNumber   //"000123456789"
                                }
                            };

                            var banktokenservice = new StripeTokenService();
                            var BankToken = banktokenservice.Create(bankTokenoptions);

                            var token = BankToken.Id;
                            var bankaccount_id = BankToken.StripeBankAccount.Id;

                            //Step2. Create Customer
                            var customerOption = new StripeCustomerCreateOptions
                            {
                                Description = bankDetailsRequest.AccountHolderName,       //   customer email id or customer name
                                SourceToken = token, // get the bank token submitted by the form
                            };
                            var customerservice = new StripeCustomerService();
                            var customer = customerservice.Create(customerOption);

                            var customer_id = customer.Id;

                            // Save Information in Database
                            IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(check => check.Id == bankDetailsRequest.ParentID);
                            var parentresult = parentDetails.ToList();
                            if (parentresult[0].IsParent != true)
                            {
                                AddedParentID = parentresult[0].AddedByID;
                            }
                            else
                            {
                                AddedParentID = bankDetailsRequest.ParentID;
                            }

                            achInformation = _achInformationRepository.Get(x => x.ParentID == bankDetailsRequest.ParentID && !x.IsDeleted);

                            if (!ReferenceEquals(achInformation, null))
                            {
                                achInformation.Status = 1;
                                achInformation.CustomerID = customer_id;
                                achInformation.CustomerToken = token;
                                achInformation.BankAccountID = bankaccount_id;
                                achInformation.UpdatedDate = DateTime.Now;
                                achInformation.UpdatedBy = bankDetailsRequest.ParentID;
                                achInformation.AgencyApiKey = APIValue;
                                achInformation.AddDate = DateTime.Now;
                                achInformation.AddedParentID = AddedParentID;

                                _achInformationRepository.SaveChanges();

                                IQueryable<Entity.Masters.RecurringPayment> selectedRecurringPayment = _recurringPaymentRepository.GetAll().Where(check => check.AgencyID == bankDetailsRequest.AgencyID
                                && check.ParentID == bankDetailsRequest.ParentID && check.IsDeleted == false);
                                if (selectedRecurringPayment.Count() != 0)
                                {
                                    List<RecurringPayment> listRecurringPayment = selectedRecurringPayment.ToList();
                                    for (int i = 0; i < listRecurringPayment.Count(); i++)
                                    {
                                        listRecurringPayment[i].IsDeleted = true;
                                        listRecurringPayment[i].DeletedBy = bankDetailsRequest.DeletedBy;
                                        listRecurringPayment[i].DeletedDate = DateTime.UtcNow;
                                    }
                                    _recurringPaymentRepository.SaveChanges();
                                }

                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.Message = "ACH Account Added Successfully. Please verify your account.";
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                            else
                            {
                                ACHInformation achInformations = new ACHInformation();
                                achInformationRequest.IsActive = true;
                                achInformationRequest.IsDeleted = false;
                                achInformationRequest.CreatedBy = bankDetailsRequest.AgencyID;
                                achInformationRequest.CreatedDate = DateTime.UtcNow;
                                achInformationRequest.AgencyID = bankDetailsRequest.AgencyID;
                                achInformationRequest.ParentID = bankDetailsRequest.ParentID;
                                achInformationRequest.CustomerID = customer_id;
                                achInformationRequest.CustomerToken = token;
                                achInformationRequest.AgencyApiKey = APIValue;
                                achInformationRequest.BankAccountID = bankaccount_id;
                                achInformationRequest.AddDate = DateTime.UtcNow;
                                achInformationRequest.Status = 1;
                                achInformationRequest.AgencyApiKey = APIValue;
                                achInformationRequest.AddedParentID = AddedParentID;

                                Mapper.Map(achInformationRequest, achInformations);
                                _achInformationRepository.Create(achInformations);
                                _achInformationRepository.SaveChanges();

                                IQueryable<Entity.Masters.RecurringPayment> selectedRecurringPayment = _recurringPaymentRepository.GetAll().Where(check => check.AgencyID == bankDetailsRequest.AgencyID
                                && check.ParentID == bankDetailsRequest.ParentID && check.IsDeleted == false);
                                if (selectedRecurringPayment.Count() != 0)
                                {
                                    List<RecurringPayment> listRecurringPayment = selectedRecurringPayment.ToList();
                                    for (int i = 0; i < listRecurringPayment.Count(); i++)
                                    {
                                        listRecurringPayment[i].IsDeleted = true;
                                        listRecurringPayment[i].DeletedBy = bankDetailsRequest.DeletedBy;
                                        listRecurringPayment[i].DeletedDate = DateTime.UtcNow;
                                    }
                                    _recurringPaymentRepository.SaveChanges();
                                }

                                id = achInformations.Id;

                                if (id > 0)
                                {
                                    res.IsSuccess = true;
                                    res.SaveId = id;
                                    res.Message = "ACH Account Added Successfully. Please verify your account.";
                                    daycaredb.Commit();
                                    res.StatusCode = (long)HttpStatusCodes.OK;
                                }
                            }
                        }
                    }
                    else if (bankDetailsRequest.AgencyID > 0 && bankDetailsRequest.IsDeleted == true)
                    {
                        ACHInformation achInformation = new ACHInformation();
                        achInformation = _achInformationRepository.Get(x => x.Id == bankDetailsRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(achInformation, null) && !ReferenceEquals(achInformation, null))
                        {
                            achInformation.IsDeleted = bankDetailsRequest.IsDeleted;
                            achInformation.DeletedBy = bankDetailsRequest.DeletedBy;
                            achInformation.DeletedDate = DateTime.UtcNow;

                            _achInformationRepository.SaveChanges();

                            IQueryable<Entity.Masters.RecurringPayment> selectedRecurringPayment = _recurringPaymentRepository.GetAll().Where(check => check.AgencyID == bankDetailsRequest.AgencyID
                            && check.ParentID == bankDetailsRequest.ParentID && check.IsDeleted == false);
                            if (selectedRecurringPayment.Count() != 0)
                            {
                                List<RecurringPayment> listRecurringPayment = selectedRecurringPayment.ToList();
                                for (int i = 0; i < listRecurringPayment.Count(); i++)
                                {
                                    listRecurringPayment[i].IsDeleted = true;
                                    listRecurringPayment[i].DeletedBy = bankDetailsRequest.DeletedBy;
                                    listRecurringPayment[i].DeletedDate = DateTime.UtcNow;
                                }
                                _recurringPaymentRepository.SaveChanges();
                            }

                            res.Message = "ACH bank account has been deleted.";
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetACHInformationByParentID(ACHInformationViewModel achInformationRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (achInformationRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Masters.ACHInformation> selectedACHInformation = _achInformationRepository.GetAll().Where(check => check.AgencyID == achInformationRequest.AgencyID
                    && check.ParentID == achInformationRequest.ParentID && check.IsDeleted == false);
                    IQueryable<Entity.Parent.Parent> selectParent = _parentRepository.GetAll().Where(check => !check.IsDeleted && check.Id == achInformationRequest.ParentID);

                    List<ACHInformationViewModel> achInformation = new List<ACHInformationViewModel>();

                    achInformation = (from ACHInformationObj in selectedACHInformation
                                      join ParentObj in selectParent on ACHInformationObj.ParentID equals ParentObj.Id
                                      where (achInformationRequest.AgencyID == ACHInformationObj.AgencyID)
                                      select new ACHInformationViewModel()
                                      {
                                          Id = ACHInformationObj.Id,
                                          ParentName = ParentObj.ParentName,
                                          AgencyID = ACHInformationObj.AgencyID,
                                          ParentID = ACHInformationObj.ParentID,
                                          CustomerID = ACHInformationObj.CustomerID,
                                          BankAccountID = ACHInformationObj.BankAccountID,
                                          CustomerToken = ACHInformationObj.CustomerToken,
                                          Status = ACHInformationObj.Status,
                                          AddDate = ACHInformationObj.AddDate
                                      }).OrderBy(c => c.ParentID).ToList();

                    res.Data = achInformation;
                    res.TotalRows = achInformation.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "ACH Information is successfully fetched.";
                }
                else
                {
                    res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
            }
            return res;
        }

        public ResponseViewModal GetRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (recurringPaymentRequest.AgencyID > 0)
                {
                    IQueryable<Entity.Masters.RecurringPayment> selectedRecurringPayment = _recurringPaymentRepository.GetAll().Where(check => check.AgencyID == recurringPaymentRequest.AgencyID
                    && check.ParentID == recurringPaymentRequest.ParentID && check.IsDeleted == false);

                    List<RecurringPaymentViewModel> recurringPayment = new List<RecurringPaymentViewModel>();

                    recurringPayment = (from RecurringPaymentObj in selectedRecurringPayment
                                        where (recurringPaymentRequest.AgencyID == RecurringPaymentObj.AgencyID)
                                        select new RecurringPaymentViewModel()
                                        {
                                            Id = RecurringPaymentObj.Id,
                                            AgencyID = RecurringPaymentObj.AgencyID,
                                            ParentID = RecurringPaymentObj.ParentID,
                                            Amount = RecurringPaymentObj.Amount,
                                            BillingCycle = RecurringPaymentObj.BillingCycle,
                                            PaymentFromDate = RecurringPaymentObj.PaymentFromDate,
                                            PaymentToDate = RecurringPaymentObj.PaymentToDate,
                                            FirstPaymentDate = RecurringPaymentObj.FirstPaymentDate,
                                            NextPaymentDate = RecurringPaymentObj.NextPaymentDate,
                                        }).OrderBy(c => c.Id).ToList();

                    res.Data = recurringPayment;
                    res.TotalRows = recurringPayment.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Recurring Payment is successfully fetched.";
                }
                else
                {
                    res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
            }
            return res;
        }

        public ResponseViewModal VerifyACHBankAccountByParentID(BankDetailsViewModel bankDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            ACHInformation achInformation = new ACHInformation();
            //string APIValue = StripeKeySettings.APIKeySettings;
            string APIValue = "";
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (bankDetailsRequest.AgencyID > 0)
                    {
                        StripeDetails stripeObj = null;
                        stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == bankDetailsRequest.AgencyID && !x.IsDeleted);
                        if (stripeObj == null)
                        {
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Stripe bank account do not exist for the agency.";
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            return res;
                        }

                        APIValue = stripeObj.AccessToken;

                        StripeConfiguration.SetApiKey(APIValue);
                        StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);

                        IQueryable<Entity.Masters.ACHInformation> selectedACHInformation = _achInformationRepository.GetAll().Where(check => check.AgencyID == bankDetailsRequest.AgencyID
                        && check.ParentID == bankDetailsRequest.ParentID && check.IsDeleted == false).OrderByDescending(check => check.Id);
                        List<ACHInformation> achInformationList = selectedACHInformation.ToList();

                        var CustomerID = achInformationList[0].CustomerID;
                        var CustomerToken = achInformationList[0].CustomerToken;
                        var BankAccountID = achInformationList[0].BankAccountID;
                        var AgencyApiKey = achInformationList[0].AgencyApiKey;

                        var stringAmountOne = Convert.ToString(bankDetailsRequest.AmountFirst);
                        var StringamountTwo = Convert.ToString(bankDetailsRequest.AmountSecond);

                        var amountOne = stringAmountOne.Substring(stringAmountOne.LastIndexOf(".") + 1);
                        var amountTwo = StringamountTwo.Substring(StringamountTwo.LastIndexOf(".") + 1);

                        int amountOne1 = int.Parse(amountOne);
                        int amountTwo2 = int.Parse(amountTwo);

                        // Verify BankAccount
                        var bankverifyoptions = new BankAccountVerifyOptions
                        {
                            AmountOne = amountOne1, // 32 
                            AmountTwo = amountTwo2  // 45
                        };
                        var bankverifyservice = new BankAccountService();
                        var bankverify = bankverifyservice.Verify(CustomerID, //customer id
                            BankAccountID, //bankaccount id
                            bankverifyoptions
                        );

                        if (bankverify.Status == "verified")
                        {
                            achInformation = _achInformationRepository.Get(x => x.Id == achInformationList[0].Id && !x.IsDeleted);
                            if (!ReferenceEquals(achInformation, null))
                            {
                                achInformation.Status = 2;
                                achInformation.UpdatedDate = DateTime.Now;

                                _achInformationRepository.SaveChanges();

                                daycaredb.Commit();
                                res.IsSuccess = true;
                                res.Message = "Account verified successfully.";
                                res.StatusCode = (long)HttpStatusCodes.OK;

                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "The amounts provided do not match the amounts that were sent to the bank account.";
                }
            }
            return res;
        }

        public ResponseViewModal OneTimePaymentByACH(OneTimePaymentViewModel oneTimePaymentRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            ACHInformation achInformation = new ACHInformation();
            //string APIValue = StripeKeySettings.APIKeySettings;
            string APIValue = "";
            long ParentID = 0;
            long id = 0;
            PayementDetails paymentDetailsAccount = new PayementDetails();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    PaymentDetailsViewModel payementDetailsRequest = new PaymentDetailsViewModel();
                    IQueryable<Entity.Parent.Parent> parentDetails = _parentRepository.GetAll().Where(check => check.Id == oneTimePaymentRequest.ParentID);
                    var parentresult = parentDetails.ToList();
                    if (parentresult[0].IsParent != true)
                    {
                        ParentID = parentresult[0].AddedByID;
                    }
                    else
                    {
                        ParentID = oneTimePaymentRequest.ParentID;
                    }

                    if (oneTimePaymentRequest.AgencyID > 0)
                    {
                        // Get Agency Stripe Key For Payment
                        StripeDetails stripeObj = null;
                        stripeObj = _stripeDetailsRepository.Get(x => x.AgencyID == oneTimePaymentRequest.AgencyID && !x.IsDeleted);
                        if (stripeObj == null)
                        {
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Stripe account do not exist for the agency";
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            return res;
                        }

                        APIValue = stripeObj.AccessToken;

                        IQueryable<Entity.Agency.InvoiceDetails> inv_Obj1 = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == oneTimePaymentRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted);
                        if (inv_Obj1.Count() == 0)
                        {
                            res.IsSuccess = false;
                            res.Message = "No invoice found for payment.";
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            return res;
                        }

                        StripeConfiguration.SetApiKey(APIValue);
                        StripeOAuthTokenService service = new StripeOAuthTokenService(APIValue);

                        IQueryable<Entity.Masters.ACHInformation> selectedACHInformation = _achInformationRepository.GetAll().Where(check => check.AgencyID == oneTimePaymentRequest.AgencyID
                        && check.ParentID == oneTimePaymentRequest.ParentID && check.IsDeleted == false).OrderByDescending(check => check.Id);
                        if (selectedACHInformation.Count() == 0)
                        {
                            daycaredb.Rollback();
                            res.StatusCode = (long)HttpStatusCodes.NoContent;
                            res.Message = "ACH bank account not added.";
                            res.IsSuccess = false;
                            return res;
                        }

                        List<ACHInformation> achInformationList = selectedACHInformation.ToList();
                        if (achInformationList[0].Status != 2)
                        {
                            res.IsSuccess = false;
                            res.Message = "ACH bank account do not verified.";
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.PartialContent;
                            return res;
                        }

                        var CustomerID = achInformationList[0].CustomerID;
                        var CustomerToken = achInformationList[0].CustomerToken;
                        var BankAccountID = achInformationList[0].BankAccountID;
                        var AgencyApiKey = achInformationList[0].AgencyApiKey;

                        // Generate Charge
                        var bankchargeoption = new StripeChargeCreateOptions
                        {
                            Amount = oneTimePaymentRequest.Amount * 100,
                            Currency = ConstantString.Currency,
                            CustomerId = CustomerID,   //customer id
                        };
                        var bankchargeservice = new StripeChargeService();
                        var bankcharge = bankchargeservice.Create(bankchargeoption);

                        if (parentresult[0].IsParent != true)
                        {
                            IQueryable<Entity.Parent.ParentStudentMapping> parentStudents = _parentStudentMappingRepository.GetAll().Where(check => check.ParentID == oneTimePaymentRequest.ParentID &&
                           check.IsDeleted == false);
                            var studentresult = parentStudents.Select(s => s.StudentID).ToList();
                            IQueryable<Entity.Student.Student> studentsDetails = _studentRepository.GetAll().Where(check => studentresult.Contains(check.Id) && check.IsDeleted == false);
                            var student = studentsDetails.Select(s => s.Id).ToList();
                            IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == oneTimePaymentRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted && student.Contains(x.StudentID));
                            if (inv_Obj.Count() != 0)
                            {
                                var list = inv_Obj.Select(s => new { s.StudentID, s.Id }).ToList().OrderByDescending(s => s.Id).First();
                                payementDetailsRequest.StudentID = list.StudentID;
                            }
                            else
                            {
                                IQueryable<Entity.Agency.InvoiceDetails> inv_Obj3 = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == oneTimePaymentRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted);
                                var list = inv_Obj3.Select(s => new { s.StudentID, s.Id }).ToList().OrderByDescending(s => s.Id).First();
                                payementDetailsRequest.StudentID = list.StudentID;
                            }
                            IQueryable<Entity.Agency.InvoiceDetails> inv_Obj2 = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == oneTimePaymentRequest.AgencyID && x.ParentID == ParentID && !x.IsDeleted);
                            if (inv_Obj.Count() != 0)
                            {
                                var list2 = inv_Obj2.Select(s => new { s.AgencyID, s.Id, s.InvoiceDate, s.InvoiceFromDate, s.InvoiceToDate, s.StudentID }).ToList().OrderByDescending(s => s.Id).First();
                                payementDetailsRequest.InvoiceDetailsID = list2.Id;
                                payementDetailsRequest.PaymentFromDate = list2.InvoiceFromDate;
                                payementDetailsRequest.PaymentToDate = list2.InvoiceToDate;
                                payementDetailsRequest.PaymentComment = "Payment By Secondary Parent";
                            }
                        }
                        else
                        {
                            IQueryable<Entity.Agency.InvoiceDetails> inv_Obj = _invoiceDetailsRepository.GetAll().Where(x => x.AgencyID == oneTimePaymentRequest.AgencyID && x.ParentID == oneTimePaymentRequest.ParentID && !x.IsDeleted);
                            if (inv_Obj.Count() != 0)
                            {
                                var list = inv_Obj.Select(s => new { s.AgencyID, s.Id, s.InvoiceDate, s.InvoiceFromDate, s.InvoiceToDate, s.StudentID }).ToList().OrderByDescending(s => s.Id).First();
                                payementDetailsRequest.InvoiceDetailsID = list.Id;
                                payementDetailsRequest.StudentID = list.StudentID;
                                payementDetailsRequest.PaymentFromDate = list.InvoiceFromDate;
                                payementDetailsRequest.PaymentToDate = list.InvoiceToDate;
                                payementDetailsRequest.PaymentComment = "Payment By Parent";
                            }
                        }

                        if (bankcharge.Outcome.SellerMessage == "Payment complete.")
                        {
                            payementDetailsRequest.StripeDetailsID = 0;
                            payementDetailsRequest.AgencyID = oneTimePaymentRequest.AgencyID;
                            payementDetailsRequest.ParentID = ParentID;
                            payementDetailsRequest.TotalAmount = oneTimePaymentRequest.Amount;
                            payementDetailsRequest.AmoutPaid = oneTimePaymentRequest.Amount;
                            payementDetailsRequest.BalanceAmount = 0;
                            payementDetailsRequest.PaymentDate = DateTime.UtcNow;
                            payementDetailsRequest.IsActive = true;
                            payementDetailsRequest.IsDeleted = false;
                            payementDetailsRequest.CreatedBy = oneTimePaymentRequest.ParentID;
                            payementDetailsRequest.CreatedDate = DateTime.UtcNow;
                            payementDetailsRequest.IsOffline = false;
                            payementDetailsRequest.PaymentType = "Online";
                            payementDetailsRequest.PaymentDescription = "ACH Payment-Online";
                            payementDetailsRequest.AdvanceAmount = 0;
                            Mapper.Map(payementDetailsRequest, paymentDetailsAccount);
                            _payementDetailsRepository.Create(paymentDetailsAccount);
                            _payementDetailsRepository.SaveChanges();
                            id = paymentDetailsAccount.Id;
                            if (id > 0)
                            {
                                InvoiceDetails invObj = new InvoiceDetails();
                                invObj = _invoiceDetailsRepository.Get(x => x.AgencyID == payementDetailsRequest.AgencyID && x.Id == payementDetailsRequest.InvoiceDetailsID && !x.IsDeleted);
                                if (!ReferenceEquals(invObj, null))
                                {
                                    invObj.IsInvoicePaid = true;
                                    invObj.UpdatedBy = payementDetailsRequest.UpdatedBy;
                                    invObj.UpdatedDate = DateTime.UtcNow;
                                    _invoiceDetailsRepository.SaveChanges();
                                }
                            }
                            res.IsSuccess = true;
                            res.SaveId = id;
                            res.Message = "Payement done successfully.";
                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.OK;

                        }
                    }
                }
                catch (Exception ex)
                {
                    res.IsSuccess = false;
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                }
            }
            return res;
        }


        // Restricted Person 
        public ResponseViewModal SaveRestrictedPersonDetails(RestrictedPersonViewModel saveRestrictedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long Id = 0;
            RestrictedPerson apObj = null;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    // For Add Record
                    if (saveRestrictedPersonInfoRequest.isaddMode == true && saveRestrictedPersonInfoRequest.IsDeleted == false)
                    {
                        IQueryable<Entity.Masters.RestrictedPerson> restrictedPersonDetails = _restrictedPersonRepository.GetAll().Where(Check => Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID && Check.IsDeleted == false);

                        if (saveRestrictedPersonInfoRequest.EmailId == " " || saveRestrictedPersonInfoRequest.EmailId == null || saveRestrictedPersonInfoRequest.EmailId == "")
                        {
                            var RestrictedPersonName = saveRestrictedPersonInfoRequest.RestrictedPersonName.TrimStart();
                            RestrictedPersonName = RestrictedPersonName.TrimEnd();

                            var restrictedPersonDetailByName = (from APDObj in restrictedPersonDetails
                                                                where APDObj.RestrictedPersonName.ToUpper() == RestrictedPersonName.ToUpper()
                                                                && APDObj.ParentID == saveRestrictedPersonInfoRequest.ParentID && APDObj.IsDeleted == false
                                                                select new RestrictedPersonViewModel()
                                                                {
                                                                    RestrictedPersonName = APDObj.RestrictedPersonName,
                                                                }).ToList();

                            if (restrictedPersonDetailByName.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Restricted Person Name Allready Exist.";
                                return res;
                            }
                        }

                        if (!(saveRestrictedPersonInfoRequest.EmailId == " " || saveRestrictedPersonInfoRequest.EmailId == null || saveRestrictedPersonInfoRequest.EmailId == ""))
                        {
                            var restrictedPersonDetailByEmail = (from APDObj in restrictedPersonDetails
                                                                 where (APDObj.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper())
                                                                 && (APDObj.IsDeleted == false)
                                                                 select new RestrictedPersonViewModel()
                                                                 {
                                                                     EmailId = APDObj.EmailId,
                                                                 }).ToList();

                            var RestrictedPersonNamee = saveRestrictedPersonInfoRequest.RestrictedPersonName.TrimStart();
                            RestrictedPersonNamee = RestrictedPersonNamee.TrimEnd();

                            var restrictedPersonDetailByName = (from APDObj in restrictedPersonDetails
                                                                where APDObj.RestrictedPersonName.ToUpper() == RestrictedPersonNamee.ToUpper()
                                                                && APDObj.ParentID == saveRestrictedPersonInfoRequest.ParentID && APDObj.IsDeleted == false
                                                                select new RestrictedPersonViewModel()
                                                                {
                                                                    RestrictedPersonName = APDObj.RestrictedPersonName,
                                                                }).ToList();

                            if (restrictedPersonDetailByName.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Restricted Person Name Allready Exist.";
                                return res;
                            }

                            if (restrictedPersonDetailByEmail.Count > 0)
                            {
                                res.StatusCode = 987;
                                res.Message = "Email Allready Exist.";
                                return res;
                            }
                        }

                        if (saveRestrictedPersonInfoRequest.ParentID > 0)
                        {
                            Random random = new Random();
                            int num = random.Next(1, 999999999);
                            string CommonID = saveRestrictedPersonInfoRequest.AgencyID + "-" + saveRestrictedPersonInfoRequest.ParentID + "-" + DateTime.Now.ToString("yyyyMMdd") + "-" + num;

                            foreach (var StudentId in saveRestrictedPersonInfoRequest.StudentIDs)
                            {
                                saveRestrictedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                saveRestrictedPersonInfoRequest.IsActive = true;
                                saveRestrictedPersonInfoRequest.IsDeleted = false;
                                saveRestrictedPersonInfoRequest.StudentID = StudentId;
                                saveRestrictedPersonInfoRequest.CommonID = CommonID;
                                apObj = Mapper.Map<RestrictedPerson>(saveRestrictedPersonInfoRequest);
                                _restrictedPersonRepository.Create(apObj);
                                _restrictedPersonRepository.SaveChanges();
                                Id = apObj.Id;
                            }

                            daycaredb.Commit();
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Authorized Person Save successfully.";
                            return res;
                        }
                    }

                    if (saveRestrictedPersonInfoRequest.isaddMode == false && saveRestrictedPersonInfoRequest.IsDeleted == false)
                    {
                        // For Add/Update/Delete Record

                        var restrictedPersonDetails = _restrictedPersonRepository.GetAll().Where(Check => Check.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == saveRestrictedPersonInfoRequest.CommonID && Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID && Check.IsActive == true).ToList();

                        var StudentIDS = saveRestrictedPersonInfoRequest.StudentIDs.ToList();

                        if (restrictedPersonDetails.Count() > StudentIDS.Count())
                        {
                            var RemainingStudentListIDDelete = restrictedPersonDetails.Where(x => !StudentIDS.Contains(x.StudentID)).ToList();

                            foreach (var DeleteStudentIds in RemainingStudentListIDDelete)
                            {
                                apObj = _restrictedPersonRepository.Get(Check => Check.StudentID == DeleteStudentIds.StudentID && Check.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == saveRestrictedPersonInfoRequest.CommonID && Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.IsActive = false;
                                    _restrictedPersonRepository.Update(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                }
                            }

                            foreach (var StudentIds in saveRestrictedPersonInfoRequest.StudentIDs)
                            {
                                apObj = _restrictedPersonRepository.Get(Check => Check.StudentID == StudentIds && Check.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == saveRestrictedPersonInfoRequest.CommonID && Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.UpdatedDate = DateTime.UtcNow;
                                    apObj.RestrictedPersonName = saveRestrictedPersonInfoRequest.RestrictedPersonName;
                                    apObj.Mobile = Convert.ToInt64(saveRestrictedPersonInfoRequest.Mobile);
                                    apObj.ImagePath = saveRestrictedPersonInfoRequest.ImagePath;
                                    apObj.Description = saveRestrictedPersonInfoRequest.Description;
                                    _restrictedPersonRepository.Update(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                }
                                else
                                {
                                    saveRestrictedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                    saveRestrictedPersonInfoRequest.IsActive = true;
                                    saveRestrictedPersonInfoRequest.IsDeleted = false;
                                    saveRestrictedPersonInfoRequest.StudentID = StudentIds;
                                    saveRestrictedPersonInfoRequest.CommonID = saveRestrictedPersonInfoRequest.CommonID;
                                    apObj = Mapper.Map<RestrictedPerson>(saveRestrictedPersonInfoRequest);
                                    _restrictedPersonRepository.Create(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                    Id = apObj.Id;
                                }
                            }
                        }
                        else
                        {
                            foreach (var StudentIds in saveRestrictedPersonInfoRequest.StudentIDs)
                            {
                                apObj = _restrictedPersonRepository.Get(Check => Check.StudentID == StudentIds && Check.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == saveRestrictedPersonInfoRequest.CommonID && Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID && Check.IsActive == true);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.UpdatedDate = DateTime.UtcNow;
                                    apObj.RestrictedPersonName = saveRestrictedPersonInfoRequest.RestrictedPersonName;
                                    apObj.Mobile = Convert.ToInt64(saveRestrictedPersonInfoRequest.Mobile);
                                    apObj.ImagePath = saveRestrictedPersonInfoRequest.ImagePath;
                                    apObj.Description = saveRestrictedPersonInfoRequest.Description;
                                    _restrictedPersonRepository.Update(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                }
                                else
                                {
                                    saveRestrictedPersonInfoRequest.CreatedDate = DateTime.UtcNow;
                                    saveRestrictedPersonInfoRequest.IsActive = true;
                                    saveRestrictedPersonInfoRequest.IsDeleted = false;
                                    saveRestrictedPersonInfoRequest.StudentID = StudentIds;
                                    saveRestrictedPersonInfoRequest.CommonID = saveRestrictedPersonInfoRequest.CommonID;
                                    apObj = Mapper.Map<RestrictedPerson>(saveRestrictedPersonInfoRequest);
                                    _restrictedPersonRepository.Create(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                    Id = apObj.Id;
                                }
                            }
                        }
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Restricted Person Update successfully.";
                        daycaredb.Commit();
                    }

                    if (saveRestrictedPersonInfoRequest.isaddMode == false && saveRestrictedPersonInfoRequest.IsDeleted == true)
                    {
                        // For Delete Record From AuthorizedPerson table
                        var restrictedPersonDetail = _restrictedPersonRepository.GetAll().Where(Check => Check.EmailId.ToUpper() == saveRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == saveRestrictedPersonInfoRequest.CommonID && Check.AgencyID == saveRestrictedPersonInfoRequest.AgencyID).ToList();

                        if (restrictedPersonDetail.Count > 0)
                        {
                            foreach (var RestrictedPersonID in restrictedPersonDetail)
                            {
                                apObj = _restrictedPersonRepository.Get(Check => Check.Id == RestrictedPersonID.Id);

                                if (!ReferenceEquals(apObj, null))
                                {
                                    apObj.IsDeleted = true;
                                    apObj.DeletedDate = DateTime.UtcNow;
                                    _restrictedPersonRepository.Update(apObj);
                                    _restrictedPersonRepository.SaveChanges();
                                }
                            }
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Restricted Person Deactive successfully.";
                        }
                        daycaredb.Commit();
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

        public ResponseViewModal GetRestrictedPersonDetails(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<RestrictedPersonViewModel> allRestrictedPerson = new List<RestrictedPersonViewModel>();
                IQueryable<Entity.Masters.RestrictedPerson> restrictedPerson;

                string RestrictedPersonName = getRestrictedPersonInfoRequest.RestrictedPersonName.TrimStart();
                RestrictedPersonName = RestrictedPersonName.TrimEnd();

                restrictedPerson = _restrictedPersonRepository.GetAll().Where(check => check.AgencyID == getRestrictedPersonInfoRequest.AgencyID
                 && check.ParentID == (getRestrictedPersonInfoRequest.ParentID > 0 ? getRestrictedPersonInfoRequest.ParentID : check.ParentID)
                 && check.RestrictedPersonName.ToUpper().Contains(RestrictedPersonName.ToUpper()));

                IQueryable<Entity.Parent.Parent> selectedParent = _parentRepository.GetAll().Where(Check => Check.AgencyID == getRestrictedPersonInfoRequest.AgencyID);
                IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(Check => Check.AgencyID == getRestrictedPersonInfoRequest.AgencyID);

                allRestrictedPerson = (from apObj in restrictedPerson
                                       join parentObj in selectedParent on apObj.ParentID equals parentObj.Id
                                       join studentObj in selectedStudent on apObj.StudentID equals studentObj.Id
                                       where getRestrictedPersonInfoRequest.AgencyID == studentObj.AgencyID && (apObj.IsActive == true)
                                       select new RestrictedPersonViewModel()
                                       {
                                           CommonID = apObj.CommonID,
                                           RestrictedPersonName = apObj.RestrictedPersonName,
                                           Mobile = apObj.Mobile,
                                           EmailId = apObj.EmailId,
                                           StudentName = studentObj.StudentName ?? String.Empty,
                                           AgencyID = apObj.AgencyID,
                                           ParentID = apObj.ParentID,
                                           ParentName = parentObj.ParentName ?? String.Empty,
                                           ImagePath = apObj.ImagePath ?? String.Empty,
                                           StudentID = studentObj.Id,
                                           IsDeleted = apObj.IsDeleted,
                                           Description = apObj.Description
                                       }).OrderBy(c => c.RestrictedPersonName).ToList();
                var result = allRestrictedPerson.Where(x => x.AgencyID == x.AgencyID).GroupBy(s => s.CommonID).Select(p => p.First()).ToList();
                if (result.Count > 0)
                {
                    foreach (var r in result)
                    {
                        var studentname = allRestrictedPerson.Where(p => p.CommonID == r.CommonID).Select(p => p.StudentName).ToArray();
                        r.StudentName = string.Join(",", studentname);

                        var stdid = allRestrictedPerson.Where(p => p.CommonID == r.CommonID).Select(p => p.StudentID).ToArray();
                        r.StudentIDs = stdid;
                    }

                    res.Data = result;

                    if (getRestrictedPersonInfoRequest.limit != 0)
                    {
                        res.Data = result.Skip((getRestrictedPersonInfoRequest.page) * getRestrictedPersonInfoRequest.limit).Take(getRestrictedPersonInfoRequest.limit).ToList();
                    }

                    res.TotalRows = result.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Authorized Person list has been fetched.";
                }
                else
                {
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "No Record Found.";
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

        public ResponseViewModal ActivateRestrictedPerson(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            RestrictedPerson apObj = null;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    // For Update Record From AuthorizedPerson Table
                    var restrictedPersonDetail = _restrictedPersonRepository.GetAll().Where(Check => Check.EmailId.ToUpper() == getRestrictedPersonInfoRequest.EmailId.ToUpper() && Check.CommonID == getRestrictedPersonInfoRequest.CommonID && Check.AgencyID == getRestrictedPersonInfoRequest.AgencyID).ToList();

                    if (restrictedPersonDetail.Count > 0)
                    {
                        foreach (var RestrictedPersonID in restrictedPersonDetail)
                        {
                            apObj = _restrictedPersonRepository.Get(Check => Check.Id == RestrictedPersonID.Id);

                            if (!ReferenceEquals(apObj, null))
                            {
                                apObj.IsDeleted = false;
                                apObj.UpdatedDate = DateTime.UtcNow;
                                _restrictedPersonRepository.Update(apObj);
                                _restrictedPersonRepository.SaveChanges();
                            }
                        }
                    }
                    daycaredb.Commit();
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

        // Section Videos
        public ResponseViewModal SaveSectionVideo(SectionVideoViewModel sectionVideoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                SectionVideo sectionVideo = new SectionVideo();
                try
                {
                    if (sectionVideoRequest.SectionID > 0)
                    {
                        sectionVideo = _sectionVideoRepository.Get(x => x.SectionID == sectionVideoRequest.SectionID && !x.IsDeleted);
                        if (!ReferenceEquals(sectionVideo, null))
                        {
                            sectionVideo.VideoPath = sectionVideoRequest.VideoPath;
                            sectionVideo.Title = sectionVideoRequest.Title;
                            sectionVideo.UpdatedDate = DateTime.Now;
                            sectionVideo.UpdatedBy = sectionVideoRequest.CreatedBy;

                            _sectionVideoRepository.SaveChanges();
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Section Video Added Successfully.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }
                        else
                        {
                            SectionVideo sectionVideos = new SectionVideo();
                            sectionVideoRequest.IsActive = true;
                            sectionVideoRequest.IsDeleted = false;
                            sectionVideoRequest.CreatedDate = DateTime.UtcNow;
                            sectionVideoRequest.SectionID = sectionVideoRequest.SectionID;
                            sectionVideoRequest.VideoPath = sectionVideoRequest.VideoPath;
                            sectionVideoRequest.Title = sectionVideoRequest.Title;

                            Mapper.Map(sectionVideoRequest, sectionVideos);
                            _sectionVideoRepository.Create(sectionVideos);
                            _sectionVideoRepository.SaveChanges();
                            id = sectionVideos.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Section Video Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }

                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetSectionVideo(SectionVideoViewModel sectionVideoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<SectionVideoViewModel> allSectionVideo = new List<SectionVideoViewModel>();
                IQueryable<Entity.Masters.SectionVideo> sectionVideos = _sectionVideoRepository.GetAll().Where(check => check.IsDeleted != true);
                IQueryable<Entity.Masters.Section> sections = _sectionRepository.GetAll().Where(check => check.IsDeleted != true);

                allSectionVideo = (from sectionVideoObj in sectionVideos
                                   join sectionObj in sections on sectionVideoObj.SectionID equals sectionObj.Id
                                   select new SectionVideoViewModel()
                                   {
                                       Id = sectionVideoObj.Id,
                                       SectionID = sectionVideoObj.SectionID,
                                       Title = sectionVideoObj.Title ?? String.Empty,
                                       SectionName = sectionObj.SectionName
                                   }).OrderBy(c => c.SectionName).ToList();

                res.Data = allSectionVideo;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Sections video has been successfully fetched.";
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal GetSectionList(SectionVideoViewModel sectionVideoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<SectionVideoViewModel> allSectionList = new List<SectionVideoViewModel>();
                IQueryable<Entity.Masters.Section> sections = _sectionRepository.GetAll().Where(check => check.IsDeleted != true);

                allSectionList = (from sectionObj in sections
                                  select new SectionVideoViewModel()
                                  {
                                      Id = sectionObj.Id,
                                      SectionName = sectionObj.SectionName
                                  }).OrderBy(c => c.SectionName).ToList();

                res.Data = allSectionList;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Sections List has been successfully fetched.";
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal GetVideoForSection(SectionVideoViewModel sectionVideoRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                SectionVideo sectionVideo = new SectionVideo();
                sectionVideo = _sectionVideoRepository.GetAll().Where(check => check.IsDeleted != true && check.SectionID == sectionVideoRequest.SectionID).FirstOrDefault();

                if (sectionVideo != null)
                {
                    res.FilePath = sectionVideo.VideoPath;
                }
                else
                {
                    res.FilePath = "";
                }
                res.IsSuccess = true;

                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Sections video has been successfully fetched.";
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        // Save Allergy Data By Super Admin

        public ResponseViewModal SaveAllergyName(AddAllergyViewModel addAllergyViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                AllergyName allergyName = new AllergyName();
                try
                {
                    if (addAllergyViewModel.AllergyTypeID > 0)
                    {
                        string nameofallergy = addAllergyViewModel.NameOfAllergy.TrimStart();
                        nameofallergy = nameofallergy.TrimEnd();
                        allergyName = _allergyNameRepository.Get(namecheck => namecheck.NameOfAllergy.ToUpper() == nameofallergy.ToUpper() && !namecheck.IsDeleted);
                        if (!ReferenceEquals(allergyName, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Allergy Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            AllergyName allergyNames = new AllergyName();
                            addAllergyViewModel.IsActive = true;
                            addAllergyViewModel.IsDeleted = false;
                            addAllergyViewModel.CreatedDate = DateTime.UtcNow;
                            addAllergyViewModel.AgencyID = 0;
                            addAllergyViewModel.AllergyTypeID = addAllergyViewModel.AllergyTypeID;
                            addAllergyViewModel.NameOfAllergy = addAllergyViewModel.NameOfAllergy;

                            Mapper.Map(addAllergyViewModel, allergyNames);
                            _allergyNameRepository.Create(allergyNames);
                            _allergyNameRepository.SaveChanges();
                            id = allergyNames.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Allergy Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveAllergyReactionType(AddAllergyViewModel addAllergyViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                AllergyReactionType allergyReactionType = new AllergyReactionType();
                try
                {
                    if (addAllergyViewModel.AllergyTypeID > 0)
                    {
                        string allergyReaction = addAllergyViewModel.AllergyReactionTypeName.TrimStart();
                        allergyReaction = allergyReaction.TrimEnd();
                        allergyReactionType = _allergyReactionTypeRepository.Get(namecheck => namecheck.AllergyReactionTypeName.ToUpper() == allergyReaction.ToUpper() && !namecheck.IsDeleted);
                        if (!ReferenceEquals(allergyReactionType, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Allergy Reaction Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            AllergyReactionType allergyReactionTypes = new AllergyReactionType();
                            addAllergyViewModel.IsActive = true;
                            addAllergyViewModel.IsDeleted = false;
                            addAllergyViewModel.CreatedDate = DateTime.UtcNow;
                            addAllergyViewModel.AgencyID = 0;
                            addAllergyViewModel.AllergyTypeID = addAllergyViewModel.AllergyTypeID;
                            addAllergyViewModel.AllergyReactionTypeName = addAllergyViewModel.AllergyReactionTypeName;

                            Mapper.Map(addAllergyViewModel, allergyReactionTypes);
                            _allergyReactionTypeRepository.Create(allergyReactionTypes);
                            _allergyReactionTypeRepository.SaveChanges();
                            id = allergyReactionTypes.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Allergy Reaction Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal SaveAllergyType(AddAllergyViewModel addAllergyViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                AllergyType allergyType = new AllergyType();
                try
                {
                    if (addAllergyViewModel.AllergyTypeID == 0)
                    {
                        string allergyTypeName = addAllergyViewModel.AllergyTypeName.TrimStart();
                        allergyTypeName = allergyTypeName.TrimEnd();
                        allergyType = _allergyTypeRepository.Get(namecheck => namecheck.AllergyTypeName.ToUpper() == allergyTypeName.ToUpper() && !namecheck.IsDeleted);
                        if (!ReferenceEquals(allergyType, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Allergy Type Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            AllergyType allergyTypes = new AllergyType();
                            addAllergyViewModel.IsActive = true;
                            addAllergyViewModel.IsDeleted = false;
                            addAllergyViewModel.CreatedDate = DateTime.UtcNow;
                            addAllergyViewModel.AgencyID = 0;
                            addAllergyViewModel.AllergyTypeName = addAllergyViewModel.AllergyTypeName;

                            Mapper.Map(addAllergyViewModel, allergyTypes);
                            _allergyTypeRepository.Create(allergyTypes);
                            _allergyTypeRepository.SaveChanges();
                            id = allergyTypes.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Allergy Type Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // For Dose Repeat

        public ResponseViewModal SaveAllDoseRepeat(AddAllergyViewModel addAllergyViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                DoseRepeat doseRepeat = new DoseRepeat();
                try
                {
                    if (addAllergyViewModel.AgencyID > 0)
                    {
                        string doseRepeateName = addAllergyViewModel.DoseRepeatName.TrimStart();
                        doseRepeateName = doseRepeateName.TrimEnd();
                        doseRepeat = _doseRepeatRepository.Get(namecheck => namecheck.DoseRepeatName.ToUpper() == doseRepeateName.ToUpper() && !namecheck.IsDeleted);
                        if (!ReferenceEquals(doseRepeat, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Dose Type Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            DoseRepeat doseRepeats = new DoseRepeat();
                            addAllergyViewModel.IsActive = true;
                            addAllergyViewModel.IsDeleted = false;
                            addAllergyViewModel.CreatedDate = DateTime.UtcNow;
                            addAllergyViewModel.AgencyID = 0;
                            addAllergyViewModel.DoseRepeatName = addAllergyViewModel.DoseRepeatName;

                            Mapper.Map(addAllergyViewModel, doseRepeats);
                            _doseRepeatRepository.Create(doseRepeats);
                            _doseRepeatRepository.SaveChanges();
                            id = doseRepeats.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Dose Type Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // Save New Coupon
        public ResponseViewModal SaveCoupon(CouponViewModel couponViewMedel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                Coupon coupon = new Coupon();
                try
                {
                    if (couponViewMedel.Id == 0)
                    {
                        string couponname = couponViewMedel.CouponName.TrimStart();
                        couponname = couponname.TrimEnd();
                        coupon = _couponRepository.Get(namecheck => namecheck.CouponName.ToUpper() == couponname.ToUpper());
                        if (!ReferenceEquals(coupon, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Coupon Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            Coupon coupons = new Coupon();
                            couponViewMedel.IsActive = true;
                            couponViewMedel.IsDeleted = false;
                            couponViewMedel.CreatedDate = DateTime.UtcNow;
                            couponViewMedel.CouponName = couponViewMedel.CouponName;
                            couponViewMedel.Discount = couponViewMedel.Discount;

                            Mapper.Map(couponViewMedel, coupons);
                            _couponRepository.Create(coupons);
                            _couponRepository.SaveChanges();
                            id = coupons.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Coupon Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        public ResponseViewModal GetCoupons(CouponViewModel couponViewMedel)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<CouponViewModel> allCoupon = new List<CouponViewModel>();
                allCoupon = (from couponObj in _couponRepository.GetAll().Where(check => check.IsActive == couponViewMedel.IsActive)
                             select new CouponViewModel()
                             {
                                 Id = couponObj.Id,
                                 CouponName = couponObj.CouponName,
                                 Discount = couponObj.Discount,
                                 Limit = couponObj.Limit,
                                 UsedBy = couponObj.UsedBy,
                                 EndDate = couponObj.EndDate,
                                 IsDeleted = couponObj.IsDeleted,
                                 IsActive = couponObj.IsActive
                             }).OrderBy(c => c.Id).ToList();
                res.Data = allCoupon;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All coupons has been successfully fetched.";
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

        public ResponseViewModal ActivateDeactivateCoupon(CouponViewModel couponRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            Entity.Masters.Coupon couponObj;
            try
            {
                using (var daycaredb = _dataContext.Database.BeginTransaction())
                {
                    if (couponRequest.Id > 0)
                    {
                        if (couponRequest.IsDeleted == true)
                        {
                            // For Deactivate Agency                          
                            var couponDetail = _couponRepository.GetAll().Where(Check => Check.Id == couponRequest.Id).ToList();

                            if (couponDetail.Count > 0)
                            {
                                couponObj = _couponRepository.Get(Check => Check.Id == couponDetail[0].Id);
                                if (!ReferenceEquals(couponObj, null))
                                {
                                    couponObj.IsDeleted = true;
                                    couponObj.DeletedDate = DateTime.UtcNow;
                                    couponObj.DeletedBy = couponRequest.DeletedBy;
                                    _couponRepository.Update(couponObj);
                                    _couponRepository.SaveChanges();
                                }
                            }
                        }

                        if (couponRequest.IsDeleted == false)
                        {
                            // For Activate Agency                          
                            var couponDetail = _couponRepository.GetAll().Where(Check => Check.Id == couponRequest.Id).ToList();

                            if (couponDetail.Count > 0)
                            {
                                couponObj = _couponRepository.Get(Check => Check.Id == couponDetail[0].Id);
                                if (!ReferenceEquals(couponObj, null))
                                {
                                    couponObj.IsDeleted = false;
                                    couponObj.UpdatedDate = DateTime.UtcNow;
                                    couponObj.UpdatedBy = couponRequest.UpdatedBy;
                                    _couponRepository.Update(couponObj);
                                    _couponRepository.SaveChanges();
                                }
                            }
                        }
                        daycaredb.Commit();
                        res.IsSuccess = true;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.StatusCode = 987;
                        res.Message = "Paramter Not Found";
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

        public ResponseViewModal CheckCoupon(CouponViewModel couponViewMedel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            Coupon coupon = new Coupon();
            try
            {
                if (couponViewMedel.Id == 0)
                {
                    string couponname = couponViewMedel.CouponName.TrimStart();
                    couponname = couponname.TrimEnd();
                    coupon = _couponRepository.Get(namecheck => namecheck.CouponName.ToUpper() == couponname.ToUpper());
                    if (!ReferenceEquals(coupon, null))
                    {
                        int discount = coupon.Discount;
                        decimal discount1 = (couponViewMedel.Amount * discount) / 100;
                        decimal amount = Convert.ToDecimal(couponViewMedel.Amount) - discount1;
                        decimal amount1 = Math.Floor(amount);

                        res.Amount = Convert.ToInt32(amount1);
                        res.StatusCode = 200;
                        res.IsSuccess = true;
                    }
                    else
                    {
                        res.IsSuccess = false;
                        res.SaveId = id;
                        res.Message = "Coupon Added Successfully.";
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Amount = couponViewMedel.Amount;

                    }
                }
                else
                {
                    res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        // Get Adn Update Image Approval Type By Agency

        public ResponseViewModal GetImageApprovalType(ApprovalTypeViewModel approvalTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                ImageApproveType approveType = new ImageApproveType();
                approveType = _ImageApproveTypeRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == approvalTypeRequest.AgencyID).FirstOrDefault();

                if (approveType != null)
                {
                    res.ApproveType = approveType.ApproveType;
                }
                else
                {
                    res.ApproveType = "";
                }
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "Approval Type has been successfully fetched.";
            }
            catch (Exception ex)
            {
                res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        public ResponseViewModal UpdateImageApprovalType(ApprovalTypeViewModel approvalTypeRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                ImageApproveType approveType = new ImageApproveType();
                try
                {
                    if (approvalTypeRequest.ApproveType != null)
                    {
                        approveType = _ImageApproveTypeRepository.Get(check => check.IsDeleted == false && check.AgencyID == approvalTypeRequest.AgencyID);
                        if (!ReferenceEquals(approveType, null))
                        {
                            approveType.ApproveType = approvalTypeRequest.ApproveType;
                            approveType.UpdatedDate = DateTime.Now;
                            approveType.UpdatedBy = approvalTypeRequest.CreatedBy;

                            _ImageApproveTypeRepository.SaveChanges();
                            daycaredb.Commit();
                            res.IsSuccess = true;
                            res.Message = "Image Approve Type updated Successfully.";
                            res.StatusCode = (long)HttpStatusCodes.OK;
                        }

                        else
                        {
                            ImageApproveType approveTypes = new ImageApproveType();
                            approvalTypeRequest.IsActive = true;
                            approvalTypeRequest.IsDeleted = false;
                            approvalTypeRequest.CreatedDate = DateTime.UtcNow;
                            approvalTypeRequest.AgencyID = approvalTypeRequest.AgencyID;
                            approvalTypeRequest.ApproveType = approvalTypeRequest.ApproveType;

                            Mapper.Map(approvalTypeRequest, approveTypes);
                            _ImageApproveTypeRepository.Create(approveTypes);
                            _ImageApproveTypeRepository.SaveChanges();
                            id = approveTypes.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Approve Type Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // For Student Deactivate Reasons

        public ResponseViewModal GetDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<DeactivateReasonViewModel> allReasonType = new List<DeactivateReasonViewModel>();
                allReasonType = (from deactivateReasonObj in _deactivateReasonRepository.GetAll().Where(check => !check.IsDeleted && check.RoleID == deactivateReasonViewModel.RoleID)
                                 select new DeactivateReasonViewModel()
                                 {
                                     Id = deactivateReasonObj.Id,
                                     Reason = deactivateReasonObj.Reason,
                                     RoleID = deactivateReasonObj.RoleID
                                 }).OrderBy(c => c.Id).ToList();
                res.Data = allReasonType;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All Deactivate Reason has been successfully fetched.";
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


        public ResponseViewModal SaveDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                DeactivateReason deactivate = new DeactivateReason();
                try
                {
                    if (deactivateReasonViewModel.Id == 0)
                    {
                        string Reason = deactivateReasonViewModel.Reason.TrimStart();
                        Reason = Reason.TrimEnd();
                        deactivate = _deactivateReasonRepository.Get(namecheck => namecheck.Reason.ToUpper() == Reason.ToUpper() && !namecheck.IsDeleted);
                        if (!ReferenceEquals(deactivate, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Reason Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            DeactivateReason deactivates = new DeactivateReason();
                            deactivateReasonViewModel.IsActive = true;
                            deactivateReasonViewModel.IsDeleted = false;
                            deactivateReasonViewModel.CreatedDate = DateTime.UtcNow;
                            deactivateReasonViewModel.RoleID = deactivateReasonViewModel.RoleID;
                            deactivateReasonViewModel.Reason = deactivateReasonViewModel.Reason;

                            Mapper.Map(deactivateReasonViewModel, deactivates);
                            _deactivateReasonRepository.Create(deactivates);
                            _deactivateReasonRepository.SaveChanges();
                            id = deactivates.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Deactivate Reasons Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }

        // For Bus Data

        public ResponseViewModal SaveAllBus(AddBusViewModel busViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            long id = 0;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                Bus bus = new Bus();
                try
                {
                    if (busViewModel.AgencyID > 0 && busViewModel.Id == 0)
                    {
                        string busName = busViewModel.BusName.TrimStart();
                        busName = busName.TrimEnd();
                        bus = _busRepository.Get(namecheck => namecheck.BusName.ToUpper() == busName.ToUpper() && !namecheck.IsDeleted && namecheck.AgencyID == busViewModel.AgencyID);
                        if (!ReferenceEquals(bus, null))
                        {
                            res.StatusCode = 206;//code for blank space
                            DisplayMessage = "Bus Name Already Exists With Same Name.";
                            res.IsSuccess = false;
                        }
                        else
                        {
                            Bus buss = new Bus();
                            busViewModel.IsActive = true;
                            busViewModel.IsDeleted = false;
                            busViewModel.CreatedBy = busViewModel.CreatedBy;
                            busViewModel.CreatedDate = DateTime.UtcNow;
                            busViewModel.AgencyID = busViewModel.AgencyID;
                            busViewModel.BusName = busViewModel.BusName;

                            Mapper.Map(busViewModel, buss);
                            _busRepository.Create(buss);
                            _busRepository.SaveChanges();
                            id = buss.Id;

                            if (id > 0)
                            {
                                res.IsSuccess = true;
                                res.SaveId = id;
                                res.Message = "Bus Added Successfully.";
                                daycaredb.Commit();
                                res.StatusCode = (long)HttpStatusCodes.OK;
                            }
                        }
                    }

                    else if (busViewModel.Id > 0 && busViewModel.IsDeleted == true)
                    {
                        bus = _busRepository.Get(x => x.Id == busViewModel.Id && !x.IsDeleted);
                        if (!ReferenceEquals(bus, null))
                        {
                            bus.DeletedBy = busViewModel.DeletedBy;
                            bus.IsDeleted = busViewModel.IsDeleted;
                            bus.DeletedDate = busViewModel.DeletedDate;
                            _busRepository.SaveChanges();

                            res.IsSuccess = true;
                            res.StatusCode = (long)HttpStatusCodes.OK;
                            res.Message = "Bus Information has been deleted.";
                        }
                        daycaredb.Commit();
                    }
                    else
                    {
                        res.StatusCode = (long)HttpStatusCodes.MissingParameter;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = (long)HttpStatusCodes.SomethingWentWrong;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());
                }
            }
            return res;
        }


        public ResponseViewModal GetAllBus(AddBusViewModel busViewModel)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                List<AddBusViewModel> allBus = new List<AddBusViewModel>();
                allBus = (from busObj in _busRepository.GetAll().Where(check => check.IsDeleted == false && check.AgencyID == busViewModel.AgencyID)
                          select new AddBusViewModel()
                          {
                              Id = busObj.Id,
                              BusName = busObj.BusName,
                              AgencyID = busObj.AgencyID,
                              IsDeleted = busObj.IsDeleted,
                              IsActive = busObj.IsActive
                          }).OrderBy(c => c.Id).ToList();

                res.Data = allBus;
                res.IsSuccess = true;
                res.StatusCode = (long)HttpStatusCodes.OK;
                res.Message = "All bus list has been successfully fetched.";
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


