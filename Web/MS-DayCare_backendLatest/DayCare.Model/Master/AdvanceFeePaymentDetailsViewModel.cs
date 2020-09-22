
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AdvanceFeePaymentDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }       

        public long AgencyID { get; set; }

        public long ParentID { get; set; }           

        public long StudentID { get; set; }

        public long InvoiceDetailsID { get; set; }

        public bool IsAdvanceCreditAmount { get; set; }
        public decimal CreditAdvanceAmount { get; set; }

        public bool IsAdvanceDebitAmount { get; set; }
        public decimal DebitAdvanceAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public bool IsOffline { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

       
        public string Agency { get; set; }

        public long StringId { get; set; }

       public string TransactionDetails { get; set; }
    }

}
