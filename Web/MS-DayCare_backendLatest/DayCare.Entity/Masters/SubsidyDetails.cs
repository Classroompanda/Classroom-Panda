using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Masters
{
    public class SubsidyDetails : BaseEntity
    {
        [Attr("SubsidyDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("SubsidyDetailsID")]
        public override long Id { get; set; }

        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }

        public string SubsidyTitle { get; set; }

        public string SubsidyName { get; set; }
        public string SubsidyDescription { get; set; }
        public decimal SubsidyAmount { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}
