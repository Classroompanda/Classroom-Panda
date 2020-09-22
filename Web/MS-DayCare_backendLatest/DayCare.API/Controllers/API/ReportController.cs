using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DayCare.Model.Agency;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Service.IService.Agency;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : Controller
    {

        private readonly IReportService _reportService;
        ResponseViewModal response;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
            response = new ResponseViewModal();
        }


        [HttpPost]
        [Route("GetBirthDateReport")]
        public ResponseViewModal GetBirthDateReport(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.GetBirthDateReport(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetStaffBirthDateReport")]
        public ResponseViewModal GetStaffBirthDateReport(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.GetStaffBirthDateReport(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetClassAttendenceReport")]
        public ResponseViewModal GetClassAttendenceReport(ReportViewModel getClassAttendenceRequest)
        {
            try
            {
                response = _reportService.GetClassAttendenceReport(getClassAttendenceRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetChildEnrollmentReport")]
        public ResponseViewModal GetChildEnrollmentReport(ReportViewModel getChildEnrollRequest)
        {
            try
            {
                response = _reportService.GetChildEnrollmentReport(getChildEnrollRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetDuePaymentReport")]
        public async Task<ResponseViewModal> GetDuePaymentReport(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = await _reportService.GetDuePaymentReport(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForDuePayment")]
        public async Task<ResponseViewModal> PdfReportForDuePayment(ReportViewModel getDuePaymentRequest)
        {
            try
            {
                response = await _reportService.PdfReportForDuePayment(getDuePaymentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        

        [HttpPost]
        [Route("PdfReportForBirthday")]
        public ResponseViewModal PdfReportForBirthday(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.PdfReportForBirthday(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForStaffBirthday")]
        public ResponseViewModal PdfReportForStaffBirthday(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.PdfReportForStaffBirthday(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("PdfReportForClassAttendence")]
        public ResponseViewModal PdfReportForClassAttendence(ReportViewModel getClassAttendenceRequest)
        {
            try
            {
                response = _reportService.PdfReportForClassAttendence(getClassAttendenceRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("PdfReportForChildEnrollment")]
        public ResponseViewModal PdfReportForChildEnrollment(ReportViewModel getChildEnrollRequest)
        {
            try
            {
                response = _reportService.PdfReportForChildEnrollment(getChildEnrollRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("DeleteExistingFile")]
        public ResponseViewModal DeleteExistingFile(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.DeleteExistingFile(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetLedgerReport")]
        public ResponseViewModal GetLedgerReport(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = _reportService.GetLedgerReport(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        

        [HttpPost]
        [Route("GetKioskeDetails")]
        public  ResponseViewModal GetKioskeDetails(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _reportService.GetKioskeDetails(getKioskeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetKioskeIDDetails")]
        public ResponseViewModal GetKioskeIDDetails(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _reportService.GetKioskeIDDetails(getKioskeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForKioskeIDDetails")]
        public ResponseViewModal PdfReportForKioskeIDDetails(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = _reportService.PdfReportForKioskeIDDetails(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForLedger")]
        public ResponseViewModal PdfReportForLedger(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = _reportService.PdfReportForLedger(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("PdfReportForKioskeDetails")]
        public ResponseViewModal PdfReportForKioskeDetails(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _reportService.PdfReportForKioskeDetails(getKioskeDetailsRequest);
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
        [Route("PdfReportForDropInCareStudentDetails")]
        public ResponseViewModal PdfReportForDropInCareStudentDetails(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _reportService.PdfReportForDropInCareStudentDetails(getKioskeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetFamilyDetailsReport")]
        public ResponseViewModal  GetFamilyDetailsReport(ReportViewModel getFamilyDetailsRequest)
        {
            try
            {
                response = _reportService.GetFamilyDetailsReport(getFamilyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("PdfReportForFamily")]
        public ResponseViewModal PdfReportForFamily(ReportViewModel getFamilyDetailsRequest)
        {
            try
            {
                response = _reportService.PdfReportForFamily(getFamilyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetMedicationReport")]
        public ResponseViewModal GetMedicationReport(ReportViewModel getMedicationDetailsRequest)
        {
            try
            {
                response = _reportService.GetMedicationReport(getMedicationDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("PdfMedicationReport")]
        public ResponseViewModal PdfMedicationReport(ReportViewModel getMedicationDetailsRequest)
        {
            try
            {
                response = _reportService.PdfMedicationReport(getMedicationDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllergyReport")]
        public ResponseViewModal GetAllergyReport(ReportViewModel GetAllergyReport)
        {
            try
            {
                response = _reportService.GetAllergyReport(GetAllergyReport);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfAllergyReport")]
        public ResponseViewModal PdfAllergyReport(ReportViewModel getAllergyDetailsRequest)
        {
            try
            {
                response = _reportService.PdfAllergyReport(getAllergyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfGivenMedicationList")]
        public ResponseViewModal PdfGivenMedicationList(ReportViewModel getGiventMedicationRequest)
        {
            try
            {
                response = _reportService.PdfGivenMedicationList(getGiventMedicationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetGivenMedicationReport")]
        public ResponseViewModal GetGivenMedicationReport(ReportViewModel getGiventMedicationRequest)
        {
            try
            {
                response = _reportService.GetGivenMedicationReport(getGiventMedicationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("TeacherClassAttendenceReport")]
        public ResponseViewModal TeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport)
        {
            try
            {
                response = _reportService.TeacherClassAttendenceReport(getTeacherAttendReport);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PDFTeacherClassAttendenceReport")]
        public ResponseViewModal PDFTeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport)
        {
            try
            {
                response = _reportService.PDFTeacherClassAttendenceReport(getTeacherAttendReport);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("AccountLedgerReport")]
        public ResponseViewModal AccountLedgerReport(ReportViewModel getAccountReport)
        {
            try
            {
                response = _reportService.AccountLedgerReport(getAccountReport);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("AccountPaymentLedgerReport")]
        public ResponseViewModal AccountPaymentLedgerReport(ReportViewModel getAccountReport)
        {
            try
            {
                response = _reportService.AccountPaymentLedgerReport(getAccountReport);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PDFAllIncidents")]
        public ResponseViewModal PDFAllIncidents(IncidentRequestViewModel getAllIncidentsRequest)
        {
            try
            {
                response = _reportService.PDFAllIncidents(getAllIncidentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

      
        [HttpPost]
        [Route("StudentTransferAttendanceReport")]
        public async Task<ResponseViewModal> StudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport)
        {
            ResponseViewModal responseGetStudentTransferAttendance = new ResponseViewModal();
            responseGetStudentTransferAttendance = _reportService.StudentTransferAttendanceReport(getStudentTransferAttendanceReport);
            responseGetStudentTransferAttendance = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetStudentTransferAttendance.Data,
                StatusCode = responseGetStudentTransferAttendance.StatusCode,
                TotalRows = responseGetStudentTransferAttendance.TotalRows,
                Message = responseGetStudentTransferAttendance.Message
            };
            return await Task.Run(() => responseGetStudentTransferAttendance);
        }

     
        [HttpPost]
        [Route("PDFStudentTransferAttendanceReport")]
        public async Task<ResponseViewModal> PDFStudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport)
        {
            ResponseViewModal responseGetStudentTransferAttendance = new ResponseViewModal();
            responseGetStudentTransferAttendance = _reportService.PDFStudentTransferAttendanceReport(getStudentTransferAttendanceReport);
            responseGetStudentTransferAttendance = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetStudentTransferAttendance.Data,
                StatusCode = responseGetStudentTransferAttendance.StatusCode,
                TotalRows = responseGetStudentTransferAttendance.TotalRows,
                Message = responseGetStudentTransferAttendance.Message,
                FileName = responseGetStudentTransferAttendance.FileName
            };
            return await Task.Run(() => responseGetStudentTransferAttendance);
        }


       
        [HttpPost]
        [Route("GetDuePaymentAccordingToParentAgency")]
        public async Task<ResponseViewModal> GetDuePaymentAccordingToParentAgency(InvoiceDetailsParentViewModel invoiceDetailsRequest)
        {
            ResponseViewModal responseGetDuePayment = new ResponseViewModal();
            responseGetDuePayment = _reportService.GetDuePaymentAccordingToParentAgency(invoiceDetailsRequest);
            responseGetDuePayment = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseGetDuePayment.Data,
                StatusCode = 200,
                TotalRows = responseGetDuePayment.TotalRows,
                Message = "Parent Due Payment List Fetch successfully"
            };
            return await Task.Run(() => responseGetDuePayment);
        }


      
        [HttpPost]
        [Route("GetAllLedgerReportPDF")]
        public async Task<ResponseViewModal> GetAllLedgerReportPDF(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal responseLedgerReport = new ResponseViewModal();
            responseLedgerReport = _reportService.GetAllLedgerReportPDF(getLedgerReportRequest);
            responseLedgerReport = new ResponseViewModal()
            {
                IsSuccess = responseLedgerReport.IsSuccess,
                Data = responseLedgerReport.Data,
                StatusCode = responseLedgerReport.StatusCode,
                TotalRows = responseLedgerReport.TotalRows,
                Message = responseLedgerReport.Message,
                FileName = responseLedgerReport.FileName,
                FilePath = responseLedgerReport.FilePath
            };
            return await Task.Run(() => responseLedgerReport);
        }

        
        [HttpPost]
        [Route("GetAllLedgerReport")]
        public async Task<ResponseViewModal> GetAllLedgerReport(ReportViewModel getLedgerReportRequest)
        {
            ResponseViewModal responseLedgerReport = new ResponseViewModal();
            responseLedgerReport = _reportService.GetAllLedgerReport(getLedgerReportRequest);
            responseLedgerReport = new ResponseViewModal()
            {
                IsSuccess = responseLedgerReport.IsSuccess,
                Data = responseLedgerReport.Data,
                StatusCode = responseLedgerReport.StatusCode,
                TotalRows = responseLedgerReport.TotalRows,
                Message = responseLedgerReport.Message
            };
            return await Task.Run(() => responseLedgerReport);
        }


        
        [HttpPost]
        [Route("GetTeacherSpentHoursReport")]
        public ResponseViewModal GetTeacherSpentHoursReport(ReportViewModel teachersHoursRequest)
        {
            try
            {
                response = _reportService.GetTeacherSpentHoursReport(teachersHoursRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
                
       
        [HttpPost]
        [Route("GetPDFTeacherSpenHoursReport")]
        public ResponseViewModal PDFTeacherHoursReport(ReportViewModel teachersHoursRequest)
        {
            try
            {
                response = _reportService.PDFTeacherHoursReport(teachersHoursRequest);
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
        [Route("GetIncidentsDetailsPDF")]
        public async Task<ResponseViewModal> GetIncidentsDetailsPDF(IncidentRequestViewModel getIncidentsDetailsRequest)
        {
            ResponseViewModal responseGetIncidentsDetailsPDF = new ResponseViewModal();
            responseGetIncidentsDetailsPDF = _reportService.GetIncidentsDetailsPDF(getIncidentsDetailsRequest);
            responseGetIncidentsDetailsPDF = new ResponseViewModal()
            {
                IsSuccess = responseGetIncidentsDetailsPDF.IsSuccess,
                Data = responseGetIncidentsDetailsPDF.Data,
                StatusCode = responseGetIncidentsDetailsPDF.StatusCode,
                TotalRows = responseGetIncidentsDetailsPDF.TotalRows,
                Message = responseGetIncidentsDetailsPDF.Message,
                FileName = responseGetIncidentsDetailsPDF.FileName,
                FilePath = responseGetIncidentsDetailsPDF.FilePath
            };
            return await Task.Run(() => responseGetIncidentsDetailsPDF);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("GetMealServeTodayPDF")]
        public async Task<ResponseViewModal> GetMealServeTodayPDF(DailySheetRequestViewModel getDailySheetRequest)
        {
            ResponseViewModal responseGetMealServeTodayPDF = new ResponseViewModal();
            responseGetMealServeTodayPDF = _reportService.GetMealServeTodayPDF(getDailySheetRequest);
            responseGetMealServeTodayPDF = new ResponseViewModal()
            {
                IsSuccess = responseGetMealServeTodayPDF.IsSuccess,
                Data = responseGetMealServeTodayPDF.Data,
                StatusCode = responseGetMealServeTodayPDF.StatusCode,
                Message = responseGetMealServeTodayPDF.Message,
                TotalRows = responseGetMealServeTodayPDF.TotalRows,
                FileName = responseGetMealServeTodayPDF.FileName,
                FilePath = responseGetMealServeTodayPDF.FilePath
            };
            return await Task.Run(() => responseGetMealServeTodayPDF);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetFamilyDetailsReportByStudentID")]
        public async Task<ResponseViewModal> GetFamilyDetailsReportByStudentID(StudentViewModel getFamilyDetailsRequest)
        {
            ResponseViewModal responseGetFamilyDetailsReportByStudentID = new ResponseViewModal();
            responseGetFamilyDetailsReportByStudentID = _reportService.GetFamilyDetailsReportByStudentID(getFamilyDetailsRequest);
            responseGetFamilyDetailsReportByStudentID = new ResponseViewModal()
            {
                IsSuccess = responseGetFamilyDetailsReportByStudentID.IsSuccess,
                Data = responseGetFamilyDetailsReportByStudentID.Data,
                StatusCode = responseGetFamilyDetailsReportByStudentID.StatusCode,
                Message = responseGetFamilyDetailsReportByStudentID.Message,
                TotalRows = responseGetFamilyDetailsReportByStudentID.TotalRows,
                FileName = responseGetFamilyDetailsReportByStudentID.FileName,
                FilePath = responseGetFamilyDetailsReportByStudentID.FilePath
            };
            return await Task.Run(() => responseGetFamilyDetailsReportByStudentID);
        }


        [HttpPost]
        [Route("PdfReportForPaymentLedger")]
        public async Task<ResponseViewModal> PdfReportForPaymentLedger(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response =await _reportService.PdfReportForPaymentLedgerAsync(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SendInvoiceMail")]
        public ResponseViewModal SendInvoiceMail(ReportViewModel getLedgerReportRequest)
        {
            try
            {
                response = _reportService.SendInvoiceMail(getLedgerReportRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetBankDepositReport")]
        public ResponseViewModal GetBankDepositReport(ReportViewModel getBankDepositRequest)
        {
            try
            {
                response = _reportService.GetBankDepositReport(getBankDepositRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForBankDeposit")]
        public ResponseViewModal PdfReportForBankDeposit(ReportViewModel getBankDepositRequest)
        {
            try
            {
                response = _reportService.PdfReportForBankDeposit(getBankDepositRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetDeactivatedStudentsReport")]
        public ResponseViewModal GetDeactivatedStudentsReport(ReportViewModel getDeStudentRequest)
        {
            try
            {
                response = _reportService.GetDeactivatedStudentsReport(getDeStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForDeactivatedStudents")]
        public ResponseViewModal PdfReportForDeactivatedStudents(ReportViewModel getBankDepositRequest)
        {
            try
            {
                response = _reportService.PdfReportForDeactivatedStudents(getBankDepositRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTaxStatementReport")]
        public async Task<ResponseViewModal> GetTaxStatementReport(ReportViewModel getTaxStatementRequest)
        {
            try
            {
                response = await _reportService.GetTaxStatementReport(getTaxStatementRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForTaxStatement")]
        public async Task<ResponseViewModal> PdfReportForTaxStatement(ReportViewModel getTaxStatementRequest)
        {
            try
            {
                response = await _reportService.PdfReportForTaxStatement(getTaxStatementRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetBusReport")]
        public ResponseViewModal GetBusReport(ReportViewModel getBirthDateRequest)
        {
            try
            {
                response = _reportService.GetBusReport(getBirthDateRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("PdfReportForBus")]
        public ResponseViewModal PdfReportForBus(ReportViewModel getBusReport)
        {
            try
            {
                response = _reportService.PdfReportForBus(getBusReport);
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