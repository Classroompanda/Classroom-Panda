using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class InvolvedMealFoodItemsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long MealPlannerID { get; set; }
        public long FoodTypeID { get; set; }
        public string FoodTypeName { get; set; }
        public long Amount { get; set; }
        public long quantity { get; set; }
        public long MeasureUnitTypeID { get; set; }
        public string MeasureUnitTypeName { get; set; }
        public long MeasureQuantityTypeID { get; set; }
        public string MeasureQuantityTypeName { get; set; }

        public long StringId { get; set; }
    }
}
