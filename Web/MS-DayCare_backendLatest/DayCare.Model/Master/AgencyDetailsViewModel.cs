using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AgencyDetailsViewModel : BaseViewModel
    {
        public int limit { get; set; }
        public int page { get; set; }

        public long status { get; set; }

        public long agencyID { get; set; }

        public long stringID { get; set; }

        public string AgencyName { get; set; }
        public string AgencyAddress { get; set; }
        public string AgencyEmail { get; set; }
        public string AgencyMobile { get; set; }
        public string AgencyImage { get; set; }
    }
}
