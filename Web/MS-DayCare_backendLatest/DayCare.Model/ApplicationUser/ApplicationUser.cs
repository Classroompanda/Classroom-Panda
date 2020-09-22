using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.ApplicationUser
{
    public class ApplicationUser
    {
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public bool IsValid { get; set; }
        public string IpAddress { get; set; }
        public string MacAddress { get; set; }
        public string BusinessToken { get; set; }
        public long PhoneTypeID { get; set; }
        public string DeviceToken { get; set; }

        public string QuickPin { get; set; }

        public long AgencyID { get; set; }

        ///////
        public int OSType { get; set; }
        public string DeviceModel { get; set; }
        public string OperatingSystemVersion { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public long LoggedUserId { get; set; }
        ///////

    }
}
