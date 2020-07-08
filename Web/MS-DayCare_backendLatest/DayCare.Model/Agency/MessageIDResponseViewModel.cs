using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class MessageIDResponseViewModel
    {
        public long Id { get; set; }
        public long SenderUserID { get; set; } 
                                       
        public long ReceiverUserID { get; set; }

        public string Message { get; set; }

        public DateTime CreatedDateTime { get; set; } 
    }
}
