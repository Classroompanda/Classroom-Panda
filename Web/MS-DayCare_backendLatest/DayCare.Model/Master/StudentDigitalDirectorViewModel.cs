using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class StudentDigitalDirectorViewModel : BaseViewModel    
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long StudentID { get; set; }
        public long ActivityTypeID { get; set; }
        public long HrsInterval { get; set; }
        public long MinInterval { get; set; }
        public long Agency { get; set; }
        public long StringId { get; set; }        

    }
}
