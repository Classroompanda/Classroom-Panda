using DayCare.Model.Parent;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class AttendenceViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public string ImagePath { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }
        //public DateTime? Date { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }
        public long AttendenceStatusID { get; set; }
        public string AttendenceStatusName { get; set; }
        //public string VedioFolder { get; set; }
        //public string Imagefolder { get; set; }
        public DateTime AttendanceDate { get; set; }
        public long DropedById { get; set; }
        public string DropedByName { get; set; }
        public long DropedByOtherId { get; set; }
        public long PickupById { get; set; }
        public string PickupByName { get; set; }
        public long PickupByOtherId { get; set; }
        public long ApprovedDropedById { get; set; }
        public long ApprovedPickupById { get; set; }
        public string DropedByOtherNames { get; set; }
        public string PickupByOtherName { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public bool OnLeave { get; set; }
        public string OnLeaveComment { get; set; }
        public string DisableOnLeave { get; set; }
        public long ReasonId { get; set; }
        public bool Transfer { get; set; }

        public bool DailySheetSend { get; set; }
        public bool IsEditModeOn { get; set; }
        public long StringId { get; set; }

        public long BreakStatusId { get; set; }
        public bool IsAttendenceTransferStudent { get; set; }
        
    }
}
