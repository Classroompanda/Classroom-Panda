using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class IncidentDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public DateTime IncidentDate { get; set; }
        public DateTime IncidentTime { get; set; }
        public string Description { get; set; }
        public string ActionTaken { get; set; }       
        public bool IsEmergency { get; set; }
        public bool IsGeneric { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public long TeacherID { get; set; }
        public string TeacherName { get; set; }
        public long IncidentPriortyTypeID { get; set; }
        public string IncidentPriortyTypeName { get; set; }
        public long AgencyID { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }
        public string PlaceOfIncident { get; set; }
        public long NatureOfInjuryID { get; set; }
        public string NatureOfInjuryName { get; set; }
        public long FirstAidAdministeredID { get; set; }
        public string FirstAidAdministeredName { get; set; }
        public bool IsDoctorRequired { get; set; }
        public bool WasParentInformed { get; set; }
        public string ParentInformedBy { get; set; }
        public List<IncidentInvolvmentViewModel> IncidentInvolvments { get; set; }
        public string ParentComment { get; set; }

        public bool IsAcknowledge { get; set; }
        public string PartOfBody { get; set; }
        public string ContextEnviroment { get; set; }
        public string ContextChild { get; set; }
        public long StringId { get; set; }

        public string AgencyName { get; set; }
        public string AgencyAddress { get; set; }
        public long AgencyMobile { get; set; }
        public string AgencyEmailID { get; set; }


    }
}
