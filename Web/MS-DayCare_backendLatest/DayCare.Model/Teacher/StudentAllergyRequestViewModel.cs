using System;

namespace DayCare.Model.Teacher
{
    public class StudentAllergyRequestViewModel : BaseViewModel
    {
        public long AgencyID { get; set; }
        public DateTime AskingDate { get; set; }
        public long TeacherID { get; set; }
        public long ClassID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}

