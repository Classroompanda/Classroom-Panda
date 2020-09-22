using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentActivityMedicationViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long StudentID { get; set; }
        public long AgencyID { get; set; }
        public long StudentActivitiesID { get; set; }
        public string StudentHealthDescription { get; set; }
        public string RecordedTemparture { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
        public long DoseRepeatID { get; set; }
        public string DoseRepeatName { get; set; }
        public long DosageQuantityID { get; set; }
        public long Unit { get; set; }
        public long ClassesID { get; set; }
        public string HowTaken { get; set; }
        public long StudentMedicationID { get; set; }
        public string StudentMedicationName { get; set; }

        public bool isParentAcknowledge { get; set; }
        public bool isTeacherAcknowledge { get; set; }

        public long AcknowledgeParentID { get; set; }
        public long AcknowledgeTeacherID { get; set; }
        public string AcknowledgeParentName { get; set; }
        public string AcknowledgeTeacherName { get; set; }

        public bool IsMedicationDoneToday { get; set; }

        public DateTime MedicationDoneDate { get; set; }

    }
}
