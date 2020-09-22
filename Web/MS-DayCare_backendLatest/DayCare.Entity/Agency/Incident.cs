using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DayCare.Entity.Agency
{
    public class Incident : BaseEntity, IHasMeta
    {

        [Attr("IncidentID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IncidentID")]
        public override long Id { get; set; }

        [Attr("IncidentDate")]
        public DateTime IncidentDate { get; set; }

        [Attr("IncidentTime")]
        public DateTime IncidentTime { get; set; }

        [StringLength(1000)]
        [Attr("Description")]
        public string Description { get; set; }

        [StringLength(1000)]
        [Attr("ActionTaken")]
        public string ActionTaken { get; set; }

        [StringLength(1000)]
        [Attr("PlaceOfIncident")]
        public string PlaceOfIncident { get; set; }

        [Required]
        [ForeignKey("NatureOfInjury")]
        [Attr("NatureOfInjuryID")]
        public long NatureOfInjuryID { get; set; }

        [Attr("FirstAidAdministeredID")]
        public long FirstAidAdministeredID { get; set; }

        [Attr("IsDoctorRequired")]
        public bool IsDoctorRequired { get; set; }

        [Attr("WasParentInformed")]
        public bool WasParentInformed { get; set; }

        [StringLength(1000)]
        [Attr("ParentInformedBy")]
        public string ParentInformedBy { get; set; }

        [Attr("IsEmergency")]
        public bool IsEmergency { get; set; }

        [Attr("IsGeneric")]
        public bool IsGeneric { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }
        [Required]
        [ForeignKey("Teacher")]
        [Attr("TeacherID")]
        public long TeacherID { get; set; }
        [Required]
        [ForeignKey("IncidentPriortyType")]
        [Attr("IncidentPriortyTypeID")]
        public long IncidentPriortyTypeID { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [StringLength(1000)]
        [Attr("ParentComment")]
        public string ParentComment { get; set; }


        [Attr("IsAcknowledge")] 
        public bool IsAcknowledge { get; set; }

        [Attr("PartOfBody")]
        public string PartOfBody { get; set; }

        [Attr("ContextEnviroment")]
        public string ContextEnviroment { get; set; }

        [Attr("ContextChild")]
        public string ContextChild { get; set; }




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
