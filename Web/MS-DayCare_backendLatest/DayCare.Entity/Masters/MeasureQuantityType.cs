﻿using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{

    public class MeasureQuantityType : BaseEntity, IHasMeta
    {
        [Attr("MeasureQuantityTypeID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("MeasureQuantityTypeID")]
        public override long Id { get; set; }

        [Required]
        [StringLength(100)]
        [Attr("MeasureQuantityTypeName")]
        public string MeasureQuantityTypeName { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

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

