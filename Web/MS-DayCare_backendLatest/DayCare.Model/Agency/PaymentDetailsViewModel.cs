using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class PaymentDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long ParentID { get; set; }

        public long StudentID { get; set; }


        public long StringID { get; set; }

        public string Email { get; set; }

        public string SourceToken { get; set; }

        public string tokenID { get; set; }

        public long StripeDetailsID { get; set; }

        public string StudentName { get; set; }

        public string ParentName { get; set; }

        public DateTime? PaymentFromDate { get; set; }

        public DateTime? PaymentToDate { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal TotalAmount { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

        public string ClassName { get; set; }

        public long InvoiceDetailsID { get; set; }

        public bool IsOffline { get; set; }

        public string DrType { get; set; }

        public string CrType { get; set; }

        public string InvoiceNo { get; set; }

        public string PaymentType { get; set; }

        public long? ChequeNo { get; set; }

        public long? CardNo { get; set; }

        public decimal AmoutPaid { get; set; }

        public decimal BalanceAmount { get; set; }

        public decimal DiscountAmount { get; set; }

        public bool IsBalaceAmountused { get; set; }

        public bool IsAdvanceCreditAmount { get; set; }
        public decimal CreditAdvanceAmount { get; set; }

        public bool IsAdvanceDebitAmount { get; set; }
        public decimal DebitAdvanceAmount { get; set; }

        public decimal BalanceAdvanceAmount { get; set; }

        public string Agency { get; set; }

        public bool IsPartialPayment { get; set; }
        public decimal PartialAmount { get; set; }

        public decimal SubsidyAmount { get; set; }

        public long SubsidyDetailsID { get; set; }

        public decimal AdvanceAmount { get; set; }

        public DateTime PostingDate { get; set; }
        
        public string InvoiceDescription { get; set; }
        
        public string PaymentDescription { get; set; }
        
        public decimal Amount { get; set; }
        
        public string Check { get; set; }
        
        public string PaymentComment { get; set; }
        
        public string  Notes { get; set; }


    }
}
