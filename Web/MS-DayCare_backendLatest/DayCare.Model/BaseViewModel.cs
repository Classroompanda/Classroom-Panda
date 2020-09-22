using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model
{
   public class BaseViewModel
    {
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public long? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public string DeletedFromIP { get; set; }
        public string CreatedFromIP { get; set; }
        public string UpdatedFromIP { get; set; }
        
    }
}
