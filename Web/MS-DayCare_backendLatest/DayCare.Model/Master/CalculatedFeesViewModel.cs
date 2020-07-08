using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class CalculatedFeesViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long PerDayFeeCalculationID { get; set; }

        public long AgencyID { get; set; }       
      
        public long ParentID { get; set; }

        public long ClassID  { get; set; }

        public long[] ClassesID { get; set; }

        public long StudentID { get; set; }

        public Decimal TotalPerDayFee { get; set; }

        public Decimal TotalCalculatedAmount { get; set; }

        public bool IsInvoiceGenrated { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime PreviousFromDate { get; set; }

        public DateTime PreviousToDate { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

        public string StudentName { get; set; }

        public string ParentName { get; set; }

        public string ClassName { get; set; }
        public List<ExtraFeeChargeDetailsViewModel> ExtraFees { get; set; }

        public string Agency { get; set; }

        public long  StringId { get; set; }

        public string ClassIDs { get; set; }

        public Decimal DiscountAmount { get; set; }
        public string CalculatedFeeDate { get; set; }

        public string DiscountDetails { get; set; }
        
        public Decimal Amount { get; set; }
        public Decimal CalculatedFees { get; set; }
        
    }

}
