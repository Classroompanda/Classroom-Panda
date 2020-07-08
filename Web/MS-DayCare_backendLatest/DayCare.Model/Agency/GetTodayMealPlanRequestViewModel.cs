using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class GetTodayMealPlanRequestViewModel
    {
        public long? AgencyID { get; set; }
        public long? StudentID { get; set; }
        public long? ClassID { get; set; }
        public DateTime AskedDate { get; set; }
    }
}
