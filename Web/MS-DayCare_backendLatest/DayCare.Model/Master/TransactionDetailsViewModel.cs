using DayCare.Entity.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class TransactionDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long TransactionTypeID { get; set; }

        public TransactionType TransactionType { get; set; } 

        public long AgencyID { get; set; }

        public DayCare.Entity.Masters.Agency Agency { get; set; } 

        public long StudentID { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public long StringId { get; set; }

        public DateTime? InvoiceFromDate { get; set; }
        
        public DateTime? InvoiceToDate { get; set; }
        
        public string InvoiceNo { get; set; }

        public decimal TotalAmount { get; set; }
    }
}
