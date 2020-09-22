using System;
using System.Collections.Generic;
using System.Text;
using JsonApiDotNetCore.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayCare.Entity.Agency
{
    public class NotificationSoundSetting : BaseEntity
    {
        [Attr("NotificationSoundSettingID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("NotificationSoundSettingID")]
        public override long Id { get; set; }

        [Attr("UserId")]
        [Required]
        public long UserId { get; set; }

        [Attr("OnOff")]
        [StringLength(50)]
        public string OnOff { get; set; }
    }
}
