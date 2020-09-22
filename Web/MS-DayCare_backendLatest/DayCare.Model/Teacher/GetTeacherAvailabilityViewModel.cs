using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class GetTeacherAvailabilityViewModel : BaseViewModel
    {
        public long AgencyID { get; set; }
        public long TeacherID { get; set; }
        public DateTime AskingDate { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
