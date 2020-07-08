using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class EventSearchViewModel
    {
        public long EventID { get; set; }
        public string ClassID { get; set; }
        public long AgencyID { get; set; }
        public long UserID { get; set; }
        public DateTime EventSearchFromDate { get; set; }
        public DateTime EventSearchToDate { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
