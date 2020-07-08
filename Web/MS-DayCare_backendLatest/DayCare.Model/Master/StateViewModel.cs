using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class StateViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string StateName { get; set; }
        public long CountryID { get; set; }
        public string StateCode { get; set; }
        public string NumCode { get; set; }
        public string PhoneCode { get; set; }
        public long AgencyID { get; set; }
    }
}
