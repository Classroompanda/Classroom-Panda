using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class ClassAssignmentLog : BaseEntity, IHasMeta
    {
        [Attr("ClassAssignmentLogID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ClassAssignmentLogID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("TeacherInfo")]
        [Attr("TeacherID")]
        public long TeacherID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [Attr("ClassEnrollStartDate")]
        public DateTime ClassEnrollStartDate { get; set; }

        [Attr("ClassEnrollEndDate")]
        public DateTime ClassEnrollEndDate { get; set; }

        [Attr("ClassStartTime")]
        public DateTime ClassStartTime { get; set; }

        [Attr("ClassEndTime")]
        public DateTime ClassEndTime { get; set; }

        [Attr("IsSwapped")]
        public bool IsSwapped { get; set; }
        
        //[Attr("SwappedTeacherID")]
        //public long SwappedTeacherID { get; set; }



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
