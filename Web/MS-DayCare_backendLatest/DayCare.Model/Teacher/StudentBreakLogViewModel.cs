using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class StudentBreakLogViewModel : BaseViewModel
    {
        public long Id { get; set; } // StudentBreakLogID
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassAttendenceID { get; set; }        
        public DateTime BreakInTime { get; set; }        
        public DateTime BreakOutTime { get; set; }        
        public long AttendenceStatusID { get; set; }        
        public DateTime AttendanceDate { get; set; }        
        public long DropedById { get; set; }
        public long DropedByOtherId { get; set; }        
        public long PickupById { get; set; }        
        public long PickupByOtherId { get; set; }        
        public long ApprovedDropedById { get; set; }        
        public long ApprovedPickupById { get; set; }        
        public string DropedByOtherNames { get; set; }        
        public string PickupByOtherName { get; set; }
        public long StringId { get; set; }
        public long BreakStatusId { get; set; }
        public string BreakReason { get; set; }

        public string PickupBy { get; set; }
        public string DropedBy { get; set; }



    }
}
