using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class PricingPlanViewModel : BaseViewModel
    {
        public long Id { get; set; }        
     
        public string PlanName { get; set; }

        public long NumberofUsers { get; set; }

        public decimal PlanPrice { get; set; }

        public string Frequency { get; set; }
        public string Remark { get; set; }
        public long StringId { get; set; }
      
    }
}
