using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Masters
{
    public class CalculatedFeeDetails : BaseEntity
    {
        [Attr("CalculatedFeeDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("CalculatedFeeDetailsID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        public long PerDayFeeCalculationID { get; set; }

        [ForeignKey("PerDayFeeCalculationID")]
        public CalculatedFees CalculatedFees { get; set; }

        public long StudentID { get; set; }     

        public string CalculatedFeeDate { get; set; }

        public decimal Amount { get; set; }
    }
}
