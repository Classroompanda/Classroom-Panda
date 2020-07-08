using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ChatRequestViewModel
    {
        public long AgencyID { get; set; }       

        public long RoleID { get; set; }

        public int limit { get; set; }
        public int page { get; set; }

        public long ParentID { get; set; }

        public long ClassID { get; set; }
        public long TeacherID { get; set; }

        public long FilteredUser { get; set; }

        public string SerachByName { get; set; }

        public long LoginUserID { get; set; }
        public long UserID { get; set; }
    }
}
