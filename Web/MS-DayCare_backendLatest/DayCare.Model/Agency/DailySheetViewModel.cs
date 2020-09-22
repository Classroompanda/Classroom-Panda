using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class DailySheetViewModel : StudentActivities
    {
        public string StudentName { get; set; }
        public string ImagePath { get; set; }
        public string ActivityTypeName { get; set; }
        public string ClassName { get; set; }
        public long ParentID { get; set; }
        public long UserID { get; set; }
        public long TotalActivityCount { get; set; }
        public string ParentEmail { get; set; }
        public List<StudentsDailyActivityViewModel> ActivityDetail { get; set; }
        public List<StudentActivityMealViewModel> StudentActivityMeals { get; set; }
        public List<StudentActivityMedicationViewModel> StudentActivityMedications { get; set; }
        public List<StudentActivityNoteViewModel> StudentActivityNotes { get; set; }
        public List<StudentActivityMoodViewModel> StudentActivityMoods { get; set; }
        public List<StudentOtherActivityViewModel> StudentOtherActivity { get; set; }
        public List<StudentAcitivityNapViewModel> StudentAcitivityNap { get; set; }
        public List<StudentActivityDiaperViewModel> StudentActivityDiaper { get; set; }
    }
}
