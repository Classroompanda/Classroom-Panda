using DayCare.Model.Common;
using System.ComponentModel.DataAnnotations;

namespace DayCare.Model.User
{
    public class UserModel : BaseModel
    {
        //private const string PASSWORD_PATTERN = "(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$)";

        [Required]
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public long Id { get; set; }

        public string Token { get; set; }

        public string Password { get; set; }

        public long PhoneTypeID { get; set; }

        public string DeviceToken { get; set; }



        public System.Guid UserId { get; set; }
    }
}
