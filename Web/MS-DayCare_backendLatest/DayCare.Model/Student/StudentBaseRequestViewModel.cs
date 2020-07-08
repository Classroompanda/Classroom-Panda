using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Student
{
    public class StudentBaseRequestViewModel : BaseViewModel
    {
        public long? AgencyID { get; set; }
        public long? ClassID { get; set; }
        public long? StudentID { get; set; }
        public string StudentName { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public bool isAuthorized { get; set; }
        public long? ParentID { get; set; }
        public string ActivationType { get; set; }
        public bool IsAuthPerson { get; set; }
        public string QuickPin { get; set; }
        public long ID { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public bool IsCheckInTime { get; set; }
        public long UpdatedBy { get; set; }
    }
}
