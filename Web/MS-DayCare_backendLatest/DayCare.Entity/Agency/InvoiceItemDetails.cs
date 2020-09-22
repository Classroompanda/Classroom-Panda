using DayCare.Entity.User;
using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
namespace DayCare.Entity.Agency
{
    public class InvoiceItemDetails : BaseEntity
    {
        [Attr("InvoiceItemDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("InvoiceItemDetailsID")]
        public override long Id { get; set; }


        [Required]
        [ForeignKey("InvoiceDetails")]
        [Attr("InvoiceDetailsID")]
        public long InvoiceDetailsID { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }


        [Required]
        [ForeignKey("Parent")]
        [Attr("ParentID")]
        public long ParentID { get; set; }


        [Required]
        [ForeignKey("Student")]
        [Attr("StudentID")]
        public long StudentID { get; set; }

        [Required]
        [ForeignKey("Classes")]
        [Attr("ClassesID")]
        public long ClassesID { get; set; }

        [Attr("ClassFees")]
        public decimal ClassFees { get; set; }


    }
}
