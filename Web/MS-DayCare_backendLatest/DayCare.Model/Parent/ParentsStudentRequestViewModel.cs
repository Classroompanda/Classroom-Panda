using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
   public class ParentsStudentRequestViewModel
    {
        public long? AgencyID { get; set; }
        public long? ClassID { get; set; }
        public long? StudentID { get; set; }
        public long? ParentID { get; set; }
        public string StudentName { get; set; }
        public DateTime AskedDate { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public bool isParent { get; set; }

        public bool isSecondaryParent { get; set; }

        public bool isGaurdian { get; set; }

    
        public string ActivationType { get; set; }

        public string ParentName { get; set; }

    }
}
