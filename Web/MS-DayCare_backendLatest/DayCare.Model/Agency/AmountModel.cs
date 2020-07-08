using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class AmountModel
    {
        public long Parent_ID { get; set; }
        public decimal Invoice_Amount { get; set; }
        public string ParentName { get; set; }
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }


    }
}
