using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeacherDashboardInfoRequestViewModel
    {
        public long TeacherID { get; set; }
        public long ClassID { get; set; }
        public long AgencyID { get; set; }
        public DateTime AskingDate { get; set; }
    }
}
