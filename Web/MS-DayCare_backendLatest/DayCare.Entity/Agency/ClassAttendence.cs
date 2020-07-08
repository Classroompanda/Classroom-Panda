using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{

    public class ClassAttendence : BaseEntity, IHasMeta
    {
        [Attr("ClassAttendenceID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ClassAttendenceID")]
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

        [Attr("Checkin")]
        public DateTime Checkin { get; set; }

        [Attr("Checkout")]
        public DateTime Checkout { get; set; }

        [Required]
        [ForeignKey("AttendenceStatus")]
        [Attr("AttendenceStatusID")]
        public long AttendenceStatusID { get; set; }   

        [Attr("AttendanceDate")]
        public DateTime AttendanceDate { get; set; }

        [Attr("DropedById")]
        public long DropedById { get; set; }

        [Attr("DropedByOtherId")]
        public long DropedByOtherId { get; set; }

        [Attr("PickupById")]
        public long PickupById { get; set; }

        [Attr("PickupByOtherId")]
        public long PickupByOtherId { get; set; }

        [Attr("ApprovedDropedById")]
        public long ApprovedDropedById { get; set; }

        [Attr("ApprovedPickupById")]
        public long ApprovedPickupById { get; set; }

        [StringLength(100)]
        [Attr("DropedByOtherName")]
        public string DropedByOtherNames { get; set; }

        [StringLength(100)]
        [Attr("PickupByOtherName")]
        public string PickupByOtherName { get; set; }

        [Attr("Checklongime")]
        public DateTime CheckInTime { get; set; }

        [Attr("CheckOutTime")]
        public DateTime CheckOutTime { get; set; }

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

        [Attr("Transfer")]
        public bool Transfer { get; set; }

        [Attr("DailySheetSend")]
        public bool DailySheetSend { get; set; }

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
