using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Entity.Agency
{
    public class InvoiceDuplicateCheckViewModel
    {
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }

        public DateTime InvoiceFromDate { get; set; }
        public DateTime InvoiceToDate { get; set; }
    }
}
