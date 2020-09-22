using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class EventPlannerViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long PlannerRepeatTypeID { get; set; }
        public string PlannerRepeatTypeName { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime EndsOn { get; set; }
        public string Description { get; set; }
        public bool Mon { get; set; }
        public bool Tue { get; set; }
        public bool Wed { get; set; }
        public bool Thu { get; set; }
        public bool Fri { get; set; }
        public bool Sat { get; set; }
        public bool Sun { get; set; }
        public List<string> selectedWeekDay { get; set; }
        public long RangeOfDate { get; set; }
        public List<InvolvedEventClassesViewModel> InvolvedEventClassesList { get; set; }

        public string DeletedFromIP { get; set; }
        public string CreatedFromIP { get; set; }
        public string UpdatedFromIP { get; set; }
        public long StringId { get; set; }
        



    }
}
