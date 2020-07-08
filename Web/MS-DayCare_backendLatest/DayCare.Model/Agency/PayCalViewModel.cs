using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class PayCalViewModel
    {
        public decimal classFess { get; set; }
        public long  studentID { get; set; }
        public long enrollmentID { get; set; }

        public DateTime classEnrollDate { get; set; }

        public long classID { get; set; }

        public long parentID { get; set; }
    }
}
