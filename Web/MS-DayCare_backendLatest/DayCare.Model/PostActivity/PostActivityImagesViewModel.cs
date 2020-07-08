using DayCare.Entity.PostActivity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.PostActivity
{
    public class PostActivityImagesViewModel : PostActivityImages
    {
        public bool alreadyliked { get; set; }

        public bool IsAlreadyPostComment { get; set; }
    }
}
