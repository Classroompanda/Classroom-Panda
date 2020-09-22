using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class PerDayFeeCalculationViewModel : BaseViewModel
    {
      
       
        public  long Id { get; set; }

        public long AgencyID { get; set; }     
      
        
        public long StudentID { get; set; }

        public long ParentID { get; set; }

        public long ClassID { get; set; }

        public decimal OneDayFee { get; set; }

        public DateTime FeeDate { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsPaid { get; set; }

        public long Agency { get; set; }
        public long StringId { get; set; }

        public long CategoryID { get; set; }

        public string CategoryName { get; set; }
    }
}
