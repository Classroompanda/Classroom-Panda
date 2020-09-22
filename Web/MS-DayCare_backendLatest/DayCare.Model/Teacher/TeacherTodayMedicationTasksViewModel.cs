using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
   public class TeacherTodayMedicationTasksViewModel : BaseViewModel
    {
        public long StudentID { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentLastName { get; set; }
        public string StudentName { get; set; }
        public long StudentMedicationID { get; set; }
        public string MedicationName { get; set; }
        public long AgencyID { get; set; }        
        public long Units { get; set; }
        public string strength { get; set; }
        public long DoseRepeatID { get; set; }
        public string DoseRepeatName { get; set; }
        public long DosageQuantityID { get; set; }
        public string HowTaken { get; set; }
        public string OtherMedication { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public long? StudentActivityMedicationID { get; set; }
        public bool isMedicationDone { get; set; }

        //public long StudentActivityMedicationId { get; set; }
    }
}
