using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class CountryStateViewModel : BaseViewModel
    {
        public long CountryId { get; set; }
        public long StateId { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string NumCode { get; set; }
        public string PhoneCode { get; set; }
        public long AgencyID { get; set; }
        public string StateName { get; set; }
        public long CountryID { get; set; }
        public string StateCode { get; set; }

    }
}

