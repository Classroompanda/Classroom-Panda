using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DayCare.API.Infrastructure
{
    public static class DayCareConstants
    {
        private static IConfiguration Configuration;

        public static void SetConfiguration(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static string Secret => Configuration["AppSettings:Secret"];
        public static string DayCareConnection => Configuration.GetConnectionString("DayCareConnection");
    }
}
