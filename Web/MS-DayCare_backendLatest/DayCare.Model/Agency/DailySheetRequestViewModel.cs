using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class DailySheetRequestViewModel
    {
        public long? StudentActivitiesId { get; set; }
        public long? AgencyID { get; set; }
        public long? StudentID { get; set; }
        public long? ClassID { get; set; }
        public long? ParentID { get; set; }
        public DateTime AskedDate { get; set; }
        public long? ClassesIDReq { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public string AskedDateString { get; set; }
    }
}
