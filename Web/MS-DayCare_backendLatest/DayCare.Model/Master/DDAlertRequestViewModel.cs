using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DDAlertRequestViewModel
    {
        public long AgencyID { get; set; }

        public string BusinessToken { get; set; }

        public long AccountNumber { get; set; }
        public string IFSC { get; set; }
        public string AccountHolderName { get; set; }
        public decimal OpeningBalance { get; set; }
        public bool IsDefaultAccount { get; set; }

        public long TransactionMasterID { get; set; }
    }
}
