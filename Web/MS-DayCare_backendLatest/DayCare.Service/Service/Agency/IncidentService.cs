using AutoMapper;
using DayCare.Model.Response;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Model.Agency;
using DayCare.Repository.IRepository;
using DayCare.Service.IService.Agency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlTypes;
using static DayCare.Service.Common.CommonEnum;

namespace DayCare.Service.Service.Agency
{
    public class IncidentService : IIncidentService
    {
        public DataContext _dataContext;
        public IIncidentRepository _incidentRepository;
        public IIncidentInvolvmentRepository _incidentInvolvmentRepository;
        public IStudentRepository _studentRepository;
        public IClassesRepository _classesRepository;
        public ITeacherInfoRepository _teacherRepository;
        public IIncidentPriortyTypeRepository _incidentPriortyTypeRepository;
        public INatureOfInjuryRepository _natureOfInjuryRepository;


        public IncidentService(DataContext dataContext,
           IIncidentRepository incidentRepository,
           IIncidentInvolvmentRepository incidentInvolvmentRepository,
           IStudentRepository studentRepository,
           IClassesRepository classesRepository,
           ITeacherInfoRepository teacherRepository,
           IIncidentPriortyTypeRepository incidentPriortyTypeRepository,
           INatureOfInjuryRepository natureOfInjuryRepository
           )
        {
            _dataContext = dataContext;
            _incidentRepository = incidentRepository;
            _incidentInvolvmentRepository = incidentInvolvmentRepository;
            _studentRepository = studentRepository;
            _classesRepository = classesRepository;
            _teacherRepository = teacherRepository;
            _incidentPriortyTypeRepository = incidentPriortyTypeRepository;
            _natureOfInjuryRepository = natureOfInjuryRepository;
        }

