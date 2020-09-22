using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AddCityViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long CountryID { get; set; }
        public long StateID { get; set; }
        public long CityID { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public long AgencyID { get; set; }

        public string StateCode { get; set; }
        public string NumCode { get; set; }
        public string CityCode { get; set; }
        
        public string PhoneCode { get; set; }
        public long StringId { get; set; }

    }
}
