
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Student
{

    public class StudentMedication : BaseEntity, IHasMeta
    {
        [Attr("StudentMedicationID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StudentMedicationID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }
        
        [StringLength(500)]
        [Attr("StudentMedicationName")]
        public string MedicationName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }
        
        [Attr("MedicationUnits")]
        public long Units { get; set; }

        [StringLength(50)]
        [Attr("MedicationStrength")]
        public string strength { get; set; }


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

        [Attr("OtherMedication")]
        [StringLength(500)]
        public string OtherMedication { get; set; }

        [Attr("MedicationStartDate")]
        public DateTime StartDate { get; set; }

        [Attr("MedicationEndDate")]
        public DateTime EndDate { get; set; }

        [Attr("isTeacherAcknowledge")]
        public bool isTeacherAcknowledge { get; set; }

        [Attr("isParentAcknowledge")]
        public bool isParentAcknowledge { get; set; }
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

