using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class OneTimePaymentViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public int Amount { get; set; }
        public DateTime? Date { get; set; }
    }
}

