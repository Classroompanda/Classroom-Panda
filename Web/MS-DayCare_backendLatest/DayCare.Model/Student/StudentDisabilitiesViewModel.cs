using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Student
{
    public class StudentDisabilitiesViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long Id { get; set; }
        public long StudentID { get; set; }
        public string Description { get; set; }
        public long AgencyID { get; set; }
        public long StringId { get; set; }
    }
}
