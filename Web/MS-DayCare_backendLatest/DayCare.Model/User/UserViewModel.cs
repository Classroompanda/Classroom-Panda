using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.User
{
    public class UserViewModel :BaseViewModel
    {
        public long Id { get; set; }       
        public string  FirstName { get; set; }               
        public string LastName { get; set; }             
        
        public string Token { get; set; }
               
        public string UserName { get; set; }
              
        
        public string Password { get; set; }
        
        public long AccessFailedCount { get; set; }
        
        public bool IsBlock { get; set; }
        
        public DateTime? BlockDateTime { get; set; }       
        
        
        public long RoleId { get; set; }
              
        
        public string EmailAddress { get; set; }               
        
        public long PhoneNumber { get; set; }
        
        public long QuickPin { get; set; }

             
        
        public long AgencyID { get; set; }

        
        public long DeviceID { get; set; }

        
        public long PhoneTypeID { get; set; }

        
        public string DeviceToken { get; set; }

        
        public string Timezone { get; set; }

        
        public long loggedInStatusID { get; set; }

        
        public bool IsLoggedIn { get; set; }

        public long StringId { get; set; }




    }
}
