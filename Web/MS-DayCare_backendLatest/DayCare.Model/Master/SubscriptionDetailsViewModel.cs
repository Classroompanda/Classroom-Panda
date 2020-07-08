using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class SubscriptionDetailsViewModel:BaseViewModel
    {
        public  long Id { get; set; }
       
        public long AgencyID { get; set; }
        
        public long PlanID { get; set; }
        
        public DateTime ValidFromDate { get; set; }
        
        public DateTime ValidToDate { get; set; }
        
        public bool IsOffline { get; set; }

        public long StringId { get; set; }

        public string SourceToken { get; set; }
              
        public string CustomerId { get; set; }
        
        public string CustomerName { get; set; }
        
        public string ProductId { get; set; }
        
        public string ProductName { get; set; }
        
        public string StripePlanId { get; set; }
        
        public string PlanName { get; set; }
        
        public string StripeSubscriptionId { get; set; }
        
        public string Interval { get; set; }        
        public decimal Amount { get; set; }
        public string EmailId { get; set; }
        public bool IsNew { get; set; }

    }
}
