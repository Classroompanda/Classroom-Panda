using System;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{

    public class EventPlanner : BaseEntity, IHasMeta
    {
        [Attr("EventPlannerID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("EventPlannerID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("PlannerRepeatType")]
        [Attr("PlannerRepeatTypeID")]
        public long PlannerRepeatTypeID { get; set; }

        [StringLength(100)]
        [Attr("Title")]
        public string Title { get; set; }

        [Attr("StartDate")]
        public DateTime StartDate { get; set; }

        [Attr("EndDate")]
        public DateTime EndDate { get; set; }

        [Attr("StartTime")]
        public DateTime StartTime { get; set; }

        [Attr("EndTime")]
        public DateTime EndTime { get; set; }

        [Attr("EndsOn")]
        public DateTime? EndsOn { get; set; }

        [StringLength(100)]
        [Attr("Description")]
        public string Description { get; set; }

        [Attr("Mon")]
        public bool Mon { get; set; }

        [Attr("Tue")]
        public bool Tue { get; set; }

        [Attr("Wed")]
        public bool Wed { get; set; }

        [Attr("Thu")]
        public bool Thu { get; set; }

        [Attr("Fri")]
        public bool Fri { get; set; }

        [Attr("Sat")]
        public bool Sat { get; set; }

        [Attr("Sun")]
        public bool Sun { get; set; }

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
