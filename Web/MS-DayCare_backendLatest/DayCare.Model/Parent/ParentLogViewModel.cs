using System;
using System.Collections.Generic;
using System.Text;
using DayCare.Model.Agency;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
    public class ParentLogViewModel : BaseViewModel
    {
        public long ID { get; set; }
        public long AgencyID { get; set; }
        public long? ParentID { get; set; }
        public string ColumnName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime ValueUpdateDate { get; set; }
        public string ParentName { get; set; }
        public string UpdatedFor { get; set; }


    }
}
