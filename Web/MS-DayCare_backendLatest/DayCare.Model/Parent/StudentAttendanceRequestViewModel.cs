using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
    public class StudentAttendanceRequestViewModel : BaseViewModel
    {
        public long? AttendenceId { get; set; }
        public long? AgencyID { get; set; }
        public long? StudentID { get; set; }
        public long? ClassID { get; set; }
        public long ParentID { get; set; }
        public DateTime AskedDate { get; set; }
        public string AskedDateString { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
