using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Teachers
{

    public class TeacherClassAttendence : BaseEntity, IHasMeta
    {
        [Attr("TeacherClassAttendenceID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TeacherClassAttendenceID")]
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
        [ForeignKey("TeacherDailyAttendence")]
        [Attr("TeacherDailyAttendenceID")]
        public long TeacherDailyAttendenceID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [Attr("CheckInTime")]
        public DateTime CheckInTime { get; set; }

        [Attr("CheckOutTime")]
        public DateTime CheckOutTime { get; set; }

        [Attr("CheckStatus")]
        public long CheckStatus { get; set; }

        [Required]
        [ForeignKey("ClassAssignmentLog")]
        [Attr("ClassAssignmentLogID")]
        public long ClassAssignmentLogID { get; set; }

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

