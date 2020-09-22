using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.PostActivity
{
    public class PostImageslikeDetails : BaseEntity, IHasMeta
    {
        [Attr("PostImageslikeDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PostImageslikeDetailsID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("PostActivities")]
        [Attr("PostActivitiesID")]
        public long PostActivitiesID { get; set; }


        [Required]
        [ForeignKey("PostActivityImages")]
        [Attr("PostActivityImagesID")]
        public long PostActivityImagesID { get; set; }
                          

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Attr("LikeCount")]
        public long LikeCount { get; set; }

        [StringLength(1000)]
        [Attr("Comment")]
        public string Comment { get; set; }

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
