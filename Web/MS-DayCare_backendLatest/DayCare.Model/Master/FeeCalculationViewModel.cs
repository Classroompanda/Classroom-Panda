using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class FeeCalculationViewModel : BaseViewModel
    {             
        public  long Id { get; set; }
        public long AgencyID { get; set; }                   
        public long StudentID { get; set; }
        public long ParentID { get; set; }
        public long [] ClassesID { get; set; }     
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }       
        public long Agency { get; set; }      
        public long CategoryID { get; set; }
        public string CategoryName { get; set; }
    }


    public class ClassIdCollection
    { 
       public List< FeeCalculationViewModel> BulkCalVM { get; set; }
    }

  }
