using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using DayCare.Entity.User;

namespace DayCare.Entity
{
    public class BaseEntity : Identifiable<long>
    {

        [Attr("IsActive")]
        public bool IsActive { get; set; }

        [Attr("IsDeleted")]
        public bool IsDeleted { get; set; }

        [Attr("DeletedBy")]
        [ForeignKey("Users2")]
        public long? DeletedBy { get; set; }

        public DateTime? DeletedDate { get; set; }

        public string DeletedFromIP { get; set; }

        [Attr("CreatedBy")]
        [ForeignKey("Users")]
        public long? CreatedBy { get; set; }

        [Attr("CreatedDate")]
        public DateTime? CreatedDate { get; set; }
        public string CreatedFromIP { get; set; }

        public DateTime? UpdatedDate { get; set; }
        public string UpdatedFromIP { get; set; }

        [ForeignKey("Users1")]
        public long? UpdatedBy { get; set; }
        
    }
}
