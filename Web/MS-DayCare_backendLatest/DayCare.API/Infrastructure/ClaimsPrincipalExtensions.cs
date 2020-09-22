using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DayCare.API.Infrastructure
{
    public static class ClaimsPrincipalExtensions
    {
        public static long GetUserId(this ClaimsPrincipal user)
        {
            var userId = user.Claims?.FirstOrDefault(c => c.Type == "UserID")?.Value;
            return Convert.ToInt64(userId);
        }

        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Claims?.FirstOrDefault(c => c.Type == "UserName")?.Value;
        }
    }

}
