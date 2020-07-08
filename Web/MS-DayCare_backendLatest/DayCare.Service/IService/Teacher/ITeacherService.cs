using DayCare.Model.Agency;
using DayCare.Model.Response;
using DayCare.Model.Teacher;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Teacher
{
    public interface ITeacherService
    {
        ResponseViewModal GetAllTeachers(TeacherRequestViewModel getAllTeachersRequest);
        ResponseViewModal GetTeacherInformation(TeacherRequestViewModel getTeacherInformationRequest);
        ResponseViewModal SaveTeacherDetails(TeachersDetailsViewModel saveTeacherDetailsRequest);
        ResponseViewModal UpdateEmailForTeacher(TeachersDetailsViewModel updateTeacherEmailRequest);
        ResponseViewModal GetTeacherDailyAttendence(TeacherDailyAttendenceRequestViewModel getTeacherDailyAttendenceRequest);
        ResponseViewModal GetTeacherClassLog(TeacherDailyAttendenceRequestViewModel getTeacherClassLogRequest);
        ResponseViewModal TeacherCheckInCheckOut(TeacherClassAttendenceViewModel teacherCheckInCheckOutRequest);
        ResponseViewModal TeacherClockInClockOut(TeacherDailyAttendenceViewModel teacherClockInClockOutRequest);
        ResponseViewModal GetTeacherTodayMedicationTasks(TeacherTodayMedicationTasksRequestViewModel getTeacherTodayMedicationTasksRequest);
        ResponseViewModal GetStudentAllergy(StudentAllergyRequestViewModel getStudentAllergyRequest);
        ResponseViewModal TeacherBreakInBreakOut(TeacherBreakLogViewModel teacherBreakInBreakOutRequest);
        ResponseViewModal GetTeacherBreakLog(GetTeacherBreakLogRequestViewModel getTeacherBreakLogRequest);
        ResponseViewModal GetTeacherOperationalClasses(GetTeacherBreakLogRequestViewModel getTeacherOperationalClassesRequest);
        ResponseViewModal GetTeacherCurrentBreakStatus(GetTeacherBreakLogRequestViewModel getTeacherBreakStatusRequest);
        ResponseViewModal GetTeacherCurrentClassLogStatus(TeacherDailyAttendenceRequestViewModel getTeacherCurrentClassLogStatusRequest);
        ResponseViewModal GetTeacherAvailability(GetTeacherAvailabilityViewModel getTeacherAvailabilityRequest);

        ResponseViewModal TeacherDashboardInfo(TeacherDashboardInfoRequestViewModel teacherDashboardInfoRequest);
        ResponseViewModal SaveTeacherAvailabilityInformartion(TeacherAvailabilityViewModel saveTeacherAvailability);

        ResponseViewModal ActivateTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest);

        ResponseViewModal GetAllTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest);

        ResponseViewModal UploadTeacherUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM);               

        ResponseViewModal ActivateClockInTeacher(TeachersDetailsViewModel saveTeacherDetailsRequest);
        
        ResponseViewModal GetAllPresentTeachersForAgency(TeacherRequestViewModel getAllTeachersRequest);
        
    }
}
