using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Masters
{
    public class CalculatedFees: BaseEntity
    {
        [Attr("PerDayFeeCalculationID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PerDayFeeCalculationID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        public long ParentID { get; set; }

        public long ClassID { get; set; }

        public long StudentID { get; set; }

        public Decimal TotalPerDayFee { get; set; }

        public Decimal TotalCalculatedAmount { get; set; }

        public bool IsInvoiceGenrated { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public Decimal DiscountAmount { get; set; }

        public string DiscountDetails { get; set; }


    }
}
