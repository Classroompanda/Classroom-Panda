using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DayCare.Model.Agency;
using DayCare.Model.Parent;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Model.PostActivity;
using DayCare.Service.IService.Agency;
using DayCare.Service.IService.Parents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DayCare.Model.User;
using Microsoft.AspNetCore.Authorization;

namespace DayCare.API.Controllers.API
{
    [ApiVersion("1.0")]
    [Route("api/parent")]
    // [Authorize]
    [ApiController]
    public class ParentController : ControllerBase
    {
        #region Initialize Dependency
        private readonly IParentsService _parentService;
        private readonly IPostActivitiesService _postActivitiesService;
        ResponseViewModal response;

        public ParentController(IParentsService parentService, IPostActivitiesService postActivitiesService)
        {
            _parentService = parentService;
            _postActivitiesService = postActivitiesService;
            response = new ResponseViewModal();
        }
        #endregion

        [HttpPost]
        [Route("GetAllStudentsListOfParent")]
        public ResponseViewModal GetAllStudentsListOfParent(ParentsStudentRequestViewModel getAllStudentsListOfParentRequest)
        {
            try
            {
                response = _parentService.GetAllStudentsListOfParent(getAllStudentsListOfParentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetParentInformation")]
        public ResponseViewModal GetParentInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetParentInformation(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetParentUpdatedInformation")]
        public ResponseViewModal GetParentUpdatedInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetParentUpdatedInformation(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteParentUpdatedInformation")]
        public ResponseViewModal DeleteParentUpdatedInformation(ParentsStudentRequestViewModel deleteParentInformationRequest)
        {
            try
            {
                response = _parentService.DeleteParentUpdatedInformation(deleteParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllStudentsOfParent")]
        public ResponseViewModal GetAllStudentsOfParent(ParentsStudentRequestViewModel getAllStudentsOfParentRequest)
        {
            try
            {
                response = _parentService.GetAllStudentsOfParent(getAllStudentsOfParentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllStudentsForEnroll")]
        public ResponseViewModal GetAllStudentsForEnroll(ParentsStudentRequestViewModel getAllStudentsOfParentRequest)
        {
            try
            {
                response = _parentService.GetAllStudentsForEnroll(getAllStudentsOfParentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveParentInformation")]
        public ResponseViewModal SaveParentInformation(ParentInformationViewModel saveParentInformationRequest)
        {
            try
            {
                response = _parentService.SaveParentInformation(saveParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudent")]
        public ResponseViewModal SaveStudent(StudentViewModel saveStudentRequest)
        {
            try
            {
                response = _parentService.SaveStudent(saveStudentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentGaurdians")]
        public ResponseViewModal SaveStudentGaurdians(GuardianViewModel saveStudentGaurdiansRequest)
        {
            try
            {
                response = _parentService.SaveStudentGaurdians(saveStudentGaurdiansRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentMedication")]
        public ResponseViewModal SaveStudentMedication(StudentMedicationViewModel saveStudentMedicationRequest)
        {
            try
            {
                response = _parentService.SaveStudentMedication(saveStudentMedicationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentImmunization")]
        public ResponseViewModal SaveStudentImmunization(StudentImmunizationViewModel saveStudentImmunizationRequest)
        {
            try
            {
                response = _parentService.SaveStudentImmunization(saveStudentImmunizationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentAllergies")]
        public ResponseViewModal SaveStudentAllergies(StudentAllergiesViewModel saveStudentAllergiesRequest)
        {
            try
            {
                response = _parentService.SaveStudentAllergies(saveStudentAllergiesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveStudentDisabilities")]
        public ResponseViewModal SaveStudentDisabilities(StudentDisabilitiesViewModel saveStudentDisabilitiesRequest)
        {
            try
            {
                response = _parentService.SaveStudentDisabilities(saveStudentDisabilitiesRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("StudentClassEnrollment")]
        public ResponseViewModal StudentClassEnrollment(ClassEnrollmentViewModel studentClassEnrollmentRequest)
        {
            try
            {
                response = _parentService.StudentClassEnrollment(studentClassEnrollmentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAttendanceListforparent")]
        public ResponseViewModal GetAttendanceListforparent(StudentAttendanceRequestViewModel attendaceRequest)
        {
            try
            {
                response = _parentService.GetAttendanceListforparent(attendaceRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetStudentClassEnrollment")]
        public ResponseViewModal GetStudentClassEnrollment(ParentsStudentRequestViewModel getStudentClassEnrollmentRequest)
        {
            try
            {
                response = _parentService.GetStudentClassEnrollment(getStudentClassEnrollmentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllIncidentsByChildID")]
        public ResponseViewModal GetAllIncidentsByChildID(IncidentRequestViewModel getAllIncidentsRequest)
        {
            try
            {
                response = _parentService.GetAllIncidentsByChildID(getAllIncidentsRequest);
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
        [Route("GetDailySheetForParent")]
        public ResponseViewModal GetDailySheetForParent(DailySheetRequestViewModel getDailySheetMobileRequest)
        {
            try
            {
                response = _parentService.GetDailySheetForParent(getDailySheetMobileRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetAllPostActivitiesByChildID")]
        public ResponseViewModal GetAllPostActivitiesByChildID(PostActivitiesRequestViewModel getAllPostActivitiesRequest)
        {
          try
             {
               response = _postActivitiesService.GetAllPostActivitiesByChildID(getAllPostActivitiesRequest);
             }
           catch (Exception ex)
            {
              response.IsSuccess = false;
              response.ReturnMessage.Add(ex.ToString());
            }
            return response;            
        }

        [HttpPost]
        [Route("SaveParentDashboardImagedLikeInformation")]
        public ResponseViewModal SaveParentDashboardImagedLikeInformation(PostImageslikeDetailsViewModel postImageslikeDetailsInformationRequest)
        {
            try
            {
                response = _parentService.SaveParentDashboardImagedLikeInformation(postImageslikeDetailsInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("UpdateEmailForParent")]
        public ResponseViewModal UpdateEmailForParent(ParentInformationViewModel updateParebtmailReq)
        {
           try
            {
                response = _parentService.UpdateEmailForParent(updateParebtmailReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("ChangeQuickPinForParent")]
        public ResponseViewModal ChangeQuickPinForParent(ParentInformationViewModel updateParebtmailReq)
        {
            try
            {
                response = _parentService.ChangeQuickPinForParent(updateParebtmailReq);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;

        }

        [HttpPost]
        [Route("SaveParentDashboardVideoLikeInformation")]
        public ResponseViewModal SaveParentDashboardVideoLikeInformation(PostVideolikeDetailsViewModel postVideolikeDetailsInformationRequest)
        {
          try
            {
                response = _parentService.SaveParentDashboardVideoLikeInformation(postVideolikeDetailsInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("SaveStudentEnrollment")]
        public ResponseViewModal SaveStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest)
        {
           try
            {
                response = _parentService.SaveStudentEnrollment(saveStudentEnrollmentRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("SaveUserInformation")]
        public ResponseViewModal SaveUserInformation(UserViewModel saveUserInformationRequest)
        {
            ResponseViewModal x = new ResponseViewModal();
            try
            {
               
                x.Data = 1;
                //var x = 1;
                // responses = _usrService.SaveUserInformation(saveUserInformationRequest);

            }
            catch (Exception ex)
            {
                //response.IsSuccess = false;
                //response.ReturnMessage.Add(ex.ToString());
            }
            return x;
        }


        [HttpPost]
        [Route("GetAllParentInformation")]
        public ResponseViewModal GetAllParentInformation(ParentsStudentRequestViewModel getParentInformationRequest)
        {
           try
            {
                response = _parentService.GetAllParentInformation(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetMasterParentForDropdown")]
        public ResponseViewModal GetMasterParentForDropdown(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetMasterParentForDropdown(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetClassroomJoinParent")]
        public ResponseViewModal GetClassroomJoinParent(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetClassroomJoinParent(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("GetAllParentWithoutGuardian")]
        public ResponseViewModal GetAllParentWithoutGuardian(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetAllParentWithoutGuardian(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }


        [HttpPost]
        [Route("GetParentAccordingtoLogin")]
        public ResponseViewModal GetParentAccordingToLogin(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetParentAccordingToLogin(getParentInformationRequest);
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
        [Route("UploadParentUserWithFile")]
        public ResponseViewModal UploadParentUserWithFile([FromForm]CSVFILEREQVM infoCsvFileReq)
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    response = _parentService.UploadParentUserWithFile(file, infoCsvFileReq);
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
        [Route("UploadStudentUserWithFile")]
        public ResponseViewModal UploadStudentUserWithFile([FromForm]CSVFILEREQVM objCSVFILEREQVM)
        {
            try
            {
                if (Request.ContentLength > 0)
                {
                    var file = Request.Form.Files[0];
                    response = _parentService.UploadStudentUserWithFile(file, objCSVFILEREQVM);
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
        [Route("SaveParentSignatureDetails")]
        public async Task<ResponseViewModal> SaveParentSignatureDetails(ParentSignatureDetailsViewModel getParentSignatureInfoRequest)
        {
            ResponseViewModal responseParentSignature = new ResponseViewModal();
            responseParentSignature = _parentService.SaveParentSignatureDetails(getParentSignatureInfoRequest);
            responseParentSignature = new ResponseViewModal()
            {
                IsSuccess = true,
                Data = responseParentSignature.Data,
                StatusCode = responseParentSignature.StatusCode,
                TotalRows = responseParentSignature.TotalRows,
                Message = responseParentSignature.Message               
            };
            return await Task.Run(() => responseParentSignature);
        }

        [HttpPost]
        [Route("GetParentAddress")]
        public ResponseViewModal GetParentAddress(ParentsStudentRequestViewModel getParentInformationRequest)
        {
            try
            {
                response = _parentService.GetParentAddress(getParentInformationRequest);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ReturnMessage.Add(ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("UpdateStudentEnrollment")]
        public ResponseViewModal UpdateStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest)
        {
            try
            {
                response = _parentService.UpdateStudentEnrollment(saveStudentEnrollmentRequest);
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