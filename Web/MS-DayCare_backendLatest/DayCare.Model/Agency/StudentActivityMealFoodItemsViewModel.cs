using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentActivityMealFoodItemsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long StudentActivityMealID { get; set; }
        public long FoodTypeID { get; set; }
        public string FoodTypeName { get; set; }
        //public long ConsumedAmount { get; set; }
        //public long ConsumedQuantity { get; set; }
        //public long ConsumedMeasureUnitTypeID { get; set; }
        //public long ConsumedMeasureQuantityTypeID { get; set; }
        public long Amount { get; set; }
        public long Quantity { get; set; }
        public string QuantityName { get; set; }
        public long MeasureUnitTypeID { get; set; }
        public string MeasureUnitTypeName { get; set; }
        public long MeasureQuantityTypeID { get; set; }
        public string MeasureQuantityTypeName { get; set; }
        public long FoodConsumtionID { get; set; }
        public string FoodConsumtionName { get; set; }
        public long StringId { get; set; }
        public string MilkConsumptionQuantity { get; set; }

    }
}
