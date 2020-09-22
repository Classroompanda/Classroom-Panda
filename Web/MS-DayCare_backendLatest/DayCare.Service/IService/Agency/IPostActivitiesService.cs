using DayCare.Model.Response;
using DayCare.Model.Agency;
using DayCare.Model.Master;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DayCare.Service.IService.Agency
{
    public interface IPostActivitiesService
    {
        ResponseViewModal GetAllPostActivities(PostActivitiesRequestViewModel getAllPostActivitiesRequest);
        ResponseViewModal UploadImage(IFormFile file);
        ResponseViewModal SaveStudentPostActivity(PostActivitiesRequestViewModel PostActivityRequestViewModel);
        ResponseViewModal SavePostActivities(PostActivitiesRequestViewModel PostActivityRequestViewModel);
        ResponseViewModal GetPostActivityInfo(PostActivitiesRequestViewModel getPostActivityInfoRequest);

        ResponseViewModal GetAllPostActivitiesByChildID(PostActivitiesRequestViewModel getAllPostActivitiesRequest);

        ResponseViewModal GetAllPostActivitiesForAgency(PostActivitiesRequestViewModel getAllPostActivitiesRequest);

        ResponseViewModal GetUnApproveImages(UnApproveImagesViewModel unApproveImagesRequest);
        ResponseViewModal ApproveImages(UnApproveImagesViewModel unApproveImagesRequest);
    }
}
