using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class UnapprovedStudentViewModel
    {
        public long? AgencyID { get; set; }
        public long? ClassID { get; set; }
        public long? StudentID { get; set; }
        public long? ParentID { get; set; }
        public string StudentName { get; set; }
        public DateTime AskedDate { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public string ParentName { get; set; }
        public string ClassName { get; set; }
        public long? EnrolledStatus { get; set; }
        public string ImagePath { get; set; }
        public long? EnrollmentID { get; set; }
        public DateTime ClassEnrollStartDate { get; set; }
        public DateTime? classEnrollEndDate { get; set; }

        public long Fees { get; set; }
        public long FeeTypeId { get; set; }
        public string FeeTypeName { get; set; }
    }
}
