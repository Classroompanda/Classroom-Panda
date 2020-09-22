using DayCare.Entity.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class TransactionMasterViewModel:BaseViewModel
    {
        public long Id { get; set; }
        public long TransactionTypeID { get; set; }
        public string Description { get; set; }
        public long AgencyID { get; set; }

        public DayCare.Entity.Masters.Agency Agency { get; set; }

        public TransactionType TransactionType { get; set; }

        public long StringId { get; set; }

        public long AccountNumber { get; set; }
        public string IFSC { get; set; }
        public string AccountHolderName { get; set; }
        public decimal OpeningBalance { get; set; }
        public bool IsDefaultAccount { get; set; }

        public string ExtraChargeName { get; set; }

    }
}
