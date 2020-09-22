using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class MasterBaseRequestViewModel : BaseViewModel
    {
        public long? AgencyID { get; set; }
        public long? ClassID { get; set; }
        public long? StudentID { get; set; }
        public long? StateID { get; set; }
        public long? CountryID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public long? ParentID { get; set; }
    }
}
