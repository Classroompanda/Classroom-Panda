using DayCare.Model.Response;
using DayCare.Model.Agency;
using DayCare.Model.Student;
using DayCare.Service.IService.Agency;
using Microsoft.AspNetCore.Mvc;
using System;
using JsonApiDotNetCore.Services;
using static DayCare.Service.Common.CommonEnum;
using Microsoft.AspNetCore.Http;
using System.IO;

using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using DayCare.Model.Teacher;
using DayCare.Service.IService.Teacher;
using DayCare.Service.IService.Parents;
using DayCare.Model.Parent;
using DayCare.Service.IService.Masters;
using DayCare.Model.Master;
using Microsoft.AspNetCore.Authorization;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class AgencyController : Controller
    {
        #region Initialize Dependency
        /// <summary>
        /// Declaration of Interface of Student Services to obtain its methods
        /// </summary>
        private readonly IStudentService _studentService;
        /// <summary>
        /// Declaration of Basic view modal for response 
        /// </summary>
        ResponseViewModal response;
        /// <summary>
        /// Declaration of Interface of Incident Services to obtain its methods
        /// </summary>
        private readonly IIncidentService _incidentService;
        /// <summary>
        /// Declaration of Interface of Event Planner to obtain its methods
        /// </summary>
        private readonly IEventPlannerService _eventPlannerService;
        /// <summary>
        /// Declaration of Interface of Meal Planner to obtain its methods
        /// </summary>
        private readonly IMealPlannerService _mealPlannerService;

        private readonly IPostActivitiesService _postActivitiesService;

        private readonly IClassService _classService;

        private readonly ITeacherService _teacherService;

        private readonly IParentsService _parentService;
        private readonly IMasterService _masterService;


        /// <summary>
        /// Agency Controller - It provide controller methods for access of agency methods to frontend and mobile app. 
        /// This constructor method is used to initiat the declared services in this controller.
        /// </summary>
        /// <param name="studentService"></param>
        /// <param name="incidentService"></param>
        /// <param name="eventPlannerService"></param>
        /// <param name="mealPlannerService"></param>
        /// 

        public AgencyController(IStudentService studentService, IIncidentService incidentService
            , IEventPlannerService eventPlannerService, IMealPlannerService mealPlannerService,
            IPostActivitiesService postActivitiesService, IClassService classService,ITeacherService teacherService, IParentsService parentService,
            IMasterService masterService)
        {
            _studentService = studentService;
            response = new ResponseViewModal();
            _incidentService = incidentService;
            _eventPlannerService = eventPlannerService;
            _mealPlannerService = mealPlannerService;
            _postActivitiesService = postActivitiesService;
            _classService=classService;
            _teacherService = teacherService;
            _parentService = parentService;
            _masterService = masterService;
            
        }
        #endregion
        /// <summary>
        /// GetAllStudents Method is used to fetch all student of a particular agency.
        /// </summary>
        /// <param name="getAllStudentRequest"></param>
        /// <returns>Response view model containing status code, messages and list of all student belonging to requested agency.</returns>
        [HttpPost]
        [Route("GetAllStudents")]
        public ResponseViewModal GetAllStudents(StudentBaseRequestViewModel getAllStudentRequest)
        {
            try
            {
                response = _studentService.GetAllStudents(getAllStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
               
        /// <summary>
        /// GetAllStudentsByClass Method is used to fetch all student of a class for a particular agency 
        /// </summary>
        /// <param name="getAllStudentsRequest"></param>
        /// <returns>Response view model containing status code, messages and list of all student belonging to a particular class for requested agency.</returns>
        [HttpPost]
        [Route("GetAllStudentsByClass")]
        public ResponseViewModal GetAllStudentsByClass(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            try
            {
                response = _studentService.GetAllStudentsByClass(getAllStudentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("GetAllStudentsDropDownByClass")]
        public ResponseViewModal GetAllStudentsDropDownByClass(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            try
            {
                response = _studentService.GetAllStudentsDropDownByClass(getAllStudentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        /// <summary>
        /// GetAllGuardiansForStudents Method is used to fetch all related guardians for a particular student for an agency.
        /// </summary>
        /// <param name="getAllGuardiansForStudentsRequest"></param>
        /// <returns>Response view model containing status code, messages and list of all guardians belonging to a particular student and class for requested agency.</returns>
        [HttpPost]
        [Route("GetAllGuardiansForStudents")]
        public ResponseViewModal GetAllGuardiansForStudents(StudentBaseRequestViewModel getAllGuardiansForStudentsRequest)
        {
            try
            {
                response = _studentService.GetAllGuardiansForStudents(getAllGuardiansForStudentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        

        /// <summary>
        /// GetStudentInformation Method is used to fetch all related information of students profile including immunization,
        /// medication, allergies, and disabilities.
        /// </summary>
        /// <param name="getStudentInformationRequest"></param>
        /// <returns>Response view model containing status code, messages and profile information with immunization,
        /// medication, allergies, and disabilities belonging to a particular student and class for requested agency.</returns>
        [HttpPost]
        [Route("GetStudentInformation")]
        public ResponseViewModal GetStudentInformation(StudentBaseRequestViewModel getStudentInformationRequest)
        {
          try
           {
             response = _studentService.GetStudentInformation(getStudentInformationRequest);
           }
           catch (Exception ex)
           {
              response.IsSuccess = false;
             response.ReturnMessage.Add(ex.ToString());
           }
           return response;
        }
        /// <summary>
        /// GetAllIncidents Method is used fetch all Incidents registered by an agency, 
        /// </summary>
        /// <param name="getAllIncidentsRequest"></param>
        /// <returns>Response view model containing status code, messages and list of incidents for requested agency.</returns>
        [HttpPost]
        [Route("GetAllIncidents")]
        public ResponseViewModal GetAllIncidents(IncidentRequestViewModel getAllIncidentsRequest)
        {
            try
            {
                response = _incidentService.GetAllIncidents(getAllIncidentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("UploadTeacherUserWithFile")]
        public ResponseViewModal UploadTeacherUserWithFile([FromForm]CSVFILEREQVM infoCsvFileReq)
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    response = _teacherService.UploadTeacherUserWithFile(file, infoCsvFileReq);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("GetBittingIncidentsDetails")]
        public ResponseViewModal GetBittingIncidentsDetails(IncidentRequestViewModel getBittingIncidentsDetailsRequest)
        {
            try
            {
                response = _incidentService.GetBittingIncidentsDetails(getBittingIncidentsDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false; 
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        /// <summary>
        /// GetIncidentsDetails
        /// </summary>
        /// <param name="getIncidentsDetailsRequest"></param>
        /// <returns>Response view model containing status code, messages and an incident information with involved students into it for requested agency.</returns>
        [HttpPost]
        [Route("GetIncidentsDetails")]
        public ResponseViewModal GetIncidentsDetails(IncidentRequestViewModel getIncidentsDetailsRequest)
        {
            try
            {
                response = _incidentService.GetIncidentsDetails(getIncidentsDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// SaveIncident Method is used to insert or update an incident by an agency.
        /// </summary>
        /// <param name="requestSaveIncident"></param>
        /// <returns>Response view model containing status code, messages and whether incident was saved properly or not for requested agency.</returns>
        [HttpPost]
        [Route("SaveIncident")]
        public ResponseViewModal SaveIncident([FromBody]IncidentDetailsViewModel requestSaveIncident)
        {
            try
            {
                response = _incidentService.SaveIncident(requestSaveIncident);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// DeleteIncident Methods is used to soft deleted an incident for an agency.
        /// </summary>
        /// <param name="requestDeleteIncident"></param>
        /// <returns>Response view model containing status code, messages and whether incident was deleted properly or not for requested agency.</returns>
        [HttpPost]
        [Route("DeleteIncident")]
        public ResponseViewModal DeleteIncident(IncidentDetailsViewModel requestDeleteIncident)
        {
            try
            {
                response = _incidentService.DeleteIncident(requestDeleteIncident);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// GetAllEvents Method can be used to get all event for an agency for a month.
        /// </summary>
        /// <param name="getAllEventsRequest"></param>
        /// <returns>>Response view model containing status code, messages and list of events with details for requested agency.</returns>
        [HttpPost]
        [Route("GetAllEvents")]
        public ResponseViewModal GetAllEvents(EventSearchViewModel getAllEventsRequest)
        {
            try
            {
                response = _eventPlannerService.GetAllEvents(getAllEventsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// GetEventDetails Methods can be used to fetch detail of an event belonging to an agency.
        /// </summary>
        /// <param name="getEventDetailsRequest"></param>
        /// <returns>Response view model containing status code, messages and detail of an event for requested agency.</returns>
        [HttpPost]
        [Route("GetEventDetails")]
        public ResponseViewModal GetEventDetails(EventSearchViewModel getEventDetailsRequest)
        {
            try
            {
                response = _eventPlannerService.GetEventDetails(getEventDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// SaveEvent Method can be used to insert or update a particular event from one date to another date with involved classes belonging to an agency.
        /// </summary>
        /// <param name="saveEventRequest"></param>
        /// <returns>Response view model containing status code, messages and EventId which was insert/update with involved classes for requested agency.</returns>
        [HttpPost]
        [Route("SaveEvent")]
        public ResponseViewModal SaveEvent(EventPlannerViewModel saveEventRequest)
        {
            try
            {
                response = _eventPlannerService.SaveEvent(saveEventRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// SaveEventInvolvmentClasses Method can be used to insert or update classes involved in an event belonging to an agency.
        /// </summary>
        /// <param name="saveEventInvolvmentClassesRequest"></param>
        /// <returns>Response view model containing status code, messages and EventInvolvmentClassesId which was insert/update for an event for requested agency.</returns>
        [HttpPost]
        [Route("SaveEventInvolvmentClasses")]
        public ResponseViewModal SaveEventInvolvmentClasses(InvolvedEventClassesViewModel saveEventInvolvmentClassesRequest)
        {
            try
            {
                response = _eventPlannerService.SaveEventInvolvmentClasses(saveEventInvolvmentClassesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// DeleteEvent Method can be used to delete an particular event with invloved classes belonging to an agency.
        /// </summary>
        /// <param name="deleteEventRequest"></param>
        /// <returns>Response view model containing status code, messages and event was properly deleted or not for requested agency.</returns>
        [HttpPost]
        [Route("DeleteEvent")]
        public ResponseViewModal DeleteEvent(EventPlannerViewModel deleteEventRequest)
        {
            try
            {
                response = _eventPlannerService.DeleteEvent(deleteEventRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }            

        [HttpPost]
        [Route("GetAllMealPlan")]
        public async Task<ResponseViewModal> GetAllMealPlan(MealPlannerSearchViewModel getAllMealPlanRequest)
        {
            ResponseViewModal responseGetAllMealPlan = new ResponseViewModal();
            responseGetAllMealPlan = _mealPlannerService.GetAllMealPlan(getAllMealPlanRequest);
            responseGetAllMealPlan = new ResponseViewModal()
            {
                IsSuccess = responseGetAllMealPlan.IsSuccess,
                Data = responseGetAllMealPlan.Data,
                StatusCode = responseGetAllMealPlan.StatusCode,
                Message = responseGetAllMealPlan.Message,
                TotalRows = responseGetAllMealPlan.TotalRows
            };
            return await Task.Run(() => responseGetAllMealPlan);
            
        }

        [HttpPost]
        [Route("GetMealPlanDetails")]
        public async Task<ResponseViewModal> GetMealPlanDetails(MealPlannerSearchViewModel getMealPlanDetailsRequest)
        {
            ResponseViewModal responseGetMealPlanDetails = new ResponseViewModal();
            responseGetMealPlanDetails = _mealPlannerService.GetMealPlanDetails(getMealPlanDetailsRequest);
            responseGetMealPlanDetails = new ResponseViewModal()
            {
                IsSuccess = responseGetMealPlanDetails.IsSuccess,
                Data = responseGetMealPlanDetails.Data,
                StatusCode = responseGetMealPlanDetails.StatusCode,
                Message = responseGetMealPlanDetails.Message,
                TotalRows = responseGetMealPlanDetails.TotalRows
            };
            return await Task.Run(() => responseGetMealPlanDetails);

        }      



        [HttpPost]
        [Route("SaveMealPlan")]
        public async Task<ResponseViewModal> SaveMealPlan(MealPlannerViewModel saveMealPlanRequest)
        {
            ResponseViewModal responseSaveMealPlan = new ResponseViewModal();
            responseSaveMealPlan = _mealPlannerService.SaveMealPlan(saveMealPlanRequest);
            responseSaveMealPlan = new ResponseViewModal()
            {
                IsSuccess = responseSaveMealPlan.IsSuccess,
                Data = responseSaveMealPlan.Data,
                StatusCode = responseSaveMealPlan.StatusCode,
                Message = responseSaveMealPlan.Message,
                TotalRows = responseSaveMealPlan.TotalRows
            };
            return await Task.Run(() => responseSaveMealPlan);

        }


        /// <summary>
        /// SaveEventInvolvmentClasses Method can be used to insert or update classes involved in an meal plan belonging to an agency.
        /// </summary>
        /// <param name="saveInvolvedMealClassesRequest"></param>
        /// <returns>Response view model containing status code, messages and EventInvolvmentClassesId which was insert/update for an meal plan for requested agency.</returns>
        [HttpPost]
        [Route("SaveInvolvedMealClasses")]
        public ResponseViewModal SaveInvolvedMealClasses(InvolvedMealClassesViewModel saveInvolvedMealClassesRequest)
        {
            try
            {
                response = _mealPlannerService.SaveInvolvedMealClasses(saveInvolvedMealClassesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// DeleteMealPlan Method can be used to delete an particular meal plan with invloved classes belonging to an agency.
        /// </summary>
        /// <param name="deleteMealPlanRequest"></param>
        /// <returns>Response view model containing status code, messages and meal plan was properly deleted or not for requested agency.</returns>
        [HttpPost]
        [Route("DeleteMealPlan")]
        public ResponseViewModal DeleteMealPlan(MealPlannerViewModel deleteMealPlanRequest)
        {
            try
            {
                response = _mealPlannerService.DeleteMealPlan(deleteMealPlanRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        /// <summary>
        /// Upload Images
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("GetImage")]
        public async Task<ResponseViewModal> UploadImageAsync()
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    var streams = file.OpenReadStream();
                    var name = Guid.NewGuid() + file.FileName;
                    var stringPath = await UploadFileAsBlob(streams, name);

                    response.Data = stringPath;
                    response.StatusCode = 200;
                    response.IsSuccess = true;
                }
                else
                {
                    response.IsSuccess = false;
                    response.StatusCode = 987;
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [AllowAnonymous]
        [DisableRequestSizeLimit]
        [Route("GetImageWithoutToken")]
        public async Task<ResponseViewModal> UploadImageAsyncWithoutToken()
        {
            try
            {
                if (Request.ContentLength > 0)
                {

                    var file = Request.Form.Files[0];
                    var streams = file.OpenReadStream();
                    var name = Guid.NewGuid() + file.FileName;
                    var stringPath = await UploadFileAsBlob(streams, name);

                    response.Data = stringPath;
                    response.IsSuccess = true;
                    response.StatusCode = 200;
                }
                else
                {
                    response.IsSuccess = false;
                    response.StatusCode = 987;
                }              
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.StatusCode = 986;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        public static async Task<string> UploadFileAsBlob(Stream stream, string filename)
        {
            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_configuration["ConnectionString:StorageConnectionString"]);
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=schoolpandastoragess;AccountKey=CUuKTIpE2yL/pTaTjT4fXIFp+nJA2PNcTqHxMiRzqt3C57dBwj1t50NSsV/4nNBMUZH1b7mK0wEZbGtR9cJ7qA==;EndpointSuffix=core.windows.net");

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve a reference to a container.
            CloudBlobContainer container = blobClient.GetContainerReference("schoolpandacontainer");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(filename);

            await blockBlob.UploadFromStreamAsync(stream);

            stream.Dispose();
            return blockBlob?.Uri.ToString();
        }


        /// <summary>
        ///Student list which is not enrolled yet
        /// </summary>
        /// <returns></returns>

        [HttpPost]
        [Route("GetAllUnaaprovedStudents")]
        public ResponseViewModal GetAllUnaaprovedStudents(StudentBaseRequestViewModel getStudentUnapprovedStudentRequest)
        {
            try
            {
                response = _studentService.GetAllUnaaprovedStudents(getStudentUnapprovedStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        /// <summary>
        /// Post acitivities list for agency admin
        /// </summary>
        /// <returns></returns>

        [HttpPost]
        [Route("GetAllPostActivitiesForAgencyAdmin")]
        public ResponseViewModal GetAllPostActivitiesForAgencyAdmin(PostActivitiesRequestViewModel getPostActivityRequest)
        {
            try
            {
                response = _postActivitiesService.GetAllPostActivitiesForAgency(getPostActivityRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveClassInformation")]
        public ResponseViewModal SaveClassInformation(ClassesViewModel saveClassInformationRequest)
        {
            try
            {
                response = _classService.SaveClassInformation(saveClassInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
                      

        [HttpPost]
        [Route("GetAllClasses")]
        public async Task<ResponseViewModal> GetAllClasses(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal responseGetAllClasses = new ResponseViewModal();
            responseGetAllClasses = _classService.GetAllClasses(getAllClassesRequest);
            responseGetAllClasses = new ResponseViewModal()
            {
                IsSuccess = responseGetAllClasses.IsSuccess,
                Data = responseGetAllClasses.Data,
                StatusCode = responseGetAllClasses.StatusCode,
                Message = responseGetAllClasses.Message,
                TotalRows = responseGetAllClasses.TotalRows
            };
            return await Task.Run(() => responseGetAllClasses);

        }


        [HttpPost]
        [Route("GetAllClassesForStudentAttendenceTransfer")]
        public async Task<ResponseViewModal> GetAllClassesForStudentAttendenceTransfer(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal responseGetAllClassesForStudentAttendenceTransfer = new ResponseViewModal();
            responseGetAllClassesForStudentAttendenceTransfer = _classService.GetAllClassesForStudentAttendenceTransfer(getAllClassesRequest);
            responseGetAllClassesForStudentAttendenceTransfer = new ResponseViewModal()
            {
                IsSuccess = responseGetAllClassesForStudentAttendenceTransfer.IsSuccess,
                Data = responseGetAllClassesForStudentAttendenceTransfer.Data,
                StatusCode = responseGetAllClassesForStudentAttendenceTransfer.StatusCode,
                Message = responseGetAllClassesForStudentAttendenceTransfer.Message,
                TotalRows = responseGetAllClassesForStudentAttendenceTransfer.TotalRows
            };
            return await Task.Run(() => responseGetAllClassesForStudentAttendenceTransfer);

        }

        

        [HttpPost]
        [Route("GetParticularClassDetails")]
        public ResponseViewModal GetParticularClassDetails(ClassesRequestViewModel getAllClassesRequest)
        {
            try
            {
                response = _classService.GetParticularClassDetails(getAllClassesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveClassAssignmentInformation")]
        public ResponseViewModal SaveClassAssignmentInformation(ClassAssignmentViewModel saveClassAssignmentInformationRequest)
        {
            try
            {
                response = _classService.SaveClassAssignmentInformation(saveClassAssignmentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllClassAssignmentLog")]
        public ResponseViewModal GetAllClassAssignmentLog(ClassesRequestViewModel getAllClassesRequest)
        {
            try
            {
                response = _classService.GetAllClassAssignmentLog(getAllClassesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllStudentsforKioskApp")]
        public ResponseViewModal GetAllStudentsforKioskApp(StudentBaseRequestViewModel getAllStudentsRequest)
        {
            try
            {
                response = _studentService.GetAllStudentsforKioskApp(getAllStudentsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        /// <summary>
        /// GetAllStudents Method is used to fetch all student of a particular agency including deactivate students.
        /// </summary>
        /// <param name="GetActivatedAndDeactivatedStudents"></param>
        /// <returns>Response view model containing status code, messages and list of all student belonging to requested agency.</returns>
        [HttpPost]
        [Route("GetActivatedAndDeactivatedStudents")]
        public ResponseViewModal GetActivatedAndDeactivatedStudents(StudentBaseRequestViewModel getAllStudentRequest)
        {
            try
            {
                response = _studentService.GetActiveAndDeaactiveStudents(getAllStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        // <summary>
        /// ActivateStudent Method is used to Activate particular Student.
        /// </summary>
        /// <param name="ActivateStudent"></param>
        /// <returns>Response view model containing status code, messages and list of all student belonging to requested agency.</returns>
        [HttpPost]
        [Route("ActivateStudent")]
        public ResponseViewModal ActivateStudent(StudentViewModel saveStudentRequest)
        {
            try
            {
                response = _parentService.ActivateStudent(saveStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllTeacherForAgency")]
        public ResponseViewModal GetAllTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest)
        {
            try
            {
                response = _teacherService.GetAllTeachersForAgency(getAllTeachersRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ActivateClockInTeacher")]
        public ResponseViewModal ActivateClockInTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            try
            {
                response = _teacherService.ActivateClockInTeacher(saveTeacherDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        /// <summary>
        /// ActivateTeacher Method is used to Activate particular Teacher.
        /// </summary>
        /// <param name="ActivateTeacher"></param>
        /// <returns>Response view model containing status code, messages and list of all student belonging to requested agency.</returns>
        [HttpPost]
        [Route("ActivateTeacher")]
        public ResponseViewModal ActivateTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            try
            {
                response = _teacherService.ActivateTeacher(saveTeacherDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("ActivateParent")]
        public ResponseViewModal ActivateParent(ParentInformationViewModel saveParentInformationRequest)
        {
            try
            {
                response = _parentService.ActivateParent(saveParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllParentInformationForAgency")]
        public ResponseViewModal GetAllParentInformationForAgency(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetAllParentInformationForAgency(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("SaveKioskeStudentSignInDetailsInformation")]
        public ResponseViewModal SaveKioskeStudentSignInDetailsInformation([FromBody]KioskDetailsViewModel saveKioskeSignInDetailsRequest)
        {
            try
            {               
                response = _studentService.SaveKioskeStudentSignInDetailsInformation(saveKioskeSignInDetailsRequest.KioskeStudentSignInDetails.ToArray());
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("SaveKioskeStudentSignInDetails")]
        public ResponseViewModal SaveKioskeStudentSignInDetails(KioskeStudentSignInDetailsViewModel saveKioskeSignInDetailsRequest)
        {
            try
            {
                response = _studentService.SaveKioskeStudentSignInDetails(saveKioskeSignInDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveAgencyInformation")]
        public ResponseViewModal SaveAgencyInformation(AgencyViewModel saveAgencyRequest)
        {
            try
            {
                response = _masterService.SaveAgencyInformation(saveAgencyRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllAgencyDetails")]
        public ResponseViewModal GetAllAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetAllAgencyDetails(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ActivateDeactivateAgency")]
        public ResponseViewModal ActivateDeactivateAgency(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.ActivateDeactivateAgency(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SavePricingPlanInformation")]
        public ResponseViewModal SavePricingPlanInformation(PricingPlanViewModel savePlanRequest)
        {
            try
            {
                response = _masterService.SavePricingPlanInformation(savePlanRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllPricingPlanDetails")]
        public ResponseViewModal GetAllPricingPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetAllPricingPlanDetails(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveSubscriptionInformation")]
        public ResponseViewModal SaveSubscriptionInformation(SubscriptionDetailsViewModel saveSubscriptionDetailsRequest)
        {
            try
            {
                response = _masterService.SaveSubscriptionInformation(saveSubscriptionDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetParticularMealPlan")]
        public async Task<ResponseViewModal> GetParticularMealPlan(MealPlannerSearchViewModel getMealPlanDetailsRequest)
        {
            ResponseViewModal responseGetParticularMealPlan = new ResponseViewModal();
            responseGetParticularMealPlan = _mealPlannerService.GetParticularMealPlan(getMealPlanDetailsRequest);
            responseGetParticularMealPlan = new ResponseViewModal()
            {
                IsSuccess = responseGetParticularMealPlan.IsSuccess,
                Data = responseGetParticularMealPlan.Data,
                StatusCode = responseGetParticularMealPlan.StatusCode,
                Message = responseGetParticularMealPlan.Message,
                TotalRows = responseGetParticularMealPlan.TotalRows
            };
            return await Task.Run(() => responseGetParticularMealPlan);

        }

        

        [HttpPost]
        [Route("UpdateParticularMealPlan")]
        public ResponseViewModal UpdateParticularMealPlan(MealPlannerViewModel saveMealPlanRequest)
        {
            try
            {
                response = _mealPlannerService.UpdateParticularMealPlan(saveMealPlanRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
       

        [HttpPost]
        [Route("SaveMealItemInformation")]
        public ResponseViewModal SaveMealItemInformation(MealItemMasterViewModel saveMealItemRequest)
        {
            try
            {
                response = _masterService.SaveMealItemInformation(saveMealItemRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetMealItemInformation")]
        public ResponseViewModal GetMealItemInformation(MealItemMasterViewModel saveMealItemRequest)
        {
            try
            {
                response = _masterService.GetMealItemInformation(saveMealItemRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllAgencyPlanDetails")]
        public ResponseViewModal GetAllAgencyPlanDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetAllAgencyPlanDetails(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("GetCountDetailsForSuperAdmin")]
        public ResponseViewModal GetCountDetailsForSuperAdmin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetCountDetailsForSuperAdmin(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("GetParticularAgencyDetails")]
        public ResponseViewModal GetParticularAgencyDetails(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetParticularAgencyDetails(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllPresentTeachersForAgency")]
        public ResponseViewModal GetAllPresentTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest)
        {
            try
            {
                response = _teacherService.GetAllPresentTeachersForAgency(getAllTeachersRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetCountDetailsForAgencyAdmin")]
        public ResponseViewModal GetCountDetailsForAgencyAdmin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.GetCountDetailsForAgencyAdmin(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("UpdateLastLogin")]
        public ResponseViewModal UpdateLastLogin(AgencyDetailsViewModel getAgencyDetailsRequest)
        {
            try
            {
                response = _masterService.UpdateLastLogin(getAgencyDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        /// <summary>
        /// UpdateIncidentDetailsByParent Method is used to  update an incident parameters such as parentComment,isAcknowledge by Parent.This API will be used by mobile developers
        /// </summary>
        /// <param name="requestSaveIncident"></param>
        /// <returns>Response view model containing status code, messages and whether incident was saved properly or not for requested agency.</returns>
        [HttpPost]
        [Route("UpdateIncidentDetailsByParent")]
        public ResponseViewModal UpdateIncidentDetailsByParent(IncidentDetailsViewModel requestSaveIncident)
        {
            try
            {
                response = _incidentService.UpdateIncidentDetailsByParent(requestSaveIncident);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }



        [HttpPost]
        [Route("GetPaymentDetailsForAgency")]
        public ResponseViewModal GetPaymentDetailsForAgency(PaymentDetailsViewModel paymentDetailsRequest)
        {
            try
            {
                response = _masterService.GetPaymentDetailsForAgency(paymentDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("UploadClassesWithFile")]
        public ResponseViewModal UploadClassesWithFile([FromForm]CSVFILEREQVM infoCsvFileReq)
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    response = _classService.UploadClassesWithFile(file, infoCsvFileReq);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }



        [HttpPost]
        [DisableRequestSizeLimit]
        [Route("ClassAssignmentUsingFile")]
        public ResponseViewModal ClassAssignmentUsingFile([FromForm]CSVFILEREQVM infoCsvFileReq)
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    response = _classService.ClassAssignmentUsingFile(file, infoCsvFileReq);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetKioskeSigninDetailsForAgency")]
        public ResponseViewModal GetKioskeSigninDetailsForAgency(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _studentService.GetKioskeSigninDetailsForAgency(getKioskeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("GetStudentKioskeDropInOutList")]
        public ResponseViewModal GetStudentKioskeDropInOutList(ReportViewModel getKioskeDetailsRequest)
        {
            try
            {
                response = _studentService.GetStudentKioskeDropInOutList(getKioskeDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("UpdateStudentKioskeTime")]
        public ResponseViewModal UpdateStudentKioskeTime(StudentBaseRequestViewModel timeUpdateReq)
        {
            try
            {
                response = _studentService.UpdateStudentKioskeTime(timeUpdateReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllParentInformationForCSV")]
        public ResponseViewModal GetAllParentInformationForCSV(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetAllParentInformationForCSV(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllStudentInformationForCSV")]
        public ResponseViewModal GetAllStudentInformationForCSV(StudentBaseRequestViewModel getAllStudentRequest)
        {
            try
            {
                response = _studentService.GetAllStudentInformationForCSV(getAllStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetClassesByStudentID")]
        public ResponseViewModal GetClassesByStudentID(ClassesViewModel saveClassInformationRequest)
        {
            try
            {
                response = _classService.GetClassesByStudentID(saveClassInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetFeeType")]
        public ResponseViewModal GetFeeType(FeeTypeViewModel feeTypeViewModel)
        {
            try
            {
                response = _classService.GetFeeType(feeTypeViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllClassesForParent")]
        public async Task<ResponseViewModal> GetAllClassesForParent(ClassesRequestViewModel getAllClassesRequest)
        {
            ResponseViewModal responseGetAllClasses = new ResponseViewModal();
            responseGetAllClasses = _classService.GetAllClassesForParent(getAllClassesRequest);
            responseGetAllClasses = new ResponseViewModal()
            {
                IsSuccess = responseGetAllClasses.IsSuccess,
                Data = responseGetAllClasses.Data,
                StatusCode = responseGetAllClasses.StatusCode,
                Message = responseGetAllClasses.Message,
                TotalRows = responseGetAllClasses.TotalRows
            };
            return await Task.Run(() => responseGetAllClasses);

        }


        [HttpPost]
        [Route("SaveAllBus")]
        public ResponseViewModal SaveAllBus(AddBusViewModel busViewModel)
        {
            try
            {
                response = _masterService.SaveAllBus(busViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllBus")]
        public ResponseViewModal GetAllBus(AddBusViewModel busViewModel)
        {
            try
            {
                response = _masterService.GetAllBus(busViewModel);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }




    }


    


}



