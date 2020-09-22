using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ActiveUsersForChatViewModel :BaseViewModel
    {
        public  long Id { get; set; }

        public long userID { get; set; }

        public string connectionID { get; set; }
    }
}
