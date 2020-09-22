using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BK.Staff.Model.Response
{
  public class ImageResponseViewModal
    {
        public IFormFile Filepath { get; set; }
        public string Filename { get; set; }
    }
}
