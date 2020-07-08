using System;
using System.Collections.Generic;
using System.Text;


namespace DayCare.Model.Agency
{
    public class TextMessagePlanViewModel : BaseViewModel
    {
        public long Id { get; set; }
       
        public long AgencyID { get; set; }

        public long Amount { get; set; }

        public long Messages { get; set; }
        public string TokenID { get; set; }

        public long StringId { get; set; }

    }
}
