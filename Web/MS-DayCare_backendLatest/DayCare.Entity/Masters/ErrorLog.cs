﻿using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class ErrorLog : BaseEntity, IHasMeta     
    {
        [Attr("ErrorLogID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ErrorLogID")]
        public override long Id { get; set; }        

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }
              
        [Attr("UserID")]
        public long UserID { get; set; }

        [Attr("Message")]
        public string Message { get; set; }

        [Attr("StackTrace")]
        public string StackTrace { get; set; }

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
