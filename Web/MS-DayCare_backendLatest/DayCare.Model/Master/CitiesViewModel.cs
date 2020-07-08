using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class CitiesViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public string CityName { get; set; }

        public string CityCode { get; set; }

        public long StateID { get; set; }

        public string NumCode { get; set; }

        public string PhoneCode { get; set; }
        public long AgencyID { get; set; }
    }
}
