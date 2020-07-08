using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class BroadCastEmailViewModel
    {
        public long AgencyID { get; set; }
        public string AgencyName { get; set; }
        public long SenderID { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public string[] EmailArray { get; set; }
        public long[] PhoneArray { get; set; }
        public string AskedDateString { get; set; }
    }
}