        /// <summary>
        /// GetAllIncidents
        /// </summary>
        /// <param name="getAllIncidentsRequest"></param>
        /// <returns></returns>
        public ResponseViewModal GetAllIncidents(IncidentRequestViewModel getAllIncidentsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getAllIncidentsRequest.AgencyID > 0)
                {
                    var maxDate = (DateTime)SqlDateTime.MaxValue;
                    var minDate = (DateTime)SqlDateTime.MinValue;

                    var fromDate = getAllIncidentsRequest.FromDate;
                    var toDate = getAllIncidentsRequest.ToDate;

                    if (!(minDate <= fromDate && fromDate <= maxDate))
                    {
                        fromDate = minDate;
                    }

                    if (!(minDate <= toDate && toDate <= maxDate))
                    {
                        toDate = maxDate;
                    }
                    string StudentName;

                    if (getAllIncidentsRequest.StudentName == null)
                    {
                        StudentName = "";
                    }
                    else
                    {
                        StudentName = getAllIncidentsRequest.StudentName.TrimStart();
                        StudentName = StudentName.TrimEnd();
                    }                   

                    getAllIncidentsRequest.StudentName = (getAllIncidentsRequest.StudentName ?? string.Empty).Trim().ToLower();
                    var isStudentEmpty = string.IsNullOrEmpty(getAllIncidentsRequest.StudentName);

                    List<IncidentDetailsViewModel> allIncidents = new List<IncidentDetailsViewModel>();
                    var selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID && classCheck.NatureOfInjuryID != 2 && !classCheck.IsDeleted && (fromDate.Date <= classCheck.IncidentDate.Date && classCheck.IncidentDate.Date <= toDate.Date));
                    var selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedTeachers = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();
                    var selectedClasses = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    var selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();
                    var selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getAllIncidentsRequest.AgencyID);
                    allIncidents = (from incidentObj in selectedIncident
                                    join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                    join teacherObj in selectedTeachers on incidentObj.TeacherID equals teacherObj.Id
                                    join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                    join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                    join classObj in selectedClasses on incidentObj.ClassesID equals classObj.Id
                                    join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                    where (!incidentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentObj.AgencyID && isStudentEmpty || studentObj.StudentName.ToUpper().Contains(StudentName.ToUpper()))
                                    select new IncidentDetailsViewModel()
                                    {
                                        Id = incidentObj.Id,
                                        IncidentDate = incidentObj.IncidentDate,
                                        Description = incidentObj.Description ?? String.Empty,
                                        ActionTaken = incidentObj.ActionTaken ?? String.Empty,
                                        IsEmergency = incidentObj.IsEmergency,
                                        IsGeneric = incidentObj.IsGeneric,
                                        StudentID = incidentObj.StudentID,
                                        StudentName = studentObj.StudentName ?? String.Empty,
                                        TeacherID = incidentObj.TeacherID,
                                        TeacherName = teacherObj.TeacherName ?? String.Empty,
                                        IncidentPriortyTypeID = incidentObj.IncidentPriortyTypeID,
                                        IncidentPriortyTypeName = incidentPriortyTypeObj.IncidentPriortyTypeName ?? String.Empty,
                                        AgencyID = incidentObj.AgencyID,
                                        ClassesID = incidentObj.ClassesID,
                                        ClassName = classObj.ClassName ?? String.Empty,
                                        PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty,
                                        NatureOfInjuryID = incidentObj.NatureOfInjuryID,
                                        NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                        FirstAidAdministeredID = incidentObj.FirstAidAdministeredID,
                                        FirstAidAdministeredName = FirstAidAdministeredObj.TeacherName ?? String.Empty,
                                        IsDoctorRequired = incidentObj.IsDoctorRequired,
                                        WasParentInformed = incidentObj.WasParentInformed,
                                        ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty,
                                        IncidentTime = incidentObj.IncidentTime,
                                        ParentComment = incidentObj.ParentComment,
                                        IsAcknowledge = incidentObj.IsAcknowledge,
                                        PartOfBody = incidentObj.PartOfBody,
                                        ContextChild = incidentObj.ContextChild,
                                        ContextEnviroment = incidentObj.ContextEnviroment,
                                        IncidentInvolvments = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll().Where(check => check.IncidentID == incidentObj.Id)
                                                               join studentObj in _studentRepository.GetAll() on incidentInvolvmentObj.StudentID equals studentObj.Id
                                                               where (!incidentInvolvmentObj.IsDeleted && getAllIncidentsRequest.AgencyID == incidentInvolvmentObj.AgencyID)
                                                               select new IncidentInvolvmentViewModel()
                                                               {
                                                                   Id = incidentInvolvmentObj.Id,
                                                                   AgencyID = incidentInvolvmentObj.AgencyID,
                                                                   StudentID = incidentInvolvmentObj.StudentID,
                                                                   StudentName = studentObj.StudentName ?? String.Empty,
                                                                   IncidentID = incidentInvolvmentObj.IncidentID,
                                                                   CreatedBy = incidentInvolvmentObj.CreatedBy ?? 0,
                                                                   CreatedDate = incidentInvolvmentObj.CreatedDate ?? DateTime.MinValue,
                                                                   UpdatedBy = incidentInvolvmentObj.UpdatedBy ?? 0,
                                                                   UpdatedDate = incidentInvolvmentObj.UpdatedDate ?? DateTime.MinValue,
                                                                   DeletedBy = incidentInvolvmentObj.DeletedBy ?? 0,
                                                                   DeletedDate = incidentInvolvmentObj.DeletedDate ?? DateTime.MinValue
                                                               }).ToList(),
                                        CreatedBy = incidentObj.CreatedBy ?? 0,
                                        CreatedDate = incidentObj.CreatedDate ?? DateTime.MinValue,
                                        UpdatedBy = incidentObj.UpdatedBy ?? 0,
                                        UpdatedDate = incidentObj.UpdatedDate ?? DateTime.MinValue,
                                        DeletedBy = incidentObj.DeletedBy ?? 0,
                                        DeletedDate = incidentObj.DeletedDate ?? DateTime.MinValue
                                    }).OrderByDescending(c => c.IncidentDate).ToList();
                    res.Data = allIncidents;
                    if (getAllIncidentsRequest.limit != 0)
                    {
                        res.Data = allIncidents.Skip((getAllIncidentsRequest.page) * getAllIncidentsRequest.limit).Take(getAllIncidentsRequest.limit).ToList();
                    }
                    res.TotalRows = allIncidents.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "All Incidents is successfully fetched.";
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

        public ResponseViewModal GetIncidentsDetails(IncidentRequestViewModel getIncidentsDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            res.Data = new IncidentDetailsViewModel();
            try
            {
                if (getIncidentsDetailsRequest.AgencyID > 0)
                {
                    IncidentDetailsViewModel incidentsDetails = new IncidentDetailsViewModel();
                    var selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedTeacher = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();
                    var selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);
                    var selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();
                    var selectedClass = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getIncidentsDetailsRequest.AgencyID);

                    incidentsDetails = (from incidentObj in selectedIncident
                                        join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                        join teacherObj in selectedTeacher on incidentObj.TeacherID equals teacherObj.Id
                                        join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                        join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                        join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                        join classObj in selectedClass on incidentObj.ClassesID equals classObj.Id
                                        where (!incidentObj.IsDeleted && getIncidentsDetailsRequest.AgencyID == incidentObj.AgencyID
                                        && getIncidentsDetailsRequest.IncidentID == incidentObj.Id)
                                        select new IncidentDetailsViewModel()
                                        {
                                            Id = incidentObj.Id,
                                            IncidentDate = incidentObj.IncidentDate,
                                            //added
                                            IncidentTime = incidentObj.IncidentTime,
                                            Description = incidentObj.Description ?? String.Empty,
                                            ActionTaken = incidentObj.ActionTaken ?? String.Empty,
                                            IsEmergency = incidentObj.IsEmergency,
                                            IsGeneric = incidentObj.IsGeneric,
                                            StudentID = incidentObj.StudentID,
                                            StudentName = studentObj.StudentName ?? String.Empty,
                                            TeacherID = incidentObj.TeacherID,
                                            TeacherName = teacherObj.TeacherName ?? String.Empty,
                                            IncidentPriortyTypeID = incidentObj.IncidentPriortyTypeID,
                                            IncidentPriortyTypeName = incidentPriortyTypeObj.IncidentPriortyTypeName ?? String.Empty,
                                            AgencyID = incidentObj.AgencyID,
                                            ClassesID = incidentObj.ClassesID,
                                            ClassName = classObj.ClassName ?? String.Empty,
                                            PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty,
                                            NatureOfInjuryID = incidentObj.NatureOfInjuryID,
                                            NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                            FirstAidAdministeredID = incidentObj.FirstAidAdministeredID,
                                            FirstAidAdministeredName = FirstAidAdministeredObj.TeacherName ?? String.Empty,
                                            IsDoctorRequired = incidentObj.IsDoctorRequired,
                                            WasParentInformed = incidentObj.WasParentInformed,
                                            ParentComment = incidentObj.ParentComment,
                                            ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty,
                                            IsAcknowledge = incidentObj.IsAcknowledge,
                                            PartOfBody = incidentObj.PartOfBody,
                                            ContextEnviroment = incidentObj.ContextEnviroment,
                                            ContextChild = incidentObj.ContextChild,
                                            IncidentInvolvments = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll().Where(check => check.IncidentID == incidentObj.Id)
                                                                   join studentObj in _studentRepository.GetAll() on incidentInvolvmentObj.StudentID equals studentObj.Id
                                                                   where (!incidentInvolvmentObj.IsDeleted && getIncidentsDetailsRequest.AgencyID == incidentInvolvmentObj.AgencyID)
                                                                   select new IncidentInvolvmentViewModel()
                                                                   {
                                                                       Id = incidentInvolvmentObj.Id,
                                                                       AgencyID = incidentInvolvmentObj.AgencyID,
                                                                       StudentID = incidentInvolvmentObj.StudentID,
                                                                       StudentName = studentObj.StudentName ?? String.Empty,
                                                                       IncidentID = incidentInvolvmentObj.IncidentID                                                                       
                                                                   }).ToList(),
                                           
                                        }).OrderBy(c => c.IncidentDate).FirstOrDefault();
                    res.Data = incidentsDetails;
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Incident Information is successfully fetched.";
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
            }
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestSaveIncident"></param>
        /// <returns></returns>
        public ResponseViewModal SaveIncident(IncidentDetailsViewModel requestSaveIncident)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    if (requestSaveIncident.AgencyID > 0)
                    {
                        long id = 0;
                        Incident incidentObj = null;
                        if (requestSaveIncident.AgencyID != 0 && requestSaveIncident.Id == 0)
                        {

                            requestSaveIncident.CreatedDate = DateTime.UtcNow;
                            incidentObj = new Incident();
                            Mapper.Map(requestSaveIncident, incidentObj);
                            _incidentRepository.Create(incidentObj);
                            _incidentRepository.SaveChanges();
                            id = incidentObj.Id;
                        }
                        else if (requestSaveIncident.Id > 0)
                        {
                            incidentObj = _incidentRepository.Get(x => x.Id == requestSaveIncident.Id && !x.IsDeleted);
                            if (!ReferenceEquals(incidentObj, null))
                            {
                                incidentObj.IncidentDate = requestSaveIncident.IncidentDate;
                                incidentObj.IncidentTime = requestSaveIncident.IncidentTime;
                                incidentObj.Description = requestSaveIncident.Description ?? String.Empty;
                                incidentObj.ActionTaken = requestSaveIncident.ActionTaken ?? String.Empty;
                                incidentObj.IsEmergency = requestSaveIncident.IsEmergency;
                                incidentObj.IsGeneric = requestSaveIncident.IsGeneric;
                                incidentObj.StudentID = requestSaveIncident.StudentID;
                                incidentObj.TeacherID = requestSaveIncident.TeacherID;
                                incidentObj.IncidentPriortyTypeID = requestSaveIncident.IncidentPriortyTypeID;
                                incidentObj.AgencyID = requestSaveIncident.AgencyID;
                                incidentObj.ClassesID = requestSaveIncident.ClassesID;
                                incidentObj.PlaceOfIncident = requestSaveIncident.PlaceOfIncident ?? String.Empty;
                                incidentObj.NatureOfInjuryID = requestSaveIncident.NatureOfInjuryID;
                                incidentObj.FirstAidAdministeredID = requestSaveIncident.FirstAidAdministeredID;
                                incidentObj.IsDoctorRequired = requestSaveIncident.IsDoctorRequired;
                                incidentObj.WasParentInformed = requestSaveIncident.WasParentInformed;
                                incidentObj.ParentInformedBy = requestSaveIncident.ParentInformedBy ?? String.Empty;
                                incidentObj.ParentComment = requestSaveIncident.ParentComment ?? String.Empty;
                                incidentObj.IsAcknowledge = requestSaveIncident.IsAcknowledge;
                                incidentObj.PartOfBody = requestSaveIncident.PartOfBody ?? string.Empty;
                                incidentObj.ContextChild = requestSaveIncident.ContextChild ?? string.Empty;
                                incidentObj.ContextEnviroment = requestSaveIncident.ContextEnviroment ?? string.Empty;
                                incidentObj.IsDeleted = requestSaveIncident.IsDeleted;
                                incidentObj.UpdatedBy = requestSaveIncident.UpdatedBy;
                                incidentObj.UpdatedDate = requestSaveIncident.UpdatedDate;
                                incidentObj.DeletedBy = requestSaveIncident.DeletedBy;
                                incidentObj.DeletedDate = requestSaveIncident.DeletedDate;
                                _incidentRepository.SaveChanges();
                                id = incidentObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (id > 0 && requestSaveIncident.IncidentInvolvments != null && requestSaveIncident.IncidentInvolvments.Count > 0)
                        {
                            List<IncidentInvolvmentViewModel> incidentInvolvmentToBeDeleted = new List<IncidentInvolvmentViewModel>();
                            incidentInvolvmentToBeDeleted = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll()
                                                             where (!incidentInvolvmentObj.IsDeleted && requestSaveIncident.AgencyID == incidentInvolvmentObj.AgencyID && incidentInvolvmentObj.IncidentID == id)
                                                             select new IncidentInvolvmentViewModel()
                                                             {
                                                                 Id = incidentInvolvmentObj.Id,
                                                                 AgencyID = incidentInvolvmentObj.AgencyID,
                                                                 StudentID = incidentInvolvmentObj.StudentID,
                                                                 IncidentID = incidentInvolvmentObj.IncidentID,
                                                                 CreatedBy = incidentInvolvmentObj.CreatedBy ?? 0,
                                                                 CreatedDate = incidentInvolvmentObj.CreatedDate ?? DateTime.MinValue,
                                                                 UpdatedBy = incidentInvolvmentObj.UpdatedBy ?? 0,
                                                                 UpdatedDate = incidentInvolvmentObj.UpdatedDate ?? DateTime.MinValue,
                                                                 DeletedBy = incidentInvolvmentObj.DeletedBy ?? 0,
                                                                 DeletedDate = incidentInvolvmentObj.DeletedDate ?? DateTime.MinValue

                                                             }).OrderBy(c => c.CreatedDate).ToList();

                            if (incidentInvolvmentToBeDeleted != null && incidentInvolvmentToBeDeleted.Count > 0)
                            {
                                for (int i = 0; i < incidentInvolvmentToBeDeleted.Count; i++)
                                {
                                    DeletePreviousIncidentInvolvment(incidentInvolvmentToBeDeleted[i]);
                                }
                            }
                            for (int i = 0; i < requestSaveIncident.IncidentInvolvments.Count; i++)
                            {
                                requestSaveIncident.IncidentInvolvments[i].IncidentID = id;
                                SaveIncidentInvolvment(requestSaveIncident.IncidentInvolvments[i]);
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Incident has been registered.";
                        res.ReturnMessage.Add("Incident Registered");
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

        public ResponseViewModal SaveIncidentInvolvment(IncidentInvolvmentViewModel requestSaveIncidentInvolvment)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {

                try
                {
                    long id = 0;
                    IncidentInvolvment incidentInvolvmentObj = null;
                    if (requestSaveIncidentInvolvment.AgencyID != 0 && requestSaveIncidentInvolvment.Id == 0)
                    {

                        requestSaveIncidentInvolvment.CreatedDate = DateTime.UtcNow;

                        incidentInvolvmentObj = new IncidentInvolvment();
                        Mapper.Map(requestSaveIncidentInvolvment, incidentInvolvmentObj);
                        _incidentInvolvmentRepository.Create(incidentInvolvmentObj);
                        _incidentInvolvmentRepository.SaveChanges();
                        id = incidentInvolvmentObj.Id;
                    }
                    else if (requestSaveIncidentInvolvment.Id > 0)
                    {
                        incidentInvolvmentObj = _incidentInvolvmentRepository.Get(x => x.Id == requestSaveIncidentInvolvment.Id && !x.IsDeleted);
                        if (!ReferenceEquals(incidentInvolvmentObj, null))
                        {
                            incidentInvolvmentObj.AgencyID = requestSaveIncidentInvolvment.AgencyID;
                            incidentInvolvmentObj.StudentID = requestSaveIncidentInvolvment.StudentID;
                            incidentInvolvmentObj.IncidentID = requestSaveIncidentInvolvment.IncidentID;
                            incidentInvolvmentObj.IsDeleted = requestSaveIncidentInvolvment.IsDeleted;
                            incidentInvolvmentObj.UpdatedBy = requestSaveIncidentInvolvment.UpdatedBy;
                            incidentInvolvmentObj.UpdatedDate = requestSaveIncidentInvolvment.UpdatedDate;
                            incidentInvolvmentObj.DeletedBy = requestSaveIncidentInvolvment.DeletedBy;
                            incidentInvolvmentObj.DeletedDate = requestSaveIncidentInvolvment.DeletedDate;
                            _incidentInvolvmentRepository.SaveChanges();
                            id = incidentInvolvmentObj.Id;
                        }
                    }
                    daycaredb.Commit();
                    res.IsSuccess = true;
                    res.SaveId = id;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Incident involvment has been saved.";
                    res.ReturnMessage.Add("Incident Registered");
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

        private bool DeletePreviousIncidentInvolvment(IncidentInvolvmentViewModel deletePreviousIncidentInvolvmentRequest)
        {
            bool res;
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    long id = 0;
                    IncidentInvolvment incidentInvolvmentObj = null;
                    incidentInvolvmentObj = new IncidentInvolvment();
                    if (deletePreviousIncidentInvolvmentRequest.AgencyID != 0 && deletePreviousIncidentInvolvmentRequest.IncidentID != 0)
                    {
                        deletePreviousIncidentInvolvmentRequest.IsDeleted = true;
                        deletePreviousIncidentInvolvmentRequest.DeletedDate = DateTime.UtcNow;

                        incidentInvolvmentObj = _incidentInvolvmentRepository.Get(x => x.Id == deletePreviousIncidentInvolvmentRequest.Id && !x.IsDeleted);
                        if (!ReferenceEquals(incidentInvolvmentObj, null))
                        {
                            incidentInvolvmentObj.IsDeleted = deletePreviousIncidentInvolvmentRequest.IsDeleted;
                            incidentInvolvmentObj.DeletedBy = deletePreviousIncidentInvolvmentRequest.DeletedBy;
                            incidentInvolvmentObj.DeletedDate = deletePreviousIncidentInvolvmentRequest.DeletedDate;
                            _incidentInvolvmentRepository.SaveChanges();
                            id = incidentInvolvmentObj.Id;
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

        public ResponseViewModal DeleteIncident(IncidentDetailsViewModel requestDeleteIncident)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    if (requestDeleteIncident.AgencyID > 0 && requestDeleteIncident.Id > 0)
                    {
                        long id = 0;
                        Incident incidentObj = null;
                        if (requestDeleteIncident.Id > 0)
                        {
                            incidentObj = _incidentRepository.Get(x => x.Id == requestDeleteIncident.Id && !x.IsDeleted);
                            if (!ReferenceEquals(incidentObj, null))
                            {
                                incidentObj.DeletedBy = requestDeleteIncident.DeletedBy;
                                incidentObj.DeletedDate = requestDeleteIncident.DeletedDate;
                                incidentObj.IsDeleted = requestDeleteIncident.IsDeleted;
                                _incidentRepository.SaveChanges();
                                id = incidentObj.Id;
                            }
                        }
                        daycaredb.Commit();
                        if (id > 0 && requestDeleteIncident.IncidentInvolvments != null && requestDeleteIncident.IncidentInvolvments.Count > 0)
                        {
                            List<IncidentInvolvmentViewModel> incidentInvolvmentToBeDeleted = new List<IncidentInvolvmentViewModel>();
                            incidentInvolvmentToBeDeleted = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll()
                                                             where (!incidentInvolvmentObj.IsDeleted && requestDeleteIncident.AgencyID == incidentInvolvmentObj.AgencyID && incidentInvolvmentObj.IncidentID == id)
                                                             select new IncidentInvolvmentViewModel()
                                                             {
                                                                 Id = incidentInvolvmentObj.Id,
                                                                 AgencyID = incidentInvolvmentObj.AgencyID,
                                                                 StudentID = incidentInvolvmentObj.StudentID,
                                                                 IncidentID = incidentInvolvmentObj.IncidentID,
                                                                 CreatedBy = incidentInvolvmentObj.CreatedBy ?? 0,
                                                                 CreatedDate = incidentInvolvmentObj.CreatedDate ?? DateTime.MinValue,
                                                                 UpdatedBy = incidentInvolvmentObj.UpdatedBy ?? 0,
                                                                 UpdatedDate = incidentInvolvmentObj.UpdatedDate ?? DateTime.MinValue,
                                                                 DeletedBy = incidentInvolvmentObj.DeletedBy ?? 0,
                                                                 DeletedDate = incidentInvolvmentObj.DeletedDate ?? DateTime.MinValue

                                                             }).OrderBy(c => c.CreatedDate).ToList();

                            if (incidentInvolvmentToBeDeleted != null && incidentInvolvmentToBeDeleted.Count > 0)
                            {
                                for (int i = 0; i < incidentInvolvmentToBeDeleted.Count; i++)
                                {
                                    DeletePreviousIncidentInvolvment(incidentInvolvmentToBeDeleted[i]);
                                }
                            }
                        }
                        res.IsSuccess = true;
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Incident has been deleted.";
                        res.ReturnMessage.Add("Incident Deleted");
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

        public ResponseViewModal GetBittingIncidentsDetails(IncidentRequestViewModel getBittingIncidentsDetailsRequest)
        {
            ResponseViewModal res = new ResponseViewModal();
            try
            {
                if (getBittingIncidentsDetailsRequest.AgencyID > 0)
                {
                    List<IncidentDetailsViewModel> incidentsDetails = new List<IncidentDetailsViewModel>();
                    IQueryable<Incident> selectedIncident = _incidentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID && classCheck.NatureOfInjuryID == 2);
                    IQueryable<Entity.Student.Student> selectedStudent = _studentRepository.GetAll().Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    IQueryable<Entity.Teachers.TeacherInfo> selectedTeacher = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    IQueryable<Entity.Masters.NatureOfInjury> selectedNatureOfInjury = _natureOfInjuryRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    IQueryable<Entity.Teachers.TeacherInfo> selectedFirstAidAdministered = _teacherRepository.GetAll().Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    IQueryable<Entity.Masters.IncidentPriortyType> selectedIncidentPriortyType = _incidentPriortyTypeRepository.GetAll();//.Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    IQueryable<Classes> selectedClass = _classesRepository.GetAll().Where(classCheck => classCheck.AgencyID == getBittingIncidentsDetailsRequest.AgencyID);
                    incidentsDetails = (from incidentObj in selectedIncident
                                        join studentObj in selectedStudent on incidentObj.StudentID equals studentObj.Id
                                        join teacherObj in selectedTeacher on incidentObj.TeacherID equals teacherObj.Id
                                        join natureOfInjuryObj in selectedNatureOfInjury on incidentObj.NatureOfInjuryID equals natureOfInjuryObj.Id
                                        join FirstAidAdministeredObj in selectedFirstAidAdministered on incidentObj.FirstAidAdministeredID equals FirstAidAdministeredObj.Id
                                        join incidentPriortyTypeObj in selectedIncidentPriortyType on incidentObj.IncidentPriortyTypeID equals incidentPriortyTypeObj.Id
                                        join classObj in selectedClass on incidentObj.ClassesID equals classObj.Id
                                        where (!incidentObj.IsDeleted && getBittingIncidentsDetailsRequest.AgencyID == incidentObj.AgencyID)
                                        select new IncidentDetailsViewModel()
                                        {
                                            Id = incidentObj.Id,
                                            IncidentDate = incidentObj.IncidentDate,
                                            Description = incidentObj.Description ?? String.Empty,
                                            ActionTaken = incidentObj.ActionTaken ?? String.Empty,
                                            IsEmergency = incidentObj.IsEmergency,
                                            IsGeneric = incidentObj.IsGeneric,
                                            StudentID = incidentObj.StudentID,
                                            StudentName = studentObj.StudentName ?? String.Empty,
                                            TeacherID = incidentObj.TeacherID,
                                            TeacherName = teacherObj.TeacherName ?? String.Empty,
                                            IncidentPriortyTypeID = incidentObj.IncidentPriortyTypeID,
                                            IncidentPriortyTypeName = incidentPriortyTypeObj.IncidentPriortyTypeName ?? String.Empty,
                                            AgencyID = incidentObj.AgencyID,
                                            ClassesID = incidentObj.ClassesID,
                                            ClassName = classObj.ClassName ?? String.Empty,
                                            PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty,
                                            NatureOfInjuryID = incidentObj.NatureOfInjuryID,
                                            NatureOfInjuryName = natureOfInjuryObj.NatureOfInjuryName ?? String.Empty,
                                            FirstAidAdministeredID = incidentObj.FirstAidAdministeredID,
                                            FirstAidAdministeredName = FirstAidAdministeredObj.TeacherName ?? String.Empty,
                                            IsDoctorRequired = incidentObj.IsDoctorRequired,
                                            IsAcknowledge = incidentObj.IsAcknowledge,
                                            WasParentInformed = incidentObj.WasParentInformed,
                                            ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty,
                                            IncidentInvolvments = (from incidentInvolvmentObj in _incidentInvolvmentRepository.GetAll().Where(check => check.IncidentID == incidentObj.Id)
                                                                   join studentObj in _studentRepository.GetAll() on incidentInvolvmentObj.StudentID equals studentObj.Id
                                                                   where (!incidentInvolvmentObj.IsDeleted && getBittingIncidentsDetailsRequest.AgencyID == incidentInvolvmentObj.AgencyID)
                                                                   select new IncidentInvolvmentViewModel()
                                                                   {
                                                                       Id = incidentInvolvmentObj.Id,
                                                                       AgencyID = incidentInvolvmentObj.AgencyID,
                                                                       StudentID = incidentInvolvmentObj.StudentID,
                                                                       StudentName = studentObj.StudentName ?? String.Empty,
                                                                       IncidentID = incidentInvolvmentObj.IncidentID                                                                       
                                                                   }).ToList(),
                                            CreatedBy = incidentObj.CreatedBy ?? 0,
                                            CreatedDate = incidentObj.CreatedDate ?? DateTime.MinValue,
                                            UpdatedBy = incidentObj.UpdatedBy ?? 0,
                                            UpdatedDate = incidentObj.UpdatedDate ?? DateTime.MinValue,
                                            DeletedBy = incidentObj.DeletedBy ?? 0,
                                            DeletedDate = incidentObj.DeletedDate ?? DateTime.MinValue
                                        }).OrderByDescending(c => c.IncidentDate).ToList();
                    res.Data = incidentsDetails;
                    res.TotalRows = incidentsDetails.Count();
                    res.IsSuccess = true;
                    res.StatusCode = (long)HttpStatusCodes.OK;
                    res.Message = "Incident Information is successfully fetched.";
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

        public ResponseViewModal UpdateIncidentDetailsByParent(IncidentDetailsViewModel requestSaveIncident)
        {
            ResponseViewModal res = new ResponseViewModal();
            using (var daycaredb = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    Incident incidentObj = null;
                    long id = 0;
                    if (requestSaveIncident.Id > 0)
                    {
                        incidentObj = _incidentRepository.Get(x => x.Id == requestSaveIncident.Id && !x.IsDeleted);
                        if (!ReferenceEquals(incidentObj, null))
                        {
                            incidentObj.ParentComment = requestSaveIncident.ParentComment ?? String.Empty;
                            incidentObj.IsAcknowledge = requestSaveIncident.IsAcknowledge;
                            incidentObj.UpdatedBy = requestSaveIncident.UpdatedBy;
                            incidentObj.UpdatedDate = DateTime.Now;

                            incidentObj.IncidentDate = incidentObj.IncidentDate;
                            incidentObj.IncidentTime = incidentObj.IncidentTime;
                            incidentObj.Description = incidentObj.Description ?? String.Empty;
                            incidentObj.ActionTaken = incidentObj.ActionTaken ?? String.Empty;
                            incidentObj.IsEmergency = incidentObj.IsEmergency;
                            incidentObj.IsGeneric = incidentObj.IsGeneric;
                            incidentObj.StudentID = incidentObj.StudentID;
                            incidentObj.TeacherID = incidentObj.TeacherID;
                            incidentObj.IncidentPriortyTypeID = incidentObj.IncidentPriortyTypeID;
                            incidentObj.AgencyID = incidentObj.AgencyID;
                            incidentObj.ClassesID = incidentObj.ClassesID;
                            incidentObj.PlaceOfIncident = incidentObj.PlaceOfIncident ?? String.Empty;
                            incidentObj.NatureOfInjuryID = incidentObj.NatureOfInjuryID;
                            incidentObj.FirstAidAdministeredID = incidentObj.FirstAidAdministeredID;
                            incidentObj.IsDoctorRequired = incidentObj.IsDoctorRequired;
                            incidentObj.WasParentInformed = incidentObj.WasParentInformed;
                            incidentObj.ParentInformedBy = incidentObj.ParentInformedBy ?? String.Empty;                            
                            incidentObj.PartOfBody = incidentObj.PartOfBody ?? string.Empty;
                            incidentObj.ContextChild = incidentObj.ContextChild ?? string.Empty;
                            incidentObj.ContextEnviroment = incidentObj.ContextEnviroment ?? string.Empty;                                
                            _incidentRepository.SaveChanges();
                            id = incidentObj.Id;
                        }
                        daycaredb.Commit();
                        res.SaveId = id;
                        res.StatusCode = (long)HttpStatusCodes.OK;
                        res.Message = "Incident has been registered.";                       
                    }
                    else
                    {
                        res.StatusCode = 986;
                        res.Message = "Missing Parameter.";
                        res.IsSuccess = false;
                    }
                }
                catch(Exception ex)
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
    }
}


