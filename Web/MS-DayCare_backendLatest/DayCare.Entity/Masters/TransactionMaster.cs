using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Masters
{
    public class TransactionMaster : BaseEntity, IHasMeta
    {
        [Attr("TransactionMasterID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TransactionMasterID")]
        public override long Id { get; set; }

        public long TransactionTypeID { get; set; }

        [ForeignKey("TransactionTypeID")]
        public TransactionType TransactionType { get; set; }


        public long AgencyID { get; set; }

        [ForeignKey("AgencyID")]
        public Agency Agency { get; set; }


        [Required]
        [StringLength(100)]
        [Attr("Description")]
        public string Description { get; set; }


        [Attr("AccountNumber")]
        public long  AccountNumber  { get; set; }


        [Attr("IFSC")]
        public string IFSC { get; set; }

        [Attr("AccountHolderName")]
        public string AccountHolderName { get; set; }

        [Attr("OpeningBalance")]
        public decimal OpeningBalance { get; set; }

        [Attr("IsDefaultAccount")]
        public bool IsDefaultAccount { get; set; }


        public Dictionary<string, object> GetMeta(IJsonApiContext context)
        {
            try
            {
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
            catch (Exception)
            {
                context.PageManager.PageSize = 10;
                return new Dictionary<string, object> {
                { "total-pages",  context.PageManager.TotalPages },
                { "page-size",  context.PageManager.PageSize },
                { "current-page",  context.PageManager.CurrentPage },
                { "default-page-size",  context.PageManager.DefaultPageSize },
            };
            }
        }
    }
}
