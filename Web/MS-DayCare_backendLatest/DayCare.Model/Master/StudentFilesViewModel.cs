using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class StudentFilesViewModel : BaseViewModel
    {


        public long Id { get; set; }

        public long AgencyID { get; set; }

        public long StudentID { get; set; }

        public string FileName { get; set; }

         public string FilePath { get; set; }

        public List<StudentFilesRequestViewModel> StudentFiles { get; set; }

        public long Agency { get; set; }
        public long StringId { get; set; }

    }
}
