using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Parent
{
    public class ParentLog : BaseEntity, IHasMeta
    {
        [Attr("ParentLogID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ParentLogID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long? ParentID { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("ColumnName")]
        public string ColumnName { get; set; }

        [StringLength(100)]
        [Attr("OldValue")]
        public string OldValue { get; set; }

        [StringLength(100)]
        [Attr("NewValue")]
        public string NewValue { get; set; }

        [Attr("ValueUpdateDate")]
        public DateTime ValueUpdateDate { get; set; }

        [StringLength(100)]
        [Attr("UpdatedFor")]
        public string UpdatedFor { get; set; }



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
