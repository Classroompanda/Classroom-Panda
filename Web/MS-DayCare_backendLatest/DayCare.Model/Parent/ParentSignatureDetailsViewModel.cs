using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
   public class ParentSignatureDetailsViewModel : BaseViewModel
    {
       
        public long Id { get; set; }

        public long AgencyID { get; set; }       
    
        public long StudentID { get; set; }

        public long ParentID { get; set; }
      
        public string ImagePath { get; set; }
        public int limit { get; set; }
        public int page { get; set; }

        public string Agency { get; set; }

        public long StringId { get; set; }

    }
}
