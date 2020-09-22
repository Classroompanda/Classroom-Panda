using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class MealPlannerViewModel :BaseViewModel
    {
        public MealPlannerViewModel()
        {
            this.InvolvedMealFoodItems = new List<InvolvedMealFoodItemsViewModel>();
        }
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long FoodTypeID { get; set; }
        public long MealTypeID { get; set; }
        public long Amount { get; set; }
        public long quantity { get; set; }
        public long PlannerRepeatTypeID { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime EndsOn { get; set; }
        public string Description { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }
        public bool IsBiweekly { get; set; }
        public List<InvolvedMealClassesViewModel> InvolvedClass { get; set; }
        public List<InvolvedMealFoodItemsViewModel> InvolvedMealFoodItems { get; set; }
        public List<InvolvedMealFoodItemsViewModel> InvolvedMealFoodItemsSecond { get; set; }
        
        public List<string> selectedWeekDay { get; set; }
        public long RangeOfDate { get; set; }
        public long StringId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public bool FirstWeek { get; set; }
        

    }
}
