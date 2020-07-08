using System;
using System.Collections.Generic;
using System.Text;
using JsonApiDotNetCore.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class SubscriptionDetails : BaseEntity
    {
        [Attr("SubscriptionDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("SubscriptionDetailsID")]
        public override long Id { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        [Required]
        [ForeignKey("PricingPlan")]
        [Attr("PlanID")]
        public long PlanID { get; set; }

        [Attr("ValidFromDate")]
        public DateTime ValidFromDate { get; set; }

        [Attr("ValidToDate")]
        public DateTime ValidToDate { get; set; }

        [Attr("IsOffline")]
        public bool IsOffline { get; set; }

        [Attr("CustomerId")]
        public string CustomerId { get; set; }

        [Attr("CustomerName")]
        public string CustomerName { get; set; }


        [Attr("ProductId")]
        public string ProductId { get; set; }

        [Attr("ProductName")]
        public string ProductName { get; set; }

        [Attr("StripePlanId")]
        public string StripePlanId { get; set; }

        [Attr("PlanName")]
        public string PlanName { get; set; }

        [Attr("StripeSubscriptionId")]
        public string StripeSubscriptionId { get; set; }

        [Attr("Interval")]
        public string Interval { get; set; }

        [Attr("Amount")]
        public decimal Amount { get; set; }

       





    }
}
