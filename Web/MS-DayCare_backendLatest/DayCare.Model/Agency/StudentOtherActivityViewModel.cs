using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
   public class StudentOtherActivityViewModel : BaseViewModel
    {
        public string SubActivityTypeName { get; set; }
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long StudentActivitiesID { get; set; }
        public long SubActivityTypeID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string OtherActivityNote { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
    }
}
