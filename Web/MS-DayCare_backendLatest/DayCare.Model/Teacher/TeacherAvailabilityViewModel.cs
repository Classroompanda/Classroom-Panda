using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
   public class TeacherAvailabilityViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long TeacherID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool OnLeave { get; set; }
        public string OnLeaveComment { get; set; }
        public string DisableOnLeave { get; set; }
        public long ReasonId { get; set; }
    }
}
