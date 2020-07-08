using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentActivityMealViewModel : BaseViewModel
    {
        public StudentActivityMealViewModel()
        {
            this.StudentActivityMealFoodItems = new List<StudentActivityMealFoodItemsViewModel>();
        }
        public string MealTypeName { get; set; }
        public  long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long StudentActivitiesID { get; set; }
        public long MealTypeID { get; set; }
        public string MealComment { get; set; }
        public string OtherThanPlanMeal { get; set; }
        public string OtherThanPlanMealComment { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
        public long MealPlannerID { get; set; }
        public string MealPlanTitle { get; set; }

        public DateTime ActivityDate { get; set; }

        public string StudentName { get; set; }

        public long ClassID { get; set; }

        public long StudentActivityID { get; set; }
        
        public string ClassName { get; set; }

        public List<StudentActivityMealFoodItemsViewModel> StudentActivityMealFoodItems { get; set; }
        //public List<long> ApplicableMealPlannerID { get; set; }
    }
}
