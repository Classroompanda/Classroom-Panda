using DayCare.Model.Response;
using DayCare.Model.Master;
using DayCare.Model.Agency;
using System.Collections.Generic;
using DayCare.Model.Student;
using System.Threading.Tasks;

namespace DayCare.Service.IService.Agency
{
    public interface IReportService
    {
        ResponseViewModal GetBirthDateReport(ReportViewModel getBirthDateRequest);
        ResponseViewModal GetStaffBirthDateReport(ReportViewModel getBirthDateRequest);

        ResponseViewModal GetClassAttendenceReport(ReportViewModel getClassAttendenceRequest);

        ResponseViewModal GetChildEnrollmentReport(ReportViewModel getChildEnrollRequest);


        Task<ResponseViewModal> GetDuePaymentReport(ReportViewModel getLedgerReportRequest);

        ResponseViewModal PdfReportForBirthday(ReportViewModel getBirthDateRequest);
        ResponseViewModal PdfReportForStaffBirthday(ReportViewModel getBirthDateRequest);

        ResponseViewModal PdfReportForClassAttendence(ReportViewModel getClassAttendenceRequest);


        ResponseViewModal PdfReportForChildEnrollment(ReportViewModel getChildEnrollRequest);

        Task<ResponseViewModal> PdfReportForDuePayment(ReportViewModel getDuePaymentRequest);

        ResponseViewModal DeleteExistingFile(ReportViewModel getBirthDateRequest);

        ResponseViewModal GetLedgerReport(ReportViewModel getLedgerReportRequest);

        ResponseViewModal GetKioskeDetails(ReportViewModel getKioskeDetailsRequest);
        ResponseViewModal GetKioskeIDDetails(ReportViewModel getKioskeDetailsRequest);
        ResponseViewModal PdfReportForLedger(ReportViewModel getLedgerReportRequest);

        ResponseViewModal PdfReportForKioskeIDDetails(ReportViewModel getLedgerReportRequest);

        ResponseViewModal GetFamilyDetailsReport(ReportViewModel getFamilyDetailsRequest);

        ResponseViewModal PdfReportForKioskeDetails(ReportViewModel getKioskeDetailsRequest);

        ResponseViewModal PdfReportForDropInCareStudentDetails(ReportViewModel getKioskeDetailsRequest);

        ResponseViewModal PdfReportForFamily(ReportViewModel getFamilyDetailsRequest);

        ResponseViewModal GetMedicationReport(ReportViewModel getMedicationDetailsRequest);

        ResponseViewModal PdfMedicationReport(ReportViewModel getMedicationDetailsRequest);

        ResponseViewModal GetAllergyReport(ReportViewModel getAllergyDetailsRequest);

        ResponseViewModal PdfAllergyReport(ReportViewModel getAllergyDetailsRequest);

        ResponseViewModal GetGivenMedicationReport(ReportViewModel getGiventMedicationRequest);

        ResponseViewModal PdfGivenMedicationList(ReportViewModel getGiventMedicationRequest);

        ResponseViewModal TeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport);

        ResponseViewModal PDFTeacherClassAttendenceReport(ReportViewModel getTeacherAttendReport);

        ResponseViewModal AccountLedgerReport(ReportViewModel getAccountReport);
        ResponseViewModal AccountPaymentLedgerReport(ReportViewModel getAccountReport);
        ResponseViewModal PDFAllIncidents(IncidentRequestViewModel getAllIncidentsRequest);
        ResponseViewModal StudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport);
        ResponseViewModal PDFStudentTransferAttendanceReport(ReportViewModel getStudentTransferAttendanceReport);

        ResponseViewModal GetDuePaymentAccordingToParentAgency(InvoiceDetailsParentViewModel invoiceDetailsRequest);

        ResponseViewModal GetAllLedgerReportPDF(ReportViewModel getLedgerReportRequest);

        ResponseViewModal GetAllLedgerReport(ReportViewModel getLedgerReportRequest);
        void GenerateDailySheetReportPDF(List<DailySheetViewModel> result);
        ResponseViewModal GetTeacherSpentHoursReport(ReportViewModel teachersHoursRequest);

        ResponseViewModal PDFTeacherHoursReport(ReportViewModel teachersHoursRequest);
        ResponseViewModal GetIncidentsDetailsPDF(IncidentRequestViewModel getIncidentsDetailsRequest);

        ResponseViewModal GetMealServeTodayPDF(DailySheetRequestViewModel getDailySheetRequest);

        ResponseViewModal GetFamilyDetailsReportByStudentID(StudentViewModel getFamilyDetailsRequest);

        Task<ResponseViewModal> PdfReportForPaymentLedgerAsync(ReportViewModel getLedgerReportRequest);
        ResponseViewModal SendInvoiceMail(ReportViewModel getLedgerReportRequest);

        ResponseViewModal GetBankDepositReport(ReportViewModel getBankDepositRequest);
        ResponseViewModal PdfReportForBankDeposit(ReportViewModel getBankDepositRequest);
        ResponseViewModal GetDeactivatedStudentsReport(ReportViewModel getDeStudentRequest);
        ResponseViewModal PdfReportForDeactivatedStudents(ReportViewModel getBankDepositRequest);

        Task<ResponseViewModal> GetTaxStatementReport(ReportViewModel getTaxStatementRequest);
        Task<ResponseViewModal> PdfReportForTaxStatement(ReportViewModel getTaxStatementRequest);

        ResponseViewModal GetBusReport(ReportViewModel getBirthDateRequest);
        ResponseViewModal PdfReportForBus(ReportViewModel getBusReport);
    }
}
