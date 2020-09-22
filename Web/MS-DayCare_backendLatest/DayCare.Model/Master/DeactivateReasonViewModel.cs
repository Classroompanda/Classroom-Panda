using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class DeactivateReasonViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long StringId { get; set; }
        public long RoleID { get; set; }
        public string Reason { get; set; }

    }
}
