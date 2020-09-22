using DayCare.Entity.PostActivity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.PostActivity
{
    public class PostImageslikeDetailsViewModel 
    {      
        public  long Id { get; set; }
       
        public long PostActivitiesID { get; set; }
        
        public long PostActivityImagesID { get; set; }

        
        public long AgencyID { get; set; }
       
        public long StudentID { get; set; }
       
        public long LikeCount { get; set; }
        
        public string Comment { get; set; }
       
        public bool IsActive { get; set; }
               
        public bool IsDeleted { get; set; }

        
        public long? DeletedBy { get; set; }

        public DateTime? DeletedDate { get; set; }

        public string DeletedFromIP { get; set; }
       
        public long? CreatedBy { get; set; }
       
        public DateTime? CreatedDate { get; set; }
        public string CreatedFromIP { get; set; }

        public DateTime? UpdatedDate { get; set; }
        public string UpdatedFromIP { get; set; }
               
        public long? UpdatedBy { get; set; }

        public long? stringId { get; set; }


    }
}
