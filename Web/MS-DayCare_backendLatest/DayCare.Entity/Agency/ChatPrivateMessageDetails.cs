using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DayCare.Entity.Agency
{
    public class ChatPrivateMessageDetails : BaseEntity
    {
        [Attr("ChatPrivateMessageDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ChatPrivateMessageDetailsID")]
        public override long Id { get; set; }

        [Attr("FromUserId")]
        [Required]
        public long FromUserId { get; set; }

        [Attr("ToUserId")]
        public long ToUserId { get; set; }

        [Attr("Message")]
        [StringLength(5000)]
        public string Message { get; set; }

        [Attr("IsTrial")]
        public bool IsRead { get; set; }


        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

        
        [Attr("Token")]        
        public string Token { get; set; }
    }
}
