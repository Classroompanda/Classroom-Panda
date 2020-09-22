using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class StudentBreakLogRequestViewModel
    {
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassAttendenceID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
