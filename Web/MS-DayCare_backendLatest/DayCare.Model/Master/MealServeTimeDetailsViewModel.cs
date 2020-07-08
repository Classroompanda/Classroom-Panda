using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class MealServeTimeDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }        
        public long AgencyID { get; set; }
        public DateTime MealServeTimeFrom { get; set; }
        public DateTime MealServeTimeTo { get; set; }
        public string MealServeType { get; set; }
    }
}
