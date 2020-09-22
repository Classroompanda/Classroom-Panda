using DayCare.Model.Response;
using DayCare.Model.Master;
using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Model.Agency;
using DayCare.Model.Student;
using System.Threading.Tasks;

namespace DayCare.Service.IService.Masters
{
    public interface IMasterService
    {
        ResponseViewModal GetAllLeaveReasonType(MasterBaseRequestViewModel getAllleaveReasonTypeRequest);
        ResponseViewModal GetAllCities(MasterBaseRequestViewModel getAllCitiesRequest);
        ResponseViewModal GetAllStates(MasterBaseRequestViewModel getAllStatesRequest);
        ResponseViewModal GetAllState(MasterBaseRequestViewModel getAllStatesRequest);
        ResponseViewModal SaveState(AddStateViewModel addstatecityRequest);
        ResponseViewModal SaveCity(AddCityViewModel addstatecityRequest);
        ResponseViewModal GetAllCountry(MasterBaseRequestViewModel getAllCountryRequest);
        ResponseViewModal GetAllNatureofinjury(MasterBaseRequestViewModel getAllNatureofinjuryRequest);
        ResponseViewModal GetAllStudentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest);
        ResponseViewModal GetAllClassesDropdown(MasterBaseRequestViewModel getAllClassesDropdownRequest);
        ResponseViewModal GetAllRepeatTypeDropdown(MasterBaseRequestViewModel getAllRepeatTypeDropdownRequest);
        ResponseViewModal GetAllMealTypeDropdown(MasterBaseRequestViewModel getAllMealTypeDropdownRequest);
        ResponseViewModal GetAllFoodTypeDropdown(MasterBaseRequestViewModel getAllFoodTypeDropdownRequest);
        ResponseViewModal GetAllMeasureQuantityDropdown(MasterBaseRequestViewModel getAllMeasureQuantityDropdownRequest);
        ResponseViewModal GetAllMeasureUnitTypeDropdown(MasterBaseRequestViewModel getAllMeasureUnitTypeDropdownRequest);
        ResponseViewModal GetAllIncidentPriortyTypeDropdown(MasterBaseRequestViewModel getAllIncidentPriortyTypeDropdownRequest);
        ResponseViewModal GetAllMoodTypeDropdown(MasterBaseRequestViewModel getAllMoodTypeDropdownRequest);
        ResponseViewModal GetAllSubActivityType(MasterBaseRequestViewModel getAllSubActivityTypeRequest);
        ResponseViewModal GetAllFoodConsumtion(MasterBaseRequestViewModel getAllFoodConsumtionRequest);
        ResponseViewModal GetRelationType(MasterBaseRequestViewModel getRelationTypeRequest);
        ResponseViewModal GetAllDosageQuantity(MasterBaseRequestViewModel getAllDosageQuantityRequest);
        ResponseViewModal GetImmunizationType(MasterBaseRequestViewModel getImmunizationTypeRequest);
        ResponseViewModal GetAllergyName(MasterBaseRequestViewModel getAllergyNameRequest);
        ResponseViewModal GetAllDoseRepeat(MasterBaseRequestViewModel getAllDoseRepeatRequest);
        ResponseViewModal GetAllergyReactionType(MasterBaseRequestViewModel getAllergyReactionTypeRequest);
        ResponseViewModal GetAllergyType(MasterBaseRequestViewModel getAllergyTypeRequest);

        ResponseViewModal GetAllClassCategories(MasterBaseRequestViewModel getAllClassCategoriesRequest);

