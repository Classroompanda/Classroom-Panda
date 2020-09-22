using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Student
{
    public class StudentActivities : BaseEntity, IHasMeta
    {
        [Attr("StudentActivitiesID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentActivitiesID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [Required]
        [ForeignKey("ActivityType")]
        [Attr("ActivityTypeID")]
        public long ActivityTypeID { get; set; }

        [Attr("ActivityRegisterDate")]
        public DateTime ActivityRegisterDate { get; set; }

        [Attr("MealServeTimeDetailsID")]
        public long MealServeTimeDetailsID { get; set; }

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
