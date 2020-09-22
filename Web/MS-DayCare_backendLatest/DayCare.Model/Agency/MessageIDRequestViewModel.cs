using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class MessageIDRequestViewModel
    {
        public long senderUserID { get; set; }

        public long receiverUserID { get; set; }

        public int limit { get; set; }
        public int page { get; set; }
    }
}
