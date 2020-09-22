using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
   public class AttendanceRequestViewModel
    {
        public long? AttendenceId { get; set; }
        public long? AgencyID { get; set; }
        public long? StudentID { get; set; }
        public long? ClassID { get; set; }

        public DateTime AskedDate    { get; set; }
        public string AskedDateString { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public long ID { get; set; }
        public DateTime ClockOutTime { get; set; }
        public DateTime ClockInTime { get; set; }

    }
}
