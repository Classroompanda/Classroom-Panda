using DayCare.Entity.Agency;
using DayCare.Entity.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class ExtraFeeChargeDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }
        public DayCare.Entity.Masters.Agency Agency { get; set; }
        public long ExtraFeeChargeMasterID { get; set; }
        public ExtraFeeChargeMaster ExtraFeeChargeMaster { get; set; }
        public decimal Amount { get; set; }
        public string ExtraChargeName { get; set; }

        public long PaymentDetailsID { get; set; }
        public PayementDetails PayementDetails { get; set; }

        public decimal ChargeAmount { get; set; }

        public long CalculatedFeesID { get; set; }
        public decimal calculatedFees { get; set; }
        public long StringId { get; set; }

        public string DiscountDetails { get; set; }        
       

    }
}
