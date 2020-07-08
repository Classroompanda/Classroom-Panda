using DayCare.Entity.PostActivity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.PostActivity
{
    public class PostActivitiesViewModel : BaseViewModel
    {
        public string StudentName { get; set; }
        //public string ImagePath { get; set; }
        public List<PostActivityImagesViewModel> PostActivityImages { get; set; }
        public List<PostActivityVideosViewModel> PostActivityVideos { get; set; }

        
        public long TotalLikes { get; set; }
        public long CommentCount { get; set; }
        public long Id { get; set; }
        public string ImagePath { get; set; }
        public long TeacherID { get; set; }
        public string Sender { get; set; }
        public string PostTitle { get; set; }
        public string PostDescription { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }
        public string ClassName { get; set; }
        public DateTime PostedDate { get; set; }
        public bool IsPublic { get; set; }
        public List<long> selectedStudents { get; set; }

        public long PostLikeCount { get; set; }

        public bool IsPostALreadyLiked { get; set; }

        public string PostComment { get; set; }

        public bool IsAlreadyPostComment { get; set; }
    }
}
