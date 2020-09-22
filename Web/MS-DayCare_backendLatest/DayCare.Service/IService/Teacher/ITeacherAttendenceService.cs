using DayCare.Model.Response;
using DayCare.Model.Common;
using DayCare.Model.Teacher;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Teacher
{
    public interface ITeacherAttendenceService
    {
        ResponseViewModal GetClassAttendence(AttendanceRequestViewModel attendaceRequest);
        ResponseViewModal CheckInAttendenceStudent(AttendenceViewModel requestCheckInAttendenceStudent);
        ResponseViewModal CheckOutAttendenceStudent(AttendenceViewModel requestCheckOutAttendenceStudent);
        ResponseViewModal AbsentAttendenceStudent(AttendenceViewModel requestAbsentAttendenceStudent);
        ResponseViewModal GetStudentBreakLogs(StudentBreakLogRequestViewModel getStudentBreakLogsRequest);
        ResponseViewModal BreakInAttendenceStudent(StudentBreakLogViewModel breakInAttendenceStudentRequest);
        ResponseViewModal BreakOutAttendenceStudent(StudentBreakLogViewModel breakOutAttendenceStudentRequest);
        ResponseViewModal BreakInOutAttendenceStudentMobile(StudentBreakLogViewModel breakInOutAttendenceStudentMobileRequest);
        ResponseViewModal StudentClassTransferAttendence(ClassTransferAttendenceViewModel getClassTransferAttendenceInfoRequest);
        ResponseViewModal UpdateTeacherClockOutTime(AttendanceRequestViewModel clockOutTimeUpdateReq);
        ResponseViewModal UpdateTeacherClockInTime(AttendanceRequestViewModel clockOutTimeUpdateReq);
    }
}
