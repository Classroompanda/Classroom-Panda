using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class PostActivitiesVideoRequestViewModel : BaseViewModel
    {
        public  long Id { get; set; }
        public long PostActivitiesID { get; set; }
        public long AgencyID { get; set; }
        public long StudentID { get; set; }
        public long ClassesID { get; set; }
        public string VedioServerPath { get; set; }
        public long StringId { get; set; }
        public long LikeCount { get; set; }
        public long LoveCount { get; set; }
        public long ThumbsUpCount { get; set; }
        public long ThumbsDownCount { get; set; }
        public string Comment { get; set; }

    }
}
