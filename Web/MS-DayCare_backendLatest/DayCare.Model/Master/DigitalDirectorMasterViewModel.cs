using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DigitalDirectorMasterViewModel : BaseViewModel
    {
         public  long Id { get; set; }

        public long AgencyID { get; set; }                

        //public long StudentActivitiesID { get; set; }
        //public long TimeInterval { get; set; }
        public long Interval { get; set; }

        public long MinInterval { get; set; }

        public string Comment { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
        //public StudentActivities StudentActivities { get; set; }

        public DayCare.Entity.Masters.Agency Agency { get; set; }
    }
}
