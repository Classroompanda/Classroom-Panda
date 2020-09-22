using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
   public class StudentAcitivityNapViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long StudentActivitiesID { get; set; }
        public DateTime SleptAtTime { get; set; }
        public DateTime WorkUpTime { get; set; }
        public string NapNote { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
    }
}
