using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentsDailyActivityViewModel : BaseViewModel
    {
        public long StudentActivityID { get; set; }
        public long ActivityTypeID { get; set; }
        public long StudentID { get; set; }
        public string ActivityDescription { get; set; }
        public string ActivityTypeName { get; set; }
        public string RecordTemp { get; set; }
        public string Mood { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public long AgencyID { get; set; }
        public long MealTypeID { get; set; }
        public long ClassID { get; set; }
        public string StudentName { get; set; }

        public string ClassName { get; set; }

        public string MealServeType { get; set; }

        public long MealServeTimeDetailsID { get; set; }

        public DateTime ActivityDate { get; set; }

        public string AgencyName { get; set; }
        public string AgencyAddress { get; set; }
        public long AgencyMobile { get; set; }
        public string AgencyEmailID { get; set; }

        public List<StudentActivityMealViewModel> StudentActivityMeals { get; set; }


    }
}
