using DayCare.Model.Agency;
using DayCare.Model.Parent;
using System;
using System.Collections.Generic;

namespace DayCare.Model.Student
{
   public class StudentViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        
        public long ClassId { get; set; }
        public string ClassName { get; set; }
        public string ClassesId { get; set; }
        public long AgencyID { get; set; }
        public long ParentID { get; set; }
        public string ParentName { get; set; }
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }
        public string ParentEmailAddress { get; set; }
        public long ParentContactNumber { get; set; }
        public DateTime ParentDateOfBirth { get; set; }
        public long StudentContactNumber { get; set; }
        public string StudentEmailID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long GenderID { get; set; }
        public string GenderName { get; set; }
        public string ParentGenderName { get; set; }
        public string ImagePath { get; set; }
        public string Address { get; set; }
        public bool AddressAsParent { get; set; }
        public long CountryId { get; set; }
        public string CountryName { get; set; }
        public long StateId { get; set; }
        public string StateName { get; set; }
        public long CityId { get; set; }
        public string CityName { get; set; }
        public string PostalCode { get; set; }
        public string SchoolName { get; set; }
        public long TransportationID { get; set; }
        public string TransportationTypeName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public long FeePaymentTypeID { get; set; }
        public string FeePaymentTypeName { get; set; }
        public string InsuranceCarrier { get; set; }
        public string InsurancePolicyNumber { get; set; }
        public DateTime RegisteredDate { get; set; }       
        public string ChildsAddress { get; set; }
        public string PhysicianName { get; set; }
        public string PreferredHospital { get; set; }
        public long ChildsContactNumber { get; set; }
        public long PhysicianContactNumber { get; set; }
        public List<GuardianViewModel> Guardians { get; set; }
        public List<StudentImmunizationViewModel> StudentImmunizations { get; set; }
        public List<StudentAllergiesViewModel> StudentAllergies { get; set; }
        public List<StudentMedicationViewModel> StudentMedications { get; set; }
        public List<StudentDisabilitiesViewModel> StudentDisabilities { get; set; }
        public List<ClassEnrollmentViewModel> EnrolledClassesInformation { get; set; }

        public List <PaymentCalculationViewModel> PaymentCalculations { get; set; }

        public long Id { get; set; }
        public long StringId { get; set; }

        public long EnrolledStatus { get; set; }

        public bool CurrentCheckInStatus { get; set; }
        public bool CurrentCheckOutStatus { get; set; }
        public bool CurrentBreakInStatus { get; set; }
        public bool CurrentBreakOutStatus { get; set; }

        public long CurrentStatus { get; set; }

        public string msg { get; set; }

        public long classEnnrollmentID { get; set; }

        public long CategoryID { get; set; }

        public string CategoryName { get; set; }

        public bool isMarked { get; set; }

        public Decimal DiscountAmount { get; set; }
        public string SubsidyName { get; set; }
        public Decimal SubsidyAmount { get; set; }
        public long StudentSubsidyDetailsID { get; set; }

        public bool IsSubsidy { get; set; }

        public string AllergyName { get; set; }
        public bool AllergyStatus { get; set; }

        public string MedicationName { get; set; }
        public bool MedicationStatus { get; set; }
        public string Age { get; set; }

        public string AgencyName { get; set; }
        public string AgencyAddress { get; set; }
        public long AgencyMobile { get; set; }
        public string AgencyEmailID { get; set; }
        public string StudentAddress { get; set; }

        public string ParentEmail { get; set; }

        public long PhysicianNumber { get; set; }
        public bool isAuthorisedToPickup { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Physician { get; set; }

        public long PrimaryParentMobile { get; set; }
        public string ParentAddress { get; set; }

        public string ParentProfession { get; set; }

        public string EmployerName { get; set; }
        public long EmployerNumber { get; set; }
        public string RelationName { get; set; }
        public string QuickPin { get; set; }

        
        public long ActivityTypeID { get; set; }
      
        public long HrsInterval { get; set; }
      
        public long MinInterval { get; set; }

        // For version V 2.0
        public string PhysicianAddress { get; set; }
        public DateTime? ChildStartDate { get; set; }
        public string ChildNotes { get; set; }
        public string DeletedReason { get; set; }
        public long BusID { get; set; }
    }
}
