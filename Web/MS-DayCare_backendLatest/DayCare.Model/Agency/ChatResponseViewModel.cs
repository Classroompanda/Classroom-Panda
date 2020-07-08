using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ChatResponseViewModel
    {
        public long ListUserId { get; set; }
        public string EmailID { get; set; }

        public string ListUserName { get; set; }

        public string ImagePath { get; set; }

        public bool IsAgencyAdminAdmin { get; set; }
        public string UserRole { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? Count { get; set; }

        public long FromID { get; set; }
        public long ToID { get; set; }
        public long ID { get; set; }
        public long PhoneNumber { get; set; }
    }
}
