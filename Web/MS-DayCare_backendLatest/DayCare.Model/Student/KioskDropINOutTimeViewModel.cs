using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Student
{
   public class KioskDropINOutTimeViewModel : BaseViewModel
    {
        public long? DropInID { get; set; }
        public long? DropOutID { get; set; }

        public bool IsDropIn { get; set; }

        public bool IsDropOut { get; set; }

        public DateTime? DropInTime { get; set; }
        public DateTime? DropOutTime { get; set; }

        public long StudentID { get; set; }

        public DateTime DropInAndOutDate { get; set; }

        public long AgencyID { get; set; }
    }
}
