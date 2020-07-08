using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Student
{
    public class StudentOtherActivity : BaseEntity, IHasMeta
    {
        [Attr("StudentOtherActivityID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentOtherActivityID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("StudentActivities")]
        [Attr("StudentActivitiesID")]
        public long StudentActivitiesID { get; set; }

        [Required]
        [ForeignKey("SubActivityType")]
        [Attr("SubActivityTypeID")]
        public long SubActivityTypeID { get; set; }

        [Attr("StartTime")]
        public DateTime StartTime { get; set; }

        [Attr("EndTime")]
        public DateTime EndTime { get; set; }

        [StringLength(1000)]
        [Attr("OtherActivityNote")]
        public string OtherActivityNote { get; set; }

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
