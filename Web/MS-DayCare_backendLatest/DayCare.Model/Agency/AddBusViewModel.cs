using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class AddBusViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long StringId { get; set; }
        public long AgencyID { get; set; }
        public string BusName { get; set; }
    }
}
