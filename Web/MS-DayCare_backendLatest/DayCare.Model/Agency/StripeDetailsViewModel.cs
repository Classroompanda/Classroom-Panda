using DayCare.Entity.User;
using DayCare.Model.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StripeDetailsViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long? UserId { get; set; }


        public long StringId { get; set; }
        public string StripeUserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Scope { get; set; }
        public bool LiveMode { get; set; }
        public string StripePublishableKey { get; set; }
        public bool IsDefault { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public bool IsDeleteRequested { get; set; }

        public string Code { get; set; }

        public long AgencyID { get; set; }

        public long currentUserId { get; set; }

        public string APIKEY { get; set; }
    }
}
