using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ClassEnrollmentViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public DateTime ClassEnrollStartDate { get; set; }
        public DateTime? ClassEnrollEndDate { get; set; }
        public long EnrollmentStatus { get; set; }
        public long StringId { get; set; }
        public long Fees { get; set; }
        public long FeeTypeId { get; set; }
    }
}
