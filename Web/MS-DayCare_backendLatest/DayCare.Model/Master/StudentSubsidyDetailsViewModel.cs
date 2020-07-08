using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
   public class StudentSubsidyDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long[] StudentIDs { get; set; }
        public long StudentID { get; set; }

        public long SubsidyDetailsID { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int limit { get; set; }

        public int page { get; set; }

        public string Agency { get; set; }

        public long StringId { get; set; }

        public string SubsidyTitle { get; set; }

        public string SubsidyName { get; set; }
        public string SubsidyDescription { get; set; }
        public decimal SubsidyAmount { get; set; }
        public string StudentName { get; set; }
        public long ParentID { get; set; }
        public string ClassName { get; set; }
        public string ParentName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
