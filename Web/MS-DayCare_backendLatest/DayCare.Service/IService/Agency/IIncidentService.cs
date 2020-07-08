using DayCare.Model.Response;
using DayCare.Model.Agency;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Agency
{
    public interface IIncidentService
    {
        ResponseViewModal GetAllIncidents(IncidentRequestViewModel getAllIncidentsRequest);
        ResponseViewModal SaveIncident(IncidentDetailsViewModel requestSaveIncident);

        ResponseViewModal GetIncidentsDetails(IncidentRequestViewModel getIncidentsDetailsRequest);
        ResponseViewModal DeleteIncident(IncidentDetailsViewModel requestDeleteIncident);
        ResponseViewModal GetBittingIncidentsDetails(IncidentRequestViewModel getBittingIncidentsDetailsRequest);

        ResponseViewModal UpdateIncidentDetailsByParent(IncidentDetailsViewModel requestSaveIncident);
    }
}
