using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class InvoiceDetailsParentViewModel : BaseViewModel
    {
        public long InvoiceDetailsID { get; set; }
        public long Id { get; set; }
        public string InvoiceNo { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public long StudentID { get; set; }
        public long UserID { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime InvoiceFromDate { get; set; }
        public DateTime InvoiceToDate { get; set; }
        public decimal InvoiceAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsInvoicePaid { get; set; }
        public decimal DueAmount { get; set; }
        public long StringId { get; set; }
        public decimal FeePercentage { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

        public string ParentName { get; set; }
       
      
        public string StudentName { get; set; }

        public string ClassName { get; set; }

        public string ClassId { get; set; }

        public string ClassFees { get; set; }

        public bool isTrasactionHeadAdded { get; set; }

        public long[] ClassesID { get; set; }

        public decimal AdvancePaymentBalanceAmount { get; set; }

        public decimal SubsidyAmount { get; set; }

        public decimal AllStudentTotalAmount { get; set; }
        public long SubsidyDetailsID { get; set; }

        public bool IsPartialPayment { get; set; }
        public List<InvoiceItemDetailsViewModel> InvoiceItemDetails { get; set; }
    }
}
