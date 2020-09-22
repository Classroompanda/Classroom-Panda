using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Student
{
    public class StudentMedicationViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long StudentMedicationID { get; set; }
        public long StudentID { get; set; }
        public string MedicationName { get; set; }
        public long AgencyID { get; set; }
        public long Units { get; set; }
        public string strength { get; set; }
        public long DoseRepeatID { get; set; }
        public long DosageQuantityID { get; set; }
        public string DosageQuantityName { get; set; }
        public string DoseRepeatName { get; set; }
        public string HowTaken { get; set; }
        public string OtherMedication { get; set; }
        public DateTime StartDate { get; set; }       
        public DateTime EndDate { get; set; }
        public long Id { get; set; }

        public DateTime MedicationDoneDate { get; set; }
        public long StringId { get; set; }

        public bool isTeacherAcknowledge { get; set; }
        public bool isParentAcknowledge { get; set; }
    }
}
