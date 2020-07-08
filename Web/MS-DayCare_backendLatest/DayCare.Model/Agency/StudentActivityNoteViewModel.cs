using DayCare.Entity.Student;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class StudentActivityNoteViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long StudentActivitiesID { get; set; }
        public long StudentID { get; set; }
        public string NoteDescription { get; set; }
        public long StringId { get; set; }
        public long ActivityTypeID { get; set; }
    }
}
