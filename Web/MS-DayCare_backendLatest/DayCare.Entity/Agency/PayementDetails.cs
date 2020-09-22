using DayCare.Entity.User;
using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Agency
{
    public class PayementDetails : BaseEntity
    {
        [Attr("PaymentDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PaymentDetailsID")]
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


        [Required]
        [ForeignKey("InvoiceDetails")]
        [Attr("InvoiceDetailsID")]
        public long InvoiceDetailsID { get; set; }
       

        [Column(TypeName = "decimal(6,2)")]
        [Attr("TotalAmount")]
        public decimal TotalAmount { get; set; }      
               
        [Required]
        [ForeignKey("StripeDetails")]
        [Attr("StripeDetailsID")]
        public long StripeDetailsID { get; set; }

        [Required]
        [Attr("PaymentFromDate")]
        public DateTime? PaymentFromDate { get; set; }

        [Required]
        [Attr("PaymentToDate")]
        public DateTime? PaymentToDate { get; set; }

        [Required]
        [Attr("PaymentDate")]
        public DateTime? PaymentDate { get; set; }

        [Required]
        [Attr("IsOffline")]
        public bool IsOffline { get; set; }

        [Attr("InvoiceNo")]
        public string InvoiceNo { get; set; }

        [Required]
        [Attr("PaymentType")]
        [StringLength(25)]
        public string PaymentType { get; set; }

        [Attr("ChequeNo")]
        public long ChequeNo { get; set; }

        [Attr("CardNo")]
        public long CardNo { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("AmoutPaid")]
        public decimal AmoutPaid { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("BalanceAmount")]
        public decimal BalanceAmount { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("DiscountAmount")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("SubsidyAmount")]
        public decimal SubsidyAmount { get; set; }

        [Attr("SubsidyDetailsID")]
        public long SubsidyDetailsID { get; set; }

        [Attr("IsPartialPayment")]
        public bool IsPartialPayment { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("AdvanceAmount")]
        public decimal AdvanceAmount { get; set; }

        [Attr("PaymentDescription")]
        public string PaymentDescription { get; set; }

        [Attr("PaymentComment")]
        public string PaymentComment { get; set; }


    }
}
