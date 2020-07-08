using System;
using System.Threading.Tasks;
using DayCare.Model.Agency;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Model.Teacher;
using DayCare.Service.IService.Agency;
using DayCare.Service.IService.Teacher;
using DayCare.Service.IService.Parents;
using Microsoft.AspNetCore.Mvc;

namespace DayCare.API.Controllers.API
{
    [Route("api/[controller]")]
    // [Authorize]
    [ApiController]
    public class TeacherController : Controller
    {
        #region Initialize Dependency
        private readonly ITeacherAttendenceService _teacherAttendenceService;
        private readonly ITeacherService _teacherService;
        private readonly IParentsService _parentService;
        private readonly IPostActivitiesService _postActivitiesService;
        ResponseViewModal response;

        public TeacherController(ITeacherAttendenceService teacherAttendenceService, IStudentService studentService,
            ITeacherService teacherService, IPostActivitiesService postActivitiesService,IParentsService parentService)
        {
            _teacherAttendenceService = teacherAttendenceService;
            _teacherService = teacherService;
            _parentService = parentService;
            _postActivitiesService = postActivitiesService;
            response = new ResponseViewModal();
        }
        #endregion

        /// <summary>
        /// GetClassAttendence
        /// </summary>
        /// <returns></returns>
        

        [HttpPost]
        [Route("GetClassAttendence")]
        public async Task<ResponseViewModal> GetClassAttendence([FromBody] AttendanceRequestViewModel attendaceRequest)
        {
            ResponseViewModal responseGetClassAttendence = new ResponseViewModal();
            responseGetClassAttendence = _teacherAttendenceService.GetClassAttendence(attendaceRequest);
            responseGetClassAttendence = new ResponseViewModal()
            {
                IsSuccess = responseGetClassAttendence.IsSuccess,
                Data = responseGetClassAttendence.Data,
                StatusCode = responseGetClassAttendence.StatusCode,
                Message = responseGetClassAttendence.Message,
                TotalRows = responseGetClassAttendence.TotalRows
            };
            return await Task.Run(() => responseGetClassAttendence);

        }

