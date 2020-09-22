using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{

    public class Agency : BaseEntity, IHasMeta
    {
        [Attr("AgencyID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("AgencyID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("AgencyName")]
        public string AgencyName { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("OwnerFirstName")]
        public string OwnerFirstName { get; set; }

        [StringLength(100)]
        [Attr("OwnerLastName")]
        public string OwnerLastName { get; set; }

        [StringLength(100)]
        [Attr("ContactPersonFirstName")]
        public string ContactPersonFirstName { get; set; }

        [StringLength(100)]
        [Attr("ContactPersonLastName")]
        public string ContactPersonLastName { get; set; }

        [Attr("IsExistingAccount")]
        public bool IsExistingAccount { get; set; }

        [Attr("IsLoggedFirstTime")]
        public bool IsLoggedFirstTime { get; set; }

        [Attr("PayPalUserId")]
        public long PayPalUserId { get; set; }

        [Attr("PayPalSubscriptionId")]
        public long PayPalSubscriptionId { get; set; }

        [Attr("IsTrial")]
        public bool IsTrial { get; set; }

        [Attr("TrialStart")]
        public DateTime TrialStart { get; set; }

        [Attr("TrialEnd")]
        public DateTime TrialEnd { get; set; }

        [Attr("IsTrialMailSent")]
        public bool IsTrialMailSent { get; set; }

        [Attr("CurrentSubscriptionPlanId")]
        public long CurrentSubscriptionPlanId { get; set; }
      
        [Attr("SubscriptionValidUpto")]
        public DateTime SubscriptionValidUpto { get; set; }

        [StringLength(100)]
        [Attr("TimeZoneSpecification")]
        public string TimeZoneSpecification { get; set; }

        [Attr("UserID")]
        public long UserID { get; set; }

        [Attr("EmailId")]
        public string EmailId { get; set; }

        [Attr("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [ForeignKey("Gender")]
        [Attr("GenderID")]
        public long GenderID { get; set; }

        [Attr("Mobile")]
        public long Mobile { get; set; }

        [Attr("Profession")]
        public string Profession { get; set; }


        [Required]
        [ForeignKey("Country")]
        [Attr("CountryId")]
        public long CountryId { get; set; }

        [Required]
        [ForeignKey("State")]
        [Attr("StateId")]
        public long StateId { get; set; }

        [Required]
        [ForeignKey("City")]
        [Attr("CityId")]
        public long CityId { get; set; }

        [StringLength(100)]
        [Attr("PostalCode")]
        public string PostalCode { get; set; }

        [StringLength(100)]
        [Attr("Address")]
        public string Address { get; set; }

        [Attr("Status")]
        public long Status { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }


        [Attr("LoginStatus")]
        public bool LoginStatus { get; set; }

        [Attr("LastLogin")]
        public DateTime? LastLogin { get; set; }

        [Attr("QuickPin")]
        public string QuickPin { get; set; }

        [Attr("MessageCount")]
        public int MessageCount { get; set; }

        [Attr("MessageCountStartDate")]
        public DateTime MessageCountStartDate { get; set; }

        [Attr("IsPolicyEULAAccept")]
        public bool IsPolicyEULAAccept { get; set; }

        [Attr("PolicyEULAAcceptDate")]
        public DateTime PolicyEULAAcceptDate { get; set; }

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
