using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class CouponViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public string CouponName { get; set; }
        public int Discount { get; set; }
        public int Limit { get; set; }
        public int UsedBy { get; set; }
        public DateTime? EndDate { get; set; }
        public long StringId { get; set; }
        public int Amount { get; set; }
        
    }
}
