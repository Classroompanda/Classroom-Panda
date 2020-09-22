using DayCare.Entity.User;
using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DayCare.Entity.Agency
{
    public class StripeDetails : BaseEntity
    {
        //public StripeDetails()
        //{
        //    Owner = new Users();
        //}

        [Attr("StripeDetailsID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("StripeDetailsID")]
        public override long Id { get; set; }

        //public Users Owner { get; set; }

        [ForeignKey("Users")]
        [Attr("UserId")]
        public long? UserId { get; set; }

        [Attr("StripeUserId")]
        public string StripeUserId { get; set; }

        [Attr("AccessToken")]
        public string AccessToken { get; set; }

        [Attr("RefreshToken")]
        public string RefreshToken { get; set; }

        [Attr("Scope")]
        public string Scope { get; set; }
        [Attr("LiveMode")]
        public bool LiveMode { get; set; }

        [Attr("StripePublishableKey")]
        public string StripePublishableKey { get; set; }
        [Attr("IsDefault")]
        public bool IsDefault { get; set; }
        [Attr("FirstName")]
        public string FirstName { get; set; }

        [Attr("LastName")]
        public string LastName { get; set; }

        [Attr("Email")]
        public string Email { get; set; }

        [Attr("IsDeleteRequested")]
        public bool IsDeleteRequested { get; set; }

        [Required]
        [ForeignKey("Agency")]
        [Attr("AgencyID")]
        public long AgencyID { get; set; }

    }
}
