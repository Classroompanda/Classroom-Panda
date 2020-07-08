using Microsoft.AspNetCore.Http;

namespace DayCare.Model.Common
{
    public class TokenModel
    {
        public long UserID { get; set; }
        public string UserName { get; set; }
        public long RoleID { get; set; }
        public long OrganizationID { get; set; }
        public long LocationID { get; set; }
        public long StaffID { get; set; }
        public string Timezone { get; set; }
        public string IPAddress { get; set; }
        public string DomainName { get; set; }
        public string MacAddress { get; set; }
        public long PatelongID { get; set; }
        public HttpContext Request { get; set; }
    }
    public class Domalongoken
    {
        public string BusinessToken { get; set; }
        public long OrganizationId { get; set; }
        public string HostName { get; set; }


        public string ServerName { get; set; }
        public string DatabaseName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public object Organization { get; set; }
    }
}
