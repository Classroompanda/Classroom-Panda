using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ApprovalTypeViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long StringId { get; set; }
        public long AgencyID { get; set; }
        public string ApproveType { get; set; }
        
    }
}
