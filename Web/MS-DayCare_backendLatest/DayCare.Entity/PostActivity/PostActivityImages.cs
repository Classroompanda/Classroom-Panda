using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.PostActivity
{

    public class PostActivityImages : BaseEntity, IHasMeta
    {
        [Attr("PostActivityImagesID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PostActivityImagesID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("PostActivities")]
        [Attr("PostActivitiesID")]
        public long PostActivitiesID { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [MaxLength]
        [Attr("ImageServerPath")]
        public string ImageServerPath { get; set; }
        
        [Attr("LikeCount")]
        public long LikeCount { get; set; }

        [Attr("LoveCount")]
        public long LoveCount { get; set; }

        [Attr("ThumbsUpCount")]
        public long ThumbsUpCount { get; set; }

        [Attr("ThumbsDownCount")]
        public long ThumbsDownCount { get; set; }

        [Attr("Comment")]
        public string Comment { get; set; }

        [Attr("IsApprove")]
        public bool IsApprove { get; set; }

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
