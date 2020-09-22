using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class AgencyViewModel : BaseViewModel
    {
        public  long Id { get; set; }
        public string AgencyName { get; set; }

        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string ContactPersonFirstName { get; set; }
        public string ContactPersonLastName { get; set; }
        public bool IsExistingAccount { get; set; }
        public bool IsLoggedFirstTime { get; set; }
        public long PayPalUserId { get; set; }
        public long PayPalSubscriptionId { get; set; }
        public bool IsTrial { get; set; }
        
        public DateTime TrialStart { get; set; }

        public DateTime TrialEnd { get; set; }
        
        public bool IsTrialMailSent { get; set; }
        
        public long CurrentSubscriptionPlanId { get; set; }
        
        public DateTime SubscriptionValidUpto { get; set; }
              
        public string TimeZoneSpecification { get; set; }

        public long UserID { get; set; }

        public string EmailId { get; set; }
        public DateTime DateOfBirth { get; set; }

        public long Mobile { get; set; }
       
        public long GenderID { get; set; }
        
        
        public string Profession { get; set; }

        public long StringId { get; set; }
        
        public long CountryId { get; set; }
        
        public long StateId { get; set; }
        
        public long CityId { get; set; }
       
        public string PostalCode { get; set; }

        public string CityName { get; set; }
        public string StateName { get; set; }
        public string CountryName { get; set; }

        public string OwnerName { get; set; }

        public string Address { get; set; }

        public long Status { get; set; }

        public string PlanName { get; set; }

        public DateTime ValidFrom { get; set; }

        public DateTime ValidTo { get; set; }

        public string ImagePath { get; set; }
        public bool LoginStatus { get; set; }

        public DateTime? LastLogin { get; set; }
        public long AgencyID { get; set; }
        public long PlanID { get; set; }

        public bool IsOffline { get; set; }

        public string SourceToken { get; set; }
        public decimal Amount { get; set; }
        public bool IsNew { get; set; }
        public string QuickPin { get; set; }
        public int MessageCount { get; set; }
        public DateTime MessageCountStartDate { get; set; }
        public bool IsPolicyEULAAccept { get; set; }
        public DateTime PolicyEULAAcceptDate { get; set; }
    }
}
