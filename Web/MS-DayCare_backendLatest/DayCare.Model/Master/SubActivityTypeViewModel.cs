using DayCare.Entity.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class SubActivityTypeViewModel 
    {
    public long Id { get; set; }
    public string SubActivityLabel { get; set; }
    public string SubActivityText { get; set; }
    public long AgencyID { get; set; }
    }
}
