using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ClassesViewModel : BaseViewModel
    {
        public long ClassesID { get; set; }

        public long Id { get; set; }
        //public string ClassesName { get; set; }
        public long ClassEnrollmentsID { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public string ClassName { get; set; }
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public long ClassStatusId { get; set; }
        public string ClassStatusName { get; set; }
        public long EnrollCapacity { get; set; }
        public long MinAgeFrom { get; set; }
        public long MinAgeTo { get; set; }
        public long MaxAgeFrom { get; set; }
        public long MaxAgeTo { get; set; }
        public DateTime AgeCutOffDate { get; set; }
        public DateTime RegistrationStartDate { get; set; }
        public DateTime ClassStartDate { get; set; }
        public DateTime ClassEndDate { get; set; }
        public DateTime EnrollStartDate { get; set; }
        public DateTime? EnrollEndDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }
        public bool OnGoing { get; set; }
        public long Fees { get; set; }
        public long FeeTypeId { get; set; }
        public string FeeTypeName { get; set; }

        public long StringId { get; set; }

        public long LocationId { get; set; }

        public long RoomId { get; set; }
        public int EnrolledStudentCount { get; set; }

        public string msg { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
    }
}
