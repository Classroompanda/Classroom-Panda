using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class TransactionDetails : BaseEntity
    {
        [Attr("TransactionDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TransactionDetailsID")]
        public override long Id { get; set; }


        public long TransactionTypeID { get; set; }

        [ForeignKey("TransactionTypeID")]
        public TransactionType TransactionType { get; set; }


        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }
        
        

        [Required]
        [StringLength(100)]
        [Attr("Description")]
        public string Description { get; set; }


        [Attr("Amount")]
        public decimal Amount { get; set; }


        [Attr("InvoiceFromDate")]
        public DateTime? InvoiceFromDate { get; set; }

        [Attr("InvoiceToDate")]
        public DateTime? InvoiceToDate { get; set; }

        [Attr("InvoiceNo")]
        public string InvoiceNo { get; set; }


    }
}
