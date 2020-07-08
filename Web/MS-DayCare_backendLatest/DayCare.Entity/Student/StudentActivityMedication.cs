using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Student
{
    public class StudentActivityMedication : BaseEntity, IHasMeta
    {
        [Attr("StudentActivityMedicationID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentActivityMedicationID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }


        [Required]
        [ForeignKey("StudentActivities")]
        [Attr("StudentActivitiesID")]
        public long StudentActivitiesID { get; set; }

        [Required]
        [ForeignKey("DoseRepeat")]
        [Attr("DoseRepeatID")]
        public long DoseRepeatID { get; set; }

        [Required]
        [ForeignKey("DosageQuantity")]
        [Attr("DosageQuantityID")]
        public long DosageQuantityID { get; set; }

        [Attr("HowTaken")]
        [StringLength(500)]
        public string HowTaken { get; set; }

        [StringLength(1000)]
        [Attr("StudentHealthDescription")]
        public string StudentHealthDescription { get; set; }

        [Attr("RecordedTemparture")]
        public string RecordedTemparture { get; set; }

        [Required]
        [ForeignKey("StudentMedication")]
        [Attr("StudentMedicationID")]
        public long StudentMedicationID { get; set; }

        [Attr("isTeacherAcknowledge")]
        public bool isTeacherAcknowledge { get; set; }

        [Attr("isParentAcknowledge")]
        public bool isParentAcknowledge { get; set; }

        [Attr("AcknowledgeTeacherID")]
        public long AcknowledgeTeacherID { get; set; }

        [Attr("AcknowledgeParentID")]
        public long AcknowledgeParentID { get; set; }

        [Attr("IsMedicationDoneToday")]
        public bool IsMedicationDoneToday { get; set; }

        public DateTime MedicationDoneDate { get; set; }

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
