using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Teachers
{

    public class TeacherAvailability : BaseEntity, IHasMeta
    {
        [Attr("TeacherAvailabilityID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TeacherAvailabilityID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("TeacherInfo")]
        [Attr("TeacherID")]
        public long TeacherID { get; set; }

        [Attr("StartDate")]
        public DateTime StartDate { get; set; }

        [Attr("EndDate")]
        public DateTime EndDate { get; set; }

        [Attr("OnLeave")]
        public bool OnLeave { get; set; }

        [StringLength(100)]
        [Attr("OnLeaveComment")]
        public string OnLeaveComment { get; set; }

        [StringLength(100)]
        [Attr("DisableOnLeave")]
        public string DisableOnLeave { get; set; }

        [Attr("ReasonId")]
        public long ReasonId { get; set; }

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