        ResponseViewModal GetAllStudentForParentDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest);

        ResponseViewModal CreateStripeAccount(StripeDetailsViewModel stripeAccountRequest);

        ResponseViewModal PaymentDetails(PaymentDetailsViewModel payementDetailsRequest);
        ResponseViewModal PayPayment(PaymentDetailsViewModel payementDetailsRequest);

        ResponseViewModal GetStripeDetailsForAgency(StripeDetailsRequestViewModel stripeDetailsRequest);

        ResponseViewModal GetPaymentDetailsForParent(PaymentDetailsViewModel paymentDetailsRequest);
        Task<ResponseViewModal> GetPaymentDetailForParentAsync(PaymentDetailsViewModel paymentDetailsRequest);

        ResponseViewModal InvoiceDetails(InvoiceDetailsViewModel invoiceDetailsRequest);

        ResponseViewModal InvoiceSchedular(InvoiceSchedularViewModel invoiceSchRequest);

        ResponseViewModal GetFessPaymentTypeDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest);

        ResponseViewModal GetDuePaymentAccordingToParent(InvoiceDetailsViewModel invoiceDetailsRequest);

        Task<ResponseViewModal> GetBalanceAccordingToParentAsync(ReportViewModel getLedgerReportRequest);

        //ResponseViewModal GetBalanceAccordingToParentAsync(ReportViewModel getLedgerReportRequest);
        ResponseViewModal GetDuePaymentAccordingToAgency(InvoiceDetailsViewModel invoiceDetailsRequest);


        ResponseViewModal AgencyRegistration(AgencyViewModel saveAgencyRequest);
        ResponseViewModal SaveAgencyInformation(AgencyViewModel saveAgencyRequest);

        ResponseViewModal GetAllAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal SavePricingPlanInformation(PricingPlanViewModel savePlanRequest);

        ResponseViewModal GetAllPricingPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal SaveSubscriptionInformation(SubscriptionDetailsViewModel saveSubscriptionDetailsRequest);

        ResponseViewModal SaveMealItemInformation(MealItemMasterViewModel saveMealItemRequest);
        ResponseViewModal GetMealItemInformation(MealItemMasterViewModel saveMealItemRequest);

        ResponseViewModal GetAllAgencyPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal GetCountDetailsForSuperAdmin(AgencyDetailsViewModel getAgencyDetailsRequest);
        ResponseViewModal GetParticularAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal GetCountDetailsForAgencyAdmin(AgencyDetailsViewModel getAgencyDetailsRequest);
        ResponseViewModal UpdateLastLogin(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal GetPaymentDetailsForAgency(PaymentDetailsViewModel paymentDetailsRequest);

        ResponseViewModal SaveDDMasterInformation(DigitalDirectorMasterViewModel saveDDInfoRequest);

        ResponseViewModal SaveDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest);
        ResponseViewModal GetDDMasterInformationIndStudent(StudentDigitalDirectorViewModel saveDDInfoRequest);
        ResponseViewModal SaveCalculatedFees(CalculatedFeesViewModel saveCalculatedFeesInfoRequest);
        ResponseViewModal UpdateCalculatedFees(CalculatedFeesViewModel updateCalculatedFeesInfoRequest);
        ResponseViewModal GetPerDayFeeCalculation(PerDayFeeCalculationViewModel getperdayfeeCalculationRequest);

        ResponseViewModal BulkFeeCalculation(ClassIdCollection bulkfeeCalculationRequest);

        ResponseViewModal DeleteFeesCalculation(PerDayFeeCalculationViewModel reqDeleteFees);
        ResponseViewModal GetAddFeesDetails(CalculatedFeesViewModel calculatedDetailsRequest);

        ResponseViewModal GetAddFeesDetailsView(CalculatedFeesViewModel calculatedDetailsRequest);
        ResponseViewModal SaveGenerateInvoice(InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest);

        ResponseViewModal SaveStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel);

        ResponseViewModal SaveAdvanceFeePaymentDetails(AdvanceFeePaymentDetailsViewModel saveAdvanceFeePaymentInfoRequest);

        ResponseViewModal GetStudentFeesDiscountAmount(DiscountAmountViewModel discountAmountViewModel);

        ResponseViewModal GetAllStudentByParentIdDropdown(MasterBaseRequestViewModel getAllStudentDropdownRequest);
        ResponseViewModal SaveAuthorizedPersonDetails(AuthorizedPersonViewModel saveAuthorizedPersonInfoRequest);

        ResponseViewModal ActivateAuthPerson(AuthorizedPersonViewModel saveAuthorizedPersonInfoRequest);

        ResponseViewModal SaveSubsidyDetails(SubsidyDetailsViewModel saveSubsidyDetailsInfoRequest);

        ResponseViewModal GetSubsidyDetails(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest);

        ResponseViewModal SaveStudentSubsidyDetails(StudentSubsidyDetailsViewModel saveStudentSubsidyDetailsInfoRequest);

        ResponseViewModal GetStudentSubsidyDetails(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest);

        ResponseViewModal GetSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest);

        ResponseViewModal GetStudentSubsidyList(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest);

        ResponseViewModal DeleteStudentSubsidyType(StudentSubsidyDetailsViewModel getStudentSubsidyDetailsInfoRequest);

        ResponseViewModal DeleteSubsidyType(SubsidyDetailsViewModel getSubsidyDetailsInfoRequest);

        ResponseViewModal GetAuthorizedPersonByStudentId(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest);
        ResponseViewModal GetRestrictedPersonByStudentId(RestrictedPersonViewModel getRestrictedPersonInfoRequest);

        ResponseViewModal GetAuthorizedPersonDetails(AuthorizedPersonViewModel getAuthorizedPersonInfoRequest);

        ResponseViewModal GetAlertForStudentActivity();

        ResponseViewModal getCurrentDDActivityIntervalSetting(DDAlertRequestViewModel settingReq);

        //Fee Related API
        ResponseViewModal GetTransactionType();
        ResponseViewModal SaveTransactionMasterInfo(TransactionMasterViewModel saveTransMasterRequest);

        ResponseViewModal SaveTransactionDetailsInfo(List<TransactionDetailsViewModel> saveTransDetailsRequest);

        ResponseViewModal GetTransactionMaster(TransactionTypeViewModel transRequest);

        ResponseViewModal GetTransactionMasterDetails();

        ResponseViewModal DeleteDeviceToken(DDAlertRequestViewModel settingReq);
        ResponseViewModal GetBankAccountDetails(DDAlertRequestViewModel bankDetailsRequest);

        ResponseViewModal SaveExtraChargeFeeMasterInfo(TransactionMasterViewModel saveExtrFeeMasterRequest);

        ResponseViewModal GetExtraFeeChargeMasterList(TransactionMasterViewModel extraFeesMasterRequest);

        ResponseViewModal GetParentsListForSendBalance(InvoiceDetailsViewModel invoiceDetailsRequest);

        ResponseViewModal ActivateDeactivateAgency(AgencyDetailsViewModel getAgencyDetailsRequest);
        ResponseViewModal GetAgencySetting(AgencySettingViewModel agencySettingRequest);
        ResponseViewModal SavestudentFiles(StudentFilesViewModel studentfilesRequest);

        ResponseViewModal GetUploadedFilesByStudentId(StudentFilesViewModel studentfilesRequest);

        ResponseViewModal DeleteStudentFilesById(StudentFilesViewModel studentfilesRequest);
        ResponseViewModal GetAllAgencyList(AgencyDetailsViewModel getAgencyDetailsRequest);

        ResponseViewModal GetAgencyCountryStateID(MasterBaseRequestViewModel getAgencyCountryRequest);

        Task<ResponseViewModal> GetParentLedgerAsync(ReportViewModel getLedgerReportRequest);
        Task<ResponseViewModal> GetStudentLedgerAsync(ReportViewModel getLedgerReportRequest);
        ResponseViewModal SaveInvoiceDetails(InvoiceDetailsViewModel saveGenerateInvoiceInfoRequest);
        ResponseViewModal SavePaymentDetails(PaymentDetailsViewModel payementDetailsRequest);

        ResponseViewModal GetRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest);
        ResponseViewModal SaveRecurringBillingByStudentID(RecurringBillingViewModel recurringBillingRequest);
        ResponseViewModal SaveRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest);
        ResponseViewModal SaveACHInformationByParentID(BankDetailsViewModel bankDetailsRequest);
        ResponseViewModal GetACHInformationByParentID(ACHInformationViewModel achInformationRequest);
        ResponseViewModal GetRecurringPaymentByParentID(RecurringPaymentViewModel recurringPaymentRequest); 
        ResponseViewModal VerifyACHBankAccountByParentID(BankDetailsViewModel bankDetailsRequest);
        ResponseViewModal OneTimePaymentByACH(OneTimePaymentViewModel oneTimePaymentRequest);

        ResponseViewModal SaveRestrictedPersonDetails(RestrictedPersonViewModel saveRestrictedPersonInfoRequest);
        ResponseViewModal GetRestrictedPersonDetails(RestrictedPersonViewModel getRestrictedPersonInfoRequest);
        ResponseViewModal ActivateRestrictedPerson(RestrictedPersonViewModel getRestrictedPersonInfoRequest);
        ResponseViewModal SaveSectionVideo(SectionVideoViewModel sectionVideoRequest);

        ResponseViewModal GetSectionVideo(SectionVideoViewModel sectionVideoRequest);

        ResponseViewModal GetSectionList(SectionVideoViewModel sectionVideoRequest);

        ResponseViewModal GetVideoForSection(SectionVideoViewModel sectionVideoRequest);

        // Save Allergy Data By Super Admin

        ResponseViewModal SaveAllergyName(AddAllergyViewModel addAllergyViewModel);
        ResponseViewModal SaveAllergyReactionType(AddAllergyViewModel addAllergyViewModel);
        ResponseViewModal SaveAllergyType(AddAllergyViewModel addAllergyViewModel);

        // For Dose Repeat
        ResponseViewModal SaveAllDoseRepeat(AddAllergyViewModel addAllergyViewModel);
        // New Coupon
        ResponseViewModal SaveCoupon(CouponViewModel couponViewMedel);
        ResponseViewModal GetCoupons(CouponViewModel couponViewMedel);
        ResponseViewModal ActivateDeactivateCoupon(CouponViewModel couponViewMedel);
        ResponseViewModal CheckCoupon(CouponViewModel couponViewMedel);

        // For Image Approval Type

        ResponseViewModal GetImageApprovalType(ApprovalTypeViewModel approvalTypeRequest);
        ResponseViewModal UpdateImageApprovalType(ApprovalTypeViewModel approvalTypeRequest);

        // For Student Deactivate Reason
        ResponseViewModal GetDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel);
        ResponseViewModal SaveDeactivateReason(DeactivateReasonViewModel deactivateReasonViewModel);

        // For Bus Management
        ResponseViewModal GetAllBus(AddBusViewModel busViewModel);
        ResponseViewModal SaveAllBus(AddBusViewModel busViewModel);
    }
}
