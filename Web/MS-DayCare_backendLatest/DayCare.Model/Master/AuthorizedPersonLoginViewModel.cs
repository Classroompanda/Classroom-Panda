using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AuthorizedPersonLoginViewModel : BaseViewModel
    {
        public long Id { get; set; }
                
        public string AuthorizedPersonEmailId { get; set; }        
        public string QuickPin { get; set; }

        public string Agency { get; set; }

        public long StringId { get; set; }
    }
}
