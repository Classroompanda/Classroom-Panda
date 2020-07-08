using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DayCare.Entity.Teachers
{
    public class TeacherInfo : BaseEntity, IHasMeta
    {
        [Attr("TeacherID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TeacherID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("TeacherName")]
        public string TeacherName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("User")]
        [Attr("UserID")]
        public long UserID { get; set; }

        [StringLength(100)]
        [Attr("FirstName")]
        public string FirstName { get; set; }

        [StringLength(100)]
        [Attr("LastName")]
        public string LastName { get; set; }

        [Required]
        [ForeignKey("Gender")]
        [Attr("GenderID")]
        public long GenderID { get; set; }

        [Required]
        [Attr("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [MaxLength]
        [Attr("ImagePath")]
        public string ImagePath { get; set; }

        [Required]
        [ForeignKey("PositionType")]
        [Attr("PositionTypeID")]
        public long PositionTypeID { get; set; }

        [Required]
        [ForeignKey("TeacherStatus")]
        [Attr("TeacherStatusID")]
        public long TeacherStatusID { get; set; }

        [Required]
        [Attr("DateHired")]
        public DateTime DateHired { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("Email")]
        public string Email { get; set; }

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
        [Attr("Certification")]
        public string Certification { get; set; }

        [StringLength(100)]
        [Attr("PostalCode")]
        public string PostalCode { get; set; }


        [Attr("PhoneNumber")]
        public long PhoneNumber { get; set; }


        [Attr("HomePhone")]
        public long HomePhone { get; set; }


        [Attr("GrossPayPerHour")]
        public decimal GrossPayPerHour { get; set; }


        [Attr("MPhoneNumber")]
        public string MPhoneNumber { get; set; }


        [Attr("MHomePhone")]
        public string MHomePhone { get; set; }




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
