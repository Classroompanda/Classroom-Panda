using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Common
{
    public class FileUploadResponseViewModel
    {
        public Guid RefferalName { get; set; }

        public string FilePath { get; set; }

        public string OriginalFileName { get; set; }
    }

}
