using DayCare.Model.ApplicationUser;
using DayCare.Model.Common;
using DayCare.Model.Options;
using DayCare.Model.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.IService.Login
{
    public interface ILoginService
    {
        JsonModel Login(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token);
        JsonModel LoginforKioskApp(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token);
        JsonModel LoginforKioskWeb(ApplicationUser applicationUser, JwtIssuerOptions _jwtOptions, TokenModel token);

        JsonModel GetUserDetails(UserModel tokens, long userId);

        JsonModel GetTeacherLiginDetails(ApplicationUser applicationUser);
    }
}
