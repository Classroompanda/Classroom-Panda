using DayCare.Model.Parent;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ReportViewModel : BaseViewModel
    {
        public long AgencyID { get; set; }

        public long StudentID { get; set; }

        public string StudentName { get; set; }

        public string StudentFirstName { get; set; }

        public string StudentLastName { get; set; }

        public long TeacherID { get; set; }

        public string TeacherName { get; set; }

        public string TeacherFirstName { get; set; }

        public string TeacherLastName { get; set; }

        public long ParentID { get; set; }

        public string ParentName { get; set; }
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }

        public DateTime DateofBirth { get; set; }

        public long ClassesID { get; set; }

        public string ClassesName { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

        public string Age { get; set; }

        public DateTime CheckInTime { get; set; }

        public DateTime CheckOutTime { get; set; }


        public DateTime EnrollStartDate { get; set; }

        public DateTime EnrollEndDate { get; set; }

        public long EnrollmentStatus { get; set; }

        public long ParentContactNumber { get; set; }

        public string ParentContactAddress { get; set; }

        public string Physician { get; set; }

        public DateTime InvoiceFromDate { get; set; }

        public DateTime InvoiceToDate { get; set; }
        public DateTime InvoiceDate { get; set; }

        public DateTime? InvoicesFromDate { get; set; }

        public DateTime? InvoicesToDate { get; set; }
        public DateTime? InvoicesDate { get; set; }

        public decimal Amount { get; set; }

        public string FileName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool PaidStatus { get; set; }

        public DateTime PaymentDate { get; set; }
        public DateTime? PaymentsDate { get; set; }
        public DateTime? PaymentFromDate { get; set; }
        public DateTime? PaymentToDate { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string ParentEmail { get; set; }

        public long PhysicianNumber { get; set; }

        public bool isAuthorisedToPickup { get; set; }


        public string MedicationName { get; set; }

        public long Units { get; set; }

        public string Strength { get; set; }

        public string HowToTake { get; set; }

        public string OtherMedication { get; set; }

        public DateTime MedStartDate { get; set; }

        public DateTime MedEndDate { get; set; }

        public long MedQuantity { get; set; }

        public string DoseRepeat { get; set; }



        public string AllergyName { get; set; }

        public string Allergy { get; set; }
        public string AllergyReaction { get; set; }
        public string AllergyTreatment { get; set; }
        public DateTime? AllergyFirstObservedDate { get; set; }
        public DateTime? AllergyLastObservedDate { get; set; }

        public string AllergyComment { get; set; }

        public string AcknowledgeByFromAgency { get; set; }

        public string AcknowledgeByParent { get; set; }

        public DateTime MedicationGivenDate { get; set; }


        public bool IsAcknowledgeByAgencyStaff { get; set; }

        public bool IsAcknowledgeByParent { get; set; }

        public long month { get; set; }

        public bool AttendenceStatus { get; set; }

        public DateTime AttendanceDate { get; set; }

        public DateTime? TeacherClockIN { get; set; }

        public DateTime? TeacherClockOut { get; set; }

        public string InvoiceNumber { get; set; }

        public string AccountName { get; set; }

        public string CustomerName { get; set; }

        public decimal CreditAmount { get; set; }

        public decimal DebitAmount { get; set; }
        public DateTime AskDate { get; set; }
        public long ID { get; set; }
        public bool IsDropIn { get; set; }
        public bool IsDropOut { get; set; }
        public DateTime TransferDate { get; set; }
        public string FromClassName { get; set; }
        public string ToClassName { get; set; }
        public bool IsAttendenceTransferStudent { get; set; }

        public decimal TotalAmount { get; set; }
        public decimal BalanceAmount { get; set; }

        public decimal NetTotal { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal SubsidyAmount { get; set; }
        public long PerDayFeeCalculationID { get; set; }
        public bool IsPartailPayment { get; set; }
        public string Email { get; set; }
        public string TotalHoursInAgency { get; set; }
        public TimeSpan TotalHoursSumInAgency { get; set; }
        public long? ClassesIDReq { get; set; }
        public long BusID { get; set; }
        public string BusName { get; set; }
        public long? BusIDReq { get; set; }

        public string AgencyName { get; set; }
        public string AgencyAddress { get; set; }
        public long AgencyMobile { get; set; }
        public string AgencyEmailID { get; set; }

        public string StudentNames { get; set; }
        public string Description { get; set; }
        public string Coment { get; set; }

        public long ChequeNo { get; set; }
        public long CardNo { get; set; }

        public DateTime AskedDate { get; set; }
        public string AskedDateString { get; set; }
        public string PaymentType { get; set; }
        public string FromDateString { get; set; }
        public string ToDateString { get; set; }
        public string DeletedReason { get; set; }
        public string QuickPin { get; set; }

        public List<ParentStudentMappingViewModel> AssociatedChild { get; set; }

    }
}
