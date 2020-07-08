using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Teachers
{

    public class ClassTransferAttendence : BaseEntity, IHasMeta
    {
        [Attr("ClassTransferAttendenceID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ClassTransferAttendenceID")]
        public override long Id { get; set; }
       
        [Attr("AgencyID")]
        public long AgencyID { get; set; }
       
        [Attr("StudentID")]
        public long StudentID { get; set; }
       
        [Attr("FromClassID")]
        public long FromClassID { get; set; }
       
        [Attr("ToClassID")]
        public long ToClassID { get; set; }

        [Attr("TransferDate")]
        public DateTime TransferDate { get; set; }
               
        [Attr("TeacherID")]
        public long TeacherID { get; set; }

        [Attr("Status")]
        public bool Status { get; set; }

        public Dictionary<string, object> GetMeta(IJsonApiContext context)
        {
            try
            {
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
            catch (Exception)
            {
                context.PageManager.PageSize = 10;
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
        }
    }
}

