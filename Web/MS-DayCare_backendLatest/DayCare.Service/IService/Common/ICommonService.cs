using DayCare.Model.Common;
using DayCare.Model.Response;
using DayCare.Model.User;
using DayCare.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Common
{
    public interface ICommonService
    {
        FileUploadResponseViewModel UploadImage(IFormFile file);
        bool SendEmailSync(String email, String subject, String message);
        bool SendBroadCastEmailSync(String fromEmail, String toEmail, String subject, String message);
        bool SendEmailAttachmentSync(String email, String subject, String message, String filePath);
        string RandomString(int length);
        //ResponseViewModal CreateUser(UserViewModel saveUserInformationRequest,int setUserMode);
        string GeneratePassword();
        string GenerateAgencyCode();

        string GenerateRandomNo();

    }
}
