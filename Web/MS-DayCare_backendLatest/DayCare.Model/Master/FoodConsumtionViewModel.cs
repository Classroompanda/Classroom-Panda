using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class FoodConsumtionViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public string FoodConsumtionName { get; set; }
    }
}
