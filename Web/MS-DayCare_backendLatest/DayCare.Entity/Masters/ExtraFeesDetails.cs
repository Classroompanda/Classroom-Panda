using DayCare.Entity.Agency;
using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Masters
{
  public class ExtraFeesDetails: BaseEntity
    {
        [Attr("ExtraFeesDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ExtraFeesDetailsID")]
        public override long Id { get; set; }


        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }


        public long PaymentDetailsID { get; set; }
        public long ExtraFeeChargeMasterID { get; set; }

        [ForeignKey("ExtraFeeChargeMasterID")]
        public ExtraFeeChargeMaster ExtraFeeChargeMaster { get; set; }

        public decimal ChargeAmount { get; set; }
        
        public long CalculatedFeesID { get; set; }

        [ForeignKey("CalculatedFeesID")]
        public CalculatedFees calculatedFees { get; set; }

        public string DiscountDetails { get; set; }

    }
}
