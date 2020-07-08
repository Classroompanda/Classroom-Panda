using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AuthorizedPersonViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long ParentID { get; set; }

        public long[] StudentIDs { get; set; }
        public long StudentID { get; set; }

        public string AuthorizedPersonName { get; set; }
        public string ReasonNotToAllow { get; set; }
        public long? Mobile { get; set; }

        public string  EmailId { get; set; }

        public bool IsAuthorizedPickUp { get; set; }

        public string ImagePath { get; set; }

        public int limit { get; set; }
        public int page { get; set; }
        
        public string Agency { get; set; }

        public long StringId { get; set; }

        public string StudentName { get; set; }

        public string ParentName { get; set; }

        public bool isaddMode { get; set; }

        public string QuickPin { get; set; }
        public string AuthorizedPersonEmailId { get; set; }
        public bool IsEmergencyContact { get; set; }
    }
}
