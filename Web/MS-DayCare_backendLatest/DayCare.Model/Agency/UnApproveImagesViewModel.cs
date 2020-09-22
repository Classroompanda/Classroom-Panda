using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class UnApproveImagesViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long PostActivityImagesID { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long TeacherID { get; set; }
        public string ImageServerPath { get; set; }
        public string PostTitle { get; set; }
        public string StudentName { get; set; }
        public string Sender { get; set; }
        public DateTime? PostedDate { get; set; }
        public long StringId { get; set; }

    }
}
