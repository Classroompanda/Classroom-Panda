using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ParticularStudentActivityRequestViewModel : BaseViewModel
    {
        public long StudentAcitivityId { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
    }
}
