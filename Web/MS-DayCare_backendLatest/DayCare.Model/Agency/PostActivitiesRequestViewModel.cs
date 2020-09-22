using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class PostActivitiesRequestViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long AgencyID { get; set; }
        public long ClassesID { get; set; }
        //public long ActivityTypeID { get; set; }
        public long StudentID { get; set; }
        public string StudentName { get; set; }
        public DateTime PostedDate { get; set; }
        public string PostTitle { get; set; }
        public string PostDescription { get; set; }
        public long TeacherID { get; set; }
        public bool IsPublic { get; set; }
        public long StringId { get; set; }
        public List<long> selectedStudents { get; set; }
        public List<PostActivitiesImagesRequestViewModel> PostActivityImages { get; set; }
        public List<PostActivitiesVideoRequestViewModel> PostActivityVideos { get; set; }
        public int limit { get; set; }
        public int page { get; set; }
        public long UserID { get; set; }
        /////////////
        public int CreatedBy { get; set; }
    }
}
