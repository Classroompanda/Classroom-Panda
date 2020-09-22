using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class MealItemMasterViewModel : BaseViewModel
    {
        public  long Id { get; set; }
        public string MealItemMasterName { get; set; }

        public string FoodTypeName { get; set; }
        public long AgencyID { get; set; }

        public long StringID { get; set; }
    }
}
