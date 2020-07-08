using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Student
{
    public class StudentImmunizationViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long StudentImmunizationID { get; set; }        
        public long StudentID { get; set; }
        public long ImmunizationID { get; set; }
        public string ImmunizationName { get; set; }
        public long AgencyID { get; set; }
        public string OtherImmunization { get; set; }
        public string Abbreviation { get; set; }
        public DateTime DateReceived { get; set; }
        public long Id { get; set; }
        public long StringId { get; set; }
    }
}
