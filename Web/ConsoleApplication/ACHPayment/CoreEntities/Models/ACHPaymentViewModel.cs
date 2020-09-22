using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.Models
{
    public class ACHPaymentViewModel
    {
        public long RecurringPaymentID { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public long StudentID { get; set; }
        public long Amount { get; set; }
        public string CustomerID { get; set; }
        public string AgencyApiKey { get; set; }
        public string PaymentComment { get; set; }
    }
}

