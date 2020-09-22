using DayCare.Model.Response;
using DayCare.Model.Agency;

namespace DayCare.Service.IService.Agency
{
    public interface IEventPlannerService
    {
        ResponseViewModal GetAllEvents(EventSearchViewModel getAllEventsRequest);
        ResponseViewModal GetEventDetails(EventSearchViewModel getEventDetailsRequest);
        ResponseViewModal SaveEvent(EventPlannerViewModel saveEventRequest);
        ResponseViewModal SaveEventInvolvmentClasses(InvolvedEventClassesViewModel saveEventInvolvmentClassesRequest);
        ResponseViewModal DeleteEvent(EventPlannerViewModel deleteEventRequest);
    }
}

