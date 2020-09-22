using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class AddAllergyViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long StringId { get; set; }
        public long AgencyID { get; set; }
        public string AllergyTypeName { get; set; }
        public long AllergyTypeID { get; set; }
        public string AllergyReactionTypeName { get; set; }
        public string NameOfAllergy { get; set; }
        public string DoseRepeatName { get; set; }
    }
}
