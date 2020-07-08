using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class MessageViewModel : BaseViewModel
    {
        public long AgencyID { get; set; }

        public long ParentID { get; set; }

        public long TeacherID { get; set; }

        public string TeacherName { get; set; }

        public long stringID { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public string ImagePath { get; set; }

        public string ParentName { get; set; }

        public long TeacherUserID { get; set; }

        public long SenderUserID { get; set; }

        public long ReceiverUserID { get; set; }

        public string Message { get; set; }


        public long ParentUserID { get; set; }

        public string AgencyName { get; set; }

        public DateTime CreatedDateTime { get;set; }

        public bool IsAgencyUser { get; set; }

        public long AgencyUserID { get; set; }



    }
}
