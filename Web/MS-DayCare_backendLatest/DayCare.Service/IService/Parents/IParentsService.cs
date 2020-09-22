using DayCare.Model.Agency;
using DayCare.Model.Parent;
using DayCare.Model.Response;
using DayCare.Model.Student;
using DayCare.Model.PostActivity;

using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DayCare.Service.IService.Parents
{

    public interface IParentsService
    {
        ResponseViewModal GetAllStudentsListOfParent(ParentsStudentRequestViewModel getAllStudentsListOfParentRequest);
        ResponseViewModal GetParentInformation(ParentsStudentRequestViewModel getParentInformationRequest);
        ResponseViewModal GetParentUpdatedInformation(ParentsStudentRequestViewModel getParentInformationRequest);
        ResponseViewModal DeleteParentUpdatedInformation(ParentsStudentRequestViewModel deleteParentInformationRequest);
        ResponseViewModal GetAllStudentsOfParent(ParentsStudentRequestViewModel getAllStudentsOfParentRequest);
        ResponseViewModal GetAllStudentsForEnroll(ParentsStudentRequestViewModel getAllStudentsOfParentRequest);
        ResponseViewModal SaveParentInformation(ParentInformationViewModel saveParentInformationRequest);
        ResponseViewModal SaveParentInformation(ParentInformationV2ViewModel saveParentInformationRequest);
        ResponseViewModal SaveStudent(StudentViewModel saveStudentRequest);
        ResponseViewModal SaveStudent(StudentV2ViewModel saveStudentRequest);
        ResponseViewModal SaveStudentGaurdians(GuardianViewModel saveStudentGaurdiansRequest);
        ResponseViewModal SaveStudentMedication(StudentMedicationViewModel saveStudentMedicationRequest);
        ResponseViewModal SaveStudentImmunization(StudentImmunizationViewModel saveStudentImmunizationRequest);
        ResponseViewModal SaveStudentAllergies(StudentAllergiesViewModel saveStudentAllergiesRequest);
        ResponseViewModal SaveStudentDisabilities(StudentDisabilitiesViewModel saveStudentDisabilitiesRequest);
        ResponseViewModal StudentClassEnrollment(ClassEnrollmentViewModel studentClassEnrollmentRequest);
        ResponseViewModal GetAttendanceListforparent(StudentAttendanceRequestViewModel attendaceRequest);
        ResponseViewModal GetStudentClassEnrollment(ParentsStudentRequestViewModel getStudentClassEnrollmentRequest);

        ResponseViewModal GetAllIncidentsByChildID(IncidentRequestViewModel getAllIncidentsRequest);
        ResponseViewModal GetDailySheetForParent(DailySheetRequestViewModel getDailySheetMobileRequest);

        ResponseViewModal SaveParentDashboardImagedLikeInformation(PostImageslikeDetailsViewModel postImageslikeDetailsInformationRequest);

        ResponseViewModal UpdateEmailForParent(ParentInformationViewModel updateParebtmailReq);
        ResponseViewModal ChangeQuickPinForParent(ParentInformationViewModel updateParebtmailReq);

        ResponseViewModal SaveParentDashboardVideoLikeInformation(PostVideolikeDetailsViewModel postVideolikeDetailsInformationRequest);

        ResponseViewModal SaveStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest);
        ResponseViewModal GetAllParentInformation(ParentsStudentRequestViewModel getParentInformationRequest);
        ResponseViewModal ActivateStudent(StudentViewModel saveStudentRequest);

        ResponseViewModal ActivateParent(ParentInformationViewModel saveParentInformationRequest);

        ResponseViewModal GetAllParentInformationForAgency(ParentsStudentRequestViewModel getParentInformationRequest);

        ResponseViewModal GetMasterParentForDropdown(ParentsStudentRequestViewModel getParentInformationRequest);
        ResponseViewModal GetClassroomJoinParent(ParentsStudentRequestViewModel getParentInformationRequest);

        ResponseViewModal GetAllParentWithoutGuardian(ParentsStudentRequestViewModel getParentInformationRequest);

        ResponseViewModal GetParentAccordingToLogin(ParentsStudentRequestViewModel getParentInformationRequest);
        ResponseViewModal UploadParentUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM);

        ResponseViewModal UploadStudentUserWithFile(IFormFile file, CSVFILEREQVM objCSVFILEREQVM);
        ResponseViewModal SaveParentSignatureDetails(ParentSignatureDetailsViewModel getParentSignatureInfoRequest);
        ResponseViewModal UpdateStudentProfilePicByTeacher(StudentViewModel saveStudentRequest);

        ResponseViewModal GetAllParentInformationForCSV(ParentsStudentRequestViewModel getParentInformationRequest);

        ResponseViewModal GetParentAddress(ParentsStudentRequestViewModel getParentInformationRequest);

        ResponseViewModal UpdateStudentEnrollment(ClassEnrollmentViewModel saveStudentEnrollmentRequest);
    }
}
