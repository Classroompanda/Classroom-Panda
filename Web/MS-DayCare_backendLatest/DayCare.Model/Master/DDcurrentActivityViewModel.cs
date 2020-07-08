using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DDcurrentActivityViewModel
    {
        public string ActivityName { get; set; }

        public long TimeIntervalId { get; set; }

        public long MinIntervalId { get; set; }
        public long ID { get; set; }
        public long ActivityID { get; set; }

        public long AgencyID { get; set; }
    }
}
