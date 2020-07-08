using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class IncidentRequestViewModel
    {
        public long IncidentID { get; set; }
        public long StudentID { get; set; }
        public long AgencyID { get; set; }
        public long UserID { get; set; }
        public DateTime IncidentDate { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public string StudentName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

    }
}
