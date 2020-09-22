using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{

    public class City : BaseEntity, IHasMeta
    {
        [Attr("CityID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("CityID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("CityName")]
        public string CityName { get; set; }

        [StringLength(100)]
        [Attr("CityCode")]
        public string CityCode { get; set; }

        [Required]
        [ForeignKey("State")]
        [Attr("StateID")]
        public long StateID { get; set; }

        [StringLength(100)]
        [Attr("NumCode")]
        public string NumCode { get; set; }

        [StringLength(100)]
        [Attr("PhoneCode")]
        public string PhoneCode { get; set; }

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
