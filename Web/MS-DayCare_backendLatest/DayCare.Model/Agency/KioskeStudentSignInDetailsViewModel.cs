using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class KioskeStudentSignInDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public long StudentID { get; set; }
        public bool IsDropIn { get; set; }
        public DateTime? DropInDateTime { get; set; }
        public bool IsDropOut { get; set; }
        public DateTime? DropOutDateTime { get; set; }
        public bool IsBreakIn { get; set; }
        public DateTime? BreakInDateTime { get; set; }
        public bool IsBreakOut { get; set; }
        public DateTime? BreakOutDateTime { get; set; }
        public long StringID { get; set; }
    }
}
