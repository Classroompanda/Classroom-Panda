using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class InvoiceItemDetailsViewModel :BaseViewModel
    {
        public long Id { get; set; }
        public long InvoiceDetailsID { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }
        public decimal ClassFees { get; set; }
    }
}
