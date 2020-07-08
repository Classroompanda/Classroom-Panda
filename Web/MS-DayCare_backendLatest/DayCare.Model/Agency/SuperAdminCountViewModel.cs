using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class SuperAdminCountViewModel
    {
        public long ApprovedAgencyCount { get; set; }

        public long UnApprovedAgencyCount { get; set; }

        public long SubscriptionActiveAgencyCount { get; set; }

        public long ApprovedAgencyID { get; set; }


        public long EnrolledStudent { get; set; }
        public long RequestedStudent { get; set; }
        public long PresentStudent { get; set; }
    }
}
