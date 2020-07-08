using System;

namespace DayCare.Model.Student
{
   public class StudentAllergiesViewModel : BaseViewModel
    {
        public int UpdatedFlag { get; set; }
        public long StudentAllergiesID { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public long AllergyReactionTypeID { get; set; }
        public string AllergyReactionTypeName { get; set; }
        public long AllergyNameID { get; set; }
        public string AllergyName { get; set; }
        public long AgencyID { get; set; }
        public string AllergyComment { get; set; }
        public DateTime? FirstAllergyObservation { get; set; }
        public DateTime? LastAllergyObservation { get; set; }
        public long AllergyTypeID { get; set; }
        public string AllergyTypeName { get; set; }
        public string Treatment { get; set; }
        public long Id { get; set; }
        public long StringId { get; set; }
    }
}
