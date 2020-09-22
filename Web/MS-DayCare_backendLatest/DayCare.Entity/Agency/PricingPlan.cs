using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class PricingPlan : BaseEntity, IHasMeta
    {
        [Attr("PlanID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PlanID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("PlanName")]
        public string PlanName { get; set; }

        [Required]        
        [Attr("NumberofUsers")]
        public long NumberofUsers { get; set; }

        [Required]
        [Attr("PlanPrice")]
        public decimal PlanPrice { get; set; }

        [Required]
        [Attr("Frequency")]
        public string Frequency { get; set; }

        
        [StringLength(100)]
        [Attr("Remark")]
        public string Remark { get; set; }

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
