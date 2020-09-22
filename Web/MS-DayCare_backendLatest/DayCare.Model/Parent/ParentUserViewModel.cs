using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
    public class ParentUserViewModel 
    {
        public long Id { get; set; }
        public string ParentName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string LinkedChild { get; set; }
        public long AgencyId { get; set; }

        public string ImagePath { get; set; }

        public bool IsDelete { get; set; }

        public bool IsGuardian { get; set; }
        public bool IsSecondParent { get; set; }
        public bool IsParent { get; set; }
        public long ParentLogID { get; set; }
        public bool IsAuthorizedToPickup { get; set; }
        public bool IsJoinClassroom { get; set; }


        //Added new parameters for mobile

        public long UserID { get; set; }

        public long RelationTypeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public string PostalCode { get; set; }
        public long PinNumber { get; set; }
        public long SecurityQuestionId { get; set; }
        public string SecurityQuestionAnswer { get; set; }
        public string EmailId { get; set; }
        public long SecurityKey { get; set; }
        public long Mobile { get; set; }
        public long FailedLoginAttemptCount { get; set; }
        public long GenderID { get; set; }
        public string GenderName { get; set; }
        public long StringId { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Profession { get; set; }

        public string Apartment { get; set; }

        public List<ParentStudentMappingViewModel> AssociatedChild { get; set; }

        //below properties are for mobile only
        public bool isSecondaryParent { get; set; }

        public bool isGaurdian { get; set; }

        public decimal AdvancePaymentBalanceAmount { get; set; }
        
        public long EmployerNumber { get; set; }

        public string EmployerName { get; set; }

    }
}
