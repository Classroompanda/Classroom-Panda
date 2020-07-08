using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Teachers
{

    public class TeacherDailyAttendence : BaseEntity, IHasMeta
    {
        [Attr("TeacherDailyAttendenceID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TeacherDailyAttendenceID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("TeacherAttendenceStatusName")]
        public string TeacherAttendenceStatusName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("TeacherInfo")]
        [Attr("TeacherID")]
        public long TeacherID { get; set; }

        [Attr("ClockIn")]
        public DateTime ClockIn { get; set; }

        [Attr("ClockOut")]
        public DateTime ClockOut { get; set; }

        [Required]
        [ForeignKey("AttendenceStatus")]
        [Attr("AttendenceStatusID")]
        public long AttendenceStatusID { get; set; }

        [Attr("AttendanceDate")]
        public DateTime AttendanceDate { get; set; }

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

