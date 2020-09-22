using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class Coupon : BaseEntity, IHasMeta
    {
        [Attr("CouponID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("CouponID")]
        public override long Id { get; set; }

        [Required]
        [Attr("CouponName")]
        public string CouponName { get; set; }

        [Required]
        [Attr("Discount")]
        public int Discount { get; set; }

        [Required]
        [Attr("Limit")]
        public int Limit { get; set; }

        [Required]
        [Attr("Used")]
        public int UsedBy { get; set; }

        [Attr("EndDate")]
        public DateTime? EndDate { get; set; }


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
