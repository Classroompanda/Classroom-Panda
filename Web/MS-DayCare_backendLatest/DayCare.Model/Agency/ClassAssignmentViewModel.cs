using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class ClassAssignmentViewModel : BaseViewModel
    {
       
        public  long Id { get; set; }
       
        public long AgencyID { get; set; }
        
        public long TeacherID { get; set; }
        
        public long ClassesID { get; set; }
      
        public DateTime ClassEnrollStartDate { get; set; }
        
        public DateTime ClassEnrollEndDate { get; set; }
       
        public DateTime ClassStartTime { get; set; }
       
        public DateTime ClassEndTime { get; set; }

        public DateTime ClassStartDate { get; set; }

        public DateTime ClassEndDate { get; set; }

        public bool IsSwapped { get; set; }

        public long StringId { get; set; }

        public string ClassName { get; set; }

        public string TeacherName { get; set; }
        public string Email { get; set; }
        public string message { get; set; }

        

    }
}
