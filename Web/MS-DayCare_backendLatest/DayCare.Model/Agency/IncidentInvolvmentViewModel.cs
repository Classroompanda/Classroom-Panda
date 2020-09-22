using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class IncidentInvolvmentViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }
        public long IncidentID { get; set; }
        public long StringId { get; set; }
        public string IncidentInvolvmentsName { get; set; }
    }
}