        [HttpPost]
        [Route("CheckInAttendenceStudent")]
        public ResponseViewModal CheckInAttendenceStudent(AttendenceViewModel requestCheckInAttendenceStudent)
        {
            try
            {
                response = _teacherAttendenceService.CheckInAttendenceStudent(requestCheckInAttendenceStudent);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("CheckOutAttendenceStudent")]
        public ResponseViewModal CheckOutAttendenceStudent(AttendenceViewModel requestCheckOutAttendenceStudent)
        {
            try
            {
                response = _teacherAttendenceService.CheckOutAttendenceStudent(requestCheckOutAttendenceStudent);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("AbsentAttendenceStudent")]
        public ResponseViewModal AbsentAttendenceStudent(AttendenceViewModel requestAbsentAttendenceStudent)
        {
            try
            {
                response = _teacherAttendenceService.AbsentAttendenceStudent(requestAbsentAttendenceStudent);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllTeachers")]
        public ResponseViewModal GetAllTeachers(TeacherRequestViewModel getAllTeachersRequest)
        {
            try
            {
                response = _teacherService.GetAllTeachers(getAllTeachersRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTeacherInformation")]
        public ResponseViewModal GetTeacherInformation(TeacherRequestViewModel getTeacherInformationRequest)
        {
            try
            {
                response = _teacherService.GetTeacherInformation(getTeacherInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveTeacherDetails")]
        public ResponseViewModal SaveTeacherDetails(TeachersDetailsViewModel saveTeacherDetailsRequest)
        {
            try
            {
                response = _teacherService.SaveTeacherDetails(saveTeacherDetailsRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        [HttpPost]
        [Route("UpdateEmailForTeacher")]
        public ResponseViewModal UpdateEmailForTeacher(TeachersDetailsViewModel updateTeacherEmailRequest)
        {
            try
            {
                response = _teacherService.UpdateEmailForTeacher(updateTeacherEmailRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("SavePostActivites")]
        public ResponseViewModal SavePostActivites(PostActivitiesRequestViewModel PostActivityRequest)
        {
            try
            {
                response = _postActivitiesService.SavePostActivities(PostActivityRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTeacherDailyAttendence")]
        public ResponseViewModal GetTeacherDailyAttendence(TeacherDailyAttendenceRequestViewModel getTeacherDailyAttendenceRequest)
        {
            try
            {
                response = _teacherService.GetTeacherDailyAttendence(getTeacherDailyAttendenceRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllPostActivities")]
        public ResponseViewModal GetAllPostActivities(PostActivitiesRequestViewModel getAllPostActivitiesRequest)
        {

            try
                {
                    response = _postActivitiesService.GetAllPostActivities(getAllPostActivitiesRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }

        [HttpPost]
        [Route("GetPostActivityInfo")]
        public ResponseViewModal GetPostActivityInfo(PostActivitiesRequestViewModel getPostActivityInfoRequest)
        {
                try
                {
                    response = _postActivitiesService.GetPostActivityInfo(getPostActivityInfoRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }

        [HttpPost]
        [Route("GetTeacherClassLog")]
        public ResponseViewModal GetTeacherClassLog(TeacherDailyAttendenceRequestViewModel getTeacherClassLogRequest)
        {
                try
                {
                    response = _teacherService.GetTeacherClassLog(getTeacherClassLogRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }

        [HttpPost]
        [Route("TeacherCheckInCheckOut")]
        public ResponseViewModal TeacherCheckInCheckOut(TeacherClassAttendenceViewModel teacherCheckInCheckOutRequest)
        {
                try
                {
                    response = _teacherService.TeacherCheckInCheckOut(teacherCheckInCheckOutRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }

        [HttpPost]
        [Route("TeacherClockInClockOut")]
        public ResponseViewModal TeacherClockInClockOut(TeacherDailyAttendenceViewModel teacherClockInClockOutRequest)
        {
            
                try
                {
                    response = _teacherService.TeacherClockInClockOut(teacherClockInClockOutRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;
            
        }

        [HttpPost]
        [Route("GetTeacherTodayMedicationTasks")]
        public ResponseViewModal GetTeacherTodayMedicationTasks(TeacherTodayMedicationTasksRequestViewModel getTeacherTodayMedicationTasksRequest)
        {
            
                try
                {
                    response = _teacherService.GetTeacherTodayMedicationTasks(getTeacherTodayMedicationTasksRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;
            
        }

        [HttpPost]
        [Route("GetStudentAllergy")]
        public ResponseViewModal GetStudentAllergy(StudentAllergyRequestViewModel getStudentAllergyRequest)
        {

            try
            {
                response = _teacherService.GetStudentAllergy(getStudentAllergyRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("GetStudentBreakLogs")]
        public ResponseViewModal GetStudentBreakLogs(StudentBreakLogRequestViewModel getStudentBreakLogsRequest)
        {
            
                try
                {
                    response = _teacherAttendenceService.GetStudentBreakLogs(getStudentBreakLogsRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;
            
        }
        [HttpPost]
        [Route("BreakInAttendenceStudent")]
        public ResponseViewModal BreakInAttendenceStudent(StudentBreakLogViewModel breakInAttendenceStudentRequest)
        {
            
                try
                {
                    response = _teacherAttendenceService.BreakInAttendenceStudent(breakInAttendenceStudentRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }
        [HttpPost]
        [Route("BreakOutAttendenceStudent")]
        public ResponseViewModal BreakOutAttendenceStudent(StudentBreakLogViewModel breakOutAttendenceStudentRequest)
        {
           try
              {
                 response = _teacherAttendenceService.BreakOutAttendenceStudent(breakOutAttendenceStudentRequest);
              }
              catch (Exception ex)
              {
                 response.IsSuccess = false;
                 response.ReturnMessage.Add(ex.ToString());
              }
              return response;            
        }

        [HttpPost]
        [Route("TeacherBreakInBreakOut")]
        public ResponseViewModal TeacherBreakInBreakOut(TeacherBreakLogViewModel teacherBreakInBreakOutRequest)
        {
            try
            {
                response = _teacherService.TeacherBreakInBreakOut(teacherBreakInBreakOutRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        [HttpPost]
        [Route("GetTeacherBreakLog")]
        public ResponseViewModal GetTeacherBreakLog(GetTeacherBreakLogRequestViewModel getTeacherBreakLogRequest)
        {
            try
            {
                response = _teacherService.GetTeacherBreakLog(getTeacherBreakLogRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTeacherOperationalClasses")]
        public ResponseViewModal GetTeacherOperationalClasses(GetTeacherBreakLogRequestViewModel getTeacherOperationalClassesRequest)
        {
            try
            {
                response = _teacherService.GetTeacherOperationalClasses(getTeacherOperationalClassesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }
        [HttpPost]
        [Route("GetTeacherCurrentBreakStatus")]
        public ResponseViewModal GetTeacherCurrentBreakStatus(GetTeacherBreakLogRequestViewModel getTeacherBreakStatusRequest)
        {
            try
            {
                response = _teacherService.GetTeacherCurrentBreakStatus(getTeacherBreakStatusRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetTeacherCurrentClassLogStatus")]
        public ResponseViewModal GetTeacherCurrentClassLogStatus(TeacherDailyAttendenceRequestViewModel getTeacherCurrentClassLogStatusRequest)
        {
            try
            {
                response = _teacherService.GetTeacherCurrentClassLogStatus(getTeacherCurrentClassLogStatusRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("BreakInOutAttendenceStudentMobile")]
        public ResponseViewModal BreakInOutAttendenceStudentMobile(StudentBreakLogViewModel breakInOutAttendenceStudentMobileRequest)
        {
            
                try
                {
                    response = _teacherAttendenceService.BreakInOutAttendenceStudentMobile(breakInOutAttendenceStudentMobileRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;
            
        }

        [HttpPost]
        [Route("GetTeacherAvailability")]
        public ResponseViewModal GetTeacherAvailability(GetTeacherAvailabilityViewModel getTeacherAvailabilityRequest)
        {
           
                try
                {
                    response = _teacherService.GetTeacherAvailability(getTeacherAvailabilityRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }


        [HttpPost]
        [Route("TeacherDashboardInfo")]
        public ResponseViewModal TeacherDashboardInfo(TeacherDashboardInfoRequestViewModel teacherdashboardinfoRequest)
        {      
                try
                {
                    response = _teacherService.TeacherDashboardInfo(teacherdashboardinfoRequest);
                }
                catch (Exception ex)
                {
                    response.IsSuccess = false;
                    response.ReturnMessage.Add(ex.ToString());
                }
                return response;            
        }

        [HttpPost]
        [Route("SaveTeacherAvailabilityInformartion")]
        public ResponseViewModal SaveTeacherAvailabilityInformartion(TeacherAvailabilityViewModel saveTeacherAvailability)
        {
          try
            {
              response = _teacherService.SaveTeacherAvailabilityInformartion(saveTeacherAvailability);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;            
        }

        [HttpPost]
        [Route("StudentClassTransferAttendence")]
        public async Task<ResponseViewModal> StudentClassTransferAttendence(ClassTransferAttendenceViewModel getClassTransferAttendenceInfoRequest)
        {
            ResponseViewModal responseStudentClassTransferAttendence = new ResponseViewModal();
            responseStudentClassTransferAttendence = _teacherAttendenceService.StudentClassTransferAttendence(getClassTransferAttendenceInfoRequest);
            responseStudentClassTransferAttendence = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseStudentClassTransferAttendence.Data,
                StatusCode = responseStudentClassTransferAttendence.StatusCode,
                TotalRows = responseStudentClassTransferAttendence.TotalRows,
                Message = responseStudentClassTransferAttendence.Message,
                Transferwithcheckout = responseStudentClassTransferAttendence.Transferwithcheckout
            };
            return await Task.Run(() => responseStudentClassTransferAttendence);
        }

        [HttpPost]
        [Route("UpdateStudentProfilePicByTeacher")]
        public ResponseViewModal UpdateStudentProfilePicByTeacher(StudentViewModel saveStudentRequest)
        {
            try
            {
                response = _parentService.UpdateStudentProfilePicByTeacher(saveStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("UpdateTeacherClockOutTime")]
        public ResponseViewModal UpdateTeacherClockOutTime(AttendanceRequestViewModel clockOutTimeUpdateReq)
        {
           try
            {
               response = _teacherAttendenceService.UpdateTeacherClockOutTime(clockOutTimeUpdateReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("UpdateTeacherClockInTime")]
        public ResponseViewModal UpdateTeacherClockInTime(AttendanceRequestViewModel clockOutTimeUpdateReq)
        {
            try
            {
                response = _teacherAttendenceService.UpdateTeacherClockInTime(clockOutTimeUpdateReq);
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
