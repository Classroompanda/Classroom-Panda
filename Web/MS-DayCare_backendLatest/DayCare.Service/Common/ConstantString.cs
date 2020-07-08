using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.Common
{
    public class ConstantString
    {
        public const string Activated = "activated";
        public const string Deactivated = "deactivated";
        public const string Currency = "usd";
        public const string Country = "US";
        public const string DepositCharge = "Deposit Charge";
        public const string ParentRefund = "Parent Refund";
            public const string ReturnCheck = "Return Check";
        public const string TuitionLateFee = "Tuition Late Fee";
            public const string DepositRefund = "Deposit Refund";
            public const string SiblingDiscount = "Sibling Discount";
        public const string PaymentCreditCard = "Payment - Credit Card";
        public const string CreditCard = "Credit Card";
        public const string Check = "Check";
        public const string PaymentCash = "Payment - Cash";
        public const string Cash = "Cash";
        public const string Refund = "Refund";
        public const string Other = "Other";
        public const string Discount = "Discount";
        public const string PaymentCheck = "Payment - Check";
        public const string CreditForward = "Credit Forward";
        public const string Credit = "Credit";
        public const string StateProgram = "State Program";
        public const string Subsidy = "Subsidy";


    }

    public static class StatusMessage
    {
        public const string VerifiedBusinessName = "Domain verified";
        public const string UnVerifiedBusinessName = "This domain not available please contact admin";
        public const string InvalidUserOrPassword = "Invalid username or password.";
        public const string UnknownError = "Sorry, we have encountered an error";
        public const string Success = "Data has been successfully inserted";
        public const string Retreived = "Data retreived successfully";
        public const string UserCustomFieldSaved = "User's custom fields has been saved successfully";
        public const string AgencySaved = "Agency has been saved successfully.";
        public const string AgencyUpdatedSuccessfully = "Agency has been updated successfully.";
        public const string AgencyAlredyExist = "Agency name already in use";
        public const string SoapSuccess = "Client encounter has been saved successfully.";
        public const string UserCustomFieldUpdated = "User's custom fields has been updated successfully";
        public const string UpdatedSuccessfully = "Data has been updated successfully";
        public const string UserCustomFieldDeleted = "User's custom fields has been deleted successfully";
        public const string Delete = "Data has been deleted successfully";
        public const string InvalidData = "Please enter valid email";
        public const string VaildData = "Please enter vaild data.";
        public const string ModelState = "Model state is not valid";
        public const string InvalidToken = "Please enter valid token";
        public const string NotFound = "No Record Found";
        public const string InvalidCredentials = "Please enter valid credentials.";
        public const string Missing = "Missing Parameter.";
        public const string StudentFiles = "Student Files Upload successfully";
        public const string TokenRequired = "Token Required";
        public const string ResetPassword = "Reset password's email sent to user";
        public const string ServerError = "Internal Server error";
        public const string FetchMessage = "Success";
        public const string ClaimUpdated = "Claim has been updated successfully";
        public const string ClaimNotExist = "Claim doesn't exist";
        public const string AlreadyExists = "You cannot remove this, as it is associated somewhere in the application";
        public const string ServiceCodeAdded = "Service code has been saved successfully";
        public const string ServiceCodeUpdated = "Service code has been updated successfully";
        public const string ServiceCodeNotExists = "The service code do not exist";
        public const string ModifierNotExists = "The modifier do not exist";
        public const string ServiceCodeDelete = "Service code has been deleted successfully";
        public const string ClaimDelete = "Claim has been deleted successfully";
        public const string ServiceLinePaymentDelete = "Service line payment/adjustment has been deleted successfully";
        public const string ModifierDelete = "Modifier has been deleted successfully";
        public const string ServiceCodeAlreadyExists = "Service code already exist in the claim";
        public const string PatientAlreadyExist = "Client already exist";
        public const string StaffAlreadyExist = "Staff already exist";
        public const string AppointmentAlreadyExist = "Appointment type already exist";
        public const string QuestionAlreadyExist = "This question already exist";
        public const string AppointmentTypeAlreadyAssigned = "Appointment type already assigned to payer";
        public const string ClearingHouseAlreadyExist = "Clearing House already exist";
        public const string LocationAlreadyExist = "Location already exist.";
        public const string TagAlreadyExist = "Tag already exist";
        public const string AppConfigurationAlreadyExist = "This configuration already exist";
        public const string InsuranceCompaniesAlreadyExist = "Insurance company already exist";
        public const string CustomLabelAlreadyExist = "Custom field already exist";
        public const string ICDAlreadyExist = "Diagnosis code already exist";
        public const string UserAlreadyExist = "User already exist";
        public const string ModuleAlreadyExist = "Module already exist";
        public const string TemplateAlreadyExist = "Template already exist";
        public const string ClientICDAlreadyLink = "Client already linked with this diagnosis code";
        public const string ClientAllergyAlreadyLink = "Client already linked with this allergy";
        public const string ClientImmunizationAlreadyLink = "Client already linked with this immunization";
        public const string ClientInsuranceAlreadyLink = "Client already linked with this insurance company";
        public const string StaffCustomValue = "Can't insert duplicate values";
        public const string InsuarnceTypeAlreadyExist = "This insurance type already exist";
        public const string RecordAlreadyExists = "[string] already exist";// in table [table]";
        public const string RecordNotExists = "available";
        public const string AddAppointment = "Appointment has been saved successfully";
        public const string UpdateAppointment = "Appointment has been updated successfully";
        public const string DeleteAppointment = "Appointment has been deleted successfully";
        public const string CancelAppointment = "Appointment has been cancelled successfully";
        public const string UndoCancelAppointment = "Appointment has been restored successfully";
        public const string DeleteAppointmentRecurrence = "Appointment recurring series has been deleted successfully";
        public const string AppointmentNotExists = "Appointment doesn't exist or has been deleted";
        public const string UserRoleAlreadyExist = "Role name already exist";
        public const string UserRoleAlreadyAssignedToUser = "This role is already assigned to user";

        public const string ClientPortalActivated = "Client portal activated successfully";
        public const string ClientPortalDeactivated = "Client portal deactivated successfully";

        public const string ClientActiveStatus = "Your profile is not active, please contact with your system administrator";
        public const string ClientPortalDeactivedAtLogin = "Your portal is not active, please contact with your system administrator";

        public const string ClientActivation = "Client activated successfully";
        public const string ClientDeactivation = "Client deactivated successfully";

        public const string UserActivation = "User activated successfully";
        public const string UserDeactivation = "User deactivated successfully";

        public const string LocationSaved = "Location has been saved successfully.";
        public const string LocationUpdated = "Location has been updated successfully.";

        public const string UserBlocked = "[RoleName] has been locked successfully.";
        public const string UserUnblocked = "[RoleName] has been unlocked successfully.";

        public const string CustomLabelSaved = "Custom field has been saved successfully.";
        public const string CustomLabelUpdated = "Custom field has been updated successfully.";
        public const string CustomLabelDeleted = "Custom field has been deleted successfully.";

        public const string APISavedSuccessfully = "[controller] has been saved successfully";
        public const string APIUpdatedSuccessfully = "[controller] has been updated successfully";
        public const string DeletedSuccessfully = "[controller] has been deleted successfully";

        public const string ErrorOccured = "Unfortunately, some error was encountered.";
        public const string AuthorizationProcedureSaved = "Authorization procedure has been saved successfully";
        public const string RoundingRuleNotDeleted = "Rounding rule cannot be deleted as it's already assigned to some service codes";
        public const string RoundingRuleDeleted = "Rounding rule has been deleted sucessfully";

        public const string InvalidFile = "Please select a valid CCDA file";

        public const string CCDAImportedSuccessfully = "Client information imported successfully";
        public const string CCDAError = "Error occured while importing Client information";

        public const string EDI837SuccessfullyUploaded = "Claim file has been sent succesfully";
        public const string EDI837UploadError = "Some error occurred while sending claim file";
        public const string EDI837GenerationError = "Some error occurred while generating claim file";
        //public const string EDI837GenerationError = "Some error occurred while creating claim file";
        public const string EDI837ClientDataError = "Some error occurred while sending claim file due to incomplete client(s) data";
        public const string PaymentAdded = "Payment details have been added successfully";
        public const string PaymentUpdated = "Payment details have been updated successfully";
        public const string PaymentDetailNotExists = "Payment details you are trying to update do not exists in our records";

        public const string SavedStaffAvailability = "Staff availability has been saved successfully";
        public const string ResetPasswordLinkNotVaild = "Reset password link is not vaild";

        public const string DocumentNotExist = "Document doesn't exist";
        public const string DocumentDelete = "Document has been deleted successfully";
        public const string InvaildFormat = "You have uploaded an invalid file type.";
        public const string DocumentUploaded = "Documents has been uploaded successfully";

        public const string SelectRole = "Please select one role first";
        public const string SubmitToNonEDIPayer = "Claims has been successfully submitted to non-edi payers";

        //Message
        public const string MessageSent = "Message has been sent succesfully";
        public const string DeleteMessage = "Message has been deleted successfully";
        public const string MessageStatus = "Message Status has been updated successfully";
        public const string MessageFavouriteStatus = "Favourite Status has been updated successfully";
        public const string ModifierAdded = "Modifier has been added successfully";
        public const string ModifierUpdated = "Modifier has been updated successfully";
        public const string ModifierDeleted = "Modifier has been deleted successfully";

        //Master Service Code
        public const string MasterServiceCodeAdded = "Master Service code has been saved successfully";
        public const string MasterServiceCodeUpdated = "Master Service code has been updated successfully";
        public const string ServiceCodeAlreadyExist = "This service code already exist";
        public const string MasterServiceCodeDeleted = "Master Service code has been deleted successfully";

        //Payer Service Code
        public const string PayerServiceCodeAdded = "Payer Service code has been saved successfully";
        public const string PayerServiceCodeUpdated = "Payer Service code has been updated successfully";
        public const string PayerServiceCodeDeleted = "Payer Service code has been deleted successfully";

        //Client
        public const string ClientCreated = "Client has been created successfully";
        public const string ClientUpdated = "Client has been updated successfully";
        // Staff Applied Leave
        public const string StaffLeaveApplied = "Leave has been successfully applied";
        public const string StaffLeaveAppliedUpdated = "Applied Leave has been successfully updated";
        public const string StaffAppliedLeaveDelete = "Applied Leave has been deleted successfully";
        public const string LeaveStatusUpdated = "Leave status has been successfully updated";

        //Staff
        public const string StaffCreated = "Staff has been created successfully";
        public const string StaffUpdated = "Staff has been updated successfully";
        public const string StaffDelete = "Staff has been deleted successfully";

        //Client guardian
        public const string ClientGuardianCreated = "Client's Guardian has been created successfully";
        public const string ClientGuardianUpdated = "Client's Guardian has been updated successfully";
        public const string ClientGuardianDelete = "Client's Guardian has been deleted successfully";

        //Client address 
        public const string ClientAddressCreated = "Client's Address has been created successfully";
        public const string ClientAddressUpdated = "Client's Address has been updated successfully";

        //Client Insurance
        public const string ClientInsuranceCreated = "Client's Insurance has been created successfully";
        public const string ClientInsuranceUpdated = "Client's Insurance has been Updated successfully";

        //Timesheet
        public const string TimeSheetAdd = "Timesheet info has been added successfully";
        public const string TimeSheetUpdate = "Timesheet info has been updated successfully";
        public const string TimeSheetDelete = "Timesheet info has been deleted successfully";

        public const string AccountDeactivated = "Your account is deactive please contact to admin";
    }
}
