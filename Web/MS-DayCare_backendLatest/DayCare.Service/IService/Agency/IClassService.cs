using DayCare.Model.Response;
using DayCare.Model.Agency;
using DayCare.Model.Master;
using DayCare.Model.Response;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DayCare.Service.IService.Agency
{
    public interface IClassService
    {
        ResponseViewModal GetAllClasses(ClassesRequestViewModel getAllClassesRequest);

        ResponseViewModal SaveClassInformation(ClassesViewModel saveClassInformationRequest);

        ResponseViewModal GetParticularClassDetails(ClassesRequestViewModel getAllClassesRequest);

        ResponseViewModal SaveClassAssignmentInformation(ClassAssignmentViewModel saveClassAssignmentInformationRequest);
        ResponseViewModal GetAllClassAssignmentLog(ClassesRequestViewModel getAllClassesRequest);

        ResponseViewModal UploadClassesWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM);
        ResponseViewModal ClassAssignmentUsingFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM);

        ResponseViewModal GetAllClassesForStudentAttendenceTransfer(ClassesRequestViewModel getAllClassesRequest);

        ResponseViewModal GetClassesByStudentID(ClassesViewModel saveClassInformationRequest);

        ResponseViewModal GetFeeType(FeeTypeViewModel feeTypeViewModel);

        ResponseViewModal GetAllClassesForParent(ClassesRequestViewModel getAllClassesRequest);
    }
}
