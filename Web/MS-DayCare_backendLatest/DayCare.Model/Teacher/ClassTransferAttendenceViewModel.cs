using DayCare.Model.Parent;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Teacher
{
    public class ClassTransferAttendenceViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }       
        public long FromClassID { get; set; }
        public long ToClassID { get; set; }
        public DateTime TransferDate { get; set; }
        public long TeacherID { get; set; }
        public bool Status { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public string Agency { get; set; }
        public long StringId { get; set; }
    }
}
