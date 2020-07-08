using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Teachers
{

    public class TeacherBreakLog : BaseEntity, IHasMeta
    {
        [Attr("TeacherBreakLogID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TeacherBreakLogID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Attr("BreakIn")]
        public DateTime BreakIn { get; set; }

        [Attr("BreakOut")]
        public DateTime BreakOut { get; set; }

        [Attr("BreakStatusID")]
        public long BreakStatusID { get; set; }

        [Required]
        [ForeignKey("TeacherDailyAttendence")]
        [Attr("TeacherDailyAttendenceID")]
        public long TeacherDailyAttendenceID { get; set; }

        [Required]
        [ForeignKey("BreakTypes")]
        [Attr("BreakTypesID")]
        public long BreakTypesID { get; set; }

        [StringLength(1000)]
        [Attr("BreakReason")]
        public string BreakReason { get; set; }

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

