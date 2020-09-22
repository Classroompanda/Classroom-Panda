using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class ClassCategoryViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public string CategoryName { get; set; }
        public long FromAge { get; set; }
        public long ToAge { get; set; }
        public long StringID { get; set; }

    }
}
