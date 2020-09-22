using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class ACHInformationViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long ParentID { get; set; }


        public string CustomerID { get; set; }


        public string CustomerToken { get; set; }


        public string BankAccountID { get; set; }

        public string AgencyApiKey { get; set; }

        public DateTime? AddDate { get; set; }

        public int Status { get; set; }

        public long StringId { get; set; }

        public string ParentName { get; set; }
        public long AddedParentID { get; set; }


    }
}


