
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Student
{

    public class StudentAllergies : BaseEntity, IHasMeta
    {
        [Attr("StudentAllergiesID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentAllergiesID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; } 

        [Required]
        [ForeignKey("AllergyReactionType")]
        [Attr("AllergyReactionTypeID")]
        public long AllergyReactionTypeID { get; set; }

        [Required]
        [ForeignKey("AllergyName")]
        [Attr("AllergyNameID")]
        public long AllergyNameID { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [StringLength(500)]
        [Attr("AllergyComment")]
        public string AllergyComment { get; set; }

        [Attr("FirstAllergyObservation")]
        public DateTime? FirstAllergyObservation { get; set; }

        [Attr("LastAllergyObservation")]
        public DateTime? LastAllergyObservation { get; set; }

        [StringLength(1000)]
        [Attr("Treatment")]
        public string Treatment { get; set; }

        [Required]
        [ForeignKey("AllergyType")]
        [Attr("AllergyTypeID")]
        public long AllergyTypeID { get; set; }
        

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
