using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Agency
{
    public class KioskeStudentSignInDetails : BaseEntity, IHasMeta
    {
        [Attr("SignInID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("SignInID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }


        [Attr("IsDropIn")]
        public bool IsDropIn { get; set; }

        [Attr("DropInDateTime")]
        public DateTime? DropInDateTime { get; set; }

        [Attr("IsDropOut")]
        public bool IsDropOut { get; set; }

        [Attr("DropOutDateTime")]
        public DateTime? DropOutDateTime { get; set; }


        [Attr("IsBreakIn")]
        public bool IsBreakIn { get; set; }

        [Attr("BreakInDateTime")]
        public DateTime? BreakInDateTime { get; set; }

        [Attr("IsBreakOut")]
        public bool IsBreakOut { get; set; }

        [Attr("BreakOutDateTime")]
        public DateTime? BreakOutDateTime { get; set; }

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
