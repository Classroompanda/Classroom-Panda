using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class ErrorLogViewModel : BaseViewModel   
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long UserID { get; set; }

        public string Message { get; set; }

        public string StackTrace { get; set; }

        public int limit { get; set; }

        public int page { get; set; }

        public string Agency { get; set; }

        public long StringId { get; set; }

    }
}
