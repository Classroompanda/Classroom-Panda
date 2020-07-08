using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DDAlertResponseViewModel
    {

        public long AgencyID { get; set; }
        public string StudentName { get; set; }

        public string  ActivityName { get; set; }

        public long StudentID { get; set; }

        public bool Gong { get; set; }

        public DateTime SignInTime { get; set; }

        public DateTime DiaperChangeTime { get; set; }

        public long StudentActivitiesID { get; set; }

        public DateTime NewActivityTime { get; set; }

        public string Hint { get; set; }

        public long TeacherUserID { get; set; }
        public string TeacherUserName { get; set; }

        public DateTime sleptAtTime { get; set; }
    }
}
