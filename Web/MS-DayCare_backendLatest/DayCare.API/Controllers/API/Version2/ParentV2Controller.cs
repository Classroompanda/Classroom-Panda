using System;
using Microsoft.AspNetCore.Mvc;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Service.IService.Agency;
using DayCare.Service.IService.Parents;
using DayCare.Model.Parent;

namespace DayCare.API.Controllers.API.Version2
{
    [Route("api/Parent")]
    [ApiVersion("2.0")]
    [ApiController]
    public class ParentV2Controller : ControllerBase
    {
        #region Initialize Dependency
        private readonly IParentsService _parentService;
        ResponseViewModal response;

        public ParentV2Controller(IParentsService parentService)
        {
            _parentService = parentService;
            response = new ResponseViewModal();
        }
        #endregion

        [HttpPost]
        [Route("SaveStudent")]
        public ResponseViewModal SaveStudent(StudentV2ViewModel saveStudentRequest)
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
        [Route("SaveParentInformation")]
        public ResponseViewModal SaveParentInformation(ParentInformationV2ViewModel saveParentInformationRequest)
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
    }
}