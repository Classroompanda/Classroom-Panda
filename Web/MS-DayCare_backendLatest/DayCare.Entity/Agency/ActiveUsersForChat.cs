using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Agency
{
    public class ActiveUsersForChat :BaseEntity
    {

        [Attr("ActiveUsersForChatID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ChatPrivateMessageDetailsID")]
        public override long Id { get; set; }

        [Attr("userID")]
        public long userID { get; set; }

        [Attr("connectionID")]        
        public string connectionID { get; set; }
    }
}
