using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class DeleteMealPlanViewModel
    {
        public long MealPlannerID { get; set; }
        public long AgencyID { get; set; }

        public long DeletedBy { get; set; }

        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }

    }
}
