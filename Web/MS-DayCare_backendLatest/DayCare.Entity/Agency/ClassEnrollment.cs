using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class ClassEnrollment : BaseEntity, IHasMeta
    {
        [Attr("ClassEnrollmentID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ClassEnrollmentID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Attr("ClassStartDate")]
        public DateTime ClassEnrollStartDate { get; set; }

        [Attr("ClassEndDate")]
        public DateTime? ClassEnrollEndDate { get; set; }

        [Required]
        [Attr("EnrollmentStatus")]
        public long EnrollmentStatus { get; set; }


        [Attr("Fees")]
        public long Fees { get; set; }

        [Attr("FeeTypeId")]
        public long FeeTypeId { get; set; }


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
