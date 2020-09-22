using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DiscountAmountViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long[] StudentIDs { get; set; }
        public long StudentID { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public Decimal DiscountAmount { get; set; }

        public string DiscountDescription { get; set; }
        public long Agency { get; set; }
        public long StringId { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
