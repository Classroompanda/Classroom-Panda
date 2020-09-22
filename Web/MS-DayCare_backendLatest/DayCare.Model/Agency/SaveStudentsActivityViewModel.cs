using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class SaveStudentsActivityViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }
        public long ActivityTypeID { get; set; }
        public DateTime ActivityRegisterDate { get; set; }
        public long MealServeTimeDetailsID { get; set; }

        public List<long> selectedStudents { get; set; }
        public StudentActivityMealViewModel StudentActivityMeals { get; set; }
        public StudentActivityMedicationViewModel StudentActivityMedications { get; set; }
        public StudentActivityNoteViewModel StudentActivityNotes { get; set; }
        public StudentActivityMoodViewModel StudentActivityMoods { get; set; }
        public StudentOtherActivityViewModel StudentOtherActivity { get; set; }
        public StudentAcitivityNapViewModel StudentAcitivityNap { get; set; }
        public StudentActivityDiaperViewModel StudentActivityDiaper { get; set; }
        public long StringId { get; set; }
    }
}
