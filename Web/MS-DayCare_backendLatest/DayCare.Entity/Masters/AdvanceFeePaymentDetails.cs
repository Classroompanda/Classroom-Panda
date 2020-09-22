using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class AdvanceFeePaymentDetails : BaseEntity
    {
        [Attr("PaymentDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PaymentDetailsID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        public long ParentID { get; set; }     

        public long StudentID { get; set; }

        public long InvoiceDetailsID { get; set; }
               
        public bool IsAdvanceCreditAmount { get; set; }

        [Attr("CreditAdvanceAmount")]
        public decimal CreditAdvanceAmount { get; set; }

        public bool IsAdvanceDebitAmount { get; set; }

        [Attr("DebitAdvanceAmount")]
        public decimal DebitAdvanceAmount { get; set; }

        [Attr("BalanceAmount")]
        public decimal BalanceAmount { get; set; }

        [Attr("IsOffline")]
        public bool IsOffline { get; set; }     
   
        
    }
}
