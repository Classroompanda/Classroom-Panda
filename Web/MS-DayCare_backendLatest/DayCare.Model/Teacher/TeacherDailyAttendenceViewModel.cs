using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeacherDailyAttendenceViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string TeacherAttendenceStatusName { get; set; }
        public long AgencyID { get; set; }
        public long TeacherID { get; set; }
        public DateTime ClockIn { get; set; }
        public DateTime ClockOut { get; set; }
        public long AttendenceStatusID { get; set; }
        public DateTime AttendanceDate { get; set; }      
        public bool OnLeave { get; set; }
        public string OnLeaveComment { get; set; }
        public string DisableOnLeave { get; set; }
        public long ReasonId { get; set; }
        public long StringId { get; set; }
    }
}
