using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class InvolvedEventClassesViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long EventPlannerID { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }

        public string DeletedFromIP { get; set; }
        public string CreatedFromIP { get; set; }
        public string UpdatedFromIP { get; set; }
        public long StringId { get; set; }
    }
}
