using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class AuthorizedPerson : BaseEntity
    {
        [Attr("AuthorizedPersonID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("AuthorizedPersonID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }

        public long StudentID { get; set; }

        public string AuthorizedPersonName { get; set; }

        [Attr("Mobile")]
        public long Mobile { get; set; }

        [StringLength(100)]
        [Attr("EmailId")]
        public string EmailId { get; set; }

        public bool IsAuthorizedPickUp { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }

        [Attr("IsEmergencyContact")]
        public bool IsEmergencyContact { get; set; }

        [Attr("QuickPin")]
        public string QuickPin { get; set; }

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
