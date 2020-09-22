using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{

    public class StudentAgeCategories : BaseEntity, IHasMeta
    {
        [Attr("StudentAgeCategoriesID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentAgeCategoriesID")]
        public override long Id { get; set; }

        [Required]
        [Attr("FromAge")]

        public long FromAge { get; set; }
        [Required]
        [Attr("ToAge")]
        public long ToAge { get; set; }

        [Required]
        [Attr("IsAgeInMonths")]
        public bool AgeInMonths { get; set; }



        [Required]
        [StringLength(100)]
        [Attr("AgeNameForMonth")]
        public string AgeNameForMonth { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("AgeNameForYear")]
        public string AgeNameForYear { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }


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