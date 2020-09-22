using DayCare.Model.Agency;
using DayCare.Model.Master;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Service.IService.Agency;
using DayCare.Service.IService.Masters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    // [Authorize]
    [ApiController]
    public class MastersController : Controller
    {
        #region Initialize Dependency
        private readonly IMasterService _masterService;
        private ResponseViewModal response;
        private readonly IPostActivitiesService _postActivitiesService;

        public MastersController(IMasterService masterService, IPostActivitiesService postActivitiesService)
        {
            _masterService = masterService;
            response = new ResponseViewModal();
            _postActivitiesService = postActivitiesService;
        }
        #endregion

        [HttpPost]
        [Route("GetAllLeaveReasonType")]
        public ResponseViewModal GetAllLeaveReasonType(MasterBaseRequestViewModel getAllleaveReasonTypeRequest)
        {
            try
            {
                response = _masterService.GetAllLeaveReasonType(getAllleaveReasonTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllCities")]
        public ResponseViewModal GetAllCities(MasterBaseRequestViewModel getAllCitiesRequest)
        {
            try
            {
                response = _masterService.GetAllCities(getAllCitiesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllStates")]
        public ResponseViewModal GetAllStates(MasterBaseRequestViewModel getAllStatesRequest)
        {
            try
            {
                response = _masterService.GetAllStates(getAllStatesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllState")]
        public ResponseViewModal GetAllState(MasterBaseRequestViewModel getAllStatesRequest)
        {
            try
            {
                response = _masterService.GetAllState(getAllStatesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveState")]
        public ResponseViewModal SaveState(AddStateViewModel addstatecityRequest)
        {
            try
            {
                response = _masterService.SaveState(addstatecityRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveCity")]
        public ResponseViewModal SaveCity(AddCityViewModel addstatecityRequest)
        {
            try
            {
                response = _masterService.SaveCity(addstatecityRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllCountry")]
        public ResponseViewModal GetAllCountry(MasterBaseRequestViewModel getAllCountryRequest)
        {
            try
            {
                response = _masterService.GetAllCountry(getAllCountryRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllNatureofinjury")]
        public ResponseViewModal GetAllNatureofinjury(MasterBaseRequestViewModel getAllNatureofinjuryRequest)
        {
            try
            {
                response = _masterService.GetAllNatureofinjury(getAllNatureofinjuryRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllStudentDropdown")]
        public ResponseViewModal GetAllStudentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllStudentDropdown(getAllStudentDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllClassesDropdown")]
        public ResponseViewModal GetAllClassesDropdown(MasterBaseRequestViewModel getAllClassesDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllClassesDropdown(getAllClassesDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllRepeatTypeDropdown")]
        public ResponseViewModal GetAllRepeatTypeDropdown(MasterBaseRequestViewModel getAllRepeatTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllRepeatTypeDropdown(getAllRepeatTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllMealTypeDropdown")]
        public ResponseViewModal GetAllMealTypeDropdown(MasterBaseRequestViewModel getAllMealTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllMealTypeDropdown(getAllMealTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllFoodTypeDropdown")]
        public ResponseViewModal GetAllFoodTypeDropdown(MasterBaseRequestViewModel getAllFoodTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllFoodTypeDropdown(getAllFoodTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllMeasureQuantityDropdown")]
        public ResponseViewModal GetAllMeasureQuantityDropdown(MasterBaseRequestViewModel getAllMeasureQuantityDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllMeasureQuantityDropdown(getAllMeasureQuantityDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllMeasureUnitTypeDropdown")]
        public ResponseViewModal GetAllMeasureUnitTypeDropdown(MasterBaseRequestViewModel getAllMeasureUnitTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllMeasureUnitTypeDropdown(getAllMeasureUnitTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllIncidentPriortyTypeDropdown")]
        public ResponseViewModal GetAllIncidentPriortyTypeDropdown(MasterBaseRequestViewModel getAllIncidentPriortyTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllIncidentPriortyTypeDropdown(getAllIncidentPriortyTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllMoodTypeDropdown")]
        public ResponseViewModal GetAllMoodTypeDropdown(MasterBaseRequestViewModel getAllMoodTypeDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllMoodTypeDropdown(getAllMoodTypeDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllSubActivityType")]
        public ResponseViewModal GetAllSubActivityType(MasterBaseRequestViewModel getAllSubActivityTypeRequest)
        {
            try
            {
                response = _masterService.GetAllSubActivityType(getAllSubActivityTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllFoodConsumtion")]
        public ResponseViewModal GetAllFoodConsumtion(MasterBaseRequestViewModel getAllFoodConsumtionRequest)
        {
            try
            {
                response = _masterService.GetAllFoodConsumtion(getAllFoodConsumtionRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetRelationType")]
        public ResponseViewModal GetRelationType(MasterBaseRequestViewModel getRelationTypeRequest)
        {
            try
            {
                response = _masterService.GetRelationType(getRelationTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllDosageQuantity")]
        public ResponseViewModal GetAllDosageQuantity(MasterBaseRequestViewModel getAllDosageQuantityRequest)
        {
            try
            {
                response = _masterService.GetAllDosageQuantity(getAllDosageQuantityRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetImmunizationType")]
        public ResponseViewModal GetImmunizationType(MasterBaseRequestViewModel getImmunizationTypeRequest)
        {
            try
            {
                response = _masterService.GetImmunizationType(getImmunizationTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllergyName")]
        public ResponseViewModal GetAllergyName(MasterBaseRequestViewModel getAllergyNameRequest)
        {
            try
            {
                response = _masterService.GetAllergyName(getAllergyNameRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllDoseRepeat")]
        public ResponseViewModal GetAllDoseRepeat(MasterBaseRequestViewModel getAllDoseRepeatRequest)
        {
            try
            {
                response = _masterService.GetAllDoseRepeat(getAllDoseRepeatRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllergyReactionType")]
        public ResponseViewModal GetAllergyReactionType(MasterBaseRequestViewModel getAllergyReactionTypeRequest)
        {
            try
            {
                response = _masterService.GetAllergyReactionType(getAllergyReactionTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllergyType")]
        public ResponseViewModal GetAllergyType(MasterBaseRequestViewModel getAllergyTypeRequest)
        {
            try
            {
                response = _masterService.GetAllergyType(getAllergyTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllClassCategories")]
        public ResponseViewModal GetAllClassCategories(MasterBaseRequestViewModel getAllClassCategoriesRequest)
        {
            try
            {
                response = _masterService.GetAllClassCategories(getAllClassCategoriesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllStudentForParentDropdown")]
        public ResponseViewModal GetAllStudentForParentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllStudentForParentDropdown(getAllStudentDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        
        [HttpPost]
        [Route("CreateStripeAccount")]
        public ResponseViewModal CreateStripeAccount(StripeDetailsViewModel stripeAccountRequest)
        {
            try
            {
                response = _masterService.CreateStripeAccount(stripeAccountRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        
        [HttpPost]
        [Route("PaymentDetails")]
        public ResponseViewModal PaymentDetails(PaymentDetailsViewModel payementDetailsRequest)
        {
            try
            {
                response = _masterService.PaymentDetails(payementDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetStripeDetailsForAgency")]
        public ResponseViewModal GetStripeDetailsForAgency(StripeDetailsRequestViewModel stripeDetailsRequest)
        {
            try
            {
                response = _masterService.GetStripeDetailsForAgency(stripeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetPaymentDetailsForParent")]
        public ResponseViewModal GetPaymentDetailsForParent(PaymentDetailsViewModel paymentDetailsRequest)
        {
            try
            {
                response = _masterService.GetPaymentDetailsForParent(paymentDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetPaymentDetailForParent")]
        public async Task<ResponseViewModal> GetPaymentDetailForParent(PaymentDetailsViewModel paymentDetailsRequest)
        {
            try
            {
                response = await _masterService.GetPaymentDetailForParentAsync(paymentDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("InvoiceDetails")]
        public ResponseViewModal InvoiceDetails(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            try
            {
                response = _masterService.InvoiceDetails(invoiceDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("InvoiceSchedular")]
        public ResponseViewModal InvoiceSchedular(InvoiceSchedularViewModel invoiceSchRequest)
        {
            try
            {                
                response = _masterService.InvoiceSchedular(invoiceSchRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetFessPaymentTypeDropdown")]
        public ResponseViewModal GetFessPaymentTypeDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            try
            {
                response = _masterService.GetFessPaymentTypeDropdown(getAllStudentDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetDuePaymentAccordingToParent")]
        public ResponseViewModal GetDuePaymentAccordingToParent(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            try
            {
                response = _masterService.GetDuePaymentAccordingToParent(invoiceDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetBalanceAccordingToParent")]
        public async Task<ResponseViewModal> GetBalanceAccordingToParent(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = await _masterService.GetBalanceAccordingToParentAsync(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetDuePaymentAccordingToAgency")]
        public ResponseViewModal GetDuePaymentAccordingAgency(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            try
            {
                response = _masterService.GetDuePaymentAccordingToAgency(invoiceDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveDDMasterInformation")]
        public ResponseViewModal SaveDDMasterInformation(DigitalDirectorMasterViewModel saveDDInfoRequest)
        {
            try
            {
                response = _masterService.SaveDDMasterInformation(saveDDInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveDDMasterInformationIndStudent")]
        public ResponseViewModal SaveDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest)
        {
            try
            {
                response = _masterService.SaveDDMasterInformationIndStudent(saveDDInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetDDMasterInformationIndStudent")]
        public ResponseViewModal GetDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest)
        {
            try
            {
                response = _masterService.GetDDMasterInformationIndStudent(saveDDInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteFeesCalculation")]
        public ResponseViewModal DeleteFeesCalculation(PerDayFeeCalculationViewModel reqDeleteFees)
        {
            try
            {
                response = _masterService.DeleteFeesCalculation(reqDeleteFees);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetPerDayFeeCalculation")]
        public ResponseViewModal GetPerDayFeeCalculation(PerDayFeeCalculationViewModel getperdayfeeCalculationRequest)
        {
            try
            {
                response = _masterService.GetPerDayFeeCalculation(getperdayfeeCalculationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("BulkFeeCalculation")]
        public async Task<ResponseViewModal> BulkFeeCalculation(ClassIdCollection bulkfeeCalculationRequest)
        {
            ResponseViewModal responsebulk = new ResponseViewModal();
            responsebulk = _masterService.BulkFeeCalculation(bulkfeeCalculationRequest);
            responsebulk = new ResponseViewModal()
            {
                Data = responsebulk,
                StatusCode = 200,
                Message = "Record Save successfully"
            };
            return  await Task.Run(() => responsebulk);
        }


        [HttpPost]
        [Route("SaveCalculatedFees")]
        public ResponseViewModal SaveCalculatedFees(CalculatedFeesViewModel saveCalculatedFeesInfoRequest)
        {
            try
            {
                response = _masterService.SaveCalculatedFees(saveCalculatedFeesInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("UpdateCalculatedFees")]
        public ResponseViewModal UpdateCalculatedFees(CalculatedFeesViewModel updateCalculatedFeesInfoRequest)
        {
            try
            {
                response = _masterService.UpdateCalculatedFees(updateCalculatedFeesInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAddFeesDetails")]
        public ResponseViewModal GetAddFeesDetails(CalculatedFeesViewModel calculatedDetailsRequest)
        {
            try
            {
                response = _masterService.GetAddFeesDetails(calculatedDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAddFeesDetailsView")]
        public ResponseViewModal GetAddFeesDetailsView(CalculatedFeesViewModel calculatedDetailsRequest)
        {
            try
            {
                response = _masterService.GetAddFeesDetailsView(calculatedDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GenerateInvoice")]
        public ResponseViewModal GenerateInvoice(InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest)
        {
            try
            {
                response = _masterService.SaveGenerateInvoice(saveGenerateInvoiceInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentFeesDiscountAmount")]
        public ResponseViewModal SaveStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel)
        {
            try
            {
                response = _masterService.SaveStudentFeesDiscountAmount(discountAmountViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
                      
               
        [HttpPost]
        [Route("GetStudentFeesDiscountAmount")]
        public ResponseViewModal GetStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel)
        {
            try
            {
                response = _masterService.GetStudentFeesDiscountAmount(discountAmountViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveAdvanceFeePaymentDetails")]
        public async Task<ResponseViewModal> SaveAdvanceFeePaymentDetails(AdvanceFeePaymentDetailsViewModel saveAdvanceFeePaymentInfoRequest)
        {
            ResponseViewModal responseSaveAdvance = new ResponseViewModal();
            responseSaveAdvance = _masterService.SaveAdvanceFeePaymentDetails(saveAdvanceFeePaymentInfoRequest);
            responseSaveAdvance = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAdvance,
                StatusCode = 200,
                Message = "Record Save successfully"
            };
            return await Task.Run(() => responseSaveAdvance);
        }

        
        [HttpPost]
        [Route("GetAllStudentByParentIdDropdown")]
        public ResponseViewModal GetAllStudentByParentIdDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest)
        {
            try
            {
                response = _masterService.GetAllStudentByParentIdDropdown(getAllStudentDropdownRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveAuthorizedPersonDetails")]
        public async Task<ResponseViewModal> SaveAuthorizedPersonDetails(AuthorizedPersonViewModel saveAuthorizedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.SaveAuthorizedPersonDetails(saveAuthorizedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson,
                StatusCode = responseSaveAuthorizedPerson.StatusCode,
                Message = responseSaveAuthorizedPerson.Message,
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }

        [HttpPost]
        [Route("GetAuthorizedPersonDetails")]
        public async Task<ResponseViewModal> GetAuthorizedPersonDetails(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.GetAuthorizedPersonDetails(getAuthorizedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson.Data,
                StatusCode = 200,
                TotalRows = responseSaveAuthorizedPerson.TotalRows,
                Message = "Authorized Person Fetch successfully"
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }

        [HttpPost]
        [Route("ActivateAuthPerson")]
        public async Task<ResponseViewModal> ActivateAuthPerson(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.ActivateAuthPerson(getAuthorizedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson,
                StatusCode = 200,
                Message = "Authorized Person Active successfully"
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }

        [HttpPost]
        [Route("SaveRestrictedPersonDetails")]
        public async Task<ResponseViewModal> SaveRestrictedPersonDetails(RestrictedPersonViewModel saveRestrictedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.SaveRestrictedPersonDetails(saveRestrictedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson,
                StatusCode = responseSaveAuthorizedPerson.StatusCode,
                Message = responseSaveAuthorizedPerson.Message,
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }

         [HttpPost]
        [Route("GetRestrictedPersonDetails")]
        public async Task<ResponseViewModal> GetRestrictedPersonDetails(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.GetRestrictedPersonDetails(getRestrictedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson.Data,
                StatusCode = 200,
                TotalRows = responseSaveAuthorizedPerson.TotalRows,
                Message = "Authorized Person Fetch successfully"
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }

        [HttpPost]
        [Route("ActivateRestrictedPerson")]
        public async Task<ResponseViewModal> ActivateRestrictedPerson(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            ResponseViewModal responseSaveAuthorizedPerson = new ResponseViewModal();
            responseSaveAuthorizedPerson = _masterService.ActivateRestrictedPerson(getRestrictedPersonInfoRequest);
            responseSaveAuthorizedPerson = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveAuthorizedPerson,
                StatusCode = 200,
                Message = "Authorized Person Active successfully"
            };
            return await Task.Run(() => responseSaveAuthorizedPerson);
        }


        [HttpPost]
        [Route("SaveSubsidyDetails")]
        public async Task<ResponseViewModal> SaveSubsidyDetails(SubsidyDetailsViewModel saveSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseSaveSubsidyDetails = new ResponseViewModal();
            responseSaveSubsidyDetails = _masterService.SaveSubsidyDetails(saveSubsidyDetailsInfoRequest);
            responseSaveSubsidyDetails = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveSubsidyDetails,
                StatusCode = responseSaveSubsidyDetails.StatusCode,
                Message = responseSaveSubsidyDetails.Message
            };
            return await Task.Run(() => responseSaveSubsidyDetails);
        }

        [HttpPost]
        [Route("GetSubsidyDetails")]
        public async Task<ResponseViewModal> GetSubsidyDetails(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseGetSubsidyDetails = new ResponseViewModal();
            responseGetSubsidyDetails = _masterService.GetSubsidyDetails(getSubsidyDetailsInfoRequest);
            responseGetSubsidyDetails = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetSubsidyDetails,
                StatusCode = 200,
                TotalRows = responseGetSubsidyDetails.TotalRows,
                Message = "Subsidy Details Fetch successfully"
            };
            return await Task.Run(() => responseGetSubsidyDetails);
        }


        [HttpPost]
        [Route("SaveStudentSubsidyDetails")]
        public async Task<ResponseViewModal> SaveStudentSubsidyDetails(StudentSubsidyDetailsViewModel saveStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseSaveStudentSubsidyDetails = new ResponseViewModal();
            responseSaveStudentSubsidyDetails = _masterService.SaveStudentSubsidyDetails(saveStudentSubsidyDetailsInfoRequest);
            responseSaveStudentSubsidyDetails = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSaveStudentSubsidyDetails,
                StatusCode = responseSaveStudentSubsidyDetails.StatusCode,
                Message = responseSaveStudentSubsidyDetails.Message,
            };
            return await Task.Run(() => responseSaveStudentSubsidyDetails);
        }

        [HttpPost]
        [Route("GetStudentSubsidyDetails")]
        public async Task<ResponseViewModal> GetStudentSubsidyDetails(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseGetStudentSubsidyDetails = new ResponseViewModal();
            responseGetStudentSubsidyDetails = _masterService.GetStudentSubsidyDetails(getStudentSubsidyDetailsInfoRequest);
            responseGetStudentSubsidyDetails = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetStudentSubsidyDetails.Data,
                StatusCode = 200,
                TotalRows = responseGetStudentSubsidyDetails.TotalRows,
                Message = "Student Subsidy Details Fetch successfully"
            };
            return await Task.Run(() => responseGetStudentSubsidyDetails);
        }

        [HttpPost]
        [Route("GetSubsidyType")]
        public async Task<ResponseViewModal> GetSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseGetSubsidyType = new ResponseViewModal();
            responseGetSubsidyType = _masterService.GetSubsidyType(getSubsidyDetailsInfoRequest);
            responseGetSubsidyType = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetSubsidyType.Data,
                StatusCode = 200,
                TotalRows = responseGetSubsidyType.TotalRows,
                Message = "All Subsidy List Fetch successfully"
            };
            return await Task.Run(() => responseGetSubsidyType);
        }

        [HttpPost]
        [Route("GetStudentSubsidyList")]
        public async Task<ResponseViewModal> GetStudentList(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseGetSubsidyType = new ResponseViewModal();
            responseGetSubsidyType = _masterService.GetStudentSubsidyList(getSubsidyDetailsInfoRequest);
            responseGetSubsidyType = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetSubsidyType.Data,
                StatusCode = 200,
                Message = "All Subsidy List Fetch successfully"
            };
            return await Task.Run(() => responseGetSubsidyType);
        }

        [HttpPost]
        [Route("DeleteStudentSubsidyType")]
        public async Task<ResponseViewModal> DeleteStudentSubsidyType(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseStudentSubsidy = new ResponseViewModal();
            responseStudentSubsidy = _masterService.DeleteStudentSubsidyType(getStudentSubsidyDetailsInfoRequest);
            responseStudentSubsidy = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseStudentSubsidy.Data,
                StatusCode = 200,
                Message = "Student Subsidy Delete successfully"
            };
            return await Task.Run(() => responseStudentSubsidy);
        }

        [HttpPost]
        [Route("DeleteSubsidyType")]
        public async Task<ResponseViewModal> DeleteSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest)
        {
            ResponseViewModal responseSubsidyType = new ResponseViewModal();
            responseSubsidyType = _masterService.DeleteSubsidyType(getSubsidyDetailsInfoRequest);
            responseSubsidyType = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseSubsidyType.Data,
                StatusCode = responseSubsidyType.StatusCode,
                Message = responseSubsidyType.Message
            };
            return await Task.Run(() => responseSubsidyType);
        }

        [HttpPost]
        [Route("GetAuthorizedPersonByStudentId")]
        public ResponseViewModal GetAuthorizedPersonByStudentId(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest)
        {
            try
            {
                response = _masterService.GetAuthorizedPersonByStudentId(getAuthorizedPersonInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetRestrictedPersonByStudentId")]
        public ResponseViewModal GetRestrictedPersonByStudentId(RestrictedPersonViewModel getRestrictedPersonInfoRequest)
        {
            try
            {
                response = _masterService.GetRestrictedPersonByStudentId(getRestrictedPersonInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpGet]
        [Route("GetAlertForStudentActivity")]
        public ResponseViewModal GetAlertForStudentActivity()
        {
            try
            {                
                response = _masterService.GetAlertForStudentActivity();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("getCurrentDDActivityIntervalSetting")]
        public ResponseViewModal getCurrentDDActivityIntervalSetting(DDAlertRequestViewModel settingReq)
        {
            try
            {
                response = _masterService.getCurrentDDActivityIntervalSetting(settingReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("GetTransactionType")]
        public ResponseViewModal GetTransactionType(DDAlertRequestViewModel settingReq)
        {
            try
            {
                response = _masterService.GetTransactionType();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetTransactionMaster")]
        public ResponseViewModal GetTransactionMaster(TransactionTypeViewModel transRequest)
        {
            try
            {
                response = _masterService.GetTransactionMaster(transRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveTransactionMasterInfo")]
        public ResponseViewModal SaveTransactionMasterInfo(TransactionMasterViewModel saveTransMasterRequest)
        {
            try
            {
                response = _masterService.SaveTransactionMasterInfo(saveTransMasterRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveTransactionDetailsInfo")]
        public ResponseViewModal SaveTransactionDetailsInfo([FromBody] List<TransactionDetailsViewModel> saveTransDetailsRequest)
        {
            try
            {
                response = _masterService.SaveTransactionDetailsInfo(saveTransDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTransactionMasterDetails")]
        public ResponseViewModal GetTransactionMasterDetails(DDAlertRequestViewModel settingReq)
        {
            try
            {
                response = _masterService.GetTransactionMasterDetails();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("DeleteDeviceToken")]
        public ResponseViewModal DeleteDeviceToken(DDAlertRequestViewModel settingReq)
        {
            try
            {
                response = _masterService.DeleteDeviceToken(settingReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetBankAccountDetails")]
        public ResponseViewModal GetBankAccountDetails(DDAlertRequestViewModel bankDetailsRequest)
        {
            try
            {
                response = _masterService.GetBankAccountDetails(bankDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveExtraChargeFeeMasterInfo")]
        public ResponseViewModal SaveExtraChargeFeeMasterInfo(TransactionMasterViewModel saveExtrFeeMasterRequest)
        {
            try
            {
                response = _masterService.SaveExtraChargeFeeMasterInfo(saveExtrFeeMasterRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetExtraFeeChargeMasterList")]
        public ResponseViewModal GetExtraFeeChargeMasterList(TransactionMasterViewModel extraFeesMasterRequest)
        {
            try
            {
                response = _masterService.GetExtraFeeChargeMasterList(extraFeesMasterRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetParentsListForSendBalance")]
        public ResponseViewModal GetParentsListForSendBalance(InvoiceDetailsViewModel invoiceDetailsRequest)
        {
            try
            {
                response = _masterService.GetParentsListForSendBalance(invoiceDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
               
        [AllowAnonymous]
        [HttpPost]
        [Route("GetAgencySetting")]
        public async Task<ResponseViewModal> GetAgencySetting(AgencySettingViewModel agencySettingRequest)
        {
            ResponseViewModal responseGetAgencySetting = new ResponseViewModal();
            responseGetAgencySetting = _masterService.GetAgencySetting(agencySettingRequest);
            responseGetAgencySetting = new ResponseViewModal()
            {
                IsSuccess = responseGetAgencySetting.IsSuccess,
                Data = responseGetAgencySetting.Data,
                StatusCode = responseGetAgencySetting.StatusCode,
                Message = responseGetAgencySetting.Message,
                TotalRows = responseGetAgencySetting.TotalRows
            };
            return await Task.Run(() => responseGetAgencySetting);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("SavestudentFiles")]
        public async Task<ResponseViewModal> SavestudentFiles(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal responseSavestudentFiles = new ResponseViewModal();
            responseSavestudentFiles = _masterService.SavestudentFiles(studentfilesRequest);
            responseSavestudentFiles = new ResponseViewModal()
            {
                IsSuccess = responseSavestudentFiles.IsSuccess,
                Data = responseSavestudentFiles.Data,
                StatusCode = responseSavestudentFiles.StatusCode,
                Message = responseSavestudentFiles.Message,
                TotalRows = responseSavestudentFiles.TotalRows
            };
            return await Task.Run(() => responseSavestudentFiles);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetUploadedFilesByStudentId")]
        public async Task<ResponseViewModal> GetUploadedFilesByStudentId(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal responseGetUploadedFilesByStudentId = new ResponseViewModal();
            responseGetUploadedFilesByStudentId = _masterService.GetUploadedFilesByStudentId(studentfilesRequest);
            responseGetUploadedFilesByStudentId = new ResponseViewModal()
            {
                IsSuccess = responseGetUploadedFilesByStudentId.IsSuccess,
                Data = responseGetUploadedFilesByStudentId.Data,
                StatusCode = responseGetUploadedFilesByStudentId.StatusCode,
                Message = responseGetUploadedFilesByStudentId.Message,
                TotalRows = responseGetUploadedFilesByStudentId.TotalRows
            };
            return await Task.Run(() => responseGetUploadedFilesByStudentId);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("DeleteStudentFilesById")]
        public async Task<ResponseViewModal> DeleteStudentFilesById(StudentFilesViewModel studentfilesRequest)
        {
            ResponseViewModal responseDeleteStudentFilesById = new ResponseViewModal();
            responseDeleteStudentFilesById = _masterService.DeleteStudentFilesById(studentfilesRequest);
            responseDeleteStudentFilesById = new ResponseViewModal()
            {
                IsSuccess = responseDeleteStudentFilesById.IsSuccess,
                Data = responseDeleteStudentFilesById.Data,
                StatusCode = responseDeleteStudentFilesById.StatusCode,
                Message = responseDeleteStudentFilesById.Message,
                TotalRows = responseDeleteStudentFilesById.TotalRows
            };
            return await Task.Run(() => responseDeleteStudentFilesById);
        }

        [HttpPost]
        [Route("GetAgencyCountryStateID")]
        public ResponseViewModal GetAgencyCountryStateID(MasterBaseRequestViewModel getAgencyCountryRequest)
        {
            try
            {
                response = _masterService.GetAgencyCountryStateID(getAgencyCountryRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetParentLedger")]
        public async Task<ResponseViewModal> GetParentLedger(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = await _masterService.GetParentLedgerAsync(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetStudentLedger")]
        public async Task<ResponseViewModal> GetStudentLedger(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response =await _masterService.GetStudentLedgerAsync(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveInvoiceDetails")]
        public ResponseViewModal SaveInvoiceDeatils([FromBody]InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest)
        {
            try
            {
                response = _masterService.SaveInvoiceDetails(saveGenerateInvoiceInfoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SavePaymentDetails")]
        public ResponseViewModal SavePaymentDetails(PaymentDetailsViewModel payementDetailsRequest)
        {
            try
            {
                response = _masterService.SavePaymentDetails(payementDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetRecurringBillingByStudentID")]
        public ResponseViewModal GetRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest)
        {
            try
            {
                response = _masterService.GetRecurringBillingByStudentID(recurringBillingRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveRecurringBillingByStudentID")]
        public ResponseViewModal SaveRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest)
        {
            try
            {
                response = _masterService.SaveRecurringBillingByStudentID(recurringBillingRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveRecurringPaymentByParentID")]
        public ResponseViewModal SaveRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest)
        {
            try
            {
                response = _masterService.SaveRecurringPaymentByParentID(recurringPaymentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteRecurringPaymentByParentID")]
        public ResponseViewModal DeleteRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest)
        {
            try
            {
                response = _masterService.SaveRecurringPaymentByParentID(recurringPaymentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveACHInformationByParentID")]
        public ResponseViewModal SaveACHInformationByParentID(BankDetailsViewModel bankDetailsRequest)
        {
            try
            {
                response = _masterService.SaveACHInformationByParentID(bankDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteACHInformationByParentID")]
        public ResponseViewModal DeleteACHInformationByParentID(BankDetailsViewModel bankDetailsRequest)
        {
            try
            {
                response = _masterService.SaveACHInformationByParentID(bankDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetACHInformationByParentID")]
        public ResponseViewModal GetACHInformationByParentID(ACHInformationViewModel achInformationRequest)
        {
            try
            {
                response = _masterService.GetACHInformationByParentID(achInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetRecurringPaymentByParentID")]
        public ResponseViewModal GetRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest)
        {
            try
            {
                response = _masterService.GetRecurringPaymentByParentID(recurringPaymentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("VerifyACHBankAccountByParentID")]
        public ResponseViewModal VerifyACHBankAccountByParentID(BankDetailsViewModel bankDetailsRequest)
        {
            try
            {
                response = _masterService.VerifyACHBankAccountByParentID(bankDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("OneTimePaymentByACH")]
        public ResponseViewModal OneTimePaymentByACH(OneTimePaymentViewModel oneTimePaymentRequest)
        {
            try
            {
                response = _masterService.OneTimePaymentByACH(oneTimePaymentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PayPayment")]
        public ResponseViewModal PayPayment(PaymentDetailsViewModel payementDetailsRequest)
        {
            try
            {
                response = _masterService.PayPayment(payementDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveSectionVideo")]
        public ResponseViewModal SaveSectionVideo(SectionVideoViewModel sectionVideoRequest)
        {
            try
            {
                response = _masterService.SaveSectionVideo(sectionVideoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetSectionVideo")]
        public ResponseViewModal GetSectionVideo(SectionVideoViewModel sectionVideoRequest)
        {
            try
            {
                response = _masterService.GetSectionVideo(sectionVideoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetSectionList")]
        public ResponseViewModal GetSectionList(SectionVideoViewModel sectionVideoRequest)
        {
            try
            {
                response = _masterService.GetSectionList(sectionVideoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetVideoForSection")]
        public ResponseViewModal GetVideoForSection(SectionVideoViewModel sectionVideoRequest)
        {
            try
            {
                response = _masterService.GetVideoForSection(sectionVideoRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // Save Allergy Data By Super Admin

        [HttpPost]
        [Route("SaveAllergyName")]
        public ResponseViewModal SaveAllergyName(AddAllergyViewModel addAllergyViewModel)
        {
            try
            {
                response = _masterService.SaveAllergyName(addAllergyViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveAllergyReactionType")]
        public ResponseViewModal SaveAllergyReactionType(AddAllergyViewModel addAllergyViewModel)
        {
            try
            {
                response = _masterService.SaveAllergyReactionType(addAllergyViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveAllergyType")]
        public ResponseViewModal SaveAllergyType(AddAllergyViewModel addAllergyViewModel)
        {
            try
            {
                response = _masterService.SaveAllergyType(addAllergyViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveAllDoseRepeat")]
        public ResponseViewModal SaveAllDoseRepeat(AddAllergyViewModel addAllergyViewModel)
        {
            try
            {
                response = _masterService.SaveAllDoseRepeat(addAllergyViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // Add new coupon
        [HttpPost]
        [Route("SaveCoupon")]
        public ResponseViewModal SaveCoupon(CouponViewModel couponViewMedel)
        {
            try
            {
                response = _masterService.SaveCoupon(couponViewMedel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetCoupons")]
        public ResponseViewModal GetCoupons(CouponViewModel couponViewMedel)
        {
            try
            {
                response = _masterService.GetCoupons(couponViewMedel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ActivateDeactivateCoupon")]
        public ResponseViewModal ActivateDeactivateCoupon(CouponViewModel couponViewMedel)
        {
            try
            {
                response = _masterService.ActivateDeactivateCoupon(couponViewMedel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("CheckCoupon")]
        public ResponseViewModal CheckCoupon(CouponViewModel couponViewMedel)
        {
            try
            {
                response = _masterService.CheckCoupon(couponViewMedel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // For Image Approval By Agency Admin
        [HttpPost]
        [Route("GetImageApprovalType")]
        public ResponseViewModal GetImageApprovalType(ApprovalTypeViewModel approvalTypeRequest)
        {
            try
            {
                response = _masterService.GetImageApprovalType(approvalTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveImageApprovalType")]
        public ResponseViewModal SaveImageApprovalType(ApprovalTypeViewModel approvalTypeRequest)
        {
            try
            {
                response = _masterService.UpdateImageApprovalType(approvalTypeRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // Get And Approve UnApprovePostActivityImages UnApproveImagesViewModel

        [HttpPost]
        [Route("GetUnApproveImages")]
        public ResponseViewModal GetUnApproveImages(UnApproveImagesViewModel unApproveImagesRequest)
        {
            try
            {
                response = _postActivitiesService.GetUnApproveImages(unApproveImagesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ApproveImages")]
        public ResponseViewModal ApproveImages(UnApproveImagesViewModel unApproveImagesRequest)
        {
            try
            {
                response = _postActivitiesService.ApproveImages(unApproveImagesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        // Student Deactivate Reason
        [HttpPost]
        [Route("GetDeactivateReason")]
        public ResponseViewModal GetDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel)
        {
            try
            {
                response = _masterService.GetDeactivateReason(deactivateReasonViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveDeactivateReason")]
        public ResponseViewModal SaveDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel)
        {
            try
            {
                response = _masterService.SaveDeactivateReason(deactivateReasonViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
    }
}
