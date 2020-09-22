using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class RecurringPayment : BaseEntity, IHasMeta
    {
        [Attr("RecurringPaymentID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("RecurringPaymentID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }

        [Attr("Amount")]
        public decimal Amount { get; set; }

        [Attr("PaymentFromDate")]
        public DateTime PaymentFromDate { get; set; }

        [Attr("PaymentToDate")]
        public DateTime PaymentToDate { get; set; }

        [Attr("PaymentDate")]
        public DateTime PaymentDate { get; set; }

        [Attr("FirstPaymentDate")]
        public DateTime? FirstPaymentDate { get; set; }

        [Attr("NextPaymentDate")]
        public DateTime? NextPaymentDate { get; set; }

        [Attr("PreviousPaymentDate")]
        public DateTime? PreviousPaymentDate { get; set; }

        [Attr("BillingCycle")]
        public int BillingCycle { get; set; }

        [Attr("CustomerID")]
        public string CustomerID { get; set; }

        [Attr("AgencyApiKey")]
        public string AgencyApiKey { get; set; }

        [Required]
        [Attr("AddedParentID")]
        public long AddedParentID { get; set; }



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


