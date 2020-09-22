

namespace DayCare.Model.Common
{
    

    public class JsonModel
    {
        public string access_token;
        public long expires_in;
        public bool firstTimeLogin;

        public object data { get; set; }
        public string Message { get; set; }
        public long StatusCode { get; set; }
        public Meta meta { get; set; }
        public long Id { get; set; }
        public bool IsAuthPerson { get; set; }
        public string QuickPin { get; set; }
    }

    public class Meta
    {
        public decimal TotalPages { get; set; }
        public long PageSize { get; set; }
        public long CurrentPage { get; set; }
        public long DefaultPageSize { get; set; }
        public decimal TotalRecords { get; set; }
    }
}
