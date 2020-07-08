using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class RecurringBillingViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long ParentID { get; set; }

        public long StudentID { get; set; }
        public decimal Amount { get; set; }
        public DateTime BillingFromDate { get; set; }

        public DateTime BillingToDate { get; set; }

        public DateTime BillingDate { get; set; }
        public long? ClassesID { get; set; }
        public DateTime? InvoiceGenerateDate { get; set; }
        public int BillingCycle { get; set; }
        public string BillingCycleName { get; set; }
        public string BillingDescription { get; set; }
        public int TransactionType { get; set; }
        public long StringId { get; set; }
    }
}
