using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
   public class TeacherTodayMedicationTasksRequestViewModel : BaseViewModel
    {
        public long AgencyID { get; set; }
        public DateTime AskingDate { get; set; }
        public long TeacherID { get; set; }
        public long ClassID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
