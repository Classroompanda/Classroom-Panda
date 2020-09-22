using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class NatureOfInjuryViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string NatureOfInjuryName { get; set; }
        public long AgencyID { get; set; }
    }
}
