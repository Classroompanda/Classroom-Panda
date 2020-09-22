using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class StudentFilesRequestViewModel : BaseViewModel   
    {
        public long Id { get; set; }        
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }
        public string FilePath { get; set; }
      
        public long StringId { get; set; }
    }
}
