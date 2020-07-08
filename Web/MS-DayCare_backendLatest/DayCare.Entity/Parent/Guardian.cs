using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Parent
{

    public class Guardian : BaseEntity, IHasMeta
    {
        [Attr("GuardianID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("GuardianID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("GuardianName")]
        public string GuardianName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("RelationType")]
        [Attr("RelationTypeId")]
        public long RelationTypeId { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("FirstName")]
        public string FirstName { get; set; }

        [StringLength(100)]
        [Attr("LastName")]
        public string LastName { get; set; }

        [StringLength(100)]
        [Attr("Address")]
        public string Address { get; set; }

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

        [Attr("PinNumber")]
        public long PinNumber { get; set; }

        [Attr("IsAuthorizedToPickup")]
        public bool IsAuthorizedToPickup { get; set; }

        [StringLength(100)]
        [Attr("ReasonNotToAllow")]
        public string ReasonNotToAllow { get; set; }

        [StringLength(100)]
        [Attr("EmailId")]
        public string EmailId { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }

        [Attr("Mobile")]
        public long Mobile { get; set; }

        [Attr("FailedLoginAttemptCount")]
        public long FailedLoginAttemptCount { get; set; }

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
