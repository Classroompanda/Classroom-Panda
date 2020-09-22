using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentActivityDiaperViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentActivitiesID { get; set; }
        public DateTime DiaperChangeTime { get; set; }
        public string StudentActivityDiaperNote { get; set; }
        public long ActivityTypeID { get; set; }
        public long StringId { get; set; }
        public long StudentID { get; set; }
    }
}
