using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Masters
{
  public class PerDayFeeCalculation: BaseEntity
    {

        [Attr("PerDayFeeCalculationID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("PerDayFeeCalculationID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

       
        public long StudentID { get; set; }

        public long ParentID { get; set; }

        public long ClassID { get; set; }

        public decimal OneDayFee { get; set; }

        public DateTime FeeDate { get; set; }

        public bool IsPaid { get; set; }

    }
}
