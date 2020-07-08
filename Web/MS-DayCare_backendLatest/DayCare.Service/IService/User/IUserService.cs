using DayCare.Model.ApplicationUser;
using DayCare.Model.Common;
using DayCare.Model.Response;
using DayCare.Model.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.User
{
    public interface IUserService
    {
        JsonModel Authenticate(LoginModel loginModel);
        JsonModel GetUser { get; }

        bool SaveMobileToken(ApplicationUser applicationUser);
        JsonModel Logout(TokenModel token);
        bool DoesUserExists(string applicationUserEmail, string newPassword);

        string GetEmailAddress(int? UserId);
        long GetAgencyID(string QuickPin);

        ResponseViewModal GetAgencyID(ApplicationUser applicationUser);



    }
}
