using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class FeeTypeViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long FeeTypeId { get; set; }
        public string FeeTypeName { get; set; }
    }
}
