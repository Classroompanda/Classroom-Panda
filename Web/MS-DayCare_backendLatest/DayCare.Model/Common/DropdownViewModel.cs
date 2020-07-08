using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Common
{
    public class DropdownViewModel : BaseViewModel
    {
        public long Value { get; set; }
        public string label { get; set; }

        public DateTime CheckInTime { get; set; }
        public string AllergyType { get; set; }
    }
}
