using DayCare.Entity.User;
using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Agency
{
    public class InvoiceDetails : BaseEntity
    {
        [Attr("InvoiceDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("InvoiceDetailsID")]
        public override long Id { get; set; }

        [Attr("InvoiceNo")]
        public string InvoiceNo { get; set; }

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
        [Attr("InvoiceDate")]
        public DateTime? InvoiceDate { get; set; }

        [Required]
        [Attr("InvoiceFromDate")]
        public DateTime? InvoiceFromDate { get; set; }

        [Required]
        [Attr("InvoiceToDate")]
        public DateTime? InvoiceToDate { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("InvoiceAmount")]
        public decimal InvoiceAmount { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("DiscountAmount")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("TotalAmount")]
        public decimal TotalAmount { get; set; }

        [Attr("IsInvoicePaid")]
        public bool IsInvoicePaid { get; set; }

        [Column(TypeName = "decimal(6,2)")]
        [Attr("DueAmount")]
        public decimal DueAmount { get; set; }

        [Attr("IsPartialPayment")]
        public bool IsPartialPayment { get; set; }

        [Required]
        [ForeignKey("CalculatedFees")]
        [Attr("PerDayFeeCalculationID")]
        public long PerDayFeeCalculationID { get; set; }

        [Attr("InvoiceDescription")]
        public string InvoiceDescription { get; set; }

        [Attr("InvoiceComment")]
        public string InvoiceComment { get; set; }

        [Required]
        [ForeignKey("ClassAttendence")]
        [Attr("ClassAttendenceID")]
        public long ClassAttendenceID { get; set; }

        public decimal? sum(object invoiceAmount)
        {
            throw new NotImplementedException();
        }
    }
}
