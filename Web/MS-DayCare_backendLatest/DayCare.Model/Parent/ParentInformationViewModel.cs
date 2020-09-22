using DayCare.Model.Agency;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Parent
{
    public class ParentInformationViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long Id { get; set; }
        public string ParentName { get; set; }
        public long AgencyID { get; set; }       
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
        public string ImagePath { get; set; }
        public long SecurityKey { get; set; }
        public long Mobile { get; set; }
        public long FailedLoginAttemptCount { get; set; }
        public long GenderID { get; set; }
        public string GenderName { get; set; }
        public long StringId { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Profession { get; set; }

        public string Apartment { get; set; }
        public bool IsParent { get; set; }

        public bool IsSecondaryParent { get; set; }

        public bool IsGaurdian { get; set; }

        public long AddedByID { get; set; }

        public bool IsAuthorizedToPickup { get; set; }

        public string ReasonNotToAllow { get; set; }

        public long EmployerNumber { get; set; }

        public string EmployerName { get; set; }
        public List<ParentStudentMappingViewModel> AssociatedChild { get; set; }

        public string msg { get; set; }
        public bool IsJoinClassroom { get; set; }

        // For Version 2.0
        public string EmployerAddress { get; set; }

    }
}
