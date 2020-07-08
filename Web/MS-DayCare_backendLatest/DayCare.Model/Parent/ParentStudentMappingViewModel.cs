using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
    public class ParentStudentMappingViewModel : BaseViewModel
    {
        public  long Id { get; set; }
       
        public long AgencyID { get; set; }
        
        public long ParentID { get; set; }

        public string ParentName { get; set; }
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }

        public string StudentNames { get; set; }


        public long StudentID { get; set; }

        
        public bool IsParent { get; set; }

        public bool IsGaurdian { get; set; }
        public bool IsSecondaryParent { get; set; }


        public long StringId { get; set; }

        public string StudentName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
