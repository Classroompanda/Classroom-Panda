using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class LeaveReasonTypeViewModel : BaseViewModel
    {
        public long LeaveReasonTypeID { get; set; }
        public string LeaveReasonTypeName { get; set; }
        public long AgencyID { get; set; }
    }
}
