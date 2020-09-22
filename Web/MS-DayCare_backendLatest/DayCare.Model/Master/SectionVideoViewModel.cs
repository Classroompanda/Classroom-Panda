using System;

namespace DayCare.Model.Master
{
    public class SectionVideoViewModel : BaseViewModel
    {
        public long Id { get; set; }
        public long SectionID { get; set; }
        public string VideoPath { get; set; }
        public string Title { get; set; }
        public long StringId { get; set; }
        public string SectionName { get; set; }
    }
}
