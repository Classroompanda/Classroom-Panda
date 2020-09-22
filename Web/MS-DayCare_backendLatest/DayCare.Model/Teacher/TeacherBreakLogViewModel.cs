using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class TeacherBreakLogViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }        
        public DateTime BreakIn { get; set; }        
        public DateTime BreakOut { get; set; }
        public long TeacherDailyAttendenceID { get; set; }
        public long BreakTypesID { get; set; }
        public string BreakTypesName { get; set; }
        public long BreakStatusID { get; set; }
        public long StringId { get; set; }
        public string BreakReason { get; set; }
    }
}
