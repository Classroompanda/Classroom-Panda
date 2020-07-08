using System;
using System.Collections.Generic;
using System.Text;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class RestrictedPerson : BaseEntity
    {
        [Attr("RestrictedPersonID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("RestrictedPersonID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }

        public long StudentID { get; set; }

        public string RestrictedPersonName { get; set; }

        [Attr("Mobile")]
        public long Mobile { get; set; }

        [StringLength(100)]
        [Attr("EmailId")]
        public string EmailId { get; set; }

        [Attr("IsRestricted")]
        public bool IsRestricted { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }

        [Attr("Description")]
        public string Description { get; set; }

        [Attr("CommonID")]
        public string CommonID { get; set; }

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
