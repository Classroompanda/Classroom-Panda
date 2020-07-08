using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class Classes : BaseEntity, IHasMeta
    {
        [Attr("ClassesID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ClassesID")]
        public override long Id { get; set; }

        //[Required]
        //[StringLength(100)]
        //[Attr("ClassesName")]
        //public string ClassesName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [Attr("ClassName")]
        [StringLength(100)]
        public string ClassName { get; set; }

        [Attr("CategoryId")]
        public long CategoryId { get; set; }

        [Attr("ClassStatusId")]
        public long ClassStatusId { get; set; }

        [Attr("EnrollCapacity")]
        public long EnrollCapacity { get; set; }

        [Attr("MinAgeFrom")]
        public long MinAgeFrom { get; set; }

        [Attr("MinAgeTo")]
        public long MinAgeTo { get; set; }

        [Attr("MaxAgeFrom")]
        public long MaxAgeFrom { get; set; }

        [Attr("MaxAgeTo")]
        public long MaxAgeTo { get; set; }

        [Attr("AgeCutOffDate")]
        public DateTime AgeCutOffDate { get; set; }

        [Attr("RegistrationStartDate")]
        public DateTime RegistrationStartDate { get; set; }

        [Attr("ClassStartDate")]
        public DateTime ClassStartDate { get; set; }

        [Attr("ClassEndDate")]
        public DateTime ClassEndDate { get; set; }

        [Attr("StartTime")]
        public DateTime StartTime { get; set; }

        [Attr("EndTime")]
        public DateTime EndTime { get; set; }

        [StringLength(100)]
        [Attr("Description")]
        public string Description { get; set; }

        [Attr("Mon")]
        public bool Mon { get; set; }

        [Attr("Tue")]
        public bool Tue { get; set; }

        [Attr("Wed")]
        public bool Wed { get; set; }

        [Attr("Thu")]
        public bool Thu { get; set; }

        [Attr("Fri")]
        public bool Fri { get; set; }

        [Attr("Sat")]
        public bool Sat { get; set; }

        [Attr("Sun")]
        public bool Sun { get; set; }

        [Attr("OnGoing")]
        public bool OnGoing { get; set; }

        [Attr("Fees")]
        public long Fees { get; set; }

        [Attr("FeeTypeId")]
        public long FeeTypeId { get; set; }

        [Attr("LocationId")]
        public long LocationId { get; set; }

        [Attr("RoomId")]
        public long RoomId { get; set; }
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
