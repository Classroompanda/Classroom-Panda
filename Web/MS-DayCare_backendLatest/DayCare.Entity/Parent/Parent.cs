using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Parent
{

    public class Parent : BaseEntity, IHasMeta
    {
        [Attr("ParentID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ParentID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("ParentName")]
        public string ParentName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Attr("UserID")]
        public long UserID { get; set; }

        [Required]
        [ForeignKey("RelationType")]
        [Attr("RelationTypeId")]
        public long RelationTypeId { get; set; }

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

        [Attr("SecurityQuestionId")]
        public long SecurityQuestionId { get; set; }

        [StringLength(100)]
        [Attr("SecurityQuestionAnswer")]
        public string SecurityQuestionAnswer { get; set; }

        [StringLength(100)]
        [Attr("EmailId")]
        public string EmailId { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }

        [Attr("SecurityKey")]
        public long SecurityKey { get; set; }

        [Attr("Mobile")]
        public long Mobile { get; set; }

        [Attr("FailedLoginAttemptCount")]
        public long FailedLoginAttemptCount { get; set; }

        [Required]
        [ForeignKey("Gender")]
        [Attr("GenderID")]
        public long GenderID { get; set; }

        [Attr("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }


        [StringLength(100)]
        [Attr("Profession")]
        public string Profession { get; set; }

        [StringLength(100)]
        [Attr("Apartment")]
        public string Apartment { get; set; }

        
        [Attr("IsParent")]
        public bool IsParent { get; set; }


        [Attr("IsSecondaryParent")]
        public bool IsSecondaryParent { get; set; }

        [Attr("IsGaurdian")]
        public bool IsGaurdian { get; set; }


        [Attr("AddedByID")]
        public long AddedByID { get; set; }

        [Attr("IsAuthorizedToPickup")]
        public bool IsAuthorizedToPickup { get; set; }

        [StringLength(100)]
        [Attr("ReasonNotToAllow")]
        public string ReasonNotToAllow { get; set; }


        [Attr("EmployerNumber")]
        public long EmployerNumber { get; set; }

        [Attr("EmployerName")]
        public string EmployerName { get; set; }

        [Attr("EmployerAddress")]
        public string EmployerAddress { get; set; }

        [Attr("IsJoinClassroom")]
        public bool IsJoinClassroom { get; set; }

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
