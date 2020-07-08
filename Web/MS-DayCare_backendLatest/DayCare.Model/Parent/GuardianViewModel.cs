

using System;

namespace DayCare.Model.Parent
{
    public class GuardianViewModel : BaseViewModel
    {

        public long GuardianId { get; set; }
        public string GuardianName { get; set; }     
        public long AgencyID { get; set; }
        public long UserID { get; set; }
        public long RelationTypeId { get; set; }
        public string RelationTypeName { get; set; }
        public long StudentID { get; set; }
        public string FirstName { get; set; }        
        public string LastName { get; set; }
        public string Address { get; set; }
        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public string PostalCode { get; set; }       
        public long PinNumber { get; set; }       
        public bool IsAuthorizedToPickup { get; set; }
        public string ReasonNotToAllow { get; set; }
        public string EmailId { get; set; }
        public string ImagePath { get; set; }        
        public long SecurityKey { get; set; }        
        public long Mobile { get; set; }       
        public long FailedLoginAttemptCount { get; set; }
        public long Id { get; set; }
        public long StringId { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public long GenderID { get; set; }
        public string Profession { get; set; }
    }
}
