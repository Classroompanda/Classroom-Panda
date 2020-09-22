using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ChatPrivateMessageDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long FromUserId { get; set; }

        public long ToUserId { get; set; }

        public string Message { get; set; }

        public bool IsRead { get; set; }

        public long StringId { get; set; }

        public string Token { get; set; }
    }
}
