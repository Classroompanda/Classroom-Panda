using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class CountryViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string NumCode { get; set; }
        public string PhoneCode { get; set; }
        public long AgencyID { get; set; }
    }
}
