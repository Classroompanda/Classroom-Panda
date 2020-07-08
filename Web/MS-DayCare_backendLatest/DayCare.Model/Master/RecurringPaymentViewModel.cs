using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class RecurringPaymentViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentFromDate { get; set; }
        public DateTime PaymentToDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public DateTime? NextPaymentDate { get; set; }
        public DateTime? PreviousPaymentDate { get; set; }
        public int BillingCycle { get; set; }
        public string CustomerID { get; set; }
        public string AgencyApikey { get; set; }
        public long StringId { get; set; }
        public long AddedParentID { get; set; }
    }
}




