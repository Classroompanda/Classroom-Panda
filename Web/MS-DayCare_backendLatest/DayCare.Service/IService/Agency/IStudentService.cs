using DayCare.Model.Agency;
using DayCare.Model.Response;
using DayCare.Model.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Agency
{
    public interface IStudentService
    {
        ResponseViewModal GetAllStudents(StudentBaseRequestViewModel getAllStudentRequest);
        ResponseViewModal GetAllStudentsByClass(StudentBaseRequestViewModel getAllStudentsRequest);
        ResponseViewModal GetAllStudentsDropDownByClass(StudentBaseRequestViewModel getAllStudentsRequest);
        ResponseViewModal GetAllGuardiansForStudents(StudentBaseRequestViewModel getAllGuardianForStudentsRequest);
        ResponseViewModal GetStudentInformation(StudentBaseRequestViewModel getStudentInformationRequest);
        ResponseViewModal GetAllUnaaprovedStudents(StudentBaseRequestViewModel getStudentUnapprovedStudentRequest);

        ResponseViewModal GetAllStudentsforKioskApp(StudentBaseRequestViewModel getAllStudentsRequest);
        ResponseViewModal SaveKioskeStudentSignInDetails(KioskeStudentSignInDetailsViewModel saveKioskeSignInDetailsRequest);

        ResponseViewModal SaveKioskeStudentSignInDetailsInformation(params KioskeStudentSignInDetailsViewModel[] saveKioskeSignInDetailsRequests);
      
        ResponseViewModal GetActiveAndDeaactiveStudents(StudentBaseRequestViewModel getAllStudentsRequest);
        ResponseViewModal GetKioskeSigninDetailsForAgency(ReportViewModel getKioskeDetailsRequest);
        ResponseViewModal GetStudentKioskeDropInOutList(ReportViewModel getKioskeDetailsRequest);

        ResponseViewModal UpdateStudentKioskeTime(StudentBaseRequestViewModel timeUpdateReq);

        ResponseViewModal GetAllStudentInformationForCSV(StudentBaseRequestViewModel getAllStudentsRequest);
    }
}
