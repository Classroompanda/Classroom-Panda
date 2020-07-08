using DayCare.Service.IService.Agency;
using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.Agency
{
    public class EventPlannerService : IEventPlannerService
    {
        public DataContext _dataContext;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classesRepository;
        public ITeacherInfoRepository _teacherRepository;
        public INatureOfInjuryRepository _natureOfInjuryRepository;
        public IEventPlannerRepository _eventPlannerRepository;
        public IInvolvedEventClassesRepository _involvedEventClassesRepository;
        public IPlannerRepeatTypeRepository _plannerRepeatTypeRepository;
        public EventPlannerService(DataContext dataContext,
           IStudentRepository studentRepository,
           IClassesRepository classesRepository,
           ITeacherInfoRepository teacherRepository,
           INatureOfInjuryRepository natureOfInjuryRepository,
           IInvolvedEventClassesRepository involvedEventClassesRepository,
           IEventPlannerRepository eventPlannerRepository,
           IPlannerRepeatTypeRepository plannerRepeatTypeRepository
           )
        {
            _dataContext = dataContext;
            _studentRepository = studentRepository;
            _classesRepository = classesRepository;
            _teacherRepository = teacherRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
            _involvedEventClassesRepository = involvedEventClassesRepository;
            _eventPlannerRepository = eventPlannerRepository;
            _plannerRepeatTypeRepository = plannerRepeatTypeRepository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="getAllEventsRequest"></param>
        /// <returns></returns>
        public ResponseViewModal GetAllEvents(EventSearchViewModel getAllEventsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllEventsRequest.AgencyID > 0)
                {
                    List<EventPlannerViewModel> allEvents = new List<EventPlannerViewModel>();
                    IQueryable<EventPlanner> selectedeventPlans = _eventPlannerRepository.GetAll().Where(check => check.AgencyID == getAllEventsRequest.AgencyID
                     && ((getAllEventsRequest.EventSearchFromDate <= check.StartDate && getAllEventsRequest.EventSearchFromDate >= check.EndDate)
                    || (getAllEventsRequest.EventSearchToDate >= check.StartDate || getAllEventsRequest.EventSearchToDate <= check.EndDate))
                    && check.StartDate.Month == getAllEventsRequest.EventSearchFromDate.Month);

                    IQueryable<InvolvedEventClasses> selectedInvolvedEventClasses = _involvedEventClassesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllEventsRequest.AgencyID);
                    IQueryable<Entity.Masters.PlannerRepeatType> selectedPlannerRepeatType = _plannerRepeatTypeRepository.GetAll();
                    IQueryable<Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getAllEventsRequest.AgencyID);
                    allEvents = (from eventPlansObj in selectedeventPlans
                                 join plannerRepeatTypeObj in selectedPlannerRepeatType on eventPlansObj.PlannerRepeatTypeID equals plannerRepeatTypeObj.Id
                                 where (!eventPlansObj.IsDeleted && getAllEventsRequest.AgencyID == eventPlansObj.AgencyID)
                                 select new EventPlannerViewModel()
                                 {
                                     Id = eventPlansObj.Id,
                                     AgencyID = eventPlansObj.AgencyID,
                                     PlannerRepeatTypeID = eventPlansObj.PlannerRepeatTypeID,
                                     PlannerRepeatTypeName = plannerRepeatTypeObj.PlannerRepeatTypeName,
                                     Title = eventPlansObj.Title,
                                     Start = eventPlansObj.StartDate,
                                     End = eventPlansObj.EndDate,
                                     EndsOn = eventPlansObj.EndsOn ?? DateTime.MinValue,
                                     Description = eventPlansObj.Description,
                                     Mon = eventPlansObj.Mon,
                                     Tue = eventPlansObj.Tue,
                                     Wed = eventPlansObj.Wed,
                                     Thu = eventPlansObj.Thu,
                                     Fri = eventPlansObj.Fri,
                                     Sat = eventPlansObj.Sat,
                                     Sun = eventPlansObj.Sun,
                                     EndTime = eventPlansObj.EndTime,
                                     StartTime = eventPlansObj.StartTime,
                                     InvolvedEventClassesList = (from involvedEventClassesObj in selectedInvolvedEventClasses.Where(check => check.EventPlannerID == eventPlansObj.Id)
                                                                 join classesObj in selectedClass on involvedEventClassesObj.ClassesID equals classesObj.Id
                                                                 where (!involvedEventClassesObj.IsDeleted && getAllEventsRequest.AgencyID == involvedEventClassesObj.AgencyID)
                                                                 select new InvolvedEventClassesViewModel()
                                                                 {
                                                                     Id = involvedEventClassesObj.Id,
                                                                     AgencyID = involvedEventClassesObj.AgencyID,
                                                                     //StudentID = involvedEventClassesObj.StudentID,
                                                                     //StudentName = involvedEventClassesObj.StudentName,
                                                                     ClassesID = involvedEventClassesObj.ClassesID,
                                                                     ClassName = classesObj.ClassName,
                                                                     CreatedBy = involvedEventClassesObj.CreatedBy ?? 0,
                                                                     CreatedDate = involvedEventClassesObj.CreatedDate ?? DateTime.MinValue,
                                                                     UpdatedBy = involvedEventClassesObj.UpdatedBy ?? 0,
                                                                     UpdatedDate = involvedEventClassesObj.UpdatedDate ?? DateTime.MinValue,
                                                                     DeletedBy = involvedEventClassesObj.DeletedBy ?? 0,
                                                                     DeletedDate = involvedEventClassesObj.DeletedDate ?? DateTime.MinValue
                                                                 }).OrderBy(c => c.ClassName).ToList(),
                                     CreatedBy = eventPlansObj.CreatedBy ?? 0,
                                     CreatedDate = eventPlansObj.CreatedDate ?? DateTime.MinValue,
                                     UpdatedBy = eventPlansObj.UpdatedBy ?? 0,
                                     UpdatedDate = eventPlansObj.UpdatedDate ?? DateTime.MinValue,
                                     DeletedBy = eventPlansObj.DeletedBy ?? 0,
                                     DeletedDate = eventPlansObj.DeletedDate ?? DateTime.MinValue
                                 }).OrderBy(c => c.Start).ToList();
                    res.Data = allEvents;
                    if (getAllEventsRequest.limit != 0)
                    {
                        res.Data = allEvents.Skip((getAllEventsRequest.page) * getAllEventsRequest.limit).Take(getAllEventsRequest.limit).ToList();
                    }
                    res.TotalRows = allEvents.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Event is successfully fetched.";
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());

            }
            return res;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="getEventDetailsRequest"></param>
        /// <returns></returns>
        public ResponseViewModal GetEventDetails(EventSearchViewModel getEventDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getEventDetailsRequest.AgencyID > 0 && getEventDetailsRequest.EventID > 0)
                {
                    EventPlannerViewModel eventDetail = new EventPlannerViewModel();
                    IQueryable<EventPlanner> selectedeventPlans = _eventPlannerRepository.GetAll().Where(check => check.AgencyID == getEventDetailsRequest.AgencyID && check.StartDate.Month == getEventDetailsRequest.EventSearchFromDate.Month
                    && check.StartDate.Month >= getEventDetailsRequest.EventSearchToDate.Month && check.Id == getEventDetailsRequest.EventID);
                    IQueryable<InvolvedEventClasses> selectedInvolvedEventClasses = _involvedEventClassesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getEventDetailsRequest.AgencyID);
                    IQueryable<Entity.Masters.PlannerRepeatType> selectedPlannerRepeatType = _plannerRepeatTypeRepository.GetAll().Where(check => check.AgencyID == getEventDetailsRequest.AgencyID);
                    IQueryable<Classes> selectedClass = _classesRepository.GetAll().Where(check => check.AgencyID == getEventDetailsRequest.AgencyID);
                    eventDetail = (from eventPlansObj in selectedeventPlans
                                   join plannerRepeatTypeObj in selectedPlannerRepeatType on eventPlansObj.PlannerRepeatTypeID equals plannerRepeatTypeObj.Id
                                   where (!eventPlansObj.IsDeleted && getEventDetailsRequest.AgencyID == eventPlansObj.AgencyID)
                                   select new EventPlannerViewModel()
                                   {
                                       Id = eventPlansObj.Id,
                                       AgencyID = eventPlansObj.AgencyID,
                                       PlannerRepeatTypeID = eventPlansObj.PlannerRepeatTypeID,
                                       PlannerRepeatTypeName = plannerRepeatTypeObj.PlannerRepeatTypeName,
                                       Title = eventPlansObj.Title,
                                       Start = eventPlansObj.StartDate,
                                       End = eventPlansObj.EndDate,
                                       StartTime = eventPlansObj.StartTime,
                                       EndTime = eventPlansObj.EndTime,
                                       EndsOn = eventPlansObj.EndsOn ?? DateTime.MinValue,
                                       Description = eventPlansObj.Description,
                                       Mon = eventPlansObj.Mon,
                                       Tue = eventPlansObj.Tue,
                                       Wed = eventPlansObj.Wed,
                                       Thu = eventPlansObj.Thu,
                                       Fri = eventPlansObj.Fri,
                                       Sat = eventPlansObj.Sat,
                                       Sun = eventPlansObj.Sun,
                                       InvolvedEventClassesList = (from involvedEventClassesObj in selectedInvolvedEventClasses.Where(check => check.EventPlannerID == eventPlansObj.Id)
                                                                   join classesObj in selectedClass on involvedEventClassesObj.ClassesID equals classesObj.Id
                                                                   where (!involvedEventClassesObj.IsDeleted && getEventDetailsRequest.AgencyID == involvedEventClassesObj.AgencyID)
                                                                   select new InvolvedEventClassesViewModel()
                                                                   {
                                                                       Id = involvedEventClassesObj.Id,
                                                                       AgencyID = involvedEventClassesObj.AgencyID,
                                                                       //StudentID = involvedEventClassesObj.StudentID,
                                                                       //StudentName = involvedEventClassesObj.StudentName,
                                                                       ClassesID = involvedEventClassesObj.ClassesID,
                                                                       ClassName = classesObj.ClassName,
                                                                       CreatedBy = involvedEventClassesObj.CreatedBy ?? 0,
                                                                       CreatedDate = involvedEventClassesObj.CreatedDate ?? DateTime.MinValue,
                                                                       UpdatedBy = involvedEventClassesObj.UpdatedBy ?? 0,
                                                                       UpdatedDate = involvedEventClassesObj.UpdatedDate ?? DateTime.MinValue,
                                                                       DeletedBy = involvedEventClassesObj.DeletedBy ?? 0,
                                                                       DeletedDate = involvedEventClassesObj.DeletedDate ?? DateTime.MinValue
                                                                   }).OrderBy(c => c.ClassName).ToList(),
                                       CreatedBy = eventPlansObj.CreatedBy ?? 0,
                                       CreatedDate = eventPlansObj.CreatedDate ?? DateTime.MinValue,
                                       UpdatedBy = eventPlansObj.UpdatedBy ?? 0,
                                       UpdatedDate = eventPlansObj.UpdatedDate ?? DateTime.MinValue,
                                       DeletedBy = eventPlansObj.DeletedBy ?? 0,
                                       DeletedDate = eventPlansObj.DeletedDate ?? DateTime.MinValue
                                   }).FirstOrDefault();
                    res.Data = eventDetail;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Event Information is successfully fetched.";
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }


            }
            catch (Exception ex)
            {
                res.IsSuccess = false;
                res.StatusCode = 986;
                res.Message = "Something went wrong.";
                res.ReturnMessage.Add(ex.ToString());

            }
            return res;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="saveEventRequest"></param>
        /// <returns></returns>
        public ResponseViewModal SaveEvent(EventPlannerViewModel saveEventRequest)
        {
            ResponseViewModal res = new ResponseViewModal();

            try
            {
                DateTime StartDate = new DateTime();
                DateTime EndDate = new DateTime();
                StartDate = saveEventRequest.Start;
                EndDate = saveEventRequest.End;
                if (saveEventRequest.EndsOn == null)
                    saveEventRequest.EndsOn = new DateTime();


                if (saveEventRequest.AgencyID > 0 && saveEventRequest.PlannerRepeatTypeID != 0)
                {
                    if (saveEventRequest.PlannerRepeatTypeID == 1) //1; "Never"
                    {
                        SaveSingleEvent(saveEventRequest);
                    }
                    else if (saveEventRequest.PlannerRepeatTypeID == 2)//2; "Daily"
                    {
                        if(saveEventRequest.Id == 0)
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.EndsOn; i = i.AddDays(1))
                            {
                                saveEventRequest.Start = i;
                                saveEventRequest.End = i;
                                SaveSingleEvent(saveEventRequest);
                            }
                        }
                        else
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.End; i = i.AddDays(1))
                            {
                                saveEventRequest.Start = i;
                                saveEventRequest.End = i;
                                SaveSingleEvent(saveEventRequest);
                            }
                        }
                    }
                    else if (saveEventRequest.PlannerRepeatTypeID ==  3)//3; "Weekly"
                    {
                        saveEventRequest.selectedWeekDay = new List<string>();
                        saveEventRequest.RangeOfDate = Convert.ToInt32((EndDate - StartDate).TotalDays);
                        if (saveEventRequest.Id == 0)
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.EndsOn; i = i.AddDays(1))
                            {
                                if (StartDate.DayOfWeek == i.DayOfWeek && i < saveEventRequest.EndsOn)
                                {
                                    saveEventRequest.Start = i;
                                    saveEventRequest.End = i.AddDays(saveEventRequest.RangeOfDate);
                                    SaveSingleEvent(saveEventRequest);
                                }
                            }
                        }
                        else
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.End; i = i.AddDays(1))
                            {
                                if (StartDate.DayOfWeek == i.DayOfWeek && i < saveEventRequest.End)
                                {
                                    saveEventRequest.Start = i;
                                    saveEventRequest.End = i.AddDays(saveEventRequest.RangeOfDate);
                                    SaveSingleEvent(saveEventRequest);
                                }
                            }

                        }
                    }
                    else if (saveEventRequest.PlannerRepeatTypeID == 4)//4; "Monthly"
                    {
                        saveEventRequest.RangeOfDate = Convert.ToInt32((EndDate - StartDate).TotalDays);
                        if (saveEventRequest.Id == 0)
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.EndsOn; i = i.AddMonths(1))
                            {
                                if (i.Month <= saveEventRequest.EndsOn.Month)
                                {
                                    saveEventRequest.Start = i;
                                    saveEventRequest.End = i.AddDays(saveEventRequest.RangeOfDate);
                                    SaveSingleEvent(saveEventRequest);
                                }
                            }
                        }
                        else
                        {
                            for (DateTime i = StartDate; i <= saveEventRequest.End; i = i.AddMonths(1))
                            {
                                if (i.Month <= saveEventRequest.End.Month)
                                {
                                    saveEventRequest.Start = i;
                                    saveEventRequest.End = i.AddDays(saveEventRequest.RangeOfDate);
                                    SaveSingleEvent(saveEventRequest);
                                }
                            }

                        }
                    }
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Event has been registered.";
                    res.ReturnMessage.Add("Event Registered");
                }
                else
                {
                    res.StatusCode = 986;
                    res.Message = "Missing Parameter.";
                    res.IsSuccess = false;
                }
            }

            catch (Exception ex)
            {               
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }
            return res;
        }

        private ResponseViewModal SaveSingleEvent(EventPlannerViewModel saveSingleEventRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    if (saveSingleEventRequest.AgencyID > 0)
                    {
                        long id = 0;
                        EventPlanner eventObj = null;
                        if (saveSingleEventRequest.AgencyID != 0 && saveSingleEventRequest.Id == 0)
                        {
                            saveSingleEventRequest.CreatedDate = DateTime.UtcNow;
                            eventObj = new EventPlanner();
                            Mapper.Map(saveSingleEventRequest, eventObj);
                            _eventPlannerRepository.Create(eventObj);
                            _eventPlannerRepository.SaveChanges();
                            id = eventObj.Id;
                        }
                        else if (saveSingleEventRequest.Id > 0)
                        {
                            eventObj = _eventPlannerRepository.Get(x => x.Id == saveSingleEventRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(eventObj, null))
                            {
                                eventObj.Id = saveSingleEventRequest.Id;
                                eventObj.AgencyID = saveSingleEventRequest.AgencyID;
                                eventObj.PlannerRepeatTypeID = saveSingleEventRequest.PlannerRepeatTypeID;
                                eventObj.Title = saveSingleEventRequest.Title;
                                eventObj.StartDate = saveSingleEventRequest.Start;
                                eventObj.EndDate = saveSingleEventRequest.End;
                                eventObj.StartTime = saveSingleEventRequest.StartTime;
                                eventObj.EndTime = saveSingleEventRequest.EndTime;
                                eventObj.EndsOn = saveSingleEventRequest.EndsOn;
                                eventObj.Description = saveSingleEventRequest.Description;
                                eventObj.Mon = saveSingleEventRequest.Mon;
                                eventObj.Tue = saveSingleEventRequest.Tue;
                                eventObj.Wed = saveSingleEventRequest.Wed;
                                eventObj.Thu = saveSingleEventRequest.Thu;
                                eventObj.Fri = saveSingleEventRequest.Fri;
                                eventObj.Sat = saveSingleEventRequest.Sat;
                                eventObj.Sun = saveSingleEventRequest.Sun;

                                eventObj.IsDeleted = saveSingleEventRequest.IsDeleted;
                                eventObj.UpdatedBy = saveSingleEventRequest.UpdatedBy;
                                eventObj.UpdatedDate = saveSingleEventRequest.UpdatedDate;
                                eventObj.DeletedBy = saveSingleEventRequest.DeletedBy;
                                eventObj.DeletedDate = saveSingleEventRequest.DeletedDate;
                                _eventPlannerRepository.SaveChanges();
                                id = eventObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (id > 0 && saveSingleEventRequest.InvolvedEventClassesList != null && saveSingleEventRequest.InvolvedEventClassesList.Count > 0)
                        {
                            List<InvolvedEventClassesViewModel> InvolvedEventClassesToBeDeleted = new List<InvolvedEventClassesViewModel>();
                            InvolvedEventClassesToBeDeleted = (from involvedEventClassesObj in _involvedEventClassesRepository.GetAll()
                                                               where (!involvedEventClassesObj.IsDeleted && saveSingleEventRequest.AgencyID == involvedEventClassesObj.AgencyID && involvedEventClassesObj.EventPlannerID == id)
                                                               select new InvolvedEventClassesViewModel()
                                                               {
                                                                   Id = involvedEventClassesObj.Id,
                                                                   AgencyID = involvedEventClassesObj.AgencyID,
                                                                   ClassesID = involvedEventClassesObj.ClassesID,
                                                                   EventPlannerID = involvedEventClassesObj.EventPlannerID,
                                                                   CreatedBy = involvedEventClassesObj.CreatedBy ?? 0,
                                                                   CreatedDate = involvedEventClassesObj.CreatedDate ?? DateTime.MinValue,
                                                                   UpdatedBy = involvedEventClassesObj.UpdatedBy ?? 0,
                                                                   UpdatedDate = involvedEventClassesObj.UpdatedDate ?? DateTime.MinValue,
                                                                   DeletedBy = involvedEventClassesObj.DeletedBy ?? 0,
                                                                   DeletedDate = involvedEventClassesObj.DeletedDate ?? DateTime.MinValue

                                                               }).OrderBy(c => c.CreatedDate).ToList();

                            if (InvolvedEventClassesToBeDeleted != null && InvolvedEventClassesToBeDeleted.Count > 0)
                            {
                                for (int i = 0; i < InvolvedEventClassesToBeDeleted.Count; i++)
                                {
                                    DeletePreviousEventInvolvmentClasses(InvolvedEventClassesToBeDeleted[i]);
                                }
                            }
                            for (int i = 0; i < saveSingleEventRequest.InvolvedEventClassesList.Count; i++)
                            {
                                saveSingleEventRequest.InvolvedEventClassesList[i].EventPlannerID = id;
                                SaveEventInvolvmentClasses(saveSingleEventRequest.InvolvedEventClassesList[i]);
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Event has been registered.";
                        res.ReturnMessage.Add("Event Registered");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }

                }

                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.IsSuccess = false;
                    res.ReturnMessage.Add(ex.ToString());

                }
            }
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="saveEventInvolvmentClassesRequest"></param>
        /// <returns></returns>
        public ResponseViewModal SaveEventInvolvmentClasses(InvolvedEventClassesViewModel saveEventInvolvmentClassesRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    long id = 0;
                    InvolvedEventClasses involvedEventClassesObj = null;
                    if (saveEventInvolvmentClassesRequest.AgencyID != 0 && saveEventInvolvmentClassesRequest.Id == 0)
                    {
                        
                        saveEventInvolvmentClassesRequest.CreatedDate = DateTime.UtcNow;

                        involvedEventClassesObj = new InvolvedEventClasses();
                        Mapper.Map(saveEventInvolvmentClassesRequest, involvedEventClassesObj);
                        _involvedEventClassesRepository.Create(involvedEventClassesObj);
                        _involvedEventClassesRepository.SaveChanges();
                        id = involvedEventClassesObj.Id;
                    }
                    else if (saveEventInvolvmentClassesRequest.Id > 0)
                    {
                        involvedEventClassesObj = _involvedEventClassesRepository.Get(x => x.Id == saveEventInvolvmentClassesRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(involvedEventClassesObj, null))
                        {
                            involvedEventClassesObj.EventPlannerID = saveEventInvolvmentClassesRequest.EventPlannerID;
                            involvedEventClassesObj.ClassesID = saveEventInvolvmentClassesRequest.ClassesID;
                            involvedEventClassesObj.AgencyID = saveEventInvolvmentClassesRequest.AgencyID;
                            _involvedEventClassesRepository.SaveChanges();
                            id = involvedEventClassesObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    res.SaveId = id;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Event involvment classes has been saved.";
                    res.ReturnMessage.Add("Event involvment Registered");
                }

                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());

                }
            }
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="deletePreviousEventInvolvmentClassesRequest"></param>
        /// <returns></returns>
        private bool DeletePreviousEventInvolvmentClasses(InvolvedEventClassesViewModel deletePreviousEventInvolvmentClassesRequest)
        {
            bool res;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    long id = 0;
                    InvolvedEventClasses involvedEventClassesObj = null;
                    involvedEventClassesObj = new InvolvedEventClasses();
                    if (deletePreviousEventInvolvmentClassesRequest.AgencyID != 0 && deletePreviousEventInvolvmentClassesRequest.EventPlannerID != 0)
                    {
                        deletePreviousEventInvolvmentClassesRequest.IsDeleted = true;
                        deletePreviousEventInvolvmentClassesRequest.DeletedDate = DateTime.UtcNow;

                        involvedEventClassesObj = _involvedEventClassesRepository.Get(x => x.Id == deletePreviousEventInvolvmentClassesRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(involvedEventClassesObj, null))
                        {
                            involvedEventClassesObj.IsDeleted = deletePreviousEventInvolvmentClassesRequest.IsDeleted;
                            involvedEventClassesObj.DeletedBy = deletePreviousEventInvolvmentClassesRequest.DeletedBy;
                            involvedEventClassesObj.DeletedDate = deletePreviousEventInvolvmentClassesRequest.DeletedDate;
                            _involvedEventClassesRepository.SaveChanges();
                            id = involvedEventClassesObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res = true;
                }

                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res = false;

                }
            }
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="deleteEventRequest"></param>
        /// <returns></returns>
        public ResponseViewModal DeleteEvent(EventPlannerViewModel deleteEventRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    if (deleteEventRequest.AgencyID > 0 && deleteEventRequest.Id > 0) // && deleteEventRequest.Start > System.DateTime.UtcNow && deleteEventRequest.End > System.DateTime.UtcNow
                    {
                        long id = 0;
                        EventPlanner eventPlannerObj = null;
                        if (deleteEventRequest.Id > 0)
                        {
                            eventPlannerObj = _eventPlannerRepository.Get(x => x.Id == deleteEventRequest.Id && !x.IsDeleted);
                            if (!ReferenceEquals(eventPlannerObj, null))
                            {
                                eventPlannerObj.DeletedBy = deleteEventRequest.DeletedBy;
                                eventPlannerObj.DeletedDate = deleteEventRequest.DeletedDate;
                                eventPlannerObj.IsDeleted = deleteEventRequest.IsDeleted;
                                _eventPlannerRepository.SaveChanges();
                                id = eventPlannerObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (id > 0 && deleteEventRequest.InvolvedEventClassesList != null && deleteEventRequest.InvolvedEventClassesList.Count > 0)
                        {
                            List<InvolvedEventClassesViewModel> involvedEventClassesToBeDeleted = new List<InvolvedEventClassesViewModel>();
                            involvedEventClassesToBeDeleted = (from involvedEventClassesObj in _involvedEventClassesRepository.GetAll()
                                                               where (!involvedEventClassesObj.IsDeleted && deleteEventRequest.AgencyID == involvedEventClassesObj.AgencyID && involvedEventClassesObj.EventPlannerID == id)
                                                               select new InvolvedEventClassesViewModel()
                                                               {
                                                                   Id = involvedEventClassesObj.Id,
                                                                   AgencyID = involvedEventClassesObj.AgencyID,
                                                                   EventPlannerID = involvedEventClassesObj.EventPlannerID,
                                                                   ClassesID = involvedEventClassesObj.ClassesID,
                                                                   CreatedBy = involvedEventClassesObj.CreatedBy ?? 0,
                                                                   CreatedDate = involvedEventClassesObj.CreatedDate ?? DateTime.MinValue,
                                                                   UpdatedBy = involvedEventClassesObj.UpdatedBy ?? 0,
                                                                   UpdatedDate = involvedEventClassesObj.UpdatedDate ?? DateTime.MinValue,
                                                                   DeletedBy = involvedEventClassesObj.DeletedBy ?? 0,
                                                                   DeletedDate = involvedEventClassesObj.DeletedDate ?? DateTime.MinValue

                                                               }).OrderBy(c => c.CreatedDate).ToList();

                            if (involvedEventClassesToBeDeleted != null && involvedEventClassesToBeDeleted.Count > 0)
                            {
                                for (int i = 0; i < involvedEventClassesToBeDeleted.Count; i++)
                                {
                                    DeletePreviousEventInvolvmentClasses(involvedEventClassesToBeDeleted[i]);
                                }
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Event has been deleted.";
                        res.ReturnMessage.Add("Event Deleted");
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }

                }

                catch (Exception ex)
                {
                    daycaredb.Rollback();
                    res.IsSuccess = false;
                    res.StatusCode = 987;
                    res.Message = "Something went wrong.";
                    res.ReturnMessage.Add(ex.ToString());

                }
            }
            return res;
        }
    }
}


