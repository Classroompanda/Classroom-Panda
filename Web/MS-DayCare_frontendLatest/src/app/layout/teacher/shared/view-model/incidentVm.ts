export interface IncidentVM {
StudentName?: string;
Age?: number;
Reporter?: string;
IncidentLocation?: string;
ActionTaken?: string;
IsEmergency?: boolean;
StudentID?: number;
TeacherID?: number;
teacherName?: number;
IncidentPriortyTypeID?: number;
IncidentPriortyTypeName?: string;
AgencyID ?: number;
ClassesID ?: number;
ClassName ?: string;
IncidentInvolvments ?:  any;
Id ?: number;
TimeOfIncident?: any;
IncidentTime?: any;
IncidentDate ?: any;
Description?:  any;
 PlaceOfIncident ?: string;
NatureOfInjuryID?: number;
 NatureOfInjuryName?: string;
FirstAidAdministeredID?: number;
 FirstAidAdministeredName?: string;
IsDoctorRequired ?: boolean;
WasParentInformed?: boolean;
ParentInformedBy?: string;
ParentComment?: string;
createdBy?: number;
updatedBy?: number;
partOfBody?: string;
contextEnviroment?: string;
contextChild?: string;
isAcknowledge?: boolean;



}

export interface IncidentInvolvmentVM  {
      studentID ?: string;
    }

