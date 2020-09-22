using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.User
{

    public class Users : BaseEntity, IHasMeta
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("UserID")]
        [Attr("UserID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("FirstName")]
        public string FirstName { get; set; }

        [StringLength(100)]
        [Attr("LastName")]
        public string LastName { get; set; }

        [StringLength(100)]
        [Attr("Token")]
        public string Token { get; set; }

        [StringLength(100)]
        [Attr("UserName")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("Password")]
        public string Password { get; set; }

        [Attr("AccessFailedCount")]
        public long AccessFailedCount { get; set; }

        [Attr("IsBlock")]
        public bool IsBlock { get; set; }

        [Attr("BlockDate")]
        public DateTime? BlockDateTime { get; set; }

        [Required]
        [ForeignKey("UserRoles")]
        [Attr("RoleID")]
        public long RoleId { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("EmailAddress")]
        public string EmailAddress { get; set; }

        [Required]
        [Attr("PhoneNumber")]
        public long PhoneNumber { get; set; }

        [Attr("QuickPin")]
        public string QuickPin { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Attr("DeviceID")]
        public long DeviceID { get; set; }

        [Attr("PhoneTypeID")]
        public long PhoneTypeID { get; set; }

        [Attr("DeviceToken")]
        public string DeviceToken { get; set; }

        [Attr("Timezone")]
        public string Timezone { get; set; }

        [Attr("loggedInStatusID")]
        public long loggedInStatusID { get; set; }

        [Attr("IsLoggedIn")]
        public bool IsLoggedIn { get; set; }
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
