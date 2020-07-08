using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Student
{

    public class Student : BaseEntity, IHasMeta
    {
        [Attr("StudentID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("StudentName")]
        public string StudentName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }

        [Required]
        [Attr("FirstName")]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Attr("LastName")]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [ForeignKey("Gender")]
        [Attr("GenderID")]
        public long GenderID { get; set; }

        [Attr("ImagePath")]
        [MaxLength]
        public string ImagePath { get; set; }

        [Attr("Address")]
        [StringLength(100)]
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

        [Attr("PostalCode")]
        [StringLength(100)]
        public string PostalCode { get; set; }

        [Attr("SchoolName")]
        [StringLength(100)]
        public string SchoolName { get; set; }

        [Attr("TransportationID")]
        public long TransportationID { get; set; }

        [Attr("DateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [ForeignKey("FeePaymentType")]
        [Attr("FeePaymentTypeID")]
        public long FeePaymentTypeID { get; set; }

        [Attr("InsuranceCarrier")]
        [StringLength(100)]
        public string InsuranceCarrier { get; set; }

        [Attr("InsurancePolicyNumber")]
        [StringLength(100)]
        public string InsurancePolicyNumber { get; set; }

        [Attr("RegisteredDate")]
        public DateTime RegisteredDate { get; set; }

        [Attr("ChildsAddress")]
        [StringLength(100)]
        public string ChildsAddress { get; set; }

        [Attr("PhysicianName")]
        [StringLength(100)]
        public string PhysicianName { get; set; }

        [Attr("PreferredHospital")]
        [StringLength(100)]
        public string PreferredHospital { get; set; }

        [Attr("ChildsContactNumber")]
        public long ChildsContactNumber { get; set; }

        [Attr("PhysicianContactNumber")]
        public long PhysicianContactNumber { get; set; }

        [Attr("ActivityTypeID")]
        public long ActivityTypeID { get; set; }

        [Attr("HrsInterval")]
        public long HrsInterval { get; set; }

        [Attr("MinInterval")]
        public long MinInterval { get; set; }

        [Attr("PhysicianAddress")]
        [StringLength(100)]
        public string PhysicianAddress { get; set; }

        [Attr("ChildNotes")]
        [StringLength(100)]
        public string ChildNotes { get; set; }

        [Attr("ChildStartDate")]
        public DateTime? ChildStartDate { get; set; }

        [Attr("DeletedReason")]
        [StringLength(200)]
        public string DeletedReason { get; set; }

        [Required]
        [ForeignKey("Bus")]
        [Attr("BusID")]
        public long BusID { get; set; }



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
