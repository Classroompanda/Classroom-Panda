using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Common
{
    public class CreatePasswordViewModel
    {
        public string RequestedId { get; set; }

        public string NewPassword { get; set; }

        public int UserID { get; set; }
    }
}
