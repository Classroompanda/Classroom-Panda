using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Student
{

    public class StudentImmunization : BaseEntity, IHasMeta
    {
        [Attr("StudentImmunizationID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentImmunizationID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Required]
        [ForeignKey("Immunization")]
        [Attr("ImmunizationID")]
        public long ImmunizationID { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }
        
        [StringLength(500)]
        [Attr("OtherImmunization")]
        public string OtherImmunization { get; set; }

        [StringLength(500)]
        [Attr("Abbreviation")]
        public string Abbreviation { get; set; }

        [Attr("DateReceived")]
        public DateTime DateReceived { get; set; }

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
