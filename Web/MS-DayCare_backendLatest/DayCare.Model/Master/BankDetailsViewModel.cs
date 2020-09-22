using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class BankDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountType { get; set; }
        public decimal AmountFirst { get; set; }
        public decimal AmountSecond { get; set; }
        public long AddedParentID { get; set; }
    }
}
