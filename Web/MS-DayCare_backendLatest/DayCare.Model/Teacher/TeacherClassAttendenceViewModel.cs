using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeacherClassAttendenceViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long TeacherID { get; set; }
        public long TeacherDailyAttendenceID { get; set; }
        public long ClassesID { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public long CheckStatus { get; set; }
        public string ClassName { get; set; }
        public DateTime ClassStartTime { get; set; }
        public DateTime ClassEndTime { get; set; }
        public long StringId { get; set; }
        public long ClassAssignmentLogID { get; set; }
        public int PresentStudentCount { get; set; }

    }
}
