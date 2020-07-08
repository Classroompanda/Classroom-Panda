using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ClassesRequestViewModel : BaseViewModel
    {
        public long? AgencyID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public long? ClassID { get; set; }

        public long? ParentID { get; set; }
    }
}
