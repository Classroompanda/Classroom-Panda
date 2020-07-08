using System;
using System.Collections.Generic;
using System.Text;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Masters
{
    public class RecurringBilling : BaseEntity, IHasMeta
    {
        [Attr("RecurringBillingID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("RecurringBillingID")]
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

        [Attr("Amount")]
        public decimal Amount { get; set; }

        [Attr("BillingFromDate")]
        public DateTime BillingFromDate { get; set; }

        [Attr("BillingToDate")]
        public DateTime BillingToDate { get; set; }

        [Attr("BillingDate")]
        public DateTime BillingDate { get; set; }

        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long? ClassesID { get; set; }

        [Attr("InvoiceGenerateDate")]
        public DateTime? InvoiceGenerateDate { get; set; }

        [Attr("BillingCycle")]
        public int BillingCycle { get; set; }

        [Attr("BillingDescription")]
        public string BillingDescription { get; set; }

        [Attr("TransactionType")]
        public int TransactionType { get; set; }




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

