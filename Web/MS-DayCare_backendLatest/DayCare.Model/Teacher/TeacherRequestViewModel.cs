using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeacherRequestViewModel
    {
        public long? AgencyID { get; set; }
        public long? TeacherID { get; set; }
        public long? ClassID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public string ActivationType { get; set; }

        public string TeacherName { get; set; }

        public DateTime AskedDate { get; set; }
        public string AskedDateString { get; set; }
    }
}
